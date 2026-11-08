const STORAGE_KEY='boxlab.general-settings.v1';
const DEFAULTS=Object.freeze({pencilOrbit:true,pencilSelection:true,snapTop:false,leftHanded:false});
let current=load();

function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
    return Object.fromEntries(Object.keys(DEFAULTS).map(key=>[key,typeof saved?.[key]==='boolean'?saved[key]:DEFAULTS[key]]));
  }catch{return {...DEFAULTS};}
}
function apply(){
  const root=document.documentElement;
  root.classList.toggle('boxlab-snap-top',current.snapTop);
  root.classList.toggle('boxlab-left-handed',current.leftHanded);
  window.dispatchEvent(new CustomEvent('boxlab-general-settings-change',{detail:{...current}}));
}
export function getGeneralSettings(){return {...current};}
export function setGeneralSetting(key,value){
  if(!(key in DEFAULTS)||typeof value!=='boolean')return false;
  current={...current,[key]:value};
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(current));}catch{}
  apply();
  return true;
}

export function mountGeneralSettings(panel){
  const host=panel?.querySelector('#viewModesScroll')||panel;
  if(!host||host.querySelector('#generalSettingsSection'))return;
  const section=document.createElement('section');
  section.className='viewport-menu-section';
  section.id='generalSettingsSection';
  section.setAttribute('aria-label','General settings');
  section.innerHTML=`<div class="viewport-menu-label">General Settings</div><div class="general-settings-list">
    <label><input type="checkbox" data-general-setting="pencilOrbit"><span>Pencil orbit</span></label>
    <label><input type="checkbox" data-general-setting="pencilSelection"><span>Pencil selection</span></label>
    <label><input type="checkbox" data-general-setting="snapTop"><span>Snap options at top left</span></label>
    <label><input type="checkbox" data-general-setting="leftHanded"><span>Left-handed layout</span></label>
  </div>`;
  host.append(section);
  const inputs=[...section.querySelectorAll('[data-general-setting]')];
  function sync(){for(const input of inputs)input.checked=!!current[input.dataset.generalSetting];}
  section.addEventListener('change',event=>{
    const input=event.target.closest?.('[data-general-setting]');
    if(!input)return;
    setGeneralSetting(input.dataset.generalSetting,input.checked);
    sync();
  });
  sync();
  const style=document.createElement('style');
  style.textContent=`
.general-settings-list{display:grid;gap:4px}
.general-settings-list label{display:flex;align-items:center;gap:9px;min-height:38px;padding:3px 8px;border:1px solid rgba(255,255,255,.08);border-radius:7px;background:rgba(255,255,255,.025);font-size:12px;touch-action:manipulation}
.general-settings-list input{width:18px;height:18px;margin:0;accent-color:#83b8ff;flex:0 0 auto}
html.boxlab-snap-top #viewportSnapControls{top:calc(var(--boxlab-topbar-h,60px) + 8px);bottom:auto}
html.boxlab-left-handed #viewportWrap>.floating-panel.left-panel{left:auto!important;right:max(8px,env(safe-area-inset-right))!important}
html.boxlab-left-handed #objectBrowserPanel{right:auto;left:max(8px,env(safe-area-inset-left))}
`;
  document.head.append(style);
  apply();
}

globalThis.__boxlabGeneralSettings={get:getGeneralSettings,set:setGeneralSetting};
apply();
