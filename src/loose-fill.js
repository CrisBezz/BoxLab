export function installLooseFill(EditableMesh) {
  if (EditableMesh.prototype.__looseFillInstalled) return;

  EditableMesh.prototype.edgeLoopFromIndices = function (edgeIndices, options = {}) {
    const ids = [...new Set(edgeIndices || [])];
    const min = options.min ?? 3;
    const max = options.max ?? 4;
    if (ids.length < min || ids.length > max) return null;

    const allEdges = this.edges();
    const picked = ids.map(index => allEdges[index]);
    if (picked.some(edge => !edge)) return null;

    const incidence = picked.map(edge => edge.faces?.length ?? 0);
    const allBoundary = incidence.every(count => count === 1);
    const allLoose = incidence.every(count => count === 0);
    if (!allBoundary && !allLoose) return null;

    const adjacency = new Map();
    for (const edge of picked) {
      if (!adjacency.has(edge.a)) adjacency.set(edge.a, []);
      if (!adjacency.has(edge.b)) adjacency.set(edge.b, []);
      adjacency.get(edge.a).push(edge.b);
      adjacency.get(edge.b).push(edge.a);
    }
    if (adjacency.size !== ids.length || [...adjacency.values()].some(neighbours => neighbours.length !== 2)) return null;

    const start = adjacency.keys().next().value;
    const cycle = [start];
    let previous = null;
    let current = start;
    for (let step = 0; step < ids.length; step++) {
      const next = adjacency.get(current).find(vertex => vertex !== previous);
      if (next === undefined) return null;
      if (next === start) {
        if (cycle.length !== ids.length) return null;
        break;
      }
      if (cycle.includes(next)) return null;
      cycle.push(next);
      previous = current;
      current = next;
    }
    if (cycle.length !== ids.length) return null;

    if (allBoundary) {
      const a = cycle[0], b = cycle[1];
      const seed = picked.find(edge => (edge.a === a && edge.b === b) || (edge.a === b && edge.b === a));
      const neighbour = seed ? this.faces[seed.faces[0]] : null;
      if (!neighbour) return null;
      let neighbourForward = false;
      for (let i = 0; i < neighbour.length; i++) {
        if (neighbour[i] === a && neighbour[(i + 1) % neighbour.length] === b) {
          neighbourForward = true;
          break;
        }
      }
      if (neighbourForward) cycle.reverse();
    }

    return { vertices: cycle, loose: allLoose, edgeIndices: ids };
  };

  EditableMesh.prototype.fillEdgeLoop = function (edgeIndices, options = {}) {
    this.ensureLooseTopology?.();
    const loop = this.edgeLoopFromIndices(edgeIndices, options);
    if (!loop) return null;

    const faceIndex = this.faces.length;
    this.faces.push([...loop.vertices]);

    if (loop.loose && this.looseEdges instanceof Set) {
      for (let i = 0; i < loop.vertices.length; i++) {
        const a = loop.vertices[i], b = loop.vertices[(i + 1) % loop.vertices.length];
        this.looseEdges.delete(this.edgeKey(a, b));
      }
      if (this.looseVertices instanceof Set) {
        for (const vertex of loop.vertices) this.looseVertices.delete(vertex);
      }
    }

    return { faceIndex, vertices: [...loop.vertices], loose: loop.loose };
  };

  EditableMesh.prototype.__looseFillInstalled = true;
}
