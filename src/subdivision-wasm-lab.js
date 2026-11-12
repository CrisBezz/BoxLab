// Lab-only batch port. Production remains src/subdivision.js; no live route or UV path.
import {EditableMesh} from './mesh.js';
import {Vector3} from 'three';
import {subdivide} from './subdivision.js?v=0.36.18.1147';
import {latencyStats} from './performance-lab-core.js?v=0.36.18.1096';
export const SUBDIVISION_WASM_URL=new URL('./wasm/subdivision-step.wasm?v=0.36.18.1148',import.meta.url);
const MAX_FACES=16384,MAX_BYTES=16*1024*1024;
export async function loadSubdivisionWasm({fetcher=globalThis.fetch,wasm=globalThis.WebAssembly,now=()=>performance.now()}={}){
 const start=now();try{
  if(!wasm)throw Error('WebAssembly unavailable');const r=await fetcher(SUBDIVISION_WASM_URL);if(!r.ok)throw Error(`WASM HTTP ${r.status}`);
  const bytes=await r.arrayBuffer(),module=await wasm.instantiate(bytes,{});
  return {available:true,exports:module.instance.exports,binaryBytes:bytes.byteLength,initializationMs:now()-start};
 }catch(e){return {available:false,reason:e.message,initializationMs:now()-start};}
}
const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
function csr(lists){const offsets=[0],indices=[];for(const list of lists){for(const i of list)indices.push(i);offsets.push(indices.length);}return {offsets,indices};}
export function wasmSubdivisionStep(mesh,kernel,now=()=>performance.now()){
 const start=now(),nv=mesh.vertices.length,nf=mesh.faces.length;
 if(nv>20000||nf>MAX_FACES)throw Error('Lab source size cap exceeded');
 let corners=0;for(const f of mesh.faces){if(f.length<3)throw Error('Lab requires polygon faces');corners+=f.length;}
 if(corners>MAX_FACES)throw Error('Lab output face cap exceeded');
 const edges=mesh.edges(),ne=edges.length,ve=Array.from({length:nv},()=>[]),vf=Array.from({length:nv},()=>[]),edgeIds=new Map(),edgeData=[];
 for(const v of mesh.vertices)if(!Number.isFinite(v.x)||!Number.isFinite(v.y)||!Number.isFinite(v.z))throw Error('Invalid lab coordinate');
 edges.forEach((e,i)=>{const w=mesh.creases.get(key(e.a,e.b))||0;if(!Number.isFinite(w))throw Error('Invalid crease');edgeIds.set(key(e.a,e.b),i);ve[e.a]?.push(i);ve[e.b]?.push(i);edgeData.push(e.a,e.b,e.faces.length,e.faces[0]??0,e.faces[1]??0,w);});
 const faceEdges=[];
 mesh.faces.forEach((face,fi)=>face.forEach((vi,i)=>{if(!Number.isInteger(vi)||vi<0||vi>=nv)throw Error('Invalid vertex index');vf[vi].push(fi);faceEdges.push(edgeIds.get(key(vi,face[(i+1)%face.length])));}));
 const fcsr=csr(mesh.faces),vecsr=csr(ve),vfcsr=csr(vf),arrays=[];let size=0;
 const reserve=(Type,data)=>{size=Math.ceil(size/8)*8;const pointer=size;size+=(typeof data==='number'?data:data.length)*Type.BYTES_PER_ELEMENT;arrays.push({Type,data,pointer});return pointer;};
 const v=reserve(Float64Array,nv*3),fo=reserve(Uint32Array,fcsr.offsets),fi=reserve(Uint32Array,fcsr.indices),e=reserve(Float64Array,edgeData),veo=reserve(Uint32Array,vecsr.offsets),vei=reserve(Uint32Array,vecsr.indices),vfo=reserve(Uint32Array,vfcsr.offsets),vfi=reserve(Uint32Array,vfcsr.indices),fe=reserve(Uint32Array,faceEdges),out=reserve(Float64Array,(nv+ne+nf)*3),q=reserve(Uint32Array,corners*4);
 if(size>MAX_BYTES)throw Error('Lab WASM memory budget exceeded');const memory=kernel.memory;
 if(memory.buffer.byteLength<size)memory.grow(Math.ceil((size-memory.buffer.byteLength)/65536));
 for(const a of arrays)if(typeof a.data!=='number')new a.Type(memory.buffer,a.pointer,a.data.length).set(a.data);
 // Write coordinates once into their final input span; no growable JS staging array.
 const inputPositions=new Float64Array(memory.buffer,v,nv*3);
 for(let i=0;i<nv;i++){const p=mesh.vertices[i],offset=i*3;inputPositions[offset]=p.x;inputPositions[offset+1]=p.y;inputPositions[offset+2]=p.z;}
 const packed=now();kernel.step(nv,nf,ne,v,fo,fi,e,veo,vei,vfo,vfi,fe,out,q);const computed=now();
 const positions=new Float64Array(memory.buffer,out,(nv+ne+nf)*3),quads=new Uint32Array(memory.buffer,q,corners*4),faces=[],groups=[],creases=new Map();
 for(let i=0;i<quads.length;i+=4)faces.push([quads[i],quads[i+1],quads[i+2],quads[i+3]]);
 mesh.faces.forEach((face,fi)=>{for(let i=0;i<face.length;i++)groups.push(mesh.faceGroups?.[fi]??null);});
 edges.forEach((edge,i)=>{const w=mesh.creases.get(key(edge.a,edge.b))||0;if(w<=0)return;const ep=nv+i;creases.set(key(edge.a,ep),w);creases.set(key(ep,edge.b),w);});
 // Keep constructor-owned face/crease/group normalization. Create independently owned
 // Vector3 values directly instead of triplet arrays that the constructor discards.
 const output=new EditableMesh([],faces,creases,groups);
 for(let i=0;i<positions.length;i+=3)output.vertices.push(new Vector3(positions[i],positions[i+1],positions[i+2]));
 const end=now();
 return {mesh:output,totalMs:end-start,stages:{prepareAndCopyMs:packed-start,kernelMs:computed-packed,reconstructMs:end-computed},memory:{requiredBytes:size,committedBytes:memory.buffer.byteLength},outputCoordinateBytes:output.vertices.length*24,outputIndexBytes:faces.length*16};
}
export function wasmSubdivide(mesh,levels,kernel,now=()=>performance.now()){
 const start=now();
 if(!Number.isInteger(levels)||levels<0||levels>3)throw Error('Lab levels must be 0–3');
 if(mesh.vertices.length>20000||mesh.faces.length>MAX_FACES)throw Error('Lab source size cap exceeded');
 const predicted=levels?mesh.faces.reduce((n,f)=>n+f.length,0)*4**(levels-1):mesh.faces.length;
 if(predicted>MAX_FACES)throw Error('Lab output face cap exceeded');
 let output=mesh.clone(),steps=[];
 for(let i=0;i<levels;i++){const step=wasmSubdivisionStep(output,kernel,now);steps.push({stages:step.stages,memory:step.memory,outputCoordinateBytes:step.outputCoordinateBytes,outputIndexBytes:step.outputIndexBytes});output=step.mesh;}
 return {mesh:output,totalMs:now()-start,steps};
}
export function subdivisionSnapshot(mesh){return {vertices:mesh.vertices.map(v=>[v.x,v.y,v.z]),faces:mesh.faces.map(f=>[...f]),creases:[...mesh.creases],faceGroups:[...mesh.faceGroups]};}
export function equalSubdivision(a,b){
 if(a.vertices.length!==b.vertices.length)return false;
 for(let i=0;i<a.vertices.length;i++)for(const c of ['x','y','z'])if(!Object.is(a.vertices[i][c],b.vertices[i][c]))return false;
 return JSON.stringify({faces:a.faces,creases:[...a.creases],groups:a.faceGroups})===JSON.stringify({faces:b.faces,creases:[...b.creases],groups:b.faceGroups});
}
export async function compareSubdivision(source,levels,{kernel,now=()=>performance.now(),yieldFrame=()=>new Promise(r=>setTimeout(r,0)),cancelled=()=>false,stopMs=1200}={}){
 if(!Number.isInteger(levels)||levels<1||levels>3)throw Error('Comparison levels must be 1–3');
 if(source.vertices.length>20000||source.faces.length>MAX_FACES||source.faces.reduce((n,f)=>n+f.length,0)*4**(levels-1)>MAX_FACES)throw Error('Comparison output/source cap exceeded');
 const before=JSON.stringify(subdivisionSnapshot(source)),js=[],wasm=[],stages=[],orders=[];
 for(let i=0;i<7;i++){
  await yieldFrame();if(cancelled())throw Error('Cancelled; no partial comparison saved');
  let a,b,elapsed;const order=i%2?['wasm','js']:['js','wasm'];
  for(const path of order){if(path==='js'){const start=now();a=subdivide(source,levels);elapsed=now()-start;}else b=wasmSubdivide(source,levels,kernel,now);if((path==='js'?elapsed:b.totalMs)>stopMs)throw Error('Stopped at 1200ms single-operation guard');}
  if(!equalSubdivision(a,b.mesh))throw Error('JS/WASM exact subdivision parity failed');
  if(i>=2){js.push(elapsed);wasm.push(b.totalMs);stages.push(b.steps);orders.push(order);}
 }
 if(cancelled())throw Error('Cancelled; no partial comparison saved');
 if(JSON.stringify(subdivisionSnapshot(source))!==before)throw Error('Fixture changed');
 const j=latencyStats(js),w=latencyStats(wasm),reduction=j.medianMs>0&&w.medianMs>0?100*(j.medianMs-w.medianMs)/j.medianMs:NaN;
 return {sourceFaces:source.faces.length,levels,outputFaces:source.faces.reduce((n,f)=>n+f.length,0)*4**(levels-1),warmup:2,repeats:5,orders,samplesMs:{js,wasm},metrics:{js:j,wasm:w,medianReductionPercent:Number.isFinite(reduction)?reduction:null},steps:stages,correctness:{passed:true,scope:'Exact coordinates/order/indices/creases/groups on every pair, source unchanged; no UV path'},decision:Number.isFinite(reduction)&&reduction>=25?'REVIEW':Number.isFinite(reduction)&&reduction>=10?'CONDITIONAL':Number.isFinite(reduction)?'FAIL':'INCONCLUSIVE'};
}
