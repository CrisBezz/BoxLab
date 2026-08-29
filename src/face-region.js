import * as THREE from 'three';

export function installFaceRegion(EditableMesh) {
  if (EditableMesh.prototype.__faceRegionInstalled) return;

  const edgeKey = (mesh, a, b) => mesh.edgeKey(a, b);

  EditableMesh.prototype.faceRegionInfo = function (faceIndices) {
    const ids = [...new Set(faceIndices || [])].filter(i => Number.isInteger(i) && this.faces[i]);
    if (ids.length < 2) return null;
    const edgeOwners = new Map();
    for (const faceIndex of ids) {
      const face = this.faces[faceIndex];
      if (!face || face.length < 3) return null;
      for (let i = 0; i < face.length; i++) {
        const a = face[i], b = face[(i + 1) % face.length], key = edgeKey(this, a, b);
        if (!edgeOwners.has(key)) edgeOwners.set(key, []);
        edgeOwners.get(key).push({ faceIndex, a, b });
      }
    }

    const faceAdjacency = new Map(ids.map(i => [i, new Set()]));
    for (const owners of edgeOwners.values()) {
      if (owners.length === 2) {
        faceAdjacency.get(owners[0].faceIndex)?.add(owners[1].faceIndex);
        faceAdjacency.get(owners[1].faceIndex)?.add(owners[0].faceIndex);
      }
    }
    const queue = [ids[0]], seen = new Set(queue);
    while (queue.length) {
      const current = queue.shift();
      for (const next of faceAdjacency.get(current) || []) if (!seen.has(next)) { seen.add(next); queue.push(next); }
    }
    if (seen.size !== ids.length) return null;

    const boundary = [];
    for (const owners of edgeOwners.values()) if (owners.length === 1) boundary.push({ ...owners[0] });
    if (boundary.length < 3) return null;

    const boundaryAdj = new Map();
    for (const edge of boundary) {
      if (!boundaryAdj.has(edge.a)) boundaryAdj.set(edge.a, []);
      if (!boundaryAdj.has(edge.b)) boundaryAdj.set(edge.b, []);
      boundaryAdj.get(edge.a).push(edge.b);
      boundaryAdj.get(edge.b).push(edge.a);
    }
    if ([...boundaryAdj.values()].some(list => list.length !== 2)) return null;

    const start = boundaryAdj.keys().next().value, loop = [start];
    let previous = null, current = start;
    for (let guard = 0; guard <= boundaryAdj.size; guard++) {
      const next = (boundaryAdj.get(current) || []).find(v => v !== previous);
      if (next === undefined) return null;
      if (next === start) break;
      if (loop.includes(next)) return null;
      loop.push(next);
      previous = current;
      current = next;
    }
    if (loop.length !== boundaryAdj.size) return null;

    const regionVertices = [...new Set(ids.flatMap(i => this.faces[i]))];
    return { faceIndices: ids, boundaryLoop: loop, regionVertices };
  };

  EditableMesh.prototype.faceRegionNormal = function (faceIndices) {
    const info = this.faceRegionInfo(faceIndices);
    if (!info) return null;
    const normal = this.faceNormal(info.faceIndices[0]).clone().set(0, 0, 0);
    for (const faceIndex of info.faceIndices) normal.add(this.faceNormal(faceIndex));
    return normal.lengthSq() > 1e-10 ? normal.normalize() : this.faceNormal(info.faceIndices[0]).clone();
  };

  EditableMesh.prototype.extrudeFaceRegion = function (faceIndices, distance = 0.25) {
    const info = this.faceRegionInfo(faceIndices);
    if (!info) return null;
    const normal = this.faceRegionNormal(info.faceIndices);
    if (!normal) return null;
    const replacement = new Map();
    for (const vertex of info.regionVertices) {
      this.vertices.push(this.vertices[vertex].clone().addScaledVector(normal, distance));
      replacement.set(vertex, this.vertices.length - 1);
    }
    for (const faceIndex of info.faceIndices) this.faces[faceIndex] = this.faces[faceIndex].map(vertex => replacement.get(vertex));
    const sideStart = this.faces.length;
    for (let i = 0; i < info.boundaryLoop.length; i++) {
      const a = info.boundaryLoop[i], b = info.boundaryLoop[(i + 1) % info.boundaryLoop.length];
      this.faces.push([a, b, replacement.get(b), replacement.get(a)]);
    }
    this.edges();
    return {
      faceIndices: [...info.faceIndices],
      sideFaceIndices: Array.from({ length: info.boundaryLoop.length }, (_, i) => sideStart + i),
      distance
    };
  };

  EditableMesh.prototype.insetFaceRegion = function (faceIndices, amount = 0.2) {
    const info = this.faceRegionInfo(faceIndices);
    if (!info) return null;
    const t = Math.max(0.01, Math.min(0.95, Number(amount) || 0.2));
    const center = info.regionVertices.reduce((sum, index) => sum.add(this.vertices[index]), this.vertices[info.regionVertices[0]].clone().set(0,0,0)).multiplyScalar(1 / info.regionVertices.length);
    const replacement = new Map();
    for (const vertex of info.regionVertices) {
      const copy = this.vertices[vertex].clone().lerp(center, t);
      this.vertices.push(copy);
      replacement.set(vertex, this.vertices.length - 1);
    }
    for (const faceIndex of info.faceIndices) this.faces[faceIndex] = this.faces[faceIndex].map(vertex => replacement.get(vertex));
    const sideStart = this.faces.length;
    for (let i = 0; i < info.boundaryLoop.length; i++) {
      const a = info.boundaryLoop[i], b = info.boundaryLoop[(i + 1) % info.boundaryLoop.length];
      this.faces.push([a, b, replacement.get(b), replacement.get(a)]);
    }
    this.edges();
    return {
      faceIndices: [...info.faceIndices],
      sideFaceIndices: Array.from({ length: info.boundaryLoop.length }, (_, i) => sideStart + i),
      amount: t
    };
  };

  EditableMesh.prototype.__faceRegionInstalled = true;

  const extrudeButton = document.querySelector('#extrudeBtn');
  const insetButton = document.querySelector('#insetBtn');
  const canvas = document.querySelector('#viewport');
  const status = document.querySelector('#selectionStatus');
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let armedTool = null, drag = null;

  function state() { return globalThis.__boxlabBridgeState; }
  function selectedFaces() { return [...new Set(state()?.selectedFaces || [])]; }
  function currentMesh() { return state()?.mesh || null; }
  function regionInfo() {
    const mesh = currentMesh(), faces = selectedFaces();
    return mesh && faces.length > 1 ? mesh.faceRegionInfo?.(faces) : null;
  }
  function render() { document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true })); }
  function restore(target, source) {
    target.vertices = source.vertices.map(v => v.clone());
    target.faces = source.faces.map(face => [...face]);
    target.creases = new Map(source.creases);
    target.looseEdges = new Set(source.looseEdges || []);
    target.looseVertices = new Set(source.looseVertices || []);
  }
  function centerOf(mesh, vertices) {
    const center = mesh.vertices[vertices[0]].clone().set(0,0,0);
    vertices.forEach(index => center.add(mesh.vertices[index]));
    return center.multiplyScalar(1 / vertices.length);
  }
  function worldToScreen(point, camera) {
    const p = point.clone().project(camera), r = canvas.getBoundingClientRect();
    return { x:r.left+(p.x*.5+.5)*r.width, y:r.top+(-p.y*.5+.5)*r.height };
  }
  function projectedNormal(mesh, faces, camera) {
    const info = mesh.faceRegionInfo(faces), normal = mesh.faceRegionNormal(faces);
    if (!info || !normal || !camera) return { x:0, y:-1 };
    const center = centerOf(mesh, info.regionVertices), a = worldToScreen(center, camera), b = worldToScreen(center.clone().add(normal), camera);
    const x = b.x-a.x, y = b.y-a.y, length = Math.hypot(x,y);
    return length > 1e-4 ? { x:x/length, y:y/length } : { x:0, y:-1 };
  }
  function setPointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height * 2 - 1));
  }
  function regionHit(event, mesh, faces, camera) {
    if (!mesh || !camera || !faces.length) return false;
    setPointer(event);
    raycaster.setFromCamera(pointer, camera);
    const pickers = [];
    for (const faceIndex of faces) {
      const face = mesh.faces[faceIndex];
      if (!Array.isArray(face) || face.length < 3) continue;
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
      const material = new THREE.MeshBasicMaterial({ side:THREE.DoubleSide });
      const picker = new THREE.Mesh(geometry, material);
      pickers.push(picker);
    }
    const hit = raycaster.intersectObjects(pickers, false).length > 0;
    pickers.forEach(picker => { picker.geometry.dispose(); picker.material.dispose(); });
    return hit;
  }
  function setArmed(tool) {
    armedTool = armedTool === tool ? null : tool;
    extrudeButton?.classList.toggle('active', armedTool === 'extrude');
    insetButton?.classList.toggle('active', armedTool === 'inset');
    const info = regionInfo();
    if (status && info) status.textContent = armedTool
      ? `Face region • ${info.faceIndices.length} faces • drag region to ${armedTool === 'extrude' ? 'Extrude' : 'Inset'}`
      : `${info.faceIndices.length} faces selected`;
  }

  extrudeButton?.addEventListener('click', event => {
    if (!regionInfo()) return;
    event.preventDefault(); event.stopImmediatePropagation(); setArmed('extrude');
  }, true);
  insetButton?.addEventListener('click', event => {
    if (!regionInfo()) return;
    event.preventDefault(); event.stopImmediatePropagation(); setArmed('inset');
  }, true);

  canvas?.addEventListener('pointerdown', event => {
    if (!armedTool || !event.isPrimary) return;
    const mesh = currentMesh(), faces = selectedFaces(), info = mesh?.faceRegionInfo?.(faces), camera = state()?.camera;
    if (!mesh || !info || !camera) { setArmed(null); return; }
    if (!regionHit(event, mesh, faces, camera)) return;
    event.preventDefault(); event.stopImmediatePropagation();
    drag = {
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY,
      before:mesh.clone(), mesh, faces:[...faces], tool:armedTool,
      normal2D:projectedNormal(mesh, faces, camera), changed:false, preview:false
    };
    canvas.setPointerCapture?.(event.pointerId);
  }, true);

  canvas?.addEventListener('pointermove', event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
    if (!drag.changed && Math.hypot(dx,dy) < 8) return;
    if (!drag.changed) { globalThis.__boxlabHistory?.push(drag.before); drag.changed = true; }
    restore(drag.mesh, drag.before);
    if (drag.tool === 'extrude') {
      const distance = (dx * drag.normal2D.x + dy * drag.normal2D.y) * 0.006;
      const result = drag.mesh.extrudeFaceRegion(drag.faces, distance);
      drag.preview = !!result;
      if (!result) return;
      if (status) status.textContent = `Extrude Region • ${drag.faces.length} faces • ${distance >= 0 ? '+' : ''}${distance.toFixed(2)}`;
    } else {
      const amount = Math.max(0.01, Math.min(0.95, (dx - dy) * 0.004));
      const result = drag.mesh.insetFaceRegion(drag.faces, amount);
      drag.preview = !!result;
      if (!result) return;
      if (status) status.textContent = `Inset Region • ${drag.faces.length} faces • ${Math.round(amount * 100)}%`;
    }
    render();
  }, true);

  const end = event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const completed = drag.changed && drag.preview && event.type === 'pointerup';
    if (!completed) restore(drag.mesh, drag.before);
    const faces = [...drag.faces], tool = drag.tool;
    drag = null;
    if (completed) globalThis.__boxlabSelectionBridge?.set?.('face', faces);
    const info = regionInfo();
    if (!info) {
      armedTool = null;
      extrudeButton?.classList.remove('active');
      insetButton?.classList.remove('active');
    } else if (status) {
      status.textContent = `${info.faceIndices.length} faces • ${tool === 'extrude' ? 'Extrude' : 'Inset'} ready • drag region again`;
    }
    render();
  };
  canvas?.addEventListener('pointerup', end, true);
  canvas?.addEventListener('pointercancel', end, true);
}
