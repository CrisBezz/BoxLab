import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 retains recovered OBJ facegroup support files',()=>{
 assert.equal(fs.existsSync(new URL('../src/obj-facegroups-core.js',import.meta.url)),true);
 assert.equal(fs.existsSync(new URL('../src/facegroup-colours-core.js',import.meta.url)),true);
});
