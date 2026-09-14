// BoxLab v0.36.18.223 — immediate Object-mode selection colours + full Studio redraw.
// Boolean geometry remains owned by boolean-prototype.js v0.36.18.217 and boolean-bsp.js v0.36.18.217.
import * as THREE from 'three';

const VERSION='0.36.18.223';
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('[data-mode-tools="object"]');
const outliner=document.querySelector('#outlinerList');
const editDrawer=document.querySelector('#editDrawer');
const COLOR_A=0xf3b34a,COLOR_B=0x5da9ff;
let pending=null,historyInstalled=false,restoring=false,selectionSyncQueued=false;
const booleanUndo=[],booleanRedo=[];
let tintedBodies=[];

function manager(){return globalThis.__boxlabObjectManager||null;}
function selection(){return globalThis.__boxlabObjectSelection||null;}
function sceneHistory(){return globalThis.__boxlabObjectHistory||null;}
function history(){return globalThis.__boxlabHistory||null;}
function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
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
      setStatus(`Undo ${tx.label} • restored A + B`);return current;
    }
    return baseUndo(current);
  };
  h.redo=function(current){
    const tx=booleanRedo[booleanRedo.length-1];
    if(tx&&currentSignature()===tx.beforeSig){
      booleanRedo.pop();booleanUndo.push(tx);restoreScene(tx.after);
      setStatus(`Redo ${tx.label} • restored Boolean result`);return current;
    }
    return baseRedo(current);
  };
  if(baseClear)h.clear=function(){booleanUndo.length=0;booleanRedo.length=0;return baseClear();};
  return true;
}

function beginBoolean(event){
  const button=event.target?.closest?.('[data-boolean217]');if(!button)return;
  installHistoryBridge();const before=captureScene();if(!before)return;
  pending={before,beforeSig:sceneSignature(before),beforeCount:before.objects?.length||0,operation:button.dataset.boolean217};
  setTimeout(finalizeBoolean,0);
}
function finalizeBoolean(){
  const p=pending;pending=null;if(!p)return;
  const after=captureScene();if(!after)return;
  if((after.objects?.length||0)!==p.beforeCount+1||after.activeId===p.before.activeId)return;
  const labels={difference:'Cut',intersection:'Intersect',union:'Union'},label=labels[p.operation]||'Boolean';
  booleanUndo.push({before:p.before,after,beforeSig:p.beforeSig,afterSig:sceneSignature(after),label});booleanRedo.length=0;
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
#booleanOperand218 .bool-a strong{color:var(--bool-a)}#booleanOperand218 .bool-b strong{color:var(--bool-b)}
#booleanOperand218 .bool-op strong{display:block;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#booleanOperand218 .bool-op span{opacity:.64;white-space:nowrap}#booleanOperand218 button{min-width:42px;padding:4px 5px;font-size:10px}
.outliner-row.boolean-operand-a{box-shadow:inset 3px 0 0 var(--bool-a)!important}.outliner-row.boolean-operand-b{box-shadow:inset 3px 0 0 var(--bool-b)!important}
.outliner-row.boolean-operand-a .outliner-name::before,.outliner-row.boolean-operand-b .outliner-name::before{display:inline-grid;place-items:center;width:15px;height:15px;border-radius:4px;margin-right:5px;font-size:9px;font-weight:800;vertical-align:1px;color:#111}
.outliner-row.boolean-operand-a .outliner-name::before{content:'A';background:var(--bool-a);outline:1px solid color-mix(in srgb,var(--bool-a) 70%,white)}
.outliner-row.boolean-operand-b .outliner-name::before{content:'B';background:var(--bool-b);outline:1px solid color-mix(in srgb,var(--bool-b) 70%,white)}
#booleanPrototype217 [data-boolean217="difference"]{background:linear-gradient(90deg,color-mix(in srgb,var(--bool-a) 20%,transparent) 0 46%,rgba(255,255,255,.035) 46% 54%,color-mix(in srgb,var(--bool-b) 20%,transparent) 54% 100%);border-color:rgba(255,255,255,.18)}
#booleanPrototype217 [data-boolean217="difference"] .bool-a-label{color:var(--bool-a);font-weight:800}#booleanPrototype217 [data-boolean217="difference"] .bool-b-label{color:var(--bool-b);font-weight:800}
`;
}
function keepBooleanToolsVisible(enabled){
  if(!editDrawer)return;
  if(enabled){editDrawer.dataset.keepOpen='true';editDrawer.open=true;}else delete editDrawer.dataset.keepOpen;
}
function ensureOperandUI(){
  installStyle();const group=document.querySelector('#booleanPrototype217');if(!group)return null;
  let panel=document.querySelector('#booleanOperand218');if(panel)return panel;
  panel=document.createElement('div');panel.id='booleanOperand218';
  const a=document.createElement('div');a.className='bool-op bool-a';
  const b=document.createElement('div');b.className='bool-op bool-b';
  const swap=document.createElement('button');swap.type='button';swap.id='booleanSwapAB218';swap.textContent='Swap';swap.title='Swap A / B Boolean operands';
  swap.addEventListener('click',event=>{
    event.preventDefault();event.stopPropagation();const e=operands();if(!e.ok)return;
    keepBooleanToolsVisible(true);manager()?.activate?.(e.b.id);keepBooleanToolsVisible(true);
    setStatus(`Boolean operands swapped • A ${e.b.name} • B ${e.a.name}`);queueSelectionSync();
  });
  panel.append(a,b,swap);group.firstElementChild?.after(panel);return panel;
}
function markOutliner(e){
  outliner?.querySelectorAll('.outliner-row').forEach(row=>row.classList.remove('boolean-operand-a','boolean-operand-b'));
  if(!e.ok)return;
  outliner?.querySelector(`.outliner-row[data-object-id="${e.a.id}"]`)?.classList.add('boolean-operand-a');
  outliner?.querySelector(`.outliner-row[data-object-id="${e.b.id}"]`)?.classList.add('boolean-operand-b');
}

function restoreViewportMaterials(){
  for(const entry of tintedBodies){
    if(entry.body&&entry.body.material===entry.tint)entry.body.material=entry.original;
    const list=Array.isArray(entry.tint)?entry.tint:[entry.tint];for(const mat of list)mat?.dispose?.();
  }
  tintedBodies=[];
}
function findBodyForObject(id,isActive){
  const scene=globalThis.__boxlabBridgeState?.scene;if(!scene)return null;let found=null;
  scene.traverse(object=>{
    if(found||!object.visible)return;
    if(isActive&&object.userData?.kind==='body')found=object;
    else if(!isActive&&object.userData?.kind==='boxlab-inactive-body'&&Number(object.userData?.objectId)===id)found=object;
  });
  return found;
}
function tintedMaterial(material,color,amount=.42){
  if(Array.isArray(material))return material.map(mat=>tintedMaterial(mat,color,amount));
  if(!material?.clone)return material;const clone=material.clone();
  clone.userData={...(clone.userData||{}),objectSelectionTint:true};
  if(clone.color?.isColor)clone.color.lerp(new THREE.Color(color),amount);
  if(clone.emissive?.isColor){clone.emissive.lerp(new THREE.Color(color),.10);clone.emissiveIntensity=Math.max(Number(clone.emissiveIntensity||0),.08);}
  clone.needsUpdate=true;return clone;
}
function applyBodyTint(body,color){
  if(!body?.material)return;const original=body.material,tint=tintedMaterial(original,color);if(tint===original)return;
  body.material=tint;tintedBodies.push({body,original,tint});
}
function requestViewportRender(){
  const state=globalThis.__boxlabBridgeState;
  const controls=state?.controls||state?.orbitControls;
  controls?.dispatchEvent?.({type:'change'});
  const fullRefresh=()=>document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  requestAnimationFrame(()=>{fullRefresh();requestAnimationFrame(fullRefresh);});
}
function syncSelectionColours(){
  restoreViewportMaterials();
  if(currentMode()!=='object'){requestViewportRender();return;}
  const m=manager(),ids=selection()?.ids;if(!m||!ids?.size){requestViewportRender();return;}
  const activeId=m.activeId;
  if(ids.has(activeId))applyBodyTint(findBodyForObject(activeId,true),COLOR_A);
  for(const id of ids){if(id===activeId)continue;applyBodyTint(findBodyForObject(id,false),COLOR_B);}
  requestViewportRender();
}

function syncUI(){
  selectionSyncQueued=false;
  const panel=ensureOperandUI(),e=operands();keepBooleanToolsVisible(e.ok);markOutliner(e);syncSelectionColours();if(!panel)return;
  const a=panel.querySelector('.bool-a'),b=panel.querySelector('.bool-b'),swap=panel.querySelector('#booleanSwapAB218');
  if(e.ok){
    a.innerHTML=`<strong>A · ${escapeHtml(e.a.name)}</strong><span>Active / Base</span>`;
    b.innerHTML=`<strong>B · ${escapeHtml(e.b.name)}</strong><span>Other / Cutter</span>`;if(swap)swap.disabled=false;
  }else{
    a.innerHTML='<strong>A · Active</strong><span>Base object</span>';
    b.innerHTML='<strong>B · Select second</strong><span>Other / Cutter</span>';if(swap)swap.disabled=true;
  }
  const cut=document.querySelector('#booleanPrototype217 [data-boolean217="difference"]');
  if(cut)cut.innerHTML='<span class="bool-a-label">A</span> − <span class="bool-b-label">B</span> · Cut';
}
function queueSelectionSync(){
  if(selectionSyncQueued)return;selectionSyncQueued=true;queueMicrotask(()=>setTimeout(syncUI,0));
}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

document.addEventListener('click',beginBoolean,true);
window.addEventListener('boxlab-object-manager-ready',()=>{installHistoryBridge();queueSelectionSync();});
window.addEventListener('boxlab-bridge-state',queueSelectionSync);
document.addEventListener('pointerup',queueSelectionSync,false);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',queueSelectionSync));
if(objectTools)new MutationObserver(queueSelectionSync).observe(objectTools,{childList:true});
if(outliner){
  new MutationObserver(mutations=>{if(mutations.some(m=>m.attributeName==='aria-selected'))queueSelectionSync();}).observe(outliner,{subtree:true,attributes:true,attributeFilter:['aria-selected']});
  new MutationObserver(queueSelectionSync).observe(outliner,{childList:true,subtree:true});
}
[0,80,250,700].forEach(delay=>setTimeout(()=>{installHistoryBridge();syncUI();},delay));

globalThis.__boxlabBooleanUX={version:VERSION,sync:syncUI,get undoCount(){return booleanUndo.length;},get redoCount(){return booleanRedo.length;}};
