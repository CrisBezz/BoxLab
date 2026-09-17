// BoxLab v0.36.18.264 — equal-count open-chain Bridge.
// Bridges two disjoint boundary edge paths into an intentionally open quad strip.

const VERSION='0.36.18.264';
const EPS=1e-12;

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function realFaceIndices(mesh,edge){return(edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<mesh.faces.length&&Array.isArray(mesh.faces[fi]));}
function directedEdge(face,a,b){if(!face)return 0;for(let i=0;i<face.length;i++){const x=face[i],y=face[(i+1)%face.length];if(x===a&&y===b)return 1;if(x===b&&y===a)return-1;}return 0;}

function edgeComponents(edges){
  const byVertex=new Map();
  edges.forEach((edge,index)=>{for(const v of[edge.a,edge.b]){if(!byVertex.has(v))byVertex.set(v,[]);byVertex.get(v).push(index);}});
  const seen=new Set(),components=[];
  for(let seed=0;seed<edges.length;seed++){
    if(seen.has(seed))continue;
    const queue=[seed],component=[];seen.add(seed);
    while(queue.length){const index=queue.shift(),edge=edges[index];component.push(edge);for(const v of[edge.a,edge.b])for(const neighbour of byVertex.get(v)||[])if(!seen.has(neighbour)){seen.add(neighbour);queue.push(neighbour);}}
    components.push(component);
  }
  return components;
}

function pathFromEdges(edges){
  if(!edges?.length)return null;
  const adjacency=new Map();
  for(const edge of edges){for(const [a,b] of[[edge.a,edge.b],[edge.b,edge.a]]){if(!adjacency.has(a))adjacency.set(a,[]);adjacency.get(a).push(b);}}
  if(adjacency.size!==edges.length+1)return null;
  const endpoints=[...adjacency.entries()].filter(([,n])=>n.length===1).map(([v])=>v);
  if(endpoints.length!==2||[...adjacency.values()].some(n=>n.length<1||n.length>2))return null;
  const start=Math.min(...endpoints),path=[start];let previous=null,current=start;
  for(let guard=0;guard<edges.length;guard++){
    const next=(adjacency.get(current)||[]).find(v=>v!==previous);if(next===undefined)return null;
    path.push(next);previous=current;current=next;
  }
  return path.length===edges.length+1&&current===Math.max(...endpoints)?path:path.length===edges.length+1?path:null;
}

function directlyConnected(mesh,aChain,bChain){const a=new Set(aChain),b=new Set(bChain);return mesh.faces.some(face=>Array.isArray(face)&&face.some(v=>a.has(v))&&face.some(v=>b.has(v)));}
function triangleArea2(a,b,c){return b.clone().sub(a).cross(c.clone().sub(a)).lengthSq();}
function quadValid(mesh,q){const p=q.map(i=>mesh.vertices[i]);if(p.some(v=>!v)||new Set(q).size!==4)return false;return triangleArea2(p[0],p[1],p[2])>EPS&&triangleArea2(p[0],p[2],p[3])>EPS;}

function bestPlan(mesh,chainA,chainB){
  if(chainA.length!==chainB.length||chainA.length<2)return null;
  let best=null;
  for(const reverse of[false,true]){
    const mapped=reverse?[...chainB].reverse():[...chainB];
    let distance=0;for(let i=0;i<chainA.length;i++)distance+=mesh.vertices[chainA[i]].distanceToSquared(mesh.vertices[mapped[i]]);
    for(const flip of[false,true]){
      const quads=[];let windingPenalty=0,valid=true;
      for(let i=0;i<chainA.length-1;i++){
        const q=flip?[chainA[i],mapped[i],mapped[i+1],chainA[i+1]]:[chainA[i],chainA[i+1],mapped[i+1],mapped[i]];
        if(!quadValid(mesh,q)){valid=false;break;}quads.push(q);
        for(let j=0;j<4;j++){const a=q[j],b=q[(j+1)%4];for(const face of mesh.faces)if(directedEdge(face,a,b)===1)windingPenalty++;}
      }
      if(!valid)continue;
      const score=distance+windingPenalty*1e9;
      if(!best||score<best.score)best={quads,mapped,reverse,flip,windingPenalty,score};
    }
  }
  return best;
}

function windingValidation(mesh){
  const uses=new Map();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length)return{ok:false,reason:'invalid-face'};
    for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b),dir=a<b?1:-1;if(!uses.has(key))uses.set(key,[]);uses.get(key).push({fi,dir});}
  }
  for(const [edge,owners]of uses){if(owners.length>2)return{ok:false,reason:'non-manifold-edge',edge};if(owners.length===2&&owners[0].dir===owners[1].dir)return{ok:false,reason:'same-direction-edge',edge};}
  return{ok:true};
}

function trialFrom(mesh,topology){const state=topology.cloneMeshState(mesh),trial=mesh.clone();trial.vertices=state.vertices.map(v=>v.clone());trial.faces=state.faces.map(f=>[...f]);trial.creases=new Map(state.creases||[]);trial.looseEdges=new Set(state.looseEdges||[]);trial.looseVertices=new Set(state.looseVertices||[]);return trial;}

function applyOpenChainBridge(mesh,chainA,chainB){
  const plan=bestPlan(mesh,chainA,chainB);if(!plan)return null;
  const start=mesh.faces.length;mesh.faces.push(...plan.quads.map(q=>[...q]));
  if(mesh.looseEdges instanceof Set)for(const chain of[chainA,chainB])for(let i=0;i<chain.length-1;i++)mesh.looseEdges.delete(mesh.edgeKey(chain[i],chain[i+1]));
  mesh.edges?.();
  return{faceIndices:Array.from({length:plan.quads.length},(_,i)=>start+i),plan,openChain:true};
}

export function installOpenChainBridge(EditableMesh){
  const proto=EditableMesh?.prototype;if(!proto||proto.__openChainBridge264Installed)return;
  const baseInfo=proto.bridgeEdgeSelectionInfo,baseSelected=proto.bridgeSelectedEdges;
  const topology=globalThis.__boxlabTopology;
  if(typeof baseInfo!=='function'||typeof baseSelected!=='function'||!topology?.cloneMeshState||!topology?.restoreMeshState||!topology?.validateTopology)return;

  proto.bridgeEdgeSelectionInfo=function(edgeIndices){
    const base=baseInfo.call(this,edgeIndices);if(base)return base;
    const ids=[...new Set(edgeIndices||[])];if(ids.length<2||ids.length%2!==0)return null;
    const all=this.edges(),picked=ids.map(i=>all[i]);if(picked.some(e=>!e))return null;
    if(picked.some(e=>!(e.loose||realFaceIndices(this,e).length===1)))return null;
    const components=edgeComponents(picked);if(components.length!==2||components[0].length!==components[1].length)return null;
    const chains=components.map(pathFromEdges);if(chains.some(c=>!c||c.length<2))return null;
    if(chains[0].some(v=>chains[1].includes(v))||directlyConnected(this,chains[0],chains[1]))return null;
    return{chains,openChain:true,count:components[0].length,edgeCount:components[0].length};
  };

  proto.bridgeSelectedEdges=function(edgeIndices){
    const info=this.bridgeEdgeSelectionInfo(edgeIndices);if(!info)return null;
    if(!info.openChain)return baseSelected.call(this,edgeIndices);
    const before=topology.validateTopology(this,{allowBoundary:true});if(!before.ok)return null;
    const trial=trialFrom(this,topology),result=applyOpenChainBridge(trial,[...info.chains[0]],[...info.chains[1]]);if(!result)return null;
    const validation=topology.validateTopology(trial,{allowBoundary:true});if(!validation.ok)return null;
    const winding=windingValidation(trial);if(!winding.ok)return null;
    for(const fi of result.faceIndices){const face=trial.faces[fi];if(!face||face.length!==4||!quadValid(trial,face))return null;}
    topology.restoreMeshState(this,topology.cloneMeshState(trial));
    globalThis.__boxlabOpenChainBridge={version:VERSION,ok:true,count:info.edgeCount,faces:result.faceIndices.length};
    return result;
  };

  proto.__openChainBridge264Installed=true;
  globalThis.__boxlabOpenChainBridge={version:VERSION,ok:null,count:0,faces:0};
}
