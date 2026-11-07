import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {createPaintFilterDomain} from '../src/paint-filter-domain.js';
import {bakePaintAO} from '../src/paint-ao-bake.js';
const owner=glbOwnerRuntime().c;
function fixture({roof=true,scale=1,offset=0,reverse=false,rotate=false,overlap=false,count=null}={}){
 const vertices=[],faces=[],uvCorners=[],n=count??(roof?2:1);
 for(let i=0;i<n;i++){
  const id=vertices.length,z=i*.1;vertices.push(...[[0,0,z],[1,0,z],[1,1,z],[0,1,z]].map(p=>p.map(v=>v*scale+offset)));
  let f=[id,id+1,id+2,id+3],uv;
  if(count){const x=i%4/4,y=Math.floor(i/4)/4;uv=[[x+.01,y+.01],[x+.24,y+.01],[x+.24,y+.24],[x+.01,y+.24]];}
  else {const x=i&&!overlap ? .55 : .05;uv=[[x,.05],[x+.4,.05],[x+.4,.45],[x,.45]];}
  if(rotate&&i===0)uv=uv.map(([u,v])=>[.5-v,u]);
  if(reverse&&i===1){f.reverse();uv.reverse();}faces.push(f);uvCorners.push(uv);
 }
 const mesh=new EditableMesh(vertices,faces),payload={source:'boxlab',version:1,uvTopologySignature:owner.topologySignature(mesh),uvCorners};
 const geometry=owner.buildUVPreviewGeometry(mesh,payload,{faceIndices:true});
 return {geometry,mesh,payload,topologySignature:owner.topologySignature};
}
test('943 original ownership capture is opt-in and maps covered texels to original face triangles without changing brush domains',()=>{
 const f=fixture(),plain=createPaintFilterDomain(f.geometry,32),captured=createPaintFilterDomain(f.geometry,32,null,{captureTriangles:true});
 assert(!('triangleAt' in plain));assert.deepEqual(captured.labels,plain.labels);
 for(let i=0;i<captured.labels.length;i++)if(captured.labels[i]>=0)assert.equal(f.geometry.userData.boxlabTriangleFaces[captured.triangleAt[i]],captured.labels[i]);
 f.geometry.dispose();
});
test('943 unoccluded plane produces white visibility with separate coverage, deterministic owned output and no source writes',()=>{
 const f=fixture({roof:false}),before=JSON.stringify({mesh:f.mesh,payload:f.payload,geometry:f.geometry.toJSON()}),a=bakePaintAO({...f,size:32}),b=bakePaintAO({...f,size:32});
 assert(a.coverage.some(v=>v===255));assert(a.coverage.some(v=>v===0));assert(a.pixels.every(v=>v===255));assert.deepEqual(a.pixels,b.pixels);assert.deepEqual(a.coverage,b.coverage);
 a.pixels.fill(0);a.coverage.fill(0);assert(b.pixels.every(v=>v===255));assert(b.coverage.some(v=>v===255));
 assert.equal(JSON.stringify({mesh:f.mesh,payload:f.payload,geometry:f.geometry.toJSON()}),before);f.geometry.dispose();
});
test('943 same-object facing occluder darkens lower plane, radius clips distant blockers and double-sided rays preserve reversed source winding',()=>{
 for(const reverse of [false,true]){
  const f=fixture({reverse}),a=bakePaintAO({...f,size:32,samples:32}),domain=createPaintFilterDomain(f.geometry,32),near=bakePaintAO({...f,size:32,radius:.001});
  const floor=[],roof=[];for(let i=0;i<a.pixels.length;i++)if(a.coverage[i]){if(domain.labels[i]===0)floor.push(a.pixels[i]);else roof.push(a.pixels[i]);}
  assert(floor.some(v=>v<128));if(!reverse)assert(roof.every(v=>v===255));assert(near.pixels.every(v=>v===255));f.geometry.dispose();
 }
});
test('943 bake is invariant under uniform object scale/translation and rotated UV coverage retains physical occlusion',()=>{
 const f=fixture(),base=bakePaintAO({...f,size:32,samples:32});
 for(const [scale,offset]of [[.01,0],[1e8,2e8],[2,100]]){const q=fixture({scale,offset}),a=bakePaintAO({...q,size:32,samples:32});assert.deepEqual(a.pixels,base.pixels);assert.deepEqual(a.coverage,base.coverage);q.geometry.dispose();}
 const q=fixture({rotate:true}),a=bakePaintAO({...q,size:32,samples:32}),d=createPaintFilterDomain(q.geometry,32);assert([...a.pixels].some((v,i)=>d.labels[i]===0&&v<128));q.geometry.dispose();f.geometry.dispose();
});
test('943 invalid/stale/ambiguous inputs and bounded-work overflow refuse without mutating geometry, UVs or caller resources',()=>{
 const f=fixture(),before=JSON.stringify(f.mesh),payload=JSON.stringify(f.payload);
 for(const options of [{size:15},{size:129},{samples:3},{samples:65},{radius:NaN},{radius:0},{radius:3}])assert.throws(()=>bakePaintAO({...f,...options}),/AO/);
 assert.throws(()=>bakePaintAO({...f,payload:{...f.payload,uvTopologySignature:'stale'}}));
 const o=fixture({overlap:true});assert.throws(()=>bakePaintAO(o),/Overlapping/);o.geometry.dispose();
 const many=fixture({count:16});assert.throws(()=>bakePaintAO({...many,size:128,samples:64}),/too complex/);many.geometry.dispose();
 f.geometry.attributes.position.setX(0,NaN);assert.throws(()=>bakePaintAO(f),/Invalid AO/);assert.equal(JSON.stringify(f.mesh),before);assert.equal(JSON.stringify(f.payload),payload);f.geometry.dispose();
});
