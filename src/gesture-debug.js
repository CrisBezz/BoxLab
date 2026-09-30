const MAX_LINES=18;
let enabled=false;
let panel=null,body=null,seq=0;
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
function setEnabled(next,{persist=true}={}){
  enabled=!!next;
  if(persist){try{localStorage.setItem(PREF_KEY,enabled?'1':'0');}catch{}}
  if(enabled){ensurePanel();log('DEBUG ENABLED');}
  else{panel?.remove();panel=null;body=null;seq=0;}
  window.dispatchEvent(new CustomEvent('boxlab-gesture-debug-change',{detail:{enabled}}));
  return enabled;
}
function enable(){return setEnabled(true);}
function disable(){return setEnabled(false);}
function toggle(){return setEnabled(!enabled);}
try{enabled=localStorage.getItem(PREF_KEY)==='1';}catch{}
globalThis.__boxlabGestureDebug={log,clear,enable,disable,toggle,setEnabled,get enabled(){return enabled;}};
queueMicrotask(()=>{if(enabled){ensurePanel();log('DEBUG READY');}});

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
