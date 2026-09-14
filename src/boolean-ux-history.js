// BoxLab v0.36.18.219 — Boolean operand colour clarity + Swap drawer preservation.
// Geometry remains owned by boolean-prototype.js v0.36.18.217 and boolean-bsp.js v0.36.18.217.
const VERSION='0.36.18.219';
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('[data-mode-tools="object"]');
const outliner=document.querySelector('#outlinerList');
const editDrawer=document.querySelector('#editDrawer');
let pending=null,historyInstalled=false,restoring=false;
const booleanUndo=[],booleanRedo=[];

function manager(){return globalThis.__boxlabObjectManager||null;}
function selection(){return globalThis.__boxlabObjectSelection||null;}
function sceneHistory(){return globalThis.__boxlabObjectHistory||null;}
function history(){return globalThis.__boxlabHistory||null;}
function selectedObjects(){
  const m=manager(),ids=selection()?.ids;if(!m||!ids)return[];
  m.saveActive?.();return (m.objects||[]).filter(o=>ids.has(o.id));
}
function operands(){
  const m=manager(),chosen=selectedObjects();
  if(!m||chosen.length!==2)return{ok:false,chosen};
  const a=chosen.find(o=>o.id===m.activeId),b=chosen.find(o=>o.id!==m.activeId);
  return a&&b?{ok:true,a,b,chosen}:{ok:false,chosen};
}
function captureScene(){const api=sceneHistory();manager()?.saveActive?.();return api?.capture?.()||null;}
function sceneSignature(snapshot){
  if(!snapshot)return'';
  const objects=(snapshot.objects||[]).map(o=>`${o.id}:${o.visible!==false?1:0}:${o.locked?1:0}`).join(',');
  const selected=[...(snapshot.selected||[])].sort((a,b)=>a-b).join(',');
  return `${snapshot.activeId}|${objects}|${selected}|${snapshot.multi?1:0}`;
}
function currentSignature(){return sceneSignature(captureScene());}
function restoreScene(snapshot){
  if(!snapshot)return false;
  restoring=true;
  try{sceneHistory()?.restore?.(snapshot);}finally{restoring=false;}
  setTimeout(()=>{globalThis.__boxlabTopologyGate?.sync?.();syncUI();},0);
  return true;
}
function setStatus(text){if(status)status.textContent=text;}

function installHistoryBridge(){
  const h=history();if(!h||historyInstalled||h.__boxlabBooleanScene218)return !!h;
  historyInstalled=true;h.__boxlabBooleanScene218=true;
  const basePush=h.push.bind(h),baseUndo=h.undo.bind(h),baseRedo=h.redo.bind(h),baseClear=h.clear?.bind(h);
  h.push=function(mesh){if(!restoring&&booleanRedo.length)booleanRedo.length=0;return basePush(mesh);};
  h.undo=function(current){
    const tx=booleanUndo[booleanUndo.length-1];
    if(tx&&!this.undoStack?.length&&currentSignature()===tx.afterSig){
      booleanUndo.pop();booleanRedo.push(tx);restoreScene(tx.before);
      setStatus(`Undo ${tx.label} • restored A + B`);
      return current;
    }
    return baseUndo(current);
  };
  h.redo=function(current){
    const tx=booleanRedo[booleanRedo.length-1];
    if(tx&&currentSignature()===tx.beforeSig){
      booleanRedo.pop();booleanUndo.push(tx);restoreScene(tx.after);
      setStatus(`Redo ${tx.label} • restored Boolean result`);
      return current;
    }
    return baseRedo(current);
  };
  if(baseClear)h.clear=function(){booleanUndo.length=0;booleanRedo.length=0;return baseClear();};
  return true;
}

function beginBoolean(event){
  const button=event.target?.closest?.('[data-boolean217]');if(!button)return;
  installHistoryBridge();
  const before=captureScene();if(!before)return;
  pending={before,beforeSig:sceneSignature(before),beforeCount:before.objects?.length||0,operation:button.dataset.boolean217};
  setTimeout(finalizeBoolean,0);
}
function finalizeBoolean(){
  const p=pending;pending=null;if(!p)return;
  const after=captureScene();if(!after)return;
  if((after.objects?.length||0)!==p.beforeCount+1||after.activeId===p.before.activeId)return;
  const labels={difference:'Cut',intersection:'Intersect',union:'Union'},label=labels[p.operation]||'Boolean';
  const tx={before:p.before,after,beforeSig:p.beforeSig,afterSig:sceneSignature(after),label};
  booleanUndo.push(tx);booleanRedo.length=0;
}

function installStyle(){
  let s=document.querySelector('#boxlabBooleanOperandStyle218');
  if(!s){s=document.createElement('style');s.id='boxlabBooleanOperandStyle218';document.head.appendChild(s);}
  s.textContent=`
:root{--bool-a:#f3b34a;--bool-b:#5da9ff}
#booleanOperand218{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;gap:4px;align-items:stretch;margin:5px 0 6px}
#booleanOperand218 .bool-op{min-width:0;border:1px solid rgba(255,255,255,.11);border-radius:7px;padding:5px 6px;font-size:9px;line-height:1.25;overflow:hidden}
#booleanOperand218 .bool-a{background:color-mix(in srgb,var(--bool-a) 12%,transparent);border-color:color-mix(in srgb,var(--bool-a) 52%,transparent)}
#booleanOperand218 .bool-b{background:color-mix(in srgb,var(--bool-b) 11%,transparent);border-color:color-mix(in srgb,var(--bool-b) 50%,transparent)}
#booleanOperand218 .bool-a strong{color:var(--bool-a)}
#booleanOperand218 .bool-b strong{color:var(--bool-b)}
#booleanOperand218 .bool-op strong{display:block;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#booleanOperand218 .bool-op span{opacity:.64;white-space:nowrap}
#booleanOperand218 button{min-width:42px;padding:4px 5px;font-size:10px}
.outliner-row.boolean-operand-a{box-shadow:inset 3px 0 0 var(--bool-a)!important}
.outliner-row.boolean-operand-b{box-shadow:inset 3px 0 0 var(--bool-b)!important}
.outliner-row.boolean-operand-a .outliner-name::before,.outliner-row.boolean-operand-b .outliner-name::before{display:inline-grid;place-items:center;width:15px;height:15px;border-radius:4px;margin-right:5px;font-size:9px;font-weight:800;vertical-align:1px;color:#111}
.outliner-row.boolean-operand-a .outliner-name::before{content:'A';background:var(--bool-a);outline:1px solid color-mix(in srgb,var(--bool-a) 70%,white)}
.outliner-row.boolean-operand-b .outliner-name::before{content:'B';background:var(--bool-b);outline:1px solid color-mix(in srgb,var(--bool-b) 70%,white)}
#booleanPrototype217 [data-boolean217="difference"]{background:linear-gradient(90deg,color-mix(in srgb,var(--bool-a) 20%,transparent) 0 46%,rgba(255,255,255,.035) 46% 54%,color-mix(in srgb,var(--bool-b) 20%,transparent) 54% 100%);border-color:rgba(255,255,255,.18)}
#booleanPrototype217 [data-boolean217="difference"] .bool-a-label{color:var(--bool-a);font-weight:800}
#booleanPrototype217 [data-boolean217="difference"] .bool-b-label{color:var(--bool-b);font-weight:800}
`;
}
function ensureOperandUI(){
  installStyle();const group=document.querySelector('#booleanPrototype217');if(!group)return null;
  let panel=document.querySelector('#booleanOperand218');if(panel)return panel;
  panel=document.createElement('div');panel.id='booleanOperand218';
  const a=document.createElement('div');a.className='bool-op bool-a';
  const b=document.createElement('div');b.className='bool-op bool-b';
  const swap=document.createElement('button');swap.type='button';swap.id='booleanSwapAB218';swap.textContent='Swap';swap.title='Swap A / B Boolean operands';
  swap.addEventListener('click',event=>{
    event.preventDefault();event.stopPropagation();
    const e=operands();if(!e.ok)return;
    const drawerWasOpen=!!editDrawer?.open;
    manager()?.activate?.(e.b.id);
    if(editDrawer)editDrawer.open=drawerWasOpen;
    setStatus(`Boolean operands swapped • A ${e.b.name} • B ${e.a.name}`);
    setTimeout(()=>{if(editDrawer)editDrawer.open=drawerWasOpen;syncUI();},0);
  });
  panel.append(a,b,swap);
  const label=group.firstElementChild;label?.after(panel);
  return panel;
}
function markOutliner(e){
  outliner?.querySelectorAll('.outliner-row').forEach(row=>{row.classList.remove('boolean-operand-a','boolean-operand-b');});
  if(!e.ok)return;
  const ar=outliner?.querySelector(`.outliner-row[data-object-id="${e.a.id}"]`),br=outliner?.querySelector(`.outliner-row[data-object-id="${e.b.id}"]`);
  ar?.classList.add('boolean-operand-a');br?.classList.add('boolean-operand-b');
}
function syncUI(){
  const panel=ensureOperandUI(),e=operands();markOutliner(e);if(!panel)return;
  const a=panel.querySelector('.bool-a'),b=panel.querySelector('.bool-b'),swap=panel.querySelector('#booleanSwapAB218');
  if(e.ok){
    a.innerHTML=`<strong>A · ${escapeHtml(e.a.name)}</strong><span>Active / Base</span>`;
    b.innerHTML=`<strong>B · ${escapeHtml(e.b.name)}</strong><span>Other / Cutter</span>`;
    if(swap)swap.disabled=false;
  }else{
    a.innerHTML='<strong>A · Active</strong><span>Base object</span>';
    b.innerHTML='<strong>B · Select second</strong><span>Other / Cutter</span>';
    if(swap)swap.disabled=true;
  }
  const cut=document.querySelector('#booleanPrototype217 [data-boolean217="difference"]');
  if(cut)cut.innerHTML='<span class="bool-a-label">A</span> − <span class="bool-b-label">B</span> · Cut';
}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

document.addEventListener('click',beginBoolean,true);
window.addEventListener('boxlab-object-manager-ready',()=>{installHistoryBridge();setTimeout(syncUI,0);});
window.addEventListener('boxlab-bridge-state',()=>setTimeout(syncUI,0));
document.addEventListener('pointerup',()=>setTimeout(syncUI,0),true);
if(objectTools)new MutationObserver(()=>queueMicrotask(syncUI)).observe(objectTools,{childList:true});
if(outliner)new MutationObserver(()=>queueMicrotask(syncUI)).observe(outliner,{childList:true});
[0,80,250,700].forEach(delay=>setTimeout(()=>{installHistoryBridge();syncUI();},delay));

globalThis.__boxlabBooleanUX={version:VERSION,sync:syncUI,get undoCount(){return booleanUndo.length;},get redoCount(){return booleanRedo.length;}};
