// BoxLab v0.36.18.39 — explicit safe vertex cleanup.
// Removes only redundant straight-through face-boundary vertices and truly
// orphaned internal vertices. Intentionally loose vertices / loose-edge endpoints
// are preserved. No automatic cleanup is performed by other topology tools.

const status=document.querySelector('#selectionStatus');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const deleteVertexButton=document.querySelector('#deleteVertexBtn');
const multiToggle=document.querySelector('#multiSelectToggle');
const EPS=1e-7;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function key(m,a,b){return m.edgeKey(a,b);}

const button=document.createElement('button');
button.id='cleanVerticesBtn';
button.type='button';
button.textContent='Clean Vertices';
button.disabled=true;

const host=document.createElement('div');
host.className='outliner-actions';
host.style.gridTemplateColumns='1fr';
host.appendChild(button);
const topologyRow=deleteVertexButton?.parentElement;
if(topologyRow?.parentElement)topologyRow.parentElement.insertBefore(host,topologyRow.nextSibling);
else vertexTools?.appendChild(host);

function looseEdgeVertices(m){
  const out=new Set();
  for(const k of m.looseEdges||[]){
    const[a,b]=String(k).split(':').map(Number);
    if(Number.isInteger(a))out.add(a);if(Number.isInteger(b))out.add(b);
  }
  return out;
}
function creaseVertices(m){
  const out=new Set();
  for(const k of m.creases||[]){
    const[a,b]=String(k).split(':').map(Number);
    if(Number.isInteger(a))out.add(a);if(Number.isInteger(b))out.add(b);
  }
  return out;
}
function collinear(a,b,c){
  if(!a||!b||!c)return false;
  const ab=b.clone().sub(a),bc=c.clone().sub(b);
  const scale=Math.max(ab.length(),bc.length(),1);
  if(ab.lengthSq()<1e-16||bc.lengthSq()<1e-16)return false;
  return ab.clone().cross(bc).length()<=EPS*scale*scale&&ab.dot(bc)>=-EPS;
}
function incidentFaces(m,v){
  const out=[];
  for(let fi=0;fi<m.faces.length;fi++)if(Array.isArray(m.faces[fi])&&m.faces[fi].includes(v))out.push(fi);
  return out;
}
function straightCandidate(m,v,protectedLoose){
  if(!Number.isInteger(v)||!m.vertices[v]||protectedLoose.has(v)||m.looseVertices?.has?.(v))return null;
  const faces=incidentFaces(m,v);if(!faces.length)return null;
  for(const fi of faces){
    const face=m.faces[fi],i=face.indexOf(v);
    if(i<0||face.length<=3)return null;
    const prev=face[(i-1+face.length)%face.length],next=face[(i+1)%face.length];
    if(prev===next||!collinear(m.vertices[prev],m.vertices[v],m.vertices[next]))return null;
    if((m.creases?.get?.(key(m,prev,v))||0)>0||(m.creases?.get?.(key(m,v,next))||0)>0)return null;
  }
  return{vertex:v,faces};
}
function faceSignature(face){
  const variants=[];
  const add=list=>{for(let i=0;i<list.length;i++)variants.push([...list.slice(i),...list.slice(0,i)].join(','));};
  add(face);add([...face].reverse());variants.sort();return variants[0]||'';
}
function areaVector(m,face){
  const out={x:0,y:0,z:0};
  for(let i=0;i<face.length;i++){
    const a=m.vertices[face[i]],b=m.vertices[face[(i+1)%face.length]];if(!a||!b)return null;
    out.x+=(a.y-b.y)*(a.z+b.z);out.y+=(a.z-b.z)*(a.x+b.x);out.z+=(a.x-b.x)*(a.y+b.y);
  }
  return out;
}
function validate(m){
  const sigs=new Set(),uses=new Map();
  for(const face of m.faces){
    if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length)return false;
    const a=areaVector(m,face);if(!a||a.x*a.x+a.y*a.y+a.z*a.z<1e-14)return false;
    const sig=faceSignature(face);if(sigs.has(sig))return false;sigs.add(sig);
    for(let i=0;i<face.length;i++){const k=key(m,face[i],face[(i+1)%face.length]);uses.set(k,(uses.get(k)||0)+1);}
  }
  return![...uses.values()].some(n=>n>2);
}
function compact(m){
  const used=new Set(m.faces.flat());
  for(const k of m.looseEdges||[]){const[a,b]=String(k).split(':').map(Number);if(Number.isInteger(a))used.add(a);if(Number.isInteger(b))used.add(b);}
  for(const v of m.looseVertices||[])if(Number.isInteger(v))used.add(v);
  for(const k of m.creases||[]){const[a,b]=String(k).split(':').map(Number);if(Number.isInteger(a))used.add(a);if(Number.isInteger(b))used.add(b);}
  const map=new Map(),vertices=[];
  m.vertices.forEach((p,i)=>{if(used.has(i)){map.set(i,vertices.length);vertices.push(p.clone());}});
  const removed=m.vertices.length-vertices.length;
  if(!removed)return{removed:0,map};
  m.vertices=vertices;m.faces=m.faces.map(face=>face.map(v=>map.get(v)));
  const creases=new Map();
  for(const[k,value]of m.creases||[]){const[a,b]=String(k).split(':').map(Number);if(map.has(a)&&map.has(b)&&map.get(a)!==map.get(b))creases.set(key(m,map.get(a),map.get(b)),value);}
  m.creases=creases;m.remapLooseTopology?.(map);m.edges();
  return{removed,map};
}
function cleanupPlan(source){
  if(!source)return null;
  const work=source.clone();
  if(source.looseEdges instanceof Set)work.looseEdges=new Set(source.looseEdges);
  if(source.looseVertices instanceof Set)work.looseVertices=new Set(source.looseVertices);
  const protectedLoose=looseEdgeVertices(work),protectedCrease=creaseVertices(work);
  const candidates=[];
  for(let v=0;v<work.vertices.length;v++){
    if(protectedCrease.has(v))continue;
    const info=straightCandidate(work,v,protectedLoose);if(info)candidates.push(v);
  }
  // Remove all candidates from every incident face. Validation below rejects any
  // unexpected interaction between neighbouring removals.
  for(const v of candidates){
    for(const face of work.faces){const i=face.indexOf(v);if(i>=0)face.splice(i,1);}
  }
  if(!validate(work))return null;
  const beforeCompact=work.vertices.length;
  const result=compact(work);
  const orphanRemoved=result.removed;
  const totalRemoved=source.vertices.length-work.vertices.length;
  if(!totalRemoved)return null;
  return{mesh:work,straightRemoved:candidates.length,orphanRemoved:Math.max(0,orphanRemoved-candidates.length),totalRemoved,beforeCompact};
}
function restore(target,source){
  target.vertices=source.vertices.map(v=>v.clone());target.faces=source.faces.map(f=>[...f]);target.creases=new Map(source.creases);
  if(source.looseEdges instanceof Set)target.looseEdges=new Set(source.looseEdges);if(source.looseVertices instanceof Set)target.looseVertices=new Set(source.looseVertices);target.edges();
}
function applyCleanup(){
  const m=mesh(),history=globalThis.__boxlabHistory;if(!m||!history)return;
  const plan=cleanupPlan(m);if(!plan){if(status)status.textContent='Clean Vertices • nothing safe to remove';sync();return;}
  const before=m.clone();history.push(before);
  restore(m,plan.mesh);
  bridge()?.set?.('vertex',[]);
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  render();sync();
  if(status)status.textContent=`Clean Vertices • removed ${plan.totalRemoved} redundant vertex${plan.totalRemoved===1?'':'es'}`;
}
function sync(){
  const plan=cleanupPlan(mesh());button.disabled=!plan;
  button.title=plan?`Remove ${plan.totalRemoved} safe redundant vertex${plan.totalRemoved===1?'':'es'}`:'No safe redundant vertices found';
}
button.addEventListener('click',applyCleanup);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabCleanVertices={version:'0.36.18.39',plan:cleanupPlan,apply:applyCleanup};
