// BoxLab v0.36.18.244 — unequal-loop Bridge extension.
// Adds a conservative triangle/quad zipper strip while leaving equal-count Bridge on the proven solver.

const VERSION='0.36.18.244';

function realFaceIndices(mesh,edge){
  return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<mesh.faces.length&&Array.isArray(mesh.faces[fi]));
}

function directedEdge(face,a,b){
  if(!face)return 0;
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return 1;
    if(x===b&&y===a)return -1;
  }
  return 0;
}

function directlyConnected(mesh,loopA,loopB,ignoredFaces=new Set()){
  const a=new Set(loopA),b=new Set(loopB);
  return mesh.faces.some((face,index)=>!ignoredFaces.has(index)&&face?.some(v=>a.has(v))&&face.some(v=>b.has(v)));
}

function cycleFromEdges(edges){
  if(!edges?.length)return null;
  const adjacency=new Map();
  for(const edge of edges){
    if(!adjacency.has(edge.a))adjacency.set(edge.a,[]);
    if(!adjacency.has(edge.b))adjacency.set(edge.b,[]);
    adjacency.get(edge.a).push(edge.b);adjacency.get(edge.b).push(edge.a);
  }
  if(adjacency.size!==edges.length||[...adjacency.values()].some(list=>list.length!==2))return null;
  const start=Math.min(...adjacency.keys()),cycle=[start];
  let previous=null,current=start;
  for(let guard=0;guard<edges.length;guard++){
    const neighbours=adjacency.get(current)||[],next=neighbours.find(v=>v!==previous);
    if(next===undefined)return null;
    if(next===start)return cycle.length===edges.length?cycle:null;
    if(cycle.includes(next))return null;
    cycle.push(next);previous=current;current=next;
  }
  return null;
}

function edgeComponents(edges){
  const byVertex=new Map();
  edges.forEach((edge,index)=>{
    if(!byVertex.has(edge.a))byVertex.set(edge.a,[]);
    if(!byVertex.has(edge.b))byVertex.set(edge.b,[]);
    byVertex.get(edge.a).push(index);byVertex.get(edge.b).push(index);
  });
  const seen=new Set(),components=[];
  for(let seed=0;seed<edges.length;seed++){
    if(seen.has(seed))continue;
    const queue=[seed],component=[];seen.add(seed);
    while(queue.length){
      const index=queue.shift(),edge=edges[index];component.push(edge);
      for(const vertex of [edge.a,edge.b])for(const neighbour of byVertex.get(vertex)||[])if(!seen.has(neighbour)){seen.add(neighbour);queue.push(neighbour);}
    }
    components.push(component);
  }
  return components;
}

function zipperFaces(loopA,loopB){
  const m=loopA.length,n=loopB.length,faces=[];
  let a=0,b=0;
  while(a<m||b<n){
    const ac=loopA[a%m],bc=loopB[b%n];
    const nextA=a<m?(a+1)/m:Infinity,nextB=b<n?(b+1)/n:Infinity;
    if(Math.abs(nextA-nextB)<1e-10){
      const an=loopA[(a+1)%m],bn=loopB[(b+1)%n];
      faces.push([ac,an,bn,bc]);a++;b++;
    }else if(nextA<nextB){
      const an=loopA[(a+1)%m];faces.push([ac,an,bc]);a++;
    }else{
      const bn=loopB[(b+1)%n];faces.push([ac,bn,bc]);b++;
    }
  }
  return faces;
}

function planScore(mesh,faces,aSet,bSet){
  let score=0,windingPenalty=0;
  for(const face of faces){
    if(new Set(face).size!==face.length)return Infinity;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      for(const existing of mesh.faces)if(directedEdge(existing,a,b)===1)windingPenalty++;
      if((aSet.has(a)&&bSet.has(b))||(bSet.has(a)&&aSet.has(b)))score+=mesh.vertices[a].distanceToSquared(mesh.vertices[b]);
    }
  }
  return score+windingPenalty*1e9;
}

export function installUnequalBridge(EditableMesh){
  const proto=EditableMesh?.prototype;
  if(!proto||proto.__unequalBridge244Installed)return;
  const equalEdgeInfo=proto.bridgeEdgeSelectionInfo,equalFaceInfo=proto.bridgeFaceSelectionInfo,equalBridgeLoops=proto.bridgeLoops;
  if(typeof equalEdgeInfo!=='function'||typeof equalFaceInfo!=='function'||typeof equalBridgeLoops!=='function')return;

  proto.bridgeEdgeSelectionInfo=function(edgeIndices){
    const equal=equalEdgeInfo.call(this,edgeIndices);if(equal)return equal;
    const ids=[...new Set(edgeIndices||[])];if(ids.length<7)return null;
    const allEdges=this.edges(),picked=ids.map(index=>allEdges[index]);
    if(picked.some(edge=>!edge))return null;
    if(picked.some(edge=>!(edge.loose||realFaceIndices(this,edge).length===1)))return null;
    const components=edgeComponents(picked);if(components.length!==2)return null;
    const loops=components.map(cycleFromEdges);
    if(loops.some(loop=>!loop||loop.length<3)||loops[0].length===loops[1].length)return null;
    if(loops[0].some(v=>loops[1].includes(v))||directlyConnected(this,loops[0],loops[1]))return null;
    return{loops,count:null,counts:loops.map(loop=>loop.length),unequal:true};
  };

  proto.bridgeFaceSelectionInfo=function(faceIndices){
    const equal=equalFaceInfo.call(this,faceIndices);if(equal)return equal;
    const ids=[...new Set(faceIndices||[])];if(ids.length!==2)return null;
    const faces=ids.map(index=>this.faces[index]);
    if(faces.some(face=>!face||face.length<3)||faces[0].length===faces[1].length)return null;
    if(faces[0].some(v=>faces[1].includes(v))||directlyConnected(this,faces[0],faces[1],new Set(ids)))return null;
    return{faceIndices:ids,loops:faces.map(face=>[...face]),count:null,counts:faces.map(face=>face.length),unequal:true};
  };

  proto.bestUnequalBridgePlan=function(loopA,loopB){
    if(!Array.isArray(loopA)||!Array.isArray(loopB)||loopA.length<3||loopB.length<3||loopA.length===loopB.length)return null;
    const aSet=new Set(loopA),bSet=new Set(loopB);let best=null;
    for(const direction of [1,-1])for(let offset=0;offset<loopB.length;offset++){
      const mapped=Array.from({length:loopB.length},(_,i)=>loopB[(offset+direction*i+loopB.length*4)%loopB.length]);
      const base=zipperFaces(loopA,mapped);
      for(const flip of [false,true]){
        const faces=flip?base.map(face=>[...face].reverse()):base.map(face=>[...face]);
        const score=planScore(this,faces,aSet,bSet);
        if(Number.isFinite(score)&&(!best||score<best.score))best={score,faces,direction,offset,flip,unequal:true};
      }
    }
    return best;
  };

  proto.bridgeLoops=function(loopA,loopB){
    if(!Array.isArray(loopA)||!Array.isArray(loopB))return null;
    if(loopA.length===loopB.length)return equalBridgeLoops.call(this,loopA,loopB);
    const plan=this.bestUnequalBridgePlan(loopA,loopB);if(!plan)return null;
    const start=this.faces.length;
    this.faces.push(...plan.faces.map(face=>[...face]));
    if(this.looseEdges instanceof Set){
      for(const loop of [loopA,loopB])for(let i=0;i<loop.length;i++)this.looseEdges.delete(this.edgeKey(loop[i],loop[(i+1)%loop.length]));
    }
    this.edges();
    return{faceIndices:Array.from({length:plan.faces.length},(_,i)=>start+i),plan,unequal:true};
  };

  proto.__unequalBridge244Installed=true;
  globalThis.__boxlabUnequalBridge={version:VERSION};
}
