// BoxLab v0.36.18.194 — Studio light angle control.
// Visual only: rotates the existing Studio key light around the model.
const VERSION='0.36.18.194';
const STORAGE_KEY='boxlab-studio-light-angle';
let angle=Number(localStorage.getItem(STORAGE_KEY));
if(!Number.isFinite(angle))angle=0;
angle=Math.max(-180,Math.min(180,angle));

function refresh(){globalThis.__boxlabRenderModes?.refreshStudio?.();}
function setAngle(next,{silent=false}={}){
  const value=Math.max(-180,Math.min(180,Number(next)||0));
  angle=value;
  localStorage.setItem(STORAGE_KEY,String(angle));
  const slider=document.querySelector('#studioLightAngle');
  const output=document.querySelector('#studioLightAngleOut');
  if(slider&&Number(slider.value)!==angle)slider.value=String(angle);
  if(output)output.textContent=`${Math.round(angle)}°`;
  refresh();
  if(!silent){
    document.dispatchEvent(new CustomEvent('boxlab-studio-light-angle-change',{detail:{angle}}));
    const status=document.querySelector('#selectionStatus');
    if(status)status.textContent=`Studio Light • ${Math.round(angle)}°`;
  }
}
function ensureUI(){
  const section=document.querySelector('#viewportDisplaySection');
  if(!section)return false;
  if(document.querySelector('#studioLightAngle')){setAngle(angle,{silent:true});return true;}
  const label=document.createElement('div');
  label.className='viewport-menu-label';
  label.textContent='Studio Light';
  label.style.marginTop='9px';
  const row=document.createElement('label');
  row.className='range-row';
  row.id='studioLightAngleRow';
  row.innerHTML='<span>Angle</span><input id="studioLightAngle" type="range" min="-180" max="180" value="0" step="5"/><output id="studioLightAngleOut">0°</output>';
  section.append(label,row);
  const slider=row.querySelector('#studioLightAngle');
  slider.addEventListener('input',()=>setAngle(slider.value));
  slider.addEventListener('change',()=>setAngle(slider.value));
  setAngle(angle,{silent:true});
  return true;
}

if(!ensureUI()){
  let attempts=0;
  const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>=50)clearInterval(timer);},100);
}
window.addEventListener('boxlab-bridge-state',refresh);
document.addEventListener('boxlab-render-mode-change',refresh);

globalThis.__boxlabStudioLightAngle={version:VERSION,get angle(){return angle;},get radians(){return angle*Math.PI/180;},setAngle,refresh};
