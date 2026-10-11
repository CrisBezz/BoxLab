import * as THREE from 'three';

const status=document.querySelector('#selectionStatus');

function faceNormal(mesh,face){
  if(!Array.isArray(face)||face.length<3)return null;
  const a=mesh.vertices[face[0]];
  for(let i=1;i<face.length-1;i++){
    const b=mesh.vertices[face[i]],c=mesh.vertices[face[i+1]];
    if(!a||!b||!c)continue;
    const n=new THREE.Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a));
    if(n.lengthSq()>1e-12)return n.normalize();
  }
  return null;
}
function basis(normal){
  const helper=Math.abs(normal.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);
  const u=new THREE.Vector3().crossVectors(helper,normal).normalize();
  const v=new THREE.Vector3().crossVectors(normal,u).normalize();
  return{u,v};
}
function orientLike(mesh,face,normal){
  const n=faceNormal(mesh,face);return n&&n.dot(normal)<0?[...face].reverse():face;
}
function triangulateConcaveTailFace(mesh){
  const n=mesh?.faces?.length||0;if(n<3)return false;
  const index=n-3,face=mesh.faces[index];if(!Array.isArray(face)||face.length<4)return false;
  const normal=faceNormal(mesh,face);if(!normal)return false;
  const {u,v}=basis(normal),origin=mesh.vertices[face[0]],contour=face.map(id=>{const p=mesh.vertices[id].clone().sub(origin);return new THREE.Vector2(p.dot(u),p.dot(v));});
  let sign=0,concave=false;
  for(let i=0;i<contour.length;i++){
    const a=contour[i],b=contour[(i+1)%contour.length],c=contour[(i+2)%contour.length],ab=b.clone().sub(a),bc=c.clone().sub(b),cross=ab.x*bc.y-ab.y*bc.x;
    if(Math.abs(cross)<1e-10)continue;const s=Math.sign(cross);if(sign&&s!==sign){concave=true;break;}sign=s;
  }
  if(!concave)return false;
  const tris=THREE.ShapeUtils.triangulateShape(contour,[]);if(!tris?.length)return false;
  mesh.faces.splice(index,1,...tris.map(t=>orientLike(mesh,t.map(i=>face[i]),normal)));
  return true;
}
function directedEdge(face,a,b){
  if(!Array.isArray(face))return 0;
  for(let i=0;i<face.length;i++){const x=face[i],y=face[(i+1)%face.length];if(x===a&&y===b)return 1;if(x===b&&y===a)return-1;}
  return 0;
}
function alignedQuads(mesh,loopA,loopB,flip){
  const quads=[];
  for(let i=0;i<loopA.length;i++){
    const next=(i+1)%loopA.length;
    const q=flip?[loopA[i],loopB[i],loopB[next],loopA[next]]:[loopA[i],loopA[next],loopB[next],loopB[i]];
    if(new Set(q).size!==4)return null;quads.push(q);
  }
  return quads;
}
function windingPenalty(mesh,quads){
  let score=0;
  for(const q of quads)for(let i=0;i<q.length;i++){
    const a=q[i],b=q[(i+1)%q.length];for(const face of mesh.faces)if(directedEdge(face,a,b)===1)score++;
  }
  return score;
}
function install(){
  const active=globalThis.__boxlabBridgeState?.mesh,proto=active?Object.getPrototypeOf(active):null;
  if(!proto||proto.__boxlabCornerThroughCleanup)return!!proto;
  const original=proto.bridgeLoops;if(typeof original!=='function')return false;
  Object.defineProperty(proto,'__boxlabCornerThroughCleanup',{value:true,configurable:true});
  proto.bridgeLoops=function(loopA,loopB){
    const cornerReady=(status?.textContent||'').includes('THROUGH CORNER READY');
    if(!cornerReady||!Array.isArray(loopA)||!Array.isArray(loopB)||loopA.length!==loopB.length||loopA.length<3)return original.call(this,loopA,loopB);

    // buildCorner pushes target remainder + the two outside remainders immediately
    // before bridging. Ear-clip the concave rear remainder first so it cannot fan
    // across the new opening in the viewport/export.
    triangulateConcaveTailFace(this);

    // The corner builder creates opening[] in the same source-slot order. Do not let
    // bestBridgePlan rotate that correspondence: it twists the two surviving tunnel
    // walls. Keep i -> i and only choose the safer winding direction.
    const a=alignedQuads(this,loopA,loopB,false),b=alignedQuads(this,loopA,loopB,true);
    if(!a||!b)return original.call(this,loopA,loopB);
    const quads=windingPenalty(this,a)<=windingPenalty(this,b)?a:b,start=this.faces.length;
    this.faces.push(...quads.map(q=>[...q]));
    if(this.looseEdges instanceof Set){for(const loop of[loopA,loopB])for(let i=0;i<loop.length;i++)this.looseEdges.delete(this.edgeKey(loop[i],loop[(i+1)%loop.length]));}
    this.edges?.();
    return{faceIndices:Array.from({length:quads.length},(_,i)=>start+i),plan:{cornerAligned:true}};
  };
  return true;
}

install();
window.addEventListener('boxlab-bridge-state',install);
document.addEventListener('boxlab-bridge-state',install);
