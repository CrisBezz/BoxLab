import * as THREE from 'three';
import { EditableMesh } from './mesh.js';

export function catmullClark(input){
  const mesh=input.clone();
  const oldVerts=mesh.vertices, oldFaces=mesh.faces, edges=mesh.edges();

  const facePoints=oldFaces.map(face=>{
    const p=new THREE.Vector3();
    face.forEach(i=>p.add(oldVerts[i]));
    return p.multiplyScalar(1/face.length);
  });

  const edgePointMap=new Map();
  edges.forEach(edge=>{
    const key=`${edge.a}:${edge.b}`;
    const p=oldVerts[edge.a].clone().add(oldVerts[edge.b]);
    if(edge.faces.length===2){
      p.add(facePoints[edge.faces[0]]).add(facePoints[edge.faces[1]]).multiplyScalar(0.25);
    }else{
      p.multiplyScalar(0.5);
    }
    edgePointMap.set(key,p);
  });

  const vertexFaces=oldVerts.map(()=>[]), vertexEdges=oldVerts.map(()=>[]);
  oldFaces.forEach((face,fi)=>face.forEach(vi=>vertexFaces[vi].push(fi)));
  edges.forEach(edge=>{vertexEdges[edge.a].push(edge);vertexEdges[edge.b].push(edge);});

  const newVertexPositions=oldVerts.map((P,vi)=>{
    const connectedEdges=vertexEdges[vi], connectedFaces=vertexFaces[vi];
    const boundaryEdges=connectedEdges.filter(e=>e.faces.length===1);
    if(boundaryEdges.length>=2){
      const avg=new THREE.Vector3();
      boundaryEdges.map(e=>e.a===vi?oldVerts[e.b]:oldVerts[e.a]).forEach(v=>avg.add(v));
      avg.multiplyScalar(1/boundaryEdges.length);
      return P.clone().multiplyScalar(0.75).addScaledVector(avg,0.25);
    }

    const n=connectedFaces.length||1;
    const F=new THREE.Vector3();
    connectedFaces.forEach(fi=>F.add(facePoints[fi]));
    F.multiplyScalar(1/n);

    const R=new THREE.Vector3();
    connectedEdges.forEach(e=>{
      const other=oldVerts[e.a===vi?e.b:e.a];
      R.add(P).add(other);
    });
    if(connectedEdges.length) R.multiplyScalar(1/(2*connectedEdges.length));

    return F.clone().addScaledVector(R,2).addScaledVector(P,n-3).multiplyScalar(1/n);
  });

  const resultVertices=newVertexPositions.map(v=>v.clone());
  const edgeIndexMap=new Map(), faceIndexMap=new Map();

  edges.forEach(edge=>{
    const key=`${edge.a}:${edge.b}`;
    edgeIndexMap.set(key,resultVertices.length);
    resultVertices.push(edgePointMap.get(key).clone());
  });

  facePoints.forEach((p,fi)=>{
    faceIndexMap.set(fi,resultVertices.length);
    resultVertices.push(p.clone());
  });

  const newFaces=[];
  oldFaces.forEach((face,fi)=>{
    const fp=faceIndexMap.get(fi);
    for(let i=0;i<face.length;i++){
      const v=face[i], prev=face[(i-1+face.length)%face.length], next=face[(i+1)%face.length];
      const prevKey=prev<v?`${prev}:${v}`:`${v}:${prev}`;
      const nextKey=v<next?`${v}:${next}`:`${next}:${v}`;
      newFaces.push([v,edgeIndexMap.get(nextKey),fp,edgeIndexMap.get(prevKey)]);
    }
  });

  return new EditableMesh(resultVertices,newFaces);
}

export function subdivide(mesh,levels=1){
  let out=mesh.clone();
  for(let i=0;i<levels;i++) out=catmullClark(out);
  return out;
}
