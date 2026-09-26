import * as THREE from 'three';
import {analyzeRevolveInput,buildRevolveMesh} from './revolve-core.js?v=0.36.18.386';

const edgeTools=document.querySelector('.mode-tools[data-mode-tools="edge"]');
const drawer=document.querySelector('#editDrawer');
const status=document.querySelector('#selectionStatus');

const controls=document.createElement('div');
controls.className='revolve-controls';
const revolveStyle=document.createElement('style');
revolveStyle.textContent='.revolve-controls:not(.revolve-active) [data-revolve-settings]{display:none!important}.revolve-controls:not(.revolve-active) .outliner-actions{grid-template-columns:1fr!important}';
document.head.appendChild(revolveStyle);
controls.innerHTML=`
  <div class="edge-section-label" data-revolve-settings>Lathe / Revolve</div>
  <div class="outliner-actions" style="grid-template-columns:repeat(4,1fr)">
    <button id="revolveBtn" type="button">Revolve</button>
    <button type="button" data-revolve-axis="x" data-revolve-settings>X</button>
    <button type="button" data-revolve-axis="y" data-revolve-settings class="active">Y</button>
    <button type="button" data-revolve-axis="z" data-revolve-settings>Z</button>
  </div>
  <label class="range-row" data-revolve-settings>
    <span>Segments</span>
    <input id="revolveSegments" type="range" min="6" max="64" value="24" step="1"/>
    <output id="revolveSegmentsOut">24</output>
  </label>
`;
// Edge Revolve UI intentionally not mounted: loose-edge profiles are not discoverable enough for the normal Edge tool surface.

const button=controls.querySelector('#revolveBtn');
const segmentInput=controls.querySelector('#revolveSegments');
const segmentOut=controls.querySelector('#revolveSegmentsOut');
const axisButtons=[...controls.querySelectorAll('[data-revolve-axis]')];

let axis='y',preview=null,previewArmed=false,previewObjectId=null,previewEdges=[],drawerLock=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function manager(){return globalThis.__boxlabObjectManager;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function edgeSelection(){return mode()==='edge'?[...new Set(bridge()?.indices?.()||[])]:[];}
function segments(){return Math.max(6,Math.min(64,Math.round(Number(segmentInput?.value)||24)));}
function originFor(object,mesh){
  const api=globalThis.__boxlabObjectOrigins;
  if(api?.originFor)return api.originFor(object,mesh);
  const o=object?.origin;
  if(o&&[o.x,o.y,o.z].every(Number.isFinite))return new THREE.Vector3(o.x,o.y,o.z);
  const box=new THREE.Box3();for(const v of mesh?.vertices||[])box.expandByPoint(v);
  return box.isEmpty()?new THREE.Vector3():box.getCenter(new THREE.Vector3());
}
function setStatus(text){if(status)status.textContent=text;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function restore(target,source){
  target.vertices=source.vertices.map(v=>v.clone());
  target.faces=source.faces.map(f=>[...f]);
  target.creases=new Map(source.creases||[]);
  target.looseEdges=new Set(source.looseEdges||[]);
  target.looseVertices=new Set(source.looseVertices||[]);
  target.edges?.();
}
function disposePreview(){
  if(preview?.parent)preview.parent.remove(preview);
  if(preview){
    const geometries=new Set(),materials=new Set();
    preview.traverse?.(node=>{
      if(node.geometry)geometries.add(node.geometry);
      if(Array.isArray(node.material))node.material.forEach(m=>m&&materials.add(m));
      else if(node.material)materials.add(node.material);
    });
    geometries.forEach(g=>g.dispose?.());materials.forEach(m=>m.dispose?.());
  }
  preview=null;
}
function lockDrawer(){
  if(!drawer)return;
  if(!drawerLock)drawerLock={keepOpen:drawer.dataset.keepOpen,open:drawer.open};
  drawer.dataset.keepOpen='true';drawer.open=true;
}
function unlockDrawer(){
  if(!drawer||!drawerLock)return;
  const old=drawerLock;drawerLock=null;
  if(old.keepOpen===undefined)delete drawer.dataset.keepOpen;else drawer.dataset.keepOpen=old.keepOpen;
  if(old.open)drawer.open=true;
}
function cancelPreview({silent=false}={}){
  disposePreview();previewArmed=false;previewObjectId=null;previewEdges=[];unlockDrawer();
  if(button)button.textContent='Revolve';controls.classList.remove('revolve-active');
  if(!silent)setStatus('Revolve preview cancelled');
}
function previewOptions(){
  const object=activeObject(),mesh=state()?.mesh;
  return{axis,segments:segments(),origin:originFor(object,mesh)};
}
function axisGuide(origin,mesh){
  const box=new THREE.Box3();for(const v of mesh?.vertices||[])box.expandByPoint(v);
  const size=Math.max(1,box.getSize(new THREE.Vector3()).length()*1.2);
  const dir=axis==='x'?new THREE.Vector3(1,0,0):axis==='z'?new THREE.Vector3(0,0,1):new THREE.Vector3(0,1,0);
  const points=[origin.clone().addScaledVector(dir,-size),origin.clone().addScaledVector(dir,size)];
  const geometry=new THREE.BufferGeometry().setFromPoints(points);
  const material=new THREE.LineBasicMaterial({transparent:true,opacity:.9,depthTest:false,depthWrite:false});
  const line=new THREE.Line(geometry,material);line.renderOrder=15;line.userData.boxlabRevolveAxis=true;return line;
}
function buildPreview(){
  if(!previewArmed)return false;
  const object=activeObject(),live=state()?.mesh,scene=state()?.scene;
  if(!object||object.id!==previewObjectId||!live||!scene||mode()!=='edge'){cancelPreview({silent:true});return false;}
  const current=edgeSelection();
  if(current.length!==previewEdges.length||current.some((v,i)=>v!==previewEdges[i])){cancelPreview({silent:true});return false;}
  const result=buildRevolveMesh(live,previewEdges,previewOptions());
  if(!result.ok){setStatus(`Revolve refused • ${result.reason}`);return false;}
  disposePreview();
  const geometry=result.mesh.triangulatedGeometry();
  const fillMaterial=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.18,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
  const wireMaterial=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.62,side:THREE.DoubleSide,wireframe:true,depthTest:false,depthWrite:false});
  const fill=new THREE.Mesh(geometry,fillMaterial),wire=new THREE.Mesh(geometry,wireMaterial);
  fill.renderOrder=12;wire.renderOrder=13;
  preview=new THREE.Group();preview.add(fill,wire,axisGuide(previewOptions().origin,result.mesh));
  preview.name='BoxLab Revolve Preview';preview.userData.boxlabRevolvePreview=true;scene.add(preview);
  setStatus(`Revolve preview • ${axis.toUpperCase()} • ${segments()} segments • Apply Revolve to commit`);
  return true;
}
function preflight(){
  const object=activeObject(),live=state()?.mesh,selected=edgeSelection();
  if(mode()!=='edge'||!object||!live||object.locked||object.kind==='reference')return{ok:false,reason:'Select a loose-edge profile in Edge mode'};
  return analyzeRevolveInput(live,selected,{...previewOptions()});
}
function applyRevolve(){
  const object=activeObject(),live=state()?.mesh,m=manager();
  if(!object||object.id!==previewObjectId||!live)return false;
  const result=buildRevolveMesh(live,previewEdges,previewOptions());
  if(!result.ok){setStatus(`Revolve refused • ${result.reason}`);return false;}
  const before=live.clone();
  globalThis.__boxlabHistory?.push(before);
  restore(live,result.mesh);
  bridge()?.set?.('edge',[]);
  m?.saveActive?.();
  globalThis.__boxlabRevolveLastResult={version:'0.36.18.386',axis,segments:segments(),vertices:result.vertices,faces:result.faces,closedEnds:result.closedEnds};
  render();
  setStatus(`Revolve • ${axis.toUpperCase()} • ${segments()} segments • ${result.faces} faces`);
  return true;
}
function installPenRange(input,onValue){
  if(!input)return;
  let pointerId=null,owned=null,releaseFrame=null;
  const map=clientX=>{
    const rect=input.getBoundingClientRect(),min=Number(input.min),max=Number(input.max),step=Number(input.step)||1;
    if(!rect.width)return Number(input.value);
    const t=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width)),raw=min+t*(max-min);
    return Number((min+Math.round((raw-min)/step)*step).toFixed(6));
  };
  const apply=value=>{owned=value;input.value=String(value);onValue();};
  const enforce=()=>{if(owned===null)return false;if(Number(input.value)!==Number(owned))input.value=String(owned);return true;};
  input.addEventListener('pointerdown',event=>{if(event.pointerType!=='pen')return;pointerId=event.pointerId;input.setPointerCapture?.(pointerId);event.preventDefault();event.stopPropagation();apply(map(event.clientX));},{capture:true,passive:false});
  input.addEventListener('pointermove',event=>{if(event.pointerType!=='pen'||event.pointerId!==pointerId)return;event.preventDefault();event.stopPropagation();apply(map(event.clientX));},{capture:true,passive:false});
  const end=event=>{if(event.pointerType!=='pen'||event.pointerId!==pointerId)return;event.preventDefault();event.stopPropagation();if(input.hasPointerCapture?.(pointerId))input.releasePointerCapture(pointerId);pointerId=null;if(releaseFrame)cancelAnimationFrame(releaseFrame);releaseFrame=requestAnimationFrame(()=>{enforce();releaseFrame=requestAnimationFrame(()=>{enforce();owned=null;releaseFrame=null;});});};
  input.addEventListener('pointerup',end,{capture:true,passive:false});input.addEventListener('pointercancel',end,{capture:true,passive:false});
  input.addEventListener('input',()=>{enforce();onValue();});input.addEventListener('change',()=>{if(enforce())onValue();});
}

axisButtons.forEach(control=>control.addEventListener('click',()=>{
  axis=control.dataset.revolveAxis;axisButtons.forEach(b=>b.classList.toggle('active',b===control));if(previewArmed)buildPreview();
}));
installPenRange(segmentInput,()=>{if(segmentOut)segmentOut.textContent=String(segments());if(previewArmed)buildPreview();});
button?.addEventListener('click',()=>{
  if(!previewArmed){
    const check=preflight();if(!check.ok){setStatus(`Revolve refused • ${check.reason}`);return;}
    previewEdges=edgeSelection();previewObjectId=activeObject()?.id||null;previewArmed=true;controls.classList.add('revolve-active');lockDrawer();button.textContent='Apply Revolve';buildPreview();return;
  }
  if(applyRevolve()){disposePreview();previewArmed=false;previewObjectId=null;previewEdges=[];controls.classList.remove('revolve-active');unlockDrawer();button.textContent='Revolve';}
});
drawer?.addEventListener('toggle',()=>{if(previewArmed&&!drawer.open)queueMicrotask(()=>{if(previewArmed)drawer.open=true;});});
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(()=>{if(previewArmed&&mode()!=='edge')cancelPreview({silent:true});})));
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(()=>{if(previewArmed&&activeObject()?.id!==previewObjectId)cancelPreview({silent:true});}));
window.addEventListener('beforeunload',()=>{disposePreview();unlockDrawer();});
if(segmentOut)segmentOut.textContent=String(segments());

globalThis.__boxlabRevolve={
  version:'0.36.18.386',
  analyze:analyzeRevolveInput,
  get active(){return previewArmed;},
  rebuild:buildPreview,
  cancel:cancelPreview
};
