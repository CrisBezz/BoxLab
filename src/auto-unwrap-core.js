import {unfoldGuidedNets} from './guided-uv-net.js?v=0.36.18.1193';
// Export-local adapter. Editable polygon topology and Facegroups are read-only.
export const AUTO_UV_LIMITS=Object.freeze({faces:4096,corners:20000,vertices:20000,triangles:18000,pairs:250000});
const fail=message=>{throw Error(message);};
export function autoUVFingerprint(mesh){return JSON.stringify([mesh.vertices,mesh.faces,mesh.faceGroups]);}
export function prepareAutoUnwrapMesh(mesh,owner,{guided=false,markedEdges=[]}={}){
 const faces=mesh?.faces,vertices=mesh?.vertices;
 if(!faces?.length||!vertices?.length)fail('Choose a mesh to unwrap');
 const corners=faces.reduce((n,f)=>n+(f?.length||0),0);
 if(faces.length>AUTO_UV_LIMITS.faces||corners>AUTO_UV_LIMITS.corners||vertices.length>AUTO_UV_LIMITS.vertices)fail('Auto Unwrap supports 4096 faces and 20,000 corners/vertices');
 const edges=new Map();
 for(const [fi,f] of faces.entries()){
  if(!Array.isArray(f)||f.length<3||new Set(f).size!==f.length)fail(`Repair invalid face ${fi+1} before unwrapping`);
  for(let j=0;j<f.length;j++){
   const a=f[j],b=f[(j+1)%f.length],v=vertices[a];
   if(!Number.isInteger(a)||!v||![v.x,v.y,v.z].every(Number.isFinite))fail('Repair invalid vertices before unwrapping');
   const key=a<b?`${a}:${b}`:`${b}:${a}`,uses=edges.get(key)||[];uses.push([a,b,fi]);edges.set(key,uses);
  }
 }
 for(const uses of edges.values())if(uses.length>2||uses.length===2&&uses[0][0]!==uses[1][1])fail('Repair non-manifold edges or inconsistent winding before unwrapping');
 const required=[];
 const seamKeys=new Set();
 for(const pair of markedEdges){
  const key=seamKey(pair),uses=edges.get(key);
  if(uses?.length!==2)fail('Marked seams must be shared mesh edges');
  if(!seamKeys.has(key)){required.push(uses);seamKeys.add(key);}
 }
 let regions,borders;
 if(guided||required.length){
  const groups=faces.map((_,i)=>guided?mesh.faceGroups?.[i]??null:null);
  if(guided&&groups.every(group=>group===null))fail('Assign at least one Facegroup before using Guided Unwrap');
  const neighbors=faces.map(()=>[]);
  borders=[];
  for(const uses of edges.values()){
   if(uses.length!==2)continue;
   const [[a,b,left],[,,right]]=uses;
   if(groups[left]!==groups[right])borders.push([a,b]);
   else if(!seamKeys.has(seamKey([a,b]))){neighbors[left].push(right);neighbors[right].push(left);}
  }
  regions=Array(faces.length).fill(-1);
  let region=0;
  for(let face=0;face<faces.length;face++){
   if(regions[face]>=0)continue;
   const pending=[face];regions[face]=region;
   while(pending.length){
    for(const adjacent of neighbors[pending.pop()]){
     if(regions[adjacent]>=0)continue;
     regions[adjacent]=region;pending.push(adjacent);
    }
   }
   region++;
  }
 }
 if(typeof owner?.buildUVPreviewGeometry!=='function')fail('UV preview owner is not ready; try Refresh');
 const payload={version:1,source:'boxlab',uvTopologySignature:owner.topologySignature(mesh),uvCorners:faces.map(f=>f.map(()=>[0,0]))};let geometry;
 try{
  geometry=owner.buildUVPreviewGeometry(mesh,payload,{faceIndices:true});
  const tf=geometry?.userData?.boxlabTriangleFaces,tv=geometry?.userData?.boxlabTriangleVertices;
  if(!tf||!tv||tv.length!==tf.length*3)fail('Could not read complete source face triangles');
  if(tf.length>AUTO_UV_LIMITS.triangles)fail('Auto Unwrap supports at most 18,000 render triangles');
  const counts=faces.map(()=>0),triangles=[];
  for(let i=0;i<tf.length;i++){
   const fi=tf[i],f=faces[fi],ids=tv.slice(i*3,i*3+3),local=ids.map(id=>f?.indexOf(id));
   if(!f||new Set(ids).size!==3||local.some(j=>j<0))fail('UV triangle/source correspondence is invalid');
   counts[fi]++;triangles.push({face:fi,corners:local,ids});
  }
  if(counts.some((n,i)=>n!==faces[i].length-2))fail('UV triangle coverage is incomplete');
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(const v of vertices)for(const [i,k]of ['x','y','z'].entries()){min[i]=Math.min(min[i],v[k]);max[i]=Math.max(max[i],v[k]);}
  const scale=Math.max(...max.map((v,i)=>v-min[i]));if(!(scale>0)&&Number.isFinite(scale))fail('Mesh has no usable extent');
  if(!Number.isFinite(scale))fail('Mesh extent exceeds the supported range');
  // Fixed 1000-unit export-local extent avoids xatlas absolute-area epsilon
  // dropping valid thin recess corners. Original world coordinates stay intact.
  const positions=new Float32Array(vertices.flatMap(v=>['x','y','z'].map((k,i)=>((v[k]-min[i])/scale-.5)*1000)));
  for(const t of triangles){const [a,b,c]=t.ids.map(id=>Array.from(positions.slice(id*3,id*3+3))),u=b.map((v,i)=>v-a[i]),v=c.map((x,i)=>x-a[i]),area=Math.hypot(u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]);if(!(area>1e-14))fail(`Face ${t.face+1} has a collapsed or too-small triangle`);}
  return {positions,indices:new Uint32Array(triangles.flatMap(t=>t.ids)),triangles,regions,borders,required,seamKeys,faces:regions?faces:undefined,faceSizes:faces.map(f=>f.length),key:autoUVFingerprint(mesh)};
 }finally{geometry?.dispose?.();}
}
const area=t=>(t[1][0]-t[0][0])*(t[2][1]-t[0][1])-(t[1][1]-t[0][1])*(t[2][0]-t[0][0]);
function interiorsOverlap(a,b){
 for(const t of [a,b])for(let i=0;i<3;i++){const p=t[i],q=t[(i+1)%3],nx=-(q[1]-p[1]),ny=q[0]-p[0],x=a.map(v=>v[0]*nx+v[1]*ny),y=b.map(v=>v[0]*nx+v[1]*ny);if(Math.min(Math.max(...x),Math.max(...y))-Math.max(Math.min(...x),Math.min(...y))<=1e-11*Math.hypot(nx,ny))return false;}
 return true;
}
export function validateAutoUnwrapResult(input,result,{overlaps=true}={}){
 const uv=result?.uvCorners;
 if(!Array.isArray(uv)||uv.length!==input.faceSizes.length||uv.some((f,i)=>!Array.isArray(f)||f.length!==input.faceSizes[i]||f.some(p=>!Array.isArray(p)||p.length!==2||p.some(v=>!Number.isFinite(v)||v<0||v>1))))fail('Auto Unwrap returned incomplete or invalid face-corner UVs');
 const signs=new Map(),triangles=input.triangles.map(t=>{const p=t.corners.map(j=>uv[t.face][j]),a=area(p),rounded=area(p.map(v=>v.map(Math.fround)));if(Math.abs(a)<1e-14||!rounded||Math.sign(rounded)!==Math.sign(a))fail(`UV triangle collapses on face ${t.face+1}`);const old=signs.get(t.face);if(old&&old!==Math.sign(a))fail(`UV fold within polygon face ${t.face+1}`);signs.set(t.face,Math.sign(a));return p;});
 if(overlaps){
  const grid=new Map(),seen=new Set();let pairs=0;
  for(let i=0;i<triangles.length;i++){const t=triangles[i],x=t.map(p=>p[0]),y=t.map(p=>p[1]);for(let u=Math.floor(Math.min(...x)*32);u<=Math.floor(Math.max(...x)*32);u++)for(let v=Math.floor(Math.min(...y)*32);v<=Math.floor(Math.max(...y)*32);v++){const key=u+','+v,list=grid.get(key)||[];for(const j of list){const pair=j*triangles.length+i;if(seen.has(pair))continue;seen.add(pair);if(++pairs>AUTO_UV_LIMITS.pairs)fail('UV overlap validation exceeded its bounded work limit');if(interiorsOverlap(t,triangles[j]))fail('Auto Unwrap produced overlapping triangles; layout was not applied');}list.push(i);grid.set(key,list);}}
 }
 return true;
}
// xatlas may weld coincident split positions. Give incident faces distinct
// material IDs if the ordinary charting does not keep the requested cuts.
function constrainedChartMaterials(input){
 const conflicts=input.faceSizes.map(()=>[]);
 for(const [[,,left],[,,right]] of input.required){
  conflicts[left].push(right);conflicts[right].push(left);
 }
 const colors=[],ids=new Map();
 return input.regions.map((region,face)=>{
  const used=new Set(conflicts[face].map(other=>colors[other]));
  let color=0;
  while(used.has(color))color++;
  colors[face]=color;
  const key=`${region}:${color}`;
  if(!ids.has(key))ids.set(key,ids.size);
  return ids.get(key);
 });
}

export function validateMarkedUVSeams(input,uvCorners){
 for(const [[a,b,left],[,,right]] of input.required??[]){
  const l=input.faces[left],r=input.faces[right];
  const same=id=>{
   const p=uvCorners[left][l.indexOf(id)],q=uvCorners[right][r.indexOf(id)];
   return p.every((value,i)=>Math.abs(Math.fround(value)-Math.fround(q[i]))<=1e-9);
  };
  if(same(a)&&same(b))fail('The solver joined a marked seam; UVs were not applied');
 }
}

const packOptions={resolution:1024,padding:4,bilinear:true,rotateCharts:true};
export async function runAutoUnwrap(input,backend){
 await backend.Initialize();
 let net;
 if(input.regions&&input.faces){
  const unfolded=unfoldGuidedNets(input,interiorsOverlap,AUTO_UV_LIMITS.pairs);
  if(unfolded){
   try{net=packGuidedNets(input,backend,unfolded);}catch{/* Retain validated xatlas charting if planar net packing fails. */}
   if(net&&net.chartCount===new Set(input.regions).size)return net;
  }
 }
 let standard;
 try{standard=chartMesh(input,backend,input.regions);}
 catch(error){
  if(net)return net;
  if(!input.required?.length)throw error;
  standard=chartMesh(input,backend,constrainedChartMaterials(input));
 }
 return net&&net.chartCount<standard.chartCount?net:standard;
}

function chartMesh(input,backend,materials){
 const atlas=new backend.Atlas();
 try{
  const declaration={vertexPositionData:input.positions,vertexCount:input.positions.length/3,vertexPositionStride:12,indexData:input.indices,indexCount:input.indices.length};
  if(materials)declaration.faceMaterialData=Uint32Array.from(input.triangles,t=>materials[t.face]);
  atlas.addMesh(declaration);
  atlas.generate({maxIterations:2},packOptions);
  return readAtlas(input,atlas,input.indices);
 }finally{atlas.delete();}
}

function packGuidedNets(input,backend,{uvCorners,chartFaces}){
 const atlas=new backend.Atlas();
 try{
  const faceChart=Array(input.faceSizes.length),cornerIndices=[],uvData=[];
  chartFaces.forEach((faces,chart)=>{
   const indices=new Map();
   for(const face of faces){
    faceChart[face]=chart;
    cornerIndices[face]=uvCorners[face].map((point,corner)=>{
     const key=`${input.faces[face][corner]}:${point.join(',')}`;
     if(!indices.has(key)){indices.set(key,uvData.length/2);uvData.push(...point);}
     return indices.get(key);
    });
   }
  });
  const indexData=Uint32Array.from(input.triangles.flatMap(t=>t.corners.map(c=>cornerIndices[t.face][c])));
  atlas.addUvMesh({vertexUvData:Float32Array.from(uvData),vertexCount:uvData.length/2,vertexStride:8,indexData,indexCount:indexData.length,faceMaterialData:Uint32Array.from(input.triangles,t=>faceChart[t.face])});
  atlas.generate({},packOptions);
  const result=readAtlas(input,atlas,indexData,faceChart);
  if(result.chartCount!==chartFaces.length)fail('Guided packing changed the net chart count');
  return result;
 }finally{atlas.delete();}
}

function readAtlas(input,atlas,sourceIndices,expectedCharts){
 if(atlas.meshCount!==1||atlas.atlasCount!==1||!atlas.width||!atlas.height)fail('Auto Unwrap needs one valid atlas');
 const output=atlas.getMesh(0),indices=new Uint32Array(output.indexCount);if(output.indexCount!==input.indices.length||!output.getIndexArray(indices))fail('Auto Unwrap triangle count changed');
 const uvCorners=input.faceSizes.map(n=>Array(n).fill(null)),side=Math.max(atlas.width,atlas.height),charts=new Map(),sourceCharts=new Map();
 for(let i=0;i<indices.length;i++){
  const vertex=output.getVertex(indices[i]),t=input.triangles[Math.floor(i/3)],corner=t.corners[i%3];
  if(!vertex||vertex.xref!==sourceIndices[i])fail('Auto Unwrap lost original polygon corner correspondence');
  if(vertex.atlasIndex!==0)fail(`Face ${t.face+1} is too small for automatic charting; try Face atlas for this mesh`);
  const uv=[(vertex.uv[0]+(side-atlas.width)/2)/side,(vertex.uv[1]+(side-atlas.height)/2)/side],old=uvCorners[t.face][corner];
  if(old&&old.some((v,j)=>Math.abs(v-uv[j])>1e-9))fail(`Auto Unwrap would split inside polygon face ${t.face+1}; use a different projection for that face`);
  const expected=expectedCharts?.[t.face];
  if(expectedCharts){
   if(sourceCharts.has(expected)&&sourceCharts.get(expected)!==vertex.chartIndex)fail('Guided packing split a connected net');
   sourceCharts.set(expected,vertex.chartIndex);
  }
  const region=input.regions?.[t.face];
  if(charts.has(vertex.chartIndex)&&charts.get(vertex.chartIndex)!==region)fail('Guided Unwrap crossed a Facegroup region boundary');
  uvCorners[t.face][corner]=uv;charts.set(vertex.chartIndex,region);
 }
 const regionCounts=input.regions?Array(new Set(input.regions).size).fill(0):undefined;
 if(regionCounts)for(const region of charts.values())regionCounts[region]++;
 const result={uvCorners,chartCount:charts.size,width:atlas.width,height:atlas.height,regionCounts};validateAutoUnwrapResult(input,result);validateMarkedUVSeams(input,uvCorners);return result;
}
export function autoUnwrapSeams(mesh,uv){
 const edges=new Map();mesh.faces.forEach((f,fi)=>f.forEach((a,i)=>{const b=f[(i+1)%f.length],key=a<b?`${a}:${b}`:`${b}:${a}`,list=edges.get(key)||[];list.push({a,b,p:uv[fi][i],q:uv[fi][(i+1)%f.length]});edges.set(key,list);}));
 return [...edges.values()].filter(list=>list.length!==2||list[0].p.some((v,i)=>Math.abs(v-list[1].q[i])>1e-9)||list[0].q.some((v,i)=>Math.abs(v-list[1].p[i])>1e-9)).map(list=>[list[0].a,list[0].b]);
}

const seamKey=([a,b])=>a<b?`${a}:${b}`:`${b}:${a}`;
export function guidedUnwrapSeams(mesh,uv,borders){
 const remaining=new Set(borders.map(seamKey));
 const extra=autoUnwrapSeams(mesh,uv).filter(edge=>!remaining.delete(seamKey(edge)));
 if(remaining.size)fail('Guided Unwrap did not separate every Facegroup border');
 return extra;
}
