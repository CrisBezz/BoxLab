import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { copyPackedScalarChannel } from '../src/helios-vendor/engine/packed-pbr-channels.js';
const read=(path)=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

test('1166 exposes the existing packed metalness channel as a previewable map slot',()=>{
  const types=read('src/helios-vendor/types/studio.ts');
  const textures=read('src/helios-vendor/engine/textures.ts');
  const entry=read('src/helios-vendor/boxlab-entry.ts');
  const dock=read('src/helios-dock.js');
  const css=read('helios-dock.css');
  assert.match(types,/TextureSlot\s*=\s*'albedo'\s*\|\s*'normal'\s*\|\s*'roughness'\s*\|\s*'metalness'/);
  assert.match(textures,/slot === 'roughness' \|\| slot === 'metalness'[\s\S]*slot === 'roughness' \? 1 : 2/);
  assert.match(textures,/copyPackedScalarChannel\(this\.customRoughMetalBytes, offset, sliceCopy, 0, totalPixels, channel\)/);
  assert.match(textures,/slot === 'roughness' \? 1 : 2/,'previews read G for roughness and B for metalness');
  assert.match(entry,/metalness:\s*material\.hasCustomMetalness\s*\?\s*textureManager\.getMapPreviewDataUrl\(layer, 'metalness'\)\s*:\s*null/);
  assert.match(entry,/else if \(slot === 'metalness'\) material\.hasCustomMetalness = true/);
  assert.match(dock,/\['metalness','Metalness',current\.hasCustomMetalness\]/);
  assert.match(dock,/helios-map-preview-constant/,'unmapped metalness previews its constant material value');
  assert.match(dock,/Constant \$\{amount\.toFixed\(2\)\}/);
  assert.match(dock,/data-map-preview="\$\{slot\}"/);
  assert.match(css,/\.helios-map-grid\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
});

test('1166 scalar map replacement updates only its packed channel',()=>{
  const packed=new Uint8Array([12,34,56,255, 78,90,123,255]);
  const roughness=new Uint8Array([200,201,202,255, 210,211,212,255]);
  const metalness=new Uint8Array([220,221,222,255, 230,231,232,255]);
  copyPackedScalarChannel(packed,0,roughness,0,2,1);
  assert.deepEqual([...packed],[12,201,56,255, 78,211,123,255]);
  copyPackedScalarChannel(packed,0,metalness,0,2,2);
  assert.deepEqual([...packed],[12,201,222,255, 78,211,232,255]);
  assert.throws(()=>copyPackedScalarChannel(packed,0,metalness,0,2,0),RangeError);
});

test('1166 preserves both imported scalar maps in glTF packed channels and both renderers',()=>{
  const models=read('src/helios-vendor/engine/models.ts');
  const textures=read('src/helios-vendor/engine/textures.ts');
  const tracer=read('src/helios-vendor/engine/pathTracer.ts');
  assert.match(models,/if \(stdMat\?\.roughnessMap\?\.image\)[\s\S]*'roughness'[\s\S]*if \(stdMat\?\.metalnessMap\?\.image\)[\s\S]*'metalness'/);
  assert.match(models,/mat\.metalnessMap = spec\.hasCustomMetalness \? maps\.metalnessMap : null/);
  assert.match(textures,/metalnessMap: roughMetalMap/,'Three PBR reuses the packed texture instead of retaining a duplicate image');
  assert.match(textures,/new Set\(\[maps\.map, maps\.normalMap, maps\.roughnessMap, maps\.metalnessMap\]\)/,'shared map textures are disposed once');
  assert.match(tracer,/if \(mF\.y > 0\.5\) metalness = clamp\(metalness \* rm\.b, 0\.0, 1\.0\)/);
  assert.match(read('src/helios-vendor/boxlab-entry.ts'),/material\.hasCustomMetalness = false/,'Restore preset maps clears the uploaded map state');
});

test('1166 release pins point through the refreshed dock and tracer loaders',()=>{
  const version=JSON.parse(read('version.json')).version;
  const index=read('index.html');
  const mode=read('src/pathtrace-mode.js');
  assert.equal(version,'0.36.18.1166');
  assert.match(index,/<title>BoxLab v0\.36\.18\.1166<\/title>/);
  assert.match(index,/data-release-version="0\.36\.18\.1166">v0\.36\.18\.1166/);
  assert.match(index,/helios-dock\.css\?v=0\.36\.18\.1166/);
  assert.match(index,/src\/helios-dock\.js\?v=0\.36\.18\.1166/);
  assert.match(index,/src\/pathtrace-mode\.js\?v=0\.36\.18\.1166/);
  assert.match(mode,/helios-tracer\.bundle\.js\?v=0\.36\.18\.1166/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
