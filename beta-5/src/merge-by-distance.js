import * as THREE from 'three';

// BoxLab v0.36.18.41 — conservative selected-vertex Merge by Distance.
// Batch-welds only selected regular mesh vertices within an exact model-unit tolerance.

const status=document.querySelector('#selectionStatus');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedVertices(){const b=bridge();return b?.mode?.()==='vertex'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function key(m,a,b){return m.edgeKey(a,b);}

const row=document.createElement('div');
row.id='mergeByDistanceRow';
row.style.cssText='display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;margin:6px 0 2px';
const label=document.createElement('span');label.textContent='Merge Dist';label.style.fontSize='11px';
const input=document.createElement('input');input.id='mergeByDistanceValue';input.type='number';input.step='0.001';input.min='0';input.value='0.001';input.inputMode='decimal';
const button=document.createElement('button');button.id='mergeByDistanceBtn';button.type='button';button.textContent='Apply';
row.append(label,input,button);
const anchor=document.querySelector('#vertexMergeRow');
if(anchor?.parentElement)anchor.parentElement.insertBefore(row,anchor.nextSibling);else vertexTools?.append(row);

function faceSignature(face){
  const variants=[];const add=list=>{for(let i=0;i<list.length;i++)variants.push([...list.slice(i),...list.slice(0,i)].join(','));};
  add(face);add([...face].reverse());variants.sort();return variants[0]||'';
}
function areaVector(m,face,positions){
  const out=new THREE.Vector3();
  for(let i=0;i<face.length;i++){
    const a=positions.get(face[i])||m.vertices[face[i]];
    const b=positions.get(face[(i+1)%face.length])||m.vertices[face[(i+1)%face.length]];
    if(!a||!b)return null;
    out.x+=(a.y-b.y)*(a.z+b.z);out.y+=(a.z-b.z)*(a.x+b.x);out.z+=(a.x-b.x)*(a.y+b.y);
  }
  return out;
}
function plan(m,ids,tolerance){
  const selected=[...new Set(ids||[])].filter(i=>Number.isInteger(i)&&m?.vertices?.[i]);
  if(selected.length<2)return{ok:false,reason:'Select at least two vertices'};
  const usedByFace=new Set(m.faces.flat());
  if(selected.some(v=>m.looseVertices?.has?.(v)||!usedByFace.has(v)))return{ok:false,reason:'Select regular mesh vertices only'};
  const tol=Number(tolerance);if(!Number.isFinite(tol)||tol<=0)return{ok:false,reason:'Enter a distance greater than 0'};

  const parent=new Map(selected.map(v=>[v,v]));
  const find=v=>{let p=parent.get(v);while(p!==parent.get(p)){parent.set(p,parent.get(parent.get(p)));p=parent.get(p);}return p;};
  const unite=(a,b)=>{a=find(a);b=find(b);if(a===b)return;parent.set(Math.max(a,b),Math.min(a,b));};
  for(let i=0;i<selected.length;i++)for(let j=i+1;j<selected.length;j++)if(m.vertices[selected[i]].distanceTo(m.vertices[selected[j]])<=tol)unite(selected[i],selected[j]);

  const groups=new Map();
  for(const v of selected){const r=find(v);if(!groups.has(r))groups.set(r,[]);groups.get(r).push(v);}
  const clusters=[...groups.values()].filter(g=>g.length>1);
  if(!clusters.length)return{ok:false,reason:'No selected vertices are within that distance'};

  const representative=new Map(),positions=new Map();
  for(const group of clusters){
    const keep=Math.min(...group),center=new THREE.Vector3();group.forEach(v=>center.add(m.vertices[v]));center.multiplyScalar(1/group.length);
    group.forEach(v=>representative.set(v,keep));positions.set(keep,center);
  }

  const nextFaces=[];
  for(const face of m.faces){
    if(!Array.isArray(face)||face.length<3)continue;
    const mapped=face.map(v=>representative.get(v)??v),clean=[];
    for(const v of mapped)if(!clean.length||clean[clean.length-1]!==v)clean.push(v);
    if(clean.length>1&&clean[0]===clean[clean.length-1])clean.pop();
    if(clean.length<3)return{ok:false,reason:'Merge would remove a triangular face'};
    if(new Set(clean).size!==clean.length)return{ok:false,reason:'Merge would repeat a vertex inside a face'};
    const area=areaVector(m,clean,positions);if(!area||area.lengthSq()<1e-14)return{ok:false,reason:'Merge would create a zero-area face'};
    nextFaces.push(clean);
  }

  const sigs=new Set(),uses=new Map();
  for(const face of nextFaces){
    const sig=faceSignature(face);if(sigs.has(sig))return{ok:false,reason:'Merge would create duplicate faces'};sigs.add(sig);
    for(let i=0;i<face.length;i++){const k=key(m,face[i],face[(i+1)%face.length]);uses.set(k,(uses.get(k)||0)+1);}
  }
  if([...uses.values()].some(n=>n>2))return{ok:false,reason:'Merge would create non-manifold edges'};
  return{ok:true,tolerance:tol,clusters,representative,positions,nextFaces};
}
function restore(target,source){target.vertices=source.vertices.map(v=>v.clone());target.faces=source.faces.map(f=>[...f]);target.creases=new Map(source.creases);if(source.looseEdges instanceof Set)target.looseEdges=new Set(source.looseEdges);if(source.looseVertices instanceof Set)target.looseVertices=new Set(source.looseVertices);target.edges();}
function apply(){
  const m=mesh(),history=globalThis.__boxlabHistory,ids=selectedVertices();if(!m||!history)return;
  const p=plan(m,ids,input.value);if(!p.ok){if(status)status.textContent=`Merge by Distance • ${p.reason}`;sync();return;}
  const before=m.clone();history.push(before);
  for(const [keep,pos] of p.positions)m.vertices[keep].copy(pos);
  m.faces=p.nextFaces.map(f=>[...f]);

  const mergedCreases=new Map();
  for(const [k,value] of before.creases||[]){let[a,b]=String(k).split(':').map(Number);a=p.representative.get(a)??a;b=p.representative.get(b)??b;if(a===b)continue;const nk=key(m,a,b);mergedCreases.set(nk,Math.max(mergedCreases.get(nk)||0,value));}
  m.creases=mergedCreases;
  if(before.looseEdges instanceof Set)m.looseEdges=new Set(before.looseEdges);if(before.looseVertices instanceof Set)m.looseVertices=new Set(before.looseVertices);
  const mergeMap=new Map(m.vertices.map((_,i)=>[i,p.representative.get(i)??i]));m.remapLooseTopology?.(mergeMap);

  const used=new Set(m.faces.flat());
  for(const k of m.looseEdges||[]){const[a,b]=String(k).split(':').map(Number);if(Number.isInteger(a))used.add(a);if(Number.isInteger(b))used.add(b);}
  for(const v of m.looseVertices||[])if(Number.isInteger(v))used.add(v);
  for(const k of m.creases||[]){const[a,b]=String(k).split(':').map(Number);if(Number.isInteger(a))used.add(a);if(Number.isInteger(b))used.add(b);}
  const map=new Map(),vertices=[];m.vertices.forEach((v,i)=>{if(used.has(i)){map.set(i,vertices.length);vertices.push(v.clone());}});
  m.vertices=vertices;m.faces=m.faces.map(f=>f.map(v=>map.get(v)));
  const creases=new Map();for(const[k,value]of m.creases){const[a,b]=String(k).split(':').map(Number);if(map.has(a)&&map.has(b)&&map.get(a)!==map.get(b))creases.set(key(m,map.get(a),map.get(b)),value);}m.creases=creases;m.remapLooseTopology?.(map);m.edges();

  const results=[...p.positions.keys()].map(v=>map.get(v)).filter(Number.isInteger);
  if(!results.length){restore(m,before);render();if(status)status.textContent='Merge by Distance • rollback';return;}
  if(multiToggle){const wanted=results.length>1;if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}}
  bridge()?.set?.('vertex',results);render();sync();if(status)status.textContent=`Merge by Distance • ${p.clusters.length} cluster${p.clusters.length===1?'':'s'} merged • ${results.length} result${results.length===1?'':'s'} selected`;
}
function sync(){const p=plan(mesh(),selectedVertices(),input.value);button.disabled=!p.ok;button.title=p.ok?`Merge ${p.clusters.length} nearby selected cluster${p.clusters.length===1?'':'s'}`:(p.reason||'Select nearby vertices');}
button.addEventListener('click',apply);input.addEventListener('input',sync);input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!button.disabled)apply();});window.addEventListener('boxlab-bridge-state',sync);document.addEventListener('pointerup',()=>queueMicrotask(sync),true);setTimeout(sync,0);

globalThis.__boxlabMergeByDistance={version:'0.36.18.41',plan,apply};
