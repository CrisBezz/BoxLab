import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const pick=fs.readFileSync(new URL('../src/vertex-pick-assist.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('420 Vertex Pick Assist yields while a transform is armed',()=>{
  assert.ok(pick.includes('function transformArmed()'));
  assert.ok(pick.includes('api?.active?.()'));
  assert.ok(pick.includes("document.querySelector('#toolModes button.active[data-tool]')"));
  assert.ok(pick.includes('directToolActive()||transformArmed())return'));
});

test('420 in-flight Vertex pick is abandoned if transform ownership appears',()=>{
  assert.ok(pick.includes('if(addVertexSessionActive()||transformArmed()){press=null;return;}'));
  assert.ok(pick.includes('if(p.moved||addVertexSessionActive()||transformArmed())return;'));
});

test('420 component transform path and protected multi-object transform remain untouched',()=>{
  assert.ok(transform.includes('function startGesture(event)'));
  assert.ok(transform.includes("['move','scale','rotate'].includes(t)"));
  assert.ok(index.includes('src/multi-object-transform.js?v=0.36.1.0'));
});
