// BoxLab v0.36.18.123 — non-destructive Quad / Quad Patch Face selection.
// Selects every valid 4-sided face, plus quads whose shared neighbours are all
// quads. Boundary edges are allowed; non-manifold ownership is excluded.
// Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function validOwners(m,edge){
  return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));
}

const host=document.createElement('div');
host.id='quadFaceSelectionHost';
host.className='outliner-actions';
host.style.cssText='grid-template-columns:1fr;margin:0';

const button=document.createElement('button');
button.id='selectQuadsBtn';
button.type='button';
button.textContent='Quads';
button.disabled=true;
button.style.cssText='width:100%;min-width:0;padding:5px 3px;font-size:9px';
host.appendChild(button);

const patchHost=document.createElement('div');
patchHost.id='quadPatchFaceSelectionHost';
patchHost.className='outliner-actions';
patchHost.style.cssText='grid-template-columns:1fr;margin:4px 0 0';

const patchButton=document.createElement('button');
patchButton.id='selectQuadPatchFacesBtn';
patchButton.type='button';
patchButton.textContent='Quad Patch';
patchButton.disabled=true;
patchButton.style.cssText='width:100%;min-width:0;padding:5px 4px;font-size:10px';
patchHost.appendChild(patchButton);

function place(){
  const row=document.querySelector('#faceInspectionRow');
  if(row){
    row.style.setProperty('grid-template-columns','repeat(5,minmax(0,1fr))');
    if(button.parentElement!==row){
      row.appendChild(button);
      if(host.isConnected&&!host.children.length)host.remove();
    }
    if(patchHost.parentElement!==row.parentElement||patchHost.previousElementSibling!==row){
      row.insertAdjacentElement('afterend',patchHost);
    }
    return true;
  }
  if(host.isConnected)return true;
  const nonQuads=document.querySelector('#selectNonQuadsBtn');
  const anchor=nonQuads?.parentElement;
  if(anchor?.parentElement){
    anchor.insertAdjacentElement('afterend',host);
    host.insertAdjacentElement('afterend',patchHost);
    return true;
  }
  if(faceTools){faceTools.append(host,patchHost);return true;}
  return false;
}

function isQuadPatchFace(m,faceIndex,face,edgeMap){
  if(!Array.isArray(face)||face.length!==4)return false;
  for(let i=0;i<face.length;i++){
    const a=face[i],b=face[(i+1)%face.length];
    const edge=edgeMap.get(edgeKey(a,b));
    if(!edge)return false;
    const owners=validOwners(m,edge);
    if(!owners.includes(faceIndex)||owners.length<1||owners.length>2)return false;
    if(owners.length===2){
      const other=owners[0]===faceIndex?owners[1]:owners[0];
      if(!Array.isArray(m.faces[other])||m.faces[other].length!==4)return false;
    }
  }
  return true;
}

function inspect(m){
  if(!m)return{indices:[],patch:[],total:0,patchTotal:0,faces:0};
  const indices=[],patch=[];
  const edgeMap=new Map();
  (m.edges?.()||[]).forEach(edge=>{
    if(Number.isInteger(edge?.a)&&Number.isInteger(edge?.b))edgeMap.set(edgeKey(edge.a,edge.b),edge);
  });
  m.faces.forEach((face,index)=>{
    if(!Array.isArray(face)||face.length!==4)return;
    indices.push(index);
    if(isQuadPatchFace(m,index,face,edgeMap))patch.push(index);
  });
  return{indices,patch,total:indices.length,patchTotal:patch.length,faces:m.faces.length};
}

function setSelection(indices,label,zeroText){
  const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');
  if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('face',indices);
    render();
    if(status)status.textContent=indices.length
      ?`${label} • ${indices.length} face${indices.length===1?'':'s'} selected`
      :zeroText;
  });
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  setSelection(info.indices,`Quads • ${info.faces} total faces`,'Quad check • 0 quad faces');
}

function applyPatch(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  setSelection(info.patch,'Quad Patch • all shared neighbours are quads','Quad Patch • 0 faces');
}

function sync(){
  place();
  const m=mesh();
  button.disabled=!m;
  patchButton.disabled=!m;
  if(!m){button.title='No editable mesh';patchButton.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.total
    ?`Select ${info.total} quad face${info.total===1?'':'s'}`
    :'No quad faces';
  patchButton.title=info.patchTotal
    ?`Select ${info.patchTotal} quad patch face${info.patchTotal===1?'':'s'} • boundary allowed, shared neighbours all quads`
    :'No quad patch faces';
}

button.addEventListener('click',apply);
patchButton.addEventListener('click',applyPatch);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700,1000].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectQuads={version:'0.36.18.123',inspect,apply,applyPatch,sync};
