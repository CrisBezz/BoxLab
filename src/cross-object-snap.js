// BoxLab v0.36.18.1 — cross-object geometry snap.
// Other visible objects are captured as read-only reference meshes at Move start.
// The actual snap is applied after the existing transform handler has updated the
// active mesh, so no temporary topology is injected into the editable object.

import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const geometryToggle=document.querySelector('#inferenceSnapToggle');
const status=document.querySelector('#selectionStatus');
const VERTEX_PX=22;
const EDGE_PX=18;
let gesture=null;
let raf=0;

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
function captureReferences(){
  const m=manager();
  if(!m)return[];
  const activeId=m.activeId,soloId=m.soloId,objects=[...(m.objects||[])],refs=[];
  for(const object of objects){
    if(object.id===activeId||object.visible===false)continue;
    if(soloId&&object.id!==soloId)continue;
    const source=evaluatedMesh(object);
    if(!source?.vertices?.length||!source?.faces?.length)continue;
    refs.push({id:object.id,name:object.name||`Object ${object.id}`,mesh:source.clone()});
  }
  return refs;
}
function targetUnderPointer(g){
  const p=new THREE.Vector2(g.x,g.y),camera=g.camera;
  let bestV=null;
  for(const ref of g.refs)ref.mesh.vertices.forEach((v,i)=>{
    const d=screenPoint(v,camera).distanceTo(p);
    if(d<=VERTEX_PX&&(!bestV||d<bestV.d))bestV={kind:'Vertex',name:ref.name,point:v.clone(),d,index:i};
  });
  if(bestV)return bestV;

  let bestE=null;
  for(const ref of g.refs){
    const edges=ref.mesh.edges();
    edges.forEach((e,i)=>{
      const a=screenPoint(ref.mesh.vertices[e.a],camera),b=screenPoint(ref.mesh.vertices[e.b],camera),ab=b.clone().sub(a),l=ab.lengthSq();
      if(l<1)return;
      const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l,0,1),q=a.clone().addScaledVector(ab,t),d=p.distanceTo(q);
      if(d<=EDGE_PX&&(!bestE||d<bestE.d))bestE={kind:'Edge',name:ref.name,point:ref.mesh.vertices[e.a].clone().lerp(ref.mesh.vertices[e.b],t),d,index:i};
    });
  }
  if(bestE)return bestE;

  const r=canvas.getBoundingClientRect(),ndc=new THREE.Vector2((g.x-r.left)/r.width*2-1,-((g.y-r.top)/r.height*2-1)),ray=new THREE.Raycaster();
  ray.setFromCamera(ndc,camera);
  let bestF=null;
  for(const ref of g.refs){
    const geo=ref.mesh.triangulatedGeometry(),mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),obj=new THREE.Mesh(geo,mat),hit=ray.intersectObject(obj,false)[0];
    geo.dispose();mat.dispose();
    if(hit&&(!bestF||hit.distance<bestF.distance))bestF={kind:'Face',name:ref.name,point:hit.point.clone(),distance:hit.distance};
  }
  return bestF;
}
function explicitAxis(){
  const c=globalThis.__boxlabTransformArming?.constraint?.()||document.querySelector('#transformPrecision [data-constraint].active')?.dataset?.constraint||'free';
  return ['x','y','z'].includes(c)?c:null;
}
function applySnap(){
  raf=0;
  const g=gesture,s=state(),mesh=s?.mesh;
  if(!g||!mesh||!geometryToggle?.checked||!moveArmed())return;
  const m=mode(),ids=[...new Set(bridge()?.indices?.()||[])];
  if(m!==g.mode)return;
  const verts=selectedVertices(mesh,m,ids);
  if(!verts.length)return;
  const target=targetUnderPointer(g);
  if(!target)return;
  const c=centerOf(mesh,verts),delta=target.point.clone().sub(c),axis=explicitAxis();
  if(axis){const amount=delta[axis];delta.set(0,0,0);delta[axis]=amount;}
  if(delta.lengthSq()<1e-16)return;
  verts.forEach(i=>mesh.vertices[i].add(delta));
  render();
  if(status)status.textContent=`Move • Cross-object snap • ${target.name} ${target.kind}${axis?` • ${axis.toUpperCase()}`:''}`;
}
function schedule(){if(!raf)raf=requestAnimationFrame(applySnap);}
function begin(event){
  if(event.target!==canvas||!event.isPrimary||event.pointerType==='touch'||event.button>0)return;
  if(!geometryToggle?.checked||!moveArmed())return;
  const s=state(),mesh=s?.mesh,camera=s?.camera,m=mode(),ids=[...new Set(bridge()?.indices?.()||[])];
  if(!mesh||!camera||!['vertex','edge','face','object'].includes(m))return;
  const verts=selectedVertices(mesh,m,ids);
  if(!verts.length)return;
  const refs=captureReferences();
  if(!refs.length)return;
  gesture={id:event.pointerId,mode:m,camera,refs,x:event.clientX,y:event.clientY};
}
function move(event){if(!gesture||gesture.id!==event.pointerId)return;gesture.x=event.clientX;gesture.y=event.clientY;schedule();}
function end(event){if(!gesture||gesture.id!==event.pointerId)return;gesture.x=event.clientX;gesture.y=event.clientY;schedule();const id=gesture.id;requestAnimationFrame(()=>{if(gesture?.id===id)gesture=null;});}
function cancel(event){if(gesture?.id===event.pointerId)gesture=null;}

window.addEventListener('pointerdown',begin,true);
window.addEventListener('pointermove',move,true);
window.addEventListener('pointerup',end,true);
window.addEventListener('pointercancel',cancel,true);
window.addEventListener('blur',()=>{gesture=null;});

globalThis.__boxlabCrossObjectSnap={version:'0.36.18.1'};
