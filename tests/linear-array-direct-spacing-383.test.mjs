import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');

test('Array direct viewport drag remains preview-only',()=>{
  const drag=ui.slice(ui.indexOf('function beginEndpointDrag'),ui.indexOf('function sync(){'));
  assert.match(drag,/intersectObject\(preview,true\)/);
  assert.match(drag,/if\(ctl\)ctl\.enabled=false/);
  assert.doesNotMatch(drag,/checkpoint|capture\?\.\(/);
});
