import {createArraySourceEditor} from './live-array-source-core.js?v=0.36.18.857';
import {placeToolSessionPanel} from './tool-session-panel-position.js?v=0.36.18.732';
const panel=document.createElement('div');panel.id='liveArraySourcePanel';panel.className='boxlab-tool-session-shell';panel.hidden=true;
panel.innerHTML='<div class="boxlab-tool-session-title">Edit Array Source</div><div class="drawer-hint">Edit with Vertex / Edge / Face tools. Apply Source regenerates the array with its saved END transforms.</div><div class="outliner-actions"><button type="button" id="liveArraySourceCancel">Cancel</button><button type="button" id="liveArraySourceApply">Apply Source</button></div>';
Object.assign(panel.style,{padding:'7px 8px',borderRadius:'10px',background:'rgba(22,25,31,.96)',border:'1px solid #ffffff33',pointerEvents:'auto',fontSize:'12px'});
document.querySelector('#viewportWrap')?.appendChild(panel);placeToolSessionPanel(panel);
const manager=()=>globalThis.__boxlabObjectManager;
const nested=()=>!!globalThis.__boxlabToolSession?.current?.()||[...document.querySelectorAll('#viewportWrap [data-wide-tool-panel="true"]')].some(node=>node!==panel&&node.getClientRects().length>0);
function hide(value){if(panel.hidden!==value)panel.hidden=value;}
const busy=()=>nested()||document.querySelector('#totalGizmo')?.dataset.dragging==='true'||!!globalThis.__boxlabMainDirectTool?.busy?.()||!!globalThis.__boxlabFaceDirect?.dragging?.();
const status=text=>{const node=document.querySelector('#selectionStatus');if(node)node.textContent=text;};
let queued=false,finishing=false;
const controller=createArraySourceEditor({manager,objectHistory:()=>globalThis.__boxlabObjectHistory,history:()=>globalThis.__boxlabHistory,busy,changed:()=>queueSync()});
function queueSync(){if(!queued){queued=true;queueMicrotask(sync);}}
function finish(){
 finishing=true;globalThis.__boxlabMainDirectTool?.disarmForSelection?.();globalThis.__boxlabTransformArming?.disarm?.();
 document.querySelector('#selectionModes button[data-mode="object"]')?.click();
 globalThis.__boxlabObjectSelection?.single?.(manager()?.activeId);
 hide(true);finishing=false;
 window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'object',tool:'Array Source'}}));
}
function sync(){
 queued=false;if(!controller.active()){hide(true);return;}
 if(!controller.context().ok&&!busy()){if(controller.cancel()){finish();status('Array source edit cancelled · context changed');}return;}
 // Component tool panels keep the shared top-centre slot. The source bar returns
 // when their original session ends; it never becomes a competing tool owner.
 hide(nested());
}
function open(id,parameters){
 const result=controller.open(id,parameters);if(!result.ok){status(result.reason);return false;}
 globalThis.__boxlabTransformArming?.disarm?.();
 globalThis.__boxlabObjectSelection?.single?.(id);
 document.querySelector('#selectionModes button[data-mode="face"]')?.click();
 hide(false);status('Array source · edit components, then Apply Source or Cancel');queueSync();return true;
}
function cancel(){if(!controller.cancel())return false;finish();status('Array source edit cancelled');return true;}
function apply(){const result=controller.apply();if(result.ok){finish();status(result.unchanged?'Array source unchanged':'Live Array source updated');}else{if(!controller.active())finish();status('Array source update refused · '+result.reason);}return result;}
panel.querySelector('#liveArraySourceCancel').addEventListener('click',cancel);
panel.querySelector('#liveArraySourceApply').addEventListener('click',apply);
const blocked='#selectionModes button[data-mode="object"],#fileMenu button,#fileMenu input[type="file"],#resetBtn,#outlinerAddBtn,#outlinerDuplicateBtn,#outlinerDeleteBtn,#outlinerRenameBtn,#linkedDuplicateBtn,#makeUniqueBtn,#objectMultiSelectBtn,#outlinerMultiSelectBtn,#modifiersDrawer input,#modifiersDrawer button,#outlinerList button,#outlinerList summary,.object-management-tools button,.mode-tools[data-mode-tools="object"] button';
// UI commands only; keep the actual component/navigation gesture owners intact.
window.addEventListener('click',event=>{
 if(!controller.active()||finishing||panel.contains(event.target))return;
 if(event.target?.closest?.(blocked)){event.preventDefault();event.stopImmediatePropagation();status('Apply Source or Cancel before changing objects or files');}
},true);
window.addEventListener('keydown',event=>{
 if(!controller.active()||event.target?.closest?.('input,textarea,[contenteditable="true"]'))return;
 if(event.key==='Escape'&&!nested()&&cancel()){event.preventDefault();event.stopImmediatePropagation();}
},true);
for(const name of ['boxlab-bridge-state','boxlab-transform-end','boxlab-tool-session-change','boxlab-selection-hub-session-complete','boxlab-object-manager-ready'])window.addEventListener(name,queueSync);
globalThis.__boxlabLiveArraySourceEditor={version:'0.36.18.857',open,apply,cancel,active:controller.active,state:controller.state};

new MutationObserver(queueSync).observe(document.querySelector('#viewportWrap'),{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']});
