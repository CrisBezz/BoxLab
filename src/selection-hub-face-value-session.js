// Contextual settings proxy; precision-face and repeat-face-previous own operations.
const wrap=document.querySelector('#viewportWrap');
let tool=null,raf=0;
const panel=document.createElement('div');
panel.id='selectionHubFaceValueSession';panel.hidden=true;
panel.innerHTML='<strong class="shfv-title"></strong><label>Exact value <input type="number" step="0.001" inputmode="decimal" placeholder="Model units" aria-label="Exact Face tool value"/></label><button type="button" class="shfv-apply">Apply Exact</button><div class="shfv-readout"></div><div class="shfv-actions"><button type="button" class="shfv-repeat">Repeat Previous</button><button type="button" class="shfv-done">Done</button></div>';
wrap?.appendChild(panel);
const input=panel.querySelector('input'),apply=panel.querySelector('.shfv-apply'),repeat=panel.querySelector('.shfv-repeat');
const style=document.createElement('style');
style.textContent='#selectionHubFaceValueSession{position:absolute;z-index:134;width:246px;box-sizing:border-box;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(16,19,24,.965);color:#eef2f7;pointer-events:auto;touch-action:none;font-size:12px}#selectionHubFaceValueSession[hidden]{display:none}#selectionHubFaceValueSession label{display:grid;grid-template-columns:70px 1fr;gap:6px;align-items:center;margin:8px 0}#selectionHubFaceValueSession input{min-width:0;width:100%;padding:6px;color:inherit;background:#ffffff0c;border:1px solid #ffffff30;border-radius:6px}#selectionHubFaceValueSession button{min-height:34px;padding:6px;font-size:11px}#selectionHubFaceValueSession .shfv-apply{width:100%}#selectionHubFaceValueSession .shfv-readout{font-size:10px;opacity:.75;margin:6px 0}#selectionHubFaceValueSession .shfv-actions{display:grid;grid-template-columns:1fr auto;gap:6px}';
document.head.appendChild(style);
function selected(){const b=globalThis.__boxlabSelectionBridge;return b?.mode?.()==='face'?(b.indices?.()||[]):[];}
function sync(){
  cancelAnimationFrame(raf);
  if(!tool){panel.hidden=true;return;}
  if(globalThis.__boxlabSelectionBridge?.mode?.()!=='face'){close();return;}
  panel.hidden=false;
  panel.querySelector('.shfv-title').textContent=tool==='extrude'?'Extrude':'Inset';
  apply.disabled=!selected().length||!globalThis.__boxlabPrecisionFace?.applyFor||input.value.trim()===''||!Number.isFinite(Number(input.value));
  const source=document.querySelector('#repeatFacePreviousBtn');
  repeat.disabled=!source||source.disabled||!globalThis.__boxlabRepeatFacePrevious;
  repeat.textContent=source?.textContent||'Repeat Previous';
  repeat.classList.toggle('active',!!globalThis.__boxlabRepeatFacePrevious?.isArmed?.());
  repeat.setAttribute('aria-pressed',String(!!globalThis.__boxlabRepeatFacePrevious?.isArmed?.()));
  panel.querySelector('.shfv-readout').textContent=document.querySelector('#precisionFaceReadout')?.textContent||'Drag Faces or enter a value in model units';
  const g=globalThis.__boxlabTotalGizmo?.element;
  const x=parseFloat(g?.style.left)||wrap.clientWidth/2,y=parseFloat(g?.style.top)||wrap.clientHeight/2;
  const left=x+115+246<wrap.clientWidth?x+115:x-115-246;
  panel.style.left=`${Math.max(8,Math.min(wrap.clientWidth-254,left))}px`;
  panel.style.top=`${Math.max(8,Math.min(wrap.clientHeight-panel.offsetHeight-8,y-panel.offsetHeight/2))}px`;
  raf=requestAnimationFrame(sync);
}
function close(){
  const was=tool;tool=null;panel.hidden=true;cancelAnimationFrame(raf);
  if(!was)return;
  globalThis.__boxlabRepeatFacePrevious?.disarm?.();
  if(globalThis.__boxlabFaceDirect?.tool?.()===was)document.querySelector(was==='extrude'?'#extrudeBtn':'#insetBtn')?.click();
  globalThis.__boxlabFaceDirect?.clearTransformSuspension?.();
  window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'face',tool:was==='extrude'?'Extrude':'Inset'}}));
}
panel.addEventListener('pointerdown',event=>event.stopPropagation(),true);
panel.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});
input.addEventListener('input',sync);
function applyExact(){
  if(apply.disabled||!tool)return;
  globalThis.__boxlabRepeatFacePrevious?.disarm?.();
  globalThis.__boxlabPrecisionFace?.applyFor?.(tool,Number(input.value));
  sync();
}
apply.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();applyExact();});
input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();applyExact();input.blur();}});
repeat.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();if(!repeat.disabled)globalThis.__boxlabRepeatFacePrevious?.arm?.();sync();});
panel.querySelector('.shfv-done').addEventListener('click',event=>{event.preventDefault();event.stopPropagation();close();});
window.addEventListener('boxlab-selection-hub-tool',event=>{
  const next=event.detail?.mode==='face'&&['Extrude','Inset'].includes(event.detail?.tool)?event.detail.tool.toLowerCase():null;
  if(tool&&tool!==next){
    // The chosen tool has already launched; do not reset its hub lifecycle.
    tool=null;panel.hidden=true;cancelAnimationFrame(raf);
    globalThis.__boxlabRepeatFacePrevious?.disarm?.();
  }
  if(!next)return;
  tool=next;
  const value=globalThis.__boxlabPrecisionFace?.value?.();
  input.value=Number.isFinite(value)?String(value):'';
  sync();
});
window.addEventListener('boxlab-bridge-state',()=>{if(tool)sync();});
globalThis.__boxlabFaceValueViewportSession={active:()=>!!tool,element:panel,close,sync};
