export function installGeneralEdgeBevelTopology(EditableMesh) {
  if (EditableMesh.prototype.__generalEdgeBevelInstalled) return;

  const realFaces = (mesh, edge) => (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));

  const sideInfo = (mesh, faceIndex, a, b) => {
    const face = mesh.faces[faceIndex];
    if (!Array.isArray(face) || face.length < 3) return null;
    const ia = face.indexOf(a), ib = face.indexOf(b), n = face.length;
    if (ia < 0 || ib < 0) return null;
    if (face[(ia + 1) % n] === b) {
      return { faceIndex, direction: 1, otherA: face[(ia - 1 + n) % n], otherB: face[(ib + 1) % n] };
    }
    if (face[(ib + 1) % n] === a) {
      return { faceIndex, direction: -1, otherA: face[(ia + 1) % n], otherB: face[(ib - 1 + n) % n] };
    }
    return null;
  };

  const replaceSelectedEdge = (face, a, b, newA, newB) => {
    const out = [...face];
    const ia = out.indexOf(a), ib = out.indexOf(b), n = out.length;
    if (ia < 0 || ib < 0) return null;
    if (out[(ia + 1) % n] === b || out[(ib + 1) % n] === a) {
      out[ia] = newA;
      out[ib] = newB;
      return out;
    }
    return null;
  };

  const insertOnEdge = (face, u, v, inserted) => {
    const out = [];
    let found = false;
    for (let i = 0; i < face.length; i++) {
      const a = face[i], b = face[(i + 1) % face.length];
      out.push(a);
      if ((a === u && b === v) || (a === v && b === u)) {
        out.push(inserted);
        found = true;
      }
    }
    return found ? out : face;
  };

  const directedEdge = (face, a, b) => {
    for (let i = 0; i < face.length; i++) {
      if (face[i] === a && face[(i + 1) % face.length] === b) return 1;
      if (face[i] === b && face[(i + 1) % face.length] === a) return -1;
    }
    return 0;
  };

  const windingPenalty = (candidate, faces) => {
    let penalty = 0;
    for (let i = 0; i < candidate.length; i++) {
      const a = candidate[i], b = candidate[(i + 1) % candidate.length];
      for (const face of faces) if (directedEdge(face, a, b) === 1) penalty++;
    }
    return penalty;
  };

  const bestWinding = (vertices, faces) => {
    const forward = [...vertices], reverse = [...vertices].reverse();
    return windingPenalty(reverse, faces) < windingPenalty(forward, faces) ? reverse : forward;
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
    if (sides.some(side => !side)) return null;
    if (sides[0].direction === sides[1].direction) return null;
    for (const side of sides) {
      if (!Number.isInteger(side.otherA) || !Number.isInteger(side.otherB)) return null;
      if (side.otherA === b || side.otherB === a) return null;
    }
    const splitKeys = [
      this.edgeKey(a, sides[0].otherA), this.edgeKey(b, sides[0].otherB),
      this.edgeKey(a, sides[1].otherA), this.edgeKey(b, sides[1].otherB)
    ];
    if (new Set(splitKeys).size !== splitKeys.length) return null;
    return { edgeIndex, edge, a, b, sides, splitKeys };
  };

  EditableMesh.prototype.generalBevelEdge = function(edgeIndices, width = 0.2, segments = 1) {
    const info = this.generalBevelEdgeInfo(edgeIndices);
    if (!info) return null;
    const amount = Math.max(0.02, Math.min(0.45, Number(width) || 0.2));
    const cuts = Math.max(1, Math.min(4, Math.round(Number(segments) || 1)));
    const { a, b, sides } = info;
    const originalFaces = this.faces.map(face => [...face]);
    const originalCreases = new Map(this.creases);

    const boundary = sides.map(side => {
      const aPoint = this.vertices[a].clone().lerp(this.vertices[side.otherA], amount);
      const bPoint = this.vertices[b].clone().lerp(this.vertices[side.otherB], amount);
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
        this.vertices.push(this.vertices[boundary[0].ai].clone().lerp(this.vertices[boundary[1].ai], t));
        aRings.push(this.vertices.length - 1);
        this.vertices.push(this.vertices[boundary[0].bi].clone().lerp(this.vertices[boundary[1].bi], t));
        bRings.push(this.vertices.length - 1);
      }
    }

    const splitSpecs = [
      { u:a, v:boundary[0].otherA, inserted:boundary[0].ai, generatingFace:boundary[0].faceIndex },
      { u:b, v:boundary[0].otherB, inserted:boundary[0].bi, generatingFace:boundary[0].faceIndex },
      { u:a, v:boundary[1].otherA, inserted:boundary[1].ai, generatingFace:boundary[1].faceIndex },
      { u:b, v:boundary[1].otherB, inserted:boundary[1].bi, generatingFace:boundary[1].faceIndex }
    ];

    const nextFaces = originalFaces.map((face, faceIndex) => {
      if (faceIndex === boundary[0].faceIndex) return replaceSelectedEdge(face, a, b, boundary[0].ai, boundary[0].bi);
      if (faceIndex === boundary[1].faceIndex) return replaceSelectedEdge(face, a, b, boundary[1].ai, boundary[1].bi);
      let out = [...face];
      for (const spec of splitSpecs) out = insertOnEdge(out, spec.u, spec.v, spec.inserted);
      return out;
    });
    if (nextFaces.some(face => !Array.isArray(face) || face.length < 3)) return null;
    this.faces = nextFaces;

    const bevelFaces = [];
    const side0Direction = boundary[0].direction;
    for (let level = 0; level < cuts; level++) {
      bevelFaces.push(side0Direction > 0
        ? [bRings[level], aRings[level], aRings[level + 1], bRings[level + 1]]
        : [aRings[level], bRings[level], bRings[level + 1], aRings[level + 1]]);
    }
    this.faces.push(...bevelFaces);

    const aCap = bestWinding([a, ...aRings], this.faces);
    const bCap = bestWinding([b, ...bRings], this.faces);
    this.faces.push(aCap, bCap);

    this.creases = new Map(originalCreases);
    this.creases.delete(this.edgeKey(a, b));
    for (const spec of splitSpecs) {
      const key = this.edgeKey(spec.u, spec.v), strength = originalCreases.get(key) || 0;
      if (strength <= 0) continue;
      this.creases.delete(key);
      this.creases.set(this.edgeKey(spec.u, spec.inserted), strength);
      this.creases.set(this.edgeKey(spec.inserted, spec.v), strength);
    }

    const allEdges = this.edges();
    const edgeIndexByKey = new Map(allEdges.map((edge, index) => [this.edgeKey(edge.a, edge.b), index]));
    const ringEdgeIndices = [];
    for (let level = 0; level <= cuts; level++) {
      const edgeIndex = edgeIndexByKey.get(this.edgeKey(aRings[level], bRings[level]));
      if (Number.isInteger(edgeIndex)) ringEdgeIndices.push([edgeIndex]);
    }

    return {
      sourceEdgeIndex: info.edgeIndex,
      segments: cuts,
      width: amount,
      ringEdgeIndices,
      boundaryEdgeIndices: [ringEdgeIndices[0]?.[0], ringEdgeIndices[ringEdgeIndices.length - 1]?.[0]].filter(Number.isInteger),
      faceIndices: Array.from({ length: bevelFaces.length + 2 }, (_, i) => this.faces.length - bevelFaces.length - 2 + i)
    };
  };

  EditableMesh.prototype.__generalEdgeBevelInstalled = true;
}
