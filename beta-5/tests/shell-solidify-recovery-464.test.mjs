import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('464 restores .461 Shell and Solidify core contracts',()=>{
 const shell=fs.readFileSync(new URL('../src/shell-core.js',import.meta.url),'utf8');
 const solid=fs.readFileSync(new URL('../src/solidify-core.js',import.meta.url),'utf8');
 assert.doesNotMatch(shell,/target\.faceGroups=/);
 assert.doesNotMatch(shell,/faceGroups=mesh\.faces/);
 assert.doesNotMatch(solid,/faceGroups:mesh\.faces/);
 assert.doesNotMatch(solid,/mesh\.faceGroups=\[\.\.\.originalGroups/);
 assert.match(shell,/shellClosedMesh/);
 assert.match(solid,/solidifyOpenMesh/);
});
