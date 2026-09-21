import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {buildSweepTube} from './sweep-core.js?v=0.36.18.393';

const VERSION='0.36.18.394';
const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const editDrawer=document.querySelector('#editDrawer');
const geometryToggle=document.querySelector('#inferenceSnapToggle');

const controls=document.createElement('div');
controls.id='sweepPathControls';controls.hidden=true;
controls.innerHTML=`
  <div class="edge-section-label">Sweep Path</div>
  <div class="outliner-actions" style="grid-template-columns:repeat(4,1fr)">
    <button id="sweepEditBtn" type="button">Edit Path</button>
    <button id="sweepUndoBtn" type="button">Undo Point</button>
    <button id="sweepDeleteBtn" type="button">Delete Point</button>
    <button id="sweepClearBtn" type="button">Clear</button>
  </div>
  <label class="range-row"><span>Radius</span><input id="sweepRadius" type="range" min="0.03" max="1.5" value="0.25" step="0.01"/><output id="sweepRadiusOut">0.25</output></label>
  <label class="range-row"><span>Sides</span><input id="sweepSides" type="range" min="3" max="24" value="8" step="1"/><output id="sweepSidesOut">8</output></label>
  <div class="outliner-actions" style="grid-template-columns:1fr 2fr"><button id="sweepCapsBtn" type="button" class="active">Caps</button><button id="sweepApplyBtn" type="button">Apply Sweep</button></div>
`;
objectTools?.appendChild(controls);

const editBtn=controls.querySelector('#sweepEditBtn'),undoBtn=controls.querySelector('#sweepUndoBtn'),deleteBtn=controls.querySelector('#sweepDeleteBtn'),clearBtn=controls.querySelector('#sweepClearBtn');
const radiusInput=controls.querySelector('#sweepRadius'),radiusOut=controls.querySelector('#sweepRadiusOut'),sidesInput=controls.querySelector('#sweepSides'),sidesOut=controls.querySelector('#sweepSidesOut');
const capsBtn=controls.querySelector('#sweepCapsBtn'),applyBtn=controls.querySelector('#sweepApplyBtn');

let overlay=null,drag=null,lastSignature='',cachedId=null,cachedObject=null,raf=0,drawerLockState=null;
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();

function state(){return globalThis.__boxlabBridgeState;}
function manager(){return globalThis.__boxlabObjectManager;}
function activeObject(){const m=manager();if(!m)return null;if(cachedId===m.activeId&&cachedObject?.id===m.activeId)return cachedObject;cachedId=m.activeId;cachedObject=m.objects?.find?.(o=>o.id===m.activeId)||null;return cachedObject;}
function pathObject(){const o=activeObject();return o?.sweepPath?o:null;}
function liveMesh(){return state()?.mesh||null;}
function constructionPlane(){return new EditableMesh([new THREE.Vector3(-2,-2,0),new THREE.Vector3(2,-2,0),new THREE.Vector3(2,2,0),new THREE.Vector3(-2,2,0)],[[0,1,2,3]]);}
function looksConstructionMesh(mesh){return !!mesh&&mesh.vertices?.length===4&&mesh.faces?.length===1&&mesh.faces[0]?.length===4;}
function planeSignature(mesh){return looksConstructionMesh(mesh)?mesh.vertices.map(v=>[v.x,v.y,v.z].map(n=>n.toFixed(5)).join(',')).join('|'):'';}
function ensureMeta(o){if(!o)return null;o.sweepPath||={version:VERSION,points:[],radius:.25,sides:8,caps:true,edit:false,history:[],selectedPoint:null,interacted:false,initialPlaneSignature:''};const m=o.sweepPath;m.version=VERSION;m.points||=[];for(const p of m.points)if(!Number.isFinite(Number(p.w)))p.w=0;m.history||=[];m.radius=Math.max(.03,Math.min(1.5,Number(m.radius)||.25));m.sides=Math.max(3,Math.min(24,Math.round(Number(m.sides)||8)));m.caps=m.caps!==false;if(!Number.isInteger(m.selectedPoint))m.selectedPoint=null;m.initialPlaneSignature||=planeSignature(liveMesh());return m;}
function frameFor(mesh){if(!looksConstructionMesh(mesh))return null;const p0=mesh.vertices[0].clone(),p1=mesh.vertices[1].clone(),p3=mesh.vertices[3].clone(),u=p1.clone().sub(p0),v=p3.clone().sub(p0),width=u.length(),height=v.length();if(width<1e-6||height<1e-6)return null;u.normalize();v.normalize();const normal=new THREE.Vector3().crossVectors(u,v).normalize();return{p0,p1,p3,u,v,normal,width,height};}
function worldPoint(frame,p){return frame.p0.clone().addScaledVector(frame.u,(Number(p.u)||0)*frame.width).addScaledVector(frame.v,(Number(p.v)||0)*frame.height).addScaledVector(frame.normal,Number(p.w)||0);}
function pathWorld(frame,meta){return meta.points.map(p=>worldPoint(frame,p));}
function localFor(frame,world,{clampToPlane=false}={}){
  const rel=world.clone().sub(frame.p0);
  let u=rel.dot(frame.u)/frame.width,v=rel.dot(frame.v)/frame.height;
  if(clampToPlane){u=THREE.MathUtils.clamp(u,0,1);v=THREE.MathUtils.clamp(v,0,1);if(u<.025)u=0;if(u>.975)u=1;if(v<.025)v=0;if(v>.975)v=1;}
  return{u,v,w:rel.dot(frame.normal)};
}
function evaluatedMesh(object){return globalThis.__boxlabObjectGeometry?.evaluatedMesh?.(object.id)||object.mesh;}
function captureSnapReferences(){
  const m=manager();if(!m)return[];
  const refs=[],activeId=m.activeId,soloId=m.soloId;
  for(const object of m.objects||[]){
    if(object.id===activeId||object.visible===false)continue;
    if(soloId&&object.id!==soloId)continue;
    const source=evaluatedMesh(object);
    if(!source?.vertices?.length)continue;
    refs.push({id:object.id,name:object.name||`Object ${object.id}`,mesh:source.clone()});
  }
  return refs;
}
function externalGeometrySnap(event,refs){
  if(!geometryToggle?.checked||!refs?.length)return null;
  const camera=state()?.camera;if(!camera)return null;
  const click=new THREE.Vector2(event.clientX,event.clientY);
  let bestVertex=null;
  for(const ref of refs)ref.mesh.vertices.forEach((v,index)=>{
    const s=screenPoint(v);if(!s)return;
    const d=s.distanceTo(click);
    if(d<=24&&(!bestVertex||d<bestVertex.distance))bestVertex={kind:'Vertex',name:ref.name,point:v.clone(),distance:d,index};
  });
  if(bestVertex)return bestVertex;
  let bestEdge=null;
  for(const ref of refs){
    const edges=ref.mesh.edges?.()||[];
    edges.forEach((edge,index)=>{
      const a=screenPoint(ref.mesh.vertices[edge.a]),b=screenPoint(ref.mesh.vertices[edge.b]);if(!a||!b)return;
      const ab=b.clone().sub(a),l=ab.lengthSq();if(l<1)return;
      const t=THREE.MathUtils.clamp(click.clone().sub(a).dot(ab)/l,0,1),q=a.clone().addScaledVector(ab,t),d=click.distanceTo(q);
      if(d<=20&&(!bestEdge||d<bestEdge.distance))bestEdge={kind:'Edge',name:ref.name,point:ref.mesh.vertices[edge.a].clone().lerp(ref.mesh.vertices[edge.b],t),distance:d,index,t};
    });
  }
  if(bestEdge)return bestEdge;
  pointerRay(event);
  let bestFace=null;
  for(const ref of refs){
    if(!ref.mesh.faces?.length)continue;
    const geometry=ref.mesh.triangulatedGeometry?.();if(!geometry)continue;
    const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),object=new THREE.Mesh(geometry,material);
    const hit=raycaster.intersectObject(object,false)[0];
    geometry.dispose?.();material.dispose?.();
    if(hit&&(!bestFace||hit.distance<bestFace.distance))bestFace={kind:'Face',name:ref.name,point:hit.point.clone(),distance:hit.distance};
  }
  return bestFace;
}
function authoredPoint(event,frame,refs){
  const snap=externalGeometrySnap(event,refs);
  if(snap)return{local:localFor(frame,snap.point),snap};
  const world=pointOnPlane(event,frame);
  return world?{local:localFor(frame,world,{clampToPlane:true}),snap:null}:null;
}
function setStatus(t){if(status)status.textContent=t;}
function lockTools(){if(!editDrawer)return;if(!drawerLockState)drawerLockState={keepOpen:editDrawer.dataset.keepOpen,open:editDrawer.open};editDrawer.dataset.keepOpen='true';editDrawer.open=true;}
function unlockTools(){if(!editDrawer||!drawerLockState)return;const old=drawerLockState;drawerLockState=null;if(old.keepOpen===undefined)delete editDrawer.dataset.keepOpen;else editDrawer.dataset.keepOpen=old.keepOpen;if(old.open)editDrawer.open=true;}
function replaceMesh(target,source){target.vertices=source.vertices.map(v=>v.clone());target.faces=source.faces.map(f=>[...f]);target.creases=new Map(source.creases||[]);target.looseEdges=new Set();target.looseVertices=new Set();target.edges?.();}
function disposeOverlay(){if(!overlay)return;overlay.removeFromParent();overlay.traverse(o=>{o.geometry?.dispose?.();if(Array.isArray(o.material))o.material.forEach(m=>m?.dispose?.());else o.material?.dispose?.();});overlay=null;}
function pointerRay(event){const rect=canvas.getBoundingClientRect();pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-(((event.clientY-rect.top)/rect.height)*2-1));raycaster.setFromCamera(pointer,state()?.camera);}
function pointOnPlane(event,frame){pointerRay(event);const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(frame.normal,frame.p0),out=new THREE.Vector3();return raycaster.ray.intersectPlane(plane,out)?out:null;}
function screenPoint(world){const camera=state()?.camera,rect=canvas?.getBoundingClientRect();if(!camera||!rect)return null;const p=world.clone().project(camera);return new THREE.Vector2(rect.left+(p.x*.5+.5)*rect.width,rect.top+(-p.y*.5+.5)*rect.height);}
function nearestPoint(event,frame,meta){const click=new THREE.Vector2(event.clientX,event.clientY),pts=pathWorld(frame,meta);let best=null,bestD=18;for(let i=0;i<pts.length;i++){const s=screenPoint(pts[i]);if(!s)continue;const d=s.distanceTo(click);if(d<bestD){bestD=d;best=i;}}return best;}
function segmentDistance(p,a,b){const ab=b.clone().sub(a),l=ab.lengthSq();if(l<1e-8)return p.distanceTo(a);const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l,0,1);return p.distanceTo(a.clone().add(ab.multiplyScalar(t)));}
function nearestSegment(event,frame,meta){const click=new THREE.Vector2(event.clientX,event.clientY),pts=pathWorld(frame,meta);let best=null,bestD=14;for(let i=0;i<pts.length-1;i++){const a=screenPoint(pts[i]),b=screenPoint(pts[i+1]);if(!a||!b)continue;const d=segmentDistance(click,a,b);if(d<bestD){bestD=d;best=i;}}return best;}
function pushHistory(meta){meta.history.push(meta.points.map(p=>({...p})));if(meta.history.length>30)meta.history.shift();}
function planeSurface(frame){const p2=frame.p1.clone().add(frame.p3).sub(frame.p0),g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([frame.p0.x,frame.p0.y,frame.p0.z,frame.p1.x,frame.p1.y,frame.p1.z,p2.x,p2.y,p2.z,frame.p0.x,frame.p0.y,frame.p0.z,p2.x,p2.y,p2.z,frame.p3.x,frame.p3.y,frame.p3.z],3));const m=new THREE.MeshBasicMaterial({transparent:true,opacity:.08,side:THREE.DoubleSide,depthTest:false,depthWrite:false});return new THREE.Mesh(g,m);}
function buildOverlay(){const o=pathObject(),mesh=liveMesh(),scene=state()?.scene;if(!o||!scene){disposeOverlay();controls.hidden=true;unlockTools();return;}const meta=ensureMeta(o),construction=looksConstructionMesh(mesh);controls.hidden=!construction;if(!construction){disposeOverlay();unlockTools();return;}const frame=frameFor(mesh);if(!frame){disposeOverlay();return;}if(meta.initialPlaneSignature&&planeSignature(mesh)!==meta.initialPlaneSignature){meta.interacted=true;lockTools();}if(meta.edit||meta.interacted)lockTools();disposeOverlay();overlay=new THREE.Group();overlay.name='BoxLab Sweep Path Construction';overlay.userData.boxlabSweepPath=true;overlay.add(planeSurface(frame));const pts=pathWorld(frame,meta);if(pts.length){const pg=new THREE.BufferGeometry().setFromPoints(pts),pm=new THREE.PointsMaterial({size:9,sizeAttenuation:false,depthTest:false,depthWrite:false});overlay.add(new THREE.Points(pg,pm));if(pts.length>1){const lg=new THREE.BufferGeometry().setFromPoints(pts),lm=new THREE.LineBasicMaterial({depthTest:false,depthWrite:false});overlay.add(new THREE.Line(lg,lm));}if(Number.isInteger(meta.selectedPoint)&&pts[meta.selectedPoint]){const sm=new THREE.Mesh(new THREE.SphereGeometry(Math.max(.025,Math.hypot(frame.width,frame.height)*.012),12,8),new THREE.MeshBasicMaterial({color:0xffe14a,depthTest:false,depthWrite:false}));sm.position.copy(pts[meta.selectedPoint]);overlay.add(sm);}}
  if(pts.length>=2){const result=buildSweepTube(pts,{radius:meta.radius,sides:meta.sides,capStart:meta.caps,capEnd:meta.caps});if(result.ok){const g=result.mesh.triangulatedGeometry(),fm=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.16,side:THREE.DoubleSide,depthTest:false,depthWrite:false}),wm=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.58,wireframe:true,side:THREE.DoubleSide,depthTest:false,depthWrite:false});overlay.add(new THREE.Mesh(g,fm),new THREE.Mesh(g,wm));applyBtn.disabled=false;}else{applyBtn.disabled=true;setStatus('Sweep Path • '+result.reason);}}else applyBtn.disabled=true;
  scene.add(overlay);editBtn.classList.toggle('active',!!meta.edit);editBtn.textContent=meta.edit?'Editing Path':'Edit Path';undoBtn.disabled=!meta.history.length;deleteBtn.disabled=!Number.isInteger(meta.selectedPoint)||!meta.points[meta.selectedPoint];clearBtn.disabled=!meta.points.length;radiusInput.value=String(meta.radius);radiusOut.textContent=meta.radius.toFixed(2);sidesInput.value=String(meta.sides);sidesOut.textContent=String(meta.sides);capsBtn.classList.toggle('active',meta.caps);capsBtn.textContent=meta.caps?'Caps On':'Caps Off';}
function signature(){const o=pathObject(),mesh=liveMesh();if(!o||!looksConstructionMesh(mesh))return'';const m=ensureMeta(o);return[o.id,planeSignature(mesh),m.points.map(p=>`${Number(p.u).toFixed(4)},${Number(p.v).toFixed(4)},${Number(p.w||0).toFixed(4)}`).join('|'),m.radius.toFixed(3),m.sides,m.caps,m.edit].join(';');}
function tick(){const s=signature();if(s!==lastSignature){lastSignature=s;buildOverlay();}if(!s&&overlay){lastSignature='';buildOverlay();}raf=requestAnimationFrame(tick);}
function interactionActive(){const o=pathObject();return !!o&&looksConstructionMesh(liveMesh())&&!!ensureMeta(o).edit;}
function begin(event){if(event.target!==canvas||!event.isPrimary||!interactionActive()||event.pointerType==='touch')return;const o=pathObject(),m=ensureMeta(o),f=frameFor(liveMesh());if(!f)return;const refs=captureSnapReferences(),authored=authoredPoint(event,f,refs);if(!authored)return;event.preventDefault();event.stopImmediatePropagation();const hit=nearestPoint(event,f,m),seg=hit===null?nearestSegment(event,f,m):null;pushHistory(m);let index=hit;if(index===null&&seg!==null){m.points.splice(seg+1,0,authored.local);index=seg+1;}else if(index===null){m.points.push(authored.local);index=m.points.length-1;}m.selectedPoint=index;m.points[index]=authored.local;drag={id:event.pointerId,index,objectId:o.id,refs,snap:authored.snap};if(state()?.controls)state().controls.enabled=false;m.interacted=true;lockTools();if(authored.snap)setStatus(`Sweep Path • snapped to ${authored.snap.name} ${authored.snap.kind}`);lastSignature='';}
function move(event){if(!drag||event.pointerId!==drag.id)return;event.preventDefault();event.stopImmediatePropagation();const o=pathObject();if(!o||o.id!==drag.objectId)return;const f=frameFor(liveMesh()),authored=f&&authoredPoint(event,f,drag.refs);if(!f||!authored)return;ensureMeta(o).points[drag.index]=authored.local;drag.snap=authored.snap;if(authored.snap)setStatus(`Sweep Path • snapped to ${authored.snap.name} ${authored.snap.kind}`);lastSignature='';}
function end(event){if(!drag||event.pointerId!==drag.id)return;event.preventDefault();event.stopImmediatePropagation();drag=null;if(state()?.controls)state().controls.enabled=true;lastSignature='';}
function cancel(event){if(!drag||event.pointerId!==drag.id)return;drag=null;if(state()?.controls)state().controls.enabled=true;const o=pathObject(),m=o&&ensureMeta(o);if(m?.history?.length)m.points=m.history.pop();if(m)m.selectedPoint=null;lastSignature='';}
function addSweepPath(){const m=manager();if(!m?.addMesh)return;const before=globalThis.__boxlabObjectHistory?.capture?.()||null;const o=m.addMesh(constructionPlane(),'Sweep Path',{enterObjectMode:true});if(!o)return;cachedId=o.id;cachedObject=o;o.sweepPath={version:VERSION,points:[],radius:.25,sides:8,caps:true,edit:false,history:[],selectedPoint:null,interacted:false,initialPlaneSignature:planeSignature(liveMesh())};if(before)globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(before);setStatus('Sweep Path added • position/snap the plane first • then tap Edit Path');lastSignature='';}
function applySweep(){const o=pathObject(),mesh=liveMesh();if(!o||!looksConstructionMesh(mesh))return false;const m=ensureMeta(o),f=frameFor(mesh),result=buildSweepTube(pathWorld(f,m),{radius:m.radius,sides:m.sides,capStart:m.caps,capEnd:m.caps});if(!result.ok){setStatus('Sweep refused • '+result.reason);return false;}globalThis.__boxlabHistory?.push(mesh.clone());replaceMesh(mesh,result.mesh);m.edit=false;m.applied=true;unlockTools();o.name=o.name.replace(/ Path(?: \d+)?$/,'')||'Sweep';manager()?.saveActive?.();globalThis.__boxlabObjectSelection?.single?.(o.id);globalThis.__boxlabBooleanUX?.sync?.();disposeOverlay();controls.hidden=true;lastSignature='';document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));setStatus(`Sweep applied • ${result.points.length} path points • ${m.sides} sides`);return true;}
function installPenRange(input,onValue){let pointerId=null,owned=null,releaseFrame=null;const min=()=>Number(input.min),max=()=>Number(input.max),step=()=>Number(input.step)||1;const map=x=>{const r=input.getBoundingClientRect(),t=THREE.MathUtils.clamp((x-r.left)/Math.max(1,r.width),0,1);return Math.round((min()+(max()-min())*t)/step())*step();};const apply=v=>{owned=String(v);input.value=owned;onValue();};const enforce=()=>{if(owned==null)return false;if(input.value!==owned)input.value=owned;return true;};input.addEventListener('pointerdown',e=>{if(e.pointerType!=='pen')return;pointerId=e.pointerId;e.preventDefault();e.stopPropagation();input.setPointerCapture?.(pointerId);apply(map(e.clientX));},{capture:true,passive:false});input.addEventListener('pointermove',e=>{if(e.pointerType!=='pen'||e.pointerId!==pointerId)return;e.preventDefault();e.stopPropagation();apply(map(e.clientX));},{capture:true,passive:false});const finish=e=>{if(e.pointerType!=='pen'||e.pointerId!==pointerId)return;e.preventDefault();e.stopPropagation();if(input.hasPointerCapture?.(pointerId))input.releasePointerCapture(pointerId);pointerId=null;if(releaseFrame)cancelAnimationFrame(releaseFrame);releaseFrame=requestAnimationFrame(()=>{enforce();releaseFrame=requestAnimationFrame(()=>{enforce();owned=null;releaseFrame=null;});});};input.addEventListener('pointerup',finish,{capture:true,passive:false});input.addEventListener('pointercancel',finish,{capture:true,passive:false});input.addEventListener('input',()=>{enforce();onValue();});input.addEventListener('change',()=>{if(enforce())onValue();});}

window.addEventListener('boxlab-add-sweep-path',addSweepPath);
window.addEventListener('pointerdown',begin,true);window.addEventListener('pointermove',move,true);window.addEventListener('pointerup',end,true);window.addEventListener('pointercancel',cancel,true);
editBtn.addEventListener('click',()=>{const o=pathObject();if(!o)return;const m=ensureMeta(o);m.edit=!m.edit;if(m.edit){m.interacted=true;lockTools();}if(!m.edit&&state()?.controls)state().controls.enabled=true;setStatus(m.edit?'Sweep Path • Pencil/mouse draws • touch still orbits/pans/zooms':'Sweep Path • position/snap plane with Object tools');lastSignature='';});
undoBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m?.history?.length)return;m.points=m.history.pop();m.selectedPoint=null;lastSignature='';});
deleteBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m||!Number.isInteger(m.selectedPoint)||!m.points[m.selectedPoint])return;pushHistory(m);m.points.splice(m.selectedPoint,1);m.selectedPoint=null;lastSignature='';});
clearBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m?.points?.length)return;pushHistory(m);m.points=[];m.selectedPoint=null;lastSignature='';});
installPenRange(radiusInput,()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;m.radius=Math.max(.03,Math.min(1.5,Number(radiusInput.value)||.25));radiusOut.textContent=m.radius.toFixed(2);lastSignature='';});
installPenRange(sidesInput,()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;m.sides=Math.max(3,Math.min(24,Math.round(Number(sidesInput.value)||8)));sidesOut.textContent=String(m.sides);lastSignature='';});
capsBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;m.caps=!m.caps;lastSignature='';});
applyBtn.addEventListener('click',applySweep);
document.querySelector('#outlinerList')?.addEventListener('click',()=>queueMicrotask(()=>{cachedId=null;cachedObject=null;lastSignature='';buildOverlay();}));
window.addEventListener('beforeunload',()=>{cancelAnimationFrame(raf);disposeOverlay();unlockTools();});
tick();
globalThis.__boxlabSweepPath={version:VERSION,add:addSweepPath,apply:applySweep,get active(){return !!pathObject()&&looksConstructionMesh(liveMesh());},rebuild(){lastSignature='';buildOverlay();}};
