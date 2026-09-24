import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const sessions=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const objectLayout=fs.readFileSync(new URL('../src/object-selection-layout.js',import.meta.url),'utf8');
const booleanUI=fs.readFileSync(new URL('../src/boolean-tool-session-ui.js',import.meta.url),'utf8');

test('454 inactive Tool Session shells stay hidden',()=>{
  assert.match(sessions,/\.boxlab-tool-session-shell\[hidden\]\{display:none!important\}/);
});

test('454 Object Selection toolbar remains a compact five-button strip',()=>{
  assert.match(objectLayout,/grid-template-columns:repeat\(5,minmax\(0,1fr\)\)!important/);
  assert.match(objectLayout,/objectManagementTools/);
});

test('454 Boolean is presentation-wrapped without loading broad component UI wrapper',()=>{
  assert.match(index,/boolean-tool-session-ui\.js\?v=0\.36\.18\.454/);
  assert.doesNotMatch(index,/ui-presentation-451\.js/);
  assert.match(booleanUI,/booleanLaunchBtn/);
  assert.match(booleanUI,/booleanCloseBtn/);
  assert.doesNotMatch(booleanUI,/preventDefault|stopImmediatePropagation|ObjectHistory|__boxlabHistory/);
});

test('454 modelling cores remain untouched/pinned',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
