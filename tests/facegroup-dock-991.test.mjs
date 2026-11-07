import test from 'node:test';
import assert from 'node:assert/strict';
import {createFacegroupPaintDock} from '../src/facegroup-paint-dock.js';
class Node{
 constructor(){this.style={};this.children=[];this.listeners={};}
 setAttribute(k,v){this[k]=v;}
 append(...nodes){for(const n of nodes)this.appendChild(n);}
 appendChild(node){if(node.parentNode)node.parentNode.children=node.parentNode.children.filter(n=>n!==node);this.children.push(node);node.parentNode=this;}
 addEventListener(t,f){this.listeners[t]=f;}
}
test('dock reuses original control nodes, values and listeners across open/close and Done',()=>{
 const document={createElement:()=>new Node()},viewport=new Node(),home=new Node(),node=new Node();node.value='Roof';let inputEvents=0;node.addEventListener('input',()=>inputEvents++);home.appendChild(node);
 let opened=0,closed=0;const dock=createFacegroupPaintDock({document,viewport,node,home,onOpen:()=>opened++,onClose:()=>closed++});
 assert.equal(dock.visible,false);assert.equal(node.parentNode,home);
 for(let i=0;i<12;i++){assert.equal(dock.open(),true);assert.equal(node.parentNode,dock.element);assert.equal(dock.element.style.left,'8px');assert.equal(dock.element.style.transform,'none');assert.equal(node.value,'Roof');node.listeners.input();dock.close();assert.equal(node.parentNode,home);assert.equal(dock.visible,false);}
 assert.equal(opened,12);assert.equal(closed,12);assert.equal(inputEvents,12);assert.equal(viewport.children.length,1);assert.equal(home.children.length,1);
 dock.open();const done=dock.element.children[0].children[1];let prevented=0;done.listeners.click({preventDefault(){prevented++;},stopPropagation(){prevented++;}});assert.equal(dock.visible,false);assert.equal(closed,13);assert.equal(prevented,2);
});
test('dock refuses unavailable viewport and keeps original parked controls',()=>{
 const document={createElement:()=>new Node()},home=new Node(),node=new Node();home.appendChild(node);const dock=createFacegroupPaintDock({document,viewport:null,node,home});assert.equal(dock.open(),false);assert.equal(node.parentNode,home);assert.equal(dock.visible,false);
});

test('actual dock command routing keeps Paint and Erase armed and refuses another active tool',async()=>{
 const fs=await import('node:fs'),vm=await import('node:vm');const {createFacegroupStroke}=await import('../src/facegroup-stroke.js');
 const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8'),a=source.indexOf('  const controlClick=event=>{'),b=source.indexOf("  panel.addEventListener('click',controlClick)",a);
 let opened=0,active=false;const brush=createFacegroupStroke({context:()=>({})}),name={value:'Roof'},status={};
 const c={openFacegroupPaint(){if(active){status.textContent='Finish the active tool first';return false;}opened++;return true;},facegroupStroke:brush,facegroupDock:{open(){opened++;}},syncFacegroupStrokeControls(){},document:{querySelector:s=>s==='#facegroupName'?name:{removeAttribute(){}}},status,__boxlabToolSession:{isActive:()=>active}};vm.createContext(c);vm.runInContext(source.slice(a,b)+'\nglobalThis.click=controlClick;',c);
 const click=id=>c.click({target:{closest:s=>s.includes('#'+id)?{id}:null},preventDefault(){},stopPropagation(){}});
 click('facegroupOpenPaint');assert.equal(opened,1);active=true;click('facegroupOpenPaint');assert.equal(opened,1);assert.match(status.textContent,/Finish the active tool/);active=false;
 click('facegroupStrokeToggle');assert.equal(brush.group,'Roof');assert.equal(brush.armed,true);click('facegroupStrokeToggle');assert.equal(brush.armed,true,'Paint is a persistent mode, not a stop toggle');click('facegroupEraseToggle');assert.equal(brush.group,null);assert.equal(brush.armed,true);
});
