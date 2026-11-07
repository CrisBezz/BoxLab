import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const revolve=fs.readFileSync(new URL('../src/revolve.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('471 Sweep mode-switch cancel does not self-cancel initial Add transition',()=>{
  assert.match(sweep,/const activeAtClick=pathObject\(\);if\(!activeAtClick\)return/);
  assert.match(sweep,/activeNow\?\.id===activeAtClick\.id/);
  assert.match(sweep,/window\.addEventListener\('boxlab-add-sweep-path',\(\)=>addSweepPath\(\)\)/);
});

test('471 Edge Revolve is no longer mounted in Edge Active Tools',()=>{
  assert.doesNotMatch(revolve,/edgeTools\?\.appendChild\(controls\)/);
  assert.match(revolve,/Edge Revolve UI intentionally not mounted/);
});

test('471 changed Sweep and Revolve modules are cache-hopped',()=>{
  assert.match(index,/src\/sweep-path\.js\?v=0\.36\.18\.471/);
  assert.match(index,/src\/revolve\.js\?v=0\.36\.18\.471/);
});
