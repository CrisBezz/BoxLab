import test from 'node:test';import assert from 'node:assert/strict';
import {captureColourResource} from '../src/paint-resource.js';
import {PAINT_BLEND_MODES,blendPaintRGB} from '../src/paint-blend-modes.js';
import {createPaintLayerStack,capturePaintLayerStack,upgradePaintLayerStack,appendPaintLayer,replacePaintLayer,flattenPaintLayerStack} from '../src/paint-layer-stack.js';
import {encodeNomadColourPNG} from '../src/nomad-scalar-png.js';import {inspectPNG} from './helpers/png-inspect.mjs';
const eps=1e-12,near=(a,b)=>assert(Math.abs(a-b)<eps,`${a} != ${b}`);
function pixels(colour=[100,150,200,255]){const p=new Uint8Array(16*16*4);for(let i=0;i<p.length;i+=4)p.set(colour,i);return p;}
function base(){return captureColourResource({width:16,height:16,binding:'a'.repeat(64),pixels:pixels()});}
function stack(){return appendPaintLayer(createPaintLayerStack(base()),{id:'paint',pixels:pixels([200,100,50,128]),opacity:.5});}
function mask(value,inverted=false,enabled=true){return {pixels:new Uint8Array(256).fill(value),inverted,enabled};}
test('903 all26 modes match fixed analytic grayscale vectors, including divide/burn/dodge endpoints',()=>{
 const expected=[.75,.25,.1875,0,0,.25,.75,.8125,1,1,.75,.375,.375,.625,.5,.75,.5,1,.5,.625,0,1/3,.25,.25,.25,.75];assert.equal(PAINT_BLEND_MODES.length,expected.length);
 PAINT_BLEND_MODES.forEach((mode,i)=>blendPaintRGB(mode,[.25,.25,.25],[.75,.75,.75]).forEach(v=>near(v,expected[i])));
 assert.deepEqual(blendPaintRGB('color-burn',[1,0,0],[0,0,1]),[1,0,0]);assert.deepEqual(blendPaintRGB('color-dodge',[0,1,1],[1,1,0]),[0,1,1]);assert.deepEqual(blendPaintRGB('divide',[0,0,1],[0,1,0]),[1,0,1]);
 for(const [mode,b,s] of [['soft-light',.1,.75],['soft-light',.5,.25],['pin-light',.8,.25],['pin-light',.2,.75],['hard-mix',.2,.6]]){const out=blendPaintRGB(mode,[b,b,b],[s,s,s]);const value=mode==='soft-light'?(b===.1?.198:.375):mode==='pin-light'?.5:0;out.forEach(v=>near(v,value));}
});
test('903 nonseparable colour modes preserve luminosity, clip gamut and choose entire darker/lighter RGB with backdrop tie',()=>{
 const lum=c=>.3*c[0]+.59*c[1]+.11*c[2],b=[.2,.4,.6],s=[.6,.4,.2];
 for(const m of ['hue','saturation','color'])near(lum(blendPaintRGB(m,b,s)),lum(b));near(lum(blendPaintRGB('luminosity',b,s)),lum(s));
 const clipped=blendPaintRGB('color',[1,0,0],[0,1,0]);near(clipped[0],0);near(clipped[1],.3/.59);near(clipped[2],0);
 assert.deepEqual(blendPaintRGB('darker-color',[1,0,0],[0,1,0]),[1,0,0]);assert.deepEqual(blendPaintRGB('lighter-color',[1,0,0],[0,1,0]),[0,1,0]);assert.deepEqual(blendPaintRGB('darker-color',b,b),b);
 assert.throws(()=>blendPaintRGB('bogus',b,s));assert.throws(()=>blendPaintRGB('normal',[NaN,0,0],s));
});
test('903 every mode is finite/bounded across endpoint and coloured vectors; alpha masks remain independent',()=>{
 const colours=[[0,0,0],[1,1,1],[1,0,0],[0,1,0],[0,0,1],[.01,.5,.99],[.9,.4,.7]];
 for(const mode of PAINT_BLEND_MODES)for(const b of colours)for(const s of colours){const before=[...b,...s],rgb=blendPaintRGB(mode,b,s);assert.equal(rgb.length,3);assert(rgb.every(v=>Number.isFinite(v)&&v>=0&&v<=1),mode);assert.deepEqual([...b,...s],before);}
});
test('903 white/black/grey masks multiply coverage with alpha and opacity, invert/disable without erasing source',async()=>{
 const s=stack(),plain=flattenPaintLayerStack(s).pixels,original=s.layers[0].pixels.slice();
 const hide=replacePaintLayer(s,'paint',{mask:mask(0)});assert.deepEqual(flattenPaintLayerStack(hide).pixels,s.base.pixels);
 assert.deepEqual(flattenPaintLayerStack(replacePaintLayer(s,'paint',{mask:mask(255)})).pixels,plain);
 assert.deepEqual(flattenPaintLayerStack(replacePaintLayer(s,'paint',{mask:mask(0,true)})).pixels,plain);
 assert.deepEqual(flattenPaintLayerStack(replacePaintLayer(s,'paint',{mask:mask(0,false,false)})).pixels,plain);
 const grey=replacePaintLayer(s,'paint',{mask:mask(128)}),output=flattenPaintLayerStack(grey),a=128/255*.5*128/255;
 const expected=[100,150,200].map((v,k)=>Math.round(v*(1-a)+[200,100,50][k]*a));assert.deepEqual([...output.pixels.slice(0,4)],[...expected,255]);assert.deepEqual(s.layers[0].pixels,original);
 const rgba=inspectPNG(await encodeNomadColourPNG(output.pixels,16,16)).rgba;assert.deepEqual(rgba,output.pixels);
});
test('903 masks are owned one-byte coverage buffers, malformed descriptors and blend typos refuse atomically',()=>{
 const s=stack(),m=mask(64),masked=replacePaintLayer(s,'paint',{mask:m}),copy=capturePaintLayerStack(masked);m.pixels.fill(0);copy.layers[0].mask.pixels.fill(0);assert.equal(masked.layers[0].mask.pixels[0],64);assert(Object.isFrozen(masked.layers[0].mask));
 for(const bad of [{...mask(1),extra:1},{...mask(1),enabled:1},{...mask(1),inverted:1},{...mask(1),pixels:new Uint8Array(255)},new Uint8Array(256),undefined])assert.throws(()=>replacePaintLayer(s,'paint',{mask:bad}));
 for(const mode of ['multiply ',null,1,'NORMAL'])assert.throws(()=>replacePaintLayer(s,'paint',{blendMode:mode}));assert.equal(s.layers[0].mask,null);
});
test('903 old902 stack Normal output upgrades without changing bytes; masks/modes are never silently accepted in v1',()=>{
 const b=base(),legacy={version:1,base:b,layers:[{id:'old',name:'old',visible:true,opacity:.4,pixels:pixels([1,2,3,128])}]},old=capturePaintLayerStack(legacy),next=upgradePaintLayerStack(old);
 assert.equal(next.version,2);assert.equal(next.layers[0].blendMode,'normal');assert.equal(next.layers[0].mask,null);assert.deepEqual(flattenPaintLayerStack(old).pixels,flattenPaintLayerStack(next).pixels);
 assert.throws(()=>capturePaintLayerStack({...legacy,layers:[{...legacy.layers[0],mask:null}]}));assert.throws(()=>capturePaintLayerStack({...next,version:3}));
 const changed=replacePaintLayer(old,'old',{blendMode:'multiply',mask:mask(80)});assert.equal(changed.version,2);assert.equal(old.version,1);assert(!Object.hasOwn(old.layers[0],'mask'));
});

test('903 mask coverage changes blend contribution rather than blend inputs; UV-v0-first masks retain asymmetric rows',()=>{
 const s=stack(),m=mask(255);m.pixels[0]=0;m.pixels[255]=128;
 for(const mode of ['multiply','pin-light','color']){
  const resource=flattenPaintLayerStack(replacePaintLayer(s,'paint',{blendMode:mode,mask:m}));
  assert.deepEqual([...resource.pixels.slice(0,4)],[100,150,200,255]);
  const b=[100,150,200],c=[200,100,50],rgb=blendPaintRGB(mode,b.map(v=>v/255),c.map(v=>v/255)),a=128/255*.5*128/255;
  assert.deepEqual([...resource.pixels.slice(-4)],[...b.map((v,k)=>Math.round(v*(1-a)+rgb[k]*255*a)),255]);
 }
 const hole=stack();assert.throws(()=>capturePaintLayerStack({...hole,layers:new Array(1)}));
});
