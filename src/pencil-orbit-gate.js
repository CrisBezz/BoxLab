import * as THREE from 'three';

const canvas = document.querySelector('#viewport');

if (canvas && !canvas.__boxlabPencilOrbitGateInstalled) {
  const nativeAddEventListener = canvas.addEventListener.bind(canvas);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function pencilHitsEditableMesh(event) {
    if (event.pointerType !== 'pen') return false;
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

  canvas.addEventListener = function (type, listener, options) {
    const name = typeof listener === 'function' ? listener.name || '' : '';
    const orbitPointerDown = type === 'pointerdown' && /onPointerDown/i.test(name);
    if (!orbitPointerDown) return nativeAddEventListener(type, listener, options);

    const wrapped = function (event) {
      if (pencilHitsEditableMesh(event)) return;
      return listener.call(this, event);
    };
    return nativeAddEventListener(type, wrapped, options);
  };

  canvas.__boxlabPencilOrbitGateInstalled = true;
}
