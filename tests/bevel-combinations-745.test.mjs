import {assetReference} from './helpers/release-contract.mjs';
import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh,knife} from './helpers/modelling-combinations-runtime.mjs';
import {fixture} from './helpers/face-bevel-geometry-runtime.mjs';
import {History} from '../src/history.js';
import {installBevelWatertightGuard} from '../src/bevel-watertight-guard.js';
const snapshot=m=>({v:m.vertices.map(v=>v.toArray()),f:Array.from(m.faces,f=>Array.from(f)),g:Array.from(m.faceGroups),c:Array.from(m.creases),le:Array.from(m.looseEdges||[]),lv:Array.from(m.looseVertices||[])});
function closed(m){for(const e of m.edges())if(!e.loose){assert.equal(e.faces.length,2,`open edge ${e.a}:${e.b}`);const directions=e.faces.map(fi=>{const f=m.faces[fi];return f.some((v,k)=>v===e.a&&f[(k+1)%f.length]===e.b)?1:-1;});assert.notEqual(directions[0],directions[1],`inconsistent winding ${e.a}:${e.b}`);}assert.equal(m.faceGroups.length,m.faces.length);for(const f of m.faces)assert.equal(new Set(f).size,f.length);}
function cube(group='shell'){const m=EditableMesh.cube();m.faceGroups.fill(group);return m;}
for(const segments of [1,3])test(`all eligible single edges after Loop execute Bevel ${segments}, including mixed-valence endpoints`,()=>{
 const m=cube();assert.ok(m.loopCut(0,.4));let tested=0;for(let i=0;i<m.edges().length;i++){const trial=m.clone();if(!trial.generalBevelSelectionInfo([i]))continue;assert.ok(trial.generalBevelSelection([i],.15,segments),`refused edge ${i}`);closed(trial);assert.ok(trial.faceGroups.every(g=>g==='shell'));tested++;}assert.equal(tested,20);
});
for(const segments of [1,3])test(`eligible single edges after actual Knife release execute Bevel ${segments}`,()=>{
 const m=cube(),h=new History();knife(m,h);closed(m);for(let i=0;i<m.edges().length;i++){const trial=m.clone();if(!trial.generalBevelSelectionInfo([i]))continue;assert.ok(trial.generalBevelSelection([i],.15,segments),`refused edge ${i}`);closed(trial);assert.ok(trial.faceGroups.every(g=>g==='shell'));}
});
for(const segments of [1,3])for(const route of ['single','connected','separate','loop','perimeter'])test(`${route} Bevel ${segments} preserves uniform facegroup provenance`,()=>{
 const m=cube();let ids;
 if(route==='single')ids=[0];
 if(route==='connected')ids=[0,1];
 if(route==='separate'){const edges=m.edges();ids=[0,edges.findIndex((e,i)=>i!==0&&![e.a,e.b].some(v=>[edges[0].a,edges[0].b].includes(v)))];}
 if(route==='loop'){const cut=m.loopCut(0,.4),verts=new Set(cut.slideData.map(v=>v.vertex));ids=m.edges().flatMap((e,i)=>verts.has(e.a)&&verts.has(e.b)?[i]:[]);}
 if(route==='perimeter'){m.loopCut(0,.4);const face=m.faces[0];ids=m.edges().flatMap((e,i)=>face.some((v,j)=>m.edgeKey(v,face[(j+1)%face.length])===m.edgeKey(e.a,e.b))?[i]:[]);}
 assert.equal(m.generalBevelSelectionInfo(ids)?.mode,route);assert.ok(m.generalBevelSelection(ids,.15,segments));closed(m);assert.ok(m.faceGroups.every(g=>g==='shell'));
});
test('mixed group edge retains original labels; new strip is ungrouped',()=>{
 const m=cube();m.faceGroups=m.faces.map((_,i)=>`g${i}`);const before=[...m.faceGroups];const r=m.generalBevelSelection([0],.15,3);assert.ok(r);assert.deepEqual(m.faceGroups.slice(0,6),before);assert.ok(r.faceIndices.every(fi=>m.faceGroups[fi]===null));closed(m);
});
for(const mode of ['face','edge'])for(const action of ['cancel','apply'])test(`actual ${mode} preview ${action} preserves facegroups and one-step history`,()=>{
 const m=cube(),f=fixture(m);f.setMode(mode);f.setIds([0]);const before=snapshot(m);if(mode==='edge')f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();f.node('#bevelSegments').value='3';f.node('#bevelSegments').listeners.get('input')();assert.deepEqual(snapshot(m),before);f.action(action);
 if(action==='cancel'){assert.deepEqual(snapshot(m),before);assert.equal(f.context.__boxlabHistory.undoStack.length,0);}else{closed(m);assert.ok(m.faceGroups.every(g=>g==='shell'));assert.equal(f.context.__boxlabHistory.undoStack.length,1);const after=snapshot(m),undo=f.context.__boxlabHistory.undo(m);assert.deepEqual(snapshot(undo),before);assert.deepEqual(snapshot(f.context.__boxlabHistory.redo(undo)),after);}
});
test('Edge live drag → Cancel restores original topology and groups',()=>{
 const m=cube(),f=fixture(m);f.setMode('edge');f.setIds([0]);const before=snapshot(m);f.node('#bevelBtn').listeners.get('click')({preventDefault(){},stopImmediatePropagation(){}});f.launch();f.pointer('pointerdown');f.pointer('pointermove',40);closed(m);f.pointer('pointercancel');assert.deepEqual(snapshot(m),before);assert.equal(f.context.__boxlabHistory.undoStack.length,0);
});
for(const failure of ['null','throw','boundary','third-owner'])test(`watertight guard restores topology, groups and loose data on ${failure}`,()=>{
 class Broken extends EditableMesh{};Broken.prototype.__bevelWatertightGuardInstalled=false;Broken.prototype.generalBevelSelection=function(){this.vertices[0].x=99;this.faceGroups[0]='corrupt';this.looseEdges.add('0:7');if(failure==='throw')throw Error('test failure');if(failure==='null')return null;if(failure==='third-owner')this.faces.push([...this.faces[0]]);else this.faces.pop();return {};};installBevelWatertightGuard(Broken);const m=new Broken(cube().vertices,cube().faces,null,cube().faceGroups);m.looseEdges=new Set();m.looseVertices=new Set();const before=snapshot(m);assert.equal(m.generalBevelSelection([0],.2,1),null);assert.deepEqual(snapshot(m),before);
});
test('repeated Loop → Bevel → Knife → Loop → Bevel has exact Undo/Redo snapshots',()=>{
 let m=cube(),h=new History(),states=[snapshot(m)];const operation=fn=>{const before=m.clone();fn();closed(m);h.push(before);states.push(snapshot(m));};operation(()=>assert.ok(m.loopCut(0,.4)));operation(()=>assert.ok(m.generalBevelSelection([0],.15,3)));const fi=m.faces.findIndex(f=>f.length===4);knife(m,h,fi);closed(m);states.push(snapshot(m));operation(()=>{const i=m.edges().findIndex((_,i)=>m.clone().loopCut(i,.6));assert.ok(m.loopCut(i,.6));});operation(()=>{const i=m.edges().findIndex((_,i)=>m.clone().generalBevelSelection([i],.1,1));assert.ok(m.generalBevelSelection([i],.1,1));});for(let i=states.length-2;i>=0;i--){m=h.undo(m);assert.deepEqual(snapshot(m),states[i]);}for(let i=1;i<states.length;i++){m=h.redo(m);assert.deepEqual(snapshot(m),states[i]);}
});
test('bevelled groups survive OBJ export/import without synthetic labels',async()=>{
 const {buildSceneOBJ}=await import('../src/scene-obj-export-core.js'),{parseEditableOBJ}=await import('../src/obj-facegroups-core.js');const m=cube();m.faceGroups[0]='Front';assert.ok(m.generalBevelSelection([0],.15,3));const out=buildSceneOBJ([{name:'Bevel',mesh:m,settings:{}}]);const [parsed]=parseEditableOBJ(out.content);assert.deepEqual(parsed.mesh.faceGroups,m.faceGroups);assert.equal(parsed.mesh.faces.length,m.faces.length);
});
test('Inset and shell share one refreshed bevel bootstrap URL',async()=>{
 const fs=await import('node:fs');const shell=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'),inset=fs.readFileSync(new URL('../src/uniform-inset.js',import.meta.url),'utf8'),face=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');const token=shell.match(/loose-bootstrap\.js\?v=[\d.]+/)[0];assert.ok(inset.includes(token));assert.equal(face.match(/uniform-inset\.js\?v=[\d.]+/)[0],assetReference(face,'uniform-inset.js'));
});
for(const segments of [1,3])test(`rotated and translated Loop cage retains outward Bevel ${segments} caps`,()=>{
 const m=cube();m.loopCut(0,.4);const axis=m.vertices[0].clone().set(1,2,3).normalize();for(const v of m.vertices)v.applyAxisAngle(axis,.73).multiplyScalar(4).addScalar(10000);for(let i=0;i<m.edges().length;i++){const trial=m.clone();assert.ok(trial.generalBevelSelection([i],.15,segments));closed(trial);}
});
