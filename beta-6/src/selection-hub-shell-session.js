import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.732';
const viewportWrap=document.querySelector('#viewportWrap');
const gizmo=()=>document.querySelector('#totalGizmo');
const source=()=>document.querySelector('#shellSession');

const palette=document.createElement('div');
palette.id='selectionHubShellSession';
palette.hidden=true;
palette.innerHTML=`
  <div class="shsh-head"><strong>Shell</strong><span>Viewport Session</span></div>
  <label class="shsh-range">
    <span>Thickness</span>
    <input type="range" data-proxy-range="#shellThickness"/>
    <output data-proxy-output="#shellThicknessOut"></output>
  </label>
  <div class="shsh-actions">
    <button type="button" class="shsh-cancel" data-proxy-click="#shellCancelBtn">Cancel</button>
    <button type="button" class="shsh-primary" data-proxy-click="#shellApplyBtn">Apply Shell</button>
  </div>
`;
viewportWrap?.appendChild(palette);

const style=document.createElement('style');
style.textContent=`
#selectionHubShellSession{position:absolute;z-index:134;width:246px;transform:translate(112px,-50%);padding:9px;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(16,19,24,.965);box-shadow:0 12px 32px rgba(0,0,0,.42);color:#eef2f7;pointer-events:auto;touch-action:none}
#selectionHubShellSession[hidden]{display:none}
#selectionHubShellSession .shsh-head{display:flex;align-items:baseline;justify-content:space-between;margin:0 1px 7px}
#selectionHubShellSession .shsh-head strong{font-size:13px}
#selectionHubShellSession .shsh-head span{font-size:10px;opacity:.56}
#selectionHubShellSession .shsh-range{display:grid;grid-template-columns:58px 1fr 42px;gap:7px;align-items:center;font-size:10px}
#selectionHubShellSession .shsh-range input{width:100%;min-width:0}
#selectionHubShellSession .shsh-range output{text-align:right;opacity:.8;font-variant-numeric:tabular-nums}
#selectionHubShellSession .shsh-actions{display:grid;grid-template-columns:1fr 1.35fr;gap:6px;margin-top:8px}
#selectionHubShellSession button{min-height:34px;margin:0;padding:6px;border:1px solid rgba(255,255,255,.12);border-radius:7px;background:rgba(255,255,255,.045);color:inherit;font-size:10px}
#selectionHubShellSession .shsh-primary{background:rgba(238,242,247,.92);color:#15171b;font-weight:750}
#selectionHubShellSession .shsh-cancel{border-color:rgba(255,120,120,.32)}
`;
document.head.appendChild(style);

let launchedFromHub=false;
let raf=0;

function src(selector){return document.querySelector(selector);}
function copyRange(proxy,target){
  if(!proxy||!target)return;
  for(const attr of ['min','max','step'])proxy.setAttribute(attr,target.getAttribute(attr)||'');
  if(document.activeElement!==proxy)proxy.value=target.value;
  proxy.disabled=!!target.disabled;
}
function sync(){
  cancelAnimationFrame(raf);
  const controls=source();
  const shellActive=!!globalThis.__boxlabShell?.active;
  const active=launchedFromHub&&controls&&!controls.hidden&&shellActive;
  palette.hidden=!active;
  if(!active){
    if(launchedFromHub&&(!shellActive||controls?.hidden))launchedFromHub=false;
    return;
  }

  const range=palette.querySelector('[data-proxy-range]');
  copyRange(range,src(range?.dataset.proxyRange));
  const output=palette.querySelector('[data-proxy-output]');
  const sourceOutput=src(output?.dataset.proxyOutput);
  if(output&&sourceOutput)output.textContent=sourceOutput.textContent||sourceOutput.value||'';

  for(const button of palette.querySelectorAll('[data-proxy-click]')){
    const target=src(button.dataset.proxyClick);
    button.disabled=!!target?.disabled;
  }

  placeToolSessionPanel(palette);
  raf=requestAnimationFrame(sync);
}

palette.addEventListener('pointerdown',event=>event.stopPropagation(),true);
palette.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});

palette.addEventListener('click',event=>{
  const button=event.target.closest('[data-proxy-click]');
  if(!button)return;
  event.preventDefault();
  event.stopPropagation();
  const target=src(button.dataset.proxyClick);
  if(!target||target.disabled)return;
  target.click();
  requestAnimationFrame(sync);
});

for(const proxy of palette.querySelectorAll('[data-proxy-range]')){
  const forwardInput=()=>{
    const target=src(proxy.dataset.proxyRange);
    if(!target)return;
    target.value=proxy.value;
    target.dispatchEvent(new Event('input',{bubbles:true}));
  };
  proxy.addEventListener('input',forwardInput);
  proxy.addEventListener('change',()=>{
    const target=src(proxy.dataset.proxyRange);
    if(!target)return;
    target.value=proxy.value;
    target.dispatchEvent(new Event('change',{bubbles:true}));
  });
}

window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(event.detail?.tool!=='Shell'||event.detail?.mode!=='face')return;
  launchedFromHub=true;
  requestAnimationFrame(()=>{
    sync();
    requestAnimationFrame(sync);
  });
});

window.addEventListener('boxlab-tool-session-change',event=>{
  const detail=event.detail||{};
  if(detail.id!=='shell')return;
  if(detail.active===false){
    const wasHub=launchedFromHub;
    launchedFromHub=false;
    palette.hidden=true;
    cancelAnimationFrame(raf);
    if(wasHub)window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{tool:'Shell',mode:'face'}}));
  }else if(launchedFromHub){
    requestAnimationFrame(sync);
  }
});

globalThis.__boxlabShellViewportSession={
  version:'0.36.18.690',
  element:palette,
  active:()=>launchedFromHub&&!palette.hidden,
  sync
};
