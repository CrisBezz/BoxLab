// BoxLab v0.36.18.133 — non-destructive Tris-to-Quads candidate inspection.
// Finds manifold interior edges shared by exactly two triangular faces where
// the combined region forms a simple four-vertex / four-boundary-edge patch,
// then classifies topology-safe pairs as planar or warped.
// Geometry/history are untouched.

const faceTools=document.querySelector('[data-mode-tools="face"]');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function validOwners(m,edge){return (edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}
function key(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

const group=document.createElement('div');
group.id='triPairCandidateGroup';
group.style.cssText='margin:4px 0 0';

const row=document.createElement('div');
row.id='triPairCandidateRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin:0 0 4px';

const qualityRow=document.createElement('div');
qualityRow.id='triPairQualityRow';
qualityRow.className='outliner-actions';
qualityRow.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));margin:0';

function makeButton(id,label){
  const button=document.createElement('button');
  button.id=id;
  button.type='button';
  button.textContent=label;
  button.disabled=true;
  button.style.cssText='width:100%;min-width:0;font-size:10px;padding:5px 4px';
  return button;
}

const button=makeButton('selectTriPairCandidatesBtn','Tri Pair Candidates');
const planarButton=makeButton('selectPlanarTriPairsBtn','Planar Tri Pairs');
const warpedButton=makeButton('selectWarpedTriPairsBtn','Warped Tri Pairs');
row.append(button);
qualityRow.append(planarButton,warpedButton);
group.append(row,qualityRow);

function place(){
  if(group.isConnected)return true;
  const patchHost=document.querySelector('#isolatedNonQuadFaceSelectionHost')||document.querySelector('#quadPatchFaceSelectionHost');
  if(patchHost?.parentElement){patchHost.insertAdjacentElement('afterend',group);return true;}
  const inspection=document.querySelector('#faceInspectionRow');
  if(inspection?.parentElement){inspection.insertAdjacentElement('afterend',group);return true;}
  if(faceTools){faceTools.appendChild(group);return true;}
  return false;
}

function candidatePair(m,edge){
  const owners=validOwners(m,edge);
  if(owners.length!==2)return null;
  const f0=m.faces[owners[0]],f1=m.faces[owners[1]];
  if(!Array.isArray(f0)||!Array.isArray(f1)||f0.length!==3||f1.length!==3)return null;

  const vertices=[...new Set([...f0,...f1])];
  if(vertices.length!==4)return null;

  const counts=new Map();
  for(const face of [f0,f1]){
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],k=key(a,b);
      counts.set(k,(counts.get(k)||0)+1);
    }
  }
  const boundaryKeys=[...counts].filter(([,count])=>count===1).map(([k])=>k);
  if(boundaryKeys.length!==4)return null;

  const degree=new Map(vertices.map(v=>[v,0]));
  for(const k of boundaryKeys){
    const [a,b]=k.split(':').map(Number);
    if(!degree.has(a)||!degree.has(b))return null;
    degree.set(a,degree.get(a)+1);
    degree.set(b,degree.get(b)+1);
  }
  if([...degree.values()].some(value=>value!==2))return null;

  return{faces:owners.slice().sort((a,b)=>a-b),edgeVertices:[edge.a,edge.b],vertices};
}

function planarity(m,pair){
  const f0=m.faces[pair.faces[0]],ids=pair.vertices;
  const pts=ids.map(index=>m.vertices?.[index]);
  if(pts.some(point=>!point)||!Array.isArray(f0)||f0.length!==3)return{planar:false,deviation:Infinity,tolerance:0};
  const a=m.vertices[f0[0]],b=m.vertices[f0[1]],c=m.vertices[f0[2]];
  if(!a||!b||!c)return{planar:false,deviation:Infinity,tolerance:0};
  const ab={x:b.x-a.x,y:b.y-a.y,z:b.z-a.z};
  const ac={x:c.x-a.x,y:c.y-a.y,z:c.z-a.z};
  const nx=ab.y*ac.z-ab.z*ac.y;
  const ny=ab.z*ac.x-ab.x*ac.z;
  const nz=ab.x*ac.y-ab.y*ac.x;
  const length=Math.hypot(nx,ny,nz);
  if(!Number.isFinite(length)||length<1e-12)return{planar:false,deviation:Infinity,tolerance:0};

  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  pts.forEach(p=>{minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);minZ=Math.min(minZ,p.z);maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);maxZ=Math.max(maxZ,p.z);});
  const scale=Math.hypot(maxX-minX,maxY-minY,maxZ-minZ);
  const tolerance=Math.max(1e-7,scale*1e-6);
  let deviation=0;
  pts.forEach(p=>{
    const distance=Math.abs((p.x-a.x)*nx+(p.y-a.y)*ny+(p.z-a.z)*nz)/length;
    deviation=Math.max(deviation,distance);
  });
  return{planar:deviation<=tolerance,deviation,tolerance};
}

function inspect(m){
  if(!m)return{faces:[],pairs:[],pairCount:0,planarPairs:[],warpedPairs:[],planarFaces:[],warpedFaces:[]};
  const pairs=[];
  (m.edges?.()||[]).forEach((edge,index)=>{
    const pair=candidatePair(m,edge);
    if(pair)pairs.push({edge:index,...pair});
  });
  const planarPairs=[],warpedPairs=[];
  pairs.forEach(pair=>{
    const quality=planarity(m,pair);
    (quality.planar?planarPairs:warpedPairs).push({...pair,...quality});
  });
  const faces=[...new Set(pairs.flatMap(pair=>pair.faces))].sort((a,b)=>a-b);
  const planarFaces=[...new Set(planarPairs.flatMap(pair=>pair.faces))].sort((a,b)=>a-b);
  const warpedFaces=[...new Set(warpedPairs.flatMap(pair=>pair.faces))].sort((a,b)=>a-b);
  return{faces,pairs,pairCount:pairs.length,planarPairs,warpedPairs,planarFaces,warpedFaces};
}

function apply(kind='all'){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const pairs=kind==='planar'?info.planarPairs:kind==='warped'?info.warpedPairs:info.pairs;
  const faces=kind==='planar'?info.planarFaces:kind==='warped'?info.warpedFaces:info.faces;
  const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');
  if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=faces.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('face',faces);
    render();
    if(status){
      const label=kind==='planar'?'Planar Tri Pairs':kind==='warped'?'Warped Tri Pairs':'Tri Pair Candidates';
      status.textContent=pairs.length
        ?`${label} • ${pairs.length} pair${pairs.length===1?'':'s'} • ${faces.length} triangle${faces.length===1?'':'s'} selected`
        :`${label} • 0 found`;
    }
  });
}

function sync(){
  place();
  const m=mesh(),info=m?inspect(m):null;
  [button,planarButton,warpedButton].forEach(control=>control.disabled=!m);
  if(!m){button.title=planarButton.title=warpedButton.title='No editable mesh';return;}
  button.title=`Select triangles participating in topology-safe quad-pair candidates • ${info.pairCount} pair${info.pairCount===1?'':'s'} • ${info.faces.length} faces`;
  planarButton.title=`Select topology-safe tri pairs whose four vertices are effectively coplanar • ${info.planarPairs.length} pair${info.planarPairs.length===1?'':'s'}`;
  warpedButton.title=`Select topology-safe tri pairs whose four vertices are not coplanar • ${info.warpedPairs.length} pair${info.warpedPairs.length===1?'':'s'}`;
}

button.addEventListener('click',()=>apply('all'));
planarButton.addEventListener('click',()=>apply('planar'));
warpedButton.addEventListener('click',()=>apply('warped'));
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700,1000].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabSelectTriPairs={version:'0.36.18.133',inspect,apply,sync};
