import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {mountViewMenuSurface} from '../src/view-menu-surface.js';
import {orderedDOM} from './helpers/ordered-dom.mjs';
function fixture(open=false){
 const {node}=orderedDOM(),app=node('app'),header=node('header'),menu=node('viewModes'),summary=node('summary'),panel=node(),button=node('testViewButton');
 app.append(header);header.append(menu);menu.append(summary,panel);panel.append(button);menu.open=open;panel.scrollTop=0;
 for(const n of [summary,panel]){n.attributes={};n.setAttribute=(k,v)=>n.attributes[k]=v;}
 menu.querySelector=s=>s==='summary'?summary:panel;
 const observers=[];class Observer{constructor(fn){this.fn=fn;observers.push(this);}observe(target,options){Object.assign(this,{target,options});}}
 const args={menu,panel,parent:app,Observer};
 return {app,menu,panel,summary,button,args,observers,setOpen(value){menu.open=value;for(const o of observers)o.fn([{attributeName:'open',target:menu}]);}};
}
test('same VIEW panel is mounted outside native disclosure with original controls/listeners and explicit closed state',()=>{
 const f=fixture();let taps=0;f.button.addEventListener('click',()=>taps++);
 const surface=mountViewMenuSurface(f.args);assert.equal(surface.panel,f.panel);
 assert.equal(f.panel.parentElement,f.app);assert.deepEqual(f.menu.children,[f.summary]);assert.deepEqual(f.panel.children,[f.button]);
 assert.equal(f.panel.id,'viewModesPanel');assert.equal(f.panel.hidden,true);assert.equal(f.summary.attributes['aria-controls'],'viewModesPanel');assert.equal(f.summary.attributes['aria-expanded'],'false');
 f.setOpen(true);assert.equal(f.panel.hidden,false);f.button.dispatchEvent({type:'click'});assert.equal(taps,1);
 assert.equal(f.observers[0].target,f.menu);assert.deepEqual(f.observers[0].options.attributeFilter,['open']);
});
test('native open attribute is sole state; repeated and coalesced changes preserve nodes/scroll without reopening stale state',()=>{
 const f=fixture(true);const surface=mountViewMenuSurface(f.args);assert.equal(f.panel.hidden,false);
 for(let i=0;i<12;i++){
  f.panel.scrollTop=120+i;f.setOpen(false);assert.equal(f.panel.hidden,true);assert.equal(f.summary.attributes['aria-expanded'],'false');
  f.panel.scrollTop=0;f.setOpen(true);assert.equal(f.panel.scrollTop,120+i);assert.equal(f.panel.hidden,false);
 }
 f.menu.open=false;f.menu.open=true;f.observers[0].fn();assert.equal(f.panel.hidden,false);
 f.menu.open=false;f.observers[0].fn();assert.equal(f.panel.hidden,true);assert.equal(f.menu.open,false);
 assert.equal(mountViewMenuSurface(f.args),surface);assert.equal(f.observers.length,1);assert.equal(f.app.children.filter(n=>n===f.panel).length,1);
});
test('missing hosts refuse without moving the original panel',()=>{
 const f=fixture();assert.equal(mountViewMenuSurface({...f.args,parent:null}),null);assert.equal(f.panel.parentElement,f.menu);
 assert.equal(mountViewMenuSurface({...f.args,panel:null}),null);assert.equal(f.observers.length,0);
});
test('original VIEW delegation runs on external panel; Pencil activation suppresses duplicate synthesized click',()=>{
 const source=fs.readFileSync(new URL('../src/view-modes.js',import.meta.url),'utf8');
 const a=source.indexOf('let suppressSyntheticClickUntil=0;'),b=source.indexOf("document.addEventListener('pointerdown'",a);
 const handlers={},calls=[],button={dataset:{view:'front'}},event=type=>({pointerType:type,target:{closest:()=>button},preventDefault(){},stopPropagation(){}});let now=100;
 const c={viewPanel:{addEventListener:(t,f)=>handlers[t]=f},performance:{now:()=>now},activateButton:b=>calls.push(b)};
 vm.runInNewContext(source.slice(a,b),c);handlers.pointerup(event('pen'));handlers.click(event('pen'));assert.equal(calls.length,1);
 now=900;handlers.pointerup(event('mouse'));handlers.click(event('mouse'));assert.equal(calls.length,2);assert.equal(calls[0],button);
});
test('outside-close treats external panel as part of VIEW and closes through original native open owner',()=>{
 const source=fs.readFileSync(new URL('../src/view-modes.js',import.meta.url),'utf8'),a=source.indexOf("document.addEventListener('pointerdown'"),b=source.indexOf('// Visible release identity',a);
 let listener;const ui={open:true};vm.runInNewContext(source.slice(a,b),{ui,document:{addEventListener:(t,f)=>listener=f}});
 listener({target:{closest:selector=>selector.includes('#viewModesPanel')?{}:null}});assert.equal(ui.open,true);
 listener({target:{closest:()=>null}});assert.equal(ui.open,false);
});
test('startup and hydrated styles explicitly remove closed external surface while preserving original controls and clean-view integration',()=>{
 const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
 assert.match(read('index.html'),/id="viewModesPanel" class="viewport-menu-panel" hidden/);
 assert.match(read('viewport-toolbar-shell.css'),/#viewModesPanel\[hidden\]\{display:none!important\}/);
 assert.match(read('src/view-modes.js'),/#viewModesPanel\[hidden\]\{display:none!important\}/);
 assert.ok(read('src/view-modes.js').includes("parent:document.querySelector('#app')||document.body"));
 assert.ok(read('src/clean-view.js').includes("document.querySelector('#viewModesPanel')||document.querySelector('#viewModes .viewport-menu-panel')"));
});


test('keyboard entry/return works with external panel and Escape closes the native disclosure',()=>{
 const f=fixture(true);let controlFocus=0,summaryFocus=0,prevented=0;
 f.button.focus=()=>controlFocus++;f.summary.focus=()=>summaryFocus++;f.panel.querySelector=()=>f.button;
 mountViewMenuSurface(f.args);
 const event=(key,extra={})=>({key,preventDefault(){prevented++;},stopPropagation(){},...extra});
 f.summary.dispatchEvent({type:'keydown',...event('Tab')});assert.equal(controlFocus,1);
 f.panel.dispatchEvent({type:'keydown',...event('Tab',{shiftKey:true,target:f.button})});assert.equal(summaryFocus,1);
 f.panel.dispatchEvent({type:'keydown',...event('Escape')});assert.equal(f.menu.open,false);assert.equal(summaryFocus,2);assert.equal(prevented,3);
 f.observers[0].fn();assert.equal(f.panel.hidden,true);
});

test('998 Facegroups overflow stays in the inner scroller and reopening restores that scroller',()=>{
 const f=fixture(true),{node}=orderedDOM(),scroll=node('viewModesScroll');scroll.scrollTop=0;
 f.panel.append(scroll);scroll.append(f.button);f.panel.querySelector=s=>s==='#viewModesScroll'?scroll:f.button;
 const surface=mountViewMenuSurface(f.args);assert.equal(surface.scrollElement,scroll);
 scroll.scrollHeight=980;scroll.clientHeight=790;scroll.scrollTop=175;
 f.setOpen(false);scroll.scrollTop=0;f.setOpen(true);
 assert.equal(scroll.scrollTop,175);assert.equal(f.panel.scrollTop,0);assert.equal(f.button.parentElement,scroll);
 for(const path of ['index.html','src/view-modes.js'])assert.match(fs.readFileSync(new URL('../'+path,import.meta.url),'utf8'),/id="viewModesScroll" class="viewport-menu-scroll"/);
 assert.match(fs.readFileSync(new URL('../src/clean-view.js',import.meta.url),'utf8'),/querySelector\('#viewModesScroll'\)\|\|panel/);
});
