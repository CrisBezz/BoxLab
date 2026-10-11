import * as THREE from 'three';

// BoxLab v0.36.18.93 — Make Planar.
// Projects one selected Face onto its own current best-fit working plane.
// Shared neighbouring Faces deform naturally through the same vertices.

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
  if(!m||ids.length!==1||!history)return false;
  const fi=ids[0],info=analyse(m,fi);
  if(!info.ok){if(status)status.textContent=`Make Planar • ${info.reason}`;sync();return false;}
  if(!info.needsPlanar){if(status)status.textContent='Make Planar • selected Face is already planar';sync();return false;}

  history.push(m.clone());
  for(const vi of info.face){
    const v=m.vertices[vi];
    const d=v.clone().sub(info.center).dot(info.normal);
    v.addScaledVector(info.normal,-d);
  }
  m.edges?.();
  bridge()?.set?.('face',[fi]);
  render();
  if(status)status.textContent=`Make Planar • Face projected to plane • previous max deviation ${info.maxDeviation.toPrecision(3)}`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const ids=selectedFaces(),m=mesh();
  if(ids.length!==1){
    button.disabled=true;
    button.title=ids.length>1?'Make Planar currently works on one Face at a time':'Select one non-planar Face';
    return;
  }
  const info=analyse(m,ids[0]);
  button.disabled=!info.ok||!info.needsPlanar||!globalThis.__boxlabHistory;
  button.title=!info.ok
    ?info.reason
    :info.needsPlanar
      ?`Project selected Face onto its working plane • deviation ${info.maxDeviation.toPrecision(3)}`
      :'Selected Face is already planar';
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.93';
  document.title='BoxLab v0.36.18.93';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabMakePlanar={version:'0.36.18.93',analyse,apply};
