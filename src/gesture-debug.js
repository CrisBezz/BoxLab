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
  else{panel?.remove();panel=null;body=null;backgroundBody=null;contactBody=null;seq=0;}
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
const uiEvidence=[];let uiControls=null,uiReport=null;
const describe=node=>node?{tag:node.tagName,id:node.id||'',class:String(node.className||'').slice(0,180)}:null;
function evidence(kind,data){if(!enabled)return;uiEvidence.push({at:Math.round(performance.now()),kind,data});if(uiEvidence.length>100)uiEvidence.shift();}
function uiSnapshot(){
 const rect=node=>{if(!node)return null;const r=node.getBoundingClientRect(),s=getComputedStyle(node);return {...describe(node),rect:{x:r.x,y:r.y,width:r.width,height:r.height},hidden:node.hidden,disabled:node.disabled,display:s.display,visibility:s.visibility,pointerEvents:s.pointerEvents,opacity:s.opacity,zIndex:s.zIndex,transform:s.transform,overflow:s.overflow,filter:s.filter,backdropFilter:s.backdropFilter};};
 const points=[.55,.8,.95].flatMap(x=>[.08,.5,.85].map(y=>({x:Math.round(innerWidth*x),y:Math.round(innerHeight*y)})));
 return {release:document.querySelector('#appVersion')?.textContent,time:new Date().toISOString(),viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio,visual:window.visualViewport?{width:visualViewport.width,height:visualViewport.height,scale:visualViewport.scale,offsetLeft:visualViewport.offsetLeft,offsetTop:visualViewport.offsetTop}:null},session:globalThis.__boxlabToolSession?.current?.(),paint:!!globalThis.__boxlabViewportPaint?.active,controlsEnabled:globalThis.__boxlabBridgeState?.controls?.enabled,elements:['#app','.topbar','#viewportWrap','#viewport','#totalGizmo','#boxlabToolSessionHost','#viewportSelectionControls','#viewportPaintBtn','.statusbar'].map(q=>({selector:q,...rect(document.querySelector(q))})),canvas:{width:debugCanvas?.width,height:debugCanvas?.height},hitTests:points.map(p=>({...p,stack:document.elementsFromPoint(p.x,p.y).slice(0,6).map(describe)})),events:uiEvidence.slice()};
}
function updateUIDebug(){
 if(!enabled){uiControls?.remove();uiControls=null;uiReport=null;return;}
 if(uiControls)return;
 // Keep the debug output accessible from the left while diagnosing the right side.
 if(panel){panel.style.left='8px';panel.style.right='auto';panel.style.bottom='148px';panel.style.maxHeight='24vh';}
 uiControls=document.createElement('section');uiControls.id='boxlabUIDebugControls';uiControls.style.cssText='position:fixed;left:8px;bottom:48px;z-index:100001;width:min(340px,90vw);padding:8px;background:#10161ff5;border:1px solid #87bfff;border-radius:8px;color:white;font:11px system-ui;pointer-events:auto';
 const label=document.createElement('strong');label.textContent='UI DEBUG · capture when right side fails';
 const capture=document.createElement('button');capture.textContent='Capture report';
 const copy=document.createElement('button');copy.textContent='Copy report';
 const off=document.createElement('button');off.textContent='Debug off';
 const note=document.createElement('span');note.textContent='';note.setAttribute('role','status');
 uiReport=document.createElement('textarea');uiReport.readOnly=true;uiReport.setAttribute('aria-label','UI debug report');uiReport.style.cssText='display:none;width:100%;box-sizing:border-box;height:80px;font:10px monospace';
 capture.onclick=()=>{evidence('snapshot',{});uiReport.value=JSON.stringify(uiSnapshot(),null,2);uiReport.style.display='block';note.textContent='Report captured';};
 copy.onclick=async()=>{if(!uiReport.value)capture.click();try{await navigator.clipboard.writeText(uiReport.value);note.textContent='Copied';}catch{uiReport.style.display='block';uiReport.focus();uiReport.select();note.textContent='Select and copy the report';}};
 off.onclick=disable;uiControls.append(label,document.createElement('br'),capture,copy,off,note,uiReport);document.body.appendChild(uiControls);
}
const uiDebugButton=document.createElement('button');uiDebugButton.type='button';uiDebugButton.textContent='UI Debug';uiDebugButton.title='Record input and layout evidence for inactive UI';uiDebugButton.onclick=toggle;document.querySelector('#fileMenu .top-file-content')?.appendChild(uiDebugButton);
window.addEventListener('boxlab-gesture-debug-change',updateUIDebug);queueMicrotask(updateUIDebug);
for(const type of ['pointerdown','pointerup','pointercancel'])window.addEventListener(type,event=>{if(!enabled)return;evidence(type,{pointer:event.pointerType,id:event.pointerId,x:event.clientX,y:event.clientY,target:describe(event.target),hit:describe(document.elementFromPoint(event.clientX,event.clientY)),buttons:event.buttons,defaultPrevented:event.defaultPrevented});if(type==='pointerdown')evidence('input-layout',{rightEdge:innerWidth,canvasWidth:debugCanvas?.width,canvasHeight:debugCanvas?.height,paint:!!globalThis.__boxlabViewportPaint?.active});},{capture:true,passive:true});
for(const type of ['resize','orientationchange','pageshow','blur','focus','boxlab-tool-session-change'])window.addEventListener(type,event=>evidence(type,{detail:event.detail?.id||null,width:innerWidth,height:innerHeight}));
window.addEventListener('error',event=>evidence('error',{message:event.message,file:event.filename,line:event.lineno}));window.addEventListener('unhandledrejection',event=>evidence('rejection',{message:event.reason?.message||String(event.reason)}));
for(const type of ['webglcontextlost','webglcontextrestored'])debugCanvas?.addEventListener(type,()=>evidence(type,{}));
globalThis.__boxlabGestureDebug.uiSnapshot=uiSnapshot;

for(const type of ['pointerdown','pointerup','click'])window.addEventListener(type,event=>evidence(type+'-bubble',{target:describe(event.target),defaultPrevented:event.defaultPrevented}),{passive:true});
