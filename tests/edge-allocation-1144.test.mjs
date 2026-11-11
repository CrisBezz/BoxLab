import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import crypto from 'node:crypto';import * as THREE from 'three';
import {pickScreenEdges as prior} from './fixtures/performance/edge-picker-1143.mjs';
import {pickScreenEdges as current} from '../src/edge-screen-picking.js';
import {edgePickerFixture} from './helpers/edge-picker-fixture-1143.mjs';
const plain=x=>JSON.parse(JSON.stringify(x));
test('1144 scratch projections retain all accepted first/full/Through results across cameras, transformed parents and repeated live edits',()=>{
 for(const orthographic of [false,true]){const f=edgePickerFixture(12,{orthographic}),source=JSON.stringify(f.mesh);
 for(const frame of [0,1,2]){if(frame){f.root.rotation.y+=.2;f.root.position.x+=.3;f.root.scale.setScalar(1+frame*.1);f.root.updateMatrixWorld(true);f.camera.position.x+=.4;f.camera.lookAt(6,0,6);f.camera.updateMatrixWorld();}
 for(const event of [f.event,{...f.event,clientX:f.event.clientX+6},{...f.event,clientY:f.event.clientY-9},{clientX:45,clientY:35}])for(const through of [false,true])for(const firstOnly of [false,true])assert.deepEqual(current(event,f.camera,f.canvas,f.root.children,{through,firstOnly}),prior(event,f.camera,f.canvas,f.root.children,{through,firstOnly}));}
 assert.equal(JSON.stringify(f.mesh),source);f.dispose();}
});
test('1144 actual picker allocates four clipping vectors per invocation instead of per proxy, with identical output and fresh scratch on next call',()=>{
 const f=edgePickerFixture(32),results=[];
 for(const [name,url]of [['before','./fixtures/performance/edge-picker-1143.mjs'],['after','../src/edge-screen-picking.js']]){const counts={v3:0,v4:0};class V3 extends THREE.Vector3{constructor(...args){super(...args);counts.v3++;}}class V4 extends THREE.Vector4{constructor(...args){super(...args);counts.v4++;}}
 const source=fs.readFileSync(new URL(url,import.meta.url),'utf8').replace(/^import .*\n/,'').replace('export function','function'),context={THREE:{...THREE,Vector3:V3,Vector4:V4}};vm.createContext(context);vm.runInContext(source,context);const run=()=>context.pickScreenEdges(f.event,f.camera,f.canvas,f.root.children,{through:true,firstOnly:true}),hits=plain(run());results.push({name,hits,counts:{...counts}});
 if(name==='after'){assert.equal(counts.v4,4);assert.deepEqual(plain(run()),hits);assert.equal(counts.v4,8,'new invocation owns separate scratch vectors');}}
 assert.deepEqual(results[1].hits,results[0].hits);assert(results[0].counts.v4>1000);assert(results[1].counts.v3<results[0].counts.v3);f.dispose();
});
test('1144 scalar finite checks and six original clipping planes preserve invalid, zero-length, near-crossing, behind and far-plane outcomes',()=>{
 const root=new THREE.Group(),camera=new THREE.PerspectiveCamera(45,1,.1,20),canvas={getBoundingClientRect:()=>({left:0,top:0,width:800,height:800})};camera.updateMatrixWorld();
 const positions=[[[-1,0,-2],[1,0,-2]],[[-1,0,2],[1,0,2]],[[0,0,1],[0,0,-2]],[[-1,0,-25],[1,0,-25]],[[NaN,0,-2],[1,0,-2]],[[Infinity,0,-2],[1,0,-2]],[[0,0,-2],[0,0,-2]]];
 positions.forEach((points,index)=>{const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),new THREE.LineBasicMaterial({visible:false}));line.userData={kind:'edge',index};root.add(line);});root.updateMatrixWorld(true);
 for(const event of [{clientX:400,clientY:400},{clientX:411,clientY:400},{clientX:-1,clientY:400},{clientX:NaN,clientY:400}])for(const firstOnly of [false,true])assert.deepEqual(current(event,camera,canvas,root.children,{firstOnly}),prior(event,camera,canvas,root.children,{firstOnly}));
 camera.projectionMatrix.elements[0]=NaN;assert.deepEqual(current({clientX:400,clientY:400},camera,canvas,root.children),[]);
});
test('1144 frozen accepted .1143 picker provenance is exact and never imported by runtime',()=>{
 const bytes=fs.readFileSync(new URL('./fixtures/performance/edge-picker-1143.mjs',import.meta.url));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),'2d5d8245d577fe384e4d8098467472e7546489d6bfcf16bb9df5bb5a56d7e504');
 assert(!fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8').includes('edge-picker-1143.mjs'));
});
