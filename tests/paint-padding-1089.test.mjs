import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {padPaintPixels} from '../src/paint-filter-domain.js';
import {createPaintSurface,paintTexture} from '../src/paint-target.js';

function fixture(){
 const size=16,pixels=new Uint8Array(size*size*4).fill(255),uv=[];
 const chart=(x0,x1,y0,y1)=>{const a=[(x0-.5)/15,(y0-.5)/15],b=[(x1+.5)/15,(y0-.5)/15],c=[(x1+.5)/15,(y1+.5)/15],d=[(x0-.5)/15,(y1+.5)/15];uv.push(...a,...b,...c,...a,...c,...d);};chart(3,6,4,11);chart(9,12,4,11);
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
