// BoxLab v0.36.18.67 — non-destructive convex Face inspection.
// Selects valid polygon faces whose non-collinear corners all turn consistently
// after projection to the face's dominant plane. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='selectConvexFacesBtn';
button.type='button';
button.textContent='Convex';
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

function projectedFace(m,face){
  if(!Array.isArray(face)||face.length<3)return null;
  const pts=face.map(index=>m.vertices?.[index]);
  if(pts.some(point=>!point))return null;
  let nx=0,ny=0,nz=0;
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    nx+=(a.y-b.y)*(a.z+b.z);
    ny+=(a.z-b.z)*(a.x+b.x);
    nz+=(a.x-b.x)*(a.y+b.y);
  }
  const ax=Math.abs(nx),ay=Math.abs(ny),az=Math.abs(nz);
  if(Math.max(ax,ay,az)<1e-12)return null;
  if(ax>=ay&&ax>=az)return pts.map(p=>({x:p.y,y:p.z}));
  if(ay>=az)return pts.map(p=>({x:p.x,y:p.z}));
  return pts.map(p=>({x:p.x,y:p.y}));
}

function isConvex(m,face){
  const pts=projectedFace(m,face);if(!pts)return false;
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for(const p of pts){minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);}
  const scale=Math.hypot(maxX-minX,maxY-minY)||1;
  const eps=Math.max(1e-12,scale*scale*1e-10);
  let sign=0,turns=0;
  const n=pts.length;
  for(let i=0;i<n;i++){
    const a=pts[(i+n-1)%n],b=pts[i],c=pts[(i+1)%n];
    const cross=(b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
    if(Math.abs(cross)<=eps)continue;
    const current=cross>0?1:-1;
    turns++;
    if(sign===0)sign=current;
    else if(current!==sign)return false;
  }
  return turns>=3;
}

function inspect(m){
  if(!m)return{indices:[],count:0};
  const indices=[];
  (m.faces||[]).forEach((face,index)=>{if(isConvex(m,face))indices.push(index);});
  return{indices,count:indices.length};
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
      ?`Convex Faces • ${info.count} face${info.count===1?'':'s'} selected`
      :'Topology check • 0 convex faces';
  });
}

function sync(){
  place();
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} convex face${info.count===1?'':'s'}`
    :'No convex faces found';
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

globalThis.__boxlabSelectConvexFaces={version:'0.36.18.67',inspect,apply,isConvex};
