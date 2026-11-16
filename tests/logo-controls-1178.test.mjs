import test from 'node:test';
import assert from 'node:assert/strict';
import {mountLogoControls,orbitFromLogo} from '../src/logo-viewcube.js';
test('1178 navigator moves original Extents/Floor nodes and uses original home callback and orbit owner',()=>{
 class Node{constructor(){this.children=[];this.listeners={};this.attrs={};}append(n){if(n.parentElement)n.parentElement.children=n.parentElement.children.filter(v=>v!==n);this.children.push(n);n.parentElement=this;}setAttribute(k,v){this.attrs[k]=v;}addEventListener(k,f){(this.listeners[k]||=[]).push(f);}click(){for(const f of this.listeners.click||[])f({stopPropagation(){}});}}
 const top=new Node(),host=new Node(),frame=new Node(),floor=new Node();frame.id='frameAllBtn';floor.id='floorToggleBtn';top.append(frame);top.append(floor);
 let fit=0,cycle=0,view=null;frame.addEventListener('click',()=>fit++);floor.addEventListener('click',()=>cycle++);
 const controls={orbitLocked:false,setOrbitLocked(v){this.orbitLocked=v;return v;}};
 const doc={createElement:()=>new Node(),querySelector:q=>q==='#frameAllBtn'?frame:floor};
 const ui=mountLogoControls(host,v=>view=v,doc,()=>({controls}));
 assert.equal(top.children.length,0);assert.equal(ui.frame,frame);assert.equal(ui.floor,floor);assert.equal(host.children.length,4);
 frame.click();floor.click();ui.home.click();assert.equal(fit,1);assert.equal(cycle,1);assert.equal(view,'axon');
 ui.lock.click();assert(controls.orbitLocked);assert.equal(ui.lock.attrs['aria-pressed'],'true');ui.lock.click();assert(!controls.orbitLocked);
 assert.equal(orbitFromLogo({camera:{},controls:{enabled:true,enableRotate:true,orbitLocked:true}},10,10),false);
});
