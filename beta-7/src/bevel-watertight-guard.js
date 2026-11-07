export function installBevelWatertightGuard(EditableMesh) {
  if (EditableMesh.prototype.__bevelWatertightGuardInstalled) return;
  const original = EditableMesh.prototype.generalBevelSelection;
  if (typeof original !== 'function') return;

  const boundaryCount = mesh => mesh.edges().filter(edge => {
    if (!edge || edge.loose) return false;
    const faces = (edge.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));
    return faces.length === 1;
  }).length;

  // Two incident faces alone do not establish a valid closed shell: both may
  // traverse their shared edge in the same direction after a bad corner cap.
  const consistentWinding = mesh => mesh.edges().every(edge => {
    if (edge.loose) return true;
    if (edge.faces?.length !== 2) return false;
    const direction = fi => {
      const face = mesh.faces[fi];
      return face.some((v, i) => v === edge.a && face[(i + 1) % face.length] === edge.b);
    };
    return direction(edge.faces[0]) !== direction(edge.faces[1]);
  });

  const restore = (mesh, snapshot) => {
    mesh.vertices = snapshot.vertices.map(v => v.clone());
    mesh.faces = snapshot.faces.map(face => [...face]);
    mesh.faceGroups=[...snapshot.faceGroups];
    mesh.creases = new Map(snapshot.creases);
    if (snapshot.looseEdges instanceof Set) mesh.looseEdges = new Set(snapshot.looseEdges);
    if (snapshot.looseVertices instanceof Set) mesh.looseVertices = new Set(snapshot.looseVertices);
    mesh.edges();
  };

  EditableMesh.prototype.generalBevelSelection = function(edgeIndices, width, segments) {
    const before = this.clone();
    const startedClosed = boundaryCount(this) === 0;
    const startedOriented = startedClosed && consistentWinding(this);
    this.__lastBevelError = null;
    let result;
    try{result=original.call(this, edgeIndices, width, segments);}
    catch(error){restore(this,before);this.__lastBevelError='Bevel cancelled • '+(error?.message||'invalid operation');return null;}
    if (!result){restore(this,before);return null;}
    if (startedClosed && (boundaryCount(this) > 0 || this.edges().some(edge=>!edge.loose&&(edge.faces||[]).length>2))) {
      restore(this, before);
      this.__lastBevelError = 'Bevel cancelled • operation would create invalid mesh edges';
      return null;
    }
    if (startedOriented && !consistentWinding(this)) {
      restore(this, before);
      this.__lastBevelError = 'Bevel cancelled • operation would reverse a shared face boundary';
      return null;
    }
    return result;
  };

  EditableMesh.prototype.__bevelWatertightGuardInstalled = true;
}
