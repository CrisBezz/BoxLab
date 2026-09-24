import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const toolSession=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');

test('454 finger touch is reserved for viewport navigation',()=>{
  assert.match(paint,/if\(event\.pointerType==='touch'\)return/);
});

test('454 component paint selection yields to armed direct modelling tools',()=>{
  assert.match(paint,/function directToolActive\(\)/);
  assert.match(paint,/#bevelBtn\.active,#vertexBevelBtn\.active/);
  assert.match(paint,/__boxlabRevolve\?\.active/);
  assert.match(paint,/if\(directToolActive\(\)/);
});

test('454 shared transform yields to direct component owners',()=>{
  assert.match(transform,/function directComponentToolActive\(\)/);
  assert.match(transform,/#extrudeBtn\.boxlab-direct-stable/);
  assert.match(transform,/#bevelBtn\.active,#vertexBevelBtn\.active/);
  assert.match(transform,/__boxlabRevolve\?\.active/);
  assert.match(transform,/event\.pointerType==='touch'\|\|directComponentToolActive\(\)/);
});

for(const file of ['symmetry-bisect.js','surface-transform.js','insert-tool.js']){
  test(`454 ${file} attaches pointer capture only while active`,()=>{
    const src=fs.readFileSync(new URL('../src/'+file,import.meta.url),'utf8');
    assert.match(src,/function attachInteractionHandlers\(\)/);
    assert.match(src,/function detachInteractionHandlers\(\)/);
    assert.match(src,/removeEventListener\('pointerdown'/);
  });
}

test('454 inactive Tool Session shells are authoritatively hidden',()=>{
  assert.match(toolSession,/\.boxlab-tool-session-shell\[hidden\]\{display:none!important\}/);
});

test('454 runtime cache keys are fresh and protected multi-object transform remains pinned',()=>{
  assert.match(index,/transform-upgrade\.js\?v=0\.36\.18\.454/);
  assert.match(index,/edge-paint-select\.js\?v=0\.36\.18\.454/);
  assert.match(index,/tool-session-ui\.js\?v=0\.36\.18\.454/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.454/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
