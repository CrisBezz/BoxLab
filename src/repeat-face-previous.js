// BoxLab v0.36.18.78 — continuous one-click Repeat Previous for Face Extrude / Inset.
// Reuses the existing precision/direct Face path; no geometry kernel is duplicated.

const canvas=document.querySelector('#viewport');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const status=document.querySelector('#selectionStatus');
const extrudeButton=document.querySelector('#extrudeBtn');
const insetButton=document.querySelector('#insetBtn');
const multiToggle=document.querySelector('#multiSelectToggle');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function precision(){return globalThis.__boxlabPrecisionFace;}
function faceMode(){return document.querySelector('#selectionModes button[data-mode="face"]');}
function selectedFaces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function toolActive(button){return !!(button?.classList.contains('boxlab-direct-stable')||button?.classList.contains('active'));}
function lastOperation(){
  const direct=globalThis.__boxlabLastFaceOperation||precision()?.last?.();
  if(direct&&(direct.tool==='extrude'||direct.tool==='inset')&&Number.isFinite(Number(direct.value)))return{tool:direct.tool,value:Number(direct.value)};
  const readout=document.querySelector('#precisionFaceReadout')?.textContent||'';
  const match=readout.match(/Last\s+(Extrude|Inset)\s*•\s*([+-]?\d+(?:\.\d+)?)/i);
  if(match){const value=Number(match[2]);if(Number.isFinite(value))return{tool:match[1].toLowerCase(),value};}
  return null;
}
function shortLabel(op){return op?`${op.tool==='extrude'?'Extrude':'Inset'} ${op.value.toFixed(3)}`:'';}

if(!document.querySelector('#boxlabRepeatFaceStyle')){
  const style=document.createElement('style');
  style.id='boxlabRepeatFaceStyle';
  style.textContent='#repeatFacePreviousBtn.boxlab-repeat-armed{background:#f2f5fa!important;color:#111318!important;border-color:#f2f5fa!important;box-shadow:0 0 0 1px rgba(255,255,255,.2) inset!important;}';
  document.head.appendChild(style);
}

const host=document.createElement('div');
host.id='repeatFacePreviousRow';
host.className='outliner-actions';
host.style.cssText='grid-template-columns:1fr;margin-top:4px';
const button=document.createElement('button');
button.id='repeatFacePreviousBtn';button.type='button';button.textContent='Repeat Previous';button.disabled=true;
host.appendChild(button);

function place(){
  if(host.isConnected)return true;
  const readout=document.querySelector('#precisionFaceReadout');
  if(readout?.parentElement){readout.insertAdjacentElement('afterend',host);return true;}
  const row=document.querySelector('#precisionFaceRow');
  if(row?.parentElement){row.insertAdjacentElement('afterend',host);return true;}
  if(faceTools){faceTools.appendChild(host);return true;}
  return false;
}

let armed=false;
let armedOperation=null;
let touch=null;
let pendingTap=null;
let applying=false;

function syncButton(){
  place();
  const op=armed&&armedOperation?armedOperation:lastOperation();
  button.disabled=!op||!precision()?.apply;
  button.classList.toggle('boxlab-repeat-armed',armed);
  button.classList.toggle('active',armed);
  button.textContent=op?(armed?`Repeat ON • ${shortLabel(op)}`:`Repeat ${shortLabel(op)}`):'Repeat Previous';
  button.title=op
    ?(armed?`${shortLabel(op)} armed — each Face tap repeats it`:`Repeat ${shortLabel(op)} with one-click Face taps`)
    :'Complete a normal Extrude or Inset first';
}

function disarm(message){
  armed=false;armedOperation=null;touch=null;pendingTap=null;
  syncButton();
  if(message&&status)status.textContent=message;
}

function armMatchingTool(op){
  const target=op.tool==='extrude'?extrudeButton:insetButton;
  const other=op.tool==='extrude'?insetButton:extrudeButton;
  if(toolActive(other)||!toolActive(target))target?.click?.();
}

function arm(){
  const op=lastOperation();
  if(!op||!precision()?.apply){syncButton();return;}
  if(armed){disarm('Repeat Previous • off');return;}
  const mode=faceMode();if(mode&&!mode.classList.contains('active'))mode.click();
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  armed=true;armedOperation={...op};
  armMatchingTool(armedOperation);
  syncButton();
  if(status)status.textContent=`Repeat Previous • ${shortLabel(op)} armed • tap Faces to repeat`;
}
button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();arm();});

// Explicitly choosing another modelling or selection tool exits Repeat.
document.addEventListener('pointerdown',event=>{
  if(!armed||event.target===button)return;
  const target=event.target?.closest?.('button');
  if(target&&(target.closest('#selectionModes')||target.closest('[data-mode-tools="face"]')||target.closest('#toolModes'))&&target!==button)disarm();
},true);

canvas?.addEventListener('pointerdown',event=>{
  if(!armed||applying||!event.isPrimary||event.pointerId===9876)return;
  touch={id:event.pointerId,x:event.clientX,y:event.clientY,before:selectedFaces(),wasFaceMode:bridge()?.mode?.()==='face',moved:false};
},true);
canvas?.addEventListener('pointermove',event=>{
  if(!touch||touch.id!==event.pointerId)return;
  if(Math.hypot(event.clientX-touch.x,event.clientY-touch.y)>7)touch.moved=true;
},true);

function replayIfReady(){
  if(!armed||applying||!armedOperation||!pendingTap)return false;
  const ids=selectedFaces();
  if(ids.length!==1)return false;
  const before=pendingTap.before||[];
  if(before.length===1&&before[0]===ids[0])return false;
  const op={...armedOperation};
  pendingTap=null;
  armMatchingTool(op);
  const api=precision();if(!api?.apply)return false;
  applying=true;
  let ok=false;
  try{
    ok=api.apply(op.value)!==false;
    if(ok&&status)status.textContent=`Repeat Previous • ${shortLabel(op)} applied • tap another Face`;
  }finally{
    setTimeout(()=>{applying=false;armedOperation=op;syncButton();},0);
  }
  return ok;
}
function scheduleReplay(){[0,20,50,100,180,300].forEach(delay=>setTimeout(()=>{if(pendingTap)replayIfReady();},delay));}
function finishTap(event){
  if(!armed||applying||!touch||touch.id!==event.pointerId||event.pointerId===9876)return;
  const attempt=touch;touch=null;
  if(event.type!=='pointerup'||attempt.moved||!attempt.wasFaceMode)return;
  pendingTap={before:[...attempt.before],time:performance.now()};
  scheduleReplay();
}
canvas?.addEventListener('pointerup',finishTap,true);
canvas?.addEventListener('pointercancel',event=>{if(touch?.id===event.pointerId)touch=null;},true);

document.addEventListener('boxlab-face-value-committed',event=>{
  if(!armed){syncButton();return;}
  // Synthetic repeat applies must not replace the value that is currently armed.
  if(!applying&&event.detail&&(event.detail.tool==='extrude'||event.detail.tool==='inset'))armedOperation={tool:event.detail.tool,value:Number(event.detail.value)};
  syncButton();
});
window.addEventListener('boxlab-bridge-state',()=>{
  if(armed&&bridge()?.mode?.()!=='face'){disarm();return;}
  if(pendingTap)replayIfReady();
  syncButton();
});
[0,40,120,300,700].forEach(delay=>setTimeout(syncButton,delay));

globalThis.__boxlabRepeatFacePrevious={version:'0.36.18.78',arm,disarm,isArmed:()=>armed,last:lastOperation};
