import {createViewportPainter} from './viewport-paint-core.js?v=0.36.18.900';
import {brushSettings} from '../evaluations/uv-paint/paint-core.js?v=896';
const canvas=document.querySelector('#viewport'),menu=document.querySelector('#fileMenu .top-file-content'),status=document.querySelector('#selectionStatus');
const manager=()=>globalThis.__boxlabObjectManager,bridge=()=>globalThis.__boxlabBridgeState,tools=()=>globalThis.__boxlabToolSession;
const target=()=>{const m=manager();return m?.objects?.find(o=>o.id===m.activeId);};
let contact=null,opening=0,controller=null,disposed=false,lastPressure=1;const touches=new Set(),palms=new Set();
const panel=document.createElement('section');panel.id='boxlabViewportPaint';panel.hidden=true;
panel.innerHTML='<strong>UV Paint · 512² colour</strong><div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><label>Colour <input data-paint="colour" type="color" value="#e34b37"></label><label>Brush <select data-paint="brush"><option value="boxlab">BoxLab round</option><option value="klecks">Klecks curve</option></select></label><label>Size <input data-paint="radius" type="range" min="1" max="48" value="10"></label><label>Hardness <input data-paint="hardness" type="range" min="0" max="1" step=".01" value=".7"></label><label>Opacity <input data-paint="opacity" type="range" min="0" max="1" step=".01" value="1"></label><label><input data-paint="pressure" type="checkbox" checked>Pressure → size</label></div><div>Pencil paints · fingers navigate · seams may bleed · .boxlab saves paint</div><div class="outliner-actions"><button data-paint="undo" type="button">Undo</button><button data-paint="redo" type="button">Redo</button><button data-paint="done" type="button">Done</button></div>';
const style=document.createElement('style');style.textContent='#boxlabViewportPaint{font-size:12px;display:grid;gap:6px}#boxlabViewportPaint[hidden]{display:none!important}#boxlabViewportPaint input[type=range]{width:72px}#boxlabViewportPaint input[type=color]{width:38px;padding:2px}#boxlabViewportPaint label{display:inline-flex;gap:4px;align-items:center}';document.head.appendChild(style);document.body.appendChild(panel);
const input=k=>panel.querySelector(`[data-paint="${k}"]`),say=s=>{if(status)status.textContent=s;};
function settings(){return brushSettings({colour:input('colour').value,radius:Number(input('radius').value),hardness:Number(input('hardness').value),opacity:Number(input('opacity').value),pressure:input('pressure').checked});}
function release(){if(contact!==null){try{canvas.releasePointerCapture(contact);}catch{}contact=null;}}
function stopped(){opening++;release();for(const id of palms){try{canvas.releasePointerCapture(id);}catch{}}panel.hidden=true;tools()?.end('uv-paint');}
function close(){opening++;controller?.close();stopped();}
function makeController(){const b=bridge();if(!b?.camera||!b.scene||!b.controls)throw Error('Viewport not ready');return createViewportPainter({target,activeId:()=>manager()?.activeId,body:()=>{let found;b.scene.traverse(o=>{if(o.userData?.kind==='body')found=o;});return found;},owner:globalThis.__boxlabExportAs,camera:b.camera,controls:b.controls,scene:b.scene,checkpoint:()=>globalThis.__boxlabObjectHistory?.checkpoint?.(),onClose:stopped,refresh:body=>globalThis.__boxlabRenderModes?.apply?.(body),allowed:()=>globalThis.__boxlabSelectionBridge?.mode?.()==='object'&&tools()?.isActive?.('uv-paint')&&globalThis.__boxlabRenderModes?.paintVisible?.()!==false});}
async function open(){let instance;try{
 if(controller?.active){close();return;}if(tools()?.isActive?.())throw Error('Finish the current tool first');
 const ids=globalThis.__boxlabObjectSelection?.ids;if(ids?.size>1)throw Error('Select one object for UV Paint');if(ids?.size===1&&!ids.has(manager()?.activeId))throw Error('Activate the selected object first');
 if(globalThis.__boxlabSelectionBridge?.mode?.()!=='object')document.querySelector('#selectionModes [data-mode="object"]')?.click();
 manager()?.saveActive?.();if(!bridge()?.controls?.enabled)throw Error('Finish the current gesture first');
 if(globalThis.__boxlabRenderModes?.paintVisible?.()===false)throw Error('Switch VIEW to Studio, Solid or UV Image for painting');
 globalThis.__boxlabTransformArming?.disarm?.();instance=controller=makeController();panel.hidden=false;if(!tools()?.begin?.({id:'uv-paint',title:'UV Paint',node:panel}))throw Error('Tool session unavailable');
 globalThis.__boxlabTotalGizmo?.resetTransient?.({hideFloat:true});const token=++opening;await instance.open();if(token!==opening){instance.close();return;}document.querySelector('#fileMenu')?.removeAttribute('open');say('UV Paint · Pencil paints; fingers navigate · Done keeps strokes · Undo exits Paint');requestAnimationFrame(()=>frame(instance));
 }catch(e){if(instance&&instance!==controller)return;close();say('UV Paint: '+e.message);}}
function frame(instance){if(disposed||controller!==instance||!instance.active)return;instance.tick();if(instance.active)requestAnimationFrame(()=>frame(instance));}
function point(e,up=false){const r=canvas.getBoundingClientRect();if(e.pointerType==='pen'&&!up)lastPressure=e.pressure;return {x:e.clientX-r.left,y:e.clientY-r.top,width:r.width,height:r.height,pressure:e.pointerType==='pen'?lastPressure:1};}
function consume(e){e.preventDefault();e.stopImmediatePropagation();}
function down(e){if(e.target!==canvas)return;if(e.pointerType==='touch'){if(controller?.drawing){palms.add(e.pointerId);canvas.setPointerCapture(e.pointerId);consume(e);}else touches.add(e.pointerId);return;}
 if(!controller?.active||e.button!==0)return;consume(e);if(e.pointerType==='pen'&&(!e.buttons||e.pressure<=0)||touches.size||contact!==null)return;
 try{if(controller.begin(point(e),settings(),input('brush').value)){contact=e.pointerId;canvas.setPointerCapture(contact);}}catch(error){close();say('UV Paint: '+error.message);}}
function move(e){if(palms.has(e.pointerId)){consume(e);return;}if(contact!==e.pointerId)return;consume(e);if(e.pointerType==='pen'&&!e.buttons)return;const coalesced=e.getCoalescedEvents?.()||[];for(const p of coalesced.length?coalesced:[e]){if(p.pointerType==='pen'&&!p.buttons)continue;controller.move(point(p));}}
function up(e){touches.delete(e.pointerId);if(palms.delete(e.pointerId)){try{canvas.releasePointerCapture(e.pointerId);}catch{}consume(e);return;}if(contact!==e.pointerId)return;consume(e);try{if(e.type==='pointercancel')controller.cancel();else controller.finish(point(e,true));}catch(error){close();say('UV Paint: '+error.message);}release();}
function cancel(){controller?.cancel();release();}
for(const [name,fn] of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up]])window.addEventListener(name,fn,{capture:true,passive:false});
canvas?.addEventListener('lostpointercapture',e=>{if(contact===e.pointerId)cancel();});
window.addEventListener('blur',()=>{cancel();touches.clear();});window.addEventListener('resize',cancel);document.addEventListener('visibilitychange',()=>{if(document.hidden){cancel();touches.clear();}});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&(controller?.active||tools()?.isActive?.('uv-paint')))close();});window.addEventListener('boxlab-tool-session-change',e=>{if(e.detail?.id==='uv-paint'&&e.detail.active===false)close();});
window.addEventListener('pagehide',e=>{if(e.persisted){cancel();return;}disposed=true;close();});
for(const k of ['colour','radius','hardness','opacity','pressure','brush'])input(k).addEventListener('input',cancel);
input('done').addEventListener('click',()=>{close();say('UV Paint closed · strokes kept · Save .boxlab to keep paint');});
for(const k of ['undo','redo'])input(k).addEventListener('click',()=>{close();document.querySelector('#'+k+'Btn')?.click();});
const button=document.createElement('button');button.id='viewportPaintBtn';button.type='button';button.textContent='Paint selected object';button.addEventListener('click',open);menu?.insertBefore(button,menu.querySelector('.drawer-subtitle'));
globalThis.__boxlabViewportPaint={open,close,cancel:close,get active(){return !!controller?.active;}};
