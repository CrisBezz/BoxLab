// Vertex scaffolding uses the existing loose-topology owner. No face splitting,
// automatic welding or implicit face creation: each source gets one edge + tip.
export function buildVertexExtrude(before,indices,delta){
  const ids=[...new Set(indices||[])];
  if(!before?.clone||!ids.length||ids.some(i=>!Number.isInteger(i)||!before.vertices[i]))return {ok:false,reason:'Select valid vertices'};
  if(!delta||![delta.x,delta.y,delta.z].every(Number.isFinite)||delta.lengthSq()<=1e-18)return {ok:false,reason:'Enter a non-zero distance'};
  const candidate=before.clone();
  if(!candidate.addLooseVertex||!candidate.addLooseEdge)return {ok:false,reason:'Loose topology unavailable'};
  const tips=[],keys=[];
  for(const source of ids){
    const point=before.vertices[source].clone().add(delta);
    if(![point.x,point.y,point.z].every(Number.isFinite)||point.equals(before.vertices[source]))return {ok:false,reason:'Distance is outside the usable range'};
    const tip=candidate.addLooseVertex(point),key=candidate.addLooseEdge(source,tip);
    if(!Number.isInteger(tip)||!key)return {ok:false,reason:'Could not create scaffold edge'};
    tips.push(tip);keys.push(key);
  }
  return {ok:true,mesh:candidate,tips,keys,delta:delta.clone()};
}
