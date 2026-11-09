import * as THREE from 'three';
// Geometry planning only. The original connected-extrusion owner commits vertices,
// Faces, selection and history. Only planar, one-quad-wide closed bands qualify.
const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
const area=p=>p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a.x*b.y-a.y*b.x;},0)/2;
const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
function intersects(a,b,c,d,e){
 if(Math.max(a.x,b.x)+e<Math.min(c.x,d.x)||Math.max(c.x,d.x)+e<Math.min(a.x,b.x)||Math.max(a.y,b.y)+e<Math.min(c.y,d.y)||Math.max(c.y,d.y)+e<Math.min(a.y,b.y))return false;
 const tolerance=e*Math.max(a.distanceTo(b),c.distanceTo(d),e),u=cross(a,b,c),v=cross(a,b,d),w=cross(c,d,a),z=cross(c,d,b);
 return !((u>tolerance&&v>tolerance)||(u< -tolerance&&v< -tolerance)||(w>tolerance&&z>tolerance)||(w< -tolerance&&z< -tolerance));
}
function simple(p,e){
 for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++){
  if(j===i+1||(i===0&&j===p.length-1))continue;
  if(intersects(p[i],p[(i+1)%p.length],p[j],p[(j+1)%p.length],e))return false;
 }
 return true;
}
function contains(poly,p,e){
 let inside=false;
 for(let i=0,j=poly.length-1;i<poly.length;j=i++){
  const a=poly[j],b=poly[i],dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy);
  if(l&&Math.abs(cross(a,b,p))<=e*l&&p.x>=Math.min(a.x,b.x)-e&&p.x<=Math.max(a.x,b.x)+e&&p.y>=Math.min(a.y,b.y)-e&&p.y<=Math.max(a.y,b.y)+e)return true;
  if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)inside=!inside;
 }
 return inside;
}
function edgeUses(faces){const out=new Map();faces.forEach((f,fi)=>f.forEach((a,i)=>{const b=f[(i+1)%f.length],k=key(a,b);if(!out.has(k))out.set(k,[]);out.get(k).push({fi,i,a,b});}));return out;}
export function planConcaveBandWalls(mesh,region,positions,replacement,distance){
 const unsupported={handled:false};
 if(distance<=0||region.faceIndices.some(fi=>mesh.faces[fi].length!==4))return unsupported;
 const next=new Map(),incoming=new Set();
 for(const {a,b} of region.boundaryEdges){if(next.has(a)||incoming.has(b))return unsupported;next.set(a,b);incoming.add(b);}
 if(region.regionVertices.some(v=>!next.has(v)||!incoming.has(v)))return unsupported;
 const unseen=new Set(next.keys()),loops=[];
 while(unseen.size){const start=unseen.values().next().value,loop=[];let v=start;do{if(!unseen.delete(v))return unsupported;loop.push(v);v=next.get(v);}while(v!==start);loops.push(loop);}
 if(loops.length!==2||loops.some(r=>r.length<4))return unsupported;
 const box=new THREE.Box3().setFromPoints(region.regionVertices.map(v=>mesh.vertices[v])),scale=Math.max(box.getSize(new THREE.Vector3()).length(),1e-6),e=scale*1e-8;
 if(distance<e)return unsupported;
 const data=[];let concave=false;
 for(const loop of loops){
  const origin=mesh.vertices[loop[0]],normal=new THREE.Vector3();
  loop.forEach((v,i)=>normal.add(mesh.vertices[v].clone().sub(origin).cross(mesh.vertices[loop[(i+1)%loop.length]].clone().sub(origin))));
  if(normal.lengthSq()<e*e)return unsupported;normal.normalize();
  const u=mesh.vertices[loop[1]].clone().sub(origin).normalize(),v=normal.clone().cross(u).normalize(),project=p=>{const q=p.clone().sub(origin);return new THREE.Vector2(q.dot(u),q.dot(v));};
  if(loop.some(id=>Math.abs(mesh.vertices[id].clone().sub(origin).dot(normal))>e||Math.abs(positions.get(id).clone().sub(origin).dot(normal))>e))return unsupported;
  const old=loop.map(id=>project(mesh.vertices[id])),corners=[];
  for(let i=0;i<loop.length;i++){const t=cross(old[(i+loop.length-1)%loop.length],old[i],old[(i+1)%loop.length]);if(Math.abs(t)>e*e)corners.push(i);if(t< -e*e)concave=true;}
  if(corners.length<3)return unsupported;data.push({loop,origin,normal,project,old,corners});
 }
 if(!concave)return unsupported;
 const planeNormal=data[0].normal,firstLoop=new Set(loops[0]);
 if(Math.abs(planeNormal.dot(data[1].normal))<1-1e-8||Math.abs(data[1].origin.clone().sub(data[0].origin).dot(planeNormal))<=e)return unsupported;
 for(const fi of region.faceIndices){
  const face=mesh.faces[fi];if(face.filter(v=>firstLoop.has(v)).length!==2)return unsupported;
  for(let i=0;i<4;i++){const a=face[i],b=face[(i+1)%4];if(firstLoop.has(a)!==firstLoop.has(b)&&mesh.vertices[b].clone().sub(mesh.vertices[a]).cross(planeNormal).length()>e)return unsupported;}
 }
 const fail=reason=>({handled:true,ok:false,reason});
 // Reparameterize straight runs between offset corner anchors; never let a small
 // cap Face reverse merely because the miter moved farther than its old spacing.
 for(const {loop,corners} of data)for(let c=0;c<corners.length;c++){
  const start=corners[c],end=corners[(c+1)%corners.length],a=positions.get(loop[start]).clone(),b=positions.get(loop[end]).clone(),oldA=mesh.vertices[loop[start]],oldB=mesh.vertices[loop[end]],length=oldA.distanceTo(oldB);
  if(length<e)return fail('Corner offset collapses a boundary');
  for(let i=(start+1)%loop.length;i!==end;i=(i+1)%loop.length){const t=oldA.distanceTo(mesh.vertices[loop[i]])/length;positions.set(loop[i],a.clone().lerp(b,t));}
 }
 for(const fi of region.faceIndices){const face=mesh.faces[fi],n=mesh.faceNormal(fi);for(let i=1;i<face.length-1;i++){const a=positions.get(face[0]),b=positions.get(face[i]),c=positions.get(face[i+1]);if(b.clone().sub(a).cross(c.clone().sub(a)).dot(n)<=e*e)return fail('Corner offset folds a Face; reduce distance');}}
 const plannedByIndex=new Map([...replacement].map(([id,index])=>[index,positions.get(id)])),point=id=>plannedByIndex.get(id)||mesh.vertices[id],walls=[];
 for(const d of data){
  const {loop,project,corners}=d,offset=loop.map(id=>project(positions.get(id))),oldCorners=corners.map(i=>d.old[i]),newCorners=corners.map(i=>offset[i]);
  if(!simple(oldCorners,e)||!simple(newCorners,e)||oldCorners.some(p=>!contains(newCorners,p,e))||oldCorners.some((a,i)=>newCorners.some((c,j)=>intersects(a,oldCorners[(i+1)%oldCorners.length],c,newCorners[(j+1)%newCorners.length],e))))return fail('Corner offset overlaps; reduce distance');
  const oldIds=[...loop],newIds=loop.map(id=>replacement.get(id)),oldArea=Math.abs(area(d.old)),newArea=Math.abs(area(offset));
  if(newArea<=oldArea+e*e)return fail('Corner offset collapses a side wall');
  // The existing one-to-one boundary correspondence already gives the minimum
  // quad strip. Correct the offset runs; do not triangulate the entire wall.
  const faces=loop.map((id,i)=>[id,loop[(i+1)%loop.length],newIds[(i+1)%loop.length],newIds[i]]);
  const edge=region.boundaryEdges.find(q=>q.a===loop[0]),normal=mesh.vertices[edge.b].clone().sub(mesh.vertices[edge.a]).cross(positions.get(edge.b).clone().sub(mesh.vertices[edge.b])).normalize();
  let total=0;
  for(const face of faces){
   const points=face.map(point);
   for(let i=0;i<4;i++){
    const a=points[i],b=points[(i+1)%4],c=points[(i+2)%4];
    if(b.clone().sub(a).cross(c.clone().sub(b)).dot(normal)<=e*e)return fail('Corner wall folds; reduce distance');
   }
   for(const ids of [[0,1,2],[0,2,3]]){const [a,b,c]=ids.map(i=>points[i]),cross=b.clone().sub(a).cross(c.clone().sub(a));if(cross.dot(normal)<=e*e)return fail('Corner wall collapsed');total+=cross.length()/2;}
  }
  const expected=new Set([oldIds,newIds].flatMap(r=>r.map((a,i)=>key(a,r[(i+1)%r.length])))),uses=edgeUses(faces);
  if([...uses].some(([k,u])=>u.length!==(expected.has(k)?1:2))||[...expected].some(k=>uses.get(k)?.length!==1))return fail('Corner wall could not preserve its boundary');
  if(Math.abs(total-(newArea-oldArea))>Math.max(e*e,(newArea-oldArea)*1e-6))return fail('Corner wall overlaps; reduce distance');
  walls.push(...faces);
 }
 return {handled:true,ok:true,sideFaces:walls};
}
