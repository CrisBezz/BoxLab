// BoxLab v0.36.18.0 — cross-object geometry snap bridge.
// Keeps other objects read-only and temporarily exposes their base topology to
// the existing Geometry Snap solver during Move gesture startup.

const canvas=document.querySelector('#viewport');
const geometryToggle=document.querySelector('#inferenceSnapToggle');
let injected=null;

function state(){return globalThis.__boxlabBridgeState;}
function manager(){return globalThis.__boxlabObjectManager;}
function mode(){return globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function moveArmed(){return document.querySelector('#toolModes button.active')?.dataset?.tool==='move';}
function evaluatedMesh(object){return globalThis.__boxlabObjectGeometry?.evaluatedMesh?.(object.id)||object.mesh;}

function restore(){
  if(!injected)return;
  const {mesh,vertexCount,faceCount}=injected;
  if(mesh?.vertices?.length>vertexCount)mesh.vertices.length=vertexCount;
  if(mesh?.faces?.length>faceCount)mesh.faces.length=faceCount;
  try{mesh?.edges?.();}catch{}
  injected=null;
}

function injectReferences(event){
  restore();
  if(event.target!==canvas||!event.isPrimary||event.pointerType==='touch'||event.button>0)return;
  if(!geometryToggle?.checked||!moveArmed()||!['vertex','edge','face','object'].includes(mode()))return;
  const s=state(),mesh=s?.mesh,m=manager();
  if(!mesh||!m)return;

  // Read the manager before touching the live mesh. Its objects getter saves
  // the active object, so this order prevents temporary reference geometry
  // from ever being persisted into the active object.
  const activeId=m.activeId,soloId=m.soloId,objects=[...(m.objects||[])];
  const refs=[];
  for(const object of objects){
    if(object.id===activeId||object.visible===false)continue;
    if(soloId&&object.id!==soloId)continue;
    const source=evaluatedMesh(object);
    if(source?.vertices?.length&&source?.faces?.length)refs.push(source);
  }
  if(!refs.length)return;

  const vertexCount=mesh.vertices.length,faceCount=mesh.faces.length;
  for(const source of refs){
    const offset=mesh.vertices.length;
    for(const vertex of source.vertices)mesh.vertices.push(vertex.clone());
    for(const face of source.faces)mesh.faces.push(face.map(index=>index+offset));
  }
  injected={mesh,vertexCount,faceCount};

  // transform-upgrade's document-capture pointerdown now clones this combined
  // read-only reference snapshot. Restore the live object immediately after
  // the pointerdown dispatch so only the selected object's topology remains.
  queueMicrotask(restore);
}

window.addEventListener('pointerdown',injectReferences,{capture:true,passive:true});
window.addEventListener('blur',restore,{passive:true});
window.addEventListener('pointercancel',restore,{capture:true,passive:true});

globalThis.__boxlabCrossObjectSnap={version:'0.36.18.0',restore};
