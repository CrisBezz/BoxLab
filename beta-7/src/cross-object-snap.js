// BoxLab v0.36.18.6 — unified geometry snap with visual preview + stable release commit.
// Move snapping uses a picked source point on the active object and can infer to
// unselected geometry on that same object or to geometry on any other visible
// object. Reference geometry is read-only. The legacy yellow marker pass is
// suppressed during these gestures so only one snap solver is active.

import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const geometryToggle=document.querySelector('#inferenceSnapToggle');
const status=document.querySelector('#selectionStatus');
const SOURCE_VERTEX_PX=30;
const SOURCE_EDGE_PX=22;
const TARGET_VERTEX_PX=24;
const TARGET_EDGE_PX=20;
let gesture=null;
let snapQueued=false;
let sourceMarker=null,targetMarker=null,guideLine=null,targetLabel=null;

function state(){return globalThis.__boxlabBridgeState;}
function manager(){return globalThis.__boxlabObjectManager;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function moveArmed(){return document.querySelector('#toolModes button.active')?.dataset?.tool==='move';}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}

function selectedVertices(mesh,m,ids){
  if(!mesh)return[];
  if(m==='object')return mesh.vertices.map((_,i)=>i);
  const out=new Set();
  if(m==='vertex')ids.forEach(i=>{if(mesh.vertices[i])out.add(i);});
  else if(m==='edge'){
    const edges=mesh.edges();
    ids.forEach(i=>{const e=edges[i];if(e){out.add(e.a);out.add(e.b);}});
  }else if(m==='face')ids.forEach(i=>(mesh.faces[i]||[]).forEach(v=>out.add(v)));
  return [...out];
}
function centerOf(mesh,ids){const c=new THREE.Vector3();ids.forEach(i=>c.add(mesh.vertices[i]));return ids.length?c.multiplyScalar(1/ids.length):c;}
function evaluatedMesh(object){return globalThis.__boxlabObjectGeometry?.evaluatedMesh?.(object.id)||object.mesh;}

function captureExternalReferences(){
  const m=manager();
  if(!m)return[];
  const activeId=m.activeId,soloId=m.soloId,objects=[...(m.objects||[])],refs=[];
  for(const object of objects){
    if(object.id===activeId||object.visible===false)continue;
    if(soloId&&object.id!==soloId)continue;
    const source=evaluatedMesh(object);
    if(!source?.vertices?.length||!source?.faces?.length)continue;
    refs.push({id:object.id,name:object.name||`Object ${object.id}`,mesh:source.clone(),self:false,excludedVertices:new Set()});
  }
  return refs;
}

function nearestVertex(mesh,p,camera,allowed=null,limit=SOURCE_VERTEX_PX){
  let best=null;
  mesh.vertices.forEach((v,i)=>{
    if(allowed&&!allowed.has(i))return;
    const d=screenPoint(v,camera).distanceTo(p);
    if(d<=limit&&(!best||d<best.d))best={kind:'Vertex',point:v.clone(),index:i,d};
  });
  return best;
}
function nearestEdge(mesh,p,camera,allowedEdges=null,limit=SOURCE_EDGE_PX){
  let best=null;
  const edges=mesh.edges();
  edges.forEach((e,i)=>{
    if(allowedEdges&&!allowedEdges.has(i))return;
    const a=screenPoint(mesh.vertices[e.a],camera),b=screenPoint(mesh.vertices[e.b],camera),ab=b.clone().sub(a),l=ab.lengthSq();
    if(l<1)return;
    const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l,0,1),q=a.clone().addScaledVector(ab,t),d=p.distanceTo(q);
    if(d<=limit&&(!best||d<best.d))best={kind:'Edge',point:mesh.vertices[e.a].clone().lerp(mesh.vertices[e.b],t),index:i,t,d};
  });
  return best;
}
function faceHit(mesh,event,camera,allowedFaces=null){
  const r=canvas.getBoundingClientRect(),ndc=new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1)),ray=new THREE.Raycaster();
  ray.setFromCamera(ndc,camera);
  let best=null;
  mesh.faces.forEach((f,fi)=>{
    if(allowedFaces&&!allowedFaces.has(fi))return;
    const pos=[];
    for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){const v=mesh.vertices[vi];pos.push(v.x,v.y,v.z);}
    if(!pos.length)return;
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),obj=new THREE.Mesh(geo,mat),hit=ray.intersectObject(obj,false)[0];
    geo.dispose();mat.dispose();
    if(hit&&(!best||hit.distance<best.distance))best={kind:'Face',point:hit.point.clone(),index:fi,distance:hit.distance};
  });
  return best;
}

function sourceAnchor(mesh,m,ids,event,camera){
  const p=new THREE.Vector2(event.clientX,event.clientY);
  if(m==='object')return nearestVertex(mesh,p,camera)||nearestEdge(mesh,p,camera)||faceHit(mesh,event,camera);
  if(m==='vertex'){
    const allowed=new Set(ids);
    return nearestVertex(mesh,p,camera,allowed,40)||((ids.length&&mesh.vertices[ids[0]])?{kind:'Vertex',point:mesh.vertices[ids[0]].clone(),index:ids[0]}:null);
  }
  if(m==='edge')return nearestEdge(mesh,p,camera,new Set(ids),36)||null;
  if(m==='face')return faceHit(mesh,event,camera,new Set(ids));
  return null;
}

function targetUnderPointer(g){
  const p=new THREE.Vector2(g.x,g.y),camera=g.camera;
  let bestV=null;
  for(const ref of g.refs)ref.mesh.vertices.forEach((v,i)=>{
    if(ref.self&&ref.excludedVertices.has(i))return;
    const d=screenPoint(v,camera).distanceTo(p);
    if(d<=TARGET_VERTEX_PX&&(!bestV||d<bestV.d))bestV={kind:'Vertex',name:ref.name,point:v.clone(),d,index:i,self:ref.self};
  });
  if(bestV)return bestV;

  let bestE=null;
  for(const ref of g.refs){
    const edges=ref.mesh.edges();
    edges.forEach((e,i)=>{
      if(ref.self&&ref.excludedVertices.has(e.a)&&ref.excludedVertices.has(e.b))return;
      const a=screenPoint(ref.mesh.vertices[e.a],camera),b=screenPoint(ref.mesh.vertices[e.b],camera),ab=b.clone().sub(a),l=ab.lengthSq();
      if(l<1)return;
      const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l,0,1),q=a.clone().addScaledVector(ab,t),d=p.distanceTo(q);
      if(d<=TARGET_EDGE_PX&&(!bestE||d<bestE.d))bestE={kind:'Edge',name:ref.name,point:ref.mesh.vertices[e.a].clone().lerp(ref.mesh.vertices[e.b],t),d,index:i,self:ref.self};
    });
  }
  if(bestE)return bestE;

  const r=canvas.getBoundingClientRect(),ndc=new THREE.Vector2((g.x-r.left)/r.width*2-1,-((g.y-r.top)/r.height*2-1)),ray=new THREE.Raycaster();
  ray.setFromCamera(ndc,camera);
  let bestF=null;
  for(const ref of g.refs){
    ref.mesh.faces.forEach((f,fi)=>{
      if(ref.self&&f.some(i=>ref.excludedVertices.has(i)))return;
      const pos=[];
      for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){const v=ref.mesh.vertices[vi];pos.push(v.x,v.y,v.z);}
      if(!pos.length)return;
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
      const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),obj=new THREE.Mesh(geo,mat),hit=ray.intersectObject(obj,false)[0];
      geo.dispose();mat.dispose();
      if(hit&&(!bestF||hit.distance<bestF.distance))bestF={kind:'Face',name:ref.name,point:hit.point.clone(),distance:hit.distance,self:ref.self,index:fi};
    });
  }
  return bestF;
}

function explicitAxis(){
  const c=globalThis.__boxlabTransformArming?.constraint?.()||document.querySelector('#transformPrecision [data-constraint].active')?.dataset?.constraint||'free';
  return ['x','y','z'].includes(c)?c:null;
}

function ensureVisuals(){
  if(sourceMarker)return;
  sourceMarker=document.createElement('div');
  sourceMarker.style.cssText='position:fixed;pointer-events:none;width:14px;height:14px;border:2px solid #fff;border-radius:50%;background:transparent;box-shadow:0 0 0 2px #0008;z-index:10020;transform:translate(-50%,-50%)';
  targetMarker=document.createElement('div');
  targetMarker.style.cssText='position:fixed;pointer-events:none;width:12px;height:12px;border:2px solid #fff;background:#ffe14a;box-shadow:0 0 0 2px #0008;z-index:10021;transform:translate(-50%,-50%) rotate(45deg)';
  guideLine=document.createElement('div');
  guideLine.style.cssText='position:fixed;pointer-events:none;height:2px;background:#ffe14a;transform-origin:0 50%;z-index:10019;box-shadow:0 0 3px #0008';
  targetLabel=document.createElement('div');
  targetLabel.style.cssText='position:fixed;pointer-events:none;padding:2px 5px;border-radius:4px;background:#111d;color:#fff;font:10px/1.2 -apple-system,BlinkMacSystemFont,sans-serif;z-index:10022;white-space:nowrap';
  document.body.append(sourceMarker,targetMarker,guideLine,targetLabel);
}
function hideVisuals(){
  for(const el of[sourceMarker,targetMarker,guideLine,targetLabel])if(el)el.style.display='none';
}
function showVisuals(g,target){
  ensureVisuals();
  if(!target){hideVisuals();return;}
  const a=screenPoint(g.sourceStart,g.camera),b=screenPoint(target.point,g.camera),dx=b.x-a.x,dy=b.y-a.y;
  sourceMarker.style.display='block';sourceMarker.style.left=`${a.x}px`;sourceMarker.style.top=`${a.y}px`;
  targetMarker.style.display='block';targetMarker.style.left=`${b.x}px`;targetMarker.style.top=`${b.y}px`;
  guideLine.style.display='block';guideLine.style.left=`${a.x}px`;guideLine.style.top=`${a.y}px`;guideLine.style.width=`${Math.hypot(dx,dy)}px`;guideLine.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;
  targetLabel.style.display='block';targetLabel.style.left=`${b.x+10}px`;targetLabel.style.top=`${b.y-18}px`;targetLabel.textContent=`${g.sourceKind} → ${target.self?'Current object':target.name} ${target.kind}`;
}

function suppressLegacyInferenceForEvent(){
  if(!gesture||!geometryToggle||!gesture.geometryWasOn)return;
  geometryToggle.checked=false;
  queueMicrotask(()=>{
    if(geometryToggle&&gesture?.geometryWasOn)geometryToggle.checked=true;
  });
}
function restoreGeometryToggle(){if(geometryToggle&&gesture?.geometryWasOn)geometryToggle.checked=true;}

function applySnap(finalCommit=false){
  snapQueued=false;
  const g=gesture,s=state(),mesh=s?.mesh;
  if(!g||!mesh||!g.geometryWasOn||!moveArmed())return;
  const m=mode(),ids=[...new Set(bridge()?.indices?.()||[])];
  if(m!==g.mode)return;
  const verts=selectedVertices(mesh,m,ids);
  if(!verts.length)return;
  const liveTarget=targetUnderPointer(g);
  if(liveTarget)g.lastTarget=liveTarget;
  const target=finalCommit?(g.lastTarget||liveTarget):liveTarget;
  if(!target){
    hideVisuals();
    if(status)status.textContent=`Move • ${g.mode} • no geometry reference`;
    return;
  }
  showVisuals(g,target);
  const currentCenter=centerOf(mesh,verts),source=currentCenter.clone().add(g.sourceOffset),delta=target.point.clone().sub(source),axis=explicitAxis();
  if(axis){const amount=delta[axis];delta.set(0,0,0);delta[axis]=amount;}
  if(delta.lengthSq()>=1e-16){
    verts.forEach(i=>mesh.vertices[i].add(delta));
    render();
  }
  manager()?.saveActive?.();
  if(status)status.textContent=`Move • ${g.sourceKind} → ${target.self?'Current object':target.name} ${target.kind}${axis?` • ${axis.toUpperCase()}`:''}${finalCommit?' • snapped':''}`;
}
function schedule(finalCommit=false){
  if(finalCommit){
    queueMicrotask(()=>applySnap(true));
    return;
  }
  if(snapQueued)return;
  snapQueued=true;
  queueMicrotask(()=>applySnap(false));
}

function begin(event){
  if(event.target!==canvas||!event.isPrimary||event.pointerType==='touch'||event.button>0)return;
  if(!geometryToggle?.checked||!moveArmed())return;
  const s=state(),mesh=s?.mesh,camera=s?.camera,m=mode(),ids=[...new Set(bridge()?.indices?.()||[])];
  if(!mesh||!camera||!['vertex','edge','face','object'].includes(m))return;
  const verts=selectedVertices(mesh,m,ids);
  if(!verts.length)return;
  const source=sourceAnchor(mesh,m,ids,event,camera);
  if(!source)return;
  const startCenter=centerOf(mesh,verts);
  const excluded=new Set(verts);
  const selfRef={id:'active',name:'Current object',mesh:mesh.clone(),self:true,excludedVertices:excluded};
  const refs=[selfRef,...captureExternalReferences()];
  gesture={id:event.pointerId,mode:m,camera,refs,x:event.clientX,y:event.clientY,sourceKind:source.kind,sourceStart:source.point.clone(),sourceOffset:source.point.clone().sub(startCenter),geometryWasOn:true,lastTarget:null};
  hideVisuals();
  if(status)status.textContent=m==='object'
    ?`Move • object snap source ${source.kind}`
    :`Move • edit ${m} • infer to current or other object geometry`;
}
function move(event){
  if(!gesture||gesture.id!==event.pointerId)return;
  gesture.x=event.clientX;gesture.y=event.clientY;
  suppressLegacyInferenceForEvent();
  schedule(false);
}
function end(event){
  if(!gesture||gesture.id!==event.pointerId)return;
  gesture.x=event.clientX;gesture.y=event.clientY;
  suppressLegacyInferenceForEvent();
  const g=gesture;
  schedule(true);
  queueMicrotask(()=>queueMicrotask(()=>{
    if(gesture===g){restoreGeometryToggle();hideVisuals();gesture=null;}
  }));
}
function cancel(event){
  if(gesture?.id!==event.pointerId)return;
  restoreGeometryToggle();
  hideVisuals();
  gesture=null;
  snapQueued=false;
}

window.addEventListener('pointerdown',begin,true);
window.addEventListener('pointermove',move,true);
window.addEventListener('pointerup',end,true);
window.addEventListener('pointercancel',cancel,true);
window.addEventListener('blur',()=>{restoreGeometryToggle();hideVisuals();gesture=null;snapQueued=false;});

globalThis.__boxlabCrossObjectSnap={version:'0.36.18.6'};
