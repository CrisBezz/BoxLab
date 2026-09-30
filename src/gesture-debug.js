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
