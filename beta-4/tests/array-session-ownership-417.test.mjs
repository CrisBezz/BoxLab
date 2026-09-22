import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');

test('417 Array preview does not cancel on temporary active-object changes in Object mode',()=>{
  const block=source.slice(source.indexOf('function sync(){'),source.indexOf('function nudgeLive'));
  assert.ok(block.includes("if(currentMode!=='object'){cancelPreview({silent:true});return;}"));
  assert.equal(block.includes("object?.id!==previewObjectId||mode()!=='object'"),false);
  assert.ok(block.includes("manager()?.activate?.(previewObjectId)"));
});

test('417 Array reasserts its Tool Session while preview remains armed',()=>{
  const block=source.slice(source.indexOf('function sync(){'),source.indexOf('function nudgeLive'));
  assert.ok(block.includes("if(!toolSession()?.isActive?.('array'))beginArraySession();"));
});

test('417 Array endpoint gets document-capture priority on the canvas',()=>{
  assert.ok(source.includes("document.addEventListener('pointerdown',beginEndpointDrag,true)"));
  const begin=source.slice(source.indexOf('function beginEndpointDrag'),source.indexOf('function moveEndpointDrag'));
  assert.ok(begin.includes("if(event.target!==canvas"));
  assert.ok(source.includes("document.removeEventListener('pointerdown',beginEndpointDrag,true)"));
});

test('417 Apply Cancel and leaving Object mode still end Array',()=>{
  assert.ok(source.includes("cancelButton?.addEventListener('click',()=>cancelPreview())"));
  assert.ok(source.includes("endArraySession()"));
  const sync=source.slice(source.indexOf('function sync(){'),source.indexOf('function nudgeLive'));
  assert.ok(sync.includes("currentMode!=='object'"));
});
