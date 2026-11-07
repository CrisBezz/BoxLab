import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createPerformanceMonitor} from '../src/performance-core.js';
import {createSubdDisplayCache} from '../src/subd-display-cache.js';
import {EditableMesh} from '../src/mesh.js';
import {subdivide,subdivideWithCornerUVs} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
import {subdCornerUVPreviewSource} from '../src/subd-display-cache.js';
test('848 native active/inactive owners report distinct caches and retain aggregate contract',()=>{
 const monitor=createPerformanceMonitor();monitor.setEnabled(true);
 const c={__boxlabPerformance:monitor,mesh:EditableMesh.cube(),subdLevel:1,mirrorAxes:{},subdDisplayCache:createSubdDisplayCache(subdivide,applyMirror),createSubdDisplayCache,subdivide,subdivideWithCornerUVs,subdCornerUVPreviewSource,__boxlabExportAs:{topologySignature:meshTopologySignature},applyMirror};vm.createContext(c);
 c.modifiedSubdMesh=(readOnly=false)=>{const display=c.subdDisplayCache.get(c.mesh,c.subdLevel,c.mirrorAxes);monitor.cache(c.subdDisplayCache.hit);return readOnly?display:display.clone();};
 const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),start=main.indexOf('function modifiedBaseMesh()');vm.runInContext(main.slice(start,main.indexOf('\n',start)),c);
 const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');vm.runInContext(multi.slice(multi.indexOf('const inactiveSubdCaches='),multi.indexOf('function queueOutliner()')),c);
 const object={mesh:EditableMesh.cube(),settings:{subd:true,subdLevel:1}};
 c.modifiedSubdMesh(true);c.modifiedSubdMesh(true);c.displayMeshFor(object);c.displayMeshFor(object);c.displayMeshFor(object);
 const s=monitor.snapshot();assert.deepEqual(s.cacheOwners,{active:{hits:1,misses:1},inactive:{hits:2,misses:1}});assert.equal(s.cacheHits,3);assert.equal(s.cacheMisses,2);
});
test('848 owner counters are opt-in, snapshot-isolated and reset with original monitor lifecycle',()=>{
 const m=createPerformanceMonitor();m.cache(true,'inactive');assert.equal(m.snapshot().cacheHits,0);m.setEnabled(true);m.cache(false);m.cache(true,'inactive');
 const s=m.snapshot();s.cacheOwners.inactive.hits=999;assert.equal(m.snapshot().cacheOwners.inactive.hits,1);
 m.reset();assert.deepEqual(m.snapshot().cacheOwners,{active:{hits:0,misses:0},inactive:{hits:0,misses:0}});m.cache(true,'inactive');m.setEnabled(false);assert.equal(m.snapshot().cacheOwners.inactive.hits,0);
});
