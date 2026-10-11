// One active display result only. Kernels remain supplied by the native owner.
// Direct component edits do not carry a universal revision, so compare exact inputs.
function inputs(mesh, level, axes) {
  const values = [level, !!axes.x, !!axes.y, !!axes.z, mesh.vertices.length];
  for (const v of mesh.vertices) values.push(v.x, v.y, v.z);
  values.push(mesh.faces.length);
  for (const face of mesh.faces) {
    values.push(face.length);
    for (const index of face) values.push(index);
  }
  values.push(mesh.creases.size);
  for (const [key, value] of mesh.creases) values.push(key, value);
  const groups = mesh.faceGroups || [];
  values.push(groups.length);
  for (const group of groups) values.push(group);
  for (const set of [mesh.looseEdges, mesh.looseVertices]) {
    values.push(set?.size || 0);
    if (set) for (const value of set) values.push(value);
  }
  return values;
}

export function createSubdDisplayCache(subdivide, applyMirror) {
  let source = null, previous = null, display = null, hit = false;
  return {
    get hit() { return hit; },
    // Returned mesh is read-only display data. Export callers must clone it.
    get(mesh, level, axes) {
      const next = inputs(mesh, level, axes);
      if (source === mesh && previous?.length === next.length &&
          next.every((value, i) => Object.is(value, previous[i]))) { hit = true; return display; }
      this.clear();
      const result = applyMirror(subdivide(mesh, level), axes);
      source = mesh;
      previous = next;
      display = result;
      return display;
    },
    clear() { source = previous = display = null; hit = false; }
  };
}
