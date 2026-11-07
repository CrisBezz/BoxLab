import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=n=>fs.readFileSync(new URL('../'+n,import.meta.url),'utf8');
test('Shared axis reminders cover live transform/Align/Array/Revolve/Symmetry button attributes with distinct XYZ palette',()=>{
 const css=read('axis-colours.css');for(const attr of ['axis','align-axis','constraint','array-move','revolve-axis','sym-axis'])for(const axis of ['x','y','z'])assert.ok(css.includes(`[data-${attr}="${axis}"]`));
 for(const colour of ['220,72,72','66,180,92','66,118,220'])assert.ok(css.includes(`rgba(${colour},.16)`));assert.match(css,/:is\(\.active,\[aria-pressed="true"\]\)/);assert.doesNotMatch(css,/svg|pointer-events|display:|data-constraint="free"|data-axis="face"/);assert.match(read('index.html'),/axis-colours\.css\?v=0\.36\.18\.735/);
});
