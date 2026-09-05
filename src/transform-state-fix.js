// BoxLab v0.36.18.5 — transform control state stability.
// Keeps the transform constraint stable while switching Move / Scale / Rotate,
// and makes Axis Snap take effect immediately without re-arming Move.

const toolModes=document.querySelector('#toolModes');
const axisSnap=document.querySelector('#axisSnapToggle');
const precision=()=>document.querySelector('#transformPrecision');
let savedConstraint='free';
let axisPromotedAuto=false;

function activeConstraint(){
  return precision()?.querySelector('[data-constraint].active')?.dataset?.constraint
    || globalThis.__boxlabTransformArming?.constraint?.()
    || savedConstraint
    || 'free';
}
function applyConstraint(value){
  const clean=['free','x','y','z','auto'].includes(value)?value:'free';
  savedConstraint=clean;
  globalThis.__boxlabTransformArming?.setConstraint?.(clean);
  const button=precision()?.querySelector(`[data-constraint="${clean}"]`);
  if(button&&!button.classList.contains('active'))button.click();
}

// Capture the state before a tool button gets a chance to disturb it.
toolModes?.addEventListener('pointerdown',event=>{
  if(!event.target.closest('button[data-tool]'))return;
  savedConstraint=activeConstraint();
},true);

toolModes?.addEventListener('click',event=>{
  if(!event.target.closest('button[data-tool]'))return;
  const keep=savedConstraint;
  queueMicrotask(()=>applyConstraint(keep));
});

axisSnap?.addEventListener('change',()=>{
  const current=activeConstraint();
  if(axisSnap.checked){
    // Axis Snap means automatic X/Y/Z inference when no explicit rail is chosen.
    if(current==='free'){
      axisPromotedAuto=true;
      queueMicrotask(()=>applyConstraint('auto'));
    }else{
      axisPromotedAuto=false;
      queueMicrotask(()=>applyConstraint(current));
    }
  }else if(axisPromotedAuto&&current==='auto'){
    axisPromotedAuto=false;
    queueMicrotask(()=>applyConstraint('free'));
  }else{
    queueMicrotask(()=>applyConstraint(current));
  }
});

precision()?.addEventListener('click',event=>{
  const button=event.target.closest('[data-constraint]');
  if(!button)return;
  savedConstraint=button.dataset.constraint||'free';
  axisPromotedAuto=false;
});
