import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {makeSphere,makeCube} from '../src/primitive-factory.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {createSphereUV,createBoxUV,packImportedUVIslands} from '../src/imported-uv-edit.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m);
function fixture(radial=12,rings=6){const r=editableBooleanRuntime();r.manager.activate(3);r.manager.replaceActiveMesh(makeSphere(1,radial,rings));return {...r,object:r.manager.objects.find(o=>o.id===3),owner:r.c.__boxlabObjectHistory};}
const project=r=>createSphereUV(r.object,r.live,signature,r.owner);
test('894 Sphere UVs preserve geometry, create per-wedge poles and an aligned seam, one Undo and repeat no-op',()=>{
 const r=fixture(),mesh=r.live,before=JSON.stringify(mesh),n=r.h.undoStack.length;assert.deepEqual(project(r),{ok:true,changed:true});const p=r.object.glbPassthrough;
 assert.equal(JSON.stringify(mesh),before);assert.equal(r.h.undoStack.length,n+1);assert.equal(inspectImportedUV(mesh,p,signature).islandCount,1);
 const north=new Set(mesh.faces.flatMap((f,i)=>f.flatMap((id,j)=>id===0?[p.uvCorners[i][j].join(',')]:[])));assert.equal(north.size,12);
 for(const face of p.uvCorners){for(const [u,v] of face)assert(u>=.02-1e-12&&u<=.98+1e-12&&v>=.02&&v<=.98);assert(Math.max(...face.map(p=>p[0]))-Math.min(...face.map(p=>p[0]))<.49);}
 assert.equal(project(r).changed,false);assert.equal(r.h.undoStack.length,n+1);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,p);
});
test('894 odd/minimum/dense spheres and translated, Y-rotated, huge/tiny coordinates remain finite',()=>{
 for(const radial of [4,5,12,32])for(const rings of [2,3,8])for(const factor of [1,1e150,1e-150]){const r=fixture(radial,rings);r.live.vertices.forEach(v=>{const x=v.x,z=v.z;v.x=(x*Math.cos(.3)-z*Math.sin(.3)+3)*factor;v.z=(x*Math.sin(.3)+z*Math.cos(.3)-2)*factor;v.y=(v.y+1)*factor;});assert(project(r).ok,`${radial}/${rings}/${factor}`);assert(r.object.glbPassthrough.uvCorners.flat(2).every(Number.isFinite));}
});
test('894 Sphere replaces native Box UVs with copy-on-write, supports existing Pack all and preserves shared peers',()=>{
 const r=fixture();assert(createBoxUV(r.object,r.live,signature,r.owner).ok);const old=r.object.glbPassthrough,peer=r.manager.addMesh(r.live,'Peer',{glbPassthrough:old,enterObjectMode:false});r.manager.activate(3);assert(project(r).ok);const p=r.object.glbPassthrough;assert.equal(peer.glbPassthrough,old);assert(packImportedUVIslands(r.object,r.live,signature,r.owner,{payload:p}).ok);assert.equal(peer.glbPassthrough,old);
});
test('894 actual MeshHealth Sphere action and project/native NOM/GLB pole variants roundtrip',async()=>{
 const r=fixture(),source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');let renders=0;const c={active:true,objectId:3,currentMode:()=> 'object',activeObject:()=>r.object,liveMesh:()=>r.live,createSphereUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport(){renders++;},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function sphereUVs('),source.indexOf('uvSphere.addEventListener')),c);assert.equal(c.sphereUVs(),true);assert.equal(renders,1);c.active=false;assert.equal(c.sphereUVs(),false);
 assert.match(source,/uvSphere\.disabled=!nativeReady/);assert.match(source,/uvSphere\.addEventListener\('click',sphereUVs\)/);
 const decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.owner.capture()))),(...a)=>new EditableMesh(...a)),o=decoded.objects.find(o=>o.id===3);assert.equal(JSON.stringify(o.glbPassthrough.uvCorners),JSON.stringify(r.object.glbPassthrough.uvCorners));
 const expected=o.glbPassthrough.uvCorners.flat().map(p=>p.map(Math.fround)),nom=readNomadProject(buildNomadProject([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:signature}).bytes),m=nom.json.meshes[0],uv=new DataView(nom.bin.buffer,nom.bin.byteOffset+m.uvs.offset,m.uvs.length);assert(m.count_uv>m.count_vertex);for(let i=0;i<m.count_uv;i++)assert(expected.some(p=>p[0]===uv.getFloat32(i*8,true)&&p[1]===uv.getFloat32(i*8+4,true)));
 const glb=await exporter.build([o]);assert.equal(glb.uvRestoredCount,1);const scene=await exporter.decode(glb.buffer),actual=new Set(),north=new Set(o.mesh.faces.flatMap((face,fi)=>face.flatMap((id,j)=>id===0?[o.glbPassthrough.uvCorners[fi][j].map(Math.fround).join(',')]:[])));scene.traverse(n=>{if(n.isMesh){const a=n.geometry.getAttribute('uv'),p=n.geometry.getAttribute('position');for(let i=0;i<a.count;i++){assert(expected.some(e=>e[0]===a.getX(i)&&e[1]===a.getY(i)));if(p.getX(i)===0&&p.getY(i)===1&&p.getZ(i)===0)actual.add([a.getX(i),a.getY(i)].join(','));}}});assert.equal(north.size,12);assert.deepEqual(actual,north);
});
test('894 Sphere refuses unsafe targets, non-round/no-pole/degenerate/invalid meshes and unavailable history without mutation',()=>{
 for(const values of [{locked:true},{kind:'reference'},{sourceId:1},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}},{settings:{subd:true}},{settings:{mirror:{x:true}}},{glbPassthrough:{version:1,source:'glb'}}]){const r=fixture();Object.assign(r.object,values);const before=r.object.glbPassthrough,n=r.h.undoStack.length;assert.equal(project(r).ok,false);assert.equal(r.object.glbPassthrough,before);assert.equal(r.h.undoStack.length,n);}
 for(const mutate of [r=>r.live.vertices.forEach(v=>v.x*=2),r=>r.live.vertices.forEach(v=>v.y=0),r=>r.live.faces[0]=[0,0,0],r=>r.live.faces[0][0]=999,r=>r.live.vertices[0].x=NaN,r=>r.manager.replaceActiveMesh(makeCube())]){const r=fixture();mutate(r);const n=r.h.undoStack.length;assert.equal(project(r).ok,false);assert.equal(r.object.glbPassthrough,undefined);assert.equal(r.h.undoStack.length,n);}
 const r=fixture();assert.equal(createSphereUV(r.object,r.live,signature,null).ok,false);assert.equal(r.object.glbPassthrough,undefined);
});
