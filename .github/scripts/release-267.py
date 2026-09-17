from pathlib import Path

main=Path('src/main.js')
s=main.read_text()
old="""const hit=pick(event);if(!hit){if(!multiSelectEnabled)clearSelection();renderMesh();return;}const alreadySelected=hit.type==='object'?selection?.type==='object':selectionHas(hit.type,hit.index);if(multiSelectEnabled&&selectionMode!=='object'&&!alreadySelected){toggleSelection(hit);if(hit.type==='edge'&&selectionHas('edge',hit.index))selectedEdgeCutT=edgeTapFraction(hit.index,event);renderMesh();return;}
 if(!alreadySelected){selection=hit.type==='object'?hit:makeSelection(hit.type,[hit.index],hit.index);if(hit.type==='edge')selectedEdgeCutT=edgeTapFraction(hit.index,event);renderMesh();return;}"""
new="""const hit=pick(event);if(!hit){clearSelection();renderMesh();return;}const alreadySelected=hit.type==='object'?selection?.type==='object':selectionHas(hit.type,hit.index);if(selectionMode!=='object'&&!alreadySelected){toggleSelection(hit);if(hit.type==='edge'&&selectionHas('edge',hit.index))selectedEdgeCutT=edgeTapFraction(hit.index,event);renderMesh();return;}
 if(!alreadySelected){selection=hit.type==='object'?hit:makeSelection(hit.type,[hit.index],hit.index);if(hit.type==='edge')selectedEdgeCutT=edgeTapFraction(hit.index,event);renderMesh();return;}"""
if old not in s: raise SystemExit('selection entry block not found')
s=s.replace(old,new,1)

old_drag="""drag={kind:'component',pointerId:event.pointerId,selection:selection?.type==='object'?{type:'object',index:0}:{type:selection.type,index:selection.index,indices:[...selectionIndices()]},start,last:start?.clone(),plane,startMesh:mesh.clone(),center:center.clone(),axisScreens:projectedWorldAxes(center),axisLock:null,inferenceSnap:null,startX:event.clientX,startY:event.clientY,changed:false,armed:false};"""
new_drag="""drag={kind:'component',pointerId:event.pointerId,selection:selection?.type==='object'?{type:'object',index:0}:{type:selection.type,index:selection.index,indices:[...selectionIndices()]},tapHit:selectionMode==='object'?null:{type:hit.type,index:hit.index},start,last:start?.clone(),plane,startMesh:mesh.clone(),center:center.clone(),axisScreens:projectedWorldAxes(center),axisLock:null,inferenceSnap:null,startX:event.clientX,startY:event.clientY,changed:false,armed:false};"""
if old_drag not in s: raise SystemExit('component drag block not found')
s=s.replace(old_drag,new_drag,1)

old_end="""function endDrag(event){if(!drag||drag.pointerId!==event.pointerId)return;const current=drag;drag=null;controls.enabled=true;if(current.kind==='vertexBevel'){if(current.preview&&event.type==='pointerup'){history.push(current.startMesh);clearSelection();}else mesh=current.startMesh;}renderMesh();}"""
new_end="""function endDrag(event){if(!drag||drag.pointerId!==event.pointerId)return;const current=drag;drag=null;controls.enabled=true;if(current.kind==='vertexBevel'){if(current.preview&&event.type==='pointerup'){history.push(current.startMesh);clearSelection();}else mesh=current.startMesh;}else if(current.kind==='component'&&!current.armed&&event.type==='pointerup'&&current.tapHit){toggleSelection(current.tapHit);if(current.tapHit.type==='edge')selectedEdgeCutT=.5;}renderMesh();}"""
if old_end not in s: raise SystemExit('endDrag block not found')
s=s.replace(old_end,new_end,1)
main.write_text(s)

index=Path('index.html')
h=index.read_text()
old_multi='<label class="selection-icon multi-icon"><input id="multiSelectToggle" type="checkbox"/><span>Multi</span></label>'
if old_multi not in h: raise SystemExit('Multi UI block not found')
h=h.replace(old_multi,'<input id="multiSelectToggle" type="checkbox" hidden/>',1)
h=h.replace('<script type="module" src="./src/edge-toggle-repair.js?v=0.21.3"></script>','',1)
h=h.replace('./src/main.js?v=0.35.9.4','./src/main.js?v=0.36.18.267',1)
h=h.replace('BoxLab v0.36.18.266','BoxLab v0.36.18.267')
h=h.replace('v0.36.18.266</span>','v0.36.18.267</span>')
h=h.replace('./src/loose-bootstrap.js?v=0.36.18.266','./src/loose-bootstrap.js?v=0.36.18.267')
index.write_text(h)
Path('version.json').write_text('{"version":"0.36.18.267"}\n')

test=Path('tests/unified-toggle-selection.test.mjs')
test.write_text("""import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('component taps add regardless of legacy Multi state',()=>{
  assert.match(main,/if\\(selectionMode!=='object'&&!alreadySelected\\)\\{toggleSelection\\(hit\\)/);
  assert.doesNotMatch(main,/multiSelectEnabled&&selectionMode!=='object'&&!alreadySelected/);
});

test('selected component tap records exact hit and toggles it off on pointer-up',()=>{
  assert.match(main,/tapHit:selectionMode==='object'\\?null:\\{type:hit\\.type,index:hit\\.index\\}/);
  assert.match(main,/current\\.kind==='component'&&!current\\.armed&&event\\.type==='pointerup'&&current\\.tapHit/);
  assert.match(main,/toggleSelection\\(current\\.tapHit\\)/);
});

test('blank component-area tap clears selection without Multi mode distinction',()=>{
  assert.match(main,/const hit=pick\\(event\\);if\\(!hit\\)\\{clearSelection\\(\\);renderMesh\\(\\);return;\\}/);
});

test('legacy Multi control is hidden and edge-only toggle repair is retired',()=>{
  assert.match(index,/<input id=\\"multiSelectToggle\\" type=\\"checkbox\\" hidden\\/>/);
  assert.doesNotMatch(index,/edge-toggle-repair\\.js/);
});
""")
