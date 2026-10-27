// Read-only Facegroup chart planning. A chart never crosses a group boundary.
const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
const refuse=reason=>({ok:false,reason});
export function planFacegroupSeams(mesh){
 const faces=mesh?.faces,vertices=mesh?.vertices;
 if(!faces?.length||!vertices?.length)return refuse('Choose a mesh with Facegroups');
 if(faces.length>4096||faces.reduce((n,f)=>n+(f?.length||0),0)>20000)return refuse('Facegroup unwrap supports 4096 faces and 20,000 corners');
 const groups=faces.map((_,i)=>mesh.faceGroups?.[i]??null);
 if(!groups.some(g=>typeof g==='string'&&g.trim()))return refuse('Create or paint Facegroups first');
 const edges=new Map(),adj=faces.map(()=>[]);
 for(let fi=0;fi<faces.length;fi++){
  const face=faces[fi];if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length)return refuse('Repair invalid faces before unwrapping');
  for(let j=0;j<face.length;j++){
   const a=face[j],b=face[(j+1)%face.length];
   if(!Number.isInteger(a)||!vertices[a]||!['x','y','z'].every(k=>Number.isFinite(vertices[a][k])))return refuse('Repair invalid vertices before unwrapping');
   const id=key(a,b);if(!edges.has(id))edges.set(id,[]);edges.get(id).push({a,b,fi});
  }
 }
 const seams=[];
 for(const list of edges.values()){
  if(list.length>2)return refuse('Repair non-manifold edges before unwrapping');
  if(list.length===2){const [a,b]=list;if(a.a!==b.b||a.b!==b.a)return refuse('Unify face winding before unwrapping');
   if(groups[a.fi]===groups[b.fi]){adj[a.fi].push(b.fi);adj[b.fi].push(a.fi);continue;}
  }
  seams.push([list[0].a,list[0].b]);
 }
 const faceIslands=faces.map(()=>-1),charts=[];
 for(let fi=0;fi<faces.length;fi++)if(faceIslands[fi]<0){
  const id=charts.length,ids=[fi];faceIslands[fi]=id;
  for(let k=0;k<ids.length;k++)for(const next of adj[ids[k]])if(faceIslands[next]<0){faceIslands[next]=id;ids.push(next);}
  const boundary=[],verts=new Set(),chartEdges=new Set();
  for(const f of ids)for(let j=0;j<faces[f].length;j++){const a=faces[f][j],b=faces[f][(j+1)%faces[f].length],list=edges.get(key(a,b));verts.add(a);chartEdges.add(key(a,b));if(list.length===1||faceIslands[list.find(e=>e.fi!==f)?.fi]!==id)boundary.push([a,b]);}
  const label=groups[fi]??'Ungrouped';
  // A closed chart, a handle, or multiple boundary loops needs explicit new cuts.
  // Refuse instead of quietly inserting a seam inside a Facegroup.
  if(!boundary.length||verts.size-chartEdges.size+ids.length!==1)return refuse(`Facegroup “${label}” needs another group boundary: use one open disk-shaped patch per connected group`);
  const next=new Map();for(const [a,b]of boundary){if(next.has(a))return refuse(`Facegroup “${label}” has a pinched boundary; split that group`);next.set(a,b);}
  const loop=[boundary[0][0]];let at=next.get(loop[0]);
  while(at!==loop[0]&&at!==undefined&&loop.length<=boundary.length){loop.push(at);at=next.get(at);}
  if(at!==loop[0]||loop.length!==boundary.length||new Set(loop).size!==loop.length)return refuse(`Facegroup “${label}” has holes or pinched edges; split that group`);
  charts.push({faces:ids,vertices:[...verts],boundary:loop,label});
 }
 return {ok:true,seams,charts,faceIslands,islandCount:charts.length};
}
// Preserve exact flat patch shapes; only curved charts need disk relaxation.
function planarChart(mesh,chart){
 if(typeof mesh.faceNormal!=='function')return null;
 const normal=mesh.faceNormal(chart.faces[0]),origin=mesh.vertices[chart.boundary[0]],u=mesh.vertices[chart.boundary[1]].clone().sub(origin);
 u.addScaledVector(normal,-u.dot(normal));if(u.lengthSq()<1e-24||normal.lengthSq()<.5)return null;u.normalize();
 const v=normal.clone().cross(u),local=chart.vertices.map(id=>mesh.vertices[id].clone().sub(origin)),extent=Math.max(...local.map(p=>p.length()));
 if(!Number.isFinite(extent)||!extent||local.some(p=>Math.abs(p.dot(normal))>extent*1e-8))return null;
 return new Map(chart.vertices.map((id,i)=>[id,[local[i].dot(u)/extent,local[i].dot(v)/extent]]));
}
const pause=()=>new Promise(resolve=>requestAnimationFrame(resolve));
// Positive-weight harmonic disk embedding with an arc-length circular boundary.
// Bounded preconditioned conjugate gradients; yielding keeps timer/orbit responsive.
export async function unwrapFacegroupCharts(mesh,plan,{yieldControl=pause,cancelled=()=>false}={}){
 if(!plan?.ok)return plan;
 const uvCorners=mesh.faces.map(()=>null);let work=0;
 for(const chart of plan.charts){
  if(cancelled())return refuse('Unwrap cancelled');
  const flat=planarChart(mesh,chart);
  if(flat){for(const fi of chart.faces)uvCorners[fi]=mesh.faces[fi].map(id=>flat.get(id).slice());await yieldControl();continue;}
  const graph=new Map(chart.vertices.map(v=>[v,new Set()]));
  for(const fi of chart.faces){const f=mesh.faces[fi];for(let j=1;j<f.length;j++)for(const [a,b]of [[f[0],f[j]],[f[j],f[(j+1)%f.length]]])if(a!==b){graph.get(a).add(b);graph.get(b).add(a);}}
  const loop=chart.boundary,boundary=new Map(),lengths=loop.map((id,i)=>mesh.vertices[id].distanceTo(mesh.vertices[loop[(i+1)%loop.length]])),perimeter=lengths.reduce((a,b)=>a+b,0);
  if(!Number.isFinite(perimeter)||perimeter<=0||lengths.some(v=>v<=0))return refuse('A Facegroup boundary has a collapsed edge');
  let angle=0;for(let i=0;i<loop.length;i++){boundary.set(loop[i],[Math.cos(angle),Math.sin(angle)]);angle+=lengths[i]/perimeter*Math.PI*2;}
  const ids=chart.vertices.filter(id=>!boundary.has(id)),index=new Map(ids.map((id,i)=>[id,i])),degree=ids.map(id=>graph.get(id).size),rows=ids.map(id=>[...graph.get(id)].filter(v=>index.has(v)).map(v=>index.get(v)));
  const uv=new Map(boundary);
  for(let axis=0;axis<2;axis++){
   const b=ids.map(id=>[...graph.get(id)].reduce((s,v)=>s+(boundary.get(v)?.[axis]||0),0)),x=ids.map(()=>0),r=b.slice(),z=r.map((v,i)=>v/degree[i]),p=z.slice();let rz=r.reduce((s,v,i)=>s+v*z[i],0),converged=rz<1e-22;
   for(let iteration=0;!converged&&iteration<1500;iteration++){
    if(cancelled())return refuse('Unwrap cancelled');
    const ap=p.map((v,i)=>degree[i]*v-rows[i].reduce((s,j)=>s+p[j],0));work+=ids.length+rows.reduce((s,row)=>s+row.length,0);
    if(work>18000000)return refuse('Facegroup unwrap exceeded its work limit; split large groups');
    const denominator=p.reduce((s,v,i)=>s+v*ap[i],0);if(!(denominator>0))return refuse('Facegroup patch could not be flattened safely');
    const alpha=rz/denominator;for(let i=0;i<ids.length;i++){x[i]+=alpha*p[i];r[i]-=alpha*ap[i];z[i]=r[i]/degree[i];}
    const next=r.reduce((s,v,i)=>s+v*z[i],0);converged=next<1e-20;
    if(!converged){const beta=next/rz;for(let i=0;i<ids.length;i++)p[i]=z[i]+beta*p[i];}rz=next;
    if(iteration%16===15)await yieldControl();
   }
   if(!converged)return refuse('Facegroup flattening did not converge; split that group');
   ids.forEach((id,i)=>{if(!uv.has(id))uv.set(id,[0,0]);uv.get(id)[axis]=x[i];});
  }
  for(const fi of chart.faces)uvCorners[fi]=mesh.faces[fi].map(id=>uv.get(id).slice());
  await yieldControl();
 }
 return {ok:true,uvCorners};
}
