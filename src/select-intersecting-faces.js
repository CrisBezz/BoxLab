import {faceIntersection,epsilonForMeshes} from './boolean-intersections.js?v=0.36.18.209';

// BoxLab v0.36.18.209 — face intersection inspection backed by the Boolean geometry kernel.
const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');
function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');button.id='selectIntersectingFacesBtn';button.type='button';button.textContent='Face Intersections';button.disabled=true;button.style.cssText='width:100%;min-width:0;padding:5px 4px;font-size:10px';
function place(){
  if(button.isConnected)return true;
  const crossing=document.querySelector('#selectSelfIntersectingFacesBtn'),row=crossing?.parentElement;
  if(row){row.style.gridTemplateColumns='repeat(4,minmax(0,1fr))';row.appendChild(button);row.querySelectorAll('button').forEach(b=>{b.style.minWidth='0';b.style.padding='5px 3px';b.style.fontSize='9px';});return true;}
  if(faceTools){const host=document.createElement('div');host.className='outliner-actions';host.style.cssText='grid-template-columns:1fr;margin-top:4px';host.appendChild(button);faceTools.appendChild(host);return true;}
  return false;
}
function sharesVertex(a,b){const s=new Set(a);return b.some(v=>s.has(v));}
function inspect(m){
  if(!m)return{indices:[],pairs:[],count:0,pairCount:0,segmentCount:0,pointCount:0,coplanarCount:0};
  const faces=m.faces||[],eps=epsilonForMeshes(m,m),hit=new Set(),pairs=[];let segmentCount=0,pointCount=0,coplanarCount=0;
  for(let i=0;i<faces.length-1;i++)for(let j=i+1;j<faces.length;j++){
    if(!Array.isArray(faces[i])||!Array.isArray(faces[j])||sharesVertex(faces[i],faces[j]))continue;
    const result=faceIntersection(m,faces[i],m,faces[j],{eps});if(!result.intersects)continue;
    hit.add(i);hit.add(j);segmentCount+=result.segments.length;pointCount+=result.points.length;if(result.coplanar)coplanarCount++;
    pairs.push({faces:[i,j],segments:result.segments,points:result.points,coplanar:result.coplanar});
  }
  const indices=[...hit].sort((a,b)=>a-b);return{indices,pairs,count:indices.length,pairCount:pairs.length,segmentCount,pointCount,coplanarCount,eps};
}
function apply(){
  const m=mesh();if(!m)return;const info=inspect(m);const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{
    if(multiToggle){const wanted=info.indices.length>1;if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}}
    bridge()?.set?.('face',info.indices);render();
    if(status)status.textContent=info.count?`Face Intersections • ${info.pairCount} pair${info.pairCount===1?'':'s'} • ${info.segmentCount} crossing segment${info.segmentCount===1?'':'s'}${info.coplanarCount?` • ${info.coplanarCount} coplanar`:''}`:'Topology check • 0 inter-face intersections';
  });
}
function sync(){place();const m=mesh();button.disabled=!m;button.title=m?'Find separate face intersections using Boolean segment geometry':'No editable mesh';}
button.addEventListener('click',apply);window.addEventListener('boxlab-bridge-state',sync);document.addEventListener('pointerup',()=>queueMicrotask(sync),true);[0,40,120,300,700,1000].forEach(delay=>setTimeout(sync,delay));
globalThis.__boxlabSelectIntersectingFaces={version:'0.36.18.209',inspect,apply,sync};
