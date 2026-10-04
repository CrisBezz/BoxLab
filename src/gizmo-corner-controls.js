// Local gizmo shortcuts reuse the authoritative toolbar actions.
export const gizmoIcons={
 tools:'<circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3M5 19l3-3m8-8 3-3"/><circle cx="12" cy="2" r="1"/><circle cx="22" cy="12" r="1"/><circle cx="12" cy="22" r="1"/><circle cx="2" cy="12" r="1"/>',
 focus:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><rect x="8" y="8" width="8" height="8" rx="2"/>',
 frame:'<path d="M3 8V3h5m8 0h5v5M3 16v5h5m13-5v5h-5M9 9 4 4m11 5 5-5M9 15l-5 5m11-5 5 5"/>',
 undo:'<path d="m9 4-6 6 6 6M3 10h10a7 7 0 0 1 7 7v3"/>',
 redo:'<path d="m15 4 6 6-6 6m6-6H11a7 7 0 0 0-7 7v3"/>',
 objects:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 8h9M8 12h9M8 16h9"/><circle cx="5" cy="8" r=".5"/><circle cx="5" cy="12" r=".5"/><circle cx="5" cy="16" r=".5"/>',
 multi:'<circle cx="9" cy="8" r="5"/><circle cx="15" cy="15" r="5"/><path d="M5 18H1m2-2v4"/>'
};
export function mountGizmoCornerControls(root,{openTools,currentMode,isBusy=()=>false}={}){
 const doc=root.ownerDocument||document,controls=new Map(),groups=[];
 const clusters=[['tl',[['tools','Radial tools']]],['tr',[['focus','Focus view'],['frame','Frame all']]],['br',[['undo','Undo'],['redo','Redo']]],['bl',[['multi','Object multi-select'],['objects','Object list']]]];
 for(const [corner,items] of clusters){
  const group=doc.createElement('div');group.className='tg-corner tg-corner-'+corner;group.dataset.corner=corner;
  for(const [action,label] of items){const b=doc.createElement('button');b.type='button';b.className='tg-shortcut';b.dataset.gizmoAction=action;b.title=label;b.setAttribute('aria-label',label);b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+gizmoIcons[action]+'</svg>';group.appendChild(b);controls.set(action,b);
   b.addEventListener('pointerdown',e=>{e.stopPropagation();if(action==='tools'){e.preventDefault();if(!b.disabled&&!isBusy())openTools?.();}});
   if(action==='tools')b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(e.detail===0&&!b.disabled&&!isBusy())openTools?.();});
   if(action!=='tools')b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(b.disabled||isBusy())return;if(action==='objects'){globalThis.__boxlabObjectListViewport?.toggle?.();sync();return;}const target=resolve(action);if(target&&!target.disabled)target.click();sync();});
  }
  root.appendChild(group);groups.push(group);
 }
 function resolve(action){
  if(action==='objects')return globalThis.__boxlabObjectListViewport?.available?.()?{disabled:false}:null;
  if(action==='multi')return [...doc.querySelectorAll('#objectManagementTools button')].find(b=>b.textContent.trim()==='Multi')||null;
  return doc.querySelector({focus:'#focusViewBtn',frame:'#frameAllBtn',undo:'#undoBtn',redo:'#redoBtn'}[action]||'');
 }
 function sync(){
  const busy=isBusy(),mode=currentMode?.();
  for(const [action,b] of controls){
   const target=action==='tools'?null:resolve(action);
   b.disabled=busy||(action!=='tools'&&(!target||target.disabled))||(['multi','objects'].includes(action)&&mode!=='object');
   if(action==='multi'){b.parentElement.hidden=mode!=='object';b.setAttribute('aria-pressed',globalThis.__boxlabObjectSelection?.multi?'true':'false');}
   if(action==='objects'){b.parentElement.hidden=mode!=='object';b.setAttribute('aria-pressed',globalThis.__boxlabObjectListViewport?.visible?.()?'true':'false');}
   if(action==='focus')b.setAttribute('aria-pressed',doc.documentElement.classList.contains('boxlab-focus-view')?'true':'false');
  }
 }
 function position(left,top,viewport){
  if(!viewport?.width||!viewport?.height)return;
  const offsets={tl:[-96,-96],tr:[104,-96],br:[104,96],bl:[-96,96]};
  for(const group of groups){
   const [dx,dy]=offsets[group.dataset.corner],width=group.children.length*40+(group.children.length-1)*4;
   const x=Math.max(width/2+8,Math.min(viewport.width-width/2-8,left+dx));
   const y=Math.max(28,Math.min(viewport.height-28,top+dy));
   group.style.left=(98+x-left)+'px';group.style.top=(98+y-top)+'px';
  }
 }
 sync();return{sync,position,controls};
}
