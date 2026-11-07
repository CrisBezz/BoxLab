import test from 'node:test';
import assert from 'node:assert/strict';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';

function mesh(vertices,faces,creases=new Map(),faceGroups=[]){
 return {vertices:vertices.map(([x,y,z])=>({x,y,z})),faces:faces.map(f=>[...f]),creases:new Map(creases),faceGroups:[...faceGroups],looseEdges:new Set(['0:1']),looseVertices:new Set()};
}
test('825 versioned basic scene round trip retains topology and metadata without mutating source',()=>{
 const original={activeId:8,selected:[8],multi:false,groups:{names:[[5,'Group A']],collapsed:[5]},objects:[
  {id:8,name:'Quadball',visible:true,locked:false,kind:'editable',groupId:5,settings:{subd:true,subdLevel:2},curveProfile:{version:1,balloonPolePatch:'grid'},mesh:mesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3]],new Map([['0:1',0.25]]),['surface'])},
  {id:9,name:'Linked',visible:false,kind:'editable',sourceId:8,booleanRecipe:{version:1},mesh:mesh([[0,0,0],[1,0,0],[0,1,0]],[[0,1,2]])}
 ]};
 const encoded=encodeBoxlabScene(original);
 const parsed=JSON.parse(JSON.stringify(encoded));
 const recovered=decodeBoxlabScene(parsed,mesh);
 assert.deepEqual(encodeBoxlabScene(recovered),encoded);
 assert.equal(encoded.objects[0].mesh.creases[0][1],0.25);
 assert.equal(encoded.objects[0].curveProfile.balloonPolePatch,'grid');
 assert.equal(encoded.objects[1].sourceId,8);
 assert.equal(original.objects[0].mesh.vertices[0].x,0);
});
test('825 invalid resources and geometry refuse silently lossy project format',()=>{
 const scene={objects:[{id:1,mesh:mesh([[0,0,0],[1,0,0],[0,1,0]],[[0,1,2]])}]};
 assert.throws(()=>encodeBoxlabScene({...scene,objects:[{...scene.objects[0],textures:[{}]}]}),/Unsupported/);
 assert.throws(()=>encodeBoxlabScene({...scene,objects:[{...scene.objects[0],mesh:mesh([[NaN,0,0]],[[0,1,2]])}]}),/Non-finite/);
 assert.throws(()=>decodeBoxlabScene({format:'boxlab',version:999,objects:[]},mesh),/Unsupported/);
});
