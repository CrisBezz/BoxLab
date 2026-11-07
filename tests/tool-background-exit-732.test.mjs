import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
function fixture(globals={}){const handlers={},calls=[];const c={...globals,window:{addEventListener:(t,f)=>handlers[t]=f}};vm.createContext(c);vm.runInContext(read('tool-background-exit.js'),c);return{c,calls,tap:()=>handlers['boxlab-viewport-background-tap'](),active:()=>c.__boxlabToolBackgroundExit.active()};}
test('Background policy delegates idle sessions to their existing exit owners exactly once',()=>{
 for(const [name,method] of [['__boxlabFaceAlignViewportSession','close'],['__boxlabFaceRepairViewportSession','close'],['__boxlabKnifeViewportSession','close'],['__boxlabFaceBridgeViewportSession','cancel'],['__boxlabBridgeViewportSession','close'],['__boxlabOffsetViewportSession','close'],['__boxlabCreaseViewportSession','close']]){
 let active=true,exits=0;const f=fixture({[name]:{active:()=>active,[method]:()=>{active=false;exits++;}}});assert.equal(f.active(),true);f.tap();f.tap();assert.equal(exits,1);assert.equal(f.active(),false);
 }
});
test('Existing Loop/Split, face values, Slide and Edge Bevel retain their semantic owners',()=>{
 for(const [name,method] of [['__boxlabEdgeViewportSession','active'],['__boxlabFaceValueViewportSession','active'],['__boxlabSlideViewportSession','active'],['__boxlabBevelViewportSession','edgeActive']]){let exits=0;const f=fixture({[name]:{[method]:()=>true,close:()=>exits++,cancel:()=>exits++}});assert.equal(f.active(),true);f.tap();assert.equal(exits,0);}
});
test('Vertex Add and background drawing/placement sessions keep empty-space input',()=>{
 let exits=0;const f=fixture({__boxlabVertexViewportSession:{active:()=>true,backgroundExitAllowed:()=>false,close:()=>exits++}});assert.equal(f.active(),false);f.tap();assert.equal(exits,0);
 for(const id of ['surface-transform','surface-insert','sweep','revolve-profile','symmetry-bisect']){const g=fixture({__boxlabToolSession:{current:()=>({id})}});assert.equal(g.active(),false);}
 f.c.__boxlabVertexViewportSession.backgroundExitAllowed=()=>true;f.tap();assert.equal(exits,1);
});
test('Idle object previews cancel through owners; active Array drags and modelling gestures are protected',()=>{
 for(const [id,name,method] of [['array','__boxlabLinearArray','cancel'],['shell','__boxlabShell','cancel'],['solidify','__boxlabSolidifyPreview','cancel'],['boolean','__boxlabBooleanToolSession','close'],['mesh-health','__boxlabMeshHealth','close']]){let exits=0;const owner={dragging:true,[method]:()=>exits++};const f=fixture({__boxlabToolSession:{current:()=>({id})},[name]:owner});f.tap();assert.equal(exits,0);owner.dragging=false;f.c.__boxlabMainDirectTool={busy:()=>true};f.tap();assert.equal(exits,0);f.c.__boxlabMainDirectTool.busy=()=>false;f.tap();assert.equal(exits,1);}
});
test('Blue Face Bevel cancels only while idle, and Array ghost hits belong to Array',()=>{
 let busy=true,cancels=0;const f=fixture({__boxlabDirectBevel:{faceActive:()=>true,busy:()=>busy,cancelFaces:()=>cancels++},__boxlabLinearArray:{active:true,ownsPoint:e=>e.clientX===123}});f.tap();assert.equal(cancels,0);busy=false;f.tap();assert.equal(cancels,1);assert.equal(f.c.__boxlabToolBackgroundExit.ownsPoint({clientX:123}),true);assert.equal(f.c.__boxlabToolBackgroundExit.ownsPoint({clientX:124}),false);assert.doesNotMatch(read('tool-background-exit.js'),/addEventListener\('pointer/);
});
test('Precision commits preserve per-tool values and Repeat resolves the requested operation',()=>{
 const p=read('precision-face.js'),r=read('repeat-face-previous.js'),events=[],c={input:{},readout:{},document:{dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,o){this.type=type;this.detail=o.detail;}},precision:()=>null};vm.createContext(c);
 vm.runInContext(p.slice(p.indexOf('function commitOperation('),p.indexOf('let suppressStatusCapture')),c);vm.runInContext(r.slice(r.indexOf('function lastOperation('),r.indexOf('function shortLabel(')),c);
 c.commitOperation('inset',.125,'geometry');c.commitOperation('extrude',.75,'geometry');assert.equal(c.lastOperation('inset').value,.125);assert.equal(c.lastOperation('extrude').value,.75);assert.equal(c.lastOperation().tool,'extrude');assert.equal(events.length,2);assert.equal(events[0].detail.value,.125);
 delete c.__boxlabLastFaceOperations.inset;assert.equal(c.lastOperation('inset'),null,'an extrude cannot enable Inset Repeat');
});

test('Actual Inset finish emits committed distance synchronously, stores Inset Repeat, and pushes one undo',()=>{
 const s=read('multi-face-direct.js'),p=read('precision-face.js');let history=0,selected;const c={pendingSelection:null,pendingFacePress:null,pendingBackgroundPress:null,drag:{id:5,tool:'inset',changed:true,preview:true,blocked:false,lastValue:.1875,faces:[2],hitFaceIndex:2,before:{},m:{}},releaseDirectPointer(){},clearRefVisual(){},clearSequentialPreference(){},updateStatus(){},render(){},syncButtons(){},bridge:()=>({set:(mode,ids)=>selected=ids}),input:{},readout:{},__boxlabHistory:{push:()=>history++},document:{dispatchEvent:event=>{if(event.type==='boxlab-face-direct-committed')c.commitOperation(event.detail.tool,event.detail.value,'geometry');}},CustomEvent:class{constructor(type,o){this.type=type;this.detail=o.detail;}}};vm.createContext(c);
 vm.runInContext(p.slice(p.indexOf('function commitOperation('),p.indexOf('let suppressStatusCapture')),c);
 vm.runInContext(s.slice(s.indexOf('function finish(event){'),s.indexOf("window.addEventListener('pointerup',finish")),c);
 c.finish({pointerId:5,type:'pointerup',preventDefault(){},stopImmediatePropagation(){}});assert.equal(history,1);assert.deepEqual([...selected],[2]);assert.equal(c.__boxlabLastFaceOperations.inset.value,.1875);assert.equal(c.drag,null);
 assert.match(s,/drag.lastValue=d;/,'actual Inset gesture retains the kernel-produced region distance');
});
