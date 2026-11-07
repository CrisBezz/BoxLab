import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {boundarySelectionInfo,extrudeBoundaryEdges,perpendicularAxisDirection,projectPerpendicularDelta} from '../../src/edge-extrude-core.js';
import {vertexRuntime} from './vertex-extrude-runtime.mjs';
export function edgeRuntime(m=new EditableMesh([[-1,0,0],[1,0,0]],[]),options={}){
 if(!m.faces.length&&!m.looseEdges?.size)m.addLooseEdge(0,1);const f=vertexRuntime(m,[0],options),c=f.context;f.setMode('edge');
 const tools=f.fields.get('#viewportWrap'),row=tools.querySelector('.edge-move-actions');row.prepend=x=>row.appendChild(x);f.fields.set('[data-mode-tools="edge"]',tools);
 let constraint='free';c.__boxlabTransformArming={active:()=>true,activateRealMove(){},constraint:()=>constraint,setConstraint:x=>constraint=x,disarm(){}};
 Object.assign(c,{boundarySelectionInfo,extrudeBoundaryEdges,perpendicularAxisDirection,projectPerpendicularDelta});
 function edges(){f.state.edgeObjects=new Map(m.edges().map((e,i)=>{const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([m.vertices[e.a],m.vertices[e.b]]),new THREE.LineBasicMaterial());line.userData.index=i;line.updateMatrixWorld();return[i,line];}));}
 f.fields.get('#cageToggle').addEventListener('change',edges);edges();f.load('edge-extrude.js');f.edge=c.__boxlabEdgeExtrude;f.edgeSession=c.__boxlabEdgeExtrudeViewportSession;
 f.choose=x=>f.edge.setDirection(x);
 f.edgeTap=i=>{const e=m.edges()[i],p=f.screen(m.vertices[e.a].clone().add(m.vertices[e.b]).multiplyScalar(.5));f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.pointer('pointerup',{clientX:p.x,clientY:p.y});f.flush();};
 f.edgePull=(i,dx=30,dy=-60,end='pointerup')=>{const e=m.edges()[i],p=f.screen(m.vertices[e.a].clone().add(m.vertices[e.b]).multiplyScalar(.5));f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.pointer('pointermove',{clientX:p.x+dx,clientY:p.y+dy});f.pointer(end,{clientX:p.x+dx,clientY:p.y+dy});f.flush();};return f;
}
