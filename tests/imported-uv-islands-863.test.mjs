import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {inspectImportedUV,drawImportedUV} from '../src/imported-uv-inspection.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const runtime=glbOwnerRuntime(),signature=mesh=>runtime.c.topologySignature(mesh);
function object(faces=[[0,1,2],[0,2,3]],corners=[[[0,0],[1,0],[1,1]],[[0,0],[1,1],[0,1]]]){
 const mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1]],faces);
 return {id:1,name:'UV seams',kind:'editable',mesh,glbPassthrough:{version:1,source:'glb',uvCorners:corners,uvTopologySignature:signature(mesh)}};
}
const inspect=(o,options)=>inspectImportedUV(o.mesh,o.glbPassthrough,signature,options);
test('863 UV islands use shared mesh edges and matching vertex-aligned endpoint UVs, preserving exact splits and winding independence',()=>{
 const o=object();let r=inspect(o);assert.equal(r.islandCount,1);assert.equal(r.seamEdges,0);assert.equal(r.boundaryEdges,4);assert.deepEqual(r.previewIslands,[0,0]);
 o.mesh.faces[1].reverse();o.glbPassthrough.uvCorners[1].reverse();o.glbPassthrough.uvTopologySignature=signature(o.mesh);r=inspect(o);assert.equal(r.islandCount,1);assert.equal(r.seamEdges,0);
 o.glbPassthrough.uvCorners[1][2][0]=Number.EPSILON;r=inspect(o);assert.equal(r.islandCount,2);assert.equal(r.seamEdges,1);assert.equal(r.previewSeams.length,2);assert.deepEqual(r.previewIslands,[0,1]);
 const disconnected=object([[0,1,2],[4,5,6]],o.glbPassthrough.uvCorners);assert.equal(inspect(disconnected).islandCount,2);
 const touching=object([[0,1,2],[0,4,5]]);assert.equal(inspect(touching).islandCount,2);
 const cube=EditableMesh.cube(1),channel=cube.faces.map(f=>f.map(id=>[cube.vertices[id].x,cube.vertices[id].z]));channel[0][0][0]+=.1;
 const around=inspectImportedUV(cube,{uvCorners:channel,uvTopologySignature:signature(cube)},signature);
 assert.equal(around.seamEdges,2);assert.equal(around.islandCount,1,'other continuous edges retain a connected island around an internal split');
});
test('863 missing channels and ambiguous non-manifold edges never fabricate UV connectivity, full statistics survive preview limits',()=>{
 const partial=object();partial.glbPassthrough.uvCorners[1]=null;let r=inspect(partial);assert.equal(r.islandCount,1);assert.equal(r.seamEdges,0);assert.equal(r.boundaryEdges,3);
 const branched=object([[0,1,2],[1,0,3],[0,1,4]],[[[0,0],[1,0],[1,1]],[[1,0],[0,0],[0,1]],[[0,0],[1,0],[.5,-1]]]);r=inspect(branched);assert.equal(r.nonManifoldEdges,1);assert.equal(r.islandCount,3);assert.equal(r.seamEdges,0);
 const split=object();split.glbPassthrough.uvCorners[1][0]=[.2,0];r=inspect(split,{maxPreviewCorners:3});assert.equal(r.islandCount,2);assert.equal(r.seamEdges,1);assert.equal(r.previewFaces.length,1);assert.equal(r.previewSeams.length,1);assert(r.previewSeams.length<=r.previewCorners);
 split.mesh.faces[0].reverse();r=inspect(split);assert.equal(r.state,'stale');assert.equal(r.previewSeams,undefined);assert.equal(r.islandCount,undefined);
});
test('863 seam diagnostics survive actual GLB import, project roundtrip and export without mutating UV resources or calling mesh.edges',async()=>{
 const o=object();o.glbPassthrough.uvCorners[1]=[[2,0],[3,1],[2,1]];
 const r=glbOwnerRuntime(),glb=await r.build([o]);await r.import(glb.buffer);const imported={...r.added[0],id:1,kind:'editable'};
 const before=JSON.stringify(imported.glbPassthrough),first=inspect(imported);assert.equal(first.islandCount,2);assert.equal(first.seamEdges,1);
 imported.mesh.edges=()=>{throw Error('Read-only inspection must not publish through legacy edge wrappers');};assert.equal(inspect(imported).islandCount,2);
 const encoded=encodeBoxlabScene({activeId:1,objects:[imported]}),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a));
 const restored=inspect(decoded.objects[0]);assert.equal(restored.islandCount,2);assert.equal(restored.seamEdges,1);assert.equal((await r.build(decoded.objects)).uvRestoredCount,1);assert.equal(JSON.stringify(imported.glbPassthrough),before);
});
test('863 preview colours islands and draws both seam sides in orange within the original bounded canvas lifecycle',()=>{
 const o=object();o.glbPassthrough.uvCorners[1][0]=[.2,0];const report=inspect(o),strokes=[];
 const ctx={clearRect(){},fillRect(){},strokeRect(){},beginPath(){},moveTo(){},lineTo(){},closePath(){},stroke(){strokes.push({colour:this.strokeStyle,width:this.lineWidth});}};
 assert.equal(drawImportedUV({width:256,height:200,getContext:()=>ctx},report),true);
 assert.deepEqual(strokes.map(x=>x.colour),['#65d5f5','#b69aff','#ff9f43','#ff9f43']);assert.deepEqual(strokes.map(x=>x.width),[1,1,2,2]);
 const before=JSON.stringify(o.glbPassthrough);for(let i=0;i<5;i++)assert.deepEqual(inspect(o).previewIslands,[0,1]);assert.equal(JSON.stringify(o.glbPassthrough),before);
});
