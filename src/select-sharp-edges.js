// BoxLab v0.36.18.110 — non-destructive Sharp Edge selection.
// Selects regular shared edges whose adjacent face normals differ by at least
// the existing Selection angle threshold. Geometry/history are untouched.

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
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='selectSharpEdgesBtn';
button.type='button';
button.textContent='Sharp Edges';
button.disabled=true;
button.style.cssText='width:100%;min-width:0';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const topologyLabel=[...edgeTools?.querySelectorAll?.('.edge-section-label')||[]].find(el=>el.textContent?.trim()==='Topology');
  if(topologyLabel?.parentElement){topologyLabel.insertAdjacentElement('beforebegin',row);return true;}
  if(edgeTools){edgeTools.appendChild(row);return true;}
  return false;
}

function inspect(m){
  if(!m)return{indices:[],count:0,threshold:limit()};
  const cut=limit(),indices=[];
  const edges=m.edges?.()||[];
  edges.forEach((edge,index)=>{
    const owners=(edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));
    if(owners.length!==2)return;
    const n0=m.faceNormal(owners[0]),n1=m.faceNormal(owners[1]);
    if(!n0||!n1||!Number.isFinite(n0.x)||!Number.isFinite(n1.x))return;
    if(degreesBetween(n0,n1)+1e-7>=cut)indices.push(index);
  });
  return{indices,count:indices.length,threshold:cut};
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const edgeMode=document.querySelector('#selectionModes button[data-mode="edge"]');
  if(edgeMode&&!edgeMode.classList.contains('active'))edgeMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('edge',info.indices);
    render();
    if(status)status.textContent=info.count
      ?`Sharp Edges • ${info.count} edge${info.count===1?'':'s'} selected • ≥ ${info.threshold}°`
      :`Sharp Edges • 0 edges at ≥ ${info.threshold}°`;
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  button.disabled=!m;
  button.title=m
    ?`Select shared edges with face angle ≥ ${info.threshold}°${info.count?` • ${info.count} found`:''}`
    :'No editable mesh';
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.110';
  document.title='BoxLab v0.36.18.110';
}

button.addEventListener('click',apply);
threshold?.addEventListener('input',()=>{if(thresholdOut)thresholdOut.textContent=`${threshold.value}°`;queueMicrotask(sync);});
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabSelectSharpEdges={version:'0.36.18.110',inspect,apply};
