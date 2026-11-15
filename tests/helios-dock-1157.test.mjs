import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

test('Helios .1165 keeps the gallery and capture controls inside the integrated dock',()=>{
  const ui=read('src/helios-dock.js'),css=read('helios-dock.css'),index=read('index.html');
  for(const [id,label] of [['lights','Lights'],['materials','Materials'],['raytracer','Ray Tracer'],['camera','Camera']]){
    assert.ok(ui.includes(`['${id}','${label}']`),`${label} dock tab remains available`);
  }
  assert.match(ui,/lighting-rig/);assert.match(ui,/material-preset/);assert.match(ui,/boxlab-helios-dock-action/);
  assert.match(ui,/option value="512"[^>]*>512 spp/,'512 spp is offered in the sample target');
  assert.match(ui,/data-do="reset-light"/);assert.match(ui,/data-do="reset-material"/);assert.match(ui,/helios-material-gallery/);assert.match(ui,/previewSvg/);assert.match(ui,/data-do="render-output"/);assert.match(ui,/capture\.disabled=!complete/);
  assert.match(ui,/!state\|\|!ready/,'controls stay unavailable while the trace is rebuilding');
  assert.match(css,/safe-area-inset-right/);assert.match(css,/right:max\(8px/);assert.match(css,/top:8px/);assert.doesNotMatch(css,/(^|[;{])bottom:/);assert.match(css,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);assert.match(css,/max-height:min\(/);assert.match(css,/--helios-accent:rgba\(255,255,255,\.72\)/);assert.match(css,/\.helios-tab\.is-active\{border-color:var\(--helios-edge\);background:#eef1f7;color:#15171b/);assert.match(css,/\.helios-choice\.is-selected\{border-color:var\(--helios-edge\);background:#eef1f7;color:#15171b/);assert.match(css,/focus-visible[^}]*outline:2px solid rgba\(255,255,255,\.72\)/);assert.doesNotMatch(css,/#60b5ff|#1268b6|rgba\(18,104,182/);assert.match(css,/--helios-panel:rgba\(20,23,30/);assert.doesNotMatch(css,/#f59e0b|#f5b332/);assert.match(ui,/Ray Trace/);assert.ok(ui.includes("collapsed?'⌄':'⌃'"));
  assert.match(index,/helios-dock\.css\?v=0\.36\.18\.1165/);
  assert.match(index,/src\/helios-dock\.js\?v=0\.36\.18\.1165/);
  assert.ok(index.indexOf('src/pathtrace-mode.js?')<index.indexOf('src/helios-dock.js?'),'tracer event owner loads before dock');
});

test('Helios BoxLab adapter reconnects lights, material presets and trace settings',()=>{
  const adapter=read('src/helios-vendor/boxlab-entry.ts'),mode=read('src/pathtrace-mode.js');
  for(const api of ['getState','updateLights','updateMaterial','applyMaterialPreset','updateSettings','applyLightingRig','applyPreferences'])assert.match(adapter,new RegExp(`function ${api}\\(`));
  assert.match(adapter,/pathTracer\?\.resetAccumulation\(\)/);
  assert.match(adapter,/hasImportedMaps[\s\S]*delete safePatch\.texturePreset/,'custom GLB maps cannot be replaced by procedural presets');
  assert.match(mode,/savedControls/);assert.match(mode,/boxlab-helios-dock-action/);assert.match(mode,/applyCameraPreset/);
  assert.match(mode,/detail\.action==='reset-light'/);assert.match(mode,/detail\.action==='reset-material'/);assert.match(mode,/detail\.action==='render-output'/);assert.match(adapter,/captureSnapshot\(\)/);
  assert.match(mode,/defaultLights=.*map\(light=>\(\{\.\.\.light\}\)\)/);
  assert.match(mode,/defaultMaterials=new Map/,'material defaults are captured from each freshly imported GLB');
});
