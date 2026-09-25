import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('449 Viewport menu is height-limited and vertically scrollable on iPad',()=>{
  const view=fs.readFileSync(new URL('../src/view-modes.js',import.meta.url),'utf8');
  assert.match(view,/max-height:calc\(100dvh - 118px\)/);
  assert.match(view,/overflow-y:auto/);
  assert.match(view,/overscroll-behavior:contain/);
  assert.match(view,/-webkit-overflow-scrolling:touch/);
  assert.match(view,/touch-action:pan-y/);
  assert.match(view,/@media\(max-width:900px\)[\s\S]*max-height:calc\(100dvh - 108px\)/);
});

test('449 Viewport scroll fix preserves protected modelling runtime pins',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(index,/src\/view-modes\.js\?v=0\.36\.18\.449/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.465/);
  assert.match(index,/src\/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
