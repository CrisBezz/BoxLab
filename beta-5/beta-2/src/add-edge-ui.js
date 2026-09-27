const addEdgeBtn = document.querySelector('#connectVertexBtn');
const buildEdgeBtn = document.querySelector('#buildEdgeBtn');
const cageToggle = document.querySelector('#cageToggle');
const canvas = document.querySelector('#viewport');
const selectionStatus = document.querySelector('#selectionStatus');
const multiToggle = document.querySelector('#multiSelectToggle');
const axisToggle = document.querySelector('#axisSnapToggle');
const PICK_RADIUS_PX = 24;
const AXIS_PICK_RADIUS_PX = 42;
const AXIS_ALIGN_PX = 10;
const MIN_DRAG_PX = 8;

let multiWasEnabled = false;
let buildArmed = false;
let buildDrag = null;
let buildLine = null;
let startMarker = null;
let endMarker = null;
let axisGuide = null;

function state(){ return globalThis.__boxlabBridgeState; }
function selectionBridge(){ return globalThis.__boxlabSelectionBridge; }
function currentMode(){ return selectionBridge()?.mode?.() || document.querySelector('#selectionModes button.active')?.dataset?.mode; }
function axisOn(){ return !!axisToggle?.checked; }
function forceRender(){ cageToggle?.dispatchEvent(new Event('change',{ bubbles:true })); }
function screenPoint(point,camera){
  const p=point.clone().project(camera),r=canvas.getBoundingClientRect();
  return { x:r.left+(p.x*.5+.5)*r.width, y:r.top+(-p.y*.5+.5)*r.height, z:p.z };
}
function nearestVertexAt(x,y,exclude=null,startScreen=null){
  const s=state(),mesh=s?.mesh,camera=s?.camera;
  if(!mesh||!camera)return null;
  let best=null;
  for(let i=0;i<mesh.vertices.length;i++){
    if(i===exclude)continue;
    const screen=screenPoint(mesh.vertices[i],camera);
    if(screen.z < -1 || screen.z > 1)continue;
    const d=Math.hypot(screen.x-x,screen.y-y);
    let axis=null,score=d;
    if(startScreen&&axisOn()){
      const dx=Math.abs(screen.x-startScreen.x),dy=Math.abs(screen.y-startScreen.y);
      if(dx<=AXIS_ALIGN_PX&&d<=AXIS_PICK_RADIUS_PX){axis='Vertical';score=d*.65;}
      if(dy<=AXIS_ALIGN_PX&&d<=AXIS_PICK_RADIUS_PX&&(!axis||dy<dx)){axis='Horizontal';score=d*.65;}
    }
    if(d>PICK_RADIUS_PX&&!axis)continue;
    if(!best||score<best.score-.75||(Math.abs(score-best.score)<=.75&&screen.z<best.z))best={ index:i,d,score,z:screen.z,screen,axis };
  }
  return best;
}
function clearBuildPreview(){
  buildLine?.remove(); startMarker?.remove(); endMarker?.remove(); axisGuide?.remove();
  buildLine=startMarker=endMarker=axisGuide=null;
}
function marker(point,filled=true){
  const el=document.createElement('div');
  el.style.cssText=`position:fixed;pointer-events:none;width:12px;height:12px;border-radius:50%;border:2px solid #fff;background:${filled?'#ffe14a':'#111318'};box-shadow:0 0 0 2px #0008;z-index:10000;transform:translate(-50%,-50%)`;
  el.style.left=`${point.x}px`; el.style.top=`${point.y}px`;
  document.body.appendChild(el); return el;
}
function showBuildPreview(start,end,endHit){
  clearBuildPreview();
  startMarker=marker(start,true);
  const dx=end.x-start.x,dy=end.y-start.y;
  const line=document.createElement('div');
  line.style.cssText='position:fixed;pointer-events:none;height:2px;background:#ffe14a;transform-origin:0 50%;z-index:9999;box-shadow:0 0 4px #0008';
  line.style.left=`${start.x}px`; line.style.top=`${start.y}px`;
  line.style.width=`${Math.hypot(dx,dy)}px`; line.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;
  document.body.appendChild(line); buildLine=line;
  if(endHit)endMarker=marker(end,true);
  if(endHit?.axis){
    const guide=document.createElement('div');
    guide.style.cssText='position:fixed;pointer-events:none;height:1px;background:#62d8ff;transform-origin:0 50%;z-index:9998;opacity:.9';
    guide.style.left=`${start.x}px`;guide.style.top=`${start.y}px`;
    guide.style.width=`${Math.hypot(dx,dy)}px`;guide.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;
    document.body.appendChild(guide);axisGuide=guide;
  }
}
function disarmBuildEdge(){
  buildArmed=false; buildDrag=null; clearBuildPreview();
  buildEdgeBtn?.classList.remove('active');
}
function armBuildEdge(){
  buildArmed=true; buildDrag=null; clearBuildPreview();
  document.querySelector('#extrudeBtn.active,#insetBtn.active')?.click();
  globalThis.__boxlabTransformArming?.disarm?.();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'build-edge'}}));
  document.querySelectorAll('#toolModes button,#knifeBtn').forEach(button=>button.classList.remove('active'));
  if(currentMode()!=='vertex')document.querySelector('#selectionModes button[data-mode="vertex"]')?.click();
  selectionBridge()?.set?.('vertex',[]);
  buildEdgeBtn?.classList.add('active');
  if(selectionStatus)selectionStatus.textContent='Build Edge • drag vertex → vertex';
}

if (addEdgeBtn && selectionStatus) {
  addEdgeBtn.addEventListener('click', () => { multiWasEnabled = !!multiToggle?.checked; }, true);
  addEdgeBtn.addEventListener('click', () => {
    setTimeout(() => {
      const created = /\bedge selected\b/i.test(selectionStatus.textContent || '');
      if (created) {
        if (cageToggle && !cageToggle.checked) {
          cageToggle.checked = true;
          cageToggle.dispatchEvent(new Event('change', { bubbles: true }));
        }
        if (multiWasEnabled && multiToggle && !multiToggle.checked) {
          multiToggle.checked = true;
          multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
        }
        selectionStatus.textContent = 'Add Edge created • new edge selected';
      } else selectionStatus.textContent = 'Add Edge not created • select 2 vertices that are not already connected';
    }, 0);
  });
}

buildEdgeBtn?.addEventListener('click',event=>{
  event.preventDefault(); event.stopImmediatePropagation();
  if(buildArmed){disarmBuildEdge();if(selectionStatus)selectionStatus.textContent='Vertex mode • Build Edge off';}
  else armBuildEdge();
},true);

document.addEventListener('boxlab-direct-tool-exclusive',event=>{
  if(!buildArmed)return;
  const tool=event.detail?.tool;
  if(tool&&tool!=='build-edge')disarmBuildEdge();
},true);

document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>{
  if(buildArmed&&button.dataset.mode!=='vertex')disarmBuildEdge();
}));

document.addEventListener('click',event=>{
  if(!buildArmed||event.target?.closest?.('#buildEdgeBtn'))return;
  const other=event.target?.closest?.('#addVertexBtn,#vertexSlideBtn,#vertexBevelBtn,#connectVertexBtn,#weldVertexBtn,#deleteVertexBtn,#toolModes button,#extrudeBtn,#insetBtn,#knifeBtn');
  if(other)disarmBuildEdge();
},true);

canvas?.addEventListener('pointerdown',event=>{
  if(!buildArmed||event.target!==canvas||!event.isPrimary||currentMode()!=='vertex')return;
  if(event.pointerType==='pen'&&!(event.pressure>0))return;
  const hit=nearestVertexAt(event.clientX,event.clientY);
  if(!hit)return;
  event.preventDefault(); event.stopImmediatePropagation();
  buildDrag={ id:event.pointerId,startIndex:hit.index,startScreen:hit.screen,x:event.clientX,y:event.clientY,end:null };
  showBuildPreview(hit.screen,hit.screen,null);
  canvas.setPointerCapture?.(event.pointerId);
  if(selectionStatus)selectionStatus.textContent='Build Edge • drag to another vertex';
},true);

canvas?.addEventListener('pointermove',event=>{
  if(!buildDrag||buildDrag.id!==event.pointerId)return;
  event.preventDefault(); event.stopImmediatePropagation();
  const hit=nearestVertexAt(event.clientX,event.clientY,buildDrag.startIndex,buildDrag.startScreen);
  buildDrag.end=hit;
  const end=hit?.screen||{x:event.clientX,y:event.clientY};
  showBuildPreview(buildDrag.startScreen,end,hit);
  if(selectionStatus)selectionStatus.textContent=hit?`Build Edge • ${hit.axis?`${hit.axis} axis • `:''}release to create edge`:'Build Edge • snap to another vertex';
},true);

canvas?.addEventListener('pointerup',event=>{
  if(!buildDrag||buildDrag.id!==event.pointerId)return;
  const drag=buildDrag; buildDrag=null;
  event.preventDefault(); event.stopImmediatePropagation();
  try{canvas.releasePointerCapture?.(event.pointerId);}catch{}
  const end=drag.end||nearestVertexAt(event.clientX,event.clientY,drag.startIndex,drag.startScreen);
  clearBuildPreview();
  if(Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<MIN_DRAG_PX||!end){
    if(selectionStatus)selectionStatus.textContent='Build Edge • drag vertex → vertex';
    return;
  }
  const mesh=state()?.mesh;
  if(!mesh)return;
  const before=mesh.clone();
  const result=mesh.connectVertices?.(drag.startIndex,end.index);
  if(!result?.ok){
    if(selectionStatus)selectionStatus.textContent=result?.reason==='Vertices already have an edge'?'Build Edge • vertices already connected':'Build Edge • edge could not be created';
    return;
  }
  globalThis.__boxlabHistory?.push?.(before);
  selectionBridge()?.set?.('vertex',[]);
  forceRender();
  buildEdgeBtn?.classList.add('active');
  buildArmed=true;
  if(selectionStatus)selectionStatus.textContent=`Build Edge created${result.loose?' • loose edge':''}${end.axis?` • ${end.axis} axis`:''} • continue drawing`;
},true);

canvas?.addEventListener('pointercancel',event=>{
  if(buildDrag?.id!==event.pointerId)return;
  buildDrag=null; clearBuildPreview();
  if(selectionStatus&&buildArmed)selectionStatus.textContent='Build Edge • drag vertex → vertex';
},true);
