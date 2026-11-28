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
test('1248 optional 90° rotation improves mixed island packing and preserves winding, gaps and determinism',()=>{
 const corners=[[[0,0],[4,0],[4,1],[0,1]],[[10,0],[11,0],[11,4],[10,4]]],report={islandCount:2,faceIslands:[0,1]},spacing={mapSize:1024,gutter:8};
 const plain=c.packedLayout(corners,report,spacing).uvCorners,turned=c.packedLayout(corners,report,{...spacing,rotate:true}).uvCorners;
 const area=face=>{let sum=0;for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length];sum+=a[0]*b[1]-b[0]*a[1];}return sum/2;};
 assert(area(turned[0])>area(plain[0])*1.4);assert.equal(area(corners[0]),area(corners[1]));
 assert(Math.abs(turned[0][1][0]-turned[0][0][0])<1e-12,'horizontal edge turned vertically');
 const b=turned.map((_,i)=>importedUVIslandBounds(turned,[i])),gap=8/1024;
 assert(b[0].maxU+gap<=b[1].minU+1e-12||b[1].maxU+gap<=b[0].minU+1e-12||b[0].maxV+gap<=b[1].minV+1e-12||b[1].maxV+gap<=b[0].minV+1e-12);
 for(const face of turned){assert(area(face)>0);for(const point of face)assert(point.every(v=>v>=.02-1e-12&&v<=.98+1e-12));}
 assert.equal(JSON.stringify(c.packedLayout(corners,report,{...spacing,rotate:false}).uvCorners),JSON.stringify(plain));
 assert.equal(JSON.stringify(c.packedLayout(corners,report,{...spacing,rotate:true}).uvCorners),JSON.stringify(turned));
});
