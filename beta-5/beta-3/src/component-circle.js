import {circleLoopInfo,circularizeLoop} from './component-circle-core.js?v=0.36.18.334';

const status=document.querySelector('#selectionStatus');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function selected(){return[...new Set(bridge()?.indices?.()||[])];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='componentCircleBtn';
button.type='button';
button.textContent='Circle';
button.style.cssText='min-width:0;width:100%';

function place(md=mode()){
  if(md==='vertex'){
    const owner=globalThis.__boxlabVertexToolLayout;
    if(owner?.sync?.())return true;
    const createFace=document.querySelector('#createFaceFromVerticesBtn');
    const row=createFace?.parentElement;
    if(!row)return false;
    row.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
    const bevel=document.querySelector('#vertexBevelBtn');
    const add=document.querySelector('#addVertexBtn');
    const build=document.querySelector('#buildEdgeBtn');
    const slide=document.querySelector('#vertexSlideBtn');
    const ordered=[bevel,add,build,slide,createFace,button].filter(Boolean);
    const current=[...row.children].filter(child=>ordered.includes(child));
    const stable=current.length===ordered.length&&ordered.every((item,index)=>current[index]===item);
    if(!stable)for(const item of ordered)row.appendChild(item);
    return true;
  }
  if(md==='edge'){
    const deleteEdge=document.querySelector('#deleteEdgeBtn');
    const row=deleteEdge?.parentElement;
    if(!row)return false;
    row.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
    if(button.parentElement!==row)deleteEdge.insertAdjacentElement('afterend',button);
    return true;
  }
  if(md==='face'){
    const poke=document.querySelector('#pokeFacesBtn');
    const row=poke?.parentElement;
    if(!row)return false;
    row.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
    if(button.parentElement!==row)row.appendChild(button);
    return true;
  }
  return false;
}

function info(){
  const m=mesh(),md=mode(),ids=selected();
  return{m,md,ids,loop:circleLoopInfo(m,md,ids)};
}

function apply(){
  const {m,md,ids,loop}=info(),history=globalThis.__boxlabHistory;
  if(!m||!history||!loop.ok)return false;
  const before=m.clone?.();if(!before)return false;
  const result=circularizeLoop(m,loop);if(!result)return false;
  history.push(before);
  bridge()?.set?.(md,ids);
  render();
  if(status)status.textContent=`Circle • ${result.count} verts • radius ${result.radius.toFixed(3)} • centre preserved`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  const {md,loop}=info();
  place(md);
  const supported=['vertex','edge','face'].includes(md);
  button.disabled=!supported||!loop.ok||!globalThis.__boxlabHistory;
  button.title=!supported
    ?'Circle works in Vertex, Edge or Face mode'
    :loop.ok
      ?`Regularize selected ${md} loop to an evenly spaced circle in its current working plane`
      :loop.reason;
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.querySelector('#selectionModes')?.addEventListener('click',()=>queueMicrotask(sync),true);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,60,180,500].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabComponentCircle={version:'0.36.18.341',apply,sync,info};
