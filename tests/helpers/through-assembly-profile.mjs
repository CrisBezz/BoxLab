import fs from 'node:fs';import vm from 'node:vm';import {performance} from 'node:perf_hooks';import * as THREE from 'three';import '../../src/topology-foundation.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
// Execute the actual kernel; replace ONLY assemble for the exact .1123/.1124/.1131 baselines.
// Stage clocks and predicate counts are test-only instrumentation, never runtime hooks.
export function assemblyProfile({legacy=false,countPredicates=true,baseline=null,transform=source=>source}={}){
 let source=read('../../src/through-kernel.js');
 if(legacy||baseline==='1124'||baseline==='1131'){const original=read(baseline==='1131'?'../fixtures/performance/through-assembly-1131.js':baseline==='1124'?'../fixtures/performance/through-assembly-1124.js':'../fixtures/performance/through-assembly-1123.js'),frozen=original.slice(original.indexOf('export function assemble(')).replace('export ','').trimEnd();const a=source.indexOf('function assemble('),b=source.indexOf('\n// A rectangular opening',a);source=source.slice(0,a)+frozen+'\n'+source.slice(b);}
 source=transform(source).replace(/^import .*;\n/gm,'').replace(/export function/g,'function')
 .replace('function assemble(before,polys,eps,groups=null) {','function assemble(before,polys,eps,groups=null) {const assemblyStart=performance.now();')
 .replace('const faces=polys.map(p=>p.map(vertex));m.faces=faces;','const faces=polys.map(p=>p.map(vertex));m.faces=faces;counts.vertexMs+=performance.now()-assemblyStart;const seamStart=performance.now();')
 .replace('const t=m.vertices[id].clone().sub(m.vertices[a]).dot(ab)/l2;',countPredicates?'counts.seamPredicates++;const t=m.vertices[id].clone().sub(m.vertices[a]).dot(ab)/l2;':'const t=m.vertices[id].clone().sub(m.vertices[a]).dot(ab)/l2;')
 .replaceAll('q=>q.distanceTo(p)<=eps',countPredicates?'q=>(counts.vertexDistanceTests++,q.distanceTo(p)<=eps)':'q=>q.distanceTo(p)<=eps')
 .replace('// EditableMesh.faceNormal uses','counts.seamMs+=performance.now()-seamStart;\n  // EditableMesh.faceNormal uses');
 const c={THREE,performance,counts:{},__boxlabTopology:globalThis.__boxlabTopology};vm.createContext(c);vm.runInContext(source+'\nglobalThis.api={assemble,assemblyVertexLookup,seamVertexCandidates,buildNegativeExtrude,planThrough,buildThrough,validateThrough};',c);
 return {run(method,...args){c.counts={seamPredicates:0,vertexDistanceTests:0,seamMs:0,vertexMs:0};const t=performance.now(),result=c.api[method](...args);return {result,counts:{...c.counts,totalMs:performance.now()-t}};}};
}
