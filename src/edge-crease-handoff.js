// BoxLab v0.36.18.476 — Edge direct-tool exclusivity polish.
// Crease is owned by legacy main.js while newer Edge tools own their own state.
// Route only tool-to-tool handoff through Crease's existing button path.

const crease=document.querySelector('#applyCreaseBtn');

const otherEdgeTools=new Set([
  'loopCutBtn','faceSplitBtn','bevelBtn','edgeSlideBtn','offsetLoopBtn',
  'bridgeEdgesBtn','fillFaceBtn','dissolveLoopBtn','dissolveEdgeBtn','deleteEdgeBtn'
]);

document.addEventListener('pointerdown',event=>{
  if(!crease?.classList.contains('active'))return;
  const button=event.target?.closest?.('button');
  if(!button||!otherEdgeTools.has(button.id))return;
  crease.click();
},true);

document.querySelector('#selectionModes')?.addEventListener('pointerdown',event=>{
  if(!crease?.classList.contains('active'))return;
  const button=event.target?.closest?.('button[data-mode]');
  if(button&&button.dataset.mode!=='edge')crease.click();
},true);

globalThis.__boxlabEdgeCreaseHandoff={version:'0.36.18.476'};
