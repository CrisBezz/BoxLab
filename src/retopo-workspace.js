import {openQuadStrokeCorners,quadStrokeCorners} from './retopo-stroke.js?v=0.36.18.1220';
import {buildRetopoQuad} from './retopo-quad.js?v=0.36.18.1211';
import {EditableMesh} from './mesh.js';
import {createRetopoSurface,nearestRetopoVertex} from './retopo-surface.js?v=0.36.18.1209';
import {placeToolSessionPanel} from './tool-session-panel-position.js?v=0.36.18.732';

const canvas=document.querySelector('#viewport'),bar=document.querySelector('#selectionModes'),status=document.querySelector('#selectionStatus');
const state=()=>globalThis.__boxlabBridgeState,manager=()=>globalThis.__boxlabObjectManager;
const button=document.createElement('button');button.id='retopoModeBtn';button.type='button';button.title='Retopology';button.setAttribute('aria-pressed','false');button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 7 8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10M8 5l8 4M8 9v10M4 12l8 4 8-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg><span class="mode-label">Retopo</span>';bar?.appendChild(button);
const panel=document.createElement('div');panel.id='retopoSession';panel.className='boxlab-tool-session-shell';panel.hidden=true;
panel.innerHTML='<div class="boxlab-tool-session-title">Retopo · Surface modelling</div><div id="retopoHint" class="boxlab-tool-session-subtitle"></div><div class="outliner-actions"><button type="button" id="retopoVertex" aria-pressed="false">Vertex</button><button type="button" id="retopoQuad" aria-pressed="true">Quad</button><button type="button" id="retopoClear">Clear corners</button><button type="button" id="retopoDone">Done</button></div>';
document.querySelector('#viewportWrap')?.appendChild(panel);placeToolSessionPanel(panel,{compact:true});
const style=document.createElement('style');style.textContent='#retopoSession button[aria-pressed=true]{background:#eef1f7;color:#15171b}#retopoModeBtn svg{width:22px;height:22px}#retopoSession{width:340px;padding:12px;background:#1b2029;color:#eef1f7;border:1px solid #454c59;border-radius:14px}#retopoModeBtn[aria-pressed=true]{background:#eef1f7;color:#15171b}#app.boxlab-retopo-session #selectionModes [data-mode].active{background:#1e222a;color:#eef1f7}#app.boxlab-retopo-session #totalGizmo{visibility:hidden!important}';document.head.appendChild(style);
let picking=false,sourceTap=null;
const hint=panel.querySelector('#retopoHint');
const toolButtons=['#retopoVertex','#retopoQuad','#retopoClear'].map(selector=>panel.querySelector(selector));
let active=false,referenceId=null,retopoId=null,surface=null,drag=null,previousMode='face',entryObjectId=null,tool='quad',corners=[],cornerContext=null;
const guide=document.createElement('div');guide.id='retopoQuadGuide';
Object.assign(guide.style,{position:'absolute',inset:'0',pointerEvents:'none',zIndex:'40'});document.querySelector('#viewportWrap')?.appendChild(guide);
function drawCorners(){
  if(drag?.stroke&&drag.moved){
    const r=canvas.getBoundingClientRect();
    const xy=drag.stroke.map(p=>`${p.x-r.left},${p.y-r.top}`);
    guide.innerHTML=`<svg width="100%" height="100%" viewBox="0 0 ${r.width} ${r.height}"><polyline points="${xy.join(' ')}" fill="none" stroke="#50efc6" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
    return;
  }
  if(!active||!corners.length){guide.innerHTML='';return;}
  if(cornerContext?.mesh!==state()?.mesh||cornerContext?.id!==manager()?.activeId){clearCorners();return;}
  const r=canvas.getBoundingClientRect(),points=corners.map(c=>c.index===null?c.point:state().mesh.vertices[c.index]);
  const projected=points.map(v=>v.clone().project(state().camera));
  if(projected.some(p=>p.z< -1||p.z>1)){guide.innerHTML='';return;}
  const xy=projected.map(p=>[(p.x*.5+.5)*r.width,(-p.y*.5+.5)*r.height]);
  guide.innerHTML=`<svg width="100%" height="100%" viewBox="0 0 ${r.width} ${r.height}"><polyline points="${xy.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#50efc6" stroke-width="2"/>${xy.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#50efc6" stroke="#102921" stroke-width="2"/><text x="${p[0]+9}" y="${p[1]-8}" fill="#fff" font-size="14">${i+1}</text>`).join('')}</svg>`;
}
function clearCorners(){corners=[];cornerContext=null;guide.innerHTML='';}
function setTool(next){cancelDrag();clearCorners();tool=next;panel.querySelector('#retopoVertex').setAttribute('aria-pressed',String(tool==='vertex'));panel.querySelector('#retopoQuad').setAttribute('aria-pressed',String(tool==='quad'));render();message(tool==='quad'?'Retopo · draw a quad or connect boundary corners':'Retopo · tap surface to place · drag vertices to move');}
function quadCorner(d){
  if(cornerContext&&(cornerContext.mesh!==state().mesh||cornerContext.id!==manager().activeId))clearCorners();
  cornerContext??={mesh:state().mesh,id:manager().activeId};
  if(d.index!==null&&corners.some(c=>c.index===d.index)){message('Retopo · choose a different corner');return;}
  corners.push({index:d.index,point:d.point.clone(),normal:d.normal.clone()});drawCorners();
  if(corners.length<4){message(`Retopo · corner ${corners.length}/4 · tap the next corner`);return;}
  commitQuad(corners);
}
function commitQuad(outline, result=null){
  const before=retopoId?state().mesh.clone():new EditableMesh([],[]);
  result??=buildRetopoQuad(before,outline,outline[0].normal);
  if(!result.ok){clearCorners();message(`Retopo · ${result.reason} · try another outline`);return;}
  if(!retopoId){
    const snapshot=globalThis.__boxlabObjectHistory?.capture?.();if(!snapshot){clearCorners();return;}
    retopoId=manager().addMesh(result.mesh,'Retopo',{enterObjectMode:false,settings:{mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true}}).id;
    globalThis.__boxlabObjectHistory.checkpointSnapshot(snapshot,snapshot.objects.find(o=>o.id===snapshot.activeId)?.mesh||new EditableMesh([],[]));
  }else{
    const live=state().mesh;
    globalThis.__boxlabHistory.push(before);
    for(const key of ['vertices','faces','faceGroups','creases','looseEdges','looseVertices'])live[key]=result.mesh[key];
  }
  clearCorners();manager().saveActive();globalThis.__boxlabSelectionBridge?.clear?.();render();message('Retopo · quad created · draw the next outline');
}
function message(text){if(status)status.textContent=text;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function consume(e){e.preventDefault();e.stopImmediatePropagation();}
function valid(){
  const m=manager(),ref=m?.objects?.find(o=>o.id===referenceId),edit=m?.objects?.find(o=>o.id===retopoId);
  return active&&surface&&ref?.visible!==false&&!!ref&&((!retopoId&&m.activeId===entryObjectId)||(m.activeId===retopoId&&!!edit&&!edit.locked&&!edit.sourceId));
}
function release(d){try{canvas.releasePointerCapture(d.pointer);}catch{}if(d.controls)d.controls.enabled=d.enabled;}
function cancelDrag(){
  if(!drag)return;const d=drag;drag=null;
  if(d.index!==null&&manager()?.activeId===d.object&&state()?.mesh===d.mesh)d.mesh.vertices[d.index].copy(d.start);
  release(d);drawCorners();render();
}
function showPanel(show){
  panel.hidden=!show;
  button.setAttribute('aria-pressed',String(show));
  const app=document.querySelector('#app');
  if(show)app?.classList.add('boxlab-retopo-session');
  else app?.classList.remove('boxlab-retopo-session');
  for(const control of toolButtons)control.hidden=picking;
}
function chooseSource(){
  if(!canEnter())return;
  picking=true;
  hint.textContent='Tap the mesh you want to retopologise';
  showPanel(true);
}
function close(){
  if(picking){picking=false;sourceTap=null;showPanel(false);return;}
  if(!active)return;
  cancelDrag();clearCorners();active=false;showPanel(false);
  state()?.controls?.removeEventListener?.('change',drawCorners);surface?.dispose();surface=null;
  globalThis.__boxlabToolSession?.end?.('retopo');
  document.querySelector(`#selectionModes [data-mode="${previousMode}"]`)?.click();
  message('Retopo closed · mesh retained · Undo/Redo available');
}
function canEnter(){
  if(globalThis.__boxlabViewportPaint?.active||globalThis.__boxlabUVWorkspace?.active){message('Finish the current workspace before Retopo');return false;}
  const session=globalThis.__boxlabToolSession;
  if(session?.isActive?.()){message('Close the current tool before entering Retopo');return false;}
  return true;
}
function start({fresh=false,reference=null}={}){
  if(active)close();
  if(!canEnter())return false;
  const m=manager();m?.saveActive?.();
  let source=m?.objects?.find(o=>o.id===referenceId),edit=m?.objects?.find(o=>o.id===retopoId);
  const explicit=reference!==null;
  const resume=!fresh&&source&&edit&&m.activeId===retopoId&&(!explicit||reference===referenceId);
  if(explicit&&!resume){source=m?.objects?.find(o=>o.id===reference);retopoId=null;}
  else if(!resume){source=m?.objects?.find(o=>o.id===m.activeId);retopoId=null;}
  if(!explicit&&(!source?.mesh?.faces?.length||source.visible===false)){source=m?.objects?.find(o=>o.visible!==false&&o.mesh?.faces?.length);retopoId=null;}
  if(!source?.mesh?.faces?.length){message('Retopo · select a visible reference mesh first');return false;}
  if(source.visible===false){message('Retopo · show the reference object first');return false;}
  try{surface=createRetopoSurface(source.mesh);}catch(e){message(`Retopo · ${e.message}`);return false;}
  previousMode=globalThis.__boxlabSelectionBridge?.mode?.()||'face';referenceId=source.id;entryObjectId=m.activeId;
  globalThis.__boxlabAddVertex?.stop?.(false);globalThis.__boxlabBuildEdge?.disarm?.();globalThis.__boxlabVertexExtrude?.disarm?.();globalThis.__boxlabDirectVertexBevel?.disarm?.();globalThis.__boxlabVertexSlidePolish?.disarm?.({cancelDrag:true});globalThis.__boxlabTransformArming?.disarm?.();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'retopo'}}));
  document.querySelector('#selectionModes [data-mode="vertex"]')?.click();
  picking=false;sourceTap=null;clearCorners();active=true;setTool('quad');
  state().controls?.addEventListener?.('change',drawCorners);showPanel(true);
  hint.textContent=`${source.name} · Draw a quad or connect boundary corners · fingers: navigate`;
  return true;
}
function selectReference(id){
  const source=manager()?.objects?.find(object=>object.id===id);
  if(!source?.mesh?.faces?.length){message('Retopo · select a visible reference mesh first');return false;}
  if(source.visible===false){message('Retopo · show the reference object first');return false;}
  if(id===referenceId&&valid())return true;
  return start({reference:id});
}
function hit(e){return surface?.hit(state().camera,canvas.getBoundingClientRect(),e.clientX,e.clientY);}
function sourceDown(e){
  if(sourceTap){sourceTap.cancelled=true;return;}
  if(e.target!==canvas||e.button!==0||e.isPrimary===false)return;
  sourceTap={pointer:e.pointerId,x:e.clientX,y:e.clientY};
  if(e.pointerType!=='touch')consume(e);
}
function sourceMove(e){
  if(sourceTap?.pointer===e.pointerId&&Math.hypot(e.clientX-sourceTap.x,e.clientY-sourceTap.y)>8)sourceTap.cancelled=true;
}
function sourceUp(e){
  if(sourceTap?.pointer!==e.pointerId)return;
  sourceMove(e);
  const tap=sourceTap;sourceTap=null;
  if(e.pointerType!=='touch')consume(e);
  if(e.type!=='pointerup'||tap.cancelled)return;
  const id=manager()?.pickObject?.(e,{anyMode:true})?.id;
  if(id!=null&&selectReference(id))return;
  if(id==null)message('Retopo · tap a visible mesh');
}
function down(e){
  if(picking){sourceDown(e);return;}
  if(active&&e.pointerType==='touch'&&drag){cancelDrag();return;}
  if(!active||e.target!==canvas||!['pen','mouse'].includes(e.pointerType)||(e.button!==0&&!(e.pressure>0)))return;
  if(!valid()){close();return;}
  if(drag)return;
  consume(e);
  const h=hit(e);if(!h){message('Retopo · point at the reference surface');return;}
  const m=state().mesh,index=retopoId?nearestRetopoVertex(m,state().camera,canvas.getBoundingClientRect(),e.clientX,e.clientY,h,16,surface):null;
  drag={pointer:e.pointerId,object:manager().activeId,mesh:m,index,start:index===null?null:m.vertices[index].clone(),beforeMesh:m.clone(),point:h.point,normal:h.normal,valid:true,x:e.clientX,y:e.clientY,moved:false,before:globalThis.__boxlabObjectHistory?.capture?.(),controls:state().controls,enabled:state().controls?.enabled};
  if(tool==='quad')drag.stroke=[{x:e.clientX,y:e.clientY}];
  if(drag.controls)drag.controls.enabled=false;
  try{canvas.setPointerCapture(e.pointerId);}catch{}
}
function move(e){
  if(picking){sourceMove(e);return;}
  if(!drag||e.pointerId!==drag.pointer)return;
  consume(e);if(!valid()||state().mesh!==drag.mesh){cancelDrag();return;}
  if(drag.stroke){
    for(const point of e.getCoalescedEvents?.() || [])recordStroke(drag,point);
    recordStroke(drag,e);drawCorners();return;
  }
  const h=hit(e);drag.valid=!!h;drag.moved ||= Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5;
  if(!h)return;drag.point=h.point;
  if(tool==='vertex'&&drag.index!==null){drag.mesh.vertices[drag.index].copy(h.point);render();}
}
function recordStroke(d,e){
  const last=d.stroke.at(-1);
  if(Math.hypot(e.clientX-last.x,e.clientY-last.y)<2)return;
  if(d.stroke.length>=256){d.strokeOverflow=true;return;}
  d.stroke.push({x:e.clientX,y:e.clientY});
  d.moved ||= Math.hypot(e.clientX-d.x,e.clientY-d.y)>5;
}
function finishStroke(d,e){
  recordStroke(d,e);
  if(!d.moved){quadCorner(d);return;}
  clearCorners();
  const outline=d.strokeOverflow?null:quadStrokeCorners(d.stroke);
  const rect=canvas.getBoundingClientRect(),camera=state().camera;
  if(!outline){
    if(!d.strokeOverflow&&retopoId&&completeOpenStroke(d.stroke,rect,camera))return;
    message('Retopo · close the outline or start and end near boundary corners');return;
  }
  const projected=[];
  const snapRadius=Math.min(16,Math.min(...outline.map((p,i)=>Math.hypot(p.x-outline[(i+1)%4].x,p.y-outline[(i+1)%4].y)))*.3);
  for(const {x,y} of outline){
    const pick=surface.hit(camera,rect,x,y);
    if(!pick){message('Retopo · keep all four corners on the reference');return;}
    const index=retopoId?nearestRetopoVertex(state().mesh,camera,rect,x,y,pick,snapRadius,surface):null;
    projected.push({...pick,index});
  }
  commitQuad(projected);
}
function completeOpenStroke(stroke,rect,camera){
  const mesh=state().mesh, first=stroke[0], last=stroke.at(-1);
  const radius=Math.min(32,Math.max(12,Math.hypot(last.x-first.x,last.y-first.y)*.45));
  function anchor(point){
    const pick=surface.hit(camera,rect,point.x,point.y);
    const index=pick?nearestRetopoVertex(mesh,camera,rect,point.x,point.y,pick,radius,surface):null;
    return index===null?null:{...pick,index};
  }
  const start=anchor(first),end=anchor(last);
  if(!start||!end||start.index===end.index)return false;
  const adjacent=new Map();
  for(const {a,b,faces} of mesh.edges()){
    if(faces.length!==1)continue;
    if(!adjacent.has(a))adjacent.set(a,new Set());
    if(!adjacent.has(b))adjacent.set(b,new Set());
    adjacent.get(a).add(b);adjacent.get(b).add(a);
  }
  const from=adjacent.get(start.index),to=adjacent.get(end.index);
  if(!from||!to)return false;
  for(const sharedSides of [2,1]){
    const paths=sharedSides===2?[...from].filter(index=>to.has(index)).map(index=>[{index}]):from.has(end.index)?[[]]:[];
    if(!paths.length)continue;
    const corners=openQuadStrokeCorners(stroke,4-sharedSides);
    if(!corners)continue;
    const drawn=corners.map(({x,y})=>surface.hit(camera,rect,x,y));
    if(drawn.some(point=>!point))continue;
    let candidate=null;
    for(const path of paths){
      const outline=[start,...drawn.map(point=>({...point,index:null})),end,...path];
      const result=buildRetopoQuad(mesh,outline,start.normal);
      if(!result.ok)continue;
      if(candidate)return false;
      candidate={outline,result};
    }
    if(candidate){
      commitQuad(candidate.outline,candidate.result);
      return true;
    }
  }
  return false;
}
function up(e){
  if(picking){sourceUp(e);return;}
  if(!drag||e.pointerId!==drag.pointer)return;
  consume(e);const d=drag;
  if(e.type!=='pointerup'||!valid()||state().mesh!==d.mesh||!d.valid){cancelDrag();return;}
  drag=null;release(d);
  if(tool==='quad'){finishStroke(d,e);return;}
  if(d.index!==null){
    if(d.start.distanceToSquared(d.mesh.vertices[d.index])>1e-16)globalThis.__boxlabHistory?.push?.(d.beforeMesh);
  }else if(!d.moved){
    if(!d.before){message('Retopo · history is still loading');return;}
    if(!retopoId){
      const mesh=new EditableMesh([],[]);mesh.addLooseVertex(d.point);
      const o=manager().addMesh(mesh,'Retopo',{enterObjectMode:false,settings:{mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true}});
      retopoId=o.id;
      globalThis.__boxlabObjectHistory.checkpointSnapshot(d.before,d.before.objects.find(o=>o.id===d.before.activeId)?.mesh||new EditableMesh([],[]));
    }else {globalThis.__boxlabHistory.push(d.beforeMesh);d.mesh.addLooseVertex(d.point);}
  }
  manager().saveActive();globalThis.__boxlabSelectionBridge?.clear?.();render();message('Retopo · surface vertex retained · Undo/Redo available');
}
button.addEventListener('click',()=>active||picking?close():chooseSource());
panel.querySelector('#retopoDone').addEventListener('click',close);
panel.querySelector('#retopoVertex').addEventListener('click',()=>setTool('vertex'));
panel.querySelector('#retopoQuad').addEventListener('click',()=>setTool('quad'));
panel.querySelector('#retopoClear').addEventListener('click',()=>{cancelDrag();clearCorners();message('Retopo · corners cleared');});
window.addEventListener('resize',drawCorners);
// One explicit editing owner. Touch contacts remain with native navigation.
window.addEventListener('pointerdown',down,{capture:true,passive:false});window.addEventListener('pointermove',move,{capture:true,passive:false});
window.addEventListener('pointerup',up,{capture:true,passive:false});window.addEventListener('pointercancel',up,{capture:true,passive:false});
canvas.addEventListener('lostpointercapture',cancelDrag);
window.addEventListener('blur',()=>{sourceTap=null;cancelDrag();});window.addEventListener('pagehide',()=>{if(active||picking)close();});
window.addEventListener('keydown',e=>{if(active&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){consume(e);cancelDrag();document.querySelector(e.shiftKey?'#redoBtn':'#undoBtn')?.click();return;}if((active||picking)&&e.key==='Escape'){consume(e);if(drag)cancelDrag();else if(corners.length){clearCorners();message('Retopo · corners cleared');}else close();}},true);
document.addEventListener('click',e=>{
  if(!active&&!picking)return;
  if(e.target.closest?.('#undoBtn,#redoBtn')){cancelDrag();clearCorners();}
  else if(e.target.closest?.('#selectionModes button')&&e.target.closest('button')!==button){
    const picked=e.target.closest('button');
    // Object activation/history clears native selection by clicking the CURRENT
    // Vertex button. This is not a request to leave the Retopo workspace.
    if(picked.dataset.mode==='vertex'&&!e.isTrusted)return;
    close();
  }
},true);
globalThis.__boxlabRetopo={start,close,selectReference,get active(){return active||picking;},get referenceId(){return referenceId;},get retopoId(){return retopoId;},get drawQuads(){return active&&tool==='quad';}};
