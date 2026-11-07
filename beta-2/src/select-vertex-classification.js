// BoxLab v0.36.18.115 — non-destructive Vertex classification selection.
// Boundary vertices touch at least one boundary edge (1 owning face).
// Interior vertices have incident topology and every incident edge has exactly 2 owning faces.
// Non-Manifold vertices touch an edge with >2 owning faces or contain disconnected face fans.
// Loose / wire-only vertices are excluded from Interior. Geometry/history are untouched.

const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const group=document.createElement('div');
group.id='vertexClassificationSelectionGroup';
group.style.cssText='margin:4px 0';

const primaryRow=document.createElement('div');
primaryRow.id='vertexClassificationSelectionRow';
primaryRow.className='outliner-actions';
primaryRow.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 4px';

const manifoldRow=document.createElement('div');
manifoldRow.id='vertexManifoldSelectionRow';
manifoldRow.className='outliner-actions';
manifoldRow.style.cssText='grid-template-columns:1fr;margin:0';

function makeButton(id,label){
  const button=document.createElement('button');
  button.id=id;
  button.type='button';
  button.textContent=label;
  button.disabled=true;
  button.style.cssText='width:100%;min-width:0';
  return button;
}

const boundaryButton=makeButton('selectBoundaryVerticesBtn','Boundary Verts');
const interiorButton=makeButton('selectInteriorVerticesBtn','Interior Verts');
const nonManifoldButton=makeButton('selectNonManifoldVerticesBtn','Non-Manifold Verts');
primaryRow.append(boundaryButton,interiorButton);
manifoldRow.append(nonManifoldButton);
group.append(primaryRow,manifoldRow);

function place(){
  if(group.isConnected)return true;
  if(!vertexTools)return false;
  const firstActions=vertexTools.querySelector('.outliner-actions');
  if(firstActions)firstActions.insertAdjacentElement('afterend',group);
  else vertexTools.appendChild(group);
  return true;
}

function validOwners(m,edge){
  return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));
}

function disconnectedFaceFan(m,vertexIndex,edges){
  const faces=[];
  m.faces.forEach((face,fi)=>{if(Array.isArray(face)&&face.includes(vertexIndex))faces.push(fi);});
  if(faces.length<=1)return false;
  const faceSet=new Set(faces),adj=new Map(faces.map(fi=>[fi,new Set()]));
  edges.forEach(edge=>{
    const owners=validOwners(m,edge).filter(fi=>faceSet.has(fi));
    for(let i=0;i<owners.length;i++)for(let j=i+1;j<owners.length;j++){
      adj.get(owners[i])?.add(owners[j]);
      adj.get(owners[j])?.add(owners[i]);
    }
  });
  const seen=new Set(),stack=[faces[0]];
  while(stack.length){
    const fi=stack.pop();if(seen.has(fi))continue;
    seen.add(fi);
    adj.get(fi)?.forEach(next=>{if(!seen.has(next))stack.push(next);});
  }
  return seen.size!==faces.length;
}

function inspect(m){
  if(!m)return{boundary:[],interior:[],nonManifold:[]};
  const incident=Array.from({length:m.vertices.length},()=>[]);
  (m.edges?.()||[]).forEach(edge=>{
    if(Number.isInteger(edge?.a)&&incident[edge.a])incident[edge.a].push(edge);
    if(Number.isInteger(edge?.b)&&incident[edge.b])incident[edge.b].push(edge);
  });
  const boundary=[],interior=[],nonManifold=[];
  incident.forEach((edges,index)=>{
    if(!edges.length)return;
    const ownerCounts=edges.map(edge=>validOwners(m,edge).length);
    const badEdge=ownerCounts.some(count=>count>2);
    const splitFan=disconnectedFaceFan(m,index,edges);
    if(badEdge||splitFan)nonManifold.push(index);
    if(ownerCounts.some(count=>count===1))boundary.push(index);
    else if(!badEdge&&!splitFan&&ownerCounts.every(count=>count===2))interior.push(index);
  });
  return{boundary,interior,nonManifold};
}

function apply(kind){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const indices=kind==='interior'?info.interior:kind==='nonManifold'?info.nonManifold:info.boundary;
  const vertexMode=document.querySelector('#selectionModes button[data-mode="vertex"]');
  if(vertexMode&&!vertexMode.classList.contains('active'))vertexMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('vertex',indices);
    render();
    if(status){
      const label=kind==='interior'?'Interior Verts':kind==='nonManifold'?'Non-Manifold Verts':'Boundary Verts';
      status.textContent=indices.length
        ?`${label} • ${indices.length} vert${indices.length===1?'':'s'} selected`
        :`${label} • 0 verts`;
    }
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  [boundaryButton,interiorButton,nonManifoldButton].forEach(button=>button.disabled=!m);
  boundaryButton.title=m?`Select vertices touching a boundary edge • ${info.boundary.length} found`:'No editable mesh';
  interiorButton.title=m?`Select vertices whose incident edges form a regular enclosed fan • ${info.interior.length} found`:'No editable mesh';
  nonManifoldButton.title=m?`Select vertices with >2-face edges or disconnected face fans • ${info.nonManifold.length} found`:'No editable mesh';
}

boundaryButton.addEventListener('click',()=>apply('boundary'));
interiorButton.addEventListener('click',()=>apply('interior'));
nonManifoldButton.addEventListener('click',()=>apply('nonManifold'));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectVertexClassification={version:'0.36.18.115',inspect,apply};
