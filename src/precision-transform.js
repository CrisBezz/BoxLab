// BoxLab v0.36.18.14 — precision Move / Scale / Rotate polish.
// Exact Rotate is committed here so it matches BoxLab's active legacy drag-rotate owner.
import * as THREE from 'three';

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
function axisVector(axis){return new THREE.Vector3(axis==='x'?1:0,axis==='y'?1:0,axis==='z'?1:0);}
function directFaceToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active,#extrudeBtn.boxlab-direct-stable,#insetBtn.boxlab-direct-stable');}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function selectionVertices(mesh,m,ids){if(!mesh)return[];if(m==='object')return mesh.vertices.map((_,i)=>i);const out=new Set();if(m==='vertex')ids.forEach(i=>{if(mesh.vertices[i])out.add(i);});else if(m==='edge'){const edges=mesh.edges();ids.forEach(i=>{const e=edges[i];if(e){out.add(e.a);out.add(e.b);}});}else if(m==='face')ids.forEach(i=>(mesh.faces[i]||[]).forEach(v=>out.add(v)));return [...out];}
function center(mesh,indices){if(!mesh||!indices.length)return null;const c=mesh.vertices[indices[0]]?.clone?.().set(0,0,0);if(!c)return null;for(const i of indices){const v=mesh.vertices[i];if(!v)return null;c.add(v);}return c.multiplyScalar(1/indices.length);}
function signedAmount(delta,axis){if(axis==='x')return delta.x;if(axis==='y')return delta.y;if(axis==='z')return delta.z;return delta.length();}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function updateHint(){const t=tool(),axis=explicitAxis();if(t==='move'){readout.textContent=axis?`Move ${axis.toUpperCase()} • enter exact distance or drag`:'Move • choose X, Y or Z for exact distance; Free/Auto remain drag modes';return;}if(t==='rotate'){const c=constraint();readout.textContent=axis?`Rotate ${axis.toUpperCase()} • enter exact degrees or drag`:c==='free'?'Rotate Free • exact value uses current view axis':'Rotate Auto • choose X, Y or Z for exact degrees';return;}if(t==='scale'){readout.textContent='Scale • enter exact factor or drag';return;}readout.textContent='Transform exact entry is available from the Value field';}

function applyExactRotate(n){const s=state(),mesh=s?.mesh,camera=s?.camera,m=mode(),ids=selected(),indices=selectionVertices(mesh,m,ids),c=center(mesh,indices);if(!mesh||!indices.length||!c){readout.textContent='Select geometry to rotate';return false;}const axis=explicitAxis();let av;if(axis)av=axisVector(axis);else if(constraint()==='free'&&camera){av=new THREE.Vector3();camera.getWorldDirection(av).normalize();}else{readout.textContent='Exact Rotate in Auto needs X, Y or Z';return false;}const before=mesh.clone(),q=new THREE.Quaternion().setFromAxisAngle(av,THREE.MathUtils.degToRad(n));globalThis.__boxlabHistory?.push(before);for(const i of indices)mesh.vertices[i].sub(c).applyQuaternion(q).add(c);render();if(status)status.textContent=`Rotate • ${axis?axis.toUpperCase():'View'} • ${n.toFixed(3)}°`;readout.textContent=`Rotate ${axis?axis.toUpperCase():'View'} exact • ${n.toFixed(3)}°`;input.value='';return true;}

function applyExact(){const t=tool(),n=Number(input.value);if(!Number.isFinite(n)||input.value.trim()===''){readout.textContent='Enter a value first';return;}if(t==='rotate'){applyExactRotate(n);return;}if(t!=='move'){input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true,cancelable:true}));return;}const axis=explicitAxis();if(!axis){readout.textContent='Exact Move needs an X, Y or Z constraint';return;}input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true,cancelable:true}));readout.textContent=`Move ${axis.toUpperCase()} exact • ${n.toFixed(3)}`;}

apply.addEventListener('click',applyExact);
input.addEventListener('keydown',event=>{if(event.key!=='Enter')return;if(tool()==='rotate'){event.preventDefault();event.stopImmediatePropagation();const n=Number(input.value);if(Number.isFinite(n)&&input.value.trim()!=='')applyExactRotate(n);else readout.textContent='Enter rotation degrees first';return;}if(tool()==='move'&&!explicitAxis()){event.preventDefault();event.stopImmediatePropagation();readout.textContent='Exact Move needs an X, Y or Z constraint';}},true);

let drag=null;
window.addEventListener('pointerdown',event=>{if(event.target!==canvas||!event.isPrimary||event.pointerType==='touch'||tool()!=='move'||directFaceToolActive())return;const s=state(),mesh=s?.mesh,ids=selected(),m=mode(),indices=selectionVertices(mesh,m,ids),c=center(mesh,indices);if(!mesh||!indices.length||!c)return;drag={id:event.pointerId,mesh,indices,start:c,axis:explicitAxis(),moved:false};},true);
window.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;const c=center(drag.mesh,drag.indices);if(!c)return;const delta=c.sub(drag.start),amount=signedAmount(delta,drag.axis);if(Math.abs(amount)<1e-8)return;drag.moved=true;readout.textContent=`Live Move${drag.axis?` ${drag.axis.toUpperCase()}`:''} • ${amount>=0?'+':''}${amount.toFixed(3)}`;},true);
window.addEventListener('pointerup',event=>{if(!drag||drag.id!==event.pointerId)return;if(!drag.moved)updateHint();drag=null;},true);
window.addEventListener('pointercancel',event=>{if(drag&&drag.id===event.pointerId)drag=null;},true);

new MutationObserver(()=>{if(tool()!=='rotate')return;const text=status?.textContent||'',match=text.match(/Rotate.*?([+-]?\d+(?:\.\d+)?)°/i);if(match)readout.textContent=`Live Rotate • ${Number(match[1]).toFixed(1)}°`;}).observe(status,{childList:true,characterData:true,subtree:true});

toolModes?.addEventListener('click',()=>queueMicrotask(updateHint));
precision.addEventListener('click',event=>{if(event.target.closest('[data-constraint]'))queueMicrotask(updateHint);});
window.addEventListener('boxlab-bridge-state',()=>{if(['move','rotate'].includes(tool())&&!drag)queueMicrotask(updateHint);});
updateHint();

globalThis.__boxlabPrecisionTransform={version:'0.36.18.14',apply:value=>{input.value=String(value);applyExact();}};
