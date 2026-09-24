const objectTools=document.querySelector('[data-mode-tools="object"]');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');

function active(selector){return !!document.querySelector(selector)?.classList.contains('active');}
function shown(node,on,display=''){if(!node)return;node.style.display=on?display:'none';}
function showPair(rowId,on){
  const row=document.querySelector(rowId);if(!row)return;
  shown(row,on,row.dataset.boxlabDisplay||'grid');
  const next=row.nextElementSibling;
  if(next&&/Readout|readout/i.test(next.id||'')||next?.style?.fontSize==='10px')shown(next,on,'block');
}
function syncSessionShells(){
  document.querySelectorAll('.boxlab-tool-session-shell').forEach(shell=>{
    const inHost=shell.parentElement?.id==='boxlabToolSessionHost';
    if(inHost){shell.style.display='';return;}
    shell.style.display=shell.hidden?'none':'';
  });
}
function syncFace(){
  const extrude=active('#extrudeBtn')||document.querySelector('#extrudeBtn')?.classList.contains('boxlab-direct-stable');
  const inset=active('#insetBtn')||document.querySelector('#insetBtn')?.classList.contains('boxlab-direct-stable');
  const direct=extrude||inset;
  showPair('#precisionFaceRow',direct);
  const row=document.querySelector('#precisionFaceRow');
  const label=row?.querySelector('span');
  if(label&&direct)label.textContent=extrude?'Extrude Exact':'Inset Exact';
}
function syncVertex(){
  const slide=active('#vertexSlideBtn'),bevel=active('#vertexBevelBtn');
  showPair('#precisionVertexSlideRow',slide);
  showPair('#precisionVertexBevelRow',bevel);
  shown(vertexTools?.querySelector('.vertex-bevel-options'),bevel,'grid');
}
function syncEdge(){
  const bevel=active('#bevelBtn'),slide=active('#edgeSlideBtn'),offset=active('#offsetLoopBtn'),loop=active('#loopCutBtn'),crease=active('#applyCreaseBtn');
  showPair('#precisionEdgeBevelRow',bevel);
  showPair('#precisionEdgeSlideRow',slide);
  showPair('#precisionOffsetLoopRow',offset);
  edgeTools?.querySelectorAll('.bevel-option > .range-row').forEach(row=>shown(row,bevel,'grid'));
  shown(edgeTools?.querySelector('.loop-cut-option'),loop,'grid');
  shown(edgeTools?.querySelector('.offset-option'),offset,'grid');
  shown(edgeTools?.querySelector('.crease-options'),crease,'block');
  const loopSlide=edgeTools?.querySelector('.loop-slide-option');
  shown(loopSlide,!!loopSlide?.querySelector('input')&&!loopSlide.querySelector('input').disabled,'grid');
  const revolve=globalThis.__boxlabRevolve;
  shown(edgeTools?.querySelector('.revolve-controls'),!!revolve?.active,'block');
}
function ensureEdgeRevolveLauncher(){
  const controls=edgeTools?.querySelector('.revolve-controls');
  const source=controls?.querySelector('#revolveBtn');
  if(!controls||!source||document.querySelector('#edgeRevolveLaunchRow'))return;
  const row=document.createElement('div');
  row.id='edgeRevolveLaunchRow';
  row.className='outliner-actions edge-revolve-launch-row';
  row.style.gridTemplateColumns='1fr';
  row.innerHTML='<button id="edgeRevolveLaunchBtn" type="button">Revolve</button>';
  controls.insertAdjacentElement('beforebegin',row);
  row.querySelector('#edgeRevolveLaunchBtn')?.addEventListener('click',()=>{
    source.click();
    setTimeout(syncAll,0);
  });
  const cancel=document.createElement('button');
  cancel.id='edgeRevolveCancelBtn';
  cancel.type='button';
  cancel.textContent='Cancel';
  cancel.addEventListener('click',()=>{
    globalThis.__boxlabRevolve?.cancel?.();
    setTimeout(syncAll,0);
  });
  controls.appendChild(cancel);
}
function syncAll(){
  ensureEdgeRevolveLauncher();
  syncSessionShells();
  syncFace();
  syncVertex();
  syncEdge();
}

window.addEventListener('boxlab-tool-session-change',()=>requestAnimationFrame(syncAll));
window.addEventListener('boxlab-bridge-state',()=>requestAnimationFrame(syncAll));
document.addEventListener('boxlab-direct-tool-exclusive',()=>setTimeout(syncAll,0));
window.addEventListener('pointerup',()=>setTimeout(syncAll,0),false);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>setTimeout(syncAll,0)));

[0,30,80,180,400,900].forEach(delay=>setTimeout(syncAll,delay));
globalThis.__boxlabUIPresentation={version:'0.36.18.451',sync:syncAll};
