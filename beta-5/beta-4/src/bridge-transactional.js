import './topology-foundation.js?v=0.36.18.243';

const VERSION='0.36.18.243';

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function trialFrom(mesh,topology){
  const state=topology.cloneMeshState(mesh),trial=mesh.clone();
  trial.vertices=state.vertices.map(v=>v.clone());
  trial.faces=state.faces.map(f=>[...f]);
  trial.creases=new Map(state.creases||[]);
  trial.looseEdges=new Set(state.looseEdges||[]);
  trial.looseVertices=new Set(state.looseVertices||[]);
  return trial;
}

function windingValidation(mesh){
  const uses=new Map();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<3)return{ok:false,reason:'invalid-face',face:fi};
    if(new Set(face).size!==face.length)return{ok:false,reason:'repeated-face-vertex',face:fi};
    for(const vi of face){
      if(!Number.isInteger(vi)||vi<0||vi>=mesh.vertices.length)return{ok:false,reason:'invalid-face-index',face:fi,vertex:vi};
      const v=mesh.vertices[vi];
      if(!v||![v.x,v.y,v.z].every(Number.isFinite))return{ok:false,reason:'non-finite-vertex',face:fi,vertex:vi};
    }
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b),dir=a<b?1:-1;
      if(!uses.has(key))uses.set(key,[]);
      uses.get(key).push({fi,dir});
    }
  }
  for(const [key,owners] of uses){
    if(owners.length===2&&owners[0].dir===owners[1].dir)return{ok:false,reason:'same-direction-edge',edge:key,owners};
  }
  return{ok:true};
}

function validateTrial(trial,beforeValidation,topology){
  const validation=topology.validateTopology(trial,{allowBoundary:true});
  if(!validation.ok)return{ok:false,reason:'topology-validation',validation};
  if(validation.boundary.length>beforeValidation.boundary.length)return{ok:false,reason:'new-boundary-created',before:beforeValidation.boundary.length,after:validation.boundary.length};
  const winding=windingValidation(trial);
  if(!winding.ok)return winding;
  return{ok:true,validation,winding};
}

function record(ok,detail){
  globalThis.__boxlabBridgeTransaction={version:VERSION,ok,...detail};
}

export function installTransactionalBridge(EditableMesh){
  const proto=EditableMesh?.prototype;
  if(!proto||proto.__transactionalBridge243Installed)return;
  if(typeof proto.bridgeLoops!=='function'||typeof proto.bridgeEdgeSelectionInfo!=='function'||typeof proto.bridgeFaceSelectionInfo!=='function')return;
  const topology=globalThis.__boxlabTopology;
  if(!topology?.cloneMeshState||!topology?.restoreMeshState||!topology?.validateTopology)return;

  const rawBridgeLoops=proto.bridgeLoops;

  function run(mesh,edit){
    const beforeValidation=topology.validateTopology(mesh,{allowBoundary:true});
    if(!beforeValidation.ok){record(false,{reason:'source-topology-invalid',validation:beforeValidation});return null;}
    const trial=trialFrom(mesh,topology);
    let result;
    try{result=edit(trial);}catch(error){mesh.edges?.();record(false,{reason:'exception',error:String(error?.message||error)});return null;}
    if(!result){mesh.edges?.();record(false,{reason:'bridge-rejected'});return null;}
    const checked=validateTrial(trial,beforeValidation,topology);
    if(!checked.ok){mesh.edges?.();record(false,checked);return null;}
    topology.restoreMeshState(mesh,topology.cloneMeshState(trial));
    record(true,{reason:'committed',validation:checked.validation});
    return result;
  }

  proto.bridgeLoops=function(loopA,loopB){
    const a=Array.isArray(loopA)?[...loopA]:loopA,b=Array.isArray(loopB)?[...loopB]:loopB;
    return run(this,trial=>rawBridgeLoops.call(trial,a,b));
  };

  proto.bridgeSelectedEdges=function(edgeIndices){
    const info=this.bridgeEdgeSelectionInfo(edgeIndices);
    if(!info)return null;
    const loops=info.loops.map(loop=>[...loop]);
    return run(this,trial=>rawBridgeLoops.call(trial,loops[0],loops[1]));
  };

  proto.bridgeSelectedFaces=function(faceIndices){
    const info=this.bridgeFaceSelectionInfo(faceIndices);
    if(!info)return null;
    const loops=info.loops.map(loop=>[...loop]),ids=[...info.faceIndices].sort((a,b)=>b-a);
    return run(this,trial=>{
      for(const index of ids)trial.faces.splice(index,1);
      return rawBridgeLoops.call(trial,loops[0],loops[1]);
    });
  };

  proto.__transactionalBridge243Installed=true;
}
