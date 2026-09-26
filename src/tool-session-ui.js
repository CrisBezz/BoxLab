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
.boxlab-tool-session-shell[hidden]{display:none!important}
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
#precisionVertexSlideRow,#precisionVertexSlideReadout,#precisionVertexBevelRow,#precisionVertexBevelRow + div,.vertex-bevel-options{display:none!important}
.mode-tools[data-mode-tools="vertex"]:has(#vertexSlideBtn.active) #precisionVertexSlideRow{display:grid!important}
.mode-tools[data-mode-tools="vertex"]:has(#vertexSlideBtn.active) #precisionVertexSlideReadout{display:block!important}
.mode-tools[data-mode-tools="vertex"]:has(#vertexBevelBtn.active) #precisionVertexBevelRow{display:grid!important}
.mode-tools[data-mode-tools="vertex"]:has(#vertexBevelBtn.active) #precisionVertexBevelRow + div{display:block!important}
.mode-tools[data-mode-tools="vertex"]:has(#vertexBevelBtn.active) .vertex-bevel-options{display:grid!important}

.mode-tools[data-mode-tools="edge"] .loop-cut-option,
.mode-tools[data-mode-tools="edge"] .loop-slide-option,
.mode-tools[data-mode-tools="edge"] .bevel-option > .range-row,
.mode-tools[data-mode-tools="edge"] .crease-options,
.mode-tools[data-mode-tools="edge"] #precisionEdgeBevelRow,
.mode-tools[data-mode-tools="edge"] #precisionEdgeBevelRow + div,
.mode-tools[data-mode-tools="edge"] #precisionEdgeSlideRow,
.mode-tools[data-mode-tools="edge"] #precisionEdgeSlideReadout,
.mode-tools[data-mode-tools="edge"] #precisionOffsetLoopRow,
.mode-tools[data-mode-tools="edge"] #precisionOffsetLoopReadout,
.mode-tools[data-mode-tools="edge"] .offset-option{display:none!important}
.mode-tools[data-mode-tools="edge"]:has(#loopCutBtn.active) .loop-cut-option,
.mode-tools[data-mode-tools="edge"]:has(#loopCutBtn.active) .loop-slide-option{display:grid!important}
.mode-tools[data-mode-tools="edge"]:has(#bevelBtn.active) .bevel-option > .range-row{display:grid!important}
.mode-tools[data-mode-tools="edge"]:has(#bevelBtn.active) #precisionEdgeBevelRow{display:grid!important}
.mode-tools[data-mode-tools="edge"]:has(#bevelBtn.active) #precisionEdgeBevelRow + div{display:block!important}
.mode-tools[data-mode-tools="edge"]:has(#applyCreaseBtn.active) .crease-options{display:block!important}
.mode-tools[data-mode-tools="edge"]:has(#edgeSlideBtn.active) #precisionEdgeSlideRow{display:grid!important}
.mode-tools[data-mode-tools="edge"]:has(#edgeSlideBtn.active) #precisionEdgeSlideReadout{display:block!important}
.mode-tools[data-mode-tools="edge"]:has(#offsetLoopBtn.active) #precisionOffsetLoopRow{display:grid!important}
.mode-tools[data-mode-tools="edge"]:has(#offsetLoopBtn.active) #precisionOffsetLoopReadout{display:block!important}
.mode-tools[data-mode-tools="edge"]:has(#offsetLoopBtn.active) .offset-option{display:grid!important}

.mode-tools[data-mode-tools="face"] #precisionFaceRow,
.mode-tools[data-mode-tools="face"] #precisionFaceReadout,
.mode-tools[data-mode-tools="face"] #repeatFacePreviousRow{display:none!important}
.mode-tools[data-mode-tools="face"]:has(#extrudeBtn.active) #precisionFaceRow,
.mode-tools[data-mode-tools="face"]:has(#extrudeBtn.active) #precisionFaceReadout,
.mode-tools[data-mode-tools="face"]:has(#extrudeBtn.active) #repeatFacePreviousRow,
.mode-tools[data-mode-tools="face"]:has(#insetBtn.active) #precisionFaceRow,
.mode-tools[data-mode-tools="face"]:has(#insetBtn.active) #precisionFaceReadout,
.mode-tools[data-mode-tools="face"]:has(#insetBtn.active) #repeatFacePreviousRow{display:grid!important}
.mode-tools[data-mode-tools="face"]:has(#extrudeBtn.active) #precisionFaceReadout,
.mode-tools[data-mode-tools="face"]:has(#insetBtn.active) #precisionFaceReadout{display:block!important}

.mode-tools[data-mode-tools="face"] .face-compact-row{margin:4px 0!important}
.mode-tools[data-mode-tools="face"] .face-compact-row button{min-height:32px!important;padding:4px 5px!important;font-size:10.5px!important}
.mode-tools[data-mode-tools="face"] .sweep-selection-launch-row:empty{display:none!important}
`;
document.head.appendChild(style);

function installEdgeControlOrder(){
  const edgeTools=document.querySelector('.mode-tools[data-mode-tools="edge"]');
  const loops=edgeTools?.querySelector('.loop-cut-option');
  const loopSlide=edgeTools?.querySelector('.loop-slide-option');
  if(loops&&loopSlide&&loops.nextElementSibling!==loopSlide)loops.insertAdjacentElement('afterend',loopSlide);
}
installEdgeControlOrder();

function ensureFaceCompactRow(faceTools,id){
  let row=document.querySelector('#'+id);
  if(row)return row;
  row=document.createElement('div');
  row.id=id;
  row.className='outliner-actions face-compact-row';
  row.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
  row.style.gap='4px';
  return row;
}
function moveButtonToRow(button,row){
  if(!button||!row)return false;
  if(button.parentElement!==row)row.appendChild(button);
  button.style.minWidth='0';
  button.style.width='100%';
  return true;
}
function installFaceControlOrder(){
  const faceTools=document.querySelector('.mode-tools[data-mode-tools="face"]');
  const title=faceTools?.querySelector(':scope > .panel-title');
  const primary=document.querySelector('#extrudeBtn')?.closest('.outliner-actions');
  const value=document.querySelector('#precisionFaceRow');
  const readout=document.querySelector('#precisionFaceReadout');
  const repeat=document.querySelector('#repeatFacePreviousRow');
  const sweep=document.querySelector('.sweep-selection-launch[data-sweep-selection-mode="face"]');
  const join=document.querySelector('#joinSelectedCoplanarFacesBtn');
  const extract=document.querySelector('#extractFacesBtn');
  const duplicate=document.querySelector('#duplicateFacesBtn');
  const bridge=document.querySelector('#bridgeFacesBtn');
  const del=document.querySelector('#deleteFaceBtn');
  const inspect=document.querySelector('#faceInspectDrawer');
  const repair=document.querySelector('#faceRepairDrawer');
  const gate=document.querySelector('#topologyValidityGate');
  if(!faceTools||!primary)return false;

  primary.id='facePrimaryCompactRow';
  primary.classList.add('face-compact-row');
  primary.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
  for(const button of [document.querySelector('#extrudeBtn'),document.querySelector('#insetBtn'),document.querySelector('#knifeBtn')]){
    moveButtonToRow(button,primary);
  }
  if(primary.parentElement!==faceTools){
    if(title?.parentElement===faceTools)title.insertAdjacentElement('afterend',primary);
    else faceTools.prepend(primary);
  }else if(title?.parentElement===faceTools&&title.nextElementSibling!==primary){
    title.insertAdjacentElement('afterend',primary);
  }

  let cursor=primary;
  for(const node of [value,readout,repeat]){
    if(!node)continue;
    if(node.parentElement!==faceTools||cursor.nextElementSibling!==node)cursor.insertAdjacentElement('afterend',node);
    cursor=node;
  }

  const secondary=ensureFaceCompactRow(faceTools,'faceSecondaryCompactRow');
  const tertiary=ensureFaceCompactRow(faceTools,'faceTertiaryCompactRow');
  for(const button of [sweep,join,del])moveButtonToRow(button,secondary);
  for(const button of [extract,duplicate,bridge])moveButtonToRow(button,tertiary);

  if(cursor.nextElementSibling!==secondary)cursor.insertAdjacentElement('afterend',secondary);
  if(secondary.nextElementSibling!==tertiary)secondary.insertAdjacentElement('afterend',tertiary);

  faceTools.querySelectorAll('.sweep-selection-launch-row:empty,.outliner-actions:empty').forEach(row=>{
    if(row!==primary&&row!==secondary&&row!==tertiary)row.style.display='none';
  });

  let tail=tertiary;
  for(const node of [inspect,repair,gate]){
    if(!node)continue;
    if(node.parentElement!==faceTools||tail.nextElementSibling!==node)tail.insertAdjacentElement('afterend',node);
    tail=node;
  }
  return true;
}
[0,80,250,600,800,1800,1950,2200].forEach(delay=>setTimeout(installFaceControlOrder,delay));
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(installFaceControlOrder));
document.addEventListener('pointerup',()=>queueMicrotask(()=>queueMicrotask(installFaceControlOrder)),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(installFaceControlOrder)));

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
function enforceOpenWhileActive(){
  if(!active||!drawer||drawer.open)return;
  drawer.open=true;
}
drawer?.addEventListener('toggle',()=>{
  if(active&&!drawer.open)queueMicrotask(enforceOpenWhileActive);
});
function isActive(id=null){return !!active&&(!id||active.id===id);}
function current(){return active?{id:active.id,title:active.title}:null;}

globalThis.__boxlabToolSession={begin,end,isActive,current,host};


function installBooleanToolSession(){
  const objectTools=document.querySelector('[data-mode-tools="object"]');
  const group=document.querySelector('#booleanPrototype217');
  if(!objectTools||!group)return false;
  if(document.querySelector('#booleanToolSessionLaunch'))return true;

  group.hidden=true;
  const launchRow=document.createElement('div');
  launchRow.id='booleanToolSessionLaunch';
  launchRow.className='outliner-actions boolean-launch-row';
  launchRow.style.gridTemplateColumns='1fr';
  launchRow.innerHTML='<button id="booleanLaunchBtn" type="button">Boolean</button>';
  group.insertAdjacentElement('beforebegin',launchRow);

  const closeRow=document.createElement('div');
  closeRow.className='outliner-actions boolean-session-close';
  closeRow.style.gridTemplateColumns='1fr';
  closeRow.innerHTML='<button id="booleanCloseBtn" type="button">Close</button>';
  group.appendChild(closeRow);

  const launch=launchRow.querySelector('#booleanLaunchBtn');
  const close=closeRow.querySelector('#booleanCloseBtn');
  const status=document.querySelector('#selectionStatus');

  const open=()=>{
    group.hidden=false;
    begin({id:'boolean',title:'Boolean',node:group,subtitle:'Union · Cut · Intersect'});
    globalThis.__boxlabBooleanPrototype?.sync?.();
  };
  const shut=({silent=false}={})=>{
    group.hidden=true;
    end('boolean');
    if(!silent&&status)status.textContent='Boolean closed';
  };

  launch?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();open();});
  close?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();shut();});
  window.addEventListener('boxlab-tool-session-change',event=>{
    const detail=event.detail||{};
    if(detail.id==='boolean'&&detail.active===false)group.hidden=true;
  });
  globalThis.__boxlabBooleanToolSession={version:'0.36.18.468',open,close:shut};
  return true;
}
[0,50,150,400,900].forEach(delay=>setTimeout(installBooleanToolSession,delay));
window.addEventListener('boxlab-object-manager-ready',()=>queueMicrotask(installBooleanToolSession));
