import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {subdivide,subdivideWithCornerUVs,MAX_CORNER_UV_SUBDIVISION_FACES,MAX_CORNER_UV_SUBDIVISION_CORNERS} from '../src/subdivision.js';

const meshData=mesh=>({vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces,creases:[...mesh.creases],groups:mesh.faceGroups});
const average=uvs=>[uvs.reduce((n,uv)=>n+uv[0],0)/uvs.length,uvs.reduce((n,uv)=>n+uv[1],0)/uvs.length];
function quadGrid(side){
 const vertices=[],faces=[],uvCorners=[];
 for(let y=0;y<=side;y++)for(let x=0;x<=side;x++)vertices.push([x,y,0]);
 for(let y=0;y<side;y++)for(let x=0;x<side;x++){
  const a=y*(side+1)+x;faces.push([a,a+1,a+side+2,a+side+1]);
  uvCorners.push([[x/side,y/side],[(x+1)/side,y/side],[(x+1)/side,(y+1)/side],[x/side,(y+1)/side]]);
 }
 return {mesh:new EditableMesh(vertices,faces),uvCorners};
}

test('.1037 one quad produces UV child corners in the exact Catmull–Clark face order',()=>{
 const mesh=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]]);
 const uv=[[[0,0],[2,0],[2,4],[0,4]]],before=structuredClone(uv);
 const out=subdivideWithCornerUVs(mesh,uv,1),center=average(uv[0]);
 const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
 const expected=uv[0].map((point,i)=>[
  [point[0]*.75+(uv[0][(i+3)%4][0]+uv[0][(i+1)%4][0])*.125,point[1]*.75+(uv[0][(i+3)%4][1]+uv[0][(i+1)%4][1])*.125],
  mid(point,uv[0][(i+1)%4]),
  center,
  mid(uv[0][(i+3)%4],point)
 ]);
 assert.deepEqual(out.cornerUVs,expected);
 assert.equal(out.cornerUVs.length,out.mesh.faces.length);
 assert.deepEqual(meshData(out.mesh),meshData(subdivide(mesh,1)));
 assert.deepEqual(uv,before,'input UVs stay unchanged');
});

test('.1037 adjacent faces keep independent UVs across a shared geometry seam',()=>{
 const mesh=new EditableMesh([[0,0,0],[1,0,0],[2,0,0],[0,1,0],[1,1,0],[2,1,0]],[[0,1,4,3],[1,2,5,4]]);
 const uv=[[[0,0],[1,0],[1,1],[0,1]],[[2,0],[3,0],[3,1],[2,1]]];
 const out=subdivideWithCornerUVs(mesh,uv,1);
 const leftSharedMid=out.cornerUVs[1][1],rightSharedMid=out.cornerUVs[7][1];
 assert.deepEqual(leftSharedMid,[1,.5]);
 assert.deepEqual(rightSharedMid,[2,.5]);
 assert.notDeepEqual(leftSharedMid,rightSharedMid,'shared position does not merge separate UV charts');
});

test('.1037 multi-level UV payload stays face/corner aligned and geometry-only SubD output remains exact',()=>{
 const {mesh,uvCorners}=quadGrid(2),original=meshData(mesh),originalUV=structuredClone(uvCorners);
 mesh.setEdgeCrease(0,.5);mesh.faceGroups[0]='front';
 const base=meshData(mesh),out=subdivideWithCornerUVs(mesh,uvCorners,3);
 assert.deepEqual(meshData(out.mesh),meshData(subdivide(mesh,3)));
 assert.equal(out.cornerUVs.length,out.mesh.faces.length);
 assert(out.mesh.faces.every((face,index)=>face.length===out.cornerUVs[index].length&&face.length===4));
 assert(out.cornerUVs.flat(2).every(Number.isFinite));
 assert(out.mesh.faceGroups.includes('front'));
 assert(out.mesh.creases.size>0);
 assert.deepEqual(meshData(mesh),base,'source geometry and metadata stay unchanged');
 assert.deepEqual(uvCorners,originalUV,'source UVs stay unchanged');
 assert.equal(original.faces.length,4);
});

test('.1037 bounded levels and topology limits refuse unsafe or malformed UV payloads before subdivision',()=>{
 const {mesh,uvCorners}=quadGrid(1);
 for(const level of [-1,1.5,5])assert.throws(()=>subdivideWithCornerUVs(mesh,uvCorners,level),/level/);
 for(const invalid of [null,[],[null],[[[0,0],[1,0]]],[[[0,0],[1,0],[1,1],[NaN,1]]]])
  assert.throws(()=>subdivideWithCornerUVs(mesh,invalid,1),/UV/);
 assert.equal(MAX_CORNER_UV_SUBDIVISION_FACES,16384);
 assert.equal(MAX_CORNER_UV_SUBDIVISION_CORNERS,80000);
 const tooManyFaces=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],Array.from({length:4097},()=>[0,1,2,3]));
 const tooManyUVs=Array.from({length:4097},()=>[[0,0],[1,0],[1,1],[0,1]]);
 assert.throws(()=>subdivideWithCornerUVs(tooManyFaces,tooManyUVs,1),/16384-face/);
});

test('.1037 largest reported iPad case stays within face and corner preview ceilings',()=>{
 const {mesh,uvCorners}=quadGrid(16),out=subdivideWithCornerUVs(mesh,uvCorners,3);
 assert.equal(out.mesh.faces.length,16384);
 assert.equal(out.mesh.vertices.length,16641);
 assert.equal(out.cornerUVs.reduce((n,face)=>n+face.length,0),65536);
 assert(out.mesh.faces.length<=MAX_CORNER_UV_SUBDIVISION_FACES);
});
