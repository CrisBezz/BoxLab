import * as THREE from 'three';

const EPS=1e-9;

export function matrixForInstance(object){
  const a=object?.instanceMatrix;
  return Array.isArray(a)&&a.length===16?new THREE.Matrix4().fromArray(a):new THREE.Matrix4();
}

export function setInstanceMatrix(object,matrix){
  if(!object||!matrix?.elements)return false;
  object.instanceMatrix=matrix.elements.slice();
  return true;
}

export function transformEditableMesh(mesh,matrix){
  if(!mesh?.clone||!matrix)return null;
  const out=mesh.clone();
  for(const v of out.vertices||[])v.applyMatrix4(matrix);
  out.edges?.();
  return out;
}

function meshScale(mesh){
  const box=new THREE.Box3();
  for(const v of mesh?.vertices||[])box.expandByPoint(v);
  return box.isEmpty()?1:Math.max(1,box.getSize(new THREE.Vector3()).length());
}

export function meshTopologyMatches(a,b){
  if(!a||!b||a.vertices?.length!==b.vertices?.length||a.faces?.length!==b.faces?.length)return false;
  for(let i=0;i<a.faces.length;i++){
    const x=a.faces[i],y=b.faces[i];
    if(!Array.isArray(x)||!Array.isArray(y)||x.length!==y.length)return false;
    for(let j=0;j<x.length;j++)if(x[j]!==y[j])return false;
  }
  return true;
}

export function meshesNear(a,b,relativeEps=1e-7){
  if(!meshTopologyMatches(a,b))return false;
  const eps=Math.max(EPS,Math.max(meshScale(a),meshScale(b))*relativeEps);
  const eps2=eps*eps;
  for(let i=0;i<a.vertices.length;i++)if(a.vertices[i].distanceToSquared(b.vertices[i])>eps2)return false;
  return true;
}

function basisIndices3D(mesh){
  const v=mesh?.vertices||[];
  if(v.length<4)return null;
  const p0=v[0];
  let i1=-1,i2=-1,i3=-1;
  for(let i=1;i<v.length;i++)if(v[i].distanceToSquared(p0)>EPS){i1=i;break;}
  if(i1<0)return null;
  const a=v[i1].clone().sub(p0);
  for(let i=1;i<v.length;i++){
    if(i===i1)continue;
    const b=v[i].clone().sub(p0);
    if(new THREE.Vector3().crossVectors(a,b).lengthSq()>EPS){i2=i;break;}
  }
  if(i2<0)return null;
  const b=v[i2].clone().sub(p0),n=new THREE.Vector3().crossVectors(a,b);
  for(let i=1;i<v.length;i++){
    if(i===i1||i===i2)continue;
    const c=v[i].clone().sub(p0);
    if(Math.abs(n.dot(c))>EPS){i3=i;break;}
  }
  return i3<0?null:[0,i1,i2,i3];
}

function basisIndicesPlane(mesh){
  const v=mesh?.vertices||[];
  if(v.length<3)return null;
  const p0=v[0];
  let i1=-1,i2=-1;
  for(let i=1;i<v.length;i++)if(v[i].distanceToSquared(p0)>EPS){i1=i;break;}
  if(i1<0)return null;
  const a=v[i1].clone().sub(p0);
  for(let i=1;i<v.length;i++){
    if(i===i1)continue;
    const b=v[i].clone().sub(p0);
    if(new THREE.Vector3().crossVectors(a,b).lengthSq()>EPS){i2=i;break;}
  }
  return i2<0?null:[0,i1,i2];
}

function frame4(mesh,ids){
  const [i0,i1,i2,i3]=ids,p0=mesh.vertices[i0];
  const a=mesh.vertices[i1].clone().sub(p0);
  const b=mesh.vertices[i2].clone().sub(p0);
  const c=mesh.vertices[i3].clone().sub(p0);
  return new THREE.Matrix4().set(
    a.x,b.x,c.x,p0.x,
    a.y,b.y,c.y,p0.y,
    a.z,b.z,c.z,p0.z,
    0,0,0,1
  );
}

function framePlane(mesh,ids){
  const [i0,i1,i2]=ids,p0=mesh.vertices[i0];
  const a=mesh.vertices[i1].clone().sub(p0);
  const b=mesh.vertices[i2].clone().sub(p0);
  const n=new THREE.Vector3().crossVectors(a,b);
  const scale=Math.sqrt(Math.max(EPS,a.length()*b.length()));
  n.normalize().multiplyScalar(scale);
  return new THREE.Matrix4().set(
    a.x,b.x,n.x,p0.x,
    a.y,b.y,n.y,p0.y,
    a.z,b.z,n.z,p0.z,
    0,0,0,1
  );
}

function centroid(mesh){
  const c=new THREE.Vector3();
  for(const v of mesh?.vertices||[])c.add(v);
  return mesh?.vertices?.length?c.multiplyScalar(1/mesh.vertices.length):c;
}

function candidateError(local,world,matrix){
  if(!meshTopologyMatches(local,world))return Infinity;
  let max=0;
  for(let i=0;i<local.vertices.length;i++){
    const d=local.vertices[i].clone().applyMatrix4(matrix).distanceToSquared(world.vertices[i]);
    if(d>max)max=d;
  }
  return Math.sqrt(max);
}

export function deriveInstancePlacement(local,world){
  if(!meshTopologyMatches(local,world))return null;
  const tolerance=Math.max(EPS,Math.max(meshScale(local),meshScale(world))*2e-6);
  const ids3=basisIndices3D(local);
  if(ids3){
    try{
      const localFrame=frame4(local,ids3),worldFrame=frame4(world,ids3);
      const matrix=worldFrame.multiply(localFrame.invert());
      if(candidateError(local,world,matrix)<=tolerance)return matrix;
    }catch{}
  }
  const ids2=basisIndicesPlane(local);
  if(ids2){
    try{
      const localFrame=framePlane(local,ids2),worldFrame=framePlane(world,ids2);
      const matrix=worldFrame.multiply(localFrame.invert());
      if(candidateError(local,world,matrix)<=tolerance)return matrix;
    }catch{}
  }
  const delta=centroid(world).sub(centroid(local));
  const translation=new THREE.Matrix4().makeTranslation(delta.x,delta.y,delta.z);
  return candidateError(local,world,translation)<=tolerance?translation:null;
}

export function localMeshFromWorld(world,instanceMatrix){
  if(!world?.clone||!instanceMatrix)return null;
  try{
    const inverse=instanceMatrix.clone().invert();
    return transformEditableMesh(world,inverse);
  }catch{return null;}
}
