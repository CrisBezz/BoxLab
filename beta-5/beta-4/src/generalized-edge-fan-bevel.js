export function installGeneralizedEdgeFanBevel(EditableMesh) {
  if (EditableMesh.prototype.__generalizedEdgeFanBevelInstalled) return;

  const realFaces = (mesh, edge) => (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));
  const sideInfo = (mesh, faceIndex, a, b) => {
    const face = mesh.faces[faceIndex];
    if (!Array.isArray(face) || face.length < 3) return null;
    const ia = face.indexOf(a), ib = face.indexOf(b), n = face.length;
    if (ia < 0 || ib < 0) return null;
    if (face[(ia + 1) % n] === b) return { faceIndex, direction:1, otherA:face[(ia - 1 + n) % n], otherB:face[(ib + 1) % n] };
    if (face[(ib + 1) % n] === a) return { faceIndex, direction:-1, otherA:face[(ia + 1) % n], otherB:face[(ib - 1 + n) % n] };
    return null;
  };
  const quadraticPoint = (start, control, end, t) => {
    const u = 1 - t;
    return start.clone().multiplyScalar(u * u)
      .add(control.clone().multiplyScalar(2 * u * t))
      .add(end.clone().multiplyScalar(t * t));
  };
  const insertOnEdge = (face, u, v, inserted) => {
    const out = []; let found = false;
    for (let i = 0; i < face.length; i++) {
      const a = face[i], b = face[(i + 1) % face.length];
      out.push(a);
      if ((a === u && b === v) || (a === v && b === u)) { out.push(inserted); found = true; }
    }
    return found ? out : [...face];
  };

  EditableMesh.prototype.generalizedEdgeFanBevelInfo = function(edgeIndices) {
    const ids = [...new Set(edgeIndices || [])].filter(Number.isInteger);
    if (ids.length !== 1) return null;
    const edges = this.edges(), edgeIndex = ids[0], edge = edges[edgeIndex];
    if (!edge || edge.loose) return null;
    const faces = realFaces(this, edge);
    if (faces.length !== 2) return null;
    const a = edge.a, b = edge.b;
    const sides = faces.map(fi => sideInfo(this, fi, a, b));
    if (sides.some(side => !side) || sides[0].direction === sides[1].direction) return null;

    const endpointInfo = new Map();
    for (const v of [a,b]) {
      const incident = edges.filter(e => e && !e.loose && (e.a === v || e.b === v) && realFaces(this,e).length === 2);
      if (incident.length < 3) return null;
      endpointInfo.set(v, incident);
    }
    return { mode:'single-fan', ids, edgeIndex, edge, a, b, sides, endpointInfo };
  };

  EditableMesh.prototype.generalizedEdgeFanBevel = function(edgeIndices, width = 0.2, segments = 1) {
    const info = this.generalizedEdgeFanBevelInfo(edgeIndices);
    if (!info) return null;
    const amount = Math.max(0.02, Math.min(0.49, Number(width) || 0.2));
    const cuts = Math.max(1, Math.min(4, Math.round(Number(segments) || 1)));
    const originalVertices = this.vertices.map(v => v.clone());
    const originalFaces = this.faces.map(face => [...face]);
    const originalCreases = new Map(this.creases);
    const allEdges = this.edges();
    const {a,b,sides} = info;

    const endpointRails = new Map();
    let shortest = Infinity;
    for (const [v, incident] of info.endpointInfo) {
      const rails = incident.filter(e => this.edgeKey(e.a,e.b) !== this.edgeKey(a,b));
      if (rails.length < 2) return null;
      endpointRails.set(v, rails);
      for (const e of rails) {
        const other = e.a === v ? e.b : e.a;
        const len = originalVertices[v].distanceTo(originalVertices[other]);
        shortest = Math.min(shortest, len);
      }
    }
    if (!Number.isFinite(shortest) || shortest < 1e-6) return null;
    const distance = shortest * amount;

    const splitMap = new Map();
    const splitPoint = (v, other) => {
      const key = `${v}:${other}`;
      if (splitMap.has(key)) return splitMap.get(key);
      const len = originalVertices[v].distanceTo(originalVertices[other]);
      if (!Number.isFinite(len) || len < distance - 1e-7) return null;
      const p = originalVertices[v].clone().lerp(originalVertices[other], distance / len);
      this.vertices.push(p);
      const index = this.vertices.length - 1;
      splitMap.set(key,index);
      return index;
    };

    const boundary = sides.map(side => {
      const ai = splitPoint(a,side.otherA), bi = splitPoint(b,side.otherB);
      return Number.isInteger(ai) && Number.isInteger(bi) ? {...side,ai,bi} : null;
    });
    if (boundary.some(x => !x)) return null;

    const aRings=[boundary[0].ai], bRings=[boundary[0].bi];
    for (let level=1; level<cuts; level++) {
      const t=level/cuts;
      this.vertices.push(quadraticPoint(this.vertices[boundary[0].ai],originalVertices[a],this.vertices[boundary[1].ai],t));
      aRings.push(this.vertices.length-1);
      this.vertices.push(quadraticPoint(this.vertices[boundary[0].bi],originalVertices[b],this.vertices[boundary[1].bi],t));
      bRings.push(this.vertices.length-1);
    }
    aRings.push(boundary[1].ai); bRings.push(boundary[1].bi);

    const sideFaceSet = new Set(info.edge.faces);
    const endpointReplacement = new Map();
    endpointReplacement.set(a,new Map()); endpointReplacement.set(b,new Map());

    for (const v of [a,b]) {
      const rails = endpointRails.get(v) || [];
      for (const rail of rails) {
        const other = rail.a===v?rail.b:rail.a;
        const p = splitPoint(v,other);
        if (!Number.isInteger(p)) return null;
        for (const fi of realFaces({faces:originalFaces},rail)) {
          if (sideFaceSet.has(fi)) continue;
          if (!endpointReplacement.get(v).has(fi)) endpointReplacement.get(v).set(fi,[]);
          endpointReplacement.get(v).get(fi).push({other,p});
        }
      }
    }

    const replaceSelectedInSide = (face, side, va, vb) => {
      const out=[...face], ia=out.indexOf(a), ib=out.indexOf(b), n=out.length;
      if (ia<0||ib<0) return null;
      if (out[(ia+1)%n]!==b && out[(ib+1)%n]!==a) return null;
      out[ia]=va; out[ib]=vb;
      return out;
    };

    const rebuilt=[];
    for (let fi=0; fi<originalFaces.length; fi++) {
      let face=[...originalFaces[fi]];
      const sideIndex=sides.findIndex(s=>s.faceIndex===fi);
      if (sideIndex>=0) {
        face=replaceSelectedInSide(face,sides[sideIndex],boundary[sideIndex].ai,boundary[sideIndex].bi);
        if (!face) return null;
      } else {
        for (const v of [a,b]) {
          if (!face.includes(v)) continue;
          const specs=endpointReplacement.get(v).get(fi)||[];
          for (const spec of specs) face=insertOnEdge(face,v,spec.other,spec.p);
          face=face.filter(x=>x!==v);
        }
      }
      const clean=face.filter((v,i)=>i===0||v!==face[i-1]);
      if (clean.length>2&&clean[0]===clean[clean.length-1]) clean.pop();
      if (new Set(clean).size<3) return null;
      rebuilt.push(clean);
    }
    this.faces=rebuilt;

    const faceNormal = fi => {
      const face=originalFaces[fi];
      if (!face||face.length<3) return null;
      const p0=originalVertices[face[0]], p1=originalVertices[face[1]], p2=originalVertices[face[2]];
      const n=p1.clone().sub(p0).cross(p2.clone().sub(p0));
      return n.lengthSq()>1e-12?n.normalize():null;
    };

    const endpointProfiles = new Map([[a,[...aRings]],[b,[...bRings]]]);
    for (const v of [a,b]) {
      const points=new Set(endpointProfiles.get(v));
      for (const rail of endpointRails.get(v)||[]) {
        const other=rail.a===v?rail.b:rail.a;
        const p=splitMap.get(`${v}:${other}`);
        if (Number.isInteger(p)) points.add(p);
      }
      const list=[...points];
      if (list.length<3) return null;
      const incidentFaces=[...new Set((info.endpointInfo.get(v)||[]).flatMap(e=>realFaces({faces:originalFaces},e)))];
      const avgN=originalVertices[v].clone().set(0,0,0);
      for (const fi of incidentFaces){const n=faceNormal(fi);if(n)avgN.add(n);}
      if (avgN.lengthSq()<1e-12) return null;
      avgN.normalize();
      const center=originalVertices[v].clone().set(0,0,0);
      for (const pi of list) center.add(this.vertices[pi]);
      center.multiplyScalar(1/list.length);
      let axisX=this.vertices[list[0]].clone().sub(center);
      if (axisX.lengthSq()<1e-12) return null;
      axisX.normalize();
      const axisY=avgN.clone().cross(axisX).normalize();
      const ordered=[...list].sort((ia,ib)=>{
        const pa=this.vertices[ia].clone().sub(center), pb=this.vertices[ib].clone().sub(center);
        return Math.atan2(pa.dot(axisY),pa.dot(axisX))-Math.atan2(pb.dot(axisY),pb.dot(axisX));
      });
      if (ordered.length>=3) {
        const n=this.vertices[ordered[1]].clone().sub(this.vertices[ordered[0]])
          .cross(this.vertices[ordered[2]].clone().sub(this.vertices[ordered[0]]));
        if (n.dot(avgN)<0) ordered.reverse();
      }
      if (cuts===1) this.faces.push(ordered);
      else {
        this.vertices.push(center); const ci=this.vertices.length-1;
        for (let i=0;i<ordered.length;i++) this.faces.push([ordered[i],ordered[(i+1)%ordered.length],ci]);
      }
    }

    const bevelFaceStart=this.faces.length;
    for (let level=0; level<cuts; level++) {
      const face=boundary[0].direction>0
        ? [bRings[level],aRings[level],aRings[level+1],bRings[level+1]]
        : [aRings[level],bRings[level],bRings[level+1],aRings[level+1]];
      if (new Set(face).size<3) return null;
      this.faces.push(face);
    }

    const nextCreases=new Map();
    for (const [key,strength] of originalCreases) {
      const [u,v]=String(key).split(':').map(Number);
      if (!Number.isInteger(u)||!Number.isInteger(v)||this.edgeKey(u,v)===this.edgeKey(a,b)) continue;
      const nu=splitMap.get(`${u}:${v}`)??u, nv=splitMap.get(`${v}:${u}`)??v;
      if (nu!==nv) nextCreases.set(this.edgeKey(nu,nv),strength);
    }
    this.creases=nextCreases;

    const used=new Set(this.faces.flat());
    if (this.looseEdges instanceof Set) for (const key of this.looseEdges){const [u,v]=String(key).split(':').map(Number);if(Number.isInteger(u))used.add(u);if(Number.isInteger(v))used.add(v);}
    if (this.looseVertices instanceof Set) for (const v of this.looseVertices) used.add(v);
    const indexMap=new Map(), compact=[];
    this.vertices.forEach((vertex,index)=>{if(used.has(index)){indexMap.set(index,compact.length);compact.push(vertex.clone());}});
    this.faces=this.faces.map(face=>face.map(index=>indexMap.get(index)));
    const compactCreases=new Map();
    for (const [key,value] of this.creases){const [u,v]=String(key).split(':').map(Number),nu=indexMap.get(u),nv=indexMap.get(v);if(Number.isInteger(nu)&&Number.isInteger(nv)&&nu!==nv)compactCreases.set(this.edgeKey(nu,nv),value);}
    this.creases=compactCreases; this.vertices=compact; this.remapLooseTopology?.(indexMap);

    const mappedA=aRings.map(v=>indexMap.get(v)), mappedB=bRings.map(v=>indexMap.get(v));
    const finalEdges=this.edges(), edgeIndexByKey=new Map(finalEdges.map((e,i)=>[this.edgeKey(e.a,e.b),i]));
    const ringEdgeIndices=[];
    for (let level=0;level<=cuts;level++){
      const idx=edgeIndexByKey.get(this.edgeKey(mappedA[level],mappedB[level]));
      if(Number.isInteger(idx)) ringEdgeIndices.push([idx]);
    }
    return {selectionMode:'single-fan',sourceEdgeIndex:info.edgeIndex,segments:cuts,width:amount,distance,profile:cuts===1?'chamfer':'rounded',ringEdgeIndices,boundaryEdgeIndices:[ringEdgeIndices[0]?.[0],ringEdgeIndices[ringEdgeIndices.length-1]?.[0]].filter(Number.isInteger),faceIndices:Array.from({length:cuts},(_,i)=>bevelFaceStart+i)};
  };

  EditableMesh.prototype.__generalizedEdgeFanBevelInstalled=true;
}
