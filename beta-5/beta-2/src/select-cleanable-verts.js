// BoxLab v0.36.18.134 — non-destructive redundant-vertex inspection.
// Selects safe straight-through face-boundary vertices matching the existing
// Clean Vertices repair criteria. Loose topology and creased corners are excluded.
// Geometry/history are untouched.

const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');
const EPS=1e-7;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function key(m,a,b){return m.edgeKey(a,b);}

const row=document.createElement('div');
row.id='cleanableVertexSelectionRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin:4px 0 0';

const button=document.createElement('button');
button.id='selectCleanableVerticesBtn';
button.type='button';
button.textContent='Cleanable Verts';
button.disabled=true;
button.style.cssText='width:100%;min-width:0;font-size:10px;padding:5px 3px';
row.append(button);

function place(){
  if(row.isConnected)return true;
  if(!vertexTools)return false;
  const valence=document.querySelector('#vertexValenceSelectionGroup');
  if(valence?.parentElement===vertexTools){valence.insertAdjacentElement('afterend',row);return true;}
  const classification=document.querySelector('#vertexClassificationSelectionGroup');
  if(classification?.parentElement===vertexTools){classification.insertAdjacentElement('afterend',row);return true;}
  vertexTools.appendChild(row);
  return true;
}

function looseEdgeVertices(m){
  const out=new Set();
  for(const k of m.looseEdges||[]){
    const[a,b]=String(k).split(':').map(Number);
    if(Number.isInteger(a))out.add(a);
    if(Number.isInteger(b))out.add(b);
  }
  return out;
}
function creaseVertices(m){
  const out=new Set();
  for(const k of m.creases||[]){
    const[a,b]=String(k).split(':').map(Number);
    if(Number.isInteger(a))out.add(a);
    if(Number.isInteger(b))out.add(b);
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
function straightCandidate(m,v,protectedLoose,protectedCrease){
  if(!Number.isInteger(v)||!m.vertices[v]||protectedLoose.has(v)||protectedCrease.has(v)||m.looseVertices?.has?.(v))return false;
  const faces=incidentFaces(m,v);
  if(!faces.length)return false;
  for(const fi of faces){
    const face=m.faces[fi],i=face.indexOf(v);
    if(i<0||face.length<=3)return false;
    const prev=face[(i-1+face.length)%face.length],next=face[(i+1)%face.length];
    if(prev===next||!collinear(m.vertices[prev],m.vertices[v],m.vertices[next]))return false;
    if((m.creases?.get?.(key(m,prev,v))||0)>0||(m.creases?.get?.(key(m,v,next))||0)>0)return false;
  }
  return true;
}

function inspect(m){
  if(!m)return{indices:[],count:0};
  const protectedLoose=looseEdgeVertices(m),protectedCrease=creaseVertices(m),indices=[];
  for(let v=0;v<m.vertices.length;v++)if(straightCandidate(m,v,protectedLoose,protectedCrease))indices.push(v);
  return{indices,count:indices.length};
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const vertexMode=document.querySelector('#selectionModes button[data-mode="vertex"]');
  if(vertexMode&&!vertexMode.classList.contains('active'))vertexMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('vertex',info.indices);
    render();
    if(status)status.textContent=info.count
      ?`Cleanable Verts • ${info.count} redundant vert${info.count===1?'':'s'} selected`
      :'Cleanable Verts • 0 safe redundant verts';
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  button.disabled=!m;
  button.title=m
    ?`Select safe straight-through redundant vertices • ${info.count} found`
    :'No editable mesh';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectCleanableVerts={version:'0.36.18.134',inspect,apply,sync};
