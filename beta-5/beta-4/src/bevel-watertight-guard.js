export function installBevelWatertightGuard(EditableMesh) {
  if (EditableMesh.prototype.__bevelWatertightGuardInstalled) return;
  const original = EditableMesh.prototype.generalBevelSelection;
  if (typeof original !== 'function') return;

  const boundaryCount = mesh => mesh.edges().filter(edge => {
    if (!edge || edge.loose) return false;
    const faces = (edge.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));
    return faces.length === 1;
  }).length;

  const restore = (mesh, snapshot) => {
    mesh.vertices = snapshot.vertices.map(v => v.clone());
    mesh.faces = snapshot.faces.map(face => [...face]);
    mesh.creases = new Map(snapshot.creases);
    if (snapshot.looseEdges instanceof Set) mesh.looseEdges = new Set(snapshot.looseEdges);
    if (snapshot.looseVertices instanceof Set) mesh.looseVertices = new Set(snapshot.looseVertices);
    mesh.edges();
  };

  EditableMesh.prototype.generalBevelSelection = function(edgeIndices, width, segments) {
    const before = this.clone();
    const startedClosed = boundaryCount(this) === 0;
    this.__lastBevelError = null;
    const result = original.call(this, edgeIndices, width, segments);
    if (!result) return null;
    if (startedClosed && boundaryCount(this) > 0) {
      restore(this, before);
      this.__lastBevelError = 'Bevel cancelled • operation would open the mesh';
      return null;
    }
    return result;
  };

  EditableMesh.prototype.__bevelWatertightGuardInstalled = true;
}
