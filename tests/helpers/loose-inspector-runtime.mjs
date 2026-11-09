import fs from 'node:fs';import vm from 'node:vm';
export function looseRuntime(mesh,markers,{legacy=false,manager=true}={}){
 const source=fs.readFileSync(new URL(legacy?'../fixtures/performance/loose-vertices-1114.js':'../../src/select-loose-vertices.js',import.meta.url),'utf8');
 const listeners=[],selected=[],nodes=[];let distanceChecks=0,objectReads=0;
 const el=()=>{const n={style:{},appendChild(){},addEventListener(type,fn){listeners.push({target:n,type,fn});},dispatchEvent(){},classList:{contains:()=>true},click(){}};nodes.push(n);return n;};
 const status=el(),toggle=el(),mode=el(),cage=el(),tools=el();toggle.checked=false;
 const document={querySelector:q=>q==='#selectionStatus'?status:q==='#multiSelectToggle'?toggle:q==='#cageToggle'?cage:q.includes('#selectionModes button')?mode:q==='[data-mode-tools="vertex"]'?tools:null,createElement:el,addEventListener(type,fn,capture){listeners.push({target:'document',type,fn,capture});}};
 const state={mesh,scene:{traverse:fn=>markers.forEach(marker=>fn({userData:{kind:'vertex',index:marker.index},position:marker}))}};
 const c={document,window:{addEventListener(type,fn){listeners.push({target:'window',type,fn});}},setTimeout(){},queueMicrotask:fn=>fn(),Event:class{},__boxlabBridgeState:state,__boxlabSelectionBridge:{set:(kind,ids)=>(selected.push({kind,ids:Array.from(ids)}),true)}};
 if(manager)c.__boxlabObjectManager={activeId:7,get objects(){objectReads++;return [{id:7,mesh:state.mesh}];}};
 vm.createContext(c);vm.runInContext(source,c);const distance=c.distanceSq;c.distanceSq=(a,b)=>{distanceChecks++;return distance(a,b);};
 return {api:c.__boxlabSelectLooseVertices,c,state,source,listeners,nodes,selected,status,counts:()=>({distanceChecks,objectReads}),resetCounts(){distanceChecks=0;objectReads=0;}};
}
export const plain=value=>JSON.parse(JSON.stringify(value));
