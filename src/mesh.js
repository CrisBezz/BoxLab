import * as THREE from 'three';

export class EditableMesh {
  constructor(vertices, faces, creases = null) {
    this.vertices = vertices.map(v => v.clone ? v.clone() : new THREE.Vector3(...v));
    this.faces = faces.map(f => [...f]);
    this.creases = new Map(creases ? [...creases] : []);
  }

  static cube(size = 2) {
    const s = size / 2;
    return new EditableMesh(
      [[-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],[-s,-s,s],[s,-s,s],[s,s,s],[-s,s,s]],
      [[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[0,1,5,4],[3,7,6,2]]
    );
  }

  clone(){ return new EditableMesh(this.vertices,this.faces,this.creases); }

  edgeKey(a,b){ return a<b?`${a}:${b}`:`${b}:${a}`; }

  edges(){
    const map=new Map();
    this.faces.forEach((face,faceIndex)=>{
      for(let i=0;i<face.length;i++){
        const a=face[i], b=face[(i+1)%face.length];
        const key=this.edgeKey(a,b);
        if(!map.has(key)) map.set(key,{a:Math.min(a,b),b:Math.max(a,b),faces:[]});
        map.get(key).faces.push(faceIndex);
      }
    });
    return [...map.values()];
  }

  edgeCrease(edgeIndex){
    const edge=this.edges()[edgeIndex];
    return edge ? (this.creases.get(this.edgeKey(edge.a,edge.b)) || 0) : 0;
  }

  setEdgeCrease(edgeIndex,strength){
    const edge=this.edges()[edgeIndex];
    if(!edge) return false;
    const key=this.edgeKey(edge.a,edge.b);
    const value=THREE.MathUtils.clamp(Number(strength)||0,0,1);
    if(value<=0) this.creases.delete(key);
    else this.creases.set(key,value);
    return true;
  }

  faceCenter(faceIndex){
    const face=this.faces[faceIndex];
    if(!face) return new THREE.Vector3();
    const c=new THREE.Vector3();
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
    if(selection.type==='face') return this.faces[selection.index]?[...this.faces[selection.index]]:[];
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

  insetFace(faceIndex,amount=0.2){
    const face=this.faces[faceIndex];
    if(!face || face.length<3) return null;
    const center=this.faceCenter(faceIndex);
    const t=THREE.MathUtils.clamp(amount,0.01,0.95);
    const inner=face.map(oldIndex=>{
      const v=this.vertices[oldIndex].clone().lerp(center,t);
      this.vertices.push(v);
      return this.vertices.length-1;
    });
    const outer=[...face];
    this.faces[faceIndex]=inner;
    for(let i=0;i<outer.length;i++){
      const a=outer[i], b=outer[(i+1)%outer.length];
      const ib=inner[(i+1)%inner.length], ia=inner[i];
      this.faces.push([a,b,ib,ia]);
    }
    return {type:'face',index:faceIndex};
  }

  deleteFace(faceIndex){
    if(faceIndex<0 || faceIndex>=this.faces.length) return false;
    this.faces.splice(faceIndex,1);
    return true;
  }

  loopCut(edgeIndex,t=0.5){
    const allEdges=this.edges();
    const seed=allEdges[edgeIndex];
    if(!seed) return null;
    const amount=THREE.MathUtils.clamp(t,0.05,0.95);
    const edgeByKey=new Map(allEdges.map(e=>[this.edgeKey(e.a,e.b),e]));
    const cutKeys=new Set([this.edgeKey(seed.a,seed.b)]);
    const queue=[this.edgeKey(seed.a,seed.b)];
    while(queue.length){
      const currentKey=queue.shift();
      const current=edgeByKey.get(currentKey);
      if(!current) continue;
      for(const faceIndex of current.faces){
        const face=this.faces[faceIndex];
        if(!face || face.length!==4) continue;
        let edgeSlot=-1;
        for(let i=0;i<4;i++) if(this.edgeKey(face[i],face[(i+1)%4])===currentKey){edgeSlot=i;break;}
        if(edgeSlot<0) continue;
        const oppositeSlot=(edgeSlot+2)%4;
        const oppositeKey=this.edgeKey(face[oppositeSlot],face[(oppositeSlot+1)%4]);
        if(!cutKeys.has(oppositeKey)){cutKeys.add(oppositeKey);queue.push(oppositeKey);}
      }
    }
    const splitFaces=[];
    this.faces.forEach((face,faceIndex)=>{
      if(face.length!==4) return;
      const slots=[];
      for(let i=0;i<4;i++) if(cutKeys.has(this.edgeKey(face[i],face[(i+1)%4]))) slots.push(i);
      if(slots.length===2 && ((slots[0]+2)%4===slots[1] || (slots[1]+2)%4===slots[0])) splitFaces.push({faceIndex,slots});
    });
    if(!splitFaces.length) return null;
    const midpointIndex=new Map();
    for(const key of cutKeys){
      const edge=edgeByKey.get(key); if(!edge) continue;
      const v=this.vertices[edge.a].clone().lerp(this.vertices[edge.b],amount);
      midpointIndex.set(key,this.vertices.length); this.vertices.push(v);
    }
    const replacements=new Map();
    for(const {faceIndex,slots} of splitFaces){
      const [a,b,c,d]=this.faces[faceIndex];
      if(slots.includes(0)&&slots.includes(2)){
        const m0=midpointIndex.get(this.edgeKey(a,b)),m2=midpointIndex.get(this.edgeKey(c,d));
        replacements.set(faceIndex,[[a,m0,m2,d],[m0,b,c,m2]]);
      }else if(slots.includes(1)&&slots.includes(3)){
        const m1=midpointIndex.get(this.edgeKey(b,c)),m3=midpointIndex.get(this.edgeKey(d,a));
        replacements.set(faceIndex,[[a,b,m1,m3],[m3,m1,c,d]]);
      }
    }
    const nextFaces=[];
    this.faces.forEach((face,faceIndex)=>{const split=replacements.get(faceIndex);if(split)nextFaces.push(...split);else nextFaces.push(face);});
    this.faces=nextFaces;
    return {cutEdges:cutKeys.size,splitFaces:splitFaces.length};
  }

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
}
