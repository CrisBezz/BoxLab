import { EditableMesh } from './mesh.js';
import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';
import * as THREE from 'three';

function pointSegmentDistance(point,a,b){
  const ab=b.clone().sub(a),l2=ab.lengthSq();
  if(l2<1e-14)return point.distanceTo(a);
  const t=Math.max(0,Math.min(1,point.clone().sub(a).dot(ab)/l2));
  return point.distanceTo(a.clone().addScaledVector(ab,t));
}

function basisFor(normal){
  const n=normal.clone().normalize();
  const helper=Math.abs(n.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);
  const u=new THREE.Vector3().crossVectors(helper,n).normalize();
  const v=new THREE.Vector3().crossVectors(n,u).normalize();
  return {u,v};
}

function pointInPolygon(point,poly){
  let inside=false;
  for(let i=0,j=poly.length-1;i<poly.length;j=i++){
    const a=poly[i],b=poly[j];
    if(((a.y>point.y)!==(b.y>point.y))&&(point.x<(b.x-a.x)*(point.y-a.y)/((b.y-a.y)||1e-12)+a.x))inside=!inside;
  }
  return inside;
}

function pointSegmentDistance2(point,a,b){
  const ab=b.clone().sub(a),l2=ab.lengthSq();
  if(l2<1e-14)return point.distanceTo(a);
  const t=Math.max(0,Math.min(1,point.clone().sub(a).dot(ab)/l2));
  return point.distanceTo(a.clone().addScaledVector(ab,t));
}

function orient(a,b,c){return (b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);}
function segmentsCross(a,b,c,d){
  const o1=orient(a,b,c),o2=orient(a,b,d),o3=orient(c,d,a),o4=orient(c,d,b);
  return ((o1>0&&o2<0)||(o1<0&&o2>0))&&((o3>0&&o4<0)||(o3<0&&o4>0));
}

function polygonsOverlap(a,b){
  if(a.some(p=>pointInPolygon(p,b))||b.some(p=>pointInPolygon(p,a)))return true;
  for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++)if(segmentsCross(a[i],a[(i+1)%a.length],b[j],b[(j+1)%b.length]))return true;
  return false;
}

function loopsMatch3D(target,projected,tol){
  if(target.length!==projected.length)return false;
  const n=target.length;
  for(const direction of[1,-1])for(let offset=0;offset<n;offset++){
    let ok=true;
    for(let i=0;i<n;i++){
      const j=(offset+direction*i+n*4)%n;
      if(projected[i].distanceTo(target[j])>tol){ok=false;break;}
    }
    if(ok)return true;
  }
  return false;
}

function unsafeShellHit(mesh,sourceFaceIndex,distance){
  const source=mesh.faces[sourceFaceIndex];
  if(!source||source.length<3||!Number.isFinite(distance)||Math.abs(distance)<1e-6)return null;
  const normal=mesh.faceNormal(sourceFaceIndex)?.clone().normalize();
  if(!normal)return null;
  let scale=Infinity;
  for(let i=0;i<source.length;i++)scale=Math.min(scale,mesh.vertices[source[i]].distanceTo(mesh.vertices[source[(i+1)%source.length]]));
  const tol=Math.max(1e-6,(Number.isFinite(scale)?scale:1)*.01),direction=Math.sign(distance);
  let nearest=null;

  for(let fi=0;fi<mesh.faces.length;fi++){
    if(fi===sourceFaceIndex)continue;
    const target=mesh.faces[fi];
    if(!target||target.length<3)continue;
    const targetNormal=mesh.faceNormal(fi)?.clone().normalize();
    if(!targetNormal||normal.dot(targetNormal)>-.5)continue;
    const denom=normal.dot(targetNormal);
    if(Math.abs(denom)<.5)continue;
    const planePoint=mesh.vertices[target[0]];
    const ts=source.map(index=>planePoint.clone().sub(mesh.vertices[index]).dot(targetNormal)/denom);
    const t=ts.reduce((sum,value)=>sum+value,0)/ts.length;
    if(Math.sign(t)!==direction||Math.abs(distance)+tol<Math.abs(t)||Math.abs(t)<tol)continue;
    if(ts.some(value=>Math.abs(value-t)>tol*2))continue;

    const projected=source.map(index=>mesh.vertices[index].clone().addScaledVector(normal,t));
    const target3=target.map(index=>mesh.vertices[index]);
    const {u,v}=basisFor(targetNormal),origin=planePoint;
    const to2=p=>new THREE.Vector2(p.clone().sub(origin).dot(u),p.clone().sub(origin).dot(v));
    const projected2=projected.map(to2),target2=target3.map(to2);
    if(!polygonsOverlap(projected2,target2))continue;

    const exact=target.length===source.length&&loopsMatch3D(target3,projected,tol*2);
    let strictInside=false;
    if(target.length===source.length&&!exact){
      strictInside=projected2.every(p=>pointInPolygon(p,target2));
      if(strictInside){
        let clearance=Infinity;
        for(const p of projected2)for(let i=0;i<target2.length;i++)clearance=Math.min(clearance,pointSegmentDistance2(p,target2[i],target2[(i+1)%target2.length]));
        strictInside=clearance>tol*2;
      }
    }
    if(exact||strictInside)continue;
    const hit={targetFaceIndex:fi,distance:t};
    if(!nearest||Math.abs(t)<Math.abs(nearest.distance))nearest=hit;
  }
  return nearest;
}

function install(Ctor){
  const proto=Ctor?.prototype;
  if(!proto||proto.__boxlabExtrudeThroughViability)return;
  proto.__boxlabExtrudeThroughViability=true;

  if(proto.bridgeLoops){
    const baseBridge=proto.bridgeLoops;
    proto.bridgeLoops=function(loopA,loopB){
      if(Array.isArray(loopA)&&Array.isArray(loopB)&&loopA.length>=3&&loopB.length>=3){
        const shared=new Set(loopA.filter(v=>loopB.includes(v)));
        if(!shared.size){
          let scale=Infinity;
          for(const loop of[loopA,loopB])for(let i=0;i<loop.length;i++){
            const a=this.vertices[loop[i]],b=this.vertices[loop[(i+1)%loop.length]];
            if(a&&b)scale=Math.min(scale,a.distanceTo(b));
          }
          const tol=Math.max(1e-7,(Number.isFinite(scale)?scale:1)*1e-5);
          const touches=(points,edges)=>points.some(id=>{
            const p=this.vertices[id];if(!p)return false;
            for(let i=0;i<edges.length;i++){
              const a=this.vertices[edges[i]],b=this.vertices[edges[(i+1)%edges.length]];
              if(a&&b&&pointSegmentDistance(p,a,b)<=tol)return true;
            }
            return false;
          });
          if(touches(loopA,loopB)||touches(loopB,loopA))return null;
        }
      }
      return baseBridge.call(this,loopA,loopB);
    };
  }

  if(proto.extrudeFaceRegions){
    const baseExtrude=proto.extrudeFaceRegions;
    proto.extrudeFaceRegions=function(faceIndices,distance){
      const ids=[...new Set(faceIndices||[])].filter(i=>Number.isInteger(i)&&this.faces[i]);
      if(ids.length===1){
        const hit=unsafeShellHit(this,ids[0],distance);
        if(hit){
          const status=document.querySelector('#selectionStatus');
          if(status)status.textContent='Extrude • BLOCKED — shell intersection needs topology rebuild';
          return null;
        }
      }
      return baseExtrude.call(this,faceIndices,distance);
    };
  }
}

install(EditableMesh);
install(LiveEditableMesh);
