import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {root,contract,assetReference,assertAssetReference,assertModuleStamp,assertShellRelease,shellReleaseMatches,assetsOrdered} from './helpers/release-contract.mjs';

const read=p=>fs.readFileSync(new URL(p,root),'utf8');
test('current release has coherent title, visible label, data stamp and manifest',()=>assertShellRelease(read('index.html')));
test('reviewed runtime asset references retain actual cache pins and bytes',()=>{
  for(const r of contract.references){
    assert.ok(read(r.owner).includes(r.url),`${r.owner} changed reference ${r.url}; review cache contract`);
    const bytes=fs.readFileSync(new URL(r.target,root));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),r.sha256,`${r.target} changed; review its loader pins before updating contract`);
  }
});
test('every local shell script and stylesheet exists with a reviewed reference',()=>{
  const index=read('index.html');
  for(const [,url] of index.matchAll(/(?:src|href)="([^"#]+)"/g)){
    if(/^(https?:|data:)/.test(url))continue;
    assert.ok(fs.existsSync(new URL(url.split('?')[0],root)),url);
    if(url.includes('?v='))assert.ok(contract.references.some(r=>r.owner==='index.html'&&r.url===url),`unreviewed shell asset ${url}`);
  }
});
test('protected Multi pin and implementation remain identical to accepted Beta6',()=>{
  assert.match(read('index.html'),/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(read('src/multi-object-transform.js'),read('beta-6/src/multi-object-transform.js'));
});
test('release checks reject mismatched shell and missing, wrong or truncated pins',()=>{
  const index=read('index.html');
  assert.equal(shellReleaseMatches(index,'wrong'),false);
  assert.throws(()=>assertShellRelease(index.replace(/<title>[^<]+/, '<title>BoxLab vwrong')));
  assert.throws(()=>assertAssetReference('', 'main.js'));
  assert.throws(()=>assertAssetReference('main.js?v=0.0.0"','main.js'));
  const token=assetReference(index,'main.js');
  assert.throws(()=>assertAssetReference(token+'9"','main.js'));
  assert.throws(()=>assertAssetReference('unknown.js?v=1.0"','unknown.js'));
  assertModuleStamp(read('src/revolve-profile.js'),'revolve-profile.js');
  assert.throws(()=>assertModuleStamp("const VERSION='0.0.0';",'revolve-profile.js'));
  assert.equal(assetsOrdered(index,'direct-bevel.js','selection-hub-bevel-session.js'),true);
  assert.equal(assetsOrdered(index,'selection-hub-bevel-session.js','direct-bevel.js'),false);
  assert.equal(assetsOrdered('','direct-bevel.js','selection-hub-bevel-session.js'),false);
});
