import test from 'node:test';
import assert from 'node:assert/strict';
import {assertFacegroupSources,assertFacegroupEvaluation,assertFacegroupRetry,assertFacegroupRetryExit} from './helpers/facegroups-render-runtime.mjs';

test('793 queued Facegroups retry yields after changing render look',assertFacegroupRetryExit);
test('793 source regression rejects active manager mesh replacing bridge mesh',()=>{
 assert.throws(()=>assertFacegroupSources(s=>s.replace('const source=bridge()?.mesh||null;','const source=manager()?.objects[0]?.mesh||null;')),assert.AssertionError);
});
test('793 evaluation regression rejects Mirror before SubD',()=>{
 assert.throws(()=>assertFacegroupEvaluation(s=>s.replace("  if(settings?.subd)out=subdivide(out,Math.max(1,Number(settings.subdLevel||1)));\n  if(settings?.mirror)out=applyMirror(out,settings.mirror);", "  if(settings?.mirror)out=applyMirror(out,settings.mirror);\n  if(settings?.subd)out=subdivide(out,Math.max(1,Number(settings.subdLevel||1)));")),assert.AssertionError);
});
test('793 retry regression rejects only one frame for pending geometry',()=>{
 assert.throws(()=>assertFacegroupRetry(s=>s.replace('if(pending)requestAnimationFrame(()=>retryPendingFacegroupsInScene(attempts-1));','')),assert.AssertionError);
});
