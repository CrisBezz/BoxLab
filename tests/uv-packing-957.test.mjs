import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {importedUVIslandBounds} from '../src/imported-uv-inspection.js';
const source=fs.readFileSync(new URL('../src/imported-uv-edit.js',import.meta.url),'utf8');
const c=vm.createContext({importedUVIslandBounds});vm.runInContext(source.slice(source.indexOf('function packedLayout('),source.indexOf('function editImportedUV(')),c);
test('957 variable-sized shelves improve grid coverage, preserve common density and produce separated bounded deterministic charts',()=>{
 const corners=[[0,0,4,4],[10,0,1,1],[20,0,1,1],[30,0,1,1]].map(([x,y,w,h])=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]),report={islandCount:4,faceIslands:[0,1,2,3]};
 const out=c.packedLayout(corners,report).uvCorners,b=out.map((_,i)=>importedUVIslandBounds(out,[i]));
 // Four largest-size grid cells provide only .47/4 common scale.
 const scale=(b[0].maxU-b[0].minU)/4;assert(scale>.1175*1.3);
 for(let i=0;i<4;i++){assert(Math.abs((b[i].maxU-b[i].minU)/(i?1:4)-scale)<1e-12);for(const p of out[i])assert(p.every(v=>v>=.02-1e-12&&v<=.98+1e-12));for(let j=0;j<i;j++)assert(b[i].minU>=b[j].maxU+.02-1e-12||b[j].minU>=b[i].maxU+.02-1e-12||b[i].minV>=b[j].maxV+.02-1e-12||b[j].minV>=b[i].maxV+.02-1e-12);}
 assert.equal(JSON.stringify(c.packedLayout(corners,report).uvCorners),JSON.stringify(out));assert.deepEqual(corners[0],[[0,0],[4,0],[4,4],[0,4]]);
});
test('957 identical charts retain exact accepted grid when shelves cannot improve scale',()=>{
 const uv=Array.from({length:4},()=>[[0,0],[1,0],[1,1],[0,1]]),out=c.packedLayout(uv,{islandCount:4,faceIslands:[0,1,2,3]}).uvCorners;
 assert(Math.abs(out[0][0][0]-.02)<1e-12);assert(Math.abs(out[0][1][0]-.49)<1e-12);
});
test('1247 existing islands repack to selected pixel gutters without changing chart shape or corner ownership',()=>{
 const corners=Array.from({length:6},(_,i)=>[[i*3,0],[i*3+2,0],[i*3+2,1],[i*3,1]]),report={islandCount:6,faceIslands:[0,1,2,3,4,5]};
 for(const mapSize of [1024,2048])for(const gutter of [2,4,8,16]){
  const out=c.packedLayout(corners,report,{mapSize,gutter}).uvCorners,b=out.map((_,i)=>importedUVIslandBounds(out,[i])),gap=gutter/mapSize;
  assert.equal(out.length,corners.length);
  for(let i=0;i<out.length;i++){
   assert.equal(out[i].length,4);assert(Math.abs((out[i][1][0]-out[i][0][0])/(out[i][2][1]-out[i][1][1])-2)<1e-10);
   for(const p of out[i])assert(p.every(v=>v>=.02-1e-12&&v<=.98+1e-12));
   for(let j=0;j<i;j++)assert(b[i].minU>=b[j].maxU+gap-1e-12||b[j].minU>=b[i].maxU+gap-1e-12||b[i].minV>=b[j].maxV+gap-1e-12||b[j].minV>=b[i].maxV+gap-1e-12,`${mapSize}/${gutter}: islands ${i},${j}`);
  }
  assert.equal(JSON.stringify(c.packedLayout(corners,report,{mapSize,gutter}).uvCorners),JSON.stringify(out));
 }
 assert.equal(JSON.stringify(corners[0]),JSON.stringify([[0,0],[2,0],[2,1],[0,1]]));
});
