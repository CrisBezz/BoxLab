export function installMultiVertexBevelTopology(EditableMesh) {
  if (EditableMesh.prototype.__multiVertexBevelTopologyInstalled) return;

  const boundaryCount = mesh => mesh.edges().filter(edge => !edge.loose && (edge.faces || []).filter(Number.isInteger).length === 1).length;

  function vertexFanInfo(mesh, vertexIndex, allEdges) {
    if (!Number.isInteger(vertexIndex) || !mesh.vertices[vertexIndex]) return null;
    const incidentEdges = allEdges.filter(edge => edge.a === vertexIndex || edge.b === vertexIndex);
    if (incidentEdges.length < 3 || incidentEdges.some(edge => edge.loose || (edge.faces || []).filter(Number.isInteger).length !== 2)) return null;
    const neighbours = [...new Set(incidentEdges.map(edge => edge.a === vertexIndex ? edge.b : edge.a))];
    if (neighbours.length !== incidentEdges.length) return null;
    const incidentFaces = mesh.faces.map((face,index)=>({face,index})).filter(({face}) => face?.includes(vertexIndex));
    if (incidentFaces.length !== neighbours.length) return null;
    const neighbourSet = new Set(neighbours), adjacency = new Map(neighbours.map(v => [v, []]));
    for (const {face,index} of incidentFaces) {
      if (face.filter(v => v === vertexIndex).length !== 1) return null;
      const at = face.indexOf(vertexIndex), previous = face[(at - 1 + face.length) % face.length], next = face[(at + 1) % face.length];
      if (!neighbourSet.has(previous) || !neighbourSet.has(next) || previous === next) return null;
      adjacency.get(previous).push(next); adjacency.get(next).push(previous);
      if (!Number.isInteger(index)) return null;
    }
    if ([...adjacency.values()].some(linked => linked.length !== 2)) return null;
    const ordered = [neighbours[0]];
    let previous = null, current = neighbours[0];
    for (let guard=0; guard<=neighbours.length; guard++) {
      const next = adjacency.get(current).find(v => v !== previous);
      if (next === ordered[0]) break;
      if (!Number.isInteger(next) || ordered.includes(next)) return null;
      ordered.push(next); previous = current; current = next;
    }
    if (ordered.length !== neighbours.length) return null;
    return { vertexIndex, neighbours, ordered, incidentFaces };
  }

  EditableMesh.prototype.multiVertexBevelInfo = function(vertexIndices) {
    const ids = [...new Set(vertexIndices || [])].filter(Number.isInteger);
    if (!ids.length) return null;
    const edges = this.edges(), fans = ids.map(id => vertexFanInfo(this,id,edges));
    if (fans.some(f => !f)) return null;
    let shortestRail = Infinity;
    for (const fan of fans) {
      const source = this.vertices[fan.vertexIndex];
      for (const neighbour of fan.neighbours) shortestRail = Math.min(shortestRail, source.distanceTo(this.vertices[neighbour]));
    }
    if (!Number.isFinite(shortestRail) || shortestRail < 1e-6) return null;
    return { ids, fans, shortestRail, count:ids.length };
  };

  EditableMesh.prototype.bevelVertices = function(vertexIndices, width = 0.2) {
    const info = this.multiVertexBevelInfo(vertexIndices);
    if (!info) return null;
    if (info.ids.length === 1 && this.bevelVertex) return this.bevelVertex(info.ids[0], width);

    const amount = Math.max(0.02, Math.min(0.49, Number(width) || 0.2));
    const distance = info.shortestRail * amount;
    const before = this.clone(), startedBoundaryCount = boundaryCount(this);
    const beforeLooseEdges = this.looseEdges instanceof Set ? new Set(this.looseEdges) : null;
    const beforeLooseVertices = this.looseVertices instanceof Set ? new Set(this.looseVertices) : null;
    const selected = new Set(info.ids), cutPoints = new Map();
    const cutKey = (v,n) => `${v}>${n}`;

    for (const fan of info.fans) {
      const source = before.vertices[fan.vertexIndex];
      for (const neighbour of fan.neighbours) {
        const rail = source.distanceTo(before.vertices[neighbour]);
        if (!Number.isFinite(rail) || rail <= distance + 1e-8) return null;
        this.vertices.push(source.clone().lerp(before.vertices[neighbour], distance / rail));
        cutPoints.set(cutKey(fan.vertexIndex, neighbour), this.vertices.length - 1);
      }
    }

    this.faces = before.faces.map(face => {
      const out = [];
      for (let i=0;i<face.length;i++) {
        const v = face[i];
        if (!selected.has(v)) { out.push(v); continue; }
        const previous = face[(i - 1 + face.length) % face.length], next = face[(i + 1) % face.length];
        const a = cutPoints.get(cutKey(v,previous)), b = cutPoints.get(cutKey(v,next));
        if (!Number.isInteger(a) || !Number.isInteger(b)) return null;
        out.push(a,b);
      }
      return out;
    });
    if (this.faces.some(face => !Array.isArray(face) || face.length < 3 || new Set(face).size !== face.length)) {
      this.vertices = before.vertices.map(v=>v.clone()); this.faces = before.faces.map(f=>[...f]); this.creases = new Map(before.creases); return null;
    }

    const polygonNormal = face => {
      const normal = before.vertices[info.ids[0]].clone().set(0,0,0);
      for (let i=0;i<face.length;i++) {
        const a=this.vertices[face[i]], b=this.vertices[face[(i+1)%face.length]];
        normal.x += (a.y-b.y)*(a.z+b.z); normal.y += (a.z-b.z)*(a.x+b.x); normal.z += (a.x-b.x)*(a.y+b.y);
      }
      return normal.lengthSq()>1e-12 ? normal.normalize() : normal;
    };

    const capFaceIndices = [];
    for (const fan of info.fans) {
      const source = before.vertices[fan.vertexIndex];
      const outward = fan.incidentFaces.reduce((sum,{index}) => sum.add(before.faceNormal(index)), source.clone().set(0,0,0));
      if (outward.lengthSq()>1e-12) outward.normalize();
      const cap = fan.ordered.map(n => cutPoints.get(cutKey(fan.vertexIndex,n)));
      if (polygonNormal(cap).dot(outward) < 0) cap.reverse();
      capFaceIndices.push(this.faces.length); this.faces.push(cap);
    }

    this.creases = new Map(before.creases);
    for (const edge of before.edges()) {
      const aSelected = selected.has(edge.a), bSelected = selected.has(edge.b);
      if (!aSelected && !bSelected) continue;
      const oldKey = before.edgeKey(edge.a, edge.b), strength = before.creases.get(oldKey) || 0;
      this.creases.delete(oldKey);
      if (strength <= 0) continue;
      const a = aSelected ? cutPoints.get(cutKey(edge.a,edge.b)) : edge.a;
      const b = bSelected ? cutPoints.get(cutKey(edge.b,edge.a)) : edge.b;
      if (Number.isInteger(a) && Number.isInteger(b) && a !== b) this.creases.set(this.edgeKey(a,b), strength);
    }

    const used = new Set(this.faces.flat());
    if (this.looseEdges instanceof Set) for (const key of this.looseEdges) String(key).split(':').map(Number).forEach(v => used.add(v));
    if (this.looseVertices instanceof Set) this.looseVertices.forEach(v => used.add(v));
    const indexMap = new Map(), vertices=[];
    this.vertices.forEach((point,index)=>{ if (used.has(index)) { indexMap.set(index,vertices.length); vertices.push(point.clone()); } });
    this.faces = this.faces.map(face => face.map(index => indexMap.get(index)));
    const creases = new Map();
    for (const [key,strength] of this.creases) {
      const [a,b] = String(key).split(':').map(Number), na=indexMap.get(a), nb=indexMap.get(b);
      if (Number.isInteger(na)&&Number.isInteger(nb)&&na!==nb) creases.set(this.edgeKey(na,nb),strength);
    }
    this.vertices=vertices; this.creases=creases; this.remapLooseTopology?.(indexMap); this.edges();

    if (boundaryCount(this) !== startedBoundaryCount) {
      this.vertices=before.vertices.map(v=>v.clone()); this.faces=before.faces.map(f=>[...f]); this.creases=new Map(before.creases);
      if (beforeLooseEdges) this.looseEdges=new Set(beforeLooseEdges); if (beforeLooseVertices) this.looseVertices=new Set(beforeLooseVertices); this.edges(); return null;
    }
    return { vertexIndices:[...info.ids], count:info.ids.length, distance, width:amount, capFaceIndices };
  };

  EditableMesh.prototype.__multiVertexBevelTopologyInstalled = true;
}
