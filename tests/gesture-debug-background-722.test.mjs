import {gestureDebugRuntime as fixture} from './helpers/gesture-debug-runtime.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
test('Background decision remains pinned after unrelated logs and Pencil hover flood',()=>{
 const f=fixture();f.api.log('BACKGROUND DOUBLE TAP',{action:'clear',reason:'time',dt:710});f.api.log('BACKGROUND TAP COMPLETE',{result:'clear'});
 for(let i=0;i<1500;i++){f.api.log('PEN HOVER SWALLOW',{type:'pointermove'});f.api.log('PEN ORBIT MOVE FORWARD',{});f.api.log('ORBIT RELEASE EARLY WINDOW',{pointer:'pen'});}
 assert.equal(f.summary.children.length,2);assert.match(f.summary.children[1].textContent,/reason=time dt=710/);assert.equal(f.body.children.length,12);assert.ok(f.body.children.every(n=>!n.textContent.includes('HOVER SWALLOW')));
});
test('Pinned history is bounded and clear/disable/re-enable cannot show stale evidence',()=>{
 const f=fixture();for(let i=0;i<20;i++)f.api.log('BACKGROUND TAP DOWN',{pid:i});assert.equal(f.summary.children.length,6);assert.match(f.summary.children[0].textContent,/pid=19/);f.api.clear();assert.equal(f.summary.children.length,0);assert.match(f.summary.textContent,/waiting for test/);f.api.disable();assert.equal(f.root.children.length,0);f.api.enable();assert.equal(f.summary.children.length,0);
});
test('Quiet stage filtering retains actual contact and ownership diagnostics',()=>{
 const f=fixture();f.api.log('PEN ORBIT ROUTE',{route:'FORWARD_ORBIT'});f.api.log('RAW POINTERDOWN',{pressure:.5});assert.ok(f.body.children.some(n=>n.textContent.includes('PEN ORBIT ROUTE')));assert.ok(f.body.children.some(n=>n.textContent.includes('pressure=0.5')));
});

test('Physical contact evidence remains bounded and clears independently of tap decisions',()=>{
 const f=fixture();for(let i=0;i<10;i++)f.api.log('PHYSICAL CONTACT',{event:i%2?'pointerup':'pointerdown',stamp:i});
 const contacts=f.root.children[0].children[1];assert.equal(contacts.children.length,4);assert.match(contacts.children[0].textContent,/stamp=9/);
 f.api.log('BACKGROUND DOUBLE TAP',{reason:'first'});assert.equal(f.summary.children.length,1);f.api.clear();assert.equal(contacts.children.length,0);
});

test('Early physical observer records viewport contacts without consuming events',()=>{
 const f=fixture(),entry=f.events.get('pointerdown');assert.equal(entry.options.capture,true);assert.equal(entry.options.passive,true);
 const event={target:{id:'viewport'},pointerType:'pen',pointerId:7,timeStamp:1234,clientX:100,clientY:200,isPrimary:true,buttons:1,pressure:.5,preventDefault(){throw Error('consumed');},stopImmediatePropagation(){throw Error('consumed');}};
 entry.fn(event);const contacts=f.root.children[0].children[1];assert.match(contacts.children[0].textContent,/pointer=pen pid=7 stamp=1234/);entry.fn({...event,target:{id:'button'}});assert.equal(contacts.children.length,1);
 f.api.disable();entry.fn(event);assert.equal(f.root.children.length,0);
});
