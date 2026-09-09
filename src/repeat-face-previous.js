// BoxLab v0.36.18.76 — Repeat Previous for Face Extrude / Inset.
// Reuses the existing precision/direct Face path. No geometry kernel is duplicated.
// Arm Repeat Previous, then tap a different Face once to apply the stored value.

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
function lastOperation(){const value=globalThis.__boxlabLastFaceOperation;return value&&(value.tool==='extrude'||value.tool==='inset')&&Number.isFinite(Number(value.value))?{tool:value.tool,value:Number(value.value)}:null;}
function toolActive(button){return !!(button?.classList.contains('boxlab-direct-stable')||button?.classList.contains('active'));}
function labelFor(op){return op?`Repeat Previous • ${op.tool==='extrude'?'Extrude':'Inset'} ${op.value.toFixed(3)}`:'Repeat Previous';}

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
let tap=null;
let applying=false;

function syncButton(){
  place();
  const op=lastOperation();
  button.disabled=!op||!precision()?.apply;
  button.classList.toggle('active',armed);
  button.textContent=armed&&armedOperation?labelFor(armedOperation):'Repeat Previous';
  button.title=op
    ?`Arm repeat: ${op.tool==='extrude'?'Extrude':'Inset'} ${op.value.toFixed(3)}, then tap another Face`
    :'Complete an Extrude or Inset first';
}

function disarm(message){
  armed=false;armedOperation=null;tap=null;
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
  if(status)status.textContent=`Repeat Previous • armed ${op.tool==='extrude'?'Extrude':'Inset'} ${op.value.toFixed(3)} • tap another Face`;
}
button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();arm();});

// User choosing another modelling/selection tool explicitly exits repeat mode.
document.addEventListener('pointerdown',event=>{
  if(!armed||event.target===button)return;
  const target=event.target?.closest?.('button');
  if(target&&(target.closest('#selectionModes')||target.closest('[data-mode-tools="face"]')||target.closest('#toolModes'))){
    if(target!==button)disarm();
  }
},true);

canvas?.addEventListener('pointerdown',event=>{
  if(!armed||applying||!event.isPrimary||event.pointerId===9876)return;
  const before=selectedFaces();
  tap={id:event.pointerId,x:event.clientX,y:event.clientY,before,wasFaceMode:bridge()?.mode?.()==='face'};
},true);

canvas?.addEventListener('pointermove',event=>{
  if(!tap||tap.id!==event.pointerId)return;
  if(Math.hypot(event.clientX-tap.x,event.clientY-tap.y)>7)tap.moved=true;
},true);

function finishTap(event){
  if(!armed||applying||!tap||tap.id!==event.pointerId||event.pointerId===9876)return;
  const attempt=tap;tap=null;
  if(event.type!=='pointerup'||attempt.moved||!attempt.wasFaceMode)return;
  setTimeout(()=>{
    if(!armed||applying||!armedOperation)return;
    const ids=selectedFaces();
    if(ids.length!==1)return;
    // Require the tap to have changed the Face selection. This prevents a tap
    // on empty space from accidentally repeating onto the previously selected Face.
    if(attempt.before.length===1&&attempt.before[0]===ids[0])return;
    armMatchingTool(armedOperation);
    const api=precision();if(!api?.apply)return;
    applying=true;
    try{
      api.apply(armedOperation.value);
      if(status)status.textContent=`Repeat Previous • ${armedOperation.tool==='extrude'?'Extrude':'Inset'} ${armedOperation.value.toFixed(3)} applied • tap another Face`;
    }finally{
      setTimeout(()=>{applying=false;syncButton();},0);
    }
  },0);
}
canvas?.addEventListener('pointerup',finishTap,true);
canvas?.addEventListener('pointercancel',event=>{if(tap?.id===event.pointerId)tap=null;},true);

// If another successful drag/exact Face operation occurs while Repeat is off,
// simply refresh the button so it advertises the newest value.
document.addEventListener('boxlab-face-value-committed',()=>{if(!armed)syncButton();});
window.addEventListener('boxlab-bridge-state',()=>{if(armed&&bridge()?.mode?.()!=='face')disarm();else syncButton();});
[0,40,120,300,700].forEach(delay=>setTimeout(syncButton,delay));

globalThis.__boxlabRepeatFacePrevious={version:'0.36.18.76',arm,disarm,isArmed:()=>armed,last:lastOperation};
