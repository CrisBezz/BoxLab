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

test('450 Boolean core stays protected while UI is wrapped by a Tool Session',()=>{
  const core=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  const ui=fs.readFileSync(new URL('../src/boolean-tool-session-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.369/);
  assert.match(index,/boolean-tool-session-ui\.js\?v=0\.36\.18\.450/);
  assert.match(core,/globalThis\.__boxlabBooleanPrototype/);
  assert.match(ui,/id='booleanToolSessionLaunch'/);
  assert.match(ui,/id="booleanLaunchBtn"/);
  assert.match(ui,/group\.hidden=true/);
  assert.match(ui,/toolSession\(\)\?\.begin\?\.\(\{id:'boolean'/);
  assert.match(ui,/id="booleanCloseBtn"/);
  assert.match(ui,/toolSession\(\)\?\.end\?\.\('boolean'\)/);
});

test('450 protected modelling runtime pins remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.450/);
  assert.match(index,/src\/boolean-prototype\.js\?v=0\.36\.18\.369/);\n  assert.match(index,/src\/boolean-tool-session-ui\.js\?v=0\.36\.18\.450/);
  assert.equal(beta4.version,'0.36.18.427');
});
