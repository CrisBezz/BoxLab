import * as THREE from 'three';

// BoxLab v0.36.18.460 — coordination layer between mature direct-tool
// controllers and the legacy component Move fallback in main.js.
//
// This file deliberately does NOT own Inset/Extrude/Bevel geometry.

const canvas=document.querySelector('#viewport');
const raycaster=new THREE.Raycaster();
raycaster.params.Line.threshold=.09;
const pointer=new THREE.Vector2();

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function selectedEdges(){
  const b=bridge();
  return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])]:[];
}

function keepComponentSelectionAvailable(event){
  const button=event.target?.closest?.('#extrudeBtn,#insetBtn');
  if(!button)return;
  // Run after the click lifecycle so any legacy button handler that toggles
  // the hidden checkbox cannot leave component selection disabled.
  requestAnimationFrame(()=>globalThis.__boxlabComponentMultiInit?.enable?.());
}

function hitEdge(event){
  const s=state();
  if(!canvas||!s?.camera)return null;
  const objects=[...(s.edgeObjects?.values?.()||[])].filter(Boolean);
  if(!objects.length)return null;
  const rect=canvas.getBoundingClientRect();
  if(!rect.width||!rect.height)return null;
  pointer.set((event.clientX-rect.left)/rect.width*2-1,-((event.clientY-rect.top)/rect.height*2-1));
  raycaster.setFromCamera(pointer,s.camera);
  const hit=raycaster.intersectObjects(objects,false)[0];
  return Number.isInteger(hit?.object?.userData?.index)?hit.object.userData.index:null;
}

function normalizeInvalidBevelSelection(event){
  if(event.target!==canvas||!event.isPrimary||!document.querySelector('#bevelBtn.active'))return;
  const mesh=state()?.mesh,ids=selectedEdges();
  if(!mesh||ids.length<2)return;
  if(mesh.generalBevelSelectionInfo?.(ids))return;
  const hit=hitEdge(event);
  if(!Number.isInteger(hit))return;
  // An invalid stale/additive set should never prevent a valid single-edge
  // bevel. Reduce only the invalid set to the edge the user is actually
  // touching, then let direct-bevel.js continue normally.
  bridge()?.set?.('edge',[hit]);
}

document.addEventListener('pointerdown',keepComponentSelectionAvailable,true);
canvas?.addEventListener('pointerdown',normalizeInvalidBevelSelection,true);

globalThis.__boxlabDirectToolOwnership460={
  version:'0.36.18.460',
  normalizeInvalidBevelSelection
};
