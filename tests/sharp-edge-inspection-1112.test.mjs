import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import * as THREE from 'three';import {EditableMesh} from '../src/mesh.js';import {installLooseTopology} from '../src/loose-topology.js';installLooseTopology(EditableMesh);
const read=n=>fs.readFileSync(new URL(n,import.meta.url),'utf8');
const old=read('./fixtures/performance/sharp-edges-1111.js'),current=read('../src/select-sharp-edges.js');
function inspector(source,threshold=30){const code=source.slice(source.indexOf('function inspect(m){'),source.indexOf('function selectionFor('));const c={limit:()=>threshold,degreesBetween:(a,b)=>a.angleTo(b)*180/Math.PI};vm.createContext(c);vm.runInContext(code,c);return c.inspect;}
for(const threshold of [0,30,90,180])test(`1112 classification parity across edits and restore, threshold ${threshold}`,()=>{
 const m=EditableMesh.cube(1);m.faces.push([0,1,2]);m.addLooseEdge(0,6);m.creases.set(m.edgeKey(0,1),.7);m.creases.set(m.edgeKey(0,6),.0005);const before=m.clone();
 for(const candidate of [m,(()=>{const n=m.clone();n.vertices[0].x+=.3;n.creases.set(n.edgeKey(0,1),0);return n;})(),before]){
  assert.deepEqual(JSON.parse(JSON.stringify(inspector(current,threshold)(candidate))),JSON.parse(JSON.stringify(inspector(old,threshold)(candidate))));
 }
});
test('1112 one native edge enumeration replaces per-edge rebuilds; legacy mesh fallback retains behavior',()=>{
 const m=EditableMesh.cube(1),base=m.edges.bind(m);let reads=0;m.edges=()=>{reads++;return base();};const edgeCount=base().length;inspector(old)(m);assert.equal(reads,edgeCount+1);reads=0;inspector(current)(m);assert.equal(reads,1);
 const legacy={faces:[],edges:()=>[{a:0,b:1,faces:[]}],edgeCrease:()=>.8};assert.deepEqual(JSON.parse(JSON.stringify(inspector(current)(legacy))),JSON.parse(JSON.stringify(inspector(old)(legacy))));
});
test('1112 preserves all release, model-change and angle-input refresh listeners',()=>{
 assert.equal(current.slice(current.indexOf("sharpButton.addEventListener")),old.slice(old.indexOf("sharpButton.addEventListener")));
});
