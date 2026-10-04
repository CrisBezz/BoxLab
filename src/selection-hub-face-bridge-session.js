import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.716';
// Viewport proxy for the existing Face Bridge preview owner.
const wrap=document.querySelector('#viewportWrap');
let launched=false,raf=0;
const panel=document.createElement('div');
panel.id='selectionHubFaceBridgeSession';
panel.hidden=true;
panel.innerHTML='<strong>Face Bridge</strong><div class="shfb-state"></div><div class="shfb-actions"><button type="button" data-target="#bridgeFacesBtn">Next</button><button type="button" data-target="#bridgePreviewConfirm">Use Bridge</button><button type="button" data-target="#bridgePreviewCancel">Cancel</button></div>';
wrap?.appendChild(panel);
const style=document.createElement('style');
style.textContent='#selectionHubFaceBridgeSession{position:absolute;z-index:134;width:246px;box-sizing:border-box;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(16,19,24,.965);color:#eef2f7;pointer-events:auto;touch-action:none;font-size:12px}#selectionHubFaceBridgeSession[hidden]{display:none}#selectionHubFaceBridgeSession .shfb-state{margin:6px 0;font-size:11px;opacity:.8}#selectionHubFaceBridgeSession .shfb-actions{display:grid;grid-template-columns:1fr 1.5fr 1fr;gap:5px}#selectionHubFaceBridgeSession button{min-height:34px;padding:5px;font-size:11px}';
document.head.appendChild(style);
function sync(){
  cancelAnimationFrame(raf);
  const info=globalThis.__boxlabFaceBridgePreview?.state?.();
  panel.hidden=!(launched&&info?.active);
  if(panel.hidden)return;
  panel.querySelector('.shfb-state').textContent=`Preview ${info.index+1} / ${info.count}`;
  placeToolSessionPanel(panel);
  raf=requestAnimationFrame(sync);
}
panel.addEventListener('pointerdown',event=>event.stopPropagation(),true);
panel.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});
panel.addEventListener('click',event=>{
  const button=event.target.closest('[data-target]');
  if(!button)return;
  event.preventDefault();event.stopPropagation();
  const target=document.querySelector(button.dataset.target);
  if(target&&!target.disabled)target.click();
  sync();
});
window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(event.detail?.mode!=='face'||event.detail?.tool!=='Bridge')return;
  launched=true;
  if(!globalThis.__boxlabFaceBridgePreview?.active?.()){
    launched=false;
    queueMicrotask(()=>window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'face',tool:'Bridge'}})));
  }
  sync();
});
window.addEventListener('boxlab-face-bridge-preview-change',event=>{
  if(!event.detail?.active)launched=false;
  sync();
});
globalThis.__boxlabFaceBridgeViewportSession={active:()=>launched&&!panel.hidden,element:panel,sync};
