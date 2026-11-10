import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const multiToggle = document.querySelector('#multiSelectToggle');
const depthButtons = [...document.querySelectorAll('#paintSelectDepth [data-paint-depth]')];
const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 0.09;
const pointer = new THREE.Vector2();
let paint = null;
let pendingPaint = null;
let paintDepth = 'visible';
const PAINT_DRAG_PX = 6;

function state() { return globalThis.__boxlabBridgeState; }
function selection() { return globalThis.__boxlabSelectionBridge; }
function mode() { return selection()?.mode?.(); }

function objectsFor(type) {
  const s = state();
  if (type === 'vertex') return [...(s?.vertexObjects?.values?.() || [])];
  if (type === 'edge') return [...(s?.edgeObjects?.values?.() || [])];
  if (type === 'face') return [...(s?.faceObjects?.values?.() || [])];
  return [];
}

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function hitIndices(event, type) {
  const depth=type==='face'&&globalThis.__boxlabSelectionInput?(globalThis.__boxlabSelectionInput.frontOnly()?'visible':'through'):paintDepth;
  // Share native Edge proximity ranking with taps and Pencil background classification.
  if((type==='edge'||type==='face')&&selection()?.pickHits){
    const indices=[...new Set(selection().pickHits(type,event).map(hit=>hit.index).filter(Number.isInteger))];
    return depth==='through'?indices:indices.slice(0,1);
  }
  const camera = state()?.camera;
  const objects = objectsFor(type).filter(Boolean);
  if (!camera || !objects.length) return [];
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);
  const raw = raycaster.intersectObjects(objects, false);
  const hits=type==='face'?(globalThis.__boxlabSelectionInput?.filterFaceHits?.(raw,raycaster.ray.direction)||raw):raw;
  const indices = [...new Set(hits.map(hit => hit.object?.userData?.index).filter(Number.isInteger))];
  return depth === 'through' ? indices : indices.slice(0, 1);
}

function addHits(event, type) {
  const bridge = selection();
  hitIndices(event, type).forEach(index => bridge?.add?.(type, index));
}

depthButtons.forEach(button => button.addEventListener('click', () => {
  paintDepth = button.dataset.paintDepth;
  globalThis.__boxlabSelectionInput?.setFront?.(paintDepth==='visible');
  depthButtons.forEach(item => item.classList.toggle('active', item === button));
}));

// Explicit Face DRAG uses this same paint-selection owner. Window capture
// precedes document modelling/hold owners, so no scrub, transform or orbit starts.
let faceDrag=null;
function faceDragValid(g){return state()?.mesh===g.mesh&&mode()==='face'&&(globalThis.__boxlabObjectManager?.activeId??null)===g.objectId;}
function finishFaceDrag(cancel=false){
 const g=faceDrag;if(!g)return;faceDrag=null;
 if(cancel&&faceDragValid(g))selection()?.set?.('face',g.seed);
 if(g.controls)g.controls.enabled=g.enabled;
 if(!cancel&&g.moved&&faceDragValid(g))globalThis.__boxlabSelectionInput?.showDragPuck?.({clientX:g.x,clientY:g.y});
 try{canvas.releasePointerCapture?.(g.id);}catch{}
}
function addFaceIndices(indices){
 const b=selection(),old=b?.indices?.()||[],next=new Set(old);let primary=null;
 let changed=false;
 for(const id of indices){if(faceDrag?.remove){if(next.delete(id))changed=true;}else if(!next.has(id)){next.add(id);primary=id;changed=true;}}
 if(changed)b?.set?.('face',[...next],primary);
}
function faceDragSample(event){
 const g=faceDrag;if(!g||!faceDragValid(g)){finishFaceDrag(true);return;}
 const coalesced=event.getCoalescedEvents?.()||[],points=coalesced.length?[...coalesced,event]:[event],hits=new Set();
 for(const point of points){
  g.moved ||= Math.hypot(point.clientX-g.startX,point.clientY-g.startY)>=4;
  const dx=point.clientX-g.x,dy=point.clientY-g.y,steps=Math.min(256,Math.max(1,Math.ceil(Math.hypot(dx,dy)/4)));
  for(let i=1;i<=steps;i++)for(const id of hitIndices({clientX:g.x+dx*i/steps,clientY:g.y+dy*i/steps},'face'))hits.add(id);
  g.x=point.clientX;g.y=point.clientY;
 }
 addFaceIndices(hits);
}
window.addEventListener('pointerdown',event=>{
 if(faceDrag){const secondary=event.pointerId!==faceDrag.id;finishFaceDrag(true);if(secondary)return;}
 if(!globalThis.__boxlabSelectionInput?.dragFaces?.()||mode()!=='face'||event.target!==canvas||!event.isPrimary||event.button>0||!['pen','mouse'].includes(event.pointerType))return;
 if(event.pointerType==='pen'&&!(event.buttons&1)&&!(event.pressure>0))return;
 if(globalThis.__boxlabViewportPaint?.active||globalThis.__boxlabToolSession?.isActive?.()||globalThis.__boxlabFaceDirect?.active?.()||globalThis.__boxlabMainDirectTool?.ownsModellingGesture?.()||globalThis.__boxlabActiveGizmoDrag||globalThis.__boxlabLasso?.isArmed?.()||globalThis.__boxlabFacegroupStroke?.armed)return;
 const first=hitIndices(event,'face');if(!first.length)return;
 finishFaceDrag(true);pendingPaint=null;paint=null;
 const controls=state()?.controls;faceDrag={id:event.pointerId,mesh:state()?.mesh,objectId:globalThis.__boxlabObjectManager?.activeId??null,seed:[...(selection()?.indices?.()||[])],controls,enabled:controls?.enabled,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false,remove:(selection()?.indices?.()||[]).includes(first[0])};
 event.preventDefault();event.stopImmediatePropagation();
 if(controls)controls.enabled=false;
 try{canvas.setPointerCapture?.(event.pointerId);}catch{finishFaceDrag(true);return;}
 addFaceIndices(first);
},true);
window.addEventListener('pointermove',event=>{
 if(!faceDrag||event.pointerId!==faceDrag.id)return;event.preventDefault();event.stopImmediatePropagation();faceDragSample(event);
},true);
for(const type of ['pointerup','pointercancel'])window.addEventListener(type,event=>{
 if(!faceDrag||event.pointerId!==faceDrag.id)return;event.preventDefault();event.stopImmediatePropagation();if(type==='pointerup')faceDragSample(event);finishFaceDrag(type==='pointercancel');
},true);
window.addEventListener('boxlab-selection-input-change',()=>finishFaceDrag(true));
window.addEventListener('blur',()=>finishFaceDrag(true));
window.addEventListener('pagehide',()=>finishFaceDrag(true));
window.addEventListener('visibilitychange',()=>{if(document.hidden)finishFaceDrag(true);},true);
canvas?.addEventListener('lostpointercapture',event=>{if(faceDrag?.id===event.pointerId)finishFaceDrag(true);});

canvas?.addEventListener('pointerdown', event => {
  const groups=globalThis.__boxlabFacegroupStroke;
  if(groups?.pointerId!==null&&groups?.pointerId!==undefined&&groups.pointerId!==event.pointerId)groups.cancel();
  if(event.pointerType==='pen'&&event.button===0&&event.pressure>0&&groups?.armed&&!globalThis.__boxlabLasso?.isArmed?.()&&!globalThis.__boxlabFaceDirect?.active?.()&&!globalThis.__boxlabMainDirectTool?.ownsModellingGesture?.()&&!globalThis.__boxlabFaceSplit?.isArmed?.()&&!globalThis.__boxlabOffsetLoop?.isArmed?.()){
    const first=hitIndices(event,'face')[0];
    if(groups.begin(event.pointerId,first)){pendingPaint=null;paint=null;try{canvas.setPointerCapture?.(event.pointerId);}catch{groups.cancel();}event.preventDefault();event.stopImmediatePropagation();return;}
  }

  if(globalThis.__boxlabLasso?.isArmed?.()){pendingPaint=null;return;}
  if(globalThis.__boxlabFaceSplit?.isArmed?.()||globalThis.__boxlabOffsetLoop?.isArmed?.()) return;
  const type = mode();
  if(type==='face'&&globalThis.__boxlabSelectionInput)return; // Explicit DRAG owns Face paint now.
  if(type==='face'&&globalThis.__boxlabFaceDirect?.active?.()) return;
  const bridge = selection();
  if (!event.isPrimary || !multiToggle?.checked || !['vertex', 'edge', 'face'].includes(type)) return;
  const first = hitIndices(event, type)[0];
  if (!Number.isInteger(first) || bridge?.has?.(type, first)) return;
  pendingPaint = { pointerId:event.pointerId, type, x:event.clientX, y:event.clientY };
  globalThis.__boxlabGestureDebug?.log?.('PAINT PENDING',{type,index:first,pid:event.pointerId});
}, true);

canvas?.addEventListener('pointermove', event => {
  const groups=globalThis.__boxlabFacegroupStroke;
  if(groups?.pointerId===event.pointerId){
    event.preventDefault();event.stopImmediatePropagation();
    if(event.buttons&&event.pressure>0){for(const point of event.getCoalescedEvents?.().length?event.getCoalescedEvents():[event])groups.add(event.pointerId,hitIndices(point,'face')[0]);}
    return;
  }

  if(globalThis.__boxlabLasso?.isArmed?.()&&!paint){pendingPaint=null;return;}
  if (pendingPaint && pendingPaint.pointerId === event.pointerId && !paint) {
    if(globalThis.__boxlabModelessSelection?.browsing?.(event.pointerId)){
      globalThis.__boxlabGestureDebug?.log?.('PAINT YIELD TO BROWSER',{type:pendingPaint.type,pid:event.pointerId});
      pendingPaint=null;
      return;
    }
    const dx=event.clientX-pendingPaint.x,dy=event.clientY-pendingPaint.y;
    if(dx*dx+dy*dy < PAINT_DRAG_PX*PAINT_DRAG_PX) return;
    paint={pointerId:event.pointerId,type:pendingPaint.type};
    pendingPaint=null;
    globalThis.__boxlabGestureDebug?.log?.('PAINT CLAIM',{type:paint.type,pid:event.pointerId});
    canvas.setPointerCapture?.(event.pointerId);
    event.preventDefault();
    event.stopImmediatePropagation();
    addHits(event,paint.type);
    return;
  }
  if (!paint || paint.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  addHits(event, paint.type);
}, true);

function endPaint(event) {
  const groups=globalThis.__boxlabFacegroupStroke;
  if(groups?.pointerId===event.pointerId){
    event.preventDefault();event.stopImmediatePropagation();
    if(event.type==='pointercancel')groups.cancel();else{groups.add(event.pointerId,hitIndices(event,'face')[0]);groups.finish(event.pointerId);}
    try{canvas.releasePointerCapture?.(event.pointerId);}catch{}return;
  }

  if (pendingPaint?.pointerId === event.pointerId) {
    pendingPaint=null;
    return;
  }
  if (!paint || paint.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  paint = null;
}

// Pending paint must also terminate above canvas owners. A component tap can make
// the Total Gizmo appear between pointerdown and pointerup, so the release target
// may no longer be the canvas. Window capture prevents stale pendingPaint from
// surviving into a later Pencil gesture with a reused pointerId.
window.addEventListener('pointerup', endPaint, true);
window.addEventListener('pointercancel', event=>{
  if(pendingPaint?.pointerId===event.pointerId)pendingPaint=null;
  endPaint(event);
}, true);

window.addEventListener('boxlab-pencil-orbit-claim',event=>{
  const pointerId=event.detail?.pointerId;
  if(globalThis.__boxlabFacegroupStroke?.pointerId===pointerId)globalThis.__boxlabFacegroupStroke.cancel();
  if(pendingPaint?.pointerId===pointerId)pendingPaint=null;
  if(paint?.pointerId===pointerId){
    paint=null;
    try{canvas.releasePointerCapture?.(pointerId);}catch{}
  }
  globalThis.__boxlabGestureDebug?.log?.('PAINT YIELD TO ORBIT',{pid:pointerId});
});


globalThis.__boxlabPaintSelectDebug={
  pending:()=>pendingPaint?{pointerId:pendingPaint.pointerId,type:pendingPaint.type}:null,
  active:()=>faceDrag?{pointerId:faceDrag.id,type:'face'}:paint?{pointerId:paint.pointerId,type:paint.type}:null,
  depth:()=>paintDepth,
  multiEnabled:()=>!!multiToggle?.checked
};

canvas?.addEventListener('lostpointercapture',event=>{if(globalThis.__boxlabFacegroupStroke?.pointerId===event.pointerId)globalThis.__boxlabFacegroupStroke.cancel();});
window.addEventListener('pagehide',()=>globalThis.__boxlabFacegroupStroke?.cancel());
window.addEventListener('visibilitychange',()=>{if(document.hidden)globalThis.__boxlabFacegroupStroke?.cancel();},true);
