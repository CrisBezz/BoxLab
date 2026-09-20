// BoxLab v0.36.18.56 — Select Loose Vertices with live-index mapping.
// The object-manager snapshot compacts away isolated vertices, so its vertex
// indices cannot be compared directly with the live viewport indices. Match
// face-used snapshot vertices to live viewport markers by position, then select
// the unmatched live vertex indices. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const vertexTools=document.querySelector('[data-mode-tools="vertex"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){
  const manager=globalThis.__boxlabObjectManager;
  if(manager){
    const activeId=manager.activeId;
    const objects=manager.objects||[];
    const active=objects.find(object=>object.id===activeId);
    if(active?.mesh)return active.mesh;
  }
  return state()?.mesh||null;
}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function list(values){return values.length?values.join(','):'—';}

const host=document.createElement('div');
host.className='outliner-actions';
host.style.gridTemplateColumns='1fr';
const button=document.createElement('button');
button.id='selectLooseVerticesBtn';button.type='button';button.textContent='Select Loose Vertices';
host.appendChild(button);
const cleanButton=document.querySelector('#cleanVerticesBtn');
const anchor=cleanButton?.parentElement;
if(anchor?.parentElement)anchor.parentElement.insertBefore(host,anchor.nextSibling);else vertexTools?.appendChild(host);

function liveVertexMarkers(){
  const markers=[];
  state()?.scene?.traverse?.(object=>{
    if(object?.userData?.kind!=='vertex')return;
    const index=object.userData.index;
    const p=object.position;
    if(!Number.isInteger(index)||!p)return;
    markers.push({index,x:p.x,y:p.y,z:p.z});
  });
  markers.sort((a,b)=>a.index-b.index);
  return markers;
}

function distanceSq(a,b){const dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z;return dx*dx+dy*dy+dz*dz;}

function inspect(m){
  if(!m)return{indices:[],all:[],faceUsed:[],count:0,vertices:0,faces:0,unmatchedFace:0};
  const markers=liveVertexMarkers();
  const all=markers.map(marker=>marker.index);
  if(!markers.length)return{indices:[],all:[],faceUsed:[],count:0,vertices:0,faces:0,unmatchedFace:0};

  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(const p of markers){minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);minZ=Math.min(minZ,p.z);maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);maxZ=Math.max(maxZ,p.z);}
  const diagonal=Math.hypot(maxX-minX,maxY-minY,maxZ-minZ);
  const tolerance=Math.max(1e-7,diagonal*1e-5),toleranceSq=tolerance*tolerance;

  const snapshotFaceVertices=new Set();
  let realFaces=0;
  for(const face of m.faces||[]){
    if(!Array.isArray(face)||face.length<3)continue;
    realFaces++;
    for(const v of face)if(Number.isInteger(v)&&m.vertices?.[v])snapshotFaceVertices.add(v);
  }

  const usedLive=new Set();
  let unmatchedFace=0;
  for(const snapshotIndex of snapshotFaceVertices){
    const p=m.vertices[snapshotIndex];
    let best=null,bestD=Infinity;
    for(const marker of markers){
      if(usedLive.has(marker.index))continue;
      const d=distanceSq(p,marker);
      if(d<bestD){bestD=d;best=marker;}
    }
    if(best&&bestD<=toleranceSq)usedLive.add(best.index);else unmatchedFace++;
  }

  const faceUsed=[...usedLive].sort((a,b)=>a-b);
  const indices=all.filter(index=>!usedLive.has(index));
  return{indices,all,faceUsed,count:indices.length,vertices:all.length,faces:realFaces,unmatchedFace};
}

function apply(){
  const m=mesh();
  if(!m){if(status)status.textContent='Loose Vertices • no active mesh';return;}
  const info=inspect(m);
  const vertexMode=document.querySelector('#selectionModes button[data-mode="vertex"]');
  if(vertexMode&&!vertexMode.classList.contains('active'))vertexMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    const ok=!!bridge()?.set?.('vertex',info.indices);
    render();
    const mismatch=info.unmatchedFace?` • ${info.unmatchedFace} face vertex match miss${info.unmatchedFace===1?'':'es'}`:'';
    if(status)status.textContent=info.count
      ?`Loose Vertices • ${info.count} selected • Live:[${list(info.all)}] • FaceLive:[${list(info.faceUsed)}] • Loose:[${list(info.indices)}]${mismatch}${ok?'':' • handoff failed'}`
      :`Loose Vertices • 0 found • Live:[${list(info.all)}] • FaceLive:[${list(info.faceUsed)}]${mismatch}${ok?'':' • handoff failed'}`;
  });
}

function sync(){
  const m=mesh();button.disabled=!m;
  if(!m){button.title='No editable mesh';return;}
  const info=inspect(m);
  button.title=info.count?`Select ${info.count} loose vertex${info.count===1?'':'es'}`:'No loose vertices found';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
setTimeout(sync,0);

globalThis.__boxlabSelectLooseVertices={version:'0.36.18.56',inspect,apply,liveVertexMarkers};
