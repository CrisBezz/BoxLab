import {createViewportPainter} from './viewport-paint-core.js?v=0.36.18.911';
import {brushSettings} from '../evaluations/uv-paint/paint-core.js?v=905';
import {PAINT_BLEND_MODES} from './paint-blend-modes.js?v=0.36.18.903';
import {importPaintImage} from './paint-image-source.js?v=0.36.18.907';
import {cyclePaintImageMode} from './paint-image-placement.js?v=0.36.18.907';
import {createPaintImageOverlay} from './paint-image-overlay.js?v=0.36.18.911';
const canvas=document.querySelector('#viewport'),menu=document.querySelector('#fileMenu .top-file-content'),status=document.querySelector('#selectionStatus');
const manager=()=>globalThis.__boxlabObjectManager,bridge=()=>globalThis.__boxlabBridgeState,tools=()=>globalThis.__boxlabToolSession;
const target=()=>{const m=manager();return m?.objects?.find(o=>o.id===m.activeId);};
let contact=null,opening=0,controller=null,disposed=false,lastPressure=1;const touches=new Set(),palms=new Set();
let imageStage=null,imageGesture=null,imageRequest=0;
const panel=document.createElement('section');panel.id='boxlabViewportPaint';panel.hidden=true;
panel.innerHTML='<strong>UV Paint · 512² colour</strong><div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><label>Colour <input data-paint="colour" type="color" value="#e34b37"></label><label>Brush <select data-paint="brush"><option value="boxlab">BoxLab round</option><option value="klecks">Klecks curve</option></select></label><label>Size <input data-paint="radius" type="range" min="1" max="48" value="10"></label><label>Hardness <input data-paint="hardness" type="range" min="0" max="1" step=".01" value=".7"></label><label>Opacity <input data-paint="opacity" type="range" min="0" max="1" step=".01" value="1"></label><label><input data-paint="pressure" type="checkbox" checked>Pressure → size</label></div><details open><summary>Layers · base + up to 3 overlays</summary><div class="paint-layer-controls"><label>Layer <select data-paint="layer"></select></label><button data-paint="add-layer" type="button">+ Layer</button><button data-paint="choose-image" type="button">+ Image</button><input data-paint="image-file" type="file" accept="image/png,image/jpeg,.png,.jpg,.jpeg" hidden><button data-paint="edit-image" type="button">Edit image</button><button data-paint="layer-up" type="button">Up</button><button data-paint="layer-down" type="button">Down</button><button data-paint="remove-layer" type="button">Delete layer</button><label>Name <input data-paint="layer-name" type="text" maxlength="64"></label><label><input data-paint="layer-visible" type="checkbox">Visible</label><label>Layer opacity <input data-paint="layer-opacity" type="range" min="0" max="1" step=".01" value="1"></label><label>Blend <select data-paint="layer-blend"></select></label></div><div class="paint-layer-controls"><label>Paint <select data-paint="paint-target"><option value="colour">Colour</option><option value="mask">Mask</option></select></label><button data-paint="add-mask" type="button">+ Mask</button><button data-paint="remove-mask" type="button">Remove mask</button><label><input data-paint="mask-enabled" type="checkbox">Mask enabled</label><label><input data-paint="mask-inverted" type="checkbox">Invert mask</label><button data-paint="mask-hide" type="button">Hide brush</button><button data-paint="mask-reveal" type="button">Reveal brush</button><button data-paint="mask-grey" type="button">Grey brush</button><label>Mask value <input data-paint="mask-value" type="range" min="0" max="255" step="1" value="0"></label></div></details><div data-paint="image-controls" hidden><button data-paint="image-mode" type="button">Move · tap to cycle</button><button data-paint="project-image" type="button">Project from View</button><button data-paint="cancel-image" type="button">Cancel image</button><span>65% guide · Project uses full image opacity · fronts within 75°</span></div><div>Pencil paints · fingers navigate · seams may bleed · .boxlab saves paint</div><div class="outliner-actions"><button data-paint="undo" type="button">Undo</button><button data-paint="redo" type="button">Redo</button><button data-paint="done" type="button">Done</button></div>';
const style=document.createElement('style');style.textContent='#boxlabViewportPaint{font-size:12px;display:grid;gap:6px}#boxlabViewportPaint[hidden]{display:none!important}#boxlabViewportPaint input[type=range]{width:72px}#boxlabViewportPaint input[type=color]{width:38px;padding:2px}#boxlabViewportPaint label{display:inline-flex;gap:4px;align-items:center}#boxlabViewportPaint .paint-layer-controls{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding-top:5px}#boxlabViewportPaint [data-paint=layer-name]{width:100px}#boxlabViewportPaint select{max-width:150px}';document.head.appendChild(style);document.body.appendChild(panel);
const input=k=>panel.querySelector(`[data-paint="${k}"]`),say=s=>{if(status)status.textContent=s;};
function options(select,items){const nodes=items.map(({value,label})=>{const o=document.createElement('option');o.value=value;o.textContent=label;return o;});select.replaceChildren?.(...nodes);}
input('mask-value').value='0';
options(input('layer-blend'),PAINT_BLEND_MODES.map(value=>({value,label:value.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join(' ')})));
function syncLayers(){const state=controller?.state;if(!state)return;options(input('layer'),[...state.layers].reverse().map(l=>({value:l.id,label:l.name+(l.image?' · image':'')+(l.visible?'':' · hidden')})));input('layer').value=state.selected;
 const selected=state.layers.find(l=>l.id===state.selected),base=state.selected==='$base',index=state.layers.indexOf(selected);
 input('layer-name').value=selected.name;input('layer-visible').checked=selected.visible;input('layer-opacity').value=String(selected.opacity);input('layer-blend').value=selected.blendMode;
 for(const key of ['layer-name','layer-visible','layer-opacity','layer-blend','remove-layer'])input(key).disabled=base;
 const hasMask=!!selected.mask;input('paint-target').value=state.paintTarget;input('paint-target').disabled=!hasMask;input('add-mask').disabled=base||hasMask;input('remove-mask').disabled=!hasMask;input('mask-enabled').checked=hasMask&&selected.mask.enabled;input('mask-inverted').checked=hasMask&&selected.mask.inverted;for(const key of ['mask-enabled','mask-inverted','mask-hide','mask-reveal','mask-grey','mask-value'])input(key).disabled=!hasMask;input('colour').disabled=state.paintTarget==='mask'||!!selected.image;
 input('add-layer').disabled=state.layers.length>=4;input('choose-image').disabled=state.layers.length>=4;input('edit-image').disabled=!selected.image;input('layer-up').disabled=base||index===state.layers.length-1;input('layer-down').disabled=base||index<=1;
}
function layerAction(fn){clearImage();cancel();try{fn();syncLayers();say(controller?.state?.paintTarget==='mask'?'UV Paint · Pencil paints mask · Hide/Reveal brush sets coverage · Undo exits Paint':controller?.state?.layers.find(l=>l.id===controller.state.selected)?.image?'UV Paint · image retained · edit its mask or select a paint layer':'UV Paint · selected layer receives Pencil strokes · Undo exits Paint');}catch(error){syncLayers();say('UV Paint: '+error.message);}}
input('layer').addEventListener('change',()=>layerAction(()=>controller?.selectLayer(input('layer').value)));
input('add-layer').addEventListener('click',()=>layerAction(()=>controller?.addLayer()));
input('remove-layer').addEventListener('click',()=>layerAction(()=>controller?.removeLayer()));
input('layer-up').addEventListener('click',()=>layerAction(()=>controller?.moveLayer(1)));
input('layer-down').addEventListener('click',()=>layerAction(()=>controller?.moveLayer(-1)));
for(const [key,read] of [['layer-name',()=>({name:input('layer-name').value})],['layer-visible',()=>({visible:input('layer-visible').checked})],['layer-opacity',()=>({opacity:Number(input('layer-opacity').value)})],['layer-blend',()=>({blendMode:input('layer-blend').value})]])input(key).addEventListener('change',()=>layerAction(()=>controller?.editLayer(read())));

input('paint-target').addEventListener('change',()=>layerAction(()=>controller?.selectPaintTarget(input('paint-target').value)));
input('add-mask').addEventListener('click',()=>layerAction(()=>controller?.addMask()));
input('remove-mask').addEventListener('click',()=>layerAction(()=>controller?.removeMask()));
input('mask-enabled').addEventListener('change',()=>layerAction(()=>controller?.editMask({enabled:input('mask-enabled').checked})));
input('mask-inverted').addEventListener('change',()=>layerAction(()=>controller?.editMask({inverted:input('mask-inverted').checked})));
for(const [key,value] of [['mask-hide',0],['mask-reveal',255],['mask-grey',128]])input(key).addEventListener('click',()=>layerAction(()=>{const s=controller?.state,selected=s?.layers.find(l=>l.id===s.selected);input('mask-value').value=String(selected?.mask?.inverted?255-value:value);controller?.selectPaintTarget('mask');}));
input('mask-value').addEventListener('input',cancel);

function settings(){return brushSettings({colour:input('colour').value,radius:Number(input('radius').value),hardness:Number(input('hardness').value),opacity:Number(input('opacity').value),pressure:input('pressure').checked});}
function release(){if(contact!==null){try{canvas.releasePointerCapture(contact);}catch{}contact=null;}}
function stopped(){opening++;clearImage();release();for(const id of palms){try{canvas.releasePointerCapture(id);}catch{}}panel.hidden=true;tools()?.end('uv-paint');}
function close(){opening++;controller?.close();stopped();}
function makeController(){const b=bridge();if(!b?.camera||!b.scene||!b.controls)throw Error('Viewport not ready');return createViewportPainter({target,activeId:()=>manager()?.activeId,body:()=>{let found;b.scene.traverse(o=>{if(o.userData?.kind==='body')found=o;});return found;},owner:globalThis.__boxlabExportAs,camera:b.camera,controls:b.controls,scene:b.scene,checkpoint:()=>globalThis.__boxlabObjectHistory?.checkpoint?.(),objects:()=>manager()?.objects||[],onClose:stopped,refresh:body=>globalThis.__boxlabRenderModes?.apply?.(body),allowed:()=>globalThis.__boxlabSelectionBridge?.mode?.()==='object'&&tools()?.isActive?.('uv-paint')&&globalThis.__boxlabRenderModes?.paintVisible?.()!==false});}
async function open(){let instance;try{
 if(controller?.active){close();return;}if(tools()?.isActive?.())throw Error('Finish the current tool first');
 const ids=globalThis.__boxlabObjectSelection?.ids;if(ids?.size>1)throw Error('Select one object for UV Paint');if(ids?.size===1&&!ids.has(manager()?.activeId))throw Error('Activate the selected object first');
 if(globalThis.__boxlabSelectionBridge?.mode?.()!=='object')document.querySelector('#selectionModes [data-mode="object"]')?.click();
 manager()?.saveActive?.();if(!bridge()?.controls?.enabled)throw Error('Finish the current gesture first');
 if(globalThis.__boxlabRenderModes?.paintVisible?.()===false)throw Error('Switch VIEW to Studio, Solid or UV Image for painting');
 globalThis.__boxlabTransformArming?.disarm?.();instance=controller=makeController();panel.hidden=false;if(!tools()?.begin?.({id:'uv-paint',title:'UV Paint',node:panel}))throw Error('Tool session unavailable');
 globalThis.__boxlabTotalGizmo?.resetTransient?.({hideFloat:true});const token=++opening;await instance.open();if(token!==opening){instance.close();return;}syncLayers();document.querySelector('#fileMenu')?.removeAttribute('open');say('UV Paint · Pencil paints; fingers navigate · Done keeps strokes · Undo exits Paint');requestAnimationFrame(()=>frame(instance));
 }catch(e){if(instance&&instance!==controller)return;close();say('UV Paint: '+e.message);}}
function frame(instance){if(disposed||controller!==instance||!instance.active)return;instance.tick();if(imageStage)imageStage.overlay.draw(imageStage.placement);if(instance.active)requestAnimationFrame(()=>frame(instance));}
function point(e,up=false){const r=canvas.getBoundingClientRect();if(e.pointerType==='pen'&&!up)lastPressure=e.pressure;return {x:e.clientX-r.left,y:e.clientY-r.top,width:r.width,height:r.height,pressure:e.pointerType==='pen'?lastPressure:1};}
function consume(e){e.preventDefault();e.stopImmediatePropagation();}
function down(e){if(e.target!==canvas)return;imageRequest++;if(e.pointerType==='touch'){if(controller?.drawing||imageGesture){palms.add(e.pointerId);canvas.setPointerCapture(e.pointerId);consume(e);}else touches.add(e.pointerId);return;}
 if(!controller?.active||e.button!==0)return;consume(e);if(e.pointerType==='pen'&&(!e.buttons||e.pressure<=0)||touches.size||contact!==null)return;
 try{if(imageStage){imageGesture={start:point(e),placement:structuredClone(imageStage.placement),controls:bridge().controls.enabled,moved:false};bridge().controls.enabled=false;contact=e.pointerId;canvas.setPointerCapture(contact);return;}if(controller.begin(point(e),settings(),input('brush').value,Number(input('mask-value').value))){contact=e.pointerId;canvas.setPointerCapture(contact);}}catch(error){cancel();say('UV Paint: '+error.message);}}
function move(e){if(palms.has(e.pointerId)){consume(e);return;}if(contact!==e.pointerId)return;consume(e);if(e.pointerType==='pen'&&!e.buttons)return;if(imageGesture){moveImage(point(e));return;}const coalesced=e.getCoalescedEvents?.()||[];for(const p of coalesced.length?coalesced:[e]){if(p.pointerType==='pen'&&!p.buttons)continue;controller.move(point(p));}}
function up(e){touches.delete(e.pointerId);if(palms.delete(e.pointerId)){try{canvas.releasePointerCapture(e.pointerId);}catch{}consume(e);return;}if(contact!==e.pointerId)return;consume(e);try{if(imageGesture){if(e.type!=='pointercancel')moveImage(point(e,true));finishImageGesture(e.type==='pointercancel');}else if(e.type==='pointercancel')controller.cancel();else controller.finish(point(e,true));}catch(error){cancel();say('UV Paint: '+error.message);}release();}
function cancel(){imageRequest++;finishImageGesture(true);controller?.cancel();release();}

function clearImage(){imageRequest++;finishImageGesture(true);imageStage?.overlay.dispose();imageStage=null;input('image-controls').hidden=true;}
function imageHint(){if(!imageStage)return;input('image-mode').textContent=imageStage.mode[0].toUpperCase()+imageStage.mode.slice(1)+' · tap to cycle';say('Image · Pencil drags '+imageStage.mode+' · tap cycles Move / Rotate / Scale · fingers align model · Project from View commits');}
function stageImage(source,placement,{replace=false,name='Image layer'}={}){
 clearImage();cancel();const overlay=createPaintImageOverlay(canvas,source);imageStage={source,placement,overlay,replace,name,mode:'move'};input('image-controls').hidden=false;overlay.draw(placement);imageHint();
}
function moveImage(p){const g=imageGesture,s=imageStage;if(!g||!s)return;const dx=p.x-g.start.x,dy=p.y-g.start.y;if(!g.moved&&Math.hypot(dx,dy)<8)return;g.moved=true;const old=g.placement;
 if(s.mode==='move')s.placement={...old,centre:[old.centre[0]+dx/p.width*2,old.centre[1]-dy/p.height*2]};
 else if(s.mode==='rotate'){const cx=(old.centre[0]+1)*p.width/2,cy=(1-old.centre[1])*p.height/2,angle=q=>Math.atan2((cy-q.y)/p.height,(q.x-cx)/p.width);s.placement={...old,rotation:old.rotation+angle(p)-angle(g.start)};}
 else{const scale=Math.exp(dx/200);s.placement={...old,size:old.size.map(v=>Math.max(.02,Math.min(8,v*scale)))};}
 s.overlay.draw(s.placement);
}
function finishImageGesture(rollback=false){const g=imageGesture;if(!g)return;imageGesture=null;if(bridge()?.controls)bridge().controls.enabled=g.controls;if(!imageStage)return;
 if(rollback)imageStage.placement=g.placement;else if(!g.moved)imageStage.mode=cyclePaintImageMode(imageStage.mode);imageStage.overlay.draw(imageStage.placement);imageHint();
}
input('choose-image').addEventListener('click',()=>{cancel();input('image-file').value='';input('image-file').click();});
input('image-file').addEventListener('change',async()=>{cancel();const file=input('image-file').files?.[0];if(!file)return;const instance=controller,token=++imageRequest,selected=instance?.state?.selected;try{
 if(file.size>2*1024*1024)throw Error('Image exceeds the 2 MiB encoded budget');say('Image · loading PNG / JPEG…');const source=await importPaintImage(new Uint8Array(await file.arrayBuffer()));
 if(token!==imageRequest||controller!==instance||!instance?.active||instance.state.selected!==selected)return;
 const r=canvas.getBoundingClientRect(),h=.9,w=h*source.width/source.height*r.height/r.width,fit=Math.min(1,1.4/w);stageImage(source,{centre:[0,0],size:[w*fit,h*fit],rotation:0},{name:file.name.replace(/\.[^.]+$/,'')});
 }catch(error){if(token===imageRequest)say('Image: '+error.message);}});
input('edit-image').addEventListener('click',()=>{cancel();try{const image=controller?.imageForEdit();if(!image)throw Error('Select an image layer first');stageImage(image.source,image.placement,{replace:true});}catch(error){say('Image: '+error.message);}});
input('image-mode').addEventListener('click',()=>{cancel();if(imageStage){imageStage.mode=cyclePaintImageMode(imageStage.mode);imageHint();}});
input('cancel-image').addEventListener('click',()=>{cancel();clearImage();say('Image placement cancelled · existing paint kept');});
input('project-image').addEventListener('click',()=>{cancel();if(!imageStage)return;try{const s=imageStage;if(controller?.projectImage(s.source,s.placement,{replace:s.replace,name:s.name})){clearImage();syncLayers();say('Image projected · source retained · Edit image reprojects from current view · Undo exits Paint');}}catch(error){say('Image: '+error.message);}});

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
