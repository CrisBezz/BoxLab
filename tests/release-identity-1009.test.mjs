import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {buildSceneOBJ} from '../src/scene-obj-export-core.js';
import {EditableMesh} from '../src/mesh.js';

const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const bootstrap=read('src/release-bootstrap.js');
const owner='(() => {\n'+read('src/release-version.js').replaceAll('import.meta.url',"'https://example.test/BoxLab/src/release-version.js'")+'\n})();';
// Execute the real wrapper, injecting only its imported production geometry owner.
const exporter='(() => {\n'+read('src/scene-obj-export-238.js').replace(/^import .*;$/m,'')+'\n})();';
const tick=()=>new Promise(r=>setImmediate(r));
const loaded='0.36.18.1009';
function fixture(){
 const events=new Map(),label={textContent:'v'+loaded,dataset:{releaseVersion:loaded}},base={},subd={},status={};
 let observer,config,latest=loaded,fail=false,redirects=0;
 const doc={title:'BoxLab v'+loaded,hidden:false,querySelector:q=>({'#appVersion':label,'#exportBaseBtn':base,'#exportSubdBtn':subd,'#selectionStatus':status})[q],addEventListener:(k,f)=>events.set('doc:'+k,f)};
 const c=vm.createContext({URL,Date,console,document:doc,buildSceneOBJ,window:{addEventListener:(k,f)=>events.set(k,f),location:{href:'https://example.test/BoxLab/?shellTest=separated',replace(){redirects++;}}},sessionStorage:{getItem(){},setItem(){}},MutationObserver:class{constructor(fn){observer=fn;}observe(n,o){config=o;}disconnect(){}},fetch:async()=>{if(fail)throw Error('offline');return{ok:true,json:async()=>({version:latest})};}});
 vm.runInContext(bootstrap,c);
 return{c,label,doc,events,observe:()=>observer(),config:()=>config,latest:v=>latest=v,offline:()=>fail=true,redirects:()=>redirects};
}
for(const order of ['exporter first','release first'])test('1009 actual OBJ writer cannot change shell identity: '+order,async()=>{
 const f=fixture();await tick();
 if(order==='exporter first')vm.runInContext(exporter,f.c);
 else vm.runInContext(owner,f.c);
 assert.equal(f.label.textContent,'v'+loaded);assert.equal(f.doc.title,'BoxLab v'+loaded);assert.equal(f.label.dataset.releaseVersion,loaded);
 if(order==='exporter first')vm.runInContext(owner,f.c);
 else vm.runInContext(exporter,f.c);
 await tick();
 const mesh=EditableMesh.cube(2),before=mesh.clone(),objects=[{name:'Cube',mesh,settings:{}}];
 for(const subd of [false,true]){
  const actual=f.c.__boxlabSceneOBJExport238.sceneToOBJ(objects,subd);
  assert.deepEqual(actual,buildSceneOBJ(objects,{subd,version:'0.36.18.450'}));
 }
 assert.deepEqual(mesh,before);assert.equal(f.c.__boxlabSceneOBJExport238.version,'0.36.18.450');
 assert.equal(f.c.__boxlabReleaseVersion.version,loaded);assert.equal(f.label.dataset.releaseVersion,loaded);assert.equal(f.doc.title,'BoxLab v'+loaded);assert.equal(f.redirects(),0);
});
test('1009 early identity survives pre-owner dataset/title contamination and later legacy stamps, manifest changes and offline returns',async()=>{
 const f=fixture();await tick();
 assert.equal(Object.getOwnPropertyDescriptor(f.c,'__boxlabLoadedShellVersion').writable,false);
 assert.equal(Object.getOwnPropertyDescriptor(f.c,'__boxlabLoadedShellVersion').configurable,false);
 vm.runInContext("globalThis.__boxlabLoadedShellVersion='0.36.18.450'",f.c);
 f.label.dataset.releaseVersion='0.36.18.450';f.label.textContent='v0.36.18.450';f.doc.title='BoxLab v0.36.18.450';
 vm.runInContext(owner,f.c);await tick();
 assert.equal(f.c.__boxlabReleaseVersion.version,loaded);assert.equal(f.label.dataset.releaseVersion,loaded);assert.equal(f.doc.title,'BoxLab v'+loaded);
 f.label.dataset.releaseVersion='0.36.1.0';f.observe();assert.equal(f.label.dataset.releaseVersion,loaded);
 assert.equal(f.config().attributes,true);assert.deepEqual(Array.from(f.config().attributeFilter),['data-release-version']);
 f.c.__boxlabReleaseVersion.stamp('99.0.0');assert.equal(f.c.__boxlabReleaseVersion.version,loaded);
 f.latest('99.0.0');f.events.get('pageshow')();await tick();assert.equal(f.c.__boxlabReleaseVersion.latest,'99.0.0');assert.equal(f.label.textContent,'v'+loaded);
 f.offline();f.events.get('doc:visibilitychange')();await tick();assert.equal(f.doc.title,'BoxLab v'+loaded);assert.equal(f.redirects(),0);
});
test('1009 shell captures identity before comparison and all modules without changing protected Multi',()=>{
 const shell=read('index.html'),early=shell.indexOf('src/release-bootstrap.js?');
 assert(early<shell.indexOf('src/shell-comparison.js?'));assert(early<shell.indexOf('<script type="module"'));
 assert.equal(read('src/multi-object-transform.js'),read('beta-6/src/multi-object-transform.js'));
});
