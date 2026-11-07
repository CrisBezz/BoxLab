import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
class Vector {
  constructor(x,y,z){Object.assign(this,{x,y,z});}
  clone(){return new Vector(this.x,this.y,this.z);}
  distanceToSquared(v){return (this.x-v.x)**2+(this.y-v.y)**2+(this.z-v.z)**2;}
}

function fixture(){
  const elements=new Map(),listeners=[],events=[],history=[],tasks=[];
  const element=id=>({id,style:{},classList:{add(){},remove(){}},listeners:{},append(...children){for(const child of children)elements.set(child.id,child);},addEventListener(type,fn){this.listeners[type]=fn;},dispatchEvent(){},parentElement:{appendChild(child){elements.set(child.id,child);}},click(){this.listeners.click?.({preventDefault(){},stopImmediatePropagation(){}});}});
  for(const id of ['bridgeFacesBtn','selectionStatus','cageToggle','deselectAllBtn'])elements.set(id,element(id));
  const mesh={vertices:[...[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,2],[1,0,2],[1,1,2],[0,1,2]].map(v=>new Vector(...v))],faces:[[0,1,2,3],[4,5,6,7]],creases:new Map(),edges(){},clone(){return{vertices:this.vertices.map(v=>v.clone()),faces:this.faces.map(f=>[...f]),creases:new Map(this.creases)};},bridgeFaceSelectionInfo(ids){return ids.length===2?{faceIndices:ids,loops:ids.map(i=>this.faces[i])}:null;}};
  let ids=[0,1];
  const context={document:{querySelector:s=>elements.get(s.slice(1)),createElement:()=>element(''),addEventListener:(type,fn)=>listeners.push(fn)},window:{dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail;}},Event:class{},queueMicrotask:fn=>tasks.push(fn),__boxlabBridgeState:{mesh},__boxlabSelectionBridge:{mode:()=> 'face',indices:()=>ids,set:(mode,next)=>{ids=[...next];}},__boxlabHistory:{push:state=>history.push(state)}};
  vm.runInNewContext(fs.readFileSync(new URL('../src/face-bridge-preview.js',import.meta.url),'utf8'),context);
  function clickBridge(){listeners[0]({target:{closest:()=>elements.get('bridgeFacesBtn')},preventDefault(){},stopImmediatePropagation(){}});}
  return{mesh,context,events,history,elements,clickBridge,ids:()=>ids,flush:()=>{while(tasks.length)tasks.shift()();}};
}

test('Face Bridge preview cycles without history; cancel restores original faces/selection and emits completion',()=>{
  const f=fixture(),before=f.mesh.faces.map(x=>[...x]);
  f.clickBridge();assert.equal(f.context.__boxlabFaceBridgePreview.active(),true);assert.equal(f.mesh.faces.length,4);
  f.clickBridge();assert.equal(f.context.__boxlabFaceBridgePreview.state().index,1);assert.equal(f.history.length,0);
  f.elements.get('bridgePreviewCancel').click();
  assert.deepEqual(f.mesh.faces.map(x=>Array.from(x)),before);assert.deepEqual(f.ids(),[0,1]);assert.equal(f.history.length,0);
  assert.equal(f.events.at(-1).type,'boxlab-selection-hub-session-complete');assert.equal(f.events.at(-1).detail.tool,'Bridge');
});

test('Face Bridge commit creates one history step and completes after final selection cleanup',()=>{
  const f=fixture();f.clickBridge();f.elements.get('bridgePreviewConfirm').click();f.flush();
  assert.equal(f.history.length,1);assert.equal(f.history[0].faces.length,2);assert.equal(f.mesh.faces.length,4);
  assert.deepEqual(f.ids(),[]);assert.equal(f.context.__boxlabFaceBridgePreview.active(),false);
  assert.equal(f.events.at(-1).type,'boxlab-selection-hub-session-complete');
});
