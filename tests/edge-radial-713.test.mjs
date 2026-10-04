import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const gizmo=read('src/total-gizmo.js');
const ring=mode=>gizmo.split(`data-ring-mode="${mode}"`)[1].split('</div>\n<div class="tg-tool-ring"')[0];
test('Edge exposes every existing Active Tool and no selection actions',()=>{
 const edge=ring('edge');
 assert.equal((edge.match(/data-tool-target=/g)||[]).length,19);
 for(const id of ['edgeExtrudeBtn','edgeSlideBtn','bevelBtn','applyCreaseBtn','offsetLoopBtn','bridgeEdgesBtn','dissolveEdgeBtn','deleteEdgeBtn','loopCutBtn','faceSplitBtn','clearCreaseBtn','fillFaceBtn','gridFillBtn','dissolveLoopBtn','joinCoplanarBtn','rotateEdgeBtn','collapseEdgeBtn','componentCircleBtn'])assert.ok(edge.includes('#'+id),id);
 assert.ok(edge.includes("data-sweep-selection-mode='edge'"));assert.doesNotMatch(edge,/#select|growSelection|shrinkSelection/);
});
test('shared tools use the same radial direction and inner/outer tier',()=>{
 const sectors=mode=>[...ring(mode).matchAll(/<button[^>]+data-tool-target="([^"]+)"[^>]*>([^<]+)<\/button>/g)].map(m=>({label:m[2],outer:m[0].includes('tg-tool-outer'),a:Number(m[0].match(/--a:([\d.]+)/)[1])}));
 for(const [label,modes] of [['Circle',['face','edge','vertex']],['Bevel',['face','edge','vertex']],['Slide',['edge','vertex']],['Bridge',['face','edge']],['Sweep',['face','edge']],['Join Coplanar',['face','edge']],['Merge Dist',['face','vertex']],['Clean Vertices',['face','vertex']]]){
  const slots=modes.map(m=>sectors(m).find(s=>s.label===label));assert.ok(slots.every(Boolean),label);assert.ok(slots.every(s=>s.a===slots[0].a&&s.outer===slots[0].outer),label);
 }
});
function fixture(){
 const listeners={},fields=new Map(),events=[],scheduled=[];
 function el(){return{hidden:false,disabled:false,value:'1',style:{},dataset:{},classList:{contains:()=>false},addEventListener(type,fn){this[type]=fn;},setAttribute(){},getAttribute:()=> '1',dispatchEvent(){},querySelector(){return{hidden:false,textContent:''};}};}
 const panel=el();panel.querySelector=q=>{if(!fields.has(q))fields.set(q,el());return fields.get(q);};panel.querySelectorAll=()=>[];
 const document={createElement:tag=>tag==='div'?panel:el(),querySelector:q=>q==='#viewportWrap'||q==='head'?{appendChild(){}}:q==='#app'?el():null,head:{appendChild(){}},activeElement:null};
 let active='loopCut',busy=false,mode='edge';const mesh={};
 const ctx={document,window:{addEventListener:(t,f)=>listeners[t]=f,dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}},Event:class{},requestAnimationFrame:fn=>{scheduled.push(fn);return scheduled.length;},cancelAnimationFrame(){},placeToolSessionPanel(){},__boxlabBridgeState:{mesh},__boxlabSelectionBridge:{mode:()=>mode},__boxlabMainDirectTool:{active:()=>active,busy:()=>busy,finishLoopCut:()=>{if(busy)return false;active=null;return true;}},__boxlabFaceSplit:{isArmed:()=>active==='split',disarm:()=>active=null}};
 vm.runInNewContext(read('src/edge-tool-viewport-session.js').replace(/^import .*\n/,''),ctx);
 const launch=tool=>{active=tool==='Loop'?'loopCut':'split';listeners['boxlab-selection-hub-tool']({detail:{mode:'edge',tool}});};
 return{ctx,launch,events,panel,fields,setBusy:v=>busy=v,setMode:v=>mode=v,active:()=>active};
}
test('Loop/Split Done disarm authoritative owners, busy guard and completion survive consuming viewport listeners',()=>{
 const f=fixture();for(const tool of ['Loop','Split']){f.launch(tool);assert.equal(f.panel.hidden,false);f.setBusy(true);assert.equal(f.ctx.__boxlabEdgeViewportSession.close(),false);assert.equal(f.ctx.__boxlabEdgeViewportSession.active(),true);f.setBusy(false);assert.equal(f.ctx.__boxlabEdgeViewportSession.close(),true);assert.equal(f.active(),null);assert.equal(f.events.at(-1).detail.tool,tool);assert.equal(f.events.at(-1).detail.mode,'edge');}
});
test('context loss and superseding sessions hide settings without stale suppression',()=>{
 const f=fixture();f.launch('Loop');f.setMode('face');f.ctx.__boxlabEdgeViewportSession.sync();assert.equal(f.panel.hidden,true);assert.equal(f.active(),null);assert.equal(f.events.length,1);
 f.setMode('edge');f.launch('Split');f.ctx.window.addEventListener;f.ctx.__boxlabBridgeState.mesh={};f.ctx.__boxlabEdgeViewportSession.sync();assert.equal(f.panel.hidden,true);assert.equal(f.active(),null);
});
test('Loop finishing changes only tool state; original cut/slide and commit owners remain intact',()=>{
 const main=read('src/main.js');const fn=main.match(/finishLoopCut:\(\)=>\{([^\n]+)\},/)[1];const calls=[];
 vm.runInNewContext('(()=>{'+fn+'})()',{drag:null,directTool:'loopCut',setDirectTool:x=>calls.push(x),renderMesh:()=>calls.push('render')});assert.deepEqual(calls,[null,'render']);assert.doesNotMatch(fn,/history|clearLoopSlide|loopCut\(/);
 assert.ok(read('index.html').includes('loop-cut-commit.js?v=0.36.18.632'));assert.ok(read('src/drawer-ui.js').includes('loop-cut-added-vertex.js?v=0.36.18.688'));
});
