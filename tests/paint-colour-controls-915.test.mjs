import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {readNomadProject} from '../src/nomad-export-core.js';
import {inspectPNG} from './helpers/png-inspect.mjs';
const node=(ui,key)=>ui.nodes.get('paint-'+key);
function set(ui,key,value,type='input'){const n=node(ui,key);n.value=String(value);n.dispatchEvent(new Event(type));}
function hsb(ui,h,s,b){set(ui,'hue',h);set(ui,'saturation',s);set(ui,'brightness',b);}
function stroke(ui,x=450){ui.emit('pointerdown',{clientX:x});ui.emit('pointermove',{clientX:x+15});ui.emit('pointerup',{clientX:x+20});}
test('915 original swatch and RGB/HSB/hex stay linked; greys remember hue and black remembers saturation without scene edits',async()=>{
 const r=runtime(),ui=uiRuntime(r);await ui.api.open();let events=0;node(ui,'colour').addEventListener('input',()=>events++);const n=r.h.undoStack.length;
 set(ui,'hex','ff0000');assert.equal(node(ui,'colour').value,'#ff0000');assert.equal(node(ui,'red').value,'255');assert.equal(node(ui,'green').value,'0');assert.equal(node(ui,'hue').value,'0');
 hsb(ui,120,100,100);assert.equal(node(ui,'colour').value,'#00ff00');hsb(ui,240,100,100);assert.equal(node(ui,'colour').value,'#0000ff');hsb(ui,360,100,100);assert.equal(node(ui,'colour').value,'#ff0000');
 hsb(ui,210,100,100);set(ui,'saturation',0);assert.equal(node(ui,'hue').value,'210');assert.equal(node(ui,'colour').value,'#ffffff');set(ui,'saturation',100);assert.equal(node(ui,'colour').value,'#0080ff');set(ui,'brightness',0);assert.equal(node(ui,'hue').value,'210');assert.equal(node(ui,'saturation').value,'100');assert.equal(node(ui,'colour').value,'#000000');set(ui,'brightness',100);assert.equal(node(ui,'colour').value,'#0080ff');
 set(ui,'colour','#12abef');assert.equal(node(ui,'hex').value,'#12ABEF');assert.equal(node(ui,'red').value,'18');assert.equal(node(ui,'green').value,'171');assert.equal(node(ui,'blue').value,'239');assert(events>0);assert.equal(r.h.undoStack.length,n);assert.equal(r.target().colourPaint,undefined);ui.api.close();
});
test('915 invalid or partial entries never publish; shorthand waits for commit; mask-disabled colour controls cannot change brush colour',async()=>{
 const r=runtime(),ui=uiRuntime(r);await ui.api.open();const old=node(ui,'colour').value;let events=0;node(ui,'colour').addEventListener('input',()=>events++);
 for(const [k,v]of [['hex','abc'],['hex','badhex'],['red',''],['red',256],['red',1.5],['hue',361],['saturation',-1],['brightness','Infinity']]){set(ui,k,v);assert.equal(node(ui,'colour').value,old);node(ui,k).dispatchEvent(new Event('change'));if(k==='hex'&&v==='abc'){assert.equal(node(ui,'colour').value,'#aabbcc');set(ui,'colour',old);events=0;}else assert.equal(node(ui,'colour').value,old);}
 set(ui,'hex','123');assert.equal(node(ui,'colour').value,old);node(ui,'hex').dispatchEvent(new Event('change'));assert.equal(node(ui,'colour').value,'#112233');await node(ui,'add-layer').click();await node(ui,'add-mask').click();for(const key of ['colour','hex','red','green','blue','hue','saturation','brightness'])assert.equal(node(ui,key).disabled,true);
 const maskColour=node(ui,'colour').value;set(ui,'hex','ffffff');assert.equal(node(ui,'colour').value,maskColour);node(ui,'paint-target').value='colour';node(ui,'paint-target').dispatchEvent(new Event('change'));assert.equal(node(ui,'red').disabled,false);ui.api.close();
});
test('915 numeric colour edits cancel original in-flight stroke, release controls and next stroke uses exact chosen bytes; Undo/Redo and Save/Open preserve paint',async()=>{
 const r=runtime(),ui=uiRuntime(r);await ui.api.open();const n=r.h.undoStack.length;ui.emit('pointerdown');ui.emit('pointermove',{clientX:465});assert.equal(r.controls.enabled,false);set(ui,'hex','00ffff');assert.equal(r.controls.enabled,true);ui.emit('pointerup');assert.equal(r.target().colourPaint,undefined);assert.equal(r.h.undoStack.length,n);
 node(ui,'pressure').checked=false;node(ui,'hardness').value='1';node(ui,'opacity').value='1';stroke(ui);const p=r.target().colourPaint;assert(p);assert(p.pixels.some((v,i)=>i%4===0&&v===0&&p.pixels[i+1]===255&&p.pixels[i+2]===255));assert.equal(r.h.undoStack.length,n+1);ui.api.close();const loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()))),(...a)=>new EditableMesh(...a));assert.deepEqual(loaded.objects.find(o=>o.id===3).colourPaint.pixels,p.pixels);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.target().colourPaint,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.target().colourPaint,p);
 const result=await buildNomadProjectWithMaps([r.target()],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),nom=readNomadProject(result.bytes),material=nom.json.materials[nom.json.meshes[0].material],image=nom.json.images[material.textures.color.index];assert.deepEqual(inspectPNG(nom.bin.subarray(image.offset,image.offset+image.length)).rgba,p.pixels);
});
