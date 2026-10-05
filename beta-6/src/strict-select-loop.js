const button = document.querySelector('#selectLoopBtn');
const status = document.querySelector('#selectionStatus');

function state() { return globalThis.__boxlabBridgeState; }
function bridge() { return globalThis.__boxlabSelectionBridge; }
function mesh() { return state()?.mesh || null; }
function selectedEdges() {
  const b = bridge();
  return b?.mode?.() === 'edge' ? [...new Set(b.indices?.() || [])] : [...new Set(state()?.selectedEdges || [])];
}
function realFaces(m, edge) {
  return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < m.faces.length && Array.isArray(m.faces[fi]));
}
function isBoundaryLike(m,edge){return !!edge&&(edge.loose===true||realFaces(m,edge).length<=1);}
function incidentEdges(m, vertex) {
  const edges = m.edges(), out = [];
  for (let i = 0; i < edges.length; i++) if (edges[i]?.a === vertex || edges[i]?.b === vertex) out.push(i);
  return out;
}
function otherVertex(edge, vertex) {
  if (!edge) return null;
  if (edge.a === vertex) return edge.b;
  if (edge.b === vertex) return edge.a;
  return null;
}
function boundaryCycleFromSeed(m,seedIndex){
  const edges=m.edges(),seed=edges[seedIndex];if(!seed||!isBoundaryLike(m,seed))return null;
  const byVertex=new Map();
  for(let index=0;index<edges.length;index++){
    const edge=edges[index];if(!isBoundaryLike(m,edge))continue;
    if(!byVertex.has(edge.a))byVertex.set(edge.a,[]);if(!byVertex.has(edge.b))byVertex.set(edge.b,[]);
    byVertex.get(edge.a).push(index);byVertex.get(edge.b).push(index);
  }
  const component=new Set(),queue=[seedIndex];
  while(queue.length){const index=queue.pop();if(component.has(index))continue;const edge=edges[index];if(!edge||!isBoundaryLike(m,edge))continue;component.add(index);for(const vertex of[edge.a,edge.b])for(const next of byVertex.get(vertex)||[])if(!component.has(next))queue.push(next);}
  if(component.size<3)return null;
  const degree=new Map();
  for(const index of component){const edge=edges[index];degree.set(edge.a,(degree.get(edge.a)||0)+1);degree.set(edge.b,(degree.get(edge.b)||0)+1);}
  if([...degree.values()].some(value=>value!==2))return null;
  return [...component];
}
function strictContinuation(m, incomingIndex, vertex, visited) {
  const edges = m.edges(), incoming = edges[incomingIndex];
  if (!incoming) return null;
  const incident = incidentEdges(m, vertex);
  if (incident.length !== 4) return null;
  const incomingFaces = realFaces(m, incoming);
  if (incomingFaces.length !== 2 || incomingFaces.some(fi => m.faces[fi]?.length !== 4)) return null;
  const incomingFaceSet = new Set(incomingFaces);
  const candidates = incident.filter(index => index !== incomingIndex && !visited.has(index)).filter(index => {
    const faces = realFaces(m, edges[index]);
    return faces.length === 2 && faces.every(fi => m.faces[fi]?.length === 4) && faces.every(fi => !incomingFaceSet.has(fi));
  });
  return candidates.length === 1 ? candidates[0] : null;
}
function geometricContinuation(m, incomingIndex, vertex, visited) {
  const edges = m.edges(), incoming = edges[incomingIndex];
  if (!incoming) return null;
  const previous = otherVertex(incoming, vertex);
  const center = m.vertices[vertex], previousPoint = m.vertices[previous];
  if (!center || !previousPoint) return null;
  const travel = center.clone().sub(previousPoint);
  if (travel.lengthSq() < 1e-12) return null;
  travel.normalize();
  const scored = [];
  for (const index of incidentEdges(m, vertex)) {
    if (index === incomingIndex || visited.has(index)) continue;
    const edge = edges[index], nextVertex = otherVertex(edge, vertex), nextPoint = m.vertices[nextVertex];
    if (!nextPoint) continue;
    const direction = nextPoint.clone().sub(center);
    if (direction.lengthSq() < 1e-12) continue;
    direction.normalize();
    scored.push({ index, score: travel.dot(direction) });
  }
  scored.sort((a,b) => b.score - a.score);
  if (!scored.length) return null;
  const best = scored[0], second = scored[1];
  if (best.score < 0.2) return null;
  if (second && best.score - second.score < 0.1) return null;
  return best.index;
}
function continuation(m, incomingIndex, vertex, visited) {
  const strict = strictContinuation(m, incomingIndex, vertex, visited);
  return Number.isInteger(strict) ? strict : geometricContinuation(m, incomingIndex, vertex, visited);
}
function trace(m, seedIndex, startVertex, visited) {
  const edges = m.edges(), out = [];
  let incomingIndex = seedIndex, vertex = startVertex;
  for (let guard = 0; guard < edges.length + 1; guard++) {
    const nextIndex = continuation(m, incomingIndex, vertex, visited);
    if (nextIndex === null) break;
    const edge = edges[nextIndex]; if (!edge) break;
    visited.add(nextIndex); out.push(nextIndex);
    vertex = edge.a === vertex ? edge.b : edge.a; incomingIndex = nextIndex;
  }
  return out;
}
function isClosedCycle(m, indices) {
  if (indices.length < 3) return false;
  const edges = m.edges(), degree = new Map();
  for (const index of indices) {
    const edge = edges[index]; if (!edge) return false;
    degree.set(edge.a, (degree.get(edge.a) || 0) + 1); degree.set(edge.b, (degree.get(edge.b) || 0) + 1);
  }
  return degree.size === indices.length && [...degree.values()].every(value => value === 2);
}
function isIrregularEdge(m,index){
  const edge=m.edges()[index];if(!edge)return false;if(edge.loose===true)return true;
  const faces=realFaces(m,edge);return faces.length!==2||faces.some(fi=>m.faces[fi]?.length!==4);
}
function traceLoop(m, seedIndex) {
  const boundary=boundaryCycleFromSeed(m,seedIndex);
  if(boundary)return{indices:boundary,closed:true,boundary:true};
  const seed = m.edges()[seedIndex]; if (!seed) return null;
  const visited = new Set([seedIndex]);
  const fromA = trace(m, seedIndex, seed.a, visited), fromB = trace(m, seedIndex, seed.b, visited);
  const indices = [...fromA.reverse(), seedIndex, ...fromB];
  const closed=isClosedCycle(m,indices); if(closed)return {indices,closed:true};
  if(indices.length>1&&indices.some(index=>isIrregularEdge(m,index)))return {indices,closed:false};
  return null;
}
function selectIndices(indices) {
  const b = bridge(); if (!b?.set) return false;
  b.set('edge', [...new Set(indices)]);
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
  return true;
}
button?.addEventListener('click', event => {
  const m = mesh(), seeds = selectedEdges(); if (!m || !seeds.length) return;
  if(seeds.length>=2)return;
  event.preventDefault(); event.stopImmediatePropagation();
  const result=traceLoop(m,seeds[0]);
  if(!result){if(status)status.textContent='Select Loop • no unambiguous continuation from selected edge seed';return;}
  const ok=selectIndices(result.indices);
  if(status)status.textContent=ok?`${result.boundary?'Boundary Loop':'Select Loop'} • ${result.indices.length} edges${result.closed?' • closed':' • open rebuilt chain'}`:'Select Loop • selection handoff failed';
}, true);
