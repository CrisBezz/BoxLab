import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {createFacegroupList} from '../src/facegroup-list.js';
import {faceGroupPalette,applyFaceGroupColours} from '../src/facegroup-colours-core.js';
import {createFacegroupStroke} from '../src/facegroup-stroke.js';
class Node{
 constructor(){this.children=[];this.style={};this.attrs={};this.listeners={};}
 appendChild(n){this.children.push(n);}
 replaceChildren(...nodes){this.children=nodes;}
 setAttribute(k,v){this.attrs[k]=v;}
 addEventListener(t,f){this.listeners[t]=f;}
}
const document={createElement:()=>new Node()};
test('list uses safe names, stable button identity, selected state, live colours and an empty message',()=>{
 const root=new Node(),selected=[];const list=createFacegroupList({root,document,onSelect:name=>selected.push(name)}),names=['<Roof>','Wall'];
 list.update({names,colours:new Map([['<Roof>','#123456'],['Wall','#abcdef']]),selected:'Wall'});
 const roof=root.children[0],wall=root.children[1];assert.equal(roof.children[1].textContent,'<Roof>');assert.equal(wall.attrs['aria-pressed'],'true');roof.listeners.click();assert.deepEqual(selected,['<Roof>']);
 list.update({names,colours:new Map([['<Roof>','#000000'],['Wall','#ffffff']]),selected:'<Roof>'});assert.equal(root.children[0],roof);assert.equal(roof.children[0].style.backgroundColor,'#000000');assert.equal(wall.attrs['aria-pressed'],'false');
 list.update({names:['Wall'],colours:new Map([['Wall','#ffffff']]),selected:'new name'});assert.equal(root.children[0],wall);assert.equal(wall.attrs['aria-pressed'],'false');
 list.update({names:[],colours:new Map(),selected:''});assert.match(root.children[0].textContent,/No named groups/);
});
test('swatch palette equals actual rendered face attributes for all presets, reseed and adjustments',()=>{
 const mesh={faces:[[0,1,2],[0,2,3],[0,3,4]],faceGroups:['Wall','Roof','Wall']},before=JSON.stringify(mesh);
 for(const palette of ['default','soft','vivid','contrast'])for(const seed of [0,17]){
  const settings={palette,seed,saturation:1.35,lightness:-.12},map=faceGroupPalette(mesh,settings),geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(27),3));
  assert.equal(applyFaceGroupColours(geometry,mesh,settings).ok,true);
  for(let i=0;i<3;i++){const c=map.get(mesh.faceGroups[i]);const actual=geometry.getAttribute('color');for(const [k,v]of [[0,c.r],[1,c.g],[2,c.b]])assert.ok(Math.abs(actual.array[i*9+k]-v)<1e-6);assert.match(c.getHexString(),/^[a-f0-9]{6}$/);}
 }
 assert.equal(JSON.stringify(mesh),before);assert.equal(faceGroupPalette(null).size,0);
});
test('actual list choice reuses name input and persistent brush without editing the mesh or adding history',()=>{
 const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');const start=source.indexOf('  facegroupList=createFacegroupList('),end=source.indexOf("  document.querySelector('#viewModes')",start);
 const root=new Node(),input={value:'Wall',dispatchEvent(e){events.push(e.type);brush.stop();}},events=[],status={},brush=createFacegroupStroke({context:()=>({})});brush.arm(null);let refresh=0;
 const c={createFacegroupList,document:{...document,querySelector:s=>s==='#facegroupNames'?root:input},Event:class{constructor(type){this.type=type;}},facegroupStroke:brush,syncFacegroupStrokeControls(){},syncFacegroupNamePicker(){refresh++;},status,__boxlabFacegroupDock:{visible:true}};vm.createContext(c);vm.runInContext(source.slice(start,end),c);
 c.facegroupList.update({names:['Roof'],colours:new Map([['Roof','#123456']]),selected:''});root.children[0].listeners.click();assert.equal(input.value,'Roof');assert.deepEqual(events,['input']);assert.equal(brush.group,'Roof');assert.equal(brush.armed,true);assert.equal(refresh,1);
});
