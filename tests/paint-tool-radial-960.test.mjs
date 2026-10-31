import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
const n=(u,k)=>u.nodes.get('paint-'+k);
const position=u=>JSON.parse(JSON.stringify(u.api.palettePosition));
test('1042 Paint wheel hands selected tools to the floating quick controls without history changes',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();const count=r.h.undoStack.length;
 for(const [key,label] of [['paint','Brush'],['fill','Fill'],['erase','Eraser'],['smudge','Smudge'],['blur','Blur']]){if(u.api.paletteState==='controls')await n(u,'show-tools').click();await n(u,'tool-'+key).click();assert.equal(n(u,'paint-action').value,key);assert.equal(n(u,'tool-summary').textContent,'Brush tools · '+label);assert.equal(n(u,'tool-'+key).attributes['aria-pressed'],'true');assert.equal(n(u,'tool-picker').open,false);assert.equal(n(u,'tool-picker').hidden,true);assert.equal(n(u,'quick-panel').hidden,false);assert.equal(n(u,'quick-title').textContent,label+' controls');assert.equal(n(u,'blur-controls').hidden,key!=='blur');assert.equal(n(u,'quick-brush').hidden,key==='fill');assert.equal(r.h.undoStack.length,count);}
 n(u,'paint-action').disabled=true;await n(u,'tool-paint').click();assert.equal(n(u,'paint-action').value,'blur');u.api.close();
});
test('1042 quick palette reuses the original channel, colour, size and opacity controls while keeping layer controls outside it',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();const quick=n(u,'quick-body');
 for(const key of ['common-controls','quick-colour','quick-brush','blur-controls','roughness-controls','metalness-controls','fill-controls','fill-hint','quick-mask-value'])assert.equal(n(u,key).parentNode,quick,key+' moves into the floating quick palette');
 assert.notEqual(n(u,'layer-list').parentNode,quick,'layer list stays in the persistent left panel');
 await n(u,'tool-paint').click();n(u,'colour').value='#1279bc';n(u,'colour').dispatchEvent({type:'input'});assert.equal(n(u,'hex').value,'#1279BC');n(u,'radius').value='24';n(u,'radius').dispatchEvent({type:'input'});assert.equal(n(u,'radius-readout').textContent,'24');n(u,'opacity').value='.45';n(u,'opacity').dispatchEvent({type:'input'});assert.equal(n(u,'opacity-readout').textContent,'45%');
 await n(u,'add-layer').click();await n(u,'add-mask').click();n(u,'paint-target').value='mask';n(u,'paint-target').dispatchEvent({type:'change'});assert.equal(n(u,'quick-mask-value').hidden,false);assert.equal(n(u,'quick-colour').hidden,true);u.api.close();
});
test('1042 drag handle moves the compact palette and clamps both tool and control layouts inside the viewport',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();const handle=n(u,'drag-tools'),down=handle.listeners.get('pointerdown')[0];down({button:0,pointerId:77,clientX:20,clientY:20,currentTarget:handle,preventDefault(){},stopPropagation(){}});u.emit('pointermove',{pointerId:77,clientX:120,clientY:120});assert.deepEqual(position(u),{left:375,top:242});u.emit('pointermove',{pointerId:77,clientX:1120,clientY:1120});assert.deepEqual(position(u),{left:542,top:242});u.emit('pointerup',{pointerId:77});await n(u,'tool-paint').click();assert.equal(u.api.paletteState,'controls');await n(u,'show-tools').click();assert.equal(u.api.paletteState,'tools');assert.deepEqual(position(u),{left:542,top:242});u.api.close();
});
test('960 choosing a radial tool during live Pencil contact uses original cancellation and keeps committed stroke/history',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();await n(u,'tool-paint').click();n(u,'colour').value='#000000';u.emit('pointerdown');u.emit('pointerup');const paint=r.target().colourPaint,count=r.h.undoStack.length;
 n(u,'colour').value='#ff0000';u.emit('pointerdown');u.emit('pointermove',{clientX:470});await n(u,'tool-erase').click();u.emit('pointerup');assert.equal(r.target().colourPaint,paint);assert.equal(r.h.undoStack.length,count);assert(r.controls.enabled);u.api.close();await n(u,'tool-blur').click();assert.equal(n(u,'paint-action').value,'erase');
});
