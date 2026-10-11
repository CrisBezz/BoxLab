// BoxLab topology foundation smoke checks v0.36.15.0
// Runs only when explicitly requested from the console or another module.
function runTopologyFoundationSmoke(mesh){
  const topo=globalThis.__boxlabTopology;
  if(!topo||!mesh)return{ok:false,reason:'foundation-unavailable'};
  const clone=mesh.clone?.();
  if(!clone)return{ok:false,reason:'mesh-clone-unavailable'};
  const validation=topo.validateTopology(clone,{allowBoundary:true});
  const boundaries=topo.extractBoundaryLoops(clone);
  return{ok:true,validation,boundaries};
}
globalThis.__boxlabTopologySmoke=runTopologyFoundationSmoke;
