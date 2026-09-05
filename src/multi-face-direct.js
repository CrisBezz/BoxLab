import './uniform-inset.js?v=0.32.11';
import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const extrudeButton = document.querySelector('#extrudeBtn');
const insetButton = document.querySelector('#insetBtn');
const transformButtons=[...document.querySelectorAll('#toolModes button')];
const inferenceToggle=document.querySelector('#inferenceSnapToggle');
const status = document.querySelector('#selectionStatus');
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const REF_VERTEX_PX=18,REF_EDGE_PX=16;
let armed = null;
let drag = null;
let pendingSelection = null;
let refMarker=null,refGuide=null;

if(!document.querySelector('#boxlabDirectStableStyle')){
  const style=document.createElement('style');
  style.id='boxlabDirectStableStyle';
  style.textContent='#extrudeBtn.boxlab-direct-stable,#insetBtn.boxlab-direct-stable{background:#f2f5fa!important;color:#111318!important;border-color:#f2f5fa!important;}';
  document.head.appendChild(style);
}

function state(){ return globalThis.__boxlabBridgeState; }
function bridge(){ return globalThis.__boxlabSelectionBridge; }
function mesh(){ return state()?.mesh || null; }
function faces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function restore(target,source){target.vertices=source.vertices.map(v=>v.clone());target.faces=source.faces.map(f=>[...f]);target.creases=new Map(source.creases);target.looseEdges=new Set(source.looseEdges||[]);target.looseVertices=new Set(source.looseVertices||[]);}
function disarmTransforms(){globalThis.__boxlabTransformArming?.disarm?.();transformButtons.forEach(button=>button.classList.remove('active'));}
function syncButtons(){const extrudeOn=armed==='extrude',insetOn=armed==='inset';extrudeButton?.classList.toggle('boxlab-direct-stable',extrudeOn);insetButton?.classList.toggle('boxlab-direct-stable',insetOn);extrudeButton?.classList.toggle('active',extrudeOn);insetButton?.classList.toggle('active',insetOn);}
function key(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function selectionComponentsInfo(m,faceIndices){
  const ids=[...new Set(faceIndices||[])].filter(i=>Number.isInteger(i)&&Array.isArray(m?.faces?.[i])&&m.faces[i].length>=3);
  if(!m||!ids.length)return null;
  const selected=new Set(ids),edgeOwners=new Map(),adjacency=new Map(ids.map(i=>[i,new Set()]));
  for(const fi of ids){
    const face=m.faces[fi];
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],k=key(a,b);
      if(!edgeOwners.has(k))edgeOwners.set(k,[]);
      edgeOwners.get(k).push({faceIndex:fi,a,b});
    }
  }
  for(const owners of edgeOwners.values()){
    const inside=owners.filter(o=>selected.has(o.faceIndex));
    for(let a=0;a<inside.length;a++)for(let b=a+1;b<inside.length;b++){
      adjacency.get(inside[a].faceIndex)?.add(inside[b].faceIndex);
      adjacency.get(inside[b].faceIndex)?.add(inside[a].faceIndex);
    }
  }
  const unvisited=new Set(ids),regions=[];
  while(unvisited.size){
    const seed=unvisited.values().next().value,queue=[seed],component=[];
    unvisited.delete(seed);
    while(queue.length){const current=queue.shift();component.push(current);for(const next of adjacency.get(current)||[])if(unvisited.delete(next))queue.push(next);}
    const componentSet=new Set(component),componentEdges=new Map(),regionVertices=new Set(),normal=new THREE.Vector3();
    for(const fi of component){
      const face=m.faces[fi];
      normal.add(m.faceNormal(fi));
      face.forEach(v=>regionVertices.add(v));
      for(let i=0;i<face.length;i++){
        const a=face[i],b=face[(i+1)%face.length],k=key(a,b);
        if(!componentEdges.has(k))componentEdges.set(k,[]);
        componentEdges.get(k).push({faceIndex:fi,a,b});
      }
    }
    const boundaryEdges=[];
    for(const owners of componentEdges.values()){
      const inside=owners.filter(o=>componentSet.has(o.faceIndex));
      if(inside.length===1)boundaryEdges.push(inside[0]);
      else if(inside.length>2)return null;
    }
    if(normal.lengthSq()<1e-10)normal.copy(m.faceNormal(component[0]));else normal.normalize();
    regions.push({faceIndices:component,regionVertices:[...regionVertices],boundaryEdges,normal});
  }
  return{faceIndices:ids,regions,regionCount:regions.length};
}
function info(ids=faces()){
  const m=mesh();if(!m||!ids.length)return null;
  return m.faceRegionsInfo?.(ids)||selectionComponentsInfo(m,ids);
}
function updateStatus(){const i=info();if(!status)return;if(!armed){status.textContent='Face mode • tool off';return;}if(!i){status.textContent=`${armed==='extrude'?'Extrude':'Inset'} • select face or faces`;return;}status.textContent=`${i.faceIndices.length} face${i.faceIndices.length===1?'':'s'} • ${i.regionCount} region${i.regionCount===1?'':'s'} • drag to ${armed==='extrude'?'Extrude':'Uniform Inset'}`;}
function screenPoint(point,camera){const p=point.clone().project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height};}
function centerOf(m,vertices){const c=m.vertices[vertices[0]].clone().set(0,0,0);vertices.forEach(i=>c.add(m.vertices[i]));return c.multiplyScalar(1/vertices.length);}
function projectedNormal(m,region,camera){const n=region?.normal||m.faceRegionNormal?.(region?.faceIndices||[]);if(!region||!n||!camera)return{x:0,y:-1};const c=centerOf(m,region.regionVertices),a=screenPoint(c,camera),b=screenPoint(c.clone().add(n),camera),x=b.x-a.x,y=b.y-a.y,l=Math.hypot(x,y);return l>1e-4?{x:x/l,y:y/l}:{x:0,y:-1};}
function setPointer(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));}
function hitSelectedFace(event,m,ids,camera){setPointer(event);raycaster.setFromCamera(pointer,camera);const pickers=[];for(const faceIndex of ids){const f=m.faces[faceIndex];if(!Array.isArray(f)||f.length<3)continue;const positions=[];for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){const v=m.vertices[vi];if(v)positions.push(v.x,v.y,v.z);}if(!positions.length)continue;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),picker=new THREE.Mesh(g,mat);picker.userData.faceIndex=faceIndex;pickers.push(picker);}const hit=raycaster.intersectObjects(pickers,false)[0],faceIndex=Number.isInteger(hit?.object?.userData?.faceIndex)?hit.object.userData.faceIndex:null;pickers.forEach(p=>{p.geometry.dispose();p.material.dispose();});return faceIndex;}
function clearRefVisual(){refMarker?.remove();refGuide?.remove();refMarker=refGuide=null;}
function showRefVisual(ref,inferred,camera){clearRefVisual();const p=screenPoint(ref.point,camera),q=screenPoint(inferred,camera);const mark=document.createElement('div');mark.style.cssText='position:fixed;pointer-events:none;width:12px;height:12px;border-radius:50%;border:2px solid white;background:#ffe14a;box-shadow:0 0 0 2px #0008;z-index:10000;transform:translate(-50%,-50%)';mark.style.left=`${p.x}px`;mark.style.top=`${p.y}px`;document.body.appendChild(mark);refMarker=mark;const line=document.createElement('div'),dx=q.x-p.x,dy=q.y-p.y;line.style.cssText='position:fixed;pointer-events:none;height:2px;background:#ffe14a;transform-origin:0 50%;z-index:9999;box-shadow:0 0 4px #0008';line.style.left=`${p.x}px`;line.style.top=`${p.y}px`;line.style.width=`${Math.hypot(dx,dy)}px`;line.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;document.body.appendChild(line);refGuide=line;}
function referenceUnderPointer(event,d){if(!inferenceToggle?.checked)return null;const m=d.before,camera=d.camera,selectedFaces=new Set(d.faces),selectedVertices=new Set();d.faces.forEach(fi=>(m.faces[fi]||[]).forEach(v=>selectedVertices.add(v)));let bestV=null;m.vertices.forEach((v,i)=>{if(selectedVertices.has(i))return;const sp=screenPoint(v,camera),dist=Math.hypot(event.clientX-sp.x,event.clientY-sp.y);if(dist<=REF_VERTEX_PX&&(!bestV||dist<bestV.d))bestV={type:'Vertex',index:i,point:v.clone(),d:dist};});if(bestV)return bestV;let bestE=null;m.edges().forEach((e,i)=>{if(selectedVertices.has(e.a)&&selectedVertices.has(e.b))return;const a=screenPoint(m.vertices[e.a],camera),b=screenPoint(m.vertices[e.b],camera),vx=b.x-a.x,vy=b.y-a.y,l2=vx*vx+vy*vy;if(l2<1)return;const t=THREE.MathUtils.clamp(((event.clientX-a.x)*vx+(event.clientY-a.y)*vy)/l2,0,1),qx=a.x+vx*t,qy=a.y+vy*t,dist=Math.hypot(event.clientX-qx,event.clientY-qy);if(dist<=REF_EDGE_PX&&(!bestE||dist<bestE.d))bestE={type:'Edge',index:i,point:m.vertices[e.a].clone().lerp(m.vertices[e.b],t),d:dist};});if(bestE)return bestE;setPointer(event);raycaster.setFromCamera(pointer,camera);let bestF=null;m.faces.forEach((f,fi)=>{if(selectedFaces.has(fi))return;const positions=[];for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){const v=m.vertices[vi];positions.push(v.x,v.y,v.z);}if(!positions.length)return;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),obj=new THREE.Mesh(g,mat),hit=raycaster.intersectObject(obj,false)[0];g.dispose();mat.dispose();if(hit&&(!bestF||hit.distance<bestF.distance))bestF={type:'Face',index:fi,point:hit.point.clone(),distance:hit.distance};});return bestF;}
function closestPointOnSegment(point,a,b){const ab=b.clone().sub(a),l2=ab.lengthSq();if(l2<1e-12)return a.clone();const t=THREE.MathUtils.clamp(point.clone().sub(a).dot(ab)/l2,0,1);return a.clone().addScaledVector(ab,t);}
function insetReference(d,ref){const m=d.before,group=m.faceRegionsInfo?.(d.faces);if(!group||!ref?.point)return null;let best=null;for(const region of group.regions||[]){const loop=region.boundaryLoop||[];if(loop.length<3)continue;let minEdge=Infinity,nearest=null,nearestDistance=Infinity;for(let i=0;i<loop.length;i++){const a=m.vertices[loop[i]],b=m.vertices[loop[(i+1)%loop.length]];if(!a||!b)continue;minEdge=Math.min(minEdge,a.distanceTo(b));const q=closestPointOnSegment(ref.point,a,b),distance=q.distanceTo(ref.point);if(distance<nearestDistance){nearestDistance=distance;nearest=q;}}if(!Number.isFinite(minEdge)||minEdge<1e-8||!nearest)continue;const maxDistance=minEdge*.5,amount=THREE.MathUtils.clamp(nearestDistance/maxDistance,.01,.95);const candidate={amount,distance:maxDistance*amount,boundaryPoint:nearest,rawDistance:nearestDistance};if(!best||candidate.rawDistance<best.rawDistance)best=candidate;}return best;}

function faceBasis(normal){const n=normal.clone().normalize(),helper=Math.abs(n.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),u=new THREE.Vector3().crossVectors(helper,n).normalize(),v=new THREE.Vector3().crossVectors(n,u).normalize();return{u,v};}
function pointSegDistance2(p,a,b){const ab=b.clone().sub(a),l2=ab.lengthSq();if(l2<1e-12)return p.distanceTo(a);const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l2,0,1);return p.distanceTo(a.clone().addScaledVector(ab,t));}
function pointInPolygonInclusive(point,poly,tol){for(let i=0;i<poly.length;i++)if(pointSegDistance2(point,poly[i],poly[(i+1)%poly.length])<=tol)return true;let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a.y>point.y)!==(b.y>point.y))&&(point.x<(b.x-a.x)*(point.y-a.y)/((b.y-a.y)||1e-12)+a.x))inside=!inside;}return inside;}
function minPolygonEdgeDistance(point,poly){let best=Infinity;for(let i=0;i<poly.length;i++)best=Math.min(best,pointSegDistance2(point,poly[i],poly[(i+1)%poly.length]));return best;}
function convexPolygon(poly){if(poly.length<3)return false;let sign=0;for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],c=poly[(i+2)%poly.length],ab=b.clone().sub(a),bc=c.clone().sub(b),cross=ab.x*bc.y-ab.y*bc.x;if(Math.abs(cross)<1e-8)continue;const s=Math.sign(cross);if(sign&&s!==sign)return false;sign=s;}return !!sign;}
function projectedLoopMatchesTarget(m,targetLoop,points,tol){if(targetLoop.length!==points.length)return false;const target=targetLoop.map(i=>m.vertices[i]);const n=points.length;for(const direction of[1,-1])for(let offset=0;offset<n;offset++){let ok=true;for(let i=0;i<n;i++){const j=(offset+direction*i+n*4)%n;if(points[i].distanceTo(target[j])>tol){ok=false;break;}}if(ok)return true;}return false;}
function findThroughPlan(m,sourceFaceIndex,distance){const source=m.faces[sourceFaceIndex];if(!source||source.length<3||!Number.isFinite(distance)||Math.abs(distance)<1e-5)return null;const sourceNormal=m.faceNormal(sourceFaceIndex)?.clone().normalize();if(!sourceNormal)return null;let minEdge=Infinity;for(let i=0;i<source.length;i++)minEdge=Math.min(minEdge,m.vertices[source[i]].distanceTo(m.vertices[source[(i+1)%source.length]]));const tol=Math.max(1e-5,(Number.isFinite(minEdge)?minEdge:1)*.015),direction=Math.sign(distance);let best=null;for(let targetFaceIndex=0;targetFaceIndex<m.faces.length;targetFaceIndex++){if(targetFaceIndex===sourceFaceIndex)continue;const target=m.faces[targetFaceIndex];if(!target||target.length!==source.length||target.length<3)continue;const targetNormal=m.faceNormal(targetFaceIndex)?.clone().normalize();if(!targetNormal||sourceNormal.dot(targetNormal)>-.75)continue;const denom=sourceNormal.dot(targetNormal);if(Math.abs(denom)<.75)continue;const planePoint=m.vertices[target[0]],ts=source.map(index=>planePoint.clone().sub(m.vertices[index]).dot(targetNormal)/denom),t=ts.reduce((a,b)=>a+b,0)/ts.length;if(Math.sign(t)!==direction||Math.abs(distance)+tol<Math.abs(t)||Math.abs(t)<tol)continue;if(ts.some(value=>Math.abs(value-t)>tol*2))continue;if(target.some(index=>Math.abs(m.vertices[index].clone().sub(planePoint).dot(targetNormal))>tol*2))continue;const projected=source.map(index=>m.vertices[index].clone().addScaledVector(sourceNormal,t)),{u,v}=faceBasis(targetNormal),origin=planePoint,to2=p=>new THREE.Vector2(p.clone().sub(origin).dot(u),p.clone().sub(origin).dot(v)),outer2=target.map(index=>to2(m.vertices[index])),inner2=projected.map(to2);if(!convexPolygon(outer2)||!convexPolygon(inner2))continue;if(inner2.some(p=>!pointInPolygonInclusive(p,outer2,tol)))continue;const useTargetLoop=projectedLoopMatchesTarget(m,target,projected,tol*2);if(!useTargetLoop&&inner2.some(p=>minPolygonEdgeDistance(p,outer2)<=tol*2.5))continue;const candidate={sourceFaceIndex,targetFaceIndex,distance:t,projected,useTargetLoop};if(!best||Math.abs(t)<Math.abs(best.distance))best=candidate;}return best;}
function faceSharesSourceVertex(face,sourceSet){return face?.some?.(v=>sourceSet.has(v));}
function firstShellHit(m,sourceFaceIndex,distance){const source=m.faces[sourceFaceIndex];if(!source||source.length<3||!Number.isFinite(distance)||Math.abs(distance)<1e-6)return null;const normal=m.faceNormal(sourceFaceIndex)?.clone().normalize();if(!normal)return null;const direction=normal.multiplyScalar(Math.sign(distance)),maxDistance=Math.abs(distance),sourceSet=new Set(source);let scale=Infinity;for(let i=0;i<source.length;i++)scale=Math.min(scale,m.vertices[source[i]].distanceTo(m.vertices[source[(i+1)%source.length]]));const eps=Math.max(1e-6,(Number.isFinite(scale)?scale:1)*1e-5),samples=[];for(let i=0;i<source.length;i++){const a=m.vertices[source[i]],b=m.vertices[source[(i+1)%source.length]];samples.push(a.clone(),a.clone().lerp(b,.5));}samples.push(centerOf(m,source));let best=null;for(let fi=0;fi<m.faces.length;fi++){if(fi===sourceFaceIndex)continue;const face=m.faces[fi];if(!Array.isArray(face)||face.length<3||faceSharesSourceVertex(face,sourceSet))continue;const a=m.vertices[face[0]];if(!a)continue;for(let i=1;i<face.length-1;i++){const b=m.vertices[face[i]],c=m.vertices[face[i+1]];if(!b||!c)continue;for(const sample of samples){const origin=sample.clone().addScaledVector(direction,eps),ray=new THREE.Ray(origin,direction),hit=new THREE.Vector3();if(!ray.intersectTriangle(a,b,c,false,hit)&&!ray.intersectTriangle(a,c,b,false,hit))continue;const t=hit.clone().sub(sample).dot(direction);if(t<=eps||t>maxDistance+eps)continue;if(!best||t<best.distance)best={faceIndex:fi,distance:t};}}}return best;}
function classifySingleFaceContact(m,sourceFaceIndex,distance){
  const throughPlan=findThroughPlan(m,sourceFaceIndex,distance);
  const shellHit=firstShellHit(m,sourceFaceIndex,distance);
  if(throughPlan&&(!shellHit||shellHit.faceIndex===throughPlan.targetFaceIndex))return{mode:'through',throughPlan,shellHit};
  if(shellHit)return{mode:'blocked',throughPlan:null,shellHit};
  return{mode:'extrude',throughPlan:null,shellHit:null};
}
function buildThroughOnClone(before,plan){const trial=before.clone(),sourceLoop=[...(trial.faces[plan.sourceFaceIndex]||[])],targetLoop=[...(trial.faces[plan.targetFaceIndex]||[])];if(sourceLoop.length<3||sourceLoop.length!==targetLoop.length||typeof trial.bridgeLoops!=='function')return null;let innerLoop;if(plan.useTargetLoop)innerLoop=[...targetLoop];else{innerLoop=plan.projected.map(point=>{trial.vertices.push(point.clone());return trial.vertices.length-1;});}for(const index of[plan.sourceFaceIndex,plan.targetFaceIndex].sort((a,b)=>b-a))trial.faces.splice(index,1);let ring=null;if(!plan.useTargetLoop){ring=trial.bridgeLoops(targetLoop,innerLoop);if(!ring)return null;}const tunnel=trial.bridgeLoops(sourceLoop,innerLoop);if(!tunnel)return null;trial.edges();return{mesh:trial,ring,tunnel};}
function extrudeConnectedFaceSelection(m,faceIndices,distance){
  const group=selectionComponentsInfo(m,faceIndices);if(!group)return null;
  const results=[];
  for(const region of group.regions){
    if(!region.boundaryEdges.length)return null;
    const incident=new Map(region.regionVertices.map(v=>[v,[]]));
    for(const fi of region.faceIndices){const n=m.faceNormal(fi).clone().normalize();for(const v of m.faces[fi])incident.get(v)?.push(n);}
    const replacement=new Map();
    for(const vertex of region.regionVertices){
      const normals=incident.get(vertex)||[],sum=new THREE.Vector3();normals.forEach(n=>sum.add(n));
      let dir=sum.lengthSq()>1e-10?sum.normalize():normals[0]?.clone();if(!dir)return null;
      const dots=normals.map(n=>dir.dot(n)).filter(v=>v>1e-4),denom=dots.length?dots.reduce((a,b)=>a+b,0)/dots.length:1;
      const move=dir.multiplyScalar(distance/Math.max(.15,denom));
      m.vertices.push(m.vertices[vertex].clone().add(move));replacement.set(vertex,m.vertices.length-1);
    }
    for(const fi of region.faceIndices)m.faces[fi]=m.faces[fi].map(v=>replacement.get(v));
    const sideStart=m.faces.length;
    for(const edge of region.boundaryEdges)m.faces.push([edge.a,edge.b,replacement.get(edge.b),replacement.get(edge.a)]);
    results.push({faceIndices:[...region.faceIndices],sideFaceIndices:Array.from({length:region.boundaryEdges.length},(_,i)=>sideStart+i),distance,mode:'connected-miter'});
  }
  m.edges();
  return{faceIndices:[...group.faceIndices],regions:results,regionCount:results.length,distance,mode:'connected-miter'};
}

document.addEventListener('boxlab-direct-tool-exclusive',event=>{if(event.detail?.tool==='knife'){armed=null;drag=null;pendingSelection=null;clearRefVisual();syncButtons();}},true);
document.addEventListener('pointerdown',event=>{const target=event.target?.closest?.('#extrudeBtn,#insetBtn');if(!target)return;const ids=faces();pendingSelection=ids.length?{tool:target.id==='extrudeBtn'?'extrude':'inset',ids:[...ids]}:null;},true);
document.addEventListener('click',event=>{const transform=event.target?.closest?.('#toolModes button');if(transform){pendingSelection=null;if(armed){armed=null;clearRefVisual();syncButtons();}return;}const target=event.target?.closest?.('#extrudeBtn,#insetBtn');if(!target)return;event.preventDefault();event.stopImmediatePropagation();const tool=target.id==='extrudeBtn'?'extrude':'inset';if(armed===tool){pendingSelection=null;armed=null;clearRefVisual();syncButtons();updateStatus();document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'none'}}));return;}const captured=pendingSelection?.tool===tool?[...pendingSelection.ids]:faces();pendingSelection=null;disarmTransforms();document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool}}));if(captured.length)bridge()?.set?.('face',captured);armed=tool;syncButtons();updateStatus();},true);
window.addEventListener('boxlab-bridge-state',()=>{if(!armed)return;queueMicrotask(()=>{syncButtons();updateStatus();});});
document.addEventListener('pointerdown',event=>{if(!armed||event.target!==canvas||!event.isPrimary)return;const ids=faces();if(!ids.length)return;const m=mesh(),group=armed==='extrude'?selectionComponentsInfo(m,ids):m?.faceRegionsInfo?.(ids),camera=state()?.camera;if(!m||!group||!camera)return;const hit=hitSelectedFace(event,m,ids,camera);if(!Number.isInteger(hit))return;const region=group.regions.find(r=>r.faceIndices.includes(hit))||group.regions[0],hitFace=m.faces[hit],worldNormal=(armed==='extrude'?m.faceNormal(hit):region?.normal||m.faceRegionNormal?.(region?.faceIndices||[]))?.clone?.().normalize?.(),controlRegion=armed==='extrude'?{normal:worldNormal,regionVertices:[...hitFace]}:region,regionCenter=centerOf(m,controlRegion.regionVertices);event.preventDefault();event.stopImmediatePropagation();drag={id:event.pointerId,x:event.clientX,y:event.clientY,tool:armed,m,before:m.clone(),faces:[...ids],normal:projectedNormal(m,controlRegion,camera),worldNormal,regionCenter,camera,changed:false,preview:false,snap:null,throughPlan:null,blocked:false,shellHit:null};canvas.setPointerCapture?.(event.pointerId);},true);
document.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(!drag.changed&&Math.hypot(dx,dy)<8)return;if(!drag.changed){globalThis.__boxlabHistory?.push(drag.before);drag.changed=true;}restore(drag.m,drag.before);if(drag.tool==='extrude'){let distance=(dx*drag.normal.x+dy*drag.normal.y)*.006;const ref=drag.worldNormal?referenceUnderPointer(event,drag):null;if(ref){distance=ref.point.clone().sub(drag.regionCenter).dot(drag.worldNormal);const inferred=drag.regionCenter.clone().addScaledVector(drag.worldNormal,distance);showRefVisual(ref,inferred,drag.camera);drag.snap=ref;}else{clearRefVisual();drag.snap=null;}const contact=drag.faces.length===1?classifySingleFaceContact(drag.before,drag.faces[0],distance):{mode:'extrude',throughPlan:null,shellHit:null};drag.throughPlan=contact.throughPlan;drag.shellHit=contact.shellHit;drag.blocked=contact.mode==='blocked';if(drag.blocked){drag.preview=false;clearRefVisual();drag.snap=null;if(status)status.textContent=`Extrude In • BLOCKED — first shell contact is not a valid Through target${drag.shellHit?` • ${drag.shellHit.distance.toFixed(2)}`:''}`;}else{if(drag.throughPlan){distance=drag.throughPlan.distance;clearRefVisual();drag.snap=null;}const result=extrudeConnectedFaceSelection(drag.m,drag.faces,distance);drag.preview=!!result;if(result&&status){const mode=drag.throughPlan?'THROUGH READY':distance<0?'Extrude In':'Extrude';status.textContent=`${mode} • ${drag.faces.length} face${drag.faces.length===1?'':'s'} • ${distance>=0?'+':''}${distance.toFixed(2)}${result.mode==='connected-miter'&&drag.faces.length>1?' • Connected band':''}${drag.snap?` • Reference ${drag.snap.type}`:''}`;}}}else{drag.throughPlan=null;drag.blocked=false;drag.shellHit=null;let amount=Math.max(.01,Math.min(.95,(dx-dy)*.004));const ref=referenceUnderPointer(event,drag),inferred=ref?insetReference(drag,ref):null;if(ref&&inferred){amount=inferred.amount;showRefVisual(ref,inferred.boundaryPoint,drag.camera);drag.snap={...ref,insetDistance:inferred.distance};}else{clearRefVisual();drag.snap=null;}const result=drag.m.insetFaceRegions?.(drag.faces,amount);drag.preview=!!result;if(result&&status){const distances=(result.regions||[]).map(r=>r.distance).filter(Number.isFinite),d=distances.length?Math.min(...distances):0;status.textContent=`Uniform Inset • ${drag.faces.length} face${drag.faces.length===1?'':'s'} • ${result.regionCount} region${result.regionCount===1?'':'s'} • ${d.toFixed(3)}${drag.snap?` • Reference ${drag.snap.type}`:''}`;}}render();syncButtons();},true);
function finish(event){if(!drag||drag.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();clearRefVisual();const blocked=!!drag.blocked,done=event.type==='pointerup'&&drag.changed&&drag.preview&&!blocked,m=drag.m,ids=[...drag.faces],tool=drag.tool,before=drag.before,snap=drag.snap,throughPlan=drag.throughPlan,shellHit=drag.shellHit;drag=null;let throughDone=false;if(blocked){restore(m,before);if(status)status.textContent=`Extrude In • BLOCKED — shell intersection needs topology rebuild${shellHit?` • ${shellHit.distance.toFixed(2)}`:''}`;}else if(!done)restore(m,before);else if(tool==='extrude'&&throughPlan){const built=buildThroughOnClone(before,throughPlan);if(built){restore(m,built.mesh);bridge()?.set?.('face',[]);throughDone=true;if(status)status.textContent=`Extrude Through • tunnel created • ${before.faces[throughPlan.sourceFaceIndex]?.length||0}-edge opening`;}else{restore(m,before);if(status)status.textContent='Extrude Through • clean topology could not be built';}}else bridge()?.set?.('face',ids);syncButtons();if(!throughDone&&!blocked){const i=info();if(i&&status&&armed)status.textContent=`${i.faceIndices.length} face${i.faceIndices.length===1?'':'s'} • ${tool==='extrude'?'Extrude':'Uniform Inset'} ready${snap?` • reference ${snap.type}`:''}`;}render();syncButtons();}
document.addEventListener('pointerup',finish,true);document.addEventListener('pointercancel',finish,true);
