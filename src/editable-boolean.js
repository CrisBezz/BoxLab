import * as THREE from 'three';
import {createEditableBooleanController,editableBooleanEligibility,recordBooleanRecipe,booleanMeshSignature} from './editable-boolean-core.js?v=0.36.18.798';

const VERSION='0.36.18.798';
const panel=document.createElement('div');
panel.id='editableBooleanPanel';panel.className='boxlab-tool-session-shell';panel.hidden=true;
panel.innerHTML=`<div class="boxlab-tool-session-title">Edit Boolean</div>
<div class="outliner-actions" style="grid-template-columns:1fr 1fr">
<button type="button" data-edit-source="a" style="color:#f3b34a">A · Base</button>
<button type="button" data-edit-source="b" style="color:#5da9ff">B · Cutter</button></div>
<div class="outliner-actions" style="grid-template-columns:repeat(3,1fr)">
<button type="button" data-edit-operation="union">Union</button><button type="button" data-edit-operation="difference">A − B</button><button type="button" data-edit-operation="intersection">Intersect</button></div>
<div class="drawer-hint">Select A or B, then move, rotate or scale with the gizmo. Update previews the result.</div>
<div role="status" id="editableBooleanNote"></div>
<button type="button" id="editableBooleanUpdate">Update Preview</button>
<div class="outliner-actions"><button type="button" id="editableBooleanCancel">Cancel</button><button type="button" id="editableBooleanApply" class="boxlab-tool-session-primary">Apply</button></div>`;
document.querySelector('[data-mode-tools="object"]')?.appendChild(panel);
const note=panel.querySelector('#editableBooleanNote');
let overlay=null,overlaySignature='',queued=false;
const manager=()=>globalThis.__boxlabObjectManager;
const mode=()=>globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset.mode;
const busy=()=>document.querySelector('#totalGizmo')?.dataset.dragging==='true'||!!globalThis.__boxlabMainDirectTool?.busy?.();
const status=text=>{if(note)note.textContent=text;const node=document.querySelector('#selectionStatus');if(node)node.textContent=text;};
function disposeOverlay(){
  if(overlay){overlay.removeFromParent();overlay.traverse(o=>{o.geometry?.dispose?.();o.material?.dispose?.();});}
  overlay=null;overlaySignature='';
}
function refreshOverlay(){
  const s=controller.state(),scene=globalThis.__boxlabBridgeState?.scene;if(!s||!scene){disposeOverlay();return;}
  const objects=manager().objects,a=objects.find(o=>o.id===s.aId),b=objects.find(o=>o.id===s.bId);
  if(!a||!b)return;
  const signature=JSON.stringify([booleanMeshSignature(a.mesh),booleanMeshSignature(b.mesh),s.previewSignature,s.operation]);
  if(signature===overlaySignature)return;
  disposeOverlay();overlaySignature=signature;overlay=new THREE.Group();overlay.name='Editable Boolean guides';
  for(const [object,color] of [[a,0xf3b34a],[b,0x5da9ff]]){
    const positions=[];for(const e of object.mesh.edges())for(const i of [e.a,e.b])positions.push(...object.mesh.vertices[i].toArray());
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    const lines=new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({color,depthTest:false,transparent:true,opacity:.7}));lines.renderOrder=20;overlay.add(lines);
  }
  if(s.preview){const mesh=new THREE.Mesh(s.preview.triangulatedGeometry(),new THREE.MeshBasicMaterial({color:0x65dbc7,transparent:true,opacity:.3,side:THREE.DoubleSide,depthWrite:false}));overlay.add(mesh);}
  scene.add(overlay);
}
function sync(){
  queued=false;
  const launch=document.querySelector('#booleanLaunchBtn');
  if(launch){const e=eligible();launch.textContent=e.ok?'Edit Boolean':'Boolean';launch.title=e.ok?'Reopen the sources of this Boolean result':e.reason;}
  if(!controller.active())return;
  const s=controller.state(),objects=manager().objects;
  for(const key of ['a','b']){const object=objects.find(o=>o.id===s[key+'Id']),button=panel.querySelector(`[data-edit-source="${key}"]`);button.textContent=`${key.toUpperCase()} · ${object?.name||'Missing source'}`;button.classList.toggle('active',manager().activeId===object?.id);}
  panel.querySelectorAll('[data-edit-operation]').forEach(button=>button.classList.toggle('active',button.dataset.editOperation===s.operation));
  const e=controller.context();
  if(!e.ok){if(!busy())cancel();return;}
  refreshOverlay();
}
function queueSync(){if(!queued){queued=true;queueMicrotask(sync);}}
const controller=createEditableBooleanController({manager,objectHistory:()=>globalThis.__boxlabObjectHistory,history:()=>globalThis.__boxlabHistory,
  solve:(a,b,op)=>globalThis.__boxlabBooleanPrototype.buildResult(a,b,op),busy,
  changed:detail=>{if(detail?.applied!=null)globalThis.__boxlabObjectSelection?.single?.(detail.applied);queueSync();}});
function eligible(){
  const m=manager();if(!m||mode()!=='object')return{ok:false,reason:'Select an editable Boolean result in Object mode'};
  const objects=m.objects;return editableBooleanEligibility(objects,objects.find(o=>o.id===m.activeId));
}
function finish(){
  panel.hidden=true;disposeOverlay();globalThis.__boxlabToolSession?.end?.('boolean-edit');
  globalThis.__boxlabTransformArming?.disarm?.();
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'object',tool:'Boolean'}}));queueSync();
}
function open(){
  if(!globalThis.__boxlabToolSession)return false;
  globalThis.__boxlabBooleanToolSession?.close?.({silent:true});
  const result=controller.open(manager()?.activeId);if(!result.ok){status(result.reason);return false;}
  panel.hidden=false;
  globalThis.__boxlabToolSession.begin({id:'boolean-edit',title:'Edit Boolean',node:panel});
  globalThis.__boxlabObjectSelection?.single?.(manager().activeId);
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  status('Edit source A or B, then Update Preview');queueSync();return true;
}
function cancel(){if(!controller.cancel())return false;finish();status('Boolean edit cancelled');return true;}
function update(){const result=controller.update();status(result.ok?'Preview updated · Apply keeps this result':`Preview refused · ${result.reason}`);return result;}
function apply(){const result=controller.apply();if(result.ok){finish();status(result.unchanged?'Boolean unchanged':'Boolean updated · sources hidden');}else status(`Boolean update refused · ${result.reason}`);return result;}
panel.querySelectorAll('[data-edit-source]').forEach(button=>button.addEventListener('click',()=>{if(controller.choose(controller.state()?.[button.dataset.editSource+'Id'])){globalThis.__boxlabObjectSelection?.single?.(manager().activeId);document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}}));
panel.querySelectorAll('[data-edit-operation]').forEach(button=>button.addEventListener('click',()=>controller.operation(button.dataset.editOperation)));
panel.querySelector('#editableBooleanUpdate').addEventListener('click',update);
panel.querySelector('#editableBooleanCancel').addEventListener('click',cancel);
panel.querySelector('#editableBooleanApply').addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',queueSync);
window.addEventListener('boxlab-object-manager-ready',queueSync);
window.addEventListener('boxlab-tool-session-change',event=>{if(controller.active()&&event.detail?.id==='boolean-edit'&&!event.detail.active)cancel();});
// Use existing gesture/transform owners; no new viewport pointer handler.
document.addEventListener('click',event=>{
  if(!controller.active()||panel.contains(event.target))return;
  if(event.target?.closest?.('#selectionModes button,#outlinerAddBtn,#outlinerDuplicateBtn,#outlinerDeleteBtn,#resetBtn,#importMeshBtn,#exportAsBtn,#exportBaseBtn,#exportSubdBtn,#linkedDuplicateBtn,#makeUniqueBtn,#modifiersDrawer input,#modifiersDrawer button,.outliner-more-menu,.object-action-menu,.mode-tools[data-mode-tools="object"] button')){
    if(busy()){event.preventDefault();event.stopImmediatePropagation();return;}
    cancel();
  }
},true);
window.addEventListener('keydown',event=>{if(controller.active()&&['Escape','Delete','Backspace'].includes(event.key)&&!event.target?.closest?.('input,textarea,[contenteditable="true"]')){if(cancel()){event.preventDefault();event.stopImmediatePropagation();}}},true);
globalThis.__boxlabEditableBoolean={version:VERSION,record:recordBooleanRecipe,eligible,open,cancel,update,apply,active:controller.active,state:controller.state};
queueSync();
