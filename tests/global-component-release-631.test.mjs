import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {wireCube,edgeHoldRuntime} from './helpers/edge-hold-runtime.mjs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

// Actual registration callbacks; controlled capture dispatch and completion spies
// establish routing. The separate existing owner fixture executes real Edge holds.
function terminalRouting(type,source=main){
  const lines=source.split('\n').filter(line=>line.startsWith('window.addEventListener(')&&line.includes('finishFaceHold(event)'));
  const listeners=[],calls=[];
  vm.runInNewContext(lines.join('\n'),{
    window:{addEventListener:(kind,fn,capture)=>listeners.push({kind,fn,capture})},
    finishVertexHold:event=>calls.push({mode:'vertex',event}),
    finishFaceHold:event=>calls.push({mode:'face',event}),
    finishEdgeHold:event=>calls.push({mode:'edge',event}),
  });
  const owned=listeners.filter(l=>l.kind===type);assert.equal(owned.length,1);
  assert.equal(owned[0].capture,true,'completion must precede consuming document owners');
  const event={type,pointerId:71,target:{id:'gizmo-hit'},stopImmediatePropagation(){this.stopped=true;}};
  // Simulated window capture before a later consuming document listener.
  owned[0].fn(event);event.stopImmediatePropagation();
  assert.deepEqual(calls.map(c=>c.mode),['vertex','face','edge']);
  for(const call of calls)assert.equal(call.event,event);
}
function terminalBehaviour(type){
  terminalRouting(type);
  const f=edgeHoldRuntime(wireCube(),[6]),before=f.state.mesh.clone(),p=f.hold();
  f.pointer('pointermove',{clientX:p.x+32,clientY:p.y});
  const preview=[...f.ids()];assert.ok(preview.length>1);
  f.pointer(type,{clientX:p.x+32,clientY:p.y});
  assert.deepEqual(f.ids(),type==='pointercancel'?[6]:preview);
  assert.equal(f.context.__boxlabModelessSelection.browsing(1),false);
  assert.equal(vm.runInContext('edgeHold',f.context),null);
  assert.deepEqual(f.state.mesh.vertices,before.vertices);
  assert.deepEqual(Array.from(f.state.mesh.faces),Array.from(before.faces));
  assert.deepEqual(f.state.mesh.looseEdges,before.looseEdges);
  assert.equal(f.history.undoStack.length,0);
  const final=[...f.ids()];f.run(1000);assert.deepEqual(f.ids(),final);
}

const checks=[
  ['Face/Edge hold release uses window capture',()=>terminalBehaviour('pointerup')],
  ['Face/Edge hold cancel uses window capture',()=>terminalBehaviour('pointercancel')],
  ['Face hold release logs actual target',main.includes("'FACE HOLD POINTERUP'")&&main.includes("target:event.target?.id||event.target?.tagName||'unknown'")],
  ['Pending Paint release uses window capture',paint.includes("window.addEventListener('pointerup', endPaint, true)")],
  ['Pending Paint cancel uses window capture',paint.includes("window.addEventListener('pointercancel', event=>")],
  ['Main module reviewed cache pin',hasAssetReference(index,'main.js')],
  ['Paint module reviewed cache pin',hasAssetReference(index,'edge-paint-select.js')],
  ['current release',shellReleaseMatches(index,version.version)],
  ['Protected multi-object transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

for(const [name,ok] of checks)test("global-component-release-631.test: "+name,()=>typeof ok==='function'?ok():assert.equal(ok,true,name));

test('hold terminal routing rejects omitted modes and late capture',()=>{
  for(const type of ['pointerup','pointercancel']){
    const line=main.split('\n').find(s=>s.startsWith(`window.addEventListener('${type}',`)&&s.includes('finishFaceHold(event)'));
    assert.ok(line);
    for(const broken of [line.replace('finishVertexHold(event);',''),line.replace('finishFaceHold(event);',''),line.replace('finishEdgeHold(event);',''),line.replace('},true);','},false);')]){
      assert.notEqual(broken,line);assert.throws(()=>terminalRouting(type,main.replace(line,broken)));
    }
  }
});
