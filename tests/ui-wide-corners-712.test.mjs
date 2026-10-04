import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {layoutWideToolPanel} from '../src/tool-session-wide-layout.js';
import {mountGizmoCornerControls} from '../src/gizmo-corner-controls.js';
const source=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
function dom(){
 let doc;const observers=[];
 class Node{
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.style={};this.dataset={};this.hidden=false;this.disabled=false;this.listeners=new Map();this.attrs=new Map();this._text='';this.className='';this.ownerDocument=doc;this.classList={contains:c=>this.className.split(' ').includes(c)};}
  get firstChild(){return this.children[0]||null;}get firstElementChild(){return this.firstChild;}get parentElement(){return this.parentNode||null;}
  appendChild(n){if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(c=>c!==n);this.children.push(n);n.parentNode=this;return n;}append(...ns){ns.forEach(n=>this.appendChild(n));}
  get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}set textContent(s){this._text=s;this.children=[];}
  setAttribute(k,v){this.attrs.set(k,String(v));}getAttribute(k){return this.attrs.get(k)||null;}
  addEventListener(t,f){const list=this.listeners.get(t)||[];list.push(f);this.listeners.set(t,list);}dispatch(t){const e={preventDefault(){},stopPropagation(){}};for(const f of this.listeners.get(t)||[])f(e);}click(){this.dispatch('click');}
  querySelectorAll(s){const nodes=[];const visit=n=>{for(const c of n.children){if(s==='button'&&c.tagName==='BUTTON'||s.startsWith('#')&&c.id===s.slice(1))nodes.push(c);visit(c);}};visit(this);return nodes;}querySelector(s){return this.querySelectorAll(s)[0]||null;}
 }
 doc={createElement:t=>new Node(t),defaultView:{MutationObserver:class{constructor(f){observers.push(f);}observe(){}}},getElementById:id=>doc.head.querySelector('#'+id)||doc.body.querySelector('#'+id),querySelector:s=>doc.body.querySelector(s),querySelectorAll:s=>s==='#objectManagementTools button'?(doc.getElementById('objectManagementTools')?.querySelectorAll('button')||[]):doc.body.querySelectorAll(s)};doc.head=new Node('head');doc.body=new Node('body');doc.documentElement={classList:{contains:()=>false}};
 function parse(html,node){const stack=[node];for(const token of html.match(/<[^>]*>|[^<]+/g)||[]){if(token.startsWith('</')){stack.pop();continue;}if(token.startsWith('<')){const tag=token.match(/^<([\w-]+)/)?.[1];if(!tag)continue;const child=new Node(tag);for(const [,k,v] of token.matchAll(/([\w-]+)="([^"]*)"/g)){if(k==='class')child.className=v;else if(k==='id')child.id=v;else if(k.startsWith('data-'))child.dataset[k.slice(5).replace(/-([a-z])/g,(_,l)=>l.toUpperCase())]=v;else child.setAttribute(k,v);}child.hidden=/\bhidden(?:\s|\/|>)/.test(token);stack.at(-1).appendChild(child);if(!['input','br','hr'].includes(tag)&&!token.endsWith('/>'))stack.push(child);}else stack.at(-1)._text+=token;}}
 return{doc,Node,parse,observe:()=>observers.forEach(f=>f())};
}
test('Actual Symmetry and Array markup keeps every original control and listener with Cancel/Apply stacked on right',()=>{
 for(const [module,id] of [['symmetry-bisect.js','symmetryBisectSession'],['linear-array.js','linearArraySession']]){const f=dom(),panel=f.doc.createElement('div');panel.id=id;f.doc.body.appendChild(panel);f.parse(source(module).match(/controls.innerHTML=`([\s\S]*?)`;/)[1],panel);const buttons=panel.querySelectorAll('button'),seen=[];for(const b of buttons)b.addEventListener('click',()=>seen.push(b.id||b.textContent.trim()));layoutWideToolPanel(panel);
  assert.equal(panel.dataset.wideToolPanel,'true');assert.equal(panel.children[0].className,'ts-wide-body');assert.equal(panel.children[1].className,'ts-wide-actions');assert.deepEqual(new Set(panel.querySelectorAll('button')),new Set(buttons));const rail=panel.children[1];assert.match(rail.children[0].textContent,/Cancel/);assert.match(rail.children[1].textContent,/Apply/);for(const b of buttons)b.click();assert.equal(seen.length,buttons.length);
  const count=panel.children.length;layoutWideToolPanel(panel);assert.equal(panel.children.length,count);assert.ok(f.doc.getElementById('toolSessionWideStyle').textContent.includes('grid-template-columns:minmax(0,1fr) 104px'));
 }
});
test('Wide layout respects hidden stage of Apply, retains button identity and delegated panel ancestry',()=>{
 const f=dom(),panel=f.doc.createElement('div');f.doc.body.appendChild(panel);f.parse('<div id="stage" hidden><button id="apply">Apply Sweep</button></div><button id="cancel">Cancel Sweep</button>',panel);const stage=panel.querySelector('#stage'),apply=panel.querySelector('#apply');layoutWideToolPanel(panel);assert.equal(apply.style.display,'none');stage.hidden=false;f.observe();assert.equal(apply.style.display,'');assert.equal(apply.parentElement.parentElement,panel);stage.hidden=true;layoutWideToolPanel(panel);assert.equal(apply.style.display,'none');
});
test('Original Object node docks inside host; lazy operand/report nodes join body; hidden panels cannot reappear',()=>{
 const f=dom(),host=f.doc.createElement('div');host.id='boxlabToolSessionHost';const node=f.doc.createElement('div');f.parse('<strong>Boolean</strong><button>Close</button>',node);host.appendChild(node);layoutWideToolPanel(host);assert.equal(node.dataset.wideToolLayout,'true');const operand=f.doc.createElement('div');operand.id='booleanOperand218';node.appendChild(operand);f.observe();assert.equal(operand.parentElement.className,'ts-wide-body');assert.match(f.doc.getElementById('toolSessionWideStyle').textContent,/data-wide-tool-layout="true"\]\[hidden\]\{display:none!important/);
});
test('Non-terminal tools stay unchanged; no clone/replacement/viewport gesture is introduced by presentation helper',()=>{
 const f=dom(),panel=f.doc.createElement('div');f.parse('<button>Move</button><button>Keep +</button>',panel);const nodes=[...panel.children];layoutWideToolPanel(panel);assert.deepEqual(panel.children,nodes);assert.equal(panel.dataset.wideToolLayout,undefined);assert.doesNotMatch(source('tool-session-wide-layout.js'),/addEventListener\(|cloneNode\(|innerHTML=/);
});
function shortcuts(){const f=dom(),root=f.doc.createElement('div');f.doc.body.appendChild(root);let mode='object',busy=false,opens=0;const calls=[];for(const id of ['focusViewBtn','frameAllBtn','undoBtn','redoBtn']){const b=f.doc.createElement('button');b.id=id;b.addEventListener('click',()=>calls.push(id));f.doc.body.appendChild(b);}const toolbar=f.doc.createElement('div');toolbar.id='objectManagementTools';const multi=f.doc.createElement('button');multi.textContent='Multi';multi.addEventListener('click',()=>{globalThis.__boxlabObjectSelection.multi=!globalThis.__boxlabObjectSelection.multi;calls.push('multi');});toolbar.appendChild(multi);f.doc.body.appendChild(toolbar);globalThis.__boxlabObjectSelection={multi:false};const api=mountGizmoCornerControls(root,{currentMode:()=>mode,isBusy:()=>busy,openTools:()=>opens++});return{...f,root,api,calls,mode:m=>mode=m,busy:b=>busy=b,opens:()=>opens};}
test('Six corner controls use distinct actions and actual toolbar button listeners once',()=>{
 const f=shortcuts();assert.equal(f.root.children.length,4);assert.deepEqual([...f.api.controls.keys()],['tools','focus','frame','undo','redo','multi']);f.api.controls.get('tools').dispatch('pointerdown');assert.equal(f.opens(),1);for(const key of ['focus','frame','undo','redo','multi'])f.api.controls.get(key).click();assert.deepEqual(f.calls,['focusViewBtn','frameAllBtn','undoBtn','redoBtn','multi']);assert.equal(f.api.controls.get('multi').getAttribute('aria-pressed'),'true');f.api.controls.get('multi').click();assert.equal(f.api.controls.get('multi').getAttribute('aria-pressed'),'false');delete globalThis.__boxlabObjectSelection;
});
test('Object Multi hides in component modes; disabled history and busy gesture cannot dispatch shortcuts',()=>{
 const f=shortcuts();f.mode('face');f.api.sync();assert.equal(f.api.controls.get('multi').parentElement.hidden,true);f.api.controls.get('multi').click();assert.equal(f.calls.length,0);f.doc.querySelector('#undoBtn').disabled=true;f.api.sync();f.api.controls.get('undo').click();assert.equal(f.calls.length,0);f.busy(true);f.api.sync();for(const b of f.api.controls.values()){assert.equal(b.disabled,true);b.click();b.dispatch('pointerdown');}assert.equal(f.opens(),0);assert.equal(f.calls.length,0);delete globalThis.__boxlabObjectSelection;
});
test('Gizmo centre remains a free Move handle, free Rotate ring retains owner and corner replaces centre menu hotspot',()=>{
 const s=source('total-gizmo.js');assert.match(s,/class="tg-handle tg-center" data-tool="move" data-constraint="free"[^\n]+r="14"/);assert.match(s,/tg-screen-ring" data-tool="rotate" data-constraint="free"/);assert.doesNotMatch(s,/class="tg-collapse"|collapseControl/);assert.match(s,/mountGizmoCornerControls\(root/);assert.match(s,/reason:'corner-radial-tools'/);assert.match(s,/cornerControls.sync\(\)/);assert.match(s,/beginGizmoGesture\?\.\(spec,event\)/);
});
test('Every changed shared-dock client repinned from shell; protected transform module stays frozen',()=>{
 const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');for(const file of fs.readdirSync(new URL('../src/',import.meta.url))){if(!file.endsWith('.js'))continue;const s=source(file);if(s.includes('tool-session-panel-position.js?v=')){assert.match(s,/tool-session-panel-position\.js\?v=0\.36\.18\.712/);assert.ok(index.includes('src/'+file+'?v=0.36.18.712'));}}
 assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);assert.match(source('tool-session-panel-position.js'),/tool-session-wide-layout\.js\?v=0\.36\.18\.712/);assert.match(source('total-gizmo.js'),/gizmo-corner-controls\.js\?v=0\.36\.18\.712/);
});

test('Corner shortcut groups remain inside viewport without moving the gizmo selection pivot',()=>{
 const f=shortcuts();for(const [left,top] of [[500,300],[5,5],[995,595]]){f.api.position(left,top,{width:1000,height:600});for(const g of f.root.children){const w=g.children.length*40+(g.children.length-1)*4,x=left+Number.parseFloat(g.style.left)-98,y=top+Number.parseFloat(g.style.top)-98;assert.ok(x-w/2>=8&&x+w/2<=992);assert.ok(y-20>=8&&y+20<=592);}}delete globalThis.__boxlabObjectSelection;
});
