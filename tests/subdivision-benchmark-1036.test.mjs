import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';

const page=fs.readFileSync(new URL('../docs/subdivision-benchmark-1036.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell-comparison.js',import.meta.url),'utf8');

function grid(side){
 const vertices=[],faces=[];
 for(let y=0;y<=side;y++)for(let x=0;x<=side;x++)vertices.push([(x/side), (y/side), 0]);
 for(let y=0;y<side;y++)for(let x=0;x<side;x++){
  const a=y*(side+1)+x;faces.push([a,a+1,a+side+2,a+side+1]);
 }
 return new EditableMesh(vertices,faces);
}

test('.1036 browser benchmark calls the existing subdivision owner and keeps a bounded workload',()=>{
 assert.match(page,/import \{ subdivide \} from '\.\.\/src\/subdivision\.js'/);
 assert.match(page,/const presets = \[4, 8, 16\]/);
 assert.match(page,/const maxFaces = 16384/);
 assert.match(page,/const stopMs = 1200/);
 assert.match(shell,/Open subdivision timing benchmark · \.1036/);
 assert.match(shell,/\.\/docs\/subdivision-benchmark-1036\.html/);
});

test('.1036 benchmark presets produce the expected Catmull–Clark topology without changing the cage',()=>{
 for(const side of [4,8,16])for(let level=1;level<=3;level++){
  const source=grid(side),baseFaces=source.faces.length,baseVertices=source.vertices.length;
  const result=subdivide(source,level),factor=4**level;
  assert.equal(result.faces.length,baseFaces*factor,`${side}×${side}, level ${level} face count`);
  assert.equal(result.vertices.length,(side*2**level+1)**2,`${side}×${side}, level ${level} vertex count`);
  assert.equal(source.faces.length,baseFaces,'source faces stay unchanged');
  assert.equal(source.vertices.length,baseVertices,'source vertices stay unchanged');
 }
});
