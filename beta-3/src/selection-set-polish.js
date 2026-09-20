// BoxLab v0.36.18.21 — component selection set polish.
// Adds Invert and normalises All / Deselect feedback for Vertex / Edge / Face only.

const dock=document.querySelector('.selection-dock');
const allBtn=document.querySelector('#selectAllBtn');
const deselectBtn=document.querySelector('#deselectAllBtn');
const multiToggle=document.querySelector('#multiSelectToggle');
const status=document.querySelector('#selectionStatus');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mode(){return bridge()?.mode?.()||null;}
function selected(){return [...new Set(bridge()?.indices?.()||[])].filter(Number.isInteger);}
function componentMode(){return ['vertex','edge','face'].includes(mode());}
function totalFor(m,mesh){if(!mesh)return 0;if(m==='vertex')return mesh.vertices?.length||0;if(m==='edge')return mesh.edges?.().length||0;if(m==='face')return mesh.faces?.length||0;return 0;}
function label(m){return m?m[0].toUpperCase()+m.slice(1):'Selection';}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function setMulti(count){if(!multiToggle)return;if(count>1&&!multiToggle.checked){multiToggle.checked=true;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}}
function setSelection(ids,text){const b=bridge(),m=mode();if(!b?.set||!componentMode())return false;b.set(m,ids);setMulti(ids.length);render();if(status)status.textContent=text;return true;}

let invertBtn=document.querySelector('#invertSelectionBtn');
if(!invertBtn&&dock){
  invertBtn=document.createElement('button');
  invertBtn.id='invertSelectionBtn';
  invertBtn.type='button';
  invertBtn.textContent='Invert';
  invertBtn.title='Invert current component selection';
  deselectBtn?.insertAdjacentElement('beforebegin',invertBtn);
}

function selectAll(){
  if(!componentMode())return false;
  const m=mode(),total=totalFor(m,state()?.mesh),ids=Array.from({length:total},(_,i)=>i);
  return setSelection(ids,`${label(m)} All • ${total} selected`);
}
function deselectAll(){
  if(!componentMode())return false;
  const m=mode(),before=selected().length;
  return setSelection([],`${label(m)} Deselect • ${before} → 0 selected`);
}
function invert(){
  if(!componentMode())return;
  const m=mode(),mesh=state()?.mesh,total=totalFor(m,mesh),before=selected(),have=new Set(before),result=[];
  for(let i=0;i<total;i++)if(!have.has(i))result.push(i);
  setSelection(result,`${label(m)} Invert • ${before.length} → ${result.length} selected`);
}

// Capture component-mode All/Deselect so the result is deterministic and the
// legacy Object-mode behaviour remains completely untouched.
allBtn?.addEventListener('click',event=>{if(!componentMode())return;event.preventDefault();event.stopImmediatePropagation();selectAll();},true);
deselectBtn?.addEventListener('click',event=>{if(!componentMode())return;event.preventDefault();event.stopImmediatePropagation();deselectAll();},true);
invertBtn?.addEventListener('click',event=>{if(!componentMode())return;event.preventDefault();event.stopImmediatePropagation();invert();},true);

function sync(){
  const active=componentMode(),total=totalFor(mode(),state()?.mesh),count=selected().length;
  if(invertBtn)invertBtn.disabled=!active||total===0;
  if(allBtn&&active)allBtn.disabled=total===0||count===total;
  if(deselectBtn&&active)deselectBtn.disabled=count===0;
}

document.querySelector('#selectionModes')?.addEventListener('click',()=>queueMicrotask(sync));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
sync();

globalThis.__boxlabSelectionSetPolish={version:'0.36.18.21',selectAll,deselectAll,invert};
