import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
import {subdivide,subdivideWithCornerUVs} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
import {createSubdDisplayCache} from '../src/subd-display-cache.js';
import {subdCornerUVPreviewSource} from '../src/subd-display-cache.js';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const data=mesh=>({vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces,creases:[...mesh.creases],groups:mesh.faceGroups});
function grid(side){
 const vertices=[],faces=[],uvs=[];
 for(let y=0;y<=side;y++)for(let x=0;x<=side;x++)vertices.push(new THREE.Vector3(x/side,y/side,0));
 for(let y=0;y<side;y++)for(let x=0;x<side;x++){
  const a=y*(side+1)+x;faces.push([a,a+1,a+side+2,a+side+1]);
  uvs.push([[x/side,y/side],[(x+1)/side,y/side],[(x+1)/side,(y+1)/side],[x/side,(y+1)/side]]);
 }
 return{mesh:new EditableMesh(vertices,faces),uvs};
}

test('.1039 active SubD cache reuses one geometry-plus-UV result and invalidates on UV edits',()=>{
 let calls=0;const cache=createSubdDisplayCache((m,l)=>{calls++;return subdivide(m,l);},applyMirror,(m,u,l)=>{calls++;return subdivideWithCornerUVs(m,u,l);});
 const {mesh,uvs}=grid(2),axes={x:false,y:false,z:false};
 const first=cache.getWithCornerUVs(mesh,2,axes,uvs);assert(first);assert.deepEqual(data(first.display),data(subdivide(mesh,2)));
 assert.equal(first.cornerUVs.length,first.display.faces.length);assert.equal(first.cornerUVs.reduce((n,f)=>n+f.length,0),first.display.faces.length*4);
 assert.equal(cache.getWithCornerUVs(mesh,2,{...axes},uvs).display,first.display);assert.equal(cache.hit,true);assert.equal(calls,1);
 uvs[0][0][0]+=.125;const edited=cache.getWithCornerUVs(mesh,2,axes,uvs),expected=subdivideWithCornerUVs(mesh,uvs,2);assert.notEqual(edited.display,first.display);assert.deepEqual(edited.cornerUVs,expected.cornerUVs);assert.equal(calls,2);
 assert.equal(cache.getWithCornerUVs(mesh,2,{x:true},uvs),null,'mirrored UV previews are deliberately unsupported');
});

test('.1039 active NOM source validation rejects stale UVs, Mirror and output beyond the surface preview cap',()=>{
 const start=main.indexOf('function activeMirrorAxes()'),end=main.indexOf('\nfunction modifiedSubdMesh(',start);assert(start>=0&&end>start);
 const c={subdEnabled:true,subdLevel:1,mirrorAxes:{x:false,y:false,z:false},mesh:EditableMesh.cube(),globalThis:null};c.globalThis=c;
 const payload={source:'nomad',uvTopologySignature:meshTopologySignature(c.mesh),uvCorners:c.mesh.faces.map(()=>[[0,0],[1,0],[1,1],[0,1]])};
 c.__boxlabObjectManager={activeId:1,objects:[{id:1,kind:'editable',settings:{subd:true},glbPassthrough:payload}]};
 c.__boxlabExportAs={topologySignature:meshTopologySignature,maxUVPreviewCorners:20000};c.subdCornerUVPreviewSource=subdCornerUVPreviewSource;c.subdivideWithCornerUVs=subdivideWithCornerUVs;c.subdDisplayCache=createSubdDisplayCache(subdivide,applyMirror,subdivideWithCornerUVs);c.subdivide=subdivide;c.applyMirror=applyMirror;vm.createContext(c);vm.runInContext(main.slice(start,end)+'\nglobalThis.check=activeSubdUVSource;globalThis.displayResult=modifiedSubdDisplayResult;',c);
 assert(c.check());const result=c.displayResult(true);assert.deepEqual(data(result.display),data(subdivide(c.mesh,1)));assert.equal(result.uvPayload.uvTopologySignature,meshTopologySignature(result.display));assert.deepEqual(result.uvPayload.uvCorners,subdivideWithCornerUVs(c.mesh,payload.uvCorners,1).cornerUVs);const cached=c.displayResult(true);assert.equal(cached.display,result.display);assert.equal(cached.uvPayload.uvCorners,result.uvPayload.uvCorners);
 payload.uvTopologySignature='stale';assert.equal(c.check(),null);payload.uvTopologySignature=meshTopologySignature(c.mesh);c.mirrorAxes.x=true;assert.equal(c.check(),null);c.mirrorAxes.x=false;
 const large=grid(16);c.mesh=large.mesh;c.subdLevel=4;c.__boxlabObjectManager.objects[0].glbPassthrough={source:'nomad',uvTopologySignature:meshTopologySignature(large.mesh),uvCorners:large.uvs};assert.equal(c.check(),null);
});

test('.1039 main renderer attaches UV data to the actual cached SubD body and releases overlays before cache reuse',()=>{
 assert.match(main,/createSubdDisplayCache\(subdivide,applyMirror,subdivideWithCornerUVs\)/);
 assert.match(main,/body\.userData\.boxlabSubdUVPreview=\{mesh:displayMesh,payload:subdResult\.uvPayload\}/);
 assert.match(main,/globalThis\.__boxlabRenderModes\?\.clear\?\.\(child\)/);
 const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 assert.match(render,/settings\.subd&&!mirrors\?body\.userData\.boxlabSubdUVPreview:null/);
 assert.match(render,/clear:clearRenderChildren/);
});
