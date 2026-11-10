import * as THREE from 'three';

// One session-level preference owner. Picking and stroke events stay with their
// existing main/Lasso/paint owners; this module only supplies policy and controls.
export function createSelectionInputOptions(scope=globalThis){
 let front=true,drag=false;const listeners=new Set();
 const notify=()=>{for(const fn of listeners)fn();if(scope.window?.dispatchEvent&&scope.CustomEvent)scope.window.dispatchEvent(new scope.CustomEvent('boxlab-selection-input-change'));};
 return {frontOnly:()=>front,dragFaces:()=>drag,
  setFront(value){front=!!value;notify();return true;},
  setDrag(value){drag=!!value;notify();return true;},
  subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);},
  filterFaceHits(hits,direction){
   if(!front)return hits;if(!hits.length)return [];
   // Never skip a nearer back-facing surface and select a farther face through it.
   const hit=hits[0],normal=hit.face?.normal?.clone?.();
   if(normal&&direction){if(hit.object?.matrixWorld)normal.applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld));if(normal.dot(direction)>=0)return [];}
   return [hit];
  }
 };
}
export function installSelectionInputControls(doc,bar,scope=globalThis){
 const input=scope.__boxlabSelectionInput||(scope.__boxlabSelectionInput=createSelectionInputOptions(scope));
 if(doc.querySelector('#frontSelectBtn'))return input;
 const icons={front:'<path d="m3 15 4-7 11 3-4 8Z"/><circle cx="10.5" cy="13" r="1"/><path d="m10.5 13 5-10m-4 2 4-2 1 4"/>',drag:'<path d="M2 12h6v7H2zM9 8h6v7H9zM16 4h6v7h-6z"/><path stroke-dasharray="1.5 2" d="M1 17c6-12 10 5 22-13"/>'};
 const mode=()=>scope.__boxlabSelectionBridge?.mode?.()||doc.querySelector('#selectionModes button.active')?.dataset?.mode||'face';
 const buttons={};
 for(const [key,id,label,title]of [['front','frontSelectBtn','FRONT','FRONT — nearest visible front-facing face only; off permits depth selection'],['drag','dragSelectBtn','DRAG','DRAG — add faces by dragging Pencil or mouse; off retains hold and directional selection gestures']]){
  const b=doc.createElement('button');b.id=id;b.type='button';b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+icons[key]+'</svg><span class="toolbar-label">'+label+'</span>';b.title=title;b.setAttribute('aria-label',title);bar.append(b);buttons[key]=b;
 }
 function sync(){for(const key of ['front','drag']){const b=buttons[key],on=key==='front'?input.frontOnly():input.dragFaces();b.setAttribute('aria-pressed',String(on));b.classList?.toggle?.('active',on);b.disabled=mode()!=='face';}}
 buttons.front.addEventListener('click',()=>input.setFront(!input.frontOnly()));
 buttons.drag.addEventListener('click',()=>{
  if(!input.dragFaces()){
   if(scope.__boxlabViewportPaint?.active||scope.__boxlabToolSession?.isActive?.()||scope.__boxlabMainDirectTool?.busy?.()||scope.__boxlabFaceDirect?.dragging?.()||scope.__boxlabActiveGizmoDrag){const status=doc.querySelector('#selectionStatus');if(status)status.textContent='Finish the current tool before enabling Drag selection';return;}
   if(scope.__boxlabFaceDirect?.disarmForSelection?.()===false)return;
   if(scope.__boxlabMainDirectTool?.disarmForSelection?.()===false)return;
   scope.__boxlabTransformArming?.disarm?.();scope.__boxlabLasso?.setArmed?.(false);
  }
  input.setDrag(!input.dragFaces());
 });
 input.subscribe(sync);
 // Window capture sees original tool buttons even when their document owner
 // consumes the click before bubbling. Do not stack competing modelling handlers.
 const toolClick=event=>{if(event.target?.closest?.('#selectionModes button,#toolModes button,.mode-tools button,#viewportPaintBtn'))input.setDrag(false);sync();};
 if(scope.window?.addEventListener)scope.window.addEventListener('click',toolClick,true);else doc.addEventListener?.('click',toolClick,true);
 scope.window?.addEventListener?.('boxlab-tool-session-change',event=>{if(event.detail?.active)input.setDrag(false);});
 scope.window?.addEventListener?.('boxlab-bridge-state',()=>{if(mode()!=='face'&&input.dragFaces())input.setDrag(false);sync();});
 sync();return input;
}
