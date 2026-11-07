import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('450 OBJ download uses model/obj MIME and .obj filename',()=>{
  const source=fs.readFileSync(new URL('../src/scene-obj-export-238.js',import.meta.url),'utf8');
  assert.match(source,/type:'model\/obj'/);
  assert.match(source,/\.obj`/);
  assert.doesNotMatch(source,/type:'text\/plain;charset=utf-8'/);
});
