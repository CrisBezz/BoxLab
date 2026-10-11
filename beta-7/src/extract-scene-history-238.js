// BoxLab v0.36.18.238 — deterministic scene Undo/Redo for Extract Faces.
// Capture-phase button/gesture handlers consume Extract transactions before the
// per-object mesh history handlers when the current scene matches the transaction.
const VERSION='0.36.18.238';
const status=document.querySelector('#selectionStatus');
const canvas=document.querySelector('#viewport');
const undoButton=document.querySelector('#undoBtn');
const redoButton=document.querySelector('#redoBtn');
const undoStack=[];
const redoStack=[];
let pending=null;
const gesture={active:false,maxTouches:0,startedAt:0,starts:new Map(),moved:false};
const TAP_MAX_MS=320,TAP_MAX_MOVE=12;

function objectHistory(){return globalThis.__boxlabObjectHistory||null;}
function manager(){return globalThis.__boxlabObjectManager||null;}
function cloneHistoryState(value){return{undo:(value?.undo||[]).map(mesh=>mesh?.clone?mesh.clone():mesh),redo:(value?.redo||[]).map(mesh=>mesh?.clone?mesh.clone():mesh)};}
function cloneSettings(settings={}){return{mirror:{...(settings.mirror||{})},subd:!!settings.subd,subdLevel:Number(settings.subdLevel||1),cage:settings.cage!==false};}
function cloneScene(snapshot){
  if(!snapshot)return null;
  return{activeId:snapshot.activeId,selected:[...(snapshot.selected||[])],multi:!!snapshot.multi,objects:(snapshot.objects||[]).map(object=>({
    ...object,mesh:object.mesh?.clone?object.mesh.clone():object.mesh,settings:cloneSettings(object.settings),history:cloneHistoryState(object.history),origin:object.origin?{...object.origin}:null
  }))};
}
function capture(){manager()?.saveActive?.();return cloneScene(objectHistory()?.capture?.()||null);}
function restore(snapshot){const copy=cloneScene(snapshot);if(!copy)return false;objectHistory()?.restore?.(copy);queueMicrotask(()=>globalThis.__boxlabTopologyGate?.sync?.());return true;}
function n(value){return Number.isFinite(value)?Number(value).toPrecision(12):String(value);}
function meshSignature(mesh){
  if(!mesh)return'none';let hash=2166136261;
  const push=value=>{const text=String(value);for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619);}};
  push(mesh.vertices?.length||0);push('/');push(mesh.faces?.length||0);
  for(const v of mesh.vertices||[]){push(n(v?.x));push(',');push(n(v?.y));push(',');push(n(v?.z));push(';');}
  for(const face of mesh.faces||[]){push((face||[]).join(','));push(';');}
  return(hash>>>0).toString(16);
}
function sceneSignature(snapshot){
  if(!snapshot)return'';
  const objects=(snapshot.objects||[]).map(o=>`${o.id}:${o.visible!==false?1:0}:${o.locked?1:0}:${o.kind||''}:${meshSignature(o.mesh)}`).join('|');
  return `${snapshot.activeId}|${objects}`;
}
function beginExtract(){const before=capture();if(!before)return null;return{label:'Extract Faces',before,beforeSig:sceneSignature(before)};}
function commitExtract(token){
  if(!token)return false;const after=capture();if(!after)return false;const afterSig=sceneSignature(after);if(afterSig===token.beforeSig)return false;
  undoStack.push({...token,after,afterSig});redoStack.length=0;return true;
}
function consumeUndo(){
  const tx=undoStack[undoStack.length-1];if(!tx)return false;const now=capture();if(!now||sceneSignature(now)!==tx.afterSig)return false;
  undoStack.pop();redoStack.push(tx);restore(tx.before);if(status)status.textContent='Undo Extract Faces • source restored • extracted object removed';return true;
}
function consumeRedo(){
  const tx=redoStack[redoStack.length-1];if(!tx)return false;const now=capture();if(!now||sceneSignature(now)!==tx.beforeSig)return false;
  redoStack.pop();undoStack.push(tx);restore(tx.after);if(status)status.textContent='Redo Extract Faces • extracted object restored';return true;
}
function interceptButton(event){
  const target=event.target?.closest?.('#undoBtn,#redoBtn');if(!target)return;
  const consumed=target===undoButton?consumeUndo():target===redoButton?consumeRedo():false;
  if(consumed){event.preventDefault();event.stopImmediatePropagation();}
}
function touchStart(event){
  if(event.target!==canvas)return;
  if(!gesture.active){gesture.active=true;gesture.maxTouches=event.touches.length;gesture.startedAt=performance.now();gesture.starts.clear();gesture.moved=false;}
  gesture.maxTouches=Math.max(gesture.maxTouches,event.touches.length);
  for(const t of event.touches)if(!gesture.starts.has(t.identifier))gesture.starts.set(t.identifier,{x:t.clientX,y:t.clientY});
}
function touchMove(event){
  if(!gesture.active)return;gesture.maxTouches=Math.max(gesture.maxTouches,event.touches.length);
  for(const t of event.touches){const s=gesture.starts.get(t.identifier);if(s&&Math.hypot(t.clientX-s.x,t.clientY-s.y)>TAP_MAX_MOVE){gesture.moved=true;break;}}
}
function touchEnd(event){
  if(!gesture.active||event.touches.length!==0)return;
  const tap=!gesture.moved&&performance.now()-gesture.startedAt<=TAP_MAX_MS,fingers=gesture.maxTouches;
  gesture.active=false;gesture.maxTouches=0;gesture.starts.clear();gesture.moved=false;
  if(!tap)return;
  const consumed=fingers===2?consumeUndo():fingers===3?consumeRedo():false;
  if(consumed){event.preventDefault();event.stopImmediatePropagation();}
}

document.addEventListener('click',event=>{
  if(!event.target?.closest?.('#extractFacesBtn'))return;
  pending=beginExtract();
  setTimeout(()=>{const token=pending;pending=null;if(token)commitExtract(token);},0);
},true);
document.addEventListener('click',interceptButton,true);
canvas?.addEventListener('touchstart',touchStart,{capture:true,passive:true});
canvas?.addEventListener('touchmove',touchMove,{capture:true,passive:true});
canvas?.addEventListener('touchend',touchEnd,{capture:true,passive:false});
canvas?.addEventListener('touchcancel',()=>{gesture.active=false;gesture.maxTouches=0;gesture.starts.clear();gesture.moved=false;},{capture:true,passive:true});

globalThis.__boxlabExtractSceneHistory238={version:VERSION,capture,restore,consumeUndo,consumeRedo,get undoCount(){return undoStack.length;},get redoCount(){return redoStack.length;}};
