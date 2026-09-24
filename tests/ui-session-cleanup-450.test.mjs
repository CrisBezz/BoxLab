import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('450 hidden Tool Session roots stay hidden on mode home',()=>{
  const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
  assert.match(session,/\.boxlab-tool-session-shell\[hidden\]\{display:none!important\}/);
  for(const path of ['symmetry-bisect.js','surface-transform.js','insert-tool.js','mesh-health.js','linear-array.js','revolve-profile.js','sweep-path.js','shell.js']){
    const src=fs.readFileSync(new URL('../src/'+path,import.meta.url),'utf8');
    assert.match(src,/hidden=true/);
    assert.match(src,/boxlab-tool-session-shell/);
  }
});

test('450 Vertex home hides Slide and Bevel settings until their tool is active',()=>{
  const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
  assert.match(session,/#precisionVertexSlideRow,#precisionVertexSlideReadout/);
  assert.match(session,/:has\(#vertexSlideBtn\.active\) #precisionVertexSlideRow/);
  assert.match(session,/#precisionVertexBevelRow,#precisionVertexBevelRow \+ div,\.vertex-bevel-options/);
  assert.match(session,/:has\(#vertexBevelBtn\.active\) #precisionVertexBevelRow/);
  assert.match(session,/:has\(#vertexBevelBtn\.active\) \.vertex-bevel-options/);
});

test('450 Boolean is a launcher plus Tool Session rather than open settings',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(src,/id="booleanLaunchBtn"/);
  assert.match(src,/group\.className='boxlab-tool-session-shell boolean-session'/);
  assert.match(src,/group\.hidden=true/);
  assert.match(src,/toolSession\(\)\?\.begin\?\.\(\{id:'boolean'/);
  assert.match(src,/id="booleanCloseBtn"/);
  assert.match(src,/toolSession\(\)\?\.end\?\.\('boolean'\)/);
});

test('450 protected modelling runtime pins remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.450/);
  assert.match(index,/src\/boolean-prototype\.js\?v=0\.36\.18\.450/);
  assert.equal(beta4.version,'0.36.18.427');
});
