export function installPerimeterFanBevel(EditableMesh) {
  if (EditableMesh.prototype.__perimeterFanBevelInstalled) return;

  const realFaces = (mesh, edge) => (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));
  const directedEdge = (face, a, b) => {
    if (!Array.isArray(face)) return 0;
    for (let i = 0; i < face.length; i++) {
      const u = face[i], v = face[(i + 1) % face.length];
      if (u === a && v === b) return 1;
      if (u === b && v === a) return -1;
    }
    return 0;
  };
  const quadraticPoint = (start, control, end, t) => {
    const u = 1 - t;
    return start.clone().multiplyScalar(u * u)
      .add(control.clone().multiplyScalar(2 * u * t))
      .add(end.clone().multiplyScalar(t * t));
  };

  EditableMesh.prototype.fanPerimeterBevelInfo = function(edgeIndices) {
    const ids = [...new Set(edgeIndices || [])].filter(Number.isInteger);
    if (ids.length < 3) return null;
    const edges = this.edges(), picked = ids.map(i => edges[i]);
    if (picked.some(edge => !edge || edge.loose || realFaces(this, edge).length !== 2)) return null;
    const selectedKeys = new Set(picked.map(edge => this.edgeKey(edge.a, edge.b)));

    let common = [...realFaces(this, picked[0])];
    for (let i = 1; i < picked.length && common.length; i++) {
      const faces = new Set(realFaces(this, picked[i]));
      common = common.filter(fi => faces.has(fi));
    }
    for (const faceIndex of common) {
      const face = this.faces[faceIndex];
      if (!Array.isArray(face) || face.length !== ids.length) continue;
      const boundaryKeys = face.map((v, i) => this.edgeKey(v, face[(i + 1) % face.length]));
      if (boundaryKeys.every(key => selectedKeys.has(key)) && selectedKeys.size === boundaryKeys.length) {
        const edgeIndexByKey = new Map(edges.map((edge, index) => [this.edgeKey(edge.a, edge.b), index]));
        const orderedIds = boundaryKeys.map(key => edgeIndexByKey.get(key));
        if (orderedIds.every(Number.isInteger)) return { ids:orderedIds, count:ids.length, faceIndex, orderedVertices:[...face] };
      }
    }
    return null;
  };

  EditableMesh.prototype.fanPerimeterBevel = function(edgeIndices, width = 0.2, segments = 1) {
    const info = this.fanPerimeterBevelInfo(edgeIndices);
    if (!info) return null;
    const amount = Math.max(0.02, Math.min(0.49, Number(width) || 0.2));
    const cuts = Math.max(1, Math.min(4, Math.round(Number(segments) || 1)));
    const originalVertices = this.vertices.map(v => v.clone());
    const originalFaces = this.faces.map(face => [...face]);
    const originalCreases = new Map(this.creases);
    const allEdges = this.edges();
    const selectedKeys = new Set(info.ids.map(id => this.edgeKey(allEdges[id].a, allEdges[id].b)));
    const boundary = new Set(info.orderedVertices);

    const incidentByVertex = new Map();
    let shortest = Infinity;
    for (const v of info.orderedVertices) {
      const incident = allEdges.filter(edge => edge && !edge.loose && (edge.a === v || edge.b === v) && realFaces(this, edge).length === 2);
      const selectedCount = incident.filter(edge => selectedKeys.has(this.edgeKey(edge.a, edge.b))).length;
      if (selectedCount !== 2 || incident.length < 3) return null;
      incidentByVertex.set(v, incident);
      for (const edge of incident) {
        const other = edge.a === v ? edge.b : edge.a;
        const len = originalVertices[v]?.distanceTo(originalVertices[other]);
        if (Number.isFinite(len)) shortest = Math.min(shortest, len);
      }
    }
    if (!Number.isFinite(shortest) || shortest < 1e-6) return null;
    const distance = shortest * amount;

    const splitMap = new Map();
    const innerMap = new Map();
    const splitPoint = (v, other) => {
      const key = `${v}:${other}`;
      if (splitMap.has(key)) return splitMap.get(key);
      const a = originalVertices[v], b = originalVertices[other], len = a?.distanceTo(b);
      if (!a || !b || !Number.isFinite(len) || len < distance - 1e-7) return null;
      this.vertices.push(a.clone().lerp(b, distance / len));
      const index = this.vertices.length - 1;
      splitMap.set(key, index);
      return index;
    };
    const innerPoint = (v) => {
      if (innerMap.has(v)) return innerMap.get(v);
      const face = originalFaces[info.faceIndex], i = face.indexOf(v), n = face.length;
      if (i < 0) return null;
      const prev = face[(i - 1 + n) % n], next = face[(i + 1) % n];
      const a = originalVertices[prev].clone().sub(originalVertices[v]);
      const b = originalVertices[next].clone().sub(originalVertices[v]);
      if (a.lengthSq() < 1e-12 || b.lengthSq() < 1e-12) return null;
      const p = originalVertices[v].clone().add(a.normalize().multiplyScalar(distance)).add(b.normalize().multiplyScalar(distance));
      this.vertices.push(p);
      const index = this.vertices.length - 1;
      innerMap.set(v, index);
      return index;
    };

    const sideReplacement = new Map();
    const rebuilt = [];
    for (let fi = 0; fi < originalFaces.length; fi++) {
      const face = originalFaces[fi], out = [];
      for (let i = 0; i < face.length; i++) {
        const v = face[i];
        if (!boundary.has(v)) { out.push(v); continue; }
        const prev = face[(i - 1 + face.length) % face.length], next = face[(i + 1) % face.length];
        const selPrev = selectedKeys.has(this.edgeKey(v, prev));
        const selNext = selectedKeys.has(this.edgeKey(v, next));
        let rep = null;
        if (fi === info.faceIndex || (selPrev && selNext)) {
          const q = innerPoint(v); rep = Number.isInteger(q) ? [q] : null;
        } else if (selPrev || selNext) {
          const p = splitPoint(v, selPrev ? next : prev); rep = Number.isInteger(p) ? [p] : null;
        } else {
          const p0 = splitPoint(v, prev), p1 = splitPoint(v, next);
          rep = Number.isInteger(p0) && Number.isInteger(p1) ? [p0, p1] : null;
        }
        if (!rep) return null;
        out.push(...rep);
        if (rep.length === 1) sideReplacement.set(`${fi}:${v}`, rep[0]);
      }
      const clean = out.filter((v, i) => i === 0 || v !== out[i - 1]);
      if (clean.length > 2 && clean[0] === clean[clean.length - 1]) clean.pop();
      if (new Set(clean).size < 3) return null;
      rebuilt.push(clean);
    }
    this.faces = rebuilt;

    const profileCache = new Map(), endpointProfiles = new Map();
    const profileChain = (vertex, inner, outer) => {
      const key = `${vertex}:${Math.min(inner,outer)}:${Math.max(inner,outer)}:${cuts}`;
      if (profileCache.has(key)) {
        const chain = profileCache.get(key);
        return chain[0] === inner ? [...chain] : [...chain].reverse();
      }
      const chain = [inner];
      for (let j = 1; j < cuts; j++) {
        this.vertices.push(quadraticPoint(this.vertices[inner], originalVertices[vertex], this.vertices[outer], j / cuts));
        chain.push(this.vertices.length - 1);
      }
      chain.push(outer);
      profileCache.set(key, [...chain]);
      return chain;
    };

    const edgeProfiles = [];
    for (const id of info.ids) {
      const edge = allEdges[id], faces = realFaces({faces:originalFaces}, edge);
      if (faces.length !== 2 || !faces.includes(info.faceIndex)) return null;
      const outsideFace = faces.find(fi => fi !== info.faceIndex);
      if (!Number.isInteger(outsideFace)) return null;
      const aInner = innerMap.get(edge.a), bInner = innerMap.get(edge.b);
      const aOuter = sideReplacement.get(`${outsideFace}:${edge.a}`), bOuter = sideReplacement.get(`${outsideFace}:${edge.b}`);
      if (![aInner,bInner,aOuter,bOuter].every(Number.isInteger)) return null;
      const chainA = profileChain(edge.a, aInner, aOuter), chainB = profileChain(edge.b, bInner, bOuter);
      const direction = directedEdge(originalFaces[info.faceIndex], edge.a, edge.b);
      if (!direction) return null;
      edgeProfiles.push({edge, chainA, chainB, direction});
      if (!endpointProfiles.has(edge.a)) endpointProfiles.set(edge.a, []);
      if (!endpointProfiles.has(edge.b)) endpointProfiles.set(edge.b, []);
      endpointProfiles.get(edge.a).push(chainA);
      endpointProfiles.get(edge.b).push(chainB);
    }

    const bevelFaceStart = this.faces.length;
    const ringPairs = Array.from({length:cuts + 1}, () => []);
    for (const {chainA,chainB,direction} of edgeProfiles) {
      for (let j = 0; j <= cuts; j++) ringPairs[j].push([chainA[j], chainB[j]]);
      for (let j = 0; j < cuts; j++) {
        const face = direction > 0
          ? [chainB[j], chainA[j], chainA[j + 1], chainB[j + 1]]
          : [chainA[j], chainB[j], chainB[j + 1], chainA[j + 1]];
        if (new Set(face).size < 3) return null;
        this.faces.push(face);
      }
    }

    const faceNormal = fi => {
      const face = originalFaces[fi];
      if (!face || face.length < 3) return null;
      const a = originalVertices[face[0]], b = originalVertices[face[1]], c = originalVertices[face[2]];
      const n = b.clone().sub(a).cross(c.clone().sub(a));
      return n.lengthSq() > 1e-12 ? n.normalize() : null;
    };

    for (const v of info.orderedVertices) {
      const points = new Set((endpointProfiles.get(v) || []).flat());
      for (const edge of incidentByVertex.get(v) || []) {
        if (selectedKeys.has(this.edgeKey(edge.a, edge.b))) continue;
        const other = edge.a === v ? edge.b : edge.a;
        const p = splitMap.get(`${v}:${other}`);
        if (Number.isInteger(p)) points.add(p);
      }
      const list = [...points];
      if (list.length <= 2) continue;
      const incidentFaces = [...new Set((incidentByVertex.get(v) || []).flatMap(edge => realFaces({faces:originalFaces}, edge)))];
      const avgN = originalVertices[v].clone().set(0,0,0);
      for (const fi of incidentFaces) { const n = faceNormal(fi); if (n) avgN.add(n); }
      if (avgN.lengthSq() < 1e-12) continue;
      avgN.normalize();
      const center = originalVertices[v].clone().set(0,0,0);
      for (const pi of list) center.add(this.vertices[pi]);
      center.multiplyScalar(1 / list.length);
      let axisX = this.vertices[list[0]].clone().sub(center);
      if (axisX.lengthSq() < 1e-12) continue;
      axisX.normalize();
      const axisY = avgN.clone().cross(axisX).normalize();
      const ordered = [...list].sort((ia, ib) => {
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
        this.vertices.push(center); const ci = this.vertices.length - 1;
        for (let i = 0; i < ordered.length; i++) this.faces.push([ordered[i], ordered[(i + 1) % ordered.length], ci]);
      }
    }

    const nextCreases = new Map();
    for (const [key, strength] of originalCreases) {
      const [u,v] = String(key).split(':').map(Number);
      if (!Number.isInteger(u) || !Number.isInteger(v) || selectedKeys.has(this.edgeKey(u,v))) continue;
      const nu = splitMap.get(`${u}:${v}`) ?? u, nv = splitMap.get(`${v}:${u}`) ?? v;
      if (nu !== nv) nextCreases.set(this.edgeKey(nu,nv), strength);
    }
    this.creases = nextCreases;

    const used = new Set(this.faces.flat());
    if (this.looseEdges instanceof Set) for (const key of this.looseEdges) {
      const [u,v] = String(key).split(':').map(Number); if (Number.isInteger(u)) used.add(u); if (Number.isInteger(v)) used.add(v);
    }
    if (this.looseVertices instanceof Set) for (const v of this.looseVertices) used.add(v);
    const indexMap = new Map(), compact = [];
    this.vertices.forEach((vertex,index) => { if (used.has(index)) { indexMap.set(index,compact.length); compact.push(vertex.clone()); } });
    this.faces = this.faces.map(face => face.map(index => indexMap.get(index)));
    const compactCreases = new Map();
    for (const [key,value] of this.creases) {
      const [u,v] = String(key).split(':').map(Number), nu = indexMap.get(u), nv = indexMap.get(v);
      if (Number.isInteger(nu) && Number.isInteger(nv) && nu !== nv) compactCreases.set(this.edgeKey(nu,nv),value);
    }
    this.creases = compactCreases;
    this.vertices = compact;
    this.remapLooseTopology?.(indexMap);

    const finalEdges = this.edges();
    const edgeIndexByKey = new Map(finalEdges.map((edge,index) => [this.edgeKey(edge.a,edge.b),index]));
    const ringEdgeIndices = ringPairs.map(level => level.map(([u,v]) => {
      const nu = indexMap.get(u), nv = indexMap.get(v);
      if (!Number.isInteger(nu) || !Number.isInteger(nv)) return null;
      return edgeIndexByKey.get(this.edgeKey(nu,nv));
    }).filter(Number.isInteger));

    return {
      selectionMode:'perimeter', sourceEdgeCount:info.count, segments:cuts, width:amount, distance,
      profile:cuts === 1 ? 'chamfer' : 'rounded', ringEdgeIndices,
      boundaryEdgeIndices:[...(ringEdgeIndices[0] || []), ...(ringEdgeIndices[ringEdgeIndices.length - 1] || [])],
      faceIndices:Array.from({length:this.faces.length - bevelFaceStart},(_,i)=>bevelFaceStart+i)
    };
  };

  EditableMesh.prototype.__perimeterFanBevelInstalled = true;
}
