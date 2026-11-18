// Unfold planar polygons by hinging around shared edges in export space.
const subtract = (a,b) => a.map((value,i)=>value-b[i]);
const dot = (a,b) => a.reduce((sum,value,i)=>sum+value*b[i],0);
const cross = ([a,b,c],[x,y,z]) => [b*z-c*y,c*x-a*z,a*y-b*x];
const unit = v => {
 const length=Math.hypot(...v);
 return length>0?v.map(value=>value/length):null;
};

export function unfoldGuidedNets(input, interiorsOverlap, pairLimit) {
 const {positions,faces,regions,triangles}=input;
 const points=faces.map(face=>face.map(vertex=>Array.from(positions.subarray(vertex*3,vertex*3+3))));
 const neighbors=faces.map(()=>[]);
 const edges=new Map();
 faces.forEach((face,fi)=>face.forEach((a,i)=>{
  const b=face[(i+1)%face.length],key=a<b?`${a}:${b}`:`${b}:${a}`;
  const other=edges.get(key);
  if(!other){edges.set(key,{face:fi,edge:i});return;}
  if(regions[fi]!==regions[other.face]||input.seamKeys?.has(key))return;
  neighbors[fi].push({face:other.face,edge:other.edge,parentEdge:i});
  neighbors[other.face].push({face:fi,edge:i,parentEdge:other.edge});
 }));
 const localTriangles=faces.map(()=>[]);
 for(const {face,corners} of triangles)localTriangles[face].push(corners);
 const normals=points.map((polygon,fi)=>{
  const normal=unit(localTriangles[fi].reduce((sum,[a,b,c])=>{
   const n=cross(subtract(polygon[b],polygon[a]),subtract(polygon[c],polygon[a]));
   return sum.map((value,i)=>value+n[i]);
  },[0,0,0]));
  const offsets=polygon.map(p=>subtract(p,polygon[0]));
  const extent=Math.max(...offsets.map(v=>Math.hypot(...v)));
  return normal&&offsets.every(v=>Math.abs(dot(v,normal))<=extent*1e-6)?normal:null;
 });
 if(normals.some(n=>!n))return null;

 function project(face,edge,start,end) {
  const polygon=points[face],next=(edge+1)%polygon.length;
  const direction=subtract(polygon[next],polygon[edge]),length=Math.hypot(...direction);
  const u=unit(direction),v=cross(normals[face],u);
  const x=(end[0]-start[0])/length,y=(end[1]-start[1])/length;
  const uv=polygon.map(point=>{
   const offset=subtract(point,polygon[edge]),along=dot(offset,u),across=dot(offset,v);
   return [start[0]+x*along-y*across,start[1]+y*along+x*across];
  });
  uv[edge]=start;uv[next]=end;
  return uv;
 }

 const uvCorners=faces.map(()=>null),chartFaces=[];
 let pairs=0;
 for(let root=0;root<faces.length;root++){
  if(uvCorners[root])continue;
  const length=Math.hypot(...subtract(points[root][1],points[root][0]));
  const chart=[],occupied=[],pending=[];
  function accept(face,uv){
   chart.push(face);pending.push(face);uvCorners[face]=uv;
   occupied.push(...localTriangles[face].map(corners=>corners.map(i=>uv[i])));
  }
  accept(root,project(root,0,[0,0],[length,0]));
  for(let i=0;i<pending.length;i++){
   const parent=pending[i],uv=uvCorners[parent];
   for(const {face,edge,parentEdge} of neighbors[parent]){
    if(uvCorners[face])continue;
    const next=project(face,edge,uv[(parentEdge+1)%uv.length],uv[parentEdge]);
    const test=localTriangles[face].map(corners=>corners.map(j=>next[j]));
    pairs+=test.length*occupied.length;
    if(pairs>pairLimit)return null;
    if(test.some(triangle=>occupied.some(other=>interiorsOverlap(triangle,other))))continue;
    accept(face,next);
   }
  }
  chartFaces.push(chart);
 }
 return {uvCorners,chartFaces};
}
