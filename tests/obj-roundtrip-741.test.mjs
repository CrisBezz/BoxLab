import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {buildSceneOBJ,resolveExportMesh,safeOBJName} from '../src/scene-obj-export-core.js';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
const object=(name,groups=null)=>{const mesh=EditableMesh.cube(2);if(groups)mesh.faceGroups=groups;return{name,mesh,settings:{}};};
const positions=mesh=>mesh.vertices.map(v=>v.toArray().map(n=>Number(n.toFixed(6))));
// Independent OBJ stream reader: group state persists until a g record changes it.
// No exporter/importer helper reused here; catches omissions hidden by BoxLab's o reset.
function records(text){let group=null,name=null,vertices=0;const faces=[];for(const line of text.trim().split('\n')){if(line.startsWith('o '))name=line.slice(2);else if(line==='g'||line.startsWith('g '))group=line.slice(1).trim()||null;else if(line.startsWith('v '))vertices++;else if(line.startsWith('f ')){const ids=line.slice(2).split(/\s+/).map(Number);for(const id of ids)assert.ok(Number.isInteger(id)&&id>0&&id<=vertices,'valid global vertex index');faces.push({name,group,ids});}}return{faces,vertices};}
test('741 scene OBJ explicitly clears prior group before an ungrouped object',()=>{
 const a=object('Grouped',Array(6).fill('Walls')),b=object('Ungrouped');const out=buildSceneOBJ([a,b]);
 assert.deepEqual(records(out.content).faces.filter(f=>f.name==='Ungrouped').map(f=>f.group),Array(6).fill(null));
});
test('741 group line breaks cannot inject geometry records',()=>{
 const a=object('Cube',Array(6).fill('Walls\nf 1 2 3\r\no Injected'));
 const out=buildSceneOBJ([a]),parsed=parseEditableOBJ(out.content);assert.equal(out.exported,1);assert.equal(parsed.length,1);assert.equal(parsed[0].mesh.faces.length,6);assert.equal(records(out.content).faces.length,6);assert.ok(parsed[0].mesh.faceGroups.every(g=>g==='Walls f 1 2 3 o Injected'));
});
for(const subd of [false,true])for(const mirror of [false,true])test(`741 ${subd?'SubD':'Base'} ${mirror?'Mirror':'plain'} multi-object OBJ round trip preserves evaluated geometry and groups`,()=>{
 const a=object('First Cube',['Walls',null,'Roof','Roof',null,'Floor']),b=object('Second Cube',Array(6).fill('Second'));
 b.mesh.vertices.forEach(v=>v.x+=5);a.settings={subdLevel:1,mirror:{x:mirror,y:false,z:false}};
 const before=[a,b].map(o=>o.mesh.clone()),expected=[a,b].map(o=>resolveExportMesh(o,subd));
 const out=buildSceneOBJ([a,b],{subd}),parsed=parseEditableOBJ(out.content),stream=records(out.content);
 assert.equal(parsed.length,2);assert.deepEqual(parsed.map(o=>o.name),['First Cube','Second Cube']);assert.equal(out.vertices,expected.reduce((n,m)=>n+m.vertices.length,0));
 for(let i=0;i<2;i++){assert.deepEqual(positions(parsed[i].mesh),positions(expected[i]));assert.deepEqual(parsed[i].mesh.faces,expected[i].faces);assert.deepEqual(parsed[i].mesh.faceGroups,expected[i].faceGroups);assert.deepEqual([a,b][i].mesh,before[i]);}
 assert.equal(stream.faces.length,expected.reduce((n,m)=>n+m.faces.length,0));const offset=expected[0].vertices.length;assert.ok(stream.faces.filter(f=>f.name==='Second Cube').every(f=>f.ids.every(id=>id>offset)));
});
test('741 real facegroups, resets and repeated group transitions retained without synthetic object-name group',()=>{
 const a=object('Not a facegroup',['A',null,'B','B',null,'A']),out=buildSceneOBJ([a]),parsed=parseEditableOBJ(out.content);
 assert.deepEqual(parsed[0].mesh.faceGroups,a.mesh.faceGroups);assert.deepEqual(records(out.content).faces.map(f=>f.group),a.mesh.faceGroups);assert.doesNotMatch(out.content,/^g Not a facegroup$/m);
});
test('741 skipped empty objects do not advance OBJ indices or emit phantom objects',()=>{
 const a=object('A'),b=object('B'),out=buildSceneOBJ([{name:'Empty',mesh:new EditableMesh([],[])},a,{name:'No faces',mesh:new EditableMesh([new THREE.Vector3()],[])},b]);
 assert.equal(out.exported,2);assert.equal(out.vertices,16);assert.deepEqual(parseEditableOBJ(out.content).map(o=>o.name),['A','B']);assert.equal(records(out.content).faces.length,12);
});
test('741 object name whitespace/newlines remain one object record and fallback deterministic',()=>{
 const out=buildSceneOBJ([object('  First\nCube\r '),object('  ')]);assert.deepEqual(parseEditableOBJ(out.content).map(o=>o.name),['First Cube','Object 2']);assert.equal(safeOBJName(null,2),'Object 3');
});

test('741 direct shell and integrity loader share one refreshed Quick OBJ module URL',()=>{
 const shell=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'),loader=fs.readFileSync(new URL('../src/direct-topology-conformance-guard.js',import.meta.url),'utf8');
 const pattern=/scene-obj-export-238\.js\?v=([0-9.]+)/;
 assert.equal(shell.match(pattern)?.[1],'0.36.18.741');assert.equal(loader.match(pattern)?.[1],shell.match(pattern)?.[1]);
 assert.match(shell,/direct-topology-conformance-guard\.js\?v=0\.36\.18\.741/);
});
