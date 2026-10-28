import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createPaintImageOverlay} from '../src/paint-image-overlay.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('src/shell-comparison.js');
const release=JSON.parse(read('version.json')).version;
const key='boxlab.shell-comparison.v1';
function fixture(profile='',options={}){
 const data=options.data||new Map(),writes=[],navigations=[],observers=[],events=new Map();let deny=options.deny||false,copyFails=false;
 class Node{
  constructor(tag='div',id=''){this.tagName=tag.toUpperCase();this.id=id;this.children=[];this.dataset={};this.attrs={};this.listeners={};this.style={};this.hidden=false;this.disabled=false;this.checked=false;this.value='';this._text='';}
  set textContent(v){this._text=v;this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
  setAttribute(k,v){this.attrs[k]=String(v);}getAttribute(k){return this.attrs[k]??null;}
  append(...nodes){for(const n of nodes){if(n.parentElement)n.parentElement.children=n.parentElement.children.filter(c=>c!==n);this.children.push(n);n.parentElement=n.parentNode=this;}}
  appendChild(n){this.append(n);return n;}
  insertBefore(n,before){this.append(n);this.children.pop();this.children.splice(this.children.indexOf(before),0,n);}
  addEventListener(k,f){(this.listeners[k]??=[]).push(f);}
  click(){if(!this.disabled)for(const f of this.listeners.click||[])f({target:this});}
  focus(){this.focused=true;}select(){this.selected=true;}
  getBoundingClientRect(){return{x:0,y:60,left:0,top:60,width:1366,height:826};}
  getContext(){return{createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData(){},setTransform(){},drawImage(){}};}
  remove(){this.parentElement.children=this.parentElement.children.filter(c=>c!==this);}
 }
 const html=new Node('html'),body=new Node('body'),app=new Node('div','app'),wrap=new Node('main','viewportWrap'),canvas=new Node('canvas','viewport'),status=new Node('span','selectionStatus'),file=new Node('details','fileMenu'),diagnostics=new Node('div','fileDiagnostics');
 canvas.width=2732;canvas.height=1652;canvas.dataset.original='yes';let inputCalls=0;canvas.addEventListener('pointerdown',()=>inputCalls++);
 status.textContent='Face mode • nothing selected • Multi';html.append(body);body.append(app);app.append(file,wrap);file.append(diagnostics);wrap.append(canvas,status);
 const all=(root=html)=>[root,...root.children.flatMap(n=>all(n))];
 const doc={documentElement:html,body,createElement:tag=>new Node(tag),querySelector:q=>q.startsWith('#')?all().find(n=>n.id===q.slice(1))||null:null};
 const storage={getItem(k){if(deny)throw Error('blocked');return data.get(k)??null;},setItem(k,v){if(deny)throw Error('blocked');if(!options.noopStorage)data.set(k,v);}};
 const c={document:doc,URL,Date,Math,window:null};
 Object.defineProperty(c,'__boxlabLoadedShellVersion',{value:options.loadedShell||release});
 c.window=c;c.location={href:'https://example.test/BoxLab/?build=0.36.18.1006'+(profile?'&shellTest='+profile:''),assign:href=>navigations.push(href)};
 c.addEventListener=(type,fn)=>events.set(type,fn);
 c.MutationObserver=class{constructor(fn){this.fn=fn;observers.push(this);}observe(root,config){this.root=root;this.config=config;this.active=true;}disconnect(){this.active=false;}};
 Object.assign(c,{localStorage:storage,innerWidth:1366,innerHeight:886,devicePixelRatio:2,navigator:{clipboard:{async writeText(v){if(copyFails)throw Error('denied');writes.push(v);}}}});
 vm.createContext(c);vm.runInContext(source,c);
 const api=c.__boxlabShellComparison,panel=doc.querySelector('#boxlabShellTest'),nodes=()=>all(panel),button=text=>nodes().find(n=>n.tagName==='BUTTON'&&n.textContent===text),role=()=>nodes().find(n=>n.attrs.role==='status');
 return{c,api,doc,html,app,wrap,canvas,status,data,writes,navigations,panel,button,nodes,role,events,observers,mutate:()=>observers.filter(o=>o.active).forEach(o=>o.fn()),deny:()=>{deny=true;},copyFail:()=>{copyFails=true;},inputCalls:()=>inputCalls};
}
test('1006 normal entry is opt-in and A preserves original canvas/UI nodes, listeners and dimensions',()=>{
 const normal=fixture();assert.equal(normal.api.mode,null);assert(normal.panel.hidden);assert.equal(normal.canvas.parentElement,normal.wrap);assert.equal(normal.html.dataset.boxlabShell,undefined);assert.equal(normal.data.size,0);
 normal.doc.querySelector('#shellComparisonBtn').click();assert.equal(normal.panel.hidden,false);assert.equal(normal.api.report().runs.length,0);
 const a=fixture('current');assert.equal(a.api.mode,'current');assert.equal(a.canvas.parentElement,a.wrap);assert.equal(a.canvas.width,2732);assert.equal(a.canvas.height,1652);assert(!a.panel.hidden);assert.equal(a.api.report().runs.length,1);assert(a.nodes().some(n=>n.textContent.includes('Rate this FIRST')));
 assert.equal(a.html.dataset.boxlabShell,undefined);assert.equal(a.c.__boxlabBridgeState,undefined);assert.equal(a.c.__boxlabHistory,undefined);
});
test('1006 B moves the SAME original canvas once before modules, keeps original viewport/UI identity and canvas input listener',()=>{
 const b=fixture('separated'),surface=b.doc.querySelector('#boxlabComparisonCanvasSurface');
 assert.equal(b.html.dataset.boxlabShell,'separated');assert.equal(surface.parentElement,b.app);assert.equal(b.canvas.parentElement,surface);assert.equal(b.status.parentElement,b.wrap);assert.equal(b.app.children.indexOf(surface)+1,b.app.children.indexOf(b.wrap));
 assert.equal(b.canvas.dataset.original,'yes');b.canvas.listeners.pointerdown[0]();assert.equal(b.inputCalls(),1);assert.equal(b.canvas.width,2732);assert.equal(b.canvas.height,1652);
 const index=read('index.html'),position=index.indexOf('<script src="./src/shell-comparison.js?');assert(position>0);assert(position<index.indexOf('<script type="module"'));assert(position<index.indexOf('src/main.js?'));
 const css=read('shell-comparison.css');assert.match(css,/html\[data-boxlab-shell="separated"\] #viewportWrap\s*\{[^}]*background:transparent;pointer-events:none/);assert.match(css,/:where\(button,input,select,textarea,summary,label,canvas/);assert.doesNotMatch(css,/contain:|isolation:|will-change:|filter:|transform:|animation:/);
});
test('1006 actual PASS/FAIL buttons persist subjective startup evidence; later passes do not erase first failure',()=>{
 const f=fixture('current');let snapshots=0;f.status.textContent='Face mode • nothing selected • Multi';f.c.__boxlabViewportRenderScale={requested:1,saved:1};f.c.__boxlabGestureDebug={uiSnapshot(){snapshots++;return{release:'1006',canvas:{width:1366},viewMenu:{open:false},elements:[],events:['not retained']};}};
 f.nodes().find(n=>n.attrs['aria-label']?.startsWith('Startup')&&n.attrs['aria-label'].endsWith('FAIL')).click();
 let run=f.api.report().runs[0];assert.equal(run.ratings.startup,'fail');assert.equal(run.observations.startup.requested,1);assert.equal(run.observations.startup.savedStartup,1);assert.equal(run.observations.startup.statusText,f.status.textContent);assert.equal(run.failure.canvas.width,1366);assert.equal(run.failure.events,undefined);assert.equal(snapshots,1);
 f.api.rate('startup','pass');f.api.rate('view','fail');run=f.api.report().runs[0];assert.equal(run.hadFailure,true);assert.equal(snapshots,1);assert.equal(JSON.parse(f.data.get(key)).runs[0].hadFailure,true);assert(f.nodes().some(n=>n.textContent.includes('1 failed')));
 assert.equal(f.navigations.length,0);assert.equal(f.canvas.style.visibility,undefined);assert.equal(f.c.__boxlabHistory,undefined);assert.equal(f.api.rate('unknown','pass'),false);
});
test('1006 results/notes survive reload and mode switch; skipped and partial loads are never counted as completed',()=>{
 const first=fixture('current');first.api.rate('startup','pass');const notes=first.nodes().find(n=>n.attrs['aria-label']==='Test observations');notes.value='right status missing at startup';notes.listeners.input[0]();
 const next=fixture('separated',{data:first.data});assert.equal(next.api.report().runs.length,2);assert.equal(next.api.report().runs[0].notes,notes.value);assert(next.nodes().some(n=>n.textContent.includes('0/5 completed')));
 for(const k of ['startup','view','gizmo','uv','paint'])next.api.rate(k,'pass');assert(next.nodes().some(n=>n.textContent.includes('B: 1/5 completed · 0 failed')));
 assert.equal(next.api.report().runs[0].mode,'current');assert.equal(next.api.report().runs[1].mode,'separated');
});
test('1006 reload/switch/exit need discard acknowledgement, persistence and idle original owners; preserve release query and resolution',()=>{
 const f=fixture('current');let scaleCalls=0;f.c.__boxlabViewportRenderScale={requested:1,saved:1,set(){scaleCalls++;}};
 assert.equal(f.api.launch('separated'),false);assert.equal(f.navigations.length,0);f.doc.querySelector('#shellTestDiscard').checked=true;
 for(const owner of [{__boxlabToolSession:{current:()=>({id:'uv-tools'})}},{__boxlabViewportPaint:{active:true}},{__boxlabFaceDirect:{dragging:()=>true}},{__boxlabFacegroupStroke:{pointerId:0}},{__boxlabBridgeState:{controls:{enabled:false}}}]){
  Object.assign(f.c,owner);assert.equal(f.api.launch('separated'),false);for(const key of Object.keys(owner))delete f.c[key];
 }
 f.button('Switch to B + reload').click();const target=new URL(f.navigations[0]);assert.equal(target.searchParams.get('shellTest'),'separated');assert.equal(target.searchParams.get('build'),'0.36.18.1006');assert.equal(scaleCalls,0);assert.equal(f.canvas.parentElement,f.wrap,'never changes profile live');
 f.button('Exit test + reload').click();assert.equal(new URL(f.navigations[1]).searchParams.has('shellTest'),false);assert(f.data.has(key));
});
test('1006 storage corruption/denial/no-op writes report honestly and prevent in-app loss of results',()=>{
 for(const options of [{deny:true},{noopStorage:true},{data:new Map([[key,'{broken']])}]){
  const f=fixture('current',options);assert.equal(f.api.report().runs.length,1);f.api.rate('startup','fail');f.doc.querySelector('#shellTestDiscard').checked=true;
  if(options.deny||options.noopStorage){assert.equal(f.api.launch('separated'),false);assert.match(f.role().textContent,/could not be saved/);assert.equal(f.navigations.length,0);}else assert.equal(f.api.launch('separated'),true);
 }
 const f=fixture('current');f.api.rate('startup','fail');f.deny();f.doc.querySelector('#shellTestDiscard').checked=true;assert.equal(f.api.launch(null),false);assert.equal(f.api.report().runs[0].ratings.startup,'fail');
});
test('1006 Copy results uses actual run log, includes current DPR/scale, and clipboard denial gives an in-app selectable fallback',async()=>{
 const f=fixture('separated');f.api.rate('startup','fail');await f.button('Copy results').listeners.click[0]();assert.equal(f.writes.length,1);const report=JSON.parse(f.writes[0]);assert.equal(report.environment.canvas.parent,'boxlabComparisonCanvasSurface');assert.equal(report.environment.dpr,2);assert.equal(report.log.runs[0].ratings.startup,'fail');
 f.copyFail();await f.button('Copy results').listeners.click[0]();const area=f.nodes().find(n=>n.attrs['aria-label']==='Screen comparison results');assert.equal(area.hidden,false);assert(area.selected);assert.match(f.role().textContent,/Finish testing before switching apps/);
});
test('1006 test log stays bounded and restores only matching build records; Collapse/reopen never changes profile or loses ratings',()=>{
 const data=new Map();for(let i=0;i<34;i++)fixture(i%2?'current':'separated',{data});const f=fixture('current',{data});assert.equal(f.api.report().runs.length,30);
 f.api.rate('startup','fail');f.button('Collapse').click();assert(f.nodes().some(n=>n.className==='shell-test-body'&&n.hidden));f.button('Test list').click();assert(f.nodes().some(n=>n.className==='shell-test-body'&&!n.hidden));assert.equal(f.api.report().runs.at(-1).ratings.startup,'fail');assert.equal(f.navigations.length,0);
 const wrong=fixture('current',{data:new Map([[key,JSON.stringify({version:1,release:'old',runs:[{mode:'current',id:'old',ratings:{startup:'fail'}}]})]])});assert.equal(wrong.api.report().runs.length,1);
});
test('1006 original Paint image overlay uses the separated canvas parent and preserves matching viewport coordinates/disposal',()=>{
 const f=fixture('separated'),prior=globalThis.document;globalThis.document=f.doc;
 try{const overlay=createPaintImageOverlay(f.canvas,{width:1,height:1,pixels:new Uint8Array([255,0,0,255])});overlay.draw({centre:[0,0],size:[1,1],rotation:0});const parent=f.canvas.parentElement,node=parent.children.find(n=>n!==f.canvas);assert.equal(node.style.left,'0px');assert.equal(node.style.top,'0px');assert.equal(node.width,1366);assert.equal(node.height,826);overlay.dispose();assert.equal(parent.children.length,1);assert.equal(parent.children[0],f.canvas);}finally{globalThis.document=prior;}
});
test('1007 existing 1006 partial ratings, notes and first failure survive the patch with original release provenance; fresh load is not pre-rated',()=>{
 const old={id:'native-a-1',mode:'current',started:'2026-10-28',ratings:{startup:'pass',view:'pass',gizmo:'pass'},notes:'UV Back obscured',failure:{release:'1006',canvas:{width:1366}},hadFailure:true};
 const data=new Map([[key,JSON.stringify({version:1,release:'0.36.18.1006',runs:[old]})]]),f=fixture('current',{data});
 const runs=f.api.report().runs;assert.equal(runs.length,2);assert.deepEqual(JSON.parse(JSON.stringify(runs[0])),{...old,release:'0.36.18.1006'});assert.equal(runs[1].release,release);assert.deepEqual(Object.keys(runs[1].ratings),[]);
 const next=fixture('separated',{data});assert.equal(next.api.report().runs[0].notes,old.notes);assert.equal(next.api.report().runs[0].release,'0.36.18.1006');assert.equal(next.api.report().runs[2].release,release);
});
test('1008 actual checklist observes original UV hidden/creation state, docks inline, fully hides/reopens and releases lifecycle observer without touching Back',()=>{
 for(const profile of ['current','separated']){
  const f=fixture(profile);f.api.rate('startup','pass');const uv=f.doc.createElement('section');uv.id='boxlabUVWorkspace';uv.hidden=true;let backCalls=0;
  const back=f.doc.createElement('button');back.addEventListener('click',()=>{backCalls++;uv.hidden=true;});uv.append(back);f.app.append(uv);f.mutate();assert.equal(f.panel.style.top,'');
  uv.hidden=false;f.mutate();assert.equal(f.panel.style.top,'50dvh');assert.equal(f.panel.style.maxHeight,'none');assert.equal(f.observers[0].root,f.app);assert.deepEqual(Array.from(f.observers[0].config.attributeFilter),['hidden']);
  f.button('Hide list').click();assert.equal(f.panel.hidden,true);const reopen=f.doc.querySelector('#shellTestReopen');assert.equal(reopen.hidden,false);assert.equal(reopen.style.display,'block');assert.equal(f.observers[0].active,false);
  assert.equal(f.api.report().runs[0].ratings.startup,'pass');reopen.click();assert.equal(f.panel.hidden,false);assert.equal(reopen.hidden,true);assert.equal(f.panel.style.top,'50dvh');assert.equal(f.observers[0].active,true);
  back.click();f.mutate();assert.equal(backCalls,1);assert.equal(f.panel.style.top,'');assert.equal(f.panel.style.bottom,'');assert.equal(back.parentElement,uv);
  f.events.get('pagehide')();assert.equal(f.observers[0].active,false);f.events.get('pageshow')();assert.equal(f.observers[0].active,true);assert.equal(f.navigations.length,0);assert.equal(f.canvas.width,2732);
 }
 const normal=fixture();assert.equal(normal.observers[0].active,undefined);normal.api.open();assert(normal.observers[0].active);
});
test('1008 prior1007 logs remain tagged correctly and running checklist code stamps itself independently of app label',()=>{
 const f=fixture('current',{data:new Map([[key,JSON.stringify({version:1,release:'0.36.18.1007',runs:[{id:'old7',mode:'current',ratings:{startup:'pass'},notes:'native screenshot1007'}]})]])});
 assert.equal(f.api.report().runs[0].release,'0.36.18.1007');assert.equal(f.api.report().runs[0].notes,'native screenshot1007');assert(f.nodes().some(n=>n.tagName==='STRONG'&&n.textContent.includes('.'+release.split('.').at(-1))));assert.equal(f.api.environment().checklistRelease,release);
});

test('1009 comparison reads immutable shell identity even when legacy label metadata is contaminated; old1008 ratings stay exact',()=>{
 const old={id:'native8',release:'0.36.18.1008',mode:'separated',ratings:{startup:'pass',view:'fail'},observations:{startup:{shellRelease:'0.36.18.450'}},notes:'original evidence',hadFailure:true};
 const data=new Map([[key,JSON.stringify({version:1,release:'0.36.18.1008',runs:[old]})]]);
 const f=fixture('separated',{data,loadedShell:release});
 const label=f.doc.createElement('span');label.id='appVersion';label.dataset.releaseVersion='0.36.18.450';f.app.append(label);
 f.api.rate('startup','pass');const runs=f.api.report().runs;assert.deepEqual(JSON.parse(JSON.stringify(runs[0])),old);assert.equal(runs[1].release,release);assert.equal(runs[1].observations.startup.shellRelease,release);assert.equal(runs[1].ratings.view,undefined);
 assert.equal(label.dataset.releaseVersion,'0.36.18.450');assert.equal(f.navigations.length,0);assert(f.nodes().some(n=>n.textContent.includes('Alternate A and B')));
});
