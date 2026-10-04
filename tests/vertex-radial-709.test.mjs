import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
import {installLooseTopology} from '../src/loose-topology.js';
installLooseTopology(EditableMesh);
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
function fixture(){
 const fields=new Map(),microtasks=[],events=[];let ids=[],mode='vertex',locked=false;
 const el=()=>({style:{},disabled:false,checked:false,textContent:'',dataset:{},listeners:{},classList:{contains:()=>false,toggle(){}},getAttribute(){},setAttribute(){},removeAttribute(){},append(){},appendChild(){},addEventListener(t,f){this.listeners[t]=f;},dispatchEvent(){},click(){this.listeners.click?.();}});
 const document={createElement:el,querySelector:s=>s==='#app'?{classList:{contains:()=>locked}}:fields.get(s)||null,querySelectorAll:()=>[],addEventListener(){}};
 fields.set('[data-mode-tools="vertex"]',el());fields.set('#multiSelectToggle',el());fields.set('#selectionStatus',el());
 const history=new History(),mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]]),root={hidden:false},hub=[];
 const context={THREE,Set,Map,document,window:{addEventListener(){},dispatchEvent:e=>events.push(e)},Event:class{},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},setTimeout(){},queueMicrotask:f=>microtasks.push(f),__boxlabBridgeState:{mesh},__boxlabHistory:history,__boxlabSelectionBridge:{mode:()=>mode,indices:()=>ids,set:(m,next)=>{mode=m;ids=next;}},toolSectors:[],state:()=>({mesh}),currentMode:()=>mode,selectionAvailable:()=>ids.length>0,selectionKey:()=>mode+':'+ids.join(','),setHubState:(value,detail)=>hub.push([value,detail.reason]),root,gestureDebug(){},hubSuppressedKey:'',lastSelectionKey:'initial',suspendedFaceTool:false};
 vm.createContext(context);
 vm.runInContext(fs.readFileSync(new URL('../src/vertex-merge.js',import.meta.url),'utf8').replace(/^import .*;\n/,''),context);
 // Real owner creates the authoritative buttons; collect them by id.
 vm.runInContext("globalThis.__testButtons=[centerButton,firstButton];globalThis.__syncMerge=sync;",context);
 for(const b of context.__testButtons)fields.set('#'+b.id,b);
 const sector=(label,target)=>Object.assign(el(),{textContent:label,dataset:{toolTarget:target},closest:()=>({dataset:{ringMode:'vertex'}})});
 context.toolSectors=[sector('Merge Center','#mergeVerticesCenterBtn'),sector('Merge First','#mergeVerticesFirstBtn')];
 const a=gizmo.indexOf('function syncContextToolAvailability(){'),b=gizmo.indexOf('\nactivator?',a);
 vm.runInContext(gizmo.slice(a,b),context);
 const c=gizmo.indexOf('toolSectors.forEach(button=>{'),d=gizmo.indexOf('\ntoolButtons.forEach',c);
 vm.runInContext(gizmo.slice(c,d),context);
 return{mesh,history,root,hub,events,context,fields,ids:()=>Array.from(ids),setIds:next=>{ids=next;context.__syncMerge();},setLocked:v=>{locked=v;},setMode:v=>{mode=v;},click:i=>context.toolSectors[i].listeners.click({preventDefault(){},stopPropagation(){}}),flush:()=>{while(microtasks.length)microtasks.shift()();}};
}
test('Vertex Merge Center radial delegates real owner, keeps result selected/puck and one Undo/Redo',()=>{
 const f=fixture(),before=f.mesh.clone();f.setIds([0,1]);f.click(0);f.flush();
 assert.equal(f.mesh.vertices.length,3);assert.deepEqual(f.mesh.vertices[0].toArray(),[.5,0,0]);assert.deepEqual(f.ids(),[0]);assert.equal(f.history.undoStack.length,1);assert.equal(f.root.hidden,false);assert.equal(f.context.hubSuppressedKey,'');assert.equal(f.hub.at(-1)[1],'vertex-one-shot-complete');
 const undone=f.history.undo(f.mesh);assert.deepEqual(undone,before);assert.deepEqual(f.history.redo(undone).vertices,f.mesh.vertices);assert.equal(f.events.at(-1).detail.mode,'vertex');
});
test('Vertex Merge First radial preserves selection chronology rather than sorted IDs',()=>{
 const f=fixture();f.setIds([1]);f.setIds([0,1]);f.click(1);f.flush();assert.deepEqual(f.mesh.vertices[0].toArray(),[1,0,0]);assert.deepEqual(f.ids(),[0]);assert.equal(f.history.undoStack.length,1);assert.equal(f.root.hidden,false);
});
test('single vertex, unsafe selection and locked/reference radial cannot mutate or suppress puck',()=>{
 const f=fixture(),before=f.mesh.clone();f.setIds([0]);f.click(0);f.flush();assert.equal(f.context.toolSectors[0].disabled,true);
 f.setIds([0,1,2]);f.click(1);f.flush();assert.equal(f.context.toolSectors[1].disabled,true);
 f.setIds([0,1]);f.setLocked(true);f.click(0);f.flush();assert.equal(f.context.toolSectors[0].disabled,true);assert.equal(f.history.undoStack.length,0);assert.deepEqual(f.mesh,before);assert.equal(f.root.hidden,false);
});
test('wrong-mode Vertex ring cannot launch and existing Face/Edge sectors stay unchanged',()=>{
 const f=fixture();f.setIds([0,1]);f.setMode('face');f.click(0);f.flush();assert.equal(f.history.undoStack.length,0);
 for(const [mode,count] of [['face',24],['edge',8]]){const start=gizmo.indexOf('<div class="tg-tool-ring" data-ring-mode="'+mode+'"');const end=gizmo.indexOf('<div class="tg-tool-ring"',start+10);const ring=gizmo.slice(start,end);assert.equal((ring.match(/data-tool-target=/g)||[]).length,count);}
});
test('Vertex puck/transform centre opens active-tool ring with centred close and no selection proxies',()=>{
 assert.match(gizmo,/requested==='tools'&&!\['face','edge','vertex','object'\]\.includes\(mode\)/);assert.match(gizmo,/const next=\['face','edge','vertex','object'\]\.includes\(currentMode\(\)\)\?'tools':'closed'/);
 const start=gizmo.indexOf('<div class="tg-tool-ring" data-ring-mode="vertex"');const ring=gizmo.slice(start,gizmo.indexOf('<div class="tg-tool-ring"',start+10));assert.equal((ring.match(/data-tool-target=/g)||[]).length,13);assert.match(ring,/Close Vertex contextual tools/);assert.doesNotMatch(ring,/select|Grow|Shrink/);
});
