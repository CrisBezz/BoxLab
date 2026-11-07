import test from 'node:test';
import assert from 'node:assert/strict';
import {importResizedPaintImage,inspectPaintImage,capturePaintImageSource,PAINT_IMAGE_INPUT_MAX_BYTES} from '../src/paint-image-source.js';
function png(w,h,bytes=33){const a=new Uint8Array(bytes);a.set([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82]);const v=new DataView(a.buffer);v.setUint32(16,w);v.setUint32(20,h);return a;}
function jpeg(w,h){return new Uint8Array([255,216,255,192,0,11,8,h>>8,h&255,w>>8,w&255,1,1,17,0]);}
function fixture(w,h,{jpegInput=false,html=false,ignoreResize=false,failEncode=false,badOutput=false}={}){
 const scale=Math.min(1,1024/Math.max(w,h)),width=Math.max(1,Math.round(w*scale)),height=Math.max(1,Math.round(h*scale)),calls=[],surfaces=[],normalized=jpegInput?jpeg(width,height):png(width,height),pixels=new Uint8Array(width*height*4);pixels.set([220,30,70,jpegInput?255:128]);
 let closed=0;
 const decode=async(blob,options)=>{calls.push({bytes:new Uint8Array(await blob.arrayBuffer()),options});return {width:calls.length===1&&ignoreResize?w:width,height:calls.length===1&&ignoreResize?h:height,close(){closed++;}};};
 const canvas=()=>{const n=surfaces.length,s={width:0,height:0,getContext:()=>({drawImage(...args){s.draw=args;},getImageData:()=>({data:pixels})})};const encode=(type)=>{s.type=type;if(failEncode)return null;return new Blob([badOutput?png(1,1):normalized],{type});};if(html)s.toBlob=(cb,type)=>cb(encode(type));else s.convertToBlob=async({type})=>encode(type);surfaces.push(s);return s;};
 return {decode,canvas,calls,surfaces,pixels,normalized,get closed(){return closed;}};
}
test('1070 incoming landscape, portrait, square, odd and extreme-aspect images fit 1024 without enlarging or distorting',async()=>{
 for(const [w,h,expected]of [[4096,2048,[1024,512]],[1500,3000,[512,1024]],[2048,2048,[1024,1024]],[2001,1000,[1024,512]],[8192,1,[1024,1]]]){
  const f=fixture(w,h),out=await importResizedPaintImage(png(w,h),f);assert.deepEqual([out.width,out.height],expected);assert.equal(f.calls.length,2);assert.equal(f.calls[0].options.resizeWidth,expected[0]);assert.equal(f.calls[0].options.resizeHeight,expected[1]);assert.deepEqual(f.surfaces[0].draw.slice(1),[0,0,...expected]);assert.deepEqual(out.encoded,f.normalized);assert.equal(out.pixels[3],128);assert.deepEqual(capturePaintImageSource(out),out);assert.equal(f.closed,2);assert(f.surfaces.every(s=>s.width===1&&s.height===1));
 }
});
test('1070 original in-limit image bytes and pixels remain exact with only the original decoder',async()=>{
 for(const [w,h]of [[4,2],[1024,1],[1024,1024]]){const f=fixture(w,h),input=png(w,h),out=await importResizedPaintImage(input,f);assert.deepEqual(out.encoded,input);assert.deepEqual(out.pixels,f.pixels);assert.equal(f.calls.length,1);assert.equal(f.calls[0].options.resizeWidth,undefined);assert.equal(f.closed,1);}
});
test('1070 HTML canvas encoder and decoder ignoring resize still produce the bounded stored source',async()=>{
 const f=fixture(2000,4000,{html:true,ignoreResize:true}),out=await importResizedPaintImage(png(2000,4000),f);assert.deepEqual([out.width,out.height],[512,1024]);assert.equal(f.surfaces[0].draw[0].width,2000);assert.deepEqual(f.surfaces[0].draw.slice(1),[0,0,512,1024]);assert.equal(f.surfaces[0].type,'image/png');assert.equal(out.pixels[3],128);
});
test('1070 file buffer is captured before async decode and normalized stored pixels use the second decode',async()=>{
 const f=fixture(4096,2048),input=png(4096,2048),promise=importResizedPaintImage(input,f);input.fill(0);const out=await promise;assert.equal(f.calls[0].bytes[0],137);assert.deepEqual(out.pixels,f.pixels);assert.notEqual(out.pixels,f.pixels);assert.deepEqual(f.calls[1].bytes,f.normalized);
});
test('1070 input bounds refuse before decode; stored/alpha strict inspection still rejects oversized sources',async()=>{
 let called=0;for(const input of [png(8193,1),png(8192,8192),png(0,4),new Uint8Array(PAINT_IMAGE_INPUT_MAX_BYTES+1),new Uint8Array([1,2])])await assert.rejects(importResizedPaintImage(input,{decode:()=>called++}));assert.equal(called,0);assert.throws(()=>inspectPaintImage(png(1025,2)),/1024/);
});
test('1070 normalization failure releases bitmap and canvas before returning an error',async()=>{
 for(const options of [{html:true,failEncode:true},{badOutput:true}]){const f=fixture(2048,1024,options);await assert.rejects(importResizedPaintImage(png(2048,1024),f));assert.equal(f.closed,1);assert.equal(f.calls.length,1);assert.equal(f.surfaces[0].width,1);}
 const f=fixture(2048,1024);f.canvas=()=>({width:0,height:0,getContext:()=>null});await assert.rejects(importResizedPaintImage(png(2048,1024),f),/canvas/);assert.equal(f.closed,1);
});

test('1070 large JPEG is encoded as JPEG and the normalized encoding becomes the retained editable source',async()=>{
 const f=fixture(4032,3024,{jpegInput:true,html:true}),out=await importResizedPaintImage(jpeg(4032,3024),f);assert.deepEqual([out.width,out.height],[1024,768]);assert.equal(out.mime,'image/jpeg');assert.equal(f.surfaces[0].type,'image/jpeg');assert.deepEqual(out.encoded,f.normalized);assert.deepEqual(f.calls[1].bytes,f.normalized);assert.equal(out.pixels[3],255);
});
