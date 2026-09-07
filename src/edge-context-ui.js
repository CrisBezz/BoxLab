// BoxLab v0.36.18.34 — contextual Edge tool controls.
// Queries live UI on every sync because precision rows are injected by dynamic
// modules and may not exist yet when this module first evaluates.
// UI-only: no modelling/topology ownership.

function q(selector){return document.querySelector(selector);}
function show(element,visible){
  if(!element)return;
  if(!Object.prototype.hasOwnProperty.call(element.dataset,'boxlabContextDisplay')){
    element.dataset.boxlabContextDisplay=element.style.display||'';
  }
  element.style.display=visible?element.dataset.boxlabContextDisplay:'none';
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

  if(!tool){all.forEach(element=>show(element,true));return;}

  const bevel=tool==='bevel',slide=tool==='slide',offset=tool==='offset';
  show(c.bevelOptions,bevel);
  show(c.loopCutOptions,false);
  show(c.loopSlideOptions,false);
  show(c.offsetOptions,offset);
  // Crease controls are legacy-nested inside the Bevel options container but
  // are not part of Bevel itself.
  show(c.creaseOptions,false);

  show(c.bevelRow,bevel);show(c.bevelReadout,bevel);
  show(c.slideRow,slide);show(c.slideReadout,slide);
  show(c.offsetRow,offset);show(c.offsetReadout,offset);
}

// Reflect tool state after the owning tool's click handler has run.
document.addEventListener('click',event=>{
  if(event.target?.closest?.('#bevelBtn,#edgeSlideBtn,#offsetLoopBtn,.mode-tools button,#selectionModes button')){
    queueMicrotask(sync);
  }
},true);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
setTimeout(sync,0);
setTimeout(sync,120);

globalThis.__boxlabEdgeContextUi={version:'0.36.18.34',sync};
