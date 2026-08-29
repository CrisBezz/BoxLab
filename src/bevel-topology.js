export function installBevelTopology(EditableMesh) {
  if (EditableMesh.prototype.__bevelTopologyInstalled) return;

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

  EditableMesh.prototype.bevelEdgeLoopInfo = function (edgeIndices) {
    const allEdges = this.edges();
    const ids = [...new Set(edgeIndices || [])].filter(i => Number.isInteger(i));
    if (ids.length < 3) return null;
    const picked = ids.map(i => allEdges[i]);
    if (picked.some(edge => !edge || edge.loose || realFaces(this, edge).length !== 2)) return null;

    const adjacency = new Map();
    const edgeIndexByKey = new Map();
    for (const id of ids) {
      const edge = allEdges[id];
      const key = this.edgeKey(edge.a, edge.b);
      edgeIndexByKey.set(key, id);
      if (!adjacency.has(edge.a)) adjacency.set(edge.a, []);
      if (!adjacency.has(edge.b)) adjacency.set(edge.b, []);
      adjacency.get(edge.a).push(edge.b);
      adjacency.get(edge.b).push(edge.a);
    }
    if (adjacency.size < 3 || [...adjacency.values()].some(list => list.length !== 2)) return null;

    const start = adjacency.keys().next().value;
    const ordered = [start];
    let previous = null, current = start;
    for (let guard = 0; guard <= adjacency.size; guard++) {
      const next = (adjacency.get(current) || []).find(v => v !== previous);
      if (next === undefined) return null;
      if (next === start) break;
      if (ordered.includes(next)) return null;
      ordered.push(next);
      previous = current;
      current = next;
    }
    if (ordered.length !== adjacency.size) return null;

    const selectedKeys = new Set(ids.map(id => {
      const edge = allEdges[id];
      return this.edgeKey(edge.a, edge.b);
    }));

    const railPairs = new Map();
    for (const vertex of ordered) {
      const neighbours = [];
      for (const edge of allEdges) {
        if (selectedKeys.has(this.edgeKey(edge.a, edge.b))) continue;
        if (edge.a === vertex) neighbours.push(edge.b);
        else if (edge.b === vertex) neighbours.push(edge.a);
      }
      const unique = [...new Set(neighbours)];
      if (unique.length !== 2) return null;
      railPairs.set(vertex, unique);
    }

    const orientedRails = new Map();
    orientedRails.set(ordered[0], [...railPairs.get(ordered[0])]);
    for (let i = 1; i < ordered.length; i++) {
      const a = ordered[i - 1], b = ordered[i];
      const edge = allEdges[edgeIndexByKey.get(this.edgeKey(a, b))];
      if (!edge) return null;
      const faces = realFaces(this, edge);
      const previousPair = orientedRails.get(a), pair = railPairs.get(b);
      const side0Face = faces.find(fi => this.faces[fi]?.includes(previousPair[0]));
      if (!Number.isInteger(side0Face)) return null;
      const side0 = pair.find(n => this.faces[side0Face]?.includes(n));
      if (!Number.isInteger(side0)) return null;
      const side1 = pair.find(n => n !== side0);
      if (!Number.isInteger(side1)) return null;
      orientedRails.set(b, [side0, side1]);
    }

    const last = ordered[ordered.length - 1], first = ordered[0];
    const closingEdge = allEdges[edgeIndexByKey.get(this.edgeKey(last, first))];
    if (!closingEdge) return null;
    const closingFaces = realFaces(this, closingEdge);
    const lastPair = orientedRails.get(last), firstPair = orientedRails.get(first);
    const closingSide0Face = closingFaces.find(fi => this.faces[fi]?.includes(lastPair[0]));
    if (!Number.isInteger(closingSide0Face) || !this.faces[closingSide0Face]?.includes(firstPair[0])) return null;

    const loopVertices = new Set(ordered);
    const faceSide = new Map();
    for (let fi = 0; fi < this.faces.length; fi++) {
      const face = this.faces[fi];
      if (!Array.isArray(face) || !face.some(v => loopVertices.has(v))) continue;
      let side = null;
      for (const vertex of face) {
        if (!loopVertices.has(vertex)) continue;
        const pair = orientedRails.get(vertex);
        const local = face.includes(pair[0]) ? 0 : face.includes(pair[1]) ? 1 : null;
        if (local === null) continue;
        if (side !== null && side !== local) return null;
        side = local;
      }
      if (side === null) return null;
      faceSide.set(fi, side);
    }

    const edgesInOrder = [];
    for (let i = 0; i < ordered.length; i++) {
      const a = ordered[i], b = ordered[(i + 1) % ordered.length];
      const edgeIndex = edgeIndexByKey.get(this.edgeKey(a, b));
      if (!Number.isInteger(edgeIndex)) return null;
      const edge = allEdges[edgeIndex], faces = realFaces(this, edge);
      const side0Face = faces.find(fi => faceSide.get(fi) === 0);
      if (!Number.isInteger(side0Face)) return null;
      const direction = directedEdge(this.faces[side0Face], a, b);
      if (!direction) return null;
      edgesInOrder.push({ a, b, edgeIndex, side0Face, direction });
    }

    return { edgeIndices: ids, orderedVertices: ordered, orientedRails, faceSide, edgesInOrder };
  };

  EditableMesh.prototype.bevelEdgeLoop = function (edgeIndices, width = 0.2, segments = 1) {
    const info = this.bevelEdgeLoopInfo(edgeIndices);
    if (!info) return null;
    const amount = Math.max(0.02, Math.min(0.45, Number(width) || 0.2));
    const cuts = Math.max(1, Math.min(4, Math.round(Number(segments) || 1)));
    const loopSet = new Set(info.orderedVertices);
    const ringByVertex = new Map();
    const railLengths = info.orderedVertices.flatMap(vertex => {
      const pair = info.orientedRails.get(vertex), point = this.vertices[vertex];
      return pair && point ? [point.distanceTo(this.vertices[pair[0]]), point.distanceTo(this.vertices[pair[1]])] : [];
    });
    const shortestRail = Math.min(...railLengths);
    if (!Number.isFinite(shortestRail) || shortestRail < 1e-6) return null;
    const distance = shortestRail * amount;

    for (const vertex of info.orderedVertices) {
      const point = this.vertices[vertex], pair = info.orientedRails.get(vertex);
      if (!point || !pair) return null;
      const leftLength = point.distanceTo(this.vertices[pair[0]]), rightLength = point.distanceTo(this.vertices[pair[1]]);
      if (leftLength < 1e-6 || rightLength < 1e-6) return null;
      const left = point.clone().lerp(this.vertices[pair[0]], distance / leftLength);
      const right = point.clone().lerp(this.vertices[pair[1]], distance / rightLength);
      const rings = [];
      for (let j = 0; j <= cuts; j++) {
        const t = j / cuts;
        this.vertices.push(left.clone().lerp(right, t));
        rings.push(this.vertices.length - 1);
      }
      ringByVertex.set(vertex, rings);
    }

    for (const [faceIndex, side] of info.faceSide) {
      const replacementRing = side === 0 ? 0 : cuts;
      this.faces[faceIndex] = this.faces[faceIndex].map(vertex => loopSet.has(vertex) ? ringByVertex.get(vertex)[replacementRing] : vertex);
    }

    const bevelFaces = [];
    const bevelFaceStart = this.faces.length;
    for (const edge of info.edgesInOrder) {
      const ringsA = ringByVertex.get(edge.a), ringsB = ringByVertex.get(edge.b);
      for (let j = 0; j < cuts; j++) {
        const face = edge.direction > 0
          ? [ringsB[j], ringsA[j], ringsA[j + 1], ringsB[j + 1]]
          : [ringsA[j], ringsB[j], ringsB[j + 1], ringsA[j + 1]];
        bevelFaces.push(face);
      }
    }
    this.faces.push(...bevelFaces);

    const used = new Set(this.faces.flat());
    if (this.looseEdges instanceof Set) {
      for (const key of this.looseEdges) {
        const [a, b] = String(key).split(':').map(Number);
        if (Number.isInteger(a)) used.add(a);
        if (Number.isInteger(b)) used.add(b);
      }
    }
    if (this.looseVertices instanceof Set) for (const vertex of this.looseVertices) used.add(vertex);

    const indexMap = new Map(), vertices = [];
    this.vertices.forEach((vertex, index) => {
      if (!used.has(index)) return;
      indexMap.set(index, vertices.length);
      vertices.push(vertex.clone());
    });
    this.faces = this.faces.map(face => face.map(index => indexMap.get(index)));

    const nextCreases = new Map();
    for (const [key, value] of this.creases) {
      const [a, b] = String(key).split(':').map(Number);
      const na = indexMap.get(a), nb = indexMap.get(b);
      if (!Number.isInteger(na) || !Number.isInteger(nb) || na === nb) continue;
      nextCreases.set(this.edgeKey(na, nb), value);
    }
    this.creases = nextCreases;
    this.vertices = vertices;
    this.remapLooseTopology?.(indexMap);

    const allEdges = this.edges();
    const edgeIndexByKey = new Map(allEdges.map((edge, index) => [this.edgeKey(edge.a, edge.b), index]));
    const ringEdgeIndices = Array.from({ length: cuts + 1 }, () => []);
    for (let level = 0; level <= cuts; level++) {
      for (let i = 0; i < info.orderedVertices.length; i++) {
        const a = info.orderedVertices[i], b = info.orderedVertices[(i + 1) % info.orderedVertices.length];
        const oldA = ringByVertex.get(a)?.[level], oldB = ringByVertex.get(b)?.[level];
        const newA = indexMap.get(oldA), newB = indexMap.get(oldB);
        if (!Number.isInteger(newA) || !Number.isInteger(newB)) continue;
        const edgeIndex = edgeIndexByKey.get(this.edgeKey(newA, newB));
        if (Number.isInteger(edgeIndex)) ringEdgeIndices[level].push(edgeIndex);
      }
    }

    return {
      faceIndices: Array.from({ length: bevelFaces.length }, (_, i) => bevelFaceStart + i),
      edgeCount: info.edgeIndices.length,
      segments: cuts,
      width: amount,
      distance,
      ringEdgeIndices,
      boundaryEdgeIndices: [...(ringEdgeIndices[0] || []), ...(ringEdgeIndices[ringEdgeIndices.length - 1] || [])]
    };
  };

  EditableMesh.prototype.__bevelTopologyInstalled = true;
}
