import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {applyMirror} from '../src/mirror.js';
import {analyzeSolidifyInput,solidifyOpenMesh} from '../src/solidify-core.js';

function mirroredHalfSheet(){
  const half=new EditableMesh(
    [
      new THREE.Vector3(0,0,0),
      new THREE.Vector3(1,0,0),
      new THREE.Vector3(1,1,0),
      new THREE.Vector3(0,1,0)
    ],
    [[0,1,2,3]]
  );
  return applyMirror(half,{x:true,y:false,z:false});
}

test('430 base open sheet remains the authoritative Solidify input while Mirror stays non-destructive',()=>{
  const base=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ],[[0,1,2,3]]);
  const preflight=analyzeSolidifyInput(base);
  assert.ok(preflight.ok);
  assert.ok(preflight.boundaryEdges>=4);
});

test('430 base sheet solidifies cleanly while mirrored display remains a modifier concern',()=>{
  const evaluated=mirroredHalfSheet();
  const result=solidifyOpenMesh(evaluated,0.2);
  assert.ok(result.ok);
  const edgeUse=new Map();
  for(const face of evaluated.faces)for(let i=0;i<face.length;i++){
    const a=face[i],b=face[(i+1)%face.length],key=a<b?(a+':'+b):(b+':'+a);
    edgeUse.set(key,(edgeUse.get(key)||0)+1);
  }
  assert.ok([...edgeUse.values()].every(count=>count===2));
});

test('430 Solidify runtime preserves Mirror and mirrors only the preview display',()=>{
  const ui=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8')).version;
  assert.ok(ui.includes("previewEvaluatedSource(live"));
  assert.ok(ui.includes("const displayMesh=mirrored?applyMirror(working,axes):working"));
  assert.ok(ui.includes("const preflight=analyzeSolidifyInput(live)"));
  assert.ok(ui.includes("const result=solidifyOpenMesh(live,thickness())"));
  assert.ok(ui.includes("Mirror preserved"));
  assert.ok(!ui.includes("clearMirrorModifier()"));
  assert.ok(index.includes('src/solidify.js?v=0.36.18.430'));
  assert.equal(beta4,'0.36.18.427');
});
