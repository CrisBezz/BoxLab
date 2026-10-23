import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {facegroupsRuntime} from './helpers/facegroups-render-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {createCommittedPaintSurface,paintTargetDigest,paintTargetKey} from '../src/paint-target.js';
import {captureColourResource} from '../src/paint-resource.js';
import {createBoxUV} from '../src/imported-uv-edit.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';

const surface=body=>body.children.find(c=>c.userData.boxlabColourPaintDispose);
async function colour(o,mesh,owner,size=512){
 const pixels=new Uint8Array(size*size*4).fill(255);pixels[0]=27;pixels[1]=86;pixels[size*4+2]=131;
 o.colourPaint=captureColourResource({width:size,height:size,pixels,binding:await paintTargetDigest(paintTargetKey(o,mesh,owner))});
 return o.colourPaint;
}
function assertLit(s,resource){
 assert(s.visible);const m=s.material;assert(m.isMeshStandardMaterial);assert(m.toneMapped);
 assert.equal(m.color.getHex(),0xffffff);assert.equal(m.roughness,1);assert.equal(m.metalness,0);
 assert.equal(m.roughnessMap,null);assert.equal(m.metalnessMap,null);assert.equal(m.envMap,null);
 assert.equal(m.map.colorSpace,THREE.SRGBColorSpace);assert.equal(m.map.flipY,false);
 assert.deepEqual(m.map.image.data,resource.pixels);assert.notEqual(m.map.image.data,resource.pixels);
}

test('948 committed 512/1024 colour-only albedo uses owned lit texture, inherits body shadows and disposes once without changing saved pixels',async()=>{
 for(const size of [512,1024]){
  const r=runtime(),o=r.target(),resource=await colour(o,o.mesh,r.owner,size),before=JSON.stringify(encodeBoxlabScene({objects:[o]})),original=r.body.material,geometry=r.body.geometry;
  r.body.castShadow=r.body.receiveShadow=true;
  const d=createCommittedPaintSurface(r.body,o,o.mesh,r.owner);assert(!d.surface.visible);await d.ready;assertLit(d.surface,resource);
  assert(d.surface.castShadow);assert(d.surface.receiveShadow);assert.equal(r.body.geometry,geometry);
  const expected=r.owner.buildUVPreviewGeometry(o.mesh,o.glbPassthrough);assert.deepEqual(d.surface.geometry.getAttribute('uv').array,expected.getAttribute('uv').array);expected.dispose();
  let freed=0;for(const x of [d.surface.geometry,d.surface.material,d.surface.material.map])x.addEventListener('dispose',()=>freed++);
  d.dispose();d.dispose();assert.equal(freed,3);assert.equal(r.body.material,original);assert.equal(surface(r.body),undefined);
  assert.equal(JSON.stringify(encodeBoxlabScene({objects:[o]})),before);
 }
});

test('948 original Studio owner sets active and inactive/locked painted shadow flags before async digest; diagnostic exit and rebuild release old surfaces',async()=>{
 const f=facegroupsRuntime(),owner=glbOwnerRuntime().c,displays=[],history={capture:()=>({}),checkpointSnapshot:()=>true};
 for(const [o,mesh] of [[f.activeObject,f.source],[f.other,f.other.mesh]]){assert(createBoxUV(o,mesh,owner.topologySignature,history).ok);await colour(o,mesh,owner);}
 f.other.locked=true;
 Object.assign(f.c,{studioMaterial:new THREE.MeshStandardMaterial(),studioInactiveMaterial:new THREE.MeshStandardMaterial(),createCommittedPaintSurface:(...args)=>{const d=createCommittedPaintSurface(...args,owner);if(d)displays.push(d);return d;}});
 const inactive=new THREE.Mesh(f.other.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());inactive.userData={kind:'boxlab-inactive-body',objectId:f.other.id};f.scene.add(inactive);
 f.c.mode='studio';for(const body of [f.body,inactive]){assert(!body.castShadow);f.c.__boxlabRenderModes.apply(body);assert(body.castShadow);assert(body.receiveShadow);}
 // The harness never runs the queued Studio rig refresh: digest resolves first.
 await Promise.all(displays.map(d=>d.ready));
 for(const [body,o] of [[f.body,f.activeObject],[inactive,f.other]]){assertLit(surface(body),o.colourPaint);assert(surface(body).castShadow);assert(surface(body).receiveShadow);}
 const first=displays.slice();f.c.__boxlabRenderModes.apply(f.body);assert(first[0].disposed);await displays.at(-1).ready;assertLit(surface(f.body),f.activeObject.colourPaint);
 f.c.mode='clay';for(const body of [f.body,inactive]){f.c.__boxlabRenderModes.apply(body);assert.equal(surface(body),undefined);assert.equal(body.material,f.c.clayMaterial);}
 assert(displays.every(d=>d.disposed));inactive.geometry.dispose();
});

test('948 real Paint Channel stays unlit while editing; Done and saved/reopened colour-only pixels use the same committed lit owner without extra history',async()=>{
 const r=runtime(),ui=uiRuntime(r);await ui.api.open();assert(surface(r.body).material.isMeshBasicMaterial);
 ui.emit('pointerdown');ui.emit('pointermove',{clientX:475});ui.emit('pointerup');
 const resource=r.target().colourPaint,count=r.h.undoStack.length;assert(resource);assert(surface(r.body).material.isMeshBasicMaterial);
 const displays=[];ui.c.__boxlabRenderModes.apply=body=>{const d=createCommittedPaintSurface(body,r.target(),r.target().mesh,r.owner);if(d)displays.push(d);};
 await ui.nodes.get('paint-done').click();await Promise.all(displays.map(d=>d.ready));assert(!ui.api.active);assertLit(surface(r.body),resource);assert.equal(r.h.undoStack.length,count);
 const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(saved)),(...a)=>new EditableMesh(...a));
 const object=loaded.objects.find(o=>o.id===3);assert.equal(object.roughnessPaint,undefined);assert.equal(object.metalnessPaint,undefined);
 const body=new THREE.Mesh(r.owner.buildUVPreviewGeometry(object.mesh,object.glbPassthrough),new THREE.MeshStandardMaterial());
 const d=createCommittedPaintSurface(body,object,object.mesh,r.owner);await d.ready;assertLit(d.surface,object.colourPaint);assert.deepEqual(object.colourPaint.pixels,resource.pixels);d.dispose();
 for(const display of displays)display.dispose();body.geometry.dispose();
});

test('948 stale colour, replaced resource and disposed body never publish a late lit surface',async()=>{
 const r=runtime(),o=r.target();await colour(o,o.mesh,r.owner);
 const replacement=createCommittedPaintSurface(r.body,o,o.mesh,r.owner);o.colourPaint={...o.colourPaint,pixels:o.colourPaint.pixels.slice()};await replacement.ready;assert(replacement.disposed);
 const lost=createCommittedPaintSurface(r.body,o,o.mesh,r.owner);r.body.geometry.dispose();await lost.ready;assert(lost.disposed);
 o.colourPaint={...o.colourPaint,binding:'a'.repeat(64)};const stale=createCommittedPaintSurface(r.body,o,o.mesh,r.owner);await stale.ready;assert(stale.disposed);assert.equal(surface(r.body),undefined);
});
