import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {installFacegroupUVWorkflow} from '../src/facegroup-uv-workflow.js';
import {EditableMesh} from '../src/mesh.js';import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
function fixture(){
 const mesh=EditableMesh.cube();mesh.faceGroups=mesh.faces.map((_,i)=>'G'+i);
 const scene=new THREE.Scene(),body=new THREE.Group();scene.add(body);body.position.x=2;
 const nodes=new Map(),row={listeners:{},querySelector:s=>nodes.get(s.match(/"([^"]+)"/)[1]),set innerHTML(html){for(const [,id]of html.matchAll(/data-fguv="([^"]+)"/g))nodes.set(id,{hidden:false,disabled:false,listeners:{},addEventListener(type,fn){this.listeners[type]=fn;}});}},document={createElement:()=>row},notice={},frames=new Map();let count=0,clock=0,commits=0,checkpoints=0,live=true;
 const object={id:1,mesh,settings:{}},context={object,mesh,scene,body,owner:glbOwnerRuntime().c,history:{capture:()=>({}),checkpointSnapshot:()=>{checkpoints++;return true;}}};
 const api=installFacegroupUVWorkflow({document,host:{appendChild(){},querySelector(){return null;}},notice,getContext:()=>live?context:null,onCommit:()=>commits++,say(){},now:()=>clock,requestFrame:fn=>{frames.set(++count,fn);return count;},cancelFrame:id=>frames.delete(id)});
 async function flush(){clock+=100;const jobs=[...frames.values()];frames.clear();jobs.forEach(fn=>fn());await Promise.resolve();await Promise.resolve();}
 return {api,object,mesh,scene,body,nodes,notice,frames,flush,setLive:v=>live=v,get commits(){return commits;},get checkpoints(){return checkpoints;}};
}
test('1000 seam review highlights only boundaries without taking orbit controls; explicit confirmation yields timed unwrap and original commit callback',async()=>{
 const f=fixture(),before=JSON.stringify(f.object);assert(f.api.preview());assert.equal(JSON.stringify(f.object),before);assert.equal(f.checkpoints,0);assert.match(f.notice.textContent,/Orbit to check/);
 const overlay=f.scene.children.find(o=>o.userData.boxlabFacegroupUVSeams);assert(overlay);assert.equal(overlay.geometry.attributes.position.count,24);assert.equal(overlay.matrix.elements[12],2);assert.equal(overlay.raycast(),undefined);
 const promise=f.api.unwrap();assert.equal(f.api.busy,true);assert.match(f.nodes.get('timer').textContent,/Unwrapping/);
 for(let i=0;i<30&&f.api.busy;i++)await f.flush();assert.equal(await promise,true);assert.equal(f.commits,1);assert.equal(f.checkpoints,1);assert.match(f.notice.textContent,/checker and orange patch seams/);assert.match(f.nodes.get('timer').textContent,/Completed/);f.api.cancel();assert(!f.scene.children.includes(overlay));assert.equal(f.frames.size,0);
});
test('1000 cancellation and changed target during async unwrap never commit or leak seam geometry',async()=>{
 for(const kind of ['cancel','target']){const f=fixture();f.api.preview();const before=JSON.stringify(f.object),promise=f.api.unwrap();if(kind==='cancel')f.api.cancel();else f.setLive(false);for(let i=0;i<8;i++)await f.flush();assert.equal(await promise,false);assert.equal(f.checkpoints,0);assert.equal(f.commits,0);assert.equal(JSON.stringify(f.object),before);assert.equal(f.scene.children.filter(o=>o.userData.boxlabFacegroupUVSeams).length,0);}
});
