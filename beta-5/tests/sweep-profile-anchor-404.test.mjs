import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('404 selected-profile Sweep has explicit anchor helpers',()=>{
  assert.ok(source.includes('function profileAnchor2D(m)'));
  assert.ok(source.includes('function profileAnchorWorld(frame,m)'));
  assert.ok(source.includes('function sweepProfile2D(m)'));
  assert.ok(source.includes('m.profileAnchorIndex'));
});

test('404 first Follow Edge establishes selected-profile vertex anchor',()=>{
  assert.ok(source.includes('function alignSelectionProfileAnchorToEdge(frame,m,hit)'));
  assert.ok(source.includes("if(!m.selectionProfile||m.profileType!=='draw'||!m.profilePoints.length||m.pathPoints.length)return null"));
  assert.ok(source.includes('m.profileAnchorIndex=best.i'));
  assert.ok(source.includes('const delta=start.clone().sub(anchorWorld)'));
  assert.ok(source.includes('for(const v of mesh.vertices)v.add(delta)'));
});

test('404 selected profile is rebased around anchor instead of centroid',()=>{
  assert.ok(source.includes('return profile2D(m).map(p=>({x:p.x-a.x,y:p.y-a.y}))'));
  assert.ok(source.includes('buildSweepProfile(pathWorld(frame,m),sweepProfile2D(m)'));
});

test('404 first anchored edge does not add centroid lead-in',()=>{
  assert.ok(source.includes('if(anchored){'));
  assert.ok(source.includes('m.pathPoints.push({x:anchored.end.x,y:anchored.end.y,z:anchored.end.z})'));
  const anchoredBlock=source.slice(source.indexOf('if(anchored){'),source.indexOf('const current=pathWorld(frame,m)'));
  assert.equal(anchoredBlock.includes('frame.center'),false);
});
