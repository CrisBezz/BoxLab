import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const toolButtons=[...document.querySelectorAll('#toolModes button')];
const axisToggle=document.querySelector('#axisSnapToggle');
const DRAG_THRESHOLD=8;
let gesture=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function tool(){return document.querySelector('#toolModes button.active')?.dataset?.tool||'move';}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function selectionVertices(mesh,m,ids){
  if(!mesh)return[];
  if(m==='object')return mesh.vertices.map((_,i)=>i);
  const out=new Set();
  if(m==='vertex')ids.forEach(i=>{if(mesh.vertices[i])out.add(i);});
  else if(m==='edge'){const edges=mesh.edges();ids.forEach(i=>{const e=edges[i];if(e){out.add(e.a);out.add(e.b);}});}
  else if(m==='face')ids.forEach(i=>(mesh.faces[i]||[]).forEach(v=>out.add(v)));
  return [...out];
}
function center(mesh,indices){const c=new THREE.Vector3();indices.forEach(i=>c.add(mesh.vertices[i]));return indices.length?c.multiplyScalar(1/indices.length):c;}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}
function screenAxes(c,camera){const origin=screenPoint(c,camera),axes={};for(const [name,dir] of Object.entries({x:new THREE.Vector3(1,0,0),y:new THREE.Vector3(0,1,0),z:new THREE.Vector3(0,0,1)})){const v=screenPoint(c.clone().add(dir),camera).sub(origin);if(v.lengthSq()>9)axes[name]=v;}return axes;}
function chooseAxis(delta,axes){if(delta.lengthSq()<1)return null;const d=delta.clone().normalize();let best=null;for(const [axis,v] of Object.entries(axes)){const score=Math.abs(d.dot(v.clone().normalize()));if(!best||score>best.score)best={axis,score};}return best?.axis||null;}
function hitSelected(event,m,ids){const s=state(),camera=s?.camera;if(!camera)return false;const p=new THREE.Vector2(event.clientX,event.clientY);if(m==='vertex')return ids.some(i=>s.vertexObjects?.get(i)&&screenPoint(s.mesh.vertices[i],camera).distanceTo(p)<=22);
  if(m==='edge')return ids.some(i=>{const e=s.mesh.edges()[i];if(!e)return false;const a=screenPoint(s.mesh.vertices[e.a],camera),b=screenPoint(s.mesh.vertices[e.b],camera),ab=b.clone().sub(a),l=ab.lengthSq();if(l<1)return false;const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l,0,1);return p.distanceTo(a.addScaledVector(ab,t))<=18;});
  if(m==='face'){const ray=new THREE.Raycaster(),r=canvas.getBoundingClientRect(),ndc=new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));ray.setFromCamera(ndc,camera);for(const fi of ids){const f=s.mesh.faces[fi];if(!f)continue;const pos=[];for(let i=1;i<f.length-1;i++)for(const vi of [f[0],f[i],f[i+1]]){const v=s.mesh.vertices[vi];pos.push(v.x,v.y,v.z);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});const obj=new THREE.Mesh(g,mat),ok=ray.intersectObject(obj,false).length>0;g.dispose();mat.dispose();if(ok)return true;}return false;}
  if(m==='object'){const body=[...(s?.mesh?[]:[])];return true;}return false;
}
function planePoint(event,plane,camera){const r=canvas.getBoundingClientRect(),p=new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1)),ray=new THREE.Raycaster(),out=new THREE.Vector3();ray.setFromCamera(p,camera);return ray.ray.intersectPlane(plane,out)?out:null;}
function restore(g){for(const [i,v] of g.original)g.mesh.vertices[i].copy(v);}

canvas?.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.pointerType==='touch')return;
  const s=state(),mesh=s?.mesh,camera=s?.camera,m=mode(),ids=selected(),t=tool();
  if(!mesh||!camera||!['move','scale','rotate'].includes(t))return;
  const indices=selectionVertices(mesh,m,ids);if(!indices.length)return;
  if(m!=='object'&&!hitSelected(event,m,ids))return;
  const c=center(mesh,indices),normal=new THREE.Vector3();camera.getWorldDirection(normal).normalize();const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,c),start=planePoint(event,plane,camera);if(!start)return;
  const cs=screenPoint(c,camera),sv=new THREE.Vector2(event.clientX,event.clientY).sub(cs);
  gesture={id:event.pointerId,mesh,camera,m,ids,indices,t,center:c,centerScreen:cs,start,startX:event.clientX,startY:event.clientY,startVector:sv,plane,axes:screenAxes(c,camera),axis:null,original:new Map(indices.map(i=>[i,mesh.vertices[i].clone()])),before:mesh.clone(),changed:false};
  event.preventDefault();event.stopImmediatePropagation();canvas.setPointerCapture?.(event.pointerId);
},true);

canvas?.addEventListener('pointermove',event=>{
  const g=gesture;if(!g||g.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const dx=event.clientX-g.startX,dy=event.clientY-g.startY,screenDelta=new THREE.Vector2(dx,dy);if(!g.changed&&screenDelta.length()<DRAG_THRESHOLD)return;
  if(!g.changed){g.changed=true;globalThis.__boxlabHistory?.push(g.before);if(axisToggle?.checked)g.axis=chooseAxis(screenDelta,g.axes);}
  restore(g);
  if(g.t==='move'){
    let delta;if(g.axis&&g.axes[g.axis]){const rail=g.axes[g.axis],amount=screenDelta.dot(rail)/rail.lengthSq();delta=new THREE.Vector3(g.axis==='x'?amount:0,g.axis==='y'?amount:0,g.axis==='z'?amount:0);}else{const now=planePoint(event,g.plane,g.camera);if(!now)return;delta=now.sub(g.start);}for(const i of g.indices)g.mesh.vertices[i].add(delta);if(status)status.textContent=`Move ${g.indices.length} verts${g.axis?` • ${g.axis.toUpperCase()}`:''}`;
  }else if(g.t==='scale'){
    const factor=THREE.MathUtils.clamp(Math.exp((dx-dy)*.006),.05,20);for(const i of g.indices)g.mesh.vertices[i].sub(g.center).multiplyScalar(factor).add(g.center);if(status)status.textContent=`Scale • ${factor.toFixed(2)}×`;
  }else{
    const cv=new THREE.Vector2(event.clientX,event.clientY).sub(g.centerScreen);let angle;if(g.startVector.length()>18&&cv.length()>18){const a=g.startVector.clone().normalize(),b=cv.clone().normalize();angle=Math.atan2(a.x*b.y-a.y*b.x,THREE.MathUtils.clamp(a.dot(b),-1,1));}else angle=dx*.012;let axis=new THREE.Vector3();if(g.axis)axis.set(g.axis==='x'?1:0,g.axis==='y'?1:0,g.axis==='z'?1:0);else g.camera.getWorldDirection(axis).normalize();const q=new THREE.Quaternion().setFromAxisAngle(axis,angle);for(const i of g.indices)g.mesh.vertices[i].sub(g.center).applyQuaternion(q).add(g.center);if(status)status.textContent=`Rotate • ${THREE.MathUtils.radToDeg(angle).toFixed(1)}°${g.axis?` • ${g.axis.toUpperCase()}`:''}`;
  }
  render();
},true);

function finish(event){const g=gesture;if(!g||g.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();if(event.type==='pointercancel'&&g.changed){restore(g);render();}gesture=null;if(g.changed&&status)status.textContent=`${g.t[0].toUpperCase()+g.t.slice(1)} committed • selection preserved`;}
document.addEventListener('pointerup',finish,true);document.addEventListener('pointercancel',finish,true);

toolButtons.forEach(b=>b.addEventListener('click',()=>queueMicrotask(render),true));
