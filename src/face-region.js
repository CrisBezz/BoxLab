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
    const ids = [...new Set(faceIndices || [])].filter(i => Number.isInteger(i) && this.faces[i]);
    if (!ids.length) return null;
    if (ids.length === 1) return this.faceNormal(ids[0]).clone();
    const info = this.faceRegionInfo(ids);
    if (!info) return null;
    const normal = this.faceNormal(info.faceIndices[0]).clone().set(0, 0, 0);
    for (const faceIndex of info.faceIndices) normal.add(this.faceNormal(faceIndex));
    return normal.lengthSq() > 1e-10 ? normal.normalize() : this.faceNormal(info.faceIndices[0]).clone();
  };

  EditableMesh.prototype.faceRegionsInfo = function (faceIndices) {
    const ids = [...new Set(faceIndices || [])].filter(i => Number.isInteger(i) && Array.isArray(this.faces[i]) && this.faces[i].length >= 3);
    if (!ids.length) return null;
    const selected = new Set(ids), edgeOwners = new Map();
    for (const faceIndex of ids) {
      const face = this.faces[faceIndex];
      for (let i = 0; i < face.length; i++) {
        const key = edgeKey(this, face[i], face[(i + 1) % face.length]);
        if (!edgeOwners.has(key)) edgeOwners.set(key, []);
        edgeOwners.get(key).push(faceIndex);
      }
    }
    const adjacency = new Map(ids.map(i => [i, new Set()]));
    for (const owners of edgeOwners.values()) {
      const inside = [...new Set(owners.filter(i => selected.has(i)))];
      for (let a = 0; a < inside.length; a++) for (let b = a + 1; b < inside.length; b++) {
        adjacency.get(inside[a])?.add(inside[b]);
        adjacency.get(inside[b])?.add(inside[a]);
      }
    }
    const unvisited = new Set(ids), regions = [];
    while (unvisited.size) {
      const seed = unvisited.values().next().value, queue = [seed], component = [];
      unvisited.delete(seed);
      while (queue.length) {
        const current = queue.shift(); component.push(current);
        for (const next of adjacency.get(current) || []) if (unvisited.delete(next)) queue.push(next);
      }
      if (component.length === 1) {
        const faceIndex = component[0], face = this.faces[faceIndex];
        regions.push({
          faceIndices:[faceIndex],
          boundaryLoop:[...face],
          regionVertices:[...new Set(face)],
          normal:this.faceNormal(faceIndex).clone()
        });
      } else {
        const info = this.faceRegionInfo(component);
        if (!info) return null;
        const normal = this.faceRegionNormal(component);
        if (!normal) return null;
        regions.push({ ...info, normal });
      }
    }
    return { faceIndices:ids, regions, regionCount:regions.length };
  };

  EditableMesh.prototype.extrudeFaceRegion = function (faceIndices, distance = 0.25) {
    const ids = [...new Set(faceIndices || [])].filter(i => Number.isInteger(i) && this.faces[i]);
    let info;
    if (ids.length === 1) {
      const faceIndex = ids[0], face = this.faces[faceIndex];
      info = { faceIndices:[faceIndex], boundaryLoop:[...face], regionVertices:[...new Set(face)] };
    } else info = this.faceRegionInfo(ids);
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
    const ids = [...new Set(faceIndices || [])].filter(i => Number.isInteger(i) && this.faces[i]);
    let info;
    if (ids.length === 1) {
      const faceIndex = ids[0], face = this.faces[faceIndex];
      info = { faceIndices:[faceIndex], boundaryLoop:[...face], regionVertices:[...new Set(face)] };
    } else info = this.faceRegionInfo(ids);
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

  EditableMesh.prototype.extrudeFaceRegions = function (faceIndices, distance = 0.25) {
    const group = this.faceRegionsInfo(faceIndices);
    if (!group) return null;
    const results = [];
    for (const region of group.regions) {
      const result = this.extrudeFaceRegion(region.faceIndices, distance);
      if (!result) return null;
      results.push(result);
    }
    return { faceIndices:[...group.faceIndices], regions:results, regionCount:results.length, distance };
  };

  EditableMesh.prototype.insetFaceRegions = function (faceIndices, amount = 0.2) {
    const group = this.faceRegionsInfo(faceIndices);
    if (!group) return null;
    const results = [];
    for (const region of group.regions) {
      const result = this.insetFaceRegion(region.faceIndices, amount);
      if (!result) return null;
      results.push(result);
    }
    return { faceIndices:[...group.faceIndices], regions:results, regionCount:results.length, amount };
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
  function regionsInfo() {
    const mesh = currentMesh(), faces = selectedFaces();
    return mesh && faces.length > 1 ? mesh.faceRegionsInfo?.(faces) : null;
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
  function projectedNormalForRegion(mesh, region, camera) {
    const normal = region?.normal || mesh.faceRegionNormal(region?.faceIndices || []);
    if (!region || !normal || !camera) return { x:0, y:-1 };
    const center = centerOf(mesh, region.regionVertices), a = worldToScreen(center, camera), b = worldToScreen(center.clone().add(normal), camera);
    const x = b.x-a.x, y = b.y-a.y, length = Math.hypot(x,y);
    return length > 1e-4 ? { x:x/length, y:y/length } : { x:0, y:-1 };
  }
  function setPointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height * 2 - 1));
  }
  function selectedFaceHit(event, mesh, faces, camera) {
    if (!mesh || !camera || !faces.length) return null;
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
      picker.userData.faceIndex = faceIndex;
      pickers.push(picker);
    }
    const hit = raycaster.intersectObjects(pickers, false)[0];
    const faceIndex = Number.isInteger(hit?.object?.userData?.faceIndex) ? hit.object.userData.faceIndex : null;
    pickers.forEach(picker => { picker.geometry.dispose(); picker.material.dispose(); });
    return faceIndex;
  }
  function setArmed(tool) {
    armedTool = armedTool === tool ? null : tool;
    extrudeButton?.classList.toggle('active', armedTool === 'extrude');
    insetButton?.classList.toggle('active', armedTool === 'inset');
    const info = regionsInfo();
    if (status && info) status.textContent = armedTool
      ? `${info.faceIndices.length} faces • ${info.regionCount} region${info.regionCount===1?'':'s'} • drag to ${armedTool === 'extrude' ? 'Extrude' : 'Inset'}`
      : `${info.faceIndices.length} faces selected`;
  }

  extrudeButton?.addEventListener('click', event => {
    if (!regionsInfo()) return;
    event.preventDefault(); event.stopImmediatePropagation(); setArmed('extrude');
  }, true);
  insetButton?.addEventListener('click', event => {
    if (!regionsInfo()) return;
    event.preventDefault(); event.stopImmediatePropagation(); setArmed('inset');
  }, true);

  canvas?.addEventListener('pointerdown', event => {
    if (!armedTool || !event.isPrimary) return;
    const mesh = currentMesh(), faces = selectedFaces(), info = mesh?.faceRegionsInfo?.(faces), camera = state()?.camera;
    if (!mesh || !info || !camera) { setArmed(null); return; }
    const hitFace = selectedFaceHit(event, mesh, faces, camera);
    if (!Number.isInteger(hitFace)) return;
    const hitRegion = info.regions.find(region => region.faceIndices.includes(hitFace)) || info.regions[0];
    event.preventDefault(); event.stopImmediatePropagation();
    drag = {
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY,
      before:mesh.clone(), mesh, faces:[...faces], tool:armedTool,
      info, normal2D:projectedNormalForRegion(mesh, hitRegion, camera), changed:false, preview:false
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
      const result = drag.mesh.extrudeFaceRegions(drag.faces, distance);
      drag.preview = !!result;
      if (!result) return;
      if (status) status.textContent = `Extrude • ${drag.faces.length} faces • ${result.regionCount} region${result.regionCount===1?'':'s'} • ${distance >= 0 ? '+' : ''}${distance.toFixed(2)}`;
    } else {
      const amount = Math.max(0.01, Math.min(0.95, (dx - dy) * 0.004));
      const result = drag.mesh.insetFaceRegions(drag.faces, amount);
      drag.preview = !!result;
      if (!result) return;
      if (status) status.textContent = `Inset • ${drag.faces.length} faces • ${result.regionCount} region${result.regionCount===1?'':'s'} • ${Math.round(amount * 100)}%`;
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
    const info = regionsInfo();
    if (!info) {
      armedTool = null;
      extrudeButton?.classList.remove('active');
      insetButton?.classList.remove('active');
    } else if (status) {
      status.textContent = `${info.faceIndices.length} faces • ${info.regionCount} region${info.regionCount===1?'':'s'} • ${tool === 'extrude' ? 'Extrude' : 'Inset'} ready`;
    }
    render();
  };
  canvas?.addEventListener('pointerup', end, true);
  canvas?.addEventListener('pointercancel', end, true);
}
