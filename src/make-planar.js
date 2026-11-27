import * as THREE from 'three';
import {planarizeSelectedFaces} from './make-planar-core.js?v=0.36.18.1244';

// BoxLab v0.36.18.93 — Make Planar.
// Iteratively fits each selected Face while sharing proposed vertex moves.

const faceTools=document.querySelector('[data-mode-tools="face"]');
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function selectedFaces(){
  const m=mesh(),b=bridge();
  if(!m||b?.mode?.()!=='face')return[];
  return[...new Set(b.indices?.()||[])].filter(i=>Number.isInteger(i)&&Array.isArray(m.faces?.[i])&&m.faces[i].length>=4);
}

function analyse(m,fi){
  const face=m?.faces?.[fi];
  if(!Array.isArray(face)||face.length<4)return{ok:false,reason:'Select one Face with at least four vertices'};
  const pts=face.map(i=>m.vertices?.[i]);
  if(pts.some(v=>!v))return{ok:false,reason:'Selected Face has invalid vertices'};

  const normal=new THREE.Vector3();
  const center=new THREE.Vector3();
  const box=new THREE.Box3();
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    normal.x+=(a.y-b.y)*(a.z+b.z);
    normal.y+=(a.z-b.z)*(a.x+b.x);
    normal.z+=(a.x-b.x)*(a.y+b.y);
    center.add(a);box.expandByPoint(a);
  }
  if(normal.lengthSq()<1e-20)return{ok:false,reason:'Selected Face is degenerate'};
  normal.normalize();center.multiplyScalar(1/pts.length);

  let maxDeviation=0;
  for(const p of pts)maxDeviation=Math.max(maxDeviation,Math.abs(p.clone().sub(center).dot(normal)));
  const tolerance=Math.max(1e-7,box.getSize(new THREE.Vector3()).length()*1e-6);
  return{ok:true,face:[...face],normal,center,maxDeviation,tolerance,needsPlanar:maxDeviation>tolerance};
}

const row=document.createElement('div');
row.id='makePlanarRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='makePlanarBtn';
button.type='button';
button.textContent='Make Planar';
button.disabled=true;
button.style.cssText='width:100%;min-width:0';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const anchor=document.querySelector('#pokeFacesRow')||document.querySelector('#triangulateFacesRow');
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}

function apply(){
  const m=mesh(),ids=selectedFaces(),history=globalThis.__boxlabHistory;
  if(!m||!ids.length||!history)return false;
  const result=planarizeSelectedFaces(m,ids);
  if(!result.ok){if(status)status.textContent=`Make Planar • ${result.reason}`;sync();return false;}
  if(!result.moved){if(status)status.textContent='Make Planar • selected faces are already planar';sync();return false;}

  history.push(m.clone());
  m.vertices=result.mesh.vertices;
  m.edges?.();
  bridge()?.set?.('face',ids);
  globalThis.__boxlabObjectManager?.saveActive?.();
  render();
  if(status)status.textContent=`Make Planar • ${ids.length} face${ids.length===1?'':'s'} planar • ${result.moved} vertices moved (max ${result.maxMove.toPrecision(3)})`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const ids=selectedFaces(),m=mesh();
  button.textContent=ids.length>1?'Make Planar · moves verts':'Make Planar';
  if(!ids.length){
    button.disabled=true;
    button.title='Select one or more non-planar faces';
    return;
  }
  const infos=ids.map(i=>analyse(m,i));
  button.disabled=infos.some(info=>!info.ok)||!infos.some(info=>info.needsPlanar)||!globalThis.__boxlabHistory;
  button.title=button.disabled?'Selected faces are planar or invalid':`Make ${ids.length} selected faces planar • moves shared vertices • Undo available`;
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
globalThis.__boxlabMakePlanar={version:'0.36.18.1244',analyse,apply};
