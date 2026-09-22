import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('403 defines point-to-segment hit testing for closed profile insertion',()=>{
  assert.ok(source.includes('function segmentDistance(point,a,b)'));
  assert.ok(source.includes('THREE.MathUtils.clamp'));
  assert.ok(source.includes('point.distanceTo(a.clone().addScaledVector(ab,t))'));
});

test('403 closed profile insertion still uses nearest segment and inserts after it',()=>{
  assert.ok(source.includes("seg=m.profileClosed&&hit===null&&m.profilePoints.length>2?nearestProfileSegment(event,f,m):null"));
  assert.ok(source.includes('m.profilePoints.splice(seg+1,0,localProfile(f,world))'));
});

test('403 closing segment participates in hit testing',()=>{
  assert.ok(source.includes('b=screenPoint(pts[(i+1)%pts.length])'));
});
