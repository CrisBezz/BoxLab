// BoxLab v0.36.18.188 — viewport ground/grid presentation polish.
// Visual only: floor/grid/off preference; Clean View still hides grid and axes.
const VERSION='0.36.18.188';
let clean=false;
let mode='studio';
let ground='plane';
const groundIcons={
  plane:'<path d="M3 13 12 5 21 13 12 21Z" fill="#cbd0d8"/>',
  grid:'<path d="M3 13 12 5 21 13 12 21Z"/><path d="m6 10.3 9 8m-6-10.6 9 8m-3-8-9 8m12-5.4-9 8"/>',
  off:'<path d="M3 13 12 5 21 13 12 21Z"/>'
};

function syncButton(){
  const button=document.querySelector('#floorToggleBtn');if(!button)return;
  if(!button.dataset.groundBound){button.dataset.groundBound='true';button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();cycle();});}
  if(button.dataset.floorState!==ground){
    button.dataset.floorState=ground;
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+groundIcons[ground]+'</svg>';
    const label={plane:'Floor: Plane — show grid',grid:'Floor: Grid — turn off',off:'Floor: Off — show plane'}[ground];
    button.title=label;button.setAttribute('aria-label',label);
  }
}
function setGround(next){
  if(!Object.hasOwn(groundIcons,next))return ground;
  ground=next;apply();return ground;
}
function cycle(){return setGround({plane:'grid',grid:'off',off:'plane'}[ground]);}

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
  let grid=null,axes=null,floor=null,contact=null;
  scene.traverse(object=>{
    if(!grid&&object?.type==='GridHelper')grid=object;
    if(!axes&&object?.type==='AxesHelper')axes=object;
    if(object?.userData?.boxlabStudioFloor)floor=object;
    if(object?.userData?.boxlabStudioPolish)contact=object;
  });
  return{grid,axes,floor,contact};
}
function apply(){
  syncButton();
  const {grid,axes,floor,contact}=helpers();
  if(!grid&&!axes&&!floor&&!contact)return false;
  const cleanNow=globalThis.__boxlabCleanView?.enabled??clean;
  if(grid){
    grid.visible=ground==='grid'&&!cleanNow;
    if(grid.visible)setOpacity(grid,mode==='studio'?.18:.34);
  }
  if(floor)floor.visible=ground==='plane';
  if(contact)contact.visible=ground==='plane'&&mode==='studio';
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

syncButton();
globalThis.__boxlabGroundPolish={version:VERSION,apply,get ground(){return ground;},setGround,cycle};
