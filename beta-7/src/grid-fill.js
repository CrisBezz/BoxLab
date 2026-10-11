import {gridFillPlan,applyGridFill} from './grid-fill-core.js?v=0.36.18.338';

const status=document.querySelector('#selectionStatus');
const fillButton=document.querySelector('#fillFaceBtn');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){
  const b=bridge();
  return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];
}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='gridFillBtn';
button.type='button';
button.textContent='Grid Fill';
button.disabled=true;
button.style.cssText='min-width:0;width:100%';

function place(){
  const row=fillButton?.parentElement;
  if(!row)return false;
  row.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
  for(const b of row.querySelectorAll('button')){b.style.minWidth='0';b.style.width='100%';}
  if(button.parentElement!==row)fillButton.insertAdjacentElement('afterend',button);
  return true;
}
function restore(target,source){
  target.vertices=source.vertices.map(v=>v.clone());
  target.faces=source.faces.map(f=>[...f]);
  target.creases=new Map(source.creases||[]);
  if(source.looseEdges instanceof Set)target.looseEdges=new Set(source.looseEdges);
  if(source.looseVertices instanceof Set)target.looseVertices=new Set(source.looseVertices);
  target.edges?.();
}
function inspect(){
  const m=mesh(),ids=selectedEdges();
  return{m,ids,plan:gridFillPlan(m,ids)};
}
function apply(){
  const {m,ids,plan}=inspect(),history=globalThis.__boxlabHistory;
  if(!m||!history||!plan.ok)return false;
  const gate=globalThis.__boxlabTopologyGate;
  const beforeGate=gate?.validate?.(m)||null;
  if(beforeGate&&!beforeGate.valid){
    if(status)status.textContent='Grid Fill • repair existing topology issues first';
    return false;
  }
  const candidate=m.clone?.();if(!candidate)return false;
  const result=applyGridFill(candidate,plan);
  if(!result){if(status)status.textContent='Grid Fill • candidate patch failed quality checks';return false;}
  const afterGate=gate?.validate?.(candidate)||null;
  if(afterGate&&!afterGate.valid){
    if(status)status.textContent='Grid Fill • validation failed • no changes committed';
    return false;
  }
  if(beforeGate&&afterGate&&afterGate.boundaryEdges>beforeGate.boundaryEdges){
    if(status)status.textContent='Grid Fill • boundary validation failed • no changes committed';
    return false;
  }

  const before=m.clone();
  history.push(before);
  try{
    restore(m,candidate);
    bridge()?.set?.('edge',[]);
    document.querySelector('#selectionModes button[data-mode="face"]')?.click();
    queueMicrotask(()=>{
      bridge()?.set?.('face',result.faceIndices);
      render();gate?.sync?.();
      if(status)status.textContent=`Grid Fill • ${result.uSegments}×${result.vSegments} • ${result.quads} quads • result selected`;
    });
    return true;
  }catch(error){
    restore(m,before);render();
    if(status)status.textContent='Grid Fill • rollback';
    return false;
  }
}
function sync(){
  place();
  const {plan}=inspect();
  button.disabled=!plan.ok||!globalThis.__boxlabHistory;
  button.title=plan.ok
    ?`Fill this ${plan.uSegments}×${plan.vSegments} four-sided boundary with ${plan.uSegments*plan.vSegments} quads`
    :(plan.reason||'Select one four-sided closed boundary');
}

button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();apply();});
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,60,180,500,900].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabGridFill={version:'0.36.18.338',inspect,apply,sync};
