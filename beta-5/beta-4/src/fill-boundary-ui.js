const button=document.querySelector('#fillFaceBtn');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');
function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])]:[...new Set(state()?.selectedEdges||[])];}
function sameFaceLoop(face,cycle){
  if(!Array.isArray(face)||face.length!==cycle.length)return false;
  const n=cycle.length;
  for(let start=0;start<n;start++){
    if(face[start]!==cycle[0])continue;
    let forward=true,reverse=true;
    for(let i=0;i<n;i++){
      if(face[(start+i)%n]!==cycle[i])forward=false;
      if(face[(start-i+n*4)%n]!==cycle[i])reverse=false;
    }
    if(forward||reverse)return true;
  }
  return false;
}
function boundaryCycle(m,ids){
  if(!m||ids.length<3)return null;
  const all=m.edges(),picked=ids.map(i=>all[i]);
  // Fill is fundamentally a closed-loop operation. Do not reject a useful loop
  // merely because one of its edges already has two neighbouring faces: BoxLab
  // may deliberately be building/destructively repairing topology. The hard
  // requirements are that every selected edge exists and the selection forms one
  // simple closed cycle. Exact duplicate faces are rejected below.
  if(picked.some(e=>!e))return null;
  const adjacency=new Map();
  for(const e of picked){if(!adjacency.has(e.a))adjacency.set(e.a,[]);if(!adjacency.has(e.b))adjacency.set(e.b,[]);adjacency.get(e.a).push(e.b);adjacency.get(e.b).push(e.a);}
  if(adjacency.size!==ids.length||[...adjacency.values()].some(n=>n.length!==2))return null;
  const start=adjacency.keys().next().value,cycle=[start];let prev=null,current=start;
  while(cycle.length<=ids.length){const options=adjacency.get(current).filter(v=>v!==prev);const next=options[0];if(next===undefined)return null;if(next===start)break;if(cycle.includes(next))return null;cycle.push(next);prev=current;current=next;}
  if(cycle.length!==ids.length)return null;
  if(m.faces.some(face=>sameFaceLoop(face,cycle)))return null;
  // Prefer a true boundary edge to orient the new face opposite its neighbour.
  // If none exists, fall back to any selected edge with a real neighbour.
  let seed=null,neighbor=null;
  const candidates=[...picked].sort((a,b)=>{
    const ac=(a.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length).length;
    const bc=(b.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length).length;
    return Math.abs(ac-1)-Math.abs(bc-1);
  });
  for(const edge of candidates){
    const fi=edge?.faces?.find(x=>Number.isInteger(x)&&x>=0&&x<m.faces.length);
    if(Number.isInteger(fi)){seed=edge;neighbor=m.faces[fi];break;}
  }
  if(seed&&neighbor){
    const a=seed.a,b=seed.b;
    let cycleForward=false;
    for(let i=0;i<cycle.length;i++)if(cycle[i]===a&&cycle[(i+1)%cycle.length]===b){cycleForward=true;break;}
    let neighborForward=false;
    for(let i=0;i<neighbor.length;i++)if(neighbor[i]===a&&neighbor[(i+1)%neighbor.length]===b){neighborForward=true;break;}
    if(cycleForward===neighborForward)cycle.reverse();
  }
  return cycle;
}
function sync(){if(button)button.disabled=!boundaryCycle(mesh(),selectedEdges());}
button?.addEventListener('click',event=>{
  const m=mesh(),ids=selectedEdges(),cycle=boundaryCycle(m,ids),history=globalThis.__boxlabHistory;
  if(!m||!cycle||!history)return;
  event.preventDefault();event.stopImmediatePropagation();
  const before=m.clone();m.faces.push(cycle);m.edges();const faceIndex=m.faces.length-1;history.push(before);
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  document.querySelector('#selectionModes button[data-mode="face"]')?.click();
  setTimeout(()=>{bridge()?.set?.('face',[faceIndex]);document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));if(status)status.textContent=`Fill created • ${cycle.length}-edge loop • new face selected`;sync();},0);
},true);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('click',()=>queueMicrotask(sync),true);
sync();
