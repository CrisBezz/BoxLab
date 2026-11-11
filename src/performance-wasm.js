// Opt-in Performance Lab only. Production keeps EditableMesh.triangulatedGeometry.
import * as THREE from 'three';
import {denseFixture,meshFingerprint,latencyStats} from './performance-lab-core.js?v=0.36.18.1096';
export const WASM_URL=new URL('./wasm/body-pack.wasm?v=0.36.18.1146',import.meta.url);
export async function loadBodyWasm({fetcher=globalThis.fetch,wasm=globalThis.WebAssembly,now=()=>performance.now()}={}){
 const start=now();
 try{
  if(!wasm)throw Error('WebAssembly unavailable');
  const response=await fetcher(WASM_URL);if(!response.ok)throw Error(`WASM download HTTP ${response.status}`);
  const bytes=await response.arrayBuffer(),result=await wasm.instantiate(bytes,{});
  return {available:true,exports:result.instance.exports,binaryBytes:bytes.byteLength,initializationMs:now()-start};
 }catch(error){return {available:false,reason:error.message,initializationMs:now()-start};}
}
export function wasmBody(mesh,kernel,now=()=>performance.now()){
 const start=now();let triangles=0;
 for(const face of mesh.faces)triangles+=Math.max(0,face.length-2);
 const count=triangles*3,vertexBytes=mesh.vertices.length*24,indexBytes=count*4,outputBytes=count*12,required=vertexBytes+indexBytes+outputBytes;
 if(!Number.isSafeInteger(required)||required>16777216)throw Error('Lab WASM memory budget exceeded');
 const memory=kernel.memory;if(memory.buffer.byteLength<required)memory.grow(Math.ceil((required-memory.buffer.byteLength)/65536));
 const vertices=new Float64Array(memory.buffer,0,mesh.vertices.length*3),indices=new Uint32Array(memory.buffer,vertexBytes,count);
 for(let i=0;i<mesh.vertices.length;i++){const v=mesh.vertices[i];vertices[i*3]=v.x;vertices[i*3+1]=v.y;vertices[i*3+2]=v.z;}
 let offset=0;
 for(const face of mesh.faces)for(let i=1;i<face.length-1;i++)for(const index of [face[0],face[i],face[i+1]]){
  if(!Number.isInteger(index)||index<0||index>=mesh.vertices.length)throw Error('Invalid lab vertex index');
  indices[offset++]=index;
 }
 const packed=now();kernel.pack(vertexBytes,vertexBytes+indexBytes,count);const calculated=now();
 // Copy out: returned geometry must never alias retained linear memory.
 const positions=new Float32Array(new Float32Array(memory.buffer,vertexBytes+indexBytes,count*3));
 const copied=now(),geometry=new THREE.BufferGeometry();
 try{geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.computeVertexNormals();}
 catch(error){geometry.dispose();throw error;}
 return {geometry,totalMs:now()-start,stages:{packAllocateMs:packed-start,kernelMs:calculated-packed,copyBackMs:copied-calculated},requiredBytes:required,committedBytes:memory.buffer.byteLength};
}
function bytesEqual(a,b){
 if(a.byteLength!==b.byteLength)return false;
 const x=new Uint8Array(a.buffer,a.byteOffset,a.byteLength),y=new Uint8Array(b.buffer,b.byteOffset,b.byteLength);
 return x.every((v,i)=>v===y[i]);
}
export async function runWasmComparison({triangles=10000,release,environment={},load=loadBodyWasm,now=()=>performance.now(),yieldFrame=()=>new Promise(r=>setTimeout(r,0)),cancelled=()=>false,progress=()=>{}}={}){
 const check=()=>{if(cancelled())throw Error('Benchmark cancelled; no partial report saved');};
 check();const loaded=await load();check();
 if(!loaded.available)return {protocol:'wasm-body-v1',release,environment,decision:'UNAVAILABLE',fallback:'JavaScript remains active',reason:loaded.reason,initializationMs:loaded.initializationMs};
 const mesh=denseFixture(triangles),before=meshFingerprint(mesh),js=[],wasm=[],stages=[],orders=[];
 let memory=null;
 for(let i=0;i<9;i++){
  await yieldFrame();check();let a,b;
  const order=i%2?['wasm','js']:['js','wasm'];
  try{
   let elapsed;
   for(const path of order){if(path==='js'){const start=now();a=mesh.triangulatedGeometry();elapsed=now()-start;}else b=wasmBody(mesh,loaded.exports,now);}
   for(const name of ['position','normal'])if(!bytesEqual(a.getAttribute(name).array,b.geometry.getAttribute(name).array))throw Error(`JS/WASM ${name} parity failed`);
   if(i>=2){js.push(elapsed);wasm.push(b.totalMs);stages.push(b.stages);orders.push(order);}
   memory={renderAttributeBytes:a.getAttribute('position').array.byteLength+a.getAttribute('normal').array.byteLength,wasmCommittedBytes:b.committedBytes,wasmRequiredBytes:b.requiredBytes};
  }finally{a?.dispose();b?.geometry.dispose();}
  progress(i+1,9);
 }
 check();if(meshFingerprint(mesh)!==before)throw Error('Benchmark fixture mutated');
 const jsStats=latencyStats(js),wasmStats=latencyStats(wasm),reduction=100*(jsStats.medianMs-wasmStats.medianMs)/jsStats.medianMs;
 return {schemaVersion:1,protocol:'wasm-body-v1',release,timestamp:new Date().toISOString(),environment,fixture:{triangles,hash:before},warmup:2,repeats:7,orders,
  samplesMs:{js,wasm},metrics:{js:jsStats,wasm:wasmStats,medianReductionPercent:reduction},stages,
  initialization:{binaryBytes:loaded.binaryBytes,milliseconds:loaded.initializationMs,scope:'Fetch (browser cache may apply), compile and instantiate; excluded from warm samples'},
  correctness:{passed:true,scope:'Byte-exact positions and normals every pair; source unchanged'},memory:{...memory,scope:'Extra retained WASM linear memory plus independently owned output arrays. Excludes JS mesh, engine heap, GPU and total Safari RAM'},
  decision:reduction>=25?'REVIEW':reduction>=10?'CONDITIONAL':'FAIL',
  notes:'Lab only. >=25% complete CPU body construction gain is review eligible; 10–24% conditional; <10% reject. Memory and target iPad gates still required. Includes fresh input conversion/allocation, copies, kernel, independent output and original Three normals. Excludes scene rebuild, cage, GPU, gestures and editable capacity. No production migration.'};
}
