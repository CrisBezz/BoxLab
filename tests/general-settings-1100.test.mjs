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
 const r=runtime({snapTop:true,selectTop:true});
 assert.equal(r.api.getGeneralSettings().pencilOrbit,true);
 assert.equal(r.api.getGeneralSettings().pencilSelection,true);
 assert.equal(r.api.getGeneralSettings().snapTop,undefined);
 assert.equal(r.api.getGeneralSettings().leftHanded,false);
 assert.equal(r.api.setGeneralSetting('snapTop',true),false);
 r.api.setGeneralSetting('leftHanded',true);
 const saved=JSON.parse(r.values.get('boxlab.general-settings.v1'));
 assert.equal(saved.snapTop,undefined);
 assert(r.classes.has('boxlab-left-handed'));
 const restored=runtime(saved);
 assert.equal(restored.api.getGeneralSettings().leftHanded,true);
 assert.equal(restored.api.getGeneralSettings().selectTop,true);
 assert.equal(r.api.setGeneralSetting('unknown',true),false);
});

test('General Settings exposes the remaining toggles in the View panel and synchronizes their state',()=>{
 const r=runtime();let change;
 const inputs=[];const section={className:'',id:'',attrs:{},listeners:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,f){this.listeners[k]=f;},querySelectorAll(){return inputs;},set innerHTML(markup){this.markup=markup;for(const [,key]of markup.matchAll(/data-general-setting="([^"]+)"/g))inputs.push({dataset:{generalSetting:key},checked:false});}};
 const host={children:[],querySelector(){return null;},append(node){this.children.push(node);}};
 r.context.document.createElement=()=>section;r.context.document.head.append=()=>{};
 r.api.mountGeneralSettings({querySelector:()=>host});assert.equal(host.children[0],section);assert.deepEqual(inputs.map(input=>input.dataset.generalSetting),['pencilOrbit','pencilSelection','modeTop','selectTop','leftHanded']);
 inputs[4].checked=true;section.listeners.change({target:{closest:()=>inputs[4]}});assert.equal(r.api.getGeneralSettings().leftHanded,true);assert.equal(inputs[4].checked,true);
});

test('top panels retain Mode / Select order and an eight pixel gap',()=>{
 const r=runtime(),positions={};
 r.context.document.documentElement.style={setProperty:(k,v)=>positions[k]=v};
 let modeHeight=52;
 r.context.document.querySelector=q=>q==='#selectionModes'?{getBoundingClientRect:()=>({height:modeHeight})}:null;
 for(const modeTop of [false,true]){
  r.api.setGeneralSetting('modeTop',modeTop);
  r.api.setGeneralSetting('selectTop',true);
  vm.runInContext('layoutTopPanels()',r.context);
  assert.equal(positions['--boxlab-select-top'],modeTop?'68px':'8px');
 }
 modeHeight=48;
 vm.runInContext('layoutTopPanels()',r.context);
 assert.equal(positions['--boxlab-select-top'],'64px');
});


test('1176 moving Mode to top removes its reserved bottom slot at both viewport widths',()=>{
 const r=runtime();
 r.api.setGeneralSetting('modeTop',true);assert(r.classes.has('boxlab-mode-top'));
 assert.match(source,/html\.boxlab-mode-top #viewportWrap\{--viewport-action-bottom:max\(27px,calc\(env\(safe-area-inset-bottom\) \+ 23px\)\)!important\}/);
 assert.match(source,/@media\(max-width:900px\)\{html\.boxlab-mode-top #viewportWrap\{--viewport-action-bottom:max\(25px,calc\(env\(safe-area-inset-bottom\) \+ 21px\)\)!important\}\}/);
 r.api.setGeneralSetting('modeTop',false);assert(!r.classes.has('boxlab-mode-top'));
});
