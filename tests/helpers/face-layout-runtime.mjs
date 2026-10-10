import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {orderedDOM} from './ordered-dom.mjs';

const rows=[['extrudeBtn','insetBtn','knifeBtn'],['deleteFaceBtn','duplicateFacesBtn','extractFacesBtn'],['joinSelectedCoplanarFacesBtn','bridgeFacesBtn','sweepLauncher'],['shellFacesBtn','pokeFacesBtn','componentCircleBtn'],['closeHolesBtn','triangulateFacesBtn','flipFacesBtn'],['quadPairCleanupBtn','quadifyNgonsBtn']];
const contextual=['precisionFaceRow','precisionFaceReadout','repeatFacePreviousRow'];
const diagnostics=['faceInspectDrawer','faceRepairDrawer','topologyValidityGate'];
const rowId=i=>i===0?'facePrimaryCompactRow':'faceCompactRow'+(i+1);

// Execute original shared Face layout and Join placement functions. Geometry,
// browser CSS and tool actions are outside this controlled ordered-DOM adapter.
export function faceLayoutRuntime(sourceTransform=s=>s){
 const {fields,node}=orderedDOM(),queue=[];
 const face=node('faceTools'),title=node();title.className='panel-title';
 const decoy=node('decoy');decoy.className='outliner-actions';
 const primary=node('originalPrimary');primary.className='outliner-actions';
 face.append(decoy,title,primary);
 for(const id of rows.flat()){
  if(id==='joinSelectedCoplanarFacesBtn')continue;
  const button=node(id);button.className='button';
  (rows[0].includes(id)?primary:decoy).append(button);
 }
 const sweep=fields.get('#sweepLauncher');
 fields.set('.sweep-selection-launch[data-sweep-selection-mode="face"]',sweep);
 // Contextual controls and diagnostics arrive later, in deliberately wrong order.
 const document=node(),window=node();document.createElement=()=>node();
 document.querySelector=s=>fields.get(s)||null;document.querySelectorAll=()=>[];
 fields.set('.mode-tools[data-mode-tools="face"]',face);
 const c={document,window,setTimeout:fn=>queue.push(fn),queueMicrotask:fn=>queue.push(fn)};
 vm.createContext(c);
 const ui=fs.readFileSync(new URL('../../src/tool-session-ui.js',import.meta.url),'utf8');
 const a=ui.indexOf('function ensureFaceCompactRow('),b=ui.indexOf('let active=null;',a);
 assert.ok(a>=0&&b>a);
 vm.runInContext(sourceTransform(ui.slice(a,b),'tool-session-ui.js')+'\nglobalThis.sync=installFaceControlOrder;',c);
 const sync=()=>c.sync(),flush=()=>{while(queue.length)queue.shift()();};
 sync();
 const original=rows.flat().filter(id=>id!=='joinSelectedCoplanarFacesBtn').map(id=>fields.get('#'+id));
 function lateLoad(){
  for(const id of [...diagnostics].reverse())face.append(node(id));
  for(const id of [...contextual].reverse())face.append(node(id));
  const join=fs.readFileSync(new URL('../../src/join-selected-coplanar-faces.js',import.meta.url),'utf8');
  const start=join.indexOf('function place(){'),end=join.indexOf('function facePlane(',start);
  assert.ok(start>=0&&end>start);
  c.button=node('joinSelectedCoplanarFacesBtn');original.push(c.button);
  vm.runInContext(sourceTransform(join.slice(start,end),'join-selected-coplanar-faces.js')+'\nglobalThis.placeJoin=place;',c);
  c.placeJoin();window.dispatchEvent({type:'boxlab-bridge-state'});flush();
 }
 return {fields,face,title,primary,original,sync,flush,lateLoad,context:c,document,window};
}

export function assertFaceContext(sourceTransform){
 const f=faceLayoutRuntime(sourceTransform);f.lateLoad();
 for(let i=0;i<3;i++){
  f.document.dispatchEvent({type:'pointerup'});f.flush();f.sync();
  const children=f.face.children,at=children.indexOf(f.title);
  assert.equal(children[at+1],f.primary,'Extrude row directly below title, ignoring earlier action row');
  assert.deepEqual(children.slice(at+2,at+5).map(x=>x.id),contextual,'Value/readout/Repeat directly under primary');
  assert.equal(children[at+5],f.fields.get('#faceCompactRow2'));
 }
}

export function assertFaceRows(sourceTransform){
 const f=faceLayoutRuntime(sourceTransform);f.lateLoad();
 for(let n=0;n<3;n++){
  f.sync();f.flush();
  rows.forEach((ids,i)=>{
   const row=f.fields.get('#'+rowId(i));
   assert.deepEqual(row.children.map(x=>x.id),ids,'current Face row contents');
   assert.equal(row.style.gridTemplateColumns,'repeat(3,minmax(0,1fr))');
   if(i)assert.equal(f.fields.get('#'+rowId(i-1)).nextElementSibling,i===1?f.fields.get('#precisionFaceRow'):row);
  });
  for(const button of f.original)assert.equal(f.fields.get('#'+button.id),button);
 }
}

export function assertFaceDiagnostics(sourceTransform){
 const f=faceLayoutRuntime(sourceTransform);f.lateLoad();
 for(let n=0;n<3;n++){
  // A late owner appends another control: diagnostics must still be true bottom.
  f.face.append(f.document.createElement('div'));f.sync();f.flush();
  assert.deepEqual(f.face.children.slice(-3).map(x=>x.id),diagnostics);
  assert.ok(f.face.children.indexOf(f.fields.get('#faceCompactRow6'))<f.face.children.length-3);
 }
}

export function assertFaceJoin(sourceTransform){
 const f=faceLayoutRuntime(sourceTransform);f.lateLoad();
 const button=f.fields.get('#joinSelectedCoplanarFacesBtn'),row=f.fields.get('#faceCompactRow3');
 let calls=0;button.addEventListener('click',()=>calls++);
 for(let n=0;n<3;n++){
  f.primary.append(button);assert.equal(f.context.placeJoin(),true);
  assert.equal(button.parentElement,row,'actual Join owner returns original button to current third row');
  f.sync();f.flush();button.dispatchEvent({type:'click'});
  assert.equal(row.children[0],button);assert.equal(f.fields.get('#joinSelectedCoplanarFacesBtn'),button);
 }
 assert.equal(calls,3,'original listener survives repeated owner placement');
}
