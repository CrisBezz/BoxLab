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
function finishBridge(result,before){
  const history=globalThis.__boxlabHistory;if(!result||!history)return false;history.push(before);
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  document.querySelector('#selectionModes button[data-mode="face"]')?.click();
  setTimeout(()=>{if(status)status.textContent=`Bridge created • ${result.faceIndices.length} quads`;sync();},0);return true;
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
