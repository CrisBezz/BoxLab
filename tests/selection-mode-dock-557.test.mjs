import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css=fs.readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('557 selection modes are docked bottom-left without DOM/id changes',()=>{
  assert.match(css,/v0\.36\.18\.557 bottom-left selection mode dock/);
  assert.match(css,/#selectionModes\{[\s\S]*position:fixed;/);
  assert.match(css,/#selectionModes\{[\s\S]*left:max\(16px,env\(safe-area-inset-left\)\);/);
  assert.match(css,/#selectionModes\{[\s\S]*bottom:max\(48px,calc\(env\(safe-area-inset-bottom\) \+ 38px\)\);/);
  assert.match(index,/id="selectionModes"/);
  assert.match(index,/data-mode="vertex"/);
  assert.match(index,/data-mode="edge"/);
  assert.match(index,/data-mode="face"/);
  assert.match(index,/data-mode="object"/);
});

test('557 publishes only the CSS/version path and keeps protected runtime pin',()=>{
  assert.match(index,/styles\.css\?v=0\.36\.18\.557/);
  assert.match(index,/data-release-version="0\.36\.18\.557"/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
