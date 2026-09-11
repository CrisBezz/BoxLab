// BoxLab v0.36.18.127 — non-destructive Quad / topology-transition Face selection.
// Selects every valid 4-sided face, quads whose shared neighbours are all quads,
// quads that sit directly beside at least one non-quad neighbour, and isolated
// non-quad faces whose shared neighbours are all quads.
// Boundary edges are allowed; missing/non-manifold ownership is excluded from
// Patch/Transition/Isolated classification. Geometry/history are untouched.

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
patchHost.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin:4px 0 0';

const isolatedHost=document.createElement('div');
isolatedHost.id='isolatedNonQuadFaceSelectionHost';
isolatedHost.className='outliner-actions';
isolatedHost.style.cssText='grid-template-columns:1fr;margin:4px 0 0';

function makePatchButton(id,label){
  const button=document.createElement('button');
  button.id=id;
  button.type='button';
  button.textContent=label;
  button.disabled=true;
  button.style.cssText='width:100%;min-width:0;padding:5px 4px;font-size:10px';
  return button;
}

const patchButton=makePatchButton('selectQuadPatchFacesBtn','Quad Patch');
const transitionButton=makePatchButton('selectQuadTransitionFacesBtn','Quad Transition');
const isolatedNonQuadButton=makePatchButton('selectIsolatedNonQuadFacesBtn','Isolated Non-Quad');
patchHost.append(patchButton,transitionButton);
isolatedHost.append(isolatedNonQuadButton);

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
    if(isolatedHost.parentElement!==row.parentElement||isolatedHost.previousElementSibling!==patchHost){
      patchHost.insertAdjacentElement('afterend',isolatedHost);
    }
    return true;
  }
  if(host.isConnected)return true;
  const nonQuads=document.querySelector('#selectNonQuadsBtn');
  const anchor=nonQuads?.parentElement;
  if(anchor?.parentElement){
    anchor.insertAdjacentElement('afterend',host);
    host.insertAdjacentElement('afterend',patchHost);
    patchHost.insertAdjacentElement('afterend',isolatedHost);
    return true;
  }
  if(faceTools){faceTools.append(host,patchHost,isolatedHost);return true;}
  return false;
}

function classifyQuadFace(m,faceIndex,face,edgeMap){
  if(!Array.isArray(face)||face.length!==4)return{valid:false,patch:false,transition:false};
  let touchesNonQuad=false;
  for(let i=0;i<face.length;i++){
    const a=face[i],b=face[(i+1)%face.length];
    const edge=edgeMap.get(edgeKey(a,b));
    if(!edge)return{valid:false,patch:false,transition:false};
    const owners=validOwners(m,edge);
    if(!owners.includes(faceIndex)||owners.length<1||owners.length>2)return{valid:false,patch:false,transition:false};
    if(owners.length===2){
      const other=owners[0]===faceIndex?owners[1]:owners[0];
      if(!Array.isArray(m.faces[other])||m.faces[other].length!==4)touchesNonQuad=true;
    }
  }
  return{valid:true,patch:!touchesNonQuad,transition:touchesNonQuad};
}

function isIsolatedNonQuadFace(m,faceIndex,face,edgeMap){
  if(!Array.isArray(face)||face.length===4||face.length<3)return false;
  let sharedNeighbourCount=0;
  for(let i=0;i<face.length;i++){
    const a=face[i],b=face[(i+1)%face.length];
    const edge=edgeMap.get(edgeKey(a,b));
    if(!edge)return false;
    const owners=validOwners(m,edge);
    if(!owners.includes(faceIndex)||owners.length<1||owners.length>2)return false;
    if(owners.length===2){
      sharedNeighbourCount++;
      const other=owners[0]===faceIndex?owners[1]:owners[0];
      if(!Array.isArray(m.faces[other])||m.faces[other].length!==4)return false;
    }
  }
  return sharedNeighbourCount>0;
}

function inspect(m){
  if(!m)return{indices:[],patch:[],transition:[],isolatedNonQuad:[],total:0,patchTotal:0,transitionTotal:0,isolatedNonQuadTotal:0,faces:0};
  const indices=[],patch=[],transition=[],isolatedNonQuad=[];
  const edgeMap=new Map();
  (m.edges?.()||[]).forEach(edge=>{
    if(Number.isInteger(edge?.a)&&Number.isInteger(edge?.b))edgeMap.set(edgeKey(edge.a,edge.b),edge);
  });
  m.faces.forEach((face,index)=>{
    if(!Array.isArray(face))return;
    if(face.length===4){
      indices.push(index);
      const classified=classifyQuadFace(m,index,face,edgeMap);
      if(classified.patch)patch.push(index);
      else if(classified.transition)transition.push(index);
      return;
    }
    if(isIsolatedNonQuadFace(m,index,face,edgeMap))isolatedNonQuad.push(index);
  });
  return{
    indices,patch,transition,isolatedNonQuad,
    total:indices.length,
    patchTotal:patch.length,
    transitionTotal:transition.length,
    isolatedNonQuadTotal:isolatedNonQuad.length,
    faces:m.faces.length
  };
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

function applyTransition(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  setSelection(info.transition,'Quad Transition • touches a non-quad neighbour','Quad Transition • 0 faces');
}

function applyIsolatedNonQuad(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  setSelection(info.isolatedNonQuad,'Isolated Non-Quad • shared neighbours are all quads','Isolated Non-Quad • 0 faces');
}

function sync(){
  place();
  const m=mesh();
  button.disabled=!m;
  patchButton.disabled=!m;
  transitionButton.disabled=!m;
  isolatedNonQuadButton.disabled=!m;
  if(!m){
    button.title='No editable mesh';
    patchButton.title='No editable mesh';
    transitionButton.title='No editable mesh';
    isolatedNonQuadButton.title='No editable mesh';
    return;
  }
  const info=inspect(m);
  button.title=info.total
    ?`Select ${info.total} quad face${info.total===1?'':'s'}`
    :'No quad faces';
  patchButton.title=info.patchTotal
    ?`Select ${info.patchTotal} quad patch face${info.patchTotal===1?'':'s'} • boundary allowed, shared neighbours all quads`
    :'No quad patch faces';
  transitionButton.title=info.transitionTotal
    ?`Select ${info.transitionTotal} quad transition face${info.transitionTotal===1?'':'s'} • touches at least 1 non-quad neighbour`
    :'No quad transition faces';
  isolatedNonQuadButton.title=info.isolatedNonQuadTotal
    ?`Select ${info.isolatedNonQuadTotal} isolated non-quad face${info.isolatedNonQuadTotal===1?'':'s'} • every shared neighbour is a quad`
    :'No isolated non-quad faces';
}

button.addEventListener('click',apply);
patchButton.addEventListener('click',applyPatch);
transitionButton.addEventListener('click',applyTransition);
isolatedNonQuadButton.addEventListener('click',applyIsolatedNonQuad);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700,1000].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectQuads={version:'0.36.18.127',inspect,apply,applyPatch,applyTransition,applyIsolatedNonQuad,sync};
