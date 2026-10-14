import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),adapter=fs.readFileSync(new URL('../src/loop-cut-commit.js',import.meta.url),'utf8');
const line=name=>{const i=main.indexOf('function '+name+'(');return main.slice(i,main.indexOf('\n',i));};
function runtime(count){
 const mesh=EditableMesh.cube(),history=new History(),before=mesh.clone();history.push(before);const cut=count===1?mesh.loopCut(0,.5):mesh.loopCuts(0,count),groups=cut.slideGroups||[cut.slideData],current=groups[0];mesh.loopSlide(current,.13);
 const vertices=new Set(current.map(i=>i.vertex)),edgeObjects=new Map(mesh.edges().map((e,i)=>[i,{userData:{cageMaterial:{color:{getHex:()=>vertices.has(e.a)&&vertices.has(e.b)?0xffe14a:0x62d8ff}}}}])),state={mesh,edgeObjects},slider={disabled:false};let selected=[],renders=0;
 const c={mesh,history,activeLoopSlides:groups,activeLoopSlide:current,directTool:'loopCut',drag:null,Map,Set,__boxlabBridgeState:state,__boxlabEdgeViewportSession:{loopActive:()=>true},__boxlabSelectionBridge:{set:(mode,ids)=>{selected=ids;}},document:{querySelector:q=>q==='#viewport'?{addEventListener(){}}:q==='#loopSlide'?slider:q==='#selectionStatus'?{}:q==='#loopCutBtn'?{classList:{contains:()=>true}}:{click(){throw Error('history replay');}}},renderMesh:()=>{renders++;state.edgeObjects=new Map();},setTimeout:fn=>fn(),queueMicrotask:fn=>fn()};
 vm.createContext(c);vm.runInContext(line('clearLoopSlide')+'\n globalThis.__boxlabMainDirectTool={busy:()=>!!drag,commitLoopCut:()=>{'+main.match(/commitLoopCut:\(\)=>\{([^\n]+)\},/)[1]+'}};\n'+adapter,c);
 return {c,mesh,history,before,state,slider,get selected(){return selected;},get renders(){return renders;}};
}
test('854 actual main and commit adapter finalise single and MultiLoop without replacing mesh, replaying history or losing placed cuts',()=>{
 for(const count of [1,5]){
  const r=runtime(count),placed=r.mesh.clone(),token=r.history.undoStack[0],undoCount=r.history.undoStack.length,redoCount=r.history.redoStack.length;
  assert.equal(r.c.__boxlabLoopCutCommit.pending(),true);assert.equal(r.c.__boxlabLoopCutCommit.commitCurrent(),true);assert.equal(r.state.mesh,r.mesh);assert.equal(r.history.undoStack.length,undoCount);assert.equal(r.history.undoStack[0],token);assert.equal(r.history.redoStack.length,redoCount);assert.equal(r.renders,1);assert(r.selected.length);assert.equal(r.c.activeLoopSlides.length,0);assert.equal(r.c.activeLoopSlide,null);assert.equal(r.slider.disabled,true);assert.deepEqual(r.mesh.vertices,placed.vertices);assert.deepEqual(r.mesh.faces,placed.faces);
  const undone=r.history.undo(r.mesh);assert.deepEqual(undone,r.before);assert.deepEqual(r.history.redo(undone),placed);
 }
});
test('854 native commit guards busy/no-stage calls and adapter does not report a rejected cleanup as success',()=>{
 const r=runtime(5);r.c.drag={};assert.equal(r.c.__boxlabLoopCutCommit.commitCurrent(),false);assert.equal(r.renders,0);assert.equal(r.c.activeLoopSlides.length,5);r.c.drag=null;
 r.c.activeLoopSlides=[];assert.equal(r.c.__boxlabLoopCutCommit.commitCurrent(),false);assert.equal(r.renders,0);assert.equal(r.slider.disabled,false);assert.equal(r.history.undoStack.length,1);
});
