import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.712';
// Contextual UI only. The existing Vertex owners retain gestures, geometry and history.
const targets={Add:'#addVertexBtn','Build Edge':'#buildEdgeBtn',Bevel:'#vertexBevelBtn',Slide:'#vertexSlideBtn','Merge Dist':'#mergeByDistanceBtn','Clean Vertices':'#cleanVerticesBtn'};
const panel=document.createElement('div');panel.id='vertexToolViewportSession';panel.hidden=true;
panel.innerHTML='<strong class="vts-title"></strong><div class="vts-note" role="status"></div><label class="vts-width-row">Width <input class="vts-width" type="range" aria-label="Vertex Bevel Width"/><output class="vts-width-out"></output></label><label class="vts-value-row"><span class="vts-value-label"></span><input class="vts-value" type="number" inputmode="decimal" aria-label="Exact Vertex tool value"/></label><div class="vts-actions"><button type="button" class="vts-done">Done</button><button type="button" class="vts-apply">Apply Exact</button></div>';
document.querySelector('#viewportWrap')?.appendChild(panel);
const style=document.createElement('style');style.textContent='#vertexToolViewportSession{width:280px;padding:10px;border:1px solid #ffffff30;border-radius:12px;background:rgba(16,19,24,.965);color:#eef2f7;font-size:12px;pointer-events:auto;touch-action:none}#vertexToolViewportSession[hidden],#vertexToolViewportSession [hidden]{display:none!important}#vertexToolViewportSession .vts-note{font-size:11px;line-height:1.4;margin:7px 0}#vertexToolViewportSession label{display:grid;grid-template-columns:65px 1fr;gap:6px;align-items:center;margin:8px 0}#vertexToolViewportSession .vts-width-row{grid-template-columns:40px 1fr 35px}#vertexToolViewportSession input{width:100%;min-width:0}#vertexToolViewportSession .vts-value{padding:6px;background:#ffffff0c;color:inherit;border:1px solid #ffffff30;border-radius:6px}#vertexToolViewportSession .vts-actions{display:flex;gap:6px}#vertexToolViewportSession button{min-height:34px;font-size:11px;flex:1;padding:6px}';document.head.appendChild(style);
const width=panel.querySelector('.vts-width'),value=panel.querySelector('.vts-value'),apply=panel.querySelector('.vts-apply'),done=panel.querySelector('.vts-done');
let session=null,raf=0,message='',ready=false;
const bridge=()=>globalThis.__boxlabSelectionBridge;
const mesh=()=>globalThis.__boxlabBridgeState?.mesh;
const ids=()=>bridge()?.mode?.()==='vertex'?[...new Set(bridge().indices?.()||[])]:[];
const editable=()=>!document.querySelector('#app')?.classList?.contains('boxlab-active-locked');
function busy(){return !!(globalThis.__boxlabDirectVertexBevel?.busy?.()||globalThis.__boxlabVertexSlidePolish?.busy?.()||globalThis.__boxlabBuildEdge?.busy?.()||globalThis.__boxlabAddVertex?.busy?.());}
function available(tool){
  if(!targets[tool]||bridge()?.mode?.()!=='vertex'||!mesh()||!editable()||busy())return false;
  const target=document.querySelector(targets[tool]);if(!target)return false;
  if(tool==='Bevel')return !!(globalThis.__boxlabDirectVertexBevel?.info?.()&&globalThis.__boxlabPrecisionBevel?.vertex);
  if(tool==='Slide'){globalThis.__boxlabVertexSlidePolish?.sync?.();return !target.disabled&&!!globalThis.__boxlabVertexSlidePolish?.apply;}
  if(tool==='Merge Dist')return ids().length>=2&&!!globalThis.__boxlabMergeByDistance?.applyFor;
  if(tool==='Clean Vertices'){globalThis.__boxlabCleanVertices?.syncUI?.();return !target.disabled&&!!globalThis.__boxlabCleanVertices?.apply;}
  return !target.disabled&&(tool==='Add'?!!globalThis.__boxlabAddVertex:!!globalThis.__boxlabBuildEdge);
}
function stopOwners({cancelDrag=false,selectLast=false}={}){
  globalThis.__boxlabAddVertex?.stop?.(selectLast);
  globalThis.__boxlabBuildEdge?.disarm?.();
  globalThis.__boxlabDirectVertexBevel?.disarm?.();
  globalThis.__boxlabVertexSlidePolish?.disarm?.({cancelDrag});
  globalThis.__boxlabTransformArming?.disarm?.();
}
function close({complete=true,cancelDrag=false}={}){
  if(busy()&&!cancelDrag)return false;
  const was=session;session=null;panel.hidden=true;cancelAnimationFrame(raf);
  stopOwners({cancelDrag,selectLast:!!was&&complete&&was.tool==='Add'&&was.mesh===mesh()&&bridge()?.mode?.()==='vertex'});
  if(was&&complete)queueMicrotask(()=>window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'vertex',tool:was.tool}})));
  return true;
}
function contextValid(){return !!(session&&mesh()===session.mesh&&bridge()?.mode?.()==='vertex'&&editable()&&(['Add','Build Edge','Clean Vertices'].includes(session.tool)||ids().length));}
function refreshReady(){
  if(!session)return;
  const tool=session.tool,raw=Number(value.value);
  ready=false;
  if(tool==='Merge Dist'){
    const plan=globalThis.__boxlabMergeByDistance?.plan?.(mesh(),ids(),raw);ready=!!plan?.ok;
    message=plan?.ok?`Selected vertices only • ${plan.clusters.length} eligible cluster(s).`:plan?.reason||'Select regular mesh vertices within the chosen distance.';
  }else if(tool==='Clean Vertices'){
    globalThis.__boxlabCleanVertices?.syncUI?.();ready=!document.querySelector(targets[tool])?.disabled;
  }else if(tool==='Bevel')ready=value.value.trim()!==''&&Number.isFinite(raw)&&raw>=2&&raw<=49&&!!globalThis.__boxlabDirectVertexBevel?.info?.();
  else if(tool==='Slide')ready=value.value.trim()!==''&&Number.isFinite(raw)&&Math.abs(raw)>1e-6&&Math.abs(raw)<=98&&ids().length>0;
}
function sync(){
  cancelAnimationFrame(raf);if(!session)return;
  if(!contextValid()){close({cancelDrag:true});return;}
  const tool=session.tool;
  if(tool==='Bevel'){
    const source=document.querySelector('#vertexBevelWidth');
    if(source&&document.activeElement!==width)width.value=source.value;
    panel.querySelector('.vts-width-out').textContent=(source?.value||width.value)+'%';
  }
  const notes={Add:'Tap to add vertices; drag to orbit or slide along an edge. Done ends Add.', 'Build Edge':'Drag from one vertex to another; continue building, then Done.',Bevel:'Pencil-drag a vertex, or set Width / Exact % and apply. Width sets the next operation.',Slide:'Drag selected vertices along their existing rails, or apply an exact signed percentage.','Merge Dist':'Selected vertices only • enter distance in model units.','Clean Vertices':'Whole active object • removes safe redundant vertices, including outside your selection.'};
  panel.querySelector('.vts-note').textContent=message||notes[tool];
  apply.disabled=!ready||busy();done.disabled=busy();width.disabled=busy();value.disabled=busy();
  placeToolSessionPanel(panel);raf=requestAnimationFrame(sync);
}
function openFromHub({tool}={}){
  if(!available(tool))return false;
  if(!close({complete:false}))return false;
  stopOwners();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:tool==='Build Edge'?'build-edge':'vertex-'+tool.toLowerCase().replaceAll(' ','-')}}));
  if(['Add','Build Edge','Bevel','Slide'].includes(tool))document.querySelector(targets[tool]).click();
  session={tool,mesh:mesh()};message='';
  panel.querySelector('.vts-title').textContent=tool==='Merge Dist'?'Merge by Distance':tool==='Clean Vertices'?tool:'Vertex '+tool;
  const exact=['Bevel','Slide','Merge Dist'].includes(tool);
  panel.querySelector('.vts-width-row').hidden=tool!=='Bevel';panel.querySelector('.vts-value-row').hidden=!exact;
  apply.hidden=!exact&&tool!=='Clean Vertices';apply.textContent=tool==='Clean Vertices'?'Apply Cleanup':tool==='Merge Dist'?'Apply Merge':'Apply Exact';
  done.textContent=['Bevel','Merge Dist','Clean Vertices'].includes(tool)?'Cancel':'Done';
  panel.querySelector('.vts-value-label').textContent=tool==='Merge Dist'?'Distance':tool==='Slide'?'Slide %':'Exact %';
  value.step=tool==='Merge Dist'?'0.001':'0.1';value.min=tool==='Slide'?'-98':tool==='Bevel'?'2':'0';
  if(tool==='Merge Dist')value.removeAttribute('max');else value.max=tool==='Slide'?'98':'49';
  value.value=tool==='Merge Dist'?document.querySelector('#mergeByDistanceValue')?.value||'0.001':tool==='Bevel'?document.querySelector('#vertexBevelWidth')?.value||'20':'';
  if(tool==='Bevel'){const source=document.querySelector('#vertexBevelWidth');for(const attr of ['min','max','step'])width.setAttribute(attr,source?.getAttribute(attr)||'');width.value=source?.value||'20';}
  panel.hidden=false;refreshReady();sync();queueMicrotask(()=>{if(session)sync();});return true;
}
panel.addEventListener('pointerdown',event=>event.stopPropagation(),true);
panel.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});
width.addEventListener('input',()=>{
  if(!session||session.tool!=='Bevel'||busy())return;
  const source=document.querySelector('#vertexBevelWidth');if(source){source.value=width.value;source.dispatchEvent(new Event('input',{bubbles:true}));}value.value=width.value;message='';refreshReady();sync();
});
value.addEventListener('input',()=>{message='';refreshReady();sync();});
function applyCurrent(){
  if(!contextValid()||apply.disabled||busy())return;
  refreshReady();if(!ready){sync();return;}
  const tool=session.tool;let result;
  if(tool==='Bevel')result=globalThis.__boxlabPrecisionBevel.vertex(Number(value.value));
  else if(tool==='Slide')result=globalThis.__boxlabVertexSlidePolish.apply(Number(value.value));
  else if(tool==='Merge Dist')result=globalThis.__boxlabMergeByDistance.applyFor({ids:ids(),tolerance:Number(value.value),expectedMesh:session.mesh,selectResults:true});
  else if(tool==='Clean Vertices')result=globalThis.__boxlabCleanVertices.apply();
  if(result?.ok){close();return;}
  message=result?.reason||document.querySelector(tool==='Slide'?'#precisionVertexSlideReadout':'#selectionStatus')?.textContent||'Operation unavailable';refreshReady();sync();
}
apply.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();applyCurrent();});
value.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();applyCurrent();value.blur();}});
done.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();close();});
window.addEventListener('boxlab-vertex-tool-complete',event=>{if(session?.tool===event.detail?.tool)close();});
window.addEventListener('boxlab-selection-hub-tool',event=>{if(session&&(event.detail?.mode!=='vertex'||event.detail?.tool!==session.tool))close({complete:false});});
window.addEventListener('boxlab-bridge-state',()=>{if(session){refreshReady();sync();}});
globalThis.__boxlabVertexViewportSession={version:'0.36.18.710',available,openFromHub,close,active:()=>!!session,element:panel,sync};
