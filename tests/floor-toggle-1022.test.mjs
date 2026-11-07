import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
function fixture(ready=true){
 const scene=new THREE.Scene();scene.background=new THREE.Color();
 const rig=new THREE.Group();rig.name='BoxLab Studio Realtime';scene.add(rig);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(),new THREE.MeshStandardMaterial());floor.userData.boxlabStudioFloor=true;rig.add(floor);
 const grid=new THREE.GridHelper(),axes=new THREE.AxesHelper();scene.add(grid,axes);
 const body=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshBasicMaterial());body.userData.kind='body';scene.add(body);
 const events=new Map(),frames=[],timers=[],button={dataset:{},attributes:{},listeners:[],setAttribute(k,v){this.attributes[k]=v;},addEventListener(type,fn){this.listeners.push(fn);}};
 let studio=true;
 const document={querySelector:q=>q==='#floorToggleBtn'?button:q==='#viewportRenderLooks button[data-render="studio"].active'&&studio?{}:null,addEventListener:(type,fn)=>{const list=events.get(type)||[];list.push(fn);events.set(type,list);},createElement:()=>({getContext:()=>({createRadialGradient:()=>({addColorStop(){}}),fillRect(){}})})};
 const ctx={THREE,document,__boxlabBridgeState:ready?{scene}:null,window:{addEventListener:document.addEventListener},requestAnimationFrame:fn=>frames.push(fn),setTimeout:fn=>timers.push(fn)};
 vm.createContext(ctx);vm.runInContext(read('src/ground-polish.js'),ctx);
 const api=ctx.__boxlabGroundPolish;
 return{ctx,scene,rig,floor,grid,axes,body,button,api,frames,timers,mode(next){studio=next==='studio';rig.visible=studio;for(const fn of events.get('boxlab-render-mode-change')||[])fn({detail:{mode:next}});while(frames.length)frames.shift()();},clean(enabled){ctx.__boxlabCleanView={enabled};for(const fn of events.get('boxlab-clean-view-change')||[])fn({detail:{enabled}});while(frames.length)frames.shift()();},polish(){vm.runInContext('(function(){'+read('src/studio-polish.js').replace(/^import[^\n]+\n/,'')+'})();',ctx);ctx.__boxlabStudioPolish.apply();},contact(){return rig.getObjectByName('BoxLab Studio Contact Shadow');}};
}
test('1022 actual button cycles plane/grid/off/plane, with matching icon, no extra listener or scene/history mutation',()=>{
 const f=fixture(),before=f.body.matrix.toArray(),originalCount=f.scene.children.length;
 f.api.apply();assert.equal(f.api.ground,'plane');assert.equal(f.floor.visible,true);assert.equal(f.grid.visible,false);assert.match(f.button.innerHTML,/fill="#cbd0d8"/);
 const click=()=>{let prevent=0,stop=0;f.button.listeners[0]({preventDefault(){prevent++;},stopPropagation(){stop++;}});assert.equal(prevent,1);assert.equal(stop,1);};
 click();assert.equal(f.api.ground,'grid');assert.equal(f.floor.visible,false);assert.equal(f.grid.visible,true);assert.equal(f.grid.material.opacity,.198);assert.match(f.button.innerHTML,/m6 10\.3/);assert.match(f.button.attributes['aria-label'],/Grid/);
 click();assert.equal(f.api.ground,'off');assert.equal(f.floor.visible,false);assert.equal(f.grid.visible,false);assert.doesNotMatch(f.button.innerHTML,/fill=|m6 10\.3/);
 click();assert.equal(f.api.ground,'plane');assert.equal(f.floor.visible,true);assert.equal(f.grid.visible,false);
 for(let i=0;i<5;i++)f.api.apply();assert.equal(f.button.listeners.length,1);assert.equal(f.scene.children.length,originalCount);assert.deepEqual(f.body.matrix.toArray(),before);
 assert.equal(f.api.setGround('invalid'),'plane');assert.equal(f.api.ground,'plane');
});
test('1022 choice survives render/bridge and Clean View updates, while axes retain original Clean visibility',()=>{
 const f=fixture();f.api.setGround('grid');f.clean(true);assert.equal(f.grid.visible,false);assert.equal(f.axes.visible,false);assert.equal(f.api.ground,'grid');f.clean(false);assert.equal(f.grid.visible,true);assert.equal(f.axes.visible,true);
 f.mode('solid');assert.equal(f.grid.material.opacity,.374);f.api.setGround('off');f.mode('solid');f.api.apply();assert.equal(f.floor.visible,false);assert.equal(f.grid.visible,false);f.mode('studio');assert.equal(f.floor.visible,false);assert.equal(f.grid.visible,false);
 f.api.setGround('plane');f.mode('solid');f.mode('studio');assert.equal(f.floor.visible,true);assert.equal(f.grid.visible,false);
});
test('1022 Studio contact shadow stays hidden in grid/off through original polish refresh and restores on plane',()=>{
 const f=fixture();f.polish();assert(f.contact());assert.equal(f.contact().visible,true);
 for(const mode of ['grid','off']){f.api.setGround(mode);assert.equal(f.contact().visible,false);f.ctx.__boxlabStudioPolish.apply();assert.equal(f.contact().visible,false);}
 f.api.setGround('plane');assert.equal(f.contact().visible,true);f.ctx.__boxlabStudioPolish.apply();assert.equal(f.contact().visible,true);
 f.mode('solid');assert.equal(f.contact().visible,false);
});
test('1022 early button choice applies to late original floor/grid, and newly initialized render rig reuses presentation owner',()=>{
 const f=fixture(false);f.api.cycle();assert.equal(f.api.ground,'grid');f.ctx.__boxlabBridgeState={scene:f.scene};f.api.apply();assert.equal(f.floor.visible,false);assert.equal(f.grid.visible,true);
 const source=read('src/render-modes.js'),start=source.indexOf('function syncStudio(){'),end=source.indexOf('\nfunction applyMode(',start);
 Object.assign(f.ctx,{bridge:()=>({scene:f.scene,renderer:{shadowMap:{}}}),ensureStudioRig(){},syncUndersideLight(){},studioRig:f.rig,studioFloor:f.floor,mode:'studio',refreshStudio(){},originalBackground:null});
 f.floor.visible=true;vm.runInContext(source.slice(start,end)+'\nsyncStudio();',f.ctx);assert.equal(f.floor.visible,false);assert.equal(f.grid.visible,true);
});
