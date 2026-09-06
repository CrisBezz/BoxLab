// Through v0.36.16.0: geometric prism subtraction. No UI or mesh prototype hooks.
import * as THREE from 'three';
import './topology-foundation.js?v=0.36.16.0';
const V = THREE.Vector3;
const topology = () => globalThis.__boxlabTopology;
const fail = reason => { throw new Error(reason); };
const center = p => p.reduce((s,v)=>s.add(v),new V()).multiplyScalar(1/p.length);
function areaVector(p) { const n=new V(),o=p[0]; for(let i=1;i<p.length-1;i++) n.add(new V().crossVectors(p[i].clone().sub(o),p[i+1].clone().sub(o))); return n.multiplyScalar(.5); }
function clean(p,eps) { const out=[]; for(const v of p) if(!out.length||v.distanceTo(out.at(-1))>eps)out.push(v); if(out.length>1&&out[0].distanceTo(out.at(-1))<=eps)out.pop(); return out.length>=3&&areaVector(out).length()>eps*eps?out:[]; }
function plane(n,p) { return {n:n.clone(),w:n.dot(p)}; }
function split(poly,pl,eps) {
  const d=poly.map(p=>pl.n.dot(p)-pl.w);
  if(d.every(x=>x<=eps))return [poly,[]];
  if(d.every(x=>x>=-eps))return [[],poly];
  const a=[],b=[];
  for(let i=0;i<poly.length;i++) {const j=(i+1)%poly.length,p=poly[i],q=poly[j]; if(d[i]<=eps)a.push(p); if(d[i]>=-eps)b.push(p); if((d[i]>eps&&d[j]<-eps)||(d[i]<-eps&&d[j]>eps)){const x=p.clone().lerp(q,d[i]/(d[i]-d[j]));a.push(x);b.push(x);}}
  return [clean(a,eps),clean(b,eps)];
}
function subtract(poly,planes,eps) {let inside=poly;const outside=[];for(const pl of planes){if(!inside.length)break;const [a,b]=split(inside,pl,eps);if(b.length)outside.push(b);inside=a;}return {outside,inside};}
function triangles(poly,eps) {
  const n=areaVector(poly);if(n.length()<=eps*eps)fail('zero-area-input-face');n.normalize();
  if(poly.some(p=>Math.abs(p.clone().sub(poly[0]).dot(n))>eps*4))fail('nonplanar-input-face');
  const u=poly[1].clone().sub(poly[0]).normalize(),v=new V().crossVectors(n,u),p2=poly.map(p=>{const d=p.clone().sub(poly[0]);return new THREE.Vector2(d.dot(u),d.dot(v));});
  const ts=THREE.ShapeUtils.triangulateShape(p2,[]).map(t=>t.map(i=>poly[i]));
  if(!ts.length||Math.abs(ts.reduce((s,t)=>s+areaVector(t).length(),0)-areaVector(poly).length())>eps*poly.length*10)fail('invalid-face-triangulation');
  return ts;
}
// Winding number is independent of ray direction and triangle edge ownership.
function insideSolid(p,ts) {let sum=0;for(const t of ts){const [a,b,c]=t.map(v=>v.clone().sub(p)),la=a.length(),lb=b.length(),lc=c.length();sum+=2*Math.atan2(a.dot(new V().crossVectors(b,c)),la*lb*lc+a.dot(b)*lc+b.dot(c)*la+c.dot(a)*lb);}return Math.abs(sum)>2*Math.PI;}
function edgeUses(m){const uses=new Map();m.faces.forEach((f,fi)=>f.forEach((a,i)=>{const b=f[(i+1)%f.length],k=topology().edgeKey(a,b);if(!uses.has(k))uses.set(k,[]);uses.get(k).push({a,b,fi});}));return uses;}
export function validateThrough(m,eps=1e-7) {
  const base=topology().validateTopology(m,{allowBoundary:false});if(!base.ok)return {ok:false,reason:'invalid-edge-or-face-topology',details:base};
  for(const [k,owners] of edgeUses(m))if(owners.length!==2||owners[0].a!==owners[1].b)return{ok:false,reason:'inconsistent-edge-winding',edge:k};
  for(const f of m.faces){if(new Set(f).size!==f.length||f.some(id=>!m.vertices[id]||![m.vertices[id].x,m.vertices[id].y,m.vertices[id].z].every(Number.isFinite)))return{ok:false,reason:'invalid-face-vertices'};if(areaVector(f.map(id=>m.vertices[id])).length()<=eps*eps)return{ok:false,reason:'zero-area-face'};}
  // A closed edge manifold can still contain a bow-tie vertex. Its incident
  // face fan must be one connected cycle.
  const uses=edgeUses(m),incident=new Map();
  m.faces.forEach((f,fi)=>f.forEach(v=>{if(!incident.has(v))incident.set(v,new Set());incident.get(v).add(fi);}));
  for(const [v,faces] of incident){const adjacency=new Map([...faces].map(fi=>[fi,[]]));for(const owners of uses.values()){if(owners[0].a!==v&&owners[0].b!==v)continue;const [a,b]=owners;adjacency.get(a.fi).push(b.fi);adjacency.get(b.fi).push(a.fi);}const seen=new Set(),stack=[faces.values().next().value];while(stack.length){const fi=stack.pop();if(seen.has(fi))continue;seen.add(fi);stack.push(...adjacency.get(fi).filter(x=>!seen.has(x)));}if(seen.size!==faces.size)return{ok:false,reason:'nonmanifold-vertex-fan',vertex:v};}
  return {ok:true};
}
function context(m,fi) {
  if(!Number.isInteger(fi)||!m.faces[fi])fail('single-source-face-required');
  const box=new THREE.Box3().setFromPoints(m.vertices),scale=box.getSize(new V()).length(),eps=Math.max(scale*5e-7,1e-10);
  const valid=validateThrough(m,eps);if(!valid.ok)fail('input-'+valid.reason);
  const source=m.faces[fi].map(id=>m.vertices[id]),n=areaVector(source).normalize(),dir=n.clone().negate();
  const ts=m.faces.flatMap((f,index)=>triangles(f.map(id=>m.vertices[id]),eps).map(p=>({p,index})));
  const sides=source.map((a,i)=>plane(new V().crossVectors(source[(i+1)%source.length].clone().sub(a),n).normalize(),a));
  if(source.some(p=>sides.some(pl=>pl.n.dot(p)-pl.w>eps)))fail('concave-source-not-supported');
  const start=plane(n,source[0]);
  const hits=[];
  for(const t of ts){if(t.index===fi)continue;let p=t.p;for(const pl of [...sides,start]){p=split(p,pl,eps)[0];if(!p.length)break;}if(!p.length)continue;
    const depths=p.map(v=>v.clone().sub(source[0]).dot(dir));
    if(areaVector(p).dot(dir)>eps*eps&&Math.max(...depths)>eps)hits.push({min:Math.max(eps,Math.min(...depths)),max:Math.max(...depths)});
  }
  if(!hits.length)fail('no-exit-shell');
  hits.sort((a,b)=>a.min-b.min);const first=hits[0].min,depth=hits[0].max;
  // A stepped/nonparallel exit may require separate depths; reject instead of crossing a second shell.
  if(hits.some(h=>h.min>depth+eps*8))fail('multiple-exit-depths');
  const endDepth=Math.max(...hits.map(h=>h.max));
  return {source,n,dir,sides,start,eps,ts:ts.map(t=>t.p),first,depth:endDepth,fi};
}
export function planThrough(m,fi) {try {const c=context(m,fi);return {ok:true,sourceFaceIndex:fi,distance:-c.depth,firstDistance:-c.first};}catch(e){return{ok:false,reason:e.message};}}
// Split every incident face together before replacing shell fragments. Generated seam
// vertices are then inserted in *all* output edges, including tunnel wall edges.
function assemble(before,polys,eps) {
  const m=Object.create(Object.getPrototypeOf(before));Object.assign(m,topology().cloneMeshState(before));
  // Prevent EditableMesh.edges()'s UI observer from publishing the private trial mesh.
  m.edges=()=>[];
  function vertex(p){let id=m.vertices.findIndex(q=>q.distanceTo(p)<=eps);if(id>=0)return id;
    for(const owners of edgeUses(m).values()){const {a,b}=owners[0],ab=m.vertices[b].clone().sub(m.vertices[a]),t=p.clone().sub(m.vertices[a]).dot(ab)/ab.lengthSq();if(t>0&&t<1&&m.vertices[a].clone().addScaledVector(ab,t).distanceTo(p)<=eps){const r=topology().canonicalEdgeSplit(m,a,b,p,{tolerance:eps});if(!r.ok)fail(r.reason);return r.vertex;}}
    m.vertices.push(p.clone());return m.vertices.length-1;
  }
  const faces=polys.map(p=>p.map(vertex));m.faces=faces;
  const used=[...new Set(faces.flat())];
  m.faces=faces.map(f=>f.flatMap((a,i)=>{const b=f[(i+1)%f.length],ab=m.vertices[b].clone().sub(m.vertices[a]),l2=ab.lengthSq();if(l2<=eps*eps)fail('collapsed-output-edge');const entries=[];for(const id of used){if(id===a||id===b)continue;const t=m.vertices[id].clone().sub(m.vertices[a]).dot(ab)/l2;if(t>eps/Math.sqrt(l2)&&t<1-eps/Math.sqrt(l2)&&m.vertices[a].clone().addScaledVector(ab,t).distanceTo(m.vertices[id])<=eps)entries.push({id,t});}entries.sort((x,y)=>x.t-y.t);return[a,...entries.map(e=>e.id)];}));
  // EditableMesh.faceNormal uses its first three vertices. Canonical seam
  // subdivisions can make that triple collinear; rotate, never reverse winding.
  m.faces=m.faces.map(f=>{for(let i=0;i<f.length;i++){const a=m.vertices[f[i]],b=m.vertices[f[(i+1)%f.length]],c=m.vertices[f[(i+2)%f.length]];if(new V().crossVectors(b.clone().sub(a),c.clone().sub(a)).length()>eps*eps)return [...f.slice(i),...f.slice(0,i)];}fail('zero-area-output-face');});
  const keys=new Set(edgeUses(m).keys());m.creases=new Map([...m.creases].filter(([k])=>keys.has(k)));
  return m;
}
export function buildThrough(before,plan) {
  try {
    const c=context(before,plan.sourceFaceIndex),{source,dir,n,sides,start,eps,ts,depth}=c;
    const end=plane(dir,source[0].clone().addScaledVector(dir,depth+eps*32)),planes=[...sides,start,end],polys=[];
    for(let fi=0;fi<before.faces.length;fi++) {if(fi===c.fi)continue;const p=before.faces[fi].map(id=>before.vertices[id]),tris=triangles(p,eps),pieces=tris.map(t=>subtract(t,planes,eps));if(pieces.every(r=>!r.inside.length))polys.push(p);else for(const r of pieces)polys.push(...r.outside);}
    const shellPlanes=ts.map(t=>plane(areaVector(t).normalize(),t[0]));
    for(let i=0;i<source.length;i++) {
      const a=source[i],b=source[(i+1)%source.length];let parts=[[a,b,b.clone().addScaledVector(dir,depth+eps*32),a.clone().addScaledVector(dir,depth+eps*32)]];
      for(const pl of shellPlanes){parts=parts.flatMap(p=>split(p,pl,eps).filter(q=>q.length));if(parts.length>10000)fail('intersection-complexity-limit');}
      for(const p of parts){const mid=center(p),outside=mid.clone().addScaledVector(sides[i].n,eps*16);if(insideSolid(outside,ts))polys.push(p);}
    }
    const trial=assemble(before,polys,eps),validation=validateThrough(trial,eps);if(!validation.ok)return{ok:false,reason:validation.reason,validation};
    const boundaries=topology().extractBoundaryLoops(trial);if(!boundaries.ok||boundaries.loops.length)return{ok:false,reason:'unintended-opening'};
    if(!trial.faces.length)return{ok:false,reason:'entire-solid-removal'};
    // Transaction operates only on the private trial; live mesh is never modified here.
    const transaction=topology().topologyTransaction(trial,()=>({ok:true}),{validation:{allowBoundary:false}});
    if(!transaction.ok)return transaction;
    delete trial.edges;return{ok:true,mesh:trial,validation};
  } catch(e) {return{ok:false,reason:e.message};}
}
// Contact guard for unsupported input. Geometry only; no incident-face exclusions.
export function firstThroughContact(m,fi,maxDistance){
  try{const p=m.faces[fi].map(id=>m.vertices[id]),n=areaVector(p).normalize(),dir=n.clone().negate(),eps=1e-6;
    const sides=p.map((a,i)=>plane(new V().crossVectors(p[(i+1)%p.length].clone().sub(a),n).normalize(),a));let best=null;
    for(let i=0;i<m.faces.length;i++){if(i===fi)continue;for(const tri of triangles(m.faces[i].map(id=>m.vertices[id]),eps)){let q=tri;for(const pl of sides){q=split(q,pl,eps)[0];if(!q.length)break;}if(!q.length)continue;const depths=q.map(v=>v.clone().sub(p[0]).dot(dir)).filter(d=>d>eps);if(!depths.length)continue;const d=Math.min(...depths);if(d<=maxDistance+eps&&(!best||d<best.distance))best={faceIndex:i,distance:d};}}return best;
  }catch{return {distance:0,reason:'unclassifiable-input'};}
}
