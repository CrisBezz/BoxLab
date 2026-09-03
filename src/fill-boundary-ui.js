const button=document.querySelector('#fillFaceBtn');
const status=document.querySelector('#selectionStatus');
const multiToggle=document.querySelector('#multiSelectToggle');
function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?[...new Set(b.indices?.()||[])]:[...new Set(state()?.selectedEdges||[])];}
function boundaryCycle(m,ids){
  if(!m||ids.length<3)return null;
  const all=m.edges(),picked=ids.map(i=>all[i]);
  // A fill boundary may contain ordinary one-face boundary edges and/or
  // newly joined loose edges. Interior edges (2+ real faces) are not valid.
  if(picked.some(e=>{
    if(!e)return true;
    const realFaces=(e.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length);
    return e.loose?false:realFaces.length!==1;
  }))return null;
  const adjacency=new Map();
  for(const e of picked){if(!adjacency.has(e.a))adjacency.set(e.a,[]);if(!adjacency.has(e.b))adjacency.set(e.b,[]);adjacency.get(e.a).push(e.b);adjacency.get(e.b).push(e.a);}
  if(adjacency.size!==ids.length||[...adjacency.values()].some(n=>n.length!==2))return null;
  const start=adjacency.keys().next().value,cycle=[start];let prev=null,current=start;
  while(cycle.length<=ids.length){const options=adjacency.get(current).filter(v=>v!==prev);const next=options[0];if(next===undefined)return null;if(next===start)break;if(cycle.includes(next))return null;cycle.push(next);prev=current;current=next;}
  if(cycle.length!==ids.length)return null;
  // Prefer a real boundary edge to orient the new face opposite its neighbour.
  // If the loop is entirely loose, either winding is valid and we keep the cycle.
  let seed=null,neighbor=null;
  for(const edge of picked){
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
  setTimeout(()=>{bridge()?.set?.('face',[faceIndex]);document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));if(status)status.textContent=`Fill created • ${cycle.length}-edge boundary • new face selected`;sync();},0);
},true);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('click',()=>queueMicrotask(sync),true);
sync();
