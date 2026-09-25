// BoxLab v0.36.18.444 — scene OBJ export polish with evaluated-mesh topology preflight.
// Preserves object boundaries and global vertex offsets while embedding compact Mesh Health metadata.
import {buildSceneOBJ} from './scene-obj-export-core.js?v=0.36.18.444';

const VERSION='0.36.18.444';
const baseButton=document.querySelector('#exportBaseBtn');
const subdButton=document.querySelector('#exportSubdBtn');
const status=document.querySelector('#selectionStatus');

function manager(){return globalThis.__boxlabObjectManager||null;}
function sceneObjects(){
  const m=manager();
  m?.saveActive?.();
  return(m?.objects||[]).filter(object=>object?.kind!=='reference'&&object?.mesh);
}
function download(content,filename){
  const blob=new Blob([content],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function sceneToOBJ(objects,subd=false){
  return buildSceneOBJ(objects,{subd,version:VERSION});
}
function handle(event){
  const target=event.target?.closest?.('#exportBaseBtn,#exportSubdBtn');if(!target)return;
  const objects=sceneObjects();if(!objects.length)return;
  event.preventDefault();event.stopImmediatePropagation();
  const subd=target===subdButton,pageVersion=document.title.match(/BoxLab v([^\s]+)/)?.[1]||VERSION;
  const result=buildSceneOBJ(objects,{subd,version:pageVersion});
  download(result.content,`BoxLab-v${pageVersion}-${subd?'subd-scene':'base-scene'}.obj`);
  if(status){
    const p=result.preflight;
    status.textContent=`OBJ export • ${result.exported} object${result.exported===1?'':'s'} • ${p.closed} closed clean • ${p.open} open clean • ${p.issues} issues`;
  }
}
document.addEventListener('click',handle,true);

globalThis.__boxlabSceneOBJExport238={version:VERSION,sceneToOBJ,buildSceneOBJ};
