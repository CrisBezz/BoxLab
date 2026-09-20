// BoxLab v0.36.18.65 — non-destructive self-intersecting Face inspection.
// Selects polygon faces whose boundary crosses itself after projection to the
// face's dominant plane. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='selectSelfIntersectingFacesBtn';
button.type='button';
button.textContent='Crossing';
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

function orient(a,b,c){return (b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);}
function onSegment(a,b,p,eps){
  return p.x>=Math.min(a.x,b.x)-eps&&p.x<=Math.max(a.x,b.x)+eps&&
         p.y>=Math.min(a.y,b.y)-eps&&p.y<=Math.max(a.y,b.y)+eps;
}
function segmentsIntersect(a,b,c,d,eps){
  const o1=orient(a,b,c),o2=orient(a,b,d),o3=orient(c,d,a),o4=orient(c,d,b);
  const s1=Math.sign(Math.abs(o1)<=eps?0:o1),s2=Math.sign(Math.abs(o2)<=eps?0:o2);
  const s3=Math.sign(Math.abs(o3)<=eps?0:o3),s4=Math.sign(Math.abs(o4)<=eps?0:o4);
  if(s1!==s2&&s3!==s4)return true;
  if(s1===0&&onSegment(a,b,c,eps))return true;
  if(s2===0&&onSegment(a,b,d,eps))return true;
  if(s3===0&&onSegment(c,d,a,eps))return true;
  if(s4===0&&onSegment(c,d,b,eps))return true;
  return false;
}

function projectedFace(m,face){
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

function selfIntersects(m,face){
  if(!Array.isArray(face)||face.length<4)return false;
  const pts=projectedFace(m,face);if(!pts)return false;
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for(const p of pts){minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);}
  const scale=Math.hypot(maxX-minX,maxY-minY)||1;
  const eps=Math.max(1e-10,scale*1e-9);
  const n=pts.length;
  for(let i=0;i<n;i++){
    const a=pts[i],b=pts[(i+1)%n];
    for(let j=i+1;j<n;j++){
      if(j===i||j===(i+1)%n||i===(j+1)%n)continue;
      // first and last polygon edges are adjacent
      if(i===0&&j===n-1)continue;
      const c=pts[j],d=pts[(j+1)%n];
      if(segmentsIntersect(a,b,c,d,eps))return true;
    }
  }
  return false;
}

function inspect(m){
  if(!m)return{indices:[],count:0};
  const indices=[];
  (m.faces||[]).forEach((face,index)=>{if(selfIntersects(m,face))indices.push(index);});
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
      ?`Self-Intersecting Faces • ${info.count} face${info.count===1?'':'s'} selected`
      :'Topology check • 0 self-intersecting faces';
  });
}

function sync(){
  place();
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count
    ?`Select ${info.count} self-intersecting face${info.count===1?'':'s'}`
    :'No self-intersecting faces found';
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

globalThis.__boxlabSelectSelfIntersectingFaces={version:'0.36.18.65',inspect,apply,selfIntersects};
