import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {subdivide,subdivideWithCornerUVs,MAX_CORNER_UV_SUBDIVISION_FACES,MAX_CORNER_UV_SUBDIVISION_CORNERS} from '../src/subdivision.js';

const page=fs.readFileSync(new URL('../docs/subdivision-uv-benchmark-1038.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell-comparison.js',import.meta.url),'utf8');
function grid(side){
 const vertices=[],faces=[],continuous=[],seamed=[];
 for(let y=0;y<=side;y++)for(let x=0;x<=side;x++)vertices.push([x/side,y/side,0]);
 for(let y=0;y<side;y++)for(let x=0;x<side;x++){
  const a=y*(side+1)+x,fi=y*side+x;faces.push([a,a+1,a+side+2,a+side+1]);
  continuous.push([[x/side,y/side],[(x+1)/side,y/side],[(x+1)/side,(y+1)/side],[x/side,(y+1)/side]]);
  const u=fi*2;seamed.push([[u,0],[u+1,0],[u+1,1],[u,1]]);
 }
 return {mesh:new EditableMesh(vertices,faces),continuous,seamed};
}
function data(mesh){return{vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces,creases:[...mesh.creases],groups:mesh.faceGroups};}

test('.1038 benchmark compares the canonical geometry-only and corner-UV owners using bounded workloads',()=>{
 assert.match(page,/subdivideWithCornerUVs/);
 assert.match(page,/const presets=\[4,8,16\]/);
 assert.match(page,/MAX_CORNER_UV_SUBDIVISION_FACES/);
 assert.match(page,/MAX_CORNER_UV_SUBDIVISION_CORNERS/);
 assert.match(page,/stopMs=1200,samples=3/);
 assert.match(page,/continuous grid/);
 assert.match(page,/separate per-face charts/);
 assert.match(shell,/Open UV subdivision timing benchmark · \.1038/);
 assert.match(shell,/\.\/docs\/subdivision-uv-benchmark-1038\.html/);
});

test('.1038 timing cases produce bounded seam-aware UVs without changing source or geometry output',()=>{
 for(const side of [4,8,16])for(let level=1;level<=3;level++){
  const {mesh,continuous,seamed}=grid(side),before=data(mesh),continuousBefore=structuredClone(continuous),seamedBefore=structuredClone(seamed);
  const geometry=subdivide(mesh,level),gridUV=subdivideWithCornerUVs(mesh,continuous,level),seamUV=subdivideWithCornerUVs(mesh,seamed,level);
  assert.deepEqual(data(gridUV.mesh),data(geometry),`${side}×${side}, level ${level}, continuous chart`);
  assert.deepEqual(data(seamUV.mesh),data(geometry),`${side}×${side}, level ${level}, per-face charts`);
  for(const result of [gridUV,seamUV]){
   assert.equal(result.mesh.faces.length,side*side*4**level);
   assert.equal(result.cornerUVs.length,result.mesh.faces.length);
   assert.equal(result.cornerUVs.reduce((n,face)=>n+face.length,0),result.mesh.faces.length*4);
   assert(result.mesh.faces.every((face,index)=>face.length===result.cornerUVs[index].length));
  }
  assert.deepEqual(data(mesh),before);
  assert.deepEqual(continuous,continuousBefore);
  assert.deepEqual(seamed,seamedBefore);
 }
 assert.equal(MAX_CORNER_UV_SUBDIVISION_FACES,16384);
 assert.equal(MAX_CORNER_UV_SUBDIVISION_CORNERS,80000);
});
