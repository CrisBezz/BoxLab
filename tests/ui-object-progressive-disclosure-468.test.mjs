import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('468 hidden Tool Sessions stay hidden and Boolean is launcher-first',()=>{
 const s=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
 assert.match(s,/\.boxlab-tool-session-shell\[hidden\]\{display:none!important\}/);
 assert.match(s,/id='booleanToolSessionLaunch'/);
 assert.match(s,/id="booleanLaunchBtn"/);
 assert.match(s,/begin\(\{id:'boolean'/);
 assert.match(s,/end\('boolean'\)/);
});
test('468 does not introduce modelling ownership wrappers',()=>{
 const s=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
 assert.doesNotMatch(s,/pointerdown|pointermove|setPointerCapture|__boxlabTransformArming/);
});
