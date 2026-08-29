import './loose-bootstrap.js?v=0.30.3';
import { EditableMesh } from './mesh.js';
import * as THREE from 'three';

function signedArea(points){let a=0;for(let i=0;i<points.length;i++){const p=points[i],q=points[(i+1)%points.length];a+=p.x*q.y-q.x*p.y;}return a*.5;}
function cross2(a,b){return a.x*b.y-a.y*b.x;}
function lineIntersection(p,d,q,e){const den=cross2(d,e);if(Math.abs(den)<1e-8)return null;const qp=q.clone().sub(p),t=cross2(qp,e)/den;return p.clone().addScaledVector(d,t);}
function segmentsIntersect(a,b,c,d){
  const ab=b.clone().sub(a),cd=d.clone().sub(c),ac=c.clone().sub(a),den=cross2(ab,cd);
  if(Math.abs(den)<1e-9)return false;
  const t=cross2(ac,cd)/den,u=cross2(ac,ab)/den;
  return t>1e-6&&t<1-1e-6&&u>1e-6&&u<1-1e-6;
}
function selfIntersects(poly){
  const n=poly.length;
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
    if(j===i||j===(i+1)%n||i===(j+1)%n)continue;
    if(i===0&&j===n-1)continue;
    if(segmentsIntersect(poly[i],poly[(i+1)%n],poly[j],poly[(j+1)%n]))return true;
  }
  return false;
}
function basisFor(normal){
  const n=normal.clone().normalize(),helper=Math.abs(n.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);
  const u=new THREE.Vector3().crossVectors(helper,n).normalize();
  const v=new THREE.Vector3().crossVectors(n,u).normalize();
  return {u,v,n};
}
function offsetPolygon(points,distance){
  const area=signedArea(points);if(Math.abs(area)<1e-9)return null;
  const ccw=area>0,n=points.length,out=[];
  for(let i=0;i<n;i++){
    const prev=points[(i+n-1)%n],curr=points[i],next=points[(i+1)%n];
    const d0=curr.clone().sub(prev),d1=next.clone().sub(curr);if(d0.lengthSq()<1e-10||d1.lengthSq()<1e-10)return null;
    d0.normalize();d1.normalize();
    const n0=ccw?new THREE.Vector2(-d0.y,d0.x):new THREE.Vector2(d0.y,-d0.x);
    const n1=ccw?new THREE.Vector2(-d1.y,d1.x):new THREE.Vector2(d1.y,-d1.x);
    const p0=curr.clone().addScaledVector(n0,distance),p1=curr.clone().addScaledVector(n1,distance);
    let hit=lineIntersection(p0,d0,p1,d1);
    if(!hit){const avg=n0.clone().add(n1);if(avg.lengthSq()<1e-10)avg.copy(n0);hit=curr.clone().addScaledVector(avg.normalize(),distance);}
    const miter=hit.distanceTo(curr);if(!Number.isFinite(hit.x)||!Number.isFinite(hit.y)||miter>Math.max(distance*8,distance+.001))return null;
    out.push(hit);
  }
  const newArea=signedArea(out);if(Math.sign(newArea)!==Math.sign(area)||Math.abs(newArea)<1e-8||selfIntersects(out))return null;
  return out;
}
function weightedDisplacement(p,boundary2,boundaryDisp){
  let sum=0;const out=new THREE.Vector2();
  for(let i=0;i<boundary2.length;i++){
    const ds=p.distanceToSquared(boundary2[i]);if(ds<1e-12)return boundaryDisp[i].clone();
    const w=1/ds;out.addScaledVector(boundaryDisp[i],w);sum+=w;
  }
  return sum?out.multiplyScalar(1/sum):out;
}

EditableMesh.prototype.insetFaceRegion=function(faceIndices,amount=.2){
  const ids=[...new Set(faceIndices||[])].filter(i=>Number.isInteger(i)&&this.faces[i]);
  let info;
  if(ids.length===1){const faceIndex=ids[0],face=this.faces[faceIndex];info={faceIndices:[faceIndex],boundaryLoop:[...face],regionVertices:[...new Set(face)]};}
  else info=this.faceRegionInfo?.(ids);
  if(!info||info.boundaryLoop.length<3)return null;
  const normal=this.faceRegionNormal?.(info.faceIndices);if(!normal||normal.lengthSq()<1e-10)return null;
  const t=THREE.MathUtils.clamp(Number(amount)||.2,.01,.95),{u,v}=basisFor(normal),origin=this.vertices[info.boundaryLoop[0]].clone();
  const to2=p=>new THREE.Vector2(p.clone().sub(origin).dot(u),p.clone().sub(origin).dot(v));
  const boundary2=info.boundaryLoop.map(i=>to2(this.vertices[i]));
  let minEdge=Infinity;for(let i=0;i<boundary2.length;i++)minEdge=Math.min(minEdge,boundary2[i].distanceTo(boundary2[(i+1)%boundary2.length]));
  if(!Number.isFinite(minEdge)||minEdge<1e-8)return null;
  const requested=minEdge*.5*t;let distance=requested,inner=null;
  for(let tries=0;tries<10&&!inner;tries++){inner=offsetPolygon(boundary2,distance);if(!inner)distance*=.7;}
  if(!inner||distance<1e-7)return null;
  const boundaryDisp=inner.map((p,i)=>p.clone().sub(boundary2[i])),boundaryIndex=new Map(info.boundaryLoop.map((id,i)=>[id,i])),replacement=new Map();
  for(const vertex of info.regionVertices){
    const old=this.vertices[vertex],p2=to2(old);let disp;
    const bi=boundaryIndex.get(vertex);disp=bi!==undefined?boundaryDisp[bi]:weightedDisplacement(p2,boundary2,boundaryDisp);
    const copy=old.clone().addScaledVector(u,disp.x).addScaledVector(v,disp.y);this.vertices.push(copy);replacement.set(vertex,this.vertices.length-1);
  }
  for(const faceIndex of info.faceIndices)this.faces[faceIndex]=this.faces[faceIndex].map(vertex=>replacement.get(vertex));
  const sideStart=this.faces.length;
  for(let i=0;i<info.boundaryLoop.length;i++){
    const a=info.boundaryLoop[i],b=info.boundaryLoop[(i+1)%info.boundaryLoop.length];
    this.faces.push([a,b,replacement.get(b),replacement.get(a)]);
  }
  this.edges();
  return {faceIndices:[...info.faceIndices],sideFaceIndices:Array.from({length:info.boundaryLoop.length},(_,i)=>sideStart+i),amount:t,distance,requestedDistance:requested,mode:'uniform-offset'};
};

EditableMesh.prototype.insetFaceRegions=function(faceIndices,amount=.2){
  const group=this.faceRegionsInfo?.(faceIndices);if(!group)return null;const results=[];
  for(const region of group.regions){const result=this.insetFaceRegion(region.faceIndices,amount);if(!result)return null;results.push(result);}
  return {faceIndices:[...group.faceIndices],regions:results,regionCount:results.length,amount,mode:'uniform-offset'};
};
