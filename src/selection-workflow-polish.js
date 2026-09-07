// BoxLab v0.36.18.31 — selection workflow polish.
// Keeps multi-seed Loop Select and selection feedback, but no longer owns the
// enabled/disabled state of Loop / Ring / Boundary. Their native tool modules
// remain the single owners of those controls, avoiding transient Face-tool UI flashes.

const status=document.querySelector('#selectionStatus');
const loopButton=document.querySelector('#selectLoopBtn');
const growButton=document.querySelector('#growSelectionBtn');
const shrinkButton=document.querySelector('#shrinkSelectionBtn');
const connectedButton=document.querySelector('#connectedSelectionBtn');
const angleButton=document.querySelector('#angleSelectionBtn');
const normalButton=document.querySelector('#normalSelectionBtn');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||null;}
function ids(){return [...new Set(bridge()?.indices?.()||[])];}
function realFaces(m,e){return(e?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length&&Array.isArray(m.faces[fi]));}
function incidentEdgeIndices(m,vertex){const out=[];m.edges().forEach((e,i)=>{if(e?.a===vertex||e?.b===vertex)out.push(i);});return out;}
function continuationEdge(m,incomingIndex,vertex,visited){
  const edges=m.edges(),incoming=edges[incomingIndex];if(!incoming)return null;
  const candidates=incidentEdgeIndices(m,vertex).filter(i=>i!==incomingIndex&&!visited.has(i));
  if(!candidates.length)return null;if(candidates.length===1)return candidates[0];
  const incomingFaces=new Set(realFaces(m,incoming));
  const opposite=candidates.filter(i=>realFaces(m,edges[i]).every(fi=>!incomingFaces.has(fi)));
  return opposite.length===1?opposite[0]:null;
}
function traceDirection(m,seedIndex,startVertex,visited){
  const edges=m.edges(),out=[];let incoming=seedIndex,vertex=startVertex;
  for(let guard=0;guard<edges.length+1;guard++){
    const next=continuationEdge(m,incoming,vertex,visited);if(next===null)break;
    const edge=edges[next];if(!edge)break;visited.add(next);out.push(next);vertex=edge.a===vertex?edge.b:edge.a;incoming=next;
  }
  return out;
}
function traceLoop(m,seedIndex){
  const seed=m.edges()[seedIndex];if(!seed)return null;
  const visited=new Set([seedIndex]),fromA=traceDirection(m,seedIndex,seed.a,visited),fromB=traceDirection(m,seedIndex,seed.b,visited);
  const result=[...fromA.reverse(),seedIndex,...fromB];return result.length>1?result:null;
}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

// Multi-seed Loop Select. Single-seed clicks remain owned by select-loop.js so
// Loop Slide setup and native Loop button behaviour are unchanged.
loopButton?.addEventListener('click',event=>{
  if(mode()!=='edge')return;
  const seeds=ids();if(seeds.length<=1)return;
  const m=mesh();if(!m)return;
  event.preventDefault();event.stopImmediatePropagation();
  const loops=[],seen=new Set();let rejected=0;
  for(const seed of seeds){
    const loop=traceLoop(m,seed);if(!loop){rejected++;continue;}
    const signature=[...loop].sort((a,b)=>a-b).join(',');if(seen.has(signature))continue;seen.add(signature);loops.push(loop);
  }
  if(!loops.length){if(status)status.textContent='Loop Select • no unambiguous loops from selected edge seeds';return;}
  const merged=[...new Set(loops.flat())];bridge()?.set?.('edge',merged);render();
  if(status)status.textContent=`Loop Select • ${loops.length} loop${loops.length===1?'':'s'} • ${merged.length} edges${rejected?` • ${rejected} rejected`:''}`;
  queueMicrotask(sync);
},true);

const tracked=new Map([[growButton,'Grow'],[shrinkButton,'Shrink'],[connectedButton,'Connected'],[angleButton,'Angle'],[normalButton,'Normal']].filter(([b])=>b));
for(const [button,label] of tracked){
  button.addEventListener('click',()=>{
    const before=ids().length,currentMode=mode();
    queueMicrotask(()=>{
      const after=ids().length;
      if(!status)return;
      if(after===before)status.textContent=`Selection ${label} • ${after} ${currentMode}${after===1?'':'s'} • no change`;
      else status.textContent=`Selection ${label} • ${before} → ${after} ${currentMode}${after===1?'':'s'}`;
      sync();
    });
  });
}

function sync(){
  const currentMode=mode(),count=ids().length,has=count>0;
  if(growButton)growButton.disabled=!has||currentMode==='object';
  if(shrinkButton)shrinkButton.disabled=!has||currentMode==='object';
  if(connectedButton)connectedButton.disabled=!has||currentMode==='object';
  if(angleButton)angleButton.disabled=!has||currentMode!=='face';
  if(normalButton)normalButton.disabled=!has||currentMode!=='face';
}

// Do not sync on every modelling pointer-up. Face/Extrude/Inset gestures generate
// their own pointer lifecycle and native Loop/Ring owners must not be repainted by
// this adjunct during those gestures.
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
window.addEventListener('boxlab-bridge-state',sync);
setTimeout(sync,0);

globalThis.__boxlabSelectionWorkflowPolish={version:'0.36.18.31'};
