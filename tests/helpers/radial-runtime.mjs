import assert from 'node:assert/strict';
import vm from 'node:vm';
import {selectionHubRuntime,gizmoSource} from './selection-hub-runtime.mjs';
function section(start,end){const a=gizmoSource.indexOf(start),b=gizmoSource.indexOf(end,a);assert.ok(a>=0&&b>a);return gizmoSource.slice(a,b);}
export function radialRuntime({mode='face',sectors=[],targets={},globals={},locked=false}={}){
 const r=selectionHubRuntime({mode,globals});let open,center;
 Object.assign(r.c,{pointerId:null,toolSectors:sectors,toolCenters:[{addEventListener:(t,f)=>center=f}],
 document:{querySelector:s=>s==='#app'?{classList:{contains:()=>locked}}:targets[s]||null},
 mountGizmoCornerControls:(root,options)=>{open=options.openTools;return{sync(){},position(){}};}});
 vm.runInContext(section('function syncContextToolAvailability(){',"activator?.addEventListener(")+section('const cornerControls=mountGizmoCornerControls(', 'const toolRings=')+section('toolCenters.forEach(', '\ntoolSectors.forEach('),r.c);
 return{...r,open:()=>open(),availability:()=>r.c.syncContextToolAvailability(),center:()=>center({preventDefault(){},stopPropagation(){}})};
}
export function sector(label,mode='face',selector='#tool'){
 const classes=new Set(),attributes={};return{dataset:{toolTarget:selector},textContent:label,disabled:false,
 closest:()=>({dataset:{ringMode:mode}}),classList:{toggle:(name,value)=>value?classes.add(name):classes.delete(name)},
 setAttribute:(name,value)=>attributes[name]=value,removeAttribute:name=>delete attributes[name],classes,attributes};
}
export function target({disabled=false,active=false,pressed=null}={}){return{disabled,classList:{contains:()=>active},getAttribute:()=>pressed};}
export function assertRadialShortcut(){const r=radialRuntime();r.sync();r.puck();r.open();assert.equal(r.c.hubState,'tools');assert.equal(r.c.expanded,false);r.center();assert.equal(r.c.hubState,'closed');}
export function assertAllModeRadials(){for(const mode of ['face','edge','vertex','object']){const r=radialRuntime({mode});r.sync();r.open();assert.equal(r.c.hubState,'tools');}}
export function assertSuppression(){for(const mode of ['face','edge','vertex']){const r=selectionHubRuntime({mode});r.sync();r.c.hubSuppressedKey=r.c.lastSelectionKey;r.sync();assert.equal(r.c.root.hidden,true);r.select([1]);r.sync();assert.equal(r.c.root.hidden,false);assert.equal(r.c.hubSuppressedKey,'');}}
export function assertGenericAvailability(){for(const disabled of [false,true]){const s=sector('Extrude'),r=radialRuntime({sectors:[s],targets:{'#tool':target({disabled})}});r.availability();assert.equal(s.disabled,disabled);assert.equal(s.attributes['aria-disabled'],String(disabled));assert.equal(s.classes.has('tg-tool-unavailable'),disabled);}}
