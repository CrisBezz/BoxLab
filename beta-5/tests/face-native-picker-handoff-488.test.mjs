import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('488 selected-face presses remain owned by direct tool',()=>{
  assert.match(direct,/selectedHit=hitSelectedFace\(event,m,selectionBefore,camera\)/);
  assert.match(direct,/if\(Number\.isInteger\(selectedHit\)\)\{pendingNativePress=null;event\.preventDefault\(\);event\.stopImmediatePropagation\(\);beginDirectDrag/);
});

test('488 unselected-face presses are handed to native main Face picker',()=>{
  const start=direct.indexOf("pendingNativePress={id:event.pointerId");
  assert.ok(start>0);
  const slice=direct.slice(start,start+700);
  assert.doesNotMatch(slice,/preventDefault\(\)|stopImmediatePropagation\(\)/);
  assert.match(slice,/queueMicrotask/);
  assert.match(slice,/const after=faces\(\),added=after\.find\(index=>!p\.selectionBefore\.includes\(index\)\)/);
});

test('488 native-selected face can promote into direct drag after threshold',()=>{
  assert.match(direct,/if\(!drag&&pendingNativePress\?\.id===event\.pointerId\)/);
  assert.match(direct,/Math\.hypot\(dx,dy\)>=8&&Number\.isInteger\(p\.hit\)/);
  assert.match(direct,/beginDirectDrag\(event,p\.hit,p\.selectionBefore,workingFaces\)/);
});

test('488 no duplicate live scene picker remains',()=>{
  assert.doesNotMatch(direct,/hitViewportFace/);
  assert.doesNotMatch(direct,/scene\.traverse/);
});

test('488 cache-hop and protected pins',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.488/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
