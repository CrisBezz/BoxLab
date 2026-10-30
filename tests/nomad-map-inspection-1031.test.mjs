import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {nomadMapInspectionFixture} from './helpers/nomad-map-inspection-fixture.mjs';
import {createUVImagePreview} from '../src/uv-image-preview.js';
import {nativeImageChoices as importedUVImageChoices} from '../src/nomad-uv-image-choices.js';
import {createUVWorkspace} from '../src/uv-workspace.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {parseNomadMeshes} from '../src/nomad-import-core.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature as sig} from '../src/mesh-topology-signature.js';
const fixture=nomadMapInspectionFixture(),slots=['color','normal','emissive','roughness','metalness','opacity','displacement'],tick=()=>new Promise(r=>setImmediate(r));
const bitmap=()=>({width:128,height:128,closed:0,close(){this.closed++;}});
test('1031 native choices use exact separate images/names, not packed G/B or viewport support inference; default consumers stay colour-only',async()=>{
 const {objects}=await fixture,p=objects[0].glbPassthrough,before=JSON.stringify(p),choices=importedUVImageChoices(p,undefined,[...slots,'normal','unknown']);
 assert.deepEqual(choices.map(c=>c.slot),slots);assert.equal(importedUVImageChoices(p).length,1);
 for(const c of choices){assert.equal(c.data,p.images[p.nomadMaterial.textures[c.slot].index].data);assert.equal(c.channel,undefined);assert.match(c.label,/^NOM · /);assert.match(c.referenceStatus,/inspection only/);assert.match(c.referenceStatus,/mapping not applied/);}
 assert.match(choices[3].label,/Roughness/);assert.doesNotMatch(choices[3].label,/\(G\)/);assert.doesNotMatch(choices[4].label,/\(B\)/);
 assert.equal(choices.at(-1).data[24],16);assert.equal(p.nomadMaterial.textures.displacement.projection,'triplanar');assert.equal(JSON.stringify(p),before);
 const q=structuredClone(p);delete q.nomadMaterial.textures.color;assert.equal(importedUVImageChoices(q,undefined,slots).length,6);
});
test('1031 malformed native resources and MIME/budget failures refuse safely; unsafe names are plain labels and bad image cannot hide the other maps',async()=>{
 const {objects}=await fixture,p=objects[0].glbPassthrough;
 for(const edit of [q=>q.images[0].data=null,q=>q.nomadMaterial.textures.color.index=999,q=>q.uvCorners=[],q=>q.nomadMaterial.textures=[]]){const q=structuredClone(p);edit(q);assert.deepEqual(importedUVImageChoices(q,undefined,slots),[]);}
 assert.deepEqual(importedUVImageChoices(p,{maxBytes:0},slots),[]);assert.deepEqual(importedUVImageChoices(p,{maxBytes:25*1024*1024},slots),[]);
 const q=structuredClone(p),i=q.nomadMaterial.textures.displacement.index;q.images[i].definition.type='image/jpeg';assert.deepEqual(importedUVImageChoices(q,undefined,slots).map(c=>c.slot),slots.slice(0,-1));
 const huge=structuredClone(p),index=huge.nomadMaterial.textures.displacement.index,bytes=new Uint8Array(8*1024*1024+1);bytes.set(huge.images[index].data);huge.images[index].data=bytes;assert(!importedUVImageChoices(huge,undefined,slots).some(c=>c.slot==='displacement'));
 const named=structuredClone(p);named.nomadMaterial.textures.normal.name='<img src=x onerror=bad()>';assert(importedUVImageChoices(named,undefined,slots).find(c=>c.slot==='normal').label.endsWith('<img src=x onerror=bad()>'));
});
test('1031 original preview controller keeps native slot across refresh; late switch/close and failed decode release images with no resource writes',async()=>{
 const {objects}=await fixture,p=objects[0].glbPassthrough,before=JSON.stringify(p),requests=[];
 const preview=createUVImagePreview({slots,resolveChoices:importedUVImageChoices,decode:choice=>new Promise((resolve,reject)=>requests.push({choice,resolve,reject}))});preview.setPayload(p);preview.enable(true);await tick();preview.choose(6);await tick();
 const stale=bitmap();requests[0].resolve(stale);await tick();assert.equal(stale.closed,1);const displacement=bitmap();requests[1].resolve(displacement);await tick();assert.match(preview.view.status,/Raw Displacement image · inspection only/);
 preview.setPayload(p);await tick();assert.equal(requests.length,2);assert.equal(preview.view.choices[preview.view.index].slot,'displacement');assert.equal(preview.view.image,displacement);
 preview.choose(1);await tick();assert.equal(displacement.closed,1);requests[2].reject(Error('bad normal'));await tick();assert.match(preview.view.status,/Could not decode/);preview.choose(5);await tick();preview.close();const late=bitmap();requests[3].resolve(late);await tick();assert.equal(late.closed,1);assert.equal(preview.view.image,null);assert.equal(JSON.stringify(p),before);
});
function node(){const fields=new Map(),events=new Map(),captures=new Set();return {hidden:false,style:{},attrs:{},children:[],append(...n){this.children.push(...n);},appendChild(n){this.children.push(n);},setAttribute(k,v){this.attrs[k]=v;},querySelector(k){if(!fields.has(k))fields.set(k,node());return fields.get(k);},addEventListener(k,fn){events.set(k,[...(events.get(k)||[]),fn]);},fire(k,e={}){for(const fn of events.get(k)||[])fn({button:0,cancelable:true,stopPropagation(){},preventDefault(){},...e});},getBoundingClientRect(){return {left:0,top:0,width:1000,height:600};},setPointerCapture:id=>captures.add(id),hasPointerCapture:id=>captures.has(id),releasePointerCapture:id=>captures.delete(id),captures};}
test('1031 actual read-only native UV workspace uses existing Image/dropdown/canvas and closes/reopens without changing source, selection navigation or history',async()=>{
 const {objects}=await fixture,p=objects[0].glbPassthrough,before=JSON.stringify(p),keys=['document','window','ResizeObserver','devicePixelRatio','__boxlabUVWorkspace','createImageBitmap'],old=keys.map(k=>Object.getOwnPropertyDescriptor(globalThis,k)),root=node(),canvas=node(),images=[],draws=[];let creates=0,edits=0,history=0,api;
 const ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill','save','restore','rect','clip','translate','scale','drawImage'].map(k=>[k,(...args)=>draws.push([k,...args])]));
 globalThis.document={head:node(),querySelector:()=>node(),createElement:()=>++creates===2?root:node()};globalThis.window={addEventListener(){},removeEventListener(){}};globalThis.ResizeObserver=undefined;globalThis.devicePixelRatio=2;canvas.getContext=()=>ctx;globalThis.createImageBitmap=async()=>{const image=bitmap();images.push(image);return image;};
 try{
  api=createUVWorkspace({canvas,note:node(),controls:node(),getTransformContext:()=>({payload:p}),canEdit:()=>false,onDone(){},onHistory(){history++;},onTransform(){edits++;}});
  api.setReport({state:'ready',islandCount:1,faceIslands:[0],previewIslands:[0],previewFaces:[[[0,0],[1,0],[0,1]]],bounds:{minU:0,minV:0,maxU:1,maxV:1}},'Native NOM');api.open();
  const button=root.querySelector('[data-uv="image"]'),chooser=root.querySelector('[data-uv="image-source"]');assert.equal(button.disabled,false);assert.equal(chooser.hidden,false);assert.equal(chooser.children.slice(-7).length,7);button.fire('click');await tick();
  const view=api.view;chooser.value='6';chooser.fire('change');await tick();assert.equal(images[0].closed,1);assert.match(root.querySelector('.uv-image-status').textContent,/Raw Displacement/);assert(draws.some(c=>c[0]==='drawImage'&&c[1]===images[1]));assert.deepEqual(api.view,view);
  for(const selector of ['move','scale','drag-move','drag-scale','drag-rotate','fit-tile','pack','density'])assert.equal(root.querySelector(`[data-uv="${selector}"]`).disabled,true);
  api.close();assert.equal(images[1].closed,1);api.open();assert.equal(button.attrs['aria-pressed'],'false');assert.equal(chooser.value,'0');api.close();assert.equal(edits,0);assert.equal(history,0);assert.equal(JSON.stringify(p),before);
 }finally{api?.close();keys.forEach((key,i)=>old[i]?Object.defineProperty(globalThis,key,old[i]):delete globalThis[key]);}
});
test('1031 inspected source images and sixteen-bit displacement survive pooled/inline SaveOpen and real native NOM export/parse unchanged; checked sample matches',async()=>{
 const {objects,template,bytes}=await fixture;
 for(const poolImages of [false,true]){const restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene({objects,activeId:objects[0].id},{poolImages}))),(...a)=>new EditableMesh(...a)).objects;assert.deepEqual(buildNomadProject(restored,template,{topologySignature:sig,name:'BoxLab NOM map inspection'}).bytes,bytes);}
 const parsed=parseNomadMeshes(bytes);assert.equal(importedUVImageChoices(parsed.meshes[0].glbPassthrough,undefined,slots).length,7);assert.deepEqual(new Uint8Array(fs.readFileSync(new URL('../docs/samples/NOM_MAP_INSPECTION_1031.nom',import.meta.url))),bytes);
});
