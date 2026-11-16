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

test('1181 grid exactly replaces translated/resized Studio floor while keeping world 0.1 / 1-unit lines',async()=>{
 const {fitViewportGrid}=await import('../src/viewport-grid.js');
 const {Mesh,PlaneGeometry,MeshBasicMaterial,Scene,Vector3,Box3}=await import('three');
 const scene=new Scene(),floor=new Mesh(new PlaneGeometry(1,1),new MeshBasicMaterial()),grid=createViewportGrid();floor.rotation.x=-Math.PI/2;floor.position.set(2.35,-.525,-1.27);floor.scale.set(24,24,1);scene.add(floor,grid);
 fitViewportGrid(grid,floor);scene.updateMatrixWorld(true);
 const box=new Box3().setFromObject(grid),floorBox=new Box3().setFromObject(floor);
 for(const key of ['x','y','z']){assert(Math.abs(box.min[key]-floorBox.min[key])<1e-5);assert(Math.abs(box.max[key]-floorBox.max[key])<1e-5);}
 assert(grid.position.equals(floor.position));assert.equal(grid.scale.x,1);const before=grid.geometry;fitViewportGrid(grid,floor);assert.equal(grid.geometry,before,'navigation/repeated sync never rebuilds unchanged footprint');
 const p=grid.geometry.getAttribute('position');for(let i=0;i<p.count;i+=2){const a=new Vector3().fromBufferAttribute(p,i).add(grid.position),b=new Vector3().fromBufferAttribute(p,i+1).add(grid.position),fixed=Math.abs(a.x-b.x)<1e-5?a.x:a.z;assert(Math.abs(fixed*10-Math.round(fixed*10))<1e-4);}
 floor.scale.set(40,30,1);floor.position.y=-3.025;fitViewportGrid(grid,floor);assert.notEqual(grid.geometry,before);assert.equal(grid.position.y,-3.025);const size=grid.geometry.boundingBox.getSize(new Vector3());assert.equal(size.x,40);assert.equal(size.z,30);
 grid.geometry.dispose();grid.material.dispose();floor.geometry.dispose();floor.material.dispose();
});
