import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {grid,cageHarness} from './helpers/cage-group-profile.mjs';
const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),frozen=fs.readFileSync(new URL('./fixtures/performance/cage-selection-1137.js',import.meta.url),'utf8').split('\n').find(s=>s.startsWith('function addCage('));
const old=source.replace(/^function addCage\([^\n]+/m,frozen),experimental=fs.readFileSync(new URL('./fixtures/performance/cage-selection-1138.js',import.meta.url),'utf8').split('\n').find(s=>s.startsWith('function addCage(')),candidate=source.replace(/^function addCage\([^\n]+/m,experimental);
const snap=m=>JSON.stringify({v:m.vertices.map(v=>v.toArray()),f:m.faces,c:[...m.creases],g:m.faceGroups});
function pair(options){const a=cageHarness({...options,mesh:options.mesh.clone(),componentSelection:structuredClone(options.componentSelection),mainSource:old}),b=cageHarness({...options,mesh:options.mesh.clone(),componentSelection:structuredClone(options.componentSelection),mainSource:candidate});return{a,b,dispose(){a.dispose();b.dispose();}};}
test('historical unshipped1138 candidate: cage membership snapshot keeps exact proxies/batches/order/visibility, original selection semantics and history sync',()=>{
 const mesh=grid(6),before=snap(mesh);mesh.creases.set('0:1',1);const unchanged=snap(mesh);
 const selections=[null,{type:'vertex',index:3,indices:[0,3,8,3,-1,NaN]},{type:'edge',index:4,indices:[1,4,9,1,-1,NaN]},{type:'vertex',index:2,indices:[]},{type:'edge',index:2},{type:'face',index:1,indices:[1,3]},{type:'object',index:0}];
 for(const mode of ['vertex','edge','face','object'])for(const componentSelection of selections){const saved=JSON.stringify(componentSelection),r=pair({mesh,mode,componentSelection});try{r.a.build();r.b.build();assert.deepEqual(r.b.signature(),r.a.signature());assert.deepEqual(r.b.counts(),r.a.counts(),'original Multi save/history observers retained');assert.equal(JSON.stringify(componentSelection),saved);assert.equal(snap(mesh),unchanged);}finally{r.dispose();}}
 assert.notEqual(before,unchanged,'fixture includes an authored crease');
});
test('historical unshipped1138 candidate: dense Edge/Vertex reconstruction reduces selection-array materializations from every proxy to one',()=>{
 for(const mode of ['edge','vertex']){const mesh=grid(24),count=mode==='edge'?mesh.edges().length:mesh.vertices.length,indices=Array.from({length:Math.floor(count*.75)},(_,i)=>i),r=pair({mesh,mode,componentSelection:{type:mode,index:indices.at(-1),indices}}),calls=[];
 try{for(const h of [r.a,r.b]){let n=0,entries=0;const read=h.c.selectionIndices;h.c.selectionIndices=function(...args){const ids=read(...args);n++;entries+=ids.length;return ids;};h.build();calls.push({n,entries});}assert.equal(calls[0].n,count);assert.equal(calls[1].n,1);assert.equal(calls[0].entries,count*indices.length);assert.equal(calls[1].entries,indices.length);assert.deepEqual(r.b.signature(),r.a.signature());}finally{r.dispose();}}
});
test('historical unshipped1138 candidate: membership is fresh after in-place selection edits, replacement and mode changes in the same reconstruction owner',()=>{
 const r=pair({mesh:grid(6),mode:'vertex',componentSelection:{type:'vertex',index:1,indices:[1,2]}});
 try{for(const step of [0,1,2,3]){for(const h of [r.a,r.b]){if(step)h.c.clearGroup(h.root);if(step===1){h.c.selection.indices.splice(0,2,3,4,8);h.c.selection.index=8;}if(step===2){h.c.selection={type:'edge',index:2,indices:[2,5]};h.c.selectionMode='edge';}if(step===3){h.c.selection=null;h.c.selectionMode='face';}h.build();}assert.deepEqual(r.b.signature(),r.a.signature(),'fresh snapshot at step '+step);assert.deepEqual(r.b.counts(),r.a.counts());}}finally{r.dispose();}
});
test('historical unshipped1138 candidate: accepted group/hidden/solo visibility and Face/Object non-component paths remain unchanged',()=>{
 for(const options of [{group:true},{hidden:true},{soloId:2},{group:true,hidden:true}])for(const mode of ['face','object','edge','vertex']){const r=pair({...options,mesh:grid(3),mode,componentSelection:mode==='object'?{type:'object'}:{type:mode,index:1,indices:[1,2]}});try{r.a.build();r.b.build();assert.deepEqual(r.b.signature(),r.a.signature());assert.deepEqual(r.b.counts(),r.a.counts());}finally{r.dispose();}}
});
