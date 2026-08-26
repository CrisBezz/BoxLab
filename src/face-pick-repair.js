import * as THREE from 'three';

const state = globalThis.__boxlabBridgeState;
const baseAdd = THREE.Group.prototype.add;

if (!THREE.Group.prototype.__boxlabFacePickRepairInstalled) {
  THREE.Group.prototype.add = function (...objects) {
    const result = baseAdd.apply(this, objects);
    if (objects.some(object => object?.userData?.kind === 'body')) {
      const group = this;
      queueMicrotask(() => {
        const faceMode = document.querySelector('#selectionModes button[data-mode="face"]')?.classList.contains('active');
        const directFaceTool = document.querySelector('#extrudeBtn')?.classList.contains('active') || document.querySelector('#insetBtn')?.classList.contains('active');
        if (!faceMode && !directFaceTool) return;
        if (group.children.some(child => child?.userData?.kind === 'face')) return;
        const mesh = state?.mesh;
        if (!mesh?.faces?.length) return;
        mesh.faces.forEach((face, index) => {
          if (!Array.isArray(face) || face.length < 3) return;
          const positions = [];
          for (let i = 1; i < face.length - 1; i++) {
            [face[0], face[i], face[i + 1]].forEach(vertexIndex => {
              const v = mesh.vertices[vertexIndex];
              if (v) positions.push(v.x, v.y, v.z);
            });
          }
          if (!positions.length) return;
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          const material = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });
          material.userData.disposable = true;
          const picker = new THREE.Mesh(geometry, material);
          picker.userData = { kind: 'face', index };
          baseAdd.call(group, picker);
        });
      });
    }
    return result;
  };
  THREE.Group.prototype.__boxlabFacePickRepairInstalled = true;
}
