import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import * as THREE from 'three';
import {cageHarness,metadataReader,newReader} from './helpers/cage-group-profile.mjs';
test('1097 actual cage/Multi/group path eliminates per-proxy active mesh/history synchronization',()=>{
 const before=cageHarness({legacy:true}),after=cageHarness();try{before.build();after.build();assert.deepEqual(after.signature(),before.signature());assert.equal(before.counts().saves,before.root.children.length);assert.equal(after.counts().saves,1);assert.equal(after.counts().clones,2);}finally{before.dispose();after.dispose();}
});
for(const mode of ['vertex','edge','face','object'])for(const group of [false,true])test(`1097 ${mode} group=${group} retains exact cage and face picking proxies`,()=>{
 const a=cageHarness({legacy:true,mode,group}),b=cageHarness({mode,group});try{a.build();b.build();assert.deepEqual(b.signature(),a.signature());
  const hits=h=>{h.root.updateMatrixWorld(true);const ray=new THREE.Raycaster(new THREE.Vector3(.5,5,.5),new THREE.Vector3(0,-1,0));return ray.intersectObjects(h.root.children,false).map(hit=>({kind:hit.object.userData.kind,index:hit.object.userData.index,distance:hit.distance}));};
  assert.deepEqual(hits(b),hits(a));assert.equal(b.counts().saves,1);}finally{a.dispose();b.dispose();}
});
test('1097 hidden and solo exclusion retain exact observer visibility',()=>{
 for(const settings of [{hidden:true},{soloId:2}]){const a=cageHarness({legacy:true,...settings}),b=cageHarness(settings);try{a.build();b.build();assert.deepEqual(b.signature(),a.signature());assert(b.root.children.every(o=>!o.visible));}finally{a.dispose();b.dispose();}}
});
test('1097 group metadata never touches linked/reference geometry, settings or history and returns fresh membership',()=>{
 assert.match(fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8'),/\n    groupMetadata,\n    get objects\(\)/);
 const forbidden=()=>{throw Error('geometry/history read');},a={id:1,groupId:7,sourceId:1},b={id:2,groupId:7,kind:'reference'};
 for(const o of [a,b])for(const key of ['mesh','history','settings'])Object.defineProperty(o,key,{get:forbidden});
 const c={objects:[a,b]};vm.createContext(c);vm.runInContext(metadataReader,c);
 const s={manager:()=>({groupMetadata:c.groupMetadata}),objects:forbidden,selectedIds:new Set([1,2])};vm.createContext(s);vm.runInContext(newReader,s);
 assert.equal(s.selectedWholeGroupId(),7);const snapshot=c.groupMetadata();snapshot[0].groupId=9;assert.equal(a.groupId,7);
 b.groupId=8;assert.equal(s.selectedWholeGroupId(),null);b.groupId=7;s.selectedIds.delete(2);assert.equal(s.selectedWholeGroupId(),null);c.objects.pop();assert.equal(s.selectedWholeGroupId(),7);
 c.objects=[{id:3,groupId:4}];s.selectedIds=new Set([3]);assert.equal(s.selectedWholeGroupId(),4);s.selectedIds.clear();assert.equal(s.selectedWholeGroupId(),null);
});
test('1097 legacy manager fallback still resolves whole groups',()=>{
 const objects=[{id:1,groupId:7},{id:2,groupId:7}],c={manager:()=>({}),objects:()=>objects,selectedIds:new Set([1,2])};vm.createContext(c);vm.runInContext(newReader,c);assert.equal(c.selectedWholeGroupId(),7);assert.equal(c.selectedWholeGroupId([objects[0]]),null);
});
