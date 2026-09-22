import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('414 declares Follow Edges rail runtime state at module scope',()=>{
  assert.ok(source.includes("hotRailHit=null"));
  assert.ok(source.includes("railSnapRefs=null"));
  const decl=source.match(/let overlay=.*?;/s)?.[0]||'';
  assert.ok(decl.includes('hotRailHit=null'));
  assert.ok(decl.includes('railSnapRefs=null'));
});

test('414 Follow Edges activation can touch rail state safely',()=>{
  const block=source.slice(source.indexOf('function setPathMode'),source.indexOf("stageProfileBtn.addEventListener"));
  assert.ok(block.includes("if(mode!=='edges'){hotRailHit=null;railSnapRefs=null;}else railRefs(true)"));
  assert.ok(block.includes("syncPathModeButtons(m)"));
});
