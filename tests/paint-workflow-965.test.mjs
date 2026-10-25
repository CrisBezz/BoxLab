import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';
import {nativeOwner} from './helpers/background-selection-runtime.mjs';
import {gestureDebugRuntime} from './helpers/gesture-debug-runtime.mjs';
const node=(u,k)=>u.nodes.get('paint-'+k);
test('965 bottom Paint entry refuses no UV before session; same entry reopens tools; browsing stays until surface use, Layers precedes context',async()=>{
 const r=viewportPaintRuntime(),u=viewportPaintUIRuntime(r),entry=u.nodes.get('viewportSelectionControls').children.find(n=>n.id==='viewportPaintBtn');assert(entry);const uv=r.target().glbPassthrough;delete r.target().glbPassthrough;await entry.click();assert(!u.api.active);assert.equal(r.target().colourPaint,undefined);r.target().glbPassthrough=uv;await entry.click();assert(u.api.active);const h=r.h.undoStack.length;
 for(const key of ['blur','smudge','paint']){await node(u,'tool-'+key).click();assert(node(u,'tool-picker').open);assert.equal(r.h.undoStack.length,h);}
 for(const page of ['layers','mask','image','ao','settings']){await node(u,'page-'+page).click();assert(node(u,'tool-picker').open);}
 await node(u,'tool-paint').click();u.emit('pointerdown',{clientX:2,clientY:2});u.emit('pointerup',{clientX:2,clientY:2});assert(node(u,'tool-picker').open);u.emit('pointerdown');assert.equal(node(u,'tool-picker').open,false);u.emit('pointerup');await entry.click();assert(u.api.active);assert(node(u,'tool-picker').open);u.emit('keydown',{key:'Escape'});assert(u.api.active);await node(u,'done').click();assert(!u.api.active);
 const source=fs.readFileSync(new URL('../src/viewport-paint.js',import.meta.url),'utf8');assert(source.indexOf('data-paint-page="layers"')<source.indexOf('class="paint-context-head"'));assert.match(source,/\[data-paint-page=layers\]\{display:grid/);assert.match(source,/Map size/);
});
test('965 main single hold timer routes Paint background, never modelling invert; move, multitouch, surface and close cancel',()=>{
 for(const action of ['hold','move','secondary','surface','close']){const h=nativeOwner();let opens=0,active=true;h.c.__boxlabToolSession={isActive:()=>true};h.c.__boxlabViewportPaint={get active(){return active;},backgroundHoldAllowed:()=>true,isBackgroundPoint:()=>action!=='surface',showTools:()=>opens++};h.send('pointerdown',1000);if(action==='move')h.send('pointermove',1100,30);if(action==='secondary')h.send('pointerdown',1100,10,{pointerId:2,isPrimary:false});if(action==='close')active=false;h.fireHold();assert.equal(opens,action==='hold'?1:0);assert.deepEqual(h.ids,[1,3]);h.send('pointerup',1600);assert.deepEqual(h.ids,[1,3]);}
});
test('965 opt-in UI report bounds events and includes right hit tests, current release and viewport without consuming pointer input',()=>{
 const f=gestureDebugRuntime(),e={target:{id:'rightButton',tagName:'BUTTON'},pointerType:'touch',pointerId:7,timeStamp:100,clientX:950,clientY:50,preventDefault(){throw Error('consumed');},stopImmediatePropagation(){throw Error('consumed');}};
 for(let i=0;i<120;i++)f.events.get('pointerdown').fn(e);const report=f.api.uiSnapshot();assert.equal(report.events.length,100);assert.equal(report.hitTests.length,9);assert.equal(report.viewport.width,1000);assert(report.events.some(e=>e.data.target?.id==='rightButton'));assert.doesNotThrow(()=>JSON.stringify(report));f.api.disable();
});
