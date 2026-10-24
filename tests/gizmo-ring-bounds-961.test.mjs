import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const source=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
function runtime(){const root={hidden:false,getBoundingClientRect:()=>({width:196,height:196})},camera=new THREE.PerspectiveCamera(45,1.5,.01,100);camera.position.z=5;camera.lookAt(0,0,0);camera.updateMatrixWorld();const c=vm.createContext({THREE,root,SIZE:196,HALF:98,canvas:{getBoundingClientRect:()=>({width:900,height:600})}});vm.runInContext(source.slice(source.indexOf('function screenPoint('),source.indexOf('function axisScreen('))+source.slice(source.indexOf('function ringWorldRadius('),source.indexOf('function syncRotationRings(')),c);return{c,root,camera};}
test('961 actual projected ring paths remain bounded through hide/zero-size/restore and reject invalid projections',()=>{
 const {c,root,camera}=runtime(),centre=new THREE.Vector3(),path=()=>c.projectedRingPath(centre,camera,'x'),before=path();assert(before.startsWith('M'));assert(before.endsWith(' Z'));
 root.hidden=true;root.getBoundingClientRect=()=>({width:0,height:0});assert.equal(path(),'');root.hidden=false;assert.equal(path(),'');root.getBoundingClientRect=()=>({width:196,height:196});assert.equal(path(),before);
 for(const axis of ['x','y','z']){const d=c.projectedRingPath(centre,camera,axis);assert(d);for(const n of d.match(/-?\d+(?:\.\d+)?/g).map(Number))assert(n>=0&&n<=196);}
 assert.equal(c.projectedRingPath(camera.position.clone(),camera,'y'),'');assert.equal(c.projectedRingPath(new THREE.Vector3(NaN,0,0),camera,'x'),'');
});
test('961 hidden gizmo no longer updates axis visuals; main SVG bounds overflow without clipping external tool rings and shortcuts',()=>{
 assert.match(source,/if\(!root.hidden&&!suppressed.*syncAxisVisuals/);
 const css=source.match(/#totalGizmo\{[^}]+\}/)[0];assert(!css.includes('filter:'));
 assert(source.includes('#totalGizmo>svg{overflow:hidden}'));assert(source.includes('#totalGizmo .tg-shortcut svg{display:block!important'));assert(source.includes('style="--a:45deg;--r:230px" data-tool-target="#viewportPaintBtn"'));
});
