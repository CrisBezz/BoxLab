import test from 'node:test';
import assert from 'node:assert/strict';
import {gestureDebugRuntime} from './helpers/gesture-debug-runtime.mjs';
function fixture(){
 const f=gestureDebugRuntime();
 const node=(extra={})=>({tagName:'DIV',id:'',className:'',hidden:false,scrollTop:0,scrollHeight:1000,clientHeight:600,getBoundingClientRect:()=>({x:990,y:66,left:990,top:66,width:360,height:600}),...extra});
 const menu=node({id:'viewModes',open:true}),panel=node({classList:{contains:s=>s==='viewport-menu-panel'}}),picker=node({options:[{},{},{}],selectedIndex:1,disabled:false});
 const map=new Map([['#viewModes',menu],['#viewModesPanel',panel],['#facegroupNames',picker],['#viewportRenderLooks [data-render].active',{dataset:{render:'facegroups'}}]]);
 f.c.document.querySelector=s=>map.get(s)||null;f.c.getComputedStyle=()=>({display:'block',visibility:'visible',opacity:'1',overflowY:'auto',clipPath:'none',mixBlendMode:'normal'});
 f.c.__boxlabSelectionBridge={mode:()=> 'face'};f.c.__boxlabFacegroupStroke={armed:true,pointerId:null,group:null};
 return {...f,menu,panel,picker};
}
test('actual report distinguishes open/closed/missing VIEW and reports scroll, mode and group state read-only',()=>{
 const f=fixture(),before=JSON.stringify([f.menu,f.panel,f.picker]);let report=f.api.uiSnapshot().viewMenu;
 assert.equal(report.open,true);assert.equal(report.renderMode,'facegroups');assert.equal(report.selectionMode,'face');assert.equal(report.nodes[0].scrollHeight,1000);assert.equal(report.nodes[0].clientHeight,600);assert.equal(report.groupPicker.optionCount,3);assert.equal(report.groupPicker.selectedIndex,1);assert.equal(report.facegroupStroke.mode,'erase');assert.equal(JSON.stringify([f.menu,f.panel,f.picker]),before);
 f.menu.open=false;f.panel.scrollTop=220;report=f.api.uiSnapshot().viewMenu;assert.equal(report.open,false);assert.equal(report.nodes[0].scrollTop,220);
 f.c.document.querySelector=()=>null;report=f.api.uiSnapshot().viewMenu;assert.equal(report.open,null);assert.equal(report.nodes[0].present,false);assert.equal(report.groupPicker.present,false);
});
test('native toggle/scroll evidence captures final state only while debug enabled',()=>{
 const f=fixture();f.events.get('toggle').fn({target:f.menu});f.panel.scrollTop=180;f.events.get('scroll').fn({target:f.panel});
 let events=f.api.uiSnapshot().events;assert.equal(events.filter(e=>e.kind==='view-toggle').length,1);assert.equal(events.find(e=>e.kind==='view-toggle').data.open,true);assert.equal(events.find(e=>e.kind==='view-scroll').data.nodes[0].scrollTop,180);
 f.api.disable();let reads=0;f.c.document.querySelector=()=>{reads++;return null;};f.events.get('toggle').fn({target:f.menu});f.events.get('scroll').fn({target:f.panel});assert.equal(reads,0);
});
