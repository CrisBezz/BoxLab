import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {glbOwnerRuntime,decodeGLB} from './glb-owner-runtime.mjs';
export function groupedGLBObject(){const mesh=EditableMesh.cube(2);mesh.faceGroups=['Front','Back','Front','Back','Front','Back'];return{id:1,name:'Grouped cube',mesh,settings:{mirror:{},subdLevel:1}};}
export function checkImportGroups(options={}){
 const r=glbOwnerRuntime(options),geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,1,0,0,1,1,0,0,1,0],3));geo.setIndex([0,1,2,0,2,3]);geo.addGroup(0,3,0);geo.addGroup(3,3,1);
 const a=new THREE.MeshBasicMaterial(),b=new THREE.MeshBasicMaterial();a.userData.boxlabFaceGroup='Walls';b.name='BoxLabFG::Roof%20cap';
 const converted=r.c.geometryToEditableMesh(geo,new THREE.Matrix4().makeTranslation(2,3,4),[a,b],'Fallback');
 assert.deepEqual(Array.from(converted.mesh.faceGroups),['Walls','Roof cap']);assert.deepEqual(converted.mesh.vertices[0].toArray(),[2,3,4]);
 const plain=geo.clone();plain.clearGroups();assert.deepEqual(Array.from(r.c.geometryToEditableMesh(plain,new THREE.Matrix4(),null,'Fallback').mesh.faceGroups),['Fallback','Fallback']);
 geo.dispose();plain.dispose();a.dispose();b.dispose();
}
export async function checkExportGroups(options={}){
 const r=glbOwnerRuntime(options),object=groupedGLBObject(),before=JSON.stringify({vertices:object.mesh.vertices.map(v=>v.toArray()),faces:object.mesh.faces,groups:object.mesh.faceGroups}),result=await r.build([object]),{json}=decodeGLB(result.buffer);
 assert.equal(json.meshes.length,1);assert.equal(json.meshes[0].primitives.length,2);assert.deepEqual(json.meshes[0].extras.nomad.groups.map(g=>g.name),['Front','Back']);assert.deepEqual(json.meshes[0].primitives.map(p=>p.extras.nomad.group),[0,1]);assert.equal(new Set(json.meshes[0].primitives.map(p=>p.material)).size,1);assert.ok(result.verification.pass);assert.equal(JSON.stringify({vertices:object.mesh.vertices.map(v=>v.toArray()),faces:object.mesh.faces,groups:object.mesh.faceGroups}),before);
 const imported=await r.import(result.buffer);assert.equal(imported.length,1);assert.deepEqual([...new Set(imported[0].mesh.faceGroups)].sort(),['Back','Front']);
 const separate=glbOwnerRuntime();await separate.import(result.buffer,{split:true});assert.equal(separate.added.length,2);assert.deepEqual(separate.added.map(o=>o.name).sort(),['RoundTrip • Back','RoundTrip • Front']);
 return{r,result};
}
export async function checkNomadPassthrough(options={}){
 const r=glbOwnerRuntime(options),objects=[groupedGLBObject(),{...groupedGLBObject(),id:2,name:'Other'}];
 for(const o of objects)o.glbPassthrough={meshExtras:{custom:'kept',nomad:{version:2,layers:[{name:'Sculpt'}]}},nodeExtras:{customNode:'kept'}};
 const result=await r.build(objects);assert.equal(result.objectDetails[0].passthrough,objects[0].glbPassthrough);let {json}=decodeGLB(result.buffer);assert.equal(json.meshes[0].extras.custom,'kept');assert.equal(json.meshes[0].extras.nomad.layers[0].name,'Sculpt');assert.equal(json.nodes.find(n=>n.mesh===0).extras.customNode,'kept');
 const image=new Uint8Array([137,80,78,71,13,10,26,10]);
 const payload={materials:[{pbrMetallicRoughness:{baseColorTexture:{index:0},metallicFactor:.3},normalTexture:{index:0}}],textures:[{source:0,sampler:0}],samplers:[{wrapS:33071}],images:[{definition:{mimeType:'image/png'},data:image}],materialIndices:[0]};
 const patched=r.c.patchNomadFaceGroupGLB(result.buffer,result.objectDetails.map(d=>({...d,passthrough:{...d.passthrough,...payload}}))),decoded=decodeGLB(patched);json=decoded.json;
 assert.equal(json.images.length,2);assert.equal(json.textures.length,2);
 for(let i=0;i<2;i++){const mat=json.materials[json.meshes[i].primitives[0].material];assert.equal(mat.pbrMetallicRoughness.baseColorTexture.index,i);assert.equal(mat.normalTexture.index,i);assert.equal(json.textures[i].source,i);assert.equal(json.textures[i].sampler,i);const view=json.bufferViews[json.images[i].bufferView];assert.deepEqual(decoded.bin.slice(view.byteOffset,view.byteOffset+view.byteLength),image);assert.equal(view.byteOffset%4,0);}
 const preserved=r.c.parseGLBPassthrough(patched);assert.equal(preserved.objects.length,2);assert.deepEqual(preserved.objects[0].images[0].data,image);
 // Bytes/container references only: intentionally no image decoding or texture render proof.
}
export function checkCornerWeld(options={}){
 const r=glbOwnerRuntime(options),mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2],[0,2,3]]);
 const base=r.c.editableToGeometry(mesh);assert.equal(base.vertexCount,4);assert.equal(base.indexCount,6);base.geometry.dispose();
 for(const key of ['uvs','tangents','colors','morphTargets']){
  const values=key==='uvs'?[0,0]:key==='tangents'?[1,0,0,1]:[.2,.3,.4];const channel=mesh.faces.map(face=>face.map(()=>[...values]));
  channel[1][0][0]=.8;const channels=key==='morphTargets'?{morphTargets:[{position:channel}]}:{[key]:channel};
  const result=r.c.editableToGeometry(mesh,channels);assert.equal(result.vertexCount,5,key);assert.equal(result.indexCount,6);result.geometry.dispose();
 }
 const fan=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[-1,0,0],[0,-1,0]],[[0,1,2],[0,2,3],[0,3,4],[0,4,1]]);
 const uvs=fan.faces.map((face,i)=>face.map(id=>id===0?[i/4,0]:[id/4,1]));const tangents=fan.faces.map((face,i)=>face.map(id=>id===0?[i,1,0,1]:[1,0,0,1]));
 const pole=r.c.editableToGeometry(fan,{uvs,tangents});assert.equal(pole.vertexCount,5);assert.equal(pole.indexCount,12);pole.geometry.dispose();
 for(const key of ['colors','morphTargets']){const data=fan.faces.map((face,i)=>face.map(id=>id===0?[i/4,0,0]:[0,0,0]));const channels=key==='morphTargets'?{morphTargets:[{position:data}]}:{colors:data};const result=r.c.editableToGeometry(fan,{uvs,tangents,...channels});assert.equal(result.vertexCount,8,key+' pole seam');result.geometry.dispose();}
}
export async function checkImportDiagnostics(options={}){
 const r=glbOwnerRuntime(options),object=groupedGLBObject(),result=await r.build([object]);await r.import(result.buffer);
 const report=r.c.__boxlabNomadRoundTrip.lastImport;assert.equal(report.objects,1);assert.equal(report.faceGroups,2);assert.equal(report.details[0].faceGroups,2);assert.equal(report.details[0].name,'Grouped_cube');
 assert.equal(report.uvObjects,0);assert.equal(report.tangentObjects,0);assert.equal(report.vertexColorObjects,0);assert.equal(report.morphObjects,0);
}
export function checkImportUV(options={}){
 const r=glbOwnerRuntime(options),geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,1,0,0,1,1,0,0,1,0],3));geo.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,1,1,0,1],2));geo.setIndex([0,1,2,0,2,3]);
 const entry=r.c.geometryToEditableMesh(geo,new THREE.Matrix4(),null,'Walls');assert.deepEqual(JSON.parse(JSON.stringify(entry.cornerUVs)),[[[0,0],[1,0],[1,1]],[[0,0],[1,1],[0,1]]]);
 entry.glbPassthrough={};r.c.addImported([entry],'UV',{reconstructQuads:true});const o=r.added[0];assert.equal(o.mesh.faces.length,1);assert.equal(o.glbPassthrough.uvCorners[0].length,4);assert.equal(o.glbPassthrough.uvTopologySignature,r.c.topologySignature(o.mesh));assert.equal(r.c.__boxlabNomadRoundTrip.lastImport.uvObjects,1);geo.dispose();
 o.mesh.faces[0].forEach((id,local)=>{const v=o.mesh.vertices[id],uv=o.glbPassthrough.uvCorners[0][local];assert.ok(Math.abs(uv[0]-(v.x+1)/2)<1e-9);assert.ok(Math.abs(uv[1]-(v.y+1)/2)<1e-9);});
}
export async function checkExportUV(options={}){
 const r=glbOwnerRuntime(options),mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]]),uvs=[[[0,0],[1,0],[1,1],[0,1]]],object={id:1,name:'UV',mesh,settings:{subdLevel:1},glbPassthrough:{uvCorners:uvs,uvTopologySignature:r.c.topologySignature(mesh)}};
 const base=await r.build([object]);assert.equal(base.uvRestoredCount,1);assert.equal(base.verification.pass,true);assert.ok(decodeGLB(base.buffer).json.meshes[0].primitives[0].attributes.TEXCOORD_0!==undefined);
 const loaded=await r.decode(base.buffer);let seen=0;loaded.traverse(node=>{if(!node.isMesh)return;const uv=node.geometry.getAttribute('uv');assert.ok(uv);assert.equal(uv.count,4);assert.deepEqual(Array.from({length:4},(_,i)=>[uv.getX(i),uv.getY(i)].join(',')).sort(),['0,0','0,1','1,0','1,1']);seen++;});assert.equal(seen,1);
 mesh.vertices[1].x=2;assert.equal((await r.build([object])).uvRestoredCount,1);
 mesh.faces[0]=[0,3,2,1];const changed=await r.build([object]);assert.equal(changed.uvRestoredCount,0);assert.equal(decodeGLB(changed.buffer).json.meshes[0].primitives[0].attributes.TEXCOORD_0,undefined);
 mesh.faces[0]=[0,1,2,3];const subd=await r.build([object],true);assert.equal(subd.uvRestoredCount,0);assert.equal(decodeGLB(subd.buffer).json.meshes[0].primitives[0].attributes.TEXCOORD_0,undefined);
}
