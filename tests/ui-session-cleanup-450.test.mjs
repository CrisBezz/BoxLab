import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('450/451 inactive Tool Session roots stay hidden by the presentation layer',()=>{
  const ui=fs.readFileSync(new URL('../src/ui-presentation-451.js',import.meta.url),'utf8');
  assert.match(ui,/function syncSessionShells\(\)/);
  assert.match(ui,/shell\.style\.display=shell\.hidden\?'none':''/);
  for(const path of ['symmetry-bisect.js','surface-transform.js','insert-tool.js','mesh-health.js','linear-array.js','revolve-profile.js','sweep-path.js','shell.js']){
    const src=fs.readFileSync(new URL('../src/'+path,import.meta.url),'utf8');
    assert.match(src,/hidden=true/);
    assert.match(src,/boxlab-tool-session-shell/);
  }
});

test('450/451 Vertex home keeps Slide and Bevel settings contextual without owning arming',()=>{
  const ui=fs.readFileSync(new URL('../src/ui-presentation-451.js',import.meta.url),'utf8');
  assert.match(ui,/showPair\('#precisionVertexSlideRow',slide\)/);
  assert.match(ui,/showPair\('#precisionVertexBevelRow',bevel\)/);
  assert.match(ui,/vertex-bevel-options/);
  assert.doesNotMatch(ui,/preventDefault|stopImmediatePropagation/);
});

test('450/451 Boolean core stays protected while UI wrapper is presentation-only',()=>{
  const core=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  const ui=fs.readFileSync(new URL('../src/boolean-tool-session-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.369/);
  assert.match(index,/boolean-tool-session-ui\.js\?v=0\.36\.18\.451/);
  assert.match(core,/globalThis\.__boxlabBooleanPrototype/);
  assert.match(ui,/id='booleanVisibilityLaunch'/);
  assert.match(ui,/id="booleanLaunchBtn"/);
  assert.match(ui,/group\.hidden=true/);
  assert.match(ui,/id="booleanCloseBtn"/);
  assert.doesNotMatch(ui,/toolSession|ObjectHistory|__boxlabHistory/);
});

test('451 protected modelling runtime pins remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.451/);
  assert.match(index,/src\/boolean-prototype\.js\?v=0\.36\.18\.369/);
  assert.match(index,/src\/boolean-tool-session-ui\.js\?v=0\.36\.18\.451/);
  assert.match(index,/src\/ui-presentation-451\.js\?v=0\.36\.18\.451/);
  assert.equal(beta4.version,'0.36.18.427');
});
