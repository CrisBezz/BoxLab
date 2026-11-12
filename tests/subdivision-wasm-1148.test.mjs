import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {loadSubdivisionWasm,wasmSubdivide,wasmSubdivisionStep,equalSubdivision,subdivisionSnapshot,compareSubdivision} from '../src/subdivision-wasm-lab.js';
const binary=()=>fs.readFile(new URL('../src/wasm/subdivision-step.wasm',import.meta.url));
const load=()=>loadSubdivisionWasm({fetcher:async()=>({ok:true,arrayBuffer:binary})});
function grid(side){const v=[],f=[];for(let z=0;z<=side;z++)for(let x=0;x<=side;x++)v.push([x/side,((x*17+z*13)%31)/31,z/side]);for(let z=0;z<side;z++)for(let x=0;x<side;x++){const a=z*(side+1)+x;f.push([a,a+1,a+side+2,a+side+1]);}return new EditableMesh(v,f);}
test('1148 actual WASM batch exactly matches authoritative subdivision across bounded grids, fractional geometry and levels',async()=>{
 const k=(await load()).exports;
 for(const side of [4,8,16])for(const level of [1,2,3]){const m=grid(side),before=subdivisionSnapshot(m),a=subdivide(m,level),b=wasmSubdivide(m,level,k).mesh;assert.ok(equalSubdivision(a,b),`${side}, level ${level}`);assert.deepEqual(subdivisionSnapshot(m),before);}
});
test('1148 exact boundary, n-gon, nonmanifold, isolated point, stable crease strengths and facegroup propagation',async()=>{
 const k=(await load()).exports;
 const sources=[new EditableMesh([[0,0,0],[1.1,0,.1],[1,1,.2],[0,1.7,0],[.4,1.5,.31],[9,8,7]],[[0,1,2,3],[3,2,4]],new Map([['0:1',.3]]),['Front','Back']),new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[0,-1,0],[0,0,1]],[[0,1,2],[1,0,3],[0,1,4]])];
 for(const count of [0,1,2,3,4,12]){
  const m=EditableMesh.cube();m.vertices.forEach((v,i)=>v.set(v.x*1.123+i*.017,v.y*.31+i*.111,v.z*2.7-i*.013));m.edges().slice(0,count).forEach((e,i)=>m.creases.set(m.edgeKey(e.a,e.b),[.17,.61,1.7,.61][i%4]));m.faceGroups=m.faces.map((_,i)=>'Group '+i);sources.push(m);
 }
 const ties=sources.at(-1).clone();ties.creases.clear();ties.edges().slice(0,2).forEach(e=>ties.creases.set(ties.edgeKey(e.a,e.b),.61));sources.push(ties);
 for(const m of sources)for(const level of [0,1,2]){const before=subdivisionSnapshot(m),a=subdivide(m,level),b=wasmSubdivide(m,level,k).mesh;assert.ok(equalSubdivision(a,b),JSON.stringify(before));assert.deepEqual(subdivisionSnapshot(m),before);const snapshot=subdivisionSnapshot(b);wasmSubdivisionStep(EditableMesh.cube(9),k);assert.deepEqual(subdivisionSnapshot(b),snapshot);}
});
test('1148 bounded safety, unavailable loader, cancellation and exact parity rejection retain production JS',async()=>{
 const k=(await load()).exports;
 const oversized=grid(65);oversized.clone=()=>{throw Error('Unsafe baseline clone');};await assert.rejects(compareSubdivision(oversized,3,{kernel:k}),/cap/);
 await assert.rejects(compareSubdivision(grid(4),4,{kernel:k}),/levels/);
 assert.throws(()=>wasmSubdivide(grid(16),4,k),/levels/);assert.throws(()=>wasmSubdivisionStep(grid(65),k),/cap/);
 assert.throws(()=>wasmSubdivisionStep(new EditableMesh([[NaN,0,0],[1,0,0],[0,1,0]],[[0,1,2]]),k),/coordinate/);
 assert.throws(()=>wasmSubdivisionStep(new EditableMesh([[0,0,0]],[[0,1,2]]),k),/index/);
 for(const options of [{wasm:null},{fetcher:async()=>({ok:false,status:404})},{fetcher:async()=>({ok:true,arrayBuffer:async()=>new Uint8Array([1]).buffer})}])assert.equal((await loadSubdivisionWasm(options)).available,false);
 await assert.rejects(compareSubdivision(grid(4),1,{kernel:k,cancelled:()=>true,yieldFrame:async()=>{}}),/Cancelled/);
 await assert.rejects(compareSubdivision(grid(4),1,{kernel:{...k,step(){}},yieldFrame:async()=>{}}),/parity/);
 const source=await fs.readFile(new URL('../src/main.js',import.meta.url),'utf8');assert.doesNotMatch(source,/subdivision-wasm-lab|wasmSubdivide/);
});
test('1148 complete matched comparison retains five raw pairs and bridge, memory and reconstruction stages',async()=>{
 const k=(await load()).exports,r=await compareSubdivision(grid(4),2,{kernel:k,yieldFrame:async()=>{}});
 const coarse=await compareSubdivision(grid(4),1,{kernel:k,yieldFrame:async()=>{},now:()=>0});assert.equal(coarse.decision,'INCONCLUSIVE');assert.equal(coarse.metrics.medianReductionPercent,null);
 assert.equal(r.samplesMs.js.length,5);assert.equal(r.samplesMs.wasm.length,5);assert.equal(r.orders[0][0],'js');assert.equal(r.orders[1][0],'wasm');assert.ok(r.correctness.passed);assert.equal(r.steps[0].length,2);assert.ok(r.steps[0][1].memory.committedBytes>=r.steps[0][1].memory.requiredBytes);assert.ok(r.steps[0][1].stages.reconstructMs>=0);
});
test('1148 human-readable WAT reproducibly builds checked-in kernel without runtime compiler',async()=>{
 const {default:factory}=await import('wabt'),w=await factory(),m=w.parseWat('subdivision-step.wat',await fs.readFile(new URL('../src/wasm/subdivision-step.wat',import.meta.url),'utf8'));
 try{m.resolveNames();m.validate();assert.deepEqual(Buffer.from(m.toBinary({canonicalize_lebs:true,write_debug_names:false}).buffer),await binary());}finally{m.destroy();}
});
test('1148 actual comparison page runs complete pairs, exports JSON and recovers from cancellation/unavailable WASM',async()=>{
 const vm=await import('node:vm'),THREE=await import('three'),{profileSubdivide}=await import('../src/subdivision.js');
 const page=await fs.readFile(new URL('../docs/subdivision-benchmark-1036.html',import.meta.url),'utf8');
 const script=page.match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/^\s*import .*?;\s*$/gm,'').replace(/const loadSubdivisionTrial=.*?;\n/, 'const loadSubdivisionTrial=async()=>trial;\n');
 class Element{constructor(){this.children=[];this.events={};}append(x){this.children.push(x);}replaceChildren(){this.children=[];}addEventListener(n,f){this.events[n]=f;}click(){return this.events.click?.();}}
 const elements=Object.fromEntries(['run','copy','cancel','download','progress','results','report','wasm'].map(x=>['#'+x,new Element()]));let bytes,onFrame=null;
 const context={THREE,EditableMesh,subdivide,profileSubdivide,performance,trial:{loadSubdivisionWasm:load,compareSubdivision},document:{querySelector:s=>elements[s],visibilityState:'visible',createElement:()=>new Element()},navigator:{userAgent:'test'},window:{devicePixelRatio:2},requestAnimationFrame:f=>{onFrame?.();f();},Blob:class{constructor(parts){bytes=JSON.parse(parts[0]);}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},setTimeout:f=>f()};
 vm.createContext(context);vm.runInContext(script,context);await elements['#wasm'].click();assert.equal(elements['#download'].disabled,false);elements['#download'].click();assert.equal(bytes.results.length,10);assert.equal(bytes.protocol,'subdivision-wasm-v1');assert.ok(bytes.results.every(x=>x.correctness.passed));assert.equal(bytes.decision,'LAB_ONLY');
 onFrame=()=>elements['#cancel'].click();await elements['#wasm'].click();assert.equal(elements['#download'].disabled,true);assert.equal(elements['#run'].disabled,false);assert.match(elements['#progress'].textContent,/Cancelled/);
 onFrame=null;context.trial.loadSubdivisionWasm=async()=>({available:false,reason:'offline'});await elements['#wasm'].click();assert.equal(elements['#download'].disabled,true);assert.match(elements['#progress'].textContent,/Production stays JavaScript/);
});
