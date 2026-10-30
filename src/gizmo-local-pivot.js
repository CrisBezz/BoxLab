import * as THREE from 'three';
// Per-object frame lives in the existing flat origin record, whose original
// scene snapshot/duplicate/project owners already copy it. Draft editing is UI-only.
const worldAxis=a=>new THREE.Vector3(a==='x'?1:0,a==='y'?1:0,a==='z'?1:0);
export function pivotQuaternion(origin){
 const a=['qx','qy','qz','qw'].map(k=>origin?.[k]);
 if(!a.every(Number.isFinite))return new THREE.Quaternion();
 const q=new THREE.Quaternion(...a);return q.lengthSq()>1e-12?q.normalize():new THREE.Quaternion();
}
export function originRecord(point,q,previous={}){return {...previous,x:point.x,y:point.y,z:point.z,qx:q.x,qy:q.y,qz:q.z,qw:q.w,gizmoLocal:true};}
export function facePivotFrame(point,normal,previous){
 if(!point?.toArray().every(Number.isFinite)||!normal?.toArray().every(Number.isFinite)||normal.lengthSq()<1e-16)return null;
 const y=normal.clone().normalize(),oldX=worldAxis('x').applyQuaternion(pivotQuaternion(previous));
 let x=oldX.addScaledVector(y,-oldX.dot(y));
 if(x.lengthSq()<1e-10){x=worldAxis(Math.abs(y.x)<.9?'x':'z');x.addScaledVector(y,-x.dot(y));}
 x.normalize();const z=new THREE.Vector3().crossVectors(x,y).normalize();x.crossVectors(y,z).normalize();
 const q=new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x,y,z));return originRecord(point,q,previous);
}
// A face edge has no preferred sign. Choose the closest existing tangent axis
// and sign, retaining a right-handed frame and the face's exact normal.
export function edgePivotFrame(point,normal,direction,previous){
 const base=facePivotFrame(point,normal,previous);if(!base||!direction?.toArray().every(Number.isFinite)||direction.lengthSq()<1e-16)return null;
 const y=normal.clone().normalize(),d=direction.clone().normalize();
 if(Math.abs(d.dot(y))>1e-4)return null; // A warped edge cannot also be tangent.
 d.addScaledVector(y,-d.dot(y)).normalize();
 const q=pivotQuaternion(base),oldX=worldAxis('x').applyQuaternion(q),oldZ=worldAxis('z').applyQuaternion(q);
 const axis=Math.abs(d.dot(oldX))>=Math.abs(d.dot(oldZ))?'x':'z';
 if(d.dot(axis==='x'?oldX:oldZ)<0)d.negate();
 const x=axis==='x'?d:new THREE.Vector3().crossVectors(y,d).normalize(),z=axis==='z'?d:new THREE.Vector3().crossVectors(x,y).normalize();
 return {record:originRecord(point,new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x,y,z)),previous),axis};
}
const pivotFaceOwners=new WeakMap();
function faceBoundary(hit,mesh){
 const geometry=hit.object.geometry,faces=mesh?.faces,vertices=mesh?.vertices;if(!faces||!vertices)return {};
 let index=geometry.userData?.boxlabTriangleFaces?.[hit.faceIndex];
 if(!Number.isInteger(index)){
  // Read the original Base renderer's fan ordering, never triangulate or snap
  // to a render triangle's internal diagonal. Other layouts require owner data.
  if(geometry.index)return {};
  let cached=pivotFaceOwners.get(geometry);
  if(cached?.faces!==faces){
   const ends=[];let count=0;for(const f of faces){count+=Math.max(0,f.length-2);ends.push(count);}
   cached={faces,ends,valid:count*3===geometry.attributes.position?.count};pivotFaceOwners.set(geometry,cached);
  }
  if(!cached.valid)return {};
  let lo=0,hi=cached.ends.length;while(lo<hi){const mid=(lo+hi)>>>1;if(cached.ends[mid]<=hit.faceIndex)lo=mid+1;else hi=mid;}index=lo;
 }
 const face=faces[index];if(!face||face.some(i=>!vertices[i]))return {};
 return {faceIndex:index,boundary:face.map(i=>vertices[i].clone().applyMatrix4(hit.object.matrixWorld))};
}
function pivotScreen(point,camera,r){
 const p=point.clone().project(camera);if(!p.toArray().every(Number.isFinite)||p.z<-1||p.z>1)return null;
 return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
}
export function nearestPivotEdge(surface,event,camera,canvas,held=null){
 const points=surface?.boundary,r=canvas.getBoundingClientRect();if(!points?.length||!r.width||!r.height)return null;
 const p=new THREE.Vector2(event.clientX,event.clientY);let best=null,previous=null;
 for(let i=0;i<points.length;i++){
  const a=points[i],b=points[(i+1)%points.length],sa=pivotScreen(a,camera,r),sb=pivotScreen(b,camera,r);if(!sa||!sb)continue;
  const ab=sb.clone().sub(sa),length=ab.lengthSq();if(length<1)continue;
  const t=THREE.MathUtils.clamp(p.clone().sub(sa).dot(ab)/length,0,1),distance=p.distanceTo(sa.clone().addScaledVector(ab,t));
  if(distance>(i===held?20:14))continue;
  // Perspective-correct interpolation keeps the snapped point under the
  // pointer even when an edge's endpoints have very different camera depths.
  const da=-a.clone().applyMatrix4(camera.matrixWorldInverse).z,db=-b.clone().applyMatrix4(camera.matrixWorldInverse).z;
  const depth=(1-t)*db+t*da;if(da<=0||db<=0||depth<=0)continue;
  const candidate={index:i,point:a.clone().lerp(b,t*da/depth),direction:b.clone().sub(a),distance};
  if(!edgePivotFrame(candidate.point,surface.normal,candidate.direction,surface.basis))continue;
  if(i===held)previous=candidate;if(!best||distance<best.distance)best=candidate;
 }
 return previous&&(!best||previous.distance<=best.distance+3)?previous:best;
}
export function localScaleVector(point,center,axis,factor,frame){
 point.sub(center);
 if(frame){const q=frame.quaternion;point.applyQuaternion(q.clone().invert());if(axis)point[axis]*=factor;else point.multiplyScalar(factor);point.applyQuaternion(q);}
 else if(axis)point[axis]*=factor;else point.multiplyScalar(factor);
 return point.add(center);
}
export function pickPivotFace(state,canvas,event,faceIndices=null){
 const r=canvas.getBoundingClientRect();if(!r.width||!r.height||!state?.scene||!state.camera)return null;
 const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1)),state.camera);
 const bodies=[];state.scene.traverseVisible(o=>{if(o.visible!==false&&['body','boxlab-inactive-body'].includes(o.userData?.kind))bodies.push(o);});
 const hits=ray.intersectObjects(bodies,false),first=hits[0];if(!first?.face||first.object.userData.kind!=='body')return null;
 const selected=faceIndices===null?null:new Set(faceIndices);
 // Shared-edge triangles can tie in depth. Retain the selected (or latched)
 // polygon without picking through a nearer surface.
 for(const hit of hits){
  if(hit.distance-first.distance>Math.max(1,first.distance)*1e-7)break;
  if(hit.object!==first.object||!hit.face)continue;
  const boundary=faceBoundary(hit,state.mesh);if(selected&&!selected.has(boundary.faceIndex))continue;
  return {point:hit.point,normal:hit.face.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld)),object:hit.object,...boundary};
 }
 if(selected){
  // A ray exactly on a shared edge can hit only ONE of its two triangles.
  // Recover the selected neighbour only on that same real topological edge,
  // using the already-visible hit. Never raycast through another polygon.
  const mesh=state.mesh,nearest=mesh?.faces?.[faceBoundary(first,mesh).faceIndex];
  const nearestEdges=nearest&&new Set(nearest.map((v,i)=>mesh.edgeKey(v,nearest[(i+1)%nearest.length])));
  if(nearestEdges)for(const index of selected){
   const face=mesh.faces[index];if(!face)continue;
   const shared=[];for(let i=0;i<face.length;i++)if(nearestEdges.has(mesh.edgeKey(face[i],face[(i+1)%face.length])))shared.push(i);
   if(!shared.length)continue;
   const boundary=face.map(i=>mesh.vertices[i]?.clone().applyMatrix4(first.object.matrixWorld));if(boundary.some(p=>!p))continue;
   const normal=mesh.faceNormal(index).applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(first.object.matrixWorld));
   if(normal.lengthSq()<1e-12||normal.dot(ray.ray.direction)>=-1e-10)continue;
   for(const i of shared){
    const line=new THREE.Line3(boundary[i],boundary[(i+1)%face.length]),point=line.closestPointToPoint(first.point,true,new THREE.Vector3());
    if(point.distanceTo(first.point)>Math.max(1,line.distance(),first.distance)*1e-7)continue;
    return {point,normal,object:first.object,faceIndex:index,boundary};
   }
  }
 }
 return null;
}
export function installLocalPivot({root,canvas,status,getMode=()=>globalThis.__boxlabSelectionBridge?.mode?.()||'object',pick=pickPivotFace}={}){
 let edit=null,spin=null,placement=null,objectOwner=null,objectList=[],selectionCount=1;
 const manager=()=>globalThis.__boxlabObjectManager,state=()=>globalThis.__boxlabBridgeState;
 // The real manager returns its stable mutable scene array but saves/clones the
 // active mesh on every getter. Retain the array, NEVER an object reference:
 // scene restore splices replacement objects into it. Owner replacement refreshes.
 const objects=()=>{const m=manager();if(m!==objectOwner){objectOwner=m;objectList=m?.objects||[];}return objectList;};
 const active=()=>objects().find(o=>o.id===manager()?.activeId);
 function available(checkSelection=true){
  if(checkSelection)selectionCount=globalThis.__boxlabObjectSelection?.ids?.size||1;
  const o=active(),s=o?.settings||{};
  return !!o&&!o.locked&&o.kind!=='reference'&&!o.sourceId&&!o.booleanRecipe&&!o.arrayRecipe&&!o.curveProfile&&!s.subd&&!Object.values(s.mirror||{}).some(Boolean)&&selectionCount<=1&&!globalThis.__boxlabViewportPaint?.active&&!globalThis.__boxlabEdgeExtrude?.isArmed?.()&&!globalThis.__boxlabVertexExtrude?.isArmed?.()&&!globalThis.__boxlabToolSession?.isActive?.();
 }
 function origin(o=active()){
  if(!o)return null;
  const v=globalThis.__boxlabObjectOrigins?.originFor?.(o,o.id===manager()?.activeId?state()?.mesh:o.mesh);
  if(v)return {...o.origin};
  return o.origin&&[o.origin.x,o.origin.y,o.origin.z].every(Number.isFinite)?{...o.origin}:null;
 }
 function checkpoint(){return globalThis.__boxlabObjectHistory?.checkpoint?.()!==false&&!!globalThis.__boxlabObjectHistory?.checkpoint;}
 function sync(){
  if(edit&&(active()?.id!==edit.id||!available(false)))finish(true);
  root.dataset.pivotEdit=edit?'true':'false';root.dataset.pivotStage=edit?.stage||'';
 }
 function finish(commit=true){
  if(!edit)return false;
  const old=edit;edit=null;spin=null;releasePlacement();
  if(state()?.controls)state().controls.enabled=old.controlsEnabled;
  for(const type of ['touchstart','touchmove','touchend','touchcancel'])window.removeEventListener(type,onCanvasTouch,true);
  window.removeEventListener('pointerdown',onCanvasDown,true);window.removeEventListener('pointermove',onSpinMove,true);window.removeEventListener('pointerup',onSpinEnd,true);window.removeEventListener('pointercancel',onSpinEnd,true);window.removeEventListener('lostpointercapture',onSpinEnd,true);window.removeEventListener('keydown',onKey,true);window.removeEventListener('pagehide',onPageHide);
  const o=objects().find(o=>o.id===old.id);let saved=true;
  if(commit&&o&&JSON.stringify(old.original)!==JSON.stringify(old.draft)){
   if(checkpoint())o.origin={...old.draft};
   else {saved=false;if(status)status.textContent='Pivot could not be saved; original retained';}
  }
  root.dataset.pivotEdit='false';root.dataset.pivotStage='';root.dataset.pivotSnap='';
  if(status&&commit&&saved)status.textContent='Local pivot ready • use the aligned gizmo';
  return true;
 }
 function toggleEdit(){
  if(edit)return finish(true);
  if(!available())return false;
  const o=active(),record=origin(o);if(!record)return false;
  globalThis.__boxlabTotalGizmo?.resetTransient?.({hideFloat:true});globalThis.__boxlabTotalGizmo?.setExpanded?.(true,{reason:'pivot-edit'});
  edit={id:o.id,original:record,draft:{...record,gizmoLocal:true},stage:'place',controlsEnabled:state()?.controls?.enabled};
  if(state()?.controls)state().controls.enabled=false;
  for(const type of ['touchstart','touchmove','touchend','touchcancel'])window.addEventListener(type,onCanvasTouch,{capture:true,passive:false});
  window.addEventListener('pointerdown',onCanvasDown,true);window.addEventListener('pointermove',onSpinMove,true);window.addEventListener('pointerup',onSpinEnd,true);window.addEventListener('pointercancel',onSpinEnd,true);window.addEventListener('lostpointercapture',onSpinEnd,true);window.addEventListener('keydown',onKey,true);window.addEventListener('pagehide',onPageHide);
  sync();if(status)status.textContent='Pivot Edit • drag on a face to place and snap to its edges • centre turns green Y';return true;
 }
 function toggleSpace(){
  if(edit)finish(true);if(!available())return false;const o=active(),record=origin(o);if(!record||!checkpoint())return false;
  o.origin={...record,gizmoLocal:!record.gizmoLocal};globalThis.__boxlabTotalGizmo?.resetTransient?.({hideFloat:true});
  if(status)status.textContent=o.origin.gizmoLocal?'Local pivot and axes':'World axes • selection centre';return true;
 }
 function frame(){
  sync();if(!available(false))return null;const record=edit?.draft||origin();if(!record?.gizmoLocal)return null;
  return {center:new THREE.Vector3(record.x,record.y,record.z),quaternion:pivotQuaternion(record),objectId:active().id};
 }
 function onCanvasTouch(e){if(edit&&e.target===canvas){e.preventDefault();e.stopImmediatePropagation();}}
 function releasePlacement(){const old=placement;placement=null;if(old){try{canvas.releasePointerCapture?.(old.id);}catch{}}}
 function placementFaces(){return getMode()==='face'?[...new Set(globalThis.__boxlabSelectionBridge?.indices?.()||[])]:null;}
 function previewPlacement(e,hit=pick(state(),canvas,e,placement?.surface?.faceIndex===undefined?placementFaces():[placement.surface.faceIndex])){
  if(!placement||!edit)return;
  const surface=placement.surface,candidate=nearestPivotEdge(surface,e,state().camera,canvas,placement.edge);
  let next=null,axis='';
  if(candidate){
   // Check the real visible body just inside the boundary. This permits a
   // silhouette snap without selecting an occluded/back-side edge.
   const i=candidate.index,a=surface.boundary[i],b=surface.boundary[(i+1)%surface.boundary.length],inward=new THREE.Vector3().crossVectors(surface.normal,b.clone().sub(a)).normalize();
   let edgeVisible=false;
   for(const sign of [1,-1]){
    const probe=candidate.point.clone().lerp(a.clone().lerp(b,.5),1e-5).addScaledVector(inward,sign*Math.max(1e-7,a.distanceTo(b)*1e-5)),p=pivotScreen(probe,state().camera,canvas.getBoundingClientRect());
    const visible=p&&pick(state(),canvas,{clientX:p.x,clientY:p.y},[surface.faceIndex]);
    if(visible?.object===surface.object&&visible?.faceIndex===surface.faceIndex){edgeVisible=true;break;}
   }
   if(edgeVisible){
    const snapped=edgePivotFrame(candidate.point,surface.normal,candidate.direction,placement.basis);next=snapped?.record;axis=snapped?.axis||'';
   }
  }
  if(!next&&hit&&(surface.faceIndex===undefined||(hit.object===surface.object&&hit.faceIndex===surface.faceIndex)))next=facePivotFrame(hit.point,surface.normal,placement.basis);
  if(!next)return;
  edit.draft=next;placement.edge=axis?candidate.index:null;root.dataset.pivotSnap=axis;
  if(status)status.textContent=axis?`Pivot • ${axis.toUpperCase()} aligned to edge • green Y stays normal to face`:'Pivot on face • drag to an edge to snap • centre turns green Y';
 }
 function onCanvasDown(e){
  if(!edit)return;
  if(e.target!==canvas){if(!root.contains?.(e.target))finish(true);return;}
  e.preventDefault();e.stopImmediatePropagation();if(e.isPrimary===false||placement||spin)return;
  const hit=pick(state(),canvas,e,placementFaces()),next=hit&&facePivotFrame(hit.point,hit.normal,edit.draft);
  if(next){
   placement={id:e.pointerId,before:{...edit.draft},basis:next,surface:{...hit,basis:next},edge:null};
   edit.draft=next;edit.stage='place';root.dataset.pivotSnap='';canvas.setPointerCapture?.(e.pointerId);
   previewPlacement(e,hit);sync();
  }
 }
 function handle(spec,e){
  if(!edit)return false;
  e.preventDefault();e.stopImmediatePropagation();
  if(placement||spin)return true;
  root.dataset.pivotSnap='';
  if(spec.tool==='move'&&spec.constraint==='free')edit.stage='yaw';
  if(edit.stage==='yaw'&&((spec.tool==='rotate'&&spec.constraint==='y')||(spec.tool==='move'&&spec.constraint==='free'))){
   const f=frame(),p=f.center.clone().project(state().camera),r=canvas.getBoundingClientRect(),center=new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
   spin={id:e.pointerId,start:new THREE.Vector2(e.clientX,e.clientY),vector:new THREE.Vector2(e.clientX,e.clientY).sub(center),center,before:{...edit.draft},changed:false};
   e.currentTarget?.setPointerCapture?.(e.pointerId);
  }
  sync();if(status)status.textContent='Pivot turn • drag green Y (or centre horizontally) • Pivot button finishes';return true;
 }
 function onSpinMove(e){
  if(placement&&e.pointerId===placement.id&&edit){e.preventDefault();e.stopImmediatePropagation();previewPlacement(e);return;}
  if(!spin||e.pointerId!==spin.id||!edit)return;e.preventDefault();e.stopImmediatePropagation();
  const p=new THREE.Vector2(e.clientX,e.clientY),delta=p.clone().sub(spin.start);if(!spin.changed&&delta.length()<8)return;spin.changed=true;
  const v=p.sub(spin.center);let angle=spin.vector.length()>18&&v.length()>18?Math.atan2(spin.vector.x*v.y-spin.vector.y*v.x,spin.vector.dot(v)):delta.x*.012;
  const q=pivotQuaternion(spin.before),axis=worldAxis('y').applyQuaternion(q);
  if(axis.dot(state().camera.getWorldDirection(new THREE.Vector3()))<0)angle=-angle;
  q.premultiply(new THREE.Quaternion().setFromAxisAngle(axis,angle));edit.draft=originRecord(new THREE.Vector3(spin.before.x,spin.before.y,spin.before.z),q,spin.before);
 }
 function onSpinEnd(e){
  if(placement&&e.pointerId===placement.id){
   e.preventDefault();e.stopImmediatePropagation();if((e.type==='pointercancel'||e.type==='lostpointercapture')&&edit){edit.draft={...placement.before};root.dataset.pivotSnap='';}
   else if(edit)previewPlacement(e);releasePlacement();return;
  }
  if(!spin||e.pointerId!==spin.id)return;e.preventDefault();e.stopImmediatePropagation();if((e.type==='pointercancel'||e.type==='lostpointercapture')&&edit)edit.draft={...spin.before};spin=null;
 }
 function onKey(e){if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();finish(false);}}
 function onPageHide(){finish(false);}
 // Origin updates stay with the same scene/history owner as the mesh transform.
 function capture(){const o=active(),r=origin(o);return o&&r?{objectId:o.id,record:r}:null;}
 function update(g,{delta=null,rotation=null,factor=null,axis=null}={}){
  const saved=g.originState;if(!saved||g.m!=='object')return;
  const o=objects().find(o=>o.id===saved.objectId);if(!o)return;
  const p=new THREE.Vector3(saved.record.x,saved.record.y,saved.record.z),q=pivotQuaternion(saved.record);
  if(delta)p.add(delta);
  if(rotation){p.sub(g.center).applyQuaternion(rotation).add(g.center);q.premultiply(rotation);}
  if(factor!==null)localScaleVector(p,g.center,axis,factor,g.localFrame);
  o.origin={...saved.record,x:p.x,y:p.y,z:p.z};if(saved.record.gizmoLocal||['qx','qy','qz','qw'].every(k=>Number.isFinite(saved.record[k])))Object.assign(o.origin,{qx:q.x,qy:q.y,qz:q.z,qw:q.w});
 }
 function restore(g){const saved=g.originState;if(!saved||g.m!=='object')return;const o=objects().find(o=>o.id===saved.objectId);if(o)o.origin={...saved.record};}
 const api={available,frame,capture,update,restore,scale:localScaleVector,toggleEdit,toggleSpace,handle,finish,editing:()=>{sync();return !!edit;},local:()=>!!(edit?.draft||active()?.origin)?.gizmoLocal};
 globalThis.__boxlabLocalPivot=api;return api;
}
