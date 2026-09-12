import * as THREE from 'three';
import { EditableMesh } from './mesh.js?v=0.12';

// BoxLab v0.36.18.168 — authoritative live mesh accessor.
// main.js keeps its editable mesh private. Helper tools read
// globalThis.__boxlabBridgeState.mesh. Keep that property permanently bound to
// the most recent EditableMesh that core used to build the visible cage, while
// still accepting writes as a fallback before the first cage render.

const baseEdges=EditableMesh.prototype.edges;
const baseAdd=THREE.Group.prototype.add;
let lastEdgesOwner=null;
let fallbackMesh=globalThis.__boxlabBridgeState?.mesh||null;

function state(){return globalThis.__boxlabBridgeState ||= {};}
function installMeshAccessor(){
  const s=state();
  const descriptor=Object.getOwnPropertyDescriptor(s,'mesh');
  if(descriptor?.get?.__boxlabLiveMeshAccessor)return;
  if(!descriptor?.get&&'value'in(descriptor||{}))fallbackMesh=descriptor.value||fallbackMesh;
  const getter=()=>lastEdgesOwner||fallbackMesh||null;
  getter.__boxlabLiveMeshAccessor=true;
  Object.defineProperty(s,'mesh',{
    configurable:true,
    enumerable:true,
    get:getter,
    set(value){if(value)fallbackMesh=value;}
  });
}

installMeshAccessor();

if(!EditableMesh.prototype.__boxlabLiveMeshBridgeEdges){
  EditableMesh.prototype.edges=function(...args){
    lastEdgesOwner=this;
    fallbackMesh=this;
    return baseEdges.apply(this,args);
  };
  EditableMesh.prototype.__boxlabLiveMeshBridgeEdges=true;
}

if(!THREE.Group.prototype.__boxlabLiveMeshBridgeAdd){
  THREE.Group.prototype.add=function(...objects){
    const renderedCageEdge=objects.some(object=>object?.userData?.kind==='edge');
    if(renderedCageEdge&&lastEdgesOwner){
      installMeshAccessor();
      window.dispatchEvent(new Event('boxlab-bridge-state'));
    }
    return baseAdd.apply(this,objects);
  };
  THREE.Group.prototype.__boxlabLiveMeshBridgeAdd=true;
}

// Force one cage rebuild so the accessor starts from the currently rendered mesh.
queueMicrotask(()=>document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true})));

globalThis.__boxlabLiveMeshBridge={version:'0.36.18.168',mesh:()=>lastEdgesOwner||fallbackMesh||null};
