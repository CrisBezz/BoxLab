// .992 replaces the native picker with a colour/name list at the user's request.
// Retain the original current-mesh/name preservation contract at its new adapter.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {existingFacegroupNames} from '../src/facegroup-authoring.js';
import {faceGroupPalette} from '../src/facegroup-colours-core.js';
import {createFacegroupDrafts} from '../src/facegroup-drafts.js';
const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
test('actual picker adapter refreshes current names/colours and preserves typed name and mesh metadata',()=>{
 const updates=[],input={value:'Wall'};let mesh={faces:[[0,1,2],[0,2,3]],faceGroups:['Roof','Wall']};const before=JSON.stringify(mesh);
 const c={facegroupList:{update:s=>updates.push(s)},faceGroupPalette,facegroupView:{},existingFacegroupNames,facegroupDrafts:createFacegroupDrafts(),manager:()=>null,bridge:()=>({mesh}),document:{querySelector:()=>input}};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function syncFacegroupNamePicker(){'),source.indexOf('function syncFacegroupControls(){')),c);c.syncFacegroupNamePicker();
 assert.deepEqual(updates[0].names,['Roof','Wall']);assert.equal(updates[0].selected,'Wall');assert.equal(input.value,'Wall');assert.equal(JSON.stringify(mesh),before);
 mesh={faces:[[0,1,2]],faceGroups:['<Roof>']};c.syncFacegroupNamePicker();assert.deepEqual(updates[1].names,['<Roof>']);assert.equal(input.value,'Wall');assert.match(updates[1].colours.get('<Roof>'),/^#[a-f0-9]{6}$/);
 mesh={faces:[],faceGroups:[]};c.syncFacegroupNamePicker();assert.equal(updates[2].names.length,0);
});
