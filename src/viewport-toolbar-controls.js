import {installSelectionInputControls} from './selection-input-controls.js?v=0.36.18.1195';
import {gizmoIcons} from './gizmo-corner-controls.js?v=0.36.18.1023';
const svg=paths=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+paths+'</svg>';
export function installViewportToolbarControls(doc=document){
 const wrap=doc.querySelector('#viewportWrap'),modes=doc.querySelector('#selectionModes');
 if(!wrap||!modes)return;
 const actionBox=doc.createElement('div');actionBox.id='viewportActionControls';actionBox.setAttribute('aria-label','Lasso, selection, paint and face selection options');
 const paths={geo:'<circle cx="3" cy="12" r="1.7" fill="currentColor" stroke="none"/><path d="m8 15 5-6"/><path d="M17 8h6v8h-6Z" fill="currentColor" fill-opacity=".22"/>',lasso:'<path stroke-dasharray="2 2" d="M17 17c5-2 5-10-1-12S3 5 3 11s7 10 12 7"/><path d="M16 15c-3 0-5 3-3 5s6 1 5-2l-4-2"/>'};
 const geo=doc.querySelector('#inferenceSnapToggle'),geoControl=geo?.closest('label');
 if(geoControl){
  geoControl.id='viewportGeoSnap';
  geoControl.title='Geo Snap — vertices, edges and faces';
  geo.setAttribute('aria-label','Geo Snap');
  geoControl.querySelector('span').innerHTML=svg(paths.geo)+'<span class="toolbar-label">GEO SNAP</span>';
 }
 const depth=doc.querySelector('#paintSelectDepth');
 if(depth){depth.hidden=true;depth.setAttribute('aria-hidden','true');}
 // Keep each compact rail as a direct viewport child. A viewport-sized wrapper
 // can create a competing compositing layer over the canvas and mode dock.
 wrap.append(actionBox);
 installSelectionInputControls(doc,actionBox,globalThis);
 if(geoControl)actionBox.append(geoControl);
 const oldSnap=doc.querySelector('.quick-snap');if(oldSnap&&!oldSnap.querySelector('input'))oldSnap.remove();
 function decorate(){
  for(const [id,action,title] of [['undoBtn','undo','Undo'],['redoBtn','redo','Redo'],['frameAllBtn','frame','Frame all'],['focusViewBtn','focus','Focus view'],['objectBrowserBtn','objects','Object Browser']]){
   const b=doc.querySelector('#'+id);if(!b||b.dataset.iconAction)continue;b.dataset.iconAction=action;b.innerHTML=svg(gizmoIcons[action]);b.title=title;b.setAttribute('aria-label',title);
  }
  const top=doc.querySelector('.top-actions');
  if(top){const order=['frameAllBtn','undoBtn','redoBtn','focusViewBtn','objectBrowserBtn','floorToggleBtn','viewModes'];let position=0;for(const id of order){const b=doc.querySelector('#'+id);if(!b||b.parentElement?.id==='logoViewcube')continue;if(top.children[position]!==b)top.insertBefore(b,top.children[position]||null);b.style.order=String(position++);}}
  const lasso=doc.querySelector('#lassoSelectBtn');if(lasso&&lasso.parentElement!==actionBox){lasso.innerHTML=svg(paths.lasso)+'<span class="toolbar-label">LASSO</span>';lasso.title='LASSO — Pencil/mouse draws, finger navigates';lasso.setAttribute('aria-label','Lasso selection');actionBox.append(lasso);}
 }
 decorate();const observer=new MutationObserver(decorate);observer.observe(doc.body,{childList:true,subtree:true});
 const style=doc.createElement('style');style.textContent=`
.top-actions>button[data-icon-action]{width:40px;min-width:40px;padding:7px!important;display:grid;place-items:center}
.top-actions>button[data-icon-action] svg,#viewportActionControls svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
#viewportWrap{--viewport-action-bottom:calc(max(27px,env(safe-area-inset-bottom) + 23px) + 52px + 8px)}
#viewportActionControls{position:absolute;z-index:120;left:max(16px,env(safe-area-inset-left));box-sizing:border-box;width:58px;display:flex;flex-direction:column;align-items:stretch;gap:4px;padding:4px;border:1px solid rgba(255,255,255,.14);border-radius:11px;background:rgba(18,21,27,.94)}
#viewportActionControls{bottom:var(--viewport-action-bottom)}
html.boxlab-focus-view #viewportActionControls{left:max(8px,env(safe-area-inset-left))}
#paintSelectDepth{display:none!important}
#viewportActionControls label{position:relative;display:flex;align-items:center;justify-content:center;width:48px;height:46px;flex-shrink:0;flex-direction:column;gap:1px;cursor:pointer;border-radius:8px}
#viewportActionControls input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}
#viewportActionControls label:has(input:checked),#viewportActionControls button.active{background:rgba(130,170,235,.28)}
#viewportActionControls label:has(input:focus-visible){outline:2px solid #a9ccff}
#viewportActionControls label:has(input:disabled){opacity:.4;cursor:default}
#viewportActionControls button{flex-shrink:0;width:48px;height:46px;padding:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px}
#viewportActionControls .toolbar-label{font-size:8px;line-height:1;letter-spacing:.02em}
#viewportActionControls #viewportSelectionBtn{width:48px;min-width:48px;font-size:8px;letter-spacing:.02em}
#viewportActionControls #viewportPaintBtn{width:48px;min-width:48px;font-size:8px;padding:3px}
#viewportActionControls #lassoSelectBtn{order:1}
#viewportActionControls #viewportSelectionBtn{order:0}
#viewportActionControls #viewportPaintBtn{order:5}
#viewportActionControls #viewportGeoSnap{order:4}
#viewportGeoSnap>span{display:grid;justify-items:center;gap:1px}
#viewportActionControls #frontSelectBtn{order:3}
#viewportActionControls #dragSelectBtn{order:2}
#viewportActionControls #frontSelectBtn[aria-pressed=true],#viewportActionControls #dragSelectBtn[aria-pressed=true]{background:#225b91;color:#f3f7ff;border-color:#86bfff}
#viewportActionControls #viewportPaintBtn[aria-pressed=true]{background:#1268b6;border-color:#60b5ff}
#viewportWrap>.floating-panel.left-panel{bottom:132px!important}
@media(max-width:900px){#viewportWrap{--viewport-action-bottom:calc(max(25px,env(safe-area-inset-bottom) + 21px) + 50px + 8px)}#viewportActionControls{left:max(8px,env(safe-area-inset-left))}#viewportActionControls{bottom:var(--viewport-action-bottom)}}
@media(max-height:520px){#viewportActionControls{max-height:calc(100% - var(--viewport-action-bottom) - 8px);overflow-y:auto;overscroll-behavior:contain}}
`;doc.head.append(style);
}
