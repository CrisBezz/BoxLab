import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/view-modes.js',import.meta.url),'utf8');
function fixture(){
 const classes=new Set(['boxlab-focus-view']),drawer={open:false},modifiers={open:true},listeners={};let mode='object',resize=0;
 const buttons=['object','face','edge','vertex'].map(m=>({dataset:{mode:m},addEventListener:(t,f)=>listeners[m]=f}));
 const doc={documentElement:{classList:{contains:c=>classes.has(c),add:c=>classes.add(c),remove:c=>classes.delete(c),toggle:c=>classes.has(c)?classes.delete(c):classes.add(c)}},querySelector:q=>q==='#objectsDrawer'?drawer:q==='#modifiersDrawer'?modifiers:q.includes('button.active')?{dataset:{mode}}:null,querySelectorAll:()=>buttons};
 const ctx={document:doc,window:{dispatchEvent:()=>resize++},Event:class{},focusViewOn:()=>classes.has('boxlab-focus-view'),syncFocusViewButton(){}};
 vm.runInNewContext(source.slice(source.indexOf('let focusObjectListOpen'),source.indexOf('const ui=ensureUI()')),ctx);
 return{ctx,drawer,modifiers,classes,api:ctx.__boxlabObjectListViewport,mode:m=>{mode=m;listeners[m]();},resize:()=>resize};
}
test('Focus object list toggle keeps Focus and original drawer node; closes and restores former drawer state',()=>{
 const f=fixture(),node=f.drawer;assert.equal(f.api.visible(),false);f.api.toggle();assert.equal(f.drawer,node);assert.equal(f.drawer.open,true);assert.equal(f.modifiers.open,false);assert.equal(f.api.visible(),true);assert.ok(f.classes.has('boxlab-focus-view'));assert.ok(f.classes.has('boxlab-focus-object-list'));f.api.toggle();assert.equal(f.drawer.open,false);assert.equal(f.modifiers.open,true,'Focus close restores original Modifiers disclosure');assert.equal(f.api.visible(),false);assert.ok(f.classes.has('boxlab-focus-view'));
 f.drawer.open=true;f.api.toggle();f.api.toggle();assert.equal(f.drawer.open,true);
});
test('mode exit and Focus exit remove temporary list, normal view toggles existing disclosure',()=>{
 const f=fixture();f.api.toggle();f.mode('face');assert.equal(f.api.visible(),false);assert.equal(f.drawer.open,false);assert.equal(f.api.toggle(),false);f.mode('object');f.api.toggle();f.ctx.toggleFocusView();assert.equal(f.classes.has('boxlab-focus-object-list'),false);assert.equal(f.classes.has('boxlab-focus-view'),false);assert.equal(f.resize(),1);f.api.toggle();assert.equal(f.drawer.open,true);f.api.toggle();assert.equal(f.drawer.open,false);
});
test('Focus reveal targets original Objects and collapsed Modifiers, shortcut stays beside Multi and imports cache-hop',()=>{
 const corners=fs.readFileSync(new URL('../src/gizmo-corner-controls.js',import.meta.url),'utf8'),index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(source,/boxlab-focus-object-list.*left-panel\{display:block!important/);assert.match(source,/left-panel > :not\(#objectsDrawer\):not\(#modifiersDrawer\)\{display:none!important/);assert.doesNotMatch(source,/cloneNode|objectsDrawer.*innerHTML/);
 assert.match(corners,/\['multi','Object multi-select'\],\['objects','Object list'\]/);assert.match(corners,/__boxlabObjectListViewport\?\.toggle/);assert.match(corners,/__boxlabObjectListViewport\?\.visible/);assert.match(index,/view-modes\.js\?v=0\.36\.18\.721/);
});

test('Modifiers starts closed on every list reveal, remains original node and restores on exit',()=>{
 const f=fixture(),node=f.modifiers;f.api.toggle();assert.equal(f.modifiers,node);assert.equal(f.modifiers.open,false);f.modifiers.open=true;f.api.toggle();assert.equal(f.modifiers.open,true);f.api.toggle();assert.equal(f.modifiers.open,false);f.mode('face');assert.equal(f.modifiers.open,true);f.mode('object');f.ctx.toggleFocusView();f.api.toggle();assert.equal(f.modifiers.open,false,'normal list open also collapses Modifiers');
});
