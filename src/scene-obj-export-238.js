// BoxLab v0.36.18.238 — export all editable scene objects to one OBJ.
// Preserves BoxLab object boundaries with OBJ `o` records and correct global vertex offsets.
import {subdivide} from './subdivision.js?v=0.12';
import {applyMirror} from './mirror.js?v=0.12';

const VERSION='0.36.18.238';
const baseButton=document.querySelector('#exportBaseBtn');
const subdButton=document.querySelector('#exportSubdBtn');
const status=document.querySelector('#selectionStatus');

function manager(){return globalThis.__boxlabObjectManager||null;}
function fmt(value){return Number(Number(value).toFixed(6)).toString();}
function safeName(value,index){const clean=String(value||`Object ${index+1}`).trim().replace(/[\r\n]+/g,' ').replace(/\s+/g,' ');return clean||`Object ${index+1}`;}
function sceneObjects(){const m=manager();m?.saveActive?.();return(m?.objects||[]).filter(object=>object?.kind!=='reference'&&object?.mesh);}
function resolvedMesh(object,subd=false){
  let mesh=object.mesh?.clone?object.mesh.clone():object.mesh;if(!mesh)return null;
  if(subd)mesh=subdivide(mesh,Math.max(1,Math.min(4,Number(object.settings?.subdLevel||1))));
  return applyMirror(mesh,object.settings?.mirror||{x:false,y:false,z:false});
}
function sceneToOBJ(objects,subd=false){
  const lines=['# BoxLab scene OBJ export',`# BoxLab v${VERSION}`];let offset=0,exported=0;
  objects.forEach((object,index)=>{
    const mesh=resolvedMesh(object,subd);if(!mesh?.vertices?.length||!mesh?.faces?.length)return;
    lines.push(`o ${safeName(object.name,index)}`);
    mesh.vertices.forEach(v=>lines.push(`v ${fmt(v.x)} ${fmt(v.y)} ${fmt(v.z)}`));
    mesh.faces.forEach(face=>lines.push(`f ${face.map(i=>i+1+offset).join(' ')}`));
    offset+=mesh.vertices.length;exported++;
  });
  return{content:lines.join('\n')+'\n',exported,vertices:offset};
}
function download(content,filename){
  const blob=new Blob([content],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function handle(event){
  const target=event.target?.closest?.('#exportBaseBtn,#exportSubdBtn');if(!target)return;
  const objects=sceneObjects();if(!objects.length)return;
  event.preventDefault();event.stopImmediatePropagation();
  const subd=target===subdButton,result=sceneToOBJ(objects,subd),pageVersion=document.title.match(/BoxLab v([^\s]+)/)?.[1]||VERSION;
  download(result.content,`BoxLab-v${pageVersion}-${subd?'subd-scene':'base-scene'}.obj`);
  if(status)status.textContent=`OBJ export • ${result.exported} object${result.exported===1?'':'s'} • ${result.vertices} vertices`;
}

document.addEventListener('click',handle,true);

globalThis.__boxlabSceneOBJExport238={version:VERSION,sceneToOBJ};
