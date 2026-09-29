import * as THREE from 'three';

// BoxLab v0.36.18.570 — Total Gizmo v1.
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
  }else if(!b.classList.contains('active')){
    b.click();
  }
  arming?.setConstraint?.(constraint);
  const c=precision()?.querySelector(`[data-constraint="${constraint}"]`);
  c?.click?.();
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
  root.dataset.dragging='true';
  visual.classList.add('active');
  if(hud){hud.hidden=false;hud.textContent=`${spec.tool[0].toUpperCase()+spec.tool.slice(1)} • ${spec.constraint==='free'?(spec.kind==='screen'?'Screen':'Free'):spec.constraint.toUpperCase()}`;}
  root.querySelectorAll('.tg-handle').forEach(h=>{if(h!==visual)h.classList.add('muted');});
  if(status)status.textContent=`Total Gizmo • ${spec.tool[0].toUpperCase()+spec.tool.slice(1)} • ${spec.constraint==='free'?(spec.kind==='screen'?'Screen':'Free'):spec.constraint.toUpperCase()}`;
  syntheticDown(event);
  event.preventDefault();
  event.stopPropagation();
}
function finish(event){
  if(pointerId!==event.pointerId)return;
  activeHandle?.classList.remove('active');
  root.querySelectorAll('.tg-handle').forEach(h=>h.classList.remove('muted'));
  root.dataset.dragging='false';
  activeHandle=null;pointerId=null;
  if(hud)hud.hidden=true;
}
document.addEventListener('pointerup',finish,true);
document.addEventListener('pointercancel',finish,true);

const root=document.createElement('div');
root.id='totalGizmo';
root.hidden=true;
root.innerHTML=`
<svg viewBox="0 0 ${SIZE} ${SIZE}" aria-label="BoxLab Total Gizmo">
  <g class="tg-rotate tg-axis-rotate">
    <ellipse class="tg-handle tg-arc tg-x" data-tool="rotate" data-constraint="x" cx="${HALF}" cy="${HALF}" rx="52" ry="22" transform="rotate(-18 ${HALF} ${HALF})"/>
    <ellipse class="tg-handle tg-arc tg-y" data-tool="rotate" data-constraint="y" cx="${HALF}" cy="${HALF}" rx="23" ry="53" transform="rotate(14 ${HALF} ${HALF})"/>
    <ellipse class="tg-handle tg-arc tg-z" data-tool="rotate" data-constraint="z" cx="${HALF}" cy="${HALF}" rx="50" ry="50"/>
  </g>
  <circle class="tg-handle tg-screen-ring" data-tool="rotate" data-constraint="free" data-kind="screen" cx="${HALF}" cy="${HALF}" r="35"/>
  <circle class="tg-handle tg-scale-ring" data-tool="scale" data-constraint="free" data-kind="uniform" cx="${HALF}" cy="${HALF}" r="78"/>
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
</svg><div class="tg-hud" hidden></div>`;
viewportWrap?.append(root);
const hud=root.querySelector('.tg-hud');

const style=document.createElement('style');
style.textContent=`
#totalGizmo{position:absolute;z-index:115;width:${SIZE}px;height:${SIZE}px;transform:translate(-50%,-50%);pointer-events:none;touch-action:none;filter:drop-shadow(0 2px 4px #0009)}
#totalGizmo[hidden]{display:none}
#totalGizmo svg{width:100%;height:100%;overflow:visible}
#totalGizmo .tg-handle{pointer-events:stroke;fill:none;stroke-width:2;vector-effect:non-scaling-stroke;transition:opacity .09s,stroke-width .09s,filter .09s}
#totalGizmo .tg-axis{stroke-width:2.2;pointer-events:stroke}
#totalGizmo .tg-head{pointer-events:none;opacity:.92}
#totalGizmo .tg-x{stroke:#ff5d5d}.tg-x-fill{fill:#ff5d5d}
#totalGizmo .tg-y{stroke:#65e67a}.tg-y-fill{fill:#65e67a}
#totalGizmo .tg-z{stroke:#6f91ff}.tg-z-fill{fill:#6f91ff}
#totalGizmo .tg-screen-ring{stroke:#eef2f7;stroke-width:1.5;opacity:.62}
#totalGizmo .tg-scale-ring{stroke:#ff9a66;stroke-width:1.6;opacity:.72}
#totalGizmo .tg-center{fill:rgba(238,242,247,.22);stroke:#f1f4f8;stroke-width:1.5;pointer-events:all}
#totalGizmo .tg-scale-node{fill:rgba(17,19,24,.9);stroke-width:2.2;pointer-events:all}
#totalGizmo .tg-hud{position:absolute;left:50%;top:-8px;transform:translate(-50%,-100%);padding:5px 8px;border:1px solid rgba(255,255,255,.16);border-radius:7px;background:rgba(12,14,18,.92);font-size:11px;font-weight:650;letter-spacing:.02em;white-space:nowrap;color:#f2f5fa;pointer-events:none;box-shadow:0 5px 15px rgba(0,0,0,.28)}
#totalGizmo .tg-hud[hidden]{display:none}
#totalGizmo .tg-handle::before{pointer-events:stroke}
#totalGizmo .tg-arc{stroke-width:1.7;opacity:.76}
#totalGizmo .tg-handle:hover,#totalGizmo .tg-handle.hover-proxy,#totalGizmo .tg-handle.active{stroke-width:4.5!important;opacity:1!important;filter:drop-shadow(0 0 4px currentColor)}
#totalGizmo .tg-center:hover,#totalGizmo .tg-center.active{fill:rgba(255,255,255,.46)}
#totalGizmo .tg-handle.muted{opacity:.16!important}
#totalGizmo .tg-axis{stroke-linecap:round}
#totalGizmo .tg-arc,#totalGizmo .tg-screen-ring,#totalGizmo .tg-scale-ring{pointer-events:stroke}
#totalGizmo .tg-handle{cursor:grab}
#totalGizmo[data-dragging="true"] .tg-handle.active{cursor:grabbing}
#totalGizmo .tg-handle{--tg-hit:14px}
#totalGizmo .tg-axis{stroke-width:2.2}
#totalGizmo .tg-hit{stroke:transparent;stroke-width:14}
@media(max-width:900px){#totalGizmo{width:184px;height:184px}}
`;
document.head.append(style);

// SVG stroke hit targets are made touch-friendly by duplicating each stroked handle
// with an invisible fat stroke underneath while preserving the thin visible line.
for(const el of [...root.querySelectorAll('.tg-handle:not(.tg-center)')]){
  const hit=el.cloneNode(true);
  hit.classList.add('tg-hit');
  hit.classList.remove('tg-handle');
  hit.removeAttribute('filter');
  hit.style.pointerEvents='stroke';
  hit.style.stroke='transparent';
  hit.style.strokeWidth='16';
  hit.__visual=el;
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
    if(text)hud.textContent=text.replace(/^Total Gizmo\s*•\s*/,'');
  }).observe(status,{childList:true,subtree:true,characterData:true});
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
  visible:()=>!root.hidden,
  refresh:()=>{},
  version:'0.36.18.570'
};
