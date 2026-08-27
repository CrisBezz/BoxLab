export function installBevelSelection(EditableMesh) {
  if (EditableMesh.prototype.__bevelSelectionInstalled) return;

  const manifoldEdge = (mesh, edge) => edge && !edge.loose && (edge.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length).length === 2;

  EditableMesh.prototype.generalBevelSelectionInfo = function(edgeIndices) {
    const ids = [...new Set(edgeIndices || [])].filter(Number.isInteger);
    if (!ids.length) return null;
    const allEdges = this.edges();
    const picked = ids.map(i => allEdges[i]);
    if (picked.some(edge => !manifoldEdge(this, edge))) return null;

    if (ids.length === 1) {
      const single = this.generalBevelEdgeInfo?.(ids);
      return single ? { mode:'single', ids, count:1, single } : null;
    }

    const adjacency = new Map();
    for (let i = 0; i < ids.length; i++) {
      const edge = picked[i];
      if (!adjacency.has(edge.a)) adjacency.set(edge.a, []);
      if (!adjacency.has(edge.b)) adjacency.set(edge.b, []);
      adjacency.get(edge.a).push(ids[i]);
      adjacency.get(edge.b).push(ids[i]);
    }
    if ([...adjacency.values()].some(list => list.length > 2)) return null;

    const first = ids[0], seen = new Set([first]), queue = [first];
    while (queue.length) {
      const id = queue.shift(), edge = allEdges[id];
      for (const vertex of [edge.a, edge.b]) {
        for (const next of adjacency.get(vertex) || []) {
          if (!seen.has(next)) { seen.add(next); queue.push(next); }
        }
      }
    }

    if (seen.size === ids.length && [...adjacency.values()].every(list => list.length === 2)) {
      const loop = this.bevelEdgeLoopInfo?.(ids);
      return loop ? { mode:'loop', ids, count:ids.length, loop } : null;
    }

    const sharedVertex = [...adjacency.values()].some(list => list.length > 1);
    if (sharedVertex) return null;

    for (const id of ids) if (!this.generalBevelEdgeInfo?.([id])) return null;
    return { mode:'separate', ids, count:ids.length };
  };

  const pointKey = point => `${point.x.toFixed(7)},${point.y.toFixed(7)},${point.z.toFixed(7)}`;
  const edgeSignature = (mesh, edge) => {
    const a = pointKey(mesh.vertices[edge.a]), b = pointKey(mesh.vertices[edge.b]);
    return a < b ? `${a}|${b}` : `${b}|${a}`;
  };

  EditableMesh.prototype.generalBevelSelection = function(edgeIndices, width = 0.2, segments = 1) {
    const info = this.generalBevelSelectionInfo(edgeIndices);
    if (!info) return null;
    if (info.mode === 'single') return this.generalBevelEdge(info.ids, width, segments);
    if (info.mode === 'loop') {
      const result = this.bevelEdgeLoop?.(info.ids, width, segments);
      if (result) result.selectionMode = 'loop';
      return result;
    }

    const before = {
      vertices: this.vertices.map(v => v.clone()),
      faces: this.faces.map(f => [...f]),
      creases: new Map(this.creases),
      looseEdges: this.looseEdges instanceof Set ? new Set(this.looseEdges) : null,
      looseVertices: this.looseVertices instanceof Set ? new Set(this.looseVertices) : null
    };
    const signatures = info.ids.map(id => edgeSignature(this, this.edges()[id]));
    const railSignatures = [];

    const restore = () => {
      this.vertices = before.vertices.map(v => v.clone());
      this.faces = before.faces.map(f => [...f]);
      this.creases = new Map(before.creases);
      if (before.looseEdges) this.looseEdges = new Set(before.looseEdges);
      if (before.looseVertices) this.looseVertices = new Set(before.looseVertices);
      this.edges();
    };

    for (const signature of signatures) {
      const edgesNow = this.edges();
      const index = edgesNow.findIndex(edge => edgeSignature(this, edge) === signature);
      if (index < 0) { restore(); return null; }
      const result = this.generalBevelEdge?.([index], width, segments);
      if (!result) { restore(); return null; }
      for (const ring of result.ringEdgeIndices || []) {
        for (const edgeIndex of ring) {
          const edge = this.edges()[edgeIndex];
          if (edge) railSignatures.push(edgeSignature(this, edge));
        }
      }
    }

    const finalEdges = this.edges();
    const ringEdgeIndices = railSignatures.map(signature => {
      const index = finalEdges.findIndex(edge => edgeSignature(this, edge) === signature);
      return index >= 0 ? [index] : [];
    }).filter(ring => ring.length);

    return {
      selectionMode:'separate',
      sourceEdgeCount: info.count,
      segments: Math.max(1, Math.min(4, Math.round(Number(segments) || 1))),
      width: Math.max(0.02, Math.min(0.45, Number(width) || 0.2)),
      ringEdgeIndices,
      boundaryEdgeIndices: ringEdgeIndices.flat()
    };
  };

  EditableMesh.prototype.__bevelSelectionInstalled = true;
}
