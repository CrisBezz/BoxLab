// BoxLab v0.36.18.476 — Edge direct-tool exclusivity polish.
// Crease is owned by legacy main.js while newer Edge tools own their own state.
// Route only tool-to-tool handoff through Crease's existing button path.

const crease=document.querySelector('#applyCreaseBtn');
const loop=document.querySelector('#loopCutBtn');
const bevel=document.querySelector('#bevelBtn');

const otherEdgeTools=new Set([
  'loopCutBtn','faceSplitBtn','bevelBtn','edgeSlideBtn','offsetLoopBtn',
  'bridgeEdgesBtn','fillFaceBtn','dissolveLoopBtn','dissolveEdgeBtn','deleteEdgeBtn'
]);

document.addEventListener('pointerdown',event=>{
  const button=event.target?.closest?.('button');
  if(!button)return;
  if(button.id==='bevelBtn'&&loop?.classList.contains('active'))loop.click();
  else if(button.id==='loopCutBtn'&&bevel?.classList.contains('active'))bevel.click();
},true);

document.addEventListener('pointerdown',event=>{
  if(!crease?.classList.contains('active'))return;
  const button=event.target?.closest?.('button');
  if(!button)return;
  const transformTool=!!button.closest?.('#toolModes');
  if(!otherEdgeTools.has(button.id)&&!transformTool)return;
  crease.click();
},true);

document.querySelector('#selectionModes')?.addEventListener('pointerdown',event=>{
  if(!crease?.classList.contains('active'))return;
  const button=event.target?.closest?.('button[data-mode]');
  if(button&&button.dataset.mode!=='edge')crease.click();
},true);

globalThis.__boxlabEdgeCreaseHandoff={version:'0.36.18.477'};
