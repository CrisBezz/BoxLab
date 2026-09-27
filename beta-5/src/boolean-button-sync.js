// BoxLab v0.36.18.226 — keep Boolean button availability in sync with Outliner selection.
const outliner=document.querySelector('#outlinerList');
let queued=false;

function syncNow(){
  queued=false;
  globalThis.__boxlabBooleanPrototype?.sync?.();
}
function queueSync(){
  if(queued)return;
  queued=true;
  queueMicrotask(syncNow);
}

if(outliner){
  new MutationObserver(mutations=>{
    if(mutations.some(m=>m.attributeName==='aria-selected'))queueSync();
  }).observe(outliner,{subtree:true,attributes:true,attributeFilter:['aria-selected']});
}
window.addEventListener('boxlab-object-manager-ready',()=>setTimeout(syncNow,0));
[0,80,250,700].forEach(delay=>setTimeout(syncNow,delay));

globalThis.__boxlabBooleanButtonSync={version:'0.36.18.226',sync:syncNow};
