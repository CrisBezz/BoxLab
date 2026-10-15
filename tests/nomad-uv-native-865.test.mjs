import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {rotateImportedUV} from '../src/imported-uv-edit.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),runtime=glbOwnerRuntime(),signature=m=>runtime.c.topologySignature(m);
function fixture(){const mesh=EditableMesh.cube(1),uvCorners=mesh.faces.map((f,i)=>f.map((_,j)=>[[.1,.2],[.8,.2],[.8,.7],[.1,.7]][(i+j)%4]));return {id:1,name:'UV cube',kind:'editable',mesh,settings:{},glbPassthrough:{version:1,source:'glb',uvCorners,uvTopologySignature:signature(mesh)}};}
function readField(p,mi,key){const f=p.json.meshes[mi][key];return new DataView(p.bin.buffer,p.bin.byteOffset+f.offset,f.length);}
function assertUVs(p,mi,object){const m=p.json.meshes[mi],faces=readField(p,mi,'faces'),indices=readField(p,mi,'faces_uv'),uv=readField(p,mi,'uvs');
 assert.equal(m.uvs.count,m.count_uv);assert.equal(m.uvs.length,m.count_uv*8);
 for(let fi=0;fi<m.count_face;fi++)for(let j=0;j<4;j++){
  const vi=faces.getInt32(fi*16+j*4,true),ui=indices.getInt32(fi*16+j*4,true);assert(ui>=0&&ui<m.count_uv);
  const sourceFace=object.mesh.faces.find((f,index)=>f.includes(vi)&&object.glbPassthrough.uvCorners[index].some(p=>Math.abs(p[0]-uv.getFloat32(ui*8,true))<1e-6&&Math.abs(p[1]-uv.getFloat32(ui*8+4,true))<1e-6));assert(sourceFace);
 }
}
test('865 native NOM stores nonzero per-corner UVs with separate seam indices and shared geometry unchanged',()=>{
 const o=fixture(),before=JSON.stringify(o.glbPassthrough),out=buildNomadProject([o],template,{topologySignature:signature}),p=readNomadProject(out.bytes);assert.equal(out.uvObjects,1);assert.equal(p.json.meshes[0].count_vertex,8);assert(p.json.meshes[0].count_uv>8);assertUVs(p,0,o);
 const uv=readField(p,0,'uvs'),ids=readField(p,0,'faces_uv');o.mesh.faces.forEach((face,fi)=>face.forEach((_,j)=>{const index=ids.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][j].forEach((v,k)=>assert.equal(uv.getFloat32(index*8+k*4,true),Math.fround(v)));}));assert.equal(JSON.stringify(o.glbPassthrough),before);
});
test('865 rotated UVs survive project and actual File NOMAD action in native downloaded bytes',async()=>{
 const o=fixture();assert(rotateImportedUV(o,o.mesh,signature,{capture:()=>({}),checkpointSnapshot:()=>true}).changed);
 const encoded=encodeBoxlabScene({activeId:1,objects:[o]}),restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)).objects[0],saves=[],status={};
 const source=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8'),c={URL,Blob,shareButton:{disabled:false},status,note:{},nameInput:{value:'UV cube'},cleanName:x=>x,objects:()=>[restored],geometry:'base',buildNomadProject,fetch:async()=>({ok:true,arrayBuffer:async()=>template}),downloadBlob:(...args)=>saves.push(args)};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function updateNote(){'),source.indexOf('function extension()')).replace('import.meta.url',"'https://example.test/src/export-as-panel.js'"),c);
 const prior=globalThis.__boxlabExportAs;globalThis.__boxlabExportAs={topologySignature:signature};try{await c.exportNomad();}finally{globalThis.__boxlabExportAs=prior;}
 assert.equal(saves.length,1);assert.match(saves[0][1],/\.nom$/);assert.match(status.textContent,/UVs 1\/1/);const p=readNomadProject(await saves[0][0].arrayBuffer());assertUVs(p,0,restored);
 const uv=readField(p,0,'uvs'),ids=readField(p,0,'faces_uv');assert.equal(uv.getFloat32(ids.getInt32(0,true)*8,true),Math.fround(.8));assert.equal(uv.getFloat32(ids.getInt32(0,true)*8+4,true),Math.fround(.1));
});
test('865 triangles/ngons preserve UV corner correspondence through triangulation; continuous edges reuse UV indices and mixed scene offsets stay valid',()=>{
 const mesh=new EditableMesh([[0,0,0],[2,0,0],[2,2,0],[1,1,0],[0,2,0]],[[0,1,2,3,4]]),o={id:1,mesh,glbPassthrough:{uvCorners:[[[0,0],[1,0],[1,1],[.5,.5],[0,1]]],uvTopologySignature:signature(mesh)}};
 const p=readNomadProject(buildNomadProject([{name:'Plain',mesh:EditableMesh.cube()},o],template,{topologySignature:signature}).bytes);assert.equal(p.json.meshes[1].count_face,3);assert.equal(p.json.meshes[1].count_uv,5);assertUVs(p,1,o);
 const faces=readField(p,1,'faces'),indices=readField(p,1,'faces_uv'),uvs=readField(p,1,'uvs');for(let fi=0;fi<3;fi++){assert.equal(indices.getInt32(fi*16+8,true),indices.getInt32(fi*16+12,true));for(let j=0;j<4;j++){const vi=faces.getInt32(fi*16+j*4,true),ui=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[0][vi].forEach((v,k)=>assert.equal(uvs.getFloat32(ui*8+k*4,true),v));}}
});
test('865 native UV export refuses stale/partial/nonfinite/SubD/evaluated mirror cases rather than silently writing zeros',()=>{
 for(const change of [o=>o.mesh.faces[0].reverse(),o=>o.glbPassthrough.uvCorners[0]=null,o=>o.glbPassthrough.uvCorners[0][0][0]=Infinity,o=>o.glbPassthrough.uvCorners[0][0][0]=1e100,o=>o.settings.mirror={x:true}]){const o=fixture();change(o);assert.throws(()=>buildNomadProject([o],template,{topologySignature:signature}),/UV/);}
 assert.throws(()=>buildNomadProject([fixture()],template,{subd:true,topologySignature:signature}),/Base geometry/);
 const o=fixture(),before=JSON.stringify(o.glbPassthrough);assert.throws(()=>buildNomadProject([o],template,{topologySignature:null}),/Base geometry/);assert.equal(JSON.stringify(o.glbPassthrough),before);
});
