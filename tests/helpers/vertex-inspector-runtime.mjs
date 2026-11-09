import fs from 'node:fs';
import vm from 'node:vm';
import {vertexFaceIncidence} from '../../src/vertex-face-incidence.js';
export const inspectors=[['vertex-valence','__boxlabSelectVertexValence'],['vertex-classification','__boxlabSelectVertexClassification'],['cleanable-verts','__boxlabSelectCleanableVerts']];
export function inspectorRuntime(name,mesh,legacy=false){
 const path=legacy?`../fixtures/performance/${name}-1113.js`:`../../src/select-${name}.js`;
 const source=fs.readFileSync(new URL(path,import.meta.url),'utf8');
 const nodes=[],listeners=[],selected=[],events=[];
 const element=()=>{const e={style:{},append(){},appendChild(){},addEventListener(type,fn){listeners.push({target:e,type,fn});},dispatchEvent(){events.push('render');},click(){},classList:{contains:()=>true}};nodes.push(e);return e;};
 const status=element(),toggle=element(),cage=element(),mode=element();toggle.checked=false;
 const doc={createElement:element,querySelector:q=>q==='#selectionStatus'?status:q==='#multiSelectToggle'?toggle:q==='#cageToggle'?cage:q.includes('#selectionModes button')?mode:null,querySelectorAll:()=>[],addEventListener(type,fn,capture){listeners.push({target:'document',type,fn,capture});}};
 const context={document:doc,window:{addEventListener(type,fn){listeners.push({target:'window',type,fn});}},Event:class{},queueMicrotask:fn=>fn(),setTimeout(){},vertexFaceIncidence,__boxlabBridgeState:{mesh},__boxlabSelectionBridge:{set:(kind,ids)=>selected.push({kind,ids:Array.from(ids)})}};
 vm.createContext(context);vm.runInContext(source.replace(/^import .*;\n/gm,''),context);
 const key=inspectors.find(([n])=>n===name)[1];
 return {api:context[key],source,context,nodes,listeners,selected,events,status};
}
export const plain=value=>JSON.parse(JSON.stringify(value));
