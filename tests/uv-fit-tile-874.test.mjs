import fs from 'node:fs';
import vm from 'node:vm';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {inspectImportedUV,drawImportedUV,importedUVIslandCentre,rotateImportedUVPoint} from '../src/imported-uv-inspection.js';
import {createUVWorkspace} from '../src/uv-workspace.js';
import {moveImportedUV,scaleImportedUV,rotateImportedUV,rotateImportedUVByAngle,fitImportedUVToTile} from '../src/imported-uv-edit.js';
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
  const result=kind==='fit'?fitImportedUVToTile(r.object,r.live,signature,r.owner,scope):kind==='rotate'?rotateImportedUVByAngle(r.object,r.live,signature,r.owner,u,scope):kind==='scale'?scaleImportedUV(r.object,r.live,signature,r.owner,u,scope):moveImportedUV(r.object,r.live,signature,r.owner,u,v,scope);refresh();if(result.selectedFaces)api.retainSelection(result.selectedFaces);return result.ok;
 }});refresh();api.open();
 const fire=(name,x,y,id=1,type='pen')=>canvas.fire(name,{pointerId:id,pointerType:type,clientX:x+10,clientY:y+20});
 const tap=(x=280,y=520)=>{fire('pointerdown',x,y);fire('pointerup',x,y);};
 try{run({r,api,root,canvas,events,paths,calls,history,base,refresh,fire,tap,setEditable:v=>editable=v});}finally{api.close();keys.forEach((k,i)=>old[i]?Object.defineProperty(globalThis,k,old[i]):delete globalThis[k]);}
}
const near=(a,b)=>assert(Math.abs(a-b)<1e-12,`${a} != ${b}`);
test('874 Fit selected island to tile preserves shape/isolation/resources, checkpoints once and uses native UndoRedo',()=>{
 const r=fixture(),mesh=r.live,n=r.h.undoStack.length,scope={island:0,payload:r.payload};r.payload.tangentCorners=[[],[]];const before=JSON.stringify(r.payload);const result=fitImportedUVToTile(r.object,r.live,signature,r.owner,scope);assert.deepEqual(result,{ok:true,changed:true,selectedFaces:[0]});const next=r.object.glbPassthrough;
 assert.equal(r.live,mesh);assert.equal(r.h.undoStack.length,n+1);near(next.uvCorners[0][0][0],.02);near(next.uvCorners[0][0][1],.02);near(next.uvCorners[0][1][0],.98);near(next.uvCorners[0][2][1],.98);assert.equal(next.uvCorners[1],r.payload.uvCorners[1]);assert.equal(next.images,r.payload.images);assert.equal(next.tangentCorners,undefined);assert.equal(JSON.stringify(r.payload),before);assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);
 assert.equal(fitImportedUVToTile(r.object,r.live,signature,r.owner,{island:0,payload:next}).changed,false);assert.equal(r.h.undoStack.length,n+1);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,r.payload);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,next);
});
test('874 Fit keeps aspect ratio/full-island bounds, handles extreme/tiny finite UVs and refuses invalid/stale/zero extents',()=>{
 for(const corners of [[[-2,-1],[2,-1],[-2,1]],[[1.7e308,1.7e308],[-1.7e308,-1.7e308],[1.7e308,-1.7e308]],[[0,0],[5e-324,0],[0,5e-324]]]){
  const r=fixture();r.payload.uvCorners[0]=corners;const scope={island:0,payload:r.payload};assert.equal(fitImportedUVToTile(r.object,r.live,signature,r.owner,scope).ok,true);const uv=r.object.glbPassthrough.uvCorners[0];for(const p of uv)for(const v of p)assert(v>=.02-1e-14&&v<=.98+1e-14);assert.equal(fitImportedUVToTile(r.object,r.live,signature,r.owner,{island:0,payload:r.object.glbPassthrough}).changed,false);
  if(corners[0][0]===-2){near(uv[0][1],.26);near(uv[2][1],.74);near((uv[1][0]-uv[0][0])/(uv[2][1]-uv[0][1]),2);}
 }
 const r=fixture(),n=r.h.undoStack.length;assert.equal(fitImportedUVToTile(r.object,r.live,signature,r.owner).ok,false);assert.equal(fitImportedUVToTile(r.object,r.live,signature,r.owner,{island:0,payload:{}}).ok,false);r.object.locked=true;assert.equal(fitImportedUVToTile(r.object,r.live,signature,r.owner,{island:0,payload:r.payload}).ok,false);r.object.locked=false;r.payload.uvCorners[0]=[[2,2],[2,2],[2,2]];assert.equal(fitImportedUVToTile(r.object,r.live,signature,r.owner,{island:0,payload:r.payload}).ok,false);assert.equal(r.h.undoStack.length,n);
 // Continuous island spans faces beyond the bounded preview.
 const full=fixture();full.manager.replaceActiveMesh(new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[1,1,0]],[[0,1,2],[1,3,2]]));full.object.glbPassthrough={...full.payload,uvTopologySignature:signature(full.live),uvCorners:[[[0,0],[.4,0],[0,.4]],[[.4,0],[2,2],[0,.4]]]};const limited=inspectImportedUV(full.live,full.object.glbPassthrough,signature,{maxPreviewCorners:3});assert.equal(limited.previewFaces.length,1);assert.equal(limited.faceIslands[1],0);assert(fitImportedUVToTile(full.object,full.live,signature,full.owner,{island:0,payload:full.object.glbPassthrough}).ok);near(full.object.glbPassthrough.uvCorners[1][1][0],.98);
});
test('874 actual workspace Fit-to-tile is selected-only, cancels Pencil preview, retains selection and keeps view Fit separate',()=>harness(({r,api,root,canvas,calls,base,fire,tap})=>{
 const button=root.querySelector('[data-uv="fit-tile"]');assert.equal(button.disabled,true);button.fire('click');assert.equal(calls.length,0);tap();assert.equal(button.disabled,false);
 fire('pointerdown',280,520);fire('pointermove',330,490);assert.equal(r.h.undoStack.length,base);button.fire('click');fire('pointerup',330,490);assert.equal(calls.length,1);assert.equal(calls[0].kind,'fit');assert.equal(r.h.undoStack.length,base+1);assert.equal(api.selectedIsland,0);assert.equal(canvas.captures.size,0);
 button.fire('click');assert.equal(r.h.undoStack.length,base+1);const next=r.object.glbPassthrough;root.querySelector('[data-uv="fit"]').fire('click');assert.equal(r.object.glbPassthrough,next);assert.equal(r.h.undoStack.length,base+1);
 root.querySelector('[data-uv="clear"]').fire('click');assert.equal(button.disabled,true);button.fire('click');assert.equal(calls.length,2);
}));
test('874 actual Mesh Health Fit delegates the existing transaction with stale guard and exports project/NOM/GLB UVs',async()=>{
 const r=fixture(),source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8'),retained=[],c={active:true,objectId:3,uvWorkspace:{active:true,selectedIsland:0,retainSelection:f=>retained.push(f)},uvPayload:r.payload,currentMode:()=> 'object',activeObject:()=>r.object,liveMesh:()=>r.live,fitImportedUVToTile,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport(){c.uvPayload=r.object.glbPassthrough;},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function transformUVs('),source.indexOf('function manager(){')),c);
 const expected={object:r.object,mesh:r.live,payload:r.payload};assert.equal(c.transformUVs('fit',undefined,undefined,{...expected,payload:{}}),false);assert.equal(c.transformUVs('fit',undefined,undefined,expected),true);assert.deepEqual(retained[0],[0]);
 const decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.owner.capture()))),(...a)=>new EditableMesh(...a)),o=decoded.objects.find(o=>o.id===3);assert.deepEqual(o.glbPassthrough.uvCorners,r.object.glbPassthrough.uvCorners);
 const nom=readNomadProject(buildNomadProject([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:signature}).bytes),m=nom.json.meshes[0],field=k=>new DataView(nom.bin.buffer,nom.bin.byteOffset+m[k].offset,m[k].length),uv=field('uvs'),indices=field('faces_uv');for(let fi=0;fi<2;fi++)for(let j=0;j<4;j++){const id=indices.getInt32(fi*16+j*4,true);o.glbPassthrough.uvCorners[fi][Math.min(j,2)].forEach((v,k)=>assert.equal(uv.getFloat32(id*8+k*4,true),Math.fround(v)));}
 const glb=await exporter.build([o]);assert.equal(glb.uvRestoredCount,1);assert.equal(glb.tangentsRestoredCount,0);const scene=await exporter.decode(glb.buffer);scene.traverse(n=>{if(n.isMesh){const a=n.geometry.getAttribute('uv');for(let i=0;i<a.count;i++)assert(o.glbPassthrough.uvCorners.flat().some(p=>Math.fround(p[0])===a.getX(i)&&Math.fround(p[1])===a.getY(i)));}});
});
