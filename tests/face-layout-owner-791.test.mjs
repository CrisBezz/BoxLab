import test from 'node:test';
import assert from 'node:assert/strict';
import {assertFaceRows,assertFaceContext,assertFaceDiagnostics,assertFaceJoin} from './helpers/face-layout-runtime.mjs';

const reject=(check,transform)=>assert.throws(()=>check(transform),assert.AssertionError);
test('791 layout regression rejects lost late Join row ordering',()=>{
 reject(assertFaceRows,(s,path)=>path==='tool-session-ui.js'?s.replace(/  const joinRowButtons=[\s\S]*?\n  }\n/,''):s);
});
test('791 layout regression rejects missing contextual Repeat placement',()=>{
 reject(assertFaceContext,s=>s.replace('[value,readout,repeat]','[value,readout]'));
});
test('791 layout regression rejects diagnostics retained above late controls',()=>{
 reject(assertFaceDiagnostics,s=>s.replace('if(node)faceTools.appendChild(node);',''));
});
test('791 layout regression rejects Join owner returning to the primary row',()=>{
 reject(assertFaceJoin,(s,path)=>path==='join-selected-coplanar-faces.js'?s.replace("'#faceCompactRow3'","'#facePrimaryCompactRow'"):s);
});
