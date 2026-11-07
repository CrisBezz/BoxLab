import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
import {createSubdDisplayCache} from '../src/subd-display-cache.js';
const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const data=m=>({vertices:m.vertices.map(v=>v.toArray()),faces:m.faces,creases:[...m.creases],groups:m.faceGroups});
function harness(){let calls=0;const cache=createSubdDisplayCache((m,l)=>{calls++;return subdivide(m,l);},applyMirror);return {cache,calls:()=>calls};}
test('811 repeated active display requests reuse one result, exact native kernel output',()=>{
 const h=harness(),m=EditableMesh.cube(),axes={x:false,y:false,z:false};
 const first=h.cache.get(m,2,axes);assert.deepEqual(data(first),data(applyMirror(subdivide(m,2),axes)));
 for(let i=0;i<50;i++)assert.equal(h.cache.get(m,2,{...axes}),first);
 assert.equal(h.calls(),1);h.cache.clear();assert.notEqual(h.cache.get(m,2,axes),first);assert.equal(h.calls(),2);
});
test('811 direct coordinate, winding, topology, crease, group, loose and modifier mutations invalidate exactly',()=>{
 const mutations=[m=>m.vertices[0].x+=1e-12,m=>m.vertices[0].set(0,0,0),m=>m.faces[0].reverse(),m=>m.faces[0][0]=1,m=>m.faces.push([0,1,2]),m=>m.creases.set('0:1',.3),m=>m.faceGroups[0]='paint',m=>m.looseEdges=new Set(['0:6']),m=>m.looseVertices=new Set([0])];
 for(const mutate of mutations){const h=harness(),m=EditableMesh.cube(),axes={x:false,y:false,z:false};const before=h.cache.get(m,1,axes);mutate(m);const after=h.cache.get(m,1,axes);assert.notEqual(after,before);assert.equal(h.calls(),2);assert.deepEqual(data(after),data(applyMirror(subdivide(m,1),axes)));}
 const h=harness(),m=EditableMesh.cube();h.cache.get(m,1,{});h.cache.get(m,2,{});for(const axis of ['x','y','z'])h.cache.get(m,2,{[axis]:true});assert.equal(h.calls(),5);
});
test('811 source replacement, object switching and Undo/Redo geometry cannot resurrect stale displays',()=>{
 const h=harness(),a=EditableMesh.cube(),b=a.clone(),original=a.clone();
 h.cache.get(a,1,{});h.cache.get(b,1,{});h.cache.get(a,1,{});assert.equal(h.calls(),3);
 a.vertices[0].x+=.2;const edited=a.clone();const after=h.cache.get(a,1,{});
 a.vertices[0].copy(original.vertices[0]);assert.deepEqual(data(h.cache.get(a,1,{})),data(subdivide(original,1)));
 a.vertices[0].copy(edited.vertices[0]);assert.deepEqual(data(h.cache.get(a,1,{})),data(after));assert.equal(h.calls(),6);
});
test('811 actual main render path reuses SubD while export returns independent editable mesh',()=>{
 const h=harness(),m=EditableMesh.cube();let rendered;
 const c={mesh:m,mirrorAxes:{},subdLevel:2,subdDisplayCache:h.cache,applyMirror,subdEnabled:true,showCage:false,selection:null,drag:null,root:{add:()=>{}},clearGroup:()=>{},baseMaterial:{},subdMaterial:{},THREE:{Mesh:class{constructor(g){rendered=g;this.userData={};}}},activeMirrorAxes:()=>[],modifiedSubdDisplayResult:()=>({display:h.cache.get(m,2,c.mirrorAxes),uvPayload:null}),addCage:()=>{}};
 c.modifiedSubdMesh=(readOnly=false)=>{const result=c.subdDisplayCache.get(c.mesh,c.subdLevel,c.mirrorAxes);return readOnly?result:result.clone();};
 for(const name of ['updateStatus','updateActionAvailability','syncDirectToolControls','syncTransformButtons','syncSelectionModeButtons','syncCreaseControl','syncMirrorAlignControl'])c[name]=()=>{};
 const line=name=>{const i=source.indexOf(`function ${name}(`);return source.slice(i,source.indexOf('\n',i));};
 vm.createContext(c);vm.runInContext(line('modifiedBaseMesh')+'\n'+line('renderMesh'),c);
 c.renderMesh();c.selection={type:'edge',index:0};c.addSelectionHighlight=()=>{};c.renderMesh();assert.equal(h.calls(),1);assert(rendered.attributes.position.count>0);
 const exported=c.modifiedSubdMesh();exported.vertices[0].x=100;exported.faces[0].reverse();assert.notEqual(exported.vertices[0].x,c.modifiedSubdMesh(true).vertices[0].x);assert.equal(h.calls(),1);
 m.vertices[0].x+=.1;c.renderMesh();assert.equal(h.calls(),2);assert.deepEqual(data(c.modifiedSubdMesh(true)),data(subdivide(m,2)));
});
test('811 failed recomputation clears previous cache and retries the current cage',()=>{
 let fail=false,calls=0;const cache=createSubdDisplayCache((m,l)=>{calls++;if(fail)throw Error('fixture');return subdivide(m,l);},applyMirror),m=EditableMesh.cube();
 cache.get(m,1,{});m.vertices[0].x+=1;fail=true;assert.throws(()=>cache.get(m,1,{}));fail=false;assert.deepEqual(data(cache.get(m,1,{})),data(subdivide(m,1)));assert.equal(calls,3);
});
