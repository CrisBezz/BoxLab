import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

export const root=new URL('../../',import.meta.url);
export const contract=JSON.parse(fs.readFileSync(new URL('../fixtures/runtime-asset-contract.json',import.meta.url),'utf8'));
export function shellReleaseMatches(index,version){
  return index.match(/<title>BoxLab v([^<]+)<\/title>/)?.[1]===version
    &&index.match(/data-release-version="([^"]+)"/)?.[1]===version
    &&index.match(/data-release-version="[^"]+">v([^<]+)/)?.[1]===version;
}
export function assertShellRelease(index,version=JSON.parse(fs.readFileSync(new URL('version.json',root),'utf8')).version){
  assert.ok(shellReleaseMatches(index,version),'title, data stamp, visible label and manifest must agree');
}
export function assetReference(source,asset){
  const name=path.posix.basename(asset);
  const candidates=contract.references.filter(r=>path.posix.basename(r.target)===name);
  assert.ok(candidates.length,`no reviewed asset contract for ${asset}`);
  for(const r of candidates){
    const token=path.posix.basename(r.url);
    const start=source.indexOf(token),after=source[start+token.length];
    if(start>=0&&(!after||/[\s"'`<>&)]/.test(after)))return token;
  }
  assert.fail(`${asset} must reference its reviewed cache pin in this loader`);
}
export function hasAssetReference(source,asset){
  try{assetReference(source,asset);return true;}catch{return false;}
}
export function assertAssetReference(source,asset){assetReference(source,asset);}
export function assertModuleStamp(source,asset){
  const record=contract.references.find(r=>path.posix.basename(r.target)===path.posix.basename(asset)&&r.sourceVersion);
  assert.ok(record,`no reviewed internal version stamp for ${asset}`);
  assert.equal(source.match(/const VERSION=['"]([\d.]+)['"]/)?.[1],record.sourceVersion,`${asset} internal stamp changed`);
}
export function assetsOrdered(source,first,second){
  if(!hasAssetReference(source,first)||!hasAssetReference(source,second))return false;
  return source.indexOf(assetReference(source,first))<source.indexOf(assetReference(source,second));
}
