// BoxLab v0.36.18.47 — non-destructive Face topology inspection.
// Selects every face that is not a quad. Geometry/history untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const host=document.createElement('div');
host.className='outliner-actions';
host.style.gridTemplateColumns='1fr';
const button=document.createElement('button');
button.id='selectNonQuadsBtn';button.type='button';button.textContent='Select Non-Quads';
host.appendChild(button);
const ngonButton=document.querySelector('#selectNgonsBtn');
const triangleButton=document.querySelector('#selectTrianglesBtn');
const anchor=(triangleButton||ngonButton)?.parentElement;
if(anchor?.parentElement)anchor.parentElement.insertBefore(host,anchor.nextSibling);else faceTools?.appendChild(host);

function inspect(m){
  if(!m)return{indices:[],triangles:0,ngons:0,other:0,total:0};
  const indices=[];let triangles=0,ngons=0,other=0;
  m.faces.forEach((face,index)=>{
    if(!Array.isArray(face)||face.length===4)return;
    indices.push(index);
    if(face.length===3)triangles++;
    else if(face.length>=5)ngons++;
    else other++;
  });
  return{indices,triangles,ngons,other,total:indices.length};
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
      ?`Non-Quads • ${info.total} face${info.total===1?'':'s'} selected • ${info.triangles} triangles • ${info.ngons} ngons${info.other?` • ${info.other} other`:''}`
      :'Topology check • all faces are quads';
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.total?`Select ${info.total} non-quad face${info.total===1?'':'s'}`:'All faces are quads';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectNonQuads={version:'0.36.18.47',inspect,apply};
