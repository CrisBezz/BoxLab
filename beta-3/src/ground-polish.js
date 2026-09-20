// BoxLab v0.36.18.188 — viewport ground/grid presentation polish.
// Visual only: tones down the modelling grid and hides ground helpers in Clean View.
const VERSION='0.36.18.188';
let clean=false;
let mode='studio';

function bridge(){return globalThis.__boxlabBridgeState||null;}
function materials(object){return Array.isArray(object?.material)?object.material:[object?.material].filter(Boolean);}
function setOpacity(object,opacity){
  for(const material of materials(object)){
    material.transparent=true;
    material.opacity=opacity;
    material.depthWrite=false;
    material.needsUpdate=true;
  }
}
function helpers(){
  const scene=bridge()?.scene;
  if(!scene)return{};
  let grid=null,axes=null;
  scene.traverse(object=>{
    if(!grid&&object?.type==='GridHelper')grid=object;
    if(!axes&&object?.type==='AxesHelper')axes=object;
  });
  return{grid,axes};
}
function apply(){
  const {grid,axes}=helpers();
  if(!grid&&!axes)return false;
  const cleanNow=globalThis.__boxlabCleanView?.enabled??clean;
  if(grid){
    grid.visible=!cleanNow;
    if(!cleanNow)setOpacity(grid,mode==='studio'?.18:.34);
  }
  if(axes){
    axes.visible=!cleanNow;
    if(!cleanNow)setOpacity(axes,mode==='studio'?.72:.9);
  }
  return true;
}
function schedule(){requestAnimationFrame(apply);}

document.addEventListener('boxlab-clean-view-change',event=>{clean=!!event.detail?.enabled;schedule();});
document.addEventListener('boxlab-render-mode-change',event=>{mode=event.detail?.mode||mode;schedule();});
window.addEventListener('boxlab-bridge-state',schedule);
[0,120,500,1200].forEach(delay=>setTimeout(apply,delay));

globalThis.__boxlabGroundPolish={version:VERSION,apply};
