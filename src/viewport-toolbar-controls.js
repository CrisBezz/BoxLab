import {gizmoIcons} from './gizmo-corner-controls.js?v=0.36.18.1023';
const svg=paths=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+paths+'</svg>';
export function installViewportToolbarControls(doc=document){
 const wrap=doc.querySelector('#viewportWrap'),modes=doc.querySelector('#selectionModes');
 if(!wrap||!modes)return;
 const bar=doc.createElement('div');bar.id='viewportSelectionControls';bar.setAttribute('aria-label','Viewport tools');
 const snapBox=doc.createElement('div');snapBox.id='viewportSnapControls';snapBox.setAttribute('aria-label','Snapping');
 const actionBox=doc.createElement('div');actionBox.id='viewportActionControls';actionBox.setAttribute('aria-label','Lasso, selection and paint');
 const label=doc.createElement('span');label.textContent='SNAP';snapBox.append(label);
 const paths={axis:'<path stroke="#ef6b72" d="M11 15h10m-3-3 3 3-3 3"/><path stroke="#71d984" d="M11 15V3m-3 3 3-3 3 3"/><path stroke="#719eef" d="m11 15-8 6m1-4-1 4 4-1"/>',geo:'<circle cx="3" cy="12" r="1.7" fill="currentColor" stroke="none"/><path d="m8 15 5-6"/><path d="M17 8h6v8h-6Z" fill="currentColor" fill-opacity=".22"/>',lasso:'<path stroke-dasharray="2 2" d="M17 17c5-2 5-10-1-12S3 5 3 11s7 10 12 7"/><path d="M16 15c-3 0-5 3-3 5s6 1 5-2l-4-2"/>'};
 for(const [id,icon,title] of [['axisSnapToggle','axis','Axis snap'],['inferenceSnapToggle','geo','GEO snap — vertices, edges and faces']]){
  const input=doc.querySelector('#'+id),control=input?.closest('label');if(!control)continue;
  control.title=title;input.setAttribute('aria-label',title);control.querySelector('span').innerHTML=svg(paths[icon]);snapBox.append(control);
 }
 const depth=doc.querySelector('#paintSelectDepth');
 if(depth){depth.hidden=true;depth.setAttribute('aria-hidden','true');}
 bar.append(snapBox,actionBox);wrap.append(bar);
 const oldSnap=doc.querySelector('.quick-snap');if(oldSnap&&!oldSnap.querySelector('input'))oldSnap.remove();
 function decorate(){
  for(const [id,action,title] of [['undoBtn','undo','Undo'],['redoBtn','redo','Redo'],['frameAllBtn','frame','Frame all'],['focusViewBtn','focus','Focus view'],['objectBrowserBtn','objects','Object Browser']]){
   const b=doc.querySelector('#'+id);if(!b||b.dataset.iconAction)continue;b.dataset.iconAction=action;b.innerHTML=svg(gizmoIcons[action]);b.title=title;b.setAttribute('aria-label',title);
  }
  const top=doc.querySelector('.top-actions');
  if(top){const order=['frameAllBtn','undoBtn','redoBtn','focusViewBtn','objectBrowserBtn','floorToggleBtn','viewModes'];let position=0;for(const id of order){const b=doc.querySelector('#'+id);if(!b)continue;if(top.children[position]!==b)top.insertBefore(b,top.children[position]||null);b.style.order=String(position++);}}
  const lasso=doc.querySelector('#lassoSelectBtn');if(lasso&&lasso.parentElement!==actionBox){lasso.innerHTML=svg(paths.lasso)+'<span class="toolbar-label">LASSO</span>';lasso.title='LASSO — Pencil/mouse draws, finger navigates';lasso.setAttribute('aria-label','Lasso selection');actionBox.append(lasso);}
 }
 decorate();const observer=new MutationObserver(decorate);observer.observe(doc.body,{childList:true,subtree:true});
 const style=doc.createElement('style');style.textContent=`
.top-actions>button[data-icon-action]{width:40px;min-width:40px;padding:7px!important;display:grid;place-items:center}
.top-actions>button[data-icon-action] svg,#viewportSelectionControls svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
#viewportSelectionControls{position:absolute;z-index:120;inset:0;pointer-events:none}
#viewportSnapControls,#viewportActionControls{position:absolute;left:max(16px,env(safe-area-inset-left));display:flex;gap:5px;padding:4px;border:1px solid rgba(255,255,255,.14);border-radius:11px;background:rgba(18,21,27,.94);pointer-events:auto}
#viewportSnapControls{bottom:calc(max(82px,env(safe-area-inset-bottom) + 68px) + 160px);align-items:center;padding:4px 8px}
#viewportActionControls{bottom:max(82px,calc(env(safe-area-inset-bottom) + 68px));flex-direction:column;align-items:stretch;gap:4px}
#paintSelectDepth{display:none!important}
#viewportSelectionControls #viewportSnapControls>span{font-size:10px;letter-spacing:.05em;margin-right:2px}
#viewportSelectionControls label{position:relative;display:flex;align-items:center;justify-content:center;width:40px;height:40px;cursor:pointer;border-radius:8px}
#viewportSelectionControls input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}
#viewportSelectionControls label:has(input:checked),#viewportSelectionControls button.active{background:rgba(130,170,235,.28)}
#viewportSelectionControls label:has(input:focus-visible){outline:2px solid #a9ccff}
#viewportSelectionControls label:has(input:disabled){opacity:.4;cursor:default}
#viewportActionControls button{width:48px;height:46px;padding:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px}
#viewportActionControls button .toolbar-label{font-size:8px;line-height:1;letter-spacing:.02em}
#viewportActionControls #viewportSelectionBtn{width:48px;min-width:48px;font-size:8px;letter-spacing:.02em}
#viewportActionControls #viewportPaintBtn{width:48px;min-width:48px;font-size:8px;padding:3px}
#viewportActionControls #lassoSelectBtn{order:0}
#viewportActionControls #viewportSelectionBtn{order:1}
#viewportActionControls #viewportPaintBtn{order:2}
#viewportActionControls #viewportPaintBtn[aria-pressed=true]{background:#1268b6;border-color:#60b5ff}
#viewportWrap>.floating-panel.left-panel{bottom:132px!important}
@media(max-width:900px){#viewportSnapControls,#viewportActionControls{left:max(8px,env(safe-area-inset-left))}#viewportSnapControls{bottom:calc(max(78px,env(safe-area-inset-bottom) + 66px) + 156px)}#viewportActionControls{bottom:max(78px,calc(env(safe-area-inset-bottom) + 66px))}}
`;doc.head.append(style);
}
