import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {loadSubdivisionWasm,wasmSubdivisionStep,equalSubdivision} from '../src/subdivision-wasm-lab.js';

test('1150 direct WASM edge and face-edge spans retain canonical edge order and metadata',async()=>{
 const {exports:wasm}=await loadSubdivisionWasm({fetcher:async()=>({ok:true,arrayBuffer:()=>fs.readFile(new URL('../src/wasm/subdivision-step.wasm',import.meta.url))})});
 const source=new EditableMesh([[0,0,0],[1.2,.1,0],[1.1,1.4,.2],[.2,1.1,-.1],[-.7,.4,.5],[.6,-.8,.3],[4,5,6]],[[0,1,2,3,4],[1,0,5],[0,1,3]],new Map([['0:1',.375],['1:2',.8]]),['Pentagon','Shared','Nonmanifold']);
 const expected=subdivide(source,1),orderedEdges=source.edges(),expectedEdges=[];
 for(const edge of orderedEdges){expectedEdges.push(edge.a,edge.b,edge.faces.length,edge.faces[0]??0,edge.faces[1]??0,source.creases.get(source.edgeKey(edge.a,edge.b))||0);}
 const index=new Map(orderedEdges.map((edge,i)=>[source.edgeKey(edge.a,edge.b),i]));
 const expectedFaceEdges=source.faces.flatMap(face=>face.map((v,i)=>index.get(source.edgeKey(v,face[(i+1)%face.length]))));
 let packedEdgeValues,packedFaceEdges;
 const kernel={memory:wasm.memory,step:(...args)=>{
  const [, ,ne, , , ,edgePointer, , , , ,faceEdgePointer]=args;
  packedEdgeValues=[...new Float64Array(wasm.memory.buffer,edgePointer,ne*6)];
  packedFaceEdges=[...new Uint32Array(wasm.memory.buffer,faceEdgePointer,expectedFaceEdges.length)];
  wasm.step(...args);
 }};
 const result=wasmSubdivisionStep(source,kernel).mesh;
 assert.deepEqual(packedEdgeValues,expectedEdges);
 assert.deepEqual(packedFaceEdges,expectedFaceEdges);
 assert.ok(equalSubdivision(result,expected));
});

test('1151 page adds higher-input comparison while retaining candidate parity/export coverage',async()=>{
 const page=await fs.readFile(new URL('../docs/subdivision-benchmark-1036.html',import.meta.url),'utf8');
 assert.match(page,/<title>BoxLab subdivision benchmark \.1152<\/title>/);
 assert.match(page,/subdivision-wasm-lab\.js\?v=0\.36\.18\.1150/);
 assert.match(page,/Candidate revision 1150/);
 assert.match(page,/BoxLab-subdivision-wasm-1152\.json/);
 assert.match(page,/let reportData = null/);
 assert.match(page,/Compare JS \/ WASM/);
});
