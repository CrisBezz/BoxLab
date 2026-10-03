const viewportWrap=document.querySelector('#viewportWrap');
const gizmo=()=>document.querySelector('#totalGizmo');
const source=()=>document.querySelector('#sweepPathControls');

const palette=document.createElement('div');
palette.id='selectionHubSweepSession';
palette.hidden=true;
palette.innerHTML=`
  <div class="shs-head"><strong>Sweep</strong><span>Viewport Session</span></div>
  <div class="shs-tabs">
    <button type="button" data-proxy-click="#sweepStageProfile">Profile</button>
    <button type="button" data-proxy-click="#sweepStagePath">Path</button>
    <button type="button" data-proxy-click="#sweepStageFinish">Finish</button>
  </div>
  <div class="shs-panel" data-stage="profile">
    <div class="shs-grid shs-grid-2">
      <button type="button" data-proxy-click="#sweepProfileCircle">Circle</button>
      <button type="button" data-proxy-click="#sweepProfileRect">Rectangle</button>
      <button type="button" data-proxy-click="#sweepProfileDraw">Draw</button>
      <button type="button" data-proxy-click="#sweepProfileUseSelection">Use Selection</button>
    </div>
    <label class="shs-range"><span>Size</span><input type="range" data-proxy-range="#sweepProfileSize"/><output data-proxy-output="#sweepProfileSizeOut"></output></label>
    <label class="shs-range"><span>Sides</span><input type="range" data-proxy-range="#sweepProfileSides"/><output data-proxy-output="#sweepProfileSidesOut"></output></label>
    <div class="shs-grid shs-grid-4">
      <button type="button" data-proxy-click="#sweepEditProfile">Edit</button>
      <button type="button" data-proxy-click="#sweepProfileClosed">Closed</button>
      <button type="button" data-proxy-click="#sweepUndoProfile">Undo</button>
      <button type="button" data-proxy-click="#sweepClearProfile">Clear</button>
    </div>
  </div>
  <div class="shs-panel" data-stage="path" hidden>
    <div class="shs-grid shs-grid-2">
      <button type="button" data-proxy-click="#sweepFollowEdges">Follow Edges</button>
      <button type="button" data-proxy-click="#sweepDrawPath">Draw Path</button>
    </div>
    <div class="shs-grid shs-grid-4">
      <button type="button" data-proxy-click="#sweepEditPath">Edit</button>
      <button type="button" data-proxy-click="#sweepUndoPath">Undo</button>
      <button type="button" data-proxy-click="#sweepDeletePath">Delete</button>
      <button type="button" data-proxy-click="#sweepClearPath">Clear</button>
    </div>
  </div>
  <div class="shs-panel" data-stage="finish" hidden>
    <div class="shs-grid shs-grid-2">
      <button type="button" data-proxy-click="#sweepCapsBtn">Caps</button>
      <button type="button" class="shs-primary" data-proxy-click="#sweepApplyBtn">Apply Sweep</button>
    </div>
  </div>
  <button type="button" class="shs-cancel" data-proxy-click="#sweepCancelBtn">Cancel Sweep</button>
`;
viewportWrap?.appendChild(palette);

const style=document.createElement('style');
style.textContent=`
#selectionHubSweepSession{position:absolute;z-index:134;width:286px;transform:translate(112px,-50%);padding:9px;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(16,19,24,.965);box-shadow:0 12px 32px rgba(0,0,0,.42);color:#eef2f7;pointer-events:auto;touch-action:none}
#selectionHubSweepSession[hidden]{display:none}
#selectionHubSweepSession .shs-head{display:flex;align-items:baseline;justify-content:space-between;margin:0 1px 7px}
#selectionHubSweepSession .shs-head strong{font-size:13px}
#selectionHubSweepSession .shs-head span{font-size:10px;opacity:.56}
#selectionHubSweepSession .shs-tabs,#selectionHubSweepSession .shs-grid{display:grid;gap:5px}
#selectionHubSweepSession .shs-tabs{grid-template-columns:repeat(3,1fr);margin-bottom:7px}
#selectionHubSweepSession .shs-grid-2{grid-template-columns:repeat(2,1fr)}
#selectionHubSweepSession .shs-grid-4{grid-template-columns:repeat(4,1fr);margin-top:6px}
#selectionHubSweepSession button{min-height:32px;margin:0;padding:5px 6px;border:1px solid rgba(255,255,255,.12);border-radius:7px;background:rgba(255,255,255,.045);color:inherit;font-size:10px;line-height:1.05}
#selectionHubSweepSession button.active,#selectionHubSweepSession button[aria-pressed="true"]{background:#eef2f7;color:#15171b}
#selectionHubSweepSession .shs-primary{background:rgba(238,242,247,.92);color:#15171b;font-weight:750}
#selectionHubSweepSession .shs-cancel{width:100%;margin-top:7px;border-color:rgba(255,120,120,.32)}
#selectionHubSweepSession .shs-range{display:grid;grid-template-columns:42px 1fr 40px;gap:6px;align-items:center;margin-top:7px;font-size:10px}
#selectionHubSweepSession .shs-range input{width:100%;min-width:0}
#selectionHubSweepSession .shs-range output{text-align:right;opacity:.78;font-variant-numeric:tabular-nums}
`;
document.head.appendChild(style);

let launchedFromHub=false;
let raf=0;

function src(selector){return document.querySelector(selector);}
function proxyClick(button){
  const target=src(button.dataset.proxyClick);
  if(!target||target.disabled)return;
  target.click();
  requestAnimationFrame(sync);
}
function copyButtonState(proxy,target){
  if(!proxy||!target)return;
  proxy.disabled=!!target.disabled;
  proxy.classList.toggle('active',target.classList.contains('active'));
  const pressed=target.getAttribute('aria-pressed');
  if(pressed!==null)proxy.setAttribute('aria-pressed',pressed);else proxy.removeAttribute('aria-pressed');
  const text=(target.textContent||'').trim();
  if(target.id==='sweepCapsBtn')proxy.textContent=text||'Caps';
  else if(target.id==='sweepFollowEdges')proxy.textContent=text.includes('Active')?'Follow · Active':'Follow Edges';
  else if(target.id==='sweepDrawPath')proxy.textContent=text.includes('Active')?'Draw · Active':'Draw Path';
}
function copyRange(proxy,target){
  if(!proxy||!target)return;
  for(const attr of ['min','max','step'])proxy.setAttribute(attr,target.getAttribute(attr)||'');
  if(document.activeElement!==proxy)proxy.value=target.value;
  proxy.disabled=!!target.disabled;
}
function currentStage(){
  const controls=source();
  if(!controls)return'profile';
  if(!controls.querySelector('#sweepFinishPanel')?.hidden)return'finish';
  if(!controls.querySelector('#sweepPathPanel')?.hidden)return'path';
  return'profile';
}
function sync(){
  cancelAnimationFrame(raf);
  const controls=source();
  const active=launchedFromHub&&controls&&!controls.hidden;
  palette.hidden=!active;
  if(!active){
    if(launchedFromHub&&controls?.hidden)launchedFromHub=false;
    return;
  }

  const stage=currentStage();
  palette.querySelectorAll('.shs-panel').forEach(panel=>panel.hidden=panel.dataset.stage!==stage);
  for(const proxy of palette.querySelectorAll('[data-proxy-click]')){
    const target=src(proxy.dataset.proxyClick);
    copyButtonState(proxy,target);
  }
  for(const proxy of palette.querySelectorAll('[data-proxy-range]')){
    copyRange(proxy,src(proxy.dataset.proxyRange));
  }
  for(const output of palette.querySelectorAll('[data-proxy-output]')){
    const target=src(output.dataset.proxyOutput);
    if(target)output.textContent=target.textContent||target.value||'';
  }

  const tg=gizmo();
  if(tg){
    palette.style.left=tg.style.left||'50%';
    palette.style.top=tg.style.top||'50%';
  }
  raf=requestAnimationFrame(sync);
}

palette.addEventListener('pointerdown',event=>event.stopPropagation(),true);
palette.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});
palette.addEventListener('click',event=>{
  const button=event.target.closest('[data-proxy-click]');
  if(!button)return;
  event.preventDefault();
  event.stopPropagation();
  proxyClick(button);
});

for(const proxy of palette.querySelectorAll('[data-proxy-range]')){
  const forward=()=>{
    const target=src(proxy.dataset.proxyRange);
    if(!target)return;
    target.value=proxy.value;
    target.dispatchEvent(new Event('input',{bubbles:true}));
  };
  proxy.addEventListener('input',forward);
  proxy.addEventListener('change',()=>{
    const target=src(proxy.dataset.proxyRange);
    if(!target)return;
    target.value=proxy.value;
    target.dispatchEvent(new Event('change',{bubbles:true}));
  });
}

window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(event.detail?.tool!=='Sweep'||event.detail?.mode!=='face')return;
  launchedFromHub=true;
  requestAnimationFrame(()=>{
    sync();
    requestAnimationFrame(sync);
  });
});

window.addEventListener('boxlab-tool-session-end',event=>{
  if(event.detail?.id!=='sweep')return;
  const wasHub=launchedFromHub;
  launchedFromHub=false;
  palette.hidden=true;
  if(wasHub)window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{tool:'Sweep',mode:'face'}}));
});

globalThis.__boxlabSweepViewportSession={
  version:'0.36.18.690',
  element:palette,
  active:()=>launchedFromHub&&!palette.hidden,
  sync
};
