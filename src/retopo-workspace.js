import {EditableMesh} from './mesh.js';
import {createRetopoSurface,nearestRetopoVertex} from './retopo-surface.js?v=0.36.18.1209';
import {placeToolSessionPanel} from './tool-session-panel-position.js?v=0.36.18.732';

const canvas=document.querySelector('#viewport'),bar=document.querySelector('#selectionModes'),status=document.querySelector('#selectionStatus');
const state=()=>globalThis.__boxlabBridgeState,manager=()=>globalThis.__boxlabObjectManager;
const button=document.createElement('button');button.id='retopoModeBtn';button.type='button';button.title='Retopology';button.setAttribute('aria-pressed','false');button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 7 8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10M8 5l8 4M8 9v10M4 12l8 4 8-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg><span class="mode-label">Retopo</span>';bar?.appendChild(button);
const panel=document.createElement('div');panel.id='retopoSession';panel.className='boxlab-tool-session-shell';panel.hidden=true;
panel.innerHTML='<div class="boxlab-tool-session-title">Retopo · Surface vertices</div><div id="retopoHint" class="boxlab-tool-session-subtitle"></div><div class="outliner-actions"><button type="button" id="retopoNew">New from active</button><button type="button" id="retopoDone">Done</button></div>';
document.querySelector('#viewportWrap')?.appendChild(panel);placeToolSessionPanel(panel,{compact:true});
const style=document.createElement('style');style.textContent='#retopoModeBtn svg{width:22px;height:22px}#retopoSession{width:340px;padding:12px;background:#1b2029;color:#eef1f7;border:1px solid #454c59;border-radius:14px}#retopoModeBtn[aria-pressed=true]{background:#eef1f7;color:#15171b}#app.boxlab-retopo-session #selectionModes [data-mode].active{background:#1e222a;color:#eef1f7}#app.boxlab-retopo-session #totalGizmo{visibility:hidden!important}';document.head.appendChild(style);
let active=false,referenceId=null,retopoId=null,surface=null,drag=null,previousMode='face';
function message(text){if(status)status.textContent=text;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function consume(e){e.preventDefault();e.stopImmediatePropagation();}
function valid(){
  const m=manager(),ref=m?.objects?.find(o=>o.id===referenceId),edit=m?.objects?.find(o=>o.id===retopoId);
  return active&&surface&&ref?.visible!==false&&!!ref&&((!retopoId&&m.activeId===referenceId)||(m.activeId===retopoId&&!!edit&&!edit.locked&&!edit.sourceId));
}
function release(d){try{canvas.releasePointerCapture(d.pointer);}catch{}if(d.controls)d.controls.enabled=d.enabled;}
function cancelDrag(){
  if(!drag)return;const d=drag;drag=null;
  if(d.index!==null&&manager()?.activeId===d.object&&state()?.mesh===d.mesh)d.mesh.vertices[d.index].copy(d.start);
  release(d);render();
}
function close(){
  cancelDrag();active=false;panel.hidden=true;button.setAttribute('aria-pressed','false');document.querySelector('#app')?.classList.remove('boxlab-retopo-session');
  surface?.dispose();surface=null;
  globalThis.__boxlabToolSession?.end?.('retopo');
  document.querySelector(`#selectionModes [data-mode="${previousMode}"]`)?.click();
  message('Retopo closed · mesh retained · Undo/Redo available');
}
function start({fresh=false}={}){
  if(active)close();
  if(globalThis.__boxlabViewportPaint?.active||globalThis.__boxlabUVWorkspace?.active){message('Finish the current workspace before Retopo');return false;}
  const session=globalThis.__boxlabToolSession;
  if(session?.isActive?.()){message('Close the current tool before entering Retopo');return false;}
  const m=manager();m?.saveActive?.();
  let source=m?.objects?.find(o=>o.id===referenceId),edit=m?.objects?.find(o=>o.id===retopoId);
  const resume=!fresh&&source&&edit&&m.activeId===retopoId;
  if(!resume){source=m?.objects?.find(o=>o.id===m.activeId);retopoId=null;}
  if(!source?.mesh?.faces?.length){message('Retopo · select a visible reference mesh first');return false;}
  if(source.visible===false){message('Retopo · show the reference object first');return false;}
  try{surface=createRetopoSurface(source.mesh);}catch(e){message(`Retopo · ${e.message}`);return false;}
  previousMode=globalThis.__boxlabSelectionBridge?.mode?.()||'face';referenceId=source.id;
  globalThis.__boxlabAddVertex?.stop?.(false);globalThis.__boxlabBuildEdge?.disarm?.();globalThis.__boxlabVertexExtrude?.disarm?.();globalThis.__boxlabDirectVertexBevel?.disarm?.();globalThis.__boxlabVertexSlidePolish?.disarm?.({cancelDrag:true});globalThis.__boxlabTransformArming?.disarm?.();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'retopo'}}));
  document.querySelector('#selectionModes [data-mode="vertex"]')?.click();
  active=true;panel.hidden=false;button.setAttribute('aria-pressed','true');document.querySelector('#app')?.classList.add('boxlab-retopo-session');
  panel.querySelector('#retopoHint').textContent=`${source.name} · Pencil: place / drag vertices · fingers: navigate`;
  message('Retopo · tap surface to place · drag a vertex to move · Done retains mesh');return true;
}
function hit(e){return surface?.hit(state().camera,canvas.getBoundingClientRect(),e.clientX,e.clientY);}
function down(e){
  if(active&&e.pointerType==='touch'&&drag){cancelDrag();return;}
  if(!active||e.target!==canvas||!['pen','mouse'].includes(e.pointerType)||(e.button!==0&&!(e.pressure>0)))return;
  if(!valid()){close();return;}
  if(drag)return;
  consume(e);
  const h=hit(e);if(!h){message('Retopo · point at the reference surface');return;}
  const m=state().mesh,index=retopoId?nearestRetopoVertex(m,state().camera,canvas.getBoundingClientRect(),e.clientX,e.clientY,h,16,surface):null;
  drag={pointer:e.pointerId,object:manager().activeId,mesh:m,index,start:index===null?null:m.vertices[index].clone(),beforeMesh:m.clone(),point:h.point,valid:true,x:e.clientX,y:e.clientY,moved:false,before:globalThis.__boxlabObjectHistory?.capture?.(),controls:state().controls,enabled:state().controls?.enabled};
  if(drag.controls)drag.controls.enabled=false;
  try{canvas.setPointerCapture(e.pointerId);}catch{}
}
function move(e){
  if(!drag||e.pointerId!==drag.pointer)return;
  consume(e);if(!valid()||state().mesh!==drag.mesh){cancelDrag();return;}
  const h=hit(e);drag.valid=!!h;drag.moved ||= Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5;
  if(!h)return;drag.point=h.point;
  if(drag.index!==null){drag.mesh.vertices[drag.index].copy(h.point);render();}
}
function up(e){
  if(!drag||e.pointerId!==drag.pointer)return;
  consume(e);const d=drag;
  if(e.type!=='pointerup'||!valid()||state().mesh!==d.mesh||!d.valid){cancelDrag();return;}
  drag=null;release(d);
  if(d.index!==null){
    if(d.start.distanceToSquared(d.mesh.vertices[d.index])>1e-16)globalThis.__boxlabHistory?.push?.(d.beforeMesh);
  }else if(!d.moved){
    if(!d.before){message('Retopo · history is still loading');return;}
    if(!retopoId){
      const mesh=new EditableMesh([],[]);mesh.addLooseVertex(d.point);
      const o=manager().addMesh(mesh,'Retopo',{enterObjectMode:false,settings:{mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true}});
      retopoId=o.id;
      globalThis.__boxlabObjectHistory.checkpointSnapshot(d.before,d.before.objects.find(o=>o.id===d.before.activeId).mesh);
    }else {globalThis.__boxlabHistory.push(d.beforeMesh);d.mesh.addLooseVertex(d.point);}
  }
  manager().saveActive();globalThis.__boxlabSelectionBridge?.clear?.();render();message('Retopo · surface vertex retained · Undo/Redo available');
}
button.addEventListener('click',()=>active?close():start());
panel.querySelector('#retopoDone').addEventListener('click',close);
panel.querySelector('#retopoNew').addEventListener('click',()=>start({fresh:true}));
// One explicit editing owner. Touch contacts remain with native navigation.
window.addEventListener('pointerdown',down,{capture:true,passive:false});window.addEventListener('pointermove',move,{capture:true,passive:false});
window.addEventListener('pointerup',up,{capture:true,passive:false});window.addEventListener('pointercancel',up,{capture:true,passive:false});
canvas.addEventListener('lostpointercapture',cancelDrag);
window.addEventListener('blur',cancelDrag);window.addEventListener('pagehide',()=>{if(active)close();});
window.addEventListener('keydown',e=>{if(active&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){consume(e);cancelDrag();document.querySelector(e.shiftKey?'#redoBtn':'#undoBtn')?.click();return;}if(active&&e.key==='Escape'){consume(e);if(drag)cancelDrag();else close();}},true);
document.addEventListener('click',e=>{
  if(!active)return;
  if(e.target.closest?.('#undoBtn,#redoBtn')){cancelDrag();}
  else if(e.target.closest?.('#selectionModes button')&&e.target.closest('button')!==button){
    const picked=e.target.closest('button');
    // Object activation/history clears native selection by clicking the CURRENT
    // Vertex button. This is not a request to leave the Retopo workspace.
    if(picked.dataset.mode==='vertex'&&!e.isTrusted)return;
    close();
  }
},true);
globalThis.__boxlabRetopo={start,close,get active(){return active;},get referenceId(){return referenceId;},get retopoId(){return retopoId;}};
