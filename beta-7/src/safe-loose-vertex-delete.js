// BoxLab v0.36.18.71 — safe Delete for genuinely loose selected vertices.
// Intercepts the native Vertex Delete only when every selected vertex is unused
// by all real faces. Connected/mixed selections fall through to the existing
// native Delete behavior unchanged.

const deleteButton=document.querySelector('#deleteVertexBtn');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedVertices(){
  const b=bridge();
  return b?.mode?.()==='vertex'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];
}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(m,a,b){return m.edgeKey?m.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}

function faceUsedVertices(m){
  const used=new Set();
  for(const face of m?.faces||[]){
    if(!Array.isArray(face)||face.length<3)continue;
    for(const v of face)if(Number.isInteger(v))used.add(v);
  }
  return used;
}

function looseDeletePlan(m,ids){
  const selected=[...new Set(ids||[])].filter(i=>Number.isInteger(i)&&m?.vertices?.[i]);
  if(!m||!selected.length)return{ok:false,reason:'No selected vertices'};
  const used=faceUsedVertices(m);
  if(selected.some(i=>used.has(i)))return{ok:false,reason:'Selection contains face-connected vertices'};

  const remove=new Set(selected);
  const indexMap=new Map(),vertices=[];
  m.vertices.forEach((v,oldIndex)=>{
    if(remove.has(oldIndex))return;
    indexMap.set(oldIndex,vertices.length);
    vertices.push(v.clone?v.clone():v);
  });

  // Faces are guaranteed not to reference removed vertices, so only remap.
  const faces=[];
  for(const face of m.faces||[]){
    if(!Array.isArray(face)){faces.push(face);continue;}
    const mapped=face.map(v=>indexMap.get(v));
    if(mapped.some(v=>!Number.isInteger(v)))return{ok:false,reason:'Face remap failed'};
    faces.push(mapped);
  }

  const creases=new Map();
  for(const [key,value] of m.creases||[]){
    const [a,b]=String(key).split(':').map(Number);
    if(!indexMap.has(a)||!indexMap.has(b))continue;
    const na=indexMap.get(a),nb=indexMap.get(b);
    if(na===nb)continue;
    creases.set(edgeKey(m,na,nb),value);
  }

  const looseEdges=new Set();
  for(const key of m.looseEdges||[]){
    const [a,b]=String(key).split(':').map(Number);
    if(!indexMap.has(a)||!indexMap.has(b))continue;
    const na=indexMap.get(a),nb=indexMap.get(b);
    if(na===nb)continue;
    looseEdges.add(edgeKey(m,na,nb));
  }

  const looseVertices=new Set();
  for(const oldIndex of m.looseVertices||[]){
    const next=indexMap.get(oldIndex);
    if(Number.isInteger(next))looseVertices.add(next);
  }

  return{ok:true,selected,indexMap,vertices,faces,creases,looseEdges,looseVertices};
}

function applyLooseDelete(event){
  const m=mesh(),ids=selectedVertices();
  const plan=looseDeletePlan(m,ids);
  if(!plan.ok)return; // preserve native Delete for ordinary connected vertices.

  event.preventDefault();
  event.stopImmediatePropagation();

  const history=globalThis.__boxlabHistory;
  if(history)history.push(m.clone());

  m.vertices=plan.vertices;
  m.faces=plan.faces;
  m.creases=plan.creases;
  if(m.looseEdges instanceof Set||plan.looseEdges.size)m.looseEdges=plan.looseEdges;
  if(m.looseVertices instanceof Set||plan.looseVertices.size)m.looseVertices=plan.looseVertices;
  m.edges?.();

  bridge()?.set?.('vertex',[]);
  if(multiToggle?.checked){
    multiToggle.checked=false;
    multiToggle.dispatchEvent(new Event('change',{bubbles:true}));
  }
  render();
  if(status)status.textContent=`Delete Loose Vertices • removed ${plan.selected.length} vertex${plan.selected.length===1?'':'es'} • faces preserved`;
}

// Capture phase is intentional: the native main.js Delete listener is already
// registered on this button and must not run for all-loose selections.
deleteButton?.addEventListener('click',applyLooseDelete,true);

globalThis.__boxlabSafeLooseVertexDelete={version:'0.36.18.71',plan:looseDeletePlan,apply:applyLooseDelete};
