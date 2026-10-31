// One active display result only. Kernels remain supplied by the native owner.
// Direct component edits do not carry a universal revision, so compare exact inputs.
function inputs(mesh, level, axes, cornerUVs = null) {
  const values = [level, !!axes.x, !!axes.y, !!axes.z, mesh.vertices.length, !!cornerUVs];
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
  if (cornerUVs) {
    values.push(cornerUVs.length);
    for (const face of cornerUVs) {
      values.push(face?.length ?? -1);
      if (face) for (const uv of face) {
        values.push(uv?.[0] ?? NaN, uv?.[1] ?? NaN);
      }
    }
  }
  return values;
}

export function createSubdDisplayCache(subdivide, applyMirror, subdivideWithCornerUVs = null) {
  let source = null, previous = null, display = null, cornerUVs = null, hit = false;
  function matches(mesh, next) {
    return source === mesh && previous?.length === next.length &&
      next.every((value, i) => Object.is(value, previous[i]));
  }
  function remember(mesh, next, result, nextCornerUVs = null) {
    source = mesh;
    previous = next;
    display = result;
    cornerUVs = nextCornerUVs;
  }
  return {
    get hit() { return hit; },
    // Returned mesh is read-only display data. Export callers must clone it.
    get(mesh, level, axes) {
      const next = inputs(mesh, level, axes);
      if (matches(mesh, next)) { hit = true; return display; }
      this.clear();
      const result = applyMirror(subdivide(mesh, level), axes);
      remember(mesh, next, result);
      return display;
    },
    // Keep the same display geometry owner while retaining the UV result used
    // by the native textured-surface overlay. UVs participate in invalidation.
    getWithCornerUVs(mesh, level, axes, sourceCornerUVs) {
      if (Object.values(axes || {}).some(Boolean)) return null;
      if (typeof subdivideWithCornerUVs !== 'function') return null;
      const next = inputs(mesh, level, axes, sourceCornerUVs);
      if (matches(mesh, next) && cornerUVs) { hit = true; return {display, cornerUVs}; }
      this.clear();
      const result = subdivideWithCornerUVs(mesh, sourceCornerUVs, level);
      const mirrored = applyMirror(result.mesh, axes);
      remember(mesh, next, mirrored, result.cornerUVs);
      return {display, cornerUVs};
    },
    clear() { source = previous = display = cornerUVs = null; hit = false; }
  };
}
