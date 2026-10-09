import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {pencilSelectionRuntime} from './helpers/pencil-selection-runtime.mjs';
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['gate has explicit registration depth',gate.includes('let orbitRegistrationDepth = 0')],
 ['gate exposes begin/end registration',gate.includes('function beginOrbitRegistration()')&&gate.includes('function endOrbitRegistration()')],
 ['pointer listeners wrapped explicitly during window',gate.includes('const explicitOrbitPointer = pointerEvent && orbitRegistrationDepth>0')],
 ['name fallback retained',gate.includes('const namedOrbitPointer = pointerEvent && /onPointer/i.test(name)')],
 ['main begins registration before OrbitControls',main.indexOf('beginOrbitRegistration?.()')<main.indexOf('new OrbitControls(camera,canvas)')],
 ['main ends registration after OrbitControls',main.indexOf('endOrbitRegistration?.()')>main.indexOf('new OrbitControls(camera,canvas)')],
 ['constructor protected by finally',main.includes('try{\n  controls=new OrbitControls(camera,canvas);\n}finally{')],
 ['gate reviewed cache pin',hasAssetReference(index,'pencil-orbit-gate.js')],
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("orbit-registration-handoff-647.test: "+name,()=>assert.equal(ok,true,name));

test('orbit-registration-handoff-647.test: anonymous registered and named fallback Orbit listeners follow current deferred routing',()=>{
 for(const kind of ['anonymous','named'])for(const backdrop of ['mesh','background']){const f=pencilSelectionRuntime();f.multi.checked=false;let down=0,other=0;const gate=f.context.__boxlabPencilOrbitGate;if(kind==='anonymous'){gate.beginOrbitRegistration();try{f.canvas.addEventListener('pointerdown',()=>down++);}finally{gate.endOrbitRegistration();}}else f.canvas.addEventListener('pointerdown',function onPointerLegacyDown(){down++;});f.canvas.addEventListener('pointerdown',()=>other++);const wrapped=f.logs.findLast(e=>e.stage==='PEN ORBIT LISTENER WRAPPED');assert.equal(wrapped.detail.explicit,kind==='anonymous');const p=backdrop==='mesh'?f.screen(new THREE.Vector3()):{x:990,y:590};f.pointer('pointerdown',{clientX:p.x,clientY:p.y});assert.equal(down,backdrop==='mesh'?0:1);assert.equal(other,1);if(backdrop==='mesh'){f.pointer('pointermove',{clientX:p.x+40,clientY:p.y});assert.equal(down,1);assert.equal(other,1);}f.pointer('pointerup',{clientX:p.x+40,clientY:p.y});assert.equal(f.context.__boxlabPencilOrbitDebug.snapshot().pendingMeshOrbit,null);}
});
