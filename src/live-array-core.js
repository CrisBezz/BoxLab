// Persistent Array recipes reuse the existing mesh/instance/join owners.
import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {combineEditableMeshes} from './object-join-core.js?v=0.36.18.277';
import {transformEditableMesh,deriveInstancePlacement} from './instance-core.js?v=0.36.18.343';
const vector3=value=>Array.isArray(value)&&value.length===3&&value.every(Number.isFinite);
export function arrayTransforms(recipe){
 const rotation=recipe.rotation??[0,0,0],scale=recipe.scale??[1,1,1],placement=recipe.placement??new THREE.Matrix4().elements;
 if(!vector3(rotation)||rotation.some(v=>Math.abs(v)>3600)||!vector3(scale)||scale.some(v=>v<.05||v>20)||!Array.isArray(placement)||placement.length!==16||!placement.every(Number.isFinite)||placement[3]!==0||placement[7]!==0||placement[11]!==0||placement[15]!==1||Math.abs(new THREE.Matrix4().fromArray(placement).determinant())<1e-12)throw Error('Invalid live Array transforms');
 return {rotation:[...rotation],scale:[...scale],placement:[...placement]};
}
export function createArrayRecipe(mesh,count,endpoint,transforms){
 if(!mesh?.clone||!Number.isInteger(count)||count<2||count>12||!vector3(endpoint)||Math.hypot(...endpoint)<1e-6)throw Error('Invalid live Array parameters');
 const recipe={version:1,count,endpoint:[...endpoint],source:{vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces.map(f=>[...f]),creases:[...mesh.creases],faceGroups:[...(mesh.faceGroups||[])],looseEdges:[...(mesh.looseEdges||[])],looseVertices:[...(mesh.looseVertices||[])]}};
 if(transforms)Object.assign(recipe,arrayTransforms(transforms));
 return recipe;
}
export function arraySource(recipe){
 if(recipe?.version!==1)throw Error('Unsupported live Array recipe');
 const s=recipe.source;
 if(!s||!Array.isArray(s.vertices)||!Array.isArray(s.faces)||s.vertices.some(v=>!vector3(v))||s.faces.some(f=>!Array.isArray(f)||f.length<3||f.some(i=>!Number.isInteger(i)||i<0||i>=s.vertices.length)))throw Error('Invalid live Array source');
 const mesh=new EditableMesh(s.vertices,s.faces,new Map(s.creases||[]),s.faceGroups||[]);mesh.looseEdges=new Set(s.looseEdges||[]);mesh.looseVertices=new Set(s.looseVertices||[]);return mesh;
}
// Each item keeps its centre on the evenly spaced path. Euler angle interpolation
// preserves deliberate full turns; scaling is linear from 1 to the END XYZ factors.
export function arrayItemMatrix(source,t,endpoint,transforms={}){
 const {rotation,scale,placement}=arrayTransforms(transforms);
 const centre=new THREE.Box3().setFromPoints(source.vertices).getCenter(new THREE.Vector3());
 const position=centre.clone().addScaledVector(new THREE.Vector3(...endpoint),t);
 const quaternion=new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation.map(v=>THREE.MathUtils.degToRad(v*t)),'XYZ'));
 const size=new THREE.Vector3(...scale.map(v=>1+(v-1)*t));
 return new THREE.Matrix4().fromArray(placement).multiply(new THREE.Matrix4().compose(position,quaternion,size)).multiply(new THREE.Matrix4().makeTranslation(-centre.x,-centre.y,-centre.z));
}
export function evaluateArray(recipe){
 const source=arraySource(recipe);createArrayRecipe(source,recipe.count,recipe.endpoint);arrayTransforms(recipe);
 return combineEditableMeshes(Array.from({length:recipe.count},(_,i)=>transformEditableMesh(source,arrayItemMatrix(source,i/(recipe.count-1),recipe.endpoint,recipe))));
}
export function reopenArray(object){
 const recipe=object.arrayRecipe,generated=evaluateArray(recipe),delta=deriveInstancePlacement(generated,object.mesh);
 if(!delta||Math.abs(delta.determinant())<1e-12)throw Error('Array geometry changed; Undo component edits before reopening');
 const transforms=arrayTransforms(recipe),placement=delta.multiply(new THREE.Matrix4().fromArray(transforms.placement));
 // Frame inversion can round the homogeneous tail of this internally derived
 // affine matrix. Canonicalize only that output; external recipes stay strict.
 const elements=placement.elements,epsilon=32*Number.EPSILON;
 if(!elements.every(Number.isFinite)||[3,7,11].some(i=>Math.abs(elements[i])>epsilon)||Math.abs(elements[15]-1)>epsilon)throw Error('Array placement is not affine');
 elements[3]=elements[7]=elements[11]=0;elements[15]=1;
 // Preserve a shared frame: moving/scaling the whole array must not conjugate
 // its individual END rotations into a different shape on the next Apply.
 return {source:arraySource(recipe),count:recipe.count,endpoint:new THREE.Vector3(...recipe.endpoint),...transforms,placement:placement.elements.slice()};
}
