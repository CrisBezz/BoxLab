import {encodeMetalnessEntry,decodeMetalnessEntry,metalnessEntryBytes} from './metalness-resource.js?v=0.36.18.1030';
import {createScalarProjectPool,decodeScalarProjectPool} from './scalar-paint-pool.js?v=0.36.18.921';
const codec={encode:encodeMetalnessEntry,decode:decodeMetalnessEntry,entryBytes:metalnessEntryBytes};
export function createProjectMetalnessPool(){return createScalarProjectPool(codec,'Metalness');}
export function decodeProjectMetalnessPool(scene){
 const has=Object.hasOwn(scene,'metalnessPaintPool');
 if(scene.version!==7){if(has||Object.hasOwn(scene,'paintProjectVersion')||scene.objects.some(o=>Object.hasOwn(o,'metalnessPaintResource')||Object.hasOwn(o,'metalnessPaint')))throw Error('Metalness requires project version 7');return {baseScene:scene,get(){throw Error('Metalness requires project version 7');},finish(){}};}
 if(!Number.isInteger(scene.paintProjectVersion)||scene.paintProjectVersion<1||scene.paintProjectVersion>6||!Array.isArray(scene.metalnessPaintPool)||!scene.metalnessPaintPool.length)throw Error('Invalid project v7 metalness/paint envelope');
 const pool=decodeScalarProjectPool(scene.metalnessPaintPool,scene.objects,'metalnessPaintResource','metalnessPaint',codec,'Metalness');
 return {...pool,baseScene:{...scene,version:scene.paintProjectVersion}};
}
