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

test('1151 higher-input benchmark case remains at the 16384-face cap with exact output parity',async()=>{
 const page=await fs.readFile(new URL('../docs/subdivision-benchmark-1036.html',import.meta.url),'utf8');
 assert.match(page,/<title>BoxLab subdivision benchmark \.1151<\/title>/);
 assert.match(page,/\{side:32,level:2\}/);
 assert.match(page,/workloadPlan:wasmCases\.map/);
 const source=grid(32),before=JSON.stringify({vertices:source.vertices.map(v=>v.toArray()),faces:source.faces});
 const loaded=await loadSubdivisionWasm({fetcher:async()=>({ok:true,arrayBuffer:()=>fs.readFile(new URL('../src/wasm/subdivision-step.wasm',import.meta.url))})});
 assert.equal(loaded.available,true,loaded.reason);
 const result=await compareSubdivision(source,2,{kernel:loaded.exports,stopMs:1200});
 const expected=subdivide(source,2);
 assert.equal(result.sourceFaces,1024);
 assert.equal(result.outputFaces,16384);
 assert.equal(result.correctness.passed,true);
 assert.deepEqual(result.steps.length,5);
 assert.equal(result.correctness.scope.includes("Exact coordinates/order/indices"),true);
 assert.equal(expected.faces.length,result.outputFaces);
 assert.equal(JSON.stringify({vertices:source.vertices.map(v=>v.toArray()),faces:source.faces}),before);
 assert.ok(result.steps.flat().every(step=>step.memory.committedBytes<=16*1024*1024));
});
