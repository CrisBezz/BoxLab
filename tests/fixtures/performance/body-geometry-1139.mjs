import * as THREE from 'three';
export const prior={
  triangulatedGeometry(){
    const positions=[];
    this.faces.forEach(face=>{
      for(let i=1;i<face.length-1;i++) [face[0],face[i],face[i+1]].forEach(vi=>{const v=this.vertices[vi];positions.push(v.x,v.y,v.z);});
    });
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geometry.computeVertexNormals();
    return geometry;
  }
}.triangulatedGeometry;
