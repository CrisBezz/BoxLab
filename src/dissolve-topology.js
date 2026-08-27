export function installDissolveTopology(EditableMesh) {
  if (EditableMesh.prototype.__dissolveTopologyInstalled) return;

  function edgeOccurrence(face, a, b) {
    for (let i = 0; i < face.length; i++) {
      const x = face[i], y = face[(i + 1) % face.length];
      if (x === a && y === b) return { index: i, forward: true };
      if (x === b && y === a) return { index: i, forward: false };
    }
    return null;
  }

  function pathForward(face, startVertex, endVertex) {
    const start = face.indexOf(startVertex);
    if (start < 0) return null;
    const out = [];
    let i = start;
    for (let guard = 0; guard <= face.length; guard++) {
      out.push(face[i]);
      if (face[i] === endVertex && out.length > 1) return out;
      i = (i + 1) % face.length;
    }
    return null;
  }

  function orderedClosedLoop(mesh, edgeIndices) {
    const ids = [...new Set(edgeIndices || [])];
    if (ids.length < 3) return null;
    const edges = mesh.edges();
    const adjacency = new Map();
    for (const index of ids) {
      const edge = edges[index];
      if (!edge || edge.loose) return null;
      if (!adjacency.has(edge.a)) adjacency.set(edge.a, []);
      if (!adjacency.has(edge.b)) adjacency.set(edge.b, []);
      adjacency.get(edge.a).push(index);
      adjacency.get(edge.b).push(index);
    }
    if (adjacency.size !== ids.length || [...adjacency.values()].some(list => list.length !== 2)) return null;
    const startVertex = adjacency.keys().next().value;
    const edgeOrder = [];
    const vertexOrder = [startVertex];
    const visited = new Set();
    let vertex = startVertex, previousEdge = null;
    for (let guard = 0; guard < ids.length; guard++) {
      const nextEdge = adjacency.get(vertex).find(index => index !== previousEdge && !visited.has(index));
      if (nextEdge === undefined) return null;
      const edge = edges[nextEdge];
      visited.add(nextEdge);
      edgeOrder.push(nextEdge);
      vertex = edge.a === vertex ? edge.b : edge.a;
      if (vertex !== startVertex) vertexOrder.push(vertex);
      previousEdge = nextEdge;
    }
    if (visited.size !== ids.length || vertex !== startVertex || vertexOrder.length !== ids.length) return null;
    return { edgeOrder, vertexOrder };
  }

  EditableMesh.prototype.dissolveEdgeInfo = function (edgeIndex) {
    const edge = this.edges()[edgeIndex];
    if (!edge) return null;
    const realFaces = (edge.faces || []).filter(fi => Number.isInteger(fi) && this.faces[fi]);
    if (realFaces.length !== 2) return null;
    const [f0, f1] = realFaces;
    const face0 = this.faces[f0], face1 = this.faces[f1];
    if (!face0 || !face1 || face0.length < 3 || face1.length < 3) return null;

    let a = edge.a, b = edge.b;
    const occ0 = edgeOccurrence(face0, a, b);
    const occ1 = edgeOccurrence(face1, a, b);
    if (!occ0 || !occ1) return null;

    if (!occ0.forward) [a, b] = [b, a];
    const path0 = pathForward(face0, b, a);
    if (!path0 || path0.length < 3) return null;

    let neighbour = [...face1];
    const neighbourOcc = edgeOccurrence(neighbour, b, a);
    if (!neighbourOcc?.forward) neighbour.reverse();
    const path1 = pathForward(neighbour, a, b);
    if (!path1 || path1.length < 3) return null;

    const merged = [...path0, ...path1.slice(1, -1)];
    if (merged.length < 3 || new Set(merged).size !== merged.length) return null;

    return { edgeIndex, edgeKey: this.edgeKey(edge.a, edge.b), faceIndices: [f0, f1], merged };
  };

  EditableMesh.prototype.dissolveEdge = function (edgeIndex) {
    const info = this.dissolveEdgeInfo(edgeIndex);
    if (!info) return null;
    const [f0, f1] = info.faceIndices;
    const keep = Math.min(f0, f1), remove = Math.max(f0, f1);
    this.faces[keep] = [...info.merged];
    this.faces.splice(remove, 1);
    this.creases.delete(info.edgeKey);
    this.looseEdges?.delete?.(info.edgeKey);
    this.edges();
    return { faceIndex: keep, face: [...info.merged], dissolvedEdgeKey: info.edgeKey };
  };

  EditableMesh.prototype.dissolveLoopInfo = function (edgeIndices) {
    const loop = orderedClosedLoop(this, edgeIndices);
    if (!loop) return null;
    const loopVertices = new Set(loop.vertexOrder);
    const faceUse = new Map();
    const replacements = [];
    const selectedKeys = new Set();

    for (const edgeIndex of loop.edgeOrder) {
      const edge = this.edges()[edgeIndex];
      const info = this.dissolveEdgeInfo(edgeIndex);
      if (!edge || !info) return null;
      if (info.faceIndices.some(fi => this.faces[fi]?.length !== 4)) return null;
      for (const fi of info.faceIndices) faceUse.set(fi, (faceUse.get(fi) || 0) + 1);
      selectedKeys.add(this.edgeKey(edge.a, edge.b));

      const quad = info.merged.filter(vertex => vertex !== edge.a && vertex !== edge.b);
      if (quad.length !== 4 || new Set(quad).size !== 4 || quad.some(vertex => loopVertices.has(vertex))) return null;
      replacements.push({ face: quad });
    }

    if (faceUse.size !== loop.edgeOrder.length * 2 || [...faceUse.values()].some(count => count !== 1)) return null;

    const removedFaces = new Set(faceUse.keys());
    for (const vertex of loopVertices) {
      for (let fi = 0; fi < this.faces.length; fi++) {
        if (this.faces[fi]?.includes(vertex) && !removedFaces.has(fi)) return null;
      }
    }

    const replacementKeys = new Set();
    for (const { face } of replacements) {
      const key = [...face].sort((a, b) => a - b).join(':');
      if (replacementKeys.has(key)) return null;
      replacementKeys.add(key);
    }

    return {
      edgeIndices: [...loop.edgeOrder],
      vertexIndices: [...loop.vertexOrder],
      faceIndices: [...faceUse.keys()],
      replacements: replacements.map(item => [...item.face]),
      selectedKeys
    };
  };

  EditableMesh.prototype.dissolveLoop = function (edgeIndices) {
    const info = this.dissolveLoopInfo(edgeIndices);
    if (!info) return null;

    const removedFaces = new Set(info.faceIndices);
    const keptFaces = this.faces.filter((_, index) => !removedFaces.has(index)).map(face => [...face]);
    keptFaces.push(...info.replacements.map(face => [...face]));
    this.faces = keptFaces;

    const removedVertices = new Set(info.vertexIndices);
    const indexMap = new Map();
    const vertices = [];
    this.vertices.forEach((vertex, oldIndex) => {
      if (removedVertices.has(oldIndex)) return;
      indexMap.set(oldIndex, vertices.length);
      vertices.push(vertex.clone());
    });
    this.vertices = vertices;
    this.faces = this.faces.map(face => face.map(index => indexMap.get(index)));

    const creases = new Map();
    for (const [key, value] of this.creases) {
      const [a, b] = key.split(':').map(Number);
      if (!indexMap.has(a) || !indexMap.has(b) || info.selectedKeys.has(key)) continue;
      creases.set(this.edgeKey(indexMap.get(a), indexMap.get(b)), value);
    }
    this.creases = creases;
    this.remapLooseTopology?.(indexMap);
    this.edges();

    return {
      removedEdges: info.edgeIndices.length,
      removedVertices: info.vertexIndices.length,
      faceCount: this.faces.length
    };
  };

  EditableMesh.prototype.__dissolveTopologyInstalled = true;
}
