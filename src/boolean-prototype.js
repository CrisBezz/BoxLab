// BoxLab v0.36.18.214 — general sequential Boolean UI / transaction layer.
import { booleanBSP } from './boolean-bsp.js?v=0.36.18.214';
import { topologyInfo } from './boolean-classify.js?v=0.36.18.210';

const VERSION='0.36.18.214';
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('[data-mode-tools="object"]');

function manager(){return globalThis.__boxlabObjectManager||null;}
function selection(){return globalThis.__boxlabObjectSelection||null;}
function selectedObjects(){
  const m=manager(),ids=selection()?.ids;if(!m||!ids)return[];
  m.saveActive?.();return (m.objects||[]).filter(o=>ids.has(o.id));
}
function setStatus(text){if(status)status.textContent=text;}
function eligibility(){
  const m=manager(),chosen=selectedObjects();
  if(!m||chosen.length!==2)return{ok:false,reason:'Select exactly 2 objects with Multi'};
  const active=chosen.find(o=>o.id===m.activeId),other=chosen.find(o=>o.id!==m.activeId);
  if(!active||!other)return{ok:false,reason:'One selected object must be active'};
  if(active.kind==='reference'||other.kind==='reference')return{ok:false,reason:'Reference objects cannot be Boolean operands'};
  if(active.locked||other.locked)return{ok:false,reason:'Unlock both Boolean operands'};
  const ta=topologyInfo(active.mesh),tb=topologyInfo(other.mesh);
  if(!ta.closed||!tb.closed)return{ok:false,reason:'Both Boolean operands must be closed manifold meshes'};
  return{ok:true,active,other};
}
function buildResult(a,b,operation){return booleanBSP(a,b,operation);}
function ensureUI(){
  if(!objectTools)return null;
  document.querySelector('#booleanPrototype211')?.remove();
  document.querySelector('#booleanPrototype212')?.remove();
  let group=document.querySelector('#booleanPrototype214');if(group)return group;
  group=document.createElement('div');group.id='booleanPrototype214';group.style.cssText='margin:7px 0 3px';
  const label=document.createElement('div');label.textContent='BOOLEAN';label.style.cssText='font-size:9px;letter-spacing:.35px;opacity:.55;margin:0 0 4px 1px';
  const row=document.createElement('div');row.className='outliner-actions';row.style.cssText='grid-template-columns:repeat(3,minmax(0,1fr));gap:4px';
  for(const [op,text] of [['union','Union'],['difference','Cut'],['intersection','Intersect']]){
    const b=document.createElement('button');b.type='button';b.dataset.boolean214=op;b.textContent=text;b.style.cssText='min-width:0;padding:5px 3px;font-size:10px';row.appendChild(b);
  }
  group.append(label,row);objectTools.appendChild(group);return group;
}
function sync(){
  const group=ensureUI();if(!group)return false;const e=eligibility();
  group.querySelectorAll('[data-boolean214]').forEach(button=>{
    button.disabled=!e.ok;
    button.title=e.ok?(button.dataset.boolean214==='difference'?`Cut ${e.other.name} from active ${e.active.name}`:`${button.textContent}: ${e.active.name} + ${e.other.name}`):e.reason;
  });
  return e;
}
function apply(operation){
  const e=eligibility();if(!e.ok){setStatus(`Boolean • ${e.reason}`);return;}
  const label=operation==='difference'?'Cut':operation==='intersection'?'Intersect':'Union';
  setStatus(`Boolean ${label} • calculating…`);
  const result=buildResult(e.active.mesh,e.other.mesh,operation);
  if(!result.ok){setStatus(`Boolean ${label} refused • ${result.reason}`);return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  e.active.visible=false;e.other.visible=false;
  const created=manager()?.addMesh?.(result.mesh,`${e.active.name} ${label} ${e.other.name}`,{kind:'editable',visible:true,locked:false,enterObjectMode:true});
  if(!created){e.active.visible=true;e.other.visible=true;setStatus(`Boolean ${label} failed • result object could not be created`);return;}
  selection()?.select?.([created.id]);
  globalThis.__boxlabTopologyGate?.sync?.();
  setStatus(`${label} created • ${result.mesh.vertices.length} verts • ${result.mesh.faces.length} faces • sequential Boolean ready • originals hidden`);
}

ensureUI();
document.addEventListener('click',event=>{const button=event.target?.closest?.('[data-boolean214]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();apply(button.dataset.boolean214);},true);
window.addEventListener('boxlab-object-manager-ready',()=>setTimeout(sync,0));
window.addEventListener('boxlab-bridge-state',()=>setTimeout(sync,0));
document.addEventListener('pointerup',()=>setTimeout(sync,0),true);
[0,100,400,900].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabBooleanPrototype={version:VERSION,buildResult,apply,sync};
