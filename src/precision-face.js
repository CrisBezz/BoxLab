import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const extrudeButton=document.querySelector('#extrudeBtn');
const insetButton=document.querySelector('#insetBtn');
if(!canvas||!faceTools||!status) throw new Error('Precision Face UI dependencies missing');

const row=document.createElement('div');
row.id='precisionFaceRow';
row.style.cssText='display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;margin:7px 0 1px';
const label=document.createElement('span');label.textContent='Value';label.style.cssText='font-size:10px;opacity:.72';
const input=document.createElement('input');input.type='number';input.step='0.001';input.inputMode='decimal';input.placeholder='Exact';input.style.cssText='min-width:0;width:100%;box-sizing:border-box;padding:5px 6px;border-radius:6px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.055);color:inherit;font:inherit';
const apply=document.createElement('button');apply.type='button';apply.textContent='Apply';apply.style.cssText='padding:5px 8px';
row.append(label,input,apply);faceTools.append(row);

const readout=document.createElement('div');
readout.id='precisionFaceReadout';
readout.style.cssText='font-size:10px;opacity:.72;margin:3px 0 1px;min-height:12px';
readout.textContent='Drag normally, or enter an exact model-unit value';
faceTools.append(readout);

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function faces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[];}
function activeTool(){if(extrudeButton?.classList.contains('boxlab-direct-stable')||extrudeButton?.classList.contains('active'))return'extrude';if(insetButton?.classList.contains('boxlab-direct-stable')||insetButton?.classList.contains('active'))return'inset';return null;}
function centerOfFace(m,fi){const f=m?.faces?.[fi];if(!f?.length)return null;const c=new THREE.Vector3();for(const vi of f){const v=m.vertices[vi];if(!v)return null;c.add(v);}return c.multiplyScalar(1/f.length);}
function screenPoint(point,camera){const p=point.clone().project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height};}
function faceNormalScreen(m,fi,camera){const c=centerOfFace(m,fi),n=m?.faceNormal?.(fi)?.clone?.().normalize?.();if(!c||!n||!camera)return{x:0,y:-1};const a=screenPoint(c,camera),b=screenPoint(c.clone().add(n),camera),dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy);return l>1e-5?{x:dx/l,y:dy/l}:{x:0,y:-1};}
function minBoundaryEdge(m,ids){const info=m?.faceRegionsInfo?.(ids);let min=Infinity;for(const region of info?.regions||[]){const loop=region.boundaryLoop||[];for(let i=0;i<loop.length;i++){const a=m.vertices[loop[i]],b=m.vertices[loop[(i+1)%loop.length]];if(a&&b)min=Math.min(min,a.distanceTo(b));}}return Number.isFinite(min)?min:null;}
function dispatchGesture(start,end){const id=9876,base={bubbles:true,cancelable:true,composed:true,pointerId:id,pointerType:'pen',isPrimary:true,button:0,buttons:1,pressure:.5,clientX:start.x,clientY:start.y};canvas.dispatchEvent(new PointerEvent('pointerdown',base));canvas.dispatchEvent(new PointerEvent('pointermove',{...base,clientX:end.x,clientY:end.y}));canvas.dispatchEvent(new PointerEvent('pointerup',{...base,buttons:0,pressure:0,clientX:end.x,clientY:end.y}));}
function applyExact(){const tool=activeTool(),m=mesh(),ids=faces(),camera=state()?.camera,value=Number(input.value);if(!tool||!m||!ids.length||!camera||!Number.isFinite(value)){readout.textContent='Arm Extrude or Inset, select face(s), then enter a value';return;}const fi=ids[0],c=centerOfFace(m,fi);if(!c)return;const start=screenPoint(c,camera);let dx=0,dy=0;
  if(tool==='extrude'){
    const n=faceNormalScreen(m,fi,camera),pixels=value/.006;dx=n.x*pixels;dy=n.y*pixels;
  }else{
    const minEdge=minBoundaryEdge(m,ids);if(!minEdge||minEdge<=1e-8){readout.textContent='Inset exact value unavailable for this selection';return;}const amount=THREE.MathUtils.clamp(Math.abs(value)/(minEdge*.5),.01,.95),pixels=amount/.004;dx=pixels*.5;dy=-pixels*.5;
  }
  dispatchGesture(start,{x:start.x+dx,y:start.y+dy});
  readout.textContent=`${tool==='extrude'?'Extrude':'Inset'} exact • ${value.toFixed(3)}`;
}
apply.addEventListener('click',applyExact);
input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();applyExact();input.blur();}});

new MutationObserver(()=>{
  const text=status.textContent||'';
  let match=text.match(/(?:Extrude|THROUGH READY).*?([+-]?\d+(?:\.\d+)?)(?!.*\d)/i);
  if(match){readout.textContent=`Live Extrude • ${Number(match[1]).toFixed(3)}`;return;}
  match=text.match(/Uniform Inset.*?([+-]?\d+(?:\.\d+)?)(?!.*\d)/i);
  if(match){readout.textContent=`Live Inset • ${Number(match[1]).toFixed(3)}`;return;}
  const tool=activeTool();if(tool)readout.textContent=`${tool==='extrude'?'Extrude':'Inset'} armed • enter exact model-unit value or drag`;
}).observe(status,{childList:true,characterData:true,subtree:true});

window.__boxlabPrecisionFace={version:'0.36.18.8',apply:value=>{input.value=String(value);applyExact();}};
