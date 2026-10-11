import * as THREE from 'three';

export const SURFACE_TRANSFORM_MODES=['move','rotate','scale'];

export function cycleSurfaceTransformMode(mode){
  const index=SURFACE_TRANSFORM_MODES.indexOf(mode);
  return SURFACE_TRANSFORM_MODES[(index<0?0:index+1)%SURFACE_TRANSFORM_MODES.length];
}

export function surfaceAlignmentQuaternion(normal,sourceAxis=new THREE.Vector3(0,1,0),{oppose=false}={}){
  const n=normal?.clone?.()||new THREE.Vector3(0,1,0);
  if(n.lengthSq()<1e-12)n.set(0,1,0);
  n.normalize();
  if(oppose)n.negate();
  const axis=sourceAxis?.clone?.()||new THREE.Vector3(0,1,0);
  if(axis.lengthSq()<1e-12)axis.set(0,1,0);
  axis.normalize();
  return new THREE.Quaternion().setFromUnitVectors(axis,n);
}

export function surfaceTransformMesh(source,{
  sourceCenter=null,
  sourceAnchor=null,
  sourceNormal=null,
  point=new THREE.Vector3(),
  normal=new THREE.Vector3(0,1,0),
  spin=0,
  scale=1,
  sourceAxis=new THREE.Vector3(0,1,0),
  oppose=false
}={}){
  if(!source?.clone||!source?.vertices?.length)return null;
  const out=source.clone();
  const center=sourceAnchor?.clone?.()||sourceCenter?.clone?.()||(()=>{
    const box=new THREE.Box3().setFromPoints(source.vertices),c=new THREE.Vector3();
    return box.isEmpty()?c:box.getCenter(c);
  })();
  const n=normal.clone();
  if(n.lengthSq()<1e-12)n.set(0,1,0);
  n.normalize();
  const qAlign=surfaceAlignmentQuaternion(n,sourceNormal||sourceAxis,{oppose});
  const qSpin=new THREE.Quaternion().setFromAxisAngle(n,Number(spin)||0);
  const s=THREE.MathUtils.clamp(Number(scale)||1,.0001,1e4);
  for(const v of out.vertices)v.sub(center).multiplyScalar(s).applyQuaternion(qAlign).applyQuaternion(qSpin).add(point);
  return out;
}
