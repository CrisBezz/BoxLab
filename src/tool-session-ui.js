const drawer=document.querySelector('#editDrawer');
const contentRoot=drawer?.querySelector(':scope > .drawer-content')||drawer?.querySelector('.drawer-content');
const summary=drawer?.querySelector(':scope > summary')||drawer?.querySelector('summary');

const host=document.createElement('div');
host.id='boxlabToolSessionHost';
host.className='boxlab-tool-session-host';
host.hidden=true;
contentRoot?.prepend(host);

const style=document.createElement('style');
style.id='boxlabToolSessionStyle';
style.textContent=`
#editDrawer[data-tool-session-active="true"]>.drawer-content>:not(#boxlabToolSessionHost){display:none!important}
#boxlabToolSessionHost[hidden]{display:none!important}
#boxlabToolSessionHost{display:block!important}
.boxlab-tool-session-shell{display:flex;flex-direction:column;gap:7px}
.boxlab-tool-session-title{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;padding:1px 1px 3px}
.boxlab-tool-session-subtitle{font-size:10px;font-weight:400;opacity:.58;text-transform:none;letter-spacing:0}
.boxlab-tool-session-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}
.boxlab-tool-session-tabs button{min-height:34px;font-size:11px;padding:5px 4px}
.boxlab-tool-session-tabs button.active{box-shadow:inset 0 0 0 1px rgba(115,183,255,.75);background:rgba(74,134,205,.2)}
.boxlab-tool-session-panel[hidden]{display:none!important}
.boxlab-tool-session-panel{display:flex;flex-direction:column;gap:6px}
.boxlab-tool-session-panel .outliner-actions{margin:0}
.boxlab-tool-session-section{font-size:9.5px;opacity:.58;text-transform:uppercase;letter-spacing:.45px;margin-top:2px}
.boxlab-tool-session-primary{min-height:36px;font-weight:650}
`;
document.head.appendChild(style);

let active=null;

function restore(entry){
  if(!entry?.node)return;
  const {node,parent,next}=entry;
  if(parent?.isConnected){
    if(next?.parentNode===parent)parent.insertBefore(node,next); else parent.appendChild(node);
  }
}
function begin({id,title,node,subtitle=''}={}){
  if(!drawer||!host||!node||!id)return false;
  if(active&&active.id!==id)end(active.id);
  if(!active){
    active={id,title,node,subtitle,parent:node.parentNode,next:node.nextSibling,summary:summary?.textContent||'Active Tools',keepOpen:drawer.dataset.keepOpen,open:drawer.open};
  }else{
    active.title=title||active.title;
    active.subtitle=subtitle||active.subtitle;
  }
  host.replaceChildren(node);
  host.hidden=false;
  drawer.dataset.toolSessionActive='true';
  drawer.dataset.keepOpen='true';
  drawer.open=true;
  if(summary)summary.textContent=title?'Active Tools · '+title:'Active Tools';
  window.dispatchEvent(new CustomEvent('boxlab-tool-session-change',{detail:{active:true,id,title}}));
  return true;
}
function end(id=null){
  if(!active)return false;
  if(id&&active.id!==id)return false;
  const old=active;active=null;
  restore(old);
  host.replaceChildren();
  host.hidden=true;
  delete drawer.dataset.toolSessionActive;
  if(old.keepOpen===undefined)delete drawer.dataset.keepOpen;else drawer.dataset.keepOpen=old.keepOpen;
  drawer.open=old.open!==false;
  if(summary)summary.textContent=old.summary||'Active Tools';
  window.dispatchEvent(new CustomEvent('boxlab-tool-session-change',{detail:{active:false,id:old.id,title:old.title}}));
  return true;
}
function isActive(id=null){return !!active&&(!id||active.id===id);}
function current(){return active?{id:active.id,title:active.title}:null;}

globalThis.__boxlabToolSession={begin,end,isActive,current,host};
