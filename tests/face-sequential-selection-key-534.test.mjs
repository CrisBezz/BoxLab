import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');

test('534 sequential overlap preference is bound to committed selection key',()=>{
  assert.match(direct,/let sequentialSelectionKey = null;/);
  assert.match(direct,/sequentialSelectionKey=faceSelectionKey\(d\.faces\)/);
  assert.match(direct,/sequentialValid=preferSequentialUnselected&&sequentialSelectionKey===faceSelectionKey\(selectionBefore\)/);
});

test('534 any Face selection change clears sequential overlap preference',()=>{
  assert.match(direct,/if\(preferSequentialUnselected&&sequentialSelectionKey!==faceSelectionKey\(\)\)clearSequentialPreference\(\)/);
});

test('534 explicit tool and tap paths clear sequential preference',()=>{
  assert.match(direct,/clearSequentialPreference\(\);armed=null/);
  assert.match(direct,/clearSequentialPreference\(\);\n      updateStatus/);
});
