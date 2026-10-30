import {encodeRoughnessEntry,decodeRoughnessEntry,roughnessEntryBytes} from './roughness-resource.js?v=0.36.18.1027';
import {createScalarProjectPool,decodeScalarProjectPool} from './scalar-paint-pool.js?v=0.36.18.921';
const codec={encode:encodeRoughnessEntry,decode:decodeRoughnessEntry,entryBytes:roughnessEntryBytes};
export function createProjectRoughnessPool(){return createScalarProjectPool(codec,'Roughness');}
export function decodeProjectRoughnessPool(scene){
 const has=Object.hasOwn(scene,'roughnessPaintPool');
 if(scene.version!==6){if(has||Object.hasOwn(scene,'colourPaintVersion')||scene.objects.some(o=>Object.hasOwn(o,'roughnessPaintResource')||Object.hasOwn(o,'roughnessPaint')))throw Error('Roughness requires project version 6');return {colourScene:scene,get(){throw Error('Roughness requires project version 6');},finish(){}};}
 if(!Number.isInteger(scene.colourPaintVersion)||scene.colourPaintVersion<1||scene.colourPaintVersion>5||!Array.isArray(scene.roughnessPaintPool)||!scene.roughnessPaintPool.length)throw Error('Invalid project v6 roughness/colour envelope');
 const pool=decodeScalarProjectPool(scene.roughnessPaintPool,scene.objects,'roughnessPaintResource','roughnessPaint',codec,'Roughness');
 return {...pool,colourScene:{...scene,version:scene.colourPaintVersion}};
}
