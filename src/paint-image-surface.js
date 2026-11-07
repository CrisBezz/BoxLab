import * as THREE from 'three';
import {surfaceAlignmentQuaternion} from './surface-transform-core.js?v=0.36.18.437';
import {paintImagePlacementFromCamera} from './paint-image-placement.js?v=0.36.18.907';

// Surface placement is an orthographic instance of the SAME retained projector.
// Original Insert alignment owns normal→frame rotation. No mesh or pointer owner.
export function captureSurfaceImageFrame(value){
 if(!value||!['point','normal'].every(k=>Array.isArray(value[k])&&value[k].length===3&&[0,1,2].every(i=>Object.hasOwn(value[k],i)&&Number.isFinite(value[k][i])))||!['width','height','depth','scale','spin'].every(k=>Number.isFinite(value[k]))||Math.min(value.width,value.height,value.depth,value.scale)<=0||value.scale<.05||value.scale>20)throw Error('Invalid surface image frame');
 if(value.triangle!==undefined&&(!Number.isInteger(value.triangle)||value.triangle<0||value.triangle>=20000))throw Error('Invalid surface image triangle');
 const normal=new THREE.Vector3().fromArray(value.normal);if(!Number.isFinite(normal.lengthSq())||normal.lengthSq()<1e-12)throw Error('Invalid surface image normal');
 return {...value,point:[...value.point],normal:normal.normalize().toArray()};
}
export function surfaceImageFrameFromHit(hit,{matrixWorld,geometry,source}){
 if(!hit?.face?.normal||!hit.point||!geometry?.attributes?.position)throw Error('Pick a visible surface on the selected mesh');
 const normal=hit.face.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(matrixWorld)).normalize(),box=new THREE.Box3().setFromBufferAttribute(geometry.attributes.position).applyMatrix4(matrixWorld),diagonal=box.getSize(new THREE.Vector3()).length(),aspect=source.width/source.height;
 if(!Number.isFinite(diagonal)||diagonal<=1e-8||!Number.isFinite(aspect)||aspect<=0)throw Error('Surface image needs a nonempty mesh');
 const extent=diagonal*.45;
 return captureSurfaceImageFrame({...(Number.isInteger(hit.faceIndex)?{triangle:hit.faceIndex}:{}),point:hit.point.toArray(),normal:normal.toArray(),width:aspect>=1?extent:extent*aspect,height:aspect>=1?extent/aspect:extent,depth:diagonal*2,scale:1,spin:0});
}
export function surfaceImageOrientation(frame){return surfaceAlignmentQuaternion(new THREE.Vector3().fromArray(frame.normal),new THREE.Vector3(0,0,1)).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),frame.spin));}
export function surfaceImagePlacement(value){
 const frame=captureSurfaceImageFrame(value),camera=new THREE.OrthographicCamera(-frame.width*frame.scale/2,frame.width*frame.scale/2,frame.height*frame.scale/2,-frame.height*frame.scale/2,frame.depth*1e-5,frame.depth*2);
 camera.position.fromArray(frame.point).addScaledVector(new THREE.Vector3().fromArray(frame.normal),frame.depth);camera.quaternion.copy(surfaceImageOrientation(frame));camera.updateProjectionMatrix();
 return paintImagePlacementFromCamera(camera);
}
// A planar placement guide during contact; the exact UV mesh preview replaces it
// on lift. The guide is excluded from picking and projection occlusion.
export function createSurfaceImageGuide(scene,source){
 const texture=new THREE.DataTexture(source.pixels,source.width,source.height,THREE.RGBAFormat);texture.colorSpace=THREE.SRGBColorSpace;texture.flipY=true;texture.needsUpdate=true;texture.generateMipmaps=false;texture.minFilter=texture.magFilter=THREE.LinearFilter;
 const geometry=new THREE.PlaneGeometry(1,1),material=new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity:.65,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1,toneMapped:false}),plane=new THREE.Mesh(geometry,material);plane.userData.boxlabRenderOverlay=true;plane.userData.boxlabSurfaceImageGuide=true;plane.raycast=()=>{};plane.visible=false;scene.add(plane);
 return {draw(value,{visible=true}={}){plane.visible=!!value&&visible;if(!value)return;const frame=captureSurfaceImageFrame(value);plane.position.fromArray(frame.point).addScaledVector(new THREE.Vector3().fromArray(frame.normal),frame.depth*1e-6);plane.quaternion.copy(surfaceImageOrientation(frame));plane.scale.set(frame.width*frame.scale,frame.height*frame.scale,1);},dispose(){scene.remove(plane);geometry.dispose();material.dispose();texture.dispose();}};
}
