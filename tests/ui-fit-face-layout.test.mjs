import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('342 File menu fits below command bar with internal scrolling',()=>{
  const src=fs.readFileSync(new URL('../src/topbar-layout.js',import.meta.url),'utf8');
  assert.match(src,/\.top-file-menu\{z-index:140\}/);
  assert.match(src,/top:calc\(100% \+ var\(--boxlab-commandbar-h\) \+ 6px\)/);
  assert.match(src,/max-height:calc\(100dvh - var\(--boxlab-topbar-h\) - var\(--boxlab-commandbar-h\) - 18px\)/);
  assert.match(src,/overflow-y:auto/);
  assert.match(src,/width:min\(300px,calc\(100vw - 16px\)\)/);
});

test('342 Face primary row stays three columns and does not reappend when stable',()=>{
  const src=fs.readFileSync(new URL('../src/join-selected-coplanar-faces.js',import.meta.url),'utf8');
  assert.match(src,/repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(src,/const stable=current\.length===ordered\.length&&ordered\.every/);
  assert.match(src,/if\(!stable\)for\(const item of ordered\)row\.appendChild\(item\)/);
  assert.doesNotMatch(src,/repeat\(4,minmax\(0,1fr\)\)/);
});

test('342 Face secondary row stays three columns with Duplicate',()=>{
  const src=fs.readFileSync(new URL('../src/duplicate-faces.js',import.meta.url),'utf8');
  assert.match(src,/repeat\(3,minmax\(0,1fr\)\)/);
  assert.doesNotMatch(src,/repeat\(4,minmax\(0,1fr\)\)/);
});

test('342 runtime cache-hops File and Face layout owners',()=>{
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const workflow=fs.readFileSync(new URL('../src/face-workflow-layout.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(drawer,/join-selected-coplanar-faces\.js\?v=0\.36\.18\.342/);
  assert.match(drawer,/face-workflow-layout\.js\?v=0\.36\.18\.342/);
  assert.match(workflow,/duplicate-faces\.js\?v=0\.36\.18\.342/);
  assert.match(index,/topbar-layout\.js\?v=0\.36\.18\.342/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.342/);
});
