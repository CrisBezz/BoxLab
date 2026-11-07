import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createPaintSurface,paintTexture} from '../src/paint-target.js?v=0.36.18.1076';

test('1076 opacity preview renders both front and rear faces and restores front-only when opacity is cleared',()=>{
 const geometry=new THREE.BoxGeometry(1,1,1),fallback=new THREE.MeshStandardMaterial({color:0xdddddd,side:THREE.FrontSide});
 const body=new THREE.Mesh(geometry,fallback),previewGeometry=new THREE.BoxGeometry(1,1,1);
 const preview=createPaintSurface(body,previewGeometry,paintTexture(new Uint8Array([255,255,255,255]),1));
 const opacity={resource:{width:16,height:16,pixels:new Uint8Array(16*16)},rgba:false};
 preview.showMaterial(null,null,false,null,false,opacity);
 assert.equal(preview.surface.material.alphaMap!=null,true);
 assert.equal(preview.surface.material.side,THREE.DoubleSide,'transparent front faces must reveal rear-facing interior surfaces');
 assert.equal(preview.surface.material.depthWrite,false);
 preview.showMaterial(null,null,false,null,false,null);
 assert.equal(preview.surface.material.alphaMap,null);
 assert.equal(preview.surface.material.side,THREE.FrontSide,'clearing opacity restores original one-sided shading');
 assert.equal(preview.surface.material.depthWrite,true);
 preview.dispose();geometry.dispose();fallback.dispose();
});
