import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { installLooseTopology } from '../src/loose-topology.js';
import { installBridgeTopology } from '../src/bridge-topology.js';
import { installTransactionalBridge } from '../src/bridge-transactional.js';
import { combineEditableMeshes, modifierSettingsCompatible } from '../src/object-join-core.js';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);
installTransactionalBridge(EditableMesh);

function separatedCubes(){
  const a=EditableMesh.cube(2),b=EditableMesh.cube(2);
  a.vertices.forEach(v=>v.z-=2);
  b.vertices.forEach(v=>v.z+=2);
  return[a,b];
}

test('277 combines two non-intersecting objects into one disconnected EditableMesh',()=>{
  const [a,b]=separatedCubes(),joined=combineEditableMeshes([a,b]);
  assert.ok(joined);
  assert.equal(joined.vertices.length,16);
  assert.equal(joined.faces.length,12);
  assert.ok(joined.vertices.some(v=>v.z<-2));
  assert.ok(joined.vertices.some(v=>v.z>2));
  assert.equal(globalThis.__boxlabTopology.validateTopology(joined,{allowBoundary:false}).ok,true);
});

test('277 offsets crease and loose-topology indices from later objects',()=>{
  const a=EditableMesh.cube(2),b=new EditableMesh(
    [new THREE.Vector3(10,0,0),new THREE.Vector3(11,0,0),new THREE.Vector3(11,1,0)],
    []
  );
  a.creases.set(a.edgeKey(0,1),0.25);
  b.ensureLooseTopology();
  b.addLooseEdge(0,1);
  b.looseVertices.add(2);
  b.creases.set(b.edgeKey(0,1),0.8);
  const joined=combineEditableMeshes([a,b]),offset=a.vertices.length;
  assert.equal(joined.creases.get(joined.edgeKey(0,1)),0.25);
  assert.equal(joined.creases.get(joined.edgeKey(offset,offset+1)),0.8);
  assert.ok(joined.looseEdges.has(joined.edgeKey(offset,offset+1)));
  assert.ok(joined.looseVertices.has(offset+2));
});

test('277 joined closed objects can immediately use existing face Bridge',()=>{
  const [a,b]=separatedCubes(),joined=combineEditableMeshes([a,b]);
  const result=joined.bridgeSelectedFaces([1,6]);
  assert.ok(result);
  assert.equal(result.faceIndices.length,4);
  assert.equal(globalThis.__boxlabTopology.validateTopology(joined,{allowBoundary:false}).ok,true);
});

test('277 modifier compatibility blocks destructive mixed modifier joins',()=>{
  const base={mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true};
  assert.equal(modifierSettingsCompatible([{settings:base},{settings:{...base,mirror:{...base.mirror}}}]),true);
  assert.equal(modifierSettingsCompatible([{settings:base},{settings:{...base,subd:true}}]),false);
  assert.equal(modifierSettingsCompatible([{settings:base},{settings:{...base,mirror:{x:true,y:false,z:false}}}]),false);
});

test('277 object manager and Selection toolbar own Join',()=>{
  const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(multi,/joinObjects\(ids\)/);
  assert.match(multi,/combineEditableMeshes/);
  assert.match(management,/const joinButton=document\.querySelector\('#joinObjectsBtn'\)/);
  assert.match(management,/manager\(\)\?\.joinObjects/);
  assert.match(management,/#joinObjectsBtn/);
});


test('278 Join button lives in Object Active Tools, not Selection toolbar',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const objectBlock=index.match(/<div class="mode-tools" data-mode-tools="object">[\s\S]*?<\/div><\/div>/)?.[0]||'';
  assert.match(objectBlock,/id="joinObjectsBtn"/);
  assert.doesNotMatch(objectBlock,/id="objectManagementTools"/);
  const management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.doesNotMatch(management,/toolbar\.append\([^\n]*joinButton/);
});
