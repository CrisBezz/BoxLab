import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const prototype = fs.readFileSync(new URL('../src/boolean-prototype.js', import.meta.url), 'utf8');
const bsp = fs.readFileSync(new URL('../src/boolean-bsp.js', import.meta.url), 'utf8');

test('Boolean dispatcher routes degenerate input to sequential BSP fallback', () => {
  assert.match(prototype, /const DEGENERATE_INPUT='Degenerate face in Boolean input'/);
  assert.match(prototype, /stable\.reason===CONVEX_ONLY\|\|stable\.reason===DEGENERATE_INPUT/);
  assert.match(prototype, /boolean-bsp\.js\?v=0\.36\.18\.247/);
});

test('BSP can triangulate a face even when its aggregate Newell normal degenerates', () => {
  assert.match(bsp, /const VERSION='0\.36\.18\.247'/);
  assert.match(bsp, /const fn=faceNormal\(points\),hasFaceNormal=fn\.lengthSq\(\)>eps\*eps/);
  assert.match(bsp, /else\{\s*const tc=centroid\(tri\),outward=tc\.clone\(\)\.sub\(center\)/);
  assert.match(bsp, /if\(tn\.lengthSq\(\)<=eps\*eps\)continue/);
});
