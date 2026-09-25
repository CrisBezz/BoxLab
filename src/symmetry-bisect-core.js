import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {applyMirror} from './mirror.js';

const EPS=1e-7;

function axisIndex(axis){return axis==='y'?1:axis==='z'?2:0;}
function coord(v,i){return i===0?v.x:i===1?v.y:v.z;}
function setCoord(v,i,value){if(i===0)v.x=value;else if(i===1)v.y=value;else v.z=value;return v;}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

export function bisectMesh(mesh,{axis='x',keep='positive',offset=0}={}){
  if(!mesh?.vertices?.length||!mesh?.faces?.length)return{ok:false,reason:'empty-mesh'};
  const ai=axisIndex(axis),sign=keep==='negative'?-1:1,planeOffset=Number(offset)||0;
  const vertices=[],faces=[];
  const originalMap=new Map(),intersectionMap=new Map();

  const getOriginal=index=>{
    if(originalMap.has(index))return originalMap.get(index);
    const v=mesh.vertices[index]?.clone?.();
    if(!v)return null;
    if(Math.abs(coord(v,ai)-planeOffset)<=EPS)setCoord(v,ai,planeOffset);
    const out=vertices.length;vertices.push(v);originalMap.set(index,out);return out;
  };
  const getIntersection=(a,b)=>{
    const key=edgeKey(a,b);
    if(intersectionMap.has(key))return intersectionMap.get(key);
    const va=mesh.vertices[a],vb=mesh.vertices[b];
    if(!va||!vb)return null;
    const ca=coord(va,ai)-planeOffset,cb=coord(vb,ai)-planeOffset,den=cb-ca;
    if(Math.abs(den)<=EPS)return null;
    const t=-ca/den;
    const v=va.clone().lerp(vb,t);setCoord(v,ai,planeOffset);
    const out=vertices.length;vertices.push(v);intersectionMap.set(key,out);return out;
  };
  const inside=index=>sign*(coord(mesh.vertices[index],ai)-planeOffset)>=-EPS;

  for(const face of mesh.faces){
    if(!Array.isArray(face)||face.length<3)continue;
    const output=[];
    let prev=face[face.length-1],prevInside=inside(prev);
    for(const curr of face){
      const currInside=inside(curr);
      if(currInside){
        if(!prevInside){
          const cut=getIntersection(prev,curr);if(Number.isInteger(cut))output.push(cut);
        }
        const out=getOriginal(curr);if(Number.isInteger(out))output.push(out);
      }else if(prevInside){
        const cut=getIntersection(prev,curr);if(Number.isInteger(cut))output.push(cut);
      }
      prev=curr;prevInside=currInside;
    }
    const cleaned=[];
    for(const id of output)if(cleaned[cleaned.length-1]!==id)cleaned.push(id);
    if(cleaned.length>2&&cleaned[0]===cleaned[cleaned.length-1])cleaned.pop();
    if(new Set(cleaned).size>=3)faces.push(cleaned);
  }
  if(!faces.length)return{ok:false,reason:'plane-removes-mesh'};
  const result=new EditableMesh(vertices,faces);
  return{ok:true,mesh:result,axis,keep,offset:planeOffset,cutVertices:intersectionMap.size};
}

export function symmetryBisect(mesh,{axis='x',keep='positive',mirror=true,offset=0}={}){
  const cut=bisectMesh(mesh,{axis,keep,offset});
  if(!cut.ok)return cut;
  if(!mirror)return{...cut,mirrored:false};
  const axes={x:false,y:false,z:false};axes[axis]=true;
  const shifted=cut.mesh.clone();
  for(const v of shifted.vertices)v[axis]-=cut.offset;
  const mirrored=applyMirror(shifted,axes);
  for(const v of mirrored.vertices)v[axis]+=cut.offset;
  return{ok:true,mesh:mirrored,axis,keep,offset:cut.offset,mirrored:true,cutVertices:cut.cutVertices};
}
