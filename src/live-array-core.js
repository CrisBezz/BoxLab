// Persistent Array recipes reuse the existing mesh/instance/join owners.
import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {combineEditableMeshes} from './object-join-core.js?v=0.36.18.277';
import {transformEditableMesh,deriveInstancePlacement} from './instance-core.js?v=0.36.18.343';
export function createArrayRecipe(mesh,count,endpoint){
 if(!mesh?.clone||!Number.isInteger(count)||count<2||count>12||!Array.isArray(endpoint)||endpoint.length!==3||!endpoint.every(Number.isFinite)||Math.hypot(...endpoint)<1e-6)throw Error('Invalid live Array parameters');
 return {version:1,count,endpoint:[...endpoint],source:{vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces.map(f=>[...f]),creases:[...mesh.creases],faceGroups:[...(mesh.faceGroups||[])],looseEdges:[...(mesh.looseEdges||[])],looseVertices:[...(mesh.looseVertices||[])]}};
}
export function arraySource(recipe){
 if(recipe?.version!==1)throw Error('Unsupported live Array recipe');
 const s=recipe.source;
 if(!s||!Array.isArray(s.vertices)||!Array.isArray(s.faces)||s.vertices.some(v=>!Array.isArray(v)||v.length!==3||!v.every(Number.isFinite))||s.faces.some(f=>!Array.isArray(f)||f.length<3||f.some(i=>!Number.isInteger(i)||i<0||i>=s.vertices.length)))throw Error('Invalid live Array source');
 const mesh=new EditableMesh(s.vertices,s.faces,new Map(s.creases||[]),s.faceGroups||[]);mesh.looseEdges=new Set(s.looseEdges||[]);mesh.looseVertices=new Set(s.looseVertices||[]);return mesh;
}
export function evaluateArray(recipe){
 const source=arraySource(recipe);createArrayRecipe(source,recipe.count,recipe.endpoint);
 return combineEditableMeshes(Array.from({length:recipe.count},(_,i)=>transformEditableMesh(source,new THREE.Matrix4().makeTranslation(...recipe.endpoint.map(v=>v*i/(recipe.count-1))))));
}
export function reopenArray(object){
 const recipe=object.arrayRecipe,generated=evaluateArray(recipe),placement=deriveInstancePlacement(generated,object.mesh);
 if(!placement||Math.abs(placement.determinant())<1e-12)throw Error('Array geometry changed; Undo component edits before reopening');
 const source=transformEditableMesh(arraySource(recipe),placement),endpoint=new THREE.Vector3(...recipe.endpoint).applyMatrix4(placement).sub(new THREE.Vector3().applyMatrix4(placement));
 return {source,count:recipe.count,endpoint};
}
