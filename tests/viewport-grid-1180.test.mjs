import test from 'node:test';
import assert from 'node:assert/strict';
import {Color} from 'three';
import {createViewportGrid} from '../src/viewport-grid.js';
import fs from 'node:fs';
test('1180 original grid is hidden before first scene render and has exact 0.1 cells / 1-unit major lines',()=>{
 const grid=createViewportGrid(),positions=grid.geometry.getAttribute('position'),colours=grid.geometry.getAttribute('color');
 assert.equal(grid.type,'GridHelper');assert.equal(grid.visible,false);assert.equal(grid.position.y,-1.55);assert.equal(positions.count,484);
 const white=new Color(0xf1f4f8),pale=new Color(0x697481);
 for(let i=0;i<=120;i++){
  const coordinate=positions.getZ(i*4),expected=-6+i*.1;assert(Math.abs(coordinate-expected)<1e-6);
  const major=i%10===0,colour=major?white:pale;
  if(major)assert(Math.abs(coordinate-Math.round(coordinate))<1e-6);
  for(let j=0;j<4;j++)for(const [axis,value]of [['X',colour.r],['Y',colour.g],['Z',colour.b]])assert(Math.abs(colours['get'+axis](i*4+j)-value)<1e-6);
 }
 assert(white.r>pale.r&&white.g>pale.g&&white.b>pale.b);
 const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');assert.match(main,/const grid=createViewportGrid\(\);scene.add\(grid\)/);assert(!main.includes('new THREE.GridHelper'));
 grid.geometry.dispose();grid.material.dispose();
});
