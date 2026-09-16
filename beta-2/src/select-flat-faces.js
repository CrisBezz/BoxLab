// BoxLab v0.36.18.68 — non-destructive flat/coplanar Face inspection.
// Selects faces whose vertices all lie on one plane within a small scale-relative
// tolerance. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='selectFlatFacesBtn';
button.type='button';
button.textContent='Flat';
button.style.width='100%';
button.style.minWidth='0';
button.style.fontSize='9px';
button.style.padding='5px 3px';

function place(){
  const existing=document.querySelector('#degenerateFaceInspectionRow');
  if(existing){
    existing.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
    if(button.parentElement!==existing)existing.appendChild(button);
    for(const b of existing.querySelectorAll('button')){
      b.style.minWidth='0';
      b.style.padding='5px 3px';
      b.style.fontSize='9px';
    }
    return true;
  }
  return false;
}

function length3(v){return Math.hypot(v.x||0,v.y||0,v.z||0);}
function sub(a,b){return{x:a.x-b.x,y:a.y-b.y,z:a.z-b.z};}
function cross(a,b){return{x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x};}
function dot(a,b){return a.x*b.x+a.y*b.y+a.z*b.z;}

function flatInfo(m,face){
  if(!Array.isArray(face)||face.length<3)return{flat:false,maxDeviation:Infinity,tolerance:0};
  const pts=face.map(index=>m.vertices?.[index]);
  if(pts.some(point=>!point))return{flat:false,maxDeviation:Infinity,tolerance:0};

  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(const p of pts){
    minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);minZ=Math.min(minZ,p.z);
    maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);maxZ=Math.max(maxZ,p.z);
  }
  const diagonal=Math.hypot(maxX-minX,maxY-minY,maxZ-minZ)||1;
  const tolerance=Math.max(1e-7,diagonal*1e-5);

  let origin=null,normal=null;
  outer:for(let i=0;i<pts.length-2;i++){
    for(let j=i+1;j<pts.length-1;j++){
      for(let k=j+1;k<pts.length;k++){
        const n=cross(sub(pts[j],pts[i]),sub(pts[k],pts[i]));
        const len=length3(n);
        if(len>Math.max(1e-12,diagonal*diagonal*1e-10)){
          origin=pts[i];normal={x:n.x/len,y:n.y/len,z:n.z/len};
          break outer;
        }
      }
    }
  }
  if(!origin||!normal)return{flat:false,maxDeviation:Infinity,tolerance};

  let maxDeviation=0;
  for(const p of pts)maxDeviation=Math.max(maxDeviation,Math.abs(dot(sub(p,origin),normal)));
  return{flat:maxDeviation<=tolerance,maxDeviation,tolerance};
}

function inspect(m){
  if(!m)return{indices:[],count:0,maxDeviation:0};
  const indices=[];
  let maxDeviation=0;
  (m.faces||[]).forEach((face,index)=>{
    const info=flatInfo(m,face);
    if(info.flat){indices.push(index);maxDeviation=Math.max(maxDeviation,info.maxDeviation);}
  });
  return{indices,count:indices.length,maxDeviation};
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
      ?`Flat Faces • ${info.count} face${info.count===1?'':'s'} selected`
      :'Topology check • 0 flat faces';
  });
}

function sync(){
  place();
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} planar face${info.count===1?'':'s'}`
    :'No planar faces found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));

setTimeout(()=>{
  if(button.isConnected)return;
  const host=document.createElement('div');
  host.className='outliner-actions';
  host.style.cssText='grid-template-columns:1fr;margin-top:4px';
  host.appendChild(button);
  const row=document.querySelector('#faceInspectionRow');
  if(row?.parentElement)row.insertAdjacentElement('afterend',host);else faceTools?.appendChild(host);
},900);

globalThis.__boxlabSelectFlatFaces={version:'0.36.18.68',inspect,apply,flatInfo};
