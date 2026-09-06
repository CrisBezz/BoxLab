// BoxLab v0.36.18.13 — precision Move polish.
// Completes the existing transform numeric field without changing transform geometry.

const canvas=document.querySelector('#viewport');
const strip=document.querySelector('#transformStrip');
const precision=document.querySelector('#transformPrecision');
const input=document.querySelector('#transformValue');
const status=document.querySelector('#selectionStatus');
const toolModes=document.querySelector('#toolModes');

if(!canvas||!strip||!precision||!input) throw new Error('Precision Transform UI dependencies missing');

const apply=document.createElement('button');
apply.type='button';
apply.id='transformValueApply';
apply.textContent='Apply';
apply.style.cssText='padding:5px 8px;white-space:nowrap';
precision.append(apply);

const readout=document.createElement('div');
readout.id='precisionTransformReadout';
readout.style.cssText='font-size:10px;opacity:.72;margin:3px 4px 1px;min-height:12px';
readout.textContent='Move: choose X, Y or Z for an exact distance';
strip.append(readout);

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function tool(){return document.querySelector('#toolModes button.active')?.dataset?.tool||null;}
function constraint(){return precision.querySelector('[data-constraint].active')?.dataset?.constraint||globalThis.__boxlabTransformArming?.constraint?.()||'free';}
function explicitAxis(){const c=constraint();return ['x','y','z'].includes(c)?c:null;}
function directFaceToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active,#extrudeBtn.boxlab-direct-stable,#insetBtn.boxlab-direct-stable');}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function selectionVertices(mesh,m,ids){if(!mesh)return[];if(m==='object')return mesh.vertices.map((_,i)=>i);const out=new Set();if(m==='vertex')ids.forEach(i=>{if(mesh.vertices[i])out.add(i);});else if(m==='edge'){const edges=mesh.edges();ids.forEach(i=>{const e=edges[i];if(e){out.add(e.a);out.add(e.b);}});}else if(m==='face')ids.forEach(i=>(mesh.faces[i]||[]).forEach(v=>out.add(v)));return [...out];}
function center(mesh,indices){if(!mesh||!indices.length)return null;const c=mesh.vertices[indices[0]]?.clone?.().set(0,0,0);if(!c)return null;for(const i of indices){const v=mesh.vertices[i];if(!v)return null;c.add(v);}return c.multiplyScalar(1/indices.length);}
function signedAmount(delta,axis){if(axis==='x')return delta.x;if(axis==='y')return delta.y;if(axis==='z')return delta.z;return delta.length();}
function updateHint(){if(tool()!=='move'){readout.textContent='Transform exact entry is available from the Value field';return;}const axis=explicitAxis();readout.textContent=axis?`Move ${axis.toUpperCase()} • enter exact distance or drag`:'Move • choose X, Y or Z for exact distance; Free/Auto remain drag modes';}

function applyExact(){if(tool()!=='move'){input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true,cancelable:true}));return;}const axis=explicitAxis(),n=Number(input.value);if(!axis){readout.textContent='Exact Move needs an X, Y or Z constraint';return;}if(!Number.isFinite(n)||input.value.trim()===''){readout.textContent='Enter a Move distance first';return;}input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true,cancelable:true}));readout.textContent=`Move ${axis.toUpperCase()} exact • ${n.toFixed(3)}`;}

apply.addEventListener('click',applyExact);
input.addEventListener('keydown',event=>{if(event.key!=='Enter'||tool()!=='move')return;if(explicitAxis())return;event.preventDefault();event.stopImmediatePropagation();readout.textContent='Exact Move needs an X, Y or Z constraint';},true);

let drag=null;
window.addEventListener('pointerdown',event=>{if(event.target!==canvas||!event.isPrimary||event.pointerType==='touch'||tool()!=='move'||directFaceToolActive())return;const s=state(),mesh=s?.mesh,ids=selected(),m=mode(),indices=selectionVertices(mesh,m,ids),c=center(mesh,indices);if(!mesh||!indices.length||!c)return;drag={id:event.pointerId,mesh,indices,start:c,axis:explicitAxis(),moved:false};},true);
window.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;const c=center(drag.mesh,drag.indices);if(!c)return;const delta=c.sub(drag.start),amount=signedAmount(delta,drag.axis);if(Math.abs(amount)<1e-8)return;drag.moved=true;readout.textContent=`Live Move${drag.axis?` ${drag.axis.toUpperCase()}`:''} • ${amount>=0?'+':''}${amount.toFixed(3)}`;},true);
window.addEventListener('pointerup',event=>{if(!drag||drag.id!==event.pointerId)return;if(!drag.moved)updateHint();drag=null;},true);
window.addEventListener('pointercancel',event=>{if(drag&&drag.id===event.pointerId)drag=null;},true);

toolModes?.addEventListener('click',()=>queueMicrotask(updateHint));
precision.addEventListener('click',event=>{if(event.target.closest('[data-constraint]'))queueMicrotask(updateHint);});
window.addEventListener('boxlab-bridge-state',()=>{if(tool()==='move'&&!drag)queueMicrotask(updateHint);});
updateHint();

globalThis.__boxlabPrecisionTransform={version:'0.36.18.13',apply:value=>{input.value=String(value);applyExact();}};
