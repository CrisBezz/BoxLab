import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

test('BoxLab Helios .1166 exposes replaceable texture previews and independent UV transforms',()=>{
  const ui=read('src/helios-dock.js');
  const css=read('helios-dock.css');
  const types=read('src/helios-vendor/types/studio.ts');
  const textures=read('src/helios-vendor/engine/textures.ts');
  const adapter=read('src/helios-vendor/boxlab-entry.ts');
  const mode=read('src/pathtrace-mode.js');
  for(const key of ['uvScaleX','uvScaleY','uvOffsetX','uvOffsetY','uvRotation','emissiveOpacity'])assert.match(types,new RegExp(`${key}\\?: number`));
  for(const slot of ['albedo','normal','roughness','metalness'])assert.match(ui,new RegExp(`'${slot}'`));
  assert.match(ui,/data-map-preview/);
  assert.match(ui,/data-do="upload-map"/);
  assert.match(ui,/data-do="restore-maps"/);
  assert.match(ui,/Scale U/);assert.match(ui,/Scale V/);assert.match(ui,/Offset U/);assert.match(ui,/Offset V/);assert.match(ui,/Rotation/);assert.match(ui,/Normal \/ height relief/);assert.match(ui,/Emitter opacity/);
  assert.match(ui,/uvScaleX','uvScaleY','uvOffsetX','uvOffsetY','normalStrength/);
  assert.match(ui,/uvScaleX:'×',uvScaleY:'×',uvRotation:'°'/,'mapping outputs retain precision and readable units after state updates');
  assert.match(css,/\.helios-map-grid/);assert.match(css,/\.helios-map-preview/);
  assert.match(textures,/getMapPreviewDataUrl\(layer: number, slot: TextureSlot\)/);
  assert.match(textures,/threeMapsCache = new Map<string, ThreePbrMaps>/);
  assert.match(textures,/t\.offset\.set\(offsetX, offsetY\)/);
  assert.match(adapter,/uploadMaterialMap\(id: string, slot: TextureSlot, file: File\)/);
  assert.match(adapter,/usedLayers\.size >= MAX_CUSTOM_LAYERS/,'uploading a new slot cannot recycle a live imported texture-array layer');
  assert.match(adapter,/restoreMaterialPresetMaps\(id: string\)/);
  assert.match(mode,/detail\.action==='upload-map'/);assert.match(mode,/detail\.action==='restore-maps'/);
});

test('Helios UV rotation and emissive opacity keep the tracer and PBR material owners aligned',()=>{
  const tracer=read('src/helios-vendor/engine/pathTracer.ts');
  const models=read('src/helios-vendor/engine/models.ts');
  assert.match(tracer,/uMatE\[\$\{MAX_MATERIALS\}\]/);
  assert.match(tracer,/mat2\(uvCos, uvSin, -uvSin, uvCos\)/);
  assert.match(tracer,/mF\.y > 0\.5/,'BoxLab custom metalness retains a distinct uniform from emitter opacity');
  assert.match(tracer,/spec\.emissiveOpacity \?\? 1/);
  assert.match(tracer,/throughput \*= 1\.0 - emitterOpacity/);
  assert.match(models,/getThreeMapsForLayer\([\s\S]*spec\.uvRotation \?\? 0/);
  assert.match(models,/transparent = materialOpacity < 0\.999/);
  assert.match(models,/mat\.normalScale\.set\(spec\.normalStrength, spec\.normalStrength\)/);
});
