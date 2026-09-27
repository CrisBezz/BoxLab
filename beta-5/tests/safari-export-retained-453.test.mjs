import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 retains Safari OBJ MIME fix',()=>{
 const s=fs.readFileSync(new URL('../src/scene-obj-export-238.js',import.meta.url),'utf8');
 assert.match(s,/type:'model\/obj'/);
});
