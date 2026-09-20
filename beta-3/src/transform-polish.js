const status=document.querySelector('#selectionStatus');
const strip=document.querySelector('#transformStrip');
const snapRow=document.querySelector('.quick-snap');
const axisSnap=document.querySelector('#axisSnapToggle');
const inferenceSnap=document.querySelector('#inferenceSnapToggle');
const toolButtons=[...document.querySelectorAll('#toolModes button')];

function activeTool(){return globalThis.__boxlabTransformArming?.tool?.()||document.querySelector('#toolModes button.active')?.dataset?.tool||null;}
function activeConstraint(){return globalThis.__boxlabTransformArming?.constraint?.()||'free';}
function cap(s){return s?s[0].toUpperCase()+s.slice(1):'';}
function mode(){return globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function count(){const m=mode();return m==='object'?1:[...new Set(globalThis.__boxlabSelectionBridge?.indices?.()||[])].length;}
function sync(){
  const tool=activeTool(),constraint=activeConstraint(),n=count();
  if(snapRow){
    snapRow.classList.toggle('transform-armed',!!tool);
    snapRow.classList.toggle('snap-active',!!axisSnap?.checked||!!inferenceSnap?.checked);
  }
  strip?.setAttribute('data-active-tool',tool||'');
  strip?.setAttribute('data-constraint',tool?constraint:'');
  toolButtons.forEach(b=>{
    const on=tool===b.dataset.tool;
    b.setAttribute('aria-pressed',on?'true':'false');
  });
  document.querySelectorAll('#transformPrecision [data-constraint]').forEach(b=>{
    const on=!!tool&&constraint===b.dataset.constraint;
    b.setAttribute('aria-pressed',on?'true':'false');
  });
  if(axisSnap)axisSnap.closest('label')?.classList.toggle('active',axisSnap.checked);
  if(inferenceSnap)inferenceSnap.closest('label')?.classList.toggle('active',inferenceSnap.checked);
  const value=document.querySelector('#transformValue');
  if(value){
    value.disabled=!tool||n===0;
    value.title=!tool?'Choose Move, Scale or Rotate':n===0?`Select a ${mode()} first`:`Numeric ${cap(tool)} • ${cap(constraint)}`;
  }
}

function announceArm(){
  queueMicrotask(()=>{
    sync();
    const tool=activeTool();
    if(!tool||!status)return;
    const n=count(),m=mode(),constraint=activeConstraint();
    status.textContent=n?`${cap(tool)} armed • ${n} ${m}${n===1?'':'s'} • ${cap(constraint)}${tool==='move'&&inferenceSnap?.checked?' • Inference ON':''}`:`${cap(tool)} armed • select a ${m}`;
  });
}

toolButtons.forEach(b=>b.addEventListener('click',announceArm,true));
document.querySelectorAll('#transformPrecision [data-constraint]').forEach(b=>b.addEventListener('click',()=>queueMicrotask(()=>{sync();if(activeTool()&&status)status.textContent=`${cap(activeTool())} • ${cap(activeConstraint())} constraint`;}),true));
axisSnap?.addEventListener('change',()=>queueMicrotask(sync));
inferenceSnap?.addEventListener('change',()=>queueMicrotask(sync));
document.querySelector('#selectionModes')?.addEventListener('click',()=>queueMicrotask(sync),true);
window.addEventListener('boxlab-bridge-state',sync);

// Pencil transforms should never inherit stale browser text/input focus.
document.addEventListener('pointerdown',event=>{
  if(event.target?.id!=='viewport'||event.pointerType!=='pen'||!activeTool())return;
  const active=document.activeElement;
  if(active&&active!==document.body&&active?.id==='transformValue')active.blur();
},true);

sync();
