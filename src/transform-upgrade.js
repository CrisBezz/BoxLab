import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const strip=document.querySelector('#transformStrip');
const toolButtons=[...document.querySelectorAll('#toolModes button')];
const axisSnapToggle=document.querySelector('#axisSnapToggle');
const inferenceSnapToggle=document.querySelector('#inferenceSnapToggle');
const quickSnap=document.querySelector('.quick-snap');
const DRAG_THRESHOLD=8;
const INFERENCE_SNAP_PX=12;
let gesture=null,constraint='free',angleSnap=true;

const precision=document.createElement('div');
precision.id='transformPrecision';
precision.innerHTML='<button type="button" data-constraint="free">Free</button><button type="button" data-constraint="x">X</button><button type="button" data-constraint="y">Y</button><button type="button" data-constraint="z">Z</button><button type="button" data-constraint="auto">Auto</button><button type="button" id="transformSnapBtn">15°</button><input id="transformValue" inputmode="decimal" placeholder="Value" aria-label="Transform numeric value" />';
strip?.append(precision);
const valueInput=precision.querySelector('#transformValue'),snapButton=precision.querySelector('#transformSnapBtn');

if(quickSnap) quickSnap.style.display='';
if(inferenceSnapToggle) inferenceSnapToggle.disabled=false;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function activeToolButton(){return document.querySelector('#toolModes button.active');}
function tool(){return activeToolButton()?.dataset?.tool||null;}
function directFaceToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active');}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function axisVector(axis){return new THREE.Vector3(axis==='x'?1:0,axis==='y'?1:0,axis==='z'?1:0);}
function explicitAxis(){return ['x','y','z'].includes(constraint)?constraint:null;}
function constraintLabel(){return constraint==='free'?'Free':constraint==='auto'?'Auto':constraint.toUpperCase();}
function axisSnapOn(){return !!axisSnapToggle?.checked;}
function inferenceSnapOn(){return !!inferenceSnapToggle?.checked;}
function syncPrecision(){
  const armed=globalThis.__boxlabTransformArming?.active?.()??!!tool();
  const armedConstraint=globalThis.__boxlabTransformArming?.constraint?.()||constraint;
  if(armed)constraint=armedConstraint||'free';
  precision.querySelectorAll('[data-constraint]').forEach(b=>b.classList.toggle('active',armed&&b.dataset.constraint===constraint));
  const t=tool();
  if(snapButton){snapButton.classList.toggle('active',angleSnap);snapButton.hidden=t!=='rotate';}
  if(valueInput){valueInput.placeholder=t==='move'?'Distance':t==='scale'?'Scale':t==='rotate'?'Degrees':'Transform';valueInput.classList.toggle('with-snap',t==='rotate');}
}
function selectionVertices(mesh,m,ids){if(!mesh)return[];if(m==='object')return mesh.vertices.map((_,i)=>i);const out=new Set();if(m==='vertex')ids.forEach(i=>{if(mesh.vertices[i])out.add(i);});else if(m==='edge'){const edges=mesh.edges();ids.forEach(i=>{const e=edges[i];if(e){out.add(e.a);out.add(e.b);}});}else if(m==='face')ids.forEach(i=>(mesh.faces[i]||[]).forEach(v=>out.add(v)));return [...out];}
function center(mesh,indices){const c=new THREE.Vector3();indices.forEach(i=>c.add(mesh.vertices[i]));return indices.length?c.multiplyScalar(1/indices.length):c;}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}
function screenAxes(c,camera){const origin=screenPoint(c,camera),axes={};for(const[name,dir]of Object.entries({x:new THREE.Vector3(1,0,0),y:new THREE.Vector3(0,1,0),z:new THREE.Vector3(0,0,1)}))axes[name]=screenPoint(c.clone().add(dir),camera).sub(origin);return axes;}
function chooseAxis(delta,axes){if(delta.lengthSq()<1)return null;const d=delta.clone().normalize();let best=null;for(const[axis,v]of Object.entries(axes)){if(v.lengthSq()<4)continue;const score=Math.abs(d.dot(v.clone().normalize()));if(!best||score>best.score)best={axis,score};}return best?.axis||null;}
function hitSelectedIndex(event,m,ids){
  const s=state(),camera=s?.camera;if(!camera)return null;
  const p=new THREE.Vector2(event.clientX,event.clientY);
  if(m==='vertex'){
    let best=null;for(const i of ids){const v=s.mesh.vertices[i];if(!v)continue;const d=screenPoint(v,camera).distanceTo(p);if(d<=22&&(!best||d<best.d))best={i,d};}return best?.i??null;
  }
  if(m==='edge'){
    const edges=s.mesh.edges();let best=null;for(const i of ids){const e=edges[i];if(!e)continue;const a=screenPoint(s.mesh.vertices[e.a],camera),b=screenPoint(s.mesh.vertices[e.b],camera),ab=b.clone().sub(a),l=ab.lengthSq();if(l<1)continue;const q=a.clone().addScaledVector(ab,THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l,0,1)),d=p.distanceTo(q);if(d<=18&&(!best||d<best.d))best={i,d};}return best?.i??null;
  }
  if(m==='face'){
    const ray=new THREE.Raycaster(),r=canvas.getBoundingClientRect(),ndc=new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));ray.setFromCamera(ndc,camera);let best=null;
    for(const fi of ids){const f=s.mesh.faces[fi];if(!f)continue;const pos=[];for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){const v=s.mesh.vertices[vi];pos.push(v.x,v.y,v.z);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),obj=new THREE.Mesh(geo,mat),hit=ray.intersectObject(obj,false)[0];geo.dispose();mat.dispose();if(hit&&(!best||hit.distance<best.distance))best={i:fi,distance:hit.distance};}
    return best?.i??null;
  }
  return m==='object'?0:null;
}
function planePoint(event,plane,camera){const r=canvas.getBoundingClientRect(),p=new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1)),ray=new THREE.Raycaster(),out=new THREE.Vector3();ray.setFromCamera(p,camera);return ray.ray.intersectPlane(plane,out)?out:null;}
function restore(g){for(const[i,v]of g.original)g.mesh.vertices[i].copy(v);}
function axisAmount(g,d){const rail=g.axes[g.axis];if(rail&&rail.lengthSq()>=4)return d.dot(rail)/rail.lengthSq();const dominant=Math.abs(d.x)>=Math.abs(d.y)?d.x:-d.y;return dominant*.01;}
function numeric(){const n=Number(valueInput?.value);return Number.isFinite(n)&&valueInput?.value.trim()!==''?n:null;}
function unselectedVertexIds(g){const selectedSet=new Set(g.indices);return g.mesh.vertices.map((_,i)=>i).filter(i=>!selectedSet.has(i));}
function closestVertexSnap(g,targetCenter){if(!inferenceSnapOn())return null;const centerScreen=screenPoint(targetCenter,g.camera);let best=null;for(const i of unselectedVertexIds(g)){const v=g.mesh.vertices[i],sp=screenPoint(v,g.camera),d=centerScreen.distanceTo(sp);if(d<=INFERENCE_SNAP_PX&&(!best||d<best.d))best={type:'Vertex',index:i,point:v.clone(),d};}return best;}
function closestAxisInference(g,targetCenter){if(!inferenceSnapOn())return null;const centerScreen=screenPoint(targetCenter,g.camera);let best=null;for(const i of unselectedVertexIds(g)){const v=g.mesh.vertices[i];for(const axis of ['x','y','z']){const candidate=targetCenter.clone();candidate[axis]=v[axis];const sp=screenPoint(candidate,g.camera),d=centerScreen.distanceTo(sp);if(d<=INFERENCE_SNAP_PX&&(!best||d<best.d))best={type:`${axis.toUpperCase()} Align`,axis,index:i,point:candidate,d};}}return best;}
function applyInference(g,delta){const movedCenter=g.center.clone().add(delta),vertexSnap=closestVertexSnap(g,movedCenter),axisSnap=closestAxisInference(g,movedCenter),snap=vertexSnap&&axisSnap?(vertexSnap.d<=axisSnap.d?vertexSnap:axisSnap):(vertexSnap||axisSnap);if(!snap)return {delta,snap:null};return {delta:snap.point.clone().sub(g.center),snap};}
function applyNumeric(){const n=numeric(),s=state(),mesh=s?.mesh,m=mode(),ids=selected(),t=tool(),indices=selectionVertices(mesh,m,ids);if(n===null||!mesh||!indices.length||!t||directFaceToolActive())return;const before=mesh.clone(),c=center(mesh,indices),axis=explicitAxis();globalThis.__boxlabHistory?.push(before);if(t==='move'){const d=axis?axisVector(axis).multiplyScalar(n):new THREE.Vector3(n,0,0);indices.forEach(i=>mesh.vertices[i].add(d));}else if(t==='scale'){indices.forEach(i=>{const p=mesh.vertices[i].sub(c);if(axis)p[axis]*=n;else p.multiplyScalar(n);mesh.vertices[i].add(c);});}else{let a=THREE.MathUtils.degToRad(n);if(angleSnap)a=THREE.MathUtils.degToRad(Math.round(n/15)*15);const av=axis?axisVector(axis):new THREE.Vector3(0,1,0),q=new THREE.Quaternion().setFromAxisAngle(av,a);indices.forEach(i=>mesh.vertices[i].sub(c).applyQuaternion(q).add(c));}render();if(status)status.textContent=`${t[0].toUpperCase()+t.slice(1)} • ${axis?axis.toUpperCase():'Free'} • ${n}${t==='rotate'?'°':''}`;valueInput.value='';}

axisSnapToggle?.addEventListener('change',()=>{if(status)status.textContent=`Axis Snap ${axisSnapOn()?'ON':'OFF'}${inferenceSnapOn()?' • Inference ON':''}`;});
inferenceSnapToggle?.addEventListener('change',()=>{if(status)status.textContent=`Inference Snap ${inferenceSnapOn()?'ON':'OFF'}`;});
precision.querySelectorAll('[data-constraint]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();constraint=b.dataset.constraint;globalThis.__boxlabTransformArming?.setConstraint?.(constraint);syncPrecision();if(status)status.textContent=`${constraintLabel()} constraint • ${tool()||'no transform'}`;}));
snapButton?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();angleSnap=!angleSnap;syncPrecision();if(status)status.textContent=`Rotation snap ${angleSnap?'15° ON':'OFF'}`;});
valueInput?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();applyNumeric();}else if(e.key==='Escape'){valueInput.value='';valueInput.blur();}});

function startGesture(event){if(event.target!==canvas||!event.isPrimary||event.pointerType==='touch'||directFaceToolActive())return;const s=state(),mesh=s?.mesh,camera=s?.camera,m=mode(),ids=selected(),t=tool();if(!mesh||!camera||!['move','scale','rotate'].includes(t))return;const indices=selectionVertices(mesh,m,ids),hitIndex=hitSelectedIndex(event,m,ids);if(!indices.length||m!=='object'&&!Number.isInteger(hitIndex))return;const c=center(mesh,indices),normal=new THREE.Vector3();camera.getWorldDirection(normal).normalize();const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,c),start=planePoint(event,plane,camera);if(!start)return;const cs=screenPoint(c,camera);gesture={id:event.pointerId,mesh,camera,m,ids,indices,hitIndex,t,center:c,centerScreen:cs,start,startX:event.clientX,startY:event.clientY,startVector:new THREE.Vector2(event.clientX,event.clientY).sub(cs),plane,axes:screenAxes(c,camera),axis:explicitAxis(),auto:constraint==='auto',original:new Map(indices.map(i=>[i,mesh.vertices[i].clone()])),before:mesh.clone(),changed:false,snap:null};event.preventDefault();event.stopImmediatePropagation();canvas.setPointerCapture?.(event.pointerId);}
document.addEventListener('pointerdown',startGesture,true);

canvas?.addEventListener('pointermove',event=>{const g=gesture;if(!g||g.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const dx=event.clientX-g.startX,dy=event.clientY-g.startY,d=new THREE.Vector2(dx,dy);if(!g.changed&&d.length()<DRAG_THRESHOLD)return;if(!g.changed){g.changed=true;globalThis.__boxlabHistory?.push(g.before);if(g.auto||axisSnapOn())g.axis=chooseAxis(d,g.axes);}restore(g);if(g.t==='move'){let delta;if(g.axis)delta=axisVector(g.axis).multiplyScalar(axisAmount(g,d));else{const now=planePoint(event,g.plane,g.camera);if(!now)return;delta=now.sub(g.start);}const inferred=applyInference(g,delta);delta=inferred.delta;g.snap=inferred.snap;g.indices.forEach(i=>g.mesh.vertices[i].add(delta));if(status)status.textContent=`Move • ${g.axis?g.axis.toUpperCase():g.auto||axisSnapOn()?'Auto':'Free'}${g.snap?` • Snap ${g.snap.type}`:''}`;}else if(g.t==='scale'){const factor=THREE.MathUtils.clamp(Math.exp((dx-dy)*.006),.05,20);g.indices.forEach(i=>{const p=g.mesh.vertices[i].sub(g.center);if(g.axis)p[g.axis]*=factor;else p.multiplyScalar(factor);g.mesh.vertices[i].add(g.center);});if(status)status.textContent=`Scale • ${g.axis?g.axis.toUpperCase():g.auto?'Auto → Uniform':'Uniform'} • ${factor.toFixed(2)}×`;}else{const cv=new THREE.Vector2(event.clientX,event.clientY).sub(g.centerScreen);let angle;if(g.startVector.length()>18&&cv.length()>18){const a=g.startVector.clone().normalize(),b=cv.clone().normalize();angle=Math.atan2(a.x*b.y-a.y*b.x,THREE.MathUtils.clamp(a.dot(b),-1,1));}else angle=dx*.012;if(angleSnap)angle=THREE.MathUtils.degToRad(Math.round(THREE.MathUtils.radToDeg(angle)/15)*15);const av=g.axis?axisVector(g.axis):(()=>{const a=new THREE.Vector3();g.camera.getWorldDirection(a);return a.normalize();})(),q=new THREE.Quaternion().setFromAxisAngle(av,angle);g.indices.forEach(i=>g.mesh.vertices[i].sub(g.center).applyQuaternion(q).add(g.center));if(status)status.textContent=`Rotate • ${g.axis?g.axis.toUpperCase():g.auto?'Auto → View':'View'} • ${THREE.MathUtils.radToDeg(angle).toFixed(0)}°`;}render();},true);
function finish(event){const g=gesture;if(!g||g.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();if(event.type==='pointercancel'&&g.changed){restore(g);render();}else if(event.type==='pointerup'&&!g.changed&&g.m!=='object'&&Number.isInteger(g.hitIndex)){const current=selected();bridge()?.set?.(g.m,current.filter(i=>i!==g.hitIndex));if(status)status.textContent=`${g.m[0].toUpperCase()+g.m.slice(1)} selection toggled • ${g.t[0].toUpperCase()+g.t.slice(1)} still armed`;}gesture=null;if(g.changed&&status)status.textContent=`${g.t[0].toUpperCase()+g.t.slice(1)} committed${g.snap?` • ${g.snap.type}`:''} • ${g.axis?g.axis.toUpperCase():g.auto||axisSnapOn()?'auto':'free'} • selection preserved`;}
document.addEventListener('pointerup',finish,true);document.addEventListener('pointercancel',finish,true);toolButtons.forEach(b=>b.addEventListener('click',()=>queueMicrotask(()=>{constraint=globalThis.__boxlabTransformArming?.constraint?.()||'free';render();syncPrecision();}),true));syncPrecision();
