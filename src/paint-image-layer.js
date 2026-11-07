// Retained image recipe; surface preview pixels remain in the existing layer.
import * as THREE from 'three';
import {capturePaintImageSource} from './paint-image-source.js?v=0.36.18.907';
import {capturePaintImagePlacement} from './paint-image-placement.js?v=0.36.18.907';
export function paintImageLayerBytes(value){
 const source=value?.source;
 if(!(source?.encoded instanceof Uint8Array)||!(source?.pixels instanceof Uint8Array))throw Error('Invalid image layer source buffers');
 return source.encoded.byteLength+source.pixels.byteLength;
}
export function capturePaintImageLayer(value){
 const fields=['version','source','placement','objectToWorld'];
 if(!value||Object.keys(value).length!==fields.length||!fields.every(k=>Object.hasOwn(value,k))||value.version!==1)throw Error('Unsupported image layer recipe');
 const frame=value.objectToWorld;
 if(!Array.isArray(frame)||frame.length!==16||!Array.from({length:16},(_,i)=>i).every(i=>Object.hasOwn(frame,i)&&Number.isFinite(frame[i]))||frame[3]!==0||frame[7]!==0||frame[11]!==0||frame[15]!==1)throw Error('Invalid image layer object frame');
 const det=new THREE.Matrix4().fromArray(frame).determinant();if(!Number.isFinite(det)||Math.abs(det)<1e-12)throw Error('Invalid image layer object frame');
 // Future re-projection uses placement.worldToClip * objectToWorld on local
 // geometry; navigating or moving the object must not rewrite this capture frame.
 return Object.freeze({version:1,source:capturePaintImageSource(value.source),placement:capturePaintImagePlacement(value.placement),objectToWorld:Object.freeze([...frame])});
}
