import * as THREE from 'three';
import { EditableMesh } from './mesh.js';
import { subdivide } from './subdivision.js';
import { applyMirror } from './mirror.js';
import { combineEditableMeshes, modifierSettingsCompatible } from './object-join-core.js?v=0.36.18.277';
import { matrixForInstance, setInstanceMatrix, transformEditableMesh, meshesNear, deriveInstancePlacement, localMeshFromWorld } from './instance-core.js?v=0.36.18.343';

const canvas = document.querySelector('#viewport');
const list = document.querySelector('#outlinerList');
const modeLabel = document.querySelector('#outlinerMode');
const addButton = document.querySelector('#outlinerAddBtn');
const duplicateButton = document.querySelector('#outlinerDuplicateBtn');
const renameButton = document.querySelector('#outlinerRenameBtn');
const deleteButton = document.querySelector('#outlinerDeleteBtn');
let linkedDuplicateButton = null;
let makeUniqueButton = null;
const status = document.querySelector('#selectionStatus');
const app = document.querySelector('#app');
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const OBJECT_HIT_EPSILON = 1e-5;
const TOUCH_TAP_MOVE_PX = 10;

let objects = [];
let activeId = null;
let soloId = null;
let nextId = 1;
let inactiveBodies = [];
let inactiveLayer = null;
let activeBody = null;
let activeRoot = null;
let initialized = false;
let renderQueued = false;
let touchTap = null;
let nextSourceId = 1;
const linkedSources = new Map();

function state() { return globalThis.__boxlabBridgeState; }
function history() { return globalThis.__boxlabHistory; }
function activeObject() { return objects.find(object => object.id === activeId) || null; }
function currentMode() { return globalThis.__boxlabSelectionBridge?.mode?.() || document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face'; }
function cap(text) { return text ? text.charAt(0).toUpperCase() + text.slice(1) : ''; }

function ensureRenameDialogStyle() {
  if (document.querySelector('#boxlabRenameDialogStyle')) return;
  const style = document.createElement('style');
  style.id = 'boxlabRenameDialogStyle';
  style.textContent = `
#boxlabRenameDialog{position:fixed;inset:0;z-index:12000;display:grid;place-items:center;padding:24px;background:rgba(4,6,9,.48);backdrop-filter:blur(5px)}
#boxlabRenameDialog .rename-card{width:min(390px,calc(100vw - 32px));padding:14px;border:1px solid rgba(255,255,255,.18);border-radius:14px;background:rgba(20,23,29,.98);box-shadow:0 20px 54px rgba(0,0,0,.46)}
#boxlabRenameDialog .rename-title{font-size:13px;font-weight:700;margin:0 0 8px;color:#eef1f7}
#boxlabRenameDialog input{width:100%;min-height:42px;padding:9px 11px;border:1px solid rgba(255,255,255,.24);border-radius:9px;background:#0f1217;color:#eef1f7;font-size:16px;outline:none;user-select:text;-webkit-user-select:text}
#boxlabRenameDialog input:focus{border-color:#eef1f7;box-shadow:0 0 0 2px rgba(238,241,247,.12)}
#boxlabRenameDialog .rename-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
#boxlabRenameDialog .rename-actions button{min-height:38px}
`;
  document.head.append(style);
}
function requestRename({title='Rename',value=''}={}) {
  ensureRenameDialogStyle();
  document.querySelector('#boxlabRenameDialog')?.remove();
  return new Promise(resolve => {
    const overlay=document.createElement('div');overlay.id='boxlabRenameDialog';
    const form=document.createElement('form');form.className='rename-card';
    const label=document.createElement('div');label.className='rename-title';label.textContent=title;
    const input=document.createElement('input');input.type='text';input.value=String(value||'');input.autocomplete='off';input.autocapitalize='off';input.spellcheck=false;input.enterKeyHint='done';
    const actions=document.createElement('div');actions.className='rename-actions';
    const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Cancel';
    const done=document.createElement('button');done.type='submit';done.textContent='Rename';done.className='primary';
    actions.append(cancel,done);form.append(label,input,actions);overlay.append(form);document.body.append(overlay);
    let settled=false;
    const finish=result=>{if(settled)return;settled=true;overlay.remove();resolve(result);};
    cancel.addEventListener('click',()=>finish(null));
    overlay.addEventListener('pointerdown',event=>{if(event.target===overlay)finish(null);});
    form.addEventListener('submit',event=>{event.preventDefault();finish(input.value);});
    input.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();finish(null);}});
    const focusAndSelect=()=>{try{input.focus({preventScroll:true});}catch{input.focus();}input.select();};
    focusAndSelect();
    requestAnimationFrame(focusAndSelect);
    setTimeout(focusAndSelect,80);
  });
}
globalThis.__boxlabRenameDialog=requestRename;

function cloneLooseValue(value) {
  if (value instanceof Map) return new Map(value);
  if (value instanceof Set) return new Set(value);
  if (Array.isArray(value)) return value.map(item => item?.clone ? item.clone() : Array.isArray(item) ? [...item] : item);
  if (value?.clone) return value.clone();
  if (value && typeof value === 'object') return { ...value };
  return value;
}

function replaceMeshInPlace(target, source) {
  if (!target || !source) return false;
  const copy = source.clone();
  for (const key of Object.keys(target)) if (!(key in copy)) delete target[key];
  for (const [key, value] of Object.entries(copy)) target[key] = cloneLooseValue(value);
  target.edges?.();
  return true;
}

function captureSettings() {
  const mirror = { x:false, y:false, z:false };
  document.querySelectorAll('[data-mirror-axis]').forEach(input => { mirror[input.dataset.mirrorAxis] = !!input.checked; });
  return {
    mirror,
    subd: !!document.querySelector('#subdToggle')?.checked,
    subdLevel: Number(document.querySelector('#subdLevel')?.value || 1),
    cage: !!document.querySelector('#cageToggle')?.checked
  };
}

function cloneSettings(settings = captureSettings()) {
  return { mirror:{ ...settings.mirror }, subd:!!settings.subd, subdLevel:Number(settings.subdLevel || 1), cage:settings.cage !== false };
}

function restoreSettings(settings) {
  if (!settings) return;
  document.querySelectorAll('[data-mirror-axis]').forEach(input => {
    const next = !!settings.mirror?.[input.dataset.mirrorAxis];
    if (input.checked === next) return;
    input.checked = next;
    input.dispatchEvent(new Event('change', { bubbles:true }));
  });
  const subd = document.querySelector('#subdToggle');
  if (subd && subd.checked !== !!settings.subd) {
    subd.checked = !!settings.subd;
    subd.dispatchEvent(new Event('change', { bubbles:true }));
  }
  const level = document.querySelector('#subdLevel');
  const nextLevel = String(Math.max(1, Math.min(4, Number(settings.subdLevel || 1))));
  if (level && level.value !== nextLevel) {
    level.value = nextLevel;
    level.dispatchEvent(new Event('input', { bubbles:true }));
  }
  const cage = document.querySelector('#cageToggle');
  if (cage && cage.checked !== (settings.cage !== false)) {
    cage.checked = settings.cage !== false;
    cage.dispatchEvent(new Event('change', { bubbles:true }));
  }
}

function captureHistory() {
  const h = history();
  return {
    undo: (h?.undoStack || []).map(mesh => mesh.clone()),
    redo: (h?.redoStack || []).map(mesh => mesh.clone())
  };
}

function restoreHistory(snapshot) {
  const h = history();
  if (!h) return;
  h.undoStack = (snapshot?.undo || []).map(mesh => mesh.clone());
  h.redoStack = (snapshot?.redo || []).map(mesh => mesh.clone());
}

function linkedCount(sourceId) {
  return sourceId ? objects.filter(object => object.sourceId === sourceId).length : 0;
}
function newLinkedSource(mesh) {
  const id=`source-${nextSourceId++}`;
  linkedSources.set(id,{ id, mesh:mesh.clone(), revision:0 });
  return id;
}
function ensureLinkedSource(object) {
  if(!object)return null;
  if(object.sourceId&&linkedSources.has(object.sourceId))return linkedSources.get(object.sourceId);
  object.sourceId=newLinkedSource(object.mesh);
  setInstanceMatrix(object,new THREE.Matrix4());
  return linkedSources.get(object.sourceId);
}
function syncLinkedPeers(sourceId, activeObjectId=null) {
  const source=linkedSources.get(sourceId);
  if(!source)return;
  for(const peer of objects){
    if(peer.sourceId!==sourceId||peer.id===activeObjectId)continue;
    const evaluated=transformEditableMesh(source.mesh,matrixForInstance(peer));
    if(evaluated)peer.mesh=evaluated;
  }
}
function detachLinkedObject(object) {
  if(!object?.sourceId)return false;
  delete object.sourceId;
  delete object.instanceMatrix;
  return true;
}
function linkedDuplicateObject(sourceObject,{name=null,enterObjectMode=true}={}) {
  if(!sourceObject||sourceObject.kind==='reference')return null;
  if(sourceObject.id===activeId)saveActive();
  const source=ensureLinkedSource(sourceObject);
  if(!source)return null;
  const placement=matrixForInstance(sourceObject);
  const evaluated=transformEditableMesh(source.mesh,placement)||sourceObject.mesh.clone();
  const copy=addObject(evaluated,name||nextDuplicateName(sourceObject.name),{
    settings:sourceObject.settings,
    visible:sourceObject.visible!==false,
    locked:false,
    enterObjectMode,
    sourceId:sourceObject.sourceId,
    instanceMatrix:placement.elements,
    origin:sourceObject.origin||null
  });
  return copy||null;
}
function saveActive() {
  const object = activeObject(), live = state()?.mesh;
  if (!object || !live) return;
  if(object.sourceId&&linkedSources.has(object.sourceId)){
    const source=linkedSources.get(object.sourceId);
    if(currentMode()==='object'){
      const placement=deriveInstancePlacement(source.mesh,live);
      if(placement){
        setInstanceMatrix(object,placement);
      }else{
        const local=localMeshFromWorld(live,matrixForInstance(object));
        if(local&&!meshesNear(local,source.mesh)){
          source.mesh=local.clone();
          source.revision++;
          syncLinkedPeers(object.sourceId,object.id);
        }
      }
      object.mesh=live.clone();
    }else{
      const local=localMeshFromWorld(live,matrixForInstance(object));
      if(local&&!meshesNear(local,source.mesh)){
        source.mesh=local.clone();
        source.revision++;
        syncLinkedPeers(object.sourceId,object.id);
      }
      object.mesh=live.clone();
    }
  }else{
    object.mesh = live.clone();
  }
  object.settings = captureSettings();
  object.history = captureHistory();
}

function activeShouldShow() {
  const object = activeObject();
  return !!object?.visible && (!soloId || soloId === object.id);
}

function shouldShow(object) {
  return !!object?.visible && (!soloId || soloId === object.id);
}

function displayMeshFor(object) {
  let display = object.mesh;
  if(object?.sourceId&&linkedSources.has(object.sourceId)){
    const source=linkedSources.get(object.sourceId);
    const evaluated=transformEditableMesh(source.mesh,matrixForInstance(object));
    if(evaluated){
      object.mesh=evaluated;
      display=evaluated;
    }
  }
  if (object.settings?.subd) display = subdivide(display, Math.max(1, Math.min(4, object.settings.subdLevel || 1)));
  return applyMirror(display, object.settings?.mirror || { x:false, y:false, z:false });
}

function queueOutliner() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => { renderQueued = false; renderOutliner(); });
}

function updateLockUI() {
  app?.classList.toggle('boxlab-active-locked', !!activeObject()?.locked);
}

function setObjectSubd(object,next){
  if(!object||object.kind==='reference')return false;
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  const enabled=!!next;
  if(object.id===activeId){
    const input=document.querySelector('#subdToggle');
    if(input){
      input.checked=enabled;
      input.dispatchEvent(new Event('change',{bubbles:true}));
    }
    object.settings=cloneSettings(captureSettings());
    saveActive();
  }else{
    object.settings=cloneSettings(object.settings);
    object.settings.subd=enabled;
  }
  forceRender();
  renderOutliner();
  globalThis.__boxlabObjectSelection?.refresh?.();
  if(status)status.textContent=`${object.name} • SubD ${enabled?'On':'Off'}`;
  return true;
}

function renderOutliner() {
  if (!list) return;
  const mode = currentMode();
  const active = activeObject();
  if (modeLabel) modeLabel.textContent = active ? `${mode === 'object' ? 'Object Mode' : `Edit • ${cap(mode)}`} • ${active.name}${active.kind === 'reference' ? ' • Reference' : ''}${active.locked ? ' • Locked' : ''}` : 'No active object';
  list.replaceChildren();
  for (const object of objects) {
    const row = document.createElement('div');
    row.className = `outliner-row compact-object-row${object.id === activeId ? ' active' : ''}${object.locked ? ' locked' : ''}`;
    row.dataset.objectId = String(object.id);

    const name = document.createElement('button');
    name.className = 'outliner-name';
    const baseName = object.kind === 'reference' ? `${object.name} • Ref` : object.name;
    const links = linkedCount(object.sourceId);
    name.textContent = links > 1 ? `${baseName} • Link ×${links}` : baseName;
    name.title = object.kind === 'reference'
      ? 'Reference guide — read-only snapping geometry'
      : (object.locked ? 'Locked object — unlock from More' : 'Make active object');
    name.addEventListener('click', () => activateObject(object.id));

    const subd = document.createElement('button');
    subd.type = 'button';
    subd.className = 'outliner-mini outliner-subd-toggle';
    subd.textContent = 'S';
    subd.title = object.kind === 'reference' ? 'Reference guides do not use SubD Preview' : (object.settings?.subd ? 'Turn SubD Preview off' : 'Turn SubD Preview on');
    subd.disabled = object.kind === 'reference';
    subd.classList.toggle('active', !!object.settings?.subd);
    subd.setAttribute('aria-pressed', object.settings?.subd ? 'true' : 'false');
    subd.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setObjectSubd(object,!object.settings?.subd);
    });

    const visible = document.createElement('button');
    visible.className = 'outliner-mini outliner-visibility';
    visible.textContent = object.visible ? '●' : '○';
    visible.title = object.visible ? 'Hide object' : 'Show object';
    visible.addEventListener('click', event => {
      event.stopPropagation();
      object.visible = !object.visible;
      forceRender();
      renderOutliner();
    });

    const more = document.createElement('details');
    more.className = 'outliner-more';
    const moreSummary = document.createElement('summary');
    moreSummary.textContent = '•••';
    moreSummary.title = 'Object actions';
    const menu = document.createElement('div');
    menu.className = 'outliner-more-menu';

    const referenceGuide = object.kind === 'reference';
    const lock = document.createElement('button');
    lock.type = 'button';
    lock.className = 'outliner-lock-action';
    lock.textContent = referenceGuide ? 'Reference • Read Only' : (object.locked ? 'Unlock' : 'Lock');
    lock.disabled = referenceGuide;
    lock.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      if(referenceGuide)return;
      object.locked = !object.locked;
      if (object.id === activeId && object.locked) document.querySelector('#toolModes button[data-tool="move"]')?.click();
      more.open=false;
      updateLockUI();
      renderOutliner();
    });

    const solo = document.createElement('button');
    solo.type = 'button';
    solo.className = 'outliner-solo-action';
    solo.textContent = soloId === object.id ? 'Exit Solo' : 'Solo';
    solo.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      soloId = soloId === object.id ? null : object.id;
      more.open=false;
      if (soloId && !object.locked) activateObject(object.id);
      else { forceRender(); renderOutliner(); }
    });

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'outliner-delete-action danger';
    remove.textContent = 'Delete Object';
    remove.disabled = objects.length <= 1;
    remove.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      more.open=false;
      deleteObjectById(object.id);
    });

    menu.append(lock,solo,remove);
    more.append(moreSummary,menu);
    row.append(name, subd, visible, more);
    list.append(row);
  }
  if (duplicateButton) duplicateButton.disabled = !active;
  if (renameButton) renameButton.disabled = !active;
  if (deleteButton) deleteButton.disabled = objects.length <= 1;
  if(linkedDuplicateButton)linkedDuplicateButton.disabled=!active||active.kind==='reference';
  if(makeUniqueButton)makeUniqueButton.disabled=!active||linkedCount(active.sourceId)<2;
  updateLockUI();
}

function forceRender() {
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
}

function clearComponentSelection() {
  document.querySelector('#selectionModes button.active')?.click();
}

function enterObjectMode() {
  document.querySelector('#selectionModes button[data-mode="object"]')?.click();
}

function activateObject(id, forceLocked = false) {
  const target = objects.find(object => object.id === id);
  if (!target || target.id === activeId) { renderOutliner(); return !!target; }
  if (target.locked && !forceLocked) {
    if (status) status.textContent = target.kind === 'reference'
      ? `${target.name} • Reference guide • read-only • available for snapping`
      : `${target.name} is locked • unlock it in the Outliner to edit`;
    renderOutliner();
    return false;
  }
  const live = state()?.mesh;
  if (!live) return false;
  saveActive();
  activeId = target.id;
  if(target.sourceId&&linkedSources.has(target.sourceId)){
    const source=linkedSources.get(target.sourceId);
    const evaluated=transformEditableMesh(source.mesh,matrixForInstance(target));
    if(evaluated)target.mesh=evaluated;
  }
  replaceMeshInPlace(live, target.mesh);
  restoreHistory(target.history);
  restoreSettings(target.settings);
  clearComponentSelection();
  forceRender();
  renderOutliner();
  queueMicrotask(()=>{ if(activeBody) rebuildInactiveLayer(activeBody); });
  requestAnimationFrame(()=>{ if(activeBody) rebuildInactiveLayer(activeBody); });
  if (status) status.textContent = `${target.name} active`;
  return true;
}

function uniqueName(base, excludeId = null) {
  const names = new Set(objects.filter(object => object.id !== excludeId).map(object => object.name));
  if (!names.has(base)) return base;
  let i = 2;
  while (names.has(`${base} ${i}`)) i++;
  return `${base} ${i}`;
}

function duplicateStem(name) {
  let stem = String(name || 'Object').trim().replace(/\s+(?:copy|linked)$/i, '');
  const numbered = stem.match(/^(.*)\s(\d{2,})$/);
  if (numbered) stem = numbered[1].trim();
  return stem || 'Object';
}
function nextDuplicateName(name) {
  const stem = duplicateStem(name);
  const names = new Set(objects.map(object => object.name));
  let i = 1, candidate = '';
  do {
    candidate = `${stem} ${String(i++).padStart(2, '0')}`;
  } while (names.has(candidate));
  return candidate;
}

function addObject(mesh, name = 'Cube', options = {}) {
  saveActive();
  const object = {
    id: nextId++,
    name: uniqueName(name),
    mesh: mesh.clone(),
    visible: options.visible !== false,
    locked: options.kind === 'reference' ? true : !!options.locked,
    kind: options.kind === 'reference' ? 'reference' : 'editable',
    settings: cloneSettings(options.settings || captureSettings()),
    history: { undo:[], redo:[] }
  };
  if(options.sourceId)object.sourceId=options.sourceId;
  if(Array.isArray(options.instanceMatrix)&&options.instanceMatrix.length===16)object.instanceMatrix=[...options.instanceMatrix];
  if(options.origin)object.origin={...options.origin};
  objects.push(object);
  if (!object.locked) {
    activateObject(object.id);
    if (options.enterObjectMode !== false) enterObjectMode();
  } else {
    forceRender();
    renderOutliner();
  }
  return object;
}

function duplicateActive() {
  const source = activeObject();
  if (!source) return;
  saveActive();
  const copy = addObject(source.mesh, nextDuplicateName(source.name), { settings:source.settings, enterObjectMode:true });
  if (!copy) return;
  requestAnimationFrame(() => {
    if (currentMode() !== 'object') return;
    globalThis.__boxlabTransformArming?.activateRealMove?.();
  });
}

function linkedDuplicateActive() {
  const sourceObject=activeObject();
  if(!sourceObject||sourceObject.kind==='reference')return null;
  const beforeScene=globalThis.__boxlabObjectHistory?.capture?.()||null;
  const copy=linkedDuplicateObject(sourceObject,{enterObjectMode:true});
  if(!copy)return null;
  if(beforeScene)globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(beforeScene);
  renderOutliner();
  if(status)status.textContent=`Linked Duplicate created • ${linkedCount(copy.sourceId)} share geometry`;
  requestAnimationFrame(()=>{if(currentMode()==='object')globalThis.__boxlabTransformArming?.activateRealMove?.();});
  return copy;
}

function makeObjectsUnique(ids=[],checkpoint=true) {
  const chosen=objects.filter(object=>ids.includes(object.id)&&object.sourceId);
  if(!chosen.length)return[];
  if(checkpoint)globalThis.__boxlabObjectHistory?.checkpoint?.();
  saveActive();
  const detached=[];
  for(const object of chosen){
    if(object.id===activeId)object.mesh=state()?.mesh?.clone?.()||object.mesh.clone();
    if(detachLinkedObject(object))detached.push(object.id);
  }
  renderOutliner();
  return detached;
}
function makeActiveUnique() {
  const object=activeObject();
  if(!object||linkedCount(object.sourceId)<2){
    if(status)status.textContent='Object is already unique';
    return false;
  }
  const detached=makeObjectsUnique([object.id],true);
  if(status&&detached.length)status.textContent=`${object.name} made unique`;
  return !!detached.length;
}

function joinObjects(ids = []) {
  const requested = [...new Set((ids || []).map(Number).filter(Number.isFinite))];
  let chosen = objects.filter(object => requested.includes(object.id));
  if (chosen.length < 2) return { ok:false, reason:'Select at least two objects' };
  if (chosen.some(object => object.kind === 'reference')) return { ok:false, reason:'Reference objects cannot be joined' };
  if (chosen.some(object => object.locked)) return { ok:false, reason:'Unlock selected objects before Join' };

  let primary = chosen.find(object => object.id === activeId) || chosen[0];
  if (primary.id !== activeId && !activateObject(primary.id)) return { ok:false, reason:'Could not activate primary object' };
  saveActive();
  chosen = objects.filter(object => requested.includes(object.id));
  primary = chosen.find(object => object.id === activeId) || primary;
  if (!modifierSettingsCompatible(chosen)) return { ok:false, reason:'Selected objects must use matching Mirror/SubD settings before Join' };

  const combined = combineEditableMeshes(chosen.map(object => object.mesh));
  if (!combined) return { ok:false, reason:'Could not combine selected meshes' };
  const live = state()?.mesh;
  if (!live) return { ok:false, reason:'No active editable mesh' };

  primary.mesh = combined.clone();
  detachLinkedObject(primary);
  replaceMeshInPlace(live, combined);
  primary.history = captureHistory();
  const removedIds = new Set(chosen.filter(object => object.id !== primary.id).map(object => object.id));
  for (let i = objects.length - 1; i >= 0; i--) if (removedIds.has(objects[i].id)) objects.splice(i, 1);
  if (soloId && removedIds.has(soloId)) soloId = null;
  clearComponentSelection();
  forceRender();
  renderOutliner();
  if (status) status.textContent = `${chosen.length} objects joined • ${primary.name} remains active`;
  return { ok:true, primaryId:primary.id, removedIds:[...removedIds], objectCount:chosen.length, vertexCount:combined.vertices.length, faceCount:combined.faces.length };
}


async function renameActive() {
  const object = activeObject();
  if (!object) return;
  const value = await requestRename({ title:'Rename Object', value:object.name });
  if (value === null) return;
  const clean = value.trim();
  if (!clean) return;
  object.name = uniqueName(clean, object.id);
  renderOutliner();
  if (status) status.textContent = `${object.name} renamed`;
}

function deleteObjectById(id,{checkpoint=true}={}) {
  if (objects.length <= 1) return false;
  const index = objects.findIndex(object => object.id === id);
  if (index < 0) return false;
  if(checkpoint)globalThis.__boxlabObjectHistory?.checkpoint?.();
  const deletingActive = id === activeId;
  objects.splice(index, 1);
  if (soloId === id) soloId = null;
  if (deletingActive) {
    const replacement = objects[Math.min(index, objects.length - 1)];
    activeId = null;
    activateObject(replacement.id, true);
  } else {
    forceRender();
    renderOutliner();
  }
  globalThis.__boxlabObjectSelection?.refresh?.();
  if (status) status.textContent = 'Object deleted';
  return true;
}
function deleteActive() {
  deleteObjectById(activeId,{checkpoint:false});
}

function resetAll() {
  const live = state()?.mesh;
  if (!live) return false;
  const settings = { mirror:{ x:false, y:false, z:false }, subd:false, subdLevel:1, cage:true };
  replaceMeshInPlace(live, EditableMesh.cube(2));
  history()?.clear?.();
  soloId = null;
  linkedSources.clear();
  const initial = {
    id: nextId++,
    name:'Cube',
    mesh:live.clone(),
    visible:true,
    locked:false,
    kind:'editable',
    settings:cloneSettings(settings),
    history:{ undo:[], redo:[] }
  };
  objects = [initial];
  activeId = initial.id;
  restoreSettings(initial.settings);
  forceRender();
  renderOutliner();
  return true;
}

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function hitObject(event, object) {
  const camera = state()?.camera;
  if (!camera || !object) return false;
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObject(object, false).length > 0;
}

function handleViewportActivation(event, stopEvent = true) {
  const camera = state()?.camera;
  if (currentMode() === 'object' && inactiveBodies.length && camera) {
    setPointer(event);
    raycaster.setFromCamera(pointer, camera);
    const activeHit = activeBody?.visible ? raycaster.intersectObject(activeBody, false)[0] : null;
    const inactiveHit = raycaster.intersectObjects(inactiveBodies.filter(body => body.visible), false)[0];
    const inactiveIsCloser = inactiveHit && (!activeHit || inactiveHit.distance < activeHit.distance - OBJECT_HIT_EPSILON);
    if (inactiveIsCloser) {
      if (stopEvent) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      const id = Number(inactiveHit.object.userData.objectId);
      const objectSelection = globalThis.__boxlabObjectSelection;
      if (objectSelection?.multi) {
        const ids = objectSelection.ids;
        ids.has(id) ? ids.delete(id) : ids.add(id);
        objectSelection.select([...ids]);
        const object = objects.find(item => item.id === id);
        if (status) status.textContent = `${object?.name || 'Object'} ${ids.has(id) ? 'added to' : 'removed from'} Multi selection`;
      } else {
        activateObject(id);
      }
      return true;
    }
  }
  const active = activeObject();
  if (active?.locked && activeBody && hitObject(event, activeBody)) {
    if (stopEvent) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    if (status) status.textContent = active.kind === 'reference'
      ? `${active.name} • Reference guide • read-only • available for snapping`
      : `${active.name} is locked • unlock it in the Outliner to edit`;
    return true;
  }
  return false;
}

function installViewportActivation() {
  canvas?.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') {
      if (!event.isPrimary) {
        if (touchTap) touchTap.cancelled = true;
        return;
      }
      touchTap = {
        pointerId:event.pointerId,
        x:event.clientX,
        y:event.clientY,
        cancelled:false,
        objectMode:currentMode() === 'object'
      };
      return;
    }
    if (!event.isPrimary) return;
    handleViewportActivation(event, true);
  }, true);

  canvas?.addEventListener('pointermove', event => {
    if (event.pointerType !== 'touch' || !touchTap || event.pointerId !== touchTap.pointerId) return;
    const dx=event.clientX-touchTap.x,dy=event.clientY-touchTap.y;
    if (dx*dx+dy*dy > TOUCH_TAP_MOVE_PX*TOUCH_TAP_MOVE_PX) touchTap.cancelled=true;
  }, true);

  canvas?.addEventListener('pointerup', event => {
    if (event.pointerType !== 'touch' || !touchTap || event.pointerId !== touchTap.pointerId) return;
    const candidate=touchTap;touchTap=null;
    if (candidate.cancelled || !candidate.objectMode || currentMode() !== 'object') return;
    handleViewportActivation(event, false);
  }, true);

  canvas?.addEventListener('pointercancel', event => {
    if (event.pointerType === 'touch' && touchTap && event.pointerId === touchTap.pointerId) touchTap=null;
  }, true);
}

function ensureInactiveLayer(){
  const scene=state()?.scene;
  if(!scene)return null;
  if(inactiveLayer?.parent===scene)return inactiveLayer;
  inactiveLayer=new THREE.Group();
  inactiveLayer.name='BoxLab Inactive Objects';
  inactiveLayer.userData.boxlabInactiveLayer=true;
  scene.add(inactiveLayer);
  return inactiveLayer;
}
function clearInactiveLayer(){
  if(!inactiveLayer)return;
  for(const child of [...inactiveLayer.children]){
    inactiveLayer.remove(child);
    child.traverse?.(node=>{
      if(node.geometry?.dispose)node.geometry.dispose();
      if(node!==child&&node.material?.userData?.boxlabRenderOverlay)node.material?.dispose?.();
    });
    if(child.material?.userData?.disposable)child.material.dispose?.();
  }
  inactiveBodies=[];
}
function rebuildInactiveLayer(body){
  const layer=ensureInactiveLayer();
  if(!layer)return;
  clearInactiveLayer();
  for(const object of objects){
    if(object.id===activeId||!shouldShow(object))continue;
    try{
      const display=displayMeshFor(object);
      const material=body.material?.clone?.()||new THREE.MeshStandardMaterial({roughness:.62,metalness:.02,side:THREE.DoubleSide});
      material.transparent=true;
      material.opacity=object.locked?.32:.52;
      material.userData={...(material.userData||{}),disposable:true};
      const inactive=new THREE.Mesh(display.triangulatedGeometry(),material);
      inactive.userData={kind:'boxlab-inactive-body',objectId:object.id,boxlabDisplayMesh:display};
      inactive.renderOrder=-1;
      inactiveBodies.push(inactive);
      layer.add(inactive);
      globalThis.__boxlabRenderModes?.apply?.(inactive);
    }catch(error){
      console.warn('BoxLab inactive object render skipped',error);
    }
  }
  globalThis.__boxlabRenderModes?.refreshStudio?.();
}

function installRenderObserver() {
  if (THREE.Group.prototype.__boxlabMultiObjectInstalled) return;
  const baseAdd = THREE.Group.prototype.add;
  const groupSuppressedKinds=new Set(['edge','vertex','mirror-edge','edge-selection-overlay']);
  THREE.Group.prototype.add = function (...items) {
    const body = items.find(item => item?.userData?.kind === 'body');
    const activeSource = body ? state()?.mesh : null;
    if (body) {
      activeRoot = this;
      activeBody = body;
      saveActive();
      body.visible = activeShouldShow();
    } else if (this === activeRoot) {
      const show = activeShouldShow(),groupContext=globalThis.__boxlabObjectSelection?.wholeGroupId!=null;
      for (const item of items) if (item?.userData?.kind !== 'boxlab-inactive-body') item.visible = show && !(groupContext&&groupSuppressedKinds.has(item?.userData?.kind));
    }

    const result = baseAdd.apply(this, items);
    if (body) {
      rebuildInactiveLayer(body);
      activeSource?.edges?.();
      queueOutliner();
      queueMicrotask(()=>globalThis.__boxlabBooleanUX?.sync?.());
    }
    return result;
  };
  THREE.Group.prototype.__boxlabMultiObjectInstalled = true;
}

function installUI() {
  const standardRow=addButton?.parentElement;
  if(standardRow&&!document.querySelector('#objectActionMore')){
    linkedDuplicateButton=document.createElement('button');
    linkedDuplicateButton.type='button';
    linkedDuplicateButton.id='linkedDuplicateBtn';
    linkedDuplicateButton.textContent='Linked Duplicate';
    linkedDuplicateButton.title='Create a linked copy with independent object placement';
    makeUniqueButton=document.createElement('button');
    makeUniqueButton.type='button';
    makeUniqueButton.id='makeUniqueBtn';
    makeUniqueButton.textContent='Make Unique';
    makeUniqueButton.title='Detach the active linked instance from shared geometry';

    const more=document.createElement('details');
    more.id='objectActionMore';
    more.className='object-action-more';
    const summary=document.createElement('summary');
    summary.textContent='•••';
    summary.title='More object actions';
    const menu=document.createElement('div');
    menu.className='object-action-menu';
    menu.append(renameButton,linkedDuplicateButton,makeUniqueButton,deleteButton);
    more.append(summary,menu);
    standardRow.style.gridTemplateColumns='minmax(0,1fr) minmax(0,1fr) 42px';
    standardRow.append(more);
    menu.addEventListener('click',event=>{if(event.target.closest('button'))queueMicrotask(()=>{more.open=false;});});
  }
  addButton?.addEventListener('click', () => addObject(EditableMesh.cube(2), 'Cube', { enterObjectMode:true }));
  duplicateButton?.addEventListener('click', duplicateActive);
  linkedDuplicateButton?.addEventListener('click', linkedDuplicateActive);
  makeUniqueButton?.addEventListener('click', makeActiveUnique);
  renameButton?.addEventListener('click', renameActive);
  deleteButton?.addEventListener('click', deleteActive);
  document.querySelectorAll('#selectionModes button').forEach(button => button.addEventListener('click', queueOutliner));
  window.addEventListener('boxlab-bridge-state', () => {
    const live = state()?.mesh;
    const active = activeObject();
    if (live && active) {
      active.mesh = live.clone();
      active.settings = captureSettings();
    }
    queueOutliner();
  });
}

function initialize() {
  if (initialized || !state()?.mesh || !history()) return false;
  initialized = true;
  const initial = {
    id: nextId++,
    name:'Cube',
    mesh:state().mesh.clone(),
    visible:true,
    locked:false,
    settings:cloneSettings(),
    history:captureHistory()
  };
  objects = [initial];
  activeId = initial.id;
  installRenderObserver();
  installViewportActivation();
  installUI();
  window.addEventListener('keydown', event => {
    if (currentMode() !== 'object') return;
    if (event.key !== 'Delete' && event.key !== 'Backspace') return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target=event.target;
    if (target?.matches?.('input,textarea,select,[contenteditable="true"]') || target?.closest?.('#boxlabRenameDialog')) return;
    if (!deleteButton || deleteButton.disabled) return;
    event.preventDefault();
    deleteButton.click();
  }, true);
  globalThis.__boxlabObjectManager = {
    addMesh(mesh, name = 'Object', options = {}) { return addObject(mesh, name, options); },
    activate(id) { return activateObject(id); },
    joinObjects(ids) { return joinObjects(ids); },
    linkedDuplicate() { return linkedDuplicateActive(); },
    linkedDuplicateObject(id, options={}) { return linkedDuplicateObject(objects.find(item=>item.id===id),options); },
    nextDuplicateName(name) { return nextDuplicateName(name); },
    makeUnique() { return makeActiveUnique(); },
    makeUniqueIds(ids=[]) { return makeObjectsUnique(ids,false); },
    linkedIds(id) { const object=objects.find(item=>item.id===id); return object?.sourceId?objects.filter(item=>item.sourceId===object.sourceId).map(item=>item.id):[]; },
    sourceId(id) { return objects.find(item=>item.id===id)?.sourceId||null; },
    resetAll,
    saveActive,
    get activeId() { return activeId; },
    get objects() { saveActive(); return objects; },
    get soloId() { return soloId; }
  };
  globalThis.__boxlabObjectGeometry={version:'0.36.18.346',sourceId:id=>globalThis.__boxlabObjectManager?.sourceId?.(id)||null,linkedIds:id=>globalThis.__boxlabObjectManager?.linkedIds?.(id)||[]};
  window.dispatchEvent(new Event('boxlab-object-manager-ready'));
  renderOutliner();
  forceRender();
  return true;
}

if (!initialize()) {
  const tryInit = () => { if (initialize()) window.removeEventListener('boxlab-bridge-state', tryInit); };
  window.addEventListener('boxlab-bridge-state', tryInit);
}
