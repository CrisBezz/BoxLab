import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {FreeOrbitControls} from '../src/free-orbit-controls.js';

function fixture({inverted=false,scroll=false,oblique=false}={}){
 const rect={left:37,top:60,width:900,height:600},offset={scrollX:scroll?40:0,scrollY:scroll?120:0};
 const dom={clientWidth:900,clientHeight:600,ownerDocument:{defaultView:offset},getBoundingClientRect:()=>rect,setPointerCapture(){},releasePointerCapture(){},addEventListener(){},removeEventListener(){}};
 const camera=new THREE.PerspectiveCamera(45,1.5,.01,100);camera.position.set(...(oblique?[4.2,3.1,4.6]:[0,0,5]));camera.up.set(0,inverted?-1:1,0);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const c=new FreeOrbitControls(camera,null);c.domElement=dom;c.enableDamping=false;c.screenSpacePanning=true;
 const start=[[350,380],[650,380]].map(([x,y])=>[x+offset.scrollX,y+offset.scrollY]);
 const event=(id,p)=>({pointerId:id,pointerType:'touch',pageX:p[0],pageY:p[1],clientX:p[0]-offset.scrollX,clientY:p[1]-offset.scrollY,button:0});
 const points=start.map(p=>[...p]);
 const world=p=>{camera.updateMatrixWorld();const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((p[0]-offset.scrollX-rect.left)/rect.width*2-1,1-(p[1]-offset.scrollY-rect.top)/rect.height*2),camera);return ray.ray.intersectPlane(new THREE.Plane().setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()),c.target),new THREE.Vector3());};
 const screen=p=>{camera.updateMatrixWorld();const v=p.clone().project(camera);return[(v.x+1)*rect.width/2+rect.left+offset.scrollX,(1-v.y)*rect.height/2+rect.top+offset.scrollY];};
 const anchors=start.map(world);
 c._onPointerDown(event(1,start[0]));c._onPointerDown(event(2,start[1]));
 const move=(id,p)=>{points[id-1]=p;c._onPointerMove(event(id,p));};
 const assertAt=(world,p)=>assert(Math.hypot(...screen(world).map((v,i)=>v-p[i]))<1e-6,JSON.stringify({actual:screen(world),expected:p}));
 return{c,camera,start,points,anchors,move,assertAt,event,screen};
}
for(const held of [0,1])for(const inverted of [false,true])test(`1011 planted finger ${held+1} is the twist pivot, inverted=${inverted}; no post-release drift`,()=>{
 const f=fixture({inverted,scroll:true}),moving=1-held,pivot=f.start[held],other=f.start[moving],dx=other[0]-pivot[0],dy=other[1]-pivot[1];
 const next=[pivot[0]-dy,pivot[1]+dx];f.move(moving+1,next);
 f.assertAt(f.anchors[held],pivot);f.assertAt(f.anchors[moving],next);
 assert(Math.abs(f.camera.position.distanceTo(f.c.target)-5)<1e-9);
 f.c._onPointerUp(f.event(1,f.points[0]));f.c._onPointerUp(f.event(2,f.points[1]));
 const position=f.camera.position.clone(),up=f.camera.up.clone(),target=f.c.target.clone();for(let i=0;i<30;i++)f.c.update();
 assert(position.distanceTo(f.camera.position)<1e-10);assert(up.distanceTo(f.camera.up)<1e-10);assert(target.distanceTo(f.c.target)<1e-10);
});
test('1011 parallel two-finger movement pans without final roll or zoom, and pinch still zooms with both contacts aligned',()=>{
 const f=fixture(),up=f.camera.up.clone();
 for(const id of [1,2])f.move(id,f.start[id-1].map((v,i)=>v+(i?20:40)));
 f.anchors.forEach((w,i)=>f.assertAt(w,f.points[i]));assert(up.distanceTo(f.camera.up)<1e-9);assert(Math.abs(f.camera.position.distanceTo(f.c.target)-5)<1e-9);
 const before=f.camera.position.distanceTo(f.c.target),middle=f.points[0].map((v,i)=>(v+f.points[1][i])/2);
 const end=f.points.map(p=>p.map((v,i)=>middle[i]+(v-middle[i])*1.5));
 f.move(1,end[0]);f.move(2,end[1]);f.anchors.forEach((w,i)=>f.assertAt(w,end[i]));
 assert(Math.abs(f.camera.position.distanceTo(f.c.target)-before/1.5)<1e-9);
});
test('1011 simultaneous pan, pinch and twist track both screen contacts through multiple moves',()=>{
 const f=fixture();
 for(const pair of [[[340,320],[670,430]],[[360,300],[700,450]],[[400,260],[730,480]]]){
  f.move(1,pair[0]);f.move(2,pair[1]);f.anchors.forEach((w,i)=>f.assertAt(w,pair[i]));
 }
 assert(Number.isFinite(f.camera.position.length()));
});
test('1011 dolly limits keep the planted contact anchored; near-coincident touches refuse safely and restart without jumps',()=>{
 const f=fixture();f.c.minDistance=f.c.maxDistance=5;
 f.move(2,[800,380]);f.assertAt(f.anchors[0],f.start[0]);assert(Math.abs(f.camera.position.distanceTo(f.c.target)-5)<1e-9);
 const g=fixture(),before=g.camera.position.clone();g.move(2,[351,380]);
 assert(g.camera.position.distanceTo(before)<1e-9);g.move(2,[350,380]);g.move(2,[650,380]);
 assert(g.camera.position.distanceTo(before)<1e-9);g.move(2,[650,410]);assert(Number.isFinite(g.camera.position.length()));
});
test('1011 native pointer release/cancel returns to one-finger free orbit and ignores movement while disabled',()=>{
 const f=fixture();f.c.enabled=false;const p=f.camera.position.clone();f.move(2,[600,450]);assert(f.camera.position.distanceTo(p)<1e-9);
 f.c.enabled=true;f.c._onPointerUp({...f.event(2,f.start[1]),type:'pointercancel'});
 f.move(1,[370,390]);assert(f.camera.position.distanceTo(p)>0);assert.equal(f.c._pointers.length,1);
 f.c._onPointerUp(f.event(1,[370,390]));assert.equal(f.c._pointers.length,0);
 const final=f.camera.position.clone();f.c.update();assert(f.camera.position.distanceTo(final)<1e-9);
});
test('1011 application default has immediate orbit, pan and wheel stop with native damping disabled',()=>{
 const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');assert.match(main,/controls\.enableDamping=false/);
 const f=fixture();f.c._rotateUp(.4);f.c._rotateLeft(.2);f.c.update();const p=f.camera.position.clone();f.c.update();assert(p.distanceTo(f.camera.position)<1e-10);
 f.c._pan(10,10);f.c.update();const target=f.c.target.clone();f.c.update();assert(target.distanceTo(f.c.target)<1e-10);
 f.c._dollyIn(.9);f.c.update();const after=f.camera.position.clone();f.c.update();assert(after.distanceTo(f.camera.position)<1e-10);
});

test('1011 combined gesture retains both anchors with the app oblique camera and non-world-aligned up vector',()=>{
 const f=fixture({oblique:true});
 f.move(2,[660,450]);f.anchors.forEach((w,i)=>f.assertAt(w,f.points[i]));
 f.move(1,[310,400]);f.anchors.forEach((w,i)=>f.assertAt(w,f.points[i]));
 f.move(2,[600,500]);f.anchors.forEach((w,i)=>f.assertAt(w,f.points[i]));
});
