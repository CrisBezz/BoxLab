// Closed planar cells through a loose-edge seed, for the existing Edge hold browser.
// This only proposes selections; Fill and history keep their original owners.
export function scaffoldLoopCandidates(mesh,seedIndex){
  const edges=mesh?.edges?.()||[],seed=edges[seedIndex],points=mesh?.vertices;
  if(!seed?.loose||!points?.[seed.a]||!points?.[seed.b])return [];
  const origin=points[seed.a],axis=points[seed.b].clone().sub(origin),length=axis.length();
  if(!Number.isFinite(length)||length<=0)return [];
  axis.normalize();
  const scale=points.reduce((largest,p)=>Math.max(largest,p.distanceTo(origin)),length),tol=scale*1e-7;
  if(!Number.isFinite(scale))return [];
  const incidence=new Map();
  edges.forEach((e,i)=>{for(const v of [e.a,e.b]){if(!incidence.has(v))incidence.set(v,[]);incidence.get(v).push(i);}});
  const other=(e,v)=>e.a===v?e.b:e.a;
  const normals=[],seenLine=new Set(),queue=[seed.a,seed.b];
  // Continue along subdivided seed rails before looking for a plane-defining turn.
  while(queue.length){
    const v=queue.pop();if(seenLine.has(v))continue;seenLine.add(v);
    for(const i of incidence.get(v)||[]){
      const w=other(edges[i],v),delta=points[w]?.clone().sub(origin);if(!delta)continue;
      const normal=axis.clone().cross(delta),n=normal.length();
      if(n<=tol){if(!seenLine.has(w))queue.push(w);continue;}
      normal.divideScalar(n);
      if(!normals.some(p=>Math.abs(p.dot(normal))>1-1e-8))normals.push(normal);
    }
  }
  const result=[],seen=new Set();
  for(const normal of normals){
    const up=normal.clone().cross(axis),xy=new Map();
    points.forEach((p,v)=>{const delta=p.clone().sub(origin);if(Math.abs(delta.dot(normal))<=tol)xy.set(v,{x:delta.dot(axis),y:delta.dot(up)});});
    const adjacency=new Map();
    edges.forEach((e,i)=>{if(!xy.has(e.a)||!xy.has(e.b)||points[e.a].distanceTo(points[e.b])<=tol)return;for(const v of [e.a,e.b]){if(!adjacency.has(v))adjacency.set(v,new Set());adjacency.get(v).add(i);}});
    // Dangling branches do not bound a face and must not divert a perimeter walk.
    const leaves=[...adjacency.keys()].filter(v=>adjacency.get(v).size<2);
    while(leaves.length){const v=leaves.pop(),list=adjacency.get(v);if(!list||list.size>=2)continue;for(const i of list){const w=other(edges[i],v),next=adjacency.get(w);next?.delete(i);if(next?.size===1)leaves.push(w);}adjacency.delete(v);}
    if(!adjacency.get(seed.a)?.has(seedIndex)||!adjacency.get(seed.b)?.has(seedIndex))continue;
    for(const start of [seed.a,seed.b]){
      let from=start,to=other(seed,start),incoming=seedIndex;
      const indices=[seedIndex],vertices=[start],used=new Set([seedIndex]);let closed=false;
      for(let guard=0;guard<edges.length;guard++){
        if(to===start){closed=true;break;}
        if(vertices.includes(to))break;vertices.push(to);
        const p=xy.get(to),back=xy.get(from),backAngle=Math.atan2(back.y-p.y,back.x-p.x);
        const options=[...(adjacency.get(to)||[])].filter(i=>i!==incoming).map(i=>{const q=xy.get(other(edges[i],to));return {i,turn:(backAngle-Math.atan2(q.y-p.y,q.x-p.x)+Math.PI*2)%(Math.PI*2)};}).sort((a,b)=>a.turn-b.turn);
        if(!options.length||options.length>1&&Math.abs(options[0].turn-options[1].turn)<1e-8)break;
        const next=options[0].i;if(used.has(next))break;
        used.add(next);indices.push(next);from=to;to=other(edges[next],to);incoming=next;
      }
      if(!closed||indices.length<3)continue;
      let area=0;for(let i=0;i<vertices.length;i++){const p=xy.get(vertices[i]),q=xy.get(vertices[(i+1)%vertices.length]);area+=p.x*q.y-q.x*p.y;}
      // Clockwise exterior walks are not individual scaffold cells.
      if(area<=tol*scale||crosses(vertices,xy,tol))continue;
      const keys=new Set(indices.map(i=>mesh.edgeKey(edges[i].a,edges[i].b)));
      if(mesh.faces.some(face=>face.length===indices.length&&face.every((v,i)=>keys.has(mesh.edgeKey(v,face[(i+1)%face.length])))))continue;
      const signature=[...indices].sort((a,b)=>a-b).join(',');if(seen.has(signature))continue;
      seen.add(signature);result.push(indices);
    }
  }
  return result.sort((a,b)=>a.length-b.length||a.slice().sort((x,y)=>x-y).join(',').localeCompare(b.slice().sort((x,y)=>x-y).join(',')));
}
function crosses(vertices,xy,tol){
  const orient=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
  const between=(a,b,c)=>c.x>=Math.min(a.x,b.x)-tol&&c.x<=Math.max(a.x,b.x)+tol&&c.y>=Math.min(a.y,b.y)-tol&&c.y<=Math.max(a.y,b.y)+tol;
  for(let i=0;i<vertices.length;i++)for(let j=i+1;j<vertices.length;j++){
    if(j===i+1||i===0&&j===vertices.length-1)continue;
    const a=xy.get(vertices[i]),b=xy.get(vertices[(i+1)%vertices.length]),c=xy.get(vertices[j]),d=xy.get(vertices[(j+1)%vertices.length]);
    const eps=tol*Math.max(Math.hypot(b.x-a.x,b.y-a.y),Math.hypot(d.x-c.x,d.y-c.y));
    const x=orient(a,b,c),y=orient(a,b,d),z=orient(c,d,a),w=orient(c,d,b);
    if((x>eps&&y< -eps||x< -eps&&y>eps)&&(z>eps&&w< -eps||z< -eps&&w>eps))return true;
    if(Math.abs(x)<=eps&&between(a,b,c)||Math.abs(y)<=eps&&between(a,b,d)||Math.abs(z)<=eps&&between(c,d,a)||Math.abs(w)<=eps&&between(c,d,b))return true;
  }
  return false;
}
