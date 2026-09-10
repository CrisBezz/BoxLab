// BoxLab v0.36.18.111 — non-destructive Sharp / Smooth Edge selection.
// Classifies regular shared edges by the existing Selection angle threshold.
// Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const threshold=document.querySelector('#angleSelectThreshold');
const thresholdOut=document.querySelector('#angleSelectThresholdOut');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function degreesBetween(a,b){return a.angleTo(b)*180/Math.PI;}
function limit(){return Number(threshold?.value||30);}

const row=document.createElement('div');
row.id='sharpEdgeSelectionRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin-top:4px';

const sharpButton=document.createElement('button');
sharpButton.id='selectSharpEdgesBtn';
sharpButton.type='button';
sharpButton.textContent='Sharp Edges';
sharpButton.disabled=true;
sharpButton.style.cssText='width:100%;min-width:0';

const smoothButton=document.createElement('button');
smoothButton.id='selectSmoothEdgesBtn';
smoothButton.type='button';
smoothButton.textContent='Smooth Edges';
smoothButton.disabled=true;
smoothButton.style.cssText='width:100%;min-width:0';

row.append(sharpButton,smoothButton);

function place(){
  if(row.isConnected)return true;
  const topologyLabel=[...edgeTools?.querySelectorAll?.('.edge-section-label')||[]].find(el=>el.textContent?.trim()==='Topology');
  if(topologyLabel?.parentElement){topologyLabel.insertAdjacentElement('beforebegin',row);return true;}
  if(edgeTools){edgeTools.appendChild(row);return true;}
  return false;
}

function inspect(m){
  if(!m)return{sharp:[],smooth:[],threshold:limit()};
  const cut=limit(),sharp=[],smooth=[];
  const edges=m.edges?.()||[];
  edges.forEach((edge,index)=>{
    const owners=(edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));
    if(owners.length!==2)return;
    const n0=m.faceNormal(owners[0]),n1=m.faceNormal(owners[1]);
    if(!n0||!n1||!Number.isFinite(n0.x)||!Number.isFinite(n1.x))return;
    const angle=degreesBetween(n0,n1);
    if(angle+1e-7>=cut)sharp.push(index);
    else smooth.push(index);
  });
  return{sharp,smooth,threshold:cut};
}

function apply(kind='sharp'){
  const m=mesh();if(!m)return;
  const info=inspect(m),indices=kind==='smooth'?info.smooth:info.sharp;
  const edgeMode=document.querySelector('#selectionModes button[data-mode="edge"]');
  if(edgeMode&&!edgeMode.classList.contains('active'))edgeMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('edge',indices);
    render();
    if(status){
      const label=kind==='smooth'?'Smooth Edges':'Sharp Edges';
      const rule=kind==='smooth'?`< ${info.threshold}°`:`≥ ${info.threshold}°`;
      status.textContent=indices.length
        ?`${label} • ${indices.length} edge${indices.length===1?'':'s'} selected • ${rule}`
        :`${label} • 0 edges at ${rule}`;
    }
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  sharpButton.disabled=!m;
  smoothButton.disabled=!m;
  sharpButton.title=m
    ?`Select shared edges with face angle ≥ ${info.threshold}°${info.sharp.length?` • ${info.sharp.length} found`:''}`
    :'No editable mesh';
  smoothButton.title=m
    ?`Select shared edges with face angle < ${info.threshold}°${info.smooth.length?` • ${info.smooth.length} found`:''}`
    :'No editable mesh';
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.111';
  document.title='BoxLab v0.36.18.111';
}

sharpButton.addEventListener('click',()=>apply('sharp'));
smoothButton.addEventListener('click',()=>apply('smooth'));
threshold?.addEventListener('input',()=>{if(thresholdOut)thresholdOut.textContent=`${threshold.value}°`;queueMicrotask(sync);});
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabSelectSharpEdges={version:'0.36.18.111',inspect,apply};
