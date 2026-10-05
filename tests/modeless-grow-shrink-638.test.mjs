import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['Vertex hold exists',main.includes('function armVertexHold(event,vertexIndex)')],
 ['vertical scrub uses existing Grow/Shrink buttons',main.includes("#growSelectionBtn")&&main.includes("#shrinkSelectionBtn")&&main.includes('applyVerticalSelectionScrub')],
 ['Face axis-locks vertical/horizontal',main.includes("FACE SCRUB AXIS")&&main.includes("faceHold.scrubAxis==='vertical'")],
 ['Edge axis-locks vertical/horizontal',main.includes("EDGE SCRUB AXIS")&&main.includes("edgeHold.scrubAxis==='vertical'")],
 ['modeless API includes Vertex hold',main.includes("vertexHold?.pointerId===pointerId")],
 ['single Vertex dormant puck offset',gizmo.includes('[data-mode="vertex"][data-single-component="true"] .tg-activator')],
 ['expanded gizmo root remains centred',gizmo.includes("#totalGizmo{position:absolute")&&gizmo.includes("transform:translate(-50%,-50%)")],
 ['published pins .638',hasAssetReference(index,'main.js')&&hasAssetReference(index,'total-gizmo.js')&&hasAssetReference(index,'edge-paint-select.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("modeless-grow-shrink-638.test: "+name,()=>assert.equal(ok,true,name));
