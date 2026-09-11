// BoxLab v0.36.18.122 — non-destructive Edge classification selection.
// Classifies shared edges by face angle, all editable edges by stored crease
// weight, manifold interior edges by face ownership, and quad-flow quality.
// Geometry/history/crease data are untouched.

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

const group=document.createElement('div');
group.id='edgeClassificationSelectionGroup';
group.style.cssText='margin-top:4px';

const angleRow=document.createElement('div');
angleRow.id='sharpEdgeSelectionRow';
angleRow.className='outliner-actions';
angleRow.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 4px';

const creaseRow=document.createElement('div');
creaseRow.id='creaseEdgeSelectionRow';
creaseRow.className='outliner-actions';
creaseRow.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 4px';

const topologyRow=document.createElement('div');
topologyRow.id='interiorEdgeSelectionRow';
topologyRow.className='outliner-actions';
topologyRow.style.cssText='grid-template-columns:repeat(3,minmax(0,1fr));margin:0';

function makeButton(id,label){
  const button=document.createElement('button');
  button.id=id;
  button.type='button';
  button.textContent=label;
  button.disabled=true;
  button.style.cssText='width:100%;min-width:0;font-size:10px;padding:5px 3px';
  return button;
}

const sharpButton=makeButton('selectSharpEdgesBtn','Sharp Edges');
const smoothButton=makeButton('selectSmoothEdgesBtn','Smooth Edges');
const creasedButton=makeButton('selectCreasedEdgesBtn','Creased');
const uncreasedButton=makeButton('selectUncreasedEdgesBtn','Uncreased');
const interiorButton=makeButton('selectInteriorEdgesBtn','Interior');
const quadFlowButton=makeButton('selectQuadFlowEdgesBtn','Quad Flow');
const nonQuadAdjacentButton=makeButton('selectNonQuadAdjacentEdgesBtn','Non-Quad Adj');

angleRow.append(sharpButton,smoothButton);
creaseRow.append(creasedButton,uncreasedButton);
topologyRow.append(interiorButton,quadFlowButton,nonQuadAdjacentButton);
group.append(angleRow,creaseRow,topologyRow);

function place(){
  if(group.isConnected)return true;
  const topologyLabel=[...edgeTools?.querySelectorAll?.('.edge-section-label')||[]].find(el=>el.textContent?.trim()==='Topology');
  if(topologyLabel?.parentElement){topologyLabel.insertAdjacentElement('beforebegin',group);return true;}
  if(edgeTools){edgeTools.appendChild(group);return true;}
  return false;
}

function inspect(m){
  if(!m)return{sharp:[],smooth:[],creased:[],uncreased:[],interior:[],quadFlow:[],nonQuadAdjacent:[],threshold:limit()};
  const cut=limit(),sharp=[],smooth=[],creased=[],uncreased=[],interior=[],quadFlow=[],nonQuadAdjacent=[];
  const edges=m.edges?.()||[];
  edges.forEach((edge,index)=>{
    const crease=Number(m.edgeCrease?.(index)||0);
    if(crease>.001)creased.push(index);else uncreased.push(index);

    const owners=(edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));
    if(owners.length===2){
      interior.push(index);
      const bothQuads=owners.every(fi=>m.faces[fi].length===4);
      if(bothQuads)quadFlow.push(index);else nonQuadAdjacent.push(index);
    }
    if(owners.length!==2)return;

    const n0=m.faceNormal(owners[0]),n1=m.faceNormal(owners[1]);
    if(!n0||!n1||!Number.isFinite(n0.x)||!Number.isFinite(n1.x))return;
    const angle=degreesBetween(n0,n1);
    if(angle+1e-7>=cut)sharp.push(index);
    else smooth.push(index);
  });
  return{sharp,smooth,creased,uncreased,interior,quadFlow,nonQuadAdjacent,threshold:cut};
}

function selectionFor(info,kind){
  if(kind==='smooth')return info.smooth;
  if(kind==='creased')return info.creased;
  if(kind==='uncreased')return info.uncreased;
  if(kind==='interior')return info.interior;
  if(kind==='quadFlow')return info.quadFlow;
  if(kind==='nonQuadAdjacent')return info.nonQuadAdjacent;
  return info.sharp;
}

function labelFor(kind){
  if(kind==='smooth')return'Smooth Edges';
  if(kind==='creased')return'Creased';
  if(kind==='uncreased')return'Uncreased';
  if(kind==='interior')return'Interior Edges';
  if(kind==='quadFlow')return'Quad Flow';
  if(kind==='nonQuadAdjacent')return'Non-Quad Adjacent';
  return'Sharp Edges';
}

function ruleFor(info,kind){
  if(kind==='smooth')return`< ${info.threshold}°`;
  if(kind==='sharp')return`≥ ${info.threshold}°`;
  if(kind==='creased')return'crease > 0';
  if(kind==='uncreased')return'crease = 0';
  if(kind==='quadFlow')return'2 adjacent quad faces';
  if(kind==='nonQuadAdjacent')return'at least 1 adjacent non-quad';
  return'2 adjacent faces';
}

function apply(kind='sharp'){
  const m=mesh();if(!m)return;
  const info=inspect(m),indices=selectionFor(info,kind);
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
      const label=labelFor(kind),rule=ruleFor(info,kind);
      status.textContent=indices.length
        ?`${label} • ${indices.length} edge${indices.length===1?'':'s'} selected • ${rule}`
        :`${label} • 0 edges • ${rule}`;
    }
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  [sharpButton,smoothButton,creasedButton,uncreasedButton,interiorButton,quadFlowButton,nonQuadAdjacentButton].forEach(button=>button.disabled=!m);
  sharpButton.title=m?`Select shared edges with face angle ≥ ${info.threshold}°${info.sharp.length?` • ${info.sharp.length} found`:''}`:'No editable mesh';
  smoothButton.title=m?`Select shared edges with face angle < ${info.threshold}°${info.smooth.length?` • ${info.smooth.length} found`:''}`:'No editable mesh';
  creasedButton.title=m?`Select edges with stored crease weight > 0${info.creased.length?` • ${info.creased.length} found`:''}`:'No editable mesh';
  uncreasedButton.title=m?`Select edges with no crease weight${info.uncreased.length?` • ${info.uncreased.length} found`:''}`:'No editable mesh';
  interiorButton.title=m?`Select manifold interior edges with exactly 2 adjacent faces${info.interior.length?` • ${info.interior.length} found`:''}`:'No editable mesh';
  quadFlowButton.title=m?`Select manifold interior edges shared by 2 quad faces${info.quadFlow.length?` • ${info.quadFlow.length} found`:''}`:'No editable mesh';
  nonQuadAdjacentButton.title=m?`Select manifold interior edges touching at least 1 non-quad face${info.nonQuadAdjacent.length?` • ${info.nonQuadAdjacent.length} found`:''}`:'No editable mesh';
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.122';
  document.title='BoxLab v0.36.18.122';
}

sharpButton.addEventListener('click',()=>apply('sharp'));
smoothButton.addEventListener('click',()=>apply('smooth'));
creasedButton.addEventListener('click',()=>apply('creased'));
uncreasedButton.addEventListener('click',()=>apply('uncreased'));
interiorButton.addEventListener('click',()=>apply('interior'));
quadFlowButton.addEventListener('click',()=>apply('quadFlow'));
nonQuadAdjacentButton.addEventListener('click',()=>apply('nonQuadAdjacent'));
threshold?.addEventListener('input',()=>{if(thresholdOut)thresholdOut.textContent=`${threshold.value}°`;queueMicrotask(sync);});
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabSelectSharpEdges={version:'0.36.18.122',inspect,apply};
