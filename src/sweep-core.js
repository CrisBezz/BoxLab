import * as THREE from 'three';
import {EditableMesh} from './mesh.js';

const VERSION='0.36.18.396';
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
function initialNormalFromProfile(tangent,profileU,profileV){
  const candidates=[profileU,profileV].filter(v=>v?.isVector3);
  for(const candidate of candidates){
    const n=candidate.clone().addScaledVector(tangent,-candidate.dot(tangent));
    if(n.lengthSq()>EPS*EPS){
      n.normalize();
      if(profileU?.isVector3&&n.dot(profileU)<0)n.negate();
      return n;
    }
  }
  return initialNormal(tangent);
}
function transportedFrames(points,{profileU=null,profileV=null}={}){
  const frames=[];
  let t=tangentAt(points,0),n=initialNormalFromProfile(t,profileU,profileV),b=new THREE.Vector3().crossVectors(t,n).normalize();
  if(profileV?.isVector3&&b.dot(profileV)<0){n.negate();b.negate();}
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
function signedArea2D(points){
  let area=0;
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];
    area+=(Number(a.x)||0)*(Number(b.y)||0)-(Number(b.x)||0)*(Number(a.y)||0);
  }
  return area*0.5;
}
function cleanProfile(raw=[]){
  const out=[];
  for(const p of raw){
    const x=Number(p?.x),y=Number(p?.y);
    if(!Number.isFinite(x)||!Number.isFinite(y))continue;
    if(!out.length||Math.hypot(out[out.length-1].x-x,out[out.length-1].y-y)>EPS)out.push({x,y});
  }
  if(out.length>2&&Math.hypot(out[0].x-out.at(-1).x,out[0].y-out.at(-1).y)<=EPS)out.pop();
  if(out.length>=3&&signedArea2D(out)<0)out.reverse();
  return out;
}
export function buildSweepProfile(rawPath,rawProfile,options={}){
  const points=cleanPath(rawPath),profile=cleanProfile(rawProfile),profileClosed=options.profileClosed!==false;
  if(points.length<2)return{ok:false,reason:'Sweep path needs at least two points'};
  if(profileClosed&&profile.length<3)return{ok:false,reason:'Closed Sweep profile needs at least three points'};
  if(!profileClosed&&profile.length<2)return{ok:false,reason:'Open Sweep profile needs at least two points'};
  if(profileClosed&&Math.abs(signedArea2D(profile))<EPS)return{ok:false,reason:'Sweep profile area is too small'};
  const capStart=profileClosed&&options.capStart!==false,capEnd=profileClosed&&options.capEnd!==false;
  const frames=transportedFrames(points,{profileU:options.profileU,profileV:options.profileV});
  const vertices=[],rings=[];
  for(let i=0;i<points.length;i++){
    const ring=[];
    for(const p of profile){
      const v=points[i].clone().addScaledVector(frames[i].n,p.x).addScaledVector(frames[i].b,p.y);
      ring.push(vertices.length);vertices.push(v);
    }
    rings.push(ring);
  }
  const faces=[];
  for(let i=0;i<rings.length-1;i++){
    const a=rings[i],b=rings[i+1];
    const edgeCount=profileClosed?profile.length:profile.length-1;
    for(let j=0;j<edgeCount;j++){
      const k=profileClosed?(j+1)%profile.length:j+1;
      faces.push([a[j],a[k],b[k],b[j]]);
    }
  }
  if(capStart)faces.push([...rings[0]].reverse());
  if(capEnd)faces.push([...rings.at(-1)]);
  return{ok:true,mesh:new EditableMesh(vertices,faces),points,profile,frames,profileClosed,capStart,capEnd};
}
export function buildSweepTube(rawPoints,options={}){
  const radius=Math.max(1e-4,Number(options.radius)||0.25);
  const sides=Math.max(3,Math.min(64,Math.round(Number(options.sides)||8)));
  const profile=[];
  for(let j=0;j<sides;j++){
    const a=Math.PI*2*j/sides;
    profile.push({x:Math.cos(a)*radius,y:Math.sin(a)*radius});
  }
  const result=buildSweepProfile(rawPoints,profile,{...options,profileClosed:true});
  return result.ok?{...result,radius,sides}:result;
}
export const __sweepInternals={cleanPath,tangentAt,transportedFrames,cleanProfile,signedArea2D};
globalThis.__boxlabSweepCore={version:VERSION,buildSweepTube,buildSweepProfile};
