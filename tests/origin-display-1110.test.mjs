import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('1110 marker frames use stored identity without invoking mesh/history synchronization',()=>{
 const source=fs.readFileSync(new URL('../src/object-origin.js',import.meta.url),'utf8');
 const fn=source.slice(source.indexOf('function updateMarker(){'),source.indexOf('function markerLoop()'));
 let selected={id:1},reads=0,currentMode='object';const mark={style:{}},camera={};
 const manager={activeObject(){reads++;return selected;},get objects(){throw Error('display must not save mesh/history');}};
 const c={ensureMarker:()=>mark,state:()=>({camera,mesh:{}}),manager:()=>manager,mode:()=>currentMode,ensureOrigin:o=>({project:()=>({x:o.id/10,y:0,z:0})}),canvas:{getBoundingClientRect:()=>({left:0,top:0,width:100,height:100})}};
 vm.createContext(c);vm.runInContext(fn,c);
 for(let i=0;i<120;i++)c.updateMarker();assert.equal(reads,120);assert.equal(mark.hidden,false);assert.equal(mark.style.left,'55.00000000000001px');
 selected={id:2};c.updateMarker();assert.equal(mark.style.left,'60px');
 currentMode='face';c.updateMarker();assert.equal(reads,121);assert.equal(mark.hidden,true);
 currentMode='object';selected=null;c.updateMarker();assert.equal(mark.hidden,true);
});
test('1110 origin selection expansion reads group metadata without geometry/history saves',()=>{
 const source=fs.readFileSync(new URL('../src/object-origin.js',import.meta.url),'utf8');
 const fn=source.slice(source.indexOf('function expandedSelectionIds(){'),source.indexOf('function groupedExpansionActive()'));
 const manager={groupMetadata:()=>[{id:1,groupId:7},{id:2,groupId:7},{id:3,groupId:null}],get objects(){throw Error('no synchronized object read');}};
 const c={baseSelectionIds:()=>new Set([1]),manager:()=>manager};vm.createContext(c);vm.runInContext(fn,c);
 for(let i=0;i<120;i++)assert.deepEqual([...c.expandedSelectionIds()],[1,2]);
});
