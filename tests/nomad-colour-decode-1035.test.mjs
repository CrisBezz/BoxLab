import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {deflateSync} from 'node:zlib';
import * as THREE from 'three';
import {opaqueNomadColourPNG} from '../src/nomad-scalar-png.js';
import {createUVImageOverlay,decodeSurfaceImage} from '../src/uv-image-surface-preview.js';
import {nomadColourAlphaFixture} from './helpers/nomad-colour-alpha-fixture.mjs';
import {inspectPNG,crc} from './helpers/png-inspect.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
function chunk(name,data){const b=Buffer.alloc(data.length+12);b.writeUInt32BE(data.length);b.write(name,4);b.set(data,8);b.writeUInt32BE(crc(b.subarray(4,-4)),b.length-4);return b;}
function png({width=3,height=5,type=6,depth=8,filter,excess=false,trns=false}={}){
 const bpp=type===4?2:type===2?3:4,stride=width*bpp,rows=Buffer.alloc((stride+1)*height+(excess?1:0)),expected=[];let prev=new Uint8Array(stride);
 for(let y=0;y<height;y++){const row=Uint8Array.from({length:stride},(_,i)=>(i*23+y*17)%256),f=filter??y%5,at=y*(stride+1);rows[at]=f;
 for(let x=0;x<stride;x++){const a=x>=bpp?row[x-bpp]:0,b=prev[x],c=x>=bpp?prev[x-bpp]:0,p=a+b-c,d=[Math.abs(p-a),Math.abs(p-b),Math.abs(p-c)],pa=d[0]<=d[1]&&d[0]<=d[2]?a:d[1]<=d[2]?b:c;const pred=f===0?0:f===1?a:f===2?b:f===3?(a+b)>>>1:pa;rows[at+1+x]=(row[x]-pred)&255;}expected.push(row);prev=row;}
 const h=Buffer.alloc(13);h.writeUInt32BE(width);h.writeUInt32BE(height,4);h[8]=depth;h[9]=type;return {bytes:new Uint8Array(Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',h),chunk('sRGB',Buffer.from([0])),...(trns?[chunk('tRNS',Buffer.alloc(6))]:[]),chunk('IDAT',deflateSync(rows)),chunk('IEND',Buffer.alloc(0))])),expected};
}
test('1035 original failed fixture gets opaque browser input with exact hidden RGB, alpha ON keeps original RGBA and NOM bytes',async()=>{
 const {objects,template,bytes}=await nomadColourAlphaFixture(),old=Object.getOwnPropertyDescriptor(globalThis,'createImageBitmap'),seen=[];
 globalThis.createImageBitmap=async(blob,options)=>{const p=inspectPNG(new Uint8Array(await blob.arrayBuffer()));seen.push({p,options});return {width:128,height:128,close(){}};};
 try{
  const source=objects[2].glbPassthrough.images.at(-1).data,before=source.slice();
  await decodeSurfaceImage({data:source,mime:'image/png',ignoreColourAlpha:true});const opaque=seen.at(-1).p;
  for(let i=0;i<opaque.rgba.length;i+=4)assert.deepEqual([...opaque.rgba.subarray(i,i+4)],[55,175,220,255]);
  await decodeSurfaceImage({data:source,mime:'image/png',unpremultiplied:true});assert.deepEqual([...seen.at(-1).p.rgba.subarray(0,4)],[55,175,220,0]);assert.deepEqual(source,before);
  const o=objects[2],body=new THREE.Mesh(o.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),original=body.material;
  const overlay=createUVImageOverlay(body,o.mesh,o.glbPassthrough,glbOwnerRuntime().c.buildUVPreviewGeometry,new THREE.MeshBasicMaterial(),{lit:true});
  for(let i=0;i<100&&!overlay.visible;i++)await new Promise(r=>setTimeout(r,5));
  assert(overlay.visible);assert.equal(overlay.material.transparent,false);assert.deepEqual([...seen.at(-1).p.rgba.subarray(0,4)],[55,175,220,255]);overlay.userData.boxlabUVImageDispose();assert.equal(body.material,original);
  assert.deepEqual(buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab NOM colour alpha sample'}).bytes,bytes);
 }finally{old?Object.defineProperty(globalThis,'createImageBitmap',old):delete globalThis.createImageBitmap;}
});
test('1035 PNG byte filters recover original RGB before alpha replacement; grayscale alpha and tRNS are handled without canvas',async()=>{
 const {bytes,expected}=png(),out=inspectPNG(await opaqueNomadColourPNG(bytes));for(let y=0;y<5;y++)for(let x=0;x<3;x++)assert.deepEqual([...out.rgba.subarray((y*3+x)*4,(y*3+x+1)*4)],[...expected[y].subarray(x*4,x*4+3),255]);assert(out.chunks.includes('sRGB'));
 const gray=await opaqueNomadColourPNG(png({type:4}).bytes);assert.equal(gray[25],4); // native gray samples stay gray, alpha is in the second byte
 const rgb=png({type:2,trns:true}).bytes;assert(!inspectPNG(await opaqueNomadColourPNG(rgb)).chunks.includes('tRNS'));
 const opaque=png({type:2}).bytes;assert.equal(await opaqueNomadColourPNG(opaque),opaque);
});
test('1035 malformed/oversized/unsupported PNGs refuse before browser decode and bounded inflate rejects extra output',async()=>{
 const broken=png().bytes.slice();broken[45]^=1;
 for(const b of [broken,png({width:2049,height:1}).bytes,png({depth:16}).bytes,png({filter:5}).bytes,png({excess:true}).bytes,png().bytes.subarray(0,60)])await assert.rejects(opaqueNomadColourPNG(b));
 const original=new Uint8Array(fs.readFileSync(new URL('../docs/samples/NOM_COLOUR_ALPHA_1029.nom',import.meta.url)));assert(original.length>0);
});
