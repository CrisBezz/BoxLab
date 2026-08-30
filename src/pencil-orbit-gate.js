import * as THREE from 'three';

const canvas = document.querySelector('#viewport');

if (canvas && !canvas.__boxlabPencilOrbitGateInstalled) {
  const nativeAddEventListener = canvas.addEventListener.bind(canvas);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const navigationSnapshots = new Map();
  const NAV_RESTORE_PX = 4;
  const orbitListeners = new Map();
  const penOrbitPointers = new Set();

  function isPenHover(event) {
    return event.pointerType === 'pen' && !(event.pressure > 0);
  }

  function isPenContact(event) {
    return event.pointerType === 'pen' && event.pressure > 0;
  }

  // Important: Pencil pointerup normally reports pressure=0 on iPad. Never
  // swallow pointerup/pointercancel as "hover" or OrbitControls will retain
  // the pen pointer and subsequent finger gestures will be locked out.
  for (const type of ['pointerdown','pointermove','pointerover','pointerenter','pointerout','pointerleave']) {
    nativeAddEventListener(type, event => {
      if (!isPenHover(event)) return;
      event.preventDefault?.();
      event.stopImmediatePropagation?.();
    }, { capture: true, passive: false });
  }

  function pencilHitsEditableMesh(event) {
    if (event.pointerType !== 'pen') return false;
    if (isPenHover(event)) return true;
    const state = globalThis.__boxlabBridgeState;
    const mesh = state?.mesh;
    const camera = state?.camera;
    if (!mesh || !camera || !mesh.faces?.length) return false;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const geometry = mesh.triangulatedGeometry();
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const picker = new THREE.Mesh(geometry, material);
    const hit = raycaster.intersectObject(picker, false).length > 0;
    geometry.dispose();
    material.dispose();
    return hit;
  }

  function selectionBridge() {
    return globalThis.__boxlabSelectionBridge;
  }

  function snapshotSelection(event) {
    if (event.pointerType !== 'pen' || isPenHover(event)) return;
    const bridge = selectionBridge();
    const type = bridge?.mode?.();
    const indices = [...(bridge?.indices?.() || [])];
    if (!type || !indices.length) return;
    navigationSnapshots.set(event.pointerId, { type, indices, x: event.clientX, y: event.clientY, restored: false });
  }

  function restoreSelectionForNavigation(event) {
    if (event.pointerType !== 'pen' || isPenHover(event)) return;
    const snap = navigationSnapshots.get(event.pointerId);
    if (!snap || snap.restored) return;
    if (Math.hypot(event.clientX - snap.x, event.clientY - snap.y) < NAV_RESTORE_PX) return;
    const bridge = selectionBridge();
    if (bridge?.mode?.() !== snap.type) return;
    const current = bridge.indices?.() || [];
    if (!current.length) bridge.set?.(snap.type, snap.indices);
    snap.restored = true;
  }

  nativeAddEventListener('pointerdown', snapshotSelection, { capture: true, passive: true });
  nativeAddEventListener('pointermove', restoreSelectionForNavigation, { capture: true, passive: true });

  function endPenNavigation(event) {
    if (event.pointerType !== 'pen') return;
    navigationSnapshots.delete(event.pointerId);
    penOrbitPointers.delete(event.pointerId);
    try { canvas.releasePointerCapture?.(event.pointerId); } catch {}
  }

  // These release events must remain visible to OrbitControls.
  nativeAddEventListener('pointerup', endPenNavigation, { capture: false, passive: true });
  nativeAddEventListener('pointercancel', endPenNavigation, { capture: false, passive: true });

  canvas.addEventListener = function (type, listener, options) {
    const name = typeof listener === 'function' ? listener.name || '' : '';
    const orbitPointer = /^pointer/.test(type) && /onPointer/i.test(name);
    if (!orbitPointer) return nativeAddEventListener(type, listener, options);

    const wrapped = function (event) {
      if (event.pointerType !== 'pen') return listener.call(this, event);
      if ((type !== 'pointerup' && type !== 'pointercancel') && isPenHover(event)) return;
      if (type === 'pointerdown') {
        if (pencilHitsEditableMesh(event)) return;
        penOrbitPointers.add(event.pointerId);
      }
      const result = listener.call(this, event);
      if ((type === 'pointerup' || type === 'pointercancel') && penOrbitPointers.has(event.pointerId)) {
        endPenNavigation(event);
      }
      return result;
    };
    orbitListeners.set(listener, wrapped);
    return nativeAddEventListener(type, wrapped, options);
  };

  canvas.__boxlabPencilOrbitGateInstalled = true;
}
