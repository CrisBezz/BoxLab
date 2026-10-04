import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.730';
// Settings proxy only. component-align owns anchor picking, geometry and history.
const panel=document.createElement('div');
panel.id='faceAlignViewport';panel.hidden=true;
panel.innerHTML='<strong>Align Faces</strong><div class="fa-instruction" role="status">Choose an axis, then tap a selected Face to keep it fixed.</div><div class="fa-axes"><button type="button" data-axis="x">X</button><button type="button" data-axis="y">Y</button><button type="button" data-axis="z">Z</button><button type="button" data-axis="face">Align to Face</button></div><button type="button" class="fa-cancel">Cancel</button>';
document.querySelector('#viewportWrap')?.appendChild(panel);
const style=document.createElement('style');
style.textContent='#faceAlignViewport{width:270px;padding:10px;border-radius:12px;border:1px solid #ffffff30;background:rgba(16,19,24,.965);color:#eef2f7;font-size:12px;pointer-events:auto;touch-action:none}#faceAlignViewport[hidden]{display:none}#faceAlignViewport .fa-instruction{margin:7px 0;font-size:11px}#faceAlignViewport .fa-axes{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:6px 0}#faceAlignViewport [data-axis="face"]{grid-column:1/-1}#faceAlignViewport button{min-height:34px;padding:6px;font-size:11px}#faceAlignViewport .active{background:#f3b34a;color:#111318}#faceAlignViewport .fa-cancel{width:100%}';
document.head.appendChild(style);
const axes=[...panel.querySelectorAll('[data-axis]')];
let session=null,raf=0,message='';
function owner(){return globalThis.__boxlabComponentAlign;}
function mesh(){return globalThis.__boxlabBridgeState?.mesh;}
function editable(){return !document.querySelector('#app')?.classList.contains('boxlab-active-locked');}
function available(){
  owner()?.sync?.();
  const target=document.querySelector("#componentAlignRow [data-align-axis='x']");
  return !!(editable()&&owner()?.arm&&target&&!target.disabled&&globalThis.__boxlabSelectionBridge?.mode?.()==='face');
}
function close({disarm=true,complete=true}={}){
  const was=!!session;session=null;panel.hidden=true;cancelAnimationFrame(raf);
  if(was&&disarm)owner()?.disarm?.();
  if(was&&complete)queueMicrotask(()=>window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'face',tool:'Align'}})));
}
function sync(){
  cancelAnimationFrame(raf);
  if(!session)return;
  if(mesh()!==session.mesh||globalThis.__boxlabSelectionBridge?.mode?.()!=='face'||(globalThis.__boxlabSelectionBridge?.indices?.()||[]).length<2||!editable()){close();return;}
  const axis=owner()?.axis?.();
  for(const button of axes){
    button.classList.toggle('active',button.dataset.axis===axis);
    button.setAttribute('aria-pressed',String(button.dataset.axis===axis));
  }
  panel.querySelector('.fa-instruction').textContent=message||(axis==='face'?'Tap the selected Face to keep fixed. Other Faces must form a planar group.':axis?`Align ${axis.toUpperCase()}: tap a selected Face to keep it fixed.`:'Choose X/Y/Z or Align to Face, then tap the selected Face to keep fixed.');
  placeToolSessionPanel(panel);
  raf=requestAnimationFrame(sync);
}
function openFromHub(){
  close({complete:false});
  session={mesh:mesh()};message='';
  if(!available()){close();return false;}
  panel.hidden=false;sync();return true;
}
panel.addEventListener('pointerdown',event=>event.stopPropagation(),true);
panel.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});
for(const button of axes)button.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  if(!session)return;
  sync();if(!session)return;
  if(!available()){close();return;}
  message='';owner().arm(button.dataset.axis);
  sync();
});
panel.querySelector('.fa-cancel').addEventListener('click',event=>{event.preventDefault();event.stopPropagation();close();});
window.addEventListener('boxlab-component-align-change',event=>{
  if(!session)return;
  if(!event.detail?.axis){close({disarm:false});return;}
  message=event.detail?.reason==='reject'?event.detail.message||'Alignment unavailable':'';
  sync();
});
window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(session&&(event.detail?.mode!=='face'||event.detail?.tool!=='Align'))close({complete:false});
});
window.addEventListener('boxlab-bridge-state',()=>{if(session){sync();if(session&&!available())close();}});
globalThis.__boxlabFaceAlignViewportSession={openFromHub,available,active:()=>!!session,element:panel,close,sync};
