import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
function fixture({supported=true,throws=false}={}){
 const fields=new Map(),events=[],top=new Set(),listeners=new Map();
 function node(){const n={style:{},dataset:{},children:[],attrs:new Map(),hidden:false,isConnected:true,open:false,parentNode:null,
  querySelector:s=>fields.get(s)||null,querySelectorAll:()=>[],addEventListener(){},removeAttribute(k){this.attrs.delete(k);if(k==='style')this.style={};},setAttribute(k,v){this.attrs.set(k,v);},getAttribute(k){return this.attrs.get(k)??null;},
  appendChild(child){if(child.parentNode)child.parentNode.children=child.parentNode.children.filter(x=>x!==child);this.children.push(child);child.parentNode=this;return child;},prepend(child){this.appendChild(child);this.children.splice(this.children.indexOf(child),1);this.children.unshift(child);},insertBefore(child){this.appendChild(child);},replaceChildren(...items){for(const c of this.children)c.parentNode=null;this.children=[];items.forEach(c=>this.appendChild(c));}};
  if(supported){n.showPopover=function(){assert.equal(this.hidden,false);assert.equal(this.getAttribute('popover'),'manual');if(throws)throw Error('not available');top.add(this);};n.hidePopover=function(){top.delete(this);};}return n;
 }
 const drawer=node(),content=node(),summary=node(),viewport=node();summary.textContent='Active Tools';viewport.getBoundingClientRect=()=>({top:60,width:1366,height:826});
 fields.set('#editDrawer',drawer);fields.set(':scope > .drawer-content',content);fields.set(':scope > summary',summary);fields.set('#viewportWrap',viewport);
 const target=node();content.appendChild(target);
 const subscribe=(type,fn)=>{if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(fn);},unsubscribe=(type,fn)=>listeners.get(type)?.delete(fn),visual={addEventListener:subscribe,removeEventListener:unsubscribe};
 const c={document:{createElement:node,head:node(),querySelector:s=>fields.get(s)||null,querySelectorAll:()=>[],addEventListener(){}},window:{visualViewport:visual,addEventListener:subscribe,removeEventListener:unsubscribe,dispatchEvent:e=>events.push(e)},setTimeout(){},queueMicrotask:fn=>fn(),CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}},placeToolSessionPanel:host=>{host.dataset.wideToolPanel='true';Object.assign(host.style,{position:'absolute',top:'12px',left:'50%',transform:'translateX(-50%)',overflowY:'auto',zIndex:'134'});},__boxlabSelectionBridge:{mode:()=> 'object'}};
 vm.createContext(c);vm.runInContext(source,c);return{api:c.__boxlabToolSession,c,top,content,target,viewport,listeners,fields,node,events};
}
test('981 repeated UV tools open/Close elevates original host only, then removes top layer, styles and viewport residency',()=>{
 const f=fixture(),host=f.api.host,original=f.target,mesh={stable:true},history={undo:[1],redo:[]};f.c.__boxlabBridgeState={mesh};f.c.__boxlabHistory=history;
 for(let i=0;i<15;i++){
  original.hidden=false;assert.equal(f.api.begin({id:'uv-tools',node:original}),true);assert.equal(f.top.size,1);assert.equal(f.top.has(host),true);assert.equal(host.children[0],original);assert.equal(host.parentNode,f.viewport);assert.equal(host.style.position,'fixed');assert.equal(host.style.top,'72px');assert.equal(host.style.transform,'none');assert.equal(host.style.contain,'none');assert.equal(host.dataset.uvTopLayer,'true');
  original.hidden=true;assert.equal(f.api.end('uv-tools'),true);assert.equal(f.top.size,0);assert.equal(host.hidden,true);assert.equal(host.parentNode,f.content);assert.equal(host.attrs.has('popover'),false);assert.deepEqual(Object.keys(host.style),[]);assert.equal(host.dataset.wideToolPanel,undefined);assert.equal(host.dataset.viewportDock,undefined);assert.equal(original.parentNode,f.content);assert.equal(f.listeners.get('resize')?.size,0);
 }
 assert.equal(f.c.__boxlabBridgeState.mesh,mesh);assert.deepEqual(history,{undo:[1],redo:[]});assert.doesNotMatch(source,/refreshDisplay|visibility.*hidden|setInterval|requestAnimationFrame/);
});
test('981 UV Editor handoff releases top layer before original workspace, retains logical session until Back/Close',()=>{
 const f=fixture();f.api.begin({id:'uv-tools',node:f.target});assert.equal(f.top.size,1);f.target.hidden=true;assert.equal(f.api.suspendSurface('uv-tools'),true);assert.equal(f.top.size,0);assert.equal(f.api.host.hidden,true);assert.equal(f.api.current().id,'uv-tools');assert.equal(f.listeners.get('resize')?.size,0);f.api.end('uv-tools');assert.equal(f.api.host.parentNode,f.content);
 const health=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');assert.match(health,/panel.hidden=true;toolSession\(\)\?\.suspendSurface\?\.\(sessionId\(\)\)/);
});
test('981 window/visual resize tracks viewport top without canvas resize or retained listeners',()=>{
 const f=fixture();f.api.begin({id:'uv-tools',node:f.target});f.viewport.getBoundingClientRect=()=>({top:80});for(const fn of f.listeners.get('resize'))fn();assert.equal(f.api.host.style.top,'92px');assert.equal(f.api.host.style.maxHeight,'calc(100dvh - 104px)');f.api.end('uv-tools');assert.equal(f.listeners.get('resize').size,0);
});
test('981 other tools keep original dock; switching UV to Array releases UV layer and style before new settings',()=>{
 const f=fixture();f.api.begin({id:'uv-tools',node:f.target});const next=f.node();f.content.appendChild(next);f.api.begin({id:'array',node:next});assert.equal(f.top.size,0);assert.equal(f.api.host.getAttribute('popover'),null);assert.equal(f.api.host.style.position,'absolute');assert.equal(f.api.host.style.top,'12px');assert.equal(f.api.host.style.transform,'translateX(-50%)');assert.equal(f.api.host.children[0],next);assert.equal(f.target.parentNode,f.content);
});
test('981 unsupported or failed popover safely retains transform-free fallback and fully cleans on close',()=>{
 for(const options of [{supported:false},{throws:true}]){const f=fixture(options);assert.equal(f.api.begin({id:'uv-tools',node:f.target}),true);assert.equal(f.top.size,0);assert.equal(f.api.host.getAttribute('popover'),null);assert.equal(f.api.host.style.position,'absolute');assert.equal(f.api.host.style.top,'12px');assert.equal(f.api.host.style.contain,'none');f.api.end('uv-tools');assert.equal(f.api.host.parentNode,f.content);assert.deepEqual(Object.keys(f.api.host.style),[]);}
});
