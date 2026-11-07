// BoxLab v0.36.18.237 — scene-level transactions for object-creating edit tools.
// Extract changes both source geometry and scene object count, so its Undo/Redo
// must not depend on whichever object's mesh-history stack happens to be active.
const VERSION='0.36.18.237';
const status=document.querySelector('#selectionStatus');
const sceneUndo=[];
const sceneRedo=[];
let installed=false;
let pendingExtract=null;

function manager(){return globalThis.__boxlabObjectManager||null;}
function objectHistory(){return globalThis.__boxlabObjectHistory||null;}
function history(){return globalThis.__boxlabHistory||null;}
function cloneHistoryState(value){
  return {
    undo:(value?.undo||[]).map(mesh=>mesh?.clone?mesh.clone():mesh),
    redo:(value?.redo||[]).map(mesh=>mesh?.clone?mesh.clone():mesh)
  };
}
function cloneSettings(settings={}){return{mirror:{...(settings.mirror||{})},subd:!!settings.subd,subdLevel:Number(settings.subdLevel||1),cage:settings.cage!==false};}
function cloneScene(snapshot){
  if(!snapshot)return null;
  return {
    activeId:snapshot.activeId,
    selected:[...(snapshot.selected||[])],
    multi:!!snapshot.multi,
    objects:(snapshot.objects||[]).map(object=>({
      ...object,
      mesh:object.mesh?.clone?object.mesh.clone():object.mesh,
      settings:cloneSettings(object.settings),
      history:cloneHistoryState(object.history),
      origin:object.origin?{...object.origin}:null
    }))
  };
}
function capture(){
  const m=manager();m?.saveActive?.();
  return cloneScene(objectHistory()?.capture?.()||null);
}
function restore(snapshot){
  const copy=cloneScene(snapshot);if(!copy)return false;
  objectHistory()?.restore?.(copy);
  queueMicrotask(()=>{globalThis.__boxlabTopologyGate?.sync?.();});
  return true;
}
function n(value){return Number.isFinite(value)?Number(value).toPrecision(12):String(value);}
function meshSignature(mesh){
  if(!mesh)return'none';
  const vertices=(mesh.vertices||[]).map(v=>`${n(v?.x)},${n(v?.y)},${n(v?.z)}`).join(';');
  const faces=(mesh.faces||[]).map(face=>(face||[]).join(',')).join(';');
  return `${mesh.vertices?.length||0}/${mesh.faces?.length||0}|${vertices}|${faces}`;
}
function sceneSignature(snapshot){
  if(!snapshot)return'';
  const objects=(snapshot.objects||[]).map(object=>`${object.id}:${object.visible!==false?1:0}:${object.locked?1:0}:${object.kind||''}:${meshSignature(object.mesh)}`).join('||');
  const selected=[...(snapshot.selected||[])].sort((a,b)=>a-b).join(',');
  return `${snapshot.activeId}|${snapshot.multi?1:0}|${selected}|${objects}`;
}
function begin(label){
  const before=capture();if(!before)return null;
  return{label,before,beforeSig:sceneSignature(before)};
}
function commit(token){
  if(!token)return false;
  const after=capture();if(!after)return false;
  const afterSig=sceneSignature(after);if(afterSig===token.beforeSig)return false;
  sceneUndo.push({...token,after,afterSig});sceneRedo.length=0;return true;
}
function install(){
  const h=history();if(!h)return false;
  if(h.__boxlabSceneTransactions237){installed=true;return true;}
  const baseUndo=h.undo.bind(h),baseRedo=h.redo.bind(h),baseClear=h.clear?.bind(h);
  h.undo=function(current){
    const tx=sceneUndo[sceneUndo.length-1];
    if(tx){
      const now=capture();
      if(now&&sceneSignature(now)===tx.afterSig){
        sceneUndo.pop();sceneRedo.push(tx);restore(tx.before);
        if(status)status.textContent=`Undo ${tx.label} • scene restored`;
        return current;
      }
    }
    return baseUndo(current);
  };
  h.redo=function(current){
    const tx=sceneRedo[sceneRedo.length-1];
    if(tx){
      const now=capture();
      if(now&&sceneSignature(now)===tx.beforeSig){
        sceneRedo.pop();sceneUndo.push(tx);restore(tx.after);
        if(status)status.textContent=`Redo ${tx.label} • scene restored`;
        return current;
      }
    }
    return baseRedo(current);
  };
  if(baseClear)h.clear=function(){sceneUndo.length=0;sceneRedo.length=0;return baseClear();};
  h.__boxlabSceneTransactions237=true;installed=true;return true;
}

document.addEventListener('click',event=>{
  if(!event.target?.closest?.('#extractFacesBtn'))return;
  install();
  pendingExtract=begin('Extract Faces');
  queueMicrotask(()=>{
    const token=pendingExtract;pendingExtract=null;
    if(token)commit(token);
  });
},true);

window.addEventListener('boxlab-object-manager-ready',()=>setTimeout(install,0));
[0,60,250,700].forEach(delay=>setTimeout(install,delay));

globalThis.__boxlabSceneTransactions={version:VERSION,begin,commit,capture,restore,get undoCount(){return sceneUndo.length;},get redoCount(){return sceneRedo.length;},get installed(){return installed;}};
