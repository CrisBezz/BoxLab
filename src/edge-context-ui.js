// BoxLab v0.36.18.33 — contextual Edge tool controls.
// Keeps the Edge drawer self-explanatory by showing only controls relevant to
// Bevel, Edge Slide, or Offset Loop while one of those tools is active.
// UI-only: no modelling/topology ownership.

const bevelButton=document.querySelector('#bevelBtn');
const slideButton=document.querySelector('#edgeSlideBtn');
const offsetButton=document.querySelector('#offsetLoopBtn');

const bevelOptions=document.querySelector('.bevel-option');
const loopCutOptions=document.querySelector('.loop-cut-option');
const loopSlideOptions=document.querySelector('.loop-slide-option');
const offsetOptions=document.querySelector('.offset-option');
const creaseOptions=document.querySelector('.crease-options');

const bevelRow=document.querySelector('#precisionEdgeBevelRow');
const slideRow=document.querySelector('#precisionEdgeSlideRow');
const slideReadout=document.querySelector('#precisionEdgeSlideReadout');
const offsetRow=document.querySelector('#precisionOffsetLoopRow');
const offsetReadout=document.querySelector('#precisionOffsetLoopReadout');
const bevelReadout=bevelRow?.nextElementSibling||null;

function show(element,visible){
  if(!element)return;
  if(!element.dataset.boxlabContextDisplay)element.dataset.boxlabContextDisplay=element.style.display||'';
  element.style.display=visible?element.dataset.boxlabContextDisplay:'none';
}

function activeTool(){
  if(bevelButton?.classList.contains('active'))return'bevel';
  if(slideButton?.classList.contains('active'))return'slide';
  if(offsetButton?.classList.contains('active'))return'offset';
  return null;
}

function sync(){
  const tool=activeTool();
  if(!tool){
    [bevelOptions,loopCutOptions,loopSlideOptions,offsetOptions,creaseOptions,
      bevelRow,bevelReadout,slideRow,slideReadout,offsetRow,offsetReadout]
      .forEach(element=>show(element,true));
    return;
  }

  const bevel=tool==='bevel',slide=tool==='slide',offset=tool==='offset';
  show(bevelOptions,bevel);
  // Crease strength is not part of Bevel even though legacy markup nests it
  // inside the bevel option container.
  if(creaseOptions)show(creaseOptions,false);
  show(loopCutOptions,false);
  show(loopSlideOptions,false);
  show(offsetOptions,offset);

  show(bevelRow,bevel);show(bevelReadout,bevel);
  show(slideRow,slide);show(slideReadout,slide);
  show(offsetRow,offset);show(offsetReadout,offset);
}

// Tool modules update their active classes in their own click handlers. Sync on
// the next microtask so this layer only reflects state; it never owns state.
document.addEventListener('click',event=>{
  if(event.target?.closest?.('#bevelBtn,#edgeSlideBtn,#offsetLoopBtn,.mode-tools button,#selectionModes button'))queueMicrotask(sync);
},true);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.addEventListener('pointerup',event=>{
  if(event.target?.closest?.('#viewport'))queueMicrotask(sync);
},true);
setTimeout(sync,0);

globalThis.__boxlabEdgeContextUi={version:'0.36.18.33',sync};
