export function installBevelSelection(EditableMesh) {
  if (EditableMesh.prototype.__bevelSelectionInstalled) return;

  const manifoldEdge = (mesh, edge) => edge && !edge.loose && (edge.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length).length === 2;
  const pointKey = point => `${point.x.toFixed(7)},${point.y.toFixed(7)},${point.z.toFixed(7)}`;
  const edgeSignature = (mesh, edge) => {
    const a = pointKey(mesh.vertices[edge.a]), b = pointKey(mesh.vertices[edge.b]);
    return a < b ? `${a}|${b}` : `${b}|${a}`;
  };
  const railLengthsForInfo = (mesh, info) => info?.sides?.flatMap(side => [
    mesh.vertices[info.a]?.distanceTo(mesh.vertices[side.otherA]),
    mesh.vertices[info.b]?.distanceTo(mesh.vertices[side.otherB])
  ]).filter(Number.isFinite) || [];
  const pointOnSegment = (point, start, end, tolerance = 1e-5) => {
    const axis = end.clone().sub(start), lenSq = axis.lengthSq();
    if (lenSq < 1e-12) return false;
    const t = point.clone().sub(start).dot(axis) / lenSq;
    if (t < -tolerance || t > 1 + tolerance) return false;
    const closest = start.clone().addScaledVector(axis, t);
    const scale = Math.max(1, Math.sqrt(lenSq));
    return closest.distanceTo(point) <= tolerance * scale;
  };
  const findRemainingEdge = (mesh, original) => {
    let best = null;
    mesh.edges().forEach((edge, index) => {
      if (!manifoldEdge(mesh, edge)) return;
      const a = mesh.vertices[edge.a], b = mesh.vertices[edge.b];
      if (!a || !b) return;
      if (!pointOnSegment(a, original.a, original.b) || !pointOnSegment(b, original.a, original.b)) return;
      const length = a.distanceTo(b);
      if (!best || length > best.length) best = { index, length };
    });
    return best?.index ?? -1;
  };

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
      if (loop) return { mode:'loop', ids, count:ids.length, loop };
    }

    const singles = [];
    for (const id of ids) {
      const single = this.generalBevelEdgeInfo?.([id]);
      if (!single) return null;
      singles.push(single);
    }
    return { mode:'set', ids, count:ids.length, singles };
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

    const amount = Math.max(0.02, Math.min(0.49, Number(width) || 0.2));
    const cuts = Math.max(1, Math.min(4, Math.round(Number(segments) || 1)));
    const before = {
      vertices: this.vertices.map(v => v.clone()),
      faces: this.faces.map(f => [...f]),
      creases: new Map(this.creases),
      looseEdges: this.looseEdges instanceof Set ? new Set(this.looseEdges) : null,
      looseVertices: this.looseVertices instanceof Set ? new Set(this.looseVertices) : null
    };
    const originalEdges = this.edges();
    const originals = info.ids.map(id => ({
      id,
      a: this.vertices[originalEdges[id].a].clone(),
      b: this.vertices[originalEdges[id].b].clone(),
      midpoint: this.vertices[originalEdges[id].a].clone().add(this.vertices[originalEdges[id].b]).multiplyScalar(.5)
    }));
    const originalRailLengths = info.singles.flatMap(single => railLengthsForInfo(this, single));
    const shortestOriginalRail = Math.min(...originalRailLengths);
    if (!Number.isFinite(shortestOriginalRail) || shortestOriginalRail < 1e-6) return null;
    const targetDistance = shortestOriginalRail * amount;
    const railSignatures = [];

    const restore = () => {
      this.vertices = before.vertices.map(v => v.clone());
      this.faces = before.faces.map(f => [...f]);
      this.creases = new Map(before.creases);
      if (before.looseEdges) this.looseEdges = new Set(before.looseEdges);
      if (before.looseVertices) this.looseVertices = new Set(before.looseVertices);
      this.edges();
    };

    // Process the most connected selections first so shared corners are resolved
    // while their original neighbourhood is still easiest to identify.
    const selectedDegree = new Map();
    for (const edge of originalEdges.filter((_, index) => info.ids.includes(index))) {
      selectedDegree.set(edge.a, (selectedDegree.get(edge.a) || 0) + 1);
      selectedDegree.set(edge.b, (selectedDegree.get(edge.b) || 0) + 1);
    }
    originals.sort((u, v) => {
      const eu = originalEdges[u.id], ev = originalEdges[v.id];
      const du = Math.max(selectedDegree.get(eu.a) || 0, selectedDegree.get(eu.b) || 0);
      const dv = Math.max(selectedDegree.get(ev.a) || 0, selectedDegree.get(ev.b) || 0);
      return dv - du;
    });

    for (const original of originals) {
      const index = findRemainingEdge(this, original);
      if (index < 0) { restore(); this.__lastBevelError = 'Multi-bevel stopped • selected edge could not be remapped'; return null; }
      const currentInfo = this.generalBevelEdgeInfo?.([index]);
      if (!currentInfo) { restore(); this.__lastBevelError = 'Multi-bevel stopped • shared corner became invalid'; return null; }
      const currentRails = railLengthsForInfo(this, currentInfo);
      const shortestCurrentRail = Math.min(...currentRails);
      if (!Number.isFinite(shortestCurrentRail) || shortestCurrentRail < 1e-6) { restore(); return null; }
      const localAmount = targetDistance / shortestCurrentRail;
      if (localAmount >= 0.495) {
        restore();
        this.__lastBevelError = 'Multi-bevel limit reached • reduce width for this corner';
        return null;
      }
      const result = this.generalBevelEdge?.([index], Math.max(0.0001, localAmount), cuts);
      if (!result) { restore(); this.__lastBevelError = 'Multi-bevel unavailable • corner topology changed'; return null; }
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

    this.__lastBevelError = '';
    return {
      selectionMode:'set',
      sourceEdgeCount: info.count,
      segments: cuts,
      width: amount,
      distance: targetDistance,
      ringEdgeIndices,
      boundaryEdgeIndices: ringEdgeIndices.flat()
    };
  };

  EditableMesh.prototype.__bevelSelectionInstalled = true;
}
