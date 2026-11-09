import test from 'node:test';
import assert from 'node:assert/strict';
import {createPaintAdjustments} from '../src/paint-adjustments.js';
import {filterPaintPixels} from '../evaluations/uv-paint/paint-core.js';
import {createPaintAdjustmentUI} from '../src/paint-adjustments-ui.js';
const size=16;
function fixture(){const pixels=new Uint8Array(size*size*4),domains=new Int32Array(size*size);for(let y=0;y<size;y++)for(let x=0;x<size;x++)pixels.set([100,100,100,255],(y*size+x)*4);pixels.set([101,101,101,255],(8*size+8)*4);return {pixels,size,filter:()=>({domains})};}
test('1123 Sharpen alone retains sub-byte detail until final output; old rounded blur reproduces disabled Apply',()=>{
 const source=fixture(),rounded=filterPaintPixels(source.pixels,size,source.filter(),{amount:1});assert.deepEqual(rounded,source.pixels);
 const engine=createPaintAdjustments(source),result=engine.render({sharpness:100});assert.notDeepEqual(result,source.pixels);assert.equal(result[(8*size+8)*4],102);assert.equal(result[(8*size+9)*4],100);
 for(let i=3;i<result.length;i+=4)assert.equal(result[i],source.pixels[i]);assert.deepEqual(engine.render(),source.pixels);assert.deepEqual(engine.render({sharpness:100}),result);
 const precise=filterPaintPixels(source.pixels,size,source.filter(),{amount:1,precise:true});assert(precise instanceof Float64Array);assert.equal(precise[(8*size+8)*4],100.5);
});
class Node{
 constructor(tag){this.tag=tag;this.children=[];this.listeners={};this.style={};this.value=0;this.checked=false;this.disabled=false;}
 append(...nodes){for(const n of nodes){this.children.push(n);n.parent=this;}}
 setAttribute(k,v){this[k]=v;}
 addEventListener(k,fn){this.listeners[k]=fn;}
 showModal(){this.open=true;}close(){this.open=false;}remove(){this.removed=true;}
 get nextElementSibling(){return this.parent.children[this.parent.children.indexOf(this)+1];}
 fire(k){return this.listeners[k]?.({preventDefault(){}});}
}
function walk(n){return [n,...n.children.flatMap(walk)];}
test('1123 actual adjustment dialog arms Apply for Sharpen alone, preserves Before/Reset and applies once',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const original=fixture(),body=new Node('body'),button=new Node('button');let candidate=null,commits=0,cancels=0;
 const source={...original,name:'Detail layer',preview(p){candidate=p.some((v,i)=>v!==original.pixels[i])?p:null;return !!candidate;},apply(){if(!candidate)return false;commits++;return true;},cancel(){candidate=null;cancels++;}};
 const ui=createPaintAdjustmentUI({document:{body,createElement:tag=>new Node(tag),createTextNode:text=>({children:[],textContent:text})},button,painter:()=>({beginAdjustment:()=>source})});
 button.fire('click');const nodes=walk(body),slider=nodes.find(n=>n['aria-label']==='Sharpness'),apply=nodes.find(n=>n.textContent==='Apply'),reset=nodes.find(n=>n.textContent==='Reset'),before=nodes.find(n=>n.type==='checkbox');assert(apply.disabled);
 slider.value=100;slider.fire('input');assert(apply.disabled);t.mock.timers.tick(160);assert.equal(apply.disabled,false);assert(candidate);assert.equal(commits,0);
 before.checked=true;before.fire('change');assert(apply.disabled);before.checked=false;before.fire('change');assert.equal(apply.disabled,false);
 reset.fire('click');assert(apply.disabled);assert.equal(slider.value,0);assert.equal(candidate,null);
 slider.value=100;slider.fire('input');t.mock.timers.tick(160);assert.equal(apply.disabled,false);apply.fire('click');assert.equal(commits,1);assert.equal(cancels,1);ui.cancel();
});

test('1123 real selected-layer Sharpen-only preview applies with one Undo step and restores pixels on Undo/Redo',async()=>{
 const {viewportPaintRuntime}=await import('./helpers/viewport-paint-runtime.mjs');const r=viewportPaintRuntime();await r.painter.open();
 const seed=r.painter.beginAdjustment(),pixels=seed.pixels.slice(),{domains,neighbours}=seed.filter();for(let i=0;i<pixels.length;i+=4)pixels.set([100,100,100,255],i);
 const at=domains.findIndex((d,i)=>d>=0&&neighbours.slice(i*4,i*4+4).every(n=>n>=0));assert(at>=0);pixels.set([101,101,101,255],at*4);assert(seed.preview(pixels));assert(seed.apply());
 const old=r.target().colourPaint,n=r.h.undoStack.length,source=r.painter.beginAdjustment(),result=createPaintAdjustments(source).render({sharpness:100});assert.notDeepEqual(result,source.pixels);assert(source.preview(result));assert.equal(r.h.undoStack.length,n);assert(source.apply());assert.equal(r.h.undoStack.length,n+1);const next=r.target().colourPaint;
 r.painter.close();r.h.undo(r.c.__boxlabBridgeState.mesh);assert.deepEqual(r.target().colourPaint,old);r.h.redo(r.c.__boxlabBridgeState.mesh);assert.deepEqual(r.target().colourPaint,next);
});
