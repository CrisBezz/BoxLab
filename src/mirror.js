import * as THREE from 'three';
import { EditableMesh } from './mesh.js';

const EPS=1e-6;

function vertexKey(v){
  const q=n=>Math.round(n/EPS);
  return `${q(v.x)},${q(v.y)},${q(v.z)}`;
}

function canonicalFaceKey(face){
  if(!face.length) return '';
  const variants=[];
  const addRotations=arr=>{
    for(let i=0;i<arr.length;i++) variants.push([...arr.slice(i),...arr.slice(0,i)].join(':'));
  };
  addRotations(face);
  addRotations([...face].reverse());
  variants.sort();
  return variants[0];
}

function variantsForAxes(axes){
  const enabled=['x','y','z'].filter(axis=>axes?.[axis]);
  const variants=[{x:1,y:1,z:1,reflections:0}];
  for(const axis of enabled){
    const current=[...variants];
    current.forEach(v=>variants.push({
      ...v,
      [axis]:-v[axis],
      reflections:v.reflections+1
    }));
  }
  return variants;
}

export function applyMirror(mesh,axes={x:false,y:false,z:false}){
  if(!axes.x&&!axes.y&&!axes.z) return mesh.clone();

  const vertices=[];
  const faces=[];
  const vertexMap=new Map();
  const faceKeys=new Set();

  const getVertexIndex=v=>{
    const key=vertexKey(v);
    if(vertexMap.has(key)) return vertexMap.get(key);
    const index=vertices.length;
    vertices.push(v.clone());
    vertexMap.set(key,index);
    return index;
  };

  for(const variant of variantsForAxes(axes)){
    for(const sourceFace of mesh.faces){
      const transformed=sourceFace.map(index=>{
        const source=mesh.vertices[index];
        const v=new THREE.Vector3(source.x*variant.x,source.y*variant.y,source.z*variant.z);
        return getVertexIndex(v);
      });
      if(variant.reflections%2===1) transformed.reverse();
      const key=canonicalFaceKey(transformed);
      if(faceKeys.has(key)) continue;
      faceKeys.add(key);
      faces.push(transformed);
    }
  }

  return new EditableMesh(vertices,faces);
}
