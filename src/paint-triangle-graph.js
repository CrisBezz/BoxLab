import * as THREE from 'three';
import {inspectImportedUV} from './imported-uv-inspection.js?v=0.36.18.932';
// Shared read-only graph of the original preview triangles. Never triangulates,
// welds positions, calls mesh.edges(), or crosses non-manifold polygon edges.
export function createPaintTriangleGraph({geometry,mesh,payload,topologySignature,matrixWorld=null}){
 const report=inspectImportedUV(mesh,payload,topologySignature,{includeEdgeOwners:true});
 const faces=geometry.userData.boxlabTriangleFaces,vertices=geometry.userData.boxlabTriangleVertices,index=geometry.index,pos=geometry.attributes.position,uv=geometry.attributes.uv,count=index?.count??pos.count;
 if(!Number.isInteger(count)||count%3||count>60000||!Array.isArray(faces)||faces.length!==count/3)throw Error('Invalid original triangle ownership');
 if(report.state!=='ready'||report.missingFaces||!report.edgeOwners||!Array.isArray(vertices)||vertices.length!==count||vertices.some((v,i)=>!Number.isInteger(v)||!mesh.faces[faces[Math.floor(i/3)]]?.includes(v)))throw Error('Surface sampling needs current original face/vertex ownership');
 const triangles=[],edges=new Map(),key=(a,b)=>a<b?a+':'+b:b+':'+a;
 for(let i=0;i<count;i+=3){
  const ids=[0,1,2].map(k=>index?index.getX(i+k):i+k),t={face:faces[i/3],ids:vertices.slice(i,i+3),p:ids.map(n=>{const p=new THREE.Vector3().fromBufferAttribute(pos,n);return matrixWorld?p.applyMatrix4(matrixWorld):p;}),uv:ids.map(n=>[uv.getX(n),uv.getY(n)]),next:[-1,-1,-1]};triangles.push(t);
  for(let j=0;j<3;j++){const k=key(t.ids[(j+1)%3],t.ids[(j+2)%3]);if(!edges.has(k))edges.set(k,[]);edges.get(k).push({ti:i/3,j});}
 }
 for(const [k,owners] of edges){
  if(owners.length!==2)continue;const [a,b]=owners,ta=triangles[a.ti],tb=triangles[b.ti],original=report.edgeOwners.get(k);
  const internal=ta.face===tb.face&&!original?.some(o=>o.fi===ta.face),manifold=ta.face!==tb.face&&original?.length===2&&original[0].fi!==original[1].fi&&original.some(o=>o.fi===ta.face)&&original.some(o=>o.fi===tb.face);
  if(internal||manifold){ta.next[a.j]=b.ti;tb.next[b.j]=a.ti;}
 }
 return triangles;
}
