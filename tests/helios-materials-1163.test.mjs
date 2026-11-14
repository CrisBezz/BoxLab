import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const presetSource=read('src/helios-vendor/data/presets.ts');
const presetBlock=presetSource.split('export const MATERIAL_PRESETS: MaterialPreset[] = [')[1]?.split('export const DEFAULT_RAYTRACER_SETTINGS')[0]||'';

test('BoxLab Helios .1163 integrates the complete 28-card Helios Studio .1.3 catalog',()=>{
  const ids=[...presetBlock.matchAll(/^\s+id: '([^']+)'/gm)].map(match=>match[1]);
  const expected=[
    'brushed-titanium','polished-chrome','anodized-gold','optical-crystal','smoked-acrylic',
    'matte-ceramic','car-lacquer','warm-emissive','brushed-aluminum','warm-copper',
    'black-oxide-steel','pearl-enamel','matte-polymer','walnut-wood','black-leather',
    'cast-concrete','polished-marble','frosted-glass','emerald-glass','soft-rubber',
    'warm-limestone','red-clay-brick','spotted-gum','architectural-terrazzo',
    'glazed-ceramic-tile','lime-plaster','corten-steel','polished-concrete',
  ];
  assert.equal(ids.length,28,'all twenty existing and eight new presets are present');
  assert.deepEqual(ids,expected,'existing order and new architectural cards stay stable');
  assert.equal(new Set(ids).size,ids.length,'preset ids are unique');
});

test('six architectural texture maps are addressable by both the texture UI and tracer',()=>{
  const types=read('src/helios-vendor/types/studio.ts');
  const textures=read('src/helios-vendor/engine/textures.ts');
  const preview=read('src/helios-vendor/utils/materialPreviewSvg.ts');
  const mapIds=['limestone','brick','terrazzo','ceramic-tile','plaster','corten-steel'];
  assert.match(textures,/PRESET_LAYER_COUNT = 14/);
  assert.match(types,/hasCustomMetalness\?: boolean/,'BoxLab custom-map compatibility stays intact');
  for(const [offset,id] of mapIds.entries()){
    const layer=offset+8;
    assert.match(types,new RegExp(`\\| '${id}'`),`${id} is a supported material texture type`);
    assert.match(textures,new RegExp(`\\{ id: '${id}', label: '[^']+', layerIndex: ${layer} \\}`),`${id} is selectable in the texture UI`);
    assert.match(textures,new RegExp(`^\\s+(?:'${id}'|${id}): ${layer},?$`,'m'),`${id} maps to its procedural layer`);
    assert.ok(textures.includes(`generatePresetLayer('${id}', ${layer})`),`${id} layer is generated`);
    assert.match(preview,new RegExp(`case '${id}':`),`${id} has a visible sphere-preview pattern`);
  }
});

test('the BoxLab adapter applies presets only through the selected render-session material owner',()=>{
  const entry=read('src/helios-vendor/boxlab-entry.ts');
  const mode=read('src/pathtrace-mode.js');
  assert.match(entry,/materialPresets: MATERIAL_PRESETS\.map/);
  assert.match(entry,/createMaterialPreviewSvg\(preset, 'boxlab-material'\)/);
  assert.match(entry,/function applyMaterialPreset\(id: string, presetId: string\)/);
  assert.match(entry,/hasImportedMaps[\s\S]*delete safePatch\.texturePreset/,'imported PBR maps remain protected');
  assert.match(mode,/helios-tracer\.bundle\.js\?v=0\.36\.18\.1163/,'the rebuilt tracer bundle gets a fresh cache key');
  assert.match(read('index.html'),/pathtrace-mode\.js\?v=0\.36\.18\.1163/,'the parent loader gets a fresh cache key');
  assert.match(read('src/helios-vendor/UPSTREAM.txt'),/Commit: 44a7565e24ee96ea7907716dc67b1b97a810a63d/);
});
