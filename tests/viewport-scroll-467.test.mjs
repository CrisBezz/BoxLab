import test from 'node:test';
import {assertViewportMenuRules} from './helpers/menu-layout-runtime.mjs';

test('467 Viewport menu is height-limited and vertically scrollable',()=>{
 assertViewportMenuRules();
});
