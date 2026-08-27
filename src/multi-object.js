import * as THREE from 'three';
import { EditableMesh } from './mesh.js';
import { subdivide } from './subdivision.js';
import { applyMirror } from './mirror.js';

const canvas = document.querySelector('#viewport');
const list = document.querySelector('#outlinerList');
const modeLabel = document.querySelector('#outlinerMode');
const addButton = document.querySelector('#outlinerAddBtn');
const duplicateButton = document.querySelector('#outlinerDuplicateBtn');
const renameButton = document.querySelector('#outlinerRenameBtn');
const deleteButton = document.querySelector('#outlinerDeleteBtn');
const status = document.querySelector('#selectionStatus');
const app = document.querySelector('#app');
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const OBJECT_HIT_EPSILON = 1e-5;

let objects = [];
let activeId = null;
let soloId = null;
let nextId = 1;
let inactiveBodies = [];
let activeBody = null;
let activeRoot = null;
let initialized = false;
let renderQueued = false;

function state() { return globalThis.__boxlabBridgeState; }
function history() { return globalThis.__boxlabHistory; }
function activeObject() { return objects.find(object => object.id === activeId) || null; }
function currentMode() { return document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face'; }
function cap(text) { return text ? text.charAt(0).toUpperCase() + text.slice(1) : ''; }

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
  const nextLevel = String(Math.max(1, Math.min(3, Number(settings.subdLevel || 1))));
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

function saveActive() {
  const object = activeObject(), live = state()?.mesh;
  if (!object || !live) return;
  object.mesh = live.clone();
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
  if (object.settings?.subd) display = subdivide(display, Math.max(1, Math.min(3, object.settings.subdLevel || 1)));
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

function renderOutliner() {
  if (!list) return;
  const mode = currentMode();
  const active = activeObject();
  if (modeLabel) modeLabel.textContent = active ? `${mode === 'object' ? 'Object Mode' : `Edit • ${cap(mode)}`} • ${active.name}${active.locked ? ' • Locked' : ''}` : 'No active object';
  list.replaceChildren();
  for (const object of objects) {
    const row = document.createElement('div');
    row.className = `outliner-row${object.id === activeId ? ' active' : ''}${object.locked ? ' locked' : ''}`;
    row.dataset.objectId = String(object.id);

    const name = document.createElement('button');
    name.className = 'outliner-name';
    name.textContent = object.name;
    name.title = object.locked ? 'Locked object — unlock to edit' : 'Make active object';
    name.addEventListener('click', () => activateObject(object.id));

    const visible = document.createElement('button');
    visible.className = 'outliner-mini';
    visible.textContent = object.visible ? 'V' : '–';
    visible.title = object.visible ? 'Hide object' : 'Show object';
    visible.addEventListener('click', event => {
      event.stopPropagation();
      object.visible = !object.visible;
      forceRender();
      renderOutliner();
    });

    const lock = document.createElement('button');
    lock.className = 'outliner-mini';
    lock.textContent = object.locked ? 'L' : '○';
    lock.title = object.locked ? 'Unlock object' : 'Lock object';
    lock.addEventListener('click', event => {
      event.stopPropagation();
      object.locked = !object.locked;
      if (object.id === activeId && object.locked) document.querySelector('#toolModes button[data-tool="move"]')?.click();
      updateLockUI();
      renderOutliner();
    });

    const solo = document.createElement('button');
    solo.className = `outliner-mini${soloId === object.id ? ' active' : ''}`;
    solo.textContent = 'S';
    solo.title = soloId === object.id ? 'Exit isolate' : 'Isolate / Solo';
    solo.addEventListener('click', event => {
      event.stopPropagation();
      soloId = soloId === object.id ? null : object.id;
      if (soloId && !object.locked) activateObject(object.id);
      else { forceRender(); renderOutliner(); }
    });

    row.append(name, visible, lock, solo);
    list.append(row);
  }
  if (duplicateButton) duplicateButton.disabled = !active;
  if (renameButton) renameButton.disabled = !active;
  if (deleteButton) deleteButton.disabled = objects.length <= 1;
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
    if (status) status.textContent = `${target.name} is locked • unlock it in the Outliner to edit`;
    renderOutliner();
    return false;
  }
  const live = state()?.mesh;
  if (!live) return false;
  saveActive();
  activeId = target.id;
  replaceMeshInPlace(live, target.mesh);
  restoreHistory(target.history);
  restoreSettings(target.settings);
  clearComponentSelection();
  forceRender();
  renderOutliner();
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

function addObject(mesh, name = 'Cube', options = {}) {
  saveActive();
  const object = {
    id: nextId++,
    name: uniqueName(name),
    mesh: mesh.clone(),
    visible: options.visible !== false,
    locked: !!options.locked,
    settings: cloneSettings(options.settings || captureSettings()),
    history: { undo:[], redo:[] }
  };
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
  addObject(source.mesh, `${source.name} copy`, { settings:source.settings, enterObjectMode:true });
}

function renameActive() {
  const object = activeObject();
  if (!object) return;
  const value = window.prompt('Object name', object.name);
  if (value === null) return;
  const clean = value.trim();
  if (!clean) return;
  object.name = uniqueName(clean, object.id);
  renderOutliner();
}

function deleteActive() {
  if (objects.length <= 1) return;
  const index = objects.findIndex(object => object.id === activeId);
  if (index < 0) return;
  objects.splice(index, 1);
  if (soloId === activeId) soloId = null;
  const replacement = objects[Math.min(index, objects.length - 1)];
  activeId = null;
  activateObject(replacement.id, true);
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

function installViewportActivation() {
  canvas?.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || !event.isPrimary) return;
    const camera = state()?.camera;
    if (currentMode() === 'object' && inactiveBodies.length && camera) {
      setPointer(event);
      raycaster.setFromCamera(pointer, camera);
      const activeHit = activeBody?.visible ? raycaster.intersectObject(activeBody, false)[0] : null;
      const inactiveHit = raycaster.intersectObjects(inactiveBodies.filter(body => body.visible), false)[0];
      const inactiveIsCloser = inactiveHit && (!activeHit || inactiveHit.distance < activeHit.distance - OBJECT_HIT_EPSILON);
      if (inactiveIsCloser) {
        event.preventDefault();
        event.stopImmediatePropagation();
        activateObject(Number(inactiveHit.object.userData.objectId));
        return;
      }
    }
    const active = activeObject();
    if (active?.locked && activeBody && hitObject(event, activeBody)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (status) status.textContent = `${active.name} is locked • unlock it in the Outliner to edit`;
    }
  }, true);
}

function installRenderObserver() {
  if (THREE.Group.prototype.__boxlabMultiObjectInstalled) return;
  const baseAdd = THREE.Group.prototype.add;
  THREE.Group.prototype.add = function (...items) {
    const body = items.find(item => item?.userData?.kind === 'body');
    const activeSource = body ? state()?.mesh : null;
    if (body) {
      activeRoot = this;
      activeBody = body;
      saveActive();
      body.visible = activeShouldShow();
    } else if (this === activeRoot) {
      const show = activeShouldShow();
      for (const item of items) if (item?.userData?.kind !== 'boxlab-inactive-body') item.visible = show;
    }

    const result = baseAdd.apply(this, items);
    if (body) {
      inactiveBodies = [];
      for (const object of objects) {
        if (object.id === activeId || !shouldShow(object)) continue;
        try {
          const display = displayMeshFor(object);
          const material = body.material?.clone?.() || new THREE.MeshStandardMaterial({ roughness:.62, metalness:.02, side:THREE.DoubleSide });
          material.transparent = true;
          material.opacity = object.locked ? 0.32 : 0.52;
          material.userData.disposable = true;
          const inactive = new THREE.Mesh(display.triangulatedGeometry(), material);
          inactive.userData = { kind:'boxlab-inactive-body', objectId:object.id };
          inactive.renderOrder = -1;
          inactiveBodies.push(inactive);
          baseAdd.call(this, inactive);
        } catch (error) {
          console.warn('BoxLab inactive object render skipped', error);
        }
      }
      activeSource?.edges?.();
      queueOutliner();
    }
    return result;
  };
  THREE.Group.prototype.__boxlabMultiObjectInstalled = true;
}

function installUI() {
  addButton?.addEventListener('click', () => addObject(EditableMesh.cube(2), 'Cube', { enterObjectMode:true }));
  duplicateButton?.addEventListener('click', duplicateActive);
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
  globalThis.__boxlabObjectManager = {
    addMesh(mesh, name = 'Object', options = {}) { return addObject(mesh, name, options); },
    activate(id) { return activateObject(id); },
    saveActive,
    get activeId() { return activeId; },
    get objects() { saveActive(); return objects; },
    get soloId() { return soloId; }
  };
  renderOutliner();
  forceRender();
  return true;
}

if (!initialize()) {
  const tryInit = () => { if (initialize()) window.removeEventListener('boxlab-bridge-state', tryInit); };
  window.addEventListener('boxlab-bridge-state', tryInit);
}
