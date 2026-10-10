import test from 'node:test';
import assert from 'node:assert/strict';
import {addObjectRuntime} from './helpers/add-object-runtime.mjs';

const preview=r=>r.find(n=>n.dataset.addPreview==='mesh');
const frame=r=>{const i=r.draws.findLastIndex(d=>d.clear);return r.draws.slice(i+1).filter(d=>d.path);};
const pointer=(n,type,x,y,id=1)=>n.dispatchEvent({type,pointerId:id,clientX:x,clientY:y,button:0,preventDefault(){},stopPropagation(){}});
test('six Add candidates render their actual polygon boundaries, update density and remain outside scene/history',()=>{
 for(const type of ['Cube','Plane','Cylinder','Cone','Sphere','Torus']){
  const r=addObjectRuntime(),before=r.snapshot();r.open(type);assert.ok(preview(r));
  r.input('x',8);r.input('y',4);
  const polygons=frame(r);assert.equal(polygons.length,Number(r.readout().split(' ')[0]),type);
  assert.ok(polygons.every(d=>d.path.every(p=>p.every(Number.isFinite))));assert.deepEqual(r.snapshot(),before);
  r.action('apply').click();const mesh=r.manager.objects.at(-1).mesh;
  assert.deepEqual(polygons.map(d=>d.path.length).sort(),mesh.faces.map(f=>f.length).sort());assert.equal(preview(r),undefined);
  r.undo();assert.deepEqual(r.snapshot(),before);
 }
});
test('preview rotation changes projection only and terminates on pointer cancellation',()=>{
 const r=addObjectRuntime();r.open('Cube');const n=preview(r),before=r.snapshot(),initial=JSON.stringify(frame(r));
 pointer(n,'pointerdown',10,10);pointer(n,'pointermove',50,25,2);assert.equal(JSON.stringify(frame(r)),initial);
 pointer(n,'pointermove',50,25);assert.notEqual(JSON.stringify(frame(r)),initial);assert.deepEqual(r.snapshot(),before);
 pointer(n,'pointercancel',50,25);assert.equal(n.hasPointerCapture(1),false);const count=r.draws.length;
 pointer(n,'pointermove',90,60);assert.equal(r.draws.length,count);r.action('cancel').click();pointer(n,'pointerdown',1,1);pointer(n,'pointermove',20,20);assert.equal(r.draws.length,count);
});
test('Text preview follows font readiness, word, thickness and depth bands; invalid candidate clears it',async()=>{
 const r=addObjectRuntime({deferred:true}),before=r.snapshot();r.open('Text');assert.equal(frame(r).length,0);
 r.resolve();await r.flush();assert.ok(frame(r).length>0);r.input('text','BOX');const word=JSON.stringify(frame(r));r.input('thickness',1.5);assert.notEqual(JSON.stringify(frame(r)),word);
 r.input('y',3);assert.equal(frame(r).length,Number(r.readout().split(' ')[0]));assert.deepEqual(r.snapshot(),before);
 r.input('text',' ');assert.equal(frame(r).length,0);assert.equal(r.action('apply').disabled,true);
});
test('preview disposal on all exits preserves redo and releases captured pointers',()=>{
 for(const exit of [r=>r.action('cancel').click(),r=>r.escape(),r=>r.outside(),r=>r.add.click()]){
  const r=addObjectRuntime();r.open('Cube');r.action('apply').click();r.undo();const before=r.snapshot();r.open('Torus');const n=preview(r);pointer(n,'pointerdown',10,10);exit(r);
  assert.equal(preview(r),undefined);assert.equal(n.hasPointerCapture(1),false);assert.deepEqual(r.snapshot(),before);r.redo();assert.equal(r.manager.objects.length,6);
 }
});
