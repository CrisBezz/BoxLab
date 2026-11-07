import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('529 deliberate preselection suppresses sequential overlap substitution',()=>{
  assert.match(direct,/let preferSequentialUnselected = false;/);
  assert.match(direct,/preferSequentialUnselected=false;disarmTransforms/);
  assert.match(direct,/armed==='extrude'&&preferSequentialUnselected&&selectionBefore\.length===1/);
});

test('529 successful Extrude enables only the next sequential overlap opportunity',()=>{
  assert.match(direct,/preferSequentialUnselected=true;/);
});

test('529 explicit Face tap resets sequential overlap preference',()=>{
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\);\n      preferSequentialUnselected=false;/);
});

test('529 runtime pin current and protected transform unchanged',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.529/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
