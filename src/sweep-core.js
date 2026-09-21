import * as THREE from 'three';
import {EditableMesh} from './mesh.js';

const VERSION='0.36.18.393';
const EPS=1e-7;

function cleanPath(points=[]){
  const out=[];
  for(const raw of points){
    const p=raw?.clone?raw.clone():new THREE.Vector3(...raw);
    if(!Number.isFinite(p.x)||!Number.isFinite(p.y)||!Number.isFinite(p.z))continue;
    if(!out.length||out[out.length-1].distanceToSquared(p)>EPS*EPS)out.push(p);
  }
  return out;
}
function tangentAt(points,i){
  if(i===0)return points[1].clone().sub(points[0]).normalize();
  if(i===points.length-1)return points[i].clone().sub(points[i-1]).normalize();
  const t=points[i+1].clone().sub(points[i-1]);
  if(t.lengthSq()<EPS*EPS)return points[i+1].clone().sub(points[i]).normalize();
  return t.normalize();
}
function initialNormal(tangent){
  const axes=[new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,1)];
  axes.sort((a,b)=>Math.abs(a.dot(tangent))-Math.abs(b.dot(tangent)));
  const n=axes[0].clone().addScaledVector(tangent,-axes[0].dot(tangent));
  return n.lengthSq()>EPS*EPS?n.normalize():new THREE.Vector3(1,0,0);
}
function transportedFrames(points){
  const frames=[];
  let t=tangentAt(points,0),n=initialNormal(t),b=new THREE.Vector3().crossVectors(t,n).normalize();
  n=new THREE.Vector3().crossVectors(b,t).normalize();
  frames.push({t:t.clone(),n:n.clone(),b:b.clone()});
  for(let i=1;i<points.length;i++){
    const nextT=tangentAt(points,i);
    const q=new THREE.Quaternion().setFromUnitVectors(t,nextT);
    n.applyQuaternion(q);
    n.addScaledVector(nextT,-n.dot(nextT));
    if(n.lengthSq()<EPS*EPS)n=initialNormal(nextT); else n.normalize();
    b=new THREE.Vector3().crossVectors(nextT,n).normalize();
    n=new THREE.Vector3().crossVectors(b,nextT).normalize();
    t=nextT;
    frames.push({t:t.clone(),n:n.clone(),b:b.clone()});
  }
  return frames;
}
export function buildSweepTube(rawPoints,options={}){
  const points=cleanPath(rawPoints);
  if(points.length<2)return{ok:false,reason:'Sweep path needs at least two points'};
  const radius=Math.max(1e-4,Number(options.radius)||0.25);
  const sides=Math.max(3,Math.min(64,Math.round(Number(options.sides)||8)));
  const capStart=options.capStart!==false,capEnd=options.capEnd!==false;
  const frames=transportedFrames(points);
  const vertices=[],rings=[];
  for(let i=0;i<points.length;i++){
    const ring=[];
    for(let j=0;j<sides;j++){
      const a=Math.PI*2*j/sides;
      const v=points[i].clone()
        .addScaledVector(frames[i].n,Math.cos(a)*radius)
        .addScaledVector(frames[i].b,Math.sin(a)*radius);
      ring.push(vertices.length);vertices.push(v);
    }
    rings.push(ring);
  }
  const faces=[];
  for(let i=0;i<rings.length-1;i++){
    const a=rings[i],b=rings[i+1];
    for(let j=0;j<sides;j++){
      const k=(j+1)%sides;
      faces.push([a[j],a[k],b[k],b[j]]);
    }
  }
  if(capStart)faces.push([...rings[0]].reverse());
  if(capEnd)faces.push([...rings[rings.length-1]]);
  const mesh=new EditableMesh(vertices,faces);
  return{ok:true,mesh,points,frames,radius,sides,capStart,capEnd};
}
export const __sweepInternals={cleanPath,tangentAt,transportedFrames};
globalThis.__boxlabSweepCore={version:VERSION,buildSweepTube};
