import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const join=fs.readFileSync(new URL('../src/join-selected-coplanar-faces.js',import.meta.url),'utf8');
const layout=fs.readFileSync(new URL('../src/face-workflow-layout.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('507 packs Face tools in requested six-row grid',()=>{
  assert.match(ui,/for\(const button of \[del,duplicate,extract\]\)/);
  assert.match(ui,/for\(const button of \[join,bridge,sweep\]\)/);
  assert.match(ui,/for\(const button of \[shell,poke,circle\]\)/);
  assert.match(ui,/for\(const button of \[close,triangulate,flip\]\)/);
  assert.match(ui,/for\(const button of \[quadClean,quadify\]\)/);
});

test('507 leaves Orient Faces out of compact grid',()=>{
  assert.doesNotMatch(ui,/const orient=document\.querySelector\('#orientFacesBtn'\)/);
  assert.doesNotMatch(ui,/quadClean,quadify,orient/);
});

test('507 keeps diagnostics at true bottom',()=>{
  assert.match(ui,/for\(const node of \[inspect,repair,gate\]\)/);
  assert.match(ui,/faceTools\.appendChild\(node\)/);
});

test('507 Join Coplanar targets requested row 3',()=>{
  assert.match(join,/#faceCompactRow3/);
  assert.match(layout,/join-selected-coplanar-faces\.js\?v=0\.36\.18\.507/);
});

test('507 preserves frozen interaction pins',()=>{
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.507/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
