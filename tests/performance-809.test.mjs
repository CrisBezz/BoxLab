import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createPerformanceMonitor} from '../src/performance-core.js';
const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('809 monitor defaults off, bounds samples, resets and excludes suspended frames',()=>{
 let clock=0,calls=0;const m=createPerformanceMonitor(()=>{calls++;return clock;});
 assert.equal(m.start(),null);m.frame(1,2,3);assert.equal(m.snapshot().samples,0);assert.equal(calls,0);
 m.setEnabled(true);const start=m.start();clock=8;m.rebuild(start);
 for(let i=0;i<300;i++)m.frame(i*20,2,3,{render:{calls:42,triangles:80},memory:{geometries:70,textures:2}},{vertices:Array(10),faces:Array(8)},{undoStack:Array(3),redoStack:Array(1)});
 const s=m.snapshot();assert.equal(s.samples,120);assert.equal(s.fps,50);assert.equal(s.p95Ms,20);assert.equal(s.calls,42);assert.equal(s.undo,3);assert.equal(s.rebuildMeanMs,8);
 m.pause();m.frame(100000,1,1);assert.equal(m.snapshot().frameMs,20);m.frame(200000,1,1);assert.equal(m.snapshot().frameMs,20);
 m.reset();assert.equal(m.snapshot().samples,0);assert.equal(m.snapshot().rebuilds,0);m.setEnabled(false);assert.equal(m.start(),null);
});
test('809 actual animation owner preserves disabled rendering and submits read-only enabled timings',()=>{
 const text=source.slice(source.indexOf('function animate(){'),source.indexOf('resize();renderMesh();animate();',source.indexOf('function animate(){')));
 let tick=0;const events=[],mesh={vertices:[1,2],faces:[3]},history={undoStack:[1],redoStack:[]},info={render:{calls:4},memory:{geometries:7}};
 const c={requestAnimationFrame:()=>events.push('raf'),controls:{update:()=>events.push('controls')},updateScreenSpaceSelection:()=>events.push('markers'),renderer:{info,render:()=>events.push('render')},scene:{},camera:{},mesh,history,performance:{now:()=>{events.push('clock');return tick+=2;}}};vm.createContext(c);vm.runInContext(text,c);
 c.animate();assert.deepEqual(events,['raf','controls','markers','render']);events.length=0;
 const m=createPerformanceMonitor();m.setEnabled(true);c.__boxlabPerformance=m;c.animate();
 assert.deepEqual(events,['raf','controls','clock','markers','clock','render','clock']);assert.equal(m.snapshot().markers,2);assert.equal(m.snapshot().render,2);assert.equal(m.snapshot().calls,4);assert.deepEqual(mesh,{vertices:[1,2],faces:[3]});
});
test('809 native rebuild timing surrounds existing owner without duplicate rebuild or history work',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock),order=[];
 const text=source.slice(source.indexOf('function renderMesh(){'),source.indexOf('\n',source.indexOf('function renderMesh(){')));
 const c={__boxlabPerformance:monitor,__boxlabBridgeState:{},mesh:{},root:{add:()=>order.push('add')},clearGroup:()=>order.push('clear'),modifiedBaseMesh:()=>({triangulatedGeometry:()=>({})}),subdEnabled:false,showCage:true,baseMaterial:{},THREE:{Mesh:class{constructor(){this.userData={};}}},activeMirrorAxes:()=>[],addCage:()=>{order.push('cage');clock+=10;},selection:null,drag:null};
 for(const name of ['updateStatus','updateActionAvailability','syncDirectToolControls','syncTransformButtons','syncSelectionModeButtons','syncCreaseControl','syncMirrorAlignControl'])c[name]=()=>{};
 vm.createContext(c);vm.runInContext(text,c);c.renderMesh();assert.equal(monitor.snapshot().rebuilds,0);monitor.setEnabled(true);c.renderMesh();assert.equal(monitor.snapshot().rebuilds,1);assert.equal(monitor.snapshot().rebuildMeanMs,10);assert.deepEqual(order,['clear','add','cage','clear','add','cage']);
});
test('809 whole diagnostic UI installs once, updates counters and closes without claiming viewport gestures',()=>{
 const nodes=new Map(),timers=new Map(),listeners={};let next=0;
 function node(){const n={children:[],style:{},attrs:{},classList:{toggle(){}},handlers:{},append(...children){this.children.push(...children);for(const child of children)child.parentElement=this;},setAttribute(k,v){this.attrs[k]=v;},addEventListener(t,f){this.handlers[t]=f;},remove(){this.parentElement.children=this.parentElement.children.filter(n=>n!==this);}};return n;}
 const grid=node(),wrap=node();nodes.set('#gestureDebugToggle',{parentElement:grid});nodes.set('#viewportWrap',wrap);
 const c={createPerformanceMonitor,document:{createElement:node,querySelector:s=>nodes.get(s),addEventListener:(t,f)=>listeners[t]=f},window:{addEventListener:(t,f)=>listeners[t]=f},setInterval:f=>{timers.set(++next,f);return next;},clearInterval:id=>timers.delete(id)};
 vm.createContext(c);vm.runInContext(fs.readFileSync(new URL('../src/performance-monitor.js',import.meta.url),'utf8').replace(/^import .*;\n/,''),c);
 listeners.load();assert.equal(grid.children.length,1);const button=grid.children[0];button.handlers.click();assert.equal(c.__boxlabPerformance.enabled,true);assert.equal(wrap.children.length,1);assert.equal(timers.size,1);
 c.__boxlabPerformance.frame(10,2,3,{render:{calls:40,triangles:30},memory:{geometries:12,textures:2}},{vertices:[1],faces:[]},{undoStack:[],redoStack:[]});c.__boxlabPerformance.frame(30,2,3,{render:{calls:40,triangles:30},memory:{geometries:12,textures:2}},{vertices:[1],faces:[]},{undoStack:[],redoStack:[]});[...timers.values()][0]();
 assert.match(wrap.children[0].children[1].textContent,/50 FPS/);assert.match(wrap.children[0].children[1].textContent,/Draw calls 40/);
 const actions=wrap.children[0].children[3];actions.children[0].handlers.click();assert.equal(c.__boxlabPerformance.snapshot().samples,0);actions.children[1].handlers.click();assert.equal(wrap.children.length,0);assert.equal(timers.size,0);assert.equal(button.attrs['aria-pressed'],'false');assert.equal(listeners.pointerdown,undefined);
});
test('809 actual cage avoids repeated edge enumeration with identical edge/vertex geometry and crease/selection styles',async()=>{
 const THREE=await import('three'),{EditableMesh}=await import('../src/mesh.js'),{installLooseTopology}=await import('../src/loose-topology.js');installLooseTopology(EditableMesh);
 const current=source.slice(source.indexOf('function addCage(){'),source.indexOf('\n',source.indexOf('function addCage(){')));
 const previous=current.replace('(mesh.creases.get(mesh.edgeKey(e.a,e.b))||0)>0','mesh.edgeCrease(index)>0');assert.notEqual(previous,current);
 for(const mode of ['vertex','edge','face','object']){
  const mesh=EditableMesh.cube(1);mesh.addLooseEdge(0,6);mesh.creases.set('0:1',.7);mesh.creases.set('0:6',1);mesh.faceGroups[0]='Front';
  const originals={vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces.map(f=>[...f]),creases:[...mesh.creases]};
  function build(code){let enumerations=0;const candidate=mesh.clone(),base=candidate.edges.bind(candidate);candidate.edges=()=>{enumerations++;return base();};
   const root=new THREE.Group(),materials=Object.fromEntries(['x','neutral','edge','crease','vertex','selectedVertex','loop','currentLoop'].map(k=>[k,new THREE.MeshBasicMaterial()]));
   for(const [k,m] of Object.entries(materials))m.name=k;
   const c={THREE,mesh:candidate,root,activeLoopSlides:[[ {vertex:0},{vertex:1} ]],activeLoopSlide:null,selection:mode==='object'?{type:'object'}:{type:mode},selectionMode:mode,directTool:null,selectionHas:(type,i)=>type===mode&&i===2,edgeAxis:()=> 'x',axisLineMaterials:materials,creaseEdgeMaterial:materials.crease,edgeMaterial:materials.edge,selectedVertexMaterial:materials.selectedVertex,vertexMaterial:materials.vertex,activeLoopMaterial:materials.loop,currentLoopMaterial:materials.currentLoop,addSelectedEdgeOverlay:()=>{},addFacePickers:()=>{}};
   vm.createContext(c);vm.runInContext(code,c);c.addCage();
   const snapshot=root.children.map(o=>({kind:o.userData.kind,index:o.userData.index,material:o.material.name,positions:Array.from(o.geometry.attributes.position.array),position:o.position.toArray(),order:o.renderOrder,userData:{...o.userData}}));root.children.forEach(o=>o.geometry.dispose());Object.values(materials).forEach(m=>m.dispose());return{snapshot,enumerations};
  }
  const old=build(previous),fixed=build(current);assert.deepEqual(fixed.snapshot,old.snapshot);assert.equal(fixed.enumerations,1);if(mode!=='object')assert(old.enumerations>1);
  assert.deepEqual({vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces,creases:[...mesh.creases]},originals);
 }
});
