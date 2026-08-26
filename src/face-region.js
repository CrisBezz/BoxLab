export function installFaceRegion(EditableMesh) {
  if (EditableMesh.prototype.__faceRegionInstalled) return;

  const edgeKey = (mesh, a, b) => mesh.edgeKey(a, b);

  EditableMesh.prototype.faceRegionInfo = function (faceIndices) {
    const ids = [...new Set(faceIndices || [])].filter(i => Number.isInteger(i) && this.faces[i]);
    if (ids.length < 2) return null;
    const selected = new Set(ids);
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
    for (const [key, owners] of edgeOwners) if (owners.length === 1) boundary.push({ key, ...owners[0] });
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
    return { faceIndices: ids, boundaryLoop: loop, regionVertices, selected };
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

    const sideFaces = [];
    for (let i = 0; i < info.boundaryLoop.length; i++) {
      const a = info.boundaryLoop[i], b = info.boundaryLoop[(i + 1) % info.boundaryLoop.length];
      const na = replacement.get(a), nb = replacement.get(b);
      if ([a,b,nb,na].some(v => !Number.isInteger(v))) return null;
      sideFaces.push([a, b, nb, na]);
    }
    const sideStart = this.faces.length;
    this.faces.push(...sideFaces);
    this.edges();
    return {
      faceIndices: [...info.faceIndices],
      sideFaceIndices: Array.from({ length: sideFaces.length }, (_, i) => sideStart + i),
      amount: t
    };
  };

  EditableMesh.prototype.__faceRegionInstalled = true;

  const state = globalThis.__boxlabBridgeState;
  const insetButton = document.querySelector('#insetBtn');
  const canvas = document.querySelector('#viewport');
  const status = document.querySelector('#selectionStatus');
  let armed = false, drag = null;

  function selectedFaces() { return [...new Set(globalThis.__boxlabBridgeState?.selectedFaces || [])]; }
  function currentMesh() { return globalThis.__boxlabBridgeState?.mesh || null; }
  function regionInfo() {
    const mesh = currentMesh(), faces = selectedFaces();
    return mesh && faces.length > 1 ? mesh.faceRegionInfo?.(faces) : null;
  }
  function render() { document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true })); }

  insetButton?.addEventListener('click', event => {
    const info = regionInfo();
    if (!info) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    armed = !armed;
    insetButton.classList.toggle('active', armed);
    if (status) status.textContent = armed ? `Face region • ${info.faceIndices.length} faces • drag to Inset` : `${info.faceIndices.length} faces selected`;
  }, true);

  canvas?.addEventListener('pointerdown', event => {
    if (!armed || !event.isPrimary) return;
    const mesh = currentMesh(), faces = selectedFaces(), info = mesh?.faceRegionInfo?.(faces);
    if (!mesh || !info) { armed = false; insetButton?.classList.remove('active'); return; }
    event.preventDefault();
    event.stopImmediatePropagation();
    drag = { pointerId:event.pointerId, startX:event.clientX, startY:event.clientY, before:mesh.clone(), mesh, faces:[...faces], changed:false, amount:0 };
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
    }
    const amount = Math.max(0.01, Math.min(0.95, (dx - dy) * 0.004));
    drag.mesh.vertices = drag.before.vertices.map(v => v.clone());
    drag.mesh.faces = drag.before.faces.map(face => [...face]);
    drag.mesh.creases = new Map(drag.before.creases);
    drag.mesh.looseEdges = new Set(drag.before.looseEdges || []);
    drag.mesh.looseVertices = new Set(drag.before.looseVertices || []);
    const result = drag.mesh.insetFaceRegion(drag.faces, amount);
    if (!result) return;
    drag.amount = amount;
    render();
    if (status) status.textContent = `Inset Region • ${drag.faces.length} faces • ${Math.round(amount * 100)}%`;
  }, true);

  const end = event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    drag = null;
    armed = false;
    insetButton?.classList.remove('active');
    render();
  };
  canvas?.addEventListener('pointerup', end, true);
  canvas?.addEventListener('pointercancel', end, true);
}
