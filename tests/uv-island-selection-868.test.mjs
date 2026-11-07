import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectImportedUV,drawImportedUV,pickImportedUVIsland} from '../src/imported-uv-inspection.js';
import {createUVNavigation} from '../src/uv-navigation.js';
import {createUVWorkspace} from '../src/uv-workspace.js';
function fixture(){
 const mesh={faces:[[0,1,2],[1,3,2],[4,5,6]]},payload={uvTopologySignature:'s',uvCorners:[[[0,0],[.4,0],[0,.4]],[[.4,0],[.4,.4],[0,.4]],[[.6,.6],[1,.6],[.6,1]]]};
 return {mesh,payload,report:inspectImportedUV(mesh,payload,()=> 's')};
}
const options={center:true,padding:24};
test('868 picking uses existing continuous-island IDs and exact drawing mapping after zoom/pan, read-only',()=>{
 const {mesh,payload,report}=fixture(),before=JSON.stringify({mesh,payload,report});assert.equal(report.islandCount,2);
 // 1000x600 fitted tile left224,bottom576,span552.
 assert.equal(pickImportedUVIsland(1000,600,report,{x:280,y:520},options),0);
 assert.equal(pickImportedUVIsland(1000,600,report,{x:390,y:410},options),0);
 assert.equal(pickImportedUVIsland(1000,600,report,{x:610,y:190},options),1);
 assert.equal(pickImportedUVIsland(1000,600,report,{x:500,y:300},options),null);
 const view={zoom:2,panX:30,panY:-10},point={x:(610-500)*2+500+30,y:(190-300)*2+300-10};
 assert.equal(pickImportedUVIsland(1000,600,report,point,{...options,view}),1);
 assert.equal(JSON.stringify({mesh,payload,report}),before);
});
test('868 topmost stacked island, boundary, concave polygons, stale and preview budget are explicit',()=>{
 const {report}=fixture();report.previewFaces.push(report.previewFaces[0]);report.previewIslands.push(2);
 assert.equal(pickImportedUVIsland(1000,600,report,{x:280,y:520},options),2);
 assert.equal(pickImportedUVIsland(1000,600,report,{x:224,y:576},options),2);
 assert.equal(pickImportedUVIsland(1000,600,{...report,state:'stale'},{x:280,y:520},options),null);
 assert.equal(pickImportedUVIsland(1000,600,report,{x:NaN,y:0},options),null);
 const f=fixture(),limited=inspectImportedUV(f.mesh,f.payload,()=> 's',{maxPreviewCorners:6});assert.equal(limited.islandCount,2);assert.equal(pickImportedUVIsland(1000,600,limited,{x:610,y:190},options),null);
 const concave={...report,previewFaces:[[[0,0],[1,0],[1,.3],[.3,.3],[.3,1],[0,1]]],previewIslands:[4]};
 assert.equal(pickImportedUVIsland(1000,600,concave,{x:665,y:135},options),null);assert.equal(pickImportedUVIsland(1000,600,concave,{x:280,y:135},options),4);
});
test('868 one short pen/mouse/finger tap selects; drag/long/multitouch/cancel never select or alter native history semantics',()=>{
 let time=0,undo=0,redo=0;const picks=[],nav=createUVNavigation({size:()=>({width:1000,height:600}),now:()=>time,tap:p=>picks.push(p),undo:()=>undo++,redo:()=>redo++});
 for(const type of ['pen','mouse','touch']){nav.down(1,280,520,type);nav.move(1,282,521);nav.up(1);assert.deepEqual(nav.view,{zoom:1,panX:0,panY:0});}
 assert.equal(picks.length,3);nav.down(1,0,0,'pen');nav.move(1,30,0);nav.up(1);nav.down(1,0,0);time=400;nav.up(1);assert.equal(picks.length,3);
 nav.down(1,0,0);nav.down(2,100,0);nav.up(1);nav.up(2);assert.equal(undo,1);
 for(let i=1;i<=3;i++)nav.down(i,100*i,0);for(let i=1;i<=3;i++)nav.up(i);assert.equal(redo,1);assert.equal(picks.length,3);
 nav.down(1,0,0);nav.cancel();nav.up(1);assert.equal(picks.length,3);
});
test('868 selected highlight draws all preview faces in island and never mutates UV resources',()=>{
 const {report}=fixture(),before=JSON.stringify(report),calls=[];const ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,()=>calls.push(k)]));
 drawImportedUV({width:1000,height:600,getContext:()=>ctx},report,{...options,selectedIsland:0});assert.equal(calls.filter(x=>x==='fill').length,2);assert.equal(JSON.stringify(report),before);
});
test('868 actual workspace selects/clears by tap, keeps navigation and resets selection on report/history/close without touching original controls',()=>{
 const keys=['document','window','ResizeObserver','devicePixelRatio','__boxlabUVWorkspace'],old=keys.map(k=>Object.getOwnPropertyDescriptor(globalThis,k));
 function node(){const fields=new Map(),events=new Map();return {hidden:false,style:{},append(){},appendChild(){},setAttribute(){},querySelector(k){if(!fields.has(k))fields.set(k,node());return fields.get(k);},addEventListener(k,fn){if(!events.has(k))events.set(k,[]);events.get(k).push(fn);},fire(k,e={}){for(const fn of events.get(k)||[])fn({button:0,cancelable:true,stopPropagation(){},preventDefault(){},...e});},getBoundingClientRect(){return {left:0,top:0,width:1000,height:600};}};}
 const root=node(),viewport=node(),canvas=node(),history=[],transforms=[],keysSeen=new Map();let next=true;globalThis.document={head:node(),querySelector:()=>viewport,createElement:()=>next?(next=false,node()):root};globalThis.window={addEventListener(k,fn){keysSeen.set(k,fn);},removeEventListener(){}};globalThis.devicePixelRatio=2;globalThis.ResizeObserver=undefined;
 const ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,()=>{}]));canvas.getContext=()=>ctx;
 try{const api=createUVWorkspace({canvas,note:node(),controls:node(),onDone(){},onHistory:x=>history.push(x),onTransform:(...args)=>transforms.push(args)}),r=fixture().report;api.setReport(r,'two islands');api.open();assert.match(root.querySelector('.uv-selection').textContent,/whole layout/);assert.equal(root.querySelector('[data-uv="move"]').disabled,true);
 const tap=(x,y)=>{canvas.fire('pointerdown',{pointerId:1,pointerType:'pen',clientX:x,clientY:y});canvas.fire('pointerup',{pointerId:1});};
 tap(280,520);assert.equal(api.selectedIsland,0);assert.match(root.querySelector('.uv-selection').textContent,/Island 1 of 2 selected/);assert.match(root.querySelector('.uv-selection').textContent,/this island/);assert.deepEqual(history,[]);
 const u=root.querySelector('[data-uv="move-u"]'),v=root.querySelector('[data-uv="move-v"]'),scale=root.querySelector('[data-uv="scale-factor"]');assert.equal(root.querySelector('[data-uv="move"]').disabled,false);
 u.value='0.125';v.value='-0.25';root.querySelector('[data-uv="move"]').fire('click');assert.deepEqual(transforms[0],['move',.125,-.25]);scale.value='0.5';root.querySelector('[data-uv="scale"]').fire('click');assert.deepEqual(transforms[1],['scale',.5]);
 u.value='';root.querySelector('[data-uv="move"]').fire('click');scale.value='0';root.querySelector('[data-uv="scale"]').fire('click');assert.equal(transforms.length,2);assert.match(root.querySelector('.uv-input-status').textContent,/positive/);
 let prevented=false;keysSeen.get('keydown')({key:'Backspace',target:{closest:()=>u},preventDefault(){prevented=true;}});assert.equal(prevented,false);assert.deepEqual(history,[]);
 root.querySelector('[data-uv="fit"]').fire('click');assert.equal(api.selectedIsland,0);tap(610,190);assert.equal(api.selectedIsland,1);root.querySelector('[data-uv="clear"]').fire('click');assert.equal(api.selectedIsland,null);assert.match(root.querySelector('.uv-selection').textContent,/whole layout/);
 tap(280,520);api.setReport(r,'refresh');assert.equal(api.selectedIsland,null);api.retainSelection([0,1]);assert.equal(api.selectedIsland,0);api.setReport(r,'refresh');api.retainSelection([0]);assert.equal(api.selectedIsland,null);tap(280,520);api.close();assert.equal(api.selectedIsland,null);api.open();assert.equal(api.selectedIsland,null);
 }finally{keys.forEach((k,i)=>old[i]?Object.defineProperty(globalThis,k,old[i]):delete globalThis[k]);}
});
