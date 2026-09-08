// BoxLab v0.36.18.58 — non-destructive degenerate Face inspection.
// Selects faces whose usable polygon area has effectively collapsed to zero.
// Geometry/history untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const host=document.createElement('div');
host.id='degenerateFaceInspectionRow';
host.className='outliner-actions';
host.style.cssText='grid-template-columns:1fr;margin-top:4px';
const button=document.createElement('button');
button.id='selectDegenerateFacesBtn';button.type='button';button.textContent='Degenerate';
button.style.width='100%';button.style.fontSize='9px';button.style.padding='5px 8px';
host.appendChild(button);
faceTools?.appendChild(host);

function place(){
  const row=document.querySelector('#faceInspectionRow');
  const precision=document.querySelector('#precisionFaceReadout');
  if(row?.parentElement){row.insertAdjacentElement('afterend',host);return true;}
  if(precision?.parentElement){precision.insertAdjacentElement('afterend',host);return true;}
  return false;
}

function faceAreaInfo(m,face){
  if(!Array.isArray(face)||face.length<3)return{degenerate:true,area2:0,tolerance:0};
  const pts=face.map(index=>m.vertices?.[index]);
  if(pts.some(point=>!point))return{degenerate:true,area2:0,tolerance:0};

  let nx=0,ny=0,nz=0;
  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    nx+=(a.y-b.y)*(a.z+b.z);
    ny+=(a.z-b.z)*(a.x+b.x);
    nz+=(a.x-b.x)*(a.y+b.y);
    minX=Math.min(minX,a.x);minY=Math.min(minY,a.y);minZ=Math.min(minZ,a.z);
    maxX=Math.max(maxX,a.x);maxY=Math.max(maxY,a.y);maxZ=Math.max(maxZ,a.z);
  }
  const area2=Math.hypot(nx,ny,nz);
  const diagonal=Math.hypot(maxX-minX,maxY-minY,maxZ-minZ);
  const tolerance=Math.max(1e-12,diagonal*diagonal*1e-10);
  return{degenerate:area2<=tolerance,area2,tolerance};
}

function inspect(m){
  if(!m)return{indices:[],count:0,minArea2:0};
  const indices=[];let minArea2=Infinity;
  (m.faces||[]).forEach((face,index)=>{
    const info=faceAreaInfo(m,face);
    if(info.degenerate){indices.push(index);minArea2=Math.min(minArea2,info.area2);}
  });
  return{indices,count:indices.length,minArea2:Number.isFinite(minArea2)?minArea2:0};
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
      ?`Degenerate Faces • ${info.count} selected`
      :'Topology check • 0 degenerate faces';
  });
}

function sync(){
  place();
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count?`Select ${info.count} zero-area/degenerate face${info.count===1?'':'s'}`:'No degenerate faces found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,40,120,300,700].forEach(delay=>setTimeout(()=>{place();sync();},delay));

globalThis.__boxlabSelectDegenerateFaces={version:'0.36.18.58',inspect,apply,faceAreaInfo};
