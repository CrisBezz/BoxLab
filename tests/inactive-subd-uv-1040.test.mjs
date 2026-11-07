import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {subdivide,subdivideWithCornerUVs} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
import {createSubdDisplayCache,subdCornerUVPreviewSource} from '../src/subd-display-cache.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {facegroupsRuntime} from './helpers/facegroups-render-runtime.mjs';
import {nomadPBRFixture} from './helpers/nomad-pbr-fixture.mjs';

const source=EditableMesh.cube(1);
const sourceUVs=source.faces.map((face,faceIndex)=>face.map((_,corner)=>[faceIndex%2+corner%2,Math.floor(faceIndex/2)+Math.floor(corner/2)]));
function displayRuntime(objects){
 const c={subdivide,subdivideWithCornerUVs,applyMirror,createSubdDisplayCache,subdCornerUVPreviewSource,objects,linkedSources:new Map(),globalThis:null};c.globalThis=c;
 c.__boxlabExportAs={topologySignature:meshTopologySignature,maxUVPreviewCorners:20000};
 vm.createContext(c);
 const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
 const start=source.indexOf('const inactiveSubdCaches='),end=source.indexOf('\nfunction queueOutliner()',start);
 assert(start>=0&&end>start);
 vm.runInContext(source.slice(start,end)+'\nglobalThis.display=displayMeshFor;globalThis.preview=displayUVPreviewFor;',c);
 return c;
}

test('.1040 inactive NOM SubD objects use their own cached geometry-plus-corner-UV preview',()=>{
 const a={id:'a',mesh:source,kind:'editable',settings:{subd:true,subdLevel:1,mirror:{}},glbPassthrough:{source:'nomad',uvTopologySignature:meshTopologySignature(source),uvCorners:sourceUVs}};
 const alternate=sourceUVs.map(face=>face.map(([u,v])=>[u+.25,v+.125]));
 const b={id:'b',mesh:source,kind:'editable',settings:{subd:true,subdLevel:1,mirror:{}},glbPassthrough:{source:'nomad',uvTopologySignature:meshTopologySignature(source),uvCorners:alternate}};
 const c=displayRuntime([a,b]),displayA=c.display(a),payloadA=c.preview(displayA),displayB=c.display(b),payloadB=c.preview(displayB);
 assert.notEqual(displayA,displayB,'each inactive object retains its own display cache');
 assert.deepEqual(JSON.parse(JSON.stringify(payloadA.uvCorners)),subdivideWithCornerUVs(source,sourceUVs,1).cornerUVs);
 assert.deepEqual(JSON.parse(JSON.stringify(payloadB.uvCorners)),subdivideWithCornerUVs(source,alternate,1).cornerUVs);
 assert.equal(payloadA.uvTopologySignature,meshTopologySignature(displayA));
 assert.equal(c.display(a),displayA,'unchanged inactive object reuses the exact display mesh');
 assert.equal(c.preview(displayA).uvCorners,payloadA.uvCorners,'unchanged inactive object reuses the cached UV array');
});

test('.1040 inactive texture eligibility shares stale-data, Mirror and corner-cap rules with the active renderer',()=>{
 const object={kind:'editable',glbPassthrough:{source:'nomad',uvTopologySignature:meshTopologySignature(source),uvCorners:sourceUVs}};
 assert(subdCornerUVPreviewSource(source,object,1,{},meshTopologySignature));
 assert.equal(subdCornerUVPreviewSource(source,object,1,{x:true},meshTopologySignature),null);
 object.glbPassthrough.uvTopologySignature='stale';assert.equal(subdCornerUVPreviewSource(source,object,1,{},meshTopologySignature),null);
 object.glbPassthrough.uvTopologySignature=meshTopologySignature(source);
 assert.equal(subdCornerUVPreviewSource(source,object,4,{},meshTopologySignature,100),null);
 const c=displayRuntime([{...object,mesh:source,settings:{subd:true,subdLevel:1,mirror:{x:true}}}]);
 const mirrored=c.display(c.objects[0]);assert.equal(c.preview(mirrored),null,'mirrored display keeps its established untextured fallback');
});

test('.1040 inactive render bodies pass the generated SubD UV preview into the existing Studio/Solid overlay owner',async()=>{
 const {objects}=await nomadPBRFixture(),f=facegroupsRuntime(),images=[],level=1,result=subdivideWithCornerUVs(f.other.mesh,sourceUVs,level);
 f.other.kind='editable';f.other.settings={subd:true,subdLevel:level,mirror:{}};
 f.other.glbPassthrough={...objects[1].glbPassthrough,uvTopologySignature:meshTopologySignature(result.mesh),uvCorners:result.cornerUVs};
 const inactive=new THREE.Mesh(result.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());
 inactive.userData={kind:'boxlab-inactive-body',objectId:f.other.id,boxlabSubdUVPreview:{mesh:result.mesh,payload:f.other.glbPassthrough}};
 Object.assign(f.c,{studioMaterial:new THREE.MeshStandardMaterial(),studioInactiveMaterial:new THREE.MeshStandardMaterial(),checkerHiddenMaterial:new THREE.MeshBasicMaterial(),__boxlabExportAs:{buildUVPreviewGeometry:(mesh,payload)=>mesh.triangulatedGeometry(),topologySignature:meshTopologySignature},createUVImageOverlay:(...args)=>createUVImageOverlay(...args.slice(0,5),{...args[5],decode:async()=>{const image={width:16,height:16,close(){this.closed=(this.closed||0)+1;}};images.push(image);return image;}})});
 for(const mode of ['studio','solid']){f.c.set(mode);f.c.__boxlabRenderModes.apply(inactive);await new Promise(resolve=>setImmediate(resolve));const overlay=inactive.children.find(child=>child.userData.boxlabUVImagePreview);assert(overlay?.visible);assert(overlay.material.map);}
 f.c.__boxlabRenderModes.clear(inactive);assert(images.every(image=>image.closed===1));
});

test('.1040 inactive layer attaches the cached preview payload and clears overlay ownership before reuse',()=>{
 const sourceText=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
 assert.match(sourceText,/const uvPayload=displayUVPreviewFor\(display\);\s*if\(uvPayload\)inactive\.userData\.boxlabSubdUVPreview=\{mesh:display,payload:uvPayload\}/);
 assert.match(sourceText,/globalThis\.__boxlabRenderModes\?\.clear\?\.\(child\)/);
});
