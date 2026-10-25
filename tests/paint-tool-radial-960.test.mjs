import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
const n=(u,k)=>u.nodes.get('paint-'+k);
test('960 real Paint radial switches existing tools, synchronizes active caption/settings, keeps picker for cycling and adds no history',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();const count=r.h.undoStack.length;
 for(const [key,label] of [['paint','Brush'],['fill','Fill'],['erase','Eraser'],['smudge','Smudge'],['blur','Blur']]){n(u,'tool-picker').open=true;await n(u,'tool-'+key).click();assert.equal(n(u,'paint-action').value,key);assert.equal(n(u,'tool-summary').textContent,'Brush tools · '+label);assert.equal(n(u,'tool-'+key).attributes['aria-pressed'],'true');assert.equal(n(u,'tool-picker').open,true);assert.equal(n(u,'blur-controls').hidden,key!=='blur');assert.equal(r.h.undoStack.length,count);}
 n(u,'paint-action').disabled=true;await n(u,'tool-paint').click();assert.equal(n(u,'paint-action').value,'blur');u.api.close();
});
test('960 choosing a radial tool during live Pencil contact uses original cancellation and keeps committed stroke/history',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();await n(u,'tool-paint').click();n(u,'colour').value='#000000';u.emit('pointerdown');u.emit('pointerup');const paint=r.target().colourPaint,count=r.h.undoStack.length;
 n(u,'colour').value='#ff0000';u.emit('pointerdown');u.emit('pointermove',{clientX:470});await n(u,'tool-erase').click();u.emit('pointerup');assert.equal(r.target().colourPaint,paint);assert.equal(r.h.undoStack.length,count);assert(r.controls.enabled);u.api.close();await n(u,'tool-blur').click();assert.equal(n(u,'paint-action').value,'erase');
});
