// BoxLab v0.36.18.201 — automatic Close Holes repair.
// Finds simple closed boundary loops, fills them without triangle-fanning,
// and validates transactionally through the Topology Gate before commit.
const VERSION='0.36.18.201';
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState||null;}
function mesh(){return state()?.mesh||null;}
function edgeKey(m,a,b){return typeof m?.edgeKey==='function'?m.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}
function realFaces(m,edge){return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}
function isBoundaryEdge(m,edge){return !!edge&&realFaces(m,edge).length===1;}

function extractBoundaryLoops(m=mesh()){
  const result={version:VERSION,available:!!m,loops:[],openChains:[],branched:[],boundaryEdges:0};
  if(!m||typeof m.edges!=='function')return result;
  const all=m.edges();
  const boundary=all.map((edge,index)=>({edge,index})).filter(item=>isBoundaryEdge(m,item.edge));
  result.boundaryEdges=boundary.length;
  const byVertex=new Map();
  for(const item of boundary){
    for(const v of [item.edge.a,item.edge.b]){
      if(!byVertex.has(v))byVertex.set(v,[]);
      byVertex.get(v).push(item);
    }
  }
  const unseen=new Set(boundary.map(item=>item.index));
  while(unseen.size){
    const seed=unseen.values().next().value;
    const queue=[seed],component=[],componentVertices=new Set();unseen.delete(seed);
    while(queue.length){
      const index=queue.shift(),edge=all[index];if(!edge)continue;
      component.push(index);componentVertices.add(edge.a);componentVertices.add(edge.b);
      for(const v of [edge.a,edge.b])for(const item of byVertex.get(v)||[])if(unseen.has(item.index)){unseen.delete(item.index);queue.push(item.index);}
    }
    const adjacency=new Map();
    for(const index of component){const edge=all[index];for(const [a,b] of [[edge.a,edge.b],[edge.b,edge.a]]){if(!adjacency.has(a))adjacency.set(a,[]);adjacency.get(a).push(b);}}
    const degrees=[...adjacency.values()].map(list=>list.length);
    if(degrees.some(d=>d>2)){result.branched.push({edges:component,vertices:[...componentVertices]});continue;}
    const ends=[...adjacency].filter(([,list])=>list.length===1).map(([v])=>v);
    if(ends.length===2){result.openChains.push({edges:component,vertices:[...componentVertices]});continue;}
    if(ends.length!==0||degrees.some(d=>d!==2)){result.branched.push({edges:component,vertices:[...componentVertices]});continue;}
    const start=adjacency.keys().next().value,cycle=[start];let previous=null,current=start,valid=true;
    for(let guard=0;guard<=adjacency.size;guard++){
      const options=(adjacency.get(current)||[]).filter(v=>v!==previous);
      const next=options[0];
      if(next===undefined){valid=false;break;}
      if(next===start)break;
      if(cycle.includes(next)){valid=false;break;}
      cycle.push(next);previous=current;current=next;
    }
    if(!valid||cycle.length!==adjacency.size){result.branched.push({edges:component,vertices:[...componentVertices]});continue;}
    result.loops.push({edges:component,vertices:cycle});
  }
  return result;
}

function directedEdge(face,a,b){
  if(!Array.isArray(face))return 0;
  for(let i=0;i<face.length;i++){const x=face[i],y=face[(i+1)%face.length];if(x===a&&y===b)return 1;if(x===b&&y===a)return-1;}
  return 0;
}
function orientAgainstNeighbour(m,cycle){
  const all=m.edges(),byKey=new Map(all.map(edge=>[edgeKey(m,edge.a,edge.b),edge]));
  for(let i=0;i<cycle.length;i++){
    const a=cycle[i],b=cycle[(i+1)%cycle.length],edge=byKey.get(edgeKey(m,a,b)),fi=edge?realFaces(m,edge)[0]:null,face=Number.isInteger(fi)?m.faces[fi]:null;
    if(!face)continue;
    const direction=directedEdge(face,a,b);
    if(direction===1)return [...cycle].reverse();
    if(direction===-1)return [...cycle];
  }
  return [...cycle];
}
function restore(m,before){m.vertices=before.vertices.map(v=>v.clone?v.clone():{...v});m.faces=before.faces.map(f=>[...f]);m.creases=new Map(before.creases?[...before.creases]:[]);}
function forceRender(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

function closeHoles(m=mesh()){
  if(!m)return{ok:false,reason:'No editable mesh'};
  const boundary=extractBoundaryLoops(m);
  if(!boundary.loops.length)return{ok:false,reason:boundary.boundaryEdges?'No simple closed boundary loops':'Mesh has no holes',...boundary};
  const gate=globalThis.__boxlabTopologyGate;
  const before=m.clone(),beforeGate=gate?.validate?.(m)||null;
  const added=[];
  for(const loop of boundary.loops){
    if(loop.vertices.length<3)continue;
    const cycle=orientAgainstNeighbour(m,loop.vertices);
    m.faces.push(cycle);added.push({faceIndex:m.faces.length-1,size:cycle.length,kind:cycle.length===4?'quad':cycle.length===3?'triangle':'ngon'});
  }
  const after=gate?.validate?.(m)||null;
  const expectedBoundary=Math.max(0,(beforeGate?.boundaryEdges??boundary.boundaryEdges)-boundary.loops.reduce((sum,loop)=>sum+loop.edges.length,0));
  const invalid=after&&(!after.valid||after.boundaryEdges>expectedBoundary);
  if(invalid){restore(m,before);forceRender();gate?.sync?.();return{ok:false,reason:'Validation failed — repair rolled back',boundary,before:beforeGate,after};}
  globalThis.__boxlabHistory?.push?.(before);
  forceRender();gate?.sync?.();
  return{ok:true,closed:added.length,added,boundary,before:beforeGate,after};
}

function ensureUI(){
  const gate=document.querySelector('#topologyValidityGate');if(!gate)return null;
  let row=document.querySelector('#closeHolesRow');if(row)return row;
  row=document.createElement('div');row.id='closeHolesRow';row.style.cssText='margin:5px 0 0;display:grid;grid-template-columns:1fr';
  const button=document.createElement('button');button.type='button';button.id='closeHolesBtn';button.textContent='Close Holes';button.title='Fill all simple closed boundary loops; quads stay quads and larger loops are kept as clean n-gons for later quad cleanup';
  row.append(button);gate.insertAdjacentElement('afterend',row);
  button.addEventListener('click',()=>{
    const result=closeHoles();
    if(status)status.textContent=result.ok?`Close Holes • ${result.closed} hole${result.closed===1?'':'s'} closed`:`Close Holes • ${result.reason}`;
    syncUI();
  });
  return row;
}
function syncUI(){
  const row=ensureUI(),button=row?.querySelector('#closeHolesBtn');if(!button)return false;
  const info=extractBoundaryLoops(mesh());button.disabled=!info.loops.length;
  button.textContent=info.loops.length?`Close Holes (${info.loops.length})`:'Close Holes';
  return true;
}

if(!ensureUI()){let attempts=0;const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>50)clearInterval(timer);},100);}
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(syncUI));
document.addEventListener('pointerup',()=>setTimeout(syncUI,0),true);

globalThis.__boxlabCloseHoles={version:VERSION,extractBoundaryLoops,closeHoles,syncUI};
