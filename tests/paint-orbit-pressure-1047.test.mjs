import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';

async function pressureZeroStroke(r,u){
 const down=u.emit('pointerdown',{pointerType:'pen',buttons:1,pressure:0});
 assert.equal(down.prevented,true,'Paint must claim a Pencil contact on the model even before Safari reports pressure');
 assert.equal(down.stopped,true);
 assert.equal(r.controls.enabled,false,'orbit controls stay disabled for the stroke');
 u.emit('pointerup',{pointerType:'pen',buttons:0,pressure:0});
 assert.equal(r.controls.enabled,true,'orbit controls restore when the stroke ends');
 assert(r.target().colourPaint,'the claimed contact paints the model');
}

test('1047 zero-pressure Pencil down on the model belongs to Paint, including after Done and reopen',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();
 await pressureZeroStroke(r,u);
 await u.nodes.get('paint-done').click();assert.equal(u.api.active,false);assert.equal(r.controls.enabled,true);
 await u.api.open();await pressureZeroStroke(r,u);u.api.close();assert.equal(r.controls.enabled,true);
});
