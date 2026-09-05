import * as THREE from 'three';

function state(){return globalThis.__boxlabBridgeState;}
function key(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

function facePlaneError(mesh,face){
  if(!Array.isArray(face)||face.length<4)return 0;
  const a=mesh.vertices[face[0]];let normal=null;
  for(let i=1;i<face.length-1;i++){
    const n=new THREE.Vector3().crossVectors(mesh.vertices[face[i]].clone().sub(a),mesh.vertices[face[i+1]].clone().sub(a));
    if(n.lengthSq()>1e-12){normal=n.normalize();break;}
  }
  if(!normal)return 0;
  let error=0;for(const id of face)error=Math.max(error,Math.abs(mesh.vertices[id].clone().sub(a).dot(normal)));
  return error;
}

function boundaryComponents(mesh){
  const owners=new Map();
  for(const face of mesh.faces){if(!Array.isArray(face)||face.length<3)continue;for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length],k=key(a,b);if(!owners.has(k))owners.set(k,{a,b,count:0});owners.get(k).count++;}}
  const edges=[...owners.values()].filter(e=>e.count===1),byVertex=new Map();
  edges.forEach((e,i)=>{for(const v of[e.a,e.b]){if(!byVertex.has(v))byVertex.set(v,[]);byVertex.get(v).push(i);}});
  const seen=new Set(),components=[];
  for(let seed=0;seed<edges.length;seed++){
    if(seen.has(seed))continue;const queue=[seed],component=[];seen.add(seed);
    while(queue.length){const i=queue.shift(),e=edges[i];component.push(e);for(const v of[e.a,e.b])for(const j of byVertex.get(v)||[])if(!seen.has(j)){seen.add(j);queue.push(j);}}
    components.push(component);
  }
  return components;
}

function cycleFromEdges(edges){
  const adj=new Map();for(const e of edges){if(!adj.has(e.a))adj.set(e.a,[]);if(!adj.has(e.b))adj.set(e.b,[]);adj.get(e.a).push(e.b);adj.get(e.b).push(e.a);}
  if([...adj.values()].some(n=>n.length!==2))return null;
  const start=adj.keys().next().value,loop=[start];let prev=null,current=start;
  for(let guard=0;guard<edges.length;guard++){
    const next=(adj.get(current)||[]).find(v=>v!==prev);if(next===undefined)return null;
    if(next===start)return loop.length===edges.length?loop:null;
    if(loop.includes(next))return null;loop.push(next);prev=current;current=next;
  }
  return null;
}

function matchings(values){
  if(!values.length)return [[]];const a=values[0],out=[];
  for(let i=1;i<values.length;i++){const b=values[i],rest=values.slice(1,i).concat(values.slice(i+1));for(const tail of matchings(rest))out.push([[a,b],...tail]);}
  return out;
}

function translationPairs(mesh,vertices,tol){
  let best=null;
  for(const matching of matchings(vertices)){
    const first=mesh.vertices[matching[0][1]].clone().sub(mesh.vertices[matching[0][0]]);if(first.length()<tol)return null;
    for(const firstSign of[1,-1]){
      const d=first.clone().multiplyScalar(firstSign),pairs=[],used=new Set();let error=0,ok=true;
      for(const [a,b] of matching){
        const dab=mesh.vertices[b].clone().sub(mesh.vertices[a]),dba=dab.clone().multiplyScalar(-1),ea=dab.distanceTo(d),eb=dba.distanceTo(d);
        const from=ea<=eb?a:b,to=ea<=eb?b:a,e=Math.min(ea,eb);if(e>tol){ok=false;break;}pairs.push([from,to]);used.add(from);used.add(to);error+=e;
      }
      if(ok&&used.size===vertices.length&&(!best||error<best.error))best={pairs,error};
    }
  }
  return best?.pairs||null;
}

function orderedThreePath(edges,set){
  const local=edges.filter(e=>set.has(e.a)&&set.has(e.b));if(local.length!==2)return null;
  const adj=new Map();for(const e of local){if(!adj.has(e.a))adj.set(e.a,[]);if(!adj.has(e.b))adj.set(e.b,[]);adj.get(e.a).push(e.b);adj.get(e.b).push(e.a);}
  const ends=[...adj].filter(([,n])=>n.length===1).map(([v])=>v);if(ends.length!==2)return null;
  const a=ends[0],b=adj.get(a)[0],c=adj.get(b).find(v=>v!==a);return Number.isInteger(c)?[a,b,c]:null;
}

function directedPenalty(mesh,face){
  let penalty=0;for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length];for(const existing of mesh.faces){for(let j=0;j<existing.length;j++)if(existing[j]===a&&existing[(j+1)%existing.length]===b){penalty++;break;}}}
  return penalty;
}
function orientFace(mesh,face){const reversed=[...face].reverse();return directedPenalty(mesh,reversed)<directedPenalty(mesh,face)?reversed:face;}

function repairCornerRebuild(){
  const status=document.querySelector('#selectionStatus'),text=status?.textContent||'';if(!text.includes('corner breakout created')||text.includes('rebuild fixed'))return;
  const mesh=state()?.mesh;if(!mesh)return;
  let scale=0;for(const face of mesh.faces)for(let i=0;i<face.length;i++){const a=mesh.vertices[face[i]],b=mesh.vertices[face[(i+1)%face.length]];scale=Math.max(scale,a.distanceTo(b));}
  const planeTol=Math.max(1e-6,scale*1e-5),bad=[];
  mesh.faces.forEach((face,index)=>{if(face?.length===4&&facePlaneError(mesh,face)>planeTol*10)bad.push(index);});
  if(bad.length!==2)return;
  const badVertices=new Set(bad.flatMap(i=>mesh.faces[i]));
  const saved=bad.map(i=>[...mesh.faces[i]]);for(const i of[...bad].sort((a,b)=>b-a))mesh.faces.splice(i,1);
  const components=boundaryComponents(mesh).map(edges=>({edges,loop:cycleFromEdges(edges)})).filter(c=>c.loop?.length===6).sort((a,b)=>b.loop.filter(v=>badVertices.has(v)).length-a.loop.filter(v=>badVertices.has(v)).length);
  const component=components[0];if(!component||component.loop.filter(v=>badVertices.has(v)).length<4){mesh.faces.push(...saved);mesh.edges();return;}
  const vertices=[...component.loop],pairTol=Math.max(planeTol*50,scale*1e-4),pairs=translationPairs(mesh,vertices,pairTol);if(!pairs){mesh.faces.push(...saved);mesh.edges();return;}
  const sourceSet=new Set(pairs.map(p=>p[0])),targetBySource=new Map(pairs),sourcePath=orderedThreePath(component.edges,sourceSet);if(!sourcePath){mesh.faces.push(...saved);mesh.edges();return;}
  const quads=[];for(let i=0;i<2;i++){const a=sourcePath[i],b=sourcePath[i+1],ta=targetBySource.get(a),tb=targetBySource.get(b);if(!Number.isInteger(ta)||!Number.isInteger(tb)){mesh.faces.push(...saved);mesh.edges();return;}const q=[a,b,tb,ta];if(new Set(q).size!==4||facePlaneError(mesh,q)>pairTol){mesh.faces.push(...saved);mesh.edges();return;}quads.push(orientFace(mesh,q));mesh.faces.push(quads[quads.length-1]);}
  mesh.edges();if(status)status.textContent=`${text} • rebuild fixed`;render();
}

window.addEventListener('pointerup',()=>setTimeout(repairCornerRebuild,0),true);
