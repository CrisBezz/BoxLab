import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const router=fs.readFileSync(new URL('../src/delete-key-router.js',import.meta.url),'utf8');

test('387 delete-key router runtime is loaded',()=>{
  assert.match(index,/delete-key-router\.js\?v=0\.36\.18\.387/);
  assert.match(index,/data-release-version="0\.36\.18\.387"/);
});

test('387 routes each selection mode to existing authoritative delete button',()=>{
  assert.match(router,/mode==='vertex'.*#deleteVertexBtn/s);
  assert.match(router,/mode==='edge'.*#deleteEdgeBtn/s);
  assert.match(router,/mode==='face'.*#deleteFaceBtn/s);
  assert.match(router,/mode==='object'.*#outlinerDeleteBtn/s);
  assert.match(router,/button\.click\(\)/);
});

test('387 handles Delete and Backspace in capture phase',()=>{
  assert.match(router,/event\.key!=='Delete'&&event\.key!=='Backspace'/);
  assert.match(router,/window\.addEventListener\('keydown',handleDeleteKey,true\)/);
  assert.match(router,/stopImmediatePropagation/);
});

test('387 ignores editable text controls and modified shortcuts',()=>{
  assert.match(router,/isContentEditable/);
  assert.match(router,/tag==='input'\|\|tag==='textarea'\|\|tag==='select'/);
  assert.match(router,/event\.altKey\|\|event\.ctrlKey\|\|event\.metaKey/);
});

test('387 does not implement topology mutation itself',()=>{
  assert.doesNotMatch(router,/deleteFace\(|deleteEdge\(|deleteVertex\(|faces\.splice|vertices\.splice/);
});
