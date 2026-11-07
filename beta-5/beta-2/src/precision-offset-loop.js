// BoxLab v0.36.18.18 — exact Offset Loop spacing.
// Adds numeric support spacing without changing the restored v0.32.19 drag/topology path.

const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const offsetButton=document.querySelector('#offsetLoopBtn');
const slider=document.querySelector('#offsetLoopSpacing');
const sliderOut=document.querySelector('#offsetLoopSpacingOut');
const status=document.querySelector('#selectionStatus');
if(!edgeTools||!offsetButton) throw new Error('Precision Offset Loop UI dependencies missing');

const row=document.createElement('div');
row.id='precisionOffsetLoopRow';
row.style.cssText='display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;margin:6px 0 2px';
const label=document.createElement('span');label.textContent='Offset %';label.style.cssText='font-size:10px;opacity:.72';
const input=document.createElement('input');input.type='number';input.inputMode='decimal';input.step='0.1';input.min='2';input.max='45';input.placeholder='2–45';input.style.cssText='min-width:0;width:100%;box-sizing:border-box;padding:5px 6px;border-radius:6px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.055);color:inherit;font:inherit';
const apply=document.createElement('button');apply.type='button';apply.textContent='Apply';apply.style.cssText='padding:5px 8px';
row.append(label,input,apply);
const anchor=document.querySelector('.offset-option');
(anchor?.parentElement||edgeTools).insertBefore(row,anchor||null);

const readout=document.createElement('div');
readout.id='precisionOffsetLoopReadout';
readout.style.cssText='font-size:10px;opacity:.72;margin:2px 0 4px;min-height:12px';
readout.textContent='Exact support spacing • 2–45%';
row.insertAdjacentElement('afterend',readout);

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])]:[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

function applyExact(){
  const m=mesh(),ids=selectedEdges(),raw=Number(input.value);
  if(!m||!ids.length){readout.textContent='Select a valid closed edge loop first';return;}
  if(!Number.isFinite(raw)||input.value.trim()===''){readout.textContent='Enter an Offset Loop percentage';return;}
  const percent=Math.max(2,Math.min(45,raw));
  const valid=m.offsetEdgeLoopInfo?.(ids);if(!valid){readout.textContent='Selection is not a valid Offset Loop';return;}
  const before=m.clone(),result=m.offsetEdgeLoop?.(ids,percent/100);
  if(!result){readout.textContent='Offset Loop could not be created from this selection';return;}
  globalThis.__boxlabHistory?.push(before);
  if(slider)slider.value=String(Math.round(percent));if(sliderOut)sliderOut.textContent=`${Math.round(percent)}%`;
  render();
  const created=[...new Set([...(result.leftEdges||[]),...(result.rightEdges||[])])];
  bridge()?.set?.('edge',created);
  const text=`Offset Loop exact • ${percent.toFixed(1)}% • ${Number(result.distance||0).toFixed(3)}`;
  readout.textContent=text;if(status)status.textContent=text;
}

apply.addEventListener('click',applyExact);
input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();applyExact();input.blur();}});

new MutationObserver(()=>{
  const text=status?.textContent||'',m=text.match(/Offset Loop.*?([0-9]+)%.*?([0-9]+(?:\.[0-9]+)?)/i);
  if(m)readout.textContent=`Live Offset Loop • ${Number(m[1]).toFixed(1)}%`;
}).observe(status,{childList:true,characterData:true,subtree:true});

globalThis.__boxlabPrecisionOffsetLoop={version:'0.36.18.18',apply:value=>{input.value=String(value);applyExact();}};
