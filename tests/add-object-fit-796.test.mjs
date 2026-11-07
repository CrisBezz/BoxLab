import test from 'node:test';
import assert from 'node:assert/strict';
import {makePrimitive} from '../src/primitive-factory.js';
import {fitAddObjectToUnitCube} from '../src/add-object-fit.js';
import {addObjectRuntime} from './helpers/add-object-runtime.mjs';
const bounds=m=>['x','y','z'].map(k=>{const a=m.vertices.map(v=>v[k]);return [Math.min(...a),Math.max(...a)];});
function assertUnit(m){const b=bounds(m);for(const [min,max] of b){assert.ok(min>=-.500000000001&&max<=.500000000001);assert.ok(Math.abs(min+max)<1e-10);}assert.ok(Math.abs(Math.max(...b.map(([a,b])=>b-a))-1)<1e-10);}
test('Add fit preserves primitive topology and uniform proportions at all densities',()=>{
 for(const type of ['cube','plane','cylinder','cone','sphere','torus'])for(const [x,y] of [[8,3],[17,9],[32,32]]){
  const mesh=makePrimitive(type,{x,y}),before=mesh.vertices.map(v=>v.clone()),faces=JSON.stringify(mesh.faces),b=bounds(mesh),extent=Math.max(...b.map(([a,b])=>b-a));
  assert.equal(fitAddObjectToUnitCube(mesh),mesh);assertUnit(mesh);assert.equal(JSON.stringify(mesh.faces),faces);
  for(let i=1;i<before.length;i++)assert.ok(Math.abs(mesh.vertices[0].distanceTo(mesh.vertices[i])-before[0].distanceTo(before[i])/extent)<1e-10);
 }
});
test('actual Add Apply inserts unit-zone primitives and text with original Undo/Redo',async()=>{
 for(const type of ['Cube','Plane','Cylinder','Cone','Sphere','Torus','Text']){
  const r=addObjectRuntime(),before=r.snapshot();r.open(type);if(type==='Text'){await r.flush();r.input('text','Architecture');r.input('thickness',.7);}
  r.input('x',8);r.input('y',3);r.action('apply').click();assertUnit(r.manager.objects.at(-1).mesh);const after=r.snapshot();r.undo();assert.deepEqual(r.snapshot(),before);r.redo();assert.deepEqual(r.snapshot(),after);
 }
});
test('fit refuses nonfinite/empty candidates before any mutation',()=>{
 const m=makePrimitive('cube');m.vertices[3].x=NaN;const before=m.vertices.map(v=>v.toArray());assert.throws(()=>fitAddObjectToUnitCube(m));assert.deepEqual(m.vertices.map(v=>v.toArray()),before);assert.throws(()=>fitAddObjectToUnitCube({vertices:[]}));
});
