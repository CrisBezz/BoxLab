import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 keeps proven render look list',()=>{
 const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 for(const look of ['studio','solid','clay','matcap','normals','wire','xray']) assert.ok(s.includes(`data-render="${look}"`));
});
