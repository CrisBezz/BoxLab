// BoxLab v0.36.18.118 — non-destructive Vertex valence / pole selection.
// Selects vertices by incident-edge count and interior manifold extraordinary
// vertices (SubD poles: valence != 4). Geometry/history are untouched.

const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const group=document.createElement('div');
group.id='vertexValenceSelectionGroup';
group.style.cssText='margin:0 0 4px';

const row=document.createElement('div');
row.id='vertexValenceSelectionRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:repeat(3,minmax(0,1fr));margin:0 0 4px';

const poleRow=document.createElement('div');
poleRow.id='vertexPoleSelectionRow';
poleRow.className='outliner-actions';
poleRow.style.cssText='grid-template-columns:1fr;margin:0';

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
const poleButton=makeButton('selectSubdPoleVerticesBtn','SubD Poles');
row.append(valence3Button,valence4Button,valence5Button);
poleRow.append(poleButton);
group.append(row,poleRow);

function place(){
  if(group.isConnected)return true;
  if(!vertexTools)return false;
  const classification=document.querySelector('#vertexClassificationSelectionGroup');
  if(classification?.parentElement===vertexTools)classification.insertAdjacentElement('afterend',group);
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
  if(!m)return{v3:[],v4:[],v5plus:[],poles:[]};
  const incident=Array.from({length:m.vertices.length},()=>[]);
  (m.edges?.()||[]).forEach(edge=>{
    if(Number.isInteger(edge?.a)&&edge.a>=0&&edge.a<incident.length)incident[edge.a].push(edge);
    if(Number.isInteger(edge?.b)&&edge.b>=0&&edge.b<incident.length)incident[edge.b].push(edge);
  });
  const v3=[],v4=[],v5plus=[],poles=[];
  incident.forEach((edges,index)=>{
    const count=edges.length;
    if(count===3)v3.push(index);
    else if(count===4)v4.push(index);
    else if(count>=5)v5plus.push(index);
    if(!count||count===4)return;
    const enclosed=edges.every(edge=>validOwners(m,edge).length===2);
    if(enclosed&&!disconnectedFaceFan(m,index,edges))poles.push(index);
  });
  return{v3,v4,v5plus,poles};
}

function apply(kind){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const indices=kind==='v4'?info.v4:kind==='v5plus'?info.v5plus:kind==='poles'?info.poles:info.v3;
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
      const label=kind==='v4'?'4-Valence':kind==='v5plus'?'5+ Valence':kind==='poles'?'SubD Poles':'3-Valence';
      status.textContent=indices.length
        ?`${label} • ${indices.length} vert${indices.length===1?'':'s'} selected`
        :`${label} • 0 verts`;
    }
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  [valence3Button,valence4Button,valence5Button,poleButton].forEach(button=>button.disabled=!m);
  valence3Button.title=m?`Select vertices with exactly 3 incident edges • ${info.v3.length} found`:'No editable mesh';
  valence4Button.title=m?`Select vertices with exactly 4 incident edges • ${info.v4.length} found`:'No editable mesh';
  valence5Button.title=m?`Select vertices with 5 or more incident edges • ${info.v5plus.length} found`:'No editable mesh';
  poleButton.title=m?`Select interior manifold SubD poles (valence != 4) • ${info.poles.length} found`:'No editable mesh';
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.118';
  document.title='BoxLab v0.36.18.118';
}

valence3Button.addEventListener('click',()=>apply('v3'));
valence4Button.addEventListener('click',()=>apply('v4'));
valence5Button.addEventListener('click',()=>apply('v5plus'));
poleButton.addEventListener('click',()=>apply('poles'));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabSelectVertexValence={version:'0.36.18.118',inspect,apply};
