const state = globalThis.__boxlabBridgeState;
const button = document.querySelector('#selectLoopBtn');
const status = document.querySelector('#selectionStatus');

function currentMesh() { return state?.mesh || null; }
function selectionBridge(){ return globalThis.__boxlabSelectionBridge; }
function selectedEdgeIds() { const bridge = selectionBridge(); return bridge?.mode?.() === 'edge' ? [...new Set(bridge.indices?.() || [])] : [...new Set(state?.selectedEdges || [])]; }
function realFaces(mesh, edge) {
  return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));
}
function isBoundaryLike(mesh, edge) {
  return !!edge && (edge.loose === true || realFaces(mesh, edge).length <= 1);
}
function boundaryCycle(mesh, seedIds){
  const edges=mesh.edges();
  if(!seedIds.length||seedIds.some(index=>!isBoundaryLike(mesh,edges[index])))return null;
  const byVertex=new Map();
  for(let index=0;index<edges.length;index++){
    const edge=edges[index];
    if(!isBoundaryLike(mesh,edge))continue;
    if(!byVertex.has(edge.a))byVertex.set(edge.a,[]);
    if(!byVertex.has(edge.b))byVertex.set(edge.b,[]);
    byVertex.get(edge.a).push(index);byVertex.get(edge.b).push(index);
  }
  const component=new Set(),queue=[seedIds[0]];
  while(queue.length){
    const index=queue.pop();if(component.has(index))continue;
    const edge=edges[index];if(!edge||!isBoundaryLike(mesh,edge))continue;
    component.add(index);
    for(const vertex of [edge.a,edge.b])for(const next of byVertex.get(vertex)||[])if(!component.has(next))queue.push(next);
  }
  if(seedIds.some(index=>!component.has(index))||component.size<3)return null;
  const degree=new Map();
  for(const index of component){
    const edge=edges[index];
    degree.set(edge.a,(degree.get(edge.a)||0)+1);
    degree.set(edge.b,(degree.get(edge.b)||0)+1);
  }
  if([...degree.values()].some(value=>value!==2))return null;
  return [...component];
}

function orderedSeed(mesh, ids) {
  const edges = mesh.edges();
  const selected = new Set(ids);
  const byVertex = new Map();
  for (const index of ids) {
    const edge = edges[index];
    if (!edge) return null;
    if (!byVertex.has(edge.a)) byVertex.set(edge.a, []);
    if (!byVertex.has(edge.b)) byVertex.set(edge.b, []);
    byVertex.get(edge.a).push(index); byVertex.get(edge.b).push(index);
  }
  if ([...byVertex.values()].some(list => list.length > 2)) return null;
  const ends = [...byVertex.entries()].filter(([, list]) => list.length === 1).map(([vertex]) => vertex);
  if (ends.length !== 0 && ends.length !== 2) return null;
  const startVertex = ends.length ? ends[0] : byVertex.keys().next().value;
  const edgeOrder = [], vertexOrder = [startVertex], visited = new Set();
  let currentVertex = startVertex, previousEdge = null;
  for (let guard = 0; guard < ids.length + 1; guard++) {
    const nextEdge = (byVertex.get(currentVertex) || []).find(index => index !== previousEdge && !visited.has(index));
    if (nextEdge === undefined) break;
    const edge = edges[nextEdge]; visited.add(nextEdge); edgeOrder.push(nextEdge);
    const nextVertex = edge.a === currentVertex ? edge.b : edge.a;
    vertexOrder.push(nextVertex); previousEdge = nextEdge; currentVertex = nextVertex;
    if (currentVertex === startVertex) break;
  }
  if (visited.size !== selected.size) return null;
  return { edgeOrder, vertexOrder, closed:ends.length===0 };
}
function incidentEdgeIndices(mesh, vertex) {
  const out = [], edges = mesh.edges();
  for (let i = 0; i < edges.length; i++) if (edges[i]?.a === vertex || edges[i]?.b === vertex) out.push(i);
  return out;
}
function straightestContinuation(mesh, incomingIndex, vertex, candidates) {
  const edges=mesh.edges(),incoming=edges[incomingIndex],pivot=mesh.vertices[vertex];
  if(!incoming||!pivot||!candidates.length)return null;
  const previous=mesh.vertices[incoming.a===vertex?incoming.b:incoming.a];if(!previous)return null;
  const travel=pivot.clone().sub(previous);if(travel.lengthSq()<1e-12)return null;travel.normalize();
  const scored=candidates.map(index=>{const edge=edges[index],otherVertex=edge?.a===vertex?edge.b:edge?.b===vertex?edge.a:null,other=Number.isInteger(otherVertex)?mesh.vertices[otherVertex]:null;if(!other)return{index,score:-Infinity};const outgoing=other.clone().sub(pivot);if(outgoing.lengthSq()<1e-12)return{index,score:-Infinity};return{index,score:travel.dot(outgoing.normalize())};}).sort((a,b)=>b.score-a.score);
  if(!scored.length||!Number.isFinite(scored[0].score))return null;
  if(scored.length>1&&scored[0].score-scored[1].score<0.08)return null;
  return scored[0].index;
}
function chooseContinuation(mesh,incomingIndex,vertex,visited){
  const edges=mesh.edges(),incoming=edges[incomingIndex];if(!incoming)return null;
  let candidates=incidentEdgeIndices(mesh,vertex).filter(index=>index!==incomingIndex&&!visited.has(index));
  if(!candidates.length)return null;if(candidates.length===1)return candidates[0];
  if(isBoundaryLike(mesh,incoming)){
    const boundary=candidates.filter(index=>isBoundaryLike(mesh,edges[index]));
    if(boundary.length===1)return boundary[0];if(boundary.length>1)candidates=boundary;
  }
  const incomingFaces=new Set(realFaces(mesh,incoming));
  const opposite=candidates.filter(index=>realFaces(mesh,edges[index]).every(face=>!incomingFaces.has(face)));
  if(opposite.length===1)return opposite[0];
  return straightestContinuation(mesh,incomingIndex,vertex,candidates);
}
function traceFromEnd(mesh,incomingIndex,startVertex,targetVertex,visited){
  const out=[];let incoming=incomingIndex,vertex=startVertex;
  for(let guard=0;guard<mesh.edges().length+1;guard++){
    if(vertex===targetVertex)return{indices:out,closed:true,endVertex:vertex};
    const nextIndex=chooseContinuation(mesh,incoming,vertex,visited);if(nextIndex===null)break;
    const edge=mesh.edges()[nextIndex];if(!edge)break;visited.add(nextIndex);out.push(nextIndex);
    vertex=edge.a===vertex?edge.b:edge.a;incoming=nextIndex;
    if(vertex===targetVertex)return{indices:out,closed:true,endVertex:vertex};
  }
  return{indices:out,closed:false,endVertex:vertex};
}
function directedInfo(){
  const mesh=currentMesh(),ids=selectedEdgeIds();if(!mesh||ids.length<2)return null;
  const cycle=boundaryCycle(mesh,ids);
  if(cycle)return{mesh,indices:cycle,seedCount:ids.length,closedByContinuation:true,boundary:true};
  const seed=orderedSeed(mesh,ids);if(!seed)return{mesh,error:'Seed edges must form one simple connected chain or loop'};
  if(seed.closed)return{mesh,indices:[...seed.edgeOrder],seedCount:ids.length,alreadyClosed:true};
  const visited=new Set(seed.edgeOrder),firstEdge=seed.edgeOrder[0],lastEdge=seed.edgeOrder[seed.edgeOrder.length-1],startVertex=seed.vertexOrder[0],endVertex=seed.vertexOrder[seed.vertexOrder.length-1];
  const before=traceFromEnd(mesh,firstEdge,startVertex,endVertex,visited);
  if(before.closed)return{mesh,indices:[...before.indices.reverse(),...seed.edgeOrder],seedCount:ids.length,closedByContinuation:true};
  const after=traceFromEnd(mesh,lastEdge,endVertex,before.endVertex,visited);
  return{mesh,indices:[...before.indices.reverse(),...seed.edgeOrder,...after.indices],seedCount:ids.length,closedByContinuation:after.closed};
}
function applySelection(indices){
  const bridge=selectionBridge();if(!bridge?.set)return false;
  bridge.set('edge',[...new Set(indices)]);
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  return true;
}
function sync(){if(selectedEdgeIds().length>=2&&button)button.disabled=false;}
button?.addEventListener('click',event=>{
  const ids=selectedEdgeIds();if(ids.length<2)return;
  event.preventDefault();event.stopImmediatePropagation();
  const info=directedInfo();if(!info)return;
  if(info.error){if(status)status.textContent=`Select Loop • ${info.error}`;return;}
  if(info.alreadyClosed){if(status)status.textContent=`Select Loop • ${info.indices.length} edge loop already complete`;return;}
  if(info.indices.length<=info.seedCount){if(status)status.textContent='Select Loop • no further continuation was found';return;}
  const ok=applySelection(info.indices);
  if(status)status.textContent=ok?`${info.boundary?'Boundary Loop':'Directed Loop'} • ${info.indices.length} edges selected${info.closedByContinuation?' • closed':''}`:'Select Loop • selection handoff failed';
  sync();
},true);
window.addEventListener('boxlab-bridge-state',sync);sync();
