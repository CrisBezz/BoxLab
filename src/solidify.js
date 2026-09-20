import * as THREE from 'three';
import { analyzeSolidifyInput, solidifyOpenMesh } from './solidify-core.js?v=0.36.18.374';

const button=document.querySelector('#solidifyBtn');
const input=document.querySelector('#solidifyThickness');
const output=document.querySelector('#solidifyThicknessOut');
const status=document.querySelector('#selectionStatus');
const canvas=document.querySelector('#viewport');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

let preview=null,previewObjectId=null,previewArmed=false,thicknessDrag=null;

function manager(){return globalThis.__boxlabObjectManager;}
function mesh(){return globalThis.__boxlabBridgeState?.mesh||null;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function selectionMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function camera(){return globalThis.__boxlabBridgeState?.camera||null;}
function controls(){return globalThis.__boxlabBridgeState?.controls||null;}
function setStatus(text){if(status)status.textContent=text;}
function minThickness(){return Number(input?.min)||0.01;}
function maxThickness(){return Number(input?.max)||1;}
function thickness(){const value=Number(input?.value);return Number.isFinite(value)?value:0.2;}
function setThickness(value,{rebuild=true}={}){
  const step=Number(input?.step)||0.01;
  const clamped=Math.max(minThickness(),Math.min(maxThickness(),Number(value)||minThickness()));
  const snapped=Math.round(clamped/step)*step;
  if(input)input.value=String(Number(snapped.toFixed(6)));
  syncThickness();
  if(rebuild&&previewArmed)buildPreview();
  return thickness();
}
function syncThickness(){if(output)output.textContent=Number(thickness().toFixed(3)).toString();}
function scene(){return globalThis.__boxlabBridgeState?.scene||null;}
function disposePreview(){
  if(preview?.parent)preview.parent.remove(preview);
  preview?.geometry?.dispose?.();
  preview?.material?.dispose?.();
  preview=null;
}
function endThicknessDrag(){
  if(!thicknessDrag)return;
  const ctl=controls();
  if(ctl)ctl.enabled=thicknessDrag.controlsWereEnabled;
  if(canvas?.hasPointerCapture?.(thicknessDrag.pointerId))canvas.releasePointerCapture(thicknessDrag.pointerId);
  thicknessDrag=null;
}
function cancelPreview({silent=false}={}){
  endThicknessDrag();
  disposePreview();previewArmed=false;previewObjectId=null;
  if(button)button.textContent='Solidify';
  if(!silent)setStatus('Solidify preview cancelled');
}
function buildPreview(){
  if(!previewArmed)return false;
  const object=activeObject(),live=mesh(),targetScene=scene();
  if(!object||!live||!targetScene||object.id!==previewObjectId){cancelPreview({silent:true});return false;}
  const working=live.clone(),sourceFaceCount=working.faces.length;
  const result=solidifyOpenMesh(working,thickness());
  disposePreview();
  if(!result.ok){setStatus(`Solidify preview unavailable • ${result.reason||'invalid thickness'}`);return false;}

  // Preview only geometry created by Solidify (inner shell + boundary walls).
  // The source sheet remains the normal editable object underneath.
  working.faces=working.faces.slice(sourceFaceCount);
  const geometry=working.triangulatedGeometry();
  const material=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.34,side:THREE.DoubleSide,depthWrite:false});
  preview=new THREE.Mesh(geometry,material);
  preview.name='BoxLab Solidify Preview';
  preview.renderOrder=12;
  preview.userData.boxlabSolidifyPreview=true;
  targetScene.add(preview);
  if(!thicknessDrag)setStatus(`Solidify preview • ${Number(thickness().toFixed(3))} • drag translucent shell or use Thickness • Apply Solidify to commit`);
  return true;
}
function preflightMessage(reason){
  const labels={
    'closed-mesh':'Solidify needs an open sheet • closed solids will use Shell in a later Phase D build',
    'non-manifold-edge':'Solidify refused • non-manifold edge',
    'inconsistent-winding':'Solidify refused • fix inconsistent face winding first',
    'branched-boundary':'Solidify refused • boundary is branched',
    'duplicate-face':'Solidify refused • duplicate face',
    'degenerate-face':'Solidify refused • degenerate face',
    'zero-area-face':'Solidify refused • zero-area face',
    'opposed-fold':'Solidify refused • folded faces oppose each other',
    'excessive-miter':'Solidify refused • fold angle creates an excessive thickness miter',
    'singular-offset':'Solidify refused • fold geometry cannot form a stable offset'
  };
  return labels[reason]||`Solidify refused • ${reason||'invalid open mesh'}`;
}
function update(){
  const object=activeObject(),live=mesh();
  if(previewArmed&&(selectionMode()!=='object'||object?.id!==previewObjectId))cancelPreview({silent:true});
  const eligible=selectionMode()==='object'&&!!object&&!!live&&!object.locked&&object.kind!=='reference';
  if(button)button.disabled=!eligible;
  syncThickness();
}
function forceRender(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabObjectSelection?.refresh?.();
  globalThis.__boxlabTopologyGate?.sync?.();
}
function pointerNdc(event){
  const rect=canvas?.getBoundingClientRect();
  if(!rect||!rect.width||!rect.height)return false;
  pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
  pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
  return true;
}
function projectedNormalAxis(hit){
  const cam=camera(),rect=canvas?.getBoundingClientRect();
  if(!cam||!rect||!hit?.face?.normal)return null;
  const worldNormal=hit.face.normal.clone().transformDirection(preview.matrixWorld).normalize();
  const p0=hit.point.clone(),distance=Math.max(0.01,cam.position.distanceTo(p0));
  const worldProbe=Math.max(distance*0.08,0.05);
  const p1=p0.clone().addScaledVector(worldNormal,worldProbe);
  const a=p0.clone().project(cam),b=p1.clone().project(cam);
  const dx=(b.x-a.x)*rect.width*0.5,dy=-(b.y-a.y)*rect.height*0.5;
  const length=Math.hypot(dx,dy);
  if(length<4)return null;
  const worldPerPixel=cam.isPerspectiveCamera
    ? (2*distance*Math.tan(THREE.MathUtils.degToRad(cam.fov*0.5)))/Math.max(1,rect.height)
    : Math.max(0.0001,(cam.top-cam.bottom)/Math.max(1,rect.height));
  return{x:dx/length,y:dy/length,worldPerPixel};
}
function beginThicknessDrag(event){
  if(!previewArmed||!preview||thicknessDrag||event.pointerType==='mouse'&&event.button!==0)return false;
  const cam=camera();
  if(!cam||!pointerNdc(event))return false;
  raycaster.setFromCamera(pointer,cam);
  const hit=raycaster.intersectObject(preview,false)[0];
  if(!hit)return false;
  const axis=projectedNormalAxis(hit);
  if(!axis)return false;
  const ctl=controls();
  thicknessDrag={
    pointerId:event.pointerId,
    startX:event.clientX,startY:event.clientY,
    startThickness:thickness(),
    axisX:axis.x,axisY:axis.y,
    worldPerPixel:axis.worldPerPixel,
    controlsWereEnabled:ctl?.enabled!==false
  };
  if(ctl)ctl.enabled=false;
  canvas?.setPointerCapture?.(event.pointerId);
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();
  setStatus(`Solidify direct thickness • ${Number(thickness().toFixed(3))} • drag along surface normal`);
  return true;
}
function moveThicknessDrag(event){
  if(!thicknessDrag||event.pointerId!==thicknessDrag.pointerId)return false;
  const dx=event.clientX-thicknessDrag.startX,dy=event.clientY-thicknessDrag.startY;
  const projected=dx*thicknessDrag.axisX+dy*thicknessDrag.axisY;
  const next=thicknessDrag.startThickness+projected*thicknessDrag.worldPerPixel;
  setThickness(next,{rebuild:true});
  setStatus(`Solidify direct thickness • ${Number(thickness().toFixed(3))} • release to keep preview value`);
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();
  return true;
}
function finishThicknessDrag(event){
  if(!thicknessDrag||event.pointerId!==thicknessDrag.pointerId)return false;
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();
  endThicknessDrag();
  setStatus(`Solidify preview • ${Number(thickness().toFixed(3))} • drag again or Apply Solidify`);
  return true;
}

input?.addEventListener('input',()=>{
  syncThickness();
  if(previewArmed)buildPreview();
});
canvas?.addEventListener('pointerdown',beginThicknessDrag,true);
canvas?.addEventListener('pointermove',moveThicknessDrag,true);
canvas?.addEventListener('pointerup',finishThicknessDrag,true);
canvas?.addEventListener('pointercancel',finishThicknessDrag,true);

button?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!object||!live||object.locked||object.kind==='reference'||selectionMode()!=='object')return;

  if(!previewArmed){
    const preflight=analyzeSolidifyInput(live);
    if(!preflight.ok){setStatus(preflightMessage(preflight.reason));return;}
    previewArmed=true;previewObjectId=object.id;
    button.textContent='Apply Solidify';
    buildPreview();
    return;
  }

  if(object.id!==previewObjectId){cancelPreview({silent:true});return;}
  endThicknessDrag();
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  const result=solidifyOpenMesh(live,thickness());
  if(!result.ok){setStatus(`Solidify rolled back • ${result.reason||'topology validation failed'}`);cancelPreview({silent:true});forceRender();return;}
  disposePreview();previewArmed=false;previewObjectId=null;
  button.textContent='Solidify';
  manager()?.saveActive?.();
  globalThis.__boxlabSolidifyLastResult={version:'0.36.18.375',...result};
  setStatus(`Solidify • thickness ${Number(result.thickness.toFixed(3))} • ${result.sideFaces} boundary wall${result.sideFaces===1?'':'s'} • closed solid`);
  forceRender();
});

window.addEventListener('boxlab-object-manager-ready',update);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(update));
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(update)));
window.addEventListener('beforeunload',()=>{endThicknessDrag();disposePreview();});
update();

globalThis.__boxlabSolidifyPreview={
  get active(){return previewArmed;},
  get dragging(){return!!thicknessDrag;},
  rebuild:buildPreview,
  cancel:cancelPreview
};
