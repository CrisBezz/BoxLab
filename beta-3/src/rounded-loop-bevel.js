export function installRoundedLoopBevel(EditableMesh) {
  if (EditableMesh.prototype.__roundedLoopBevelInstalled) return;
  const fallback = EditableMesh.prototype.bevelEdgeLoop;
  const quadraticPoint = (start, control, end, t) => {
    const u = 1 - t;
    return start.clone().multiplyScalar(u * u)
      .add(control.clone().multiplyScalar(2 * u * t))
      .add(end.clone().multiplyScalar(t * t));
  };

  EditableMesh.prototype.bevelEdgeLoop = function(edgeIndices, width = 0.2, segments = 1) {
    const cuts = Math.max(1, Math.min(4, Math.round(Number(segments) || 1)));
    if (cuts === 1) return fallback?.call(this, edgeIndices, width, 1) || null;
    const info = this.bevelEdgeLoopInfo?.(edgeIndices);
    if (!info) return null;
    const amount = Math.max(0.02, Math.min(0.49, Number(width) || 0.2));
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
        this.vertices.push(j === 0 ? left.clone() : j === cuts ? right.clone() : quadraticPoint(left, point, right, t));
        rings.push(this.vertices.length - 1);
      }
      ringByVertex.set(vertex, rings);
    }

    for (const [faceIndex, side] of info.faceSide) {
      const replacementRing = side === 0 ? 0 : cuts;
      this.faces[faceIndex] = this.faces[faceIndex].map(vertex => loopSet.has(vertex) ? ringByVertex.get(vertex)[replacementRing] : vertex);
    }

    const bevelFaces = [], bevelFaceStart = this.faces.length;
    for (const edge of info.edgesInOrder) {
      const ringsA = ringByVertex.get(edge.a), ringsB = ringByVertex.get(edge.b);
      for (let j = 0; j < cuts; j++) {
        bevelFaces.push(edge.direction > 0
          ? [ringsB[j], ringsA[j], ringsA[j + 1], ringsB[j + 1]]
          : [ringsA[j], ringsB[j], ringsB[j + 1], ringsA[j + 1]]);
      }
    }
    this.faces.push(...bevelFaces);

    const used = new Set(this.faces.flat());
    if (this.looseEdges instanceof Set) for (const key of this.looseEdges) {
      const [a,b] = String(key).split(':').map(Number); if (Number.isInteger(a)) used.add(a); if (Number.isInteger(b)) used.add(b);
    }
    if (this.looseVertices instanceof Set) for (const vertex of this.looseVertices) used.add(vertex);

    const indexMap = new Map(), vertices = [];
    this.vertices.forEach((vertex, index) => {
      if (!used.has(index)) return;
      indexMap.set(index, vertices.length); vertices.push(vertex.clone());
    });
    this.faces = this.faces.map(face => face.map(index => indexMap.get(index)));

    const nextCreases = new Map();
    for (const [key, value] of this.creases) {
      const [a,b] = String(key).split(':').map(Number), na = indexMap.get(a), nb = indexMap.get(b);
      if (Number.isInteger(na) && Number.isInteger(nb) && na !== nb) nextCreases.set(this.edgeKey(na,nb), value);
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
        const edgeIndex = edgeIndexByKey.get(this.edgeKey(newA,newB));
        if (Number.isInteger(edgeIndex)) ringEdgeIndices[level].push(edgeIndex);
      }
    }

    return {
      faceIndices:Array.from({length:bevelFaces.length},(_,i)=>bevelFaceStart+i), edgeCount:info.edgeIndices.length,
      segments:cuts, width:amount, distance, profile:'rounded', ringEdgeIndices,
      boundaryEdgeIndices:[...(ringEdgeIndices[0] || []), ...(ringEdgeIndices[ringEdgeIndices.length - 1] || [])]
    };
  };

  EditableMesh.prototype.__roundedLoopBevelInstalled = true;
}
