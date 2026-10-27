const MAX_LINES=12;
const MAX_BACKGROUND_LINES=6;
const QUIET_STAGES=new Set(['PEN HOVER SWALLOW','PEN ORBIT MOVE FORWARD']);
let enabled=false;
let panel=null,body=null,backgroundBody=null,contactBody=null,seq=0;
const PREF_KEY='boxlab-gesture-debug';

function ensurePanel(){
  if(panel||!enabled)return;
  panel=document.createElement('div');
  panel.id='boxlabGestureDebug';
  panel.style.cssText=[
    'position:fixed','right:8px','bottom:42px','z-index:99999',
    'width:min(390px,46vw)','max-height:42vh','overflow:hidden',
    'padding:8px 9px','border:1px solid rgba(255,255,255,.28)',
    'border-radius:8px','background:rgba(8,10,14,.92)','color:#fff',
    'font:11px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace',
    'pointer-events:none','box-shadow:0 8px 24px rgba(0,0,0,.35)'
  ].join(';');
  const title=document.createElement('div');
  title.textContent='GESTURE DEBUG';
  title.style.cssText='font-weight:800;margin-bottom:5px;opacity:.9';
  backgroundBody=document.createElement('div');
  backgroundBody.style.cssText='border-bottom:1px solid #ffffff35;padding-bottom:5px;margin-bottom:5px;color:#a9d7ff';
  backgroundBody.textContent='BACKGROUND TAP — waiting for test';
  contactBody=document.createElement('div');
  contactBody.style.cssText='color:#ffd69c;border-bottom:1px solid #ffffff35;margin-bottom:5px';
  body=document.createElement('div');
  panel.append(title,contactBody,backgroundBody,body);
  document.body.appendChild(panel);
}
function compact(detail){
  if(detail==null)return'';
  if(typeof detail==='string')return detail;
  try{
    return Object.entries(detail).map(([k,v])=>{
      if(v==null)return `${k}=null`;
      if(Array.isArray(v))return `${k}=[${v.join(',')}]`;
      if(typeof v==='object')return `${k}=${JSON.stringify(v)}`;
      return `${k}=${String(v)}`;
    }).join(' ');
  }catch{return String(detail);}
}
function log(stage,detail=null){
  if(!enabled||QUIET_STAGES.has(stage))return;
  ensurePanel();
  const line=document.createElement('div');
  const n=String(++seq).padStart(2,'0');
  line.textContent=`${n} ${stage}${detail==null?'':` • ${compact(detail)}`}`;
  if(stage==='PHYSICAL CONTACT'){
    const summary=document.createElement('div');summary.textContent=line.textContent;
    contactBody.prepend(summary);
    while(contactBody.children.length>4)contactBody.lastElementChild.remove();
  }
  if(stage.startsWith('BACKGROUND ')||stage.startsWith('LINKED ')){
    if(!backgroundBody.children.length)backgroundBody.textContent='';
    const summary=document.createElement('div');summary.textContent=line.textContent;
    backgroundBody.prepend(summary);
    while(backgroundBody.children.length>MAX_BACKGROUND_LINES)backgroundBody.lastElementChild.remove();
  }
  body?.prepend(line);
  while(body?.children.length>MAX_LINES)body.lastElementChild?.remove();
}
function clear(){if(contactBody)contactBody.textContent='';if(body)body.textContent='';if(backgroundBody)backgroundBody.textContent='BACKGROUND TAP — waiting for test';seq=0;}
function setEnabled(next,{persist=true}={}){
  enabled=!!next;
  if(persist){try{localStorage.setItem(PREF_KEY,enabled?'1':'0');}catch{}}
  if(enabled){ensurePanel();log('DEBUG ENABLED');installDeepCaptureTrace();}
  else{displayRefresh.cancel();canvasProbe.show();panel?.remove();panel=null;body=null;backgroundBody=null;contactBody=null;seq=0;}
  window.dispatchEvent(new CustomEvent('boxlab-gesture-debug-change',{detail:{enabled}}));
  return enabled;
}
function enable(){return setEnabled(true);}
function disable(){return setEnabled(false);}
function toggle(){return setEnabled(!enabled);}
try{enabled=localStorage.getItem(PREF_KEY)==='1';}catch{}
globalThis.__boxlabGestureDebug={log,clear,enable,disable,toggle,setEnabled,get enabled(){return enabled;}};
queueMicrotask(()=>{if(enabled){ensurePanel();installDeepCaptureTrace();log('DEBUG READY');}});

document.addEventListener('pointerdown',event=>{
  log('RAW POINTERDOWN',{pointer:event.pointerType,pid:event.pointerId,pressure:event.pressure,buttons:event.buttons,target:event.target?.id||event.target?.tagName||'unknown'});
},true);
const debugCanvas=document.querySelector('#viewport');
debugCanvas?.addEventListener('pointerdown',event=>{
  log('RAW CANVAS CAPTURE',{pointer:event.pointerType,pid:event.pointerId,pressure:event.pressure,buttons:event.buttons,target:event.target?.id||event.target?.tagName||'unknown'});
},{capture:true});
debugCanvas?.addEventListener('pointerdown',event=>{
  log('RAW CANVAS BUBBLE',{pointer:event.pointerType,pid:event.pointerId,pressure:event.pressure,buttons:event.buttons,target:event.target?.id||event.target?.tagName||'unknown'});
});

let deepTraceInstalled=false;
function installDeepCaptureTrace(){
  if(deepTraceInstalled)return true;
  const canvas=document.querySelector('#viewport');
  if(!canvas)return false;
  const priorAdd=canvas.addEventListener.bind(canvas);
  const priorRemove=canvas.removeEventListener.bind(canvas);
  const wrapped=new WeakMap();
  let seq=0;
  function isCapture(options){return options===true||!!(options&&typeof options==='object'&&options.capture);}
  canvas.addEventListener=function(type,listener,options){
    if(type==='pointerdown'&&isCapture(options)&&listener){
      const id=++seq;
      const label=typeof listener==='function'?(listener.name||'anonymous'):(listener?.handleEvent?.name||'handleEvent');
      let stack='';
      try{stack=(new Error()).stack?.split('\n').slice(2,5).join(' | ')||'';}catch{}
      const fn=typeof listener==='function'
        ? function(event){
            log('CAPTURE ENTER',{id,label,pid:event.pointerId});
            const before=event.cancelBubble;
            try{return listener.call(this,event);}
            finally{log('CAPTURE EXIT',{id,label,before,after:event.cancelBubble});}
          }
        : {
            handleEvent(event){
              log('CAPTURE ENTER',{id,label,pid:event.pointerId});
              const before=event.cancelBubble;
              try{return listener.handleEvent(event);}
              finally{log('CAPTURE EXIT',{id,label,before,after:event.cancelBubble});}
            }
          };
      wrapped.set(listener,fn);
      log('CAPTURE REGISTER',{id,label,stack});
      return priorAdd(type,fn,options);
    }
    return priorAdd(type,listener,options);
  };
  canvas.removeEventListener=function(type,listener,options){
    return priorRemove(type,wrapped.get(listener)||listener,options);
  };
  deepTraceInstalled=true;
  log('DEEP CAPTURE TRACE INSTALLED');
  return true;
}

// Read-only early contact evidence; never consumes or claims a gesture.
for(const type of ['pointerdown','pointerup','pointercancel']){
  window.addEventListener(type,event=>{
    if(!enabled||event.target?.id!=='viewport')return;
    log('PHYSICAL CONTACT',{event:type,pointer:event.pointerType,pid:event.pointerId,stamp:Math.round(event.timeStamp),x:Math.round(event.clientX),y:Math.round(event.clientY),primary:event.isPrimary,buttons:event.buttons,pressure:event.pressure});
  },{capture:true,passive:true});
}

// Keep real browser failures visible alongside the linked transition trace.
window.addEventListener('error',event=>{
  if(enabled)log('LINKED RUNTIME ERROR',{message:event.message,file:event.filename?.split('/').pop(),line:event.lineno,column:event.colno});
});
window.addEventListener('unhandledrejection',event=>{
  if(enabled)log('LINKED ASYNC ERROR',{message:event.reason?.message||String(event.reason)});
});

// .965 UI evidence extends the existing opt-in debug owner. Never consumes input.
function createCanvasVisibilityProbe(canvas,busy=()=>false){
 let saved=null;
 function show(){
  if(!saved)return false;
  if(saved.value)canvas.style.setProperty('visibility',saved.value,saved.priority);
  else canvas.style.removeProperty('visibility');
  saved=null;return true;
 }
 function hide(){
  if(saved)return true;
  if(!canvas?.style?.setProperty||busy())return false;
  saved={value:canvas.style.getPropertyValue('visibility'),priority:canvas.style.getPropertyPriority('visibility')};
  canvas.style.setProperty('visibility','hidden','important');return true;
 }
 return {hide,show,active:()=>saved!==null};
}
// Explicit, user-triggered recovery over the SAME diagnostic visibility owner.
// Two frames allow one hidden canvas paint; the timer/lifecycle path always restores.
function createCanvasDisplayRefresh(probe,{requestFrame=f=>requestAnimationFrame(f),cancelFrame=id=>cancelAnimationFrame(id),setTimer=(f,ms)=>setTimeout(f,ms),clearTimer=id=>clearTimeout(id),onChange=()=>{}}={}){
 let pending=false,frames=[],timer=null;
 function finish(){
  if(!pending)return false;
  pending=false;
  for(const id of frames)cancelFrame(id);frames=[];
  if(timer!==null)clearTimer(timer);timer=null;
  probe.show();onChange(false);return true;
 }
 function start(){
  if(pending||probe.active()||!probe.hide())return false;
  pending=true;
  try{
   onChange(true);
   timer=setTimer(finish,250);
   frames.push(requestFrame(()=>{if(pending)frames.push(requestFrame(finish));}));
  }catch{finish();return false;}
  return true;
 }
 return {start,cancel:finish,active:()=>pending};
}
const canvasProbe=createCanvasVisibilityProbe(debugCanvas,()=>!!globalThis.__boxlabViewportPaint?.active||!!globalThis.__boxlabToolSession?.current?.()||!!globalThis.__boxlabActiveGizmoDrag||!!globalThis.__boxlabMainDirectTool?.busy?.()||!!globalThis.__boxlabFaceDirect?.dragging?.()||!!globalThis.__boxlabEdgeExtrude?.busy?.()||!!globalThis.__boxlabVertexExtrude?.busy?.()||!!globalThis.__boxlabDirectBevel?.busy?.());
let syncCanvasProbeControls=()=>{},updateDisplayRefresh=()=>{};
const displayRefresh=createCanvasDisplayRefresh(canvasProbe,{onChange:active=>{updateDisplayRefresh(active);syncCanvasProbeControls();evidence('display-refresh',{active});if(uiReport)uiReport.value='';}});
window.addEventListener('pagehide',()=>{displayRefresh.cancel();canvasProbe.show();syncCanvasProbeControls();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)displayRefresh.cancel();});
const uiEvidence=[];let uiControls=null,uiReport=null;
const describe=node=>node?{tag:node.tagName,id:node.id||'',class:String(node.className||'').slice(0,180)}:null;
function evidence(kind,data){if(!enabled)return;uiEvidence.push({at:Math.round(performance.now()),kind,data});if(uiEvidence.length>100)uiEvidence.shift();}
function uiControlEvidence(){
 const selectors=['.top-actions','#frameAllBtn','#undoBtn','#redoBtn','#focusViewBtn','#objectBrowserBtn','#viewModes','#objectBrowserPanel'];
 return selectors.map(selector=>{const node=document.querySelector(selector);if(!node)return {selector,present:false};const r=node.getBoundingClientRect(),s=getComputedStyle(node),x=Math.round(r.left+r.width/2),y=Math.round(r.top+r.height/2);return {selector,present:true,...describe(node),rect:{x:r.x,y:r.y,width:r.width,height:r.height},hidden:!!node.hidden,disabled:!!node.disabled,expanded:node.getAttribute?.('aria-expanded'),style:{display:s.display,visibility:s.visibility,pointerEvents:s.pointerEvents,opacity:s.opacity,zIndex:s.zIndex,transform:s.transform,overflow:s.overflow,contain:s.contain,isolation:s.isolation,willChange:s.willChange,clipPath:s.clipPath,filter:s.filter,backdropFilter:s.backdropFilter},centre:{x,y,inside:x>=0&&y>=0&&x<innerWidth&&y<innerHeight,stack:document.elementsFromPoint(x,y).slice(0,6).map(describe)}};});
}
// Read-only popup evidence: DOM/hit state is not proof that pixels were painted.
function viewMenuEvidence(){
 const read=selector=>{
  const node=document.querySelector(selector);if(!node)return {selector,present:false};
  const r=node.getBoundingClientRect(),style=getComputedStyle(node);
  return {selector,present:true,rect:{x:r.x,y:r.y,width:r.width,height:r.height},hidden:!!node.hidden,
   display:style.display,visibility:style.visibility,opacity:style.opacity,overflowX:style.overflowX,overflowY:style.overflowY,clipPath:style.clipPath,contain:style.contain,transform:style.transform,zIndex:style.zIndex,mixBlendMode:style.mixBlendMode,
   scrollTop:node.scrollTop??null,scrollHeight:node.scrollHeight??null,clientHeight:node.clientHeight??null};
 };
 const menu=document.querySelector('#viewModes'),picker=document.querySelector('#facegroupNames'),stroke=globalThis.__boxlabFacegroupStroke;
 return {open:menu?!!menu.open:null,renderMode:document.querySelector('#viewportRenderLooks [data-render].active')?.dataset?.render??null,
  selectionMode:globalThis.__boxlabSelectionBridge?.mode?.()??null,
  facegroupStroke:{armed:!!stroke?.armed,pointerId:stroke?.pointerId??null,mode:stroke?.armed?(stroke.group===null?'erase':'assign'):null},
  groupPicker:{present:!!picker,optionCount:picker?.options?.length??null,selectedIndex:picker?.selectedIndex??null,disabled:picker?!!picker.disabled:null},
  nodes:['#viewModes .viewport-menu-panel','#facegroupViewControls','#facegroupNames','#facegroupSaturation','#facegroupLightness','#facegroupReset','#boxlabStudioAtmosphere'].map(read)};
}
function uiSnapshot(){
 const rect=node=>{if(!node)return null;const r=node.getBoundingClientRect(),s=getComputedStyle(node);return {...describe(node),rect:{x:r.x,y:r.y,width:r.width,height:r.height},hidden:node.hidden,disabled:node.disabled,parentId:node.parentElement?.id||null,popover:node.getAttribute?.('popover')||null,topLayer:node.getAttribute?.('popover')==='manual'&&node.matches?.(':popover-open')===true,display:s.display,visibility:s.visibility,pointerEvents:s.pointerEvents,opacity:s.opacity,zIndex:s.zIndex,transform:s.transform,overflow:s.overflow,contain:s.contain,isolation:s.isolation,willChange:s.willChange,filter:s.filter,backdropFilter:s.backdropFilter};};
 const points=[.55,.8,.95].flatMap(x=>[.08,.5,.85].map(y=>({x:Math.round(innerWidth*x),y:Math.round(innerHeight*y)})));
 return {viewMenu:viewMenuEvidence(),canvasProbe:{hidden:canvasProbe.active()},release:document.querySelector('#appVersion')?.textContent,time:new Date().toISOString(),viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio,visual:window.visualViewport?{width:visualViewport.width,height:visualViewport.height,scale:visualViewport.scale,offsetLeft:visualViewport.offsetLeft,offsetTop:visualViewport.offsetTop}:null},session:globalThis.__boxlabToolSession?.current?.(),paint:!!globalThis.__boxlabViewportPaint?.active,controlsEnabled:globalThis.__boxlabBridgeState?.controls?.enabled,elements:['#app','.topbar','#viewportWrap','#viewport','#totalGizmo','#boxlabToolSessionHost','#meshHealthSession','#boxlabUVWorkspace','#viewportSelectionControls','#viewportPaintBtn','.statusbar'].map(q=>({selector:q,...rect(document.querySelector(q))})),controls:uiControlEvidence(),canvas:{width:debugCanvas?.width,height:debugCanvas?.height},hitTests:points.map(p=>({...p,stack:document.elementsFromPoint(p.x,p.y).slice(0,6).map(describe)})),events:uiEvidence.slice()};
}
function updateUIDebug(){
 if(!enabled){canvasProbe.show();uiControls?.remove();uiControls=null;uiReport=null;return;}
 if(uiControls)return;
 // Keep the debug output accessible from the left while diagnosing the right side.
 if(panel){panel.style.left='8px';panel.style.right='auto';panel.style.bottom='148px';panel.style.maxHeight='24vh';}
 uiControls=document.createElement('section');uiControls.id='boxlabUIDebugControls';uiControls.style.cssText='position:fixed;left:8px;bottom:48px;z-index:100001;width:min(340px,90vw);padding:8px;background:#10161ff5;border:1px solid #87bfff;border-radius:8px;color:white;font:11px system-ui;pointer-events:auto';
 const label=document.createElement('strong');label.textContent='UI DEBUG · capture when right side fails';
 const capture=document.createElement('button');capture.textContent='Capture report';
 const copy=document.createElement('button');copy.textContent='Copy report';
 const off=document.createElement('button');off.textContent='Debug off';
 const probe=document.createElement('button');probe.textContent='Hide 3D only';probe.id='uiDebugCanvasProbeBtn';
 const visible=document.createElement('button');visible.textContent='Right UI visible';
 const missing=document.createElement('button');missing.textContent='Still missing';
 visible.hidden=missing.hidden=true;
 const note=document.createElement('span');note.textContent='';note.setAttribute('role','status');
 uiReport=document.createElement('textarea');uiReport.readOnly=true;uiReport.setAttribute('aria-label','UI debug report');uiReport.style.cssText='display:none;width:100%;box-sizing:border-box;height:80px;font:10px monospace';
 capture.onclick=()=>{evidence('snapshot',{});uiReport.value=JSON.stringify(uiSnapshot(),null,2);uiReport.style.display='block';note.textContent='Report captured';};
 copy.onclick=async()=>{if(!uiReport.value)capture.click();try{await navigator.clipboard.writeText(uiReport.value);note.textContent='Copied';}catch{uiReport.style.display='block';uiReport.focus();uiReport.select();note.textContent='Select and copy the report';}};
 syncCanvasProbeControls=()=>{const active=canvasProbe.active();probe.disabled=visible.disabled=missing.disabled=displayRefresh.active();probe.textContent=active?'Show 3D again':'Hide 3D only';probe.setAttribute('aria-pressed',String(active));visible.hidden=missing.hidden=!active;};
 probe.onclick=()=>{
  if(displayRefresh.active())return;
  const hidden=canvasProbe.active();
  if(hidden)canvasProbe.show();
  else if(!canvasProbe.hide()){note.textContent='Finish the active tool or Paint before this test';return;}
  const active=canvasProbe.active();syncCanvasProbeControls();
  evidence('canvas-probe',{hidden:active,controls:uiControlEvidence()});uiReport.value='';
  note.textContent=active?'3D hidden. Are the right controls visible? Choose below, then Show 3D again.':'3D restored; model unchanged';
 };
 const observation=value=>{evidence('canvas-probe-observation',{hidden:canvasProbe.active(),rightUI:value});capture.click();note.textContent='Observation captured; Show 3D again, then Copy report';};
 visible.onclick=()=>observation('visible');missing.onclick=()=>observation('missing');
 off.onclick=disable;uiControls.style.maxHeight='45vh';uiControls.style.overflowY='auto';
 uiControls.append(label,document.createElement('br'),capture,copy,off,document.createElement('br'),probe,visible,missing,note,uiReport);document.body.appendChild(uiControls);
}
const uiDebugButton=document.createElement('button');uiDebugButton.type='button';uiDebugButton.textContent='UI Debug';uiDebugButton.title='Record input and layout evidence for inactive UI';uiDebugButton.onclick=toggle;document.querySelector('#fileMenu .top-file-content')?.appendChild(uiDebugButton);
const refreshDisplayButton=document.createElement('button');refreshDisplayButton.type='button';refreshDisplayButton.id='refreshDisplayBtn';refreshDisplayButton.textContent='Refresh display';refreshDisplayButton.title='Recover missing controls without reloading your model';
updateDisplayRefresh=active=>{refreshDisplayButton.disabled=active;refreshDisplayButton.textContent=active?'Refreshing display…':'Refresh display';if(!active){const status=document.querySelector('#selectionStatus');if(status)status.textContent='Display refreshed';}};
refreshDisplayButton.onclick=()=>{
 if(!displayRefresh.start()){const status=document.querySelector('#selectionStatus');if(status)status.textContent='Finish the active operation or Show 3D again before refreshing';return;}
 const menu=document.querySelector('#fileMenu');if(menu)menu.open=false;
};
document.querySelector('#fileMenu .top-file-content')?.appendChild(refreshDisplayButton);
globalThis.__boxlabGestureDebug.refreshDisplay=()=>displayRefresh.start();
window.addEventListener('boxlab-gesture-debug-change',updateUIDebug);queueMicrotask(updateUIDebug);
for(const type of ['pointerdown','pointerup','pointercancel'])window.addEventListener(type,event=>{if(!enabled)return;evidence(type,{pointer:event.pointerType,id:event.pointerId,x:event.clientX,y:event.clientY,target:describe(event.target),hit:describe(document.elementFromPoint(event.clientX,event.clientY)),buttons:event.buttons,defaultPrevented:event.defaultPrevented});if(type==='pointerdown')evidence('input-layout',{rightEdge:innerWidth,canvasWidth:debugCanvas?.width,canvasHeight:debugCanvas?.height,paint:!!globalThis.__boxlabViewportPaint?.active});},{capture:true,passive:true});
for(const type of ['resize','orientationchange','pageshow','blur','focus','boxlab-tool-session-change'])window.addEventListener(type,event=>{if(enabled)evidence(type,{detail:event.detail?.id||null,width:innerWidth,height:innerHeight,controls:uiControlEvidence()});});
window.addEventListener('error',event=>evidence('error',{message:event.message,file:event.filename,line:event.lineno}));window.addEventListener('unhandledrejection',event=>evidence('rejection',{message:event.reason?.message||String(event.reason)}));
for(const type of ['webglcontextlost','webglcontextrestored'])debugCanvas?.addEventListener(type,()=>evidence(type,{}));
globalThis.__boxlabGestureDebug.uiSnapshot=uiSnapshot;
queueMicrotask(()=>{if(enabled)evidence('debug-startup',{controls:uiControlEvidence()});});

for(const type of ['pointerdown','pointerup','click'])window.addEventListener(type,event=>evidence(type+'-bubble',{target:describe(event.target),defaultPrevented:event.defaultPrevented,...(type==='click'&&event.target?.closest?.('.top-actions')?{controls:uiControlEvidence()}: {})}),{passive:true});

window.addEventListener('toggle',event=>{if(enabled&&event.target?.id==='viewModes')evidence('view-toggle',viewMenuEvidence());},{capture:true,passive:true});
window.addEventListener('scroll',event=>{if(enabled&&event.target?.classList?.contains('viewport-menu-panel'))evidence('view-scroll',viewMenuEvidence());},{capture:true,passive:true});
