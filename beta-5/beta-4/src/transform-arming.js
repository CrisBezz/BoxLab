const toolButtons=[...document.querySelectorAll('#toolModes button')];
const precision=document.querySelector('#transformPrecision');
const constraintButtons=[...(precision?.querySelectorAll('[data-constraint]')||[])];
let armedTool=null;
let armedConstraint=null;
let enforcing=false;

function enforce(){
  if(enforcing)return;
  enforcing=true;
  for(const button of toolButtons)button.classList.toggle('active',!!armedTool&&button.dataset.tool===armedTool);
  for(const button of constraintButtons)button.classList.toggle('active',!!armedConstraint&&button.dataset.constraint===armedConstraint);
  enforcing=false;
}

function setTool(tool){
  if(armedTool===tool){
    armedTool=null;
    armedConstraint=null;
  }else{
    armedTool=tool;
    armedConstraint='free';
  }
  enforce();
}

function setConstraint(constraint){
  if(!armedTool){
    armedConstraint=null;
    enforce();
    return;
  }
  armedConstraint=constraint||'free';
  enforce();
}

function disarm(){
  armedTool=null;
  armedConstraint=null;
  enforce();
}

function activateRealMove(){
  const moveButton=toolButtons.find(button=>button.dataset.tool==='move');
  if(!moveButton||moveButton.disabled)return false;
  // main.js owns the real transform `toolMode`; only its normal button handler
  // changes that engine state. Start disarmed so our own button listener arms
  // Move rather than toggling an already-armed cosmetic state back off.
  disarm();
  moveButton.click();
  return true;
}

for(const button of toolButtons){
  button.addEventListener('click',()=>setTool(button.dataset.tool),false);
  new MutationObserver(()=>queueMicrotask(enforce)).observe(button,{attributes:true,attributeFilter:['class']});
}
for(const button of constraintButtons){
  button.addEventListener('click',()=>setConstraint(button.dataset.constraint),false);
  new MutationObserver(()=>queueMicrotask(enforce)).observe(button,{attributes:true,attributeFilter:['class']});
}

const directToolSelector=[
  '#loopCutBtn','#faceSplitBtn','#bevelBtn','#applyCreaseBtn','#clearCreaseBtn',
  '#edgeSlideBtn','#offsetLoopBtn','#bridgeEdgesBtn','#fillFaceBtn',
  '#dissolveLoopBtn','#dissolveEdgeBtn','#deleteEdgeBtn','#addEdgeBtn',
  '#addVertexBtn','#vertexSlideBtn','#vertexBevelBtn','#connectVertexBtn',
  '#weldVertexBtn','#deleteVertexBtn'
].join(',');

// Component transforms are mode-scoped. Never allow a Face/Edge/Vertex
// transform to leak into Object mode (or vice versa), even if another UI
// module has already changed the visible active classes.
document.querySelector('#selectionModes')?.addEventListener('click',event=>{
  const button=event.target?.closest?.('button[data-mode]');
  if(!button||button.disabled)return;
  disarm();
},true);

document.addEventListener('click',event=>{
  const button=event.target?.closest?.(directToolSelector);
  if(!button||button.disabled)return;
  disarm();
},true);

globalThis.__boxlabTransformArming={
  tool:()=>armedTool,
  constraint:()=>armedConstraint,
  active:()=>!!armedTool,
  disarm,
  activateRealMove,
  setTool:tool=>{armedTool=tool||null;armedConstraint=armedTool?'free':null;enforce();},
  setConstraint
};

queueMicrotask(disarm);
