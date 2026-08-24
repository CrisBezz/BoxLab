import * as THREE from 'three';

export class EditableMesh {
  constructor(vertices, faces) {
    this.vertices = vertices.map(v => v.clone ? v.clone() : new THREE.Vector3(...v));
    this.faces = faces.map(f => [...f]);
  }

  static cube(size = 2) {
    const s = size / 2;
    return new EditableMesh(
      [[-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],[-s,-s,s],[s,-s,s],[s,s,s],[-s,s,s]],
      [[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[0,1,5,4],[3,7,6,2]]
    );
  }

  clone(){ return new EditableMesh(this.vertices,this.faces); }

  edges(){
    const map=new Map();
    this.faces.forEach((face,faceIndex)=>{
      for(let i=0;i<face.length;i++){
        const a=face[i], b=face[(i+1)%face.length];
        const key=a<b?`${a}:${b}`:`${b}:${a}`;
        if(!map.has(key)) map.set(key,{a:Math.min(a,b),b:Math.max(a,b),faces:[]});
        map.get(key).faces.push(faceIndex);
      }
    });
    return [...map.values()];
  }

  faceCenter(faceIndex){
    const face=this.faces[faceIndex], c=new THREE.Vector3();
    face.forEach(i=>c.add(this.vertices[i]));
    return c.multiplyScalar(1/face.length);
  }

  faceNormal(faceIndex){
    const f=this.faces[faceIndex];
    if(!f||f.length<3) return new THREE.Vector3(0,1,0);
    const a=this.vertices[f[0]], b=this.vertices[f[1]], c=this.vertices[f[2]];
    return new THREE.Vector3().crossVectors(new THREE.Vector3().subVectors(b,a),new THREE.Vector3().subVectors(c,a)).normalize();
  }

  componentVertexIndices(selection){
    if(!selection) return [];
    if(selection.type==='vertex') return [selection.index];
    if(selection.type==='edge'){
      const e=this.edges()[selection.index];
      return e?[e.a,e.b]:[];
    }
    if(selection.type==='face') return [...this.faces[selection.index]];
    return [];
  }

  moveComponent(selection,delta){ this.componentVertexIndices(selection).forEach(i=>this.vertices[i].add(delta)); }

  scaleComponent(selection,factor){
    const indices=this.componentVertexIndices(selection);
    if(!indices.length) return;
    const center=new THREE.Vector3();
    indices.forEach(i=>center.add(this.vertices[i]));
    center.multiplyScalar(1/indices.length);
    indices.forEach(i=>this.vertices[i].sub(center).multiplyScalar(factor).add(center));
  }

  extrudeFace(faceIndex,distance=0.25){
    const face=this.faces[faceIndex];
    if(!face) return null;
    const normal=this.faceNormal(faceIndex);
    const newIndices=face.map(oldIndex=>{
      const v=this.vertices[oldIndex].clone().addScaledVector(normal,distance);
      this.vertices.push(v);
      return this.vertices.length-1;
    });
    const oldFace=[...face];
    this.faces[faceIndex]=newIndices;
    for(let i=0;i<oldFace.length;i++){
      const a=oldFace[i], b=oldFace[(i+1)%oldFace.length], nb=newIndices[(i+1)%oldFace.length], na=newIndices[i];
      this.faces.push([a,b,nb,na]);
    }
    return {type:'face',index:faceIndex};
  }

  triangulatedGeometry(){
    const positions=[];
    this.faces.forEach(face=>{
      for(let i=1;i<face.length-1;i++){
        [face[0],face[i],face[i+1]].forEach(vi=>{
          const v=this.vertices[vi];
          positions.push(v.x,v.y,v.z);
        });
      }
    });
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geometry.computeVertexNormals();
    return geometry;
  }
}
