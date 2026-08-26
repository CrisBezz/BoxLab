import * as THREE from 'three';

export function installBridgeTopology(EditableMesh) {
  if (EditableMesh.prototype.__bridgeTopologyInstalled) return;

  const state = globalThis.__boxlabBridgeState ||= { mesh: null, selectedEdges: [], selectedFaces: [], facePickers: new Map(), lastEdge: null, notifyTimer: null };
  const baseEdges = EditableMesh.prototype.edges;
  EditableMesh.prototype.edges = function () {
    state.mesh = this;
    return baseEdges.call(this);
  };

  const geometrySignature = geometry => {
    const attr = geometry?.getAttribute?.('position');
    if (!attr?.array) return null;
    return Array.from(attr.array, value => Math.round(value * 100000)).join(',');
  };

  if (!THREE.Group.prototype.__boxlabBridgeObserverInstalled) {
    const baseAdd = THREE.Group.prototype.add;
    THREE.Group.prototype.add = function (...objects) {
      for (const object of objects) {
        const kind = object?.userData?.kind;
        if (kind === 'body') {
          state.selectedEdges = [];
          state.selectedFaces = [];
          state.facePickers = new Map();
          state.lastEdge = null;
        } else if (kind === 'edge') {
          state.lastEdge = object.userData.index;
        } else if (kind === 'edge-selection-overlay' && Number.isInteger(state.lastEdge)) {
          if (!state.selectedEdges.includes(state.lastEdge)) state.selectedEdges.push(state.lastEdge);
        } else if (kind === 'face') {
          const signature = geometrySignature(object.geometry);
          if (signature) state.facePickers.set(signature, object.userData.index);
        } else if (object?.renderOrder === 5 && !kind) {
          const signature = geometrySignature(object.geometry);
          const index = signature ? state.facePickers.get(signature) : null;
          if (Number.isInteger(index) && !state.selectedFaces.includes(index)) state.selectedFaces.push(index);
        }
      }
      const result = baseAdd.apply(this, objects);
      if (typeof window !== 'undefined') {
        clearTimeout(state.notifyTimer);
        state.notifyTimer = setTimeout(() => window.dispatchEvent(new Event('boxlab-bridge-state')), 0);
      }
      return result;
    };
    THREE.Group.prototype.__boxlabBridgeObserverInstalled = true;
  }

  const realFaceIndices = (mesh, edge) => (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));

  const directedEdge = (face, a, b) => {
    if (!face) return 0;
    for (let i = 0; i < face.length; i++) {
      const x = face[i], y = face[(i + 1) % face.length];
      if (x === a && y === b) return 1;
      if (x === b && y === a) return -1;
    }
    return 0;
  };

  const cycleFromEdges = edges => {
    if (!edges?.length) return null;
    const adjacency = new Map();
    for (const edge of edges) {
      if (!adjacency.has(edge.a)) adjacency.set(edge.a, []);
      if (!adjacency.has(edge.b)) adjacency.set(edge.b, []);
      adjacency.get(edge.a).push(edge.b);
      adjacency.get(edge.b).push(edge.a);
    }
    if (adjacency.size !== edges.length || [...adjacency.values()].some(list => list.length !== 2)) return null;
    const start = Math.min(...adjacency.keys());
    const cycle = [start];
    let previous = null, current = start;
    for (let guard = 0; guard < edges.length; guard++) {
      const neighbours = adjacency.get(current) || [];
      const next = neighbours.find(v => v !== previous);
      if (next === undefined) return null;
      if (next === start) return cycle.length === edges.length ? cycle : null;
      if (cycle.includes(next)) return null;
      cycle.push(next);
      previous = current;
      current = next;
    }
    return null;
  };

  const edgeComponents = edges => {
    const byVertex = new Map();
    edges.forEach((edge, index) => {
      if (!byVertex.has(edge.a)) byVertex.set(edge.a, []);
      if (!byVertex.has(edge.b)) byVertex.set(edge.b, []);
      byVertex.get(edge.a).push(index);
      byVertex.get(edge.b).push(index);
    });
    const seen = new Set(), components = [];
    for (let seed = 0; seed < edges.length; seed++) {
      if (seen.has(seed)) continue;
      const queue = [seed], component = [];
      seen.add(seed);
      while (queue.length) {
        const index = queue.shift(), edge = edges[index];
        component.push(edge);
        for (const vertex of [edge.a, edge.b]) {
          for (const neighbour of byVertex.get(vertex) || []) {
            if (!seen.has(neighbour)) { seen.add(neighbour); queue.push(neighbour); }
          }
        }
      }
      components.push(component);
    }
    return components;
  };

  EditableMesh.prototype.bridgeEdgeSelectionInfo = function (edgeIndices) {
    const ids = [...new Set(edgeIndices || [])];
    if (ids.length < 6) return null;
    const allEdges = this.edges();
    const picked = ids.map(index => allEdges[index]);
    if (picked.some(edge => !edge)) return null;
    if (picked.some(edge => !(edge.loose || realFaceIndices(this, edge).length === 1))) return null;
    const components = edgeComponents(picked);
    if (components.length !== 2) return null;
    const loops = components.map(cycleFromEdges);
    if (loops.some(loop => !loop || loop.length < 3) || loops[0].length !== loops[1].length) return null;
    if (loops[0].some(v => loops[1].includes(v))) return null;
    return { loops, count: loops[0].length };
  };

  EditableMesh.prototype.bridgeFaceSelectionInfo = function (faceIndices) {
    const ids = [...new Set(faceIndices || [])];
    if (ids.length !== 2) return null;
    const faces = ids.map(index => this.faces[index]);
    if (faces.some(face => !face || face.length < 3) || faces[0].length !== faces[1].length) return null;
    if (faces[0].some(v => faces[1].includes(v))) return null;
    return { faceIndices: ids, loops: faces.map(face => [...face]), count: faces[0].length };
  };

  EditableMesh.prototype.bestBridgePlan = function (loopA, loopB) {
    if (!loopA || !loopB || loopA.length !== loopB.length || loopA.length < 3) return null;
    const n = loopA.length;
    let best = null;
    for (const direction of [1, -1]) {
      for (let offset = 0; offset < n; offset++) {
        const mapped = Array.from({ length: n }, (_, i) => loopB[(offset + direction * i + n * 4) % n]);
        let distance = 0;
        for (let i = 0; i < n; i++) distance += this.vertices[loopA[i]].distanceToSquared(this.vertices[mapped[i]]);
        for (const flip of [false, true]) {
          const quads = [];
          for (let i = 0; i < n; i++) {
            const next = (i + 1) % n;
            const quad = flip
              ? [loopA[i], mapped[i], mapped[next], loopA[next]]
              : [loopA[i], loopA[next], mapped[next], mapped[i]];
            if (new Set(quad).size !== 4) { quads.length = 0; break; }
            quads.push(quad);
          }
          if (quads.length !== n) continue;
          let windingPenalty = 0;
          for (const quad of quads) {
            for (let i = 0; i < 4; i++) {
              const a = quad[i], b = quad[(i + 1) % 4];
              for (const face of this.faces) {
                if (directedEdge(face, a, b) === 1) windingPenalty++;
              }
            }
          }
          const score = distance + windingPenalty * 1e9;
          if (!best || score < best.score) best = { score, quads, direction, offset, flip, windingPenalty };
        }
      }
    }
    return best;
  };

  EditableMesh.prototype.bridgeLoops = function (loopA, loopB) {
    const plan = this.bestBridgePlan(loopA, loopB);
    if (!plan) return null;
    const start = this.faces.length;
    this.faces.push(...plan.quads.map(face => [...face]));
    if (this.looseEdges instanceof Set) {
      for (const loop of [loopA, loopB]) {
        for (let i = 0; i < loop.length; i++) this.looseEdges.delete(this.edgeKey(loop[i], loop[(i + 1) % loop.length]));
      }
    }
    this.edges();
    return { faceIndices: Array.from({ length: plan.quads.length }, (_, i) => start + i), plan };
  };

  EditableMesh.prototype.bridgeSelectedEdges = function (edgeIndices) {
    const info = this.bridgeEdgeSelectionInfo(edgeIndices);
    if (!info) return null;
    return this.bridgeLoops(info.loops[0], info.loops[1]);
  };

  EditableMesh.prototype.bridgeSelectedFaces = function (faceIndices) {
    const info = this.bridgeFaceSelectionInfo(faceIndices);
    if (!info) return null;
    const loops = info.loops.map(loop => [...loop]);
    [...info.faceIndices].sort((a, b) => b - a).forEach(index => this.faces.splice(index, 1));
    return this.bridgeLoops(loops[0], loops[1]);
  };

  EditableMesh.prototype.__bridgeTopologyInstalled = true;
}
