export function installMultiEdgeChamferTopology(EditableMesh) {
  if (EditableMesh.prototype.__multiEdgeChamferInstalled) return;

  const realFaces = (mesh, edge) => (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));
  const edgeDirectionInFace = (face, a, b) => {
    const ia = face.indexOf(a), ib = face.indexOf(b), n = face.length;
    if (ia < 0 || ib < 0) return 0;
    if (face[(ia + 1) % n] === b) return 1;
    if (face[(ib + 1) % n] === a) return -1;
    return 0;
  };
  const quadraticPoint = (start, control, end, t) => {
    const u = 1 - t;
    return start.clone().multiplyScalar(u * u)
      .add(control.clone().multiplyScalar(2 * u * t))
      .add(end.clone().multiplyScalar(t * t));
  };
  const insertChainOnEdge = (face, a, b, chain) => {
    if (!Array.isArray(face) || chain.length < 3) return [...face];
    const out = [];
    for (let i = 0; i < face.length; i++) {
      const u = face[i], v = face[(i + 1) % face.length];
      out.push(u);
      if (u === a && v === b) out.push(...chain.slice(1, -1));
      else if (u === b && v === a) out.push(...chain.slice(1, -1).reverse());
    }
    return out;
  };

  EditableMesh.prototype.multiChamferSelectionInfo = function(edgeIndices) {
    const ids = [...new Set(edgeIndices || [])].filter(Number.isInteger);
    if (ids.length < 2) return null;
    const edges = this.edges();
    const picked = ids.map(i => edges[i]);
    if (picked.some(edge => !edge || edge.loose || realFaces(this, edge).length !== 2)) return null;

    const affected = new Set();
    for (const edge of picked) { affected.add(edge.a); affected.add(edge.b); }
    for (const v of affected) {
      const incident = edges.filter(edge => edge && !edge.loose && (edge.a === v || edge.b === v) && realFaces(this, edge).length === 2);
      if (incident.length !== 3) return null;
    }
    return { mode:'connected', ids, count:ids.length, affected:[...affected] };
  };

  EditableMesh.prototype.multiChamferSelection = function(edgeIndices, width = 0.2, segments = 1) {
    const info = this.multiChamferSelectionInfo(edgeIndices);
    if (!info) return null;

    const amount = Math.max(0.02, Math.min(0.49, Number(width) || 0.2));
    const cuts = Math.max(1, Math.min(4, Math.round(Number(segments) || 1)));
    const originalVertices = this.vertices.map(v => v.clone());
    const originalFaces = this.faces.map(face => [...face]);
    const originalCreases = new Map(this.creases);
    const allEdges = this.edges();
    const selected = new Set(info.ids.map(id => this.edgeKey(allEdges[id].a, allEdges[id].b)));

    let shortest = Infinity;
    for (const v of info.affected) {
      for (const edge of allEdges) {
        if (!edge || edge.loose || (edge.a !== v && edge.b !== v)) continue;
        const other = edge.a === v ? edge.b : edge.a;
        shortest = Math.min(shortest, originalVertices[v].distanceTo(originalVertices[other]));
      }
    }
    if (!Number.isFinite(shortest) || shortest < 1e-6) return null;
    const distance = shortest * amount;

    const affectedInfo = new Map();
    for (const v of info.affected) {
      const incident = allEdges.filter(edge => edge && !edge.loose && (edge.a === v || edge.b === v) && realFaces(this, edge).length === 2);
      const selectedCount = incident.filter(edge => selected.has(this.edgeKey(edge.a, edge.b))).length;
      affectedInfo.set(v, { incident, selectedCount });
    }

    const edgePointMap = new Map();
    const facePointMap = new Map();
    const edgePoint = (v, other) => {
      const key = `${v}:${other}`;
      if (edgePointMap.has(key)) return edgePointMap.get(key);
      const len = originalVertices[v].distanceTo(originalVertices[other]);
      if (!Number.isFinite(len) || len < distance - 1e-7) return null;
      const p = originalVertices[v].clone().lerp(originalVertices[other], distance / len);
      this.vertices.push(p);
      const index = this.vertices.length - 1;
      edgePointMap.set(key, index);
      return index;
    };
    const doubleSelectedPoint = (v, faceIndex, prev, next) => {
      const key = `${v}:${faceIndex}`;
      if (facePointMap.has(key)) return facePointMap.get(key);
      const a = originalVertices[prev].clone().sub(originalVertices[v]);
      const b = originalVertices[next].clone().sub(originalVertices[v]);
      if (a.lengthSq() < 1e-12 || b.lengthSq() < 1e-12) return null;
      a.normalize().multiplyScalar(distance); b.normalize().multiplyScalar(distance);
      const p = originalVertices[v].clone().add(a).add(b);
      this.vertices.push(p);
      const index = this.vertices.length - 1;
      facePointMap.set(key, index);
      return index;
    };

    const sideReplacement = new Map();
    const replacementFor = (v, faceIndex, prev, next) => {
      const meta = affectedInfo.get(v);
      if (!meta) return [v];
      const selPrev = selected.has(this.edgeKey(v, prev));
      const selNext = selected.has(this.edgeKey(v, next));
      if (selPrev && selNext) {
        const q = doubleSelectedPoint(v, faceIndex, prev, next);
        return Number.isInteger(q) ? [q] : null;
      }
      if (selPrev || selNext) {
        const p = edgePoint(v, selPrev ? next : prev);
        return Number.isInteger(p) ? [p] : null;
      }
      if (meta.selectedCount === 1) {
        const p0 = edgePoint(v, prev), p1 = edgePoint(v, next);
        return Number.isInteger(p0) && Number.isInteger(p1) ? [p0, p1] : null;
      }
      return [v];
    };

    const rebuilt = [];
    for (let fi = 0; fi < originalFaces.length; fi++) {
      const face = originalFaces[fi], out = [];
      for (let i = 0; i < face.length; i++) {
        const v = face[i], prev = face[(i - 1 + face.length) % face.length], next = face[(i + 1) % face.length];
        const rep = replacementFor(v, fi, prev, next);
        if (!rep) return null;
        out.push(...rep);
        if (rep.length === 1) sideReplacement.set(`${fi}:${v}`, rep[0]);
      }
      const cleaned = out.filter((v, i) => i === 0 || v !== out[i - 1]);
      if (cleaned.length > 2 && cleaned[0] === cleaned[cleaned.length - 1]) cleaned.pop();
      if (new Set(cleaned).size < 3) return null;
      rebuilt.push(cleaned);
    }
    this.faces = rebuilt;

    const profileCache = new Map();
    const endpointProfiles = new Map();
    const profileChain = (vertex, p0, p1) => {
      const lo = Math.min(p0, p1), hi = Math.max(p0, p1), key = `${vertex}:${lo}:${hi}:${cuts}`;
      if (profileCache.has(key)) {
        const cached = profileCache.get(key);
        return cached[0] === p0 ? [...cached] : [...cached].reverse();
      }
      const chain = [p0];
      for (let j = 1; j < cuts; j++) {
        this.vertices.push(quadraticPoint(this.vertices[p0], originalVertices[vertex], this.vertices[p1], j / cuts));
        chain.push(this.vertices.length - 1);
      }
      chain.push(p1);
      profileCache.set(key, p0 === lo ? [...chain] : [...chain].reverse());
      return chain;
    };

    const edgeProfiles = [];
    for (const id of info.ids) {
      const edge = allEdges[id], faces = realFaces({ faces: originalFaces }, edge);
      if (faces.length !== 2) return null;
      const [f0, f1] = faces;
      const d0 = edgeDirectionInFace(originalFaces[f0], edge.a, edge.b), d1 = edgeDirectionInFace(originalFaces[f1], edge.a, edge.b);
      if (!d0 || !d1 || d0 === d1) return null;
      const a0 = sideReplacement.get(`${f0}:${edge.a}`), b0 = sideReplacement.get(`${f0}:${edge.b}`);
      const a1 = sideReplacement.get(`${f1}:${edge.a}`), b1 = sideReplacement.get(`${f1}:${edge.b}`);
      if (![a0,b0,a1,b1].every(Number.isInteger)) return null;
      const chainA = profileChain(edge.a, a0, a1), chainB = profileChain(edge.b, b0, b1);
      edgeProfiles.push({ edge, d0, chainA, chainB });
      if (!endpointProfiles.has(edge.a)) endpointProfiles.set(edge.a, []);
      if (!endpointProfiles.has(edge.b)) endpointProfiles.set(edge.b, []);
      endpointProfiles.get(edge.a).push(chainA);
      endpointProfiles.get(edge.b).push(chainB);
    }

    if (cuts > 1) {
      for (const v of info.affected) {
        const meta = affectedInfo.get(v), chains = endpointProfiles.get(v) || [];
        if (meta?.selectedCount !== 1 || chains.length !== 1) continue;
        const chain = chains[0], first = chain[0], last = chain[chain.length - 1];
        const capIndex = this.faces.findIndex(face => {
          const ia = face.indexOf(first), ib = face.indexOf(last), n = face.length;
          return ia >= 0 && ib >= 0 && (face[(ia + 1) % n] === last || face[(ib + 1) % n] === first);
        });
        if (capIndex < 0) return null;
        this.faces[capIndex] = insertChainOnEdge(this.faces[capIndex], first, last, chain);
      }
    }

    const bevelFaceStart = this.faces.length;
    const ringPairs = Array.from({ length: cuts + 1 }, () => []);
    for (const { d0, chainA, chainB } of edgeProfiles) {
      for (let j = 0; j <= cuts; j++) ringPairs[j].push([chainA[j], chainB[j]]);
      for (let j = 0; j < cuts; j++) {
        const face = d0 > 0
          ? [chainB[j], chainA[j], chainA[j + 1], chainB[j + 1]]
          : [chainA[j], chainB[j], chainB[j + 1], chainA[j + 1]];
        if (new Set(face).size < 3) return null;
        this.faces.push(face);
      }
    }

    const faceNormal = faceIndex => {
      const face = originalFaces[faceIndex];
      if (!face || face.length < 3) return null;
      const a = originalVertices[face[0]], b = originalVertices[face[1]], c = originalVertices[face[2]];
      const n = b.clone().sub(a).cross(c.clone().sub(a));
      return n.lengthSq() > 1e-12 ? n.normalize() : null;
    };

    for (const v of info.affected) {
      const meta = affectedInfo.get(v);
      if (meta?.selectedCount !== 3) continue;
      const raw = (endpointProfiles.get(v) || []).flat();
      const points = [...new Set(raw)];
      if (points.length < 3) return null;
      const incidentFaces = [...new Set(meta.incident.flatMap(edge => realFaces({ faces: originalFaces }, edge)))];
      const avgN = originalVertices[v].clone().set(0,0,0);
      for (const fi of incidentFaces) { const n = faceNormal(fi); if (n) avgN.add(n); }
      if (avgN.lengthSq() < 1e-12) return null;
      avgN.normalize();
      const center = originalVertices[v].clone().set(0,0,0);
      for (const pi of points) center.add(this.vertices[pi]);
      center.multiplyScalar(1 / points.length);
      const axisX = this.vertices[points[0]].clone().sub(center).normalize();
      const axisY = avgN.clone().cross(axisX).normalize();
      const ordered = [...points].sort((ia, ib) => {
        const a = this.vertices[ia].clone().sub(center), b = this.vertices[ib].clone().sub(center);
        return Math.atan2(a.dot(axisY), a.dot(axisX)) - Math.atan2(b.dot(axisY), b.dot(axisX));
      });
      if (ordered.length >= 3) {
        const n = this.vertices[ordered[1]].clone().sub(this.vertices[ordered[0]])
          .cross(this.vertices[ordered[2]].clone().sub(this.vertices[ordered[0]]));
        if (n.dot(avgN) < 0) ordered.reverse();
      }
      if (cuts === 1) this.faces.push(ordered);
      else {
        this.vertices.push(center);
        const ci = this.vertices.length - 1;
        for (let i = 0; i < ordered.length; i++) {
          const a = ordered[i], b = ordered[(i + 1) % ordered.length];
          this.faces.push([a, b, ci]);
        }
      }
    }

    const nextCreases = new Map();
    for (const [key, strength] of originalCreases) {
      const [u,v] = String(key).split(':').map(Number);
      if (!Number.isInteger(u) || !Number.isInteger(v) || selected.has(this.edgeKey(u,v))) continue;
      const nu = edgePointMap.get(`${u}:${v}`) ?? u;
      const nv = edgePointMap.get(`${v}:${u}`) ?? v;
      if (nu !== nv) nextCreases.set(this.edgeKey(nu,nv), strength);
    }
    this.creases = nextCreases;

    const used = new Set(this.faces.flat());
    if (this.looseEdges instanceof Set) for (const key of this.looseEdges) {
      const [u,v] = String(key).split(':').map(Number); if (Number.isInteger(u)) used.add(u); if (Number.isInteger(v)) used.add(v);
    }
    if (this.looseVertices instanceof Set) for (const v of this.looseVertices) used.add(v);
    const indexMap = new Map(), compact = [];
    this.vertices.forEach((vertex, index) => { if (used.has(index)) { indexMap.set(index, compact.length); compact.push(vertex.clone()); } });
    this.faces = this.faces.map(face => face.map(index => indexMap.get(index)));
    const compactCreases = new Map();
    for (const [key, value] of this.creases) {
      const [u,v] = String(key).split(':').map(Number), nu = indexMap.get(u), nv = indexMap.get(v);
      if (Number.isInteger(nu) && Number.isInteger(nv) && nu !== nv) compactCreases.set(this.edgeKey(nu,nv), value);
    }
    this.creases = compactCreases;
    this.vertices = compact;
    this.remapLooseTopology?.(indexMap);

    const finalEdges = this.edges();
    const edgeIndexByKey = new Map(finalEdges.map((edge, index) => [this.edgeKey(edge.a, edge.b), index]));
    const ringEdgeIndices = ringPairs.map(level => level.map(([u,v]) => {
      const nu = indexMap.get(u), nv = indexMap.get(v);
      return Number.isInteger(nu) && Number.isInteger(nv) ? edgeIndexByKey.get(this.edgeKey(nu,nv)) : null;
    }).filter(Number.isInteger));

    return {
      selectionMode:'connected', sourceEdgeCount:info.count, segments:cuts, width:amount, distance,
      profile:cuts === 1 ? 'chamfer' : 'rounded', ringEdgeIndices,
      boundaryEdgeIndices:[...(ringEdgeIndices[0] || []), ...(ringEdgeIndices[ringEdgeIndices.length - 1] || [])],
      faceIndices:Array.from({length:this.faces.length - bevelFaceStart},(_,i)=>bevelFaceStart+i)
    };
  };

  EditableMesh.prototype.__multiEdgeChamferInstalled = true;
}
