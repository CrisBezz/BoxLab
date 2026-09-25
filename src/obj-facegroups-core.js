import * as THREE from 'three';
import {EditableMesh} from './mesh.js?v=0.21.2';

// Facegroup recovery step 2: preserve OBJ `g` metadata without changing
// BoxLab object splitting, UI, export, or the core modelling module graph.
export function parseEditableOBJ(text){
  const sourceVertices=[];
  const objects=[];
  let currentObject={name:'Mesh',faces:[],faceGroups:[]};
  let currentGroup=null;
  objects.push(currentObject);
  const lines=String(text||'').split(/\r?\n/);
  for(const raw of lines){
    const line=raw.trim();
    if(!line||line.startsWith('#'))continue;
    if(line.startsWith('v ')){
      const p=line.split(/\s+/),x=Number(p[1]),y=Number(p[2]),z=Number(p[3]);
      if(Number.isFinite(x)&&Number.isFinite(y)&&Number.isFinite(z))sourceVertices.push(new THREE.Vector3(x,y,z));
      continue;
    }
    if(line.startsWith('o ')){
      const name=line.slice(2).trim()||'Mesh';
      if(currentObject.faces.length){currentObject={name,faces:[],faceGroups:[]};objects.push(currentObject);}
      else currentObject.name=name;
      currentGroup=null;
      continue;
    }
    if(line==='g'||line.startsWith('g ')){
      currentGroup=line.length>1?(line.slice(1).trim()||null):null;
      continue;
    }
    if(!line.startsWith('f '))continue;
    const tokens=line.slice(2).trim().split(/\s+/),face=[];
    for(const token of tokens){
      const rawIndex=Number(token.split('/')[0]);
      if(!Number.isInteger(rawIndex)||rawIndex===0)continue;
      const index=rawIndex>0?rawIndex-1:sourceVertices.length+rawIndex;
      if(index>=0&&index<sourceVertices.length)face.push(index);
    }
    const cleaned=face.filter((v,i)=>i===0||v!==face[i-1]);
    if(cleaned.length>1&&cleaned[0]===cleaned[cleaned.length-1])cleaned.pop();
    if(new Set(cleaned).size>=3){
      currentObject.faces.push(cleaned);
      currentObject.faceGroups.push(currentGroup);
    }
  }
  return objects.filter(item=>item.faces.length).map(object=>{
    const used=[...new Set(object.faces.flat())].sort((a,b)=>a-b);
    const remap=new Map(used.map((old,i)=>[old,i]));
    return{
      mesh:new EditableMesh(
        used.map(i=>sourceVertices[i].clone()),
        object.faces.map(face=>face.map(i=>remap.get(i))),
        null,
        object.faceGroups
      ),
      name:object.name||'Mesh',
      polygonPreserved:true
    };
  });
}
