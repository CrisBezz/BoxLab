import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {createPaintFilterDomain} from '../src/paint-filter-domain.js';
import {createPaintLayer,brushSettings} from '../evaluations/uv-paint/paint-core.js';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {EditableMesh} from '../src/mesh.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {readNomadProject} from '../src/nomad-export-core.js';
import {inspectPNG} from './helpers/png-inspect.mjs';
const brush=brushSettings({colour:'#000000',hardness:1,pressure:false,radius:20});
const p={x:450,y:300,width:900,height:600,pressure:1};
function geometry(uv,faces){const g=new THREE.BufferGeometry();g.setAttribute('uv',new THREE.Float32BufferAttribute(uv.flat(),2));g.setAttribute('position',new THREE.Float32BufferAttribute(uv.flatMap(([x,y])=>[x,y,0]),3));g.userData.boxlabTriangleFaces=faces;return g;}
function adjacent(){return geometry([[0,0],[.5,0],[.5,1],[0,0],[.5,1],[0,1],[.5,0],[1,0],[1,1],[.5,0],[1,1],[.5,1]],[0,0,1,1]);}
const node=(u,k)=>u.nodes.get('paint-'+k),change=(u,k,v)=>{node(u,k).value=v;for(const f of node(u,k).listeners.get('change')||[])f({});};

test('931 original geometry owner supplies opt-in triangle face IDs in actual grouped emission order without altering ordinary geometry or source',()=>{
 const r=runtime(),o=r.target(),mesh=o.mesh;mesh.faceGroups=['A','B','A','B','A','B'];o.glbPassthrough={...o.glbPassthrough,uvTopologySignature:r.owner.topologySignature(mesh)};const before=JSON.stringify(o.glbPassthrough),native=JSON.stringify(mesh);
 const plain=r.owner.buildUVPreviewGeometry(mesh,o.glbPassthrough),mapped=r.owner.buildUVPreviewGeometry(mesh,o.glbPassthrough,{faceIndices:true});assert.equal(plain.userData.boxlabTriangleFaces,undefined);assert.deepEqual(mapped.index.array,plain.index.array);assert.deepEqual(mapped.attributes.uv.array,plain.attributes.uv.array);assert.deepEqual(mapped.attributes.position.array,plain.attributes.position.array);
 const faces=mapped.userData.boxlabTriangleFaces;assert.equal(faces.length,mapped.index.count/3);assert(Object.isFrozen(faces));
 for(let t=0;t<faces.length;t++)for(let k=0;k<3;k++){const at=mapped.index.getX(t*3+k),position=new THREE.Vector3().fromBufferAttribute(mapped.attributes.position,at),uv=[mapped.attributes.uv.getX(at),mapped.attributes.uv.getY(at)],fi=faces[t];assert(mesh.faces[fi].some((v,j)=>mesh.vertices[v].equals(position)&&o.glbPassthrough.uvCorners[fi][j].every((n,k)=>Math.fround(n)===uv[k])));}
 assert.equal(JSON.stringify(o.glbPassthrough),before);assert.equal(JSON.stringify(mesh),native);plain.dispose();mapped.dispose();
});

test('931 texel ownership separates touching faces and triangle diagonals, excludes ambiguous boundary pixels and refuses sampled overlaps/tiles/degeneracy/budget',()=>{
 const g=adjacent(),d=createPaintFilterDomain(g,16);for(let y=0;y<16;y++)for(let x=0;x<16;x++)assert.equal(d.labels[x+y*16],x<8?0:1);assert.equal(d.faceAt(0),0);assert.equal(d.faceAt(3),1);assert.equal(d.faceAt(99),null);g.dispose();
 const same=geometry([[0,0],[1,0],[1,1],[0,0],[1,1],[0,1]],[0,0]);assert(createPaintFilterDomain(same,16).labels.every(n=>n===0));same.userData.boxlabTriangleFaces=[0,1];const borders=createPaintFilterDomain(same,16);assert.equal(borders.labels[0],-2);same.dispose();
 const overlap=geometry([[0,0],[1,0],[0,1],[0,0],[1,0],[0,1]],[0,1]);assert.throws(()=>createPaintFilterDomain(overlap,16),/Overlapping/);overlap.dispose();
 for(const points of [[[0,0],[2,0],[0,1]],[[0,0],[0,0],[0,1]],[[0,0],[NaN,0],[0,1]]]){const bad=geometry(points,[0]);assert.throws(()=>createPaintFilterDomain(bad));bad.dispose();}
 const many=geometry(Array.from({length:40},()=>[[0,0],[1,0],[0,1]]).flat(),Array(40).fill(0));assert.throws(()=>createPaintFilterDomain(many,512),/complex/);many.dispose();assert.throws(()=>createPaintFilterDomain({},16),/ownership/);
});

test('931 original raster Blur uses snapshot-based capped coverage, exact raw smoothing, face-clipped read/write, alpha-premultiplied neighbours and cancellation',()=>{
 const labels=new Int32Array(16*16).fill(0),layer=createPaintLayer(16),data=layer.pixels.slice();for(let y=0;y<16;y++)for(let x=0;x<16;x++)for(let k=0;k<3;k++)data[(x+y*16)*4+k]=x<8?0:255;layer.restore(data);layer.begin(brush,{filter:{domains:labels}});layer.stamp(.5,.5,1,0);const pixels=layer.pixels.slice();assert.equal(pixels[(7+8*16)*4],32);assert.equal(pixels[(8+8*16)*4],223);layer.stamp(.5,.5,1,0);assert.deepEqual(layer.pixels,pixels);layer.finish(true);assert.deepEqual(layer.pixels,data);
 for(let y=0;y<16;y++)for(let x=8;x<16;x++)labels[x+y*16]=1;
 layer.begin(brush,{filter:{domains:labels}});labels.fill(99);assert(!layer.stamp(.5,.5,1,0));assert(!layer.finish());assert.deepEqual(layer.pixels,data);assert.throws(()=>layer.begin(brush,{filter:{domains:new Int32Array(2)}}),/domain/);layer.dispose();
 const alpha=createPaintLayer(16,{transparent:true}),rgba=alpha.pixels.slice();for(let y=0;y<16;y++)for(let x=0;x<16;x++)rgba.set(x<8?[255,0,0,255]:[0,0,255,0],(x+y*16)*4);alpha.restore(rgba);alpha.begin(brush,{filter:{domains:new Int32Array(256)}});alpha.stamp(.5,.5,1,0);assert.deepEqual([...alpha.pixels.slice((8+8*16)*4,(8+8*16)*4+4)],[255,0,0,32]);assert(alpha.finish());alpha.dispose();
});

test('931 actual UI Blur softens selected base/layer only, ignores swatch and retains original history, Save/Open and exact native PNG',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();node(u,'pressure').checked=false;node(u,'hardness').value='1';node(u,'radius').value='10';node(u,'colour').value='#000000';u.emit('pointerdown');u.emit('pointerup');const hard=r.target().colourPaint,n=r.h.undoStack.length;change(u,'paint-action','blur');assert(node(u,'colour').disabled);node(u,'radius').value='24';u.emit('pointerdown');u.emit('pointerup');const soft=r.target().colourPaint;assert.notDeepEqual(soft.pixels,hard.pixels);assert(soft.pixels.some((v,i)=>i%4!==3&&v>0&&v<255));assert.equal(r.h.undoStack.length,n+1);
 await node(u,'add-layer').click();change(u,'paint-action','paint');node(u,'colour').value='#ff0000';node(u,'radius').value='10';u.emit('pointerdown');u.emit('pointerup');const before=r.target().colourPaint;change(u,'paint-action','blur');node(u,'radius').value='24';u.emit('pointerdown');u.emit('pointerup');const after=r.target().colourPaint;assert.deepEqual(after.layers.base.pixels,before.layers.base.pixels);assert.notDeepEqual(after.layers.layers[0].pixels,before.layers.layers[0].pixels);u.api.close();assert(r.h.undo(r.c.__boxlabBridgeState.mesh));assert.deepEqual(r.target().colourPaint.pixels,before.pixels);assert(r.h.redo(r.c.__boxlabBridgeState.mesh));
 const encoded=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...args)=>new EditableMesh(...args));assert(r.manager.replaceBasicProjectScene(decoded.objects,decoded.activeId));assert.deepEqual(r.target().colourPaint.pixels,after.pixels);const out=await buildNomadProjectWithMaps([r.target()],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),nom=readNomadProject(out.bytes),m=nom.json.materials[nom.json.meshes[0].material],im=nom.json.images[m.textures.color.index];assert.deepEqual(inspectPNG(nom.bin.slice(im.offset,im.offset+im.length)).rgba,after.pixels);
});

test('931 Blur keeps scalar/mask channels independent; no-op/cancel/checkpoint and overlapping UV refusal leave resources/history/navigation intact',async()=>{
 const r=runtime();await r.painter.open();const draw=(action,value=255,radius=10)=>{assert(r.painter.begin(p,brushSettings({...brush,radius}),'boxlab',value,value,value,action));return r.painter.finish(p);};r.painter.selectPaintTarget('roughness');draw('paint',0);const rough=r.target().roughnessPaint;draw('blur',255,24);assert.notDeepEqual(r.target().roughnessPaint.pixels,rough.pixels);const kept=r.target().roughnessPaint;r.painter.selectPaintTarget('metalness');draw('paint',255);draw('blur',0,24);assert.equal(r.target().roughnessPaint,kept);r.painter.selectPaintTarget('colour');r.painter.addLayer();r.painter.addMask();draw('paint',0);const mask=r.target().colourPaint;draw('blur',255,24);assert.notDeepEqual(r.target().colourPaint.layers.layers[0].mask.pixels,mask.layers.layers[0].mask.pixels);assert.deepEqual(r.target().colourPaint.layers.layers[0].pixels,mask.layers.layers[0].pixels);const original=r.target().colourPaint,n=r.h.undoStack.length;r.painter.begin(p,brush,'boxlab',0,0,0,'blur');r.painter.cancel();assert.equal(r.target().colourPaint,original);assert.equal(r.h.undoStack.length,n);assert(r.controls.enabled);r.painter.close();
 let allow=true;const q=runtime({checkpoint:()=>allow});await q.painter.open();q.painter.begin(p,brush);q.painter.finish(p);const paint=q.target().colourPaint;allow=false;q.painter.begin(p,brushSettings({...brush,radius:32}),'boxlab',0,0,0,'blur');assert.throws(()=>q.painter.finish(p),/checkpoint/);assert.equal(q.target().colourPaint,paint);assert(q.controls.enabled);q.painter.close();
 const bad=runtime();bad.target().glbPassthrough={...bad.target().glbPassthrough,uvCorners:bad.target().mesh.faces.map(()=>[[0,0],[1,0],[1,1],[0,1]])};await bad.painter.open();const count=bad.h.undoStack.length;assert.throws(()=>bad.painter.begin(p,brush,'boxlab',0,0,0,'blur'),/Overlapping/);assert(bad.painter.active);assert(bad.controls.enabled);assert.equal(bad.h.undoStack.length,count);assert.equal(bad.target().colourPaint,undefined);bad.painter.close();
});
