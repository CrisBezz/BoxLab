import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {deselectRestart,faceSessionExit} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('496 main Deselect preserves armed Face selection restart without geometry or history changes',()=>deselectRestart());

test('784 contextual Done and background exits retire Face/repeat ownership once and protect active drags',()=>faceSessionExit());

test('784 Deselect and session-exit checks reject missing owner transitions',()=>{
  assert.throws(()=>deselectRestart(source=>source.replace('clearSelection();renderMesh();});','renderMesh();});')),{name:'AssertionError'});
  assert.throws(()=>faceSessionExit(source=>source.replace("document.querySelector(was==='extrude'?'#extrudeBtn':'#insetBtn')?.click();",'void 0;')),{name:'AssertionError'});
  assert.throws(()=>faceSessionExit(source=>source.replace('if(busy()&&!contextLost)return false;','if(false)return false;')),{name:'AssertionError'});
});

test('496 leaves selected-aware hit-stack logic intact',()=>{
  assert.match(direct,/firstUnselected=hits\.find/);
  assert.match(direct,/selected\.has\(primary\).*firstUnselected/);
});

test('496 cache hop and protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
