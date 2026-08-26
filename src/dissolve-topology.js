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

    // Preserve face0 winding. If its shared edge runs b->a, swap labels so
    // the perimeter path always begins at b and walks around to a.
    if (!occ0.forward) [a, b] = [b, a];
    const path0 = pathForward(face0, b, a);
    if (!path0 || path0.length < 3) return null;

    // The neighbouring face should traverse the shared edge in the opposite
    // direction. Reverse its loop when source winding is inconsistent.
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

  EditableMesh.prototype.__dissolveTopologyInstalled = true;
}
