import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
function fixture(){
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x111318);
 const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(4,7,5);
 const baseHemisphere=new THREE.HemisphereLight(0xeaf2ff,0x1d2430,1.2);scene.add(key,baseHemisphere);
 const body=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshStandardMaterial());body.userData.kind='body';scene.add(body);
 const state={scene,key,baseHemisphere,renderer:{shadowMap:{}}};
 const c={THREE,mode:'studio',undersideLight:null,studioRig:null,studioFloor:null,studioKey:null,studioKeyTarget:null,originalBackground:null,bridge:()=>state,refreshStudio(){}};
 vm.createContext(c);
 const start=source.indexOf('function syncUndersideLight('),end=source.indexOf('\nfunction applyMode(',start);
 // Keep the real rig and mode synchronization; only defer bounds scheduling.
 const code=source.slice(start,end).replace(/function refreshStudio\(\)\{[\s\S]*?\n\}\n\nfunction syncStudio/, 'function refreshStudio(){}\n\nfunction syncStudio');
 vm.runInContext(code,c);
 return {c,state,scene,key,baseHemisphere,body,set(mode){c.mode=mode;vm.runInContext('syncStudio()',c);},fill(){return scene.getObjectByName('BoxLab Underside Fill');}};
}
test('1024 real mode owner illuminates all six Solid face directions without increasing hemisphere light or enabling shadows',()=>{
 const f=fixture();f.set('solid');const fill=f.fill();assert(fill?.isDirectionalLight);assert.equal(fill.castShadow,false);assert.equal(f.state.renderer.shadowMap.enabled,false);
 assert.equal(f.baseHemisphere.intensity,1.2);assert.equal(f.baseHemisphere.groundColor.getHex(),0x1d2430);assert.equal(f.key.intensity,3.2);
 const normals=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(v=>new THREE.Vector3(...v));
 const energy=normals.map(n=>[f.key,fill].reduce((sum,l)=>sum+Math.max(0,n.dot(l.position.clone().sub(l.target.position).normalize()))*l.intensity,0));
 assert(energy.every(v=>v>.6),energy);assert(energy[3]/energy[2]>.45,'bottom has at least 45% of top direct-light strength');
 f.body.position.set(100,-40,200);f.set('solid');assert.equal(f.fill(),fill,'translation does not create a new light');
});
test('1024 Studio fill is isolated from original key/fill/rim and all other looks restore their original lighting',()=>{
 const f=fixture(),geometry=f.body.geometry,material=f.body.material,matrix=f.body.matrix.toArray();f.set('studio');
 const fill=f.fill(),studio=f.scene.getObjectByName('BoxLab Studio Realtime');assert.equal(fill.parent,f.scene);assert.equal(fill.intensity,.95);assert.equal(fill.visible,true);
 assert.equal(studio.children.filter(o=>o.isDirectionalLight).length,3,'original polish/control light discovery is unchanged');
 assert.equal(f.baseHemisphere.intensity,.52);assert.equal(f.key.intensity,1.35);assert.equal(f.state.renderer.shadowMap.enabled,true);
 const size=f.scene.children.length;
 for(const mode of ['solid','clay','matcap','normals','wire','xray','facegroups','uvchecker','uvimage','studio']){
  f.set(mode);assert.equal(fill.visible,['solid','studio'].includes(mode),mode);assert.equal(studio.visible,mode==='studio');assert.equal(f.state.renderer.shadowMap.enabled,mode==='studio');
 }
 assert.equal(f.scene.children.length,size);assert.equal(f.body.geometry,geometry);assert.equal(f.body.material,material);assert.deepEqual(f.body.matrix.toArray(),matrix);
});
