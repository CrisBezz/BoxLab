import test from 'node:test';
import assert from 'node:assert/strict';
import {assertShellGroups,assertSolidifyGroups,assertGroupRefusalRollback,loadGroupCore} from './helpers/shell-solidify-groups.mjs';

test('792 actual cores retain labels and creases on refusal and post-mutation rollback',()=>{
 assertGroupRefusalRollback();
});
test('792 provenance regression rejects dropped Shell copy labels',async()=>{
 const core=await loadGroupCore('shell-core.js',s=>s.replace('target.faceGroups=source.faces.map((_,fi)=>source.faceGroups?.[fi]??null);',''));
 assert.throws(()=>assertShellGroups(core.shellClosedMesh),assert.AssertionError);
});
test('792 provenance regression rejects Solidify grouped boundary walls',async()=>{
 const core=await loadGroupCore('solidify-core.js',s=>s.replace('...sideFaces.map(()=>null)','...sideFaces.map(()=>originalGroups[0])'));
 assert.throws(()=>assertSolidifyGroups(core.solidifyOpenMesh),assert.AssertionError);
});
test('792 rollback regression rejects leaving generated Solidify groups on source',async()=>{
 const core=await loadGroupCore('solidify-core.js',s=>s.replace('mesh.faceGroups=state.faces.map((_,fi)=>state.faceGroups?.[fi]??null);',''));
 assert.throws(()=>assertGroupRefusalRollback(core.solidifyOpenMesh),assert.AssertionError);
});
