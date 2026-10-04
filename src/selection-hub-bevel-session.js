import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.716';
const viewportWrap=document.querySelector('#viewportWrap');
const gizmo=()=>document.querySelector('#totalGizmo');

const palette=document.createElement('div');
palette.id='selectionHubBevelSession';
palette.hidden=true;
palette.innerHTML=`
  <div class="shbs-head"><strong>Bevel</strong><span>Viewport Session</span></div>
  <label class="shbs-range">
    <span>Width</span>
    <input type="range" data-proxy-range="#bevelWidth"/>
    <output data-proxy-output="#bevelWidthOut"></output>
  </label>
  <label class="shbs-range">
    <span>Segments</span>
    <input type="range" data-proxy-range="#bevelSegments"/>
    <output data-proxy-output="#bevelSegmentsOut"></output>
  </label>
  <div class="shbs-note">Drag an edge, or select edges and use sliders + EXACT. Repeat on more edges; background tap exits.</div>
  <div class="shbs-actions">
    <button type="button" class="shbs-cancel" data-action="cancel">Cancel</button>
    <button type="button" class="shbs-primary" data-action="apply">Apply Exact</button>
  </div>
`;
viewportWrap?.appendChild(palette);

const style=document.createElement('style');
style.textContent=`
#selectionHubBevelSession{position:absolute;z-index:134;width:258px;transform:translate(112px,-50%);padding:9px;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(16,19,24,.965);box-shadow:0 12px 32px rgba(0,0,0,.42);color:#eef2f7;pointer-events:auto;touch-action:none}
#selectionHubBevelSession[hidden]{display:none}
#selectionHubBevelSession .shbs-head{display:flex;align-items:baseline;justify-content:space-between;margin:0 1px 7px}
#selectionHubBevelSession .shbs-head strong{font-size:13px}
#selectionHubBevelSession .shbs-head span{font-size:10px;opacity:.56}
#selectionHubBevelSession .shbs-range{display:grid;grid-template-columns:58px 1fr 72px;gap:7px;align-items:center;font-size:10px;margin-top:5px}
#selectionHubBevelSession .shbs-range input{width:100%;min-width:0}
#selectionHubBevelSession .shbs-range output{text-align:right;opacity:.8;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#selectionHubBevelSession .shbs-note{font-size:9px;line-height:1.35;opacity:.58;margin:7px 1px 0}
#selectionHubBevelSession .shbs-actions{display:grid;grid-template-columns:1fr 1.35fr;gap:6px;margin-top:8px}
#selectionHubBevelSession button{min-height:34px;margin:0;padding:6px;border:1px solid rgba(255,255,255,.12);border-radius:7px;background:rgba(255,255,255,.045);color:inherit;font-size:10px}
#selectionHubBevelSession .shbs-primary{background:rgba(238,242,247,.92);color:#15171b;font-weight:750}
#selectionHubBevelSession .shbs-cancel{border-color:rgba(255,120,120,.32)}
`;
document.head.appendChild(style);

let launchedFromHub=false;
let launchSelection=[];
let launchMode='edge';
let launchMesh=null;
let raf=0;

function src(selector){return document.querySelector(selector);}
function currentEdgeSelection(){
  const bridge=globalThis.__boxlabSelectionBridge;
  return bridge?.mode?.()==='edge'?[...new Set(bridge.indices?.()||[])]:[];
}
function copyRange(proxy,target){
  if(!proxy||!target)return;
  for(const attr of ['min','max','step'])proxy.setAttribute(attr,target.getAttribute(attr)||'');
  if(document.activeElement!==proxy)proxy.value=target.value;
  proxy.disabled=!!target.disabled;
}
function closeSession({restoreSelection=false}={}){
  launchedFromHub=false;
  palette.hidden=true;
  cancelAnimationFrame(raf);
  if(launchMode==='face'){globalThis.__boxlabDirectBevel?.cancelFaces?.({restoreSelection});return;}
  globalThis.__boxlabDirectBevel?.disarm?.();
  window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'edge',tool:'Bevel'}}));
  if(restoreSelection&&launchSelection.length&&globalThis.__boxlabSelectionBridge?.mode?.()==='edge'){
    globalThis.__boxlabSelectionBridge.set?.('edge',launchSelection);
  }
}
function sync(){
  cancelAnimationFrame(raf);
  if(launchedFromHub&&launchMode==='edge'){if(globalThis.__boxlabSelectionBridge?.mode?.()!=='edge'||globalThis.__boxlabBridgeState?.mesh!==launchMesh||document.querySelector('#app')?.classList.contains('boxlab-active-locked')){closeSession();return;}launchSelection=currentEdgeSelection();}
  if(launchedFromHub&&launchMode==='face'&&!globalThis.__boxlabDirectBevel?.faceContextValid?.()){closeSession();return;}
  const active=launchedFromHub&&!!globalThis.__boxlabDirectBevel?.active?.();
  palette.hidden=!active;
  if(!active){
    if(launchedFromHub)launchedFromHub=false;
    return;
  }

  for(const range of palette.querySelectorAll('[data-proxy-range]')){
    copyRange(range,src(range.dataset.proxyRange));
  }
  for(const output of palette.querySelectorAll('[data-proxy-output]')){
    const sourceOutput=src(output.dataset.proxyOutput);
    if(sourceOutput)output.textContent=sourceOutput.textContent||sourceOutput.value||'';
  }

  const apply=palette.querySelector('[data-action="apply"]');
  if(apply)apply.disabled=!launchSelection.length||!globalThis.__boxlabDirectBevel?.applyExact||!!globalThis.__boxlabDirectBevel?.busy?.()||(launchMode==='face'&&!globalThis.__boxlabDirectBevel?.previewState?.()?.ok);

  placeToolSessionPanel(palette);
  raf=requestAnimationFrame(sync);
}

palette.addEventListener('pointerdown',event=>event.stopPropagation(),true);
palette.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});

for(const proxy of palette.querySelectorAll('[data-proxy-range]')){
  proxy.addEventListener('input',()=>{
    const target=src(proxy.dataset.proxyRange);
    if(!target)return;
    target.value=proxy.value;
    target.dispatchEvent(new Event('input',{bubbles:true}));
  });
  proxy.addEventListener('change',()=>{
    const target=src(proxy.dataset.proxyRange);
    if(!target)return;
    target.value=proxy.value;
    target.dispatchEvent(new Event('change',{bubbles:true}));
  });
}

palette.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');
  if(!button)return;
  event.preventDefault();
  event.stopPropagation();
  if(button.dataset.action==='cancel'){
    closeSession({restoreSelection:launchMode==='face'});
    const status=document.querySelector('#selectionStatus');
    if(status)status.textContent=`Bevel cancelled • ${launchMode==='face'?'Face':'Edge'} selection ready`;
    return;
  }
  if(button.dataset.action==='apply'){
    const width=Number(src('#bevelWidth')?.value||20);
    const result=globalThis.__boxlabDirectBevel?.applyExact?.(width,launchSelection);
    if(!result?.ok){
      const status=document.querySelector('#selectionStatus');
      if(status)status.textContent=result?.reason||'Bevel unavailable';
      requestAnimationFrame(sync);
      return;
    }
    if(launchMode==='edge'){launchSelection=currentEdgeSelection();sync();return;}
    launchedFromHub=false;
    palette.hidden=true;
    cancelAnimationFrame(raf);
  }
});

window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(launchedFromHub&&(event.detail?.tool!=='Bevel'||event.detail?.mode!==launchMode)){launchedFromHub=false;palette.hidden=true;cancelAnimationFrame(raf);globalThis.__boxlabDirectBevel?.disarm?.();}

  if(event.detail?.tool!=='Bevel')return;
  launchMode=event.detail.mode;
  if(launchMode==='face'){
    const result=globalThis.__boxlabDirectBevel?.armFaces?.(globalThis.__boxlabSelectionBridge?.indices?.()||[]);
    if(!result?.ok){window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'face',tool:'Bevel'}}));return;}
    launchSelection=result.ids;
  }else if(launchMode==='edge'){launchSelection=currentEdgeSelection();globalThis.__boxlabDirectBevel?.setPersistentEdge?.(true);launchMesh=globalThis.__boxlabBridgeState?.mesh;}else return;
  palette.querySelector('[data-action="apply"]').textContent=launchMode==='face'?'Apply Bevel':'EXACT';
  palette.querySelector('.shbs-head strong').textContent=launchMode==='face'?'Face Bevel':'Bevel';
  palette.querySelector('.shbs-note').textContent=launchMode==='face'?'Blue preview only. Adjust Width/Segments or Pencil-drag a selected Face, then Apply.':'Drag an edge, or select edges and use sliders + EXACT. Repeat on more edges; background tap exits.';
  launchedFromHub=true;
  requestAnimationFrame(()=>{
    sync();
    requestAnimationFrame(sync);
  });
});

document.addEventListener('boxlab-direct-tool-exclusive',event=>{
  const reason=event.detail?.reason||'';
  if(!launchedFromHub)return;
  if(reason==='bevel-complete'||reason==='bevel-cancel'||reason==='bevel-exact-complete'){
    launchedFromHub=false;
    palette.hidden=true;
    cancelAnimationFrame(raf);
  }
});

document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>{
  if(launchedFromHub&&button.dataset.mode!==launchMode)closeSession();
}));

globalThis.__boxlabBevelViewportSession={
  element:palette,
  active:()=>launchedFromHub&&!palette.hidden,
  edgeActive:()=>launchedFromHub&&launchMode==='edge',
  sync,
  cancel:()=>closeSession({restoreSelection:true})
};

window.addEventListener('boxlab-face-bevel-preview',event=>{if(launchMode==='face')palette.querySelector('.shbs-note').textContent=event.detail?.ok?'Blue preview only • Apply Bevel to commit':event.detail?.reason||'Preview unavailable';});

window.addEventListener('boxlab-viewport-background-tap',()=>{if(launchedFromHub&&launchMode==='edge'&&!globalThis.__boxlabDirectBevel?.busy?.())closeSession();});
window.addEventListener('boxlab-edge-bevel-operation-complete',()=>{if(launchedFromHub&&launchMode==='edge'){launchSelection=currentEdgeSelection();sync();}});
