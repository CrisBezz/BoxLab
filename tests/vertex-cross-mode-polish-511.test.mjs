import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const layout=fs.readFileSync(new URL('../src/face-reconstruct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('511 Vertex home uses the same compact three-column rhythm as Edge and Face',()=>{
  assert.match(ui,/data-mode-tools="vertex"] > \.outliner-actions\{margin:2px 0!important;display:grid!important;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)!important;gap:4px!important\}/);
  assert.match(ui,/data-mode-tools="vertex"] > \.outliner-actions button\{min-height:31px!important/);
});

test('511 preserves the deterministic .341 Vertex tool ordering owner',()=>{
  assert.match(layout,/\[bevel,add,build,slide,button,circle\]/);
  assert.match(layout,/__boxlabVertexToolLayout=\{version:'0\.36\.18\.341',sync:place\}/);
});

test('511 keeps existing Vertex progressive disclosure and protected runtime pins',()=>{
  assert.match(ui,/:has\(#vertexSlideBtn\.active\) #precisionVertexSlideRow/);
  assert.match(ui,/:has\(#vertexBevelBtn\.active\) #precisionVertexBevelRow/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.511/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
