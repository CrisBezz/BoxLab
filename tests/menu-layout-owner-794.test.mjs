import test from 'node:test';
import assert from 'node:assert/strict';
import {assertModeDock,assertFileMenuRules,assertViewportMenuRules} from './helpers/menu-layout-runtime.mjs';
test('794 dock regression rejects disconnected original mode controls',()=>{
 assert.throws(()=>assertModeDock(s=>s.replace('viewportWrap.append(selectionModes);',';')),assert.AssertionError);
});
test('794 dock regression rejects lost protected status-lane clearance',()=>{
 assert.throws(()=>assertModeDock(s=>s.replace('bottom:max(27px,calc(env(safe-area-inset-bottom) + 23px))!important;','bottom:0!important;')),assert.AssertionError);
});
test('794 File regression rejects removed internal scrolling',()=>{
 assert.throws(()=>assertFileMenuRules(s=>s.replace('overflow-y:auto','overflow-y:hidden')),assert.AssertionError);
});
test('794 VIEW regression rejects fixed obsolete viewport height bound',()=>{
 assert.throws(()=>assertViewportMenuRules((s,path)=>path==='view-modes.js'?s.replaceAll('calc(100dvh - var(--boxlab-topbar-h,60px) - 14px)','calc(100dvh - 118px)'):s),assert.AssertionError);
});
