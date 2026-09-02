const list = document.querySelector('#outlinerList');
const drawer = document.querySelector('#objectsDrawer .drawer-content');
const duplicateButton = document.querySelector('#outlinerDuplicateBtn');
const renameButton = document.querySelector('#outlinerRenameBtn');
const deleteButton = document.querySelector('#outlinerDeleteBtn');
const status = document.querySelector('#selectionStatus');

let selectedIds = new Set();
let multiEnabled = false;
let internalAction = false;
let toolbar = null;
let multiButton = null;
let allButton = null;
let visibilityButton = null;
let lockButton = null;
let clearButton = null;
let countLabel = null;

function manager() { return globalThis.__boxlabObjectManager; }
function objects() { return manager()?.objects || []; }
function activeId() { return manager()?.activeId ?? null; }
function selectedObjects() {
  const ids = selectedIds;
  return objects().filter(object => ids.has(object.id));
}
function setStatus(text) { if (status) status.textContent = text; }
function forceRender() {
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
  manager()?.activate?.(activeId());
}

function injectStyle() {
  if (document.querySelector('#boxlabObjectManagementStyle')) return;
  const style = document.createElement('style');
  style.id = 'boxlabObjectManagementStyle';
  style.textContent = `
    .object-management-tools{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:0 0 8px}
    .object-management-tools button{min-width:0;padding-left:6px;padding-right:6px}
    .object-management-tools .active{outline:1px solid currentColor}
    .object-management-count{grid-column:1/-1;font-size:11px;opacity:.72;padding:0 2px 2px}
    .outliner-row.object-selected:not(.active){box-shadow:inset 3px 0 0 currentColor}
    .outliner-row.object-selected .outliner-name{font-weight:600}
  `;
  document.head.append(style);
}

function buildToolbar() {
  if (!drawer || toolbar) return;
  injectStyle();
  toolbar = document.createElement('div');
  toolbar.className = 'object-management-tools';
  toolbar.id = 'objectManagementTools';

  multiButton = document.createElement('button');
  multiButton.type = 'button';
  multiButton.textContent = 'Multi';
  multiButton.title = 'Select more than one object';

  allButton = document.createElement('button');
  allButton.type = 'button';
  allButton.textContent = 'All';
  allButton.title = 'Select all objects';

  visibilityButton = document.createElement('button');
  visibilityButton.type = 'button';
  visibilityButton.textContent = 'Hide';
  visibilityButton.title = 'Hide / show selected objects';

  lockButton = document.createElement('button');
  lockButton.type = 'button';
  lockButton.textContent = 'Lock';
  lockButton.title = 'Lock / unlock selected objects';

  clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.textContent = 'Clear';
  clearButton.title = 'Clear multi-object selection';

  countLabel = document.createElement('div');
  countLabel.className = 'object-management-count';

  toolbar.append(multiButton, allButton, visibilityButton, lockButton, clearButton, countLabel);
  const listNode = document.querySelector('#outlinerList');
  drawer.insertBefore(toolbar, listNode || drawer.firstChild);

  multiButton.addEventListener('click', () => {
    multiEnabled = !multiEnabled;
    selectedIds.clear();
    if (multiEnabled && activeId() != null) selectedIds.add(activeId());
    updateUI();
  });

  allButton.addEventListener('click', () => {
    multiEnabled = true;
    const all = objects();
    const everySelected = all.length > 0 && all.every(object => selectedIds.has(object.id));
    selectedIds = everySelected ? new Set() : new Set(all.map(object => object.id));
    updateUI();
  });

  visibilityButton.addEventListener('click', () => {
    const chosen = selectedObjects();
    if (!chosen.length) return;
    const hide = chosen.some(object => object.visible);
    for (const object of chosen) object.visible = !hide;
    if (hide && chosen.some(object => object.id === activeId())) setStatus(`${chosen.length} object${chosen.length === 1 ? '' : 's'} hidden`);
    forceRender();
    updateUI();
  });

  lockButton.addEventListener('click', () => {
    const chosen = selectedObjects();
    if (!chosen.length) return;
    const lock = chosen.some(object => !object.locked);
    for (const object of chosen) object.locked = lock;
    if (lock && chosen.some(object => object.id === activeId())) document.querySelector('#toolModes button[data-tool="move"]')?.click();
    setStatus(`${chosen.length} object${chosen.length === 1 ? '' : 's'} ${lock ? 'locked' : 'unlocked'}`);
    forceRender();
    updateUI();
  });

  clearButton.addEventListener('click', () => {
    selectedIds.clear();
    if (!multiEnabled && activeId() != null) selectedIds.add(activeId());
    updateUI();
  });
}

function cleanSelection() {
  const valid = new Set(objects().map(object => object.id));
  selectedIds = new Set([...selectedIds].filter(id => valid.has(id)));
  if (!multiEnabled) {
    selectedIds.clear();
    if (activeId() != null) selectedIds.add(activeId());
  }
}

function updateRows() {
  list?.querySelectorAll('.outliner-row').forEach(row => {
    const id = Number(row.dataset.objectId);
    row.classList.toggle('object-selected', selectedIds.has(id));
    row.setAttribute('aria-selected', selectedIds.has(id) ? 'true' : 'false');
  });
}

function updateUI() {
  cleanSelection();
  const chosen = selectedObjects();
  multiButton?.classList.toggle('active', multiEnabled);
  if (allButton) allButton.textContent = objects().length > 0 && objects().every(object => selectedIds.has(object.id)) ? 'None' : 'All';
  if (visibilityButton) visibilityButton.textContent = chosen.length && chosen.every(object => !object.visible) ? 'Show' : 'Hide';
  if (lockButton) lockButton.textContent = chosen.length && chosen.every(object => object.locked) ? 'Unlock' : 'Lock';
  if (visibilityButton) visibilityButton.disabled = chosen.length === 0;
  if (lockButton) lockButton.disabled = chosen.length === 0;
  if (clearButton) clearButton.disabled = chosen.length === 0;
  if (countLabel) countLabel.textContent = multiEnabled ? `${chosen.length} of ${objects().length} selected • active object remains primary` : 'Single object selection';

  if (multiEnabled) {
    if (duplicateButton) duplicateButton.disabled = chosen.length === 0;
    if (renameButton) renameButton.disabled = chosen.length !== 1;
    if (deleteButton) deleteButton.disabled = chosen.length === 0 || chosen.length >= objects().length;
  }
  updateRows();
}

function toggleObjectSelection(id) {
  if (selectedIds.has(id)) selectedIds.delete(id);
  else selectedIds.add(id);
  updateUI();
}

function duplicateSelection() {
  const m = manager();
  const chosen = selectedObjects().map(object => ({
    name: object.name,
    mesh: object.mesh.clone(),
    visible: object.visible,
    locked: object.locked,
    kind: object.kind,
    settings: {
      mirror: { ...(object.settings?.mirror || {}) },
      subd: !!object.settings?.subd,
      subdLevel: Number(object.settings?.subdLevel || 1),
      cage: object.settings?.cage !== false
    }
  }));
  if (!m || !chosen.length) return;

  const created = [];
  for (const source of chosen) {
    const copy = m.addMesh(source.mesh, `${source.name} copy`, {
      visible: source.visible,
      locked: false,
      kind: source.kind,
      settings: source.settings,
      enterObjectMode: false
    });
    if (copy?.id != null) created.push(copy.id);
  }
  multiEnabled = created.length > 1 || multiEnabled;
  selectedIds = new Set(created);
  setStatus(`${created.length} object${created.length === 1 ? '' : 's'} duplicated`);
  updateUI();
}

function deleteSelection() {
  const m = manager();
  if (!m) return;
  const chosen = new Set(selectedIds);
  const all = m.objects;
  if (!chosen.size) return;
  if (chosen.size >= all.length) {
    setStatus('BoxLab keeps at least one object in the scene');
    return;
  }

  const currentActive = m.activeId;
  const activeWasSelected = chosen.has(currentActive);

  for (let i = all.length - 1; i >= 0; i--) {
    const object = all[i];
    if (chosen.has(object.id) && object.id !== currentActive) all.splice(i, 1);
  }

  if (activeWasSelected) {
    internalAction = true;
    deleteButton?.click();
    internalAction = false;
  } else {
    m.activate(currentActive);
  }

  selectedIds.clear();
  if (m.activeId != null) selectedIds.add(m.activeId);
  if (multiEnabled) selectedIds.clear();
  setStatus(`${chosen.size} object${chosen.size === 1 ? '' : 's'} deleted`);
  updateUI();
}

function installCaptureHandlers() {
  list?.addEventListener('click', event => {
    const nameButton = event.target.closest('.outliner-name');
    if (!nameButton) return;
    const row = nameButton.closest('.outliner-row');
    const id = Number(row?.dataset.objectId);
    if (!Number.isFinite(id)) return;

    if (multiEnabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleObjectSelection(id);
      return;
    }

    queueMicrotask(() => {
      selectedIds = new Set(activeId() == null ? [] : [activeId()]);
      updateUI();
    });
  }, true);

  duplicateButton?.addEventListener('click', event => {
    if (internalAction || !multiEnabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    duplicateSelection();
  }, true);

  renameButton?.addEventListener('click', event => {
    if (internalAction || !multiEnabled) return;
    const chosen = [...selectedIds];
    if (chosen.length !== 1) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setStatus('Select one object to rename');
      return;
    }
    if (chosen[0] !== activeId()) manager()?.activate?.(chosen[0]);
  }, true);

  deleteButton?.addEventListener('click', event => {
    if (internalAction || !multiEnabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    deleteSelection();
  }, true);
}

function installObserver() {
  if (!list) return;
  const observer = new MutationObserver(() => queueMicrotask(updateUI));
  observer.observe(list, { childList:true });
}

function initialize() {
  if (!manager() || !drawer || !list) return false;
  buildToolbar();
  selectedIds = new Set(activeId() == null ? [] : [activeId()]);
  installCaptureHandlers();
  installObserver();
  updateUI();
  const version = document.querySelector('#appVersion');
  if (version) version.textContent = 'v0.36.0.0';
  document.title = 'BoxLab v0.36.0.0';
  globalThis.__boxlabObjectSelection = {
    get ids() { return new Set(selectedIds); },
    get multi() { return multiEnabled; },
    select(ids = []) { multiEnabled = true; selectedIds = new Set(ids); updateUI(); },
    clear() { selectedIds.clear(); updateUI(); }
  };
  return true;
}

if (!initialize()) {
  const ready = () => {
    if (!initialize()) return;
    window.removeEventListener('boxlab-object-manager-ready', ready);
  };
  window.addEventListener('boxlab-object-manager-ready', ready);
}
