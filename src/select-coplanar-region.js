import {coplanarRegion as inspect,samePlane} from './face-selection-regions.js?v=0.36.18.1004';
import * as THREE from 'three';

// BoxLab v0.36.18.69 — non-destructive connected coplanar region selection.
// Starting from one selected Face, flood-selects edge-connected faces lying on
// the same geometric plane. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedFaces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

const row=document.createElement('div');
row.id='coplanarRegionRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='selectCoplanarRegionBtn';
button.type='button';
button.textContent='Coplanar Region';
button.disabled=true;
button.style.width='100%';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const diagnostics=document.querySelector('#degenerateFaceInspectionRow');
  if(diagnostics?.parentElement){diagnostics.insertAdjacentElement('afterend',row);return true;}
  const primary=document.querySelector('#faceInspectionRow');
  if(primary?.parentElement){primary.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}


function apply(){
  const m=mesh(),ids=selectedFaces();
  if(!m||ids.length!==1)return;
  const info=inspect(m,ids[0]);
  if(!info.ok){if(status)status.textContent=`Coplanar Region • ${info.reason}`;sync();return;}

  if(multiToggle){
    const wanted=info.indices.length>1;
    if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  }
  bridge()?.set?.('face',info.indices);
  render();
  if(status)status.textContent=info.count>1
    ?`Coplanar Region • ${info.count} connected faces selected`
    :'Coplanar Region • no coplanar neighbours';
}

function sync(){
  place();
  const m=mesh(),ids=selectedFaces();
  const info=m&&ids.length===1?inspect(m,ids[0]):null;
  button.disabled=!info?.ok;
  button.title=info?.ok
    ?(info.count>1?`Select ${info.count} edge-connected coplanar faces`:'Selected Face has no coplanar neighbours')
    :'Select exactly one Face as the coplanar seed';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectCoplanarRegion={version:'0.36.18.69',inspect,apply,samePlane};
