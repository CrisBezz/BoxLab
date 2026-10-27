import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {existingFacegroupNames} from '../src/facegroup-authoring.js';
const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
test('actual picker populates explicit native options from current mesh without changing name or metadata',()=>{
 const list={children:[],replaceChildren(){this.children=[];},appendChild(o){this.children.push(o);},value:''},input={value:'Wall'};
 let mesh={faceGroups:['Roof','Wall','Roof',null]};const before=JSON.stringify(mesh);
 const c={existingFacegroupNames,bridge:()=>({mesh}),document:{querySelector:s=>s==='#facegroupNames'?list:input,createElement:()=>({})}};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function syncFacegroupNamePicker(){'),source.indexOf('function syncFacegroupControls(){')),c);c.syncFacegroupNamePicker();
 assert.deepEqual(list.children.map(o=>o.value),['','Roof','Wall']);assert.equal(list.value,'Wall');assert.equal(input.value,'Wall');assert.equal(JSON.stringify(mesh),before);
 mesh={faceGroups:['<Roof>','New']};c.syncFacegroupNamePicker();assert.deepEqual(list.children.map(o=>o.value),['','<Roof>','New']);assert.equal(list.children[1].textContent,'<Roof>');assert.equal(list.value,'');assert.equal(input.value,'Wall');
 mesh={faceGroups:[]};c.syncFacegroupNamePicker();assert.equal(list.children.length,1);assert.equal(list.children[0].textContent,'No named groups yet');
});
test('native select choice hands name to original input event; datalist dependency removed',()=>{
 assert.match(source,/<select id="facegroupNames"/);assert.doesNotMatch(source,/<datalist|list="facegroupNames"/);
 const start=source.indexOf("  panel.querySelector('#facegroupNames').addEventListener('change',()=>{");const end=source.indexOf("  document.querySelector('#viewModes')",start);assert.ok(start>0&&end>start);
 const select={value:'Roof'},input={value:'Wall',dispatchEvent:e=>events.push(e.type)},events=[],listeners={},status={};
 const c={panel:{querySelector:s=>s==='#facegroupNames'?{...select,addEventListener:(t,fn)=>listeners[t]=fn}:input},Event:class{constructor(type){this.type=type;}},status};vm.createContext(c);vm.runInContext(source.slice(start,end),c);listeners.change();assert.equal(input.value,'Roof');assert.deepEqual(events,['input']);assert.equal(status.textContent,'Facegroups · using Roof');
});
