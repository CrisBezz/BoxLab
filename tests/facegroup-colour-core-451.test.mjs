import test from 'node:test';
import assert from 'node:assert/strict';
import {faceGroupColour} from '../src/facegroup-colours-core.js';

test('451 facegroup colours are deterministic and distinct',()=>{
  const a=faceGroupColour('Group_A');
  const a2=faceGroupColour('Group_A');
  const b=faceGroupColour('Group_B');
  assert.equal(a.getHex(),a2.getHex());
  assert.notEqual(a.getHex(),b.getHex());
});
