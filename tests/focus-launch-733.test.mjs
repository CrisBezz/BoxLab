import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=n=>fs.readFileSync(new URL('../'+n,import.meta.url),'utf8'),source=read('src/view-modes.js');
test('Launch shell starts in Focus before module execution and pins the changed owner',()=>{
 assert.match(read('index.html'),/<html lang="en" class="boxlab-focus-view">/);assert.match(read('index.html'),/view-modes\.js\?v=0\.36\.18\.733/);assert.match(source,/#focusViewBtn\[aria-pressed="true"\]\{background:#f2f5fa!important;color:#111318!important/);
});
test('Existing Focus toggle updates armed icon, accessibility and action label in both directions without changing its SVG',()=>{
 const classes=new Set(['boxlab-focus-view']),attrs={},buttonClasses=new Set();let resize=0;const button={dataset:{iconAction:'focus'},innerHTML:'original SVG',setAttribute:(k,v)=>attrs[k]=v,classList:{toggle:(c,on)=>on?buttonClasses.add(c):buttonClasses.delete(c)}};
 const c={document:{documentElement:{classList:{contains:c=>classes.has(c),toggle:c=>classes.has(c)?classes.delete(c):classes.add(c)}},querySelector:()=>button},window:{dispatchEvent:()=>resize++},Event:class{}};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function focusViewOn()'),source.indexOf('// Move the original')),c);
 vm.runInContext(source.slice(source.indexOf('function toggleFocusView(){'),source.indexOf('const ui=ensureUI()')),c);
 c.syncFocusViewButton();assert.equal(attrs['aria-pressed'],'true');assert.ok(buttonClasses.has('active'));assert.match(button.title,/Show left tool list/);
 c.toggleFocusView();assert.equal(classes.has('boxlab-focus-view'),false);assert.equal(attrs['aria-pressed'],'false');assert.equal(buttonClasses.has('active'),false);assert.match(button.title,/Hide left tool list/);
 c.toggleFocusView();assert.equal(attrs['aria-pressed'],'true');assert.ok(buttonClasses.has('active'));assert.equal(resize,2);assert.equal(button.innerHTML,'original SVG');
});
