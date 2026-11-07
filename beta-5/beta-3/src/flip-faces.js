// BoxLab v0.36.18.90 — selected Face winding repair.
// Reverses only the winding order of selected Faces. Geometry and topology are unchanged.

const faceTools=document.querySelector('[data-mode-tools="face"]');
const extractButton=document.querySelector('#extractFacesBtn');
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedFaces(){
  const m=mesh(),b=bridge();
  if(!m||b?.mode?.()!=='face')return[];
  return[...new Set(b.indices?.()||[])].filter(i=>Number.isInteger(i)&&Array.isArray(m.faces?.[i])&&m.faces[i].length>=3);
}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const row=document.createElement('div');
row.id='flipFacesRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='flipFacesBtn';
button.type='button';
button.textContent='Flip Faces';
button.disabled=true;
button.title='Reverse winding of selected Faces';
button.style.width='100%';
button.style.minWidth='0';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const toolsRow=extractButton?.parentElement;
  if(toolsRow?.parentElement){toolsRow.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}

function apply(){
  const m=mesh(),ids=selectedFaces(),history=globalThis.__boxlabHistory;
  if(!m||!ids.length||!history)return false;

  history.push(m.clone());
  for(const fi of ids)m.faces[fi]=[...m.faces[fi]].reverse();
  m.edges?.();

  bridge()?.set?.('face',ids);
  render();
  if(status)status.textContent=`Flip Faces • ${ids.length} face${ids.length===1?'':'s'} winding reversed • selection preserved`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const count=selectedFaces().length;
  button.disabled=!count||!globalThis.__boxlabHistory;
  button.title=count
    ?`Reverse winding of ${count} selected Face${count===1?'':'s'}`
    :'Select one or more Faces to flip';
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.90';
  document.title='BoxLab v0.36.18.90';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabFlipFaces={version:'0.36.18.90',apply};
