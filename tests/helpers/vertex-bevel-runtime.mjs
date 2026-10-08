import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {History} from '../../src/history.js';
import {createFaceBevelPreview,disposeFaceBevelPreview} from '../../src/bevel-face-preview.js';
// Run the whole existing direct owner. Real kernels, geometry and history;
// only DOM events, projection camera and presentation scheduling are controlled.
export function vertexBevelRuntime(mesh,selected=[0]){
 const nodes=new Map(),doc=new Map();let ids=[...selected];
 const node=s=>{if(!nodes.has(s))nodes.set(s,{value:'20',checked:true,classList:{toggle(){},contains(){return false}},listeners:new Map(),addEventListener(t,f){this.listeners.set(t,f)},dispatchEvent(){},getBoundingClientRect(){return{left:0,top:0,width:400,height:400}},setPointerCapture(){},releasePointerCapture(){}});return nodes.get(s)};
 const camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.set(5,5,5);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const ctx={THREE,Map,Set,Event:class{},CustomEvent:class{constructor(type,options){Object.assign(this,{type,...options})}},queueMicrotask:f=>f(),createFaceBevelPreview,disposeFaceBevelPreview,
 document:{querySelector:node,addEventListener:(t,f)=>doc.set(t,f)},window:{dispatchEvent(){}},__boxlabBridgeState:{mesh,camera,scene:new THREE.Group()},__boxlabHistory:new History(),__boxlabObjectManager:{activeId:1},__boxlabSelectionBridge:{mode:()=> 'vertex',indices:()=>ids,set:(_,next)=>ids=[...next]}};
 vm.runInNewContext(fs.readFileSync(new URL('../../src/direct-multi-vertex-bevel.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),ctx);
 const owner=ctx.__boxlabDirectVertexBevel;
 const arm=()=>doc.get('click')({target:{closest:s=>s==='#vertexBevelBtn'?node(s):null},preventDefault(){},stopImmediatePropagation(){}});
 const pointer=(type,dx=0)=>{const p=mesh.vertices[selected[0]].clone().project(camera);node('#viewport').listeners.get(type)({type,pointerId:1,isPrimary:true,clientX:(p.x*.5+.5)*400+dx,clientY:(-p.y*.5+.5)*400,preventDefault(){},stopImmediatePropagation(){}})};
 return{ctx,owner,node,arm,pointer,ids:()=>ids};
}
