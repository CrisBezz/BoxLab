// BoxLab v0.36.18.35 — contextual Edge tool controls.
// Uses a macrotask after tool clicks so the owning tool handler has definitely
// finished changing its active state before we decide which controls to show.
// Hiding uses an !important rule so existing inline/CSS display rules cannot win.
// UI-only: no modelling/topology ownership.

function q(selector){return document.querySelector(selector);}

if(!document.querySelector('#boxlabEdgeContextStyle')){
  const style=document.createElement('style');
  style.id='boxlabEdgeContextStyle';
  style.textContent='[data-boxlab-edge-context-hidden="true"]{display:none!important;}';
  document.head.appendChild(style);
}

function show(element,visible){
  if(!element)return;
  if(visible)element.removeAttribute('data-boxlab-edge-context-hidden');
  else element.setAttribute('data-boxlab-edge-context-hidden','true');
}

function activeTool(){
  if(q('#bevelBtn')?.classList.contains('active'))return'bevel';
  if(q('#edgeSlideBtn')?.classList.contains('active'))return'slide';
  if(q('#offsetLoopBtn')?.classList.contains('active'))return'offset';
  return null;
}

function controls(){
  const bevelRow=q('#precisionEdgeBevelRow');
  return{
    bevelOptions:q('.bevel-option'),
    loopCutOptions:q('.loop-cut-option'),
    loopSlideOptions:q('.loop-slide-option'),
    offsetOptions:q('.offset-option'),
    creaseOptions:q('.crease-options'),
    bevelRow,
    bevelReadout:bevelRow?.nextElementSibling||null,
    slideRow:q('#precisionEdgeSlideRow'),
    slideReadout:q('#precisionEdgeSlideReadout'),
    offsetRow:q('#precisionOffsetLoopRow'),
    offsetReadout:q('#precisionOffsetLoopReadout')
  };
}

function sync(){
  const c=controls(),tool=activeTool();
  const all=[c.bevelOptions,c.loopCutOptions,c.loopSlideOptions,c.offsetOptions,c.creaseOptions,
    c.bevelRow,c.bevelReadout,c.slideRow,c.slideReadout,c.offsetRow,c.offsetReadout];

  if(!tool){
    all.forEach(element=>show(element,true));
    return;
  }

  const bevel=tool==='bevel',slide=tool==='slide',offset=tool==='offset';

  // Native option rows.
  show(c.bevelOptions,bevel);
  show(c.loopCutOptions,false);
  show(c.loopSlideOptions,false);
  show(c.offsetOptions,offset);
  show(c.creaseOptions,false);

  // Dynamically injected precision rows/readouts.
  show(c.bevelRow,bevel);
  show(c.bevelReadout,bevel);
  show(c.slideRow,slide);
  show(c.slideReadout,slide);
  show(c.offsetRow,offset);
  show(c.offsetReadout,offset);
}

function syncAfterOwner(){setTimeout(sync,0);}

// This listener runs in capture because Bevel stops later click propagation.
// The macrotask is intentional: it executes only after all current click handlers
// have completed, so active classes are final rather than pre-click state.
document.addEventListener('click',event=>{
  if(event.target?.closest?.('#bevelBtn,#edgeSlideBtn,#offsetLoopBtn,.mode-tools button,#selectionModes button'))syncAfterOwner();
},true);

window.addEventListener('boxlab-bridge-state',syncAfterOwner);
document.addEventListener('boxlab-direct-tool-exclusive',syncAfterOwner,true);

setTimeout(sync,0);
setTimeout(sync,150);

globalThis.__boxlabEdgeContextUi={version:'0.36.18.35',sync};
