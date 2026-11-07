import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {glbOwnerRuntime,decodeGLB,glbSource} from './helpers/glb-owner-runtime.mjs';
import {checkExportGroups,checkImportGroups,checkNomadPassthrough,checkCornerWeld,checkImportUV,checkExportUV} from './helpers/glb-owner-checks.mjs';

function grouped(){const mesh=EditableMesh.cube(2);mesh.faceGroups=['Front','Back','Front','Back','Front','Back'];return {id:1,name:'Grouped cube',mesh,settings:{mirror:{},subdLevel:1}};}
test('797 real GLB build retains one object, primitive group slots and Nomad group names',async()=>{
 const r=glbOwnerRuntime(),object=grouped(),result=await r.build([object]),{json}=decodeGLB(result.buffer);
 assert.equal(json.meshes.length,1);assert.equal(json.meshes[0].primitives.length,2);assert.deepEqual(json.meshes[0].extras.nomad.groups.map(g=>g.name),['Front','Back']);assert.deepEqual(json.meshes[0].primitives.map(p=>p.extras.nomad.group),[0,1]);assert.equal(new Set(json.meshes[0].primitives.map(p=>p.material)).size,1);assert.ok(result.verification.pass);
 const imported=await r.import(result.buffer);assert.equal(imported.length,1);assert.deepEqual([...new Set(imported[0].mesh.faceGroups)].sort(),['Back','Front']);
});
test('797 imported material fallback survives malformed Nomad group metadata',()=>{
 const r=glbOwnerRuntime(),geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,1,0,0,0,1,0],3));
 const material=new THREE.MeshBasicMaterial();material.name='Fallback';
 for(const group of [-1,9,.5,'0']){const root=new THREE.Group(),node=new THREE.Mesh(geometry,material);node.userData.nomad={groups:[{name:'Nomad'}]};geometry.userData.nomad={group};root.add(node);assert.equal(r.c.importedMeshes(root)[0].mesh.faceGroups[0],'Fallback');}
 geometry.userData.nomad={group:0};const root=new THREE.Group(),node=new THREE.Mesh(geometry,material);root.userData.nomad={groups:[{name:'Parent group'}]};root.add(node);assert.equal(r.c.importedMeshes(root)[0].mesh.faceGroups[0],'Parent group');geometry.dispose();material.dispose();
});
test('797 GLB behavior rejects lost groups, UV weld seams, stale UV restoration and corrupted image bytes',async()=>{
 const importer=glbSource('import-mesh.js'),exporter=glbSource('export-as-panel.js');
 await assert.rejects(()=>checkExportGroups({importSource:importer.replace('const primitiveGroup=node.geometry.userData?.nomad?.group;', 'const primitiveGroup=undefined;')}),assert.AssertionError);
 assert.throws(()=>checkCornerWeld({exportSource:exporter.replace("if(uvComplete&&!collapseUV)parts.push('u:'", "if(false)parts.push('u:'")}),assert.AssertionError);
 await assert.rejects(()=>checkExportUV({exportSource:exporter.replace('passthrough.uvTopologySignature===topology','true')}),assert.AssertionError);
 await assert.rejects(()=>checkNomadPassthrough({exportSource:exporter.replace('appendBinary(imageEntry.data)','appendBinary(new Uint8Array([0]))')}),assert.AssertionError);
});
