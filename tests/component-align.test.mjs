import test from 'node:test';
import assert from 'node:assert/strict';
import {componentVertexIndices,componentAxisTarget,alignComponentAxis,componentAnchorVertexIndices,componentAnchorCoordinate,alignComponentAxisToAnchor} from '../src/component-align-core.js';
import fs from 'node:fs';

function mesh(){
  return {
    vertices:[
      {x:0,y:0,z:0},{x:2,y:1,z:0},{x:4,y:3,z:2},{x:6,y:5,z:4}
    ],
    faces:[[0,1,2],[1,2,3]],
    edges(){return[{a:0,b:1},{a:1,b:2},{a:2,b:3}];}
  };
}

test('329 component vertex expansion supports vertex edge and face selections',()=>{
  const m=mesh();
  assert.deepEqual(componentVertexIndices(m,'vertex',[0,2]),[0,2]);
  assert.deepEqual(componentVertexIndices(m,'edge',[1]),[1,2]);
  assert.deepEqual(componentVertexIndices(m,'face',[1]),[1,2,3]);
});

test('329 axis align target uses selected average coordinate',()=>{
  const m=mesh();
  assert.equal(componentAxisTarget(m,[0,2],'x'),2);
  assert.equal(componentAxisTarget(m,[1,3],'y'),3);
});

test('329 Align X flattens only X and preserves other coordinates',()=>{
  const m=mesh();
  const before=m.vertices.map(v=>({...v}));
  const result=alignComponentAxis(m,[0,2],'x');
  assert.equal(result.target,2);
  assert.equal(m.vertices[0].x,2);
  assert.equal(m.vertices[2].x,2);
  assert.equal(m.vertices[0].y,before[0].y);
  assert.equal(m.vertices[2].z,before[2].z);
});

test('330 component Align UI has one authoritative drawer loader',()=>{
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.equal((drawer.match(/component-align\.js\?v=0\.36\.18\.330/g)||[]).length,1);
  assert.doesNotMatch(index,/component-align\.js\?v=/);
});


test('330 anchor coordinate uses selected component centre on chosen axis',()=>{
  const m=mesh();
  assert.deepEqual(componentAnchorVertexIndices(m,'edge',1),[1,2]);
  assert.equal(componentAnchorCoordinate(m,'edge',1,'x'),3);
  assert.equal(componentAnchorCoordinate(m,'face',0,'y'),4/3);
});

test('330 anchor-aware Align preserves anchor vertices and moves only the others',()=>{
  const m=mesh();
  const before=m.vertices.map(v=>({...v}));
  const selected=componentVertexIndices(m,'face',[0,1]);
  const fixed=componentAnchorVertexIndices(m,'face',0);
  const target=componentAnchorCoordinate(m,'face',0,'x');
  const result=alignComponentAxisToAnchor(m,selected,'x',target,fixed);
  assert.equal(result.target,2);
  assert.equal(m.vertices[0].x,before[0].x);
  assert.equal(m.vertices[1].x,before[1].x);
  assert.equal(m.vertices[2].x,before[2].x);
  assert.equal(m.vertices[3].x,2);
  assert.equal(m.vertices[3].y,before[3].y);
  assert.equal(m.vertices[3].z,before[3].z);
});

test('330 component Align UI is arm-then-pick and uses amber anchor cue',()=>{
  const ui=fs.readFileSync(new URL('../src/component-align.js',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(ui,/tap one selected/);
  assert.match(ui,/componentAlignAnchorMarker/);
  assert.match(ui,/#f3b34a/);
  assert.match(ui,/window\.addEventListener\('pointerdown'/);
  assert.match(ui,/applyAnchor\(hit,event\)/);
  assert.equal((drawer.match(/component-align\.js\?v=0\.36\.18\.330/g)||[]).length,1);
});
