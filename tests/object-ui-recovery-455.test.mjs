import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const layout=fs.readFileSync(new URL('../src/object-selection-layout.js',import.meta.url),'utf8');
const booleanUI=fs.readFileSync(new URL('../src/boolean-tool-session-ui.js',import.meta.url),'utf8');

test('455 Object Selection remains one compact five-button strip',()=>{
  assert.match(layout,/grid-template-columns:repeat\(5,minmax\(0,1fr\)\)!important/);
  assert.match(layout,/objectManagementTools/);
});

test('455 Boolean uses one presentation launcher without broad component wrapper',()=>{
  assert.match(index,/boolean-tool-session-ui\.js\?v=0\.36\.18\.459/);
  assert.doesNotMatch(index,/ui-presentation-451\.js/);
  assert.match(booleanUI,/booleanLaunchBtn/);
  assert.match(booleanUI,/booleanCloseBtn/);
  assert.doesNotMatch(booleanUI,/preventDefault|stopImmediatePropagation|ObjectHistory|__boxlabHistory/);
});

test('455 preserves protected modelling pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
