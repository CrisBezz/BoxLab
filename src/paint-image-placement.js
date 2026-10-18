import * as THREE from 'three';
// Exactly the Insert tap cycle. Pointer ownership stays with the viewport tool.
export {cycleSurfaceTransformMode as cyclePaintImageMode} from './surface-transform-core.js?v=0.36.18.437';
const tuple=(v,n)=>Array.isArray(v)&&v.length===n&&Array.from({length:n},(_,i)=>i).every(i=>Object.hasOwn(v,i)&&Number.isFinite(v[i]));
export function capturePaintImagePlacement(value){
 const fields=['version','worldToClip','centre','size','rotation'];
 if(!value||Object.keys(value).length!==fields.length||!fields.every(k=>Object.hasOwn(value,k))||value.version!==1||!tuple(value.worldToClip,16)||!tuple(value.centre,2)||!tuple(value.size,2)||value.size.some(v=>v<1e-4||v>1e4)||!Number.isFinite(value.rotation))throw Error('Invalid image projection placement');
 const matrix=new THREE.Matrix4().fromArray(value.worldToClip),det=matrix.determinant();
 if(!Number.isFinite(det)||Math.abs(det)<1e-15)throw Error('Invalid image projection matrix');
 return Object.freeze({...value,worldToClip:Object.freeze([...value.worldToClip]),centre:Object.freeze([...value.centre]),size:Object.freeze([...value.size])});
}
export function paintImagePlacementFromCamera(camera,{centre=[0,0],size=[2,2],rotation=0}={}){
 if(!camera?.isCamera)throw Error('Image projection requires a camera');
 camera.updateMatrixWorld(true);
 return capturePaintImagePlacement({version:1,worldToClip:new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).toArray(),centre,size,rotation});
}
// Returns image-top-first UVs, NOT visibility. Existing painter must separately
// enforce front-facing angle and scene occlusion before rasterizing a texel.
export function createPaintImageProjector(value){
 const placement=capturePaintImagePlacement(value),matrix=new THREE.Matrix4().fromArray(placement.worldToClip),c=Math.cos(placement.rotation),s=Math.sin(placement.rotation);
 return Object.freeze({placement,project(point){
  if(!point||![point.x,point.y,point.z].every(Number.isFinite))return null;
  const clip=new THREE.Vector4(point.x,point.y,point.z,1).applyMatrix4(matrix);
  if(!Number.isFinite(clip.w)||clip.w<=0)return null;
  const x=clip.x/clip.w,y=clip.y/clip.w,z=clip.z/clip.w;
  if(![x,y,z].every(Number.isFinite)||z< -1||z>1||x< -1||x>1||y< -1||y>1)return null;
  const dx=x-placement.centre[0],dy=y-placement.centre[1];
  const u=.5+(c*dx+s*dy)/placement.size[0],v=.5-(-s*dx+c*dy)/placement.size[1];
  return u>=0&&u<=1&&v>=0&&v<=1?{u,v}:null;
 }});
}
