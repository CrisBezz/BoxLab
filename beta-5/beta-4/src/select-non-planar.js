// BoxLab v0.36.18.48 — non-destructive Face planarity inspection.
// Selects faces whose vertices deviate from one plane beyond a small scale-relative tolerance.
// Geometry/history untouched.

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
button.id='selectNonPlanarBtn';button.type='button';button.textContent='Select Non-Planar';
host.appendChild(button);
const anchor=document.querySelector('#selectNonQuadsBtn')?.parentElement;
if(anchor?.parentElement)anchor.parentElement.insertBefore(host,anchor.nextSibling);else faceTools?.appendChild(host);

function faceInfo(m,face){
  if(!Array.isArray(face)||face.length<4)return{nonPlanar:false,maxDeviation:0,tolerance:0};
  const pts=face.map(i=>m.vertices?.[i]).filter(Boolean);
  if(pts.length!==face.length)return{nonPlanar:false,maxDeviation:0,tolerance:0};

  let nx=0,ny=0,nz=0,minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    nx+=(a.y-b.y)*(a.z+b.z);
    ny+=(a.z-b.z)*(a.x+b.x);
    nz+=(a.x-b.x)*(a.y+b.y);
    minX=Math.min(minX,a.x);minY=Math.min(minY,a.y);minZ=Math.min(minZ,a.z);
    maxX=Math.max(maxX,a.x);maxY=Math.max(maxY,a.y);maxZ=Math.max(maxZ,a.z);
  }
  const nl=Math.hypot(nx,ny,nz);
  if(nl<1e-12)return{nonPlanar:false,maxDeviation:0,tolerance:0};
  nx/=nl;ny/=nl;nz/=nl;

  let cx=0,cy=0,cz=0;
  for(const p of pts){cx+=p.x;cy+=p.y;cz+=p.z;}
  cx/=pts.length;cy/=pts.length;cz/=pts.length;

  let maxDeviation=0;
  for(const p of pts)maxDeviation=Math.max(maxDeviation,Math.abs((p.x-cx)*nx+(p.y-cy)*ny+(p.z-cz)*nz));
  const diagonal=Math.hypot(maxX-minX,maxY-minY,maxZ-minZ);
  const tolerance=Math.max(1e-7,diagonal*1e-6);
  return{nonPlanar:maxDeviation>tolerance,maxDeviation,tolerance};
}

function inspect(m){
  if(!m)return{indices:[],count:0,maxDeviation:0};
  const indices=[];let maxDeviation=0;
  m.faces.forEach((face,index)=>{
    const info=faceInfo(m,face);
    if(info.nonPlanar){indices.push(index);maxDeviation=Math.max(maxDeviation,info.maxDeviation);}
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
      ?`Non-Planar • ${info.count} face${info.count===1?'':'s'} selected • max deviation ${info.maxDeviation.toPrecision(3)}`
      :'Topology check • 0 non-planar faces';
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count?`Select ${info.count} non-planar face${info.count===1?'':'s'}`:'No non-planar faces found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectNonPlanar={version:'0.36.18.48',inspect,apply};
