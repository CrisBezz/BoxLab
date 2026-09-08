// BoxLab v0.36.18.44 — non-destructive topology inspection.
// Selects every edge that is not used by exactly two real faces: open boundary,
// loose/wire, and over-used (>2 face) edges. Geometry and history are untouched.

const status=document.querySelector('#selectionStatus');
const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const deleteEdgeButton=document.querySelector('#deleteEdgeBtn');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function realFaces(m,edge){return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}

const host=document.createElement('div');
host.className='outliner-actions';
host.style.gridTemplateColumns='1fr';
const button=document.createElement('button');
button.id='selectNonManifoldBtn';button.type='button';button.textContent='Select Non-Manifold';
host.appendChild(button);
const topologyRow=deleteEdgeButton?.parentElement;
if(topologyRow?.parentElement)topologyRow.parentElement.insertBefore(host,topologyRow.nextSibling);else edgeTools?.appendChild(host);

function inspect(m){
  if(!m)return{indices:[],boundary:0,loose:0,multi:0};
  const indices=[];let boundary=0,loose=0,multi=0;
  const edges=m.edges();
  edges.forEach((edge,index)=>{
    const count=realFaces(m,edge).length;
    const isLoose=!!edge?.loose||count===0;
    const isBoundary=!isLoose&&count===1;
    const isMulti=count>2;
    if(isLoose||isBoundary||isMulti){
      indices.push(index);
      if(isLoose)loose++;else if(isBoundary)boundary++;else if(isMulti)multi++;
    }
  });
  return{indices,boundary,loose,multi,total:indices.length};
}

function apply(){
  const m=mesh(),info=inspect(m);if(!m)return;
  const edgeMode=document.querySelector('#selectionModes button[data-mode="edge"]');
  if(edgeMode&&!edgeMode.classList.contains('active'))edgeMode.click();
  queueMicrotask(()=>{
    if(multiToggle){const wanted=info.indices.length>1;if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}}
    bridge()?.set?.('edge',info.indices);
    render();
    if(status){
      status.textContent=info.total
        ?`Non-Manifold • ${info.total} edge${info.total===1?'':'s'} selected • ${info.boundary} boundary • ${info.loose} loose • ${info.multi} over-used`
        :'Topology check • manifold closed mesh • 0 problem edges';
    }
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.total
    ?`Select ${info.total} non-manifold/open edge${info.total===1?'':'s'}`
    :'No non-manifold or open edges found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectNonManifold={version:'0.36.18.44',inspect,apply};
