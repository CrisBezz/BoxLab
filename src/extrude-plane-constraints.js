import * as THREE from 'three';

// Shared world-plane vectors only. Original Extrude owners retain gestures,
// topology, validation, selection and history.
export function extrudePlaneNormal(value){
  return value==='xy'?new THREE.Vector3(0,0,1):value==='xz'?new THREE.Vector3(0,1,0):value==='yz'?new THREE.Vector3(1,0,0):null;
}
export function projectExtrudePlaneDelta(delta,value){
  const normal=extrudePlaneNormal(value);
  if(!normal||!delta?.clone||![delta.x,delta.y,delta.z].every(Number.isFinite))return null;
  const out=delta.clone();out[normal.x?'x':normal.y?'y':'z']=0;return out;
}
export function extrudePlaneDeltaIsUsable(delta,edge=null){
  return !!delta&&delta.lengthSq()>1e-18&&(!edge||delta.clone().cross(edge).lengthSq()>delta.lengthSq()*edge.lengthSq()*1e-12);
}
export function extrudePlaneExactDirection(value,last,viewUp,edge=null){
  const normal=extrudePlaneNormal(value),across=normal&&edge?normal.clone().cross(edge):null;
  for(const candidate of [last,viewUp,across,new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0)]){
    const delta=projectExtrudePlaneDelta(candidate,value);
    if(extrudePlaneDeltaIsUsable(delta,edge))return delta.normalize();
  }
  return null;
}
