import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createPaintPaletteAnchor,placePaintPalette} from '../src/paint-palette-layout.js';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
const intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
const palette=(p,w=350,h=350)=>({...p,right:p.left+w,bottom:p.top+h});
test('projected Paint palette stays beside the model and avoids right dock across pan, orbit and zoom without mutating vertices',()=>{
 const vertices=[new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,1,1)],before=vertices.map(v=>v.toArray()),anchor=createPaintPaletteAnchor(vertices),camera=new THREE.PerspectiveCamera(45,1600/900,.01,100);camera.position.z=8;camera.lookAt(0,0,0);
 const view={left:12,top:60,width:1600,height:900},dock={left:1272,right:1592,top:12,bottom:700};let prior;
 for(const [x,y,z,tx] of [[0,0,8,0],[1,0,8,1],[4,2,7,0],[0,0,5,0]]){
  camera.position.set(x,y,z);camera.lookAt(tx,0,0);const object=anchor(camera,view,view),p=placePaintPalette(object,{width:350,height:350,viewWidth:1600,viewHeight:900,obstacles:[dock]});
  assert(!intersects(palette(p),object));assert(!intersects(palette(p),dock));assert(p.left>=8&&p.top>=8&&p.left+350<=1592&&p.top+350<=892);
  if(x===1)assert(p.left<prior.left,'pan moves the palette with the object');prior=p;
 }
 assert.deepEqual(vertices.map(v=>v.toArray()),before);
 const narrow=placePaintPalette({left:10,right:590,top:0,bottom:500},{width:350,height:350,viewWidth:600,viewHeight:500});assert(narrow.left>=8&&narrow.left<=242);assert(narrow.top>=8&&narrow.top<=142);
 camera.position.z=-8;camera.lookAt(0,0,-10);assert.equal(anchor(camera,view,view),null);
});
test('actual Paint frame follows the object, retains dragged offset, and resets safely on Done/reopen',async()=>{
 const r=runtime(),u=uiRuntime(r);let width=1600;const view=()=>({left:0,top:0,width,height:900});u.nodes.get('viewport').getBoundingClientRect=view;u.nodes.get('viewportWrap').getBoundingClientRect=view;
 u.nodes.set('boxlabToolSessionHost',{hidden:false,getBoundingClientRect:()=>({left:width-328,top:12,width:320,height:650})});
 r.camera.aspect=width/900;r.camera.position.z=8;r.camera.updateProjectionMatrix();r.camera.lookAt(0,0,0);await u.api.open();
 const count=r.h.undoStack.length,anchor=createPaintPaletteAnchor(r.target().mesh.vertices),tick=()=>u.frames.shift()(),pos=()=>({...u.api.palettePosition});const original=pos();assert(!intersects(palette(original),anchor(r.camera,view(),view())));
 r.camera.position.x+=.5;r.camera.lookAt(.5,0,0);tick();let moved=pos();assert(moved.left<original.left);assert(r.controls.enabled);assert.equal(r.h.undoStack.length,count);
 const radial=u.nodes.get('viewportWrap').children.find(x=>x.id==='boxlabPaintRadial'),field={matches:()=>true};radial.contains=x=>x===field;u.c.document.activeElement=field;
 r.camera.position.x+=.1;r.camera.lookAt(.6,0,0);tick();assert.deepEqual(pos(),moved,'native material inputs stay still while editing');u.c.document.activeElement=null;tick();assert(pos().left<moved.left);moved=pos();
 const handle=u.nodes.get('paint-drag-tools');handle.listeners.get('pointerdown')[0]({button:0,pointerId:77,clientX:20,clientY:20,currentTarget:handle,preventDefault(){},stopPropagation(){}});u.emit('pointermove',{pointerId:77,clientX:40,clientY:40});u.emit('pointerup',{pointerId:77});const dragged=pos();assert.equal(dragged.left,moved.left+20);
 r.camera.position.x+=.2;r.camera.lookAt(.7,0,0);tick();assert(pos().left<dragged.left,'dragging does not detach the palette from later view motion');
 width=1200;r.camera.aspect=width/900;r.camera.updateProjectionMatrix();tick();assert(pos().left>=8&&pos().left+350<=width-8);
 u.api.close();assert(!u.api.active);assert(r.controls.enabled);assert.equal(r.h.undoStack.length,count);width=1600;r.camera.aspect=width/900;r.camera.updateProjectionMatrix();await u.api.open();assert(u.api.active);assert(!intersects(palette(pos()),anchor(r.camera,view(),view())));u.api.close();
});
