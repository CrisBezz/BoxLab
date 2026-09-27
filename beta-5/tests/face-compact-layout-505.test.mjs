import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const join=fs.readFileSync(new URL('../src/join-selected-coplanar-faces.js',import.meta.url),'utf8');
const faceLayout=fs.readFileSync(new URL('../src/face-workflow-layout.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('505 creates three compact Face modelling rows',()=>{
  assert.match(ui,/facePrimaryCompactRow/);
  assert.match(ui,/faceSecondaryCompactRow/);
  assert.match(ui,/faceTertiaryCompactRow/);
  assert.match(ui,/for\(const button of \[sweep,join,del\]\)/);
  assert.match(ui,/for\(const button of \[extract,duplicate,bridge\]\)/);
});

test('505 keeps armed contextual controls between primary and secondary rows',()=>{
  assert.match(ui,/for\(const node of \[value,readout,repeat\]\)/);
  assert.match(ui,/if\(cursor\.nextElementSibling!==secondary\)cursor\.insertAdjacentElement\('afterend',secondary\)/);
});

test('505 puts diagnostics below the entire compact modelling block',()=>{
  assert.match(ui,/let tail=tertiary/);
  assert.match(ui,/for\(const node of \[inspect,repair,gate\]\)/);
});

test('505 Join Coplanar honors compact secondary row',()=>{
  assert.match(join,/const compact=document\.querySelector\('#faceSecondaryCompactRow'\)/);
  assert.match(join,/if\(button\.parentElement!==compact\)compact\.appendChild\(button\)/);
  assert.match(faceLayout,/join-selected-coplanar-faces\.js\?v=0\.36\.18\.505/);
});

test('505 preserves frozen interaction pins',()=>{
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.505/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
