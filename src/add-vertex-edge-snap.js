import * as THREE from 'three';

// BoxLab v0.36.18.151 — Add Vertex/Lasso mutual exclusion.
// 18.150 tap/orbit placement behavior is preserved. Starting Add now disarms
// Lasso first, and Lasso can explicitly stop the Add session without selecting.

const VERSION='0.36.18.151';
const canvas=document.querySelector('#viewport');
const addVertexBtn=document.querySelector('#addVertexBtn');
const status=document.querySelector('#selectionStatus');
const geometryToggle=document.querySelector('#inferenceSnapToggle');
const vertexModeBtn=document.querySelector('#selectionModes button[data-mode="vertex"]');
const EDGE_HIT_PX=24;
const MIDPOINT_PX=11;
const TAP_MOVE_PX=10;
const TAP_MAX_MS=360;
let sessionActive=false;
let internalCoreDisarm=false;
let edgeDrag=null;
let tapCandidate=null;
let lastVertex=null;
const activePointers=new Set();

function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function camera(){return state()?.camera||null;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function history(){return globalThis.__boxlabHistory;}
function geometryOn(){return geometryToggle?.checked!==false;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function isActive(){return sessionActive;}

function ensureStyle(){
  if(document.querySelector('#boxlabAddVertexSessionStyle'))return;
  const style=document.createElement('style');
  style.id='boxlabAddVertexSessionStyle';
  style.textContent='#addVertexBtn.boxlab-add-session{background:#f2f5fa!important;color:#111318!important;border-color:#f2f5fa!important;}';
  document.head.append(style);
}

function screenPoint(v){
  const cam=camera();
  if(!cam||!canvas||!v)return null;
  const p=v.clone().project(cam),r=canvas.getBoundingClientRect();
  return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
}

function nearestEdge(clientX,clientY){
  const m=mesh();
  if(!m)return null;
  const p=new THREE.Vector2(clientX,clientY);
  let best=null;
  m.edges().forEach((edge,index)=>{
    const a=screenPoint(m.vertices[edge.a]),b=screenPoint(m.vertices[edge.b]);
    if(!a||!b)return;
    const ab=b.clone().sub(a),lenSq=ab.lengthSq();
    if(lenSq<1e-6)return;
    let t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/lenSq,0,1);
    const midpoint=a.clone().lerp(b,.5),midpointDistance=midpoint.distanceTo(p);
    const midpointSnap=geometryOn()&&midpointDistance<=MIDPOINT_PX;
    if(midpointSnap)t=.5;
    const q=a.clone().addScaledVector(ab,t),distance=q.distanceTo(p);
    if(distance<=EDGE_HIT_PX&&(!best||distance<best.distance))best={index,edge,t,distance,snapType:midpointSnap?'Midpoint':'Edge'};
  });
  return best;
}

function freeSpacePoint(event,m){
  const cam=camera();
  if(!cam||!canvas||!m)return null;
  const center=new THREE.Vector3();
  for(const v of m.vertices||[])center.add(v);
  if(m.vertices?.length)center.multiplyScalar(1/m.vertices.length);
  const normal=new THREE.Vector3();
  cam.getWorldDirection(normal);
  if(normal.lengthSq()<1e-12)return null;
  const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal.normalize(),center);
  const rect=canvas.getBoundingClientRect();
  if(rect.width<=0||rect.height<=0)return null;
  const ndc=new THREE.Vector2(((event.clientX-rect.left)/rect.width)*2-1,-((event.clientY-rect.top)/rect.height)*2+1);
  const raycaster=new THREE.Raycaster();
  raycaster.setFromCamera(ndc,cam);
  const point=new THREE.Vector3();
  return raycaster.ray.intersectPlane(plane,point)?point:null;
}

function splitFaceEdge(face,a,b,vertex){
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if((x===a&&y===b)||(x===b&&y===a)){
      const out=[...face];
      out.splice(i+1,0,vertex);
      return out;
    }
  }
  return face;
}

function splitEdge(m,edgeIndex,t){
  const edges=m.edges(),edge=edges[edgeIndex];
  if(!edge||!m.vertices[edge.a]||!m.vertices[edge.b])return null;
  const a=edge.a,b=edge.b;
  const position=m.vertices[a].clone().lerp(m.vertices[b],t);
  const oldKey=m.edgeKey(a,b);
  const crease=m.creases?.get(oldKey)||0;
  const vertex=m.vertices.length;
  m.vertices.push(position);
  const realFaces=(edge.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));
  for(const fi of realFaces)m.faces[fi]=splitFaceEdge(m.faces[fi],a,b,vertex);
  if(edge.loose&&m.looseEdges instanceof Set){
    m.looseEdges.delete(oldKey);
    m.looseEdges.add(m.edgeKey(a,vertex));
    m.looseEdges.add(m.edgeKey(vertex,b));
    if(m.looseVertices instanceof Set)m.looseVertices.add(vertex);
  }
  if(m.creases instanceof Map){
    m.creases.delete(oldKey);
    if(crease>0){
      m.creases.set(m.edgeKey(a,vertex),crease);
      m.creases.set(m.edgeKey(vertex,b),crease);
    }
  }
  return{vertex,a,b};
}

function addLooseVertex(m,position){
  if(!m||!position)return null;
  if(typeof m.addLooseVertex==='function')return m.addLooseVertex(position);
  m.vertices.push(position.clone());
  const vertex=m.vertices.length-1;
  if(!(m.looseVertices instanceof Set))m.looseVertices=new Set(m.looseVertices||[]);
  m.looseVertices.add(vertex);
  return vertex;
}

function clearSelection(){
  const b=bridge();
  if(typeof b?.set==='function'){
    try{b.set('vertex',[]);return;}catch{}
  }
  document.querySelector('#deselectAllBtn')?.click();
}

function selectLastVertex(){
  if(!Number.isInteger(lastVertex))return false;
  const b=bridge();
  if(typeof b?.set!=='function')return false;
  return b.set('vertex',[lastVertex])!==false;
}

function disarmCoreAdd(){
  internalCoreDisarm=true;
  vertexModeBtn?.click();
  internalCoreDisarm=false;
}

function startSession(){
  if(sessionActive)return;
  if(globalThis.__boxlabLasso?.isArmed?.())globalThis.__boxlabLasso.setArmed?.(false);
  ensureStyle();
  sessionActive=true;
  lastVertex=null;
  clearSelection();
  disarmCoreAdd();
  addVertexBtn?.classList.add('boxlab-add-session');
  if(status)status.textContent='Add Vertex • tap to add • drag to orbit • drag edge to slide';
}

function stopSession(selectLast=true){
  if(!sessionActive)return;
  sessionActive=false;
  tapCandidate=null;
  edgeDrag=null;
  activePointers.clear();
  addVertexBtn?.classList.remove('boxlab-add-session');
  if(selectLast)selectLastVertex();
  lastVertex=null;
  render();
}

addVertexBtn?.addEventListener('click',()=>queueMicrotask(()=>{
  if(sessionActive){
    disarmCoreAdd();
    stopSession(true);
    return;
  }
  if(addVertexBtn.classList.contains('active'))startSession();
}));

document.querySelectorAll('#selectionModes button,#toolModes button,.mode-tools button').forEach(button=>{
  if(button===addVertexBtn)return;
  button.addEventListener('click',()=>{
    if(internalCoreDisarm)return;
    if(sessionActive)stopSession(true);
  });
});

function updateEdgeDrag(event){
  if(!edgeDrag||edgeDrag.pointerId!==event.pointerId)return;
  const m=edgeDrag.mesh,va=m.vertices[edgeDrag.a],vb=m.vertices[edgeDrag.b];
  const a=screenPoint(va),b=screenPoint(vb);
  if(!a||!b)return;
  const p=new THREE.Vector2(event.clientX,event.clientY),ab=b.clone().sub(a),lenSq=ab.lengthSq();
  if(lenSq<1e-6)return;
  let t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/lenSq,.001,.999),snapType='Edge';
  if(geometryOn()){
    const midpoint=a.clone().lerp(b,.5);
    if(midpoint.distanceTo(p)<=MIDPOINT_PX){t=.5;snapType='Midpoint';}
  }
  m.vertices[edgeDrag.vertex].copy(va).lerp(vb,t);
  edgeDrag.t=t;
  edgeDrag.snapType=snapType;
  if(status)status.textContent=`Add Vertex • ${snapType} snap • ${Math.round(t*100)}%`;
  render();
}

document.addEventListener('pointerdown',event=>{
  if(event.target!==canvas)return;
  activePointers.add(event.pointerId);
  if(tapCandidate&&activePointers.size>1)tapCandidate.multi=true;
  if(!sessionActive||!event.isPrimary)return;
  if(event.pointerType==='pen'&&!(event.pressure>0))return;
  if(event.pointerType==='mouse'&&event.button!==0)return;
  clearSelection();
  const m=mesh(),h=history();
  if(!m||!h)return;
  const snap=nearestEdge(event.clientX,event.clientY);
  if(snap){
    event.preventDefault();
    event.stopImmediatePropagation();
    const before=m.clone();
    const result=splitEdge(m,snap.index,THREE.MathUtils.clamp(snap.t,.001,.999));
    if(!result)return;
    h.push(before);
    edgeDrag={pointerId:event.pointerId,mesh:m,...result,t:snap.t,snapType:snap.snapType};
    tapCandidate=null;
    canvas.setPointerCapture?.(event.pointerId);
    lastVertex=result.vertex;
    if(status)status.textContent=`Add Vertex • ${snap.snapType} snap • ${Math.round(snap.t*100)}%`;
    render();
    return;
  }
  tapCandidate={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startedAt:performance.now(),multi:activePointers.size>1,moved:false};
},true);

document.addEventListener('pointermove',event=>{
  if(edgeDrag&&edgeDrag.pointerId===event.pointerId){
    event.preventDefault();
    event.stopImmediatePropagation();
    updateEdgeDrag(event);
    return;
  }
  if(!tapCandidate||tapCandidate.pointerId!==event.pointerId)return;
  if(Math.hypot(event.clientX-tapCandidate.startX,event.clientY-tapCandidate.startY)>TAP_MOVE_PX)tapCandidate.moved=true;
},true);

function finishPointer(event){
  activePointers.delete(event.pointerId);
  if(edgeDrag&&edgeDrag.pointerId===event.pointerId){
    event.preventDefault();
    event.stopImmediatePropagation();
    const snapType=edgeDrag.snapType||'Edge';
    lastVertex=edgeDrag.vertex;
    edgeDrag=null;
    try{canvas.releasePointerCapture?.(event.pointerId);}catch{}
    clearSelection();
    render();
    if(status)status.textContent=`Add Vertex • ${snapType} committed • continue placing`;
    return;
  }
  if(!tapCandidate||tapCandidate.pointerId!==event.pointerId)return;
  const candidate=tapCandidate;
  tapCandidate=null;
  if(!sessionActive||candidate.multi||candidate.moved||performance.now()-candidate.startedAt>TAP_MAX_MS)return;
  const m=mesh(),h=history();
  if(!m||!h)return;
  const point=freeSpacePoint(event,m);
  if(!point)return;
  const before=m.clone();
  const vertex=addLooseVertex(m,point);
  if(!Number.isInteger(vertex))return;
  h.push(before);
  lastVertex=vertex;
  clearSelection();
  render();
  if(status)status.textContent='Add Vertex • Free committed • continue placing';
}
document.addEventListener('pointerup',finishPointer,true);
document.addEventListener('pointercancel',event=>{
  activePointers.delete(event.pointerId);
  if(edgeDrag?.pointerId===event.pointerId){edgeDrag=null;try{canvas.releasePointerCapture?.(event.pointerId);}catch{}}
  if(tapCandidate?.pointerId===event.pointerId)tapCandidate=null;
},true);

globalThis.__boxlabAddVertex={version:VERSION,isActive,sessionActive:()=>sessionActive,stop:stopSession,nearestEdge,splitEdge,freeSpacePoint};
