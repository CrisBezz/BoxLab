import * as THREE from 'three';
import { EditableMesh } from './mesh.js?v=0.12';

// BoxLab v0.36.18.169 — authoritative rendered-cage mesh accessor.
// Helper/diagnostic modules also call EditableMesh.edges(), so the last mesh to
// call edges() is not necessarily the editable mesh being shown. Track that
// transient owner separately, and only promote it when core adds one of its
// visible cage-edge objects to the scene. Diagnostics can no longer steal the
// helper mesh after a topology change such as Add Vertex creating a 5-gon.

const baseEdges=EditableMesh.prototype.edges;
const baseAdd=THREE.Group.prototype.add;
let pendingEdgesOwner=null;
let renderedMeshOwner=null;
let fallbackMesh=globalThis.__boxlabBridgeState?.mesh||null;

function state(){return globalThis.__boxlabBridgeState ||= {};}
function liveMesh(){return renderedMeshOwner||fallbackMesh||null;}
function installMeshAccessor(){
  const s=state();
  const descriptor=Object.getOwnPropertyDescriptor(s,'mesh');
  if(descriptor?.get?.__boxlabRenderedMeshAccessor)return;
  if(!descriptor?.get&&'value'in(descriptor||{}))fallbackMesh=descriptor.value||fallbackMesh;
  const getter=()=>liveMesh();
  getter.__boxlabRenderedMeshAccessor=true;
  Object.defineProperty(s,'mesh',{
    configurable:true,
    enumerable:true,
    get:getter,
    set(value){if(value&&!renderedMeshOwner)fallbackMesh=value;}
  });
}

installMeshAccessor();

if(!EditableMesh.prototype.__boxlabLiveMeshBridgeEdges169){
  EditableMesh.prototype.edges=function(...args){
    pendingEdgesOwner=this;
    return baseEdges.apply(this,args);
  };
  EditableMesh.prototype.__boxlabLiveMeshBridgeEdges169=true;
}

if(!THREE.Group.prototype.__boxlabLiveMeshBridgeAdd169){
  THREE.Group.prototype.add=function(...objects){
    const renderedCageEdge=objects.some(object=>object?.userData?.kind==='edge');
    if(renderedCageEdge&&pendingEdgesOwner){
      const changed=renderedMeshOwner!==pendingEdgesOwner;
      renderedMeshOwner=pendingEdgesOwner;
      fallbackMesh=renderedMeshOwner;
      installMeshAccessor();
      if(changed)window.dispatchEvent(new Event('boxlab-bridge-state'));
    }
    return baseAdd.apply(this,objects);
  };
  THREE.Group.prototype.__boxlabLiveMeshBridgeAdd169=true;
}

// Force one cage rebuild so the bridge captures the actual core cage owner.
queueMicrotask(()=>document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true})));

globalThis.__boxlabLiveMeshBridge={version:'0.36.18.169',mesh:liveMesh};
