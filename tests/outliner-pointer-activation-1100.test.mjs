import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../src/outliner-pointer-activation.js',import.meta.url),'utf8');
function runtime(){
 let now=100,clicks=0;const listHandlers=new Map(),documentHandlers=new Map();
 const target={isConnected:true,closest:selector=>selector.includes('button')?target:null,click(){clicks++;for(const fn of documentHandlers.get('click')||[])fn({target,clientX:42,clientY:31,preventDefault(){},stopImmediatePropagation(){}});}};
 const list={contains:node=>node===target,addEventListener(type,fn){const a=listHandlers.get(type)||[];a.push(fn);listHandlers.set(type,a);}};
 const document={querySelector:()=>list,addEventListener(type,fn){const a=documentHandlers.get(type)||[];a.push(fn);documentHandlers.set(type,a);}};
 const context={document,performance:{now:()=>now},globalThis:null};context.globalThis=context;vm.createContext(context);vm.runInContext(source,context);
 const fire=(type,extra={})=>{const e={pointerType:'pen',pointerId:1,button:0,target,clientX:42,clientY:31,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;},stopImmediatePropagation(){this.stopped=true;},...extra};for(const fn of listHandlers.get(type)||[])fn(e);return e;};
 return{fire,target,clicks:()=>clicks,synthetic(){let stopped=false;const e={target,clientX:42,clientY:31,preventDefault(){},stopImmediatePropagation(){stopped=true;}};for(const fn of documentHandlers.get('click')||[])fn(e);return stopped;},advance(ms){now+=ms;}};
}

test('Pencil tap activates an outliner control once and suppresses the following browser click',()=>{
 const r=runtime();r.fire('pointerdown');const up=r.fire('pointerup');assert.equal(up.prevented,true);assert.equal(r.clicks(),1);assert.equal(r.synthetic(),true);assert.equal(r.clicks(),1);
});
test('Outliner scrolling and mouse clicks keep their native behaviour',()=>{
 const r=runtime();r.fire('pointerdown');r.fire('pointermove',{clientX:42,clientY:45});r.fire('pointerup',{clientX:42,clientY:45});assert.equal(r.clicks(),0);
 r.fire('pointerdown',{pointerType:'mouse'});r.fire('pointerup',{pointerType:'mouse'});assert.equal(r.clicks(),0);
 r.advance(600);assert.equal(r.synthetic(),false);
});
