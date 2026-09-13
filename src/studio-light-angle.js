// BoxLab v0.36.18.198 — Studio key + fill light controls.
// Visual only: positions and scales the existing Studio lighting rig.
const VERSION='0.36.18.198';
const ANGLE_KEY='boxlab-studio-light-angle';
const ELEVATION_KEY='boxlab-studio-light-elevation';
const INTENSITY_KEY='boxlab-studio-light-intensity';
const FILL_INTENSITY_KEY='boxlab-studio-fill-light-intensity';
let angle=Number(localStorage.getItem(ANGLE_KEY));
if(!Number.isFinite(angle))angle=0;
angle=Math.max(-180,Math.min(180,angle));
let elevation=Number(localStorage.getItem(ELEVATION_KEY));
if(!Number.isFinite(elevation))elevation=52;
elevation=Math.max(15,Math.min(80,elevation));
let intensity=Number(localStorage.getItem(INTENSITY_KEY));
if(!Number.isFinite(intensity))intensity=100;
intensity=Math.max(25,Math.min(200,intensity));
let fillIntensity=Number(localStorage.getItem(FILL_INTENSITY_KEY));
if(!Number.isFinite(fillIntensity))fillIntensity=100;
fillIntensity=Math.max(25,Math.min(200,fillIntensity));

function refresh(){globalThis.__boxlabRenderModes?.refreshStudio?.();}
function syncUI(){
  const angleSlider=document.querySelector('#studioLightAngle');
  const angleOutput=document.querySelector('#studioLightAngleOut');
  const elevationSlider=document.querySelector('#studioLightElevation');
  const elevationOutput=document.querySelector('#studioLightElevationOut');
  const intensitySlider=document.querySelector('#studioLightIntensity');
  const intensityOutput=document.querySelector('#studioLightIntensityOut');
  const fillSlider=document.querySelector('#studioFillLightIntensity');
  const fillOutput=document.querySelector('#studioFillLightIntensityOut');
  if(angleSlider&&Number(angleSlider.value)!==angle)angleSlider.value=String(angle);
  if(angleOutput)angleOutput.textContent=`${Math.round(angle)}°`;
  if(elevationSlider&&Number(elevationSlider.value)!==elevation)elevationSlider.value=String(elevation);
  if(elevationOutput)elevationOutput.textContent=`${Math.round(elevation)}°`;
  if(intensitySlider&&Number(intensitySlider.value)!==intensity)intensitySlider.value=String(intensity);
  if(intensityOutput)intensityOutput.textContent=`${Math.round(intensity)}%`;
  if(fillSlider&&Number(fillSlider.value)!==fillIntensity)fillSlider.value=String(fillIntensity);
  if(fillOutput)fillOutput.textContent=`${Math.round(fillIntensity)}%`;
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
function setIntensity(next,{silent=false}={}){
  const parsed=Number(next);
  intensity=Math.max(25,Math.min(200,Number.isFinite(parsed)?parsed:100));
  localStorage.setItem(INTENSITY_KEY,String(intensity));
  syncUI();refresh();
  if(!silent){
    document.dispatchEvent(new CustomEvent('boxlab-studio-light-intensity-change',{detail:{intensity}}));
    const status=document.querySelector('#selectionStatus');
    if(status)status.textContent=`Studio Key Light • ${Math.round(intensity)}%`;
  }
}
function setFillIntensity(next,{silent=false}={}){
  const parsed=Number(next);
  fillIntensity=Math.max(25,Math.min(200,Number.isFinite(parsed)?parsed:100));
  localStorage.setItem(FILL_INTENSITY_KEY,String(fillIntensity));
  syncUI();refresh();
  if(!silent){
    document.dispatchEvent(new CustomEvent('boxlab-studio-fill-light-intensity-change',{detail:{fillIntensity}}));
    const status=document.querySelector('#selectionStatus');
    if(status)status.textContent=`Studio Fill Light • ${Math.round(fillIntensity)}%`;
  }
}
function ensureUI(){
  const section=document.querySelector('#viewportDisplaySection');
  if(!section)return false;
  if(document.querySelector('#studioLightAngle')&&document.querySelector('#studioLightElevation')&&document.querySelector('#studioLightIntensity')&&document.querySelector('#studioFillLightIntensity')){syncUI();return true;}
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
  let intensityRow=document.querySelector('#studioLightIntensityRow');
  if(!intensityRow){
    intensityRow=document.createElement('label');intensityRow.className='range-row';intensityRow.id='studioLightIntensityRow';
    intensityRow.innerHTML='<span>Key</span><input id="studioLightIntensity" type="range" min="25" max="200" value="100" step="5"/><output id="studioLightIntensityOut">100%</output>';
    section.append(intensityRow);
    const slider=intensityRow.querySelector('#studioLightIntensity');
    slider.addEventListener('input',()=>setIntensity(slider.value));
    slider.addEventListener('change',()=>setIntensity(slider.value));
  }else{
    const rowLabel=intensityRow.querySelector('span');if(rowLabel)rowLabel.textContent='Key';
  }
  let fillRow=document.querySelector('#studioFillLightIntensityRow');
  if(!fillRow){
    fillRow=document.createElement('label');fillRow.className='range-row';fillRow.id='studioFillLightIntensityRow';
    fillRow.innerHTML='<span>Fill</span><input id="studioFillLightIntensity" type="range" min="25" max="200" value="100" step="5"/><output id="studioFillLightIntensityOut">100%</output>';
    section.append(fillRow);
    const slider=fillRow.querySelector('#studioFillLightIntensity');
    slider.addEventListener('input',()=>setFillIntensity(slider.value));
    slider.addEventListener('change',()=>setFillIntensity(slider.value));
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
  get intensity(){return intensity;},
  get intensityScale(){return intensity/100;},
  get fillIntensity(){return fillIntensity;},
  get fillIntensityScale(){return fillIntensity/100;},
  setAngle,setElevation,setIntensity,setFillIntensity,refresh
};
