import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {buildRevolveFromPoints} from './revolve-core.js?v=0.36.18.389';

const VERSION='0.36.18.442';
const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');

const launchRow=document.createElement('div');
launchRow.className='outliner-actions revolve-profile-launch-row';
launchRow.style.gridTemplateColumns='1fr';
launchRow.hidden=true;
launchRow.innerHTML='<button id="revolveProfileLaunchBtn" type="button">Revolve Profile</button>';
objectTools?.appendChild(launchRow);
const launchButton=launchRow.querySelector('#revolveProfileLaunchBtn');

const controls=document.createElement('div');
controls.id='revolveProfileControls';
controls.className='boxlab-tool-session-shell revolve-profile-controls';
controls.hidden=true;
controls.innerHTML=`
  <div class="boxlab-tool-session-title"><span>Revolve Profile</span><span class="boxlab-tool-session-subtitle">Profile · Segments · Apply</span></div>
  <div class="outliner-actions" style="grid-template-columns:repeat(4,1fr)">
    <button id="revolveProfileEditBtn" type="button">Edit Profile</button>
    <button id="revolveProfileUndoPointBtn" type="button">Undo Point</button>
    <button id="revolveProfileDeletePointBtn" type="button">Delete Point</button>
    <button id="revolveProfileClearBtn" type="button">Clear</button>
  </div>
  <label class="range-row">
    <span>Segments</span>
    <input id="revolveProfileSegments" type="range" min="3" max="64" value="24" step="1"/>
    <output id="revolveProfileSegmentsOut">24</output>
  </label>
  <button id="revolveProfileApplyBtn" class="boxlab-tool-session-primary" type="button">Apply Revolve</button>
`;
objectTools?.appendChild(controls);

const editButton=controls.querySelector('#revolveProfileEditBtn');
const undoButton=controls.querySelector('#revolveProfileUndoPointBtn');
const deletePointButton=controls.querySelector('#revolveProfileDeletePointBtn');
const clearButton=controls.querySelector('#revolveProfileClearBtn');
const segmentInput=controls.querySelector('#revolveProfileSegments');
const segmentOut=controls.querySelector('#revolveProfileSegmentsOut');
const applyButton=controls.querySelector('#revolveProfileApplyBtn');

let overlay=null,drag=null,lastSignature='',activeProfileId=null,raf=0,cachedActiveId=null,cachedActiveObject=null;
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

function state(){return globalThis.__boxlabBridgeState;}
function manager(){return globalThis.__boxlabObjectManager;}
function activeObject(){
  const m=manager();if(!m)return null;
  if(cachedActiveId===m.activeId&&cachedActiveObject?.id===m.activeId)return cachedActiveObject;
  cachedActiveId=m.activeId;
  cachedActiveObject=m.objects?.find?.(o=>o.id===m.activeId)||null;
  return cachedActiveObject;
}
function profileObject(){
  const object=activeObject();
  return object?.revolveProfile?object:null;
}
function liveMesh(){return state()?.mesh||null;}
function constructionPlane(){
  return new EditableMesh([
    new THREE.Vector3(-2,-2,0),
    new THREE.Vector3( 2,-2,0),
    new THREE.Vector3( 2, 2,0),
    new THREE.Vector3(-2, 2,0)
  ],[[0,1,2,3]]);
}
function looksConstructionMesh(mesh){
  return !!mesh&&mesh.vertices?.length===4&&mesh.faces?.length===1&&mesh.faces[0]?.length===4;
}
function ensureMeta(object){
  if(!object)return null;
  object.revolveProfile ||= {version:VERSION,points:[],segments:24,edit:false,applied:false,pointHistory:[],selectedPoint:null,interacted:false,initialPlaneSignature:''};
  object.revolveProfile.points ||= [];
  object.revolveProfile.pointHistory ||= [];
  if(!Number.isInteger(object.revolveProfile.selectedPoint))object.revolveProfile.selectedPoint=null;
  object.revolveProfile.segments=Math.max(3,Math.min(64,Math.round(Number(object.revolveProfile.segments)||24)));
  object.revolveProfile.initialPlaneSignature ||= planeSignature(liveMesh());
  return object.revolveProfile;
}
function clonePoints(points){return(points||[]).map(p=>({u:Number(p.u)||0,v:Number(p.v)||0}));}
function pushPointHistory(meta){
  meta.pointHistory.push(clonePoints(meta.points));
  if(meta.pointHistory.length>30)meta.pointHistory.shift();
}
function setStatus(text){if(status)status.textContent=text;}
function planeSignature(mesh){return looksConstructionMesh(mesh)?mesh.vertices.map(v=>[v.x,v.y,v.z].map(n=>n.toFixed(6)).join(',')).join('|'):'';}
function toolSession(){return globalThis.__boxlabToolSession||null;}
function beginRevolveSession(){
  controls.hidden=false;
  toolSession()?.begin?.({id:'revolve-profile',title:'Revolve Profile',node:controls,subtitle:'Profile · Segments · Apply'});
}
function endRevolveSession(){
  controls.hidden=true;
  toolSession()?.end?.('revolve-profile');
}
function claimRevolveTools(meta){
  if(!meta)return;
  meta.interacted=true;
  beginRevolveSession();
}
function replaceMesh(target,source){
  target.vertices=source.vertices.map(v=>v.clone());
  target.faces=source.faces.map(f=>[...f]);
  target.creases=new Map(source.creases||[]);
  target.looseEdges=new Set(source.looseEdges||[]);
  target.looseVertices=new Set(source.looseVertices||[]);
  target.edges?.();
}
function frameFor(mesh){
  if(!looksConstructionMesh(mesh))return null;
  const p0=mesh.vertices[0].clone(),p1=mesh.vertices[1].clone(),p3=mesh.vertices[3].clone();
  const u=p1.clone().sub(p0),v=p3.clone().sub(p0),width=u.length(),height=v.length();
  if(width<1e-6||height<1e-6)return null;
  u.normalize();v.normalize();
  const normal=new THREE.Vector3().crossVectors(u,v);
  if(normal.lengthSq()<1e-12)return null;
  normal.normalize();
  return{p0,p1,p3,u,v,normal,width,height,axisOrigin:p0.clone(),axisDirection:v.clone()};
}
function pointWorld(frame,p){
  return frame.p0.clone().addScaledVector(frame.u,THREE.MathUtils.clamp(Number(p.u)||0,0,1)*frame.width)
    .addScaledVector(frame.v,THREE.MathUtils.clamp(Number(p.v)||0,0,1)*frame.height);
}
function profileWorldPoints(frame,meta){return meta.points.map(p=>pointWorld(frame,p));}
function planeUV(frame,world){
  const rel=world.clone().sub(frame.p0);
  let u=THREE.MathUtils.clamp(rel.dot(frame.u)/frame.width,0,1);
  let v=THREE.MathUtils.clamp(rel.dot(frame.v)/frame.height,0,1);
  if(u<0.025)u=0;
  if(u>0.975)u=1;
  if(v<0.025)v=0;
  if(v>0.975)v=1;
  return{u,v};
}
function pointerRay(event){
  const rect=canvas.getBoundingClientRect();
  pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-(((event.clientY-rect.top)/rect.height)*2-1));
  raycaster.setFromCamera(pointer,state()?.camera);
}
function pointOnPlane(event,frame){
  const camera=state()?.camera;if(!camera||!frame)return null;
  pointerRay(event);
  const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(frame.normal,frame.p0),out=new THREE.Vector3();
  return raycaster.ray.intersectPlane(plane,out)?out:null;
}
function screenPoint(world){
  const camera=state()?.camera,rect=canvas?.getBoundingClientRect();if(!camera||!rect)return null;
  const p=world.clone().project(camera);
  return new THREE.Vector2(rect.left+(p.x*.5+.5)*rect.width,rect.top+(-p.y*.5+.5)*rect.height);
}
function distanceToSegment2D(p,a,b){
  const ab=b.clone().sub(a),len2=ab.lengthSq();
  if(len2<1e-8)return p.distanceTo(a);
  const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/len2,0,1);
  return p.distanceTo(a.clone().add(ab.multiplyScalar(t)));
}
function nearestProfileSegment(event,frame,meta){
  if(meta.points.length<2)return null;
  const target=new THREE.Vector2(event.clientX,event.clientY),pts=profileWorldPoints(frame,meta).map(screenPoint);
  let best=null;
  for(let i=0;i<pts.length-1;i++){
    if(!pts[i]||!pts[i+1])continue;
    const d=distanceToSegment2D(target,pts[i],pts[i+1]);
    if(d<=18&&(!best||d<best.distance))best={index:i,distance:d};
  }
  return best?.index??null;
}
function nearestProfilePoint(event,frame,meta){
  let best=null;
  const target=new THREE.Vector2(event.clientX,event.clientY);
  profileWorldPoints(frame,meta).forEach((world,index)=>{
    const s=screenPoint(world);if(!s)return;
    const d=s.distanceTo(target);
    if(d<=22&&(!best||d<best.distance))best={index,distance:d};
  });
  return best?.index??null;
}
function disposeOverlay(){
  if(!overlay)return;
  overlay.parent?.remove(overlay);
  const geometries=new Set(),materials=new Set();
  overlay.traverse(node=>{
    if(node.geometry)geometries.add(node.geometry);
    if(Array.isArray(node.material))node.material.forEach(m=>m&&materials.add(m));
    else if(node.material)materials.add(node.material);
  });
  geometries.forEach(g=>g.dispose?.());materials.forEach(m=>m.dispose?.());
  overlay=null;
}
function lineBetween(a,b,material,radius){
  const delta=b.clone().sub(a),length=delta.length();
  if(length<1e-7)return null;
  const geometry=new THREE.CylinderGeometry(radius,radius,length,10,1,false);
  const mesh=new THREE.Mesh(geometry,material);
  mesh.position.copy(a).add(b).multiplyScalar(.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());
  return mesh;
}
function planeSurface(frame){
  const p0=frame.p0,p1=frame.p1,p3=frame.p3,p2=p1.clone().add(p3).sub(p0);
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute([
    p0.x,p0.y,p0.z,p1.x,p1.y,p1.z,p2.x,p2.y,p2.z,
    p0.x,p0.y,p0.z,p2.x,p2.y,p2.z,p3.x,p3.y,p3.z
  ],3));
  const material=new THREE.MeshBasicMaterial({transparent:true,opacity:.10,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
  const mesh=new THREE.Mesh(geometry,material);mesh.renderOrder=20;return mesh;
}
function buildOverlay(){
  const object=profileObject(),mesh=liveMesh(),scene=state()?.scene;
  if(!object||!scene){disposeOverlay();launchRow.hidden=true;endRevolveSession();activeProfileId=null;return;}
  const meta=ensureMeta(object);
  const construction=looksConstructionMesh(mesh);
  meta.applied=!construction;
  launchRow.hidden=!construction;
  if(!construction){disposeOverlay();activeProfileId=object.id;endRevolveSession();return;}
  activeProfileId=object.id;
  const currentPlaneSignature=planeSignature(mesh);
  if(meta.initialPlaneSignature&&currentPlaneSignature&&currentPlaneSignature!==meta.initialPlaneSignature)claimRevolveTools(meta);
  if(meta.edit||meta.interacted){if(!toolSession()?.isActive?.('revolve-profile'))beginRevolveSession();}
  else if(toolSession()?.isActive?.('revolve-profile'))endRevolveSession();
  const frame=frameFor(mesh);if(!frame){disposeOverlay();return;}
  disposeOverlay();
  overlay=new THREE.Group();overlay.name='BoxLab Revolve Profile Construction';overlay.userData.boxlabRevolveProfile=true;
  overlay.add(planeSurface(frame));

  const radius=Math.max(.008,Math.hypot(frame.width,frame.height)*.004);
  const axisMaterial=new THREE.MeshBasicMaterial({color:0x4f86ff,depthTest:false,depthWrite:false});
  const axis=lineBetween(frame.p0,frame.p3,axisMaterial,radius*1.65);
  if(axis){axis.renderOrder=24;axis.userData.boxlabRevolveAxis=true;overlay.add(axis);}

  const borderMaterial=new THREE.LineBasicMaterial({transparent:true,opacity:.42,depthTest:false,depthWrite:false});
  const p2=frame.p1.clone().add(frame.p3).sub(frame.p0);
  const borderGeo=new THREE.BufferGeometry().setFromPoints([frame.p0,frame.p1,p2,frame.p3,frame.p0]);
  const border=new THREE.Line(borderGeo,borderMaterial);border.renderOrder=22;overlay.add(border);

  const points=profileWorldPoints(frame,meta);
  if(points.length){
    const pointGeo=new THREE.BufferGeometry().setFromPoints(points);
    const pointMat=new THREE.PointsMaterial({size:9,sizeAttenuation:false,depthTest:false,depthWrite:false});
    const dots=new THREE.Points(pointGeo,pointMat);dots.renderOrder=30;overlay.add(dots);
    if(Number.isInteger(meta.selectedPoint)&&points[meta.selectedPoint]){
      const selectedGeo=new THREE.SphereGeometry(Math.max(.025,Math.hypot(frame.width,frame.height)*.012),14,10);
      const selectedMat=new THREE.MeshBasicMaterial({color:0xffe14a,depthTest:false,depthWrite:false});
      const selected=new THREE.Mesh(selectedGeo,selectedMat);selected.position.copy(points[meta.selectedPoint]);selected.renderOrder=32;overlay.add(selected);
    }
    if(points.length>1){
      const chainGeo=new THREE.BufferGeometry().setFromPoints(points);
      const chainMat=new THREE.LineBasicMaterial({transparent:true,opacity:.95,depthTest:false,depthWrite:false});
      const chain=new THREE.Line(chainGeo,chainMat);chain.renderOrder=29;overlay.add(chain);
    }
  }

  if(points.length>=2){
    const result=buildRevolveFromPoints(points,{axisOrigin:frame.axisOrigin,axisDirection:frame.axisDirection,segments:meta.segments});
    if(result.ok){
      const geometry=result.mesh.triangulatedGeometry();
      const fillMat=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.16,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
      const wireMat=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.56,side:THREE.DoubleSide,wireframe:true,depthTest:false,depthWrite:false});
      const fill=new THREE.Mesh(geometry,fillMat),wire=new THREE.Mesh(geometry,wireMat);
      fill.renderOrder=18;wire.renderOrder=19;overlay.add(fill,wire);
      applyButton.disabled=false;
    }else{
      applyButton.disabled=true;
      setStatus(`Revolve Profile • ${result.reason}`);
    }
  }else applyButton.disabled=true;

  scene.add(overlay);
  editButton.classList.toggle('active',!!meta.edit);
  editButton.textContent=meta.edit?'Editing Profile':'Edit Profile';
  undoButton.disabled=!meta.pointHistory.length;
  deletePointButton.disabled=!Number.isInteger(meta.selectedPoint)||!meta.points[meta.selectedPoint];
  clearButton.disabled=!meta.points.length;
  segmentInput.value=String(meta.segments);
  segmentOut.textContent=String(meta.segments);

}
function frameSignature(){
  const object=profileObject(),mesh=liveMesh();if(!object||!looksConstructionMesh(mesh))return '';
  const meta=ensureMeta(object),verts=mesh.vertices.map(v=>[v.x,v.y,v.z].map(n=>n.toFixed(5)).join(',')).join('|');
  const pts=meta.points.map(p=>`${Number(p.u).toFixed(5)},${Number(p.v).toFixed(5)}`).join('|');
  return`${object.id};${verts};${pts};${meta.segments};${meta.edit}`;
}
function tick(){
  const sig=frameSignature();
  if(sig!==lastSignature){lastSignature=sig;buildOverlay();}
  if(!sig&&overlay){lastSignature='';buildOverlay();}
  raf=requestAnimationFrame(tick);
}
function profileInteractionActive(){
  const object=profileObject(),mesh=liveMesh();
  return !!object&&looksConstructionMesh(mesh)&&!!ensureMeta(object).edit;
}
function beginProfilePointer(event){
  if(event.target!==canvas||!event.isPrimary||!profileInteractionActive())return;
  if(event.pointerType==='touch')return;
  const object=profileObject(),meta=ensureMeta(object),frame=frameFor(liveMesh());if(!frame)return;
  const world=pointOnPlane(event,frame);if(!world)return;
  event.preventDefault();event.stopImmediatePropagation();
  const existing=nearestProfilePoint(event,frame,meta);
  const segment=existing===null?nearestProfileSegment(event,frame,meta):null;
  pushPointHistory(meta);
  let index=existing;
  if(index===null&&segment!==null){
    meta.points.splice(segment+1,0,planeUV(frame,world));
    index=segment+1;
  }else if(index===null){
    meta.points.push(planeUV(frame,world));
    index=meta.points.length-1;
  }
  meta.selectedPoint=index;
  drag={id:event.pointerId,index,objectId:object.id};
  state()?.controls&&(state().controls.enabled=false);
  meta.points[index]=planeUV(frame,world);
  lastSignature='';
}
function moveProfilePointer(event){
  if(!drag||event.pointerId!==drag.id)return;
  event.preventDefault();event.stopImmediatePropagation();
  const object=profileObject();if(!object||object.id!==drag.objectId)return;
  const meta=ensureMeta(object),frame=frameFor(liveMesh()),world=pointOnPlane(event,frame);
  if(!frame||!world)return;
  meta.points[drag.index]=planeUV(frame,world);
  lastSignature='';
}
function endProfilePointer(event){
  if(!drag||event.pointerId!==drag.id)return;
  event.preventDefault();event.stopImmediatePropagation();
  drag=null;
  if(state()?.controls)state().controls.enabled=true;
  lastSignature='';
}
function cancelProfilePointer(event){
  if(!drag||event.pointerId!==drag.id)return;
  drag=null;
  if(state()?.controls)state().controls.enabled=true;
  const object=profileObject(),meta=object&&ensureMeta(object);
  if(meta?.pointHistory?.length)meta.points=meta.pointHistory.pop();
  if(meta)meta.selectedPoint=null;
  lastSignature='';
}
function addRevolveProfile(){
  const m=manager();if(!m?.addMesh)return;
  const before=globalThis.__boxlabObjectHistory?.capture?.()||null;
  const object=m.addMesh(constructionPlane(),'Revolve Profile',{enterObjectMode:true});
  if(!object)return;
  cachedActiveId=object.id;cachedActiveObject=object;
  object.revolveProfile={version:VERSION,points:[],segments:24,edit:false,applied:false,pointHistory:[],selectedPoint:null,interacted:false,initialPlaneSignature:planeSignature(liveMesh())};
  if(before)globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(before);
  setStatus('Revolve Profile added • position/snap the plane first • then tap Edit Profile');
  lastSignature='';
}
function applyRevolve(){
  const object=profileObject(),mesh=liveMesh();if(!object||!looksConstructionMesh(mesh))return false;
  const meta=ensureMeta(object),frame=frameFor(mesh),points=profileWorldPoints(frame,meta);
  const result=buildRevolveFromPoints(points,{axisOrigin:frame.axisOrigin,axisDirection:frame.axisDirection,segments:meta.segments});
  if(!result.ok){setStatus(`Revolve refused • ${result.reason}`);return false;}
  const before=mesh.clone();
  globalThis.__boxlabHistory?.push(before);
  replaceMesh(mesh,result.mesh);
  meta.applied=true;meta.edit=false;
  endRevolveSession();
  object.name=object.name.replace(/ Profile(?: \d+)?$/,'')||'Revolve';
  manager()?.saveActive?.();
  globalThis.__boxlabObjectSelection?.single?.(object.id);
  globalThis.__boxlabBooleanUX?.sync?.();
  disposeOverlay();launchRow.hidden=true;controls.hidden=true;lastSignature='';
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  setStatus(`Revolve applied • ${meta.segments} segments • ${result.faces} faces`);
  return true;
}
function installPenRange(input,onValue){
  if(!input)return;
  let pointerId=null,owned=null,releaseFrame=null;
  const map=clientX=>{
    const rect=input.getBoundingClientRect(),min=Number(input.min),max=Number(input.max),step=Number(input.step)||1;
    if(!rect.width)return Number(input.value);
    const t=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width)),raw=min+t*(max-min);
    return min+Math.round((raw-min)/step)*step;
  };
  const apply=value=>{owned=value;input.value=String(value);onValue();};
  const enforce=()=>{if(owned===null)return false;if(Number(input.value)!==Number(owned))input.value=String(owned);return true;};
  input.addEventListener('pointerdown',event=>{if(event.pointerType!=='pen')return;pointerId=event.pointerId;input.setPointerCapture?.(pointerId);event.preventDefault();event.stopPropagation();apply(map(event.clientX));},{capture:true,passive:false});
  input.addEventListener('pointermove',event=>{if(event.pointerType!=='pen'||event.pointerId!==pointerId)return;event.preventDefault();event.stopPropagation();apply(map(event.clientX));},{capture:true,passive:false});
  const end=event=>{if(event.pointerType!=='pen'||event.pointerId!==pointerId)return;event.preventDefault();event.stopPropagation();if(input.hasPointerCapture?.(pointerId))input.releasePointerCapture(pointerId);pointerId=null;if(releaseFrame)cancelAnimationFrame(releaseFrame);releaseFrame=requestAnimationFrame(()=>{enforce();releaseFrame=requestAnimationFrame(()=>{enforce();owned=null;releaseFrame=null;});});};
  input.addEventListener('pointerup',end,{capture:true,passive:false});input.addEventListener('pointercancel',end,{capture:true,passive:false});
  input.addEventListener('input',()=>{enforce();onValue();});input.addEventListener('change',()=>{if(enforce())onValue();});
}

window.addEventListener('boxlab-add-revolve-profile',addRevolveProfile);
launchButton?.addEventListener('click',()=>{
  const object=profileObject(),mesh=liveMesh();
  if(!object||!looksConstructionMesh(mesh))return;
  const meta=ensureMeta(object);
  claimRevolveTools(meta);
  setStatus('Revolve Profile • edit profile, adjust Segments, then Apply Revolve');
  lastSignature='';
});
window.addEventListener('pointerdown',beginProfilePointer,true);
window.addEventListener('pointermove',moveProfilePointer,true);
window.addEventListener('pointerup',endProfilePointer,true);
window.addEventListener('pointercancel',cancelProfilePointer,true);
editButton.addEventListener('click',()=>{
  const object=profileObject();if(!object)return;
  const meta=ensureMeta(object);meta.edit=!meta.edit;
  if(meta.edit)claimRevolveTools(meta);
  if(!meta.edit&&state()?.controls)state().controls.enabled=true;
  setStatus(meta.edit?'Revolve Profile • Pencil/mouse draws • touch still orbits/pans/zooms':'Revolve Profile • position/snap plane with Object tools');
  lastSignature='';
});
undoButton.addEventListener('click',()=>{
  const object=profileObject(),meta=object&&ensureMeta(object);if(!meta?.pointHistory?.length)return;
  meta.points=meta.pointHistory.pop();meta.selectedPoint=null;lastSignature='';
});
deletePointButton.addEventListener('click',()=>{
  const object=profileObject(),meta=object&&ensureMeta(object);if(!meta||!Number.isInteger(meta.selectedPoint)||!meta.points[meta.selectedPoint])return;
  pushPointHistory(meta);meta.points.splice(meta.selectedPoint,1);meta.selectedPoint=null;lastSignature='';
});
clearButton.addEventListener('click',()=>{
  const object=profileObject(),meta=object&&ensureMeta(object);if(!meta||!meta.points.length)return;
  pushPointHistory(meta);meta.points=[];meta.selectedPoint=null;lastSignature='';
});
installPenRange(segmentInput,()=>{
  const object=profileObject(),meta=object&&ensureMeta(object);if(!meta)return;
  meta.segments=Math.max(3,Math.min(64,Math.round(Number(segmentInput.value)||24)));
  segmentOut.textContent=String(meta.segments);lastSignature='';
});
applyButton.addEventListener('click',applyRevolve);
document.querySelector('#outlinerList')?.addEventListener('click',()=>queueMicrotask(()=>{cachedActiveId=null;cachedActiveObject=null;lastSignature='';buildOverlay();}));
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(()=>{lastSignature='';buildOverlay();})));
window.addEventListener('beforeunload',()=>{cancelAnimationFrame(raf);disposeOverlay();endRevolveSession();});
tick();

globalThis.__boxlabRevolveProfile={
  version:VERSION,
  add:addRevolveProfile,
  apply:applyRevolve,
  get active(){return !!profileObject()&&looksConstructionMesh(liveMesh());},
  rebuild(){lastSignature='';buildOverlay();}
};
