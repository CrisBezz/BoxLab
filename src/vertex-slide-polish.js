import * as THREE from 'three';

// BoxLab v0.36.18.23 — Vertex Slide polish.
// Owns Vertex Slide only. Edge Slide remains in component-slide.js unchanged.

const canvas=document.querySelector('#viewport');
const button=document.querySelector('#vertexSlideBtn');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const status=document.querySelector('#selectionStatus');
if(!canvas||!button||!vertexTools) throw new Error('Vertex Slide polish UI dependencies missing');

const row=document.createElement('div');
row.id='precisionVertexSlideRow';
row.style.cssText='display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;margin:6px 0 2px';
const label=document.createElement('span');label.textContent='Slide %';label.style.cssText='font-size:10px;opacity:.72';
const input=document.createElement('input');input.type='number';input.inputMode='decimal';input.step='0.1';input.min='-98';input.max='98';input.placeholder='± %';input.style.cssText='min-width:0;width:100%;box-sizing:border-box;padding:5px 6px;border-radius:6px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.055);color:inherit;font:inherit';
const apply=document.createElement('button');apply.type='button';apply.textContent='Apply';apply.style.cssText='padding:5px 8px';
row.append(label,input,apply);
const anchor=button.closest('.outliner-actions');
anchor?.insertAdjacentElement('afterend',row);

const readout=document.createElement('div');
readout.id='precisionVertexSlideReadout';
readout.style.cssText='font-size:10px;opacity:.72;margin:2px 0 4px;min-height:12px';
readout.textContent='Vertex Slide • drag along connected edges';
row.insertAdjacentElement('afterend',readout);

let armed=false,drag=null;
const START_PX=7,PICK_PX=28;
function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function selected(){const b=bridge();return b?.mode?.()==='vertex'?[...new Set(b.indices?.()||[])]:[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function neighbours(m,v){const out=[];for(const e of m.edges()){if(e.a===v)out.push(e.b);else if(e.b===v)out.push(e.a);}return [...new Set(out)].filter(i=>m.vertices[i]);}
function screenPoint(v){const cam=state()?.camera;if(!cam||!v)return null;const p=v.clone().project(cam),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}
function nearVertex(event,m,v){const p=screenPoint(m.vertices[v]);return !!p&&p.distanceTo(new THREE.Vector2(event.clientX,event.clientY))<=PICK_PX;}
function compatible(m,ids){if(!m||!ids.length)return false;if(ids.length===1)return neighbours(m,ids[0]).length>0;return ids.every(v=>neighbours(m,v).length===2);}
function sync(){const m=mesh(),ids=selected(),ok=compatible(m,ids);button.disabled=!ok;if(!ok&&armed){armed=false;button.classList.remove('active');}readout.textContent=!ids.length?'Vertex Slide • select vertex/vertices':ids.length>1&&!ok?'Multi Vertex Slide needs two connected rails per vertex':'Vertex Slide • drag along connected edges';}

function stableDirectionKey(point){return [point.x,point.y,point.z];}
function comparePoints(a,b){const A=stableDirectionKey(a),B=stableDirectionKey(b);for(let i=0;i<3;i++){if(Math.abs(A[i]-B[i])>1e-9)return A[i]-B[i];}return 0;}
function signedTarget(m,v,sign){
  const ns=neighbours(m,v);if(!ns.length)return null;
  const ordered=[...ns].sort((ia,ib)=>comparePoints(m.vertices[ia],m.vertices[ib]));
  return sign>=0?ordered[ordered.length-1]:ordered[0];
}
function exactTargets(m,ids,sign){
  const targets=new Map();
  if(ids.length===1){
    const v=ids[0],target=signedTarget(m,v,sign);if(!Number.isInteger(target))return null;targets.set(v,target);return targets;
  }
  for(const v of ids){
    const ns=neighbours(m,v);if(ns.length!==2)return null;
    const ordered=[...ns].sort((ia,ib)=>comparePoints(m.vertices[ia],m.vertices[ib]));
    targets.set(v,sign>=0?ordered[1]:ordered[0]);
  }
  return targets;
}
function applyExact(){
  const m=mesh(),ids=selected(),raw=Number(input.value);
  if(!m||!ids.length){readout.textContent='Select vertex/vertices first';return;}
  if(!Number.isFinite(raw)||input.value.trim()===''){readout.textContent='Enter a signed slide percentage';return;}
  if(Math.abs(raw)<1e-6){readout.textContent='Enter a non-zero slide percentage';return;}
  const pct=Math.max(-98,Math.min(98,raw)),targets=exactTargets(m,ids,Math.sign(pct));
  if(!targets){readout.textContent=ids.length>1?'Multi exact Slide needs two connected rails per vertex':'Vertex has no connected slide edge';return;}
  const before=m.clone(),t=Math.abs(pct)/100;globalThis.__boxlabHistory?.push(before);
  for(const [v,target] of targets)m.vertices[v].copy(before.vertices[v]).lerp(before.vertices[target],t);
  render();bridge()?.set?.('vertex',ids);
  const text=`${ids.length>1?`Multi Vertex (${ids.length})`:'Vertex'} Slide • ${pct>0?'+':''}${pct.toFixed(1)}%`;
  readout.textContent=text;if(status)status.textContent=text;
}
apply.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();applyExact();});
input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();applyExact();input.blur();}});

// Capture the button before the legacy component-slide bubble handler so only
// the new Vertex Slide owner arms; Edge Slide ownership is unaffected.
button.addEventListener('click',event=>{
  if(button.disabled)return;
  event.preventDefault();event.stopImmediatePropagation();
  armed=!armed;button.classList.toggle('active',armed);
  if(status)status.textContent=armed?`${selected().length>1?`Multi Vertex (${selected().length})`:'Vertex'} Slide • Pencil-drag selected vertex`:'Vertex Slide off';
},true);

function chooseSingleTarget(d,start,dx,dy){
  const motion=new THREE.Vector2(dx,dy);if(motion.lengthSq()<1)return null;motion.normalize();let best=null;
  for(const n of d.neighbourMap.get(start)||[]){const a=screenPoint(d.before.vertices[start]),b=screenPoint(d.before.vertices[n]);if(!a||!b)continue;const rail=b.sub(a),len=rail.length();if(len<2)continue;const score=motion.dot(rail.clone().normalize());if(!best||score>best.score)best={target:n,rail,score};}
  return best;
}
function chooseMultiTargets(d,dx,dy){
  const motion=new THREE.Vector2(dx,dy);if(motion.lengthSq()<1)return null;motion.normalize();const targets=new Map();let seedRail=null;
  for(const v of d.ids){let best=null;const origin=screenPoint(d.before.vertices[v]);if(!origin)return null;for(const n of d.neighbourMap.get(v)||[]){const p=screenPoint(d.before.vertices[n]);if(!p)continue;const rail=p.clone().sub(origin),len=rail.length();if(len<2)continue;const score=motion.dot(rail.clone().normalize());if(!best||score>best.score)best={target:n,rail,score};}if(!best)return null;targets.set(v,best.target);if(v===d.seed)seedRail=best.rail;}
  return seedRail?{targets,rail:seedRail}:null;
}

canvas.addEventListener('pointerdown',event=>{
  if(!armed||!event.isPrimary)return;
  const m=mesh(),ids=selected();if(!compatible(m,ids))return;
  const seed=ids.find(v=>nearVertex(event,m,v));if(!Number.isInteger(seed))return;
  event.preventDefault();event.stopImmediatePropagation();
  const neighbourMap=new Map(ids.map(v=>[v,neighbours(m,v)]));
  drag={pointerId:event.pointerId,m,before:m.clone(),ids,seed,neighbourMap,startX:event.clientX,startY:event.clientY,solution:null,changed:false};
  canvas.setPointerCapture?.(event.pointerId);
},true);

canvas.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;if(!drag.changed&&Math.hypot(dx,dy)<START_PX)return;
  if(!drag.changed){globalThis.__boxlabHistory?.push(drag.before);drag.changed=true;}
  if(!drag.solution){
    if(drag.ids.length===1){const s=chooseSingleTarget(drag,drag.seed,dx,dy);if(s)drag.solution={targets:new Map([[drag.seed,s.target]]),rail:s.rail};}
    else drag.solution=chooseMultiTargets(drag,dx,dy);
  }
  if(!drag.solution)return;
  const rail=drag.solution.rail,t=THREE.MathUtils.clamp(new THREE.Vector2(dx,dy).dot(rail)/Math.max(rail.lengthSq(),1),0,.98);
  for(const [v,target] of drag.solution.targets)drag.m.vertices[v].copy(drag.before.vertices[v]).lerp(drag.before.vertices[target],t);
  render();
  const text=`${drag.ids.length>1?`Multi Vertex (${drag.ids.length})`:'Vertex'} Slide • ${Math.round(t*100)}%`;
  readout.textContent=text;if(status)status.textContent=text;
},true);
function finish(event){if(!drag||drag.pointerId!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const d=drag;drag=null;render();bridge()?.set?.('vertex',d.ids);if(status)status.textContent=d.changed?`${d.ids.length>1?`Multi Vertex (${d.ids.length})`:'Vertex'} Slide committed`:'Vertex Slide cancelled';sync();}
canvas.addEventListener('pointerup',finish,true);canvas.addEventListener('pointercancel',finish,true);

window.addEventListener('boxlab-bridge-state',sync);
document.querySelector('#selectionModes')?.addEventListener('click',()=>queueMicrotask(()=>{armed=false;button.classList.remove('active');sync();}));
setTimeout(sync,0);

globalThis.__boxlabVertexSlidePolish={version:'0.36.18.23',apply:value=>{input.value=String(value);applyExact();}};
