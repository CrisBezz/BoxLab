import './auto-multi-transfer.js?v=0.28.10';
import './ui-cleanup-0322.js?v=0.32.6';
import './bridge-ui.js?v=0.32.22';
import './dissolve-bootstrap.js?v=0.32.4';
import './dissolve-ui.js?v=0.32.22';
import './transform-arming.js?v=0.36.18.253';
import './component-tap-toggle.js?v=0.32.21';
import * as THREE from 'three';
import {createFaceBevelPreview,disposeFaceBevelPreview} from './bevel-face-preview.js?v=0.36.18.716';
const button=document.querySelector('#bevelBtn'),canvas=document.querySelector('#viewport'),width=document.querySelector('#bevelWidth'),out=document.querySelector('#bevelWidthOut'),multiToggle=document.querySelector('#multiSelectToggle'),ray=new THREE.Raycaster(),pointer=new THREE.Vector2();ray.params.Line.threshold=.09;let armed=false,drag=null,faceSession=null,facePreview=null,persistentEdge=false,edgeSession=null;
function state(){return globalThis.__boxlabBridgeState}function bridge(){return globalThis.__boxlabSelectionBridge}function hit(e){const s=state(),r=canvas.getBoundingClientRect();if(!s?.camera)return null;pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(pointer,s.camera);const h=ray.intersectObjects([...(s.edgeObjects?.values()||[])],false)[0];return Number.isInteger(h?.object?.userData?.index)?h.object.userData.index:null}
function disarm(){
  if(!faceSession&&drag){const saved=drag;if(state()?.mesh===saved.mesh)restore(saved.mesh,saved.before);try{canvas.releasePointerCapture?.(saved.id);}catch{}if(persistentEdge&&state()?.controls)state().controls.enabled=saved.controlsEnabled;render();}
  discardEdgePreview();
  disposeFaceBevelPreview(facePreview);facePreview=null;
  if(faceSession&&drag){
    try{canvas.releasePointerCapture?.(drag.id);}catch{}
    if(state()?.controls)state().controls.enabled=drag.controlsEnabled;
    if(state()?.mesh===drag.mesh)render();
  }
  armed=false;drag=null;faceSession=null;persistentEdge=false;button?.classList.remove('active');
}
function editable(){return !document.querySelector('#app')?.classList.contains('boxlab-active-locked');}
function faceBevelInfo(faceIds=bridge()?.indices?.()||[]){
  const mesh=state()?.mesh,ids=[...new Set(faceIds)];
  if(!editable()||bridge()?.mode?.()!=='face'||!mesh||!globalThis.__boxlabHistory)return{ok:false,reason:'Select editable Face(s) first'};
  if(!ids.length||ids.some(i=>!Number.isInteger(i)||!Array.isArray(mesh.faces[i])||mesh.faces[i].length<3))return{ok:false,reason:'Select valid Face(s) first'};
  const boundary=ids.length===1?mesh.faces[ids[0]]:mesh.faceRegionInfo?.(ids)?.boundaryLoop;
  if(!boundary?.length)return{ok:false,reason:'Select one Face or one connected region with a simple outside boundary'};
  const edges=mesh.edges(),byKey=new Map(edges.map((edge,index)=>[mesh.edgeKey(edge.a,edge.b),index]));
  const edgeIds=boundary.map((v,i)=>byKey.get(mesh.edgeKey(v,boundary[(i+1)%boundary.length])));
  if(edgeIds.some(i=>!Number.isInteger(i)))return{ok:false,reason:'Face boundary has invalid edges'};
  const valid=mesh.generalBevelSelectionInfo?.(edgeIds);
  return valid?{ok:true,mesh,faceIds:ids,ids:[...valid.ids]}:{ok:false,reason:mesh.__lastBevelError||'Face boundary cannot be bevelled by the current Edge Bevel engine'};
}
function faceContextValid(){
  return !!(faceSession&&editable()&&state()?.mesh===faceSession.mesh&&bridge()?.mode?.()==='face'
    &&[...new Set(bridge()?.indices?.()||[])].sort((a,b)=>a-b).join(',')===faceSession.faceIds.slice().sort((a,b)=>a-b).join(','));
}
function armFaces(faceIds){
  const info=faceBevelInfo(faceIds);if(!info.ok)return info;
  disarm();globalThis.__boxlabTransformArming?.disarm?.();
  globalThis.__boxlabFaceDirect?.suspendForTransform?.();globalThis.__boxlabFaceDirect?.clearTransformSuspension?.();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'bevel'}}));
  faceSession={...info,before:info.mesh.clone(),candidate:null,previewResult:null};armed=true;button?.classList.add('active');
  previewFaces();return info;
}
function completeFaces(){
  queueMicrotask(()=>window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'face',tool:'Bevel'}})));
}
function cancelFaces({restoreSelection=true}={}){
  const saved=faceSession;if(!saved)return false;
  disarm();
  if(restoreSelection&&state()?.mesh===saved.mesh&&bridge()?.mode?.()==='face')bridge()?.set?.('face',saved.faceIds);
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'none',reason:'bevel-cancel'}}));
  completeFaces();return true;
}
function sourceUnchanged(a=faceSession?.before,b=faceSession?.mesh){
  return !!(a&&b&&a.vertices.length===b.vertices.length&&a.faces.length===b.faces.length
    &&a.vertices.every((v,i)=>v.equals(b.vertices[i]))
    &&a.faces.every((f,i)=>f.length===b.faces[i]?.length&&f.every((v,j)=>v===b.faces[i][j]))
    // Missing labels on legacy/unlabelled faces mean the same as explicit null.
    &&a.faces.every((_,i)=>(a.faceGroups?.[i]??null)===(b.faceGroups?.[i]??null))
    &&a.creases.size===b.creases.size&&[...a.creases].every(([k,v])=>b.creases.get(k)===v)
    &&['looseEdges','looseVertices'].every(key=>(a[key]?.size||0)===(b[key]?.size||0)&&[...(a[key]||[])].every(v=>b[key]?.has(v))));
}
function previewFaces(value=Number(width?.value||20)){
  disposeFaceBevelPreview(facePreview);facePreview=null;
  if(!faceSession)return{ok:false,reason:'Face Bevel is not active'};
  faceSession.candidate=null;
  let result;
  if(!faceContextValid()||!sourceUnchanged())result={ok:false,reason:'Face context or geometry changed; cancel and launch again'};
  else if(!Number.isFinite(Number(value)))result={ok:false,reason:'Enter a bevel percentage'};
  else{
    const percent=Math.round(Math.max(2,Math.min(49,Number(value)))),working=faceSession.before.clone();
    const applied=working.generalBevelSelection?.(faceSession.ids,percent/100,bevelSegments());
    if(!applied)result={ok:false,reason:working.__lastBevelError||'Bevel preview unavailable'};
    else{
      faceSession.candidate=working;
      facePreview=createFaceBevelPreview(state()?.scene,working,faceSession.before);
      result={ok:true,percent,segments:bevelSegments()};
    }
  }
  faceSession.previewResult=result;
  window.dispatchEvent(new CustomEvent('boxlab-face-bevel-preview',{detail:result}));
  return result;
}
function applyFaces(value){
  if(drag)return{ok:false,reason:'Release the Pencil before applying'};
  const result=previewFaces(value);
  if(!result.ok)return result;
  const saved=faceSession,history=globalThis.__boxlabHistory;
  if(!history)return{ok:false,reason:'History unavailable'};
  history.push(saved.before);
  restore(saved.mesh,saved.candidate);
  if(width)width.value=String(result.percent);if(out)out.textContent=`${result.percent}%`;
  bridge()?.set?.('face',[]);disarm();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'none',reason:'bevel-exact-complete'}}));
  render();completeFaces();
  return{...result,ids:saved.ids};
}
for(const input of [width,document.querySelector('#bevelSegments')])for(const type of ['input','change'])input?.addEventListener(type,()=>{if(faceSession)previewFaces();else if(persistentEdge&&!drag)previewEdges();});
function selectedEdgeIds(){const b=bridge();return b?.mode?.()==='edge'?[...(b.indices?.()||[])]:[];}
// Slider preview is a copy; the existing Edge gesture still edits/commits normally.
function discardEdgePreview(){disposeFaceBevelPreview(edgeSession?.ghost);edgeSession=null;}
function edgePreviewKey(){return selectedEdgeIds().slice().sort((a,b)=>a-b).join(',');}
function previewEdges(value=Number(width?.value||20)){
  discardEdgePreview();
  if(!persistentEdge||drag||!editable()||bridge()?.mode?.()!=='edge')return{ok:false};
  const mesh=state()?.mesh,ids=selectedEdgeIds(),valid=mesh?.generalBevelSelectionInfo?.(ids);
  if(!valid)return{ok:false,reason:mesh?.__lastBevelError||'Select Edge(s) to preview'};
  const percent=Math.round(Math.max(2,Math.min(49,Number(value))));
  if(!Number.isFinite(percent))return{ok:false,reason:'Enter a bevel percentage'};
  const before=mesh.clone(),candidate=before.clone(),segments=bevelSegments();
  const ok=!!candidate.generalBevelSelection?.(valid.ids,percent/100,segments);
  edgeSession={mesh,before,candidate,key:edgePreviewKey(),object:globalThis.__boxlabObjectManager?.activeId,
    result:{ok,percent,segments,reason:ok?'':candidate.__lastBevelError||'Preview unavailable'},
    ghost:ok?createFaceBevelPreview(state()?.scene,candidate,before):null};
  return edgeSession.result;
}
function syncEdgePreview(){
  if(drag)return;
  if(edgeSession&&(state()?.mesh!==edgeSession.mesh||globalThis.__boxlabObjectManager?.activeId!==edgeSession.object||!sourceUnchanged(edgeSession.before,edgeSession.mesh))){discardEdgePreview();return;}
  if(!edgeSession||edgeSession.key!==edgePreviewKey())previewEdges();
}
function installFrameAll(){
  if(document.querySelector('#frameAllBtn'))return;
  const host=document.querySelector('.top-actions');
  if(!host)return;
  const b=document.createElement('button');
  b.id='frameAllBtn';
  b.type='button';
  b.textContent='Frame All';
  b.title='Fit the whole model in view';
  host.prepend(b);
  b.addEventListener('click',()=>{
    const s=state(),camera=s?.camera,mesh=s?.mesh;
    if(!camera||!mesh?.vertices?.length)return;
    const box=new THREE.Box3();
    mesh.vertices.forEach(v=>box.expandByPoint(v));
    if(box.isEmpty())return;
    const center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3()),radius=Math.max(size.length()*.5,.25);
    const controls=s?.controls||globalThis.__boxlabControls;
    const oldTarget=controls?.target?.clone?.()||center;
    let dir=camera.position.clone().sub(oldTarget);
    if(dir.lengthSq()<1e-8)dir.set(1,.75,1);
    dir.normalize();
    const halfY=THREE.MathUtils.degToRad(camera.fov)*.5;
    const halfX=Math.atan(Math.tan(halfY)*Math.max(camera.aspect,.01));
    const limiting=Math.max(.1,Math.min(halfY,halfX));
    const distance=Math.max(radius/Math.sin(limiting)*1.18,.75);
    camera.position.copy(center).addScaledVector(dir,distance);
    camera.near=Math.max(.001,distance-radius*2.5);
    camera.far=Math.max(100,distance+radius*6);
    camera.updateProjectionMatrix();
    if(controls?.target){controls.target.copy(center);controls.update?.();}
    else camera.lookAt(center);
    document.querySelector('#selectionStatus').textContent='View framed to whole model';
  });
}
installFrameAll();
button?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();if(faceSession)disarm();armed=!armed;if(armed&&bridge()?.mode?.()!=='edge')document.querySelector('#selectionModes button[data-mode="edge"]')?.click();button.classList.toggle('active',armed);const count=selectedEdgeIds().length,useMulti=!!multiToggle?.checked&&count>1;document.querySelector('#selectionStatus').textContent=armed?(useMulti?`Bevel ${count} edges • drag any selected edge`:'Bevel Edge • drag an edge'):'Edge mode • nothing selected'},true);
document.addEventListener('click',e=>{if(!armed||!e.isTrusted||e.target?.closest?.('#bevelBtn')||((faceSession||persistentEdge)&&e.target?.closest?.('#selectionHubBevelSession')))return;if(e.target?.closest?.('button'))disarm();},true);
function restore(mesh,snapshot){mesh.vertices=snapshot.vertices.map(v=>v.clone());mesh.faces=snapshot.faces.map(f=>[...f]);mesh.faceGroups=[...snapshot.faceGroups];mesh.creases=new Map(snapshot.creases);if(snapshot.looseEdges instanceof Set)mesh.looseEdges=new Set(snapshot.looseEdges);if(snapshot.looseVertices instanceof Set)mesh.looseVertices=new Set(snapshot.looseVertices)}function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}))}
function bevelSegments(){return Math.max(1,Number(document.querySelector('#bevelSegments')?.value||1));}
function startBevelGesture(e){
  if(!armed||!e.isPrimary||!editable())return;
  const mesh=state()?.mesh;
  let ids;
  if(faceSession){
    if(e.pointerType==='touch'||(e.pointerType==='pen'&&!(e.buttons&1)&&!(e.pressure>0)))return;
    if(!faceContextValid()){cancelFaces({restoreSelection:false});return;}
    const picked=bridge()?.pick?.('face',e);
    if(!picked||!faceSession.faceIds.includes(picked.index))return;
    ids=faceSession.ids;
  }else{
    const i=hit(e);if(!Number.isInteger(i)||!mesh)return;
    const existing=selectedEdgeIds(),useMulti=!!multiToggle?.checked&&existing.length>1&&existing.includes(i);
    ids=useMulti?existing:[i];if(!useMulti)bridge()?.set?.('edge',[i]);
  }
  e.preventDefault();e.stopImmediatePropagation();
  const valid=mesh.generalBevelSelectionInfo?.(ids);
  if(!valid){document.querySelector('#selectionStatus').textContent=mesh.__lastBevelError||'Selected boundary cannot be bevelled';return;}
  discardEdgePreview();
  drag={id:e.pointerId,x:e.clientX,width:Number(width.value||20),mesh,before:mesh.clone(),ids:[...valid.ids],mode:valid.mode,preview:false,face:!!faceSession,controlsEnabled:state()?.controls?.enabled};
  if((faceSession||persistentEdge)&&state()?.controls)state().controls.enabled=false;
  canvas.setPointerCapture?.(e.pointerId);
}
window.addEventListener('pointerdown',e=>{if(faceSession&&e.target===canvas)startBevelGesture(e);},true);
canvas?.addEventListener('pointerdown',e=>{if(!faceSession)startBevelGesture(e);},true);
function moveBevelGesture(e){
  if(!drag||drag.id!==e.pointerId)return;
  const value=Math.max(2,Math.min(49,drag.width+(e.clientX-drag.x)*.25)),amount=Math.round(value);
  if(drag.face){
    e.preventDefault();e.stopImmediatePropagation();
    if(!faceContextValid()){cancelFaces({restoreSelection:false});return;}
    width.value=String(amount);out.textContent=`${amount}%`;previewFaces(amount);return;
  }
  width.value=String(amount);out.textContent=`${amount}%`;
  restore(drag.mesh,drag.before);drag.preview=!!drag.mesh.generalBevelSelection?.(drag.ids,amount/100,bevelSegments());
  if(!drag.preview&&drag.mesh.__lastBevelError)document.querySelector('#selectionStatus').textContent=drag.mesh.__lastBevelError;
  render();
}
window.addEventListener('pointermove',e=>{if(drag?.face)moveBevelGesture(e);},true);
canvas?.addEventListener('pointermove',e=>{if(!drag?.face)moveBevelGesture(e);},true);
function endBevelGesture(e){
  if(!drag||drag.id!==e.pointerId)return;
  if(drag.face){
    e.preventDefault();e.stopImmediatePropagation();
    if(!faceContextValid()){cancelFaces({restoreSelection:false});return;}
    const current=drag;drag=null;
    if(state()?.controls)state().controls.enabled=current.controlsEnabled;
    try{canvas.releasePointerCapture?.(e.pointerId);}catch{}
    document.querySelector('#selectionStatus').textContent='Face Bevel preview • Apply to commit or Cancel';
    return;
  }
  const current=drag;
  drag=null;
  if(current.preview)globalThis.__boxlabHistory?.push(current.before);else restore(current.mesh,current.before);
  bridge()?.set?.('edge',current.preview?[]:(persistentEdge?current.ids:[]));
  try{canvas.releasePointerCapture?.(e.pointerId);}catch{}
  if(persistentEdge){if(state()?.controls)state().controls.enabled=current.controlsEnabled;render();window.dispatchEvent(new CustomEvent('boxlab-edge-bevel-operation-complete',{detail:{committed:current.preview}}));return;}
  disarm();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'none',reason:current.preview?'bevel-complete':'bevel-cancel'}}));
  render();
  const status=document.querySelector('#selectionStatus');
  if(status)status.textContent=current.preview?'Bevel committed • select Edge(s) for next action':'Bevel cancelled • Edge selection ready';
}
window.addEventListener('pointerup',e=>{if(drag?.face)endBevelGesture(e);},true);
canvas?.addEventListener('pointerup',e=>{if(!drag?.face)endBevelGesture(e);},true);
function cancelBevelGesture(e){
  if(!drag||drag.id!==e.pointerId)return;
  if(drag.face){e.preventDefault();e.stopImmediatePropagation();cancelFaces();return;}
  const current=drag;
  drag=null;
  restore(current.mesh,current.before);
  try{canvas.releasePointerCapture?.(e.pointerId);}catch{}
  if(persistentEdge){if(state()?.controls)state().controls.enabled=current.controlsEnabled;bridge()?.set?.('edge',current.ids);render();return;}
  disarm();
  bridge()?.set?.('edge',[]);
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'none',reason:'bevel-cancel'}}));
  render();
}
window.addEventListener('pointercancel',e=>{if(drag?.face)cancelBevelGesture(e);},true);
canvas?.addEventListener('pointercancel',e=>{if(!drag?.face)cancelBevelGesture(e);},true);

// v0.36.18.32 — exact Edge Bevel is owned by this same controller rather than
// duplicating bevel execution in precision-bevel.js.
function applyExact(value,selectionOverride=null){
  if(faceSession)return applyFaces(value);
  if(edgeSession&&(state()?.mesh!==edgeSession.mesh||globalThis.__boxlabObjectManager?.activeId!==edgeSession.object||!sourceUnchanged(edgeSession.before,edgeSession.mesh))){discardEdgePreview();return{ok:false,reason:"Geometry changed; select edges and preview again"};}
  discardEdgePreview();
  if(drag||!editable())return{ok:false,reason:'Release the gesture and select editable edges'};
  const mesh=state()?.mesh,raw=Number(value),ids=[...new Set(selectionOverride||selectedEdgeIds())].filter(Number.isInteger);
  if(!mesh||!ids.length)return{ok:false,reason:'Select edge(s) first'};
  if(!Number.isFinite(raw))return{ok:false,reason:'Enter a bevel percentage'};
  const valid=mesh.generalBevelSelectionInfo?.(ids);
  if(!valid)return{ok:false,reason:mesh.__lastBevelError||'Selection cannot be bevelled'};
  const amount=Math.round(Math.max(2,Math.min(49,raw))),before=mesh.clone();
  const result=mesh.generalBevelSelection?.([...valid.ids],amount/100,bevelSegments());
  if(!result){restore(mesh,before);render();return{ok:false,reason:mesh.__lastBevelError||'Bevel failed'};}
  globalThis.__boxlabHistory?.push(before);
  if(width)width.value=String(amount);if(out)out.textContent=`${amount}%`;
  bridge()?.set?.('edge',[]);
  if(persistentEdge){render();window.dispatchEvent(new CustomEvent('boxlab-edge-bevel-operation-complete',{detail:{committed:true}}));return{ok:true,ids:[...valid.ids],percent:amount,segments:bevelSegments()};}
  disarm();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'none',reason:'bevel-exact-complete'}}));
  render();
  const status=document.querySelector('#selectionStatus');if(status)status.textContent=`Bevel committed • ${valid.ids.length} edge${valid.ids.length===1?'':'s'} • ${amount}% • Edge selection ready`;
  return{ok:true,ids:[...valid.ids],percent:amount,segments:bevelSegments()};
}
globalThis.__boxlabDirectBevel={version:'0.36.18.708',applyExact,disarm,setPersistentEdge:value=>{if(!faceSession&&armed){persistentEdge=!!value;if(persistentEdge)previewEdges();else discardEdgePreview();}},active:()=>armed,faceBevelInfo,armFaces,cancelFaces,faceActive:()=>!!faceSession,faceContextValid,previewFaces,previewEdges,syncEdgePreview,previewState:()=>faceSession?.previewResult||edgeSession?.result||null,busy:()=>!!drag};
