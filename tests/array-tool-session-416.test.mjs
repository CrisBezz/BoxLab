import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');

test('416 exposes one compact Array launcher in normal Object tools',()=>{
  assert.ok(source.includes('linearArrayLaunchBtn'));
  assert.ok(source.includes("launchRow.innerHTML='<button id="linearArrayLaunchBtn" type="button" disabled>Array</button>'"));
});

test('416 Array preview runs inside exclusive Tool Session',()=>{
  assert.ok(source.includes("toolSession()?.begin?.({id:'array',title:'Array',node:controls,subtitle:'Direction · Count · Apply'})"));
  assert.ok(source.includes("toolSession()?.end?.('array')"));
});

test('416 Array session contains only direction count and finish controls',()=>{
  assert.ok(source.includes('data-array-move="free"'));
  assert.ok(source.includes('data-array-move="x"'));
  assert.ok(source.includes('data-array-move="y"'));
  assert.ok(source.includes('data-array-move="z"'));
  assert.ok(source.includes('linearArrayCount'));
  assert.ok(source.includes('linearArrayApplyBtn'));
  assert.ok(source.includes('linearArrayCancelBtn'));
});

test('416 Apply and Cancel both leave Tool Session cleanly',()=>{
  const apply=source.slice(source.indexOf("applyButton?.addEventListener"),source.indexOf("cancelButton?.addEventListener"));
  assert.ok(apply.includes('endArraySession()'));
  assert.ok(source.includes("cancelButton?.addEventListener('click',()=>cancelPreview())"));
  const cancel=source.slice(source.indexOf('function cancelPreview'),source.indexOf('function buildPreview'));
  assert.ok(cancel.includes('endArraySession()'));
});

test('416 Array geometry/instance engine remains endpoint-vector based',()=>{
  assert.ok(source.includes('endpoint.clone().multiplyScalar(i/(total-1))'));
  assert.ok(source.includes('linkedDuplicateObject?.(sourceId'));
  assert.ok(source.includes('__boxlabObjectHistory?.capture?.()'));
});
