import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {existingFacegroupNames,selectedFacegroupName} from '../src/facegroup-authoring.js';
const mesh={faces:[[0],[1],[2],[3]],faceGroups:['Roof','Wall','Roof',null]};
const selection=ids=>({mode:()=> 'face',indices:()=>ids});
test('existing names are unique, current and read-only, including arbitrary text safely',()=>{
 const before=JSON.stringify(mesh);assert.deepEqual(existingFacegroupNames(mesh),['Roof','Wall']);assert.equal(JSON.stringify(mesh),before);
 assert.deepEqual(existingFacegroupNames(null),[]);const name='<img src=x onerror=alert(1)>';
 assert.deepEqual(existingFacegroupNames({faceGroups:[name,name,'',null]}),[name]);
 const source=fs.readFileSync(new URL('../src/facegroup-list.js',import.meta.url),'utf8');
 assert.match(source,/label\.textContent=name/);assert.doesNotMatch(source,/innerHTML/);
});
test('selected group reuse accepts uniform groups and refuses mixed, ungrouped or invalid selections',()=>{
 const before=JSON.stringify(mesh);assert.deepEqual(selectedFacegroupName(mesh,selection([0,2,2])),{ok:true,name:'Roof'});
 for(const ids of [[0,1],[0,3],[3],[],[-1],[4],[1.1]])assert.equal(selectedFacegroupName(mesh,selection(ids)).ok,false);
 assert.equal(selectedFacegroupName(null,selection([0])).ok,false);
 assert.equal(selectedFacegroupName(mesh,{mode:()=> 'edge'}).ok,false);assert.equal(JSON.stringify(mesh),before);
});
