import * as THREE from 'three';
import {planThrough} from './through-kernel.js?v=0.36.16.0';

const canvas=document.querySelector('#viewport');
const extrudeButton=document.querySelector('#extrudeBtn');
const status=document.querySelector('#selectionStatus');
let probe=null,takeover=null,internalCancel=false;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedFace(){const b=bridge();if(b?.mode?.()!=='face')return null;const ids=[...new Set(b.indices?.()||[])];return ids.length===1?ids[0]:null;}
function extrudeArmed(){return !!(extrudeButton?.classList.contains('active')||extrudeButton?.classList.contains('boxlab-direct-stable'));}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function restore(target,source){target.vertices=source.vertices.map(v=>v.clone());target.faces=source.faces.map(f=>[...f]);target.creases=new Map(source.creases);target.looseEdges=new Set(source.looseEdges||[]);target.looseVertices=new Set(source.looseVertices||[]);}
function centerOf(m,ids){const c=new THREE.Vector3();ids.forEach(id=>c.add(m.vertices[id]));return c.multiplyScalar(1/ids.length);}
function screenPoint(point,camera){const p=point.clone().project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height};}
function projectedNormal(m,face,camera){const normal=m.faceNormal(face)?.clone().normalize();if(!normal)return null;const c=centerOf(m,m.faces[face]),a=screenPoint(c,camera),b=screenPoint(c.clone().add(normal),camera),x=b.x-a.x,y=b.y-a.y,l=Math.hypot(x,y);return l>1e-4?{x:x/l,y:y/l}:null;}
function faceBasis(normal){const n=normal.clone().normalize(),helper=Math.abs(n.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),u=new THREE.Vector3().crossVectors(helper,n).normalize(),v=new THREE.Vector3().crossVectors(n,u).normalize();return{u,v};}
function pointSegDistance2(p,a,b){const ab=b.clone().sub(a),l2=ab.lengthSq();if(l2<1e-12)return p.distanceTo(a);const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l2,0,1);return p.distanceTo(a.clone().addScaledVector(ab,t));}
function pointInPolygonInclusive(point,poly,tol){for(let i=0;i<poly.length;i++)if(pointSegDistance2(point,poly[i],poly[(i+1)%poly.length])<=tol)return true;let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a.y>point.y)!==(b.y>point.y))&&(point.x<(b.x-a.x)*(point.y-a.y)/((b.y-a.y)||1e-12)+a.x))inside=!inside;}return inside;}
function orient2(a,b,c){return(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);}
function segmentsMeet(a,b,c,d,tol){const o1=orient2(a,b,c),o2=orient2(a,b,d),o3=orient2(c,d,a),o4=orient2(c,d,b);if(((o1>tol&&o2<-tol)||(o1<-tol&&o2>tol))&&((o3>tol&&o4<-tol)||(o3<-tol&&o4>tol)))return true;return pointSegDistance2(a,c,d)<=tol||pointSegDistance2(b,c,d)<=tol||pointSegDistance2(c,a,b)<=tol||pointSegDistance2(d,a,b)<=tol;}
function polygonsOverlap2D(a,b,tol){if(a.some(p=>pointInPolygonInclusive(p,b,tol))||b.some(p=>pointInPolygonInclusive(p,a,tol)))return true;for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++)if(segmentsMeet(a[i],a[(i+1)%a.length],b[j],b[(j+1)%b.length],tol))return true;return false;}
function faceNormalFromLoop(m,loop){if(!loop||loop.length<3)return new THREE.Vector3();const a=m.vertices[loop[0]];for(let i=1;i<loop.length-1;i++){const n=new THREE.Vector3().crossVectors(m.vertices[loop[i]].clone().sub(a),m.vertices[loop[i+1]].clone().sub(a));if(n.lengthSq()>1e-12)return n.normalize();}return new THREE.Vector3();}
function orientLike(m,loop,normal){return faceNormalFromLoop(m,loop).dot(normal)<0?[...loop].reverse():loop;}
function directedPenalty(m,face){let score=0;for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length];for(const f of m.faces){if(!Array.isArray(f))continue;for(let j=0;j<f.length;j++)if(f[j]===a&&f[(j+1)%f.length]===b){score++;break;}}}return score;}
function orientAgainstMesh(m,face){const r=[...face].reverse();return directedPenalty(m,r)<directedPenalty(m,face)?r:face;}
function facePlane(m,fi){const face=m.faces[fi];if(!Array.isArray(face)||face.length<3)return null;const normal=m.faceNormal(fi)?.clone().normalize(),point=m.vertices[face[0]];if(!normal||!point)return null;return{normal,point};}
function samePlane(m,fi,normal,point,tol){const face=m.faces[fi];if(!Array.isArray(face)||face.length<3)return false;const n=m.faceNormal(fi)?.clone().normalize();if(!n||Math.abs(n.dot(normal))<.999)return false;return face.every(id=>Math.abs(m.vertices[id].clone().sub(point).dot(normal))<=tol);}
function facesOnPlane(m,normal,point,tol){return m.faces.map((_,fi)=>samePlane(m,fi,normal,point,tol)?fi:-1).filter(fi=>fi>=0);}
function coplanarFaces(m,seedFi,tol){const plane=facePlane(m,seedFi);return plane?facesOnPlane(m,plane.normal,plane.point,tol):[];}
function polygonsOnPlaneOverlap(m,faceIndices,poly3,normal,planePoint,tol){const {u,v}=faceBasis(normal),to2=p=>new THREE.Vector2(p.clone().sub(planePoint).dot(u),p.clone().sub(planePoint).dot(v)),poly2=poly3.map(to2);return faceIndices.some(fi=>{const f=m.faces[fi];return Array.isArray(f)&&f.length>=3&&polygonsOverlap2D(poly2,f.map(id=>to2(m.vertices[id])),tol);});}
function regionPlan(m,sourceFaceIndex){
  const source=m.faces[sourceFaceIndex];if(!Array.isArray(source)||source.length<3)return null;
  const sourceNormal=m.faceNormal(sourceFaceIndex)?.clone().normalize();if(!sourceNormal)return null;
  let scale=Infinity;for(let i=0;i<source.length;i++)scale=Math.min(scale,m.vertices[source[i]].distanceTo(m.vertices[source[(i+1)%source.length]]));
  const tol=Math.max(1e-5,(Number.isFinite(scale)?scale:1)*.0125);let best=null;
  for(let fi=0;fi<m.faces.length;fi++){
    if(fi===sourceFaceIndex)continue;
    const target=m.faces[fi];if(!Array.isArray(target)||target.length<3)continue;
    const targetNormal=m.faceNormal(fi)?.clone().normalize();if(!targetNormal||sourceNormal.dot(targetNormal)>-.75)continue;
    const denom=sourceNormal.dot(targetNormal);if(Math.abs(denom)<.75)continue;
    const planePoint=m.vertices[target[0]],ts=source.map(id=>planePoint.clone().sub(m.vertices[id]).dot(targetNormal)/denom),t=ts.reduce((a,b)=>a+b,0)/ts.length;
    if(Math.abs(t)<tol||ts.some(x=>Math.abs(x-t)>tol*2))continue;
    const projected=source.map(id=>m.vertices[id].clone().addScaledVector(sourceNormal,t)),targetFaces=coplanarFaces(m,fi,tol*2.5);
    if(!polygonsOnPlaneOverlap(m,targetFaces,projected,targetNormal,planePoint,tol*2))continue;
    const exteriorEdges=[];
    for(let i=0;i<source.length;i++){
      const j=(i+1)%source.length,a=source[i],b=source[j],va=m.vertices[a],vb=m.vertices[b],edgeDir=vb.clone().sub(va);
      if(edgeDir.lengthSq()<1e-12)continue;
      const sideNormal=new THREE.Vector3().crossVectors(edgeDir,sourceNormal).normalize(),sidePoint=va,quad=[va.clone(),vb.clone(),projected[j].clone(),projected[i].clone()];
      const planeFaces=facesOnPlane(m,sideNormal,sidePoint,tol*2.5).filter(x=>x!==sourceFaceIndex&&!targetFaces.includes(x));
      const hitFaces=planeFaces.filter(sideFi=>polygonsOnPlaneOverlap(m,[sideFi],quad,sideNormal,sidePoint,tol*2));
      if(hitFaces.length)exteriorEdges.push({slot:i,faces:hitFaces});
    }
    const candidate={sourceFaceIndex,distance:t,projected,targetFaces,targetNormal,tol,exteriorEdges};
    if(!best||Math.abs(t)<Math.abs(best.distance))best=candidate;
  }
  return best;
}
function previewExtrude(live,before,faceIndex,distance){restore(live,before);const source=before.faces[faceIndex],normal=before.faceNormal(faceIndex)?.clone().normalize();if(!source||!normal)return false;const replacement=new Map();for(const id of source){live.vertices.push(before.vertices[id].clone().addScaledVector(normal,distance));replacement.set(id,live.vertices.length-1);}live.faces[faceIndex]=source.map(id=>replacement.get(id));for(let i=0;i<source.length;i++){const a=source[i],b=source[(i+1)%source.length];live.faces.push([a,b,replacement.get(b),replacement.get(a)]);}live.edges();return true;}
function cancelNativeDrag(pointerId){internalCancel=true;try{canvas.dispatchEvent(new PointerEvent('pointercancel',{pointerId,isPrimary:true,bubbles:true,cancelable:true}));}catch{const e=new Event('pointercancel',{bubbles:true,cancelable:true});Object.defineProperty(e,'pointerId',{value:pointerId});canvas.dispatchEvent(e);}finally{internalCancel=false;}}
function polygonArea(poly){let a=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length];a+=p.x*q.y-q.x*p.y;}return a*.5;}
function splitByLine(poly,a,b,keepLeft,eps=1e-9){const out=[],cross=p=>(b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x);for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],cp=cross(p),cq=cross(q),pin=keepLeft?cp>=-eps:cp<=eps,qin=keepLeft?cq>=-eps:cq<=eps;if(pin)out.push(p.clone());if(pin!==qin){const t=cp/(cp-cq);out.push(p.clone().lerp(q,t));}}return out;}
function subtractConvex(poly,clip){if(poly.length<3||clip.length<3)return[poly];let c=clip.map(p=>p.clone());if(polygonArea(c)<0)c.reverse();let inside=[poly.map(p=>p.clone())],outside=[];for(let i=0;i<c.length;i++){const a=c[i],b=c[(i+1)%c.length],next=[];for(const piece of inside){const inPiece=splitByLine(piece,a,b,true),outPiece=splitByLine(piece,a,b,false);if(outPiece.length>=3&&Math.abs(polygonArea(outPiece))>1e-10)outside.push(outPiece);if(inPiece.length>=3&&Math.abs(polygonArea(inPiece))>1e-10)next.push(inPiece);}inside=next;if(!inside.length)break;}return outside;}
function dedupePoly(poly,eps=1e-8){const out=[];for(const p of poly)if(!out.length||p.distanceTo(out[out.length-1])>eps)out.push(p);if(out.length>2&&out[0].distanceTo(out[out.length-1])<=eps)out.pop();return out;}
function triangulateFace2D(m,face,normal){const {u,v}=faceBasis(normal),origin=m.vertices[face[0]],to2=id=>{const p=m.vertices[id].clone().sub(origin);return new THREE.Vector2(p.dot(u),p.dot(v));};let contour=face.map(to2);if(polygonArea(contour)<0)contour.reverse();const tris=THREE.ShapeUtils.triangulateShape(contour,[]);return{origin,u,v,tris:tris.map(t=>t.map(i=>contour[i].clone()))};}
function convexPieces3D(poly,normal){if(poly.length===3)return[[...poly]];const {u,v}=faceBasis(normal),origin=poly[0],to2=p=>{const q=p.clone().sub(origin);return new THREE.Vector2(q.dot(u),q.dot(v));},contour=poly.map(to2),tris=THREE.ShapeUtils.triangulateShape(contour,[]);return tris.map(t=>t.map(i=>poly[i].clone()));}
function pointKey3(p,tol){const s=1/Math.max(tol,1e-7);return`${Math.round(p.x*s)}:${Math.round(p.y*s)}:${Math.round(p.z*s)}`;}
function getVertex(trial,cache,p,tol){const k=pointKey3(p,tol);if(cache.has(k))return cache.get(k);trial.vertices.push(p.clone());const id=trial.vertices.length-1;cache.set(k,id);return id;}
function clipFaceByCuts(trial,faceIndex,cuts,cache,tol){const face=trial.faces[faceIndex];if(!Array.isArray(face)||face.length<3)return[];const normal=trial.faceNormal(faceIndex)?.clone().normalize();if(!normal)return[];const {origin,u,v,tris}=triangulateFace2D(trial,face,normal),to2=p=>new THREE.Vector2(p.clone().sub(origin).dot(u),p.clone().sub(origin).dot(v)),to3=p=>origin.clone().addScaledVector(u,p.x).addScaledVector(v,p.y),clipPolys=cuts.map(c=>c.map(to2)),outFaces=[];for(const tri of tris){let pieces=[tri];for(const clip of clipPolys){const next=[];for(const piece of pieces)next.push(...subtractConvex(piece,clip));pieces=next;if(!pieces.length)break;}for(let piece of pieces){piece=dedupePoly(piece);if(piece.length<3)continue;let ids=piece.map(p=>getVertex(trial,cache,to3(p),tol));if(new Set(ids).size<3)continue;if(ids.length===3)outFaces.push(orientLike(trial,ids,normal));else{const tt=THREE.ShapeUtils.triangulateShape(piece,[]);for(const triIdx of tt){const f=triIdx.map(i=>ids[i]);if(new Set(f).size===3)outFaces.push(orientLike(trial,f,normal));}}}}return outFaces;}
function uniqueFaces(values){return[...new Set(values.filter(Number.isInteger))];}
function buildRegion(before,plan){
  const trial=before.clone(),source=[...(trial.faces[plan.sourceFaceIndex]||[])];if(source.length<3)return null;
  const cutsByFace=new Map(),addCut=(fis,poly)=>{for(const fi of fis){if(fi===plan.sourceFaceIndex)continue;if(!cutsByFace.has(fi))cutsByFace.set(fi,[]);cutsByFace.get(fi).push(poly);}};
  for(const piece of convexPieces3D(plan.projected,plan.targetNormal))addCut(plan.targetFaces,piece);
  const exteriorSlots=new Set();
  for(const ext of plan.exteriorEdges){const i=ext.slot,j=(i+1)%source.length,quad=[trial.vertices[source[i]].clone(),trial.vertices[source[j]].clone(),plan.projected[j].clone(),plan.projected[i].clone()];addCut(ext.faces,quad);exteriorSlots.add(i);}
  const cache=new Map();trial.vertices.forEach((p,i)=>cache.set(pointKey3(p,plan.tol),i));
  const opening=plan.projected.map(p=>getVertex(trial,cache,p,plan.tol)),remove=uniqueFaces([plan.sourceFaceIndex,...cutsByFace.keys()]).sort((a,b)=>b-a),replacements=[];
  for(const [fi,cuts] of cutsByFace)replacements.push(...clipFaceByCuts(trial,fi,cuts,cache,plan.tol));
  for(const fi of remove)trial.faces.splice(fi,1);
  trial.faces.push(...replacements);
  for(let i=0;i<source.length;i++){if(exteriorSlots.has(i))continue;const j=(i+1)%source.length,q=[source[i],source[j],opening[j],opening[i]];if(new Set(q).size===4)trial.faces.push(orientAgainstMesh(trial,q));}
  trial.edges();return trial;
}
function clear(){probe=null;takeover=null;}
window.addEventListener('pointerdown',event=>{
  if(internalCancel||event.target!==canvas||!event.isPrimary||!extrudeArmed())return;
  const m=mesh(),faceIndex=selectedFace(),camera=state()?.camera;if(!m||!Number.isInteger(faceIndex)||!camera)return;
  if(planThrough(m,faceIndex).ok)return;
  const plan=regionPlan(m,faceIndex);if(!plan)return;
  const normal2d=projectedNormal(m,faceIndex,camera);if(!normal2d)return;
  probe={id:event.pointerId,x:event.clientX,y:event.clientY,m,faceIndex,before:m.clone(),plan,normal2d,passedMove:false};
},true);
window.addEventListener('pointermove',event=>{if(internalCancel||!probe||probe.id!==event.pointerId||takeover)return;const dx=event.clientX-probe.x,dy=event.clientY-probe.y;if(Math.hypot(dx,dy)<8)return;const distance=(dx*probe.normal2d.x+dy*probe.normal2d.y)*.006,toward=Math.sign(distance)===Math.sign(probe.plan.distance);if(toward&&Math.abs(distance)>=Math.abs(probe.plan.distance)*.55){event.preventDefault();event.stopImmediatePropagation();if(!probe.passedMove)globalThis.__boxlabHistory?.push(probe.before);cancelNativeDrag(probe.id);takeover=probe;probe=null;let d=distance,ready=false;if(Math.abs(d)>=Math.abs(takeover.plan.distance)){d=takeover.plan.distance;ready=true;}takeover.distance=d;takeover.ready=ready;previewExtrude(takeover.m,takeover.before,takeover.faceIndex,d);if(status)status.textContent=`${ready?'THROUGH REGION READY':'Extrude In'} • sequential fallback • ${d>=0?'+':''}${d.toFixed(2)}`;render();}else probe.passedMove=true;},true);
window.addEventListener('pointermove',event=>{if(internalCancel||!takeover||takeover.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const dx=event.clientX-takeover.x,dy=event.clientY-takeover.y;let d=(dx*takeover.normal2d.x+dy*takeover.normal2d.y)*.006,ready=Math.sign(d)===Math.sign(takeover.plan.distance)&&Math.abs(d)>=Math.abs(takeover.plan.distance);if(ready)d=takeover.plan.distance;takeover.distance=d;takeover.ready=ready;previewExtrude(takeover.m,takeover.before,takeover.faceIndex,d);if(status)status.textContent=`${ready?'THROUGH REGION READY':d<0?'Extrude In':'Extrude'} • sequential fallback • ${d>=0?'+':''}${d.toFixed(2)}`;render();},true);
window.addEventListener('pointerup',event=>{if(internalCancel)return;if(takeover&&takeover.id===event.pointerId){event.preventDefault();event.stopImmediatePropagation();const t=takeover;takeover=null;probe=null;if(t.ready){const built=buildRegion(t.before,t.plan);if(built){restore(t.m,built);bridge()?.set?.('face',[]);if(status)status.textContent='Extrude Through • sequential topology fallback';}else{restore(t.m,t.before);bridge()?.set?.('face',[t.faceIndex]);if(status)status.textContent='Extrude Through • sequential rebuild failed';}}else{previewExtrude(t.m,t.before,t.faceIndex,t.distance);bridge()?.set?.('face',[t.faceIndex]);}render();return;}probe=null;},true);
window.addEventListener('pointercancel',event=>{if(internalCancel)return;if(takeover&&takeover.id===event.pointerId){restore(takeover.m,takeover.before);render();}clear();},true);
