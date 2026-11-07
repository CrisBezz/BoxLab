export function installVertexBevelTopology(EditableMesh) {
  if (EditableMesh.prototype.__vertexBevelTopologyInstalled) return;

  const boundaryCount = mesh => mesh.edges().filter(edge => !edge.loose && (edge.faces || []).filter(Number.isInteger).length === 1).length;

  EditableMesh.prototype.bevelVertex = function(vertexIndex, width = 0.2) {
    if (!Number.isInteger(vertexIndex) || !this.vertices[vertexIndex]) return null;
    const edges = this.edges();
    const incidentEdges = edges.filter(edge => edge.a === vertexIndex || edge.b === vertexIndex);
    if (incidentEdges.length < 3 || incidentEdges.some(edge => edge.loose || (edge.faces || []).filter(Number.isInteger).length !== 2)) return null;
    const neighbours = [...new Set(incidentEdges.map(edge => edge.a === vertexIndex ? edge.b : edge.a))];
    if (neighbours.length !== incidentEdges.length) return null;

    const incidentFaces = this.faces.map((face, index) => ({ face, index })).filter(({ face }) => face?.includes(vertexIndex));
    if (incidentFaces.length !== neighbours.length) return null;
    const neighbourSet = new Set(neighbours), adjacency = new Map(neighbours.map(vertex => [vertex, []]));
    for (const { face, index } of incidentFaces) {
      if (face.filter(vertex => vertex === vertexIndex).length !== 1) return null;
      const at = face.indexOf(vertexIndex), previous = face[(at - 1 + face.length) % face.length], next = face[(at + 1) % face.length];
      if (!neighbourSet.has(previous) || !neighbourSet.has(next) || previous === next) return null;
      adjacency.get(previous).push(next); adjacency.get(next).push(previous);
      if (!Number.isInteger(index)) return null;
    }
    if ([...adjacency.values()].some(linked => linked.length !== 2)) return null;

    const ordered = [neighbours[0]];
    let previous = null, current = neighbours[0];
    for (let guard = 0; guard <= neighbours.length; guard++) {
      const next = adjacency.get(current).find(vertex => vertex !== previous);
      if (next === ordered[0]) break;
      if (!Number.isInteger(next) || ordered.includes(next)) return null;
      ordered.push(next); previous = current; current = next;
    }
    if (ordered.length !== neighbours.length) return null;

    const amount = Math.max(0.02, Math.min(0.49, Number(width) || 0.2));
    const source = this.vertices[vertexIndex], railLengths = neighbours.map(vertex => source.distanceTo(this.vertices[vertex]));
    const shortestRail = Math.min(...railLengths);
    if (!Number.isFinite(shortestRail) || shortestRail < 1e-6) return null;
    const distance = shortestRail * amount;
    const before = this.clone(), beforeLooseEdges = this.looseEdges instanceof Set ? new Set(this.looseEdges) : null, beforeLooseVertices = this.looseVertices instanceof Set ? new Set(this.looseVertices) : null, startedBoundaryCount = boundaryCount(this);
    const cutPoints = new Map();
    for (const neighbour of neighbours) {
      const rail = source.distanceTo(this.vertices[neighbour]);
      this.vertices.push(source.clone().lerp(this.vertices[neighbour], distance / rail));
      cutPoints.set(neighbour, this.vertices.length - 1);
    }

    const originalFaces = before.faces;
    this.faces = originalFaces.map(face => {
      const at = face.indexOf(vertexIndex);
      if (at < 0) return [...face];
      const previous = face[(at - 1 + face.length) % face.length], next = face[(at + 1) % face.length], out = [];
      for (const vertex of face) vertex === vertexIndex ? out.push(cutPoints.get(previous), cutPoints.get(next)) : out.push(vertex);
      return out;
    });

    const faceNormal = face => {
      const normal = source.clone().set(0, 0, 0);
      for (let i = 0; i < face.length; i++) {
        const a = this.vertices[face[i]], b = this.vertices[face[(i + 1) % face.length]];
        normal.x += (a.y - b.y) * (a.z + b.z); normal.y += (a.z - b.z) * (a.x + b.x); normal.z += (a.x - b.x) * (a.y + b.y);
      }
      return normal.normalize();
    };
    const outward = incidentFaces.reduce((sum, { index }) => sum.add(before.faceNormal(index)), source.clone().set(0, 0, 0)).normalize();
    const cap = ordered.map(vertex => cutPoints.get(vertex));
    if (faceNormal(cap).dot(outward) < 0) cap.reverse();
    const capFaceIndex = this.faces.length;
    this.faces.push(cap);

    this.creases = new Map(before.creases);
    for (const neighbour of neighbours) {
      const oldKey = this.edgeKey(vertexIndex, neighbour), strength = before.creases.get(oldKey) || 0;
      this.creases.delete(oldKey);
      if (strength > 0) this.creases.set(this.edgeKey(neighbour, cutPoints.get(neighbour)), strength);
    }

    const used = new Set(this.faces.flat());
    if (this.looseEdges instanceof Set) for (const key of this.looseEdges) String(key).split(':').map(Number).forEach(vertex => used.add(vertex));
    if (this.looseVertices instanceof Set) this.looseVertices.forEach(vertex => used.add(vertex));
    const indexMap = new Map(), vertices = [];
    this.vertices.forEach((point, index) => { if (used.has(index)) { indexMap.set(index, vertices.length); vertices.push(point.clone()); } });
    this.faces = this.faces.map(face => face.map(index => indexMap.get(index)));
    const creases = new Map();
    for (const [key, strength] of this.creases) {
      const [a, b] = String(key).split(':').map(Number), na = indexMap.get(a), nb = indexMap.get(b);
      if (Number.isInteger(na) && Number.isInteger(nb) && na !== nb) creases.set(this.edgeKey(na, nb), strength);
    }
    this.vertices = vertices; this.creases = creases; this.remapLooseTopology?.(indexMap);
    if (boundaryCount(this) !== startedBoundaryCount) {
      this.vertices = before.vertices.map(vertex => vertex.clone()); this.faces = before.faces.map(face => [...face]); this.creases = new Map(before.creases);
      if (beforeLooseEdges) this.looseEdges = new Set(beforeLooseEdges);
      if (beforeLooseVertices) this.looseVertices = new Set(beforeLooseVertices);
      this.edges();
      return null;
    }
    return { capFaceIndex, distance, width:amount, vertexCount:neighbours.length };
  };

  EditableMesh.prototype.__vertexBevelTopologyInstalled = true;
}
