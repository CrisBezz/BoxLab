const edgeButton = document.querySelector('#bridgeEdgesBtn');
const faceButton = document.querySelector('#bridgeFacesBtn');
const status = document.querySelector('#selectionStatus');
const multiToggle = document.querySelector('#multiSelectToggle');

function state(){ return globalThis.__boxlabBridgeState; }
function selectionBridge(){ return globalThis.__boxlabSelectionBridge; }
function currentMesh(){ return state()?.mesh || null; }
function selected(type){
  const bridge=selectionBridge();
  if(bridge?.mode?.()===type) return [...new Set(bridge.indices?.()||[])];
  return type==='edge' ? [...new Set(state()?.selectedEdges||[])] : [...new Set(state()?.selectedFaces||[])];
}
function edgeInfo(){ const mesh=currentMesh(); return mesh?.bridgeEdgeSelectionInfo?.(selected('edge')) || null; }
function faceInfo(){ const mesh=currentMesh(); return mesh?.bridgeFaceSelectionInfo?.(selected('face')) || null; }
function sync(){ if(edgeButton)edgeButton.disabled=!edgeInfo(); if(faceButton)faceButton.disabled=!faceInfo(); }
function finishBridge(result,before,{selectCreated=false,source='legacy'}={}){
  const history=globalThis.__boxlabHistory;if(!result||!history)return false;history.push(before);
  const created=[...new Set(result.faceIndices||[])].filter(Number.isInteger);
  const noun=result.unequal?'face':'quad';
  document.querySelector('#selectionModes button[data-mode="face"]')?.click();
  setTimeout(()=>{
    selectionBridge()?.set?.('face',selectCreated?created:[]);
    if(status)status.textContent=selectCreated
      ? `Bridge created • ${created.length} ${noun}${created.length===1?'':'s'} selected`
      : `Bridge created • ${created.length} ${noun}${created.length===1?'':'s'} • selection cleared`;
    sync();
    window.dispatchEvent(new CustomEvent('boxlab-bridge-complete',{detail:{created:[...created],source,selected:selectCreated}}));
  },0);return true;
}

function bridgeEdgesFromHub(options={}){
  const mesh=currentMesh(),ids=[...new Set(options.ids||selected('edge'))].filter(Number.isInteger);
  const info=mesh?.bridgeEdgeSelectionInfo?.(ids);
  if(!mesh||!info||!globalThis.__boxlabHistory)return false;
  const before=mesh.clone(),result=mesh.bridgeSelectedEdges(ids);
  return finishBridge(result,before,{selectCreated:true,source:'selection-hub-edge'});
}
edgeButton?.addEventListener('click',event=>{
  const mesh=currentMesh(),ids=selected('edge'),info=mesh?.bridgeEdgeSelectionInfo?.(ids);if(!mesh||!info||!globalThis.__boxlabHistory)return;
  event.preventDefault();event.stopImmediatePropagation();const before=mesh.clone(),result=mesh.bridgeSelectedEdges(ids);finishBridge(result,before);
},true);
faceButton?.addEventListener('click',()=>{
  const mesh=currentMesh(),ids=selected('face'),info=mesh?.bridgeFaceSelectionInfo?.(ids);if(!mesh||!info||!globalThis.__boxlabHistory)return;
  const before=mesh.clone(),result=mesh.bridgeSelectedFaces(ids);finishBridge(result,before);
});
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('click',()=>queueMicrotask(sync),true);
sync();


globalThis.__boxlabBridgeUI={
  version:'0.36.18.676',
  bridgeEdgesFromHub,
  edgeAvailable:()=>!!edgeInfo(),
  faceAvailable:()=>!!faceInfo()
};
