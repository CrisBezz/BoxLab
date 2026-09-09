// BoxLab v0.36.18.82 — Repeat Previous owns Face taps before the normal drag controller.
// A real Repeat tap is captured at window/pointerdown, before multi-face-direct can
// start an Extrude/Inset drag. Replay still reuses the existing precision Face path.

import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function precision(){return globalThis.__boxlabPrecisionFace;}
function faceMode(){return document.querySelector('#selectionModes button[data-mode="face"]');}
function lastOperation(){
  const direct=globalThis.__boxlabLastFaceOperation||precision()?.last?.();
  if(direct&&(direct.tool==='extrude'||direct.tool==='inset')&&Number.isFinite(Number(direct.value))&&Math.abs(Number(direct.value))>1e-9)return{tool:direct.tool,value:Number(direct.value)};
  const readout=document.querySelector('#precisionFaceReadout')?.textContent||'';
  const match=readout.match(/Last\s+(Extrude|Inset)\s*•\s*([+-]?\d+(?:\.\d+)?)/i);
  if(match){const value=Number(match[2]);if(Number.isFinite(value)&&Math.abs(value)>1e-9)return{tool:match[1].toLowerCase(),value};}
  return null;
}
function shortLabel(op){return op?`${op.tool==='extrude'?'Extrude':'Inset'} ${op.value.toFixed(3)}`:'';}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const host=document.createElement('div');
host.id='repeatFacePreviousRow';
host.className='outliner-actions';
host.style.cssText='grid-template-columns:1fr;margin:4px 0 2px';
const button=document.createElement('button');
button.id='repeatFacePreviousBtn';button.type='button';button.textContent='Repeat Previous';button.disabled=true;button.setAttribute('aria-pressed','false');
host.appendChild(button);

function place(){
  const row=document.querySelector('#precisionFaceRow');
  if(row?.parentElement){
    if(host.parentElement!==row.parentElement||row.nextElementSibling!==host)row.insertAdjacentElement('afterend',host);
    return true;
  }
  if(faceTools&&!host.parentElement){faceTools.appendChild(host);return true;}
  return false;
}

let armed=false;
let armedOperation=null;
let applying=false;

function paintButton(){
  button.setAttribute('aria-pressed',armed?'true':'false');
  button.dataset.repeatArmed=armed?'true':'false';
  if(armed){
    button.style.setProperty('background','#f2f5fa','important');
    button.style.setProperty('color','#111318','important');
    button.style.setProperty('border-color','#f2f5fa','important');
    button.style.setProperty('box-shadow','0 0 0 2px rgba(255,255,255,.28) inset','important');
    button.style.setProperty('font-weight','700','important');
  }else{
    button.style.removeProperty('background');button.style.removeProperty('color');button.style.removeProperty('border-color');button.style.removeProperty('box-shadow');button.style.removeProperty('font-weight');
  }
}
function syncButton(){
  place();
  const op=armed&&armedOperation?armedOperation:lastOperation();
  button.disabled=!op||!precision()?.applyFor;
  button.textContent=op?(armed?`REPEAT ON • ${shortLabel(op)}`:`Repeat ${shortLabel(op)}`):'Repeat Previous';
  button.title=op?(armed?`${shortLabel(op)} armed — each Face tap repeats it`:`Arm one-click repeat of ${shortLabel(op)}`):'Complete a normal Extrude or Inset first';
  paintButton();
}
function forcePaint(){
  syncButton();
  void button.offsetWidth;
  requestAnimationFrame(()=>{if(armed)syncButton();});
}
function disarm(message){
  armed=false;armedOperation=null;forcePaint();
  if(message&&status)status.textContent=message;
}
function arm(){
  const op=lastOperation();
  if(!op||!precision()?.applyFor){syncButton();return;}
  if(armed){disarm('Repeat Previous • off');return;}
  const mode=faceMode();if(mode&&!mode.classList.contains('active'))mode.click();
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  armed=true;armedOperation={...op};
  forcePaint();
  if(status)status.textContent=`Repeat Previous • ${shortLabel(op)} armed • tap Faces to repeat`;
}
button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();arm();});

// Choosing another explicit tool exits Repeat. Programmatic replay uses click(), not
// pointerdown, so this only reacts to a real user tool choice.
document.addEventListener('pointerdown',event=>{
  if(!armed)return;
  const target=event.target?.closest?.('button');
  if(!target||target===button)return;
  if(target.closest('#selectionModes')||target.closest('[data-mode-tools="face"]')||target.closest('#toolModes'))disarm();
},true);

function setPointer(clientX,clientY){
  const r=canvas.getBoundingClientRect();
  pointer.set((clientX-r.left)/r.width*2-1,-((clientY-r.top)/r.height*2-1));
}
function pickFace(clientX,clientY){
  const m=mesh(),camera=state()?.camera;if(!m||!camera)return null;
  setPointer(clientX,clientY);raycaster.setFromCamera(pointer,camera);
  let best=null;
  for(let fi=0;fi<(m.faces||[]).length;fi++){
    const face=m.faces[fi];if(!Array.isArray(face)||face.length<3)continue;
    const positions=[];
    for(let i=1;i<face.length-1;i++){
      for(const vi of[face[0],face[i],face[i+1]]){const v=m.vertices?.[vi];if(!v){positions.length=0;break;}positions.push(v.x,v.y,v.z);}if(!positions.length)break;
    }
    if(!positions.length)continue;
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
    const picker=new THREE.Mesh(geometry,material);const hit=raycaster.intersectObject(picker,false)[0];
    geometry.dispose();material.dispose();
    if(hit&&(!best||hit.distance<best.distance))best={faceIndex:fi,distance:hit.distance};
  }
  return best?.faceIndex??null;
}
function replayFace(faceIndex){
  if(!armed||applying||!armedOperation||!Number.isInteger(faceIndex))return false;
  const m=mesh();if(!Array.isArray(m?.faces?.[faceIndex]))return false;
  const op={...armedOperation};
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  bridge()?.set?.('face',[faceIndex]);render();
  const api=precision();if(!api?.applyFor)return false;
  applying=true;
  let ok=false;
  try{
    ok=api.applyFor(op.tool,op.value)!==false;
    if(status)status.textContent=ok?`Repeat Previous • ${shortLabel(op)} applied • tap another Face`:`Repeat Previous • ${shortLabel(op)} could not be applied to this Face`;
  }finally{
    setTimeout(()=>{applying=false;armedOperation=op;forcePaint();},0);
  }
  return ok;
}

// IMPORTANT: window capture runs before document capture, so the normal Face drag
// controller never sees a repeat tap. This is the event boundary that 18.76–81 missed.
window.addEventListener('pointerdown',event=>{
  if(!armed||applying||!event.isPrimary||event.pointerId===9876||event.target!==canvas)return;
  const faceIndex=pickFace(event.clientX,event.clientY);
  if(!Number.isInteger(faceIndex))return; // empty-space navigation remains available
  event.preventDefault();
  event.stopImmediatePropagation();
  setTimeout(()=>replayFace(faceIndex),0);
},true);

document.addEventListener('boxlab-face-value-committed',event=>{
  if(!armed){syncButton();return;}
  if(!applying&&event.detail&&(event.detail.tool==='extrude'||event.detail.tool==='inset')&&Math.abs(Number(event.detail.value))>1e-9)armedOperation={tool:event.detail.tool,value:Number(event.detail.value)};
  forcePaint();
});
window.addEventListener('boxlab-bridge-state',()=>{
  if(armed&&bridge()?.mode?.()!=='face'){disarm();return;}
  syncButton();
});
[0,40,120,300,700].forEach(delay=>setTimeout(syncButton,delay));

globalThis.__boxlabRepeatFacePrevious={version:'0.36.18.82',arm,disarm,isArmed:()=>armed,last:lastOperation,replayFace,pickFace};
