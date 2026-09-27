// BoxLab v0.36.18.189 — Studio atmosphere presentation layer.
// Visual only: adds a subtle screen-space vignette to Studio without affecting
// WebGL picking, camera controls, geometry, selection, tools or History.
const VERSION='0.36.18.189';
let overlay=null;
let mode='studio';

function ensure(){
  const wrap=document.querySelector('#viewportWrap');
  if(!wrap)return false;
  overlay=document.querySelector('#boxlabStudioAtmosphere');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='boxlabStudioAtmosphere';
    overlay.setAttribute('aria-hidden','true');
    overlay.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:3;opacity:0;transition:opacity 180ms ease;background:radial-gradient(ellipse at 55% 46%,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 42%,rgba(5,8,13,.08) 67%,rgba(3,6,10,.26) 100%);mix-blend-mode:multiply;';
    wrap.appendChild(overlay);
  }
  return true;
}
function sync(){
  if(!ensure())return false;
  const studio=mode==='studio'||!!document.querySelector('#viewportRenderLooks button[data-render="studio"].active');
  overlay.style.opacity=studio?'1':'0';
  return true;
}

document.addEventListener('boxlab-render-mode-change',event=>{mode=event.detail?.mode||mode;sync();});
window.addEventListener('boxlab-bridge-state',()=>requestAnimationFrame(sync));
[0,120,500].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabStudioAtmosphere={version:VERSION,sync};
