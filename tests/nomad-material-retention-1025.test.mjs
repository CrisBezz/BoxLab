import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createBoxUV} from '../src/imported-uv-edit.js';
import {parseNomadMeshes} from '../src/nomad-import-core.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {meshTopologySignature as sig} from '../src/mesh-topology-signature.js';
import {encodeNomadColourPNG} from '../src/nomad-scalar-png.js';
import {validateNomadResource,nomadColourSurfaceSource} from '../src/nomad-material-resource.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {glbOwnerRuntime,glbSource} from './helpers/glb-owner-runtime.mjs';
import {facegroupsRuntime} from './helpers/facegroups-render-runtime.mjs';
const template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url));
const slots=['color','normal','roughness','metalness','opacity','emissive','displacement','unknownFutureMap','packed'];
const tick=()=>new Promise(r=>setImmediate(r)),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
async function nativeFile(){
 const mesh=EditableMesh.cube(),object={mesh,settings:{}};
 assert(createBoxUV(object,mesh,sig,{capture:()=>({}),checkpointSnapshot:()=>true}).ok);
 const original=readNomadProject(buildNomadProject([object],template,{topologySignature:sig}).bytes),json=original.json,parts=[original.bin];let offset=original.bin.length;
 const material={material_type:'opaque',factorColor:[.8,.7,.6],opacity:1,factorOpacity:1,roughness:.3,metalness:.2,normal_neg_y:true,factorNormal:.6,factorEmissive:[.2,.4,.6],factorEmissiveStrength:2,displacementMid:.4,displacementWorld:true,factorDisplacement:.12,textures:{}};
 json.images=[];
 for(const [index,slot] of slots.entries()){
  const pixels=new Uint8Array(16*16*4);for(let i=0;i<256;i++)pixels.set([index*25,i%256,200,255],i*4);
  const bytes=slot==='displacement'?Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACEAAAAAAHTY67AAAAEklEQVR4nGNgYGB+wVDL8P8/AAqAA2c7FPwFAAAAAElFTkSuQmCC','base64')):await encodeNomadColourPNG(pixels,16,16);
  json.images.push({offset,length:bytes.length,type:'image/png'});parts.push(bytes);offset+=bytes.length;
  material.textures[slot]={index,name:slot+'.png',projection:slot==='displacement'?'triplanar':'auto',scale:[5,5],offset:[0,0],rotation:0,wrapS:'repeat',wrapT:'mirror',magFilter:'auto',minFilter:'auto',triplanar_world:true,triplanar_hardness:[.4,.6,.8]};
 }
 json.materials=[material];json.meshes.forEach(m=>m.material=0);
 return assemble(json,parts);
}
function assemble(json,parts){
 const text=new TextEncoder().encode(JSON.stringify(json)),binLength=parts.reduce((n,p)=>n+p.length,0),bo=72+text.length,out=new Uint8Array(bo+binLength),v=new DataView(out.buffer);
 out.set(new TextEncoder().encode('Nomad Sculpt'));v.setUint32(12,7,true);
 for(const [at,value] of [[16,out.length],[24,72],[32,text.length],[40,bo],[48,binLength]])v.setBigUint64(at,BigInt(value),true);
 out.set(text,72);let at=bo;for(const part of parts){out.set(part,at);at+=part.length;}return out;
}
function changeFile(input,fn){const f=readNomadProject(input),j=structuredClone(f.json);fn(j);return assemble(j,[f.bin]);}
const sourcePromise=nativeFile();
function restore(objects){return decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene({objects,activeId:1}))),(...a)=>new EditableMesh(...a)).objects;}
function compareResources(a,b){
 const ma=structuredClone(a.nomadMaterial),mb=structuredClone(b.nomadMaterial);
 for(const slot of Object.keys(ma.textures)){assert.equal(hash(a.images[ma.textures[slot].index].data),hash(b.images[mb.textures[slot].index].data),slot);ma.textures[slot].index=mb.textures[slot].index=0;}
 assert.deepEqual(ma,mb);
}
test('1025 native source provenance, every image slot and exact settings/bytes survive pooled/inline Save/Open and browser NOM export',async()=>{
 const bytes=await sourcePromise,before=bytes.slice(),parsed=parseNomadMeshes(bytes),p=parsed.meshes[0].glbPassthrough;
 assert.equal(p.source,'nomad');assert.equal(validateNomadResource(p),p);assert.deepEqual(Object.keys(p.nomadMaterial.textures),slots);assert.equal(p.images[p.nomadMaterial.textures.displacement.index].data[24],16,'native displacement keeps 16-bit source');
 const objects=parsed.meshes.map((o,i)=>({...o,id:i+1,settings:{}}));
 for(const poolImages of [false,true]){
  const encoded=encodeBoxlabScene({objects,activeId:1},{poolImages}),restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a));
  assert.equal(encoded.objects[0].glbResource.version,4);compareResources(p,restored.objects[0].glbPassthrough);
  const out=await buildNomadProjectWithMaps(restored.objects,template,{topologySignature:sig},()=>{throw Error('native maps must never be unpacked/re-encoded');});
  compareResources(p,parseNomadMeshes(out.bytes).meshes[0].glbPassthrough);
 }
 assert.deepEqual(bytes,before);
 const duplicated=restore([objects[0],{...objects[0],id:2}]);assert.equal(duplicated[0].glbPassthrough.images[0].data,duplicated[1].glbPassthrough.images[0].data,'existing pool/history uses shared immutable image bytes');
});
test('1025 actual import dispatcher keeps native resources during fit; stale topology refuses NOM and GLB cannot silently drop native maps',async()=>{
 const bytes=changeFile(await sourcePromise,j=>j.scene[0].matrix=[4,0,0,0,0,4,0,0,0,0,4,0,7,3,-2,1]),source=glbSource('import-mesh.js').replace(/await import\('\.\/nomad-import-core\.js\?v=[\d.]+'\)/,'{parseNomadMeshes:globalThis.parser}');
 const r=glbOwnerRuntime({importSource:source});r.c.parser=parseNomadMeshes;r.c.status={textContent:''};
 await r.c.importFile({name:'Textures.nom',size:bytes.length,arrayBuffer:async()=>bytes.buffer});assert.equal(r.added.length,1,r.status());
 const object=r.added[0],p=object.glbPassthrough;assert.equal(p.source,'nomad');assert(p.nomadImportFit.scale>0);assert.equal(p.uvTopologySignature,sig(object.mesh));compareResources(parseNomadMeshes(bytes).meshes[0].glbPassthrough,p);
 const original=parseNomadMeshes(bytes).meshes[0];assert.notEqual(p.nomadImportFit.scale,1);
 const exported=parseNomadMeshes(buildNomadProject([object],template,{topologySignature:sig}).bytes).meshes[0];
 exported.mesh.vertices.forEach((v,i)=>assert(v.distanceTo(original.mesh.vertices[i])<1e-6,'native source units/world positions restored'));
 await assert.rejects(r.build([object]),/NOMAD/);
 const snapshot=structuredClone(p);object.mesh.faces.pop();assert.throws(()=>buildNomadProject([object],template,{topologySignature:sig}),/matching Base/);assert.equal(JSON.stringify(p),JSON.stringify(snapshot));
});
test('1025 malformed image ranges/indices and native resource envelopes refuse before import mutation or project restoration',async()=>{
 const bytes=await sourcePromise;
 for(const fn of [j=>j.images[0].offset=1e12,j=>j.images[0].length=0,j=>j.materials[0].textures.color.index=999,j=>j.meshes[0].material=999,j=>j.materials[0].textures=[],j=>j.materials[0]=true])assert.throws(()=>parseNomadMeshes(changeFile(bytes,fn)),/(NOM|native)/);
 const p=parseNomadMeshes(bytes).meshes[0].glbPassthrough;
 for(const fn of [p=>p.nomadMaterial.textures.color.index=-1,p=>p.uvCorners[0][0][0]=Infinity,p=>p.images[0].data=new Uint8Array(25*1024*1024),p=>p.fakeGLB=true]){const q=structuredClone(p);fn(q);assert.throws(()=>validateNomadResource(q),/native NOM/);}
});
test('1025 real lit texture surface uses exact source UVs/5x tiling, shared decode limits, scene lighting, original picking and exact-once disposal',async()=>{
 const entry=parseNomadMeshes(await sourcePromise).meshes[0];entry.glbPassthrough.nomadMaterial.textures={color:entry.glbPassthrough.nomadMaterial.textures.color};const p=entry.glbPassthrough,ex=glbOwnerRuntime(),body=new THREE.Mesh(entry.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),hidden=new THREE.MeshBasicMaterial();body.castShadow=body.receiveShadow=true;
 const original=body.material,geometry=body.geometry,image={width:1024,height:1024,closed:0,close(){this.closed++;}};
 const overlay=createUVImageOverlay(body,entry.mesh,p,ex.c.buildUVPreviewGeometry,hidden,{lit:true,decode:async()=>image});assert(overlay);await tick();
 assert.equal(body.material,hidden);assert.equal(overlay.material.isMeshStandardMaterial,true);assert.equal(overlay.material.toneMapped,true);assert.equal(overlay.receiveShadow,true);assert.deepEqual(overlay.material.color.toArray(),[.8,.7,.6]);assert.equal(overlay.material.roughness,.3);assert.equal(overlay.material.metalness,.2);
 const texture=overlay.material.map;assert.deepEqual(texture.repeat.toArray(),[5,5]);assert.equal(texture.wrapS,THREE.RepeatWrapping);assert.equal(texture.wrapT,THREE.MirroredRepeatWrapping);assert.equal(texture.flipY,false);assert.equal(texture.colorSpace,THREE.SRGBColorSpace);assert.equal(texture.image,image);
 const expected=ex.c.buildUVPreviewGeometry(entry.mesh,p);assert.deepEqual([...overlay.geometry.attributes.uv.array],[...expected.attributes.uv.array]);expected.dispose();const hits=[];overlay.raycast({},hits);assert.deepEqual(hits,[]);
 geometry.dispose();overlay.userData.boxlabUVImageDispose();assert.equal(image.closed,1);assert.equal(body.material,original);assert.equal(body.children.length,0);
 for(const fn of [p=>p.nomadMaterial.textures.color.projection='triplanar',p=>p.nomadMaterial.textures.color.rotation=45,p=>p.nomadMaterial.textures.color.offset=[.5,0],p=>p.nomadMaterial.material_type='blending',p=>p.nomadMaterial.opacity=.5,p=>p.images[0].data=new Uint8Array(9*1024*1024)]){const q=structuredClone(p);fn(q);assert.equal(nomadColourSurfaceSource(q),null);assert.equal(createUVImageOverlay(body,entry.mesh,q,ex.c.buildUVPreviewGeometry,hidden),null);}
});
test('1025 actual Studio/Solid owners show active and inactive native Base texture and preserve modifier/other-look/lifecycle guards',async()=>{
 const p=parseNomadMeshes(await sourcePromise).meshes[0].glbPassthrough,ex=glbOwnerRuntime(),f=facegroupsRuntime(),images=[];
 function payload(mesh){return {...p,nomadMaterial:{...p.nomadMaterial,textures:{color:p.nomadMaterial.textures.color}},uvTopologySignature:sig(mesh),uvCorners:mesh.faces.map(face=>face.map((_,i)=>[i%2,Math.floor(i/2)]))};}
 f.activeObject.glbPassthrough=payload(f.source);f.other.glbPassthrough=payload(f.other.mesh);
 Object.assign(f.c,{studioMaterial:new THREE.MeshStandardMaterial(),studioInactiveMaterial:new THREE.MeshStandardMaterial(),checkerHiddenMaterial:new THREE.MeshBasicMaterial(),__boxlabExportAs:{buildUVPreviewGeometry:ex.c.buildUVPreviewGeometry},createUVImageOverlay:(...args)=>{const options=args[5]||{};return createUVImageOverlay(...args.slice(0,5),{...options,decode:async()=>{const i={width:1024,height:1024,closed:0,close(){this.closed++;}};images.push(i);return i;}});}});
 for(const mode of ['studio','solid']){
  f.c.mode=mode;f.c.__boxlabRenderModes.apply(f.body);await tick();assert(f.body.children.some(o=>o.userData.boxlabUVImagePreview&&o.visible&&o.material.isMeshStandardMaterial),mode);
  const inactive=new THREE.Mesh(f.other.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());inactive.userData={kind:'boxlab-inactive-body',objectId:'other'};f.c.__boxlabRenderModes.apply(inactive);await tick();assert(inactive.children.some(o=>o.userData.boxlabUVImagePreview&&o.visible));inactive.geometry.dispose();
 }
 for(const patch of [{visible:false},{settings:{subd:true}},{settings:{mirror:{x:true}}},{sourceId:'linked'},{kind:'reference'},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}}]){
  const old={...f.activeObject};Object.assign(f.activeObject,patch);f.c.__boxlabRenderModes.apply(f.body);await tick();assert(!f.body.children.some(o=>o.userData.boxlabUVImagePreview));for(const k of Object.keys(f.activeObject))delete f.activeObject[k];Object.assign(f.activeObject,old);
 }
 f.c.mode='solid';f.c.__boxlabRenderModes.apply(f.body);await tick();f.c.mode='clay';f.c.__boxlabRenderModes.apply(f.body);await tick();assert.equal(f.body.material,f.c.clayMaterial);assert(!f.body.children.some(o=>o.userData.boxlabUVImagePreview));assert(images.every(i=>i.closed===1));
});
test('1025 native display allocations are scene-bounded and cancellation frees the original encoded resources for later preview',async()=>{
 const entry=parseNomadMeshes(await sourcePromise).meshes[0];entry.glbPassthrough.nomadMaterial.textures={color:entry.glbPassthrough.nomadMaterial.textures.color};const ex=glbOwnerRuntime(),hidden=new THREE.MeshBasicMaterial(),overlays=[],images=[];
 const make=()=>createUVImageOverlay(new THREE.Mesh(entry.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),entry.mesh,entry.glbPassthrough,ex.c.buildUVPreviewGeometry,hidden,{lit:true,decode:async()=>{const i={width:1024,height:1024,closed:0,close(){this.closed++;}};images.push(i);return i;}});
 for(let i=0;i<4;i++){const overlay=make();assert(overlay);overlays.push(overlay);}
 assert.equal(make(),null);await tick();assert.equal(images.length,4);
 overlays.shift().userData.boxlabUVImageDispose();const replacement=make();assert(replacement);replacement.userData.boxlabUVImageDispose();
 for(const overlay of overlays)overlay.userData.boxlabUVImageDispose();await tick();assert(images.every(i=>i.closed===1));
 assert.equal(nomadColourSurfaceSource(entry.glbPassthrough).choice.data,entry.glbPassthrough.images[0].data);
});
