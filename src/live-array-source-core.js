// Staged source editing. Existing Array, instance, manager and history owners
// perform all geometry and scene operations; no modelling/gesture kernel here.
import * as THREE from 'three';
import {createArrayRecipe,evaluateArray,reopenArray} from './live-array-core.js?v=0.36.18.842';
import {transformEditableMesh,meshesNear} from './instance-core.js?v=0.36.18.343';
const signature=mesh=>JSON.stringify(createArrayRecipe(mesh,2,[1,0,0]).source);
export function createArraySourceEditor({manager,objectHistory,history,busy=()=>false,changed=()=>{}}){
 let session=null;
 const fail=reason=>({ok:false,reason});
 const valid=object=>object&&!object.locked&&object.kind!=='reference'&&!object.sourceId&&!object.booleanRecipe&&!object.glbPassthrough&&!object.materials&&!object.textures&&!Object.values(object.settings?.mirror||{}).some(Boolean);
 function context(){
  if(!session)return fail('No Array source edit is open');
  const m=manager(),object=m?.objects?.find(o=>o.id===session.id);
  if(m?.activeId!==session.id||!valid(object)||object.arrayRecipe)return fail('Array source context changed');
  return{ok:true,object};
 }
 function restoreTokens(saved){
  const h=history();h.undoStack.splice(0,h.undoStack.length,...saved.undo);h.redoStack.splice(0,h.redoStack.length,...saved.redo);
 }
 function restore(saved){
  const m=manager(),original=saved.scene.objects.find(o=>o.id===saved.id);
  // Restore the live mesh BEFORE scene restore: its objects getter saves the
  // active mesh and must never overwrite the restored procedural result.
  m.activate(saved.id);
  if(!m.replaceActiveMesh(original.mesh))throw Error('Could not restore the Array result');
  restoreTokens(saved);objectHistory().restore(saved.scene);restoreTokens(saved);
 }
 function open(id,parameters=null){
  if(session||busy())return fail('Finish the current tool first');
  const m=manager(),owner=objectHistory(),h=history();
  if(!m?.replaceActiveMesh||!owner?.capture||!owner?.restore||!owner?.checkpointSnapshot||!h)return fail('Scene history is not ready');
  if(m.activeId!==id)return fail('Select the Live Array first');
  const object=m.objects.find(o=>o.id===id);
  if(!valid(object)||!object.arrayRecipe)return fail('Select an independent Live Array without Mirror');
  let opened,world,parametersChanged;
  try{
   opened=reopenArray(object);
   if(parameters)Object.assign(opened,{count:parameters.count,endpoint:new THREE.Vector3(...parameters.endpoint),rotation:parameters.rotation,scale:parameters.scale,placement:parameters.placement});
   const candidate=evaluateArray(createArrayRecipe(opened.source,opened.count,opened.endpoint.toArray(),opened));
   parametersChanged=!meshesNear(candidate,object.mesh);
   world=transformEditableMesh(opened.source,new THREE.Matrix4().fromArray(opened.placement));
  }catch(error){return fail(error.message);}
  const saved={id,opened,parametersChanged,scene:owner.capture(),undo:[...h.undoStack],redo:[...h.redoStack],initial:signature(world)};
  session=saved;
  // Keep one scene object throughout; procedural metadata is private until Apply.
  delete object.arrayRecipe;delete object.curveProfile;
  try{
   if(!m.replaceActiveMesh(world))throw Error('Could not isolate Array source');
   h.undoStack.length=0;h.redoStack.length=0;m.saveActive?.();
  }catch(error){restore(saved);session=null;return fail(error.message);}
  changed();return{ok:true};
 }
 function cancel(){
  if(!session||busy())return false;
  const saved=session;restore(saved);session=null;changed({cancelled:saved.id});return true;
 }
 function apply(){
  if(busy())return fail('Finish the current tool first');
  const e=context();if(!e.ok)return e;
  const saved=session;
  if(!saved.parametersChanged&&signature(e.object.mesh)===saved.initial){cancel();return{ok:true,unchanged:true};}
  let recipe,result;
  try{
   const inverse=new THREE.Matrix4().fromArray(saved.opened.placement).invert();
   const local=transformEditableMesh(e.object.mesh,inverse);
   recipe=createArrayRecipe(local,saved.opened.count,saved.opened.endpoint.toArray(),saved.opened);
   result=evaluateArray(recipe);
   if(!result.vertices.length||result.vertices.some(v=>![v.x,v.y,v.z].every(Number.isFinite)))throw Error('Source has no valid geometry');
  }catch(error){return fail(error.message);}
  // Retire private component Undo entries and restore the original scene contract
  // before the single committed source edit. History metadata stays with its owner.
  restore(saved);
  if(!manager().replaceActiveMesh(result)){session=null;changed({cancelled:saved.id});return fail('Could not update the Array');}
  const object=manager().objects.find(o=>o.id===saved.id);object.arrayRecipe=recipe;
  // A changed source is now ordinary authored geometry, not an old Curve/Balloon.
  delete object.curveProfile;
  restoreTokens(saved);session=null;
  objectHistory().checkpointSnapshot(saved.scene,saved.scene.objects.find(o=>o.id===saved.id).mesh);
  manager().saveActive?.();changed({applied:saved.id});return{ok:true};
 }
 return{open,apply,cancel,context,active:()=>!!session,state:()=>session};
}
