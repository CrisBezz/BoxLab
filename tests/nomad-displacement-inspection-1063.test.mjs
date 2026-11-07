import test from 'node:test';
import assert from 'node:assert/strict';
import {nomadMapInspectionFixture} from './helpers/nomad-map-inspection-fixture.mjs';
import {nativeImageChoices} from '../src/nomad-uv-image-choices.js';
test('1063 displacement inspection reports retained source settings without applying or changing them',async()=>{
 const {objects}=await nomadMapInspectionFixture(),p=objects[0].glbPassthrough,m=p.nomadMaterial;
 m.factorDisplacement=-.25;m.displacementMid=0;m.displacementWorld=false;
 const before=structuredClone(p),choice=nativeImageChoices(p,undefined,['displacement'])[0];
 assert.match(choice.referenceStatus,/source strength -0.25 · midpoint 0 · world space no · projection triplanar · source image \d+ bytes/);
 assert.equal(choice.data,p.images[m.textures.displacement.index].data);assert.deepEqual(p,before);
 m.displacementWorld=true;assert.match(nativeImageChoices(p,undefined,['displacement'])[0].referenceStatus,/world space yes/);
 delete m.factorDisplacement;delete m.displacementMid;delete m.displacementWorld;delete m.textures.displacement.projection;
 assert.match(nativeImageChoices(p,undefined,['displacement'])[0].referenceStatus,/source strength not recorded · midpoint not recorded · world space not recorded · projection not recorded/);
 assert.doesNotMatch(nativeImageChoices(p,undefined,['color'])[0].referenceStatus,/source strength/);
});
