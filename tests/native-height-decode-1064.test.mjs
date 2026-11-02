import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {deflateSync} from 'node:zlib';
import {crc} from './helpers/png-inspect.mjs';
import {decodeNomadHeightPNG} from '../src/nomad-scalar-png.js';
import {nativeHeightSources,measureNativeHeight} from '../src/nomad-height-benchmark.js';
function chunk(name,bytes=Buffer.alloc(0)){const a=Buffer.alloc(bytes.length+12);a.writeUInt32BE(bytes.length);a.write(name,4);Buffer.from(bytes).copy(a,8);a.writeUInt32BE(crc(a.subarray(4,-4)),a.length-4);return a;}
function png({width=4,height=5,depth=16,type=0,interlace=0,filters=[0,1,2,3,4],values,raw:given,extra=[],split=false}={}){
 const header=Buffer.alloc(13);header.writeUInt32BE(width);header.writeUInt32BE(height,4);header[8]=depth;header[9]=type;header[12]=interlace;
 const bpp=depth/8,stride=width*bpp,rows=Buffer.alloc((stride+1)*height);let prev=Buffer.alloc(stride);
 for(let y=0;y<height;y++){
  const row=Buffer.alloc(stride),filter=filters[y%filters.length];rows[y*(stride+1)]=filter;
  for(let x=0;x<width;x++){const v=values?.[y*width+x]??((y*9137+x*241+17)%(2**depth));if(bpp===2)row.writeUInt16BE(v,x*2);else row[x]=v;}
  for(let x=0;x<stride;x++){const a=x>=bpp?row[x-bpp]:0,b=prev[x],c=x>=bpp?prev[x-bpp]:0,p=a+b-c,dist=[Math.abs(p-a),Math.abs(p-b),Math.abs(p-c)],paeth=dist[0]<=dist[1]&&dist[0]<=dist[2]?a:dist[1]<=dist[2]?b:c,predict=filter===0?0:filter===1?a:filter===2?b:filter===3?Math.floor((a+b)/2):paeth;rows[y*(stride+1)+x+1]=(row[x]-predict)&255;}prev=row;
 }
 const compressed=deflateSync(given??rows),parts=split?[chunk('IDAT',compressed.subarray(0,3)),chunk('IDAT',compressed.subarray(3))]:[chunk('IDAT',compressed)];
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),...extra,...parts,chunk('IEND')]);
}
function nom(image,settings={factorDisplacement:.3,displacementMid:.5,displacementWorld:false}){
 const doc={materials:[{...settings,textures:{displacement:{index:0,name:'Height',projection:'triplanar'}}}],images:[{type:'image/png',offset:0,length:image.length}]},json=Buffer.from(JSON.stringify(doc)),header=Buffer.alloc(32);header.writeUInt32LE(0x6d26a524);header.writeUInt32LE(7,4);header.writeBigUInt64LE(BigInt(json.length),16);header.writeBigUInt64LE(BigInt(image.length),24);return Buffer.concat([header,json,image]);
}
test('1064 raw height decoder preserves every 8/16-bit sample, all five byte filters, split IDAT, byte offsets and source row order',async()=>{
 for(const depth of [8,16]){
  const values=Array.from({length:20},(_,i)=>(i*9137+17)%2**depth),data=png({depth,values,split:true,extra:[chunk('gAMA',Buffer.from([0,0,177,143]))]}),padded=Buffer.concat([Buffer.alloc(7),data,Buffer.alloc(3)]),source=padded.subarray(7,-3),before=Buffer.from(source),result=await decodeNomadHeightPNG(source);
  assert.deepEqual([...result.samples],values);assert.equal(result.bitDepth,depth);assert.equal(result.min,Math.min(...values));assert.equal(result.max,Math.max(...values));assert.equal(result.knownArrayBytes,(4*depth/8+1)*5+20*depth/8);assert.deepEqual(source,before);
 }
 const sample=JSON.parse(fs.readFileSync(new URL('./fixtures/nomad-displacement-888.json',import.meta.url))),result=await decodeNomadHeightPNG(Buffer.from(sample.synthetic16BitPNG,'base64'));
 assert.deepEqual([...result.samples],[0,16384,32768,65535]);assert.equal(result.nonZeroLowBytes,1);
});
test('1064 real 2048-square decode retains low-byte precision within bounded arrays',async()=>{
 const values=new Uint16Array(2048*2048).fill(258),data=png({width:2048,height:2048,values,filters:[0]}),result=await decodeNomadHeightPNG(data);
 assert.equal(result.samples.length,values.length);assert.equal(result.min,258);assert.equal(result.max,258);assert.equal(result.nonZeroLowBytes,values.length);assert.equal(result.knownArrayBytes,2*values.byteLength+2048);
});
test('1064 rejects malformed, overbudget, transparent/animated/interlaced and non-grayscale sources with bounded inflation',async()=>{
 const good=png(),badCRC=Buffer.from(good);badCRC[badCRC.length-1]^=1;
 for(const data of [new Uint8Array(),new Uint8Array(8*1024*1024+1),good.subarray(0,-1),Buffer.concat([good,Buffer.from([0])]),badCRC,png({type:2}),png({depth:4}),png({interlace:1}),png({extra:[chunk('acTL',Buffer.alloc(8))]}),png({extra:[chunk('tRNS',Buffer.alloc(2))]}),png({extra:[chunk('WHAT')]}),png({raw:Buffer.alloc(2000)}),png({raw:Buffer.alloc(1)}),png({raw:Buffer.from([5,...new Array(8).fill(0),...new Array(36).fill(0)])})])await assert.rejects(decodeNomadHeightPNG(data),/height PNG|decompress|invalid/i);
 const huge=Buffer.from(good);huge.writeUInt32BE(2049,16);huge.writeUInt32BE(crc(huge.subarray(12,29)),29);await assert.rejects(decodeNomadHeightPNG(huge),/dimensions/);
 const header=good.subarray(8,33),idat=good.subarray(33,-12);await assert.rejects(decodeNomadHeightPNG(Buffer.concat([good.subarray(0,8),header,idat,chunk('tEXt'),idat,chunk('IEND')])),/non-contiguous/);
 const saved=globalThis.DecompressionStream;try{delete globalThis.DecompressionStream;await assert.rejects(decodeNomadHeightPNG(good),/unavailable/);}finally{globalThis.DecompressionStream=saved;}
});
test('1064 native benchmark uses explicit material/image owner without geometry or UV requirements, retains bytes/settings and refuses guesses',async()=>{
 const image=png(),bytes=nom(image),before=Buffer.from(bytes),sources=nativeHeightSources(bytes);
 assert.equal(sources.length,1);assert.deepEqual(Buffer.from(sources[0].data),image);assert.deepEqual(sources[0].settings,{strength:.3,midpoint:.5,worldSpace:false,projection:'triplanar'});assert.deepEqual(bytes,before);
 await decodeNomadHeightPNG(sources[0].data);
 const raw=Buffer.from(bytes),at=raw.indexOf('"displacement":')+1;raw.write('XXXXXXXXXXXX',at);assert.throws(()=>nativeHeightSources(raw),/No explicit/);
 assert.throws(()=>nativeHeightSources(new Uint8Array()),/NOM/);
});
test('1064 timing yields between actual decodes, drops sample arrays and stops after a slow stage without declaring full preview ready',async()=>{
 const bytes=png(),before=Buffer.from(bytes);let time=0,frames=0;
 const result=await measureNativeHeight(bytes,{nextFrame:async()=>{frames++;},now:()=>{time+=10;return time;}});
 assert.equal(frames,3);assert.equal(result.decodeBudgetPassed,true);assert.equal(result.stoppedEarly,false);assert.equal(result.samples,undefined);assert.deepEqual(result.decodeSamplesMs,[10,10,10]);assert.deepEqual(bytes,before);
 await assert.rejects(measureNativeHeight(bytes,{nextFrame:async()=>{},expectedSamples:[0]}),/precision check failed/);
 let calls=0;const slow=await measureNativeHeight(bytes,{nextFrame:async()=>{},now:()=>calls++%2?1201:0});assert.equal(slow.stoppedEarly,true);assert.equal(slow.decodeBudgetPassed,false);assert.equal(slow.decodeSamplesMs.length,1);
});
function ui(){
 const nodes=new Map(),make=()=>({value:'',hidden:false,disabled:false,files:[],children:[],handlers:{},addEventListener(type,fn){this.handlers[type]=fn;},append(n){this.children.push(n);},replaceChildren(){this.children=[];},focus(){this.focused=true;},select(){this.selected=true;}}),document={querySelector(id){if(!nodes.has(id))nodes.set(id,make());return nodes.get(id);},createElement:make},navigator={userAgent:'test device',clipboard:{writeText:async text=>{navigator.copied=text;}}};
 const context={document,navigator,Uint8Array,atob,Date,JSON,Error,Number,String,nativeHeightSources,measureNativeHeight:(data,options)=>measureNativeHeight(data,{...options,nextFrame:async()=>{}})};vm.createContext(context);vm.runInContext(fs.readFileSync(new URL('../src/native-height-benchmark-ui.js',import.meta.url),'utf8').replace(/^import .*\n/,''),context);
 return{n:id=>document.querySelector('#'+id),navigator};
}
test('1064 actual benchmark UI verifies sample, reads NOM without unwrap, selects/maps/copies and resets report on rejected input',async()=>{
 const {n,navigator}=ui();await n('sample').handlers.click();let result=JSON.parse(n('report').value);assert.equal(result.bitDepth,16);assert.equal(result.sampleOnly,true);assert.equal(result.precisionVerified,true);assert.equal(n('copy').disabled,false);assert.match(n('status').textContent,/tiny sample is not a performance result/);
 const bytes=nom(png());n('file').files=[{name:'Height.nom',size:bytes.length,arrayBuffer:async()=>bytes}];await n('file').handlers.change();assert.equal(n('source').children.length,1);assert.equal(n('run').disabled,false);assert.equal(n('report').value,'');await n('run').handlers.click();result=JSON.parse(n('report').value);assert.equal(result.sampleOnly,false);assert.equal(result.settings.projection,'triplanar');await n('copy').handlers.click();assert.equal(navigator.copied,n('report').value);
 navigator.clipboard.writeText=async()=>{throw Error('unavailable');};await n('copy').handlers.click();assert(n('report').selected);
 n('file').files=[{name:'huge.png',size:8*1024*1024+1,arrayBuffer:()=>assert.fail('must refuse before read')}];await n('file').handlers.change();assert.equal(n('run').disabled,true);assert.equal(n('copy').disabled,true);assert.equal(n('report').value,'');assert.match(n('status').textContent,/8 MiB/);
});
test('1064 benchmark reads canonical seven-map NOM export without reprojecting the triplanar displacement source',async()=>{
 const {nomadMapInspectionFixture}=await import('./helpers/nomad-map-inspection-fixture.mjs'),fixture=await nomadMapInspectionFixture(),before=Buffer.from(fixture.bytes),sources=nativeHeightSources(fixture.bytes);
 assert.equal(sources.length,1);assert.equal(sources[0].settings.projection,'triplanar');assert.equal((await decodeNomadHeightPNG(sources[0].data)).bitDepth,16);assert.deepEqual(Buffer.from(fixture.bytes),before);
});
test('1064 isolated page and app launcher use reviewed module pins without modifying preserved geometry benchmark',()=>{
 const page=fs.readFileSync(new URL('../docs/native-height-benchmark-1064.html',import.meta.url),'utf8'),shell=fs.readFileSync(new URL('../src/shell-comparison.js',import.meta.url),'utf8');
 assert.match(page,/No UV unwrap is needed/);assert.match(page,/not a hard interruption/);assert.match(page,/native-height-benchmark-ui\.js\?v=0\.36\.18\.1064/);assert.match(shell,/native-height-benchmark-1064\.html\?v=0\.36\.18\.1064/);
 assert(!page.includes('WebGLRenderer'));assert.match(page,/not total memory/);
});
