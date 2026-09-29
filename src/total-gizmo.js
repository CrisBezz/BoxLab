import * as THREE from 'three';

// BoxLab v0.36.18.581 — Total Gizmo v1.
// Object-mode-only combined Move / Rotate / Scale overlay.
// Uses the established transform engine by arming its existing controls and
// forwarding the initial pointerdown to the viewport canvas. Protected
// multi-object-transform.js remains untouched.

const canvas=document.querySelector('#viewport');
const viewportWrap=document.querySelector('#viewportWrap');
const status=document.querySelector('#selectionStatus');
const modeButtons=[...document.querySelectorAll('#selectionModes button[data-mode]')];
const toolButtons=[...document.querySelectorAll('#toolModes button[data-tool]')];
const precision=()=>document.querySelector('#transformPrecision');
const SIZE=196;
const HALF=SIZE/2;
let activeHandle=null;
let pointerId=null;
let raf=0;
let explicitGizmoConstraint=null;

function state(){return globalThis.__boxlabBridgeState||null;}
function currentMode(){return globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function objectSelected(){
  const mgr=globalThis.__boxlabObjectManager;
  if(mgr?.selectedObjects){
    try{return (mgr.selectedObjects()||[]).length>0;}catch{}
  }
  return !!state()?.mesh;
}
function centerOf(mesh){
  const c=new THREE.Vector3();
  if(!mesh?.vertices?.length)return c;
  for(const v of mesh.vertices)c.add(v);
  return c.multiplyScalar(1/mesh.vertices.length);
}
function screenPoint(v,camera){
  const p=v.clone().project(camera),r=canvas.getBoundingClientRect();
  return new THREE.Vector2((p.x*.5+.5)*r.width,(-p.y*.5+.5)*r.height);
}
function axisScreen(center,camera,axis){
  const o=screenPoint(center,camera);
  const d=screenPoint(center.clone().add(axis),camera).sub(o);
  if(d.lengthSq()<4)return new THREE.Vector2(1,0);
  return d.normalize();
}
function arm(tool,constraint='free'){
  const b=toolButtons.find(x=>x.dataset.tool===tool);
  if(!b||b.disabled)return false;
  const arming=globalThis.__boxlabTransformArming;
  if(arming?.setTool){
    arming.setTool(tool);
    arming.setConstraint?.(constraint);
  }else{
    if(!b.classList.contains('active'))b.click();
    arming?.setConstraint?.(constraint);
  }
  // Important: gizmo handles are explicit constraints. Do not click the
  // precision/Axis Snap UI here, because that can re-route through the
  // global snapping state. The handle itself owns the constraint.
  return true;
}
function syntheticDown(event){
  const ev=new PointerEvent('pointerdown',{
    bubbles:true,cancelable:true,pointerId:event.pointerId,pointerType:'pen',
    isPrimary:event.isPrimary!==false,clientX:event.clientX,clientY:event.clientY,
    buttons:1,button:0,pressure:event.pressure||.5
  });
  canvas.dispatchEvent(ev);
}
function handleSpec(el){
  return {tool:el.dataset.tool,constraint:el.dataset.constraint||'free',kind:el.dataset.kind||''};
}
function onHandleDown(event){
  if(currentMode()!=='object')return;
  const el=event.currentTarget,spec=handleSpec(el);
  if(!arm(spec.tool,spec.constraint))return;
  const visual=el.__visual||el;
  activeHandle=visual;pointerId=event.pointerId;
  explicitGizmoConstraint=spec.constraint;
  root.dataset.dragging='true';
  visual.classList.add('active');
  if(hud){clearTimeout(hudHideTimer);hud.hidden=false;hudInput.hidden=true;hudText.hidden=false;hudText.textContent=`${spec.tool[0].toUpperCase()+spec.tool.slice(1)} • ${spec.constraint==='free'?(spec.kind==='screen'?'Screen':'Free'):spec.constraint.toUpperCase()}`;lastSpec=spec;}
  root.querySelectorAll('.tg-handle').forEach(h=>{if(h!==visual)h.classList.add('muted');});
  if(status)status.textContent=`Total Gizmo • ${spec.tool[0].toUpperCase()+spec.tool.slice(1)} • ${spec.constraint==='free'?(spec.kind==='screen'?'Screen':'Free'):spec.constraint.toUpperCase()}`;
  syntheticDown(event);
  event.preventDefault();
  event.stopPropagation();
}
function clearTransientHandleState(){
  root.querySelectorAll('.tg-handle').forEach(h=>{
    h.classList.remove('active','muted','hover-proxy');
  });
}
function finish(event){
  if(pointerId!==event.pointerId)return;
  clearTransientHandleState();
  root.dataset.dragging='false';
  activeHandle=null;pointerId=null;
  explicitGizmoConstraint=null;
  if(hud){clearTimeout(hudHideTimer);hudHideTimer=setTimeout(()=>{if(pointerId===null&&!hudInput.matches(':focus'))hud.hidden=true;},2600);}
}
document.addEventListener('pointerup',finish,true);
document.addEventListener('pointercancel',finish,true);
document.addEventListener('pointerleave',event=>{
  if(pointerId===null)clearTransientHandleState();
},true);

const root=document.createElement('div');
root.id='totalGizmo';
root.hidden=true;
root.innerHTML=`
<svg viewBox="0 0 ${SIZE} ${SIZE}" aria-label="BoxLab Total Gizmo">
  <g class="tg-rotate tg-axis-rotate">
    <path class="tg-handle tg-arc tg-x" data-tool="rotate" data-constraint="x" data-ring-axis="x" d=""/>
    <path class="tg-handle tg-arc tg-y" data-tool="rotate" data-constraint="y" data-ring-axis="y" d=""/>
    <path class="tg-handle tg-arc tg-z" data-tool="rotate" data-constraint="z" data-ring-axis="z" d=""/>
  </g>
  <circle class="tg-handle tg-screen-ring" data-tool="rotate" data-constraint="free" data-kind="screen" cx="${HALF}" cy="${HALF}" r="35"/>
  <circle class="tg-handle tg-scale-ring" data-tool="scale" data-constraint="free" data-kind="uniform" cx="${HALF}" cy="${HALF}" r="78"/>
  <g class="tg-plane-handles">
    <polygon class="tg-handle tg-plane tg-plane-xy" data-tool="move" data-constraint="xy" data-kind="plane" points="0,0 0,0 0,0 0,0"/>
    <polygon class="tg-handle tg-plane tg-plane-xz" data-tool="move" data-constraint="xz" data-kind="plane" points="0,0 0,0 0,0 0,0"/>
    <polygon class="tg-handle tg-plane tg-plane-yz" data-tool="move" data-constraint="yz" data-kind="plane" points="0,0 0,0 0,0 0,0"/>
  </g>
  <g class="tg-move-axes">
    <g class="tg-axis-group tg-x-group">
      <line class="tg-handle tg-axis tg-x" data-tool="move" data-constraint="x" x1="${HALF}" y1="${HALF}" x2="${HALF+58}" y2="${HALF}"/>
      <rect class="tg-handle tg-scale-node tg-x" data-tool="scale" data-constraint="x" x="${HALF+34}" y="${HALF-4.5}" width="9" height="9" rx="1.5"/>
      <polygon class="tg-head tg-x-fill" points="${HALF+67},${HALF} ${HALF+55},${HALF-6} ${HALF+55},${HALF+6}"/>
    </g>
    <g class="tg-axis-group tg-y-group">
      <line class="tg-handle tg-axis tg-y" data-tool="move" data-constraint="y" x1="${HALF}" y1="${HALF}" x2="${HALF+58}" y2="${HALF}"/>
      <rect class="tg-handle tg-scale-node tg-y" data-tool="scale" data-constraint="y" x="${HALF+34}" y="${HALF-4.5}" width="9" height="9" rx="1.5"/>
      <polygon class="tg-head tg-y-fill" points="${HALF+67},${HALF} ${HALF+55},${HALF-6} ${HALF+55},${HALF+6}"/>
    </g>
    <g class="tg-axis-group tg-z-group">
      <line class="tg-handle tg-axis tg-z" data-tool="move" data-constraint="z" x1="${HALF}" y1="${HALF}" x2="${HALF+58}" y2="${HALF}"/>
      <rect class="tg-handle tg-scale-node tg-z" data-tool="scale" data-constraint="z" x="${HALF+34}" y="${HALF-4.5}" width="9" height="9" rx="1.5"/>
      <polygon class="tg-head tg-z-fill" points="${HALF+67},${HALF} ${HALF+55},${HALF-6} ${HALF+55},${HALF+6}"/>
    </g>
  </g>
  <circle class="tg-handle tg-center" data-tool="move" data-constraint="free" data-kind="free" cx="${HALF}" cy="${HALF}" r="10"/>
</svg><div class="tg-hud" hidden><span class="tg-hud-text"></span><input class="tg-hud-input" inputmode="decimal" aria-label="Exact transform value" hidden/></div>`;
viewportWrap?.append(root);
const hud=root.querySelector('.tg-hud'),hudText=root.querySelector('.tg-hud-text'),hudInput=root.querySelector('.tg-hud-input');
let hudHideTimer=null,lastSpec=null;

const style=document.createElement('style');
style.textContent=`
#totalGizmo{position:absolute;z-index:115;width:${SIZE}px;height:${SIZE}px;transform:translate(-50%,-50%);pointer-events:none;touch-action:none;filter:drop-shadow(0 2px 4px #0009)}
#totalGizmo[hidden]{display:none}
#totalGizmo svg{width:100%;height:100%;overflow:visible}
#totalGizmo .tg-handle{pointer-events:stroke;fill:none;stroke-width:1.15;vector-effect:non-scaling-stroke;transition:opacity .09s,stroke-width .09s,filter .09s}
#totalGizmo .tg-axis{stroke-width:1.35;pointer-events:stroke}
#totalGizmo .tg-head{pointer-events:none;opacity:.92}
#totalGizmo .tg-x{stroke:#ff5d5d}.tg-x-fill{fill:#ff5d5d}
#totalGizmo .tg-y{stroke:#65e67a}.tg-y-fill{fill:#65e67a}
#totalGizmo .tg-z{stroke:#6f91ff}.tg-z-fill{fill:#6f91ff}
#totalGizmo .tg-screen-ring{stroke:#eef2f7;stroke-width:1.05;opacity:.58}
#totalGizmo .tg-scale-ring{stroke:#ff9a66;stroke-width:1.1;opacity:.66}
#totalGizmo .tg-center{fill:rgba(238,242,247,.16);stroke:#f1f4f8;stroke-width:1.1;pointer-events:all}
#totalGizmo .tg-scale-node{fill:rgba(17,19,24,.78);stroke-width:1.25;pointer-events:all}
#totalGizmo .tg-plane{pointer-events:all;stroke-width:1;opacity:.5;transition:opacity .09s,stroke-width .09s,fill .09s,filter .09s}
#totalGizmo .tg-plane-xy{stroke:#ffd86a;fill:rgba(255,216,106,.07)}
#totalGizmo .tg-plane-xz{stroke:#d26eff;fill:rgba(210,110,255,.065)}
#totalGizmo .tg-plane-yz{stroke:#62e6dd;fill:rgba(98,230,221,.065)}
#totalGizmo .tg-plane:hover,#totalGizmo .tg-plane.active{opacity:1;stroke-width:2!important;fill:rgba(255,255,255,.16);filter:drop-shadow(0 0 3px currentColor)}
#totalGizmo .tg-hud{position:absolute;left:50%;top:-8px;transform:translate(-50%,-100%);padding:5px 8px;border:1px solid rgba(255,255,255,.16);border-radius:7px;background:rgba(12,14,18,.92);font-size:11px;font-weight:650;letter-spacing:.02em;white-space:nowrap;color:#f2f5fa;pointer-events:auto;box-shadow:0 5px 15px rgba(0,0,0,.28)}
#totalGizmo .tg-hud-input{width:88px;min-height:25px;padding:2px 6px;border-radius:5px;border:1px solid rgba(255,255,255,.24);background:#090b0f;color:#fff;font-size:12px;outline:none}
#totalGizmo .tg-hud[hidden]{display:none}
#totalGizmo .tg-handle::before{pointer-events:stroke}
#totalGizmo .tg-arc{stroke-width:1.2;stroke-linecap:round;stroke-linejoin:round;opacity:.9}
#totalGizmo .tg-handle:hover,#totalGizmo .tg-handle.hover-proxy,#totalGizmo .tg-handle.active{stroke-width:3!important;opacity:1!important;filter:drop-shadow(0 0 3px currentColor)}
#totalGizmo .tg-center:hover,#totalGizmo .tg-center.active{fill:rgba(255,255,255,.46)}
#totalGizmo .tg-handle.muted{opacity:.16!important}
#totalGizmo .tg-axis{stroke-linecap:round}
#totalGizmo .tg-arc,#totalGizmo .tg-screen-ring,#totalGizmo .tg-scale-ring{pointer-events:stroke}
#totalGizmo .tg-handle{cursor:grab}
#totalGizmo[data-dragging="true"] .tg-handle.active{cursor:grabbing}
#totalGizmo .tg-handle{--tg-hit:14px}
#totalGizmo .tg-axis{stroke-width:1.35}
#totalGizmo .tg-hit{fill:none!important;stroke:transparent!important;stroke-width:16!important}
@media(max-width:900px){#totalGizmo{width:184px;height:184px}}
`;
document.head.append(style);

// SVG stroke hit targets are made touch-friendly by duplicating each stroked handle
// with an invisible fat stroke underneath while preserving the thin visible line.
for(const el of [...root.querySelectorAll('.tg-handle:not(.tg-center):not(.tg-plane)')]){
  const hit=el.cloneNode(true);
  hit.classList.add('tg-hit');
  hit.classList.remove('tg-handle');
  hit.removeAttribute('filter');
  hit.style.pointerEvents='stroke';
  hit.style.fill='none';
  hit.setAttribute('fill','none');
  hit.style.stroke='transparent';
  const hitWidth=el.classList.contains('tg-arc')?12:el.classList.contains('tg-screen-ring')||el.classList.contains('tg-scale-ring')?13:16;
  hit.style.strokeWidth=String(hitWidth);
  hit.__visual=el;
  el.__hitProxy=hit;
  el.parentNode.insertBefore(hit,el);
  hit.addEventListener('pointerdown',e=>onHandleDown.call(hit,e));
  hit.addEventListener('pointerenter',()=>el.classList.add('hover-proxy'));
  hit.addEventListener('pointerleave',()=>el.classList.remove('hover-proxy'));
}
for(const el of root.querySelectorAll('.tg-handle'))el.addEventListener('pointerdown',onHandleDown);

if(status&&hud){
  new MutationObserver(()=>{
    if(pointerId===null||root.dataset.dragging!=='true')return;
    const text=(status.textContent||'').trim();
    if(text){hudText.textContent=text.replace(/^Total Gizmo\s*•\s*/,'');hudText.hidden=false;hudInput.hidden=true;}
  }).observe(status,{childList:true,subtree:true,characterData:true});
}

function beginHudExactEntry(){
  if(!lastSpec||pointerId!==null)return;
  const legacy=document.querySelector('#transformValue');
  if(!legacy)return;
  clearTimeout(hudHideTimer);
  hud.hidden=false;hudText.hidden=true;hudInput.hidden=false;
  hudInput.value='';
  hudInput.placeholder=lastSpec.tool==='rotate'?'Degrees':lastSpec.tool==='scale'?'Factor':'Distance';
  hudInput.focus();
}
function commitHudExact(){
  const legacy=document.querySelector('#transformValue'),value=hudInput.value.trim();
  if(!legacy||!value)return;
  if(['x','y','z'].includes(lastSpec?.constraint)){
    globalThis.__boxlabTransformArming?.setTool?.(lastSpec.tool);
    globalThis.__boxlabTransformArming?.setConstraint?.(lastSpec.constraint);
  }
  legacy.value=value;
  legacy.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true,cancelable:true}));
  hudInput.hidden=true;hudText.hidden=false;
  hudText.textContent=`${lastSpec?.tool||'Transform'} exact • ${value}`;
  clearTimeout(hudHideTimer);hudHideTimer=setTimeout(()=>{if(pointerId===null)hud.hidden=true;},2200);
}
hud?.addEventListener('pointerdown',event=>{if(pointerId===null&&!event.target.closest('.tg-hud-input')){event.preventDefault();event.stopPropagation();beginHudExactEntry();}});
hudInput?.addEventListener('keydown',event=>{
  if(event.key==='Enter'){event.preventDefault();event.stopPropagation();commitHudExact();}
  else if(event.key==='Escape'){event.preventDefault();hudInput.blur();hudInput.hidden=true;hudText.hidden=false;}
});
hudInput?.addEventListener('pointerdown',event=>event.stopPropagation());

function planePoints(a,b){
  const o=new THREE.Vector2(HALF,HALF),startA=18,startB=18,size=15;
  const p0=o.clone().addScaledVector(a,startA).addScaledVector(b,startB);
  const p1=p0.clone().addScaledVector(a,size);
  const p2=p1.clone().addScaledVector(b,size);
  const p3=p0.clone().addScaledVector(b,size);
  return [p0,p1,p2,p3].map(p=>`${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
}
function ringWorldRadius(center,camera,targetPixels=52){
  const rect=canvas.getBoundingClientRect();
  const distance=Math.max(.001,camera.position.distanceTo(center));
  const worldPerPixel=2*Math.tan(THREE.MathUtils.degToRad(camera.fov)*.5)*distance/Math.max(1,rect.height);
  return worldPerPixel*targetPixels;
}
function ringBasis(axis){
  if(axis==='x')return [new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,1)];
  if(axis==='y')return [new THREE.Vector3(1,0,0),new THREE.Vector3(0,0,1)];
  return [new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0)];
}
function projectedRingPath(center,camera,axis){
  const [u,v]=ringBasis(axis),radius=ringWorldRadius(center,camera),centerScreen=screenPoint(center,camera);
  const gizmoRect=root.getBoundingClientRect(),sx=SIZE/Math.max(1,gizmoRect.width),sy=SIZE/Math.max(1,gizmoRect.height),segments=96;
  let d='';
  for(let i=0;i<=segments;i++){
    const a=i/segments*Math.PI*2;
    const world=center.clone()
      .addScaledVector(u,Math.cos(a)*radius)
      .addScaledVector(v,Math.sin(a)*radius);
    const screen=screenPoint(world,camera);
    const x=HALF+(screen.x-centerScreen.x)*sx;
    const y=HALF+(screen.y-centerScreen.y)*sy;
    d+=`${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d.trim()+' Z';
}
function syncRotationRings(center,camera){
  for(const axis of ['x','y','z']){
    const path=root.querySelector(`.tg-handle.tg-arc[data-ring-axis="${axis}"]`);
    if(!path)continue;
    const d=projectedRingPath(center,camera,axis);
    path.setAttribute('d',d);
    const hit=path.__hitProxy;
    if(hit)hit.setAttribute('d',d);
  }
}
function syncAxisVisuals(center,camera){
  const dirs={
    x:axisScreen(center,camera,new THREE.Vector3(1,0,0)),
    y:axisScreen(center,camera,new THREE.Vector3(0,1,0)),
    z:axisScreen(center,camera,new THREE.Vector3(0,0,1))
  };
  for(const [name,d] of Object.entries(dirs)){
    const angle=Math.atan2(d.y,d.x)*180/Math.PI;
    const g=root.querySelector(`.tg-${name}-group`);
    if(g)g.setAttribute('transform',`rotate(${angle} ${HALF} ${HALF})`);
  }
  const xy=root.querySelector('.tg-plane-xy'),xz=root.querySelector('.tg-plane-xz'),yz=root.querySelector('.tg-plane-yz');
  if(xy)xy.setAttribute('points',planePoints(dirs.x,dirs.y));
  if(xz)xz.setAttribute('points',planePoints(dirs.x,dirs.z));
  if(yz)yz.setAttribute('points',planePoints(dirs.y,dirs.z));
  syncRotationRings(center,camera);
}

function sync(){
  raf=requestAnimationFrame(sync);
  if(!canvas||!viewportWrap||currentMode()!=='object'||!objectSelected()){
    root.hidden=true;return;
  }
  const s=state(),mesh=s?.mesh,camera=s?.camera;
  if(!mesh?.vertices?.length||!camera){root.hidden=true;return;}
  const c=centerOf(mesh),p=screenPoint(c,camera),cr=canvas.getBoundingClientRect(),vr=viewportWrap.getBoundingClientRect();
  root.style.left=`${cr.left-vr.left+p.x}px`;
  root.style.top=`${cr.top-vr.top+p.y}px`;
  root.hidden=false;
  syncAxisVisuals(c,camera);
}
sync();

globalThis.__boxlabTotalGizmo={
  element:root,
  activeConstraint:()=>explicitGizmoConstraint,
  visible:()=>!root.hidden,
  refresh:()=>{},
  version:'0.36.18.581'
};
