import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('451 UI presentation never steals tool click or pointer ownership',()=>{
  const ui=fs.readFileSync(new URL('../src/ui-presentation-451.js',import.meta.url),'utf8');
  assert.doesNotMatch(ui,/preventDefault|stopPropagation|stopImmediatePropagation/);
  assert.match(ui,/style\.display/);
  assert.match(ui,/boxlab-direct-tool-exclusive/);
});

test('451 Face Inset and Extrude retain proven direct arming and Through path',()=>{
  const face=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
  assert.match(face,/const target=event\.target\?\.closest\?\.\('#extrudeBtn,#insetBtn'\)/);
  assert.match(face,/disarmTransforms\(\)/);
  assert.match(face,/armed=tool;syncButtons\(\);updateStatus\(\)/);
  assert.match(face,/preparedThrough:armed==='extrude'&&ids\.length===1\?planThrough/);
  assert.match(face,/if\(d\.tool==='extrude'&&d\.throughPlan\)/);
});

test('451 Face exact controls are contextual and tool-specific',()=>{
  const ui=fs.readFileSync(new URL('../src/ui-presentation-451.js',import.meta.url),'utf8');
  assert.match(ui,/showPair\('#precisionFaceRow',direct\)/);
  assert.match(ui,/label\.textContent=extrude\?'Extrude Exact':'Inset Exact'/);
});

test('451 Edge Bevel and Vertex Bevel keep their proven arming controllers',()=>{
  const edge=fs.readFileSync(new URL('../src/direct-bevel.js',import.meta.url),'utf8');
  const vertex=fs.readFileSync(new URL('../src/direct-multi-vertex-bevel.js',import.meta.url),'utf8');
  assert.match(edge,/button\?\.addEventListener\('click'.*armed=!armed/s);
  assert.match(edge,/canvas\?\.addEventListener\('pointerdown'.*if\(!armed/s);
  assert.match(vertex,/closest\?\.\('#vertexBevelBtn'\)/);
  assert.match(vertex,/armed=!armed;syncButton\(\);updateStatus\(\)/);
  assert.match(vertex,/canvas\?\.addEventListener\('pointerdown'.*if\(!armed/s);
});

test('451 Edge cleanup keeps Lathe/Revolve and settings contextual',()=>{
  const ui=fs.readFileSync(new URL('../src/ui-presentation-451.js',import.meta.url),'utf8');
  assert.match(ui,/id='edgeRevolveLaunchRow'/);
  assert.match(ui,/edgeRevolveLaunchBtn/);
  assert.match(ui,/shown\(edgeTools\?\.querySelector\('\.revolve-controls'\),!!revolve\?\.active,'block'\)/);
  assert.match(ui,/precisionEdgeBevelRow/);
  assert.match(ui,/loop-cut-option/);
  assert.match(ui,/offset-option/);
});

test('451 Revolve Profile can launch directly and Cancel restores pre-tool scene',()=>{
  const src=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
  assert.match(src,/launchRow\.hidden=false/);
  assert.match(src,/if\(!object\|\|!looksConstructionMesh\(mesh\)\)[\s\S]*object=addRevolveProfile\(\)/);
  assert.match(src,/id="revolveProfileCancelBtn"/);
  assert.match(src,/function cancelRevolveProfile\(\)/);
  assert.match(src,/__boxlabObjectHistory\.restore\(profileBeforeScene\)/);
  assert.match(src,/cancel:cancelRevolveProfile/);
});

test('451 Boolean presentation wrapper adds no history step',()=>{
  const core=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  const ui=fs.readFileSync(new URL('../src/boolean-tool-session-ui.js',import.meta.url),'utf8');
  assert.equal((core.match(/__boxlabObjectHistory\?\.checkpointSnapshot\?\.\(beforeScene\)/g)||[]).length,1);
  assert.doesNotMatch(ui,/ObjectHistory|__boxlabHistory|toolSession/);
  assert.match(ui,/booleanLaunchBtn/);
  assert.match(ui,/booleanCloseBtn/);
});

test('451 runtime keeps protected modelling pins and loads presentation wrapper last',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.452/);
  assert.match(index,/tool-session-ui\.js\?v=0\.36\.18\.452/);
  assert.match(index,/revolve-profile\.js\?v=0\.36\.18\.452/);
  assert.match(index,/boolean-tool-session-ui\.js\?v=0\.36\.18\.452/);
  assert.match(index,/ui-presentation-451\.js\?v=0\.36\.18\.452/);
  assert.equal(beta4.version,'0.36.18.427');
});
