import * as THREE from 'three';
import {EditableMesh} from './mesh.js';

const EPS=1e-7;
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function axisNormal(axis){return new THREE.Vector3(axis==='y'?0:axis==='z'?0:1,axis==='y'?1:0,axis==='z'?1:0);}

function resolvePlane({axis='x',offset=0,planeNormal=null,planePoint=null}={}){
  const normal=planeNormal?.clone?.()||axisNormal(axis);
  if(normal.lengthSq()<=EPS*EPS)return null;
  normal.normalize();
  const point=planePoint?.clone?.()||new THREE.Vector3();
  if(!planePoint)point[axis]=Number(offset)||0;
  const constant=normal.dot(point);
  return{normal,point,constant};
}
function signedDistance(v,plane){return plane.normal.dot(v)-plane.constant;}
function projectToPlane(v,plane){return v.clone().addScaledVector(plane.normal,-signedDistance(v,plane));}
function reflectPoint(v,plane){return v.clone().addScaledVector(plane.normal,-2*signedDistance(v,plane));}
function weldPlaneSeam(mesh,plane,tolerance=1e-7){
  const vertices=[],remap=new Map(),seamKeys=new Map();
  const scale=1/Math.max(tolerance,1e-12);
  const keyFor=v=>[v.x,v.y,v.z].map(n=>Math.round(n*scale)).join(':');
  for(let i=0;i<mesh.vertices.length;i++){
    const source=mesh.vertices[i];
    if(Math.abs(signedDistance(source,plane))<=tolerance){
      const projected=projectToPlane(source,plane),key=keyFor(projected);
      if(seamKeys.has(key)){remap.set(i,seamKeys.get(key));continue;}
      const index=vertices.length;vertices.push(projected);seamKeys.set(key,index);remap.set(i,index);
    }else{
      const index=vertices.length;vertices.push(source.clone());remap.set(i,index);
    }
  }
  const faces=[];
  for(const face of mesh.faces){
    const mapped=face.map(i=>remap.get(i));
    const cleaned=[];
    for(const id of mapped)if(cleaned[cleaned.length-1]!==id)cleaned.push(id);
    if(cleaned.length>2&&cleaned[0]===cleaned[cleaned.length-1])cleaned.pop();
    if(new Set(cleaned).size>=3)faces.push(cleaned);
  }
  const result=new EditableMesh(vertices,faces);
  if(mesh.creases instanceof Map){
    result.creases=new Map();
    for(const [key,value] of mesh.creases){
      const [a,b]=String(key).split(':').map(Number);
      const na=remap.get(a),nb=remap.get(b);
      if(!Number.isInteger(na)||!Number.isInteger(nb)||na===nb)continue;
      result.creases.set(result.edgeKey(na,nb),value);
    }
  }
  return result;
}

export function bisectMesh(mesh,{axis='x',keep='positive',offset=0,planeNormal=null,planePoint=null}={}){
  if(!mesh?.vertices?.length||!mesh?.faces?.length)return{ok:false,reason:'empty-mesh'};
  const plane=resolvePlane({axis,offset,planeNormal,planePoint});
  if(!plane)return{ok:false,reason:'invalid-plane'};
  const sign=keep==='negative'?-1:1,vertices=[],faces=[];
  const originalMap=new Map(),intersectionMap=new Map();

  const getOriginal=index=>{
    if(originalMap.has(index))return originalMap.get(index);
    const source=mesh.vertices[index]?.clone?.();
    if(!source)return null;
    const d=signedDistance(source,plane);
    const v=Math.abs(d)<=EPS?projectToPlane(source,plane):source;
    const out=vertices.length;vertices.push(v);originalMap.set(index,out);return out;
  };
  const getIntersection=(a,b)=>{
    const key=edgeKey(a,b);
    if(intersectionMap.has(key))return intersectionMap.get(key);
    const va=mesh.vertices[a],vb=mesh.vertices[b];
    if(!va||!vb)return null;
    const da=signedDistance(va,plane),db=signedDistance(vb,plane),den=db-da;
    if(Math.abs(den)<=EPS)return null;
    const t=-da/den;
    const v=projectToPlane(va.clone().lerp(vb,t),plane);
    const out=vertices.length;vertices.push(v);intersectionMap.set(key,out);return out;
  };
  const inside=index=>sign*signedDistance(mesh.vertices[index],plane)>=-EPS;

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
  const result=weldPlaneSeam(new EditableMesh(vertices,faces),plane);
  return{
    ok:true,mesh:result,axis,keep,offset:Number(offset)||0,
    planeNormal:plane.normal.clone(),planePoint:plane.point.clone(),
    cutVertices:intersectionMap.size
  };
}


export function splitMeshByPlane(mesh,{axis='x',offset=0,planeNormal=null,planePoint=null}={}){
  if(!mesh?.vertices?.length||!mesh?.faces?.length)return{ok:false,reason:'empty-mesh'};
  const plane=resolvePlane({axis,offset,planeNormal,planePoint});
  if(!plane)return{ok:false,reason:'invalid-plane'};

  const vertices=[],faces=[],faceGroups=[];
  const originalMap=new Map(),intersectionMap=new Map();

  const getOriginal=index=>{
    if(originalMap.has(index))return originalMap.get(index);
    const source=mesh.vertices[index]?.clone?.();if(!source)return null;
    const d=signedDistance(source,plane);
    const v=Math.abs(d)<=EPS?projectToPlane(source,plane):source;
    const out=vertices.length;vertices.push(v);originalMap.set(index,out);return out;
  };
  const getIntersection=(a,b)=>{
    const key=edgeKey(a,b);
    if(intersectionMap.has(key))return intersectionMap.get(key);
    const va=mesh.vertices[a],vb=mesh.vertices[b];if(!va||!vb)return null;
    const da=signedDistance(va,plane),db=signedDistance(vb,plane),den=db-da;
    if(Math.abs(den)<=EPS)return null;
    const t=-da/den;
    if(t<=EPS)return getOriginal(a);
    if(t>=1-EPS)return getOriginal(b);
    const v=projectToPlane(va.clone().lerp(vb,t),plane);
    const out=vertices.length;vertices.push(v);intersectionMap.set(key,out);return out;
  };
  const clean=ids=>{
    const out=[];
    for(const id of ids)if(Number.isInteger(id)&&out[out.length-1]!==id)out.push(id);
    if(out.length>2&&out[0]===out[out.length-1])out.pop();
    return new Set(out).size>=3?out:null;
  };
  const pushFace=(ids,group)=>{
    const c=clean(ids);if(!c)return;
    faces.push(c);faceGroups.push(group??0);
  };

  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face)||face.length<3)continue;
    const pos=[],neg=[];
    let prev=face[face.length-1],dp=signedDistance(mesh.vertices[prev],plane);
    for(const curr of face){
      const dc=signedDistance(mesh.vertices[curr],plane);
      const prevPos=dp>EPS,prevNeg=dp<-EPS,currPos=dc>EPS,currNeg=dc<-EPS;
      if(!prevNeg){const id=getOriginal(prev);if(Number.isInteger(id)&&pos[pos.length-1]!==id)pos.push(id);}
      if(!prevPos){const id=getOriginal(prev);if(Number.isInteger(id)&&neg[neg.length-1]!==id)neg.push(id);}
      if((prevPos&&currNeg)||(prevNeg&&currPos)){
        const cut=getIntersection(prev,curr);
        if(Number.isInteger(cut)){if(pos[pos.length-1]!==cut)pos.push(cut);if(neg[neg.length-1]!==cut)neg.push(cut);}
      }
      prev=curr;dp=dc;
    }
    const group=mesh.faceGroups?.[fi]??0;
    pushFace(pos,group);
    pushFace(neg,group);
  }

  if(!faces.length)return{ok:false,reason:'plane-does-not-split-mesh'};
  const result=new EditableMesh(vertices,faces);
  result.faceGroups=faceGroups.slice();

  if(mesh.creases instanceof Map){
    result.creases=new Map();
    const existing=new Set((result.edges?.()||[]).map(e=>result.edgeKey(e.a,e.b)));
    const addCrease=(a,b,value)=>{
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)return;
      const key=result.edgeKey(a,b);if(existing.has(key))result.creases.set(key,value);
    };
    for(const [key,value] of mesh.creases){
      const [a,b]=String(key).split(':').map(Number);
      const na=getOriginal(a),nb=getOriginal(b);
      const da=signedDistance(mesh.vertices[a],plane),db=signedDistance(mesh.vertices[b],plane);
      if(da*db<-EPS*EPS){
        const cut=getIntersection(a,b);addCrease(na,cut,value);addCrease(cut,nb,value);
      }else addCrease(na,nb,value);
    }
  }

  return{
    ok:true,mesh:result,axis,offset:Number(offset)||0,
    planeNormal:plane.normal.clone(),planePoint:plane.point.clone(),
    cutVertices:intersectionMap.size
  };
}

function mirrorAcrossPlane(mesh,plane){
  const vertices=mesh.vertices.map(v=>v.clone()),faces=mesh.faces.map(f=>[...f]);
  const mapped=new Map();
  for(let i=0;i<mesh.vertices.length;i++){
    const v=mesh.vertices[i],d=signedDistance(v,plane);
    if(Math.abs(d)<=EPS){mapped.set(i,i);continue;}
    mapped.set(i,vertices.length);
    vertices.push(reflectPoint(v,plane));
  }
  for(const face of mesh.faces){
    const reflected=[...face].reverse().map(index=>mapped.get(index));
    if(reflected.some((index,i)=>index!==face[face.length-1-i]))faces.push(reflected);
  }
  const result=new EditableMesh(vertices,faces);
  if(mesh.creases instanceof Map){
    result.creases=new Map(mesh.creases);
    for(const [key,value] of mesh.creases){
      const [a,b]=String(key).split(':').map(Number);
      if(!mapped.has(a)||!mapped.has(b))continue;
      result.creases.set(result.edgeKey(mapped.get(a),mapped.get(b)),value);
    }
  }
  return result;
}

export function symmetryBisect(mesh,{axis='x',keep='positive',mirror=true,offset=0,planeNormal=null,planePoint=null}={}){
  const cut=bisectMesh(mesh,{axis,keep,offset,planeNormal,planePoint});
  if(!cut.ok)return cut;
  if(!mirror)return{...cut,mirrored:false};
  const plane=resolvePlane({axis,offset,planeNormal:cut.planeNormal,planePoint:cut.planePoint});
  const mirrored=mirrorAcrossPlane(cut.mesh,plane);
  return{
    ok:true,mesh:mirrored,axis,keep,offset:cut.offset,
    planeNormal:cut.planeNormal.clone(),planePoint:cut.planePoint.clone(),
    mirrored:true,cutVertices:cut.cutVertices
  };
}

export const __symmetryBisectInternals={resolvePlane,signedDistance,projectToPlane,reflectPoint,weldPlaneSeam,mirrorAcrossPlane};
