import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {meshTopologySignature as signature} from '../src/mesh-topology-signature.js';
import {planFacegroupSeams} from '../src/facegroup-uv-core.js';
import {createFacegroupAtlasUV} from '../src/imported-uv-edit.js';
import {inspectImportedUV,importedUVIslandBounds} from '../src/imported-uv-inspection.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
const owner=glbOwnerRuntime().c,options={yieldControl:async()=>{}};
const fixture=()=>{const mesh=EditableMesh.cube();mesh.faceGroups=mesh.faces.map((_,i)=>'Group '+i);let checkpoints=0;const object={id:1,name:'Cube',mesh,settings:{}};return{mesh,object,history:{capture:()=>({}),checkpointSnapshot:()=>{checkpoints++;return true;}},get checkpoints(){return checkpoints;}};};
async function project(f,extra={}){return createFacegroupAtlasUV(f.object,f.mesh,signature,f.history,owner,{...options,...extra});}
function check(f,count){const report=inspectImportedUV(f.mesh,f.object.glbPassthrough,signature);assert.equal(report.state,'ready');assert.equal(report.islandCount,count);assert.equal(report.missingFaces,0);assert.equal(report.outsideCorners,0);const bounds=Array.from({length:count},(_,id)=>importedUVIslandBounds(f.object.glbPassthrough.uvCorners,report.faceIslands.flatMap((v,i)=>v===id?[i]:[])));for(let i=0;i<count;i++)for(let j=i+1;j<count;j++){const a=bounds[i],b=bounds[j];assert(a.maxU<b.minU||b.maxU<a.minU||a.maxV<b.minV||b.maxV<a.minV);}return report;}
test('1000 six cube Facegroups become exactly six packed islands with original geometry/groups and one Undo checkpoint',async()=>{
 const f=fixture(),before=JSON.stringify(f.mesh),plan=planFacegroupSeams(f.mesh);assert(plan.ok);assert.equal(plan.seams.length,12);
 const result=await project(f);assert(result.ok,result.reason);check(f,6);assert.equal(JSON.stringify(f.mesh),before);assert.equal(f.checkpoints,1);
 const again=await project(f);assert(again.ok,again.reason);assert.equal(again.changed,false);assert.equal(f.checkpoints,1);
 const decoded=decodeBoxlabScene(encodeBoxlabScene({objects:[f.object]}),(...args)=>new EditableMesh(...args));assert.deepEqual(decoded.objects[0].glbPassthrough.uvCorners,f.object.glbPassthrough.uvCorners);
});
test('1000 connected curved group crosses cube corners without introducing extra islands or seams inside that group',async()=>{
 const f=fixture();f.mesh.faceGroups=['A','B','A','B','A','B'];const plan=planFacegroupSeams(f.mesh);assert(plan.ok,plan.reason);assert.equal(plan.islandCount,2);
 const result=await project(f);assert(result.ok,result.reason);const report=check(f,2);for(let i=0;i<6;i++)for(let j=0;j<6;j++)assert.equal(report.faceIslands[i]===report.faceIslands[j],f.mesh.faceGroups[i]===f.mesh.faceGroups[j]);
});
test('1000 harmonic flattening handles an interior vertex in a curved patch and retains one connected island',async()=>{
 const f=fixture();f.mesh=new EditableMesh([[0,0,1],[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0]],[[0,1,2],[0,2,3],[0,3,4],[0,4,1]],null,['A','A','A','A']);f.object.mesh=f.mesh;
 const result=await project(f);assert(result.ok,result.reason);const report=check(f,1);assert.equal(report.boundaryEdges,4);const uv=f.object.glbPassthrough.uvCorners;for(const corners of uv)assert.deepEqual(corners[0],uv[0][0]);
});
test('1000 closed, missing-group, pinched, non-manifold and inconsistent-winding targets refuse without mutation/history',async()=>{
 for(const kind of ['closed','absent','winding','nonmanifold']){
  const f=fixture();if(kind==='closed')f.mesh.faceGroups.fill('A');if(kind==='absent')f.mesh.faceGroups.fill(null);if(kind==='winding')f.mesh.faces[0].reverse();if(kind==='nonmanifold'){f.mesh.faces.push([...f.mesh.faces[0]]);f.mesh.faceGroups.push('C');}
  const before=JSON.stringify(f.object),result=await project(f);assert.equal(result.ok,false,kind);assert.equal(JSON.stringify(f.object),before);assert.equal(f.checkpoints,0);
 }
});
test('1000 paint, lock, mirror, stale async target and cancellation preserve resources and history',async()=>{
 for(const patch of [{colourPaint:{}},{locked:true},{settings:{mirror:{x:true}}}]){const f=fixture();Object.assign(f.object,patch);const before=JSON.stringify(f.object);assert.equal((await project(f)).ok,false);assert.equal(JSON.stringify(f.object),before);assert.equal(f.checkpoints,0);}
 const f=fixture();const result=await project(f,{yieldControl:async()=>{f.mesh.faceGroups[0]='Changed';}});assert.equal(result.ok,false);assert.equal(f.object.glbPassthrough,undefined);assert.equal(f.checkpoints,0);
 const cancelled=fixture();assert.equal((await project(cancelled,{cancelled:()=>true})).ok,false);assert.equal(cancelled.checkpoints,0);
});
test('1000 disconnected regions of the same group stay separate; a group with a hole refuses rather than inserting hidden cuts',async()=>{
 const f=fixture();f.mesh=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[3,0,0],[4,0,0],[3,1,0]],[[0,1,2],[3,4,5]],null,['Same','Same']);f.object.mesh=f.mesh;
 const result=await project(f);assert(result.ok,result.reason);check(f,2);
 const ring=new EditableMesh([[-2,-2,0],[2,-2,0],[2,2,0],[-2,2,0],[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0]],[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]],null,['Ring','Ring','Ring','Ring']);
 assert.equal(planFacegroupSeams(ring).ok,false);assert.match(planFacegroupSeams(ring).reason,/boundary|disk|hole/);
});
test('1000 planar patches retain their rectangle proportions instead of being forced onto a circular boundary',async()=>{
 const f=fixture();f.mesh=new EditableMesh([[0,0,0],[4,0,0],[4,1,0],[0,1,0]],[[0,1,2,3]],null,['Long']);f.object.mesh=f.mesh;
 assert((await project(f)).ok);const uv=f.object.glbPassthrough.uvCorners[0],length=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);assert(Math.abs(length(uv[0],uv[1])/length(uv[1],uv[2])-4)<1e-10);
});
