import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const revolve=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
const toolSession=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('422 Revolve Profile exposes compact launcher before session ownership',()=>{
  assert.ok(revolve.includes('revolveProfileLaunchBtn'));
  assert.ok(revolve.includes("launchRow.hidden=true"));
  assert.ok(revolve.includes("launchRow.hidden=!construction"));
});

test('422 Revolve Profile claims exclusive Tool Session after interaction or launch',()=>{
  assert.ok(revolve.includes("id:'revolve-profile'"));
  assert.ok(revolve.includes("title:'Revolve Profile'"));
  assert.ok(revolve.includes('claimRevolveTools(meta)'));
  assert.ok(revolve.includes("toolSession()?.isActive?.('revolve-profile')"));
});

test('422 profile authoring and Pencil segment slider are preserved',()=>{
  assert.ok(revolve.includes('beginProfilePointer'));
  assert.ok(revolve.includes('nearestProfileSegment'));
  assert.ok(revolve.includes('installPenRange(segmentInput'));
  assert.ok(revolve.includes('min="3" max="64"'));
});

test('422 Apply ends Tool Session and keeps proven Revolve geometry path',()=>{
  assert.ok(revolve.includes('buildRevolveFromPoints(points'));
  assert.ok(revolve.includes('endRevolveSession();'));
  assert.ok(revolve.includes("__boxlabObjectSelection?.single?.(object.id)"));
});

test('422 shared drawer ownership and protected transform pin remain intact',()=>{
  assert.ok(toolSession.includes('enforceOpenWhileActive'));
  assert.ok(index.includes('src/revolve-profile.js?v=0.36.18.422'));
  assert.ok(index.includes('src/multi-object-transform.js?v=0.36.1.0'));
});
