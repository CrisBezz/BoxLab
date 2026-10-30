import assert from 'node:assert/strict';
import {parseNomadMeshes} from '../../src/nomad-import-core.js';
import {inspectPNG} from './png-inspect.mjs';
// CompressionStream's zlib output differs between Node22 and24. Compare the
// complete decoded fixture content; production source-byte round trips stay exact.
export function assertNomadFixtureEquivalent(actual,expected){
 const a=parseNomadMeshes(actual).meshes,b=parseNomadMeshes(expected).meshes;
 assert.equal(a.length,b.length);
 a.forEach((o,i)=>{
  const q=b[i];assert.equal(o.name,q.name);assert.deepEqual(o.mesh.vertices.map(v=>v.toArray()),q.mesh.vertices.map(v=>v.toArray()));assert.deepEqual(o.mesh.faces,q.mesh.faces);
  const p=o.glbPassthrough,r=q.glbPassthrough;assert.deepEqual(p.uvCorners,r.uvCorners);assert.deepEqual(p.nomadMaterial,r.nomadMaterial);assert.equal(p.images.length,r.images.length);
  p.images.forEach((image,j)=>{
   const other=r.images[j];assert.equal(image.definition.type,other.definition.type);
   assert.equal(image.data[24],other.data[24]);
   if(image.data[24]===16)assert.deepEqual(image.data,other.data,'literal retained 16-bit displacement source');
   else assert.deepEqual(inspectPNG(image.data),inspectPNG(other.data),'PNG dimensions/type/CRC/chunks/filtering/pixels');
  });
 });
}
