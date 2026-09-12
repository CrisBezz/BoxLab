import * as THREE from 'three';
import { EditableMesh } from './mesh.js?v=0.12';

// BoxLab v0.36.18.165 — authoritative live mesh bridge.
// main.js keeps its editable mesh private. Helper tools read
// globalThis.__boxlabBridgeState.mesh, so publish the exact EditableMesh whose
// cage edges are being added to the rendered scene. This avoids helper tools
// continuing to mutate a stale clone after topology edits such as Add Vertex.

const baseEdges=EditableMesh.prototype.edges;
const baseAdd=THREE.Group.prototype.add;
let lastEdgesOwner=null;

if(!EditableMesh.prototype.__boxlabLiveMeshBridgeEdges){
  EditableMesh.prototype.edges=function(...args){
    lastEdgesOwner=this;
    return baseEdges.apply(this,args);
  };
  EditableMesh.prototype.__boxlabLiveMeshBridgeEdges=true;
}

if(!THREE.Group.prototype.__boxlabLiveMeshBridgeAdd){
  THREE.Group.prototype.add=function(...objects){
    const renderedCageEdge=objects.some(object=>object?.userData?.kind==='edge');
    if(renderedCageEdge&&lastEdgesOwner){
      const state=globalThis.__boxlabBridgeState ||= {};
      if(state.mesh!==lastEdgesOwner){
        state.mesh=lastEdgesOwner;
        window.dispatchEvent(new Event('boxlab-bridge-state'));
      }
    }
    return baseAdd.apply(this,objects);
  };
  THREE.Group.prototype.__boxlabLiveMeshBridgeAdd=true;
}

// Force one cage rebuild so the bridge starts from the currently rendered mesh.
queueMicrotask(()=>document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true})));

globalThis.__boxlabLiveMeshBridge={version:'0.36.18.165',mesh:()=>globalThis.__boxlabBridgeState?.mesh||null};
