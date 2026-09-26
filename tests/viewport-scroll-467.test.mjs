import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('467 Viewport menu is height-limited and vertically scrollable',()=>{
 const s=fs.readFileSync(new URL('../src/view-modes.js',import.meta.url),'utf8');
 assert.match(s,/max-height:calc\(100dvh - 118px\)/);
 assert.match(s,/overflow-y:auto/);
 assert.match(s,/overscroll-behavior:contain/);
 assert.match(s,/-webkit-overflow-scrolling:touch/);
 assert.match(s,/touch-action:pan-y/);
});
