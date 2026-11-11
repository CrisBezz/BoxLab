import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {subdivide,profileSubdivide} from '../src/subdivision.js';
const snapshot=m=>({vertices:m.vertices.map(v=>v.toArray()),faces:m.faces,creases:[...m.creases],groups:m.faceGroups});
test('1147 profiling uses exact production subdivision across boundaries, creases, groups and n-gons without mutation',()=>{
 const sources=[EditableMesh.cube(),new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0],[.5,1.5,.25]],[[0,1,2,3],[3,2,4]],new Map([['0:1',.5],['1:2',1]]),['A','B'])];
 for(const source of sources)for(const level of [0,1,2,3]){
  const before=structuredClone(snapshot(source)),records=[],time={n:0};
  const out=profileSubdivide(source,level,{now:()=>++time.n,record:(name,ms)=>records.push({name,ms})});
  assert.deepEqual(snapshot(out),snapshot(subdivide(source,level)));assert.deepEqual(snapshot(source),before);
  assert.notEqual(out,source);assert.equal(records.length,1+level*7);assert.ok(records.every(x=>x.ms===1));
  assert.deepEqual(records.slice(1,8).map(x=>x.name),level?['clone','edges','face-points','edge-points','adjacency','vertex-points','assembly']:[]);
 }
});
test('1147 actual browser benchmark runs guarded original owner, exports ordered five-sample phases and cancels safely',async()=>{
 const page=fs.readFileSync(new URL('../docs/subdivision-benchmark-1036.html',import.meta.url),'utf8');
 const source=page.match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/^\s*import .*?;\s*$/gm,'');
 class Element{constructor(){this.children=[];this.events={};this.value='';}append(x){this.children.push(x);}replaceChildren(){this.children=[];}addEventListener(n,f){this.events[n]=f;}click(){return this.events.click?.();}focus(){}select(){}}
 const elements=Object.fromEntries(['run','copy','cancel','download','progress','results','report'].map(x=>['#'+x,new Element()]));let bytes,clock=0,onFrame=null;
 const context={THREE:await import('three'),EditableMesh,subdivide,profileSubdivide,performance:{now:()=>++clock},document:{querySelector:s=>elements[s],visibilityState:'visible',createElement:()=>new Element()},navigator:{userAgent:'test',clipboard:{writeText:async()=>{}}},window:{devicePixelRatio:2},requestAnimationFrame:f=>{onFrame?.();f();},Blob:class{constructor(parts){bytes=JSON.parse(parts[0]);}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},setTimeout:f=>f()};
 vm.createContext(context);vm.runInContext(source,context);
 await elements['#run'].click();assert.equal(elements['#download'].disabled,false);elements['#download'].click();assert.equal(bytes.results.length,9);assert.equal(bytes.decision,'BASELINE_ONLY');assert.equal(bytes.timedSamplesPerCase,5);assert.ok(bytes.results.every(r=>r.samplesMs.length===5&&r.phaseSamplesMs.length===5&&r.correctness.outputMatchesProduction));
 onFrame=()=>elements['#cancel'].click();await elements['#run'].click();assert.equal(elements['#download'].disabled,true);assert.equal(elements['#run'].disabled,false);assert.match(elements['#progress'].textContent,/Cancelled/);
 onFrame=null;context.document.visibilityState='hidden';await elements['#run'].click();assert.match(elements['#progress'].textContent,/Cancelled/);
});
