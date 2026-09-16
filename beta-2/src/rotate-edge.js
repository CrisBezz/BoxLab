import * as THREE from 'three';

// BoxLab v0.36.18.96 — conservative triangle-pair Edge Rotate.
// Flips one uncreased shared diagonal between exactly two consistently wound triangles.

const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const bridgeButton=document.querySelector('#bridgeEdgesBtn');
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function selectedEdges(){
  const b=bridge();
  return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])].filter(Number.isInteger):[];
}
function edgeKey(m,a,b){return m.edgeKey(a,b);}

const button=document.createElement('button');
button.id='rotateEdgeBtn';
button.type='button';
button.textContent='Rotate Edge';
button.disabled=true;
button.style.cssText='width:100%;min-width:0';

function place(){
  const row=bridgeButton?.parentElement;
  if(row){
    row.style.gridTemplateColumns='repeat(4,minmax(0,1fr))';
    for(const b of row.querySelectorAll('button')){b.style.minWidth='0';b.style.width='100%';}
    if(button.parentElement!==row)row.appendChild(button);
    return true;
  }
  if(edgeTools&&!button.isConnected){
    const host=document.createElement('div');
    host.className='outliner-actions';
    host.style.cssText='grid-template-columns:1fr;margin-top:4px';
    host.appendChild(button);
    edgeTools.appendChild(host);
    return true;
  }
  return false;
}

function directedEdge(face,a,b){
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return 1;
    if(x===b&&y===a)return -1;
  }
  return 0;
}
function thirdVertex(face,a,b){return face.find(v=>v!==a&&v!==b);}
function triangleAreaSq(m,tri){
  const a=m.vertices?.[tri[0]],b=m.vertices?.[tri[1]],c=m.vertices?.[tri[2]];
  if(!a||!b||!c)return 0;
  return b.clone().sub(a).cross(c.clone().sub(a)).lengthSq();
}
function normalOf(m,tri){
  const a=m.vertices?.[tri[0]],b=m.vertices?.[tri[1]],c=m.vertices?.[tri[2]];
  if(!a||!b||!c)return null;
  const n=b.clone().sub(a).cross(c.clone().sub(a));
  return n.lengthSq()>1e-20?n.normalize():null;
}

function info(m,edgeIndex){
  const edges=m?.edges?.()||[],edge=edges[edgeIndex];
  if(!edge||edge.loose)return{ok:false,reason:'Select one regular shared Edge'};
  const owners=(edge.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&Array.isArray(m.faces?.[fi]));
  if(owners.length!==2)return{ok:false,reason:'Edge must be shared by exactly two Faces'};
  const [f0,f1]=owners,face0=m.faces[f0],face1=m.faces[f1];
  if(face0.length!==3||face1.length!==3)return{ok:false,reason:'Rotate Edge requires two triangles'};

  const oldKey=edgeKey(m,edge.a,edge.b);
  if((m.creases?.get?.(oldKey)||0)>0)return{ok:false,reason:'Creased Edges cannot be rotated'};

  const dir0=directedEdge(face0,edge.a,edge.b),dir1=directedEdge(face1,edge.a,edge.b);
  if(!dir0||!dir1)return{ok:false,reason:'Shared Edge is not present cleanly in both triangles'};
  if(dir0===dir1)return{ok:false,reason:'Triangle winding is inconsistent • Orient Faces first'};

  const p=thirdVertex(face0,edge.a,edge.b),q=thirdVertex(face1,edge.a,edge.b);
  if(!Number.isInteger(p)||!Number.isInteger(q)||p===q)return{ok:false,reason:'Triangles do not form a clean four-vertex patch'};
  if(new Set([edge.a,edge.b,p,q]).size!==4)return{ok:false,reason:'Triangles do not form a clean four-vertex patch'};

  const newKey=edgeKey(m,p,q);
  const existing=edges.find((e,i)=>i!==edgeIndex&&edgeKey(m,e.a,e.b)===newKey);
  if(existing)return{ok:false,reason:'Opposite diagonal already exists'};

  let a=edge.a,b=edge.b;
  if(dir0<0){a=edge.b;b=edge.a;}
  // face0 traverses a -> b; face1 traverses b -> a.
  // Combined boundary loop is b -> p -> a -> q -> b.
  let tri0=[p,a,q],tri1=[p,q,b];
  if(triangleAreaSq(m,tri0)<1e-20||triangleAreaSq(m,tri1)<1e-20)return{ok:false,reason:'Rotated diagonal would create a degenerate triangle'};

  const n0=normalOf(m,face0),n1=normalOf(m,face1),r0=normalOf(m,tri0),r1=normalOf(m,tri1);
  if(!n0||!n1||!r0||!r1)return{ok:false,reason:'Triangle normal is invalid'};
  const patch=n0.clone().add(n1);
  if(patch.lengthSq()>1e-12){
    patch.normalize();
    if(r0.dot(patch)<=1e-6||r1.dot(patch)<=1e-6)return{ok:false,reason:'Rotated diagonal would invert the triangle patch'};
  }

  return{ok:true,edgeIndex,oldKey,newKey,faceIndices:[f0,f1],newFaces:[tri0,tri1]};
}

function apply(){
  const m=mesh(),ids=selectedEdges(),history=globalThis.__boxlabHistory;
  if(!m||ids.length!==1||!history)return false;
  const plan=info(m,ids[0]);
  if(!plan.ok){if(status)status.textContent=`Rotate Edge • ${plan.reason}`;sync();return false;}

  history.push(m.clone());
  m.faces[plan.faceIndices[0]]=[...plan.newFaces[0]];
  m.faces[plan.faceIndices[1]]=[...plan.newFaces[1]];
  m.creases?.delete?.(plan.oldKey);
  m.looseEdges?.delete?.(plan.oldKey);
  const edges=m.edges?.()||[];
  const resultIndex=edges.findIndex(e=>edgeKey(m,e.a,e.b)===plan.newKey);
  bridge()?.set?.('edge',resultIndex>=0?[resultIndex]:[]);
  render();
  if(status)status.textContent='Rotate Edge • diagonal flipped • new Edge selected';
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const m=mesh(),ids=selectedEdges();
  const plan=m&&ids.length===1?info(m,ids[0]):null;
  button.disabled=!plan?.ok||!globalThis.__boxlabHistory;
  button.title=!ids.length
    ?'Select one shared Edge between two triangles'
    :ids.length!==1
      ?'Select exactly one Edge'
      :plan?.ok
        ?'Flip the diagonal shared by these two triangles'
        :(plan?.reason||'Selected Edge cannot be rotated safely');
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.96';
  document.title='BoxLab v0.36.18.96';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabRotateEdge={version:'0.36.18.96',info,apply};
