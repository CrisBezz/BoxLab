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
  if(picked.some(e=>!e||e.loose||(e.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<m.faces.length).length!==1))return null;
  const adjacency=new Map();
  for(const e of picked){if(!adjacency.has(e.a))adjacency.set(e.a,[]);if(!adjacency.has(e.b))adjacency.set(e.b,[]);adjacency.get(e.a).push(e.b);adjacency.get(e.b).push(e.a);}
  if(adjacency.size!==ids.length||[...adjacency.values()].some(n=>n.length!==2))return null;
  const start=adjacency.keys().next().value,cycle=[start];let prev=null,current=start;
  while(cycle.length<=ids.length){const options=adjacency.get(current).filter(v=>v!==prev);const next=options[0];if(next===undefined)return null;if(next===start)break;if(cycle.includes(next))return null;cycle.push(next);prev=current;current=next;}
  if(cycle.length!==ids.length)return null;
  const a=cycle[0],b=cycle[1],seed=picked.find(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a));
  const fi=seed?.faces?.find(x=>Number.isInteger(x)&&x>=0&&x<m.faces.length),neighbor=Number.isInteger(fi)?m.faces[fi]:null;
  if(!neighbor)return null;
  let forward=false;for(let i=0;i<neighbor.length;i++)if(neighbor[i]===a&&neighbor[(i+1)%neighbor.length]===b){forward=true;break;}
  if(forward)cycle.reverse();
  return cycle;
}
function sync(){if(button)button.disabled=!boundaryCycle(mesh(),selectedEdges());}
button?.addEventListener('click',event=>{
  const m=mesh(),ids=selectedEdges(),cycle=boundaryCycle(m,ids),history=globalThis.__boxlabHistory;
  if(!m||!cycle||!history)return;
  event.preventDefault();event.stopImmediatePropagation();
  const before=m.clone();m.faces.push(cycle);const faceIndex=m.faces.length-1;history.push(before);
  if(multiToggle?.checked){multiToggle.checked=false;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
  document.querySelector('#selectionModes button[data-mode="face"]')?.click();
  setTimeout(()=>{bridge()?.set?.('face',[faceIndex]);document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));if(status)status.textContent=`Fill created • ${cycle.length}-edge boundary • new face selected`;sync();},0);
},true);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('click',()=>queueMicrotask(sync),true);
sync();
