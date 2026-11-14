import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

test('BoxLab material gallery scrolls through its single touch-enabled panel owner',()=>{
  const ui=read('src/helios-dock.js'),css=read('helios-dock.css');
  assert.match(ui,/body\.style\.maxHeight=tab==='materials'&&presetsOpen\?'min\(60dvh, 440px\)'/,
    'opening the full gallery gives the parent panel more viewport height');
  assert.match(css,/\.helios-panel-body\{[^}]*overflow-y:auto/,
    'the panel body owns vertical scrolling');
  assert.match(css,/\.helios-panel-body\{[^}]*touch-action:pan-y/,
    'the panel keeps vertical touch gestures');
  assert.match(css,/\.helios-panel-body\{[^}]*-webkit-overflow-scrolling:touch/,
    'the panel enables native momentum scrolling on iOS');
  const gallery=css.match(/\.helios-material-gallery\{([^}]*)\}/)?.[1]||'';
  assert.ok(gallery,'the material gallery grid has a style rule');
  assert.doesNotMatch(gallery,/overflow|max-height/,
    'the gallery grid must not create a nested scroll container');
});
