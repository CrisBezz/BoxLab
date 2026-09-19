import {circleLoopInfo,circularizeLoop} from './component-circle-core.js?v=0.36.18.331';

const selectionTools=document.querySelector('#componentSelectionTools');
const status=document.querySelector('#selectionStatus');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function selected(){return[...new Set(bridge()?.indices?.()||[])];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const row=document.createElement('div');
row.id='componentCircleRow';
row.style.cssText='margin-top:4px';
const button=document.createElement('button');
button.id='componentCircleBtn';
button.type='button';
button.textContent='Circle';
button.style.cssText='width:100%;min-width:0';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const align=document.querySelector('#componentAlignRow');
  if(align?.parentElement){align.insertAdjacentElement('afterend',row);return true;}
  const anchor=selectionTools?.querySelector('.selection-context');
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',row);return true;}
  if(selectionTools){selectionTools.appendChild(row);return true;}
  return false;
}

function info(){
  const m=mesh(),md=mode(),ids=selected();
  return{m,md,ids,loop:circleLoopInfo(m,md,ids)};
}

function apply(){
  const {m,md,ids,loop}=info(),history=globalThis.__boxlabHistory;
  if(!m||!history||!loop.ok)return false;
  const before=m.clone?.();if(!before)return false;
  const result=circularizeLoop(m,loop);if(!result)return false;
  history.push(before);
  bridge()?.set?.(md,ids);
  render();
  if(status)status.textContent=`Circle • ${result.count} verts • radius ${result.radius.toFixed(3)} • centre preserved`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const {md,loop}=info();
  row.style.display=['vertex','edge'].includes(md)?'':'none';
  button.disabled=!loop.ok||!globalThis.__boxlabHistory;
  button.title=loop.ok
    ?`Regularize selected ${md} loop to an evenly spaced circle in its current working plane`
    :loop.reason;
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.querySelector('#selectionModes')?.addEventListener('click',()=>queueMicrotask(sync),true);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,60,180,500].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabComponentCircle={version:'0.36.18.331',apply,sync,info};
