import * as THREE from 'three';
import {componentVertexIndices,componentAnchorVertexIndices,componentAnchorCoordinate,alignComponentAxisToAnchor} from './component-align-core.js?v=0.36.18.330';

const canvas=document.querySelector('#viewport');
const selectionTools=document.querySelector('#componentSelectionTools');
const status=document.querySelector('#selectionStatus');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function selected(){return[...new Set(bridge()?.indices?.()||[])];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const row=document.createElement('div');
row.id='componentAlignRow';
row.style.cssText='margin-top:6px';
const label=document.createElement('div');
label.textContent='ALIGN / FLATTEN';
label.style.cssText='font-size:9px;line-height:1.1;letter-spacing:.35px;opacity:.55;margin:0 0 4px 1px';
const buttons=document.createElement('div');
buttons.className='outliner-actions';
buttons.style.cssText='display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px';
for(const axis of['x','y','z']){
  const b=document.createElement('button');
  b.type='button';
  b.dataset.alignAxis=axis;
  b.textContent=`Align ${axis.toUpperCase()}`;
  buttons.appendChild(b);
}
row.append(label,buttons);

let armedAxis=null;
let marker=null;
let markerTimer=null;

function place(){
  if(row.isConnected)return true;
  const anchor=selectionTools?.querySelector('.selection-context');
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',row);return true;}
  if(selectionTools){selectionTools.appendChild(row);return true;}
  return false;
}
function info(){
  const m=mesh(),md=mode(),ids=selected(),vertices=componentVertexIndices(m,md,ids);
  return{m,md,ids,vertices};
}
function clearMarker(){
  clearTimeout(markerTimer);markerTimer=null;
  marker?.remove();marker=null;
}
function showMarker(clientX,clientY){
  clearMarker();
  const el=document.createElement('div');
  el.id='componentAlignAnchorMarker';
  el.style.cssText='position:fixed;left:0;top:0;width:22px;height:22px;border:3px solid #f3b34a;border-radius:50%;background:rgba(243,179,74,.14);box-shadow:0 0 0 3px rgba(17,19,24,.72),0 0 14px rgba(243,179,74,.72);pointer-events:none;z-index:10020;transform:translate(-50%,-50%)';
  el.style.left=`${clientX}px`;el.style.top=`${clientY}px`;
  const dot=document.createElement('div');
  dot.style.cssText='position:absolute;left:50%;top:50%;width:6px;height:6px;border-radius:50%;background:#f3b34a;transform:translate(-50%,-50%)';
  el.appendChild(dot);document.body.appendChild(el);marker=el;
  markerTimer=setTimeout(clearMarker,1200);
}
function paintButtons(){
  buttons.querySelectorAll('[data-align-axis]').forEach(b=>{
    const on=armedAxis===b.dataset.alignAxis;
    b.setAttribute('aria-pressed',on?'true':'false');
    if(on){
      b.style.setProperty('background','#f3b34a','important');
      b.style.setProperty('color','#111318','important');
      b.style.setProperty('border-color','#f3b34a','important');
      b.style.setProperty('font-weight','800','important');
    }else{
      b.style.removeProperty('background');b.style.removeProperty('color');b.style.removeProperty('border-color');b.style.removeProperty('font-weight');
    }
  });
}
function disarm(message){
  armedAxis=null;paintButtons();
  if(message&&status)status.textContent=message;
}
function arm(axis){
  const {md,ids,vertices}=info();
  if(!['vertex','edge','face'].includes(md)||ids.length<2||vertices.length<2)return false;
  if(armedAxis===axis){disarm(`Align ${axis.toUpperCase()} • cancelled`);return false;}
  armedAxis=axis;paintButtons();
  if(status)status.textContent=`Align ${axis.toUpperCase()} • tap one selected ${md} to keep fixed`;
  return true;
}

function screenPoint(v,camera){
  const p=v.clone().project(camera),r=canvas.getBoundingClientRect();
  return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
}
function setPointer(event){
  const r=canvas.getBoundingClientRect();
  pointer.set((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));
}
function pickSelectedComponent(event,md,ids,m,camera){
  const p=new THREE.Vector2(event.clientX,event.clientY);
  if(md==='vertex'){
    let best=null;
    for(const i of ids){const v=m.vertices?.[i];if(!v)continue;const d=screenPoint(v,camera).distanceTo(p);if(d<=24&&(!best||d<best.d))best={index:i,d};}
    return best?.index??null;
  }
  if(md==='edge'){
    const edges=m.edges?.()||[];let best=null;
    for(const i of ids){
      const e=edges[i];if(!e)continue;
      const a=screenPoint(m.vertices[e.a],camera),b=screenPoint(m.vertices[e.b],camera),ab=b.clone().sub(a),l2=ab.lengthSq();
      if(l2<1)continue;
      const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l2,0,1),q=a.clone().addScaledVector(ab,t),d=p.distanceTo(q);
      if(d<=20&&(!best||d<best.d))best={index:i,d};
    }
    return best?.index??null;
  }
  if(md==='face'){
    setPointer(event);raycaster.setFromCamera(pointer,camera);let best=null;
    for(const fi of ids){
      const face=m.faces?.[fi];if(!Array.isArray(face)||face.length<3)continue;
      const positions=[];
      for(let i=1;i<face.length-1;i++)for(const vi of[face[0],face[i],face[i+1]]){const v=m.vertices?.[vi];if(v)positions.push(v.x,v.y,v.z);}
      if(!positions.length)continue;
      const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
      const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),picker=new THREE.Mesh(geometry,material);
      const hit=raycaster.intersectObject(picker,false)[0];geometry.dispose();material.dispose();
      if(hit&&(!best||hit.distance<best.distance))best={index:fi,distance:hit.distance};
    }
    return best?.index??null;
  }
  return null;
}

function applyAnchor(anchorIndex,event){
  const axis=armedAxis,{m,md,ids,vertices}=info(),history=globalThis.__boxlabHistory;
  if(!axis||!m||!history||!ids.includes(anchorIndex))return false;
  const fixed=componentAnchorVertexIndices(m,md,anchorIndex);
  const target=componentAnchorCoordinate(m,md,anchorIndex,axis);
  if(!fixed.length||target===null)return false;
  const before=m.clone?.();if(!before)return false;
  const result=alignComponentAxisToAnchor(m,vertices,axis,target,fixed);
  if(!result)return false;
  history.push(before);
  bridge()?.set?.(md,ids);
  showMarker(event.clientX,event.clientY);
  render();
  armedAxis=null;paintButtons();
  if(status)status.textContent=`Align ${axis.toUpperCase()} • anchor ${md} kept fixed • moved ${result.moved} verts • target ${target.toFixed(3)}`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const {md,ids,vertices}=info(),enabled=['vertex','edge','face'].includes(md)&&ids.length>=2&&vertices.length>=2&&!!globalThis.__boxlabHistory;
  row.style.display=md==='object'?'none':'';
  if(!enabled&&armedAxis)disarm();
  buttons.querySelectorAll('button').forEach(b=>{
    b.disabled=!enabled;
    b.title=enabled
      ?`Choose Align ${b.dataset.alignAxis.toUpperCase()}, then tap the selected ${md} that should stay fixed`
      :'Select at least two components first';
  });
  paintButtons();
}

buttons.addEventListener('click',event=>{
  const b=event.target.closest('[data-align-axis]');if(!b)return;
  arm(b.dataset.alignAxis);
});

window.addEventListener('pointerdown',event=>{
  if(!armedAxis||event.target!==canvas||!event.isPrimary)return;
  const {m,md,ids}=info(),camera=state()?.camera;
  if(!m||!camera||!ids.length)return;
  const hit=pickSelectedComponent(event,md,ids,m,camera);
  if(!Number.isInteger(hit)){
    if(status)status.textContent=`Align ${armedAxis.toUpperCase()} • tap one of the selected ${md}s`;
    return;
  }
  event.preventDefault();event.stopImmediatePropagation();
  applyAnchor(hit,event);
},true);

document.addEventListener('pointerdown',event=>{
  if(!armedAxis)return;
  const button=event.target?.closest?.('button');
  if(button&&button.closest('#selectionModes,#toolModes')&&!button.dataset.alignAxis)disarm();
},true);

window.addEventListener('boxlab-bridge-state',sync);
document.querySelector('#selectionModes')?.addEventListener('click',()=>queueMicrotask(sync),true);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,60,180,500].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabComponentAlign={version:'0.36.18.330',arm,disarm,applyAnchor,sync,isArmed:()=>!!armedAxis};
