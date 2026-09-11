// BoxLab v0.36.18.118 — non-destructive Quad Face selection.
// Selects every valid 4-sided face for SubD/topology inspection only.
// Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

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

function place(){
  const row=document.querySelector('#faceInspectionRow');
  if(row){
    row.style.setProperty('grid-template-columns','repeat(5,minmax(0,1fr))');
    if(button.parentElement!==row){
      row.appendChild(button);
      if(host.isConnected&&!host.children.length)host.remove();
    }
    return true;
  }
  if(host.isConnected)return true;
  const nonQuads=document.querySelector('#selectNonQuadsBtn');
  const anchor=nonQuads?.parentElement;
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',host);return true;}
  if(faceTools){faceTools.appendChild(host);return true;}
  return false;
}

function inspect(m){
  if(!m)return{indices:[],total:0,faces:0};
  const indices=[];
  m.faces.forEach((face,index)=>{
    if(Array.isArray(face)&&face.length===4)indices.push(index);
  });
  return{indices,total:indices.length,faces:m.faces.length};
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');
  if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('face',info.indices);
    render();
    if(status)status.textContent=info.total
      ?`Quads • ${info.total} face${info.total===1?'':'s'} selected • ${info.faces} total faces`
      :'Quad check • 0 quad faces';
  });
}

function sync(){
  place();
  const m=mesh();
  button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.total
    ?`Select ${info.total} quad face${info.total===1?'':'s'}`
    :'No quad faces';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700,1000].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectQuads={version:'0.36.18.118',inspect,apply,sync};
