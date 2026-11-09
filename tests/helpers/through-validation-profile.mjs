import fs from 'node:fs';import vm from 'node:vm';import * as THREE from 'three';import '../../src/topology-foundation.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
export function validationProfile({legacy=false}={}){
 const source=read(legacy?'../fixtures/performance/through-validation-1121.js':'../../src/through-kernel.js');
 const a=source.indexOf('export function validateThrough('),b=source.indexOf('\nfunction context(',a),body=source.slice(a,b<0?source.length:b).replace('export ','');
 let edgeMapVisits=0,edgeMapEnumerations=0;
 class CountingMap extends Map{*values(){edgeMapEnumerations++;for(const value of super.values()){edgeMapVisits++;yield value;}}}
 const c={THREE,V:THREE.Vector3,Map:CountingMap,Set,topology:()=>globalThis.__boxlabTopology};vm.createContext(c);
 vm.runInContext(['areaVector','edgeUses'].map(n=>source.split('\n').find(l=>l.startsWith('function '+n+'('))).join('\n')+'\n'+body,c);
 return {validate(mesh,eps){edgeMapVisits=0;edgeMapEnumerations=0;return c.validateThrough(mesh,eps);},counts:()=>({edgeMapVisits,edgeMapEnumerations})};
}
// Closed shared-index grid cube; no Earcut triangles or degenerate cap fans.
export function closedGrid(n,Mesh){
 const base=Mesh.cube(),vertices=[],faces=[],ids=new Map();
 const index=p=>{const k=p.map(v=>Math.round(v*n)).join(':');if(!ids.has(k)){ids.set(k,vertices.length);vertices.push(k.split(':').map(v=>Number(v)/n));}return ids.get(k);};
 for(const f of base.faces){const a=base.vertices[f[0]],b=base.vertices[f[1]],d=base.vertices[f[3]],at=(x,y)=>index(['x','y','z'].map(k=>a[k]+(b[k]-a[k])*x/n+(d[k]-a[k])*y/n));for(let y=0;y<n;y++)for(let x=0;x<n;x++)faces.push([at(x,y),at(x+1,y),at(x+1,y+1),at(x,y+1)]);}
 return new Mesh(vertices,faces);
}
