const wrap=document.querySelector('#viewportWrap');
const tabs=[['lights','Lights'],['materials','Materials'],['raytracer','Ray Tracer'],['camera','Camera']];
const environments=[['studio','Studio Cyclorama'],['golden','Golden Hour'],['loft','Daylight Loft'],['cornell','Cornell Bounce'],['obsidian','Obsidian Void']];
const materialPresets=[['brushed-titanium','Brushed Titanium'],['polished-chrome','Mirror Chrome'],['anodized-gold','Satin Brass'],['optical-crystal','Optical Glass'],['smoked-acrylic','Smoked Quartz'],['matte-ceramic','Honed Travertine'],['car-lacquer','Carbon Lacquer'],['warm-emissive','Filament Glow']];
const rigs=[['three-point','Three-Point Studio'],['golden-hour','Golden Hour'],['chiaroscuro','Chiaroscuro'],['product-softbox','Product Softbox'],['cornell-gi','Cornell Bounce']];
let active=false,ready=false,wasReady=false,collapsed=false,tab='lights',state=null,selectedLight='',selectedMaterial='';
let dock=null;

function emit(action){document.dispatchEvent(new CustomEvent('boxlab-helios-dock-action',{detail:action}));}
function field(label,group,key,min,max,step,value,suffix=''){
  return `<label class="helios-field"><span>${label}<output>${Number(value).toFixed(step<1?2:0)}${suffix}</output></span><input type="range" data-group="${group}" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}"/></label>`;
}
function button(label,attrs='',selected=false){return `<button type="button" class="helios-choice${selected?' is-selected':''}" ${attrs}>${label}</button>`;}
function makeDock(){
  if(dock||!wrap)return;
  dock=document.createElement('section');dock.id='boxlabHeliosDock';dock.className='helios-dock';dock.hidden=true;dock.setAttribute('aria-label','Helios render controls');
  dock.innerHTML='<button type="button" class="helios-dock-toggle" aria-expanded="true"><span class="helios-chevron">⌄</span><span>Ray Trace</span><span class="helios-status">Loading…</span></button><div class="helios-dock-panel"><nav class="helios-tabs" role="tablist" aria-label="Helios controls"></nav><div class="helios-panel-body"></div></div>';
  wrap.append(dock);
  dock.addEventListener('pointerdown',event=>event.stopPropagation());
  dock.addEventListener('touchstart',event=>event.stopPropagation(),{passive:true});
  dock.querySelector('.helios-dock-toggle').addEventListener('click',()=>{collapsed=!collapsed;syncVisibility();});
  dock.addEventListener('click',onClick);
  dock.addEventListener('input',onInput);
  drawTabs();
}
function syncVisibility(){
  if(!dock)return;
  dock.hidden=!active;
  dock.classList.toggle('is-collapsed',collapsed);
  const toggle=dock.querySelector('.helios-dock-toggle');
  toggle.setAttribute('aria-expanded',String(!collapsed));
  dock.querySelector('.helios-chevron').textContent=collapsed?'⌄':'⌃';
  dock.querySelector('.helios-status').textContent=ready?'Helios ready':'Preparing trace…';
}
function drawTabs(){
  if(!dock)return;
  dock.querySelector('.helios-tabs').innerHTML=tabs.map(([id,label])=>`<button type="button" role="tab" aria-selected="${tab===id}" class="helios-tab${tab===id?' is-active':''}" data-tab="${id}">${label}</button>`).join('');
  drawPanel();
}
function drawPanel(){
  if(!dock)return;
  const body=dock.querySelector('.helios-panel-body');
  if(!state||!ready){body.innerHTML=`<p class="helios-note">${state?'The current model changed; Helios is rebuilding the trace controls…':'Helios is preparing the current BoxLab model…'}</p>`;return;}
  if(tab==='lights')body.innerHTML=drawLights();
  else if(tab==='materials')body.innerHTML=drawMaterials();
  else if(tab==='raytracer')body.innerHTML=drawRaytracer();
  else body.innerHTML=drawCamera();
}
function syncPanelValues(){
  if(!state||!dock)return;
  const selected=tab==='lights'?state.lights.find(item=>item.id===selectedLight):state.materials.find(item=>item.id===selectedMaterial);
  for(const input of dock.querySelectorAll('[data-group][data-key]')){
    const group=input.dataset.group,key=input.dataset.key;
    const source=group==='light'?selected:group==='material'?selected:group==='camera'?{fov:state.cameraFov}:state.settings;
    if(!source||!(key in source))continue;
    const value=source[key];
    if(input.type==='checkbox')input.checked=Boolean(value);else if(document.activeElement!==input)input.value=String(value);
    if(input.type==='range'){
      const output=input.closest('.helios-field')?.querySelector('output');
      if(output&&document.activeElement!==input)output.textContent=formatValue(key,value);
    }
  }
  for(const buttonNode of dock.querySelectorAll('[data-do="environment"]'))buttonNode.classList.toggle('is-selected',buttonNode.dataset.id===state.settings.environment);
  const note=dock.querySelector('.helios-sample-note');
  if(note)note.textContent=`${state.samples} samples accumulated at ${state.resolution[0]} × ${state.resolution[1]}.`;
}
function formatValue(key,value){
  const digits=['roughness','metalness','transmission','ior','clearcoat','emissiveIntensity','exposure','envIntensity'].includes(key)?2:0;
  const suffix={intensity:' lm',kelvin:' K',azimuth:'°',elevation:'°',radius:' m',exposure:' EV'}[key]||'';
  return `${Number(value).toFixed(digits)}${suffix}`;
}
function drawLights(){
  const current=state.lights.find(light=>light.id===selectedLight)||state.lights[0];
  if(!current)return '<p class="helios-note">No Helios lights are available.</p>';
  selectedLight=current.id;
  const temperature=current.useKelvin?field('Kelvin temperature','light','kelvin',2000,9500,100,current.kelvin,' K'):`<label class="helios-colour"><span>Light colour</span><input type="color" data-group="light" data-key="color" value="${current.color}" aria-label="Light colour"/></label>`;
  return `<div class="helios-stack"><div class="helios-scroll-row">${state.lights.map(light=>button(`${light.enabled?'●':'○'} ${light.name}`,`data-do="select-light" data-id="${light.id}"`,light.id===current.id)).join('')}<button type="button" class="helios-choice" data-do="toggle-light">${current.enabled?'Enabled':'Muted'}</button></div><div class="helios-grid">${field('Intensity','light','intensity',0,60,1,current.intensity,' lm')}${temperature}${field('Azimuth','light','azimuth',-180,180,1,current.azimuth,'°')}${field('Elevation','light','elevation',6,85,1,current.elevation,'°')}${field('Softbox radius','light','radius',0.05,1.6,0.05,current.radius,' m')}<label class="helios-toggle"><input type="checkbox" data-group="light" data-key="useKelvin" ${current.useKelvin?'checked':''}/> Use Kelvin temperature</label></div><div class="helios-scroll-row helios-presets"><span class="helios-row-label">Lighting rigs</span>${rigs.map(([id,label])=>button(label,`data-do="lighting-rig" data-id="${id}"`)).join('')}</div></div>`;
}
function drawMaterials(){
  const current=state.materials.find(material=>material.id===selectedMaterial)||state.materials[0];
  if(!current)return '<p class="helios-note">No material slots were found in the current BoxLab scene.</p>';
  selectedMaterial=current.id;
  const customMaps=current.hasCustomAlbedo||current.hasCustomNormal||current.hasCustomRoughness||current.hasCustomMetalness;
  return `<div class="helios-stack"><div class="helios-scroll-row">${state.materials.map(material=>button(`<span class="helios-swatch" style="--swatch:${material.color}"></span>${escapeText(material.name)}`,`data-do="select-material" data-id="${material.id}"`,material.id===current.id)).join('')}</div><div class="helios-grid"><label class="helios-colour"><span>Albedo</span><input type="color" data-group="material" data-key="color" value="${current.color}" aria-label="Albedo colour"/></label>${field('Roughness','material','roughness',0.02,1,0.01,current.roughness)}${field('Metalness','material','metalness',0,1,0.01,current.metalness)}${field('Transmission','material','transmission',0,1,0.01,current.transmission)}${field('IOR','material','ior',1.1,2.2,0.01,current.ior)}${field('Clearcoat','material','clearcoat',0,1,0.01,current.clearcoat)}${field('Emission','material','emissiveIntensity',0,4,0.05,current.emissiveIntensity)}</div><div class="helios-scroll-row helios-presets"><span class="helios-row-label">Material presets</span>${materialPresets.map(([id,label])=>button(label,`data-do="material-preset" data-id="${id}"`)).join('')}</div><p class="helios-note">Render-only controls. BoxLab’s saved material is unchanged.${customMaps?' Imported GLB texture maps stay connected to preserve their detail.':' Preset patterns are available where the source has no texture maps.'}</p></div>`;
}
function drawRaytracer(){
  const settings=state.settings;
  return `<div class="helios-stack"><div class="helios-scroll-row">${environments.map(([id,label])=>button(label,`data-do="environment" data-id="${id}"`,settings.environment===id)).join('')}${button('Restart trace','data-do="restart"')}</div><div class="helios-grid">${field('Exposure','settings','exposure',0.4,2.4,0.04,settings.exposure,' EV')}${field('GI bounces','settings','maxBounces',1,6,1,settings.maxBounces)}${field('Environment fill','settings','envIntensity',0,2,0.05,settings.envIntensity)}<label class="helios-toggle"><input type="checkbox" data-group="settings" data-key="denoiser" ${settings.denoiser?'checked':''}/> Denoiser</label><label class="helios-toggle"><input type="checkbox" data-group="settings" data-key="clayMode" ${settings.clayMode?'checked':''}/> Clay render</label><label class="helios-field"><span>Sample target</span><select data-group="settings" data-key="maxSamples"><option value="32" ${settings.maxSamples===32?'selected':''}>32 spp</option><option value="64" ${settings.maxSamples===64?'selected':''}>64 spp</option><option value="128" ${settings.maxSamples===128?'selected':''}>128 spp</option><option value="256" ${settings.maxSamples===256?'selected':''}>256 spp</option></select></label></div><p class="helios-note helios-sample-note">${state.samples} samples accumulated at ${state.resolution[0]} × ${state.resolution[1]}.</p></div>`;
}
function drawCamera(){
  return `<div class="helios-stack"><p class="helios-note">View presets keep the current BoxLab orbit target.</p><div class="helios-scroll-row">${[['hero','3/4 Hero'],['front','Front'],['side','Profile'],['top','Overhead'],['closeup','Macro']].map(([id,label])=>button(label,`data-do="camera" data-id="${id}"`)).join('')}</div><div class="helios-grid">${field('Lens field of view','camera','fov',20,65,1,state.cameraFov||42,'°')}</div></div>`;
}
function escapeText(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function onClick(event){
  const tabButton=event.target.closest('[data-tab]');
  if(tabButton){tab=tabButton.dataset.tab;drawTabs();return;}
  const buttonNode=event.target.closest('[data-do]');
  if(!buttonNode)return;
  const action=buttonNode.dataset.do,id=buttonNode.dataset.id;
  if(action==='select-light'){selectedLight=id;drawPanel();}
  else if(action==='toggle-light'){const light=state?.lights.find(item=>item.id===selectedLight);if(light)emit({action:'light',id:selectedLight,patch:{enabled:!light.enabled}});}
  else if(action==='select-material'){selectedMaterial=id;drawPanel();}
  else if(action==='lighting-rig')emit({action,id});
  else if(action==='material-preset')emit({action,id:selectedMaterial,presetId:id});
  else if(action==='environment')emit({action:'settings',patch:{environment:id}});
  else if(action==='restart')emit({action:'restart'});
  else if(action==='camera')emit({action:'camera',preset:id});
}
function onInput(event){
  const input=event.target.closest('[data-group][data-key]');
  if(!input)return;
  const group=input.dataset.group,key=input.dataset.key;
  const value=input.type==='checkbox'?input.checked:input.type==='range'||input.tagName==='SELECT'?Number(input.value):input.value;
  if(input.type==='range'){
    const output=input.closest('.helios-field')?.querySelector('output');
    if(output)output.textContent=`${Number(value).toFixed(Number(input.step)<1?2:0)}${key==='intensity'?' lm':key==='kelvin'?' K':key==='azimuth'||key==='elevation'?'°':key==='radius'?' m':key==='exposure'?' EV':''}`;
  }
  if(group==='light')emit({action:'light',id:selectedLight,patch:{[key]:value,...(key==='kelvin'?{useKelvin:true}:key==='color'?{useKelvin:false}:{})}});
  else if(group==='material')emit({action:'material',id:selectedMaterial,patch:{[key]:value}});
  else if(group==='camera')emit({action:'camera-fov',value});
  else emit({action:'settings',patch:{[key]:value}});
}
document.addEventListener('boxlab-helios-trace-state',event=>{
  const detail=event.detail||{};active=Boolean(detail.active);ready=Boolean(detail.ready);if(detail.state)state=detail.state;
  makeDock();syncVisibility();
  if(ready&&!wasReady)drawPanel();else if(ready)syncPanelValues();else if(active)drawPanel();
  wasReady=ready;
});
document.addEventListener('boxlab-render-mode-change',event=>{
  active=event.detail?.mode==='pathtrace';makeDock();syncVisibility();if(active&&!ready)drawPanel();
});
makeDock();
