import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createPerformanceMonitor} from '../src/performance-core.js';
import {createSubdDisplayCache} from '../src/subd-display-cache.js';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
const read=p=>fs.readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const main=read('main.js');
const line=name=>{const i=main.indexOf(`function ${name}(`);return main.slice(i,main.indexOf('\n',i));};
test('812 phase/counter capture is off by default, independently bounded and fully reset',()=>{
 let clock=0,reads=0;const m=createPerformanceMonitor(()=>{reads++;return clock;});
 m.stage('geometry',0);m.cache(true);assert.equal(reads,0);assert.equal(Object.keys(m.snapshot().stages).length,0);assert.equal(m.snapshot().cacheHits,0);
 m.setEnabled(true);
 for(let i=0;i<200;i++){const start=m.start();clock+=i;m.stage('geometry',start);}
 m.stage('unknown',0);m.stage('cage',null);assert.equal(m.snapshot().stages.geometry.samples,120);assert.equal(m.snapshot().stages.geometry.meanMs,139.5);assert.equal(m.snapshot().stages.geometry.maxMs,199);
 m.cache(true);m.cache(false);assert.equal(m.snapshot().cacheHits,1);assert.equal(m.snapshot().cacheMisses,1);
 m.reset();assert.equal(Object.keys(m.snapshot().stages).length,0);assert.equal(m.snapshot().cacheHits,0);assert.equal(m.snapshot().cacheMisses,0);
});
test('812 actual main separates active display, geometry, scene hooks and cage without duplicate work',()=>{
 let clock=0;const events=[],monitor=createPerformanceMonitor(()=>clock),mesh=EditableMesh.cube();
 const cache=createSubdDisplayCache((m,l)=>{clock+=20;return subdivide(m,l);},applyMirror);
 const native=EditableMesh.prototype.triangulatedGeometry;
 // Controlled elapsed work; actual native geometry and SubD still execute.
 const c={mesh,subdLevel:1,mirrorAxes:{},subdDisplayCache:cache,applyMirror:()=>{clock+=2;return {triangulatedGeometry:()=>({})};},subdEnabled:true,showCage:true,selection:null,drag:null,root:{add:()=>{events.push('body');clock+=7;}},clearGroup:()=>events.push('clear'),baseMaterial:{},subdMaterial:{},THREE:{Mesh:class{constructor(){this.userData={};clock+=3;}}},activeMirrorAxes:()=>[],addCage:()=>{events.push('cage');clock+=5;},__boxlabPerformance:monitor};
 for(const name of ['updateStatus','updateActionAvailability','syncDirectToolControls','syncTransformButtons','syncSelectionModeButtons','syncCreaseControl','syncMirrorAlignControl'])c[name]=()=>{};
 vm.createContext(c);vm.runInContext(line('modifiedBaseMesh')+'\n'+line('renderMesh'),c);
 c.renderMesh();assert.equal(monitor.snapshot().rebuilds,0);
 monitor.setEnabled(true);c.renderMesh();let s=monitor.snapshot();assert.equal(s.cacheHits,1);assert.equal(s.cacheMisses,0);assert.equal(s.stages.display.meanMs,2);assert.equal(s.stages.geometry.meanMs,3);assert.equal(s.stages.scene.meanMs,7);assert.equal(s.stages.cage.meanMs,5);assert.equal(s.rebuildMeanMs,17);
 mesh.vertices[0].x+=.1;c.renderMesh();s=monitor.snapshot();assert.equal(s.cacheMisses,1);assert.equal(s.stages.display.maxMs,22);assert.deepEqual(events,['clear','body','cage','clear','body','cage','clear','body','cage']);assert.equal(EditableMesh.prototype.triangulatedGeometry,native);
});
test('812 actual inactive rebuild reports its own nested cost and preserves skip/error behavior',()=>{
 const source=read('multi-object.js'),start=source.indexOf('function rebuildInactiveLayer(body){'),text=source.slice(start,source.indexOf('\nfunction installRenderObserver',start));
 let clock=0;const monitor=createPerformanceMonitor(()=>clock),added=[],warnings=[],layer={add:x=>added.push(x)};
 const c={__boxlabPerformance:monitor,ensureInactiveLayer:()=>layer,clearInactiveLayer:()=>{clock+=2;},objects:[{id:'active'},{id:'hidden'},{id:'bad'},{id:'other'}],activeId:'active',shouldShow:o=>o.id!=='hidden',displayMeshFor:o=>{clock+=10;if(o.id==='bad')throw Error('fixture');return {triangulatedGeometry:()=>{clock+=4;return {};}};},inactiveBodies:[],THREE:{Mesh:class{constructor(){this.userData={};}}},console:{warn:(...x)=>warnings.push(x)},__boxlabRenderModes:{refreshStudio:()=>{clock+=1;}}};
 vm.createContext(c);vm.runInContext(text,c);const body={material:{clone:()=>({})}};
 c.rebuildInactiveLayer(body);assert.equal(monitor.snapshot().stages.inactive,undefined);
 monitor.setEnabled(true);const outer=monitor.start();c.rebuildInactiveLayer(body);clock+=3;monitor.stage('scene',outer);
 const s=monitor.snapshot();assert.equal(s.stages.inactive.meanMs,27);assert.equal(s.stages.scene.meanMs,30);assert.equal(added.length,2);assert.equal(warnings.length,2);assert.equal(added[0].userData.objectId,'other');
});
