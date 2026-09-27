import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('520 legacy viewport yields when mature Face direct tool is armed',()=>{
  assert.match(main,/if\(document\.querySelector\('#extrudeBtn\.boxlab-direct-stable,#insetBtn\.boxlab-direct-stable'\)\)return;/);
});

test('520 guard runs before legacy background/component drag state',()=>{
  const guard=main.indexOf("if(document.querySelector('#extrudeBtn.boxlab-direct-stable,#insetBtn.boxlab-direct-stable'))return;");
  const legacy=main.indexOf("if(backgroundTap&&backgroundTap.pointerId!==event.pointerId)backgroundTap.cancelled=true;");
  assert.ok(guard>=0&&legacy>guard);
});

test('520 runtime pins Face direct and guarded main together',()=>{
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.520/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.519/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
