import {planThrough,buildThrough,firstThroughContact} from './through-kernel.js?v=0.36.16.0';
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

// One owner for Through: this existing drag controller calls the pure kernel.
function classifySingleFaceContact(m,sourceFaceIndex,distance,prepared){
  if(distance>=0)return{mode:'extrude',throughPlan:null,shellHit:null};
  const p=prepared||planThrough(m,sourceFaceIndex);
  if(p.ok&&distance<=p.distance+1e-6)return{mode:'through',throughPlan:p,shellHit:null};
  if(p.ok&&distance<=p.firstDistance+1e-6)return{mode:'blocked',throughPlan:null,shellHit:{distance:-p.firstDistance},reason:'partial-exit-sweep'};
  if(p.ok)return{mode:'extrude',throughPlan:null,shellHit:null};
  const hit=firstThroughContact(m,sourceFaceIndex,-distance);
  return hit?{mode:'blocked',throughPlan:null,shellHit:hit,reason:p.reason}:{mode:'extrude',throughPlan:null,shellHit:null};
}
function extrudeConnectedFaceSelection(m,faceIndices,distance){const group=selectionComponentsInfo(m,faceIndices);if(!group)return null;const results=[];for(const region of group.regions){if(!region.boundaryEdges.length)return null;const incident=new Map(region.regionVertices.map(v=>[v,[]]));for(const fi of region.faceIndices){const n=m.faceNormal(fi).clone().normalize();for(const v of m.faces[fi])incident.get(v)?.push(n);}const replacement=new Map();for(const vertex of region.regionVertices){const normals=incident.get(vertex)||[],sum=new THREE.Vector3();normals.forEach(n=>sum.add(n));let dir=sum.lengthSq()>1e-10?sum.normalize():normals[0]?.clone();if(!dir)return null;const dots=normals.map(n=>dir.dot(n)).filter(v=>v>1e-4),denom=dots.length?dots.reduce((a,b)=>a+b,0)/dots.length:1,move=dir.multiplyScalar(distance/Math.max(.15,denom));m.vertices.push(m.vertices[vertex].clone().add(move));replacement.set(vertex,m.vertices.length-1);}for(const fi of region.faceIndices)m.faces[fi]=m.faces[fi].map(v=>replacement.get(v));const sideStart=m.faces.length;for(const edge of region.boundaryEdges)m.faces.push([edge.a,edge.b,replacement.get(edge.b),replacement.get(edge.a)]);results.push({faceIndices:[...region.faceIndices],sideFaceIndices:Array.from({length:region.boundaryEdges.length},(_,i)=>sideStart+i),distance,mode:'connected-miter'});}m.edges();return{faceIndices:[...group.faceIndices],regions:results,regionCount:results.length,distance,mode:'connected-miter'};}

document.addEventListener('boxlab-direct-tool-exclusive',event=>{if(event.detail?.tool==='knife'){armed=null;drag=null;pendingSelection=null;clearRefVisual();syncButtons();}},true);
document.addEventListener('pointerdown',event=>{const target=event.target?.closest?.('#extrudeBtn,#insetBtn');if(!target)return;const ids=faces();pendingSelection=ids.length?{tool:target.id==='extrudeBtn'?'extrude':'inset',ids:[...ids]}:null;},true);
document.addEventListener('click',event=>{const transform=event.target?.closest?.('#toolModes button');if(transform){pendingSelection=null;if(armed){armed=null;clearRefVisual();syncButtons();}return;}const target=event.target?.closest?.('#extrudeBtn,#insetBtn');if(!target)return;event.preventDefault();event.stopImmediatePropagation();const tool=target.id==='extrudeBtn'?'extrude':'inset';if(armed===tool){pendingSelection=null;armed=null;clearRefVisual();syncButtons();updateStatus();document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'none'}}));return;}const captured=pendingSelection?.tool===tool?[...pendingSelection.ids]:faces();pendingSelection=null;disarmTransforms();document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool}}));if(captured.length)bridge()?.set?.('face',captured);armed=tool;syncButtons();updateStatus();},true);
window.addEventListener('boxlab-bridge-state',()=>{if(!armed)return;queueMicrotask(()=>{syncButtons();updateStatus();});});
document.addEventListener('pointerdown',event=>{if(!armed||event.target!==canvas||!event.isPrimary)return;const ids=faces();if(!ids.length)return;const m=mesh(),group=armed==='extrude'?selectionComponentsInfo(m,ids):m?.faceRegionsInfo?.(ids),camera=state()?.camera;if(!m||!group||!camera)return;const hit=hitSelectedFace(event,m,ids,camera);if(!Number.isInteger(hit))return;const region=group.regions.find(r=>r.faceIndices.includes(hit))||group.regions[0],hitFace=m.faces[hit],worldNormal=(armed==='extrude'?m.faceNormal(hit):region?.normal||m.faceRegionNormal?.(region?.faceIndices||[]))?.clone?.().normalize?.(),controlRegion=armed==='extrude'?{normal:worldNormal,regionVertices:[...hitFace]}:region,regionCenter=centerOf(m,controlRegion.regionVertices);event.preventDefault();event.stopImmediatePropagation();drag={id:event.pointerId,x:event.clientX,y:event.clientY,tool:armed,m,before:m.clone(),faces:[...ids],normal:projectedNormal(m,controlRegion,camera),worldNormal,regionCenter,camera,changed:false,preview:false,snap:null,throughPlan:null,blocked:false,shellHit:null,preparedThrough:armed==='extrude'&&ids.length===1?planThrough(m,ids[0]):null};canvas.setPointerCapture?.(event.pointerId);},true);
document.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(!drag.changed&&Math.hypot(dx,dy)<8)return;if(!drag.changed){drag.changed=true;}restore(drag.m,drag.before);if(drag.tool==='extrude'){let distance=(dx*drag.normal.x+dy*drag.normal.y)*.006;const ref=drag.worldNormal?referenceUnderPointer(event,drag):null;if(ref){distance=ref.point.clone().sub(drag.regionCenter).dot(drag.worldNormal);const inferred=drag.regionCenter.clone().addScaledVector(drag.worldNormal,distance);showRefVisual(ref,inferred,drag.camera);drag.snap=ref;}else{clearRefVisual();drag.snap=null;}const contact=drag.faces.length===1?classifySingleFaceContact(drag.before,drag.faces[0],distance,drag.preparedThrough):{mode:'extrude',throughPlan:null,shellHit:null};drag.throughPlan=contact.throughPlan;drag.shellHit=contact.shellHit;drag.blocked=contact.mode==='blocked';drag.failureReason=contact.reason;if(drag.blocked){drag.preview=false;clearRefVisual();drag.snap=null;if(status)status.textContent=`Extrude In • BLOCKED — ${contact.reason||'unsupported shell contact'}${drag.shellHit?` • ${drag.shellHit.distance.toFixed(2)}`:''}`;}else{if(drag.throughPlan){distance=drag.throughPlan.distance;clearRefVisual();drag.snap=null;}const result=extrudeConnectedFaceSelection(drag.m,drag.faces,distance);drag.preview=!!result;if(result&&status){const mode=drag.throughPlan?'THROUGH READY':distance<0?'Extrude In':'Extrude';status.textContent=`${mode} • ${drag.faces.length} face${drag.faces.length===1?'':'s'} • ${distance>=0?'+':''}${distance.toFixed(2)}${result.mode==='connected-miter'&&drag.faces.length>1?' • Connected band':''}${drag.snap?` • Reference ${drag.snap.type}`:''}`;}}}else{drag.throughPlan=null;drag.blocked=false;drag.shellHit=null;let amount=Math.max(.01,Math.min(.95,(dx-dy)*.004));const ref=referenceUnderPointer(event,drag),inferred=ref?insetReference(drag,ref):null;if(ref&&inferred){amount=inferred.amount;showRefVisual(ref,inferred.boundaryPoint,drag.camera);drag.snap={...ref,insetDistance:inferred.distance};}else{clearRefVisual();drag.snap=null;}const result=drag.m.insetFaceRegions?.(drag.faces,amount);drag.preview=!!result;if(result&&status){const distances=(result.regions||[]).map(r=>r.distance).filter(Number.isFinite),d=distances.length?Math.min(...distances):0;status.textContent=`Uniform Inset • ${drag.faces.length} face${drag.faces.length===1?'':'s'} • ${result.regionCount} region${result.regionCount===1?'':'s'} • ${d.toFixed(3)}${drag.snap?` • Reference ${drag.snap.type}`:''}`;}}render();syncButtons();},true);
function finish(event){
  if(!drag||drag.id!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();clearRefVisual();
  const d=drag;drag=null;
  if(event.type==='pointerup'&&d.changed&&d.preview&&!d.blocked){
    if(d.tool==='extrude'&&d.throughPlan){
      const built=buildThrough(d.before,d.throughPlan);
      if(built.ok){globalThis.__boxlabHistory?.push(d.before);restore(d.m,built.mesh);bridge()?.set?.('face',[]);if(status)status.textContent='Extrude Through • validated prism cut';}
      else {restore(d.m,d.before);bridge()?.set?.('face',d.faces);if(status)status.textContent=`Extrude Through • rollback • ${built.reason}`;}
    }else{globalThis.__boxlabHistory?.push(d.before);bridge()?.set?.('face',d.faces);updateStatus();}
  }else{restore(d.m,d.before);bridge()?.set?.('face',d.faces);if(d.blocked&&status)status.textContent=`Extrude Through • rollback • ${d.failureReason||'unsupported shell contact'}`;}
  render();syncButtons();
}
document.addEventListener('pointerup',finish,true);document.addEventListener('pointercancel',finish,true);
