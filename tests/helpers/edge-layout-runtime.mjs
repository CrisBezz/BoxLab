import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {orderedDOM} from './ordered-dom.mjs';

// Ordered DOM adapter: mutations move the original nodes and listeners. Executes
// whole precision owner and actual shared Edge layout functions; no CSS engine.
export function edgeLayoutRuntime({ranges=2,sourceTransform=s=>s}={}){
 const {fields,node}=orderedDOM(),queue=[],calls=[];let ids=[2,1,2];
 const edge=node('edgeTools'),title=node();title.className='panel-title';edge.append(title);
 for(const id of ['loopCutBtn','bevelBtn','applyCreaseBtn','faceSplitBtn','edgeExtrudeBtn','edgeSlideBtn','offsetLoopBtn','clearCreaseBtn','bridgeEdgesBtn','fillFaceBtn','dissolveLoopBtn','dissolveEdgeBtn','deleteEdgeBtn','componentCircleBtn'])edge.append(node(id));
 const sweep=node('sweepLauncher');fields.set('.sweep-selection-launch[data-sweep-selection-mode="edge"]',sweep);edge.append(sweep);
 const options=node();options.className='bevel-option';fields.set('.bevel-option',options);
 for(let i=0;i<ranges;i++){const row=node('range'+i);row.className='range-row';options.append(row);}
 const groups={};for(const name of ['loop-cut-option','loop-slide-option','offset-option']){groups[name]=node();groups[name].className=name;edge.append(groups[name]);}edge.append(options);
 fields.set('[data-mode-tools="edge"]',edge);fields.set('.mode-tools[data-mode-tools="edge"]',edge);
 fields.set('#bevelWidth',node('bevelWidth'));fields.get('#bevelWidth').value='20';
 fields.set('#selectionStatus',node('selectionStatus'));
 const document=node(),window=node();document.head=node();document.createElement=()=>node();document.querySelector=s=>fields.get(s)||null;document.querySelectorAll=()=>[];
 const c={document,window,Event:class{constructor(type){this.type=type;}},setTimeout:fn=>queue.push(fn),queueMicrotask:fn=>queue.push(fn),
  __boxlabSelectionBridge:{mode:()=> 'edge',indices:()=>ids},__boxlabDirectBevel:{applyExact:(value,selected)=>{calls.push({value,ids:[...selected]});return {ok:true,ids:selected,percent:value,segments:1};}}};
 vm.createContext(c);
 const load=(path,source)=>vm.runInContext('{'+sourceTransform(source,path)+'}',c);
 const precision=fs.readFileSync(new URL('../../src/precision-bevel.js',import.meta.url),'utf8');load('precision-bevel.js',precision);
 const ui=fs.readFileSync(new URL('../../src/tool-session-ui.js',import.meta.url),'utf8');
 const a=ui.indexOf('function ensureEdgeCompactRow('),b=ui.indexOf('function ensureFaceCompactRow(',a);
 const m=ui.indexOf('function moveButtonToRow('),end=ui.indexOf('function installFaceControlOrder(',m);
 assert.ok(a>=0&&b>a&&m>=0&&end>m);
 load('tool-session-ui.js',ui.slice(m,end)+ui.slice(a,b));
 const sync=()=>c.__boxlabEdgeToolLayout.sync();sync();
 return {fields,edge,options,title,groups,calls,context:c,document,window,sync,setIds:v=>ids=v,
  flush(){while(queue.length)queue.shift()();}};
}

export function assertEdgeRows(sourceTransform){
 const f=edgeLayoutRuntime({sourceTransform});
 const rows=[['loopCutBtn','bevelBtn','applyCreaseBtn'],['faceSplitBtn','edgeExtrudeBtn','sweepLauncher'],['edgeSlideBtn','offsetLoopBtn','clearCreaseBtn'],['bridgeEdgesBtn','fillFaceBtn','dissolveLoopBtn'],['dissolveEdgeBtn','deleteEdgeBtn','componentCircleBtn']];
 const original=rows.flat().map(id=>f.fields.get('#'+id));
 for(let n=0;n<3;n++){
  f.sync();f.flush();
  rows.forEach((ids,i)=>{const row=f.fields.get('#edgeCompactRow'+(i+1));assert.deepEqual(row.children.map(x=>x.id),ids,'current compact row contents');assert.equal(row.style.gridTemplateColumns,'repeat(3,minmax(0,1fr))');});
  assert.equal(f.edge.children[0],f.title);
  const expected=[f.title,f.fields.get('#edgeCompactRow1'),f.groups['loop-cut-option'],f.groups['loop-slide-option'],f.options,f.fields.get('#edgeCompactRow2'),f.fields.get('#edgeCompactRow3'),f.groups['offset-option'],f.fields.get('#edgeCompactRow4'),f.fields.get('#edgeCompactRow5')];
  assert.deepEqual(f.edge.children,expected,'stable contextual option order');
  for(const x of original)assert.equal(f.fields.get('#'+x.id),x,'original button identity preserved');
 }
}

export function assertEdgePrecision(sourceTransform){
 for(const ranges of [0,1,2]){
  const f=edgeLayoutRuntime({ranges,sourceTransform}),row=f.fields.get('#precisionEdgeBevelRow'),input=row.children[1],apply=row.children[2];
  assert.equal(row.parentElement,f.options,'Exact belongs inside Bevel options');
  const readout=row.nextElementSibling;assert.ok(readout);assert.equal(readout.parentElement,f.options);
  assert.equal(f.options.children.at(-2),row,'Exact follows existing Bevel ranges');assert.equal(f.options.children.at(-1),readout);
  const before=[...f.options.children];f.sync();f.flush();assert.deepEqual(f.options.children,before);
  input.value='17.5';f.document.dispatchEvent({type:'pointerdown',target:apply});f.setIds([]);apply.dispatchEvent({type:'click'});
  assert.deepEqual(f.calls,[{value:17.5,ids:[2,1]}],'original Exact listener delegates captured selection');
  assert.match(readout.textContent,/Edge Bevel exact/);
  f.setIds([4]);input.value='NaN';apply.dispatchEvent({type:'click'});assert.equal(f.calls.length,1);
 }
}
