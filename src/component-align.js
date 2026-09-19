import {componentVertexIndices,alignComponentAxis} from './component-align-core.js?v=0.36.18.329';

const selectionTools=document.querySelector('#componentSelectionTools');
const status=document.querySelector('#selectionStatus');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function selected(){return[...new Set(bridge()?.indices?.()||[])];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const row=document.createElement('div');
row.id='componentAlignRow';
row.style.cssText='margin-top:6px';
const label=document.createElement('div');
label.textContent='ALIGN / FLATTEN';
label.style.cssText='font-size:9px;line-height:1.1;letter-spacing:.35px;opacity:.55;margin:0 0 4px 1px';
const buttons=document.createElement('div');
buttons.className='outliner-actions';
buttons.style.cssText='display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px';
for(const axis of['x','y','z']){
  const b=document.createElement('button');
  b.type='button';
  b.dataset.alignAxis=axis;
  b.textContent=`Align ${axis.toUpperCase()}`;
  buttons.appendChild(b);
}
row.append(label,buttons);

function place(){
  if(row.isConnected)return true;
  const anchor=selectionTools?.querySelector('.selection-context');
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',row);return true;}
  if(selectionTools){selectionTools.appendChild(row);return true;}
  return false;
}

function info(){
  const m=mesh(),md=mode(),ids=selected();
  const vertices=componentVertexIndices(m,md,ids);
  return{m,md,ids,vertices};
}

function apply(axis){
  const {m,md,ids,vertices}=info();
  if(!m||!['vertex','edge','face'].includes(md)||vertices.length<2)return false;
  const before=m.clone?.();
  if(!before)return false;
  const result=alignComponentAxis(m,vertices,axis);
  if(!result)return false;
  globalThis.__boxlabHistory?.push(before);
  bridge()?.set?.(md,ids);
  render();
  if(status)status.textContent=`Align ${axis.toUpperCase()} • ${result.count} verts • ${axis.toUpperCase()} = ${result.target.toFixed(3)}`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const {md,vertices}=info(),enabled=['vertex','edge','face'].includes(md)&&vertices.length>=2&&!!globalThis.__boxlabHistory;
  row.style.display=md==='object'?'none':'';
  buttons.querySelectorAll('button').forEach(b=>{
    b.disabled=!enabled;
    b.title=enabled?`Flatten selected ${md} component vertices to their average ${b.dataset.alignAxis.toUpperCase()} coordinate`:'Select at least two component vertices';
  });
}

buttons.addEventListener('click',event=>{
  const b=event.target.closest('[data-align-axis]');if(!b)return;
  apply(b.dataset.alignAxis);
});
window.addEventListener('boxlab-bridge-state',sync);
document.querySelector('#selectionModes')?.addEventListener('click',()=>queueMicrotask(sync),true);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,60,180,500].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabComponentAlign={version:'0.36.18.329',apply,sync};
