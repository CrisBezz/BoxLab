import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {captureColourResource} from '../src/paint-resource.js';
import {captureRoughnessResource} from '../src/roughness-resource.js';
import {captureMetalnessResource} from '../src/metalness-resource.js';
import {EditableMesh} from '../src/mesh.js';
import {createFaceAtlasUV} from '../src/imported-uv-edit.js';
import {createPaintFilterDomain} from '../src/paint-filter-domain.js';
const p={x:450,y:300,width:900,height:600,pressure:1},settings={colour:'#10aa44',radius:20,hardness:1,opacity:1,pressure:false,blurAmount:2};
async function patterned(){
 const r=runtime();await r.painter.open();r.painter.begin(p,settings,'boxlab',0,0,255,'fill');r.painter.finish();r.painter.close();
 const binding=r.target().colourPaint.binding,colour=new Uint8Array(512*512*4),rough=new Uint8Array(512*512),metal=new Uint8Array(rough.length);
 for(let i=0;i<rough.length;i++){const n=(i%512)%32<16?220:30;colour.set([n,30,255-n,255],i*4);rough[i]=n;metal[i]=255-n;}
 r.target().colourPaint=captureColourResource({width:512,height:512,binding,pixels:colour});r.target().roughnessPaint=captureRoughnessResource({width:512,height:512,binding,pixels:rough});r.target().metalnessPaint=captureMetalnessResource({width:512,height:512,binding,pixels:metal});await r.painter.open();return r;
}
function stroke(r,action){assert(r.painter.begin(p,settings,'boxlab',0,64,180,action));if(action!=='fill')for(const x of [460,470,480])r.painter.move({...p,x});return r.painter.finish();}
for(const action of ['fill','erase','smudge','blur'])test(`1065 ${action} produces each scalar channel's independent result in one atomic Colour transaction`,async()=>{
 const r=await patterned(),before={colour:r.target().colourPaint.pixels.slice(),roughness:r.target().roughnessPaint.pixels.slice(),metalness:r.target().metalnessPaint.pixels.slice()},history=r.h.undoStack.length;r.painter.setMultiPaintChannels(['roughness','metalness']);assert(stroke(r,action));assert.equal(r.h.undoStack.length,history+1);
 for(const channel of ['roughness','metalness']){const single=await patterned();single.painter.selectPaintTarget(channel);assert(stroke(single,action));assert.deepEqual(r.target()[channel+'Paint'].pixels,single.target()[channel+'Paint'].pixels);assert.notDeepEqual(r.target()[channel+'Paint'].pixels,before[channel]);single.painter.close();}
 const committed={roughness:r.target().roughnessPaint.pixels.slice(),metalness:r.target().metalnessPaint.pixels.slice()};r.painter.close();assert(r.h.undo(r.live));for(const channel of ['roughness','metalness'])assert.deepEqual(r.target()[channel+'Paint'].pixels,before[channel]);assert(r.h.redo(r.live));for(const channel of ['roughness','metalness'])assert.deepEqual(r.target()[channel+'Paint'].pixels,committed[channel]);assert(r.controls.enabled);
});
test('1065 cancellation and channel changes discard all working maps and leave navigation/history intact',async()=>{
 for(const action of ['fill','fill-face','erase','smudge','blur']){
  const r=await patterned(),before=[r.target().colourPaint,r.target().roughnessPaint,r.target().metalnessPaint],history=r.h.undoStack.length;r.painter.setMultiPaintChannels(['roughness','metalness']);assert(r.painter.begin(p,settings,'boxlab',0,64,180,action));r.painter.move({...p,x:452});r.painter.tick();r.painter.selectPaintTarget('roughness');
  assert.equal(r.h.undoStack.length,history);assert.deepEqual([r.target().colourPaint,r.target().roughnessPaint,r.target().metalnessPaint],before);assert(r.controls.enabled);assert(!r.painter.drawing);r.painter.close();
 }
});
function fillFixture(){let timer;const r=runtime({setTimer:fn=>{timer=fn;return 1;},clearTimer:()=>{timer=null;}}),mesh=new EditableMesh([[-1,-.5,0],[0,-.5,0],[1,-.5,0],[-1,.5,0],[0,.5,0],[1,.5,0],[1,-.5,-1],[1,.5,-1]],[[0,1,4,3],[1,2,5,4],[2,6,7,5]]);mesh.faceGroups=['A','Other','A'];r.manager.replaceActiveMesh(mesh);const o=r.target();o.glbPassthrough=null;assert(createFaceAtlasUV(o,mesh,r.owner.topologySignature,{capture:()=>({}),checkpointSnapshot:()=>true},r.owner).ok);r.body.geometry.dispose();r.body.geometry=r.owner.buildUVPreviewGeometry(mesh,o.glbPassthrough,{faceIndices:true});return {...r,labels:createPaintFilterDomain(r.body.geometry,512).labels,hold:()=>timer?.()};}
test('1065 Face/Facegroup fill and held grow/shrink use the same original region for every selected map',async()=>{
 for(const action of ['fill-face','fill-facegroup']){
  const r=fillFixture();await r.painter.open();r.painter.setMultiPaintChannels(['roughness','metalness']);const at={...p,x:400};r.painter.begin(at,settings,'boxlab',0,64,180,action);
  if(action==='fill-face'){r.hold();r.painter.move({...at,y:240});r.painter.move({...at,y:330});}
  assert(r.painter.finish());const expected=new Set(action==='fill-face'?[0]:[0,2]);
  for(let i=0;i<r.labels.length;i++){assert.equal(r.target().roughnessPaint.pixels[i],expected.has(r.labels[i])?64:255);assert.equal(r.target().metalnessPaint.pixels[i],expected.has(r.labels[i])?180:0);}
  assert(r.controls.enabled);r.painter.close();
 }
});
async function masked(value=0){const r=runtime();await r.painter.open();r.painter.addLayer();r.painter.addMask();r.painter.begin(p,settings,'boxlab',value,0,255,'fill');r.painter.finish();r.painter.selectPaintTarget('colour');r.painter.setMultiPaintChannels(['roughness','metalness']);return r;}
test('1065 shared mask clips new scalar edits with black/grey/inverted/disabled coverage and keeps raw mask unchanged',async()=>{
 for(const [value,inverted,enabled,rough,metal] of [[0,false,true,255,0],[128,false,true,127,128],[128,true,true,128,127],[0,false,false,0,255]]){
  const r=await masked(value);r.painter.editMask({inverted,enabled});const mask=r.target().colourPaint.layers.layers[0].mask.pixels.slice();r.painter.begin(p,settings,'boxlab',0,0,255,'fill');r.painter.finish();assert.equal(r.target().roughnessPaint?.pixels[100]??255,rough);assert.equal(r.target().metalnessPaint?.pixels[100]??0,metal);assert.deepEqual(r.target().colourPaint.layers.layers[0].mask.pixels,mask);
  // Stencil edits never retroactively alter already committed scalar maps.
  const kept=r.target().metalnessPaint;r.painter.editMask({inverted:!inverted});assert.equal(r.target().metalnessPaint,kept);r.painter.close();
 }
});
test('1065 scalar-only edits respect the shared mask after Done/reopen and blocked edits make no history/resource',async()=>{
 const r=await masked(0);r.painter.close();await r.painter.open();r.painter.selectPaintTarget('metalness');const history=r.h.undoStack.length;r.painter.begin(p,settings,'boxlab',0,0,255,'fill');assert.equal(r.painter.finish(),false);assert.equal(r.h.undoStack.length,history);assert.equal(r.target().metalnessPaint,undefined);
 r.painter.editMask({enabled:false});assert(r.painter.begin(p,settings,'boxlab',0,0,255,'fill'));assert(r.painter.finish());assert.equal(r.target().metalnessPaint.pixels[0],255);r.painter.close();
});
test('1065 all tool panels expose the existing channel controls; Mask is reachable from scalar targets without switching to Brush',async()=>{
 const r=runtime(),u=uiRuntime(r),n=k=>u.nodes.get('paint-'+k);await u.api.open();await n('add-layer').click();await n('add-mask').click();n('paint-target').value='colour';n('paint-target').dispatchEvent({type:'change'});
 for(const action of ['fill','erase','smudge','blur']){await n('tool-'+action).click();assert.equal(n('multi-channel-controls').parentNode,n('quick-body'));assert.equal(n('multi-channel-controls').hidden,false);assert.equal(n('paint-action').value,action);n('multi-roughness').checked=true;n('multi-roughness').dispatchEvent({type:'change'});n('multi-metalness').checked=true;n('multi-metalness').dispatchEvent({type:'change'});n('multi-opacity').checked=true;n('multi-opacity').dispatchEvent({type:'change'});assert.equal(n('multi-roughness').checked,true);assert.equal(n('multi-metalness').checked,true);assert.equal(n('multi-opacity').checked,true);assert.equal(n('opacity-controls').hidden,false);assert.equal(n('opacity-controls').parentNode,n('quick-body'));}
 // UI owns a separate painter; exercise actual selected channel + Mask controls.
 n('channel').value='metalness';n('channel').dispatchEvent({type:'change'});await n('page-mask').click();assert.equal(n('common-controls').parentNode,n('mask-channel-controls'));assert.equal(n('mask-hide').disabled,false);await n('mask-hide').click();assert.equal(n('paint-action').value,'paint');assert.equal(n('paint-target').value,'mask');assert.equal(n('multi-channel-controls').hidden,false);u.emit('pointerdown');u.emit('pointerup');assert(r.target().colourPaint.layers.layers[0].mask.pixels.some(v=>v<255));u.api.close();
});
test('1065 1024 colour strokes align scalar UV footprint with independent 512 edits and masks remain editable from scalar mode',async()=>{
 const r=runtime({newColourSize:1024});await r.painter.open();r.painter.setMultiPaintChannels(['roughness','metalness']);r.painter.begin(p,settings,'boxlab',0,64,180);r.painter.finish();
 for(const channel of ['roughness','metalness']){const single=runtime();await single.painter.open();single.painter.selectPaintTarget(channel);single.painter.begin(p,{...settings,radius:settings.radius/2},'boxlab',0,64,180);single.painter.finish();assert.deepEqual(r.target()[channel+'Paint'].pixels,single.target()[channel+'Paint'].pixels);single.painter.close();}
 r.painter.addLayer();r.painter.selectPaintTarget('roughness');const scalar=r.target().roughnessPaint;r.painter.addMask();assert.equal(r.painter.state.paintTarget,'mask');assert.equal(r.target().roughnessPaint,scalar);r.painter.close();
});
test('1065 checkpoint refusal rolls back combined Fill and filters before publishing any map',async()=>{
 for(const action of ['fill','smudge','blur']){const r=await patterned(),before=[r.target().colourPaint,r.target().roughnessPaint,r.target().metalnessPaint];r.painter.setMultiPaintChannels(['roughness','metalness']);r.c.__boxlabObjectHistory.checkpoint=()=>false;assert.throws(()=>stroke(r,action),/checkpoint/);assert.deepEqual([r.target().colourPaint,r.target().roughnessPaint,r.target().metalnessPaint],before);assert(r.controls.enabled);r.painter.close();}
});
test('1065 shared grey stencil also gates Eraser, Smudge and Blur results independently of raw layer colour',async()=>{
 for(const action of ['erase','smudge','blur']){
  const r=await patterned(),base=r.target().metalnessPaint.pixels.slice(),single=await patterned();single.painter.selectPaintTarget('metalness');stroke(single,action);const raw=single.target().metalnessPaint.pixels;
  r.painter.addLayer();r.painter.addMask();r.painter.begin(p,settings,'boxlab',128,64,180,'fill');r.painter.finish();r.painter.selectPaintTarget('colour');r.painter.setMultiPaintChannels(['metalness']);assert(stroke(r,action));const result=r.target().metalnessPaint.pixels;
  for(let i=0;i<result.length;i++)assert.equal(result[i],Math.round(base[i]+(raw[i]-base[i])*128/255));single.painter.close();r.painter.close();
 }
});
