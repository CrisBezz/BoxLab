import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const faceModeButton=document.querySelector('#selectionModes button[data-mode="face"]');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
const TAP_THRESHOLD=8;
let press=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function faceMode(){return !!faceModeButton?.classList.contains('active');}
function selectedFaces(){
  const b=bridge();
  return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[];
}
function directFaceToolActive(){
  return !!document.querySelector('#extrudeBtn.active,#insetBtn.active');
}
function setPointer(event){
  const rect=canvas.getBoundingClientRect();
  pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
  pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
}
function hitSelectedFace(event){
  const s=state(),selected=new Set(selectedFaces());
  if(!s?.camera||!(s.faceObjects instanceof Map)||!selected.size)return null;
  setPointer(event);
  raycaster.setFromCamera(pointer,s.camera);
  const objects=[...s.faceObjects.entries()].filter(([index,obj])=>selected.has(index)&&obj).map(([,obj])=>obj);
  for(const hit of raycaster.intersectObjects(objects,false)){
    const index=hit?.object?.userData?.index;
    if(Number.isInteger(index)&&selected.has(index))return index;
  }
  return null;
}

canvas?.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.pointerType==='touch'||!faceMode()||directFaceToolActive())return;
  const targetIndex=hitSelectedFace(event);
  if(!Number.isInteger(targetIndex))return;
  press={
    pointerId:event.pointerId,
    targetIndex,
    originalSelection:selectedFaces(),
    startX:event.clientX,
    startY:event.clientY,
    moved:false
  };
},true);

canvas?.addEventListener('pointermove',event=>{
  if(!press||press.pointerId!==event.pointerId)return;
  if(Math.hypot(event.clientX-press.startX,event.clientY-press.startY)>=TAP_THRESHOLD)press.moved=true;
},true);

canvas?.addEventListener('pointerup',event=>{
  if(!press||press.pointerId!==event.pointerId)return;
  const current=press;press=null;
  const moved=current.moved||Math.hypot(event.clientX-current.startX,event.clientY-current.startY)>=TAP_THRESHOLD;
  if(moved||directFaceToolActive()||!faceMode())return;
  const now=selectedFaces();
  if(!now.includes(current.targetIndex))return;
  const keep=now.filter(index=>index!==current.targetIndex);
  bridge()?.set?.('face',keep);
},true);

canvas?.addEventListener('pointercancel',event=>{
  if(press?.pointerId===event.pointerId)press=null;
},true);
