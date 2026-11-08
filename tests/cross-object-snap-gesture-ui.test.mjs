import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';

const source=fs.readFileSync(new URL('../src/cross-object-snap.js',import.meta.url),'utf8').replace(/^import \* as THREE from 'three';\s*$/m,'');

test('turning Geometry Snap off during a live preview cancels the guide and stays off after release',async()=>{
 const windowEvents=new Map(),docEvents=new Map(),nodes=new Map(),visuals=[];
 const canvas={getBoundingClientRect:()=>({left:0,top:0,width:400,height:400})};
 const snap={checked:true,addEventListener(type,fn){this.change=fn;}};
 const moveButton={dataset:{tool:'move'}},modeButton={dataset:{mode:'vertex'}};
 const cage={dispatchEvent(){}};
 const status={textContent:''};
 const camera=new THREE.PerspectiveCamera(60,1,.1,100);camera.position.set(0,0,5);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const makeMesh=()=>({vertices:[new THREE.Vector3(0,0,0),new THREE.Vector3(.2,0,0)],faces:[[0,1,0]],edges:()=>[{a:0,b:1}],clone:makeMesh});
 const mesh=makeMesh();let saves=0;
 const active={id:1,name:'Cube',visible:true,mesh};
 const document={body:{append(...els){visuals.push(...els);}},visibilityState:'visible',
  querySelector(q){return ({'#viewport':canvas,'#inferenceSnapToggle':snap,'#selectionModes button.active':modeButton,'#toolModes button.active':moveButton,'#cageToggle':cage,'#selectionStatus':status})[q]||null;},
  createElement(){return {style:{}};},addEventListener(type,fn){docEvents.set(type,fn);}};
 const context={THREE,document,window:{addEventListener(type,fn){windowEvents.set(type,fn);}},
  globalThis:null,Event:class{constructor(type,opts){this.type=type;this.opts=opts;}},
  __boxlabBridgeState:{mesh,camera},__boxlabObjectManager:{activeId:1,soloId:null,objects:[active],saveActive(){saves++;}},
  __boxlabSelectionBridge:{mode:()=> 'vertex',indices:()=>[0]},queueMicrotask,
  CustomEvent:class{constructor(type,opts){this.type=type;this.detail=opts?.detail;}}};context.globalThis=context;
 vm.createContext(context);vm.runInContext(source,context);
 const point=new THREE.Vector3(0,0,0).project(camera),event={target:canvas,isPrimary:true,pointerType:'pen',button:0,pointerId:7,clientX:(point.x*.5+.5)*400,clientY:(-point.y*.5+.5)*400};
 windowEvents.get('pointerdown')(event);windowEvents.get('pointermove')({...event,clientX:event.clientX+2});await Promise.resolve();await Promise.resolve();
 assert(visuals.some(node=>node.style.display==='block'),'snap guide is visible during the active preview');
 snap.checked=false;snap.change();
 assert.equal(snap.checked,false,"the user's off state is retained");
 assert(visuals.every(node=>node.style.display==='none'),'snap guide is immediately dismissed');
 windowEvents.get('pointerup')(event);await Promise.resolve();await Promise.resolve();
 assert.equal(snap.checked,false,'pointer release does not restore the stale on state');
 assert(visuals.every(node=>node.style.display==='none'));
 assert.equal(saves,1,'only the already previewed snap had one existing scene save');
});
