import test from 'node:test';
import assert from 'node:assert/strict';
import {makeTextObject} from '../src/text-object-core.js';
import fs from 'node:fs';
import {addObjectRuntime} from './helpers/add-object-runtime.mjs';

test('Add density settings stage creation, report exact counts and use single scene Undo/Redo',()=>{
 const r=addObjectRuntime(),before=r.snapshot();r.open('Cube');assert.equal(r.manager.objects.length,5);assert.equal(r.panel().style.left,'50%');
 r.input('x',7);r.input('y',3);assert.match(r.readout(),/^102 faces/);r.action('apply').click();
 assert.equal(r.manager.objects.length,6);assert.equal(r.manager.objects.at(-1).mesh.faces.length,102);assert.equal(r.c.selectedIds.size,1);assert.equal(r.panel(),undefined);
 const after=r.snapshot();r.undo();assert.deepEqual(r.snapshot(),before);r.redo();assert.deepEqual(r.snapshot(),after);
});
test('all six primitive settings and original detail presets change actual meshes',()=>{
 for(const name of ['Cube','Plane','Cylinder','Cone','Sphere','Torus']){const r=addObjectRuntime();r.open(name);r.click('Low');const low=r.readout();r.click('High');assert.notEqual(r.readout(),low,name);r.action('apply').click();assert.equal(r.manager.objects.length,6);assert.ok(r.manager.objects.at(-1).mesh.faces.length>6);}
});
test('Text word, thickness and depth bands create exactly one selected editable object with scene history',async()=>{
 const r=addObjectRuntime(),before=r.snapshot();r.open('Text');assert.equal(r.action('apply').disabled,true);await r.flush();r.input('text','BOX');r.input('thickness',.4);r.input('y',3);assert.equal(r.action('apply').disabled,false);r.action('apply').click();
 const o=r.manager.objects.at(-1);assert.equal(r.manager.objects.length,6);assert.equal(o.name,'BOX');assert.equal(o.kind,'editable');assert.ok(o.mesh.faces.length>20);const raw=makeTextObject(JSON.parse(fs.readFileSync(new URL('../src/fonts/helvetiker_regular.typeface.json',import.meta.url))),'BOX',{thickness:.4,x:4,y:3});const extent=Math.max(...['x','y','z'].map(k=>Math.max(...raw.vertices.map(v=>v[k]))-Math.min(...raw.vertices.map(v=>v[k]))));assert.ok(Math.abs(Math.max(...o.mesh.vertices.map(v=>v.z))-Math.min(...o.mesh.vertices.map(v=>v.z))-.4/extent)<1e-10);assert.deepEqual([...r.c.selectedIds],[o.id]);const after=r.snapshot();r.undo();assert.deepEqual(r.snapshot(),before);r.redo();assert.deepEqual(r.snapshot(),after);
});
test('Cancel, Escape and outside press preserve scene and redo, including pending font completion',async()=>{
 for(const exit of [r=>r.action('cancel').click(),r=>r.escape(),r=>r.outside()]){const r=addObjectRuntime({deferred:true});r.open('Cube');r.action('apply').click();r.undo();const before=r.snapshot();r.open('Text');exit(r);r.resolve();await r.flush();assert.equal(r.panel(),undefined);assert.deepEqual(r.snapshot(),before);r.redo();assert.equal(r.manager.objects.length,6);}
});
test('invalid text/thickness and failed font load never create or checkpoint objects',async()=>{
 const r=addObjectRuntime();r.open('Text');await r.flush();const before=r.snapshot();for(const [field,value] of [['text',' '],['text','🙂'],['text','BOX'],['thickness',0]]){r.input(field,value);if(value!=='BOX')assert.equal(r.action('apply').disabled,true);}assert.deepEqual(r.snapshot(),before);
 const broken=addObjectRuntime({fontOK:false});broken.open('Text');await broken.flush();assert.equal(broken.action('apply').disabled,true);assert.match(broken.readout(),/could not load/);assert.equal(broken.manager.objects.length,5);
});
test('existing Revolve Profile and Sweep Add launchers retain their original event owners',()=>{
 for(const [name,event] of [['Revolve Profile','boxlab-add-revolve-profile'],['Sweep','boxlab-add-sweep-path']]){const r=addObjectRuntime();r.add.click();r.click(name);assert.deepEqual(r.events,[event]);assert.equal(r.panel(),undefined);assert.equal(r.manager.objects.length,5);}
});
