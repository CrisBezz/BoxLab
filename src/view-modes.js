import * as THREE from 'three';

const status=document.querySelector('#selectionStatus');
const topActions=document.querySelector('.top-actions');

function state(){return globalThis.__boxlabBridgeState;}

function ensureUI(){
  if(document.querySelector('#viewModes'))return document.querySelector('#viewModes');
  const wrap=document.createElement('div');
  wrap.id='viewModes';
  wrap.className='view-modes';
  wrap.innerHTML=`<button type="button" data-view="axon">3D Axon</button><button type="button" data-view="front">Front</button><button type="button" data-view="rear">Rear</button><button type="button" data-view="left">Left</button><button type="button" data-view="right">Right</button><button type="button" data-view="top">Top</button><button type="button" data-view="bottom">Bottom</button>`;
  topActions?.prepend(wrap);
  const style=document.createElement('style');
  style.textContent=`#viewModes{display:flex;gap:4px;align-items:center;flex-wrap:wrap}#viewModes button{padding:6px 8px;font-size:12px;line-height:1;border-radius:7px}`;
  document.head.append(style);
  return wrap;
}

function modelBounds(mesh){
  const box=new THREE.Box3();
  mesh?.vertices?.forEach(v=>box.expandByPoint(v));
  return box.isEmpty()?null:box;
}

function directionFor(view){
  switch(view){
    case 'front': return new THREE.Vector3(0,0,1);
    case 'rear': return new THREE.Vector3(0,0,-1);
    case 'left': return new THREE.Vector3(-1,0,0);
    case 'right': return new THREE.Vector3(1,0,0);
    case 'top': return new THREE.Vector3(0,1,0);
    case 'bottom': return new THREE.Vector3(0,-1,0);
    default: return new THREE.Vector3(1,1,1).normalize();
  }
}

function upFor(view){
  if(view==='top')return new THREE.Vector3(0,0,-1);
  if(view==='bottom')return new THREE.Vector3(0,0,1);
  return new THREE.Vector3(0,1,0);
}

function fitDistance(camera,box){
  const size=box.getSize(new THREE.Vector3());
  const radius=Math.max(size.length()*.5,.25);
  const halfY=THREE.MathUtils.degToRad(camera.fov)*.5;
  const halfX=Math.atan(Math.tan(halfY)*Math.max(camera.aspect,.01));
  const limiting=Math.max(.1,Math.min(halfY,halfX));
  return Math.max(radius/Math.sin(limiting)*1.15,.75);
}

function setView(view){
  const s=state(),camera=s?.camera,mesh=s?.mesh;
  if(!camera||!mesh?.vertices?.length)return;
  const controls=s.controls||globalThis.__boxlabControls;
  const box=modelBounds(mesh); if(!box)return;
  const center=controls?.target?.clone?.()||box.getCenter(new THREE.Vector3());
  const distance=fitDistance(camera,box);
  const dir=directionFor(view);
  camera.up.copy(upFor(view));
  camera.position.copy(center).addScaledVector(dir,distance);
  camera.near=Math.max(.001,distance-box.getSize(new THREE.Vector3()).length()*1.5);
  camera.far=Math.max(100,distance+box.getSize(new THREE.Vector3()).length()*4);
  camera.lookAt(center);
  camera.updateProjectionMatrix();
  if(controls?.target){controls.target.copy(center);controls.update?.();}
  if(status)status.textContent=`View • ${view==='axon'?'3D Axon':view[0].toUpperCase()+view.slice(1)}`;
}

const ui=ensureUI();
ui?.addEventListener('click',e=>{const b=e.target.closest('button[data-view]');if(!b)return;e.preventDefault();e.stopPropagation();setView(b.dataset.view);});
