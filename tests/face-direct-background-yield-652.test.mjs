import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {faceRuntime,snapshot} from './helpers/negative-extrude-runtime.mjs';
import {EditableMesh} from '../src/mesh.js';
const src=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const start=src.indexOf("if(!Number.isInteger(hit)){");
const end=src.indexOf("  const workingFaces=",start);
const block=src.slice(start,end);
const penStart=block.indexOf("if(event.pointerType==='pen'&&!synthetic){");
const penEnd=block.indexOf("    pendingBackgroundPress=",penStart);
const penBlock=block.slice(penStart,penEnd);

const checks=[
 ['pen background branch exists',penStart>=0],
 ['branch does not prevent default',!penBlock.includes('preventDefault')],
 ['branch does not stop propagation',!penBlock.includes('stopImmediatePropagation')&&!penBlock.includes('stopPropagation')],
 ['branch does not capture pointer',!penBlock.includes('setPointerCapture')],
 ['Face-hit path remains after background branch',src.includes('const workingFaces=synthetic&&selectionBefore.length')],
 ['published Face-direct reviewed cache pin',hasAssetReference(index,'multi-face-direct.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("face-direct-background-yield-652.test: "+name,()=>assert.equal(ok,true,name));

function runtime(tool){const m=EditableMesh.cube(),f=faceRuntime(m,[0]);f.owner.setTool(tool);f.context.__boxlabSelectionBridge.pick=()=>null;f.history.redoStack.push(m.clone());const canvas=f.elements.get('#viewport');let captures=0;canvas.setPointerCapture=()=>captures++;return{m,f,captures:()=>captures};}
for(const [name,verify] of [
 ['Pencil background retires the armed Face tool without capturing navigation',(m,f,captures)=>{const before=snapshot(m);const e=f.pointer('pointerdown',{pointerType:'pen',clientX:10000,clientY:10000});assert.equal(f.api.tool(),null);assert.equal(e.stopped,false);assert.equal(e.prevented,undefined);assert.equal(captures(),0);assert.deepEqual(f.selected(),[0]);assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);}],
 ['Pencil background clears latent Face and background presses before old releases',(m,f)=>{const before=snapshot(m);f.context.__boxlabSelectionBridge.pick=()=>({index:0});f.pointer('pointerdown',{pointerType:'pen',pointerId:1});assert.equal(vm.runInContext('pendingFacePress?.id',f.context),1);f.context.__boxlabSelectionBridge.pick=()=>null;f.pointer('pointerdown',{pointerType:'mouse',pointerId:2,clientX:10000,clientY:10000});assert.equal(vm.runInContext('pendingBackgroundPress?.id',f.context),2);const tool=f.api.tool();f.context.document.dispatchEvent({type:'pointerdown',target:{closest:()=>({id:tool+'Btn'})}});assert.equal(vm.runInContext('pendingSelection?.tool',f.context),tool);f.pointer('pointerdown',{pointerType:'pen',pointerId:3,clientX:10000,clientY:10000});assert.deepEqual(Array.from(vm.runInContext('[pendingBackgroundPress,pendingFacePress,pendingSelection]',f.context)),[null,null,null]);f.pointer('pointerup',{pointerId:1});f.pointer('pointerup',{pointerId:2});assert.deepEqual(f.selected(),[0]);assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);}],
 ['Face background yield publishes the released tool and preserves touch ownership',(m,f)=>{const logs=[];f.context.__boxlabGestureDebug={log:(stage,detail)=>logs.push({stage,detail})};const tool=f.api.tool();f.pointer('pointerdown',{pointerType:'touch',clientX:10000,clientY:10000});assert.equal(f.api.tool(),tool);assert.equal(f.events.filter(e=>e.detail?.reason==='background-navigation').length,0);f.pointer('pointerdown',{pointerType:'pen',pointerId:23,clientX:10000,clientY:10000});const event=f.events.find(e=>e.detail?.reason==='background-navigation');assert.equal(event?.type,'boxlab-direct-tool-exclusive');assert.equal(event.detail.tool,'none');assert.equal(logs.length,1);assert.equal(logs[0].stage,'FACE DIRECT BACKGROUND YIELD');assert.equal(logs[0].detail.tool,tool);assert.equal(logs[0].detail.pid,23);assert.equal(logs[0].detail.pointer,'pen');}]
])test('face-direct-background-yield-652.test: '+name,()=>{for(const tool of ['extrude','inset']){const {m,f,captures}=runtime(tool);verify(m,f,captures);}});
