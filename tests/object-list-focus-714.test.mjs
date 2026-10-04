import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/view-modes.js',import.meta.url),'utf8');
function fixture(){
 const fields=new Map(),classes=new Set(['boxlab-focus-view']),listeners={};let mode='object',resize=0;
 function el(id){const n={id,children:[],hidden:false,classList:{toggle(){}},setAttribute(){},appendChild(child){if(child.parentNode)child.parentNode.children.splice(child.parentNode.children.indexOf(child),1);this.children.push(child);child.parentNode=this;},insertBefore(child,next){this.appendChild(child);this.children.splice(this.children.indexOf(child),1);this.children.splice(this.children.indexOf(next),0,child);}};Object.defineProperty(n,'nextSibling',{get(){const a=this.parentNode?.children||[];return a[a.indexOf(this)+1]||null;}});fields.set('#'+id,n);return n;}
 const home=el('home'),wrap=el('viewportWrap'),drawer=el('objectsDrawer'),modifiers=el('modifiersDrawer');drawer.open=false;modifiers.open=true;home.appendChild(drawer);home.appendChild(modifiers);el('objectBrowserBtn');
 const buttons=['object','face','edge','vertex'].map(m=>({dataset:{mode:m},addEventListener:(t,f)=>listeners[m]=f}));
 const doc={createElement:()=>el('new'),addEventListener(){},documentElement:{classList:{contains:c=>classes.has(c),toggle:c=>classes.has(c)?classes.delete(c):classes.add(c)}},querySelector:q=>q.includes('button.active')?{dataset:{mode}}:fields.get(q),querySelectorAll:()=>buttons};
 const ctx={document:doc,window:{addEventListener(){},dispatchEvent:()=>resize++},Event:class{},syncFocusViewButton(){}};
 vm.runInNewContext(source.slice(source.indexOf('let focusObjectListOpen'),source.indexOf('const ui=ensureUI()')),ctx);
 return{ctx,drawer,modifiers,home,wrap,classes,api:ctx.__boxlabObjectListViewport,mode:m=>{mode=m;listeners[m]();},resize:()=>resize};
}
test('Right Object Browser moves original drawers, opens Objects and collapses Modifiers, then restores identity and state',()=>{
 const f=fixture(),nodes=[f.drawer,f.modifiers];assert.equal(f.api.visible(),false);f.api.toggle();const panel=f.wrap.children[0];assert.equal(panel.id,'objectBrowserPanel');assert.deepEqual(panel.children,nodes);assert.equal(f.drawer.open,true);assert.equal(f.modifiers.open,false);assert.equal(f.api.visible(),true);f.api.toggle();assert.equal(panel.hidden,true);assert.deepEqual(f.home.children,nodes);assert.equal(f.drawer.open,false);assert.equal(f.modifiers.open,true);
 f.drawer.open=true;f.api.toggle();f.api.close();assert.equal(f.drawer.open,true);
});
test('Mode exit restores original drawers; Focus toggle preserves independent right browser',()=>{
 const f=fixture();f.api.toggle();f.mode('face');assert.equal(f.api.visible(),false);assert.deepEqual(f.home.children,[f.drawer,f.modifiers]);assert.equal(f.api.toggle(),false);f.mode('object');f.api.toggle();f.ctx.toggleFocusView();assert.equal(f.api.visible(),true);assert.equal(f.classes.has('boxlab-focus-view'),false);assert.equal(f.resize(),1);f.api.close();
});
test('Browser keeps original nodes and mounts on the right under the top bar with the same object icon',()=>{
 const toolbar=fs.readFileSync(new URL('../src/viewport-toolbar-controls.js',import.meta.url),'utf8'),corners=fs.readFileSync(new URL('../src/gizmo-corner-controls.js',import.meta.url),'utf8');
 assert.match(source,/#objectBrowserPanel\{position:absolute;right:/);assert.match(source,/top:8px/);assert.doesNotMatch(source,/cloneNode|objectsDrawer.*innerHTML/);assert.doesNotMatch(corners,/\['objects','Object list'\]/);assert.match(toolbar,/objectBrowserBtn.*objects/);assert.match(toolbar,/frameAllBtn.*undoBtn.*redoBtn.*focusViewBtn.*objectBrowserBtn.*viewModes/);
});
test('Modifiers starts closed on each open and restores its prior disclosure on close',()=>{
 const f=fixture();f.api.toggle();f.modifiers.open=true;f.api.close();assert.equal(f.modifiers.open,true);f.api.toggle();assert.equal(f.modifiers.open,false);f.mode('edge');assert.equal(f.modifiers.open,true);
});

function viewShortcut({mode='object',busy=false,available=true}={}){
 let toggles=0,modeClicks=0;const menu={open:true},status={};
 const c={ui:menu,status,objectMode:()=>mode==='object',document:{querySelector:()=>({disabled:false,click(){mode='object';modeClicks++;}})},__boxlabToolSession:{isActive:()=>busy},__boxlabObjectListViewport:{available:()=>available,toggle(){toggles++;return true;}}};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function activateObjectListFromView'),source.indexOf('function activateButton')),c);
 return {c,menu,status,run:()=>c.activateObjectListFromView(),get toggles(){return toggles;},get modeClicks(){return modeClicks;}};
}
test('Top-bar Object Browser works with empty selection, reuses owner and closes menu',()=>{
 const f=viewShortcut();assert.equal(f.run(),true);assert.equal(f.toggles,1);assert.equal(f.modeClicks,0);assert.equal(f.menu.open,false);
 const other=viewShortcut({mode:'face'});assert.equal(other.run(),true);assert.equal(other.modeClicks,1);assert.equal(other.toggles,1);
});
test('Top-bar shortcut protects active tools and unavailable drawer without changing modes',()=>{
 for(const options of [{busy:true},{available:false}]){const f=viewShortcut({...options,mode:'face'});assert.equal(f.run(),false);assert.equal(f.modeClicks,0);assert.equal(f.toggles,0);assert.equal(f.menu.open,true);}
});
test('Top-bar Object Browser uses existing iPad pointerup/synthetic-click suppression',()=>{
 const events={},button={dataset:{view:'front'}},c={ui:{addEventListener:(type,fn)=>events[type]=fn},performance:{now:()=>100},activateButton(){c.calls++;},calls:0,document:{addEventListener(){}}};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('let suppressSyntheticClickUntil'),source.indexOf("document.addEventListener('pointerdown'",source.indexOf('let suppressSyntheticClickUntil'))),c);
 const event={pointerType:'pen',target:{closest:()=>button},preventDefault(){},stopPropagation(){}};events.pointerup(event);events.click(event);assert.equal(c.calls,1);
 assert.doesNotMatch(source,/id="viewObjectListBtn"/);
});
