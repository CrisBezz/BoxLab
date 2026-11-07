import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 render module has balanced braces',()=>{
 const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 let n=0; for(const c of s){if(c==='{')n++; else if(c==='}')n--; assert.ok(n>=0);} assert.equal(n,0);
});
