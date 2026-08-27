import * as THREE from 'three';

export function installFaceTransform() {
  if (globalThis.__boxlabFaceTransformInstalled) return;
  globalThis.__boxlabFaceTransformInstalled = true;

  const canvas = document.querySelector('#viewport');
  const status = document.querySelector('#selectionStatus');
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const WORLD_AXES = { x:new THREE.Vector3(1,0,0), y:new THREE.Vector3(0,1,0), z:new THREE.Vector3(0,0,1) };
  const INFERENCE_SNAP_PX = 10;
  const PLANE_EPSILON = 1e-5;
  let drag = null;

  function state() { return globalThis.__boxlabBridgeState; }
  function currentMesh() { return state()?.mesh || null; }
  function selectedFaces() { return [...new Set(state()?.selectedFaces || [])]; }
  function faceMode() { return document.querySelector('#selectionModes button[data-mode="face"]')?.classList.contains('active'); }
  function directFaceToolActive() { return document.querySelector('#extrudeBtn')?.classList.contains('active') || document.querySelector('#insetBtn')?.classList.contains('active'); }
  function toolMode() { return document.querySelector('#toolModes button.active')?.dataset?.tool || 'move'; }
  function axisSnapEnabled() { return !!document.querySelector('#axisSnapToggle')?.checked; }
  function inferenceSnapEnabled() { return axisSnapEnabled() && !!document.querySelector('#inferenceSnapToggle')?.checked; }

  function setPointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function selectedFaceHit(event, mesh, faces, camera) {
    setPointer(event);
    raycaster.setFromCamera(pointer, camera);
    const pickers = [];
    for (const faceIndex of faces) {
      const face = mesh.faces[faceIndex];
      if (!face || face.length < 3) continue;
      const positions = [];
      for (let i = 1; i < face.length - 1; i++) {
        [face[0], face[i], face[i + 1]].forEach(vertexIndex => {
          const v = mesh.vertices[vertexIndex];
          if (v) positions.push(v.x, v.y, v.z);
        });
      }
      if (!positions.length) continue;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
      const picker = new THREE.Mesh(geometry, material);
      picker.userData.faceIndex = faceIndex;
      pickers.push(picker);
    }
    const hits = raycaster.intersectObjects(pickers, false);
    pickers.forEach(picker => { picker.geometry.dispose(); picker.material.dispose(); });
    return hits.length > 0;
  }

  function selectedVertices(mesh, faces) {
    return [...new Set(faces.flatMap(faceIndex => mesh.faces[faceIndex] || []))];
  }

  function centerOf(mesh, vertices) {
    const center = new THREE.Vector3();
    vertices.forEach(index => center.add(mesh.vertices[index]));
    if (vertices.length) center.multiplyScalar(1 / vertices.length);
    return center;
  }

  function screenPlaneAt(camera, point) {
    const normal = new THREE.Vector3();
    camera.getWorldDirection(normal);
    return new THREE.Plane().setFromNormalAndCoplanarPoint(normal, point);
  }

  function rayPlanePoint(event, camera, plane) {
    setPointer(event);
    raycaster.setFromCamera(pointer, camera);
    const out = new THREE.Vector3();
    return raycaster.ray.intersectPlane(plane, out) ? out : null;
  }

  function worldToScreen(camera, point) {
    const p = point.clone().project(camera), r = canvas.getBoundingClientRect();
    return new THREE.Vector2(r.left + (p.x * .5 + .5) * r.width, r.top + (-p.y * .5 + .5) * r.height);
  }

  function projectedWorldAxes(camera, center) {
    const c = worldToScreen(camera, center), out = {};
    for (const [axis, direction] of Object.entries(WORLD_AXES)) {
      const projected = worldToScreen(camera, center.clone().add(direction)).sub(c);
      if (projected.lengthSq() > 16) out[axis] = projected;
    }
    return out;
  }

  function chooseAxisLock(dx, dy, axes) {
    const movement = new THREE.Vector2(dx, dy);
    if (movement.lengthSq() < 1) return null;
    movement.normalize();
    const scored = Object.entries(axes).map(([axis, v]) => ({ axis, score:Math.abs(movement.dot(v.clone().normalize())) })).sort((a,b) => b.score - a.score);
    return scored[0]?.axis || null;
  }

  function inferenceTargets(mesh, selectedVertexIds, selectedFaceIds, axis) {
    const selectedSet = new Set(selectedVertexIds), selectedFacesSet = new Set(selectedFaceIds), targets = [];
    mesh.vertices.forEach((v, i) => { if (!selectedSet.has(i)) targets.push({ value:v[axis], type:'vertex' }); });
    mesh.faces.forEach((face, fi) => {
      if (selectedFacesSet.has(fi) || face.some(i => selectedSet.has(i))) return;
      const values = face.map(i => mesh.vertices[i][axis]), min = Math.min(...values), max = Math.max(...values);
      if (max - min <= PLANE_EPSILON) targets.push({ value:(min + max) * .5, type:'face' });
    });
    return targets;
  }

  function inferAxisSnap(mesh, selectedVertexIds, selectedFaceIds, center, axis, raw, pixelsPerUnit) {
    const start = center[axis], candidate = start + raw, threshold = INFERENCE_SNAP_PX / Math.max(pixelsPerUnit, 1);
    let best = null;
    for (const target of inferenceTargets(mesh, selectedVertexIds, selectedFaceIds, axis)) {
      const distance = Math.abs(target.value - candidate);
      if (distance <= threshold && (!best || distance < best.distance || (Math.abs(distance - best.distance) < 1e-8 && target.type === 'face'))) best = { ...target, distance };
    }
    return best ? { delta:best.value - start, type:best.type } : null;
  }

  function restore(target, source) {
    target.vertices = source.vertices.map(v => v.clone());
    target.faces = source.faces.map(face => [...face]);
    target.creases = new Map(source.creases);
    target.looseEdges = new Set(source.looseEdges || []);
    target.looseVertices = new Set(source.looseVertices || []);
  }

  function render() { document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true })); }

  canvas?.addEventListener('pointerdown', event => {
    if (!event.isPrimary || !faceMode() || directFaceToolActive()) return;
    const mesh = currentMesh(), faces = selectedFaces(), camera = state()?.camera;
    if (!mesh || !faces.length || !camera) return;
    if (!selectedFaceHit(event, mesh, faces, camera)) return;

    const vertices = selectedVertices(mesh, faces);
    if (!vertices.length) return;
    const center = centerOf(mesh, vertices), plane = screenPlaneAt(camera, center), start = rayPlanePoint(event, camera, plane);
    if (!start) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    drag = {
      pointerId:event.pointerId,
      mesh,
      faces,
      vertices,
      before:mesh.clone(),
      center,
      plane,
      start,
      startX:event.clientX,
      startY:event.clientY,
      tool:toolMode(),
      axisScreens:projectedWorldAxes(camera, center),
      axisLock:null,
      inferenceSnap:null,
      changed:false
    };
    canvas.setPointerCapture?.(event.pointerId);
  }, true);

  canvas?.addEventListener('pointermove', event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
    if (!drag.changed && Math.hypot(dx,dy) < 8) return;
    if (!drag.changed) {
      globalThis.__boxlabHistory?.push(drag.before);
      drag.changed = true;
      if (drag.tool === 'move' && axisSnapEnabled()) drag.axisLock = chooseAxisLock(dx, dy, drag.axisScreens);
    }
    restore(drag.mesh, drag.before);

    if (drag.tool === 'scale') {
      const factor = Math.max(0.1, Math.min(5, Math.exp((dx - dy) * 0.006)));
      for (const index of drag.vertices) drag.mesh.vertices[index].sub(drag.center).multiplyScalar(factor).add(drag.center);
      if (status) status.textContent = `${drag.faces.length} face${drag.faces.length===1?'':'s'} • Scale ${factor.toFixed(2)}×`;
    } else if (drag.axisLock && drag.axisScreens[drag.axisLock]) {
      const rail = drag.axisScreens[drag.axisLock];
      let amount = new THREE.Vector2(dx,dy).dot(rail) / rail.lengthSq();
      drag.inferenceSnap = null;
      if (inferenceSnapEnabled()) {
        const inferred = inferAxisSnap(drag.before, drag.vertices, drag.faces, drag.center, drag.axisLock, amount, rail.length());
        if (inferred) { amount = inferred.delta; drag.inferenceSnap = inferred; }
      }
      const delta = WORLD_AXES[drag.axisLock].clone().multiplyScalar(amount);
      for (const index of drag.vertices) drag.mesh.vertices[index].add(delta);
      if (status) status.textContent = `${drag.faces.length} face${drag.faces.length===1?'':'s'} • Move ${drag.axisLock.toUpperCase()}${drag.inferenceSnap ? ` • Snap ${drag.inferenceSnap.type}` : ''}`;
    } else {
      const camera = state()?.camera;
      const now = camera ? rayPlanePoint(event, camera, drag.plane) : null;
      if (!now) return;
      const delta = now.clone().sub(drag.start);
      for (const index of drag.vertices) drag.mesh.vertices[index].add(delta);
      if (status) status.textContent = `${drag.faces.length} face${drag.faces.length===1?'':'s'} • Move`;
    }
    render();
  }, true);

  const end = event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    drag = null;
    render();
  };
  canvas?.addEventListener('pointerup', end, true);
  canvas?.addEventListener('pointercancel', end, true);
}
