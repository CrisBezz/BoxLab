import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {padPaintPixels} from '../src/paint-filter-domain.js';
import {createPaintSurface,paintTexture} from '../src/paint-target.js';

function fixture(){
 const size=16,pixels=new Uint8Array(size*size*4).fill(255),uv=[];
 const chart=(x0,x1,y0,y1)=>{const a=[x0/16,y0/16],b=[(x1+1)/16,y0/16],c=[(x1+1)/16,(y1+1)/16],d=[x0/16,(y1+1)/16];uv.push(...a,...b,...c,...a,...c,...d);};chart(3,6,4,11);chart(9,12,4,11);
 for(let y=4;y<12;y++)for(let x=3;x<7;x++)pixels.set([220,20,10,255],(y*size+x)*4);
 for(let y=4;y<12;y++)for(let x=9;x<13;x++)pixels.set([10,30,220,255],(y*size+x)*4);
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));return {size,pixels,geometry};
}

test('1089 UV edge padding copies nearby chart colours into gutters without changing source or occupied texels',()=>{
 const {size,pixels,geometry}=fixture(),before=pixels.slice(),out=padPaintPixels(pixels,size,geometry,2);
 assert.notEqual(out,pixels);assert.deepEqual(pixels,before);
 assert.deepEqual([...out.slice((5*size+2)*4,(5*size+2)*4+4)],[220,20,10,255]);
 assert.deepEqual([...out.slice((5*size+13)*4,(5*size+13)*4+4)],[10,30,220,255]);
 assert.deepEqual([...out.slice((5*size+7)*4,(5*size+7)*4+4)],[220,20,10,255]);
 assert.deepEqual([...out.slice((5*size+8)*4,(5*size+8)*4+4)],[10,30,220,255]);
 assert.deepEqual([...out.slice((5*size+0)*4,(5*size+0)*4+4)],[255,255,255,255]);
 assert.deepEqual([...out.slice((5*size+3)*4,(5*size+3)*4+4)],[220,20,10,255]);
});

test('1089 zero padding returns exact pixels and occupied atlas texels are never overwritten',()=>{
 const {size,pixels,geometry}=fixture(),unchanged=padPaintPixels(pixels,size,geometry,0);assert.deepEqual(unchanged,pixels);assert.notEqual(unchanged,pixels);
 assert.deepEqual([...padPaintPixels(pixels,size,geometry,0).slice((5*size+7)*4,(5*size+7)*4+4)],[255,255,255,255]);
 assert.throws(()=>padPaintPixels(pixels,size,geometry,17),/Invalid UV paint padding/);
});

test('1089 padding preserves mapped alpha and supports in-place preview buffers',()=>{
 const {size,pixels,geometry}=fixture();pixels[(5*size+3)*4+3]=37;const raw=pixels.slice();padPaintPixels(pixels,size,geometry,2,pixels);
 assert.equal(pixels[(5*size+3)*4+3],37);assert.deepEqual([...pixels.slice((5*size+2)*4,(5*size+2)*4+4)],[220,20,10,255]);
 assert.deepEqual([...raw.slice((5*size+2)*4,(5*size+2)*4+4)],[255,255,255,255]);geometry.dispose();
});

test('1089 committed material preview uses padded texture pixels while retaining the editable map',()=>{
 const size=512,pixels=new Uint8Array(size*size*4).fill(255),uv=[],x0=199,x1=209,y0=200,y1=210;for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)pixels.set([220,20,10,255],(y*size+x)*4);
 const a=[(x0-.5)/(size-1),(y0-.5)/(size-1)],b=[(x1+.5)/(size-1),(y0-.5)/(size-1)],c=[(x1+.5)/(size-1),(y1+.5)/(size-1)],d=[(x0-.5)/(size-1),(y1+.5)/(size-1)],geometry=new THREE.BufferGeometry();geometry.setAttribute('uv',new THREE.Float32BufferAttribute([...a,...b,...c,...a,...c,...d],2));
 const source=pixels.slice(),body=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshBasicMaterial()),display=createPaintSurface(body,geometry,paintTexture(pixels,size),{renderer:{}});display.showMaterial(pixels);
 const shown=display.surface.material.map.image.data;assert.deepEqual([...shown.slice((205*size+198)*4,(205*size+198)*4+4)],[220,20,10,255]);assert.deepEqual(pixels,source);display.dispose();body.geometry.dispose();body.material.dispose();
});

test('1090 live Paint preview uploads edits made in place when edge padding is disabled',()=>{
 const size=512,pixels=new Uint8Array(size*size*4).fill(255),geometry=new THREE.BufferGeometry(),body=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshBasicMaterial()),display=createPaintSurface(body,geometry,paintTexture(pixels,size),{padding:0});
 display.showMaterial(pixels);const map=display.surface.material.map,version=map.version,at=(200*size+200)*4;pixels.set([220,20,10,255],at);display.showMaterial(pixels);
 assert.equal(map.image.data[at],220);assert.equal(map.image.data[at+1],20);assert.equal(map.version,version+1);display.dispose();body.geometry.dispose();body.material.dispose();
});

test('1091 padding matches image-projection texel centres at fractional diagonal UV boundaries',()=>{
 const size=64,geometry=new THREE.BufferGeometry(),uv=[.11,.17,.79,.23,.38,.88];geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
 const pixels=new Uint8Array(size*size*4).fill(255),inside=[];
 const [u0,v0,u1,v1,u2,v2]=geometry.attributes.uv.array,d=(v1-v2)*(u0-u2)+(u2-u1)*(v0-v2);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=(x+.5)/size,v=(y+.5)/size,a=((v1-v2)*(u-u2)+(u2-u1)*(v-v2))/d,b=((v2-v0)*(u-u2)+(u0-u2)*(v-v2))/d;
  if(Math.min(a,b,1-a-b)>=-1e-8){const at=(y*size+x)*4;inside.push(at);pixels.set([220,20,10,255],at);}
 }
 const original=pixels.slice(),out=padPaintPixels(pixels,size,geometry,4);
 for(const at of inside)assert.deepEqual(out.slice(at,at+4),original.slice(at,at+4),'image-covered texels must remain exact');
 // Every directly adjacent gutter must receive image RGB, never white atlas RGB.
 const covered=new Set(inside.map(at=>at/4));let checked=0;
 for(const at of covered)for(const next of [at%size?at-1:-1,at%size<size-1?at+1:-1,at-size,at+size])if(next>=0&&next<size*size&&!covered.has(next)){
  assert.deepEqual([...out.slice(next*4,next*4+3)],[220,20,10]);checked++;
 }
 assert.ok(checked>100);assert.deepEqual(pixels,original);geometry.dispose();
});
