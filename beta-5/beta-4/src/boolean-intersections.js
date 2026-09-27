// BoxLab v0.36.18.209 — Boolean face-pair intersection geometry kernel.
// Non-destructive: computes triangle/polygon intersection segments for later topology insertion.
import * as THREE from 'three';

const VERSION='0.36.18.209';

function transformPoint(v,matrix){
  const p=v?.clone?.()||new THREE.Vector3(v?.x||0,v?.y||0,v?.z||0);
  return matrix?.isMatrix4?p.applyMatrix4(matrix):p;
}
function facePoints(mesh,face,matrix=null){
  if(!mesh||!Array.isArray(face)||face.length<3)return[];
  const points=face.map(i=>mesh.vertices?.[i]).filter(Boolean).map(v=>transformPoint(v,matrix));
  return points.length===face.length?points:[];
}
function faceNormal(points){
  const n=new THREE.Vector3();
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];
    n.x+=(a.y-b.y)*(a.z+b.z);n.y+=(a.z-b.z)*(a.x+b.x);n.z+=(a.x-b.x)*(a.y+b.y);
  }
  return n.lengthSq()>1e-24?n.normalize():null;
}
function projectPoint(p,axis){return axis===0?new THREE.Vector2(p.y,p.z):axis===1?new THREE.Vector2(p.x,p.z):new THREE.Vector2(p.x,p.y);}
function triangulatePoints(points){
  if(points.length===3)return[[points[0],points[1],points[2]]];
  const normal=faceNormal(points);if(!normal)return[];
  const abs=[Math.abs(normal.x),Math.abs(normal.y),Math.abs(normal.z)];
  const axis=abs[0]>=abs[1]&&abs[0]>=abs[2]?0:abs[1]>=abs[2]?1:2;
  const contour=points.map(p=>projectPoint(p,axis));
  return THREE.ShapeUtils.triangulateShape(contour,[]).map(t=>[points[t[0]],points[t[1]],points[t[2]]]);
}
function triangleBox(tri){return new THREE.Box3().setFromPoints(tri);}
function triNormal(tri){return tri[1].clone().sub(tri[0]).cross(tri[2].clone().sub(tri[0]));}
function pointInTriangle(p,tri,eps){
  const a=tri[0],b=tri[1],c=tri[2],v0=c.clone().sub(a),v1=b.clone().sub(a),v2=p.clone().sub(a);
  const d00=v0.dot(v0),d01=v0.dot(v1),d02=v0.dot(v2),d11=v1.dot(v1),d12=v1.dot(v2),den=d00*d11-d01*d01;
  if(Math.abs(den)<1e-24)return false;
  const u=(d11*d02-d01*d12)/den,v=(d00*d12-d01*d02)/den;
  return u>=-eps&&v>=-eps&&u+v<=1+eps;
}
function orient2(a,b,c){return (b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);}
function onSeg2(a,b,p,eps){return Math.abs(orient2(a,b,p))<=eps&&p.x>=Math.min(a.x,b.x)-eps&&p.x<=Math.max(a.x,b.x)+eps&&p.y>=Math.min(a.y,b.y)-eps&&p.y<=Math.max(a.y,b.y)+eps;}
function segIntersect2(a,b,c,d,eps){
  const o1=orient2(a,b,c),o2=orient2(a,b,d),o3=orient2(c,d,a),o4=orient2(c,d,b);
  if(((o1>eps&&o2<-eps)||(o1<-eps&&o2>eps))&&((o3>eps&&o4<-eps)||(o3<-eps&&o4>eps)))return true;
  return onSeg2(a,b,c,eps)||onSeg2(a,b,d,eps)||onSeg2(c,d,a,eps)||onSeg2(c,d,b,eps);
}
function pointInTri2(p,a,b,c,eps){const o1=orient2(a,b,p),o2=orient2(b,c,p),o3=orient2(c,a,p);const neg=o1<-eps||o2<-eps||o3<-eps,pos=o1>eps||o2>eps||o3>eps;return !(neg&&pos);}
function coplanarOverlap(a,b,normal,eps){
  const abs=[Math.abs(normal.x),Math.abs(normal.y),Math.abs(normal.z)],axis=abs[0]>=abs[1]&&abs[0]>=abs[2]?0:abs[1]>=abs[2]?1:2;
  const A=a.map(p=>projectPoint(p,axis)),B=b.map(p=>projectPoint(p,axis));
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(segIntersect2(A[i],A[(i+1)%3],B[j],B[(j+1)%3],eps))return true;
  return pointInTri2(A[0],B[0],B[1],B[2],eps)||pointInTri2(B[0],A[0],A[1],A[2],eps);
}
function uniquePoints(points,eps){
  const out=[];for(const p of points)if(!out.some(q=>q.distanceToSquared(p)<=eps*eps))out.push(p);return out;
}
function edgePlaneHit(a,b,plane,eps){
  const da=plane.distanceToPoint(a),db=plane.distanceToPoint(b);
  if(Math.abs(da)<=eps&&Math.abs(db)<=eps)return null;
  if((da>eps&&db>eps)||(da<-eps&&db<-eps))return null;
  const den=da-db;if(Math.abs(den)<=1e-20)return null;
  const t=da/den;if(t<-eps||t>1+eps)return null;
  return a.clone().lerp(b,THREE.MathUtils.clamp(t,0,1));
}
function triangleIntersection(a,b,eps=1e-8){
  if(!triangleBox(a).expandByScalar(eps).intersectsBox(triangleBox(b)))return{intersects:false,coplanar:false,segment:null,point:null};
  const na=triNormal(a),nb=triNormal(b);if(na.lengthSq()<=eps*eps||nb.lengthSq()<=eps*eps)return{intersects:false,coplanar:false,segment:null,point:null};
  na.normalize();nb.normalize();
  const parallel=Math.abs(Math.abs(na.dot(nb))-1)<=1e-8;
  const planeA=new THREE.Plane().setFromNormalAndCoplanarPoint(na,a[0]);
  const planeB=new THREE.Plane().setFromNormalAndCoplanarPoint(nb,b[0]);
  if(parallel){
    const coplanar=Math.abs(planeA.distanceToPoint(b[0]))<=eps;
    return{intersects:coplanar&&coplanarOverlap(a,b,na,eps),coplanar,segment:null,point:null};
  }
  const candidates=[];
  for(let i=0;i<3;i++){const p=edgePlaneHit(a[i],a[(i+1)%3],planeB,eps);if(p&&pointInTriangle(p,b,eps*4))candidates.push(p);}
  for(let i=0;i<3;i++){const p=edgePlaneHit(b[i],b[(i+1)%3],planeA,eps);if(p&&pointInTriangle(p,a,eps*4))candidates.push(p);}
  const points=uniquePoints(candidates,eps*8);
  if(!points.length)return{intersects:false,coplanar:false,segment:null,point:null};
  if(points.length===1)return{intersects:true,coplanar:false,segment:null,point:points[0]};
  let best=[points[0],points[1]],bestSq=best[0].distanceToSquared(best[1]);
  for(let i=0;i<points.length-1;i++)for(let j=i+1;j<points.length;j++){const d=points[i].distanceToSquared(points[j]);if(d>bestSq){best=[points[i],points[j]];bestSq=d;}}
  if(bestSq<=eps*eps)return{intersects:true,coplanar:false,segment:null,point:best[0]};
  return{intersects:true,coplanar:false,segment:{a:best[0],b:best[1],length:Math.sqrt(bestSq)},point:null};
}
function epsilonForMeshes(meshA,meshB,matrixA=null,matrixB=null){
  const box=new THREE.Box3();
  for(const [mesh,matrix] of [[meshA,matrixA],[meshB,matrixB]])for(const v of mesh?.vertices||[])box.expandByPoint(transformPoint(v,matrix));
  const scale=box.isEmpty()?1:(box.getSize(new THREE.Vector3()).length()||1);
  return Math.max(1e-9,scale*1e-8);
}
function faceIntersection(meshA,faceA,meshB,faceB,{matrixA=null,matrixB=null,eps=null}={}){
  const pa=facePoints(meshA,faceA,matrixA),pb=facePoints(meshB,faceB,matrixB);if(pa.length<3||pb.length<3)return{intersects:false,segments:[],points:[],coplanar:false};
  const tolerance=eps??epsilonForMeshes(meshA,meshB,matrixA,matrixB);
  const ta=triangulatePoints(pa),tb=triangulatePoints(pb),segments=[],points=[];let coplanar=false,intersects=false;
  for(let i=0;i<ta.length;i++)for(let j=0;j<tb.length;j++){
    const hit=triangleIntersection(ta[i],tb[j],tolerance);if(!hit.intersects)continue;intersects=true;coplanar ||= hit.coplanar;
    if(hit.segment)segments.push({...hit.segment,triangleA:i,triangleB:j});if(hit.point)points.push(hit.point);
  }
  const uniqueSeg=[];
  for(const s of segments){const duplicate=uniqueSeg.some(q=>(q.a.distanceToSquared(s.a)<=tolerance*tolerance&&q.b.distanceToSquared(s.b)<=tolerance*tolerance)||(q.a.distanceToSquared(s.b)<=tolerance*tolerance&&q.b.distanceToSquared(s.a)<=tolerance*tolerance));if(!duplicate)uniqueSeg.push(s);}
  return{intersects,segments:uniqueSeg,points:uniquePoints(points,tolerance*8),coplanar,eps:tolerance};
}
function meshIntersections(meshA,meshB,{matrixA=null,matrixB=null,skipSharedVertices=false}={}){
  const eps=epsilonForMeshes(meshA,meshB,matrixA,matrixB),pairs=[];
  for(let a=0;a<(meshA?.faces?.length||0);a++)for(let b=0;b<(meshB?.faces?.length||0);b++){
    if(skipSharedVertices&&meshA===meshB){const set=new Set(meshA.faces[a]);if(meshA.faces[b].some(v=>set.has(v)))continue;}
    const hit=faceIntersection(meshA,meshA.faces[a],meshB,meshB.faces[b],{matrixA,matrixB,eps});if(hit.intersects)pairs.push({faceA:a,faceB:b,...hit});
  }
  return{version:VERSION,eps,pairs,pairCount:pairs.length,segmentCount:pairs.reduce((n,p)=>n+p.segments.length,0),coplanarCount:pairs.filter(p=>p.coplanar).length};
}

export {VERSION,facePoints,triangulatePoints,triangleIntersection,faceIntersection,meshIntersections,epsilonForMeshes};
globalThis.__boxlabBooleanIntersections={version:VERSION,faceIntersection,meshIntersections,triangleIntersection,epsilonForMeshes};
