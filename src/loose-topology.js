export function installLooseTopology(EditableMesh) {
  if (EditableMesh.prototype.__looseTopologyInstalled) return;

  const baseClone = EditableMesh.prototype.clone;
  const baseEdges = EditableMesh.prototype.edges;
  const baseConnectVertices = EditableMesh.prototype.connectVertices;

  const ensure = mesh => {
    if (!(mesh.looseEdges instanceof Set)) mesh.looseEdges = new Set(mesh.looseEdges || []);
    if (!(mesh.looseVertices instanceof Set)) mesh.looseVertices = new Set(mesh.looseVertices || []);
    return mesh;
  };

  const edgeFromKey = key => {
    const [a, b] = String(key).split(':').map(Number);
    return Number.isInteger(a) && Number.isInteger(b) ? { a, b } : null;
  };

  EditableMesh.prototype.ensureLooseTopology = function () {
    return ensure(this);
  };

  EditableMesh.prototype.clone = function () {
    const out = baseClone.call(this);
    ensure(this);
    out.looseEdges = new Set(this.looseEdges);
    out.looseVertices = new Set(this.looseVertices);
    return out;
  };

  EditableMesh.prototype.faceEdges = function () {
    return baseEdges.call(this);
  };

  EditableMesh.prototype.edges = function () {
    ensure(this);

    // Remove virtual negative-index neighbour faces from earlier edge() calls.
    if (Array.isArray(this.__looseVirtualFaceKeys)) {
      for (const key of this.__looseVirtualFaceKeys) delete this.faces[key];
    }
    this.__looseVirtualFaceKeys = [];

    const faceEdges = baseEdges.call(this);
    const known = new Set(faceEdges.map(edge => this.edgeKey(edge.a, edge.b)));

    // Once a loose edge becomes part of a real face, the face owns it.
    for (const key of [...this.looseEdges]) {
      if (known.has(key)) this.looseEdges.delete(key);
    }

    const usedByFace = new Set(this.faces.flat());
    for (const vertex of [...this.looseVertices]) {
      if (usedByFace.has(vertex)) this.looseVertices.delete(vertex);
    }

    const loose = [];
    let virtualFaceIndex = -1;
    for (const key of this.looseEdges) {
      const edge = edgeFromKey(key);
      if (!edge || !this.vertices[edge.a] || !this.vertices[edge.b] || edge.a === edge.b) continue;

      // The existing Fill Face tool recognises boundary edges by one incident
      // face. Give each loose edge a virtual neighbour at a negative array key.
      // Negative keys do not affect faces.length, iteration, rendering or SubD.
      const neighbourIndex = virtualFaceIndex--;
      this.faces[neighbourIndex] = [edge.b, edge.a];
      this.__looseVirtualFaceKeys.push(String(neighbourIndex));
      loose.push({ ...edge, faces: [neighbourIndex], loose: true });
    }
    return [...faceEdges, ...loose];
  };

  EditableMesh.prototype.addLooseVertex = function (position) {
    ensure(this);
    const v = position?.clone ? position.clone() : position;
    if (!v) return null;
    this.vertices.push(v);
    const index = this.vertices.length - 1;
    this.looseVertices.add(index);
    return index;
  };

  EditableMesh.prototype.addLooseEdge = function (a, b) {
    ensure(this);
    if (!Number.isInteger(a) || !Number.isInteger(b) || a === b || !this.vertices[a] || !this.vertices[b]) return null;
    const key = this.edgeKey(a, b);
    if (this.edges().some(edge => this.edgeKey(edge.a, edge.b) === key)) return null;
    this.looseEdges.add(key);
    const usedByFace = new Set(this.faces.flat());
    if (!usedByFace.has(a)) this.looseVertices.add(a);
    if (!usedByFace.has(b)) this.looseVertices.add(b);
    return key;
  };

  EditableMesh.prototype.removeLooseEdge = function (a, b) {
    ensure(this);
    return this.looseEdges.delete(this.edgeKey(a, b));
  };

  EditableMesh.prototype.connectVertices = function (a, b) {
    ensure(this);
    const result = baseConnectVertices.call(this, a, b);
    if (result?.ok) {
      this.looseEdges.delete(this.edgeKey(a, b));
      return { ...result, loose: false };
    }
    if (result?.reason === 'Vertices already have an edge') return result;
    const edgeKey = this.addLooseEdge(a, b);
    if (!edgeKey) return result || { ok: false, reason: 'Could not create edge' };
    return { ok: true, edgeKey, loose: true };
  };

  EditableMesh.prototype.remapLooseTopology = function (indexMap) {
    ensure(this);
    const mapIndex = oldIndex => indexMap instanceof Map ? indexMap.get(oldIndex) : indexMap?.(oldIndex);
    const nextEdges = new Set();
    for (const key of this.looseEdges) {
      const edge = edgeFromKey(key);
      if (!edge) continue;
      const a = mapIndex(edge.a), b = mapIndex(edge.b);
      if (!Number.isInteger(a) || !Number.isInteger(b) || a === b) continue;
      nextEdges.add(this.edgeKey(a, b));
    }
    const nextVertices = new Set();
    for (const oldIndex of this.looseVertices) {
      const next = mapIndex(oldIndex);
      if (Number.isInteger(next)) nextVertices.add(next);
    }
    this.looseEdges = nextEdges;
    this.looseVertices = nextVertices;
  };

  EditableMesh.prototype.__looseTopologyInstalled = true;
}
