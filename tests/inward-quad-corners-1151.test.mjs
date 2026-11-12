import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {cornerBand} from './helpers/corner-band-fixture.mjs';
import {snapshot,volume} from './helpers/negative-extrude-runtime.mjs';
import {assemblyProfile} from './helpers/through-assembly-profile.mjs';
import {EditableMesh} from '../src/mesh.js';
import {buildNegativeExtrude,validateThrough} from '../src/through-kernel.js';

const legacy=assemblyProfile({transform:s=>s.replace('trial=rebuildInwardBandFrames(before,trial,ids,eps);','')});
function fourBands(){
 const vertices=[],faces=[],ids=[];
 for(let component=0;component<4;component++){
  const {mesh,ids:band}=cornerBand({subdivisions:1,profile:[[0,0],[2,0],[2,2],[0,2]]});
  const vertexOffset=vertices.length,faceOffset=faces.length,offset=new THREE.Vector3(component*5,0,0);
  for(const point of mesh.vertices)vertices.push(point.clone().add(offset));
  for(const face of mesh.faces)faces.push(face.map(id=>id+vertexOffset));
  ids.push(...band.map(id=>id+faceOffset));
 }
 return {mesh:new EditableMesh(vertices,faces),ids};
}
function assertBandCorners(mesh,component){
 const point=p=>p.clone().add(new THREE.Vector3(component*5,0,0));
 for(const z of [-.1,.1])for(const [x,y] of [[0,0],[2,0],[2,2],[0,2]]){
  const a=point(new THREE.Vector3(x,y,z));
  const b=point(new THREE.Vector3(x===0?.2:1.8,y===0?.2:1.8,z));
  const ai=mesh.vertices.findIndex(v=>v.distanceTo(a)<1e-7),bi=mesh.vertices.findIndex(v=>v.distanceTo(b)<1e-7);
  assert(ai>=0&&bi>=0,`corner endpoints exist for region ${component}`);
  assert(mesh.edges().some(e=>e.a===ai&&e.b===bi||e.a===bi&&e.b===ai),`region ${component} has the diagonal shoulder edge`);
 }
}

test('1151 repairs inward shoulder corners independently across four selected regions',()=>{
 const {mesh,ids}=fourBands(),before=snapshot(mesh),baseline=legacy.run('buildNegativeExtrude',mesh,ids,-.2).result;
 const result=buildNegativeExtrude(mesh,ids,-.2);
 assert(result.ok,result.reason);
 assert.equal(snapshot(mesh),before,'source stays unchanged');
 assert(validateThrough(result.mesh).ok);
 for(let region=0;region<4;region++)assertBandCorners(result.mesh,region);
 assert.ok(Math.abs(volume(result.mesh)-volume(baseline.mesh))<1e-7,'retopology keeps cut volume');
});
