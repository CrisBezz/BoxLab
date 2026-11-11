import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {EditableMesh} from '../src/mesh.js';
import {loadBodyWasm,wasmBody,runWasmComparison} from '../src/performance-wasm.js';
const binary=()=>fs.readFile(new URL('../src/wasm/body-pack.wasm',import.meta.url));
const load=()=>loadBodyWasm({fetcher:async()=>({ok:true,arrayBuffer:binary})});
test('1146 real checked-in WASM gives exact fan positions/normals and independent owned outputs',async()=>{
 const k=await load();assert.equal(k.available,true);assert.ok(k.binaryBytes>0);
 for(const mesh of [EditableMesh.cube(),new EditableMesh([[0,0,0],[1/3,0,0],[0,2,0],[0,0,3]],[[0,1,2,3],[],[1],[2,3],[0,0,0]])]){
  const source=JSON.stringify(mesh),a=mesh.triangulatedGeometry(),b=wasmBody(mesh,k.exports).geometry;
  for(const name of ['position','normal'])assert.deepEqual(b.getAttribute(name).array,a.getAttribute(name).array);
  const copy=b.getAttribute('position').array.slice();wasmBody(EditableMesh.cube(9),k.exports).geometry.dispose();assert.deepEqual(b.getAttribute('position').array,copy);assert.equal(JSON.stringify(mesh),source);
  a.dispose();b.dispose();
 }
 assert.throws(()=>wasmBody(new EditableMesh([[0,0,0]],[[0,1,0]]),k.exports),/Invalid/);
});
test('1146 module failure is explicit JS fallback; no app globals or production routing',async()=>{
 for(const options of [{wasm:null},{fetcher:async()=>({ok:false,status:404})},{fetcher:async()=>({ok:true,arrayBuffer:async()=>new Uint8Array([1,2]).buffer})}])assert.equal((await loadBodyWasm(options)).available,false);
 const report=await runWasmComparison({load:async()=>({available:false,reason:'offline'})});assert.equal(report.decision,'UNAVAILABLE');assert.match(report.fallback,/JavaScript/);
 const main=await fs.readFile(new URL('../src/main.js',import.meta.url),'utf8');assert.doesNotMatch(main,/performance-wasm|wasmBody/);
});
test('1146 matched alternating real JS/WASM comparison keeps seven samples, complete cost and memory overhead',async()=>{
 const report=await runWasmComparison({load,yieldFrame:async()=>{}});
 assert.equal(report.correctness.passed,true);assert.equal(report.samplesMs.js.length,7);assert.equal(report.samplesMs.wasm.length,7);assert.equal(report.orders[0][0],'js');assert.equal(report.orders[1][0],'wasm');assert.ok(report.memory.wasmCommittedBytes>=report.memory.wasmRequiredBytes);assert.ok(report.initialization.binaryBytes>0);assert.ok(['FAIL','CONDITIONAL','REVIEW'].includes(report.decision));
 let stop=false;await assert.rejects(runWasmComparison({load,yieldFrame:async()=>{stop=true;},cancelled:()=>stop}),/cancelled/);
 const bad=await load();bad.exports.pack(0,0,0);await assert.rejects(runWasmComparison({load:async()=>({...bad,exports:{...bad.exports,pack(){}}}),yieldFrame:async()=>{}}),/parity/);
});
test('1146 WAT source reproducibly builds the published binary without runtime compiler dependency',async()=>{
 const {default:factory}=await import('wabt'),wabt=await factory(),source=await fs.readFile(new URL('../src/wasm/body-pack.wat',import.meta.url),'utf8'),module=wabt.parseWat('body-pack.wat',source);
 try{module.resolveNames();module.validate();assert.deepEqual(Buffer.from(module.toBinary({canonicalize_lebs:true,write_debug_names:false}).buffer),await binary());}finally{module.destroy();}
});
test('1146 actual comparison UI exports failure honestly, blocks baseline replacement and recovers controls',async()=>{
 const vm=await import('node:vm');
 class Element{constructor(){this.children=[];this.style={};this.events={};this.isConnected=true;this.value='10000';}append(...x){this.children.push(...x);}setAttribute(){}addEventListener(n,f){this.events[n]=f;}click(){return this.events.click?.();}}
 const panel=new Element();let exported;
 const context={LAB_SIZES:[10000],document:{createElement:()=>new Element(),querySelector:()=>({dataset:{releaseVersion:'test'}}),visibilityState:'visible'},navigator:{userAgent:'test'},devicePixelRatio:2,innerWidth:1000,innerHeight:700,setTimeout:f=>f(),Blob:class{constructor(parts){exported=JSON.parse(parts[0]);}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},comparison:async()=>({decision:'FAIL',release:'test',metrics:{js:{medianMs:1},wasm:{medianMs:2},medianReductionPercent:-100},memory:{wasmCommittedBytes:65536}})};
 vm.createContext(context);
 const source=(await fs.readFile(new URL('../src/performance-lab-ui.js',import.meta.url),'utf8')).replace(/^import[^\n]*\n/,'').replace(/const loadWasmLab=.*?;\n/, 'const loadWasmLab=async()=>({runWasmComparison:comparison});\n').replace('export function','function');
 vm.runInContext(source+'\nthis.install=installPerformanceLab;',context);context.install(panel,{snapshot:()=>({})});
 const children=panel.children[0].children,button=label=>children.find(x=>x.textContent===label),compare=button('Compare JS / WASM'),save=button('Download JSON');
 await compare.click();assert.match(children.at(-1).textContent,/FAIL — lab only/);assert.equal(button('Keep as baseline').disabled,true);assert.equal(compare.disabled,false);save.click();assert.equal(exported.decision,'FAIL');
 context.comparison=async()=>{throw Error('cancelled');};await compare.click();assert.equal(save.disabled,true);assert.equal(compare.disabled,false);assert.equal(children.at(-1).textContent,'cancelled');
});
