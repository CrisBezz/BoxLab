// Exact .1123 assemble owner from 59195e151ff9056b2fbd418f1762ef1f12665830.
// Test-only baseline; dependencies supplied by through-assembly-profile.mjs.
export function assemble(before,polys,eps,groups=null) {
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
  m.faces=m.faces.map(f=>{
    // An untouched warped polygon's first vertex defines its displayed fan.
    // Rotating that anchor would change the surface even with equal boundaries.
    const p=f.map(id=>m.vertices[id]),n=areaVector(p).normalize();
    if(p.some(v=>Math.abs(v.clone().sub(p[0]).dot(n))>eps*4))return f;
    for(let i=0;i<f.length;i++){const a=m.vertices[f[i]],b=m.vertices[f[(i+1)%f.length]],c=m.vertices[f[(i+2)%f.length]];if(new V().crossVectors(b.clone().sub(a),c.clone().sub(a)).length()>eps*eps)return [...f.slice(i),...f.slice(0,i)];}fail('zero-area-output-face');});
  if(groups)m.faceGroups=[...groups];
  const keys=new Set(edgeUses(m).keys());m.creases=new Map([...m.creases].filter(([k])=>keys.has(k)));
  return m;
}
