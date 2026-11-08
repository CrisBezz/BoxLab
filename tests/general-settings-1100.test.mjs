import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../src/general-settings.js',import.meta.url),'utf8')
 .replace('export function getGeneralSettings','function getGeneralSettings')
 .replace('export function setGeneralSetting','function setGeneralSetting')
 .replace('export function mountGeneralSettings','function mountGeneralSettings')
 .replace("globalThis.__boxlabGeneralSettings={get:getGeneralSettings,set:setGeneralSetting};","globalThis.__boxlabGeneralSettings={get:getGeneralSettings,set:setGeneralSetting};globalThis.__settingsTest={getGeneralSettings,setGeneralSetting,mountGeneralSettings};");

function runtime(saved=null){
 const values=new Map(saved?[["boxlab.general-settings.v1",JSON.stringify(saved)]]:[]),classes=new Set(),events=[];
 const document={documentElement:{classList:{toggle(name,on){on?classes.add(name):classes.delete(name);}}},head:{append(node){node.parentNode=this;}}};
 const window={dispatchEvent:event=>events.push(event)};
 class CustomEvent{constructor(type,options={}){this.type=type;this.detail=options.detail;}}
 const context={document,window,localStorage:{getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)},CustomEvent,globalThis:null};context.globalThis=context;
 vm.createContext(context);vm.runInContext(source,context);
 return{api:context.__settingsTest,values,classes,events,context};
}

test('general preferences have safe defaults, persist changes and restore saved choices',()=>{
 const r=runtime();assert.equal(r.api.getGeneralSettings().pencilOrbit,true);assert.equal(r.api.getGeneralSettings().pencilSelection,true);assert.equal(r.api.getGeneralSettings().snapTop,false);assert.equal(r.api.getGeneralSettings().leftHanded,false);
 r.api.setGeneralSetting('leftHanded',true);r.api.setGeneralSetting('snapTop',true);assert.equal(r.values.get('boxlab.general-settings.v1'),'{"pencilOrbit":true,"pencilSelection":true,"snapTop":true,"leftHanded":true}');assert(r.classes.has('boxlab-left-handed'));assert(r.classes.has('boxlab-snap-top'));
 const restored=runtime(JSON.parse(r.values.get('boxlab.general-settings.v1')));assert.equal(restored.api.getGeneralSettings().leftHanded,true);assert.equal(restored.api.getGeneralSettings().snapTop,true);
 assert.equal(r.api.setGeneralSetting('unknown',true),false);
});

test('General Settings exposes four toggles in the View panel and synchronizes their state',()=>{
 const r=runtime();let change;
 const inputs=[];const section={className:'',id:'',attrs:{},listeners:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,f){this.listeners[k]=f;},querySelectorAll(){return inputs;},set innerHTML(markup){this.markup=markup;for(const [,key]of markup.matchAll(/data-general-setting="([^"]+)"/g))inputs.push({dataset:{generalSetting:key},checked:false});}};
 const host={children:[],querySelector(){return null;},append(node){this.children.push(node);}};
 r.context.document.createElement=()=>section;r.context.document.head.append=()=>{};
 r.api.mountGeneralSettings({querySelector:()=>host});assert.equal(host.children[0],section);assert.deepEqual(inputs.map(input=>input.dataset.generalSetting),['pencilOrbit','pencilSelection','snapTop','leftHanded']);
 inputs[3].checked=true;section.listeners.change({target:{closest:()=>inputs[3]}});assert.equal(r.api.getGeneralSettings().leftHanded,true);assert.equal(inputs[3].checked,true);
});
