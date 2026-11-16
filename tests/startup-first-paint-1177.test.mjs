import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('1177 first paint hides the original tools drawer only in Focus before module initialization',()=>{
 const html=read('index.html'),css=read('viewport-toolbar-shell.css');
 assert.match(html,/<html[^>]+class="boxlab-focus-view"/);
 assert(html.indexOf('viewport-toolbar-shell.css?')<html.indexOf('<body>'));
 assert.match(css,/html\.boxlab-focus-view #viewportWrap > \.floating-panel\.left-panel\{display:none!important\}/);
 assert(!css.includes('.floating-panel.left-panel{display:none!important}')||css.includes('html.boxlab-focus-view #viewportWrap > .floating-panel.left-panel{display:none!important}'));
 assert.match(read('src/view-modes.js'),/classList.toggle\('boxlab-focus-view'\)/,'the original button can still reveal tools');
});
test('1177 header logo reserves final 34px size before image decode and module initialization',()=>{
 const html=read('index.html'),css=read('viewport-toolbar-shell.css');
 assert.match(html,/<img class="brand-logo" width="34" height="34" src=/);
 assert.match(css,/\.brand-logo\{width:34px;height:34px;display:block;flex:0 0 auto;object-fit:contain;border-radius:8px\}/);
 assert.match(css,/\.brand\{align-items:center;gap:8px\}/);
 assert.match(read('src/topbar-layout.js'),/\.brand-logo\{width:34px;height:34px/,'hydration keeps the exact early dimensions');
});
