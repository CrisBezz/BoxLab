import * as THREE from 'three';

// Publish the rendered cage edge objects for direct Pencil tools.
// main.js keeps these objects private inside its scene graph, while Edge Slide
// and Offset Loop need a stable way to ray-pick the visible selected edge.
const edgeObjects = new Map();
const baseAdd = THREE.Group.prototype.add;

function publish() {
  const state = globalThis.__boxlabBridgeState;
  if (state && state.edgeObjects !== edgeObjects) state.edgeObjects = edgeObjects;
}

if (!THREE.Group.prototype.__boxlabEdgeObjectBridgeInstalled) {
  THREE.Group.prototype.add = function (...objects) {
    if (objects.some(object => object?.userData?.kind === 'body')) edgeObjects.clear();
    for (const object of objects) {
      if (object?.userData?.kind === 'edge' && Number.isInteger(object.userData.index)) {
        edgeObjects.set(object.userData.index, object);
      }
    }
    const result = baseAdd.apply(this, objects);
    publish();
    return result;
  };
  THREE.Group.prototype.__boxlabEdgeObjectBridgeInstalled = true;
}

window.addEventListener('boxlab-bridge-state', publish);
publish();

// Rebuild once so the bridge contains the current cage, not only subsequent renders.
queueMicrotask(() => {
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
  publish();
});
