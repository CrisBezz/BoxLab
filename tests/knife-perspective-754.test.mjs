import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from './helpers/modelling-combinations-runtime.mjs';
import {knifeScreenRuntime} from './helpers/knife-screen-runtime.mjs';
const shape=()=>new EditableMesh([[-2,-1,0],[2,-1,3],[2,1,3],[-2,1,0]].map(v=>new THREE.Vector3(...v)),[[0,1,2,3]],null,['Panel']);
function camera(kind='perspective'){
 const c=kind==='perspective'?new THREE.PerspectiveCamera(45,1,.1,100):new THREE.OrthographicCamera(-4,4,4,-4,.1,100);c.position.set(0,0,8);c.updateMatrixWorld();return c;
}
function matches(f,s,p){assert.equal(s.snapType,'EDGE');assert.ok(s.point3.distanceTo(p.world)<1e-9,`world miss ${s.point3.distanceTo(p.world)}`);const q=f.screen(s.point3);assert.ok(Math.hypot(q.x-p.x,q.y-p.y)<1e-7);}
const snap=m=>({v:m.vertices.map(v=>v.toArray()),f:Array.from(m.faces,f=>Array.from(f)),g:Array.from(m.faceGroups),c:[...m.creases],le:[...m.looseEdges||[]],lv:[...m.looseVertices||[]]});
for(const kind of ['perspective','orthographic'])for(const t of [.2,.3,.7,.8])test(`${kind} Knife EDGE projects to the Pencil position at world fraction ${t}`,()=>{
 const m=shape(),f=knifeScreenRuntime(m,camera(kind)),p=f.point(0,1,t),s=f.boundary(0,p,false);matches(f,s,p);assert.ok(Math.abs(s.t-t)<1e-10);const reverse=f.point(2,3,t);matches(f,f.boundary(0,reverse,false),reverse);
});
for(const scale of [.01,1,100])test(`perspective EDGE stays accurate under camera/model rotation, translation and scale ${scale}`,()=>{
 const m=shape(),c=camera(),axis=new THREE.Vector3(1,2,3).normalize(),shift=new THREE.Vector3(100,200,-300);m.vertices.forEach(v=>v.applyAxisAngle(axis,.7).multiplyScalar(scale).add(shift));c.position.applyAxisAngle(axis,.7).multiplyScalar(scale).add(shift);c.up.applyAxisAngle(axis,.7);c.lookAt(shift);c.near=.001*scale;c.far=100*scale;c.updateProjectionMatrix();c.updateMatrixWorld();const f=knifeScreenRuntime(m,c,{width:1200,height:800});for(const t of [.25,.6]){const p=f.point(0,1,t);matches(f,f.boundary(0,p,false),p);}
});
test('existing END / true world MID / PERP priority remains intact',()=>{
 const m=shape(),f=knifeScreenRuntime(m,camera(),{inference:true}),end=f.point(0,1,0),mid=f.point(0,1,.5);assert.equal(f.boundary(0,end).snapType,'END');const s=f.boundary(0,mid);assert.equal(s.snapType,'MID');assert.equal(s.t,.5);assert.ok(s.point3.equals(mid.world));const start=f.boundary(0,f.point(0,1,.3),false),opposite=f.point(2,3,.7),perp=f.endpoint(0,start,opposite);assert.equal(perp.snapType,'PERP');assert.ok(perp.point3.distanceTo(opposite.world)<1e-10);
});
// Offset into the face perpendicular to its projected boundary, retaining the
// intended closest point while ensuring the actual face ray hit starts the owner.
function insidePixel(f,m,fi,a,b,t){const p=f.point(a,b,t),A=f.screen(m.vertices[a]),B=f.screen(m.vertices[b]),center=f.screen(m.faces[fi].reduce((sum,i)=>sum.add(m.vertices[i]),new THREE.Vector3()).multiplyScalar(1/m.faces[fi].length));const n=new THREE.Vector2(-(B.y-A.y),B.x-A.x).normalize();if(n.dot(new THREE.Vector2(center.x-p.x,center.y-p.y))<0)n.negate();return {...p,x:p.x+n.x*2,y:p.y+n.y*2};}
test('actual Pencil EDGE → EDGE cut follows markers, preserves groups/creases and exact Undo/Redo',()=>{
 const m=shape(),f=knifeScreenRuntime(m,camera()),before=snap(m);m.creases.set('0:1',.7);before.c=[...m.creases];const a=insidePixel(f,m,0,0,1,.3),b=insidePixel(f,m,0,2,3,.6);f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);assert.equal(f.ctx.__boxlabHistory.undoStack.length,1,f.node('#selectionStatus').textContent);assert.ok(m.vertices.some(v=>v.distanceTo(a.world)<1e-8));assert.ok(m.vertices.some(v=>v.distanceTo(b.world)<1e-8));assert.deepEqual(m.faceGroups,['Panel','Panel']);assert.equal([...m.creases.values()].filter(v=>v===.7).length,2);const after=snap(m),undo=f.ctx.__boxlabHistory.undo(m);assert.deepEqual(snap(undo),before);assert.deepEqual(snap(f.ctx.__boxlabHistory.redo(undo)),after);
});
for(const segments of [1,3])test(`Bevel ${segments} → real perspective Pencil Knife → Loop retains projected cut and closed shell`,()=>{
 const m=EditableMesh.cube();m.faceGroups.fill('Shell');assert.ok(m.generalBevelSelection([0],.2,segments));const c=camera();c.position.set(4,3,6);c.lookAt(0,0,0);c.updateMatrixWorld();const f=knifeScreenRuntime(m,c);let committed=false;
 for(let fi=0;fi<m.faces.length&&!committed;fi++){
  const face=m.faces[fi];if(face.length<4)continue;const before=snap(m),a=insidePixel(f,m,fi,face[0],face[1],.3),b=insidePixel(f,m,fi,face[2],face[3],.65);f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointerup',b);
  if(!f.ctx.__boxlabHistory.undoStack.length){assert.deepEqual(snap(m),before);if(f.ctx.__boxlabKnifeTool.armed())f.ctx.__boxlabKnifeTool.disarm();continue;}
  assert.ok(m.vertices.some(v=>v.distanceTo(a.world)<1e-8));assert.ok(m.vertices.some(v=>v.distanceTo(b.world)<1e-8));committed=true;
 }
 assert.ok(committed,'a visible planar bevel face must accept a real Knife cut');for(const e of m.edges())assert.equal(e.faces.length,2);assert.equal(m.faceGroups.length,m.faces.length);let loops=0;for(let seed=0;seed<m.edges().length;seed++){const trial=m.clone(),r=trial.loopCut(seed,.4);if(!r)continue;loops++;for(const e of trial.edges())assert.equal(e.faces.length,2);assert.equal(trial.faceGroups.length,trial.faces.length);}assert.ok(loops);
});
test('actual perspective Knife Cancel and short tap retain source and redo',()=>{
 const m=shape(),f=knifeScreenRuntime(m,camera()),before=snap(m);f.ctx.__boxlabHistory.redoStack.push(m.clone());const a=insidePixel(f,m,0,0,1,.3),b=insidePixel(f,m,0,2,3,.6);f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointercancel',b);assert.deepEqual(snap(m),before);f.pointer('pointerdown',a);f.pointer('pointerup',a);assert.deepEqual(snap(m),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);
});
