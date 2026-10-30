import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {nomadSevenMapObjectsFixture} from './helpers/nomad-seven-map-objects-fixture.mjs';
import {parseNomadMeshes} from '../src/nomad-import-core.js';
import {glbOwnerRuntime,glbSource} from './helpers/glb-owner-runtime.mjs';
import {nativeImageChoices} from '../src/nomad-uv-image-choices.js';
const slots=['color','normal','emissive','roughness','metalness','opacity','displacement'];
test('1032 downloadable sample contains seven independent named objects; real File importer adds every object and every exact map remains inspectable',async()=>{
 const {objects,bytes}=await nomadSevenMapObjectsFixture();assert.equal(objects.length,7);assert.deepEqual(new Uint8Array(fs.readFileSync(new URL('../docs/samples/NOM_SEVEN_OBJECTS_1032.nom',import.meta.url))),bytes);
 const parsed=parseNomadMeshes(bytes);assert.equal(parsed.meshes.length,7);assert.equal(new Set(parsed.meshes.map(o=>o.name)).size,7);
 parsed.meshes.forEach((o,i)=>{assert(o.name.startsWith('0'+(i+1)));const choices=nativeImageChoices(o.glbPassthrough,undefined,slots);assert.equal(choices.length,1);assert.equal(choices[0].slot,slots[i]);});
 const source=glbSource('import-mesh.js').replace(/await import\('\.\/nomad-import-core\.js\?v=[\d.]+'\)/,'{parseNomadMeshes:globalThis.parser}'),r=glbOwnerRuntime({importSource:source});r.c.parser=parseNomadMeshes;r.c.status={textContent:''};
 await r.c.importFile({name:'NOM_SEVEN_OBJECTS_1032.nom',size:bytes.length,arrayBuffer:async()=>bytes.buffer});assert.equal(r.added.length,7,r.status());assert.equal(new Set(r.added.map(o=>o.name)).size,7);
});
