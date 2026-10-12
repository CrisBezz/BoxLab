import test from 'node:test';
import assert from 'node:assert/strict';
import {rotateOwnerRuntime} from './helpers/rotate-owner-runtime.mjs';
const positions=f=>f.mesh.vertices.map(v=>v.toArray());
test('836 Object move cannot revive on reused Pencil hover after mode click',()=>{
 const f=rotateOwnerRuntime({mode:'object',ids:[],tool:'move'}),c=f.centre();f.begin(c.x,c.y,{tool:'move',constraint:'free'});f.dispatch('pointermove',c.x+40,c.y);
 const moved=positions(f);f.c.window.dispatchEvent({type:'click',target:{closest:()=>({dataset:{mode:'face'}})}});
 f.dispatch('pointermove',30,400);assert.deepEqual(positions(f),moved);assert.equal(f.history.undoStack.length,1);
});
test('836 window completion survives a competing document pointerup consumer',()=>{
 const f=rotateOwnerRuntime({mode:'object',ids:[],tool:'move'}),c=f.centre();const consumers=f.c.document.listeners.get('pointerup')||[];consumers.unshift(e=>e.stopImmediatePropagation());f.c.document.listeners.set('pointerup',consumers);
 f.begin(c.x,c.y,{tool:'move',constraint:'free'});f.dispatch('pointermove',c.x+40,c.y);const moved=positions(f);f.dispatch('pointerup',c.x+40,c.y);
 f.dispatch('pointermove',20,450);assert.deepEqual(positions(f),moved);assert.equal(f.history.undoStack.length,1);
});
