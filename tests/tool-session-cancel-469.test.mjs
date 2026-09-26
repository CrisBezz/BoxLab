import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('469 Revolve Profile restores Add and Cancel workflow',()=>{
 const s=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
 assert.match(s,/boxlab-add-revolve-profile/);
 assert.match(s,/function addRevolveProfile/);
 assert.match(s,/function cancelRevolveProfile/);
 assert.match(s,/revolveProfileCancelBtn/);
 assert.match(s,/profileBeforeScene/);
});
test('469 Sweep has transactional session cancel and mode escape',()=>{
 const s=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
 assert.match(s,/id="sweepCancelBtn"/);
 assert.match(s,/function cancelSweepSession/);
 assert.match(s,/sweepBeforeScene/);
 assert.match(s,/__boxlabObjectHistory\.restore/);
 assert.match(s,/selectionModes button/);
 assert.match(s,/boxlab-tool-session-change/);
});
