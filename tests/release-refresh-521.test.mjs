import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const bootstrap=fs.readFileSync(new URL('../src/release-bootstrap.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

test('521 HTML shell is stamped with the current release',()=>{
  assertShellRelease(index);
});

test('521 release bootstrap and release-version use fresh cache keys',()=>{
  assertAssetReference(index,'release-bootstrap.js');
  assertAssetReference(index,'release-version.js');
});

test('stale shell keeps retrying past three attempts and stays inside frozen path',async()=>{
  const current=version.version,latest='99.0.0';
  const store=new Map([['boxlab-refresh-latest',latest],['boxlab-refresh-attempts','3']]);
  const redirects=[],requests=[];
  const location={href:'https://example.test/BoxLab/beta-6/?build='+latest,replace(url){redirects.push(url);this.href=url;}};
  const context=vm.createContext({URL,Date,document:{title:'BoxLab v'+current},window:{location},sessionStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},fetch:async(url,opts)=>{requests.push([url.href,opts]);return{ok:true,json:async()=>({version:latest})};},console});
  for(let i=0;i<10;i++){
    vm.runInContext(bootstrap,context);
    await new Promise(resolve=>setImmediate(resolve));
  }
  assert.equal(redirects.length,10);
  for(const href of redirects){const url=new URL(href);assert.equal(url.pathname,'/BoxLab/beta-6/index.html');assert.equal(url.searchParams.get('build'),latest);assert.ok(url.searchParams.has('_reload'));}
  for(const [url,opts] of requests){assert.equal(new URL(url).pathname,'/BoxLab/beta-6/version.json');assert.equal(opts.cache,'no-store');}
});
test('stale Safari directory shell switches to explicit cache-busted index without changing project path',async()=>{
 const redirects=[],location={href:'https://example.test/BoxLab/?view=front',replace(url){redirects.push(new URL(url));}};
 vm.runInNewContext(bootstrap,{URL,Date,document:{title:'BoxLab v0.36.18.1000'},window:{location},sessionStorage:{getItem(){return null;},setItem(){}},fetch:async()=>({ok:true,json:async()=>({version:version.version})}),console});
 await new Promise(resolve=>setImmediate(resolve));assert.equal(redirects.length,1);
 assert.equal(redirects[0].pathname,'/BoxLab/index.html');assert.equal(redirects[0].searchParams.get('view'),'front');
 assert.equal(redirects[0].searchParams.get('build'),version.version);assert.ok(redirects[0].searchParams.has('_reload'));
});
test('matching release does not redirect',async()=>{
  let redirects=0;
  vm.runInNewContext(bootstrap,{URL,Date,document:{title:'BoxLab v'+version.version},window:{location:{href:'https://example.test/BoxLab/',replace(){redirects++;}}},fetch:async()=>({ok:true,json:async()=>({version:version.version})}),sessionStorage:{getItem(){},setItem(){}},console});
  await new Promise(resolve=>setImmediate(resolve));assert.equal(redirects,0);
});
