export function installGeneralEdgeBevelTopology(EditableMesh) {
  if (EditableMesh.prototype.__generalEdgeBevelInstalled) return;

  const realFaces = (mesh, edge) => (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));

  const sideInfo = (mesh, faceIndex, a, b) => {
    const face = mesh.faces[faceIndex];
    if (!Array.isArray(face) || face.length < 3) return null;
    const ia = face.indexOf(a), ib = face.indexOf(b), n = face.length;
    if (ia < 0 || ib < 0) return null;
    if (face[(ia + 1) % n] === b) return { faceIndex, direction:1, otherA:face[(ia - 1 + n) % n], otherB:face[(ib + 1) % n] };
    if (face[(ib + 1) % n] === a) return { faceIndex, direction:-1, otherA:face[(ia + 1) % n], otherB:face[(ib - 1 + n) % n] };
    return null;
  };

  const replaceSelectedEdge = (face, a, b, newA, newB) => {
    const out = [...face], ia = out.indexOf(a), ib = out.indexOf(b), n = out.length;
    if (ia < 0 || ib < 0) return null;
    if (out[(ia + 1) % n] !== b && out[(ib + 1) % n] !== a) return null;
    out[ia] = newA; out[ib] = newB;
    return out;
  };

  const insertOnEdge = (face, u, v, inserted) => {
    const out = []; let found = false;
    for (let i = 0; i < face.length; i++) {
      const a = face[i], b = face[(i + 1) % face.length];
      out.push(a);
      if ((a === u && b === v) || (a === v && b === u)) { out.push(inserted); found = true; }
    }
    return found ? out : [...face];
  };

  const removeVertex = (face, vertex) => face.includes(vertex) ? face.filter(v => v !== vertex) : [...face];

  const insertPathBetween = (face, start, end, middle) => {
    if (!middle?.length) return [...face];
    const out = [];
    for (let i = 0; i < face.length; i++) {
      const a = face[i], b = face[(i + 1) % face.length];
      out.push(a);
      if (a === start && b === end) out.push(...middle);
      else if (a === end && b === start) out.push(...[...middle].reverse());
    }
    return out;
  };

  const quadraticPoint = (start, control, end, t) => {
    const u = 1 - t;
    return start.clone().multiplyScalar(u * u)
      .add(control.clone().multiplyScalar(2 * u * t))
      .add(end.clone().multiplyScalar(t * t));
  };

  EditableMesh.prototype.generalBevelEdgeInfo = function(edgeIndices) {
    const ids = [...new Set(edgeIndices || [])].filter(Number.isInteger);
    if (ids.length !== 1) return null;
    const allEdges = this.edges(), edgeIndex = ids[0], edge = allEdges[edgeIndex];
    if (!edge || edge.loose) return null;
    const faces = realFaces(this, edge);
    if (faces.length !== 2) return null;
    const a = edge.a, b = edge.b;
    const sides = faces.map(fi => sideInfo(this, fi, a, b));
    if (sides.some(side => !side) || sides[0].direction === sides[1].direction) return null;

    const splitKeys = [
      this.edgeKey(a, sides[0].otherA), this.edgeKey(b, sides[0].otherB),
      this.edgeKey(a, sides[1].otherA), this.edgeKey(b, sides[1].otherB)
    ];
    if (new Set(splitKeys).size !== 4) return null;

    const sideFaceSet = new Set(faces);
    const aCaps = this.faces.map((face, i) => ({face,i})).filter(({face,i}) => !sideFaceSet.has(i) && face?.includes(a));
    const bCaps = this.faces.map((face, i) => ({face,i})).filter(({face,i}) => !sideFaceSet.has(i) && face?.includes(b));
    if (aCaps.length !== 1 || bCaps.length !== 1) return null;
    const aCap = aCaps[0], bCap = bCaps[0];
    if (!aCap.face.includes(sides[0].otherA) || !aCap.face.includes(sides[1].otherA)) return null;
    if (!bCap.face.includes(sides[0].otherB) || !bCap.face.includes(sides[1].otherB)) return null;

    return { edgeIndex, edge, a, b, sides, splitKeys, aCapIndex:aCap.i, bCapIndex:bCap.i };
  };

  EditableMesh.prototype.generalBevelEdge = function(edgeIndices, width = 0.2, segments = 1) {
    const info = this.generalBevelEdgeInfo(edgeIndices);
    if (!info) return null;
    const amount = Math.max(0.02, Math.min(0.49, Number(width) || 0.2));
    const cuts = Math.max(1, Math.min(4, Math.round(Number(segments) || 1)));
    const { a, b, sides, aCapIndex, bCapIndex } = info;
    const originalFaces = this.faces.map(face => [...face]);
    const originalCreases = new Map(this.creases);
    const railLengths = sides.flatMap(side => [
      this.vertices[a].distanceTo(this.vertices[side.otherA]),
      this.vertices[b].distanceTo(this.vertices[side.otherB])
    ]);
    const shortestRail = Math.min(...railLengths);
    if (!Number.isFinite(shortestRail) || shortestRail < 1e-6) return null;
    const distance = shortestRail * amount;

    const boundary = sides.map(side => {
      const aRail = this.vertices[a].distanceTo(this.vertices[side.otherA]);
      const bRail = this.vertices[b].distanceTo(this.vertices[side.otherB]);
      const aPoint = this.vertices[a].clone().lerp(this.vertices[side.otherA], distance / aRail);
      const bPoint = this.vertices[b].clone().lerp(this.vertices[side.otherB], distance / bRail);
      this.vertices.push(aPoint); const ai = this.vertices.length - 1;
      this.vertices.push(bPoint); const bi = this.vertices.length - 1;
      return { ...side, ai, bi };
    });

    const aRings = [], bRings = [];
    for (let level = 0; level <= cuts; level++) {
      const t = level / cuts;
      if (level === 0) {
        aRings.push(boundary[0].ai); bRings.push(boundary[0].bi);
      } else if (level === cuts) {
        aRings.push(boundary[1].ai); bRings.push(boundary[1].bi);
      } else {
        this.vertices.push(quadraticPoint(this.vertices[boundary[0].ai], this.vertices[a], this.vertices[boundary[1].ai], t));
        aRings.push(this.vertices.length - 1);
        this.vertices.push(quadraticPoint(this.vertices[boundary[0].bi], this.vertices[b], this.vertices[boundary[1].bi], t));
        bRings.push(this.vertices.length - 1);
      }
    }

    const splitSpecs = [
      { u:a, v:boundary[0].otherA, inserted:boundary[0].ai },
      { u:b, v:boundary[0].otherB, inserted:boundary[0].bi },
      { u:a, v:boundary[1].otherA, inserted:boundary[1].ai },
      { u:b, v:boundary[1].otherB, inserted:boundary[1].bi }
    ];

    const nextFaces = originalFaces.map((face, faceIndex) => {
      if (faceIndex === boundary[0].faceIndex) return replaceSelectedEdge(face, a, b, boundary[0].ai, boundary[0].bi);
      if (faceIndex === boundary[1].faceIndex) return replaceSelectedEdge(face, a, b, boundary[1].ai, boundary[1].bi);
      let out = [...face];
      for (const spec of splitSpecs) out = insertOnEdge(out, spec.u, spec.v, spec.inserted);
      if (faceIndex === aCapIndex) {
        out = removeVertex(out, a);
        out = insertPathBetween(out, boundary[0].ai, boundary[1].ai, aRings.slice(1, -1));
      }
      if (faceIndex === bCapIndex) {
        out = removeVertex(out, b);
        out = insertPathBetween(out, boundary[0].bi, boundary[1].bi, bRings.slice(1, -1));
      }
      return out;
    });
    if (nextFaces.some(face => !Array.isArray(face) || face.length < 3)) return null;
    this.faces = nextFaces;

    const bevelFaces = [];
    for (let level = 0; level < cuts; level++) {
      bevelFaces.push(boundary[0].direction > 0
        ? [bRings[level], aRings[level], aRings[level + 1], bRings[level + 1]]
        : [aRings[level], bRings[level], bRings[level + 1], aRings[level + 1]]);
    }
    const bevelFaceStart = this.faces.length;
    this.faces.push(...bevelFaces);

    this.creases = new Map(originalCreases);
    this.creases.delete(this.edgeKey(a, b));
    for (const spec of splitSpecs) {
      const key = this.edgeKey(spec.u, spec.v), strength = originalCreases.get(key) || 0;
      if (strength <= 0) continue;
      this.creases.delete(key);
      this.creases.set(this.edgeKey(spec.u, spec.inserted), strength);
      this.creases.set(this.edgeKey(spec.inserted, spec.v), strength);
    }

    const used = new Set(this.faces.flat());
    if (this.looseEdges instanceof Set) for (const key of this.looseEdges) {
      const [u,v] = String(key).split(':').map(Number); if (Number.isInteger(u)) used.add(u); if (Number.isInteger(v)) used.add(v);
    }
    if (this.looseVertices instanceof Set) for (const v of this.looseVertices) used.add(v);

    const indexMap = new Map(), compact = [];
    this.vertices.forEach((vertex, index) => {
      if (!used.has(index)) return;
      indexMap.set(index, compact.length); compact.push(vertex.clone());
    });
    this.faces = this.faces.map(face => face.map(index => indexMap.get(index)));
    const nextCreases = new Map();
    for (const [key, value] of this.creases) {
      const [u,v] = String(key).split(':').map(Number), nu = indexMap.get(u), nv = indexMap.get(v);
      if (Number.isInteger(nu) && Number.isInteger(nv) && nu !== nv) nextCreases.set(this.edgeKey(nu,nv), value);
    }
    this.creases = nextCreases;
    this.vertices = compact;
    this.remapLooseTopology?.(indexMap);

    const mappedARings = aRings.map(v => indexMap.get(v)), mappedBRings = bRings.map(v => indexMap.get(v));
    const allEdges = this.edges();
    const edgeIndexByKey = new Map(allEdges.map((edge, index) => [this.edgeKey(edge.a, edge.b), index]));
    const ringEdgeIndices = [];
    for (let level = 0; level <= cuts; level++) {
      const edgeIndex = edgeIndexByKey.get(this.edgeKey(mappedARings[level], mappedBRings[level]));
      if (Number.isInteger(edgeIndex)) ringEdgeIndices.push([edgeIndex]);
    }

    return {
      sourceEdgeIndex: info.edgeIndex,
      segments: cuts,
      width: amount,
      distance,
      profile: cuts === 1 ? 'chamfer' : 'rounded',
      ringEdgeIndices,
      boundaryEdgeIndices: [ringEdgeIndices[0]?.[0], ringEdgeIndices[ringEdgeIndices.length - 1]?.[0]].filter(Number.isInteger),
      faceIndices: Array.from({ length: bevelFaces.length }, (_, i) => bevelFaceStart + i)
    };
  };

  EditableMesh.prototype.__generalEdgeBevelInstalled = true;
}
