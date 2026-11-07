import test from 'node:test';
import assert from 'node:assert/strict';
import {selectionHubRuntime,assertComponentPuck,assertSelectionCollapses,assertObjectFull,assertCollapsedCSS} from './helpers/selection-hub-runtime.mjs';
for(const mode of ['vertex','edge','face']){
 test(`739 ${mode} selection starts puck, expands and closes radial through actual controller`,()=>{
  const r=assertComponentPuck(mode);assert.deepEqual(r.puck(),{prevented:1,stopped:1});assert.equal(r.c.hubState,'transform');assert.equal(r.c.root.dataset.expanded,'true');
  r.c.setHubState('tools');assert.equal(r.c.expanded,false);assert.equal(r.c.root.dataset.hubState,'tools');
  r.c.setHubState('closed');assert.equal(r.c.root.dataset.expanded,'false');
 });
 test(`739 ${mode} changing selection collapses gizmo and clears same-selection suppression`,()=>{
  const r=assertComponentPuck(mode);r.puck();r.c.hubSuppressedKey=r.c.lastSelectionKey;r.select([1]);r.sync();assert.equal(r.c.hubState,'closed');assert.equal(r.c.root.hidden,false);assert.equal(r.c.hubSuppressedKey,'');
 });
 test(`739 ${mode} empty selection hides gizmo and reselect restores puck`,()=>{
  const r=assertComponentPuck(mode);r.puck();r.select([]);r.sync();assert.equal(r.c.root.hidden,true);assert.equal(r.c.lastSelectionKey,'');r.select([0]);r.sync();assert.equal(r.c.hubState,'closed');assert.equal(r.c.root.hidden,false);
 });
 test(`739 ${mode} active session hides gizmo and completion returns surviving selection to puck`,()=>{
  let active=true;const name={vertex:'__boxlabVertexViewportSession',edge:'__boxlabEdgeViewportSession',face:'__boxlabFaceRepairViewportSession'}[mode];
  const r=selectionHubRuntime({mode,globals:{[name]:{active:()=>active}}});r.sync();assert.equal(r.c.root.hidden,true);active=false;
  r.complete({mode,tool:mode==='edge'?'Slide':'Clean Vertices'});r.sync();assert.equal(r.c.root.hidden,false);assert.equal(r.c.hubState,'closed');assert.equal(r.c.expanded,false);assert.ok(r.calls.some(x=>x.stage==='reset'));
 });
 test(`739 ${mode} completion with lost selection keeps gizmo hidden`,()=>{
  const r=assertComponentPuck(mode);r.select([]);r.complete({mode,tool:'Bevel'});r.sync();assert.equal(r.c.root.hidden,true);
 });
}
test('739 actual selection-collapse and Object-full contracts',()=>{assertSelectionCollapses();assertObjectFull();});
test('739 collapsed transform handles reject input and CSS excludes SVG outside transform state',()=>{assertCollapsedCSS();});
test('739 Face transform suspension resumes once when returning to puck',()=>{
 let suspend=0,resume=0;const r=selectionHubRuntime({globals:{__boxlabFaceDirect:{suspendForTransform:()=>{suspend++;return true;},resumeAfterTransform:()=>{resume++;return true;}}}});r.sync();r.puck();r.puck();assert.equal(suspend,1);r.c.setHubState('tools');assert.equal(resume,0);r.c.setHubState('closed');r.c.setHubState('closed');assert.equal(resume,1);assert.equal(r.c.suspendedFaceTool,false);
});
test('739 Align hides gizmo in every mode and clearing owner restores selection UI',()=>{
 for(const mode of ['vertex','edge','face','object']){let active=true;const r=selectionHubRuntime({mode,globals:{__boxlabComponentAlignViewportSession:{active:()=>active}}});r.sync();assert.equal(r.c.root.hidden,true);active=false;r.sync();assert.equal(r.c.root.hidden,false);}
});
test('739 mode transition uses new component selection and Object transform baseline',()=>{
 const r=assertComponentPuck();r.puck();r.mode('edge');r.sync();assert.equal(r.c.hubState,'closed');r.mode('object');r.sync();assert.equal(r.c.hubState,'transform');r.mode('vertex');r.sync();assert.equal(r.c.hubState,'closed');
});
test('739 Object completion restores gizmo, empty Multi remains hidden',()=>{
 const r=selectionHubRuntime({mode:'object'});r.sync();r.c.objectTransformDismissed=true;r.complete({mode:'object',tool:'Duplicate'});r.sync();assert.equal(r.c.objectTransformDismissed,false);assert.equal(r.c.hubState,'transform');r.c.__boxlabObjectSelection.multi=true;r.c.__boxlabObjectSelection.ids.clear();r.sync();assert.equal(r.c.root.hidden,true);
});
test('739 edge extrude close disarms owners and preserves selected edges at puck',()=>{
 let disarmed=0;const r=selectionHubRuntime({mode:'edge',ids:[0,1],globals:{__boxlabEdgeExtrude:{setArmed:value=>{assert.equal(value,false);disarmed++;}},__boxlabTransformArming:{disarm:()=>disarmed++}}});r.sync();r.c.edgeExtrudeConstraintSession=true;r.c.setHubState('transform');r.c.setHubState('closed');r.sync();assert.equal(disarmed,2);assert.equal(r.c.hubState,'closed');assert.equal(r.c.expanded,false);assert.equal(r.c.root.hidden,false);assert.deepEqual(Array.from(r.c.__boxlabSelectionBridge.indices()),[0,1]);assert.equal(r.c.edgeExtrudeConstraintSession,false);
});
