import * as THREE from 'three';
import {EditableMesh} from './mesh.js';

const VERSION='0.36.18.410';
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
function initialFrame(tangent,profileU,profileV){
  let n=initialNormalFromProfile(tangent,profileU,profileV);
  let b=null;
  if(profileV?.isVector3){
    b=profileV.clone().addScaledVector(tangent,-profileV.dot(tangent)).addScaledVector(n,-profileV.dot(n));
    if(b.lengthSq()>EPS*EPS)b.normalize();else b=null;
  }
  if(!b)b=new THREE.Vector3().crossVectors(tangent,n).normalize();
  if(profileU?.isVector3&&n.dot(profileU)<0)n.negate();
  if(profileV?.isVector3&&b.dot(profileV)<0)b.negate();
  return{t:tangent.clone(),n,b,handedness:Math.sign(new THREE.Vector3().crossVectors(n,b).dot(tangent))||1};
}
function transportedFrames(points,{profileU=null,profileV=null,profileNormal=null}={}){
  const frames=[];
  let t=tangentAt(points,0);
  let start=initialFrame(t,profileU,profileV),n=start.n.clone(),b=start.b.clone(),handedness=start.handedness;
  if(profileU?.isVector3&&profileV?.isVector3){
    const exactN=profileU.clone().normalize(),exactB=profileV.clone().normalize();
    const exactT=profileNormal?.isVector3?profileNormal.clone().normalize():t.clone();
    frames.push({t:exactT,n:exactN,b:exactB,handedness:Math.sign(new THREE.Vector3().crossVectors(exactN,exactB).dot(exactT))||1,exactProfile:true});
  }else frames.push({t:t.clone(),n:n.clone(),b:b.clone(),handedness});
  for(let i=1;i<points.length;i++){
    const nextT=tangentAt(points,i);
    const q=new THREE.Quaternion().setFromUnitVectors(t,nextT);
    n.applyQuaternion(q);
    n.addScaledVector(nextT,-n.dot(nextT));
    if(n.lengthSq()<EPS*EPS)n=initialNormal(nextT); else n.normalize();
    b.applyQuaternion(q);
    b.addScaledVector(nextT,-b.dot(nextT)).addScaledVector(n,-b.dot(n));
    if(b.lengthSq()<EPS*EPS){
      b=new THREE.Vector3().crossVectors(nextT,n).normalize();
      if(handedness<0)b.negate();
    }else b.normalize();
    if(handedness*(new THREE.Vector3().crossVectors(n,b).dot(nextT))<0)b.negate();
    t=nextT;
    frames.push({t:t.clone(),n:n.clone(),b:b.clone(),handedness});
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
  return out;
}
function isConvexProfile(profile){
  if(profile.length<4)return true;
  let sign=0;
  for(let i=0;i<profile.length;i++){
    const a=profile[i],b=profile[(i+1)%profile.length],c=profile[(i+2)%profile.length];
    const cross=(b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
    if(Math.abs(cross)<=EPS)continue;
    const next=Math.sign(cross);
    if(!sign)sign=next;else if(next!==sign)return false;
  }
  return true;
}
function triangulateCap(profile){
  if(profile.length<3)return[];
  return THREE.ShapeUtils.triangulateShape(profile.map(p=>new THREE.Vector2(p.x,p.y)),[]);
}
function sideOutward2D(a,b,clockwise){
  const dx=b.x-a.x,dy=b.y-a.y;
  const out=clockwise?new THREE.Vector2(-dy,dx):new THREE.Vector2(dy,-dx);
  return out.lengthSq()>EPS*EPS?out.normalize():out;
}
function averagedAxis(a,b,fallback){
  const out=a.clone().add(b);
  return out.lengthSq()>EPS*EPS?out.normalize():fallback.clone();
}
function orientedSideFace(aRing,bRing,j,k,vertices,frameA,frameB,profileA,profileB,clockwise){
  const face=[aRing[j],aRing[k],bRing[k],bRing[j]];
  const va=vertices[face[0]],vb=vertices[face[1]],vc=vertices[face[2]];
  const actual=new THREE.Vector3().crossVectors(vb.clone().sub(va),vc.clone().sub(va));
  const out2=sideOutward2D(profileA,profileB,clockwise);
  const nAxis=averagedAxis(frameA.n,frameB.n,frameA.n);
  const bAxis=averagedAxis(frameA.b,frameB.b,frameA.b);
  const expected=nAxis.multiplyScalar(out2.x).add(bAxis.multiplyScalar(out2.y));
  if(actual.dot(expected)<0)face.reverse();
  return face;
}
function unifyFaceWinding(faces){
  const edgeMap=new Map(),adj=Array.from({length:faces.length},()=>[]);
  const edgeKey=(a,b)=>a<b?(a+':'+b):(b+':'+a);
  for(let fi=0;fi<faces.length;fi++){
    const face=faces[fi]||[];
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b);
      if(!edgeMap.has(key))edgeMap.set(key,[]);
      edgeMap.get(key).push({fi,a,b});
    }
  }
  for(const entries of edgeMap.values()){
    if(entries.length!==2)continue;
    const a=entries[0],b=entries[1];
    adj[a.fi].push({fi:b.fi,a:a.a,b:a.b,otherA:b.a,otherB:b.b});
    adj[b.fi].push({fi:a.fi,a:b.a,b:b.b,otherA:a.a,otherB:a.b});
  }
  const visited=new Set(),components=[];
  for(let seed=0;seed<faces.length;seed++){
    if(visited.has(seed))continue;
    const queue=[seed],component=[];visited.add(seed);
    while(queue.length){
      const fi=queue.shift();component.push(fi);
      for(const link of adj[fi]){
        if(visited.has(link.fi))continue;
        const current=faces[fi],other=faces[link.fi];
        let sameDirection=false,found=false;
        for(let i=0;i<current.length;i++){
          const a=current[i],b=current[(i+1)%current.length];
          if(!((a===link.a&&b===link.b)||(a===link.b&&b===link.a)))continue;
          for(let j=0;j<other.length;j++){
            const oa=other[j],ob=other[(j+1)%other.length];
            if((oa===a&&ob===b)||(oa===b&&ob===a)){sameDirection=(oa===a&&ob===b);found=true;break;}
          }
          if(found)break;
        }
        if(found&&sameDirection)other.reverse();
        visited.add(link.fi);queue.push(link.fi);
      }
    }
    components.push(component);
  }
  return{components};
}
function signedMeshVolume(vertices,faces){
  let volume=0;
  for(const face of faces){
    if(!face||face.length<3)continue;
    const a=vertices[face[0]];
    for(let i=1;i<face.length-1;i++){
      const b=vertices[face[i]],c=vertices[face[i+1]];
      volume+=a.dot(new THREE.Vector3().crossVectors(b,c))/6;
    }
  }
  return volume;
}
function orientClosedShellOutward(vertices,faces){
  const volume=signedMeshVolume(vertices,faces);
  if(volume<0)for(const face of faces)face.reverse();
  return{volume:Math.abs(volume),flipped:volume<0};
}
function orientedCapFaces(ring,triangles,vertices,desiredNormal){
  const out=[];
  for(const tri of triangles){
    const face=tri.map(i=>ring[i]);
    const a=vertices[face[0]],b=vertices[face[1]],c=vertices[face[2]];
    const n=new THREE.Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a));
    if(n.dot(desiredNormal)<0)[face[1],face[2]]=[face[2],face[1]];
    out.push(face);
  }
  return out;
}
export function buildSweepProfile(rawPath,rawProfile,options={}){
  const points=cleanPath(rawPath),profile=cleanProfile(rawProfile),profileClosed=options.profileClosed!==false;
  if(points.length<2)return{ok:false,reason:'Sweep path needs at least two points'};
  if(profileClosed&&profile.length<3)return{ok:false,reason:'Closed Sweep profile needs at least three points'};
  if(!profileClosed&&profile.length<2)return{ok:false,reason:'Open Sweep profile needs at least two points'};
  const profileArea=profileClosed?signedArea2D(profile):0;
  if(profileClosed&&Math.abs(profileArea)<EPS)return{ok:false,reason:'Sweep profile area is too small'};
  const clockwise=profileClosed&&profileArea<0;
  const capStart=profileClosed&&options.capStart!==false,capEnd=profileClosed&&options.capEnd!==false;
  const frames=transportedFrames(points,{profileU:options.profileU,profileV:options.profileV,profileNormal:options.profileNormal});
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
      faces.push(orientedSideFace(a,b,j,k,vertices,frames[i],frames[i+1],profile[j],profile[k],clockwise));
    }
  }
  if(capStart||capEnd){
    const convex=isConvexProfile(profile);
    if(convex){
      if(capStart)faces.push(clockwise?[...rings[0]]:[...rings[0]].reverse());
      if(capEnd)faces.push(clockwise?[...rings.at(-1)].reverse():[...rings.at(-1)]);
    }else{
      const capTriangles=triangulateCap(profile);
      if(capStart){
        const desired=points[0].clone().sub(points[1]).normalize();
        faces.push(...orientedCapFaces(rings[0],capTriangles,vertices,desired));
      }
      if(capEnd){
        const desired=points.at(-1).clone().sub(points.at(-2)).normalize();
        faces.push(...orientedCapFaces(rings.at(-1),capTriangles,vertices,desired));
      }
    }
  }
  const winding=unifyFaceWinding(faces);
  const shellOrientation=profileClosed&&capStart&&capEnd?orientClosedShellOutward(vertices,faces):{volume:0,flipped:false};
  return{ok:true,mesh:new EditableMesh(vertices,faces),points,profile,frames,profileClosed,clockwise,capStart,capEnd,winding,shellOrientation};
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
export const __sweepInternals={cleanPath,tangentAt,initialFrame,transportedFrames,cleanProfile,signedArea2D,isConvexProfile,sideOutward2D,orientedSideFace,triangulateCap,orientedCapFaces,unifyFaceWinding,signedMeshVolume,orientClosedShellOutward};
globalThis.__boxlabSweepCore={version:VERSION,buildSweepTube,buildSweepProfile};
