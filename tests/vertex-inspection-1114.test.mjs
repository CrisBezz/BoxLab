import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';import {installLooseTopology} from '../src/loose-topology.js';
import {vertexFaceIncidence} from '../src/vertex-face-incidence.js';
import {inspectors,inspectorRuntime,plain} from './helpers/vertex-inspector-runtime.mjs';
installLooseTopology(EditableMesh);
function examples(){
 const polygon=new EditableMesh([[0,0,0],[1,0,0],[2,0,0],[2,2,0],[1,1,0],[0,2,0]],[[0,1,2,3,4,5]]);
 const bowtie=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[-1,0,0],[0,-1,0]],[[0,1,2],[0,3,4]]);
 const nonmanifold=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[0,-1,0],[0,0,1]],[[0,1,2],[1,0,3],[0,1,4]]);
 const wire=polygon.clone();wire.addLooseEdge(1,4);wire.looseVertices=new Set([0]);wire.creases.set(wire.edgeKey(1,2),.8);
 const repeated=new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0]],[[0,1,2,3,0],[0,1,2]]);
 return [EditableMesh.cube(2),polygon,bowtie,nonmanifold,wire,repeated,new EditableMesh([],[])];
}
for(const [name] of inspectors){
 test(`1114 ${name}: exact inspection and selection parity across manifold, concave, split fans, wire and repeated corners`,()=>{
  for(const m of examples()){
   const a=inspectorRuntime(name,m),b=inspectorRuntime(name,m,true);
   assert.deepEqual(plain(a.api.inspect(m)),plain(b.api.inspect(m)));
   assert.deepEqual(plain(a.api.inspect(null)),plain(b.api.inspect(null)));
   const kinds=name==='vertex-valence'?['v3','v4','v5plus','poles','boundaryCorners','boundaryIrregular','regular']:name==='vertex-classification'?['boundary','interior','nonManifold']:[undefined];
   const before=m.clone();for(const kind of kinds){a.api.apply(kind);b.api.apply(kind);}
   assert.deepEqual(a.selected,b.selected);assert.equal(a.status.textContent,b.status.textContent);
   assert.deepEqual(Array.from(m.faces),Array.from(before.faces));assert.deepEqual(m.vertices,before.vertices);assert.deepEqual(m.creases,before.creases);
  }
 });
 test(`1114 ${name}: same live mesh edits, crease/loose changes and restored geometry never reuse stale incidence`,()=>{
  const m=examples()[1],before=m.clone(),a=inspectorRuntime(name,m),b=inspectorRuntime(name,m,true);
  for(let step=0;step<4;step++){
   assert.deepEqual(plain(a.api.inspect(m)),plain(b.api.inspect(m)));
   if(step===0)m.faces.push([0,2,4]);
   if(step===1){m.faces[0].splice(1,1);m.creases.set(m.edgeKey(0,2),.6);m.vertices[4].x+=.4;}
   if(step===2){m.faces=before.faces;m.vertices=before.vertices;m.creases=before.creases;}
  }
 });
 test(`1114 ${name}: pointer, model-state, mode listeners and initial scheduling stay byte-identical`,()=>{
  const a=inspectorRuntime(name,null),b=inspectorRuntime(name,null,true),marker=name==='vertex-valence'?"valence3Button.addEventListener":name==='vertex-classification'?"boundaryButton.addEventListener":"button.addEventListener";
  assert.equal(a.source.slice(a.source.indexOf(marker)),b.source.slice(b.source.indexOf(marker)));
 });
 test(`1114 ${name}: one face pass replaces vertex-times-face membership scans`,()=>{
  const m=examples()[0];let reads=0;
  for(const face of m.faces){const includes=face.includes.bind(face);face.includes=(...args)=>{reads++;return includes(...args);};}
  inspectorRuntime(name,m,true).api.inspect(m);assert.equal(reads,m.vertices.length*m.faces.length);
  reads=0;inspectorRuntime(name,m).api.inspect(m);assert.equal(reads,0);
 });
}
test('1114 incidence matches includes for each valid vertex; duplicate corners, invalid refs and non-array faces are handled without mutation',()=>{
 const m={vertices:Array(4),faces:[[0,1,1,2],null,[2,3,2],['1',-1,9,NaN,0.5]]};
 const expected=m.vertices.fill(null).map((_,v)=>m.faces.flatMap((f,fi)=>Array.isArray(f)&&f.includes(v)?[fi]:[]));
 assert.deepEqual(vertexFaceIncidence(m),expected);
 const first=vertexFaceIncidence(m);first[0].push(50);assert.deepEqual(vertexFaceIncidence(m),expected);
});
