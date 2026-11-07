import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function fixture(){
  const fields=new Map(),handlers=new Map(),calls=[],events=[];
  let mode='face',ids=[2],locked=false,result={ok:true},disabled=false;
  const el=()=>({style:{},hidden:true,textContent:'',listeners:{},appendChild(){},addEventListener(t,f){this.listeners[t]=f;},querySelector(s){if(!fields.has(s))fields.set(s,el());return fields.get(s);}});
  const target={get disabled(){return disabled;}},panelHost=el();
  const context={placeToolSessionPanel:p=>{p.style.top='12px';p.style.left='50%';},document:{createElement:el,head:el(),querySelector:s=>s==='#viewportWrap'?panelHost:s==='#app'?{classList:{contains:()=>locked}}:s==='#selectionStatus'?el():target},window:{addEventListener:(t,f)=>handlers.set(t,f),dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},queueMicrotask:f=>f(),requestAnimationFrame:()=>1,cancelAnimationFrame(){},__boxlabHistory:{},__boxlabBridgeState:{mesh:{}},__boxlabSelectionBridge:{mode:()=>mode,set:(m,next)=>{calls.push(['selection',m,next]);ids=next;}}};
  for(const [name,method] of [['__boxlabCloseHoles','closeHoles'],['__boxlabQuadPairCleanup','apply'],['__boxlabQuadifyNgons','apply'],['__boxlabCleanVertices','apply']])context[name]={syncUI(){},[method](){calls.push(name);return result;}};
  vm.runInNewContext(fs.readFileSync(new URL('../src/face-repair-viewport.js',import.meta.url),'utf8').replace(/^import .*;\n/,''),context);
  const api=context.__boxlabFaceRepairViewportSession;
  const click=s=>fields.get(s).listeners.click({preventDefault(){},stopPropagation(){}});
  return{api,context,fields,calls,events,handlers,click,ids:()=>ids,setResult:r=>{result=r;},setDisabled:d=>{disabled=d;},setLocked:l=>{locked=l;},setMode:m=>{mode=m;}};
}
test('all repair launchers dock scope controls without applying; Cancel keeps selection',()=>{
  for(const tool of ['Close Holes','Quad Cleanup','Quadify N-gons','Clean Vertices']){
    const f=fixture();assert.equal(f.api.openFromHub({tool}),true);
    assert.equal(f.calls.length,0);assert.equal(f.api.element.style.left,'50%');
    assert.equal(f.fields.get('strong').textContent,tool);
    f.click('.fr-cancel');assert.equal(f.api.active(),false);
    assert.deepEqual(f.ids(),[2]);assert.equal(f.events.at(-1).detail.tool,tool);
  }
});
test('Apply delegates once to each authoritative owner and clears rebuilt Face IDs',()=>{
  for(const [tool,owner] of [['Close Holes','__boxlabCloseHoles'],['Quad Cleanup','__boxlabQuadPairCleanup'],['Quadify N-gons','__boxlabQuadifyNgons'],['Clean Vertices','__boxlabCleanVertices']]){
    const f=fixture();f.api.openFromHub({tool});f.click('.fr-apply');f.click('.fr-apply');
    assert.equal(f.calls.filter(c=>c===owner).length,1);
    assert.equal(f.ids().length,0);assert.equal(f.api.active(),false);
    assert.equal(f.events.at(-1).type,'boxlab-selection-hub-session-complete');
  }
});
test('failed repair keeps selection and reports the owner reason',()=>{
  const f=fixture();f.setResult({ok:false,reason:'Validation failed — rolled back'});
  f.api.openFromHub({tool:'Quad Cleanup'});f.click('.fr-apply');
  assert.equal(f.api.active(),true);assert.deepEqual(f.ids(),[2]);
  assert.equal(f.events.length,0);assert.match(f.fields.get('.fr-result').textContent,/rolled back/);
});
test('availability is checked again at Apply; locked objects cannot launch',()=>{
  const f=fixture();f.api.openFromHub({tool:'Close Holes'});f.setDisabled(true);f.click('.fr-apply');
  assert.equal(f.calls.length,0);assert.equal(f.fields.get('.fr-apply').disabled,true);
  f.setDisabled(false);f.setLocked(true);assert.equal(f.api.openFromHub({tool:'Quad Cleanup'}),false);
  assert.equal(f.calls.length,0);
});
test('changing the active mesh or mode closes without repairing another context',()=>{
  for(const change of [f=>{f.context.__boxlabBridgeState.mesh={};},f=>f.setMode('edge')]){
    const f=fixture();f.api.openFromHub({tool:'Close Holes'});change(f);f.click('.fr-apply');
    assert.equal(f.api.active(),false);assert.equal(f.calls.length,0);
  }
});
test('another radial tool hides repair controls without completing its lifecycle',()=>{
  const f=fixture();f.api.openFromHub({tool:'Close Holes'});
  f.handlers.get('boxlab-selection-hub-tool')({detail:{mode:'face',tool:'Shell'}});
  assert.equal(f.api.active(),false);assert.equal(f.events.length,0);
});
