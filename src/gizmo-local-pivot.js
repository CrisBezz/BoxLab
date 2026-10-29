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
export function localScaleVector(point,center,axis,factor,frame){
 point.sub(center);
 if(frame){const q=frame.quaternion;point.applyQuaternion(q.clone().invert());if(axis)point[axis]*=factor;else point.multiplyScalar(factor);point.applyQuaternion(q);}
 else if(axis)point[axis]*=factor;else point.multiplyScalar(factor);
 return point.add(center);
}
export function pickPivotFace(state,canvas,event){
 const r=canvas.getBoundingClientRect();if(!r.width||!r.height||!state?.scene||!state.camera)return null;
 const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1)),state.camera);
 const bodies=[];state.scene.traverseVisible(o=>{if(o.visible!==false&&['body','boxlab-inactive-body'].includes(o.userData?.kind))bodies.push(o);});
 const hit=ray.intersectObjects(bodies,false)[0];if(!hit?.face||hit.object.userData.kind!=='body')return null;
 return {point:hit.point,normal:hit.face.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld))};
}
export function installLocalPivot({root,canvas,status,getMode=()=>globalThis.__boxlabSelectionBridge?.mode?.()||'object',pick=pickPivotFace}={}){
 let edit=null,spin=null,objectOwner=null,objectList=[],selectionCount=1;
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
  const old=edit;edit=null;spin=null;
  if(state()?.controls)state().controls.enabled=old.controlsEnabled;
  for(const type of ['touchstart','touchmove','touchend','touchcancel'])window.removeEventListener(type,onCanvasTouch,true);
  window.removeEventListener('pointerdown',onCanvasDown,true);window.removeEventListener('pointermove',onSpinMove,true);window.removeEventListener('pointerup',onSpinEnd,true);window.removeEventListener('pointercancel',onSpinEnd,true);window.removeEventListener('keydown',onKey,true);window.removeEventListener('pagehide',onPageHide);
  const o=objects().find(o=>o.id===old.id);let saved=true;
  if(commit&&o&&JSON.stringify(old.original)!==JSON.stringify(old.draft)){
   if(checkpoint())o.origin={...old.draft};
   else {saved=false;if(status)status.textContent='Pivot could not be saved; original retained';}
  }
  root.dataset.pivotEdit='false';root.dataset.pivotStage='';
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
  window.addEventListener('pointerdown',onCanvasDown,true);window.addEventListener('pointermove',onSpinMove,true);window.addEventListener('pointerup',onSpinEnd,true);window.addEventListener('pointercancel',onSpinEnd,true);window.addEventListener('keydown',onKey,true);window.addEventListener('pagehide',onPageHide);
  sync();if(status)status.textContent='Pivot Edit • tap a face, then tap the gizmo centre to turn around green Y';return true;
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
 function onCanvasDown(e){
  if(!edit)return;
  if(e.target!==canvas){if(!root.contains?.(e.target))finish(true);return;}
  if(e.isPrimary===false)return;e.preventDefault();e.stopImmediatePropagation();
  const hit=pick(state(),canvas,e),next=hit&&facePivotFrame(hit.point,hit.normal,edit.draft);
  if(next){edit.draft=next;edit.stage='place';if(status)status.textContent='Pivot on face • tap centre, then drag green Y to turn';sync();}
 }
 function handle(spec,e){
  if(!edit)return false;
  e.preventDefault();e.stopImmediatePropagation();
  if(spec.tool==='move'&&spec.constraint==='free')edit.stage='yaw';
  if(edit.stage==='yaw'&&((spec.tool==='rotate'&&spec.constraint==='y')||(spec.tool==='move'&&spec.constraint==='free'))){
   const f=frame(),p=f.center.clone().project(state().camera),r=canvas.getBoundingClientRect(),center=new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
   spin={id:e.pointerId,start:new THREE.Vector2(e.clientX,e.clientY),vector:new THREE.Vector2(e.clientX,e.clientY).sub(center),center,before:{...edit.draft},changed:false};
   e.currentTarget?.setPointerCapture?.(e.pointerId);
  }
  sync();if(status)status.textContent='Pivot turn • drag green Y (or centre horizontally) • Pivot button finishes';return true;
 }
 function onSpinMove(e){
  if(!spin||e.pointerId!==spin.id||!edit)return;e.preventDefault();e.stopImmediatePropagation();
  const p=new THREE.Vector2(e.clientX,e.clientY),delta=p.clone().sub(spin.start);if(!spin.changed&&delta.length()<8)return;spin.changed=true;
  const v=p.sub(spin.center);let angle=spin.vector.length()>18&&v.length()>18?Math.atan2(spin.vector.x*v.y-spin.vector.y*v.x,spin.vector.dot(v)):delta.x*.012;
  const q=pivotQuaternion(spin.before),axis=worldAxis('y').applyQuaternion(q);
  if(axis.dot(state().camera.getWorldDirection(new THREE.Vector3()))<0)angle=-angle;
  q.premultiply(new THREE.Quaternion().setFromAxisAngle(axis,angle));edit.draft=originRecord(new THREE.Vector3(spin.before.x,spin.before.y,spin.before.z),q,spin.before);
 }
 function onSpinEnd(e){if(!spin||e.pointerId!==spin.id)return;e.preventDefault();e.stopImmediatePropagation();if(e.type==='pointercancel'&&edit)edit.draft={...spin.before};spin=null;}
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
