import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';

// BoxLab v0.36.18.104 — keep external modelling modules on main.js's live mesh.
// main.js owns the editable mesh in module scope. External tools use
// __boxlabBridgeState.mesh. During a cage render, capture the actual EditableMesh
// instance being traversed by main.js and republish it after that render completes.

const cage=document.querySelector('#cageToggle');
let probing=false;
let observed=null;
let previousEdges=null;

function state(){return globalThis.__boxlabBridgeState;}

function publish(mesh){
  const s=state();
  if(!s||!mesh)return false;
  if(s.mesh!==mesh)s.mesh=mesh;
  return true;
}

if(!LiveEditableMesh.prototype.__boxlabLiveMeshBridgeInstalled){
  previousEdges=LiveEditableMesh.prototype.edges;
  LiveEditableMesh.prototype.edges=function(...args){
    const result=previousEdges.apply(this,args);
    if(probing)observed=this;
    return result;
  };
  LiveEditableMesh.prototype.__boxlabLiveMeshBridgeInstalled=true;
}

function beginProbe(event){
  if(event.target!==cage)return;
  probing=true;
  observed=null;
}

function finishProbe(event){
  if(event.target!==cage||!probing)return;
  probing=false;
  if(observed)publish(observed);
  observed=null;
}

document.addEventListener('change',beginProbe,true);
document.addEventListener('change',finishProbe,false);

// Start from the currently published live object before any user edit.
const initial=state()?.mesh;
if(initial)publish(initial);

globalThis.__boxlabLiveMeshBridge={
  version:'0.36.18.104',
  current:()=>state()?.mesh||null
};
