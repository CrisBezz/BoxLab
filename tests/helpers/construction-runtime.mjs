import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../../src/mesh.js';
import {vertexRuntime} from './vertex-extrude-runtime.mjs';

// Controlled scene/session boundaries; actual mesh History and object-history bridge.
export function constructionRuntime(sourceTransform=source=>source){
 const f=vertexRuntime(undefined,[],{sourceTransform}),c=f.context;
 f.setMode('object');
 const tools=f.fields.get('#viewportWrap');
 f.fields.set('.mode-tools[data-mode-tools="object"]',tools);
 const original={id:'a',name:'Cube',mesh:f.state.mesh};
 let next=0,session=null,saved=0,selected=null;
 const manager={activeId:'a',objects:[original],
  addMesh(mesh,name){const object={id:'construction'+(++next),name,mesh};this.objects.push(object);this.activeId=object.id;f.state.mesh=mesh;return object;},
  saveActive(){saved++;}};
 c.__boxlabObjectManager=manager;
 c.__boxlabToolSession={begin:entry=>{session=entry;return true;},end:id=>{if(session?.id===id)session=null;},isActive:id=>!!session&&(!id||session.id===id)};
 const captureScene=()=>({objects:[...manager.objects],activeId:manager.activeId,mesh:f.state.mesh});
 const restoreScene=s=>{manager.objects=[...s.objects];manager.activeId=s.activeId;f.state.mesh=s.mesh;};
 Object.assign(c,{captureScene,restoreScene,currentMode:()=> 'object',historyBridgeInstalled:false});
 const historySource=fs.readFileSync(new URL('../../src/object-management.js',import.meta.url),'utf8');
 const begin=historySource.indexOf('function installHistoryBridge(){'),end=historySource.indexOf('function initialize(){',begin);
 if(begin<0||end<begin)throw new Error('Missing authoritative object history bridge');
 vm.runInContext(historySource.slice(begin,end)+'installHistoryBridge();',c);
 c.__boxlabObjectSelection={single:id=>{selected=id;}};
 Object.assign(c,{EditableMesh});
 return {...f,manager,tools,session:()=>session,saved:()=>saved,selected:()=>selected};
}
