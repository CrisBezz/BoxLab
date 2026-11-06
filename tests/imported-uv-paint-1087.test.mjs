import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {paintTargetKey,paintTargetDigest} from '../src/paint-target.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';

const clone=value=>JSON.parse(JSON.stringify(value));
function imported(r,source){
 const object=r.target(),native=object.glbPassthrough,common={version:1,source,uvTopologySignature:r.owner.topologySignature(object.mesh),uvCorners:native.uvCorners.map(face=>face.map(uv=>[...uv]))};
 object.glbPassthrough=source==='nomad'?{...common,nomadMaterial:{material_type:'opaque',factorColor:[.05,.13,.32],roughness:.4,metalness:.1,textures:{}},images:[]}:{...common,materialIndices:[0],materials:[{pbrMetallicRoughness:{baseColorFactor:[.05,.13,.32,1]}}],textures:[],images:[],vertexColorCorners:[],tangentCorners:[],morphTargets:[],originalTopology:{attributes:[{POSITION:0,NORMAL:1,TEXCOORD_0:2}]}};
 r.body.material=new THREE.MeshStandardMaterial({color:0x336699,roughness:.4,metalness:.1});
 return object;
}

for(const source of ['nomad','glb']){
 test(`1087 imported ${source.toUpperCase()} UV paint uses its base material, stroke owner and project roundtrip`,async()=>{
  const r=viewportPaintRuntime(),object=imported(r,source),key=paintTargetKey(object,object.mesh,r.owner),binding=await paintTargetDigest(key);
  await r.painter.open();
  const preview=r.painter.pixels;assert.equal(preview[0],51);assert.equal(preview[1],102);assert.equal(preview[2],153);assert.equal(preview[3],255);
  assert(r.painter.begin({x:450,y:300,width:900,height:600,pressure:1},{colour:'#ff0000',radius:12,hardness:1,opacity:1,pressure:false}));
  assert(r.painter.finish());
  assert.equal(object.colourPaint.binding,binding);assert(object.colourPaint.pixels.some((v,i)=>i%4===0&&v>100));r.painter.close();
  const encoded=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(clone(encoded),(...args)=>new EditableMesh(...args));
  const saved=loaded.objects.find(o=>o.id===object.id);assert.equal(saved.glbPassthrough.source,source);assert.deepEqual(saved.colourPaint,object.colourPaint);assert.equal(paintTargetKey(saved,saved.mesh,r.owner),key);
 });
}

test('1087 imported UV painting refuses embedded texture maps, multiple materials and out-of-tile UVs before mutation',()=>{
 const r=viewportPaintRuntime(),object=imported(r,'glb'),valid=object.glbPassthrough;
 for(const payload of [
  {...valid,images:[{definition:{mimeType:'image/png'},data:new Uint8Array([1])}]},
  {...valid,materialIndices:[0,1]},
  {...valid,uvCorners:valid.uvCorners.map((face,fi)=>fi?face:face.map(([u,v])=>[u+2,v]))}
 ]){object.glbPassthrough=payload;assert.throws(()=>paintTargetKey(object,object.mesh,r.owner),/imported single-material UV mesh with no embedded images/);}
 assert.equal(object.colourPaint,undefined);assert.equal(r.h.undoStack.length,0);
});

