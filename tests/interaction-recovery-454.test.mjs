import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const toolSession=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');

test('459 keeps proven transform routing while armed tools still permit component selection and touch navigation',()=>{
  assert.doesNotMatch(paint,/function directToolActive\(\)/);
  assert.match(paint,/if\(event.pointerType==='touch'\)return/);
  assert.doesNotMatch(transform,/function directComponentToolActive\(\)/);
  assert.match(transform,/function directFaceToolActive\(\)/);
});

for(const file of ['symmetry-bisect.js','surface-transform.js','insert-tool.js']){
  test(`456 ${file} still attaches pointer capture only while active`,()=>{
    const src=fs.readFileSync(new URL('../src/'+file,import.meta.url),'utf8');
    assert.match(src,/function attachInteractionHandlers\(\)/);
    assert.match(src,/function detachInteractionHandlers\(\)/);
    assert.match(src,/removeEventListener\('pointerdown'/);
  });
}

test('456 inactive Tool Session shells stay hidden while the current UI is preserved',()=>{
  assert.match(toolSession,/\.boxlab-tool-session-shell\[hidden\]\{display:none!important/);
});

test('456 runtime cache keys and protected multi-object transform remain pinned',()=>{
  assert.match(index,/transform-upgrade\.js\?v=0\.36\.18\.459/);
  assert.match(index,/edge-paint-select\.js\?v=0\.36\.18\.459/);
  assert.match(index,/tool-session-ui\.js\?v=0\.36\.18\.459/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.459/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
