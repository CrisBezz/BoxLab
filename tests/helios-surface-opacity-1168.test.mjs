import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=(path)=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

test('Helios .1168 exposes a render-only scalar opacity separate from emitter opacity',()=>{
  const ui=read('src/helios-dock.js');
  const types=read('src/helios-vendor/types/studio.ts');
  const adapter=read('src/helios-vendor/boxlab-entry.ts');
  const models=read('src/helios-vendor/engine/models.ts');
  assert.match(types,/surfaceOpacity\?: number/);
  assert.match(ui,/field\('Surface opacity','material','surfaceOpacity',0,1,0\.01,current\.surfaceOpacity\?\?1,'%'/);
  assert.match(ui,/current\.emissiveIntensity>0\.01\?field\('Emitter opacity'[^:]+:field\('Surface opacity'/,
    'emissive and non-emissive controls are mutually exclusive');
  assert.match(ui,/if\(key==='emissiveOpacity'\|\|key==='surfaceOpacity'\)/,
    'both opacity controls show percentage output');
  assert.match(ui,/if\(key==='emissiveOpacity'\|\|key==='surfaceOpacity'\)return/,
    'live slider updates show percentage output');
  assert.match(adapter,/'emissiveIntensity', 'emissiveOpacity', 'surfaceOpacity'/);
  assert.match(models,/surfaceOpacity: Math\.max\(0, Math\.min\(1,/,
    'imported GLB scalar alpha is used as the initial surface opacity');
  assert.match(models,/const surfaceOpacity = !isEmissive \? \(spec\.surfaceOpacity \?\? 1\) : 1/);
  assert.match(models,/mat\.opacity = materialOpacity/);
  assert.match(models,/mat\.depthWrite = materialOpacity >= 0\.999/);
});

test('Helios .1168 traces surface coverage through camera, bounce and shadow rays without changing emitters',()=>{
  const tracer=read('src/helios-vendor/engine/pathTracer.ts');
  assert.match(tracer,/matC = \(emissiveIntensity, emitterOpacity, surfaceOpacity, 0\)/);
  assert.match(tracer,/surfaceOpacity = emissiveIntensity > 0\.01 \? 1\.0 : clamp\(mC\.z, 0\.0, 1\.0\)/);
  assert.match(tracer,/if \(surfaceOpacity < 0\.999 && rand\(\) >= surfaceOpacity\) \{\s*ro = hit\.pos \+ rd \* 0\.002;\s*continue;/,
    'alpha coverage passes the existing path through the surface');
  assert.match(tracer,/vec3 glassVisibility = trans >= 0\.15 \? tint \* \(0\.45 \+ 0\.45 \* trans\) : vec3\(0\.0\);/);
  assert.match(tracer,/visibility \*= mix\(vec3\(1\.0\), glassVisibility, surfaceOpacity\)/,
    'shadow visibility follows scalar opacity and existing glass transmission');
  assert.match(tracer,/matCArr = Array\.from\(\{ length: MAX_MATERIALS \}, \(\) => new THREE\.Vector4\(0\.0, 1\.0, 1\.0, 0\.0\)\)/,
    'unused material slots default to opaque surfaces');
  assert.match(tracer,/matC\[idx\]\.set\(spec\.emissiveIntensity, spec\.emissiveOpacity \?\? 1, spec\.surfaceOpacity \?\? 1, 0\)/);
  assert.match(tracer,/throughput \*= 1\.0 - emitterOpacity/,
    'the existing emissive pass-through implementation remains present');
});
