import * as THREE from 'three';

// BoxLab v0.36.18.423 — direct boundary Edge Extrude / ribbon workflow.
// Select one or more compatible boundary/loose edges, arm Extrude, then
// Pencil/mouse/touch-drag a selected edge. The newly-created outer rail
// remains selected and Extrude stays armed for rapid repeated pulls.

const VERSION='0.36.18.423';
const canvas=document.querySelector('#viewport');
const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const moveRow=edgeTools?.querySelector('.edge-move-actions');
const status=document.querySelector('#selectionStatus');
const SNAP_START_PX=7;
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
raycaster.params.Line.threshold=.12;
let armed=false;
let drag=null;

if(!canvas||!edgeTools||!moveRow)throw new Error('Edge Extrude UI dependencies missing');

const button=document.createElement('button');
button.id='edgeExtrudeBtn';
button.type='button';
button.textContent='Extrude';
moveRow.prepend(button);

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function camera(){return state()?.camera||null;}
function history(){return globalThis.__boxlabHistory;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function unique(values){return[...new Set(values)];}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?unique(b.indices?.()||[]):[];}
function realFaces(m,edge){return(edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi])&&m.faces[fi].length>=3);}
function edgeKeySet(m,ids){const edges=m.edges();return ids.map(i=>edges[i]).filter(Boolean).map(e=>m.edgeKey(e.a,e.b));}

function boundarySelectionInfo(m,ids=selectedEdges()){
  if(!m||!ids.length)return null;
  const edges=m.edges(),infos=[];
  for(const index of ids){
    const edge=edges[index];
    if(!edge)return null;
    const faces=realFaces(m,edge);
    if(!(edge.loose===true||faces.length===1))return null;
    infos.push({index,a:edge.a,b:edge.b,loose:edge.loose===true,faceIndex:faces[0]??null});
  }
  const degree=new Map();
  for(const info of infos){
    degree.set(info.a,(degree.get(info.a)||0)+1);
    degree.set(info.b,(degree.get(info.b)||0)+1);
  }
  if([...degree.values()].some(v=>v>2))return null;
  return{ids:[...ids],infos};
}

function screenPoint(v){
  const cam=camera();
  if(!cam||!v)return null;
  const p=v.clone().project(cam),r=canvas.getBoundingClientRect();
  return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
}
function setPointer(event){
  const r=canvas.getBoundingClientRect();
  pointer.x=((event.clientX-r.left)/r.width)*2-1;
  pointer.y=-((event.clientY-r.top)/r.height)*2+1;
}
function hitSelectedEdge(event,ids){
  const s=state(),objects=s?.edgeObjects,cam=camera();
  if(!objects||!cam)return null;
  setPointer(event);raycaster.setFromCamera(pointer,cam);
  const candidates=ids.map(i=>objects.get?.(i)).filter(Boolean);
  const hit=raycaster.intersectObjects(candidates,false)[0];
  return Number.isInteger(hit?.object?.userData?.index)?hit.object.userData.index:null;
}
function screenPlaneAt(point){
  const normal=new THREE.Vector3();camera()?.getWorldDirection(normal);
  if(normal.lengthSq()<1e-12)return null;
  return new THREE.Plane().setFromNormalAndCoplanarPoint(normal.normalize(),point);
}
function rayPlanePoint(event,plane){
  const cam=camera();if(!cam||!plane)return null;
  setPointer(event);raycaster.setFromCamera(pointer,cam);
  const out=new THREE.Vector3();
  return raycaster.ray.intersectPlane(plane,out)?out:null;
}
function centerOfSelection(m,info){
  const ids=unique(info.infos.flatMap(e=>[e.a,e.b])),c=new THREE.Vector3();
  ids.forEach(i=>c.add(m.vertices[i]));
  return ids.length?c.multiplyScalar(1/ids.length):c;
}
function restore(target,snapshot){
  target.vertices=snapshot.vertices.map(v=>v.clone());
  target.faces=snapshot.faces.map(f=>[...f]);
  target.creases=new Map(snapshot.creases||[]);
  target.looseEdges=new Set(snapshot.looseEdges||[]);
  target.looseVertices=new Set(snapshot.looseVertices||[]);
  target.edges?.();
}
function faceTraverses(m,faceIndex,a,b){
  const face=m.faces[faceIndex];if(!face)return null;
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return true;
    if(x===b&&y===a)return false;
  }
  return null;
}

function extrudeBoundaryEdges(target,source,info,delta){
  const duplicate=new Map();
  const sourceVertexIds=unique(info.infos.flatMap(e=>[e.a,e.b]));
  for(const oldIndex of sourceVertexIds){
    const next=target.vertices.length;
    target.vertices.push(source.vertices[oldIndex].clone().add(delta));
    duplicate.set(oldIndex,next);
  }

  for(const edgeInfo of info.infos){
    const a=edgeInfo.a,b=edgeInfo.b,na=duplicate.get(a),nb=duplicate.get(b);
    if(!Number.isInteger(na)||!Number.isInteger(nb))return null;
    let face;
    if(edgeInfo.loose){
      face=[a,b,nb,na];
      target.looseEdges?.delete?.(target.edgeKey(a,b));
    }else{
      const forward=faceTraverses(source,edgeInfo.faceIndex,a,b);
      if(forward===null)return null;
      face=forward?[b,a,na,nb]:[a,b,nb,na];
    }
    target.faces.push(face);
  }

  if(target.looseVertices instanceof Set){
    for(const oldIndex of sourceVertexIds)target.looseVertices.delete(oldIndex);
    for(const next of duplicate.values())target.looseVertices.delete(next);
  }

  target.edges?.();
  const outerKeys=info.infos.map(e=>target.edgeKey(duplicate.get(e.a),duplicate.get(e.b)));
  const edgeMap=new Map(target.edges().map((e,i)=>[target.edgeKey(e.a,e.b),i]));
  const outer=outerKeys.map(k=>edgeMap.get(k)).filter(Number.isInteger);
  if(outer.length!==info.infos.length)return null;
  return{outer,outerKeys,vertices:[...duplicate.values()]};
}

function validate(m){
  const topology=globalThis.__boxlabTopology,gate=globalThis.__boxlabTopologyGate;
  const a=topology?.validateTopology?.(m,{allowBoundary:true})||null;
  const b=gate?.validate?.(m)||null;
  if(a&&!a.ok)return{ok:false,reason:a.reason||'Topology validation failed'};
  if(b&&!b.valid)return{ok:false,reason:b.reason||'Topology validation failed'};
  return{ok:true};
}

function syncButton(){
  const valid=!!boundarySelectionInfo(mesh());
  button.disabled=!valid;
  button.classList.toggle('active',armed);
  if(armed&&!valid&& !drag){armed=false;button.classList.remove('active');}
}
function setArmed(next){
  armed=!!next;
  button.classList.toggle('active',armed);
  if(status)status.textContent=armed?'Edge Extrude • drag selected boundary edge(s) • repeat to pull ribbon':'Edge mode';
}
button.addEventListener('click',event=>{
  event.preventDefault();event.stopImmediatePropagation();
  if(!boundarySelectionInfo(mesh()))return;
  setArmed(!armed);
},true);

document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(()=>{
  if(bridge()?.mode?.()!=='edge')setArmed(false);
  syncButton();
})));
window.addEventListener('boxlab-bridge-state',syncButton);
document.addEventListener('click',event=>{
  if(!armed||event.target===button||event.target?.closest?.('#edgeExtrudeBtn'))return;
  if(event.target?.closest?.('button')&&!event.target?.closest?.('#selectionModes'))setArmed(false);
},true);

canvas.addEventListener('pointerdown',event=>{
  if(!armed||!event.isPrimary)return;
  if(event.pointerType==='mouse'&&event.button!==0)return;
  const m=mesh(),ids=selectedEdges(),info=boundarySelectionInfo(m,ids);
  if(!m||!info)return;
  const seed=hitSelectedEdge(event,ids);
  if(!Number.isInteger(seed))return;
  const center=centerOfSelection(m,info),plane=screenPlaneAt(center),start=rayPlanePoint(event,plane);
  if(!plane||!start)return;
  event.preventDefault();event.stopImmediatePropagation();
  drag={pointerId:event.pointerId,mesh:m,before:m.clone(),info,seed,start,startX:event.clientX,startY:event.clientY,plane,preview:false,result:null};
  state().controls&&(state().controls.enabled=false);
  canvas.setPointerCapture?.(event.pointerId);
},true);

canvas.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;
  if(!drag.preview&&Math.hypot(dx,dy)<SNAP_START_PX)return;
  const now=rayPlanePoint(event,drag.plane);if(!now)return;
  const delta=now.clone().sub(drag.start);
  restore(drag.mesh,drag.before);
  const result=extrudeBoundaryEdges(drag.mesh,drag.before,drag.info,delta);
  if(!result){restore(drag.mesh,drag.before);drag.result=null;drag.preview=false;render();return;}
  drag.result=result;drag.preview=true;
  render();
  bridge()?.set?.('edge',result.outer);
  if(status)status.textContent=`Edge Extrude • ${drag.info.ids.length} edge${drag.info.ids.length===1?'':'s'} • ribbon preview`;
},true);

function finish(event,cancel=false){
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const current=drag;drag=null;
  if(state()?.controls)state().controls.enabled=true;
  try{canvas.releasePointerCapture?.(event.pointerId);}catch{}
  if(cancel||!current.preview||!current.result){
    restore(current.mesh,current.before);
    render();
    bridge()?.set?.('edge',current.info.ids);
    if(status)status.textContent='Edge Extrude • cancelled';
    return;
  }
  const check=validate(current.mesh);
  if(!check.ok){
    restore(current.mesh,current.before);
    render();
    bridge()?.set?.('edge',current.info.ids);
    if(status)status.textContent='Edge Extrude • validation failed • rolled back';
    return;
  }
  history()?.push(current.before);
  globalThis.__boxlabObjectManager?.saveActive?.();
  render();
  const edges=current.mesh.edges(),map=new Map(edges.map((e,i)=>[current.mesh.edgeKey(e.a,e.b),i]));
  const next=current.result.outerKeys.map(k=>map.get(k)).filter(Number.isInteger);
  bridge()?.set?.('edge',next);
  setArmed(true);
  if(status)status.textContent=`Edge Extrude committed • ${next.length} outer edge${next.length===1?'':'s'} selected • drag again`;
}
canvas.addEventListener('pointerup',event=>finish(event,false),true);
canvas.addEventListener('pointercancel',event=>finish(event,true),true);

syncButton();
globalThis.__boxlabEdgeExtrude={version:VERSION,isArmed:()=>armed,setArmed,boundarySelectionInfo,extrudeBoundaryEdges};
