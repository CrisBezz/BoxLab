import * as THREE from 'three';
import {createPaintTriangleGraph} from './paint-triangle-graph.js?v=0.36.18.933';
// A read-only sampling plan over the ORIGINAL triangle graph. UV adjacency alone
// never connects surfaces. Only real manifold face edges (or internal diagonals)
// may be crossed. Unsupported edges/corners/long walks simply omit that neighbour.
export function createPaintSeamNeighbours({geometry,size,labels,triangleAt,mesh,payload,topologySignature}){
 const triangles=createPaintTriangleGraph({geometry,mesh,payload,topologySignature});
 const bary=(t,q)=>{const a=t.uv[0],b=t.uv[1],c=t.uv[2],d=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);const w=((b[1]-c[1])*(q[0]-c[0])+(c[0]-b[0])*(q[1]-c[1]))/d,v=((c[1]-a[1])*(q[0]-c[0])+(a[0]-c[0])*(q[1]-c[1]))/d;return [w,v,1-w-v];};
 const world=(t,w)=>new THREE.Vector3().copy(t.p[0]).multiplyScalar(w[0]).addScaledVector(t.p[1],w[1]).addScaledVector(t.p[2],w[2]);
 const uvAt=(t,p)=>{const b=new THREE.Vector3().subVectors(t.p[1],t.p[0]),c=new THREE.Vector3().subVectors(t.p[2],t.p[0]),d=new THREE.Vector3().subVectors(p,t.p[0]),bb=b.dot(b),cc=c.dot(c),bc=b.dot(c),den=bb*cc-bc*bc;if(!Number.isFinite(den)||den<=Math.max(bb*cc,1e-300)*1e-14)return null;const v=(cc*d.dot(b)-bc*d.dot(c))/den,w=(bb*d.dot(c)-bc*d.dot(b))/den;return [0,1].map(k=>t.uv[0][k]*(1-v-w)+t.uv[1][k]*v+t.uv[2][k]*w);};
 let walks=0,crossFaceSamples=0;
 function walk(ti,start,end){
  const visited=new Set();
  for(let step=0;step<8;step++){
   if(++walks>2e6)throw Error('Connected Blur sampling is too complex; use a simpler UV layout');
   const t=triangles[ti],a=bary(t,start),b=bary(t,end);
   if(b.every(w=>w>=-1e-8)){
    const x=Math.round(end[0]*(size-1)),y=Math.round(end[1]*(size-1)),at=x+y*size;
    return x>=0&&x<size&&y>=0&&y<size&&labels[at]===t.face?{at,face:t.face}:null;
   }
   let edge=-1,first=Infinity,tied=false;
   for(let j=0;j<3;j++)if(b[j]<-1e-8&&a[j]>=-1e-7){const f=Math.max(0,a[j])/(Math.max(0,a[j])-b[j]);if(f<first-1e-8){first=f;edge=j;tied=false;}else if(Math.abs(f-first)<1e-8)tied=true;}
   if(edge<0||tied||t.next[edge]<0||visited.has(ti+':'+edge))return null;visited.add(ti+':'+edge);
   const next=triangles[t.next[edge]],ja=(edge+1)%3,jb=(edge+2)%3,A=t.p[ja],B=t.p[jb],E=new THREE.Vector3().subVectors(B,A),length=E.length();if(!length)return null;E.divideScalar(length);
   const other=next.ids.findIndex(id=>id!==t.ids[ja]&&id!==t.ids[jb]);if(other<0)return null;
   const inward=p=>{const v=new THREE.Vector3().subVectors(p,A);v.addScaledVector(E,-v.dot(E));return v.length()>length*1e-10?v.normalize():null;},va=inward(t.p[edge]),vb=inward(next.p[other]);if(!va||!vb)return null;
   const target=world(t,b),delta=new THREE.Vector3().subVectors(target,A),folded=A.clone().addScaledVector(E,delta.dot(E)).addScaledVector(vb,-delta.dot(va));
   const crossing=start.map((v,k)=>v+(end[k]-v)*first),crossWorld=world(t,bary(t,crossing));
   start=uvAt(next,crossWorld);end=uvAt(next,folded);if(!start||!end||![...start,...end].every(Number.isFinite))return null;ti=t.next[edge];
  }
  return null;
 }
 const neighbours=new Int32Array(size*size*4).fill(-1),steps=[[-1,0],[1,0],[0,-1],[0,1]];
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const at=x+y*size,face=labels[at],ti=triangleAt[at];if(face<0||ti<0)continue;
  for(let k=0;k<4;k++){
   const nx=x+steps[k][0],ny=y+steps[k][1],to=nx+ny*size;
   if(nx>=0&&nx<size&&ny>=0&&ny<size&&labels[to]===face){neighbours[at*4+k]=to;continue;}
   const result=walk(ti,[x/(size-1),y/(size-1)],[nx/(size-1),ny/(size-1)]);
   if(result){neighbours[at*4+k]=result.at;if(result.face!==face)crossFaceSamples++;}
  }
 }
 return {neighbours,crossFaceSamples};
}
