import * as THREE from 'three';

// BoxLab v0.36.18.146 — unified Add Vertex interaction controller.
// Owns both free-space loose-vertex placement and real edge splitting in capture
// phase so main.js no longer races a separate Add Vertex path on iPad.

const VERSION='0.36.18.146';
const canvas=document.querySelector('#viewport');
const addVertexBtn=document.querySelector('#addVertexBtn');
const status=document.querySelector('#selectionStatus');
const geometryToggle=document.querySelector('#inferenceSnapToggle');
const multiToggle=document.querySelector('#multiSelectToggle');
const SNAP_PX=18;
const MIDPOINT_PX=11;
let drag=null;

function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function camera(){return state()?.camera||null;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function addVertexActive(){return !!addVertexBtn?.classList.contains('active');}
function geometryOn(){return geometryToggle?.checked!==false;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

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
    if(distance<=SNAP_PX&&(!best||distance<best.distance))best={index,edge,t,distance,snapType:midpointSnap?'Midpoint':'Edge'};
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
  const ndc=new THREE.Vector2(
    ((event.clientX-rect.left)/rect.width)*2-1,
    -((event.clientY-rect.top)/rect.height)*2+1
  );
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

function updateEdgeDrag(event){
  if(drag?.kind!=='edge')return;
  const m=drag.mesh,va=m.vertices[drag.a],vb=m.vertices[drag.b];
  const a=screenPoint(va),b=screenPoint(vb);
  if(!a||!b)return;
  const p=new THREE.Vector2(event.clientX,event.clientY),ab=b.clone().sub(a),lenSq=ab.lengthSq();
  if(lenSq<1e-6)return;
  let t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/lenSq,.001,.999),snapType='Edge';
  if(geometryOn()){
    const midpoint=a.clone().lerp(b,.5);
    if(midpoint.distanceTo(p)<=MIDPOINT_PX){t=.5;snapType='Midpoint';}
  }
  m.vertices[drag.vertex].copy(va).lerp(vb,t);
  drag.t=t;
  drag.snapType=snapType;
  if(status)status.textContent=`Add Vertex • ${snapType} snap • ${Math.round(t*100)}%`;
  render();
}

function fallbackSelect(vertex){
  const m=mesh();
  if(!m?.vertices?.[vertex]||!canvas)return false;
  const p=screenPoint(m.vertices[vertex]);
  if(!p)return false;
  canvas.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true,pointerId:94,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:p.x,clientY:p.y}));
  canvas.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,cancelable:true,pointerId:94,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:p.x,clientY:p.y}));
  return true;
}

function selectVertex(vertex){
  if(multiToggle?.checked){
    multiToggle.checked=false;
    multiToggle.dispatchEvent(new Event('change',{bubbles:true}));
  }
  const b=bridge();
  if(typeof b?.set==='function'){
    const result=b.set('vertex',[vertex]);
    if(result!==false)return true;
  }
  return fallbackSelect(vertex);
}

canvas?.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||!addVertexActive())return;
  if(event.pointerType==='mouse'&&event.button!==0)return;
  const m=mesh(),history=globalThis.__boxlabHistory;
  if(!m||!history)return;

  // From this point Add Vertex owns the interaction. Do not allow main.js to
  // run its separate legacy free-space branch on the same pointer event.
  event.preventDefault();
  event.stopImmediatePropagation();

  const before=m.clone();
  const snap=geometryOn()?nearestEdge(event.clientX,event.clientY):null;
  if(snap){
    const result=splitEdge(m,snap.index,THREE.MathUtils.clamp(snap.t,.001,.999));
    if(!result)return;
    history.push(before);
    drag={kind:'edge',pointerId:event.pointerId,mesh:m,...result,t:snap.t,snapType:snap.snapType};
    canvas.setPointerCapture?.(event.pointerId);
    if(status)status.textContent=`Add Vertex • ${snap.snapType} snap • ${Math.round(snap.t*100)}%`;
    render();
    return;
  }

  const point=freeSpacePoint(event,m);
  if(!point)return;
  const vertex=addLooseVertex(m,point);
  if(!Number.isInteger(vertex))return;
  history.push(before);
  drag={kind:'free',pointerId:event.pointerId,mesh:m,vertex,snapType:'Free'};
  canvas.setPointerCapture?.(event.pointerId);
  if(status)status.textContent='Add Vertex • free-space vertex';
  render();
},true);

canvas?.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if(drag.kind==='edge')updateEdgeDrag(event);
},true);

function finish(event){
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const vertex=drag.vertex,snapType=drag.snapType||'Free';
  drag=null;
  canvas.releasePointerCapture?.(event.pointerId);

  // Add Vertex is deliberately one-shot: commit, disarm, then hand selection
  // directly to the normal selection bridge instead of synthesising a tap.
  if(addVertexActive())addVertexBtn?.click();
  queueMicrotask(()=>{
    selectVertex(vertex);
    render();
    if(status)status.textContent=`Add Vertex • ${snapType} committed • new vertex selected`;
  });
}
canvas?.addEventListener('pointerup',finish,true);
canvas?.addEventListener('pointercancel',finish,true);

globalThis.__boxlabAddVertex={version:VERSION,nearestEdge,splitEdge,freeSpacePoint};
