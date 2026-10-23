import {createUVImagePreview} from './uv-image-preview.js?v=0.36.18.892';
import {drawImportedUV,pickImportedUVIsland,importedUVScreenDelta,importedUVIslandCentre} from './imported-uv-inspection.js?v=0.36.18.951';
import {createUVNavigation} from './uv-navigation.js?v=0.36.18.868';
// Workspace preview/navigation. Existing Mesh Health owns context, edit actions,
// native history and session completion. Original canvas/controls are moved here.
export function createUVWorkspace({canvas,note,controls,onDone,onHistory,onTransform=()=>false,canEdit=()=>true,getTransformContext=()=>null}){
 const parent=document.querySelector('#viewportWrap');if(!parent)return null;
 const style=document.createElement('style');style.textContent=`
 /* Keep the UV canvas out of the WebGL viewport's compositing subtree.
    Preserve .924's header-above-viewport ordering only while UV is visible. */
 #app:has(> #boxlabUVWorkspace:not([hidden])) > #viewportWrap,
 #viewportWrap:has(> #boxlabUVWorkspace:not([hidden])){isolation:isolate}
 #boxlabUVWorkspace[hidden]{display:none!important}
 #boxlabUVWorkspace{position:fixed;top:calc(var(--boxlab-topbar-h,max(60px,calc(48px + env(safe-area-inset-top)))) + 8px);left:8px;right:8px;bottom:max(8px,env(safe-area-inset-bottom));z-index:9;isolation:isolate;overflow:auto;overscroll-behavior:contain;display:flex;flex-direction:column;gap:8px;padding:10px;box-sizing:border-box;min-width:0;min-height:0;border:1px solid #536073;border-radius:12px;background:#151c27;color:#edf3fa;box-shadow:0 12px 36px #0009;font-size:12px;touch-action:pan-y}
 #boxlabUVWorkspace > :not(.uv-canvas-wrap){flex-shrink:0}
 #boxlabUVWorkspace [data-uv="done"]{margin-right:auto;flex-shrink:0}
 #boxlabUVWorkspace .uv-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
 #boxlabUVWorkspace button[aria-pressed="true"]{background:#335d80;border-color:#72bfff;color:#fff}
 #boxlabUVWorkspace .uv-title{font-size:14px;flex:0 0 auto;font-weight:700;min-width:100px}
 #boxlabUVWorkspace button{min-height:36px;font-size:12px;padding:5px 10px;margin:0}
 #boxlabUVWorkspace .uv-canvas-wrap{flex:1 0 120px;min-height:120px;isolation:isolate;contain:paint;min-width:0;position:relative;background:#101722;border:1px solid #334256;border-radius:6px;overflow:hidden}
 #boxlabUVWorkspace canvas{position:absolute;inset:0;width:100%!important;height:100%!important;max-width:none!important;margin:0!important;touch-action:none;display:block}
 #boxlabUVWorkspace canvas[hidden]{display:none!important}
 #boxlabUVWorkspace select{max-width:170px;min-height:36px;font-size:12px;background:#202c3d;color:inherit;border:1px solid #536073;border-radius:4px}
 #boxlabUVWorkspace .uv-image-status{font-size:11px}
 #boxlabUVWorkspace .uv-numeric{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
 #boxlabUVWorkspace .uv-numeric label{display:flex;align-items:center;gap:4px}
 #boxlabUVWorkspace .uv-numeric input{width:78px;min-height:36px;box-sizing:border-box;font-size:16px;padding:4px;touch-action:auto}
 #boxlabUVWorkspace .uv-footer{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
 #boxlabUVWorkspace .uv-footer>.outliner-actions{width:min(390px,100%);margin:0}
 #boxlabUVWorkspace #meshHealthUVNote{flex:1;min-width:180px}
 `;document.head.appendChild(style);
 const root=document.createElement('section');root.id='boxlabUVWorkspace';root.hidden=true;root.setAttribute('aria-label','UV Editor');
 root.innerHTML=`<div class="uv-top"><strong class="uv-title">UV Editor</strong><button data-uv="done" type="button">Back to 3D</button><button data-uv="undo" type="button">Undo</button><button data-uv="redo" type="button">Redo</button><button data-uv="out" type="button" aria-label="Zoom out">−</button><button data-uv="in" type="button" aria-label="Zoom in">+</button><button data-uv="fit" type="button">Fit</button><button data-uv="checker" type="button" aria-pressed="false" title="Show a 16 × 16 reference grid in UV tile 0–1">Checker</button><button data-uv="image" type="button" aria-pressed="false">Image</button><select data-uv="image-source" aria-label="UV image reference"></select><span class="uv-image-status" role="status"></span></div><div class="uv-summary" aria-live="polite"></div><div class="uv-top"><span class="uv-selection" aria-live="polite"></span><button data-uv="clear" type="button">Clear Selection</button><button data-uv="drag-move" type="button" aria-pressed="true">Move</button><button data-uv="drag-scale" type="button" aria-pressed="false">Scale</button><button data-uv="drag-rotate" type="button" aria-pressed="false">Rotate</button><button data-uv="fit-tile" type="button" title="Centre and uniformly scale the selected island inside tile 0–1 with a 2% margin">Fit to tile</button><button data-uv="pack" type="button" title="Pack every UV island into tile 0–1 with gaps; texture images stay fixed">Pack all</button><button data-uv="density" type="button" title="Equalize average UV area per Base surface area across all islands; centres and images stay fixed. Islands may overlap: use Pack all afterward.">Equalize density</button><span class="uv-drag-status" role="status"></span></div><div class="uv-canvas-wrap"></div><details><summary>Exact Move / Scale</summary><div class="uv-numeric"><span>Selected island</span><label>ΔU <input data-uv="move-u" aria-label="UV U offset" type="number" step="any" value="0"></label><label>ΔV <input data-uv="move-v" aria-label="UV V offset" type="number" step="any" value="0"></label><button data-uv="move" type="button">Move</button><label>Scale × <input data-uv="scale-factor" aria-label="UV scale factor" type="number" step="any" value="1"></label><button data-uv="scale" type="button">Scale</button><span class="uv-input-status" role="status"></span></div></details><div class="uv-footer"></div><div>Tap to select · <span class="uv-drag-hint">Pencil-drag selected island to move</span> · finger / background drag to pan · pinch to zoom · two-finger tap Undo · three-finger tap Redo</div>`;
 // Keep the existing nodes/listeners; only their workspace layer moves.
 (parent.parentElement||parent).appendChild(root);
 const area=root.querySelector('.uv-canvas-wrap'),summary=root.querySelector('.uv-summary'),footer=root.querySelector('.uv-footer');
 area.appendChild(canvas);footer.append(controls,note);
 let active=false,report=null,observer=null,ratio=1,penId=null,selectedIsland=null,stroke=null,projectionBounds=null,dragTool='move',checker=false,layoutFrame=null;
 const moveU=root.querySelector('[data-uv="move-u"]'),moveV=root.querySelector('[data-uv="move-v"]'),factor=root.querySelector('[data-uv="scale-factor"]'),moveButton=root.querySelector('[data-uv="move"]'),scaleButton=root.querySelector('[data-uv="scale"]'),inputStatus=root.querySelector('.uv-input-status');
 const dragMove=root.querySelector('[data-uv="drag-move"]'),dragScale=root.querySelector('[data-uv="drag-scale"]'),dragRotate=root.querySelector('[data-uv="drag-rotate"]'),dragStatus=root.querySelector('.uv-drag-status'),dragHint=root.querySelector('.uv-drag-hint');
 const checkerButton=root.querySelector('[data-uv="checker"]');
 checkerButton.addEventListener('click',()=>{if(!active)return;cancel();checker=!checker;checkerButton.setAttribute('aria-pressed',String(checker));draw();});
 const imageButton=root.querySelector('[data-uv="image"]'),imageSource=root.querySelector('[data-uv="image-source"]'),imageStatus=root.querySelector('.uv-image-status');
 let imageChoices=null;
 const imagePreview=createUVImagePreview({slots:['color','normal','emissive','roughness','metalness'],changed:()=>{syncImageControls();draw();}});
 function syncImageControls(){
  const state=imagePreview.view;imageButton.disabled=!state.choices.length;imageButton.setAttribute('aria-pressed',String(state.enabled));imageSource.disabled=!state.enabled||state.choices.length<2;imageSource.hidden=state.choices.length<2;imageStatus.textContent=state.status;
  if(imageChoices!==state.choices){imageChoices=state.choices;imageSource.innerHTML='';for(let i=0;i<state.choices.length;i++){const option=document.createElement('option');option.value=String(i);option.textContent=state.choices[i].label;imageSource.appendChild(option);}}
  imageSource.value=String(state.index);
 }
 imageButton.addEventListener('click',()=>{if(!active)return;cancel();imagePreview.enable(!imagePreview.view.enabled);});
 imageSource.addEventListener('change',()=>{if(!active)return;cancel();imagePreview.choose(Number(imageSource.value));});
 const fitTile=root.querySelector('[data-uv="fit-tile"]'),packAll=root.querySelector('[data-uv="pack"]'),equalDensity=root.querySelector('[data-uv="density"]');
 const selection=root.querySelector('.uv-selection'),clear=root.querySelector('[data-uv="clear"]');
 function showSelection(){equalDensity.disabled=packAll.disabled=!canEdit()||report?.state!=='ready'||!(report.islandCount>=1&&report.islandCount<=128);selection.textContent=selectedIsland===null?'No island selected · Rotate / Flip affect whole layout':`Island ${selectedIsland+1} of ${report.islandCount} selected · Rotate / Flip affect this island`;clear.disabled=selectedIsland===null;for(const control of [moveU,moveV,factor,moveButton,scaleButton,dragMove,dragScale,dragRotate,fitTile])control.disabled=selectedIsland===null||!canEdit();}
 function setDragTool(kind){cancel();dragTool=kind;dragMove.setAttribute('aria-pressed',String(kind==='move'));dragScale.setAttribute('aria-pressed',String(kind==='scale'));dragRotate.setAttribute('aria-pressed',String(kind==='rotate'));dragHint.textContent=kind==='rotate'?'Pencil-drag right = counterclockwise · left = clockwise':kind==='scale'?'Pencil-drag up to enlarge · down to shrink':'Pencil-drag selected island to move';draw();}
 dragMove.addEventListener('click',()=>setDragTool('move'));dragScale.addEventListener('click',()=>setDragTool('scale'));dragRotate.addEventListener('click',()=>setDragTool('rotate'));
 packAll.addEventListener('click',()=>{if(!active||packAll.disabled)return;const expected=getTransformContext();cancel();if(onTransform('pack',undefined,undefined,expected)){projectionBounds=report.bounds;nav.fit();}draw();});
 equalDensity.addEventListener('click',()=>{if(!active||equalDensity.disabled)return;const expected=getTransformContext();cancel();if(onTransform('density',undefined,undefined,expected)){projectionBounds=report.bounds;nav.fit();}draw();});
 fitTile.addEventListener('click',()=>{if(!active||selectedIsland===null||!canEdit())return;const expected=getTransformContext();cancel();onTransform('fit',undefined,undefined,expected);draw();});
 function select(value){cancel();selectedIsland=value;showSelection();draw();}
 function numeric(kind){
  if(!active||selectedIsland===null||!canEdit())return;
  cancel();
  const values=kind==='move'?[moveU.value,moveV.value]:[factor.value];
  const numbers=values.map(v=>String(v??'').trim()===''?NaN:Number(v));
  if(numbers.some(v=>!Number.isFinite(v))||kind==='scale'&&numbers[0]<=0){inputStatus.textContent=kind==='move'?'Enter finite U / V offsets.':'Enter a positive scale factor.';return;}
  inputStatus.textContent='';onTransform(kind,...numbers);
 }
 moveButton.addEventListener('click',()=>numeric('move'));scaleButton.addEventListener('click',()=>numeric('scale'));
 clear.addEventListener('click',()=>select(null));const captures=new Set();
 const size=()=>{const r=canvas.getBoundingClientRect();return {width:Math.max(1,r.width),height:Math.max(1,r.height)};};
 const displayReport=()=>projectionBounds?{...report,bounds:projectionBounds}:report;
 const projectionOptions=()=>({center:true,padding:24,view:nav.view});
 const pick=point=>pickImportedUVIsland(size().width,size().height,displayReport(),point,projectionOptions());
 function draw(){if(!active||!report)return;dragStatus.textContent=stroke?.moved&&stroke.kind==='rotate'?`Rotate ${stroke.degrees.toFixed(1)}°`:stroke?.moved&&stroke.kind==='scale'?`Scale ×${stroke.factor.toFixed(2)}`:'';drawImportedUV(canvas,displayReport(),{center:true,padding:24*ratio,pixelRatio:ratio,checker,image:imagePreview.view.image,selectedIsland,previewOffset:stroke?.moved&&stroke.kind==='move'?stroke.delta:null,previewRotation:stroke?.moved&&stroke.kind==='rotate'?{centre:stroke.centre,degrees:stroke.degrees}:null,previewScale:stroke?.moved&&stroke.kind==='scale'?{centre:stroke.centre,factor:stroke.factor}:null,view:{zoom:nav.view.zoom,panX:nav.view.panX*ratio,panY:nav.view.panY*ratio}});}
 function history(action){if(!active)return;cancel();draw();onHistory(action);}
 const nav=createUVNavigation({size,changed:draw,undo:()=>history('undo'),redo:()=>history('redo'),tap:point=>select(pick(point))});
 function resize(){if(!active)return;cancel();const s=size();ratio=Math.min(2,globalThis.devicePixelRatio||1,4096/s.width,4096/s.height);const w=Math.max(1,Math.round(s.width*ratio)),h=Math.max(1,Math.round(s.height*ratio));if(canvas.width!==w)canvas.width=w;if(canvas.height!==h)canvas.height=h;draw();}
 // Measure once more after the launch owner hides its source panel. Safari can
 // publish the visible layout one frame after hidden/stacking changes.
 function settleLayout(){
  if(typeof window.requestAnimationFrame!=='function')return;
  if(layoutFrame!==null)window.cancelAnimationFrame(layoutFrame);
  layoutFrame=window.requestAnimationFrame(()=>{layoutFrame=null;resize();});
 }
 const local=e=>{const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
 const consume=e=>{e.stopPropagation();if(e.cancelable)e.preventDefault();};
 // Extend the canvas's existing pointer owner. A Pencil stroke previews only;
 // the original transform transaction is called once on release, never per frame.
 canvas.addEventListener('pointerdown',e=>{
  if(!active||e.button>0)return;consume(e);
  if(e.pointerType==='touch'&&penId!==null)return;
  const p=local(e);
  if(e.pointerType==='pen'){
   cancel();penId=e.pointerId;
   if(selectedIsland!==null&&canEdit()&&pick(p)===selectedIsland){
    const context=getTransformContext(),faces=dragTool!=='move'?report.faceIslands.flatMap((id,fi)=>id===selectedIsland?[fi]:[]):null;
    const centre=faces?importedUVIslandCentre(context?.payload?.uvCorners,faces):null;
    if(dragTool==='move'||centre)stroke={id:e.pointerId,start:p,report,island:selectedIsland,kind:dragTool,context,centre,factor:1,degrees:0,delta:{u:0,v:0},moved:false};
   }
  }
  if(!stroke)nav.down(e.pointerId,p.x,p.y,e.pointerType);
  try{canvas.setPointerCapture(e.pointerId);captures.add(e.pointerId);}catch{}
 });
 function preview(e){
  if(!stroke||stroke.id!==e.pointerId)return false;
  if(stroke.report!==report||stroke.island!==selectedIsland||!canEdit()){cancel();draw();return true;}
  const p=local(e);if(!Number.isFinite(p.x)||!Number.isFinite(p.y))return true;
  const dx=p.x-stroke.start.x,dy=p.y-stroke.start.y;
  stroke.moved||=(stroke.kind==='scale'?Math.abs(dy):stroke.kind==='rotate'?Math.abs(dx):Math.hypot(dx,dy))>4;
  if(stroke.kind==='rotate'){stroke.degrees=dx*.75;draw();return true;}
  if(stroke.kind==='scale'){stroke.factor=Math.max(.01,Math.min(100,2**(-dy/120)));draw();return true;}
  const delta=importedUVScreenDelta(size().width,size().height,displayReport(),dx,dy,projectionOptions());
  if(delta)stroke.delta=delta;else{cancel();draw();return true;}
  draw();return true;
 }
 canvas.addEventListener('pointermove',e=>{if(!active)return;consume(e);if(preview(e))return;const p=local(e);nav.move(e.pointerId,p.x,p.y);});
 canvas.addEventListener('pointerup',e=>{
  if(!active)return;consume(e);
  if(stroke?.id===e.pointerId){
   preview(e);const done=stroke;stroke=null;
   if(done?.moved&&done.report===report&&done.island===selectedIsland&&canEdit()){
    if(done.kind==='rotate')onTransform('rotate',done.degrees,undefined,done.context);else if(done.kind==='scale')onTransform('scale',done.factor,undefined,done.context);else onTransform('move',done.delta.u,done.delta.v,done.context);
   }
   draw();
  }else nav.up(e.pointerId);
  captures.delete(e.pointerId);if(penId===e.pointerId)penId=null;
  try{if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);}catch{}
 });
 function cancel(){stroke=null;nav.cancel();penId=null;const ids=[...captures];captures.clear();for(const id of ids)try{if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);}catch{}}
 canvas.addEventListener('pointercancel',()=>{cancel();draw();});canvas.addEventListener('lostpointercapture',e=>{if(captures.has(e.pointerId)){cancel();draw();}});
 canvas.addEventListener('wheel',e=>{if(!active)return;consume(e);cancel();nav.zoomAt(local(e),Math.exp(Math.max(-2,Math.min(2,-e.deltaY*.0015))));},{passive:false});
 for(const type of ['pointerdown','pointermove','pointerup','pointercancel','click','dblclick'])root.addEventListener(type,e=>e.stopPropagation());
 for(const type of ['touchstart','touchmove','touchend','touchcancel'])root.addEventListener(type,e=>e.stopPropagation(),{passive:true});
 for(const [action,fn] of Object.entries({undo:()=>history('undo'),redo:()=>history('redo'),fit:()=>{cancel();projectionBounds=report?.bounds;nav.fit();},in:()=>{cancel();nav.zoomAt({x:size().width/2,y:size().height/2},1.25);},out:()=>{cancel();nav.zoomAt({x:size().width/2,y:size().height/2},.8);},done:()=>onDone()}))root.querySelector(`[data-uv="${action}"]`).addEventListener('click',fn);
 function key(e){if(!active)return;if(e.target?.closest?.('input,textarea,select,[contenteditable="true"]'))return;if(['Delete','Backspace'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();}else if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();onDone();}else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.stopImmediatePropagation();history(e.shiftKey?'redo':'undo');}}
 const api={get active(){return active;},setReport(value,text){cancel();report=value;imagePreview.setPayload(active&&value?.state==='ready'?getTransformContext()?.payload:null);if(!active)projectionBounds=value?.bounds;selectedIsland=null;showSelection();summary.textContent=text;draw();},get selectedIsland(){return selectedIsland;},retainSelection(faces){
  if(!Array.isArray(faces)||!faces.length||report?.state!=='ready'||!report.faceIslands)return;
  const id=report.faceIslands[faces[0]],current=report.faceIslands.flatMap((v,fi)=>v===id?[fi]:[]);
  if(Number.isInteger(id)&&current.length===faces.length&&current.every((fi,i)=>fi===faces[i]))select(id);
 },open(){if(report?.state!=='ready')return false;active=true;imagePreview.enable(false);imagePreview.setPayload(getTransformContext()?.payload);checker=false;checkerButton.setAttribute('aria-pressed','false');setDragTool('move');projectionBounds=report.bounds;moveU.value=moveV.value='0';factor.value='1';inputStatus.textContent='';root.hidden=false;nav.fit();resize();settleLayout();if(typeof ResizeObserver!=='undefined'){observer??=new ResizeObserver(resize);observer.observe(area);}window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);window.addEventListener('keydown',key,true);return true;},close(){active=false;if(layoutFrame!==null){window.cancelAnimationFrame(layoutFrame);layoutFrame=null;}imagePreview.close();selectedIsland=null;showSelection();root.hidden=true;cancel();observer?.disconnect();window.removeEventListener('resize',resize);window.visualViewport?.removeEventListener('resize',resize);window.removeEventListener('keydown',key,true);},get view(){return {...nav.view};}};
 globalThis.__boxlabUVWorkspace=api;return api;
}
