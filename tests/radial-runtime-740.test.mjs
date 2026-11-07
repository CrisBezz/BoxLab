import test from 'node:test';
import assert from 'node:assert/strict';
import {radialRuntime,sector,target,assertRadialShortcut,assertAllModeRadials,assertSuppression,assertGenericAvailability} from './helpers/radial-runtime.mjs';
test('740 actual radial shortcut opens tools and centre returns to puck',assertRadialShortcut);
test('740 actual controller permits radials in all four modes',assertAllModeRadials);
test('740 same-selection suppression clears on new component selection',assertSuppression);
test('740 generic tool disabled state follows existing target and accessibility flags',assertGenericAvailability);
test('740 missing target is unavailable; active target shows active hint only when enabled',()=>{
 for(const [t,disabled,active] of [[null,true,false],[target({active:true}),false,true],[target({pressed:'true'}),false,true],[target({active:true,disabled:true}),true,false]]){
  const s=sector('Extrude'),r=radialRuntime({sectors:[s],targets:{'#tool':t}});r.availability();assert.equal(s.disabled,disabled);assert.equal(s.classes.has('tg-tool-active'),active);assert.equal(s.attributes['aria-disabled'],String(disabled));if(disabled)assert.match(s.title,/unavailable/);else assert.match(s.title,/active/);
 }
});
for(const [label,mode,api,method,result] of [
 ['Bevel','face','__boxlabDirectBevel','faceBevelInfo',{ok:true}],
 ['Close Holes','face','__boxlabFaceRepairViewportSession','available',true],
 ['Bevel','vertex','__boxlabVertexViewportSession','available',true],
 ['Duplicate','object','__boxlabObjectRadialSession','available',true]
])test(`740 ${mode} ${label} availability delegates to contextual owner`,()=>{
 for(const allowed of [false,true]){let calls=0;const s=sector(label,mode),r=radialRuntime({mode,sectors:[s],globals:{[api]:{[method]:()=>{calls++;return typeof result==='object'?{ok:allowed}:allowed;}}}});r.availability();assert.equal(s.disabled,!allowed);assert.equal(calls,1);}
});
test('740 locked active object disables every radial mode despite owner availability',()=>{
 for(const mode of ['face','edge','vertex','object']){const s=sector('Extrude',mode),r=radialRuntime({mode,locked:true,sectors:[s],targets:{'#tool':target()},globals:{__boxlabObjectRadialSession:{available:()=>true}}});r.availability();assert.equal(s.disabled,true);assert.equal(s.classes.has('tg-tool-unavailable'),true);}
});
test('740 guided Edge Bridge can launch through its owner while legacy target is disabled',()=>{
 const s=sector('Bridge','edge'),r=radialRuntime({mode:'edge',sectors:[s],targets:{'#tool':target({disabled:true})},globals:{__boxlabBridgeViewportSession:{canStart:ids=>{assert.deepEqual(Array.from(ids),[0]);return true;}}}});r.availability();assert.equal(s.disabled,false);
});
test('740 opening radial refreshes contextual disabled state',()=>{const s=sector('Extrude'),t=target({disabled:true}),r=radialRuntime({sectors:[s],targets:{'#tool':t}});r.open();assert.equal(s.disabled,true);t.disabled=false;r.open();assert.equal(s.disabled,false);});
