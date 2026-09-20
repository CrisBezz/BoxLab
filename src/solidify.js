import { analyzeSolidifyInput, solidifyOpenMesh } from './solidify-core.js?v=0.36.18.372';

const button=document.querySelector('#solidifyBtn');
const input=document.querySelector('#solidifyThickness');
const output=document.querySelector('#solidifyThicknessOut');
const status=document.querySelector('#selectionStatus');

function manager(){return globalThis.__boxlabObjectManager;}
function mesh(){return globalThis.__boxlabBridgeState?.mesh||null;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function setStatus(text){if(status)status.textContent=text;}
function thickness(){const value=Number(input?.value);return Number.isFinite(value)?value:0.2;}
function syncThickness(){if(output)output.textContent=Number(thickness().toFixed(3)).toString();}
function update(){
  const object=activeObject(),live=mesh();
  const eligible=!!object&&!!live&&!object.locked&&object.kind!=='reference';
  if(button)button.disabled=!eligible;
  syncThickness();
}
function forceRender(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabObjectSelection?.refresh?.();
  globalThis.__boxlabTopologyGate?.sync?.();
}
input?.addEventListener('input',syncThickness);
button?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!object||!live||object.locked||object.kind==='reference')return;
  const preflight=analyzeSolidifyInput(live);
  if(!preflight.ok){
    const labels={
      'closed-mesh':'Solidify needs an open sheet • closed solids will use Shell in a later Phase D build',
      'non-manifold-edge':'Solidify refused • non-manifold edge',
      'inconsistent-winding':'Solidify refused • fix inconsistent face winding first',
      'branched-boundary':'Solidify refused • boundary is branched',
      'duplicate-face':'Solidify refused • duplicate face',
      'degenerate-face':'Solidify refused • degenerate face',
      'zero-area-face':'Solidify refused • zero-area face'
    };
    setStatus(labels[preflight.reason]||`Solidify refused • ${preflight.reason||'invalid open mesh'}`);
    return;
  }
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  const result=solidifyOpenMesh(live,thickness());
  if(!result.ok){setStatus(`Solidify rolled back • ${result.reason||'topology validation failed'}`);forceRender();return;}
  manager()?.saveActive?.();
  globalThis.__boxlabSolidifyLastResult={version:'0.36.18.372',...result};
  setStatus(`Solidify • thickness ${Number(result.thickness.toFixed(3))} • ${result.sideFaces} boundary wall${result.sideFaces===1?'':'s'} • closed solid`);
  forceRender();
});

window.addEventListener('boxlab-object-manager-ready',update);
window.addEventListener('boxlab-bridge-state',update);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(update)));
update();
