import * as THREE from 'three';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../../src/mesh.js';
import {buildRevolveFromPoints} from '../../src/revolve-core.js';
import {vertexRuntime} from './vertex-extrude-runtime.mjs';

// Reuse controlled DOM/dispatch, real camera, mesh and History fixture. The
// manager, scene capture/restore and shared session boundary are adapters.
// Actual object-history bridge retains its WeakMap scene tags on history tokens.
export function revolveRuntime(sourceTransform=source=>source){
 const f=vertexRuntime(undefined,[],{sourceTransform}),c=f.context;
 f.setMode('object');
 const tools=f.fields.get('#viewportWrap');
 f.fields.set('.mode-tools[data-mode-tools="object"]',tools);
 const original={id:'a',name:'Cube',mesh:f.state.mesh};
 let next=0,session=null,saved=0,selected=null;
 const manager={activeId:'a',objects:[original],
  addMesh(mesh,name){const object={id:'revolve'+(++next),name,mesh};this.objects.push(object);this.activeId=object.id;f.state.mesh=mesh;return object;},
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
 Object.assign(c,{EditableMesh,buildRevolveFromPoints});
 f.load('revolve-profile.js');
 const owner=c.__boxlabRevolveProfile;
 const frame=()=>owner.rebuild();
 const pointer=(type,world,extra={})=>{const p=f.screen(world);return f.pointer(type,{clientX:p.x,clientY:p.y,...extra});};
 return {...f,owner,manager,frame,session:()=>session,saved:()=>saved,selected:()=>selected,
  launchRow:()=>tools.children.find(node=>node.className==='outliner-actions revolve-profile-launch-row'),
  add(){c.window.dispatchEvent(new c.CustomEvent('boxlab-add-revolve-profile'));frame();return manager.objects.at(-1);},
  tap(world,extra={}){pointer('pointerdown',world,extra);pointer('pointerup',world,extra);frame();},
  pointer};
}
