import fs from 'node:fs';
export function edgePaintHitRuntime({bridge,legacy=false,input=null}={}){
 const source=fs.readFileSync(new URL(legacy?'../fixtures/performance/edge-paint-hit-1144.mjs':'../../src/edge-paint-select.js',import.meta.url),'utf8'),start=legacy?0:source.indexOf('function hitIndices('),end=legacy?source.length:source.indexOf('function addHits(',start),text=source.slice(start,end).replace('export function','function');
 const scope={__boxlabSelectionInput:input};
 const compile=new Function('selection','globalThis',`let paintDepth='visible';${text};return{hit:hitIndices,setDepth:value=>paintDepth=value};`);
 return compile(()=>bridge,scope);
}
