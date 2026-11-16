import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {logoLighting,shadeLogoSurface} from '../src/logo-viewcube.js';
test('1173 visible viewport lights shade logo normals; hidden rigs are excluded and live intensity changes apply',()=>{
 const scene=new THREE.Scene(),rig=new THREE.Group();scene.add(rig);
 const light=new THREE.DirectionalLight('#ffffff',2);light.position.set(0,1,0);scene.add(light,light.target);
 const hidden=new THREE.DirectionalLight('#ff0000',100);rig.add(hidden);rig.visible=false;
 const lights=logoLighting(scene,'studio');assert.equal(lights.length,1);
 const surface={color:'#83dc3d',normal:new THREE.Vector3(0,1,0)},inverse=new THREE.Quaternion();
 const lit=new THREE.Color(shadeLogoSurface(surface,lights,'studio',inverse));
 const unlit=new THREE.Color(shadeLogoSurface({...surface,normal:new THREE.Vector3(0,-1,0)},lights,'studio',inverse));assert.ok(lit.g>unlit.g);assert.ok(lit.g>lit.r);
 light.intensity=0;assert.equal(logoLighting(scene,'solid').length,0);
 const hemi=new THREE.HemisphereLight('#ffffff','#101020',1);scene.add(hemi);assert.equal(logoLighting(scene,'solid').length,1);
 const down=shadeLogoSurface({...surface,normal:new THREE.Vector3(0,-1,0)},logoLighting(scene,'solid'),'solid',inverse);
 const up=shadeLogoSurface(surface,logoLighting(scene,'solid'),'solid',inverse);assert.notEqual(up,down);
});
test('1173 MatCap lighting follows view-space normals and remains independent of scene rig',()=>{
 const lights=logoLighting(new THREE.Scene(),'matcap'),surface={color:'#42a7ef',normal:new THREE.Vector3(0,0,1)};
 const a=shadeLogoSurface(surface,lights,'matcap',new THREE.Quaternion());
 const b=shadeLogoSurface(surface,lights,'matcap',new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI));assert.notEqual(a,b);
});
