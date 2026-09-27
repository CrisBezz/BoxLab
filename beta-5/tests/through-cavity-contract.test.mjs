import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(path, import.meta.url), 'utf8');

const kernel = read('../src/through-kernel.js');
const direct = read('../src/multi-face-direct.js');
const html = read('../index.html');

test('v242 cavity-aware Through keeps ordered target planning', () => {
  assert.match(kernel, /cavity-aware ordered Through targets/);
  assert.match(kernel, /const targets=\[\]/);
  assert.match(kernel, /targets\.push\(\{first:h\.min,depth:h\.max\}\)/);
  assert.match(kernel, /targets:c\.targets\.map\(t=>\(\{\.\.\.t\}\)\)/);
});

test('v242 drag controller can stop at each cavity exit and continue farther', () => {
  assert.match(direct, /through-kernel\.js\?v=0\.36\.18\.242/);
  assert.match(direct, /targets=\(p\.targets\?\.length\?p\.targets:/);
  assert.match(direct, /targetDepth:target\.depth/);
  assert.match(kernel, /plan\?\.targetDepth/);
});

test('Through rollback/closed-topology guards remain active', () => {
  assert.match(kernel, /validateThrough\(trial,eps\)/);
  assert.match(kernel, /extractBoundaryLoops\(trial\)/);
  assert.match(kernel, /unintended-opening/);
  assert.match(kernel, /topologyTransaction\(trial/);
});

test('protected transform stays pinned and no service worker is introduced', () => {
  assert(html.includes('src/multi-object-transform.js?v=0.36.1.0'));
  assert(!/serviceWorker\s*\.\s*register|navigator\s*\.\s*serviceWorker/i.test(html));
});
