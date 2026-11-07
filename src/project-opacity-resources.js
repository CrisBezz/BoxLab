import {encodeOpacityEntry,decodeOpacityEntry,opacityEntryBytes} from './opacity-resource.js?v=0.36.18.1075';
import {createScalarProjectPool,decodeScalarProjectPool} from './scalar-paint-pool.js?v=0.36.18.921';
const codec={encode:encodeOpacityEntry,decode:decodeOpacityEntry,entryBytes:opacityEntryBytes};
export function createProjectOpacityPool(){return createScalarProjectPool(codec,'Opacity');}
export function decodeProjectOpacityPool(scene){
 const has=Object.hasOwn(scene,'opacityPaintPool');
 if(scene.version!==8){if(has||Object.hasOwn(scene,'opacityBaseVersion')||scene.objects.some(o=>Object.hasOwn(o,'opacityPaintResource')||Object.hasOwn(o,'opacityPaint')))throw Error('Opacity requires project version 8');return {baseScene:scene,get(){throw Error('Opacity requires project version 8');},finish(){}};}
 if(!Number.isInteger(scene.opacityBaseVersion)||scene.opacityBaseVersion<1||scene.opacityBaseVersion>7||!Array.isArray(scene.opacityPaintPool)||!scene.opacityPaintPool.length)throw Error('Invalid project v8 opacity/paint envelope');
 const pool=decodeScalarProjectPool(scene.opacityPaintPool,scene.objects,'opacityPaintResource','opacityPaint',codec,'Opacity');
 return {...pool,baseScene:{...scene,version:scene.opacityBaseVersion}};
}
