const button=document.querySelector('#selectRingBtn');
const loopButton=document.querySelector('#selectLoopBtn');
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])]:[];}
function key(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function edgeIndexMap(m){const map=new Map();m.edges().forEach((e,i)=>map.set(key(e.a,e.b),i));return map;}
function oppositeEdgeInQuad(m,faceIndex,edgeIndex,indexMap){
  const face=m.faces[faceIndex],edge=m.edges()[edgeIndex];
  if(!Array.isArray(face)||face.length!==4||!edge)return null;
  for(let i=0;i<4;i++){
    const a=face[i],b=face[(i+1)%4];
    if(key(a,b)!==key(edge.a,edge.b))continue;
    const oa=face[(i+2)%4],ob=face[(i+3)%4];
    const out=indexMap.get(key(oa,ob));
    return Number.isInteger(out)?out:null;
  }
  return null;
}
function realFaces(m,edge){return(edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}
function walk(m,seedIndex,startFace,indexMap,visited){
  const out=[];let currentEdge=seedIndex,currentFace=startFace;
  for(let guard=0;guard<m.edges().length+1;guard++){
    const nextEdge=oppositeEdgeInQuad(m,currentFace,currentEdge,indexMap);
    if(!Number.isInteger(nextEdge)||visited.has(nextEdge))break;
    visited.add(nextEdge);out.push(nextEdge);
    const faces=realFaces(m,m.edges()[nextEdge]).filter(fi=>fi!==currentFace&&m.faces[fi]?.length===4);
    if(faces.length!==1)break;
    currentEdge=nextEdge;currentFace=faces[0];
  }
  return out;
}
function traceRing(m,seedIndex){
  const seed=m.edges()[seedIndex];if(!seed)return null;
  const faces=realFaces(m,seed).filter(fi=>m.faces[fi]?.length===4);
  if(!faces.length)return null;
  const indexMap=edgeIndexMap(m),visited=new Set([seedIndex]);
  const a=walk(m,seedIndex,faces[0],indexMap,visited);
  const b=faces.length>1?walk(m,seedIndex,faces[1],indexMap,visited):[];
  const result=[...a.reverse(),seedIndex,...b];
  return result.length>1?result:null;
}
function select(indices){const b=bridge();if(!b?.set)return false;b.set('edge',[...new Set(indices)]);document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));return true;}
function sync(){
  const b=bridge();if(!button||!b)return;
  const mode=b.mode?.();
  if(mode==='face'){
    const enabled=(b.indices?.()||[]).length>0;
    button.disabled=!enabled;
    if(loopButton)loopButton.disabled=!enabled;
    return;
  }
  if(mode==='edge')button.disabled=selectedEdges().length===0;
}

button?.addEventListener('click',event=>{
  const m=mesh(),seeds=selectedEdges();if(!m||!seeds.length)return;
  event.preventDefault();event.stopImmediatePropagation();
  const rings=[],seen=new Set();let rejected=0;
  for(const seed of seeds){const ring=traceRing(m,seed);if(!ring){rejected++;continue;}const signature=[...ring].sort((a,b)=>a-b).join(',');if(seen.has(signature))continue;seen.add(signature);rings.push(ring);}
  if(!rings.length){if(status)status.textContent='Ring Select • no quad ring from selected edge seed(s)';return;}
  const merged=[...new Set(rings.flat())],ok=select(merged);
  if(status)status.textContent=ok?`Ring Select • ${rings.length} ring${rings.length===1?'':'s'} • ${merged.length} edges${rejected?` • ${rejected} rejected`:''}`:'Ring Select • selection handoff failed';
  sync();
},true);

document.addEventListener('click',()=>queueMicrotask(sync),true);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
window.addEventListener('boxlab-bridge-state',sync);
setTimeout(sync,0);
