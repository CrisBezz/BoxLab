import * as THREE from 'three';

// BoxLab v0.36.18.595 — Total Gizmo v1.
// BoxLab v0.36.18.597 — Total Gizmo transient-state reset on transform-menu interaction.
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
let awaitingTransformEnd=false;
let expanded=false;
let hubState='closed';
let hubSuppressedKey='';
let lastSelectionKey='';
let suspendedFaceTool=false;
let edgeExtrudeConstraintSession=false;


function state(){return globalThis.__boxlabBridgeState||null;}
function currentMode(){return globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function multiObjectTransformActive(){const s=globalThis.__boxlabObjectSelection;return currentMode()==='object'&&(s?.ids?.size||0)>1;}
function objectSelected(){
  const mgr=globalThis.__boxlabObjectManager;
  if(mgr?.selectedObjects){
    try{return (mgr.selectedObjects()||[]).length>0;}catch{}
  }
  return !!state()?.mesh;
}
function componentVertexIndices(mesh,mode=currentMode()){
  if(!mesh)return[];
  if(mode==='object')return mesh.vertices.map((_,i)=>i);
  const ids=[...new Set(globalThis.__boxlabSelectionBridge?.indices?.()||[])],out=new Set();
  if(mode==='vertex')ids.forEach(i=>{if(mesh.vertices[i])out.add(i);});
  else if(mode==='edge'){
    const edges=mesh.edges();
    ids.forEach(i=>{const e=edges[i];if(e){out.add(e.a);out.add(e.b);}});
  }else if(mode==='face'){
    ids.forEach(i=>(mesh.faces[i]||[]).forEach(v=>out.add(v)));
  }
  return [...out];
}
function selectionAvailable(mesh,mode=currentMode()){
  return mode==='object'?objectSelected():componentVertexIndices(mesh,mode).length>0;
}
function selectionKey(mesh,mode=currentMode()){
  if(mode==='object')return 'object';
  return `${mode}:${[...new Set(globalThis.__boxlabSelectionBridge?.indices?.()||[])].sort((a,b)=>a-b).join(',')}`;
}
function setHubState(next,{reason='',resumeSuspended=true}={}){
  const mode=currentMode();
  let requested=mode==='object'?'transform':next;
  if(!['closed','transform','tools'].includes(requested))requested='closed';
  if(requested==='tools'&&!['face','edge'].includes(mode))requested='closed';

  if(edgeExtrudeConstraintSession&&mode==='edge'&&requested!=='transform'){
    const preservedEdges=[...new Set(globalThis.__boxlabSelectionBridge?.indices?.()||[])];
    edgeExtrudeConstraintSession=false;
    syncEdgeExtrudeConstraintVisuals?.();
    resetTransientState?.({hideFloat:true});
    hubSuppressedKey='';
    requested='closed';
    queueMicrotask(()=>{
      globalThis.__boxlabEdgeExtrude?.setArmed?.(false);
      globalThis.__boxlabTransformArming?.disarm?.();
      if(currentMode()==='edge'&&preservedEdges.length){
        globalThis.__boxlabSelectionBridge?.set?.('edge',preservedEdges);
        hubSuppressedKey='';
        lastSelectionKey=selectionKey(state()?.mesh,'edge');
        hubState='closed';
        expanded=false;
        root.dataset.hubState='closed';
        root.dataset.expanded='false';
        root.hidden=false;
        requestAnimationFrame(()=>globalThis.__boxlabTransformArming?.disarm?.());
      }
    });
    gestureDebug('EDGE EXTRUDE SESSION CLOSE',{reason:reason||'return-to-puck',selectionPreserved:true,edges:preservedEdges.length});
  }

  const wasTransform=hubState==='transform';
  const willTransform=requested==='transform';

  if(willTransform&&!wasTransform&&mode==='face'&&!suspendedFaceTool){
    suspendedFaceTool=!!globalThis.__boxlabFaceDirect?.suspendForTransform?.();
    if(suspendedFaceTool)gestureDebug('GIZMO SUSPEND FACE TOOL',{reason});
  }

  hubState=requested;
  expanded=hubState==='transform';
  root.dataset.hubState=hubState;
  root.dataset.expanded=expanded?'true':'false';

  if(hubState==='closed'&&suspendedFaceTool&&resumeSuspended){
    const resumed=!!globalThis.__boxlabFaceDirect?.resumeAfterTransform?.();
    gestureDebug('GIZMO RESUME FACE TOOL',{resumed,reason});
    suspendedFaceTool=false;
  }

  if(reason)gestureDebug('SELECTION HUB STATE',{mode,state:hubState,reason});
  return hubState;
}
function setExpanded(next,options={}){
  setHubState(next?'transform':'closed',options);
  return expanded;
}
function centerOf(mesh,mode=currentMode()){
  const indices=componentVertexIndices(mesh,mode),c=new THREE.Vector3();
  if(!indices.length)return c;
  indices.forEach(i=>c.add(mesh.vertices[i]));
  return c.multiplyScalar(1/indices.length);
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
  const upgrade=globalThis.__boxlabTransformUpgrade;
  if(upgrade?.setContext){
    upgrade.setContext(tool,['x','y','z','free','auto'].includes(constraint)?constraint:'free');
    return true;
  }
  const arming=globalThis.__boxlabTransformArming;
  if(arming?.setTool){
    arming.setTool(tool);
    arming.setConstraint?.(constraint);
  }else{
    if(!b.classList.contains('active'))b.click();
    arming?.setConstraint?.(constraint);
  }
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
function gestureDebug(stage,detail=null){globalThis.__boxlabGestureDebug?.log?.(stage,detail);}
function handleSpec(el){
  return {tool:el.dataset.tool,constraint:el.dataset.constraint||'free',kind:el.dataset.kind||''};
}
function onHandleDown(event){
  const mode=currentMode(),mesh=state()?.mesh;
  if(mode!=='object'&&!expanded){
    gestureDebug('GIZMO HANDLE REJECT COLLAPSED',{mode,pid:event.pointerId});
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if(!selectionAvailable(mesh,mode))return;
  hideFloatInput();
  const el=event.currentTarget,spec=handleSpec(el);
  if(edgeExtrudeConstraintSession&&mode==='edge'){
    event.preventDefault();
    event.stopImmediatePropagation();
    if(spec.tool!=='move')return;
    const constraint=['x','y','z'].includes(spec.constraint)?spec.constraint:'plane';
    const arming=globalThis.__boxlabTransformArming;
    if(!arming?.active?.())arming?.activateRealMove?.();
    arming?.setConstraint?.(constraint);
    syncEdgeExtrudeConstraintVisuals();
    gestureDebug('EDGE EXTRUDE GIZMO CONSTRAINT',{constraint,kind:spec.kind||'',pid:event.pointerId});
    window.dispatchEvent(new CustomEvent('boxlab-edge-extrude-gizmo-constraint',{detail:{constraint,kind:spec.kind||''}}));
    if(status)status.textContent=`Edge Extrude • ${constraint==='plane'?'Plane ⟂ edge':constraint.toUpperCase()+' axis'} • drag selected boundary edge(s)`;
    return;
  }
  gestureDebug('GIZMO DOWN',{mode,tool:spec.tool,constraint:spec.constraint,pid:event.pointerId,pointer:event.pointerType});
  if(!arm(spec.tool,spec.constraint))return;
  const visual=el.__visual||el;
  activeHandle=visual;pointerId=event.pointerId;
  explicitGizmoConstraint=spec.constraint;
  globalThis.__boxlabActiveGizmoDrag={tool:spec.tool,constraint:spec.constraint,kind:spec.kind||'',pointerId:event.pointerId};
  awaitingTransformEnd=true;
  root.dataset.dragging='true';
  visual.classList.add('active');
  if(hud){clearTimeout(hudHideTimer);hud.hidden=false;hudText.hidden=false;hudText.textContent=`${spec.tool[0].toUpperCase()+spec.tool.slice(1)} • ${spec.constraint==='free'?(spec.kind==='screen'?'Screen':'Free'):spec.constraint.toUpperCase()}`;lastSpec=spec;}
  root.querySelectorAll('.tg-handle').forEach(h=>{if(h!==visual)h.classList.add('muted');});
  if(status)status.textContent=`Total Gizmo • ${spec.tool[0].toUpperCase()+spec.tool.slice(1)} • ${spec.constraint==='free'?(spec.kind==='screen'?'Screen':'Free'):spec.constraint.toUpperCase()}`;
  let directSemanticHandoff=false;
  if(mode!=='object'||!multiObjectTransformActive()){
    try{
      directSemanticHandoff=!!globalThis.__boxlabTransformUpgrade?.beginGizmoGesture?.(spec,event);
    }catch(error){
      directSemanticHandoff=false;
    }
    if(directSemanticHandoff){
      try{event.currentTarget?.setPointerCapture?.(event.pointerId);}catch{}
    }
  }
  // Component gizmos are semantic-only. Never replay a component handle press
  // onto the canvas: that can leak through into selection or an armed topology tool.
  if(!directSemanticHandoff&&mode!=='object'){
    gestureDebug('GIZMO HANDOFF BLOCKED',{mode,tool:spec.tool,constraint:spec.constraint,pid:event.pointerId});
    awaitingTransformEnd=false;
    clearTransientHandleState();
    root.dataset.dragging='false';
    activeHandle=null;pointerId=null;explicitGizmoConstraint=null;
    globalThis.__boxlabActiveGizmoDrag=null;
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  // True Object/Multi fallback remains on the protected object transform route.
  gestureDebug(directSemanticHandoff?'GIZMO HANDOFF OK':'GIZMO HANDOFF FALLBACK',{mode,tool:spec.tool,constraint:spec.constraint,pid:event.pointerId});
  if(!directSemanticHandoff)syntheticDown(event);
  event.preventDefault();
  event.stopPropagation();
}
function clearTransientHandleState(){
  root.querySelectorAll('.tg-handle').forEach(h=>{
    h.classList.remove('active','muted','hover-proxy');
  });
}
function resetTransientState({hideFloat=false}={}){
  awaitingTransformEnd=false;
  clearTransientHandleState();
  root.dataset.dragging='false';
  activeHandle=null;
  pointerId=null;
  explicitGizmoConstraint=null;
  globalThis.__boxlabActiveGizmoDrag=null;
  if(hud){clearTimeout(hudHideTimer);hud.hidden=true;}
  if(hideFloat)hideFloatInput();
}
function finish(event){
  if(pointerId!==event.pointerId)return;
  gestureDebug('GIZMO FINISH',{pid:event.pointerId,type:event.type});
  const finishedSpec=lastSpec;
  clearTransientHandleState();
  root.dataset.dragging='false';
  activeHandle=null;pointerId=null;
  explicitGizmoConstraint=null;
  globalThis.__boxlabActiveGizmoDrag=null;
  // Move is hands-on proven. Object-mode Rotate uses the same gizmo
  // release trigger; its transform math remains owned by transform-upgrade.
  if(event.type==='pointerup'&&['move','rotate','scale'].includes(finishedSpec?.tool)&&awaitingTransformEnd){
    awaitingTransformEnd=false;
    if(hud){clearTimeout(hudHideTimer);hud.hidden=true;}
    showFloatInput(finishedSpec);
  }
}
window.addEventListener('pointerup',finish,true);
document.addEventListener('pointercancel',event=>{awaitingTransformEnd=false;finish(event);},true);
window.addEventListener('boxlab-transform-end',event=>{
  if(!awaitingTransformEnd||!lastSpec)return;
  awaitingTransformEnd=false;
  clearTransientHandleState();
  root.dataset.dragging='false';
  activeHandle=null;pointerId=null;explicitGizmoConstraint=null;
  globalThis.__boxlabActiveGizmoDrag=null;
  if(hud){clearTimeout(hudHideTimer);hud.hidden=true;}
  showFloatInput(lastSpec);
});
document.addEventListener('pointerleave',event=>{
  if(pointerId===null)clearTransientHandleState();
},true);

const root=document.createElement('div');
root.id='totalGizmo';
root.hidden=true;
root.innerHTML=`
<button type="button" class="tg-activator" aria-label="Activate transform gizmo" title="Activate transform gizmo"><span></span></button>
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
  <circle class="tg-collapse" cx="${HALF}" cy="${HALF}" r="4" aria-label="Open contextual tools"/>
</svg>
<div class="tg-tool-ring" data-ring-mode="face" aria-label="Face contextual tools">
  <button type="button" class="tg-tool-sector" style="--a:0deg" data-tool-target="#extrudeBtn">Extrude</button>
  <button type="button" class="tg-tool-sector" style="--a:45deg" data-tool-target="#insetBtn">Inset</button>
  <button type="button" class="tg-tool-sector" style="--a:90deg" data-tool-target="#knifeBtn">Knife</button>
  <button type="button" class="tg-tool-sector" style="--a:135deg" data-tool-target="#duplicateFacesBtn">Duplicate</button>
  <button type="button" class="tg-tool-sector" style="--a:180deg" data-tool-target="#extractFacesBtn">Extract</button>
  <button type="button" class="tg-tool-sector" style="--a:225deg" data-tool-target="#shellFacesBtn">Shell</button>
  <button type="button" class="tg-tool-sector" style="--a:270deg" data-tool-target=".sweep-selection-launch[data-sweep-selection-mode='face']">Sweep</button>
  <button type="button" class="tg-tool-sector tg-tool-danger" style="--a:315deg" data-tool-target="#deleteFaceBtn">Delete</button>
  <button type="button" class="tg-tool-center" aria-label="Close Face contextual tools" title="Close tools">×</button>
</div>
<div class="tg-tool-ring" data-ring-mode="edge" aria-label="Edge contextual tools">
  <button type="button" class="tg-tool-sector" style="--a:0deg" data-tool-target="#edgeExtrudeBtn">Extrude</button>
  <button type="button" class="tg-tool-sector" style="--a:45deg" data-tool-target="#bevelBtn">Bevel</button>
  <button type="button" class="tg-tool-sector" style="--a:90deg" data-tool-target="#applyCreaseBtn">Crease</button>
  <button type="button" class="tg-tool-sector" style="--a:135deg" data-tool-target="#edgeSlideBtn">Slide</button>
  <button type="button" class="tg-tool-sector" style="--a:180deg" data-tool-target="#offsetLoopBtn">Offset</button>
  <button type="button" class="tg-tool-sector" style="--a:225deg" data-tool-target="#bridgeEdgesBtn">Bridge</button>
  <button type="button" class="tg-tool-sector" style="--a:270deg" data-tool-target="#dissolveEdgeBtn">Dissolve</button>
  <button type="button" class="tg-tool-sector tg-tool-danger" style="--a:315deg" data-tool-target="#deleteEdgeBtn">Delete</button>
  <button type="button" class="tg-tool-center" aria-label="Close Edge contextual tools" title="Close tools">×</button>
</div>
<div class="tg-edge-extrude-badge" hidden><strong>Extrude</strong><span>Plane ⟂ edge</span><small>Choose constraint • drag edge</small></div>
<div class="tg-hud" hidden><span class="tg-hud-text"></span></div>`;
viewportWrap?.append(root);
const activator=root.querySelector('.tg-activator');
const collapseControl=root.querySelector('.tg-collapse');
const toolRings=[...root.querySelectorAll('.tg-tool-ring')];
const toolCenters=[...root.querySelectorAll('.tg-tool-center')];
const toolSectors=[...root.querySelectorAll('.tg-tool-sector')];
const hud=root.querySelector('.tg-hud'),hudText=root.querySelector('.tg-hud-text');
const edgeExtrudeBadge=root.querySelector('.tg-edge-extrude-badge');

const edgeExtrudeStyle=document.createElement('style');
edgeExtrudeStyle.textContent=`
#totalGizmo[data-edge-extrude-constraint="true"] .tg-edge-extrude-badge{
  display:flex;position:absolute;left:50%;top:calc(50% + 58px);transform:translateX(-50%);
  min-width:128px;padding:5px 8px;border-radius:8px;background:rgba(18,20,24,.88);
  border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(8px);
  flex-direction:column;align-items:center;gap:1px;pointer-events:none;white-space:nowrap;
  font-size:11px;line-height:1.15;color:#f5f7fa;
}
#totalGizmo[data-edge-extrude-constraint="true"] .tg-edge-extrude-badge strong{font-size:11px}
#totalGizmo[data-edge-extrude-constraint="true"] .tg-edge-extrude-badge span{font-weight:750}
#totalGizmo[data-edge-extrude-constraint="true"] .tg-edge-extrude-badge small{font-size:9px;opacity:.68}
#totalGizmo[data-edge-extrude-constraint="true"] .tg-handle.edge-extrude-active{filter:brightness(1.55);stroke-width:4}
#totalGizmo[data-edge-extrude-constraint="true"] .tg-center.edge-extrude-active{stroke-width:4}
`;
document.head.appendChild(edgeExtrudeStyle);

function syncEdgeExtrudeConstraintVisuals(){
  const active=edgeExtrudeConstraintSession;
  root.dataset.edgeExtrudeConstraint=active?'true':'false';
  const hideSelectors=['.tg-rotate','.tg-screen-ring','.tg-scale-ring','.tg-scale-node','.tg-plane-handles','.tg-collapse'];
  hideSelectors.forEach(selector=>root.querySelectorAll(selector).forEach(el=>{el.style.display=active?'none':'';}));
  root.querySelectorAll('.tg-move-axes,.tg-center').forEach(el=>{el.style.display='';});
  if(edgeExtrudeBadge)edgeExtrudeBadge.hidden=!active;
  root.querySelectorAll('.tg-handle').forEach(el=>el.classList.remove('edge-extrude-active'));
  if(!active)return;
  const constraint=globalThis.__boxlabTransformArming?.constraint?.()||'plane';
  if(['x','y','z'].includes(constraint)){
    root.querySelectorAll(`.tg-handle[data-tool="move"][data-constraint="${constraint}"]`).forEach(el=>el.classList.add('edge-extrude-active'));
  }else{
    root.querySelector('.tg-center[data-tool="move"]')?.classList.add('edge-extrude-active');
  }
  const label=constraint==='plane'?'Plane ⟂ edge':String(constraint).toUpperCase()+' axis';
  edgeExtrudeBadge?.querySelector('span')?.replaceChildren(document.createTextNode(label));
}

function syncContextToolAvailability(){
  for(const sector of toolSectors){
    const selector=sector.dataset.toolTarget;
    const target=selector?document.querySelector(selector):null;
    const unavailable=!target||!!target.disabled;
    const active=!!target&&(target.classList.contains('active')||target.getAttribute('aria-pressed')==='true');
    sector.disabled=unavailable;
    sector.classList.toggle('tg-tool-unavailable',unavailable);
    sector.classList.toggle('tg-tool-active',active&&!unavailable);
    sector.setAttribute('aria-disabled',unavailable?'true':'false');
    if(unavailable){
      sector.title=`${sector.textContent?.trim()||'Tool'} unavailable for current selection`;
    }else if(active){
      sector.title=`${sector.textContent?.trim()||'Tool'} active`;
    }else{
      sector.removeAttribute('title');
    }
  }
}

activator?.addEventListener('pointerdown',event=>{
  if(currentMode()==='object')return;
  event.preventDefault();
  event.stopPropagation();
  setHubState('transform',{reason:'puck'});
});

collapseControl?.addEventListener('pointerdown',event=>{
  if(currentMode()==='object')return;
  event.preventDefault();
  event.stopPropagation();
  hideFloatInput();
  resetTransientState({hideFloat:true});
  const next=['face','edge'].includes(currentMode())?'tools':'closed';
  setHubState(next,{reason:'transform-centre'});
  if(next==='tools')syncContextToolAvailability();
});

toolCenters.forEach(toolCenter=>toolCenter.addEventListener('pointerdown',event=>{
  event.preventDefault();
  event.stopPropagation();
  setHubState('closed',{reason:'tools-centre'});
}));

toolSectors.forEach(button=>{
  button.addEventListener('pointerdown',event=>{
    event.preventDefault();
    event.stopPropagation();
  });
  button.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    syncContextToolAvailability();
    if(button.disabled)return;
    const mode=currentMode();
    const ringMode=button.closest('.tg-tool-ring')?.dataset.ringMode||'';
    if(mode!==ringMode)return;
    const selector=button.dataset.toolTarget;
    const target=selector?document.querySelector(selector):null;
    if(!target||target.disabled){
      if(status)status.textContent=`${button.textContent?.trim()||'Tool'} unavailable for current selection`;
      return;
    }
    if(mode==='face'&&suspendedFaceTool){
      globalThis.__boxlabFaceDirect?.clearTransformSuspension?.();
      suspendedFaceTool=false;
    }
    hubSuppressedKey=lastSelectionKey;
    setHubState('closed',{reason:`tool:${button.textContent?.trim()||'unknown'}`,resumeSuspended:false});
    root.hidden=true;
    const toolLabel=button.textContent?.trim()||'Tool';
    gestureDebug('SELECTION HUB TOOL',{tool:toolLabel,selector});
    target.click();
    window.dispatchEvent(new CustomEvent('boxlab-selection-hub-tool',{detail:{mode,tool:toolLabel,selector,selectionKey:lastSelectionKey}}));
  });
});

toolButtons.forEach(button=>button.addEventListener('click',()=>{
  const s=state(),mesh=s?.mesh,mode=currentMode();
  if(mode!=='object'&&selectionAvailable(mesh,mode)){
    hubSuppressedKey='';
    setHubState('transform',{reason:'transform-control'});
  }
  queueMicrotask(syncContextToolAvailability);
}));
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(syncContextToolAvailability));
document.addEventListener('click',()=>queueMicrotask(syncContextToolAvailability),true);
document.addEventListener('pointerup',()=>queueMicrotask(syncContextToolAvailability),true);
syncContextToolAvailability();

document.addEventListener('boxlab-face-direct-committed',event=>{
  const tool=event.detail?.tool;
  if(tool!=='extrude'&&tool!=='inset')return;
  const s=state(),mesh=s?.mesh,mode=currentMode();
  if(mode!=='face'||!selectionAvailable(mesh,mode))return;
  hubSuppressedKey='';
  setHubState('closed',{reason:'direct-complete:'+tool});
  root.hidden=false;
  gestureDebug('SELECTION HUB RESTORE',{tool,key:selectionKey(mesh,mode)});
});

let hudHideTimer=null,lastSpec=null;

const floatPalette=document.createElement('div');
floatPalette.id='transformFloatInput';
floatPalette.hidden=true;
floatPalette.innerHTML=`
  <span class="tfi-label">Transform</span>
  <input class="tfi-input" inputmode="decimal" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Exact transform value"/>
  <button type="button" class="tfi-apply">Apply</button>
`;
viewportWrap?.append(floatPalette);
const floatLabel=floatPalette.querySelector('.tfi-label');
const floatInput=floatPalette.querySelector('.tfi-input');
const floatApply=floatPalette.querySelector('.tfi-apply');
let floatHideTimer=null;

function floatTitle(spec){
  if(!spec)return'Transform';
  const tool=spec.tool?.[0]?.toUpperCase()+spec.tool?.slice(1);
  const constraint=spec.constraint==='free'?(spec.kind==='uniform'?'Uniform':'Free'):(spec.constraint||'').toUpperCase();
  return `${tool} ${constraint}`.trim();
}
function floatPlaceholder(spec){
  return spec?.tool==='rotate'?'Degrees':spec?.tool==='scale'?'Factor':'Distance';
}
function showFloatInput(spec){
  if(!spec)return;
  if(hud){clearTimeout(hudHideTimer);hud.hidden=true;}
  clearTimeout(floatHideTimer);
  floatLabel.textContent=floatTitle(spec);
  floatInput.placeholder=floatPlaceholder(spec);
  floatInput.value='';
  floatPalette.hidden=false;
}
function hideFloatInput(){
  floatPalette.hidden=true;
  floatInput.blur();
}
function commitFloatInput(){
  const value=floatInput.value.trim();
  if(!value||!lastSpec)return;
  const ok=globalThis.__boxlabTransformUpgrade?.applyExact?.(lastSpec.tool,lastSpec.constraint,value);
  if(ok){
    const legacy=document.querySelector('#transformValue');
    if(legacy)legacy.value='';
    if(status)status.textContent=`${floatTitle(lastSpec)} exact • ${value}${lastSpec.tool==='rotate'?'°':lastSpec.tool==='scale'?'×':''}`;
    hideFloatInput();
  }else{
    floatInput.select?.();
  }
}
for(const el of [floatPalette,floatInput,floatApply]){
  el?.addEventListener('pointerdown',event=>event.stopPropagation(),true);
  el?.addEventListener('touchstart',event=>event.stopPropagation(),{capture:true,passive:true});
}
floatInput?.addEventListener('click',event=>{
  event.stopPropagation();
  try{floatInput.focus({preventScroll:true});}catch{floatInput.focus();}
});
floatInput?.addEventListener('keydown',event=>{
  if(event.key==='Enter'){event.preventDefault();event.stopPropagation();commitFloatInput();}
  else if(event.key==='Escape'){event.preventDefault();hideFloatInput();}
});
floatApply?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();commitFloatInput();});
document.addEventListener('pointerdown',event=>{
  if(floatPalette.hidden||event.target?.closest?.('#transformFloatInput'))return;
  hideFloatInput();
},true);

const style=document.createElement('style');
style.textContent=`
#totalGizmo{position:absolute;z-index:115;width:${SIZE}px;height:${SIZE}px;transform:translate(-50%,-50%);pointer-events:none;touch-action:none;filter:drop-shadow(0 2px 4px #0009)}
#totalGizmo[hidden]{display:none}
#totalGizmo .tg-activator{position:absolute;left:50%;top:50%;width:26px;height:26px;transform:translate(-50%,-50%);border:1px solid rgba(238,242,247,.72);border-radius:50%;background:rgba(12,14,18,.78);box-shadow:0 2px 8px rgba(0,0,0,.35);pointer-events:auto;touch-action:none;padding:0;z-index:3}
#totalGizmo .tg-activator span{position:absolute;left:50%;top:50%;width:6px;height:6px;transform:translate(-50%,-50%);border-radius:50%;background:#eef2f7;opacity:.92}
#totalGizmo .tg-activator::before,#totalGizmo .tg-activator::after{content:'';position:absolute;left:50%;top:50%;background:rgba(238,242,247,.62);transform:translate(-50%,-50%)}
#totalGizmo .tg-activator::before{width:14px;height:1px}
#totalGizmo .tg-activator::after{width:1px;height:14px}
#totalGizmo:not([data-hub-state="closed"]) .tg-activator{display:none}
#totalGizmo[data-hub-state="closed"][data-mode="vertex"][data-single-component="true"] .tg-activator{transform:translate(calc(-50% + 34px),calc(-50% - 34px))}
#totalGizmo:not([data-hub-state="transform"]) svg{display:none!important}
#totalGizmo svg{width:100%;height:100%;overflow:visible}
#totalGizmo .tg-tool-ring{position:absolute;inset:0;display:none;pointer-events:none}
#totalGizmo[data-hub-state="tools"][data-mode="face"] .tg-tool-ring[data-ring-mode="face"]{display:block}
#totalGizmo[data-hub-state="tools"][data-mode="edge"] .tg-tool-ring[data-ring-mode="edge"]{display:block}
#totalGizmo .tg-tool-sector{position:absolute;left:50%;top:50%;width:68px;height:34px;margin:-17px -34px;padding:3px 5px;border:1px solid rgba(255,255,255,.22);border-radius:11px;background:rgba(18,21,27,.96);color:#eef2f7;font-size:10px;font-weight:700;line-height:1;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.34);pointer-events:auto;touch-action:none;transform:rotate(var(--a)) translateY(-82px) rotate(calc(-1 * var(--a)))}
#totalGizmo .tg-tool-sector:active{background:rgba(238,242,247,.92);color:#111318}
#totalGizmo .tg-tool-danger{border-color:rgba(255,110,110,.48)}
#totalGizmo .tg-tool-center{position:absolute;left:50%;top:50%;width:30px;height:30px;transform:translate(-50%,-50%);border:1px solid rgba(238,242,247,.7);border-radius:50%;background:rgba(12,14,18,.96);color:#eef2f7;font-size:18px;line-height:1;pointer-events:auto;touch-action:none}
#totalGizmo .tg-handle{pointer-events:stroke;fill:none;stroke-width:1.15;vector-effect:non-scaling-stroke;transition:opacity .09s,stroke-width .09s,filter .09s}
#totalGizmo .tg-axis{stroke-width:1.35;pointer-events:stroke}
#totalGizmo .tg-head{pointer-events:none;opacity:.92}
#totalGizmo .tg-x{stroke:#ff5d5d}.tg-x-fill{fill:#ff5d5d}
#totalGizmo .tg-y{stroke:#65e67a}.tg-y-fill{fill:#65e67a}
#totalGizmo .tg-z{stroke:#6f91ff}.tg-z-fill{fill:#6f91ff}
#totalGizmo .tg-screen-ring{stroke:#eef2f7;stroke-width:1.05;opacity:.58}
#totalGizmo .tg-scale-ring{stroke:#ff9a66;stroke-width:1.1;opacity:.66}
#totalGizmo .tg-center{fill:rgba(238,242,247,.16);stroke:#f1f4f8;stroke-width:1.1;pointer-events:all}
#totalGizmo .tg-collapse{fill:#eef2f7;stroke:#111318;stroke-width:1.25;pointer-events:all;cursor:pointer;filter:drop-shadow(0 1px 2px rgba(0,0,0,.55))}
#totalGizmo:not([data-hub-state="transform"]) .tg-collapse{display:none}
#totalGizmo .tg-scale-node{fill:rgba(17,19,24,.78);stroke-width:1.25;pointer-events:all}
#totalGizmo .tg-plane{pointer-events:all;stroke-width:1;opacity:.5;transition:opacity .09s,stroke-width .09s,fill .09s,filter .09s}
#totalGizmo .tg-plane-xy{stroke:#ffd86a;fill:rgba(255,216,106,.07)}
#totalGizmo .tg-plane-xz{stroke:#d26eff;fill:rgba(210,110,255,.065)}
#totalGizmo .tg-plane-yz{stroke:#62e6dd;fill:rgba(98,230,221,.065)}
#totalGizmo .tg-plane:hover,#totalGizmo .tg-plane.active{opacity:1;stroke-width:2!important;fill:rgba(255,255,255,.16);filter:drop-shadow(0 0 3px currentColor)}
#totalGizmo .tg-hud{position:absolute;left:50%;top:-8px;transform:translate(-50%,-100%);padding:5px 8px;border:1px solid rgba(255,255,255,.16);border-radius:7px;background:rgba(12,14,18,.92);font-size:11px;font-weight:650;letter-spacing:.02em;white-space:nowrap;color:#f2f5fa;pointer-events:auto;box-shadow:0 5px 15px rgba(0,0,0,.28)}
#totalGizmo .tg-hud[hidden]{display:none}
#transformFloatInput{
  position:absolute;
  z-index:132;
  display:flex;
  align-items:center;
  gap:6px;
  transform:translate(-50%,calc(-100% - 112px));
  padding:6px 7px;
  border:1px solid rgba(255,255,255,.18);
  border-radius:8px;
  background:rgba(12,14,18,.96);
  box-shadow:0 8px 22px rgba(0,0,0,.34);
  pointer-events:auto;
  touch-action:auto;
  user-select:text;
  -webkit-user-select:text;
}
#transformFloatInput[hidden]{display:none!important}
#transformFloatInput .tfi-label{
  font-size:11px;
  font-weight:650;
  white-space:nowrap;
  color:#eef2f7;
  pointer-events:none;
}
#transformFloatInput .tfi-input{
  width:84px;
  min-height:30px;
  box-sizing:border-box;
  padding:4px 7px;
  border:1px solid rgba(255,255,255,.28);
  border-radius:6px;
  background:#080a0e;
  color:#fff;
  font-size:13px;
  line-height:1;
  outline:none;
  pointer-events:auto;
  touch-action:auto;
  -webkit-user-select:text;
  user-select:text;
}
#transformFloatInput .tfi-input:focus{border-color:rgba(255,255,255,.62)}
#transformFloatInput .tfi-apply{
  min-height:30px;
  padding:4px 7px;
  font-size:11px;
  border-radius:6px;
  pointer-events:auto;
  touch-action:manipulation;
}
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

#totalGizmo .tg-tool-sector.tg-tool-unavailable{opacity:.28;filter:saturate(.25);cursor:not-allowed}
#totalGizmo .tg-tool-sector.tg-tool-unavailable::after{content:'×';position:absolute;right:5px;top:3px;font-size:9px;opacity:.7}
#totalGizmo .tg-tool-sector.tg-tool-active{box-shadow:inset 0 0 0 1px rgba(238,242,247,.8);background:rgba(238,242,247,.16)}
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
  const hitWidth=el.classList.contains('tg-scale-node')?22:el.classList.contains('tg-arc')?14:el.classList.contains('tg-screen-ring')||el.classList.contains('tg-scale-ring')?15:18;
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
    if(text){hudText.textContent=text.replace(/^Total Gizmo\s*•\s*/,'');hudText.hidden=false;}
  }).observe(status,{childList:true,subtree:true,characterData:true});
}

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
  const s=state(),mesh=s?.mesh,camera=s?.camera,mode=currentMode();
  if(!canvas||!viewportWrap||!mesh?.vertices?.length||!camera||!selectionAvailable(mesh,mode)){
    if(edgeExtrudeConstraintSession&&mode==='edge'){
      edgeExtrudeConstraintSession=false;
      syncEdgeExtrudeConstraintVisuals?.();
      resetTransientState?.({hideFloat:true});
      queueMicrotask(()=>globalThis.__boxlabEdgeExtrude?.setArmed?.(false));
      gestureDebug('EDGE EXTRUDE SESSION CLOSE',{reason:'selection-lost'});
    }
    root.hidden=true;hideFloatInput();lastSelectionKey='';return;
  }
  const key=selectionKey(mesh,mode);
  if(key!==lastSelectionKey){
    lastSelectionKey=key;
    hubSuppressedKey='';
    setHubState(edgeExtrudeConstraintSession&&mode==='edge'?'transform':(mode==='object'?'transform':'closed'),{reason:'selection-change'});
  }else if(mode==='object'&&hubState!=='transform'){
    setHubState('transform',{reason:'object-mode'});
  }
  const c=centerOf(mesh,mode),p=screenPoint(c,camera),cr=canvas.getBoundingClientRect(),vr=viewportWrap.getBoundingClientRect();
  const selectionLeft=cr.left-vr.left+p.x,selectionTop=cr.top-vr.top+p.y;
  let left=selectionLeft,top=selectionTop;
  if(edgeExtrudeConstraintSession&&mode==='edge'){
    const offset=122;
    const roomRight=vr.width-selectionLeft;
    const side=roomRight>offset+HALF+18?1:-1;
    left=selectionLeft+(offset*side);
  }
  root.style.left=`${left}px`;
  root.style.top=`${top}px`;
  floatPalette.style.left=`${selectionLeft}px`;
  floatPalette.style.top=`${selectionTop}px`;
  const suppressed=['face','edge'].includes(mode)&&hubSuppressedKey===key&&!edgeExtrudeConstraintSession;
  root.hidden=suppressed;
  root.dataset.hubState=hubState;
  root.dataset.expanded=expanded?'true':'false';
  root.dataset.mode=mode;
  root.dataset.singleComponent=mode!=='object'&&selectionKey(mesh,mode).split(':')[1]?.split(',').filter(Boolean).length===1?'true':'false';
  if(!suppressed&&(hubState==='transform'||mode==='object'))syncAxisVisuals(c,camera);
  if(edgeExtrudeConstraintSession)syncEdgeExtrudeConstraintVisuals();
}
sync();

globalThis.__boxlabTotalGizmo={
  element:root,
  activeConstraint:()=>explicitGizmoConstraint,
  activeDragSpec:()=>pointerId!==null&&lastSpec?{...lastSpec}:null,
  visible:()=>!root.hidden,
  refresh:()=>{},
  resetTransient:(options={})=>{resetTransientState(options);sync();return true;},
  completeExactEntry:(detail={})=>{
    if(detail.tool!=='rotate'||lastSpec?.tool!=='rotate')return false;
    awaitingTransformEnd=false;
    clearTransientHandleState();
    root.dataset.dragging='false';
    activeHandle=null;pointerId=null;explicitGizmoConstraint=null;
    if(hud){clearTimeout(hudHideTimer);hud.hidden=true;}
    const spec={...lastSpec,constraint:detail.constraint||lastSpec.constraint||'free'};
    lastSpec=spec;
    showFloatInput(spec);
    return true;
  },
  expanded:()=>expanded,
  hubState:()=>hubState,
  setExpanded:(next,options={})=>setExpanded(next,options),
  setHubState:(next,options={})=>setHubState(next,options),
  beginEdgeExtrudeConstraintSession:()=>{
    edgeExtrudeConstraintSession=true;
    hubSuppressedKey='';
    setHubState('transform',{reason:'edge-extrude-constraint',resumeSuspended:false});
    syncEdgeExtrudeConstraintVisuals();
    return true;
  },
  endEdgeExtrudeConstraintSession:()=>{
    edgeExtrudeConstraintSession=false;
    syncEdgeExtrudeConstraintVisuals();
    resetTransientState({hideFloat:true});
    return true;
  },
  edgeExtrudeConstraintSession:()=>edgeExtrudeConstraintSession,
  version:'0.36.18.667'
};
