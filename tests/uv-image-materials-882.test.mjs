import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {EditableMesh} from '../src/mesh.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {encodeProjectGLB,decodeProjectGLB} from '../src/project-glb-resources.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const tick=()=>new Promise(r=>setImmediate(r));
const bitmap=()=>({width:1024,height:1024,closed:0,close(){this.closed++;}});
function container(){
 const pos=new Float32Array([0,0,0,1,0,0,2,0,0,0,1,0,1,1,0,2,1,0]),uv=new Float32Array([0,0,.5,0,1,0,0,1,.5,1,1,1]),a=new Uint16Array([0,1,4,0,4,3]),b=new Uint16Array([1,2,5,1,5,4]);
 const bin=new Uint8Array(pos.byteLength+uv.byteLength+a.byteLength+b.byteLength);let offset=0;for(const values of [pos,uv,a,b]){bin.set(new Uint8Array(values.buffer),offset);offset+=values.byteLength;}
 const json={asset:{version:'2.0'},buffers:[{byteLength:bin.length}],bufferViews:[{buffer:0,byteOffset:0,byteLength:72},{buffer:0,byteOffset:72,byteLength:48},{buffer:0,byteOffset:120,byteLength:12},{buffer:0,byteOffset:132,byteLength:12}],accessors:[{bufferView:0,componentType:5126,count:6,type:'VEC3',min:[0,0,0],max:[2,1,0]},{bufferView:1,componentType:5126,count:6,type:'VEC2'},{bufferView:2,componentType:5123,count:6,type:'SCALAR'},{bufferView:3,componentType:5123,count:6,type:'SCALAR'}],materials:[{name:'Same'},{name:'Same'}],meshes:[{primitives:[{attributes:{POSITION:0,TEXCOORD_0:1},indices:2,material:1},{attributes:{POSITION:0,TEXCOORD_0:1},indices:3,material:0}]}],nodes:[{mesh:0}],scenes:[{nodes:[0]}],scene:0};
 const text=new TextEncoder().encode(JSON.stringify(json)),len=Math.ceil(text.length/4)*4,buffer=new ArrayBuffer(28+len+bin.length),view=new DataView(buffer),bytes=new Uint8Array(buffer);
 view.setUint32(0,0x46546c67,true);view.setUint32(4,2,true);view.setUint32(8,bytes.length,true);view.setUint32(12,len,true);view.setUint32(16,0x4e4f534a,true);bytes.fill(32,20,20+len);bytes.set(text,20);view.setUint32(20+len,bin.length,true);view.setUint32(24+len,0x004e4942,true);bytes.set(bin,28+len);return buffer;
}
async function imported(){
 const ex=glbOwnerRuntime(),buffer=container(),gltf=await new GLTFLoader().parseAsync(buffer,''),entries=ex.c.importedMeshes(gltf.scene,{associations:gltf.parser.associations});
 assert.equal(entries.length,1);entries[0].glbPassthrough=ex.c.parseGLBPassthrough(buffer).objects[0];ex.c.addImported(entries,'Materials',{reconstructQuads:true});return {ex,object:ex.added[0]};
}
function images(p){
 p.materials=p.materials.map((m,i)=>({...m,pbrMetallicRoughness:{baseColorTexture:{index:i},baseColorFactor:i?[.2,.4,.6,1]:[1,.5,.25,1]}}));
 p.textures=[{source:0},{source:1,sampler:0}];p.samplers=[{wrapS:33071,wrapT:33648}];p.images=[0,1].map(i=>({definition:{mimeType:'image/png'},data:new Uint8Array([137,80,78,71,13,10,26,10,i])}));return p;
}
test('882 real GLTFLoader material associations survive logical primitive merge/weld/quad import despite identical names and reversed global IDs',async()=>{
 const {object,ex}=await imported(),p=object.glbPassthrough;assert.equal(object.mesh.faces.length,2);assert.deepEqual([...p.faceMaterialIndices],[1,0]);assert.equal(p.materialTopologySignature,ex.c.topologySignature(object.mesh));assert.equal(p.uvCorners.length,2);assert(object.mesh.faces.every(f=>f.length===4));
 const decoded=decodeProjectGLB(encodeProjectGLB(p));assert.deepEqual([...decoded.faceMaterialIndices],[1,0]);assert.equal(decoded.materialTopologySignature,p.materialTopologySignature);
 // Legacy imports with no parser associations must not claim exact provenance.
 const gltf=await new GLTFLoader().parseAsync(container(),''),entries=ex.c.importedMeshes(gltf.scene);entries[0].glbPassthrough=ex.c.parseGLBPassthrough(container()).objects[0];ex.c.addImported(entries,'Legacy',{reconstructQuads:true});assert.equal(ex.added[1].glbPassthrough.faceMaterialIndices,undefined);
});
test('882 original weld drops the matching material entry and quad reconstruction refuses cross-material merges with equal facegroup names',()=>{
 const ex=glbOwnerRuntime(),mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2],[0,0,2],[0,2,3]],undefined,['Same','Same','Same']);
 const welded=ex.c.weldEditableMesh(mesh,1e-6,null,null,null,null,[1,7,0]);assert.equal(welded.removedFaces,1);assert.deepEqual([...welded.faceMaterialIndices],[1,0]);
 const separate=ex.c.reconstructImportedQuads(welded.mesh,null,null,null,null,welded.faceMaterialIndices);assert.equal(separate.merged,0);assert.equal(separate.mesh.faces.length,2);
 const merged=ex.c.reconstructImportedQuads(welded.mesh,null,null,null,null,[1,1]);assert.equal(merged.merged,1);assert.deepEqual([...merged.faceMaterialIndices],[1]);
});
test('882 original preview triangulator binds exact material groups, rejects stale/malformed mapping, leaves checker and export buckets unchanged',async()=>{
 const {ex,object}=await imported(),p=images(object.glbPassthrough),before=encodeProjectGLB(p),g=ex.c.buildUVPreviewGeometry(object.mesh,p,{materials:true});assert(g);assert.deepEqual([...g.userData.boxlabFaceMaterials],[1,0]);assert.deepEqual(g.groups.map(g=>[g.start,g.count,g.materialIndex]),[[0,6,0],[6,6,1]]);
 const position=g.attributes.position;for(const group of g.groups){const xs=Array.from({length:group.count},(_,i)=>position.getX(g.index.getX(group.start+i)));assert(group.materialIndex===0?Math.max(...xs)<=0:Math.min(...xs)>=0);}
 for(const patch of [{materialTopologySignature:'stale'},{faceMaterialIndices:[1]},{faceMaterialIndices:[1,-1]},{faceMaterialIndices:[1,9]}])assert.equal(ex.c.buildUVPreviewGeometry(object.mesh,{...p,...patch},{materials:true}),null);
 const checker=ex.c.buildUVPreviewGeometry(object.mesh,p);assert.equal(checker.userData.boxlabFaceMaterials,undefined);assert.deepEqual(encodeProjectGLB(p),before);checker.dispose();g.dispose();
});
test('882 multi-material real Three surface uses correct per-slot images/factors/samplers, serial readiness and native source cleanup',async()=>{
 const {object,ex}=await imported(),p=images(object.glbPassthrough),b=new THREE.Mesh(object.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),original=b.material,hidden=new THREE.MeshBasicMaterial(),requests=[];
 const overlay=createUVImageOverlay(b,object.mesh,p,ex.c.buildUVPreviewGeometry,hidden,{decode:c=>new Promise((resolve,reject)=>requests.push({c,resolve,reject}))});assert(overlay);await tick();assert.equal(requests.length,1);assert.equal(requests[0].c.materialIndex,1);const one=bitmap();requests[0].resolve(one);await tick();assert.equal(requests.length,2);assert.equal(overlay.visible,false);assert.equal(b.material,original);
 const two=bitmap();requests[1].resolve(two);await tick();assert.equal(overlay.visible,true);assert.equal(b.material,hidden);assert.equal(overlay.material.length,2);assert.equal(overlay.material[0].map.image,one);assert.equal(overlay.material[1].map.image,two);assert.deepEqual(overlay.material[0].color.toArray(),[.2,.4,.6]);assert.equal(overlay.material[0].map.wrapS,THREE.ClampToEdgeWrapping);assert.equal(overlay.material[1].map.wrapS,THREE.RepeatWrapping);
 let disposed=0;for(const m of overlay.material){m.addEventListener('dispose',()=>disposed++);m.map.addEventListener('dispose',()=>disposed++);}b.geometry.dispose();overlay.userData.boxlabUVImageDispose();assert.equal(disposed,4);assert.deepEqual([one.closed,two.closed],[1,1]);assert.equal(b.material,original);
});
test('882 multi-material all-or-Solid failure, pending cancel, source budgets and legacy mixed-material refusal release every decoded image',async()=>{
 const {ex,object}=await imported(),p=images(object.glbPassthrough),b=new THREE.Mesh(object.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),hidden=new THREE.MeshBasicMaterial(),original=b.material,one=bitmap();let calls=0;
 createUVImageOverlay(b,object.mesh,p,ex.c.buildUVPreviewGeometry,hidden,{decode:async()=>{if(++calls===1)return one;throw Error('second fails');}});await tick();assert.equal(one.closed,1);assert.equal(b.children.length,0);assert.equal(b.material,original);
 let resolve;calls=0;const overlay=createUVImageOverlay(b,object.mesh,p,ex.c.buildUVPreviewGeometry,hidden,{decode:()=>{calls++;return new Promise(r=>resolve=r);}});await tick();overlay.userData.boxlabUVImageDispose();const late=bitmap();resolve(late);await tick();assert.equal(calls,1);assert.equal(late.closed,1);assert.equal(b.material,original);
 for(const q of [{...p,faceMaterialIndices:undefined},{...p,materialTopologySignature:'stale'},{...p,materials:p.materials.map((m,i)=>i?{...m,alphaMode:'BLEND'}:m)},{...p,faceMaterialIndices:[0,1,2,3,4]}])assert.equal(createUVImageOverlay(b,object.mesh,q,ex.c.buildUVPreviewGeometry,hidden),null);
 const huge={...p,images:p.images.map(i=>({...i,data:new Uint8Array(5*1024*1024)}))};huge.images.forEach(i=>i.data.set([137,80,78,71,13,10,26,10]));assert.equal(createUVImageOverlay(b,object.mesh,huge,ex.c.buildUVPreviewGeometry,hidden),null);
});
test('882 actual File GLB callback supplies parser associations while editable OBJ parsing remains independent',async()=>{
 const ex=glbOwnerRuntime();ex.c.FileReader=class{readAsArrayBuffer(){this.result=container();this.onload();}};ex.c.loadGLTF({name:'Mapped.glb'});for(let i=0;i<20&&!ex.added.length;i++)await tick();assert.equal(ex.added.length,1);assert.deepEqual([...ex.added[0].glbPassthrough.faceMaterialIndices],[1,0]);
 let parsed=0;ex.c.FileReader=class{readAsText(){this.result='obj contents';this.onload();}};ex.c.parseEditableOBJ=(text,options)=>{assert.equal(text,'obj contents');assert.equal(options.splitByGroups,false);parsed++;return [{mesh:EditableMesh.cube(2)}];};ex.c.loadOBJ({name:'Plain.obj'});assert.equal(parsed,1);assert.equal(ex.added.length,2);assert.equal(ex.added[1].glbPassthrough,null);
});
