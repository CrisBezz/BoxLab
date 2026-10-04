import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
const read=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
const upgrade=read('transform-upgrade.js'),gizmo=read('total-gizmo.js');
for(const [tool,value,expected] of [['move','2',[1,-1,-1]],['rotate','90',[1,-1,-1]],['scale','2',[-2,-1,-1]]]){
 test('Beta6 floating '+tool+' uses actual exact owner with one Undo/Redo',()=>{
  const mesh=EditableMesh.cube(2),before=mesh.clone(),history=new History(),palette={hidden:false},input={value,blur(){}};
  const c={THREE,state:()=>({mesh}),mode:()=> 'object',selected:()=>[],tool:()=>tool,explicitAxis:()=>null,directFaceToolActive:()=>false,render(){},status:{},valueInput:{value:''},__boxlabHistory:history,floatInput:input,lastSpec:{tool,constraint:tool==='rotate'?'z':'x'},floatPalette:palette,floatTitle:()=>tool,document:{querySelector:()=>({value:'old'})},hideFloatInput:()=>palette.hidden=true};
  vm.createContext(c);vm.runInContext(upgrade.slice(upgrade.indexOf('function axisVector('),upgrade.indexOf('function explicitAxis('))+upgrade.slice(upgrade.indexOf('function selectionVertices('),upgrade.indexOf('function screenPoint('))+upgrade.slice(upgrade.indexOf('function applyExactTransform('),upgrade.indexOf('function applyNumeric(')),c);
  c.__boxlabTransformUpgrade={applyExact:c.applyExactTransform};vm.runInContext(gizmo.slice(gizmo.indexOf('function commitFloatInput(){'),gizmo.indexOf('for(const el of [floatPalette')),c);c.commitFloatInput();
  assert.equal(palette.hidden,true);assert.equal(history.undoStack.length,1);mesh.vertices[0].toArray().forEach((v,i)=>assert.ok(Math.abs(v-expected[i])<1e-8));const restored=history.undo(mesh);assert.deepEqual(restored,before);assert.deepEqual(history.redo(restored),mesh);
 });
}
test('Beta6 actual indexed export retains UV/tangent/colour/morph groups and reverses import fit once',()=>{
 const mesh=new EditableMesh([new THREE.Vector3(1,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(3,2,0),new THREE.Vector3(1,2,0)],[[0,1,2,3]]);mesh.faceGroups=['walls'];
 const source=read('export-as-panel.js'),c={THREE,faceNormal:()=>new THREE.Vector3(0,0,1)};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function triangulateFace('),source.indexOf('function topologySignature('))+source.slice(source.indexOf('function editableToGeometry('),source.indexOf('function nomadGroupColour(')),c);
 const channels={uvs:[[[0,0],[1,0],[1,1],[0,1]]],tangents:[Array.from({length:4},()=>[1,0,0,1])],colors:[Array.from({length:4},()=>[.2,.3,.4,1])],morphTargets:[{position:[Array.from({length:4},()=>[2,0,0])]}],morphWeights:[.5],importFit:{scale:2,center:[10,20,30]}};
 const result=c.editableToGeometry(mesh,channels),g=result.geometry;assert.equal(result.vertexCount,4);assert.equal(result.indexCount,6);assert.ok(result.uvRestored&&result.tangentsRestored&&result.vertexColorsRestored&&result.morphTargetsRestored);assert.equal(g.groups.length,1);assert.equal(result.groups[0].name,'walls');for(let i=0;i<4;i++){assert.equal(g.morphAttributes.position[0].getX(i),1);assert.equal(g.getAttribute('position').getZ(i),30);}const exported=Array.from({length:4},(_,i)=>g.getAttribute('position').getX(i)+.5*g.morphAttributes.position[0].getX(i)).sort();assert.deepEqual(exported,mesh.vertices.map(v=>v.x/2+10).sort());
});
