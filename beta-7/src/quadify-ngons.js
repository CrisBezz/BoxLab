// BoxLab v0.36.18.203 — quad-preferred planar n-gon rebuild.
// Conservatively splits convex, planar, even-sided n-gons (6+) into quads.
// Transactional: candidate mesh is validated before the live mesh is changed.
const VERSION='0.36.18.203';
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState||null;}
function mesh(){return state()?.mesh||null;}
function point(v){return v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z);}

function facePlane(m,face){
  const pts=face.map(i=>m.vertices?.[i]);if(pts.some(p=>!point(p)))return null;
  let nx=0,ny=0,nz=0;
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    nx+=(a.y-b.y)*(a.z+b.z);ny+=(a.z-b.z)*(a.x+b.x);nz+=(a.x-b.x)*(a.y+b.y);
  }
  const len=Math.hypot(nx,ny,nz);if(!Number.isFinite(len)||len<1e-12)return null;
  nx/=len;ny/=len;nz/=len;
  const origin=pts[0];
  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(const p of pts){minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);minZ=Math.min(minZ,p.z);maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);maxZ=Math.max(maxZ,p.z);}
  const scale=Math.max(Math.hypot(maxX-minX,maxY-minY,maxZ-minZ),1);
  const tolerance=Math.max(1e-7,scale*1e-6);
  let deviation=0;
  for(const p of pts)deviation=Math.max(deviation,Math.abs((p.x-origin.x)*nx+(p.y-origin.y)*ny+(p.z-origin.z)*nz));
  return{normal:{x:nx,y:ny,z:nz},deviation,tolerance,planar:deviation<=tolerance,pts};
}
function project(plane){
  const n=plane.normal,axis=Math.abs(n.x)>=Math.abs(n.y)&&Math.abs(n.x)>=Math.abs(n.z)?'x':Math.abs(n.y)>=Math.abs(n.z)?'y':'z';
  return plane.pts.map(p=>axis==='x'?{x:p.y,y:p.z}:axis==='y'?{x:p.x,y:p.z}:{x:p.x,y:p.y});
}
function convexProjected(pts){
  if(pts.length<4)return false;
  let sign=0;
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length],c=pts[(i+2)%pts.length];
    const cross=(b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
    if(Math.abs(cross)<1e-12)continue;
    const s=Math.sign(cross);if(!sign)sign=s;else if(s!==sign)return false;
  }
  return sign!==0;
}
function eligibleFace(m,face,index){
  if(!Array.isArray(face)||face.length<6||face.length%2!==0)return null;
  if(new Set(face).size!==face.length)return null;
  const plane=facePlane(m,face);if(!plane?.planar)return null;
  if(!convexProjected(project(plane)))return null;
  return{index,size:face.length,deviation:plane.deviation,tolerance:plane.tolerance};
}
function inspect(m=mesh()){
  const faces=[];if(!m||!Array.isArray(m.faces))return{version:VERSION,available:false,faces,count:0,quads:0};
  let quads=0;
  m.faces.forEach((face,index)=>{const info=eligibleFace(m,face,index);if(info){faces.push(info);quads+=face.length/2-1;}});
  return{version:VERSION,available:true,faces,count:faces.length,quads};
}
function quadFan(face){
  const out=[];
  for(let i=1;i<face.length-2;i+=2)out.push([face[0],face[i],face[i+1],face[i+2]]);
  return out;
}
function rebuildCandidate(m,infos){
  const candidate=m.clone();const replace=new Map(infos.map(info=>[info.index,quadFan(candidate.faces[info.index])]));
  const next=[];
  candidate.faces.forEach((face,index)=>{const quads=replace.get(index);if(quads)next.push(...quads);else next.push([...face]);});
  candidate.faces=next;return candidate;
}
function apply(){
  const m=mesh(),info=inspect(m);if(!m||!info.count)return{ok:false,reason:'No eligible planar even n-gons',...info};
  const gate=globalThis.__boxlabTopologyGate,beforeGate=gate?.validate?.(m)||null;
  if(beforeGate&&!beforeGate.valid)return{ok:false,reason:'Repair existing topology issues first',...info,before:beforeGate};
  const candidate=rebuildCandidate(m,info.faces),after=gate?.validate?.(candidate)||null;
  if(after&&(!after.valid||after.boundaryEdges!==(beforeGate?.boundaryEdges??after.boundaryEdges)))return{ok:false,reason:'Validation failed — no changes committed',...info,before:beforeGate,after};
  globalThis.__boxlabHistory?.push?.(m);
  m.faces=candidate.faces.map(face=>[...face]);m.creases=new Map(candidate.creases?[...candidate.creases]:[]);
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  gate?.sync?.();syncUI();
  return{ok:true,rebuilt:info.count,quads:info.quads,before:beforeGate,after};
}
function ensureUI(){
  const close=document.querySelector('#closeHolesRow'),gate=document.querySelector('#topologyValidityGate');
  const host=close?.parentElement||gate?.parentElement;if(!host)return null;
  let row=document.querySelector('#quadifyNgonsRow');if(row)return row;
  row=document.createElement('div');row.id='quadifyNgonsRow';row.style.cssText='margin:5px 0 0;display:grid;grid-template-columns:1fr';
  const button=document.createElement('button');button.type='button';button.id='quadifyNgonsBtn';button.textContent='Quadify N-gons';button.title='Split convex planar even-sided n-gons into quad faces';
  row.append(button);
  if(close?.parentElement===host)close.insertAdjacentElement('afterend',row);else gate.insertAdjacentElement('afterend',row);
  button.addEventListener('click',()=>{const result=apply();if(status)status.textContent=result.ok?`Quadify N-gons • ${result.rebuilt} face${result.rebuilt===1?'':'s'} → ${result.quads} quads`:`Quadify N-gons • ${result.reason}`;});
  return row;
}
function syncUI(){
  const row=ensureUI(),button=row?.querySelector('#quadifyNgonsBtn');if(!button)return false;
  const info=inspect(mesh());button.disabled=!info.count;button.textContent=info.count?`Quadify N-gons (${info.count})`:'Quadify N-gons';
  button.title=info.count?`${info.count} eligible planar convex even n-gon${info.count===1?'':'s'} • creates ${info.quads} quads`:'No eligible planar convex even-sided n-gons';return true;
}

if(!ensureUI()){let attempts=0;const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>50)clearInterval(timer);},100);}
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(syncUI));
document.addEventListener('pointerup',()=>setTimeout(syncUI,0),true);

globalThis.__boxlabQuadifyNgons={version:VERSION,inspect,apply,syncUI,quadFan};
