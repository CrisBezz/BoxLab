// BoxLab v0.36.18.195 — Studio light angle + elevation controls.
// Visual only: positions the existing Studio key light around the model.
const VERSION='0.36.18.195';
const ANGLE_KEY='boxlab-studio-light-angle';
const ELEVATION_KEY='boxlab-studio-light-elevation';
let angle=Number(localStorage.getItem(ANGLE_KEY));
if(!Number.isFinite(angle))angle=0;
angle=Math.max(-180,Math.min(180,angle));
let elevation=Number(localStorage.getItem(ELEVATION_KEY));
if(!Number.isFinite(elevation))elevation=52;
elevation=Math.max(15,Math.min(80,elevation));

function refresh(){globalThis.__boxlabRenderModes?.refreshStudio?.();}
function syncUI(){
  const angleSlider=document.querySelector('#studioLightAngle');
  const angleOutput=document.querySelector('#studioLightAngleOut');
  const elevationSlider=document.querySelector('#studioLightElevation');
  const elevationOutput=document.querySelector('#studioLightElevationOut');
  if(angleSlider&&Number(angleSlider.value)!==angle)angleSlider.value=String(angle);
  if(angleOutput)angleOutput.textContent=`${Math.round(angle)}°`;
  if(elevationSlider&&Number(elevationSlider.value)!==elevation)elevationSlider.value=String(elevation);
  if(elevationOutput)elevationOutput.textContent=`${Math.round(elevation)}°`;
}
function setAngle(next,{silent=false}={}){
  angle=Math.max(-180,Math.min(180,Number(next)||0));
  localStorage.setItem(ANGLE_KEY,String(angle));
  syncUI();refresh();
  if(!silent){
    document.dispatchEvent(new CustomEvent('boxlab-studio-light-angle-change',{detail:{angle}}));
    const status=document.querySelector('#selectionStatus');
    if(status)status.textContent=`Studio Light Angle • ${Math.round(angle)}°`;
  }
}
function setElevation(next,{silent=false}={}){
  const parsed=Number(next);
  elevation=Math.max(15,Math.min(80,Number.isFinite(parsed)?parsed:52));
  localStorage.setItem(ELEVATION_KEY,String(elevation));
  syncUI();refresh();
  if(!silent){
    document.dispatchEvent(new CustomEvent('boxlab-studio-light-elevation-change',{detail:{elevation}}));
    const status=document.querySelector('#selectionStatus');
    if(status)status.textContent=`Studio Light Elevation • ${Math.round(elevation)}°`;
  }
}
function ensureUI(){
  const section=document.querySelector('#viewportDisplaySection');
  if(!section)return false;
  if(document.querySelector('#studioLightAngle')&&document.querySelector('#studioLightElevation')){syncUI();return true;}
  let label=document.querySelector('#studioLightLabel');
  if(!label){
    label=document.createElement('div');label.id='studioLightLabel';label.className='viewport-menu-label';label.textContent='Studio Light';label.style.marginTop='9px';section.append(label);
  }
  let angleRow=document.querySelector('#studioLightAngleRow');
  if(!angleRow){
    angleRow=document.createElement('label');angleRow.className='range-row';angleRow.id='studioLightAngleRow';
    angleRow.innerHTML='<span>Angle</span><input id="studioLightAngle" type="range" min="-180" max="180" value="0" step="5"/><output id="studioLightAngleOut">0°</output>';
    section.append(angleRow);
    const slider=angleRow.querySelector('#studioLightAngle');
    slider.addEventListener('input',()=>setAngle(slider.value));
    slider.addEventListener('change',()=>setAngle(slider.value));
  }
  let elevationRow=document.querySelector('#studioLightElevationRow');
  if(!elevationRow){
    elevationRow=document.createElement('label');elevationRow.className='range-row';elevationRow.id='studioLightElevationRow';
    elevationRow.innerHTML='<span>Elevation</span><input id="studioLightElevation" type="range" min="15" max="80" value="52" step="1"/><output id="studioLightElevationOut">52°</output>';
    section.append(elevationRow);
    const slider=elevationRow.querySelector('#studioLightElevation');
    slider.addEventListener('input',()=>setElevation(slider.value));
    slider.addEventListener('change',()=>setElevation(slider.value));
  }
  syncUI();refresh();return true;
}

if(!ensureUI()){
  let attempts=0;
  const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>=50)clearInterval(timer);},100);
}
window.addEventListener('boxlab-bridge-state',refresh);
document.addEventListener('boxlab-render-mode-change',refresh);

globalThis.__boxlabStudioLightAngle={
  version:VERSION,
  get angle(){return angle;},
  get radians(){return angle*Math.PI/180;},
  get elevation(){return elevation;},
  get elevationRadians(){return elevation*Math.PI/180;},
  setAngle,setElevation,refresh
};
