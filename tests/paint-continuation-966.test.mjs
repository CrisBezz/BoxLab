import test from 'node:test';import assert from 'node:assert/strict';
import {createPaintLayer,brushSettings} from '../evaluations/uv-paint/paint-core.js';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {gestureDebugRuntime} from './helpers/gesture-debug-runtime.mjs';
const p={x:450,y:300,width:900,height:600,pressure:1};
const brush=brushSettings({colour:'#ff0000',radius:12,hardness:1,pressure:false});
test('966 work windows renew without changing stroke pixels or rollback baseline; every window still bounded',()=>{
 const layer=createPaintLayer(32),source=layer.pixels.slice();for(let i=0;i<source.length;i+=4){source[i]=i%128<64?255:0;source[i+1]=0;source[i+2]=255-source[i];}layer.restore(source);const domains=new Int32Array(1024);layer.begin({...brush,radius:48},{filter:{domains},smudge:true});
 for(let window=0;window<3;window++){for(let i=0;i<2000;i++)layer.stamp(i%2?.4:.6,.5,1,0);assert(layer.limited);const bytes=layer.pixels.slice();layer.resetWorkBudget();assert(!layer.limited);assert.deepEqual(layer.pixels,bytes);layer.stamp(.2,.8,1,0);}
 layer.finish(true);assert.deepEqual(layer.pixels,source);layer.dispose();
});
test('966 long Smudge renews raster and path work under one contact, changes late pixels, and commits ONE undoable checkpoint',async()=>{
 const r=viewportPaintRuntime();await r.painter.open();r.painter.begin(p,brush);r.painter.finish(p);const before=r.target().colourPaint,count=r.h.undoStack.length;
 assert(r.painter.begin({...p,x:420},{...brush,radius:48},'boxlab',0,0,0,'smudge'));
 for(let i=0;i<150;i++)r.painter.move({...p,x:i%2?480:420});assert(r.painter.drawing);assert(!r.painter.state.strokeLimited);assert.equal(r.h.undoStack.length,count);assert.equal(r.target().colourPaint,before);r.painter.cancel();assert.equal(r.target().colourPaint,before);
 assert(r.painter.begin({...p,x:420},{...brush,radius:2},'boxlab',0,0,0,'smudge'));
 for(let i=0;i<1000;i++)r.painter.move({...p,x:i%2?480:420});r.painter.tick();const late=r.painter.pixels.slice();
 // A new area is still processed after >12000 original path dabs.
 r.painter.move({...p,x:450,y:330});r.painter.tick();assert.notDeepEqual(r.painter.pixels,late);assert(r.painter.drawing);assert.equal(r.h.undoStack.length,count);
 assert(r.painter.finish({...p,x:450,y:330}));assert.equal(r.h.undoStack.length,count+1);const after=r.target().colourPaint;r.painter.close();r.h.undo(r.live);assert.equal(r.target().colourPaint,before);r.h.redo(r.live);assert.equal(r.target().colourPaint,after);
});
test('966 startup probes include actual header-button centres and styles, and persist in pageshow evidence',()=>{
 const f=gestureDebugRuntime(),node={id:'objectBrowserBtn',tagName:'BUTTON',className:'',hidden:false,disabled:false,getAttribute:()=> 'false',getBoundingClientRect:()=>({x:1180,y:10,left:1180,top:10,width:40,height:40})};
 f.c.document.querySelector=q=>q==='#objectBrowserBtn'?node:null;f.c.getComputedStyle=()=>({display:'grid',visibility:'visible',pointerEvents:'auto',opacity:'1',zIndex:'auto',transform:'none',overflow:'visible',clipPath:'none',filter:'none'});f.c.document.elementsFromPoint=()=>[node];
 const row=f.api.uiSnapshot().controls.find(x=>x.selector==='#objectBrowserBtn');assert(row.present);assert.equal(row.centre.y,30);assert.equal(row.centre.stack[0].id,'objectBrowserBtn');assert.equal(row.style.pointerEvents,'auto');
 f.events.get('pageshow').fn({});const event=f.api.uiSnapshot().events.find(x=>x.kind==='pageshow');assert(event.data.controls.some(x=>x.selector==='#objectBrowserBtn'&&x.present));f.api.disable();
});
