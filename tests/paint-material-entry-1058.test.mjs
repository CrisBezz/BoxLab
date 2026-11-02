import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
test('radial Material prepares Brush, cancels stale contact, and supports repeated continuous metallic strokes',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();const n=k=>u.nodes.get('paint-'+k);
 await n('tool-fill').click();await n('open-material').click();
 assert.equal(n('paint-action').value,'paint');assert.equal(n('fill-controls').hidden,true);
 n('multi-metalness').checked=true;n('multi-metalness').dispatchEvent({type:'change'});
 n('colour').value='#ff0000';n('colour').dispatchEvent({type:'input'});
 u.emit('pointerdown');assert.equal(r.controls.enabled,false);
 await n('open-material').click();assert.equal(r.controls.enabled,true);
 assert.equal(u.api.paletteState,'material');assert(u.api.active);
 const count=r.h.undoStack.length;
 for(const colour of ['#00ff00','#0000ff']){
  n('colour').value=colour;n('colour').dispatchEvent({type:'input'});
  u.emit('pointerdown');u.emit('pointermove',{clientX:470});u.emit('pointerup',{clientX:470});
  assert(r.controls.enabled);assert(u.api.active);assert(r.target().colourPaint);assert(r.target().metalnessPaint);
  await n('open-material').click();assert.equal(u.api.paletteState,'material');
 }
 assert.equal(r.h.undoStack.length,count+2);u.api.close();
});
