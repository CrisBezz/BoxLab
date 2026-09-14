// BoxLab v0.36.18.205 — hardened quad-preferred triangle-pair cleanup.
// Only merges planar pairs when winding, shared-edge direction, convexity and normal are all safe.
const VERSION='0.36.18.205';
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState||null;}
function mesh(){return state()?.mesh||null;}
function forceRender(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function directed(face,a,b){for(let i=0;i<face.length;i++){const x=face[i],y=face[(i+1)%face.length];if(x===a&&y===b)return 1;if(x===b&&y===a)return-1;}return 0;}
function normalOf(m,face){const a=m.vertices[face[0]],b=m.vertices[face[1]],c=m.vertices[face[2]];if(!a||!b||!c)return null;const ab={x:b.x-a.x,y:b.y-a.y,z:b.z-a.z},ac={x:c.x-a.x,y:c.y-a.y,z:c.z-a.z};const n={x:ab.y*ac.z-ab.z*ac.y,y:ab.z*ac.x-ab.x*ac.z,z:ab.x*ac.y-ab.y*ac.x};const l=Math.hypot(n.x,n.y,n.z);return l>1e-12?{x:n.x/l,y:n.y/l,z:n.z/l}:null;}
function dot(a,b){return a.x*b.x+a.y*b.y+a.z*b.z;}
function sub(a,b){return{x:a.x-b.x,y:a.y-b.y,z:a.z-b.z};}
function cross(a,b){return{x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x};}

function mergedCycle(m,faceA,faceB){
  const shared=[...new Set(faceA.filter(v=>faceB.includes(v)))];
  if(shared.length!==2)return null;
  const [s0,s1]=shared,d0=directed(faceA,s0,s1),d1=directed(faceB,s0,s1);
  if(!d0||!d1||d0===d1)return null;
  const sharedKey=edgeKey(s0,s1),boundary=[];
  for(const face of [faceA,faceB])for(let i=0;i<3;i++){
    const a=face[i],b=face[(i+1)%3];if(edgeKey(a,b)!==sharedKey)boundary.push([a,b]);
  }
  if(boundary.length!==4)return null;
  const cycle=[boundary[0][0]],used=new Set();let current=boundary[0][0];
  for(let step=0;step<4;step++){
    const idx=boundary.findIndex(([a])=>a===current&&!used.has(edgeKey(a,boundary.find(e=>e[0]===a)?.[1]??a)));
    let pick=-1;
    for(let i=0;i<boundary.length;i++)if(!used.has(i)&&boundary[i][0]===current){pick=i;break;}
    if(pick<0)return null;
    used.add(pick);current=boundary[pick][1];if(step<3)cycle.push(current);
  }
  if(current!==cycle[0]||new Set(cycle).size!==4)return null;
  return cycle;
}

function validQuadGeometry(m,cycle,nRef){
  if(!cycle||cycle.length!==4)return false;
  const pts=cycle.map(i=>m.vertices[i]);if(pts.some(p=>!p))return false;
  let sign=0;
  for(let i=0;i<4;i++){
    const a=pts[i],b=pts[(i+1)%4],c=pts[(i+2)%4];
    const cr=cross(sub(b,a),sub(c,b));const s=dot(cr,nRef);
    if(Math.abs(s)<1e-10)return false;
    const now=Math.sign(s);if(!sign)sign=now;else if(now!==sign)return false;
  }
  const d02=sub(pts[2],pts[0]),d13=sub(pts[3],pts[1]);
  if(Math.hypot(d02.x,d02.y,d02.z)<1e-9||Math.hypot(d13.x,d13.y,d13.z)<1e-9)return false;
  return true;
}

function inspect(m=mesh()){
  const source=globalThis.__boxlabSelectTriPairs?.inspect?.(m);
  if(!source)return{available:!!m,candidates:[],pairCount:0};
  const used=new Set(),candidates=[];
  for(const pair of source.planarPairs||[]){
    const [a,b]=pair.faces||[];if(!Number.isInteger(a)||!Number.isInteger(b)||used.has(a)||used.has(b))continue;
    const faceA=m.faces[a],faceB=m.faces[b];if(!Array.isArray(faceA)||!Array.isArray(faceB)||faceA.length!==3||faceB.length!==3)continue;
    const nA=normalOf(m,faceA),nB=normalOf(m,faceB);if(!nA||!nB||dot(nA,nB)<0.999)continue;
    const cycle=mergedCycle(m,faceA,faceB);if(!cycle||!validQuadGeometry(m,cycle,nA))continue;
    const nQ=normalOf(m,[cycle[0],cycle[1],cycle[2]]);if(!nQ||dot(nQ,nA)<0.999)continue;
    candidates.push({...pair,faces:[a,b],cycle});used.add(a);used.add(b);
  }
  return{available:!!m,candidates,pairCount:candidates.length,triangleCount:candidates.length*2};
}

function apply(m=mesh()){
  if(!m)return{ok:false,reason:'No editable mesh'};
  const info=inspect(m);if(!info.pairCount)return{ok:false,reason:'No safe planar quad-pair candidates',...info};
  const before=m.clone(),history=globalThis.__boxlabHistory,gate=globalThis.__boxlabTopologyGate;const beforeGate=gate?.validate?.(m)||null;
  const replacement=new Map(),remove=new Set();
  for(const pair of info.candidates){const [a,b]=pair.faces,keep=Math.min(a,b),drop=Math.max(a,b);replacement.set(keep,[...pair.cycle]);remove.add(drop);}
  const next=[];for(let i=0;i<m.faces.length;i++){if(remove.has(i))continue;next.push(replacement.has(i)?replacement.get(i):m.faces[i]);}
  m.faces=next;const after=gate?.validate?.(m)||null;const invalid=after&&!after.valid;
  if(invalid){m.vertices=before.vertices.map(v=>v.clone());m.faces=before.faces.map(f=>[...f]);m.creases=new Map(before.creases);forceRender();gate?.sync?.();return{ok:false,reason:'Validation failed — cleanup rolled back',before:beforeGate,after};}
  history?.push?.(before);forceRender();gate?.sync?.();return{ok:true,quads:info.pairCount,trianglesRemoved:info.triangleCount,before:beforeGate,after};
}

function ensureUI(){const close=document.querySelector('#closeHolesRow'),gate=document.querySelector('#topologyValidityGate'),anchor=close||gate;if(!anchor)return null;let row=document.querySelector('#quadPairCleanupRow');if(row)return row;row=document.createElement('div');row.id='quadPairCleanupRow';row.style.cssText='margin:5px 0 0;display:grid;grid-template-columns:1fr';const button=document.createElement('button');button.type='button';button.id='quadPairCleanupBtn';button.textContent='Quad Cleanup';button.title='Merge only winding-safe convex planar triangle pairs into quads';row.append(button);anchor.insertAdjacentElement('afterend',row);button.addEventListener('click',()=>{const result=apply();if(status)status.textContent=result.ok?`Quad Cleanup • ${result.quads} quad${result.quads===1?'':'s'} created`:`Quad Cleanup • ${result.reason}`;syncUI();});return row;}
function syncUI(){const row=ensureUI(),button=row?.querySelector('#quadPairCleanupBtn');if(!button)return false;const info=inspect(mesh());button.disabled=!info.pairCount;button.textContent=info.pairCount?`Quad Cleanup (${info.pairCount})`:'Quad Cleanup';button.title=info.pairCount?`Merge ${info.pairCount} safe planar triangle pair${info.pairCount===1?'':'s'} into quads`:'No safe planar quad-pair candidates';return true;}
if(!ensureUI()){let attempts=0;const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>50)clearInterval(timer);},100);}
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(syncUI));document.addEventListener('pointerup',()=>setTimeout(syncUI,0),true);
globalThis.__boxlabQuadPairCleanup={version:VERSION,inspect,apply,syncUI};
