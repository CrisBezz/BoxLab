import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {makeCylinder} from '../src/primitive-factory.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {EditableMesh} from '../src/mesh.js';
import {createBoxUV,createCylinderUV,scaleImportedUV} from '../src/imported-uv-edit.js';
import {createUVCheckerOverlay} from '../src/uv-checker-preview.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {facegroupsRuntime} from './helpers/facegroups-render-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=exporter.c.topologySignature,build=exporter.c.buildUVPreviewGeometry;
const history={capture:()=>({}),checkpointSnapshot:()=>true};
function cube(){const mesh=EditableMesh.cube(2),object={id:'active',mesh,settings:{}};assert(createBoxUV(object,mesh,signature,history).ok);return {mesh,object};}
test('879 original GLB builder supplies exact live-space preview corner UVs and triangles, with no resource/source mutation',async()=>{
 const {mesh,object}=cube(),payload=object.glbPassthrough,before=JSON.stringify(mesh),pb=JSON.stringify(payload);
 const g=build(mesh,payload);assert(g);assert.equal(g.index.count,36);const p=g.getAttribute('position'),uv=g.getAttribute('uv');
 for(let i=0;i<p.count;i++)assert(mesh.vertices.some((v,id)=>v.x===p.getX(i)&&v.y===p.getY(i)&&v.z===p.getZ(i)&&mesh.faces.some((f,fi)=>f.some((vid,j)=>vid===id&&Math.fround(payload.uvCorners[fi][j][0])===uv.getX(i)&&Math.fround(payload.uvCorners[fi][j][1])===uv.getY(i)))));
 // Imported fit metadata must not transform the temporary display back to file coordinates.
 const imported={...payload,source:'glb',boxlabImportFit:{scale:10,center:[100,200,300]}};const ig=build(mesh,imported);assert.deepEqual([...ig.attributes.position.array],[...p.array]);
 assert.equal(JSON.stringify(mesh),before);assert.equal(JSON.stringify(payload),pb);assert.equal(object.glbPassthrough,payload);
 const glb=await exporter.build([object]);assert.equal(glb.uvRestoredCount,1);g.dispose();ig.dispose();
});
test('879 preview rejects stale/partial/invalid/unsafe/budget channels before geometry and preserves concave source triangulation',()=>{
 const {mesh,object}=cube(),p=object.glbPassthrough;
 for(const payload of [null,{...p,source:'unknown'},{...p,version:2},{...p,uvTopologySignature:'stale'},{...p,uvCorners:[]},{...p,uvCorners:p.uvCorners.map((f,i)=>i?f:null)},{...p,uvCorners:p.uvCorners.map(f=>f.map(()=>[Infinity,0]))}])assert.equal(build(mesh,payload),null);
 const bad=mesh.clone();bad.faces[0]=[0,1,1];assert.equal(build(bad,{...p,uvTopologySignature:signature(bad)}),null);
 const huge=mesh.clone();huge.vertices[0].x=1e100;assert.equal(build(huge,p),null);
 const dense={vertices:mesh.vertices,faces:Array(5001).fill(mesh.faces[0])};assert.equal(build(dense,{...p,uvTopologySignature:signature(dense),uvCorners:Array(5001).fill(p.uvCorners[0])}),null);
 const concave=new EditableMesh([[0,0,0],[2,0,0],[2,1,0],[1,1,0],[1,2,0],[0,2,0]],[[0,1,2,3,4,5]]),payload={version:1,source:'boxlab',uvTopologySignature:signature(concave),uvCorners:[[[0,0],[1,0],[1,.5],[.5,.5],[.5,1],[0,1]]]};
 const g=build(concave,payload);assert(g);assert.equal(g.index.count,12);g.dispose();
});
test('879 temporary real Three overlay retains body geometry/picking and disposes exactly once on native rebuild or mode cleanup',()=>{
 const {mesh,object}=cube(),g=mesh.triangulatedGeometry(),material=new THREE.MeshStandardMaterial(),body=new THREE.Mesh(g,material),p=object.glbPassthrough;
 const overlay=createUVCheckerOverlay(body,mesh,p,build);assert(overlay);assert.equal(body.geometry,g);assert.equal(body.material,material);assert.equal(body.children.length,1);const hits=[];overlay.raycast({},hits);assert.deepEqual(hits,[]);assert.match(overlay.material.fragmentShader,/fract\(checkerUV\)/);
 let gd=0,md=0;overlay.geometry.addEventListener('dispose',()=>gd++);overlay.material.addEventListener('dispose',()=>md++);
 g.dispose();assert.equal(body.children.length,0);overlay.userData.boxlabUVCheckerDispose();assert.equal(gd,1);assert.equal(md,1);
 const next=createUVCheckerOverlay(body,mesh,p,build);let n=0;next.geometry.addEventListener('dispose',()=>n++);next.userData.boxlabUVCheckerDispose();g.dispose();assert.equal(n,1);
});
test('879 actual render owner selects active/live and inactive/base UVs, fallback guards, ordinary look restoration and UV session refresh',()=>{
 const f=facegroupsRuntime(),{object}=cube();f.activeObject.glbPassthrough=object.glbPassthrough;f.source.faceGroups=[];
 // Actual bridge mesh has facegroups; generate a channel with its authoritative signature.
 assert(createBoxUV(f.activeObject,f.source,signature,history).ok);
 Object.assign(f.c,{createUVCheckerOverlay,__boxlabExportAs:{buildUVPreviewGeometry:build},checkerHiddenMaterial:new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false})});
 const originalGeometry=f.body.geometry,payload=f.activeObject.glbPassthrough;f.c.mode='uvchecker';f.c.__boxlabRenderModes.apply(f.body);assert.equal(f.body.material,f.c.checkerHiddenMaterial);assert.equal(f.body.geometry,originalGeometry);assert.equal(f.body.children.filter(c=>c.userData.boxlabUVCheckerPreview).length,1);
 const first=f.body.children[0],prior=first.geometry.attributes.uv.array.slice();assert(scaleImportedUV(f.activeObject,f.source,signature,history,2,{island:0,payload}).ok);
 // Exercise the actual session-completion listener, which refreshes without a mesh edit.
 const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');let listener;f.c.window={addEventListener:(name,fn)=>{if(name==='boxlab-tool-session-change')listener=fn;}};vm.runInContext(source.slice(source.indexOf("window.addEventListener('boxlab-tool-session-change'"),source.indexOf('function syncFacegroupControls')),f.c);listener({detail:{id:'mesh-health',active:false}});assert.notDeepEqual([...f.body.children[0].geometry.attributes.uv.array],[...prior]);
 for(const patch of [{settings:{subd:true}},{settings:{mirror:{x:true}}},{sourceId:'s'},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}}]){
  const o=f.activeObject,saved={...o};Object.assign(o,patch);f.c.__boxlabRenderModes.apply(f.body);assert.notEqual(f.body.material,f.c.checkerHiddenMaterial);assert.equal(f.body.children.some(c=>c.userData.boxlabUVCheckerPreview),false);Object.keys(o).forEach(k=>delete o[k]);Object.assign(o,saved);
 }
 f.c.__boxlabRenderModes.apply(f.body);assert.equal(f.body.material,f.c.checkerHiddenMaterial);f.c.set('clay');assert.equal(f.body.material,f.c.clayMaterial);assert.equal(f.body.geometry,originalGeometry);assert.equal(f.body.children.some(c=>c.userData.boxlabUVCheckerPreview),false);
 const inactive=new THREE.Mesh(f.other.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());inactive.userData={kind:'boxlab-inactive-body',objectId:f.other.id};assert(createBoxUV(f.other,f.other.mesh,signature,history).ok);f.c.mode='uvchecker';f.c.__boxlabRenderModes.apply(inactive);assert.equal(inactive.material,f.c.checkerHiddenMaterial);inactive.geometry.dispose();
});

test('879 Cylinder seam/cap variants remain independent; preview lifecycle leaves native NOM bytes unchanged',()=>{
 const mesh=makeCylinder(1,2,12,2),object={id:'cylinder',name:'Cylinder',mesh,settings:{}};assert(createCylinderUV(object,mesh,signature,history).ok);
 const template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),before=buildNomadProject([object],template,{topologySignature:signature}).bytes;
 const body=new THREE.Mesh(mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),overlay=createUVCheckerOverlay(body,mesh,object.glbPassthrough,build),p=overlay.geometry.attributes.position,uv=overlay.geometry.attributes.uv;
 const atSeam=new Set();for(let i=0;i<p.count;i++)if(Math.abs(p.getX(i)-mesh.vertices[0].x)<1e-7&&Math.abs(p.getY(i)-mesh.vertices[0].y)<1e-7&&Math.abs(p.getZ(i)-mesh.vertices[0].z)<1e-7)atSeam.add(uv.getX(i)+','+uv.getY(i));assert.equal(atSeam.size,3);
 overlay.userData.boxlabUVCheckerDispose();assert.deepEqual(buildNomadProject([object],template,{topologySignature:signature}).bytes,before);
});
