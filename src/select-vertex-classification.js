// BoxLab v0.36.18.114 — non-destructive Vertex classification selection.
// Boundary vertices touch at least one boundary edge (1 owning face).
// Interior vertices have incident topology and every incident edge has exactly 2 owning faces.
// Loose / wire-only vertices are excluded from Interior. Geometry/history are untouched.

const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const row=document.createElement('div');
row.id='vertexClassificationSelectionRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin:4px 0';

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
row.append(boundaryButton,interiorButton);

function place(){
  if(row.isConnected)return true;
  if(!vertexTools)return false;
  const firstActions=vertexTools.querySelector('.outliner-actions');
  if(firstActions)firstActions.insertAdjacentElement('afterend',row);
  else vertexTools.appendChild(row);
  return true;
}

function validOwners(m,edge){
  return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));
}

function inspect(m){
  if(!m)return{boundary:[],interior:[]};
  const incident=Array.from({length:m.vertices.length},()=>[]);
  (m.edges?.()||[]).forEach(edge=>{
    if(Number.isInteger(edge?.a)&&incident[edge.a])incident[edge.a].push(edge);
    if(Number.isInteger(edge?.b)&&incident[edge.b])incident[edge.b].push(edge);
  });
  const boundary=[],interior=[];
  incident.forEach((edges,index)=>{
    if(!edges.length)return;
    const ownerCounts=edges.map(edge=>validOwners(m,edge).length);
    if(ownerCounts.some(count=>count===1))boundary.push(index);
    else if(ownerCounts.every(count=>count===2))interior.push(index);
  });
  return{boundary,interior};
}

function apply(kind){
  const m=mesh();if(!m)return;
  const info=inspect(m),indices=kind==='interior'?info.interior:info.boundary;
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
      const label=kind==='interior'?'Interior Verts':'Boundary Verts';
      status.textContent=indices.length
        ?`${label} • ${indices.length} vert${indices.length===1?'':'s'} selected`
        :`${label} • 0 verts`;
    }
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  boundaryButton.disabled=!m;
  interiorButton.disabled=!m;
  boundaryButton.title=m?`Select vertices touching a boundary edge • ${info.boundary.length} found`:'No editable mesh';
  interiorButton.title=m?`Select vertices whose incident edges all have 2 adjacent faces • ${info.interior.length} found`:'No editable mesh';
}

boundaryButton.addEventListener('click',()=>apply('boundary'));
interiorButton.addEventListener('click',()=>apply('interior'));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectVertexClassification={version:'0.36.18.114',inspect,apply};
