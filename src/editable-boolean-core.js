// Recipe/session orchestration only. Boolean geometry and scene history retain
// their existing owners. This first step edits independent Object transforms.
export const VERSION='0.36.18.798';
const operations=new Set(['union','difference','intersection']);
export function booleanMeshSignature(mesh){
  return JSON.stringify([mesh.vertices.map(v=>[v.x,v.y,v.z]),mesh.faces,mesh.faceGroups,[...mesh.creases]]);
}
function independent(object){
  return object&&object.kind!=='reference'&&!object.locked&&!object.sourceId&&object.groupId==null&&!object.booleanRecipe
    &&!object.settings?.subd&&!Object.values(object.settings?.mirror||{}).some(Boolean);
}
export function recordBooleanRecipe(result,eligibility,operation){
  if(eligibility?.kind!=='objects'||!operations.has(operation)||!independent(eligibility.active)||!independent(eligibility.other))return false;
  result.booleanRecipe={version:1,operation,aId:eligibility.active.id,bId:eligibility.other.id,resultSignature:booleanMeshSignature(result.mesh)};
  return true;
}
export function editableBooleanEligibility(objects,result){
  const recipe=result?.booleanRecipe;
  if(!recipe||recipe.version!==1||!operations.has(recipe.operation))return{ok:false,reason:'This object has no editable Boolean sources'};
  if(result.locked||result.kind==='reference'||result.sourceId)return{ok:false,reason:'Unlock an independent Boolean result'};
  if(booleanMeshSignature(result.mesh)!==recipe.resultSignature)return{ok:false,reason:'Result geometry was edited; recreate the Boolean to edit its sources'};
  const a=objects.find(o=>o.id===recipe.aId),b=objects.find(o=>o.id===recipe.bId);
  if(!independent(a)||!independent(b)||a===b||a===result||b===result)return{ok:false,reason:'Boolean sources must be present, independent, unlocked objects without modifiers'};
  return{ok:true,result,a,b,recipe};
}
export function createEditableBooleanController({manager,objectHistory,history,solve,changed=()=>{},busy=()=>false}){
  let session=null;
  const getObjects=()=>manager().objects;
  const fail=reason=>({ok:false,reason});
  function context(){
    if(!session)return fail('No Boolean edit is open');
    const objects=getObjects(),result=objects.find(o=>o.id===session.resultId),a=objects.find(o=>o.id===session.aId),b=objects.find(o=>o.id===session.bId);
    if(!result||!independent(a)||!independent(b)||result.locked||result.sourceId||result.kind==='reference')return fail('Boolean edit context changed');
    if(![a.id,b.id].includes(manager().activeId))return fail('Select source A or B while editing');
    if(booleanMeshSignature(result.mesh)!==session.resultSignature)return fail('Boolean result changed during editing');
    return{ok:true,result,a,b};
  }
  function restoreTokens(){
    history().undoStack.splice(0,history().undoStack.length,...session.undo);
    history().redoStack.splice(0,history().redoStack.length,...session.redo);
  }
  function open(resultId){
    if(session||busy())return fail('Finish the current edit first');
    const m=manager(),h=history(),owner=objectHistory();
    if(!m?.replaceActiveMesh||!h||!owner?.capture||!owner?.restore||!owner?.checkpointSnapshot)return fail('Scene history is not ready');
    if(m.activeId!==resultId)return fail('Select the Boolean result first');
    m.saveActive?.();
    const e=editableBooleanEligibility(getObjects(),getObjects().find(o=>o.id===resultId));if(!e.ok)return e;
    const scene=owner.capture();
    session={scene,undo:[...h.undoStack],redo:[...h.redoStack],resultId,aId:e.a.id,bId:e.b.id,operation:e.recipe.operation,resultSignature:e.recipe.resultSignature,preview:null,previewSignature:null};
    session.initialSignature=signature(e);
    e.result.visible=false;e.a.visible=true;e.b.visible=true;
    m.activate(e.a.id);changed();return{ok:true};
  }
  function choose(id){
    if(!session||busy()||![session.aId,session.bId].includes(id))return false;
    manager().activate(id);changed();return true;
  }
  function operation(value){
    if(!session||busy()||!operations.has(value))return false;
    session.operation=value;session.previewSignature=null;changed();return true;
  }
  const signature=e=>JSON.stringify([session.operation,booleanMeshSignature(e.a.mesh),booleanMeshSignature(e.b.mesh)]);
  function update(){
    if(busy())return fail('Finish the transform first');
    const e=context();if(!e.ok)return e;
    let result;try{result=solve(e.a.mesh.clone(),e.b.mesh.clone(),session.operation);}catch(error){return fail(error.message||'Boolean calculation failed');}
    if(!result?.ok)return fail(result?.reason||'Boolean calculation failed');
    session.preview=result.mesh.clone();session.previewSignature=signature(e);changed();return{ok:true};
  }
  function cancel(){
    if(!session||busy())return false;
    const m=manager(),saved=session;
    // Switch away from the edited source BEFORE restoring the scene: activation
    // saves live geometry and must not overwrite a source we have just restored.
    m.activate(saved.resultId);
    const currentId=m.activeId,original=saved.scene.objects.find(o=>o.id===currentId);
    if(original)m.replaceActiveMesh(original.mesh);
    restoreTokens();objectHistory().restore(saved.scene);restoreTokens();
    session=null;changed();return true;
  }
  function apply(){
    if(busy())return fail('Finish the transform first');
    let e=context();if(!e.ok)return e;
    if(signature(e)===session.initialSignature){cancel();return{ok:true,unchanged:true};}
    // Never apply a stale preview, including a move made after Update.
    if(!session.preview||signature(e)!==session.previewSignature){const result=update();if(!result.ok)return result;e=context();}
    const saved=session,m=manager();
    m.activate(saved.resultId);
    if(!m.replaceActiveMesh(saved.preview))return fail('Could not replace the Boolean result');
    const objects=getObjects(),result=objects.find(o=>o.id===saved.resultId);
    for(const object of objects){const original=saved.scene.objects.find(o=>o.id===object.id);if(original)object.history=original.history;}
    e.a.visible=false;e.b.visible=false;result.visible=true;
    result.booleanRecipe={...result.booleanRecipe,operation:saved.operation,resultSignature:booleanMeshSignature(result.mesh)};
    restoreTokens();
    session=null;
    objectHistory().checkpointSnapshot(saved.scene,saved.scene.objects.find(o=>o.id===saved.resultId).mesh);
    changed({applied:result.id});return{ok:true};
  }
  return{open,choose,operation,update,cancel,apply,context,active:()=>!!session,state:()=>session};
}
