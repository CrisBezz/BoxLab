import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 recovery boundary is explicit',()=>{
 const meta=JSON.parse(fs.readFileSync(new URL('../recovery-453.json',import.meta.url),'utf8'));
 assert.equal(meta.rejected,'0.36.18.452');
 assert.equal(meta.facegroupViewportWiring,false);
});
