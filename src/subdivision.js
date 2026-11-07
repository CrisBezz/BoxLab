import * as THREE from 'three';
import { EditableMesh } from './mesh.js';

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

export const MAX_CORNER_UV_SUBDIVISION_FACES=16384;
export const MAX_CORNER_UV_SUBDIVISION_CORNERS=80000;

function validateCornerUVs(mesh,cornerUVs){
  if(!mesh||!Array.isArray(mesh.faces)||!Array.isArray(cornerUVs)||cornerUVs.length!==mesh.faces.length)
    throw new Error('Corner UV subdivision requires one UV list per face');
  return cornerUVs.map((faceUV,faceIndex)=>{
    if(!Array.isArray(faceUV)||faceUV.length!==mesh.faces[faceIndex]?.length||faceUV.length<3||
       faceUV.some(uv=>!Array.isArray(uv)||uv.length!==2||!uv.every(Number.isFinite)))
      throw new Error(`Corner UV subdivision has invalid UVs on face ${faceIndex}`);
    return faceUV.map(([u,v])=>[u,v]);
  });
}

function uvMidpoint(a,b){return[(a[0]+b[0])*.5,(a[1]+b[1])*.5];}

function subdivideCornerUVs(faces,edges,cornerUVs,creases){
  const cornerIds=faces.map(face=>face.map(()=>-1)),parent=[],uvs=[];
  const find=x=>{while(parent[x]!==x){parent[x]=parent[parent[x]];x=parent[x];}return x;};
  const unite=(a,b)=>{const ra=find(a),rb=find(b);if(ra!==rb)parent[rb]=ra;};
  let cornerCount=0;
  faces.forEach((face,fi)=>face.forEach((_,ci)=>{cornerIds[fi][ci]=cornerCount;parent.push(cornerCount);uvs.push(cornerUVs[fi][ci]);cornerCount++;}));

  // Join face corners only across a shared geometric edge whose UVs agree at
  // both endpoints. This keeps chart boundaries separate for smoothing.
  for(const edge of edges){
    if(edge.faces.length!==2)continue;
    const [fa,fb]=edge.faces,findCorner=(fi,vi)=>faces[fi].indexOf(vi);
    const a0=findCorner(fa,edge.a),a1=findCorner(fa,edge.b),b0=findCorner(fb,edge.a),b1=findCorner(fb,edge.b);
    if(a0<0||a1<0||b0<0||b1<0)continue;
    const same=(a,b)=>cornerUVs[fa][a][0]===cornerUVs[fb][b][0]&&cornerUVs[fa][a][1]===cornerUVs[fb][b][1];
    if(same(a0,b0)&&same(a1,b1)){unite(cornerIds[fa][a0],cornerIds[fb][b0]);unite(cornerIds[fa][a1],cornerIds[fb][b1]);}
  }
  const rootIds=new Map(),logicalUVs=[],logicalFaces=faces.map((face,fi)=>face.map((_,ci)=>{
    const root=find(cornerIds[fi][ci]);let id=rootIds.get(root);
    if(id===undefined){id=logicalUVs.length;rootIds.set(root,id);logicalUVs.push([...uvs[root]]);}
    return id;
  }));
  const uvEdges=new Map(),uvVertexFaces=logicalUVs.map(()=>[]),uvVertexEdges=logicalUVs.map(()=>[]);
  const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
  logicalFaces.forEach((face,fi)=>{
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],k=key(a,b),geomA=faces[fi][i],geomB=faces[fi][(i+1)%face.length];
      let edge=uvEdges.get(k);
      if(!edge){edge={a,b,faces:[],crease:creases.get(edgeKey(geomA,geomB))||0};uvEdges.set(k,edge);uvVertexEdges[a].push(edge);uvVertexEdges[b].push(edge);}
      edge.faces.push(fi);
      if(!uvVertexFaces[a].includes(fi))uvVertexFaces[a].push(fi);
      if(!uvVertexFaces[b].includes(fi))uvVertexFaces[b].push(fi);
    }
  });
  const facePoints=logicalFaces.map(face=>{
    const p=[0,0];for(const id of face){p[0]+=logicalUVs[id][0];p[1]+=logicalUVs[id][1];}
    p[0]/=face.length;p[1]/=face.length;return p;
  });
  const edgePoints=new Map();
  for(const [k,edge] of uvEdges){
    const a=logicalUVs[edge.a],b=logicalUVs[edge.b],mid=uvMidpoint(a,b);let point=mid;
    if(edge.faces.length===2){const f0=facePoints[edge.faces[0]],f1=facePoints[edge.faces[1]];point=[(a[0]+b[0]+f0[0]+f1[0])*.25,(a[1]+b[1]+f0[1]+f1[1])*.25];}
    if(edge.crease>0){const w=Math.min(1,edge.crease);point=[point[0]*(1-w)+mid[0]*w,point[1]*(1-w)+mid[1]*w];}
    edgePoints.set(k,point);
  }
  const vertexPoints=logicalUVs.map((point,vi)=>{
    const incidentEdges=uvVertexEdges[vi],incidentFaces=uvVertexFaces[vi],boundary=incidentEdges.filter(e=>e.faces.length===1);
    if(boundary.length>=2){const avg=[0,0];for(const e of boundary){const other=e.a===vi?e.b:e.a;avg[0]+=logicalUVs[other][0];avg[1]+=logicalUVs[other][1];}avg[0]/=boundary.length;avg[1]/=boundary.length;return[point[0]*.75+avg[0]*.25,point[1]*.75+avg[1]*.25];}
    const n=incidentFaces.length||1,F=[0,0],R=[0,0];
    for(const fi of incidentFaces){F[0]+=facePoints[fi][0];F[1]+=facePoints[fi][1];}F[0]/=n;F[1]/=n;
    for(const e of incidentEdges){const other=e.a===vi?e.b:e.a;R[0]+=point[0]+logicalUVs[other][0];R[1]+=point[1]+logicalUVs[other][1];}
    if(incidentEdges.length){R[0]/=2*incidentEdges.length;R[1]/=2*incidentEdges.length;}
    let smooth=[(F[0]+2*R[0]+(n-3)*point[0])/n,(F[1]+2*R[1]+(n-3)*point[1])/n];
    const creased=incidentEdges.filter(e=>e.crease>0).sort((a,b)=>b.crease-a.crease);
    if(creased.length===1){const w=Math.min(1,creased[0].crease*.75);smooth=[smooth[0]*(1-w)+point[0]*w,smooth[1]*(1-w)+point[1]*w];}
    else if(creased.length===2){const p1=logicalUVs[creased[0].a===vi?creased[0].b:creased[0].a],p2=logicalUVs[creased[1].a===vi?creased[1].b:creased[1].a],sharp=[point[0]*.75+p1[0]*.125+p2[0]*.125,point[1]*.75+p1[1]*.125+p2[1]*.125],w=Math.min(1,(creased[0].crease+creased[1].crease)*.5);smooth=[smooth[0]*(1-w)+sharp[0]*w,smooth[1]*(1-w)+sharp[1]*w];}
    else if(creased.length>=3){const w=Math.min(1,(creased[0].crease+creased[1].crease+creased[2].crease)/3);smooth=[smooth[0]*(1-w)+point[0]*w,smooth[1]*(1-w)+point[1]*w];}
    return smooth;
  });
  const childUVs=[];
  faces.forEach((face,fi)=>{
    for(let i=0;i<face.length;i++){
      const ids=logicalFaces[fi],v=ids[i],next=ids[(i+1)%face.length],prev=ids[(i-1+face.length)%face.length];
      childUVs.push([[...vertexPoints[v]],[...edgePoints.get(key(v,next))],[...facePoints[fi]],[...edgePoints.get(key(prev,v))]]);
    }
  });
  return childUVs;
}

function catmullClarkStep(input,cornerUVs=null){
  const mesh=input.clone();
  const oldVerts=mesh.vertices, oldFaces=mesh.faces, edges=mesh.edges();
  const childCornerUVs=cornerUVs?subdivideCornerUVs(oldFaces,edges,cornerUVs,mesh.creases):null;
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

  const newFaces=[],newFaceGroups=[],nextCornerUVs=cornerUVs?[]:null;let uvChildOffset=0;
  oldFaces.forEach((face,fi)=>{
    const fp=faceIndexMap.get(fi);
    for(let i=0;i<face.length;i++){
      const v=face[i],prev=face[(i-1+face.length)%face.length],next=face[(i+1)%face.length];
      newFaces.push([v,edgeIndexMap.get(edgeKey(v,next)),fp,edgeIndexMap.get(edgeKey(prev,v))]);
      newFaceGroups.push(mesh.faceGroups?.[fi]??null);
      if(nextCornerUVs)nextCornerUVs.push(childCornerUVs[uvChildOffset+i]);
    }
    uvChildOffset+=face.length;
  });

  const nextCreases=new Map();
  edges.forEach(edge=>{
    const key=edgeKey(edge.a,edge.b),w=mesh.creases.get(key)||0;
    if(w<=0)return;
    const ep=edgeIndexMap.get(key);
    nextCreases.set(edgeKey(edge.a,ep),w);
    nextCreases.set(edgeKey(ep,edge.b),w);
  });

  return {mesh:new EditableMesh(resultVertices,newFaces,nextCreases,newFaceGroups),cornerUVs:nextCornerUVs};
}

export function catmullClark(input){return catmullClarkStep(input).mesh;}

export function subdivide(mesh,levels=1){
  let out=mesh.clone();
  for(let i=0;i<levels;i++)out=catmullClarkStep(out).mesh;
  return out;
}

// UVs stay per face corner so chart seams do not collapse onto shared geometry vertices.
// This reuses the exact same Catmull–Clark steps as the modelling/display/export owners.
export function subdivideWithCornerUVs(mesh,cornerUVs,levels=1){
  if(!Number.isInteger(levels)||levels<0||levels>4)throw new Error('Corner UV subdivision level must be an integer from 0 to 4');
  let outUVs=validateCornerUVs(mesh,cornerUVs);
  const sourceCorners=mesh.faces.reduce((n,face)=>n+face.length,0);
  const outputFaces=levels===0?mesh.faces.length:sourceCorners*(4**(levels-1));
  const outputCorners=levels===0?sourceCorners:outputFaces*4;
  if(outputFaces>MAX_CORNER_UV_SUBDIVISION_FACES||outputCorners>MAX_CORNER_UV_SUBDIVISION_CORNERS)
    throw new Error(`Corner UV subdivision exceeds the ${MAX_CORNER_UV_SUBDIVISION_FACES}-face / ${MAX_CORNER_UV_SUBDIVISION_CORNERS}-corner preview limit`);
  let out=mesh.clone();
  for(let i=0;i<levels;i++){
    const step=catmullClarkStep(out,outUVs);out=step.mesh;outUVs=step.cornerUVs;
  }
  return {mesh:out,cornerUVs:outUVs};
}
