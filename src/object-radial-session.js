// Object radial launch/lifecycle adapter. Geometry, history and gestures remain
// with the existing Active Tools owners; their original controls are docked intact.
const tools={
  Transform:['#surfaceTransformBtn','surface-transform','__boxlabSurfaceTransform'],
  Insert:['#surfaceInsertBtn','surface-insert','__boxlabSurfaceInsert'],
  Solidify:['#solidifyBtn','solidify','__boxlabSolidifyPreview'],
  Array:['#linearArrayLaunchBtn','array','__boxlabLinearArray'],
  Boolean:['#booleanLaunchBtn','boolean','__boxlabBooleanToolSession'],
  Join:['#joinObjectsBtn'],
  'Symmetry / Bisect':['#symmetryBisectBtn','symmetry-bisect','__boxlabSymmetryBisect'],
  'Mesh Health':['#meshHealthBtn','mesh-health','__boxlabMeshHealth'],
  'Revolve Profile':['#revolveProfileLaunchBtn','revolve-profile','__boxlabRevolveProfile'],
  'Clean for SubD':['#quadCleanBtn']
};
const mode=()=>globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset.mode;
const session=()=>globalThis.__boxlabToolSession;
const current=()=>session()?.current?.()?.id;
const object=()=>{const m=globalThis.__boxlabObjectManager;return m?.objects?.find(o=>o.id===m.activeId);};
function available(label){
 if(label==='Edit Boolean')return mode()==='object'&&!!globalThis.__boxlabEditableBoolean?.eligible?.().ok;
 const spec=tools[label],target=spec&&document.querySelector(spec[0]),o=object();
 if(mode()!=='object'||!target||target.disabled||!o)return false;
 if(['Transform','Insert'].includes(label)&&globalThis.__boxlabObjectSelection?.ids?.size>1)return false;
 return !o.locked&&o.kind!=='reference';
}
function complete(tool){window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'object',tool}}));}
function cancelCurrent(){
 const id=current();if(!id)return false;
 if(id==='boolean-edit')return !!globalThis.__boxlabEditableBoolean?.cancel?.();
 const entry=Object.entries(tools).find(([,s])=>s[1]===id);
 if(!entry)return false;
 const api=globalThis[entry[1][2]];
 if(id==='boolean')api?.close?.({silent:true});
 else if(id==='mesh-health')api?.close?.();
 else api?.cancel?.({silent:true});
 return true;
}
function launch(label){
 if(!available(label))return false;
 if(current()&&!cancelCurrent())return false;
 // A cancellation may restore an Insert/Revolve scene, so resolve the target again.
 if(!available(label)){complete(label);return false;}
 globalThis.__boxlabTransformArming?.disarm?.();
 if(label==='Edit Boolean')return !!globalThis.__boxlabEditableBoolean?.open?.();
 document.querySelector(tools[label][0]).click();
 if(!tools[label][1]||current()!==tools[label][1]&&!(label==='Boolean'&&current()==='boolean-edit'))queueMicrotask(()=>complete(label));
 return true;
}
window.addEventListener('boxlab-tool-session-change',event=>{
 const {id,active}=event.detail||{};
 if(!active&&Object.values(tools).some(s=>s[1]===id))queueMicrotask(()=>{if(!current())complete(id);});
});
// Existing owners cancel on context loss; Boolean also needs a mode exit.
window.addEventListener('boxlab-bridge-state',()=>{if(mode()!=='object'&&['boolean','boolean-edit'].includes(current()))cancelCurrent();});
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(()=>{if(mode()!=='object')cancelCurrent();})));
globalThis.__boxlabObjectRadialSession={version:'0.36.18.799',available,launch,cancelCurrent,
 hidesGizmo:()=>!!current()&&Object.values(tools).some(s=>s[1]===current())&&!['symmetry-bisect','revolve-profile'].includes(current())};
