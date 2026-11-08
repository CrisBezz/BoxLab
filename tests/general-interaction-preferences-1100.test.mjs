import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {pencilSelectionRuntime} from './helpers/pencil-selection-runtime.mjs';

test('Pencil selection preference blocks mesh selection while retaining deliberate Pencil orbit',()=>{
 const r=pencilSelectionRuntime(EditableMesh.cube()),c=r.context;c.__boxlabGeneralSettings={get:()=>({pencilOrbit:true,pencilSelection:false})};r.setIds([]);
 const down=r.pointer('pointerdown',{clientX:500,clientY:300});assert.equal(down.stopped,true);assert.deepEqual(r.ids(),[]);
 r.pointer('pointermove',{clientX:520,clientY:300});assert.equal(r.orbit().down,1);assert.deepEqual(r.ids(),[]);
 r.pointer('pointerup',{clientX:520,clientY:300});assert.deepEqual(r.ids(),[]);
});

test('Pencil orbit preference leaves Pencil mesh selection available and blocks empty-space orbit',()=>{
 const r=pencilSelectionRuntime(EditableMesh.cube()),c=r.context;c.__boxlabGeneralSettings={get:()=>({pencilOrbit:false,pencilSelection:true})};
 r.pointer('pointerdown',{clientX:900,clientY:100});r.pointer('pointermove',{clientX:930,clientY:120});assert.equal(r.orbit().down,0);
});
