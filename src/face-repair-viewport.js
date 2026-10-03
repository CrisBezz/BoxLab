import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.700';
// Whole-object repair access; existing repair owners retain topology and history.
const repairs={
  'Close Holes':{selector:'#closeHolesBtn',owner:'__boxlabCloseHoles',method:'closeHoles',description:'Fill all simple closed boundary loops.'},
  'Quad Cleanup':{selector:'#quadPairCleanupBtn',owner:'__boxlabQuadPairCleanup',method:'apply',description:'Merge safe planar triangle pairs into quads.'},
  'Quadify N-gons':{selector:'#quadifyNgonsBtn',owner:'__boxlabQuadifyNgons',method:'apply',description:'Split eligible planar, convex, even-sided n-gons into quads.'}
};
const panel=document.createElement('div');
panel.id='faceRepairViewport';panel.hidden=true;
panel.innerHTML='<strong></strong><div class="fr-scope">Scope: whole active object</div><div class="fr-description"></div><div class="fr-result" role="status"></div><div class="fr-actions"><button type="button" class="fr-apply">Apply</button><button type="button" class="fr-cancel">Cancel</button></div>';
document.querySelector('#viewportWrap')?.appendChild(panel);
const style=document.createElement('style');
style.textContent='#faceRepairViewport{width:270px;padding:10px;border-radius:12px;border:1px solid #ffffff30;background:rgba(16,19,24,.965);color:#eef2f7;font-size:12px;pointer-events:auto;touch-action:none}#faceRepairViewport[hidden]{display:none}#faceRepairViewport .fr-scope{margin:6px 0;font-weight:700}#faceRepairViewport .fr-description,#faceRepairViewport .fr-result{font-size:11px;margin:6px 0}#faceRepairViewport .fr-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}#faceRepairViewport button{min-height:34px;padding:6px;font-size:11px}';
document.head.appendChild(style);
const applyButton=panel.querySelector('.fr-apply');
let session=null,raf=0;
function mesh(){return globalThis.__boxlabBridgeState?.mesh;}
function editable(){
  // The object owner locks reference guides too; avoid its saving objects getter.
  return !document.querySelector('#app')?.classList.contains('boxlab-active-locked');
}
function available(tool){
  const spec=repairs[tool],owner=spec&&globalThis[spec.owner];
  owner?.syncUI?.();
  const target=spec&&document.querySelector(spec.selector);
  return !!(editable()&&owner?.[spec.method]&&target&&!target.disabled);
}
function hide(){session=null;panel.hidden=true;cancelAnimationFrame(raf);}
function close(){
  const tool=session?.tool;hide();
  if(tool)queueMicrotask(()=>window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'face',tool}})));
}
function sync(){
  cancelAnimationFrame(raf);
  if(!session)return;
  if(mesh()!==session.mesh||globalThis.__boxlabSelectionBridge?.mode?.()!=='face'||!editable()){close();return;}
  placeToolSessionPanel(panel);
  raf=requestAnimationFrame(sync);
}
function openFromHub({tool}){
  hide();
  session={tool,mesh:mesh()};
  if(!repairs[tool]||!available(tool)){close();return false;}
  panel.querySelector('strong').textContent=tool;
  panel.querySelector('.fr-description').textContent=repairs[tool].description;
  panel.querySelector('.fr-result').textContent='Applies beyond the selected Faces.';
  applyButton.disabled=false;panel.hidden=false;
  sync();return true;
}
function apply(){
  if(!session)return;
  sync();if(!session)return;
  const tool=session.tool,spec=repairs[tool];
  if(!available(tool)){
    applyButton.disabled=true;
    panel.querySelector('.fr-result').textContent='No eligible repair remains. Cancel to return.';
    return;
  }
  const result=globalThis[spec.owner][spec.method]();
  globalThis[spec.owner].syncUI?.();
  const message=result?.ok?tool+' complete':result?.reason||'Repair could not be applied';
  const status=document.querySelector('#selectionStatus');if(status)status.textContent=message;
  if(!result?.ok){panel.querySelector('.fr-result').textContent=message;return;}
  // Whole-mesh rebuilding can change face indices; never keep stale Face IDs.
  globalThis.__boxlabSelectionBridge?.set?.('face',[]);
  close();
}
panel.addEventListener('pointerdown',event=>event.stopPropagation(),true);
panel.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});
applyButton.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();apply();});
panel.querySelector('.fr-cancel').addEventListener('click',event=>{event.preventDefault();event.stopPropagation();close();});
window.addEventListener('boxlab-selection-hub-tool',event=>{if(session&&(event.detail?.mode!=='face'||event.detail?.tool!==session.tool))hide();});
window.addEventListener('boxlab-bridge-state',()=>{
  sync();if(session)applyButton.disabled=!available(session.tool);
});
globalThis.__boxlabFaceRepairViewportSession={openFromHub,available,active:()=>!!session,element:panel,close,sync};
