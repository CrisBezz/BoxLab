// BoxLab v0.36.18.116 — non-destructive Vertex valence selection.
// Selects vertices by incident-edge count for topology/SubD inspection only.
// Geometry/history are untouched.

const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const row=document.createElement('div');
row.id='vertexValenceSelectionRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:repeat(3,minmax(0,1fr));margin:0 0 4px';

function makeButton(id,label){
  const button=document.createElement('button');
  button.id=id;
  button.type='button';
  button.textContent=label;
  button.disabled=true;
  button.style.cssText='width:100%;min-width:0;font-size:10px;padding:5px 3px';
  return button;
}

const valence3Button=makeButton('selectValence3VerticesBtn','3-Valence');
const valence4Button=makeButton('selectValence4VerticesBtn','4-Valence');
const valence5Button=makeButton('selectValence5PlusVerticesBtn','5+ Valence');
row.append(valence3Button,valence4Button,valence5Button);

function place(){
  if(row.isConnected)return true;
  if(!vertexTools)return false;
  const classification=document.querySelector('#vertexClassificationSelectionGroup');
  if(classification?.parentElement===vertexTools)classification.insertAdjacentElement('afterend',row);
  else vertexTools.appendChild(row);
  return true;
}

function inspect(m){
  if(!m)return{v3:[],v4:[],v5plus:[]};
  const counts=Array(m.vertices.length).fill(0);
  (m.edges?.()||[]).forEach(edge=>{
    if(Number.isInteger(edge?.a)&&edge.a>=0&&edge.a<counts.length)counts[edge.a]++;
    if(Number.isInteger(edge?.b)&&edge.b>=0&&edge.b<counts.length)counts[edge.b]++;
  });
  const v3=[],v4=[],v5plus=[];
  counts.forEach((count,index)=>{
    if(count===3)v3.push(index);
    else if(count===4)v4.push(index);
    else if(count>=5)v5plus.push(index);
  });
  return{v3,v4,v5plus};
}

function apply(kind){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const indices=kind==='v4'?info.v4:kind==='v5plus'?info.v5plus:info.v3;
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
      const label=kind==='v4'?'4-Valence':kind==='v5plus'?'5+ Valence':'3-Valence';
      status.textContent=indices.length
        ?`${label} • ${indices.length} vert${indices.length===1?'':'s'} selected`
        :`${label} • 0 verts`;
    }
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  [valence3Button,valence4Button,valence5Button].forEach(button=>button.disabled=!m);
  valence3Button.title=m?`Select vertices with exactly 3 incident edges • ${info.v3.length} found`:'No editable mesh';
  valence4Button.title=m?`Select vertices with exactly 4 incident edges • ${info.v4.length} found`:'No editable mesh';
  valence5Button.title=m?`Select vertices with 5 or more incident edges • ${info.v5plus.length} found`:'No editable mesh';
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.116';
  document.title='BoxLab v0.36.18.116';
}

valence3Button.addEventListener('click',()=>apply('v3'));
valence4Button.addEventListener('click',()=>apply('v4'));
valence5Button.addEventListener('click',()=>apply('v5plus'));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabSelectVertexValence={version:'0.36.18.116',inspect,apply};
