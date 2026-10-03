import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function fixture(){
  const handlers=new Map(),calls=[],events=[],fields=new Map();let mode='face',ids=[0],direct='extrude',armed=false;
  const element=()=>({style:{},value:'',disabled:false,hidden:true,offsetHeight:140,textContent:'',listeners:{},classList:{toggle(){}},appendChild(){},setAttribute(){},addEventListener(type,fn){this.listeners[type]=fn;},querySelector(selector){if(!fields.has(selector))fields.set(selector,element());return fields.get(selector);},blur(){}});
  const wrap=Object.assign(element(),{clientWidth:1000,clientHeight:600});
  const source=Object.assign(element(),{textContent:'Repeat Extrude +0.200'});
  const context={document:{querySelector(selector){if(selector==='#viewportWrap')return wrap;if(selector==='#repeatFacePreviousBtn')return source;if(selector==='#precisionFaceReadout')return{textContent:'Last Extrude +0.200'};if(selector==='#extrudeBtn')return{click(){calls.push('disarm-extrude');direct=null;}};},createElement:element,head:element()},window:{addEventListener(type,fn){handlers.set(type,fn);},dispatchEvent:event=>events.push(event)},CustomEvent:class{constructor(type,options){Object.assign(this,{type,detail:options.detail});}},requestAnimationFrame:()=>1,cancelAnimationFrame(){},__boxlabSelectionBridge:{mode:()=>mode,indices:()=>ids},__boxlabPrecisionFace:{value:()=>.2,applyFor:(tool,value)=>calls.push(['exact',tool,value])},__boxlabRepeatFacePrevious:{isArmed:()=>armed,arm:()=>{armed=!armed;calls.push('repeat');},disarm:()=>{armed=false;calls.push('repeat-off');}},__boxlabFaceDirect:{tool:()=>direct,clearTransformSuspension:()=>calls.push('clear-suspension')},__boxlabTotalGizmo:{element:{style:{left:'500px',top:'300px'}}}};
  vm.runInNewContext(fs.readFileSync(new URL('../src/selection-hub-face-value-session.js',import.meta.url),'utf8'),context);
  const launch=tool=>handlers.get('boxlab-selection-hub-tool')({detail:{mode:'face',tool}});
  const click=selector=>fields.get(selector).listeners.click({preventDefault(){},stopPropagation(){}});
  return{context,calls,events,fields,launch,click,setMode:next=>{mode=next;},setIds:next=>{ids=next;}};
}
test('contextual exact values delegate to the selected existing precision owner',()=>{
  const f=fixture();f.launch('Inset');f.fields.get('input').value='.35';f.context.__boxlabFaceValueViewportSession.sync();f.click('.shfv-apply');
  assert.deepEqual(f.calls.at(-1),['exact','inset',.35]);
  f.setIds([]);f.context.__boxlabFaceValueViewportSession.sync();assert.equal(f.fields.get('.shfv-apply').disabled,true);
});
test('Repeat delegates to its existing owner; Done ends repeat/direct arming and emits completion',()=>{
  const f=fixture();f.launch('Extrude');f.click('.shfv-repeat');assert.ok(f.calls.includes('repeat'));
  f.click('.shfv-done');assert.ok(f.calls.includes('disarm-extrude'));assert.ok(f.calls.includes('repeat-off'));
  assert.equal(f.context.__boxlabFaceValueViewportSession.active(),false);assert.equal(f.events.at(-1).detail.tool,'Extrude');
});
test('another radial command hides settings without resetting that new command lifecycle',()=>{
  const f=fixture();f.launch('Extrude');f.launch('Shell');assert.equal(f.context.__boxlabFaceValueViewportSession.active(),false);assert.equal(f.events.length,0);assert.ok(!f.calls.includes('disarm-extrude'));
});
