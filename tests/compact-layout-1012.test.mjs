import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {selectionHubRuntime} from './helpers/selection-hub-runtime.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
function runtime({denied=false,saved=false}={}){
 const handlers={},classes=new Set(),button={addEventListener:(t,fn)=>button[t]=fn},body={nodeType:1,querySelectorAll:()=>[]},storage=new Map(saved?[['boxlab.compact-layout.v1','1']]:[]);
 let callback,observes=0,disconnects=0;
 const c={innerWidth:678,innerHeight:886,document:{body,documentElement:{classList:{toggle:(k,on)=>on?classes.add(k):classes.delete(k)}},querySelector:()=>button},
  sessionStorage:{getItem:k=>{if(denied)throw Error();return storage.get(k);},setItem:(k,v)=>{if(denied)throw Error();storage.set(k,v);}},
  window:{addEventListener:(t,fn)=>handlers[t]=fn},MutationObserver:class{constructor(fn){callback=fn;}observe(){observes++;}disconnect(){disconnects++;}}};
 vm.createContext(c);vm.runInContext(read('src/compact-layout.js'),c);
 return{c,button,body,handlers,classes,storage,added:n=>callback([{addedNodes:[n]}]),counts:()=>({observes,disconnects})};
}
test('1012 narrow pane remains opt-in, session choice works with denied storage and normal layout returns on wide resize',()=>{
 for(const denied of [false,true]){
  const r=runtime({denied}),api=r.c.__boxlabCompactLayout;
  assert.equal(api.active,false);r.button.click();assert.equal(api.active,true);assert(r.classes.has('boxlab-compact-ui'));
  r.c.innerWidth=1366;r.handlers.resize();assert.equal(api.active,false);assert(!r.classes.has('boxlab-compact-ui'));
  r.c.innerWidth=678;r.handlers.resize();assert.equal(api.active,true);
  r.handlers.pagehide();assert.equal(r.counts().disconnects,1);r.handlers.pageshow();assert.equal(api.active,true);assert.equal(r.counts().observes,2);
 }
 assert.equal(runtime({saved:true}).c.__boxlabCompactLayout.active,true);
});
test('1012 late original Paint controls gain labels/compact coordinates without changing normal positions, routing text or handlers',()=>{
 const r=runtime(),attrs={},style={left:'175px',top:'43px',setProperty(k,v){this[k]=v;}},listener=()=>{};
 const item={nodeType:1,textContent:'Brush',style,listener,matches:()=>true,querySelectorAll:()=>[],getAttribute:k=>attrs[k],hasAttribute:k=>k in attrs,setAttribute:(k,v)=>attrs[k]=v,closest:()=>({})};
 r.added(item);assert.equal(attrs['aria-label'],'Brush');assert.equal(attrs.title,'Brush');assert.equal(item.textContent,'Brush');assert.equal(item.listener,listener);assert.equal(style.left,'175px');assert.equal(style.top,'43px');assert.equal(style['--compact-x'],'146px');assert.equal(style['--compact-y'],'40.39999999999999px');
});
test('1012 tool-picker fit bounds and actual sync move only picker; transform stays at selection',()=>{
 const layout=runtime().c.__boxlabCompactLayout;
 for(const width of [320,390,450,678,760]){
  const fit=layout.placeRadial(-200,999,width,826),half=width<=400?104:fit.radius+26;
  assert(fit.left-half>=8);assert(fit.left+half<=width-8);
  assert(fit.top+(width<=400?164:fit.radius+26)<=826-80);
 }
 const r=selectionHubRuntime({mode:'object',globals:{__boxlabCompactLayout:{active:true,placeRadial:()=>({left:300,top:350,radius:200})}}});
 r.c.root.style.setProperty=()=>{};r.sync();assert.equal(r.c.root.style.left,'100px');r.c.setHubState('tools');r.sync();assert.equal(r.c.root.style.left,'300px');r.c.setHubState('transform');r.sync();assert.equal(r.c.root.style.left,'100px');
});
test('1012 compact CSS preserves regular layout and labels while extra-narrow grid is restricted to active mode',()=>{
 const css=read('compact-layout.css'),html=read('index.html');
 assert.match(html,/id="continueCompactView"/);assert.match(html,/src="\.\/src\/compact-layout\.js\?v=/);
 assert.match(css,/html\.boxlab-compact-ui #app\{display:block!important\}/);
 for(const mode of ['face','edge','vertex','object'])assert(css.includes(`[data-mode="${mode}"] .tg-tool-ring[data-ring-mode="${mode}"]`));
 assert(!css.includes('.tg-tool-ring:not([hidden])'));
 assert(!read('src/compact-layout.js').match(/dispatchEvent|requestAnimationFrame|setInterval|__boxlabHistory|__boxlabBridgeState/));
});
