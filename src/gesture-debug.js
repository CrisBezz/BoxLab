const MAX_LINES=14;
let enabled=true;
let panel=null,body=null,seq=0;

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
  title.textContent='GESTURE DEBUG .621';
  title.style.cssText='font-weight:800;margin-bottom:5px;opacity:.9';
  body=document.createElement('div');
  panel.append(title,body);
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
  if(!enabled)return;
  ensurePanel();
  const line=document.createElement('div');
  const n=String(++seq).padStart(2,'0');
  line.textContent=`${n} ${stage}${detail==null?'':` • ${compact(detail)}`}`;
  body?.prepend(line);
  while(body?.children.length>MAX_LINES)body.lastElementChild?.remove();
}
function clear(){if(body)body.textContent='';seq=0;}
function enable(){enabled=true;ensurePanel();log('DEBUG ENABLED');}
function disable(){enabled=false;panel?.remove();panel=null;body=null;}
globalThis.__boxlabGestureDebug={log,clear,enable,disable,get enabled(){return enabled;}};
queueMicrotask(()=>{ensurePanel();log('DEBUG READY');});

document.addEventListener('pointerdown',event=>{
  log('RAW POINTERDOWN',{
    pointer:event.pointerType,
    pid:event.pointerId,
    pressure:event.pressure,
    buttons:event.buttons,
    target:event.target?.id||event.target?.tagName||'unknown'
  });
},true);

const debugCanvas=document.querySelector('#viewport');
debugCanvas?.addEventListener('pointerdown',event=>{
  log('RAW CANVAS CAPTURE',{
    pointer:event.pointerType,
    pid:event.pointerId,
    pressure:event.pressure,
    buttons:event.buttons,
    target:event.target?.id||event.target?.tagName||'unknown'
  });
},{capture:true});
debugCanvas?.addEventListener('pointerdown',event=>{
  log('RAW CANVAS BUBBLE',{
    pointer:event.pointerType,
    pid:event.pointerId,
    pressure:event.pressure,
    buttons:event.buttons,
    target:event.target?.id||event.target?.tagName||'unknown'
  });
});

const captureCanvas=document.querySelector('#viewport');
const nativeAddEventListener=EventTarget.prototype.addEventListener;
const nativeRemoveEventListener=EventTarget.prototype.removeEventListener;
const wrappedCaptureListeners=new WeakMap();
let captureListenerSeq=0;
function captureOption(options){
  return options===true || !!(options&&typeof options==='object'&&options.capture);
}
EventTarget.prototype.addEventListener=function(type,listener,options){
  if(this===captureCanvas&&type==='pointerdown'&&captureOption(options)&&listener){
    const id=++captureListenerSeq;
    const label=typeof listener==='function'?(listener.name||'anonymous'):(listener?.handleEvent?.name||'handleEvent');
    let stack='';
    try{stack=(new Error()).stack?.split('\n').slice(2,5).join(' | ')||'';}catch{}
    log('CAPTURE LISTENER REGISTER',{id,label,stack});
    const wrapped=typeof listener==='function'
      ? function(event){
          log('CAPTURE ENTER',{id,label,pid:event.pointerId,target:event.target?.id||event.target?.tagName||'unknown'});
          const before=event.cancelBubble;
          const result=listener.call(this,event);
          log('CAPTURE EXIT',{id,label,cancelBefore:before,cancelAfter:event.cancelBubble});
          return result;
        }
      : {
          handleEvent(event){
            log('CAPTURE ENTER',{id,label,pid:event.pointerId,target:event.target?.id||event.target?.tagName||'unknown'});
            const before=event.cancelBubble;
            const result=listener.handleEvent(event);
            log('CAPTURE EXIT',{id,label,cancelBefore:before,cancelAfter:event.cancelBubble});
            return result;
          }
        };
    wrappedCaptureListeners.set(listener,wrapped);
    return nativeAddEventListener.call(this,type,wrapped,options);
  }
  return nativeAddEventListener.call(this,type,listener,options);
};
EventTarget.prototype.removeEventListener=function(type,listener,options){
  const wrapped=wrappedCaptureListeners.get(listener);
  return nativeRemoveEventListener.call(this,type,wrapped||listener,options);
};
