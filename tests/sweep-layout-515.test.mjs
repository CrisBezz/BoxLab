import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const circle=fs.readFileSync(new URL('../src/component-circle.js',import.meta.url),'utf8');
const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('515 shared Edge layout owns late Circle placement',()=>{
  assert.match(session,/const circle=document\.querySelector\('#componentCircleBtn'\)/);
  assert.match(session,/\[dissolveEdge,del,circle\]/);
  assert.match(session,/__boxlabEdgeToolLayout=\{version:'0\.36\.18\.515',sync:installEdgeControlOrder\}/);
  assert.match(circle,/const owner=globalThis\.__boxlabEdgeToolLayout/);
  assert.match(circle,/if\(owner\?\.sync\?\.\(\)\)return true/);
});

test('515 Sweep settles into Edge layout before first interaction',()=>{
  assert.match(sweep,/placeLaunchButton\(faceTools,faceSelectionSweepBtn\);placeLaunchButton\(edgeTools,edgeSelectionSweepBtn\);/);
  assert.match(sweep,/globalThis\.__boxlabEdgeToolLayout\?\.sync\?\.\(\)/);
});

test('515 Sweep buttons use compact BoxLab sizing',()=>{
  assert.match(sweep,/#sweepPathControls button\{min-height:31px!important;padding:4px 4px!important;font-size:10px!important;line-height:1\.1!important\}/);
  assert.match(sweep,/background:#eef1f7!important;color:#15171b!important/);
});

test('515 cache-hops only Sweep/layout presentation owners and preserves protected baselines',()=>{
  assert.match(drawer,/component-circle\.js\?v=0\.36\.18\.515/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.515/);
  assert.match(index,/src\/sweep-path\.js\?v=0\.36\.18\.515/);
  assert.match(index,/src\/drawer-ui\.js\?v=0\.36\.18\.515/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/component-slide\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/edge-extrude\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
