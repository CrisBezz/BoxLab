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
  armedTool=armedTool===tool?null:tool;
  if(!armedTool)armedConstraint=null;
  enforce();
}

function setConstraint(constraint){
  if(!armedTool){
    armedConstraint=null;
    enforce();
    return;
  }
  armedConstraint=armedConstraint===constraint?null:constraint;
  enforce();
}

for(const button of toolButtons){
  button.addEventListener('click',()=>queueMicrotask(()=>setTool(button.dataset.tool)),false);
  new MutationObserver(()=>queueMicrotask(enforce)).observe(button,{attributes:true,attributeFilter:['class']});
}
for(const button of constraintButtons){
  button.addEventListener('click',()=>queueMicrotask(()=>setConstraint(button.dataset.constraint)),false);
  new MutationObserver(()=>queueMicrotask(enforce)).observe(button,{attributes:true,attributeFilter:['class']});
}

// Expose the explicit transform state for other interaction modules.
globalThis.__boxlabTransformArming={
  tool:()=>armedTool,
  constraint:()=>armedConstraint,
  active:()=>!!armedTool,
  disarm:()=>{armedTool=null;armedConstraint=null;enforce();}
};

// Main.js starts with Move active; clear that startup state after all modules settle.
queueMicrotask(()=>{armedTool=null;armedConstraint=null;enforce();});
