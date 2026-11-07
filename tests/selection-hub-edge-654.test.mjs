import {assertAllModeRadials} from './helpers/radial-runtime.mjs';
import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const giz=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['tools allowed in Face and Edge',assertAllModeRadials],
 ['Edge ring exists',giz.includes('data-ring-mode="edge"')&&giz.includes('aria-label="Edge contextual tools"')],
 ['Edge Extrude proxy',giz.includes('data-tool-target="#edgeExtrudeBtn">Extrude</button>')],
 ['Bevel/Crease proxies',giz.includes('data-tool-target="#bevelBtn">Bevel</button>')&&giz.includes('data-tool-target="#applyCreaseBtn">Crease</button>')],
 ['Slide/Offset proxies',giz.includes('data-tool-target="#edgeSlideBtn">Slide</button>')&&giz.includes('data-tool-target="#offsetLoopBtn">Offset</button>')],
 ['Bridge/Dissolve/Delete proxies',giz.includes('data-tool-target="#bridgeEdgesBtn">Bridge</button>')&&giz.includes('data-tool-target="#dissolveEdgeBtn">Dissolve</button>')&&giz.includes('data-tool-target="#deleteEdgeBtn">Delete</button>')],
 ['ring click checks current mode',giz.includes("const ringMode=button.closest('.tg-tool-ring')?.dataset.ringMode||''")&&giz.includes('if(mode!==ringMode)return;')],
 ['Face/Edge tool rings display separately',giz.includes('[data-mode="face"] .tg-tool-ring[data-ring-mode="face"]')&&giz.includes('[data-mode="edge"] .tg-tool-ring[data-ring-mode="edge"]')],
 ['gizmo reviewed cache pin',hasAssetReference(index,'total-gizmo.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['Shell retained',hasAssetReference(index,'selection-hub-shell-session.js')],
 ['Face-direct .652 retained',hasAssetReference(index,'multi-face-direct.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("selection-hub-edge-654.test: "+name,()=>typeof ok==='function'?ok():assert.equal(ok,true,name));
