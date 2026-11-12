import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {loadSubdivisionWasm,compareSubdivision} from '../src/subdivision-wasm-lab.js';

function grid(side){
 const vertices=[],faces=[];
 for(let y=0;y<=side;y++)for(let x=0;x<=side;x++)vertices.push(new THREE.Vector3(x/side,y/side,0));
 for(let y=0;y<side;y++)for(let x=0;x<side;x++){const a=y*(side+1)+x;faces.push([a,a+1,a+side+2,a+side+1]);}
 return new EditableMesh(vertices,faces);
}

test('1152 dense-input benchmark holds output at 16384 faces with exact WASM/JS parity',async()=>{
 const page=await fs.readFile(new URL('../docs/subdivision-benchmark-1036.html',import.meta.url),'utf8');
 assert.ok(page.includes('<title>BoxLab subdivision benchmark .1152</title>'));
 assert.match(page,/\{side:64,level:1\}/);
 assert.match(page,/\{side:32,level:2\}/);
 const source=grid(64),before=JSON.stringify({vertices:source.vertices.map(v=>v.toArray()),faces:source.faces});
 const loaded=await loadSubdivisionWasm({fetcher:async()=>({ok:true,arrayBuffer:()=>fs.readFile(new URL('../src/wasm/subdivision-step.wasm',import.meta.url))})});
 assert.equal(loaded.available,true,loaded.reason);
 const result=await compareSubdivision(source,1,{kernel:loaded.exports,stopMs:1200});
 const expected=subdivide(source,1);
 assert.equal(result.sourceFaces,4096);
 assert.equal(result.outputFaces,16384);
 assert.equal(result.correctness.passed,true);
 assert.equal(result.steps.length,5);
 assert.equal(result.correctness.scope.includes('Exact coordinates/order/indices'),true);
 assert.equal(expected.faces.length,result.outputFaces);
 assert.deepEqual(JSON.stringify({vertices:source.vertices.map(v=>v.toArray()),faces:source.faces}),before);
 assert.ok(result.steps.flat().every(step=>step.memory.committedBytes<=16*1024*1024));
});
