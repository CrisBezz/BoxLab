import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/release-version.js',import.meta.url),'utf8').replaceAll('import.meta.url',"'https://example.test/BoxLab/src/release-version.js'");
const tick=()=>new Promise(r=>setImmediate(r));
test('1008 all current release-owner loaders resolve to one canonical module URL',()=>{
 const shell=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'),layout=fs.readFileSync(new URL('../src/face-workflow-layout.js',import.meta.url),'utf8'),drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
 const direct=shell.match(/src\/release-version\.js\?v=([^"']+)/)[1],nested=layout.match(/release-version\.js\?v=([^"']+)/)[1];assert.equal(direct,nested);
 assert.match(drawer,/face-workflow-layout\.js\?v=0\.36\.18\.1008/);assert.match(shell,/drawer-ui\.js\?v=0\.36\.18\.1008/);
});
test('1008 network latest and app-return events cannot relabel old executed shell as a newer or older build; no forced recovery',async()=>{
 let latest='0.36.18.1007',redirects=0,callback;const events=new Map(),label={dataset:{releaseVersion:'0.36.18.1006'},textContent:'v0.36.18.1006'},doc={title:'BoxLab v0.36.18.1006',querySelector:()=>label,addEventListener:(k,f)=>events.set(k,f),hidden:false};
 const c={URL,document:doc,window:{addEventListener:(k,f)=>events.set(k,f),location:{replace(){redirects++;}}},MutationObserver:class{constructor(f){callback=f;}observe(){}disconnect(){}},fetch:async()=>({ok:true,json:async()=>({version:latest})}),console};vm.createContext(c);vm.runInContext(source,c);await tick();
 assert.equal(label.textContent,'v0.36.18.1006');assert.equal(doc.title,'BoxLab v0.36.18.1006');assert.equal(c.__boxlabReleaseVersion.latest,'0.36.18.1007');
 latest='0.36.18.1008';events.get('pageshow')();await tick();assert.equal(c.__boxlabReleaseVersion.version,'0.36.18.1006');assert.equal(c.__boxlabReleaseVersion.latest,latest);
 events.get('visibilitychange')();await tick();assert.equal(label.textContent,'v0.36.18.1006');latest='0.36.18.999';await c.__boxlabReleaseVersion.refresh();assert.equal(label.textContent,'v0.36.18.1006');
 label.textContent='v0.36.1.0';callback();assert.equal(label.textContent,'v0.36.18.1006');assert.equal(redirects,0);
});
