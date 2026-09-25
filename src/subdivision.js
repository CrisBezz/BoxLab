import * as THREE from 'three';
import { EditableMesh } from './mesh.js';

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function catmullClarkStep(input){
  const mesh=input.clone();
  const oldVerts=mesh.vertices, oldFaces=mesh.faces, edges=mesh.edges();
  const facePoints=oldFaces.map(face=>{
    const p=new THREE.Vector3();
    face.forEach(i=>p.add(oldVerts[i]));
    return p.multiplyScalar(1/face.length);
  });

  const edgePointMap=new Map();
  edges.forEach(edge=>{
    const key=edgeKey(edge.a,edge.b);
    const midpoint=oldVerts[edge.a].clone().add(oldVerts[edge.b]).multiplyScalar(.5);
    const smooth=midpoint.clone();
    if(edge.faces.length===2){
      smooth.copy(oldVerts[edge.a])
        .add(oldVerts[edge.b])
        .add(facePoints[edge.faces[0]])
        .add(facePoints[edge.faces[1]])
        .multiplyScalar(.25);
    }
    const w=mesh.creases.get(key)||0;
    edgePointMap.set(key,smooth.lerp(midpoint,w));
  });

  const vertexFaces=oldVerts.map(()=>[]),vertexEdges=oldVerts.map(()=>[]);
  oldFaces.forEach((face,fi)=>face.forEach(vi=>vertexFaces[vi].push(fi)));
  edges.forEach(edge=>{vertexEdges[edge.a].push(edge);vertexEdges[edge.b].push(edge);});

  const newVertexPositions=oldVerts.map((P,vi)=>{
    const connectedEdges=vertexEdges[vi],connectedFaces=vertexFaces[vi];
    const boundaryEdges=connectedEdges.filter(e=>e.faces.length===1);
    if(boundaryEdges.length>=2){
      const avg=new THREE.Vector3();
      boundaryEdges.map(e=>e.a===vi?oldVerts[e.b]:oldVerts[e.a]).forEach(v=>avg.add(v));
      avg.multiplyScalar(1/boundaryEdges.length);
      return P.clone().multiplyScalar(.75).addScaledVector(avg,.25);
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
    if(connectedEdges.length)R.multiplyScalar(1/(2*connectedEdges.length));
    const smooth=F.clone().addScaledVector(R,2).addScaledVector(P,n-3).multiplyScalar(1/n);

    const creased=connectedEdges
      .map(e=>({edge:e,w:mesh.creases.get(edgeKey(e.a,e.b))||0}))
      .filter(x=>x.w>0)
      .sort((a,b)=>b.w-a.w);

    if(!creased.length)return smooth;

    // One creased edge: retain more of the original vertex so a single
    // selected crease is visibly sharp instead of only moving its midpoint.
    if(creased.length===1){
      const w=THREE.MathUtils.clamp(creased[0].w,0,1);
      return smooth.lerp(P.clone(),w*.75);
    }

    // Two creased edges: standard crease-vertex rule, blended by strength.
    if(creased.length===2){
      const n1=oldVerts[creased[0].edge.a===vi?creased[0].edge.b:creased[0].edge.a];
      const n2=oldVerts[creased[1].edge.a===vi?creased[1].edge.b:creased[1].edge.a];
      const sharp=P.clone().multiplyScalar(.75).addScaledVector(n1,.125).addScaledVector(n2,.125);
      const w=Math.min(1,(creased[0].w+creased[1].w)*.5);
      return smooth.lerp(sharp,w);
    }

    // Three or more creased edges meet at a corner: preserve the vertex.
    const cornerWeight=Math.min(1,(creased[0].w+creased[1].w+creased[2].w)/3);
    return smooth.lerp(P.clone(),cornerWeight);
  });

  const resultVertices=newVertexPositions.map(v=>v.clone());
  const edgeIndexMap=new Map(),faceIndexMap=new Map();
  edges.forEach(edge=>{
    const key=edgeKey(edge.a,edge.b);
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
      const v=face[i],prev=face[(i-1+face.length)%face.length],next=face[(i+1)%face.length];
      newFaces.push([v,edgeIndexMap.get(edgeKey(v,next)),fp,edgeIndexMap.get(edgeKey(prev,v))]);
    }
  });

  const nextCreases=new Map();
  edges.forEach(edge=>{
    const key=edgeKey(edge.a,edge.b),w=mesh.creases.get(key)||0;
    if(w<=0)return;
    const ep=edgeIndexMap.get(key);
    nextCreases.set(edgeKey(edge.a,ep),w);
    nextCreases.set(edgeKey(ep,edge.b),w);
  });

  return new EditableMesh(resultVertices,newFaces,nextCreases);
}

export function catmullClark(input){return catmullClarkStep(input);}

export function subdivide(mesh,levels=1){
  let out=mesh.clone();
  for(let i=0;i<levels;i++)out=catmullClarkStep(out);
  return out;
}
