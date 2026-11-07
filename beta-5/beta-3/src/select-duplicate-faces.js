// BoxLab v0.36.18.59 — non-destructive duplicate Face inspection.
// Selects every face belonging to a duplicate vertex-set group, regardless of
// winding or starting vertex. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='selectDuplicateFacesBtn';
button.type='button';
button.textContent='Duplicates';
button.style.width='100%';
button.style.minWidth='0';
button.style.fontSize='9px';
button.style.padding='5px 4px';

function place(){
  const existing=document.querySelector('#degenerateFaceInspectionRow');
  if(existing){
    existing.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
    if(button.parentElement!==existing)existing.appendChild(button);
    const degenerate=document.querySelector('#selectDegenerateFacesBtn');
    if(degenerate){degenerate.style.minWidth='0';degenerate.style.padding='5px 4px';}
    return true;
  }
  return false;
}

function canonicalFaceKey(face){
  if(!Array.isArray(face)||face.length<3)return null;
  const clean=face.filter(Number.isInteger);
  if(clean.length!==face.length)return null;
  return clean.slice().sort((a,b)=>a-b).join(',');
}

function inspect(m){
  if(!m)return{indices:[],count:0,groups:0};
  const groups=new Map();
  (m.faces||[]).forEach((face,index)=>{
    const key=canonicalFaceKey(face);
    if(key===null)return;
    const list=groups.get(key)||[];
    list.push(index);
    groups.set(key,list);
  });
  const indices=[];
  let duplicateGroups=0;
  for(const list of groups.values()){
    if(list.length<2)continue;
    duplicateGroups++;
    indices.push(...list);
  }
  indices.sort((a,b)=>a-b);
  return{indices,count:indices.length,groups:duplicateGroups};
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
    if(status)status.textContent=info.count
      ?`Duplicate Faces • ${info.count} faces selected • ${info.groups} duplicate group${info.groups===1?'':'s'}`
      :'Topology check • 0 duplicate faces';
  });
}

function sync(){
  place();
  const m=mesh();
  button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} faces in ${info.groups} duplicate group${info.groups===1?'':'s'}`
    :'No duplicate faces found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

// Fallback only if the 18.58 row never appears; normally the button is placed
// beside Degenerate in that existing compact row.
setTimeout(()=>{
  if(button.isConnected)return;
  const host=document.createElement('div');
  host.className='outliner-actions';
  host.style.cssText='grid-template-columns:1fr;margin-top:4px';
  host.appendChild(button);
  const row=document.querySelector('#faceInspectionRow');
  if(row?.parentElement)row.insertAdjacentElement('afterend',host);else faceTools?.appendChild(host);
},900);

globalThis.__boxlabSelectDuplicateFaces={version:'0.36.18.59',inspect,apply,canonicalFaceKey};
