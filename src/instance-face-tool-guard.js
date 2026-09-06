// BoxLab v0.36.19.6 — linked-instance face-tool ownership guard.
// The normal direct face controller runs first. If it cannot claim an armed
// Extrude/Inset pointer-down on a linked object, recover the clicked face and
// retry once before main.js can interpret the same gesture as a component Move.

import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
let retrying=false;

function state(){return globalThis.__boxlabBridgeState;}
function manager(){return globalThis.__boxlabObjectManager;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function linkedActive(){
  const m=manager(),api=globalThis.__boxlabObjectGeometry;
  if(!m||!api?.linkedIds)return false;
  return (api.linkedIds(m.activeId)||[]).length>1;
}
function armedFaceTool(){
  if(document.querySelector('#extrudeBtn.boxlab-direct-stable'))return'extrude';
  if(document.querySelector('#insetBtn.boxlab-direct-stable'))return'inset';
  return null;
}
function hitFace(event){
  const s=state(),m=s?.mesh,camera=s?.camera;
  if(!m||!camera||!m.faces?.length)return null;
  const r=canvas.getBoundingClientRect();
  pointer.set((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));
  raycaster.setFromCamera(pointer,camera);
  let best=null;
  for(let fi=0;fi<m.faces.length;fi++){
    const f=m.faces[fi];
    if(!Array.isArray(f)||f.length<3)continue;
    const positions=[];
    for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){
      const v=m.vertices[vi];if(v)positions.push(v.x,v.y,v.z);
    }
    if(!positions.length)continue;
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
    const picker=new THREE.Mesh(geometry,material);
    const hit=raycaster.intersectObject(picker,false)[0];
    geometry.dispose();material.dispose();
    if(hit&&(!best||hit.distance<best.distance))best={index:fi,distance:hit.distance};
  }
  return best?.index??null;
}

document.addEventListener('pointerdown',event=>{
  if(event.target!==canvas||!event.isPrimary||!linkedActive()||!armedFaceTool())return;
  // If the normal direct controller claimed the event, stopImmediatePropagation
  // prevents this listener from running. Reaching here means it fell through.
  if(retrying){event.preventDefault();event.stopImmediatePropagation();return;}
  const face=hitFace(event);
  event.preventDefault();event.stopImmediatePropagation();
  if(!Number.isInteger(face)||bridge()?.mode?.()!=='face')return;
  bridge()?.set?.('face',[face]);
  const retry=new PointerEvent('pointerdown',{
    bubbles:true,cancelable:true,composed:true,
    pointerId:event.pointerId,pointerType:event.pointerType,isPrimary:event.isPrimary,
    button:event.button,buttons:event.buttons,clientX:event.clientX,clientY:event.clientY,
    pressure:event.pressure,width:event.width,height:event.height,
    ctrlKey:event.ctrlKey,shiftKey:event.shiftKey,altKey:event.altKey,metaKey:event.metaKey
  });
  retrying=true;
  try{canvas.dispatchEvent(retry);}finally{retrying=false;}
},true);

globalThis.__boxlabInstanceFaceToolGuard={version:'0.36.19.6'};
