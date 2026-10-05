import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.732';

// Presentation only: persistent Loop/Split stay with their existing gesture owners.
const panel=document.createElement('div');
panel.id='edgeToolViewportSession';panel.hidden=true;
panel.innerHTML=`<strong class="ets-title">Edge Tool</strong><p class="ets-note"></p>
<label data-loop-control><span>Loops</span><input type="range" data-source="#loopCutCount"/><output></output></label>
<label data-loop-control><span>Loop Slide</span><input type="range" data-source="#loopSlide"/><output></output></label>
<button type="button" class="ets-done">Done</button>`;
document.querySelector('#viewportWrap')?.appendChild(panel);
const style=document.createElement('style');
style.textContent='#edgeToolViewportSession{padding:10px;border:1px solid #ffffff30;border-radius:12px;background:rgba(16,19,24,.965);color:#eef2f7;font-size:12px;pointer-events:auto;touch-action:none}#edgeToolViewportSession[hidden],#edgeToolViewportSession [hidden]{display:none!important}#edgeToolViewportSession label{display:grid;grid-template-columns:65px 1fr 40px;gap:6px;align-items:center}#edgeToolViewportSession input{width:100%;min-width:0}#edgeToolViewportSession button{min-height:34px}';
document.head.appendChild(style);
let session=null,raf=0;
const main=()=>globalThis.__boxlabMainDirectTool;
const split=()=>globalThis.__boxlabFaceSplit;
const bridge=()=>globalThis.__boxlabSelectionBridge;
function close({disarm=true,complete=true}={}){
  if(!session)return true;
  if(disarm&&main()?.busy?.())return false;
  const tool=session.tool;
  if(disarm){
    if(tool==='Loop'&&main()?.active?.()==='loopCut'&&!main()?.finishLoopCut?.())return false;
    if(tool==='Split')split()?.disarm?.();
  }
  session=null;panel.hidden=true;cancelAnimationFrame(raf);
  if(complete)window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'edge',tool}}));
  return true;
}
function sync(){
  cancelAnimationFrame(raf);if(!session)return;
  const active=session.tool==='Loop'?main()?.active?.()==='loopCut':split()?.isArmed?.();
  if(bridge()?.mode?.()!=='edge'||globalThis.__boxlabBridgeState?.mesh!==session.mesh||document.querySelector('#app')?.classList.contains('boxlab-active-locked')||!active){if(!close({disarm:active,complete:true}))raf=requestAnimationFrame(sync);return;}
  panel.hidden=false;
  const pending=session.tool==='Loop'&&!!globalThis.__boxlabLoopCutCommit?.pending?.();
  panel.querySelector('.ets-done').textContent=session.tool==='Loop'?'EXACT':'Done';
  panel.querySelector('.ets-done').disabled=!!main()?.busy?.()||(session.tool==='Loop'&&!pending);
  for(const input of panel.querySelectorAll('[data-source]')){
    const source=document.querySelector(input.dataset.source);
    input.parentElement.hidden=session.tool!=='Loop'||(input.dataset.source==='#loopCutCount'?pending:!pending);
    if(!source)continue;
    for(const attr of ['min','max','step'])input.setAttribute(attr,source.getAttribute(attr)||'');
    if(document.activeElement!==input)input.value=source.value;
    input.disabled=source.disabled||!!main()?.busy?.();
    input.parentElement.querySelector('output').textContent=source.value+(source.id==='loopSlide'?'%':'');
  }
  placeToolSessionPanel(panel);raf=requestAnimationFrame(sync);
}
panel.addEventListener('pointerdown',event=>event.stopPropagation(),true);
panel.querySelector('.ets-done').addEventListener('click',event=>{event.preventDefault();event.stopPropagation();if(session?.tool==='Loop'){if(main()?.busy?.())return;if(globalThis.__boxlabLoopCutCommit?.commitCurrent?.())session.mesh=globalThis.__boxlabBridgeState?.mesh;sync();}else close();});
for(const input of panel.querySelectorAll('[data-source]'))for(const type of ['input','change'])input.addEventListener(type,()=>{
  if(!session||session.tool!=='Loop'||main()?.busy?.())return;
  const source=document.querySelector(input.dataset.source);if(!source||source.disabled)return;
  source.value=input.value;source.dispatchEvent(new Event(type,{bubbles:true}));sync();
});
window.addEventListener('boxlab-selection-hub-tool',event=>{
  const {mode,tool}=event.detail||{};
  if(mode!=='edge'||!['Loop','Split'].includes(tool)){close();return;}
  close({disarm:false,complete:false});
  session={tool,mesh:globalThis.__boxlabBridgeState?.mesh};
  panel.querySelector('.ets-title').textContent=tool==='Loop'?'Loop Cut':'Split';
  panel.querySelector('.ets-note').textContent=tool==='Loop'?'Tap/drag an edge, then adjust Loop Slide. EXACT confirms; tap another edge for another cut. Background tap exits.':'Tap two non-adjacent boundary edges of the same face. Done or background tap exits; completed splits are kept.';
  sync();
});
globalThis.__boxlabEdgeViewportSession={active:()=>!!session,loopActive:()=>session?.tool==='Loop',close,sync,element:panel};

window.addEventListener('boxlab-viewport-background-tap',()=>{if(session&&!main()?.busy?.()){if(session.tool==='Loop'&&globalThis.__boxlabLoopCutCommit?.pending?.())globalThis.__boxlabLoopCutCommit?.commitCurrent?.();if(session)session.mesh=globalThis.__boxlabBridgeState?.mesh;close();}});
