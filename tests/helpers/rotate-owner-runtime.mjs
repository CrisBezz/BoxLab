import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {History} from '../../src/history.js';
import {orderedDOM} from './ordered-dom.mjs';
const read=name=>fs.readFileSync(new URL('../../src/'+name,import.meta.url),'utf8');
// Whole current owners, actual geometry/math/history. Controlled DOM/dispatch,
// gizmo visibility/arming and redraw boundary; not browser propagation or main.
export function rotateOwnerRuntime({mode='face',ids=[0],tool='rotate',visible=true,upgradeSource=read('transform-upgrade.js'),rotateSource=read('rotate-transform.js')}={}){
 const dom=orderedDOM(),doc=dom.node(),win=dom.node(),canvas=dom.node('viewport'),status=dom.node('selectionStatus'),rotate=dom.node(),precision=dom.node(),value=dom.node(),snap=dom.node(),cage=dom.node();
 rotate.dataset={tool:'rotate'};rotate.classList.add('active');canvas.getBoundingClientRect=()=>({left:0,top:0,width:640,height:480});let captured=null;
 canvas.setPointerCapture=id=>captured=id;
 const mesh=EditableMesh.cube(2),history=new History(60),camera=new THREE.PerspectiveCamera(45,640/480,.1,100);camera.position.set(0,0,8);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
 let selected=[...ids],redraws=0;const events=[];
 cage.dispatchEvent=()=>redraws++;precision.querySelector=s=>s==='#transformValue'?value:s==='#transformSnapBtn'?snap:null;
 doc.querySelector=s=>({'#viewport':canvas,'#selectionStatus':status,'#toolModes button[data-tool="rotate"]':rotate,'#cageToggle':cage,'#transformSnapBtn':snap}[s]||null);doc.querySelectorAll=()=>[];doc.createElement=()=>precision;
 const c={THREE,document:doc,window:win,Event:class{constructor(type){this.type=type;}},CustomEvent:class{constructor(type,o){this.type=type;this.detail=o?.detail;}},setTimeout:()=>{},queueMicrotask:fn=>fn(),
  __boxlabBridgeState:{mesh,camera},__boxlabHistory:history,
  __boxlabSelectionBridge:{mode:()=>mode,indices:()=>selected,set:(m,next)=>selected=[...next]},
  __boxlabTransformArming:{tool:()=>tool,constraint:()=> 'z',active:()=>true},__boxlabTotalGizmo:{visible:()=>visible},
  __boxlabObjectManager:{pickObject:()=>({id:1})},__boxlabObjectSelection:{ids:new Set([1]),multi:false}};
 win.dispatchEvent=e=>events.push(e);vm.createContext(c);
 vm.runInContext('{'+upgradeSource.replace(/^import .*;\n/gm,'')+'}',c);
 vm.runInContext('{'+rotateSource.replace(/^import .*;\n/gm,'')+'}',c);
 const point=(type,x,y,extra={})=>({type,target:canvas,isPrimary:true,pointerType:'pen',pointerId:1,clientX:x,clientY:y,preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;},...extra});
 return {c,mesh,history,camera,canvas,status,events,selected:()=>selected,captured:()=>captured,redraws:()=>redraws,
  dispatch(type,x,y,extra={}){const e=point(type,x,y,extra);doc.dispatchEvent(e);return e;},
  begin(x,y,spec={tool:'rotate',constraint:'z'}){return c.__boxlabTransformUpgrade.beginGizmoGesture(spec,point('pointerdown',x,y));},
  centre(){const vertices=new Set(mode==='vertex'?ids:mode==='edge'?ids.flatMap(id=>{const e=mesh.edges()[id];return[e.a,e.b];}):mode==='face'?ids.flatMap(id=>mesh.faces[id]):mesh.vertices.map((_,i)=>i));const p=new THREE.Vector3();for(const i of vertices)p.add(mesh.vertices[i]);p.divideScalar(vertices.size).project(camera);return{x:(p.x*.5+.5)*640,y:(-p.y*.5+.5)*480};}
 };
}
