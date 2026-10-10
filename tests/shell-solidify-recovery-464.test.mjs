import test from 'node:test';
import {assertShellGroups,assertSolidifyGroups} from './helpers/shell-solidify-groups.mjs';

test('464 recovered Shell and Solidify keep geometry and accepted later Facegroup contracts',()=>{
 assertShellGroups();
 assertSolidifyGroups();
});
