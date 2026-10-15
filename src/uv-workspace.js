import {drawImportedUV} from './imported-uv-inspection.js?v=0.36.18.867';
import {createUVNavigation} from './uv-navigation.js?v=0.36.18.867';
// Presentation/navigation only. Existing Mesh Health owns context, edit actions,
// native history and session completion. Original canvas/controls are moved here.
export function createUVWorkspace({canvas,note,controls,onDone,onHistory}){
 const parent=document.querySelector('#viewportWrap');if(!parent)return null;
 const style=document.createElement('style');style.textContent=`
 #boxlabUVWorkspace[hidden]{display:none!important}
 #boxlabUVWorkspace{position:absolute;inset:8px;z-index:180;display:flex;flex-direction:column;gap:8px;padding:10px;box-sizing:border-box;min-width:0;min-height:0;border:1px solid #536073;border-radius:12px;background:#151c27;color:#edf3fa;box-shadow:0 12px 36px #0009;font-size:12px;touch-action:none}
 #boxlabUVWorkspace .uv-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
 #boxlabUVWorkspace .uv-title{font-size:14px;flex:1;font-weight:700;min-width:100px}
 #boxlabUVWorkspace button{min-height:36px;font-size:12px;padding:5px 10px;margin:0}
 #boxlabUVWorkspace .uv-canvas-wrap{flex:1;min-height:0;min-width:0;position:relative;background:#101722;border:1px solid #334256;border-radius:6px;overflow:hidden}
 #boxlabUVWorkspace canvas{position:absolute;inset:0;width:100%!important;height:100%!important;max-width:none!important;margin:0!important;touch-action:none;display:block}
 #boxlabUVWorkspace canvas[hidden]{display:none!important}
 #boxlabUVWorkspace .uv-footer{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
 #boxlabUVWorkspace .uv-footer>.outliner-actions{width:min(390px,100%);margin:0}
 #boxlabUVWorkspace #meshHealthUVNote{flex:1;min-width:180px}
 `;document.head.appendChild(style);
 const root=document.createElement('section');root.id='boxlabUVWorkspace';root.hidden=true;root.setAttribute('aria-label','UV Editor');
 root.innerHTML=`<div class="uv-top"><strong class="uv-title">UV Editor</strong><button data-uv="undo" type="button">Undo</button><button data-uv="redo" type="button">Redo</button><button data-uv="out" type="button" aria-label="Zoom out">−</button><button data-uv="in" type="button" aria-label="Zoom in">+</button><button data-uv="fit" type="button">Fit</button><button data-uv="done" type="button">Back to 3D</button></div><div class="uv-summary" aria-live="polite"></div><div class="uv-canvas-wrap"></div><div class="uv-footer"></div><div>Drag to pan · pinch to zoom · two-finger tap Undo · three-finger tap Redo</div>`;
 parent.appendChild(root);
 const area=root.querySelector('.uv-canvas-wrap'),summary=root.querySelector('.uv-summary'),footer=root.querySelector('.uv-footer');
 area.appendChild(canvas);footer.append(controls,note);
 let active=false,report=null,observer=null,ratio=1,penId=null;const captures=new Set();
 const size=()=>{const r=canvas.getBoundingClientRect();return {width:Math.max(1,r.width),height:Math.max(1,r.height)};};
 function draw(){if(!active||!report)return;drawImportedUV(canvas,report,{center:true,padding:24*ratio,pixelRatio:ratio,view:{zoom:nav.view.zoom,panX:nav.view.panX*ratio,panY:nav.view.panY*ratio}});}
 function history(action){if(!active)return;nav.cancel();onHistory(action);}
 const nav=createUVNavigation({size,changed:draw,undo:()=>history('undo'),redo:()=>history('redo')});
 function resize(){if(!active)return;const s=size();ratio=Math.min(2,globalThis.devicePixelRatio||1,4096/s.width,4096/s.height);const w=Math.max(1,Math.round(s.width*ratio)),h=Math.max(1,Math.round(s.height*ratio));if(canvas.width!==w)canvas.width=w;if(canvas.height!==h)canvas.height=h;draw();}
 const local=e=>{const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
 const consume=e=>{e.stopPropagation();if(e.cancelable)e.preventDefault();};
 canvas.addEventListener('pointerdown',e=>{if(!active||e.button>0)return;consume(e);if(e.pointerType==='touch'&&penId!==null)return;if(e.pointerType==='pen'){cancel();penId=e.pointerId;}const p=local(e);nav.down(e.pointerId,p.x,p.y,e.pointerType);try{canvas.setPointerCapture(e.pointerId);captures.add(e.pointerId);}catch{}});
 canvas.addEventListener('pointermove',e=>{if(!active)return;consume(e);const p=local(e);nav.move(e.pointerId,p.x,p.y);});
 canvas.addEventListener('pointerup',e=>{if(!active)return;consume(e);nav.up(e.pointerId);captures.delete(e.pointerId);if(penId===e.pointerId)penId=null;try{if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);}catch{}});
 const cancel=()=>{nav.cancel();penId=null;const ids=[...captures];captures.clear();for(const id of ids)try{if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);}catch{}};
 canvas.addEventListener('pointercancel',cancel);canvas.addEventListener('lostpointercapture',e=>{if(captures.has(e.pointerId))cancel();});
 canvas.addEventListener('wheel',e=>{if(!active)return;consume(e);nav.zoomAt(local(e),Math.exp(Math.max(-2,Math.min(2,-e.deltaY*.0015))));},{passive:false});
 for(const type of ['pointerdown','pointermove','pointerup','pointercancel','click','dblclick'])root.addEventListener(type,e=>e.stopPropagation());
 for(const type of ['touchstart','touchmove','touchend','touchcancel'])root.addEventListener(type,e=>e.stopPropagation(),{passive:true});
 for(const [action,fn] of Object.entries({undo:()=>history('undo'),redo:()=>history('redo'),fit:()=>nav.fit(),in:()=>nav.zoomAt({x:size().width/2,y:size().height/2},1.25),out:()=>nav.zoomAt({x:size().width/2,y:size().height/2},.8),done:()=>onDone()}))root.querySelector(`[data-uv="${action}"]`).addEventListener('click',fn);
 function key(e){if(!active)return;if(['Delete','Backspace'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();}else if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();onDone();}else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.stopImmediatePropagation();history(e.shiftKey?'redo':'undo');}}
 const api={get active(){return active;},setReport(value,text){report=value;summary.textContent=text;draw();},open(){if(report?.state!=='ready')return false;active=true;root.hidden=false;nav.fit();resize();if(typeof ResizeObserver!=='undefined'){observer??=new ResizeObserver(resize);observer.observe(area);}window.addEventListener('resize',resize);window.addEventListener('keydown',key,true);return true;},close(){active=false;root.hidden=true;cancel();observer?.disconnect();window.removeEventListener('resize',resize);window.removeEventListener('keydown',key,true);},get view(){return {...nav.view};}};
 globalThis.__boxlabUVWorkspace=api;return api;
}
