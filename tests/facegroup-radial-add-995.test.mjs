import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {faceGroupPalette} from '../src/facegroup-colours-core.js';
import {createFacegroupDrafts} from '../src/facegroup-drafts.js';
import {facegroupAuthoringTarget} from '../src/facegroup-authoring.js';
import {createFacegroupStroke} from '../src/facegroup-stroke.js';
import {createFacegroupPaintDock} from '../src/facegroup-paint-dock.js';
const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');

test('ADD+ numbers unique draft groups per object, with spaced colours and no source mutation',()=>{
 const drafts=createFacegroupDrafts(),mesh=EditableMesh.cube(),object={},other={};mesh.faceGroups[0]='Group 1';mesh.faceGroups[1]='Group 4';
 const before=JSON.stringify(mesh),initial=faceGroupPalette(mesh);
 assert.equal(drafts.add(mesh,object,'Group 4'),'Group 5');assert.equal(drafts.add(mesh,object),'Group 6');
 const rows=drafts.palette(mesh,object,{});assert.deepEqual(rows.names,['Group 1','Group 4','Group 5','Group 6']);
 assert.equal(new Set([...rows.colours.values()].map(c=>c.getHexString())).size,4);
 for(const [name,colour] of initial)assert.equal(rows.colours.get(name).getHex(),colour.getHex());
 assert.equal(JSON.stringify(mesh),before);assert.equal(drafts.palette(mesh,other,{}).pending.size,0);
 assert.equal(drafts.add(mesh,other),'Group 5');assert.equal(drafts.add(null,object),null);
});

test('draft swatches converge to the original viewport palette when faces are painted, including out-of-order use',()=>{
 const drafts=createFacegroupDrafts(),mesh=EditableMesh.cube(),object={};mesh.faceGroups[0]='Wall';
 const first=drafts.add(mesh,object),second=drafts.add(mesh,object,first);
 for(const name of [second,first]){
  mesh.faceGroups[name===second?1:2]=name;
  const rows=drafts.palette(mesh,object,{seed:3,palette:'vivid'}),actual=faceGroupPalette(mesh,{seed:3,palette:'vivid'});
  assert.equal(rows.pending.has(name),false);
  for(const [key,c]of actual)assert.equal(rows.colours.get(key).getHex(),c.getHex());
 }
 assert.equal(drafts.palette(mesh,object,{}).pending.size,0);
});

function controls(){
 const mesh=EditableMesh.cube(),object={id:1,mesh},manager={activeId:1,objects:[object]};let session=false,drag=false,opens=0,refreshes=0;
 const input={value:'Group 1',dispatchEvent(){brush.stop();}},status={},brush=createFacegroupStroke({context:()=>({})});
 const c={mode:'studio',facegroupAuthoringTarget,facegroupDrafts:createFacegroupDrafts(),facegroupStroke:brush,
  manager:()=>manager,bridge:()=>({mesh}),status,facegroupDock:{open(){opens++;return true;}},
  syncFacegroupStrokeControls(){},syncFacegroupNamePicker(){refreshes++;},setMode(mode){c.mode=mode;},
  document:{querySelector:q=>q==='#facegroupName'?input:{removeAttribute(){}}},Event:class{constructor(type){this.type=type;}},
  __boxlabToolSession:{isActive:()=>session},__boxlabFaceDirect:{dragging:()=>drag}};
 vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function facegroupTarget(){'),source.indexOf('function syncFacegroupNamePicker(){')),c);
 const a=source.indexOf('  const controlClick=event=>{'),b=source.indexOf("  panel.addEventListener('click',controlClick)",a);
 vm.runInContext(source.slice(a,b)+'\nglobalThis.click=controlClick;',c);
 const click=id=>c.click({target:{closest:s=>s.includes('#'+id)?{id}:null},preventDefault(){},stopPropagation(){}});
 return {c,mesh,object,manager,input,status,brush,click,opens:()=>opens,refreshes:()=>refreshes,setSession:v=>session=v,setDrag:v=>drag=v};
}

test('actual VIEW/open owner switches to Facegroups and ADD+ arms the numbered brush without assigning selected faces',()=>{
 const f=controls(),before=JSON.stringify(f.mesh);f.click('facegroupOpenPaint');assert.equal(f.opens(),1);assert.equal(f.c.mode,'facegroups');
 f.click('facegroupAdd');assert.equal(f.input.value,'Group 2');assert.equal(f.brush.group,'Group 2');assert.equal(f.brush.armed,true);
 f.click('facegroupAdd');assert.equal(f.input.value,'Group 3');assert.equal(f.refreshes(),2);assert.match(f.status.textContent,/paint faces to save/);
 assert.equal(JSON.stringify(f.mesh),before);
});

test('original authoring gates refuse locked/linked/reference/session targets and no mode switch occurs on refusal',()=>{
 for(const property of ['locked','sourceId','arrayRecipe','booleanRecipe','curveProfile']){
  const f=controls();f.object[property]=true;f.click('facegroupOpenPaint');f.click('facegroupAdd');assert.equal(f.opens(),0);assert.equal(f.input.value,'Group 1');assert.equal(f.c.mode,'studio');
 }
 const f=controls();f.object.kind='reference';f.click('facegroupAdd');assert.equal(f.input.value,'Group 1');
 const g=controls();g.setSession(true);g.click('facegroupOpenPaint');g.click('facegroupAdd');assert.equal(g.opens(),0);assert.equal(g.input.value,'Group 1');
 const h=controls();h.setDrag(true);h.click('facegroupOpenPaint');assert.equal(h.opens(),0);assert.equal(h.c.mode,'studio');
});

test('Face radial delegates FACEGROUP directly to the original dock, never clicks a hidden VIEW control',()=>{
 let callback,launches=0;const events=[];
 const start=gizmo.indexOf("  button.addEventListener('click',event=>{",gizmo.indexOf('toolSectors.forEach(button=>')),end=gizmo.indexOf('\n  });',start);
 const c={button:{disabled:false,textContent:'FACEGROUP',dataset:{toolTarget:'#facegroupOpenPaint'},closest:()=>({dataset:{ringMode:'face'}}),addEventListener:(t,f)=>callback=f},syncContextToolAvailability(){},currentMode:()=> 'face',document:{querySelector:()=>({disabled:false,click(){throw Error('hidden VIEW button clicked');}})},suspendedFaceTool:false,hubSuppressedKey:'',lastSelectionKey:'key',setHubState(){},root:{},gestureDebug(){},__boxlabFacegroupDock:{openFromHub:()=>{launches++;return true;}},window:{dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}}};
 vm.runInNewContext(gizmo.slice(start,end)+'\n  });',c);callback({preventDefault(){},stopPropagation(){}});
 assert.equal(launches,1);assert.equal(events[0].detail.tool,'FACEGROUP');assert.equal(events[0].detail.mode,'face');
});

test('Face radial has 24 original-owner targets, new button fits existing rings, protected inner slots and a three-colour cube',()=>{
 const ring=gizmo.slice(gizmo.indexOf('<div class="tg-tool-ring" data-ring-mode="face"'),gizmo.indexOf('<div class="tg-tool-ring" data-ring-mode="edge"'));
 const nodes=[...ring.matchAll(/class="tg-tool-sector([^\"]*)" style="--a:([\d.]+)deg(?:;--r:([\d.]+)px)?" data-tool-target="([^"]+)"/g)];assert.equal(nodes.length,24);
 const rects=nodes.map(m=>{const a=Number(m[2])*Math.PI/180,r=Number(m[3]||112);return {x:Math.sin(a)*r,y:-Math.cos(a)*r,w:m[1].includes('outer')?86:m[1].includes('mid')?74:76,h:60,target:m[4]};});
 const added=rects.find(r=>r.target==='#facegroupOpenPaint');
 for(const b of rects.filter(r=>r!==added)){const a=added;assert.ok(Math.abs(a.x-b.x)>=(a.w+b.w)/2||Math.abs(a.y-b.y)>=(a.h+b.h)/2,`${a.target}/${b.target} overlap`);}
 assert.match(ring,/--a:0deg" data-tool-target="#extrudeBtn"/);assert.match(ring,/--a:90deg" data-tool-target="#bevelBtn"/);
 const css=fs.readFileSync(new URL('../face-radial-icons.css',import.meta.url),'utf8'),last=css.slice(css.lastIndexOf('[data-tool-target="#facegroupOpenPaint"]'));
 const svg=decodeURIComponent(last.match(/data:image\/svg\+xml,([^"\)]+)/)[1]);
 for(const colour of ['#ed665c','#69c783','#f3cb4e'])assert.ok(svg.includes(colour));assert.equal((svg.match(/<path/g)||[]).length,3);
});


test('numbered names safely wrap at integer limits instead of locking the ADD+ control',()=>{
 const drafts=createFacegroupDrafts(),mesh=EditableMesh.cube(),object={};
 mesh.faceGroups[0]='Group 9007199254740990';mesh.faceGroups[1]='Group 9007199254740991';
 assert.equal(drafts.add(mesh,object),'Group 1');assert.equal(drafts.add(mesh,object),'Group 2');
});


test('actual dock Done completes the Face radial session once and parks the original controls',()=>{
 const f=controls(),events=[];
 class Node{
  constructor(){this.style={};this.children=[];this.listeners={};}
  setAttribute(){}
  append(...nodes){for(const node of nodes)this.appendChild(node);}
  appendChild(node){if(node.parentNode)node.parentNode.children=node.parentNode.children.filter(n=>n!==node);this.children.push(node);node.parentNode=this;}
  addEventListener(type,fn){this.listeners[type]=fn;}
 }
 const viewport=new Node(),home=new Node(),controlsNode=new Node();home.appendChild(controlsNode);
 const query=f.c.document.querySelector;f.c.document.querySelector=q=>q==='#viewportWrap'?viewport:query(q);f.c.document.createElement=()=>new Node();
 Object.assign(f.c,{createFacegroupPaintDock,facegroupRadialSession:false,panel:{querySelector:q=>q==='#facegroupAuthoringHome'?home:controlsNode},__boxlabSelectionBridge:{mode:()=> 'face'},window:{dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}}});
 const a=source.indexOf('  facegroupDock=createFacegroupPaintDock('),b=source.indexOf('  const controlClick=event=>{',a);vm.runInContext(source.slice(a,b),f.c);
 assert.equal(f.c.__boxlabFacegroupDock.openFromHub(),true);assert.equal(f.c.mode,'facegroups');assert.equal(f.brush.armed,true);
 assert.equal(controlsNode.parentNode,f.c.facegroupDock.element);
 f.c.facegroupDock.element.children[0].children[1].listeners.click({preventDefault(){},stopPropagation(){}});
 assert.equal(f.brush.armed,false);assert.equal(controlsNode.parentNode,home);assert.equal(f.c.facegroupDock.visible,false);
 assert.equal(events.length,1);assert.equal(events[0].detail.tool,'FACEGROUP');f.c.facegroupDock.close();assert.equal(events.length,1);
});
