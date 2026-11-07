import fs from 'node:fs';
import vm from 'node:vm';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {inspectImportedUV,drawImportedUV,importedUVIslandCentre,rotateImportedUVPoint} from '../src/imported-uv-inspection.js';
import {createUVWorkspace} from '../src/uv-workspace.js';
import {moveImportedUV,scaleImportedUV,rotateImportedUV,rotateImportedUVByAngle} from '../src/imported-uv-edit.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m);
function fixture(){
 const r=editableBooleanRuntime();r.manager.activate(3);
 r.manager.replaceActiveMesh(new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[2,0,0],[3,0,0],[2,1,0]],[[0,1,2],[3,4,5]]));
 const object=r.manager.objects.find(o=>o.id===3),payload={version:1,source:'glb',uvTopologySignature:signature(r.live),uvCorners:[[[0,0],[.4,0],[0,.4]],[[.6,.6],[1,.6],[.6,1]]],images:[{data:new Uint8Array([1,2,3])}]};
 object.glbPassthrough=payload;r.manager.objects.find(o=>o.id===2).glbPassthrough=payload;
 return {...r,object,payload,owner:r.c.__boxlabObjectHistory};
}
function node(){
 const fields=new Map(),events=new Map(),captures=new Set();
 return {hidden:false,style:{},append(){},appendChild(){},setAttribute(){},querySelector(k){if(!fields.has(k))fields.set(k,node());return fields.get(k);},addEventListener(k,fn){if(!events.has(k))events.set(k,[]);events.get(k).push(fn);},fire(k,e={}){for(const fn of events.get(k)||[])fn({button:0,cancelable:true,stopPropagation(){},preventDefault(){},...e});},getBoundingClientRect(){return {left:10,top:20,width:1000,height:600};},setPointerCapture(id){captures.add(id);},hasPointerCapture:id=>captures.has(id),releasePointerCapture(id){captures.delete(id);this.fire('lostpointercapture',{pointerId:id});},captures};
}
function harness(run){
 const keys=['document','window','ResizeObserver','devicePixelRatio','__boxlabUVWorkspace'],old=keys.map(k=>Object.getOwnPropertyDescriptor(globalThis,k)),root=node(),canvas=node(),events=new Map(),paths=[];
 let first=true;globalThis.document={head:node(),querySelector:()=>node(),createElement:()=>first?(first=false,node()):root};globalThis.window={addEventListener(k,fn){events.set(k,fn);},removeEventListener(){}};globalThis.ResizeObserver=undefined;globalThis.devicePixelRatio=2;
 const ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,(...p)=>paths.push([k,...p])]));canvas.getContext=()=>ctx;
 const r=fixture(),calls=[],history=[],base=r.h.undoStack.length;let editable=true,api;
 const refresh=()=>api.setReport(inspectImportedUV(r.live,r.object.glbPassthrough,signature),'UVs');
 const context=()=>({object:r.object,mesh:r.live,payload:r.object.glbPassthrough});
 api=createUVWorkspace({canvas,note:node(),controls:node(),canEdit:()=>editable,getTransformContext:context,onDone:()=>api.close(),onHistory:kind=>history.push(kind),onTransform:(kind,u,v,expected)=>{
  calls.push({kind,u,v,expected});if(expected&&(expected.object!==r.object||expected.mesh!==r.live||expected.payload!==r.object.glbPassthrough))return false;
  const scope={island:api.selectedIsland,payload:r.object.glbPassthrough};
  const result=kind==='rotate'?rotateImportedUVByAngle(r.object,r.live,signature,r.owner,u,scope):kind==='scale'?scaleImportedUV(r.object,r.live,signature,r.owner,u,scope):moveImportedUV(r.object,r.live,signature,r.owner,u,v,scope);refresh();if(result.selectedFaces)api.retainSelection(result.selectedFaces);return result.ok;
 }});refresh();api.open();
 const fire=(name,x,y,id=1,type='pen')=>canvas.fire(name,{pointerId:id,pointerType:type,clientX:x+10,clientY:y+20});
 const tap=(x=280,y=520)=>{fire('pointerdown',x,y);fire('pointerup',x,y);};
 try{run({r,api,root,canvas,events,paths,calls,history,base,refresh,fire,tap,setEditable:v=>editable=v});}finally{api.close();keys.forEach((k,i)=>old[i]?Object.defineProperty(globalThis,k,old[i]):delete globalThis[k]);}
}
const near=(a,b)=>assert(Math.abs(a-b)<1e-12,`${a} != ${b}`);
test('873 Pencil Rotate previews exact pivot/seams read-only, commits once, keeps peers and native UndoRedo',()=>harness(({r,api,root,paths,calls,base,fire,tap})=>{
 tap();root.querySelector('[data-uv="drag-rotate"]').fire('click');assert.match(root.querySelector('.uv-drag-hint').textContent,/counterclockwise/);paths.length=0;const original=JSON.stringify(r.payload);
 fire('pointerdown',280,520);for(let dx=10;dx<=120;dx+=10)fire('pointermove',280+dx,520);assert.equal(calls.length,0);assert.equal(r.object.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,base);assert.equal(root.querySelector('.uv-drag-status').textContent,'Rotate 90.0°');assert(paths.some(p=>p[0]==='moveTo'&&Math.abs(p[1]-889.6)<1e-9&&p[2]===1152));
 fire('pointerup',400,520);assert.equal(calls.length,1);assert.equal(calls[0].kind,'rotate');assert.equal(calls[0].u,90);assert.equal(r.h.undoStack.length,base+1);assert.equal(api.selectedIsland,0);const next=r.object.glbPassthrough;assert.deepEqual(next.uvCorners[0],[[.4,0],[.4,.4],[0,0]]);assert.equal(next.uvCorners[1],r.payload.uvCorners[1]);assert.equal(next.images,r.payload.images);assert.equal(JSON.stringify(r.payload),original);assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);
 // Start inside the rotated triangle, reverse by90 and return exactly.
 fire('pointerdown',390,520);fire('pointermove',270,520);fire('pointerup',270,520);assert.equal(calls[1].u,-90);assert.deepEqual(r.object.glbPassthrough.uvCorners,r.payload.uvCorners);assert.equal(r.h.undoStack.length,base+2);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,next);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.deepEqual(r.manager.objects.find(o=>o.id===3).glbPassthrough.uvCorners,r.payload.uvCorners);
}));
test('873 Rotate cancels safely, zero/jitter/vertical/full turn add no history and navigation/default Move survive',()=>{
 for(const exit of ['pointercancel','lostpointercapture','refresh','locked','close','undo','fit','resize','mode'])harness(({r,api,root,canvas,events,calls,base,refresh,fire,tap,setEditable})=>{
  tap();root.querySelector('[data-uv="drag-rotate"]').fire('click');fire('pointerdown',280,520);fire('pointermove',340,520);
  if(exit==='refresh')refresh();else if(exit==='locked')setEditable(false);else if(exit==='close')api.close();else if(exit==='mode')root.querySelector('[data-uv="drag-move"]').fire('click');else if(exit==='undo'||exit==='fit')root.querySelector(`[data-uv="${exit}"]`).fire('click');else if(exit==='resize')events.get('resize')();else canvas.fire(exit,{pointerId:1});
  fire('pointerup',340,520);assert.equal(calls.length,0,exit);assert.equal(r.object.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,base);assert.equal(canvas.captures.size,0);
 });
 harness(({r,api,root,calls,base,history,fire,tap})=>{
  assert.equal(root.querySelector('[data-uv="drag-rotate"]').disabled,true);tap();root.querySelector('[data-uv="drag-rotate"]').fire('click');
  for(const [dx,dy] of [[0,0],[2,1],[0,100]]){fire('pointerdown',280,520);fire('pointermove',280+dx,520+dy);fire('pointerup',280+dx,520+dy);}assert.equal(calls.length,0);
  fire('pointerdown',280,520);fire('pointermove',760,520);fire('pointerup',760,520);assert.equal(calls[0].u,360);assert.equal(r.h.undoStack.length,base);assert.equal(r.object.glbPassthrough,r.payload);
  fire('pointerdown',280,520,2,'touch');fire('pointermove',310,530,2,'touch');fire('pointerup',310,530,2,'touch');assert.equal(api.view.panX,30);root.querySelector('[data-uv="fit"]').fire('click');root.querySelector('[data-uv="in"]').fire('click');
  fire('pointerdown',225,575);fire('pointerdown',100,100,9,'touch');fire('pointermove',500,50,9,'touch');fire('pointerup',500,50,9,'touch');fire('pointermove',345,575);fire('pointerup',345,575);assert.equal(calls[1].u,90);assert.equal(api.view.zoom,1.25);assert.deepEqual(history,[]);
  api.close();api.open();tap(390,520);fire('pointerdown',390,520);fire('pointermove',445.2,520);fire('pointerup',445.2,520);assert.equal(calls[2].kind,'move');near(calls[2].u,.1);
 });
});
test('873 arbitrary-angle transaction survives project/native NOM/GLB and real Mesh Health guards stale/invalid scopes',async()=>{
 const r=fixture(),scope=()=>({island:0,payload:r.object.glbPassthrough}),n=r.h.undoStack.length;
 for(const a of [0,360,-720])assert.equal(rotateImportedUVByAngle(r.object,r.live,signature,r.owner,a,scope()).changed,false);assert.equal(r.h.undoStack.length,n);
 for(const a of [NaN,Infinity])assert.equal(rotateImportedUVByAngle(r.object,r.live,signature,r.owner,a,scope()).ok,false);assert.equal(rotateImportedUVByAngle(r.object,r.live,signature,r.owner,30).ok,false);assert.equal(rotateImportedUVByAngle(r.object,r.live,signature,r.owner,30,{island:0,payload:{}}).ok,false);
 r.object.locked=true;assert.equal(rotateImportedUVByAngle(r.object,r.live,signature,r.owner,30,scope()).ok,false);r.object.locked=false;
 const huge=fixture();huge.payload.uvCorners[0]=[[1.7e308,1.7e308],[-1.7e308,-1.7e308],[1.7e308,-1.7e308]];const hn=huge.h.undoStack.length;assert.equal(rotateImportedUVByAngle(huge.object,huge.live,signature,huge.owner,45,{island:0,payload:huge.payload}).ok,false);assert.equal(huge.object.glbPassthrough,huge.payload);assert.equal(huge.h.undoStack.length,hn);
 const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8'),c={active:true,objectId:3,uvWorkspace:{active:true,selectedIsland:0,retainSelection(){}},uvPayload:r.payload,currentMode:()=> 'object',activeObject:()=>r.object,liveMesh:()=>r.live,rotateImportedUVByAngle,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport(){c.uvPayload=r.object.glbPassthrough;},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function transformUVs('),source.indexOf('function manager(){')),c);
 const expected={object:r.object,mesh:r.live,payload:r.payload};assert.equal(c.transformUVs('rotate',30,undefined,{...expected,payload:{}}),false);assert.equal(c.transformUVs('rotate',30,undefined,expected),true);assert.equal(r.h.undoStack.length,n+1);
 const encoded=encodeBoxlabScene(r.owner.capture()),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...args)=>new EditableMesh(...args)),o=decoded.objects.find(o=>o.id===3);assert.deepEqual(o.glbPassthrough.uvCorners,r.object.glbPassthrough.uvCorners);
 const nom=readNomadProject(buildNomadProject([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:signature}).bytes),m=nom.json.meshes[0],field=k=>new DataView(nom.bin.buffer,nom.bin.byteOffset+m[k].offset,m[k].length),uv=field('uvs'),indices=field('faces_uv');for(let fi=0;fi<2;fi++)for(let j=0;j<4;j++){const id=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][Math.min(j,2)].forEach((v,k)=>assert.equal(uv.getFloat32(id*8+k*4,true),Math.fround(v)));}
 const glb=await exporter.build([o]);assert.equal(glb.uvRestoredCount,1);const scene=await exporter.decode(glb.buffer);scene.traverse(n=>{if(n.isMesh){const a=n.geometry.getAttribute('uv');for(let i=0;i<a.count;i++)assert(o.glbPassthrough.uvCorners.flat().some(p=>Math.fround(p[0])===a.getX(i)&&Math.fround(p[1])===a.getY(i)));}});
});
test('873 rotation uses exact quarter turns, all-face pivot and isolated seam preview without touching resources',()=>{
 const a=fixture(),b=fixture();rotateImportedUV(a.object,a.live,signature,a.owner,{island:0,payload:a.payload});rotateImportedUVByAngle(b.object,b.live,signature,b.owner,90,{island:0,payload:b.payload});assert.deepEqual(a.object.glbPassthrough.uvCorners,b.object.glbPassthrough.uvCorners);
 const centre=[1,1],point=[2,1];assert.deepEqual(rotateImportedUVPoint(point,centre,180),[0,1]);assert.deepEqual(rotateImportedUVPoint(point,centre,-90),[1,0]);const q=rotateImportedUVPoint(point,centre,30);near(q[0],1+Math.sqrt(3)/2);near(q[1],1.5);near(Math.hypot(q[0]-1,q[1]-1),1);
 const payload={uvTopologySignature:'s',uvCorners:[[[0,0],[.4,0],[0,.4]],[[.4,0],[2,2],[0,.4]]]},mesh={faces:[[0,1,2],[1,3,2]]},report=inspectImportedUV(mesh,payload,()=> 's',{maxPreviewCorners:3});const pivot=importedUVIslandCentre(payload.uvCorners,[0,1]);assert.deepEqual(pivot,[1,1]);assert.equal(report.previewFaces.length,1);
 const shared=[0,0],seamed=inspectImportedUV({faces:[[0,1,2],[1,3,2]]},{uvTopologySignature:'s',uvCorners:[[shared,[.4,0],[0,.4]],[[.8,0],[1,.4],shared]]},()=> 's'),before=JSON.stringify(seamed),lines=[],ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,()=>{}]));ctx.moveTo=(...p)=>lines.push(p);
 drawImportedUV({width:1000,height:600,getContext:()=>ctx},seamed,{center:true,padding:24,selectedIsland:0,previewRotation:{degrees:90,centre:[.2,.2]}});near(lines[3][0],444.8);near(lines[3][1],355.2);near(lines[4][0],224);near(lines[4][1],576);assert.equal(JSON.stringify(seamed),before);
});
