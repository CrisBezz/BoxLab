import {encodeBoxlabScene,decodeBoxlabScene} from '../../src/boxlab-project-codec.js?v=0.36.18.935';
import {EditableMesh} from '../../src/mesh.js';
import {captureColourResource,encodeColourResource,decodeColourResource,paintDigest} from '../../src/paint-resource.js?v=898';
import {brushSettings} from './paint-core.js?v=0.36.18.934';
// Lab transport wraps the ORIGINAL BoxLab scene codec; it is not a .boxlab file.
const MAGIC=new TextEncoder().encode('BOXPAINT'),HEADER_LIMIT=1024*1024;
export const PAINT_SESSION_LIMIT=4*1024*1024;
const encoder=new TextEncoder(),decoder=new TextDecoder('utf-8',{fatal:true});
function savedSettings(value){const keys=['colour','radius','hardness','opacity','pressure'];if(!value||typeof value!=='object'||Array.isArray(value)||keys.some(k=>!Object.hasOwn(value,k))||Object.keys(value).some(k=>!keys.includes(k)))throw Error('Invalid saved brush settings');return brushSettings(value);}
function viewState(value){if(!value||!['position','target'].every(k=>Array.isArray(value[k])&&value[k].length===3&&value[k].every(n=>Number.isFinite(n)&&Math.abs(n)<=100))||Math.hypot(...value.position.map((v,i)=>v-value.target[i]))<.1||Math.hypot(...value.position.map((v,i)=>v-value.target[i]))>50)throw Error('Invalid saved camera');return {position:[...value.position],target:[...value.target]};}
function sceneGuard(scene){const o=scene?.objects?.[0];if(scene?.format!=='boxlab'||scene.version!==1||scene.objects?.length!==1||o.kind!=='editable'||o.sourceId||o.booleanRecipe||o.arrayRecipe||o.curveProfile||o.locked||o.visible!==true||Object.keys(o.settings||{}).length||o.glbResource?.version!==3||!Array.isArray(o.mesh?.vertices)||!Array.isArray(o.mesh?.faces)||o.mesh.vertices.length>2000||o.mesh.faces.length>2000||scene.glbImagePool)throw Error('Paint Lab session requires one plain native UV sample');}
export async function encodePaintSession({sample,object,layers,settings,selected,camera}){
 if(!['sphere','cube','plane'].includes(sample)||![0,1].includes(selected)||layers?.length!==2)throw Error('Invalid Paint Lab session');
 // Everything mutable is copied synchronously before the first async digest.
 const scene=encodeBoxlabScene({activeId:object.id,selected:[object.id],multi:false,groups:[],objects:[object]});sceneGuard(scene);
 const options={...savedSettings(settings)},view=viewState(camera),copies=layers.map(l=>{if(l.size!==512)throw Error('Paint Lab requires 512 square maps');return l.pixels.slice();});
 const binding=await paintDigest(encoder.encode(JSON.stringify(scene))),resources=[];
 for(const data of copies)resources.push(await encodeColourResource(captureColourResource({width:512,height:512,pixels:data,binding})));
 const meta={format:'boxlab-uv-paint-lab',version:1,sample,scene,settings:options,selected,camera:view,resources:resources.map(r=>r.descriptor)},header=encoder.encode(JSON.stringify(meta));
 if(header.length>HEADER_LIMIT)throw Error('Paint Lab header exceeds budget');const length=16+header.length+resources.reduce((n,r)=>n+r.bytes.length,0);if(length>PAINT_SESSION_LIMIT)throw Error('Paint Lab session exceeds 4 MiB');
 const out=new Uint8Array(length),dv=new DataView(out.buffer);out.set(MAGIC);dv.setUint32(8,1,true);dv.setUint32(12,header.length,true);out.set(header,16);let at=16+header.length;for(const r of resources){out.set(r.bytes,at);at+=r.bytes.length;}return out;
}
export async function decodePaintSession(value){
 if(!(value instanceof Uint8Array)||value.length<16||value.length>PAINT_SESSION_LIMIT)throw Error('Invalid or oversized Paint Lab file');
 const bytes=value.slice(),dv=new DataView(bytes.buffer);if(!MAGIC.every((v,i)=>v===bytes[i])||dv.getUint32(8,true)!==1)throw Error('Unsupported Paint Lab file');const n=dv.getUint32(12,true);if(n>HEADER_LIMIT||n>bytes.length-16)throw Error('Invalid Paint Lab header');
 const meta=JSON.parse(decoder.decode(bytes.subarray(16,16+n)));
 if(meta.format!=='boxlab-uv-paint-lab'||meta.version!==1||Object.keys(meta).some(k=>!['format','version','sample','scene','settings','selected','camera','resources'].includes(k))||!['sphere','cube','plane'].includes(meta.sample)||![0,1].includes(meta.selected)||!Array.isArray(meta.resources)||meta.resources.length!==2)throw Error('Unsupported Paint Lab session');
 sceneGuard(meta.scene);const settings=savedSettings(meta.settings),camera=viewState(meta.camera),binding=await paintDigest(encoder.encode(JSON.stringify(meta.scene)));let at=16+n;const layers=[];
 for(const r of meta.resources){if(r.width!==512||r.height!==512||r.byteLength!==512*512*4||at+r.byteLength>bytes.length)throw Error('Invalid Paint Lab map size');layers.push(await decodeColourResource(r,bytes.subarray(at,at+r.byteLength),binding));at+=r.byteLength;}
 if(at!==bytes.length)throw Error('Unexpected trailing Paint Lab data');
 const scene=decodeBoxlabScene(meta.scene,(...args)=>new EditableMesh(...args));return {sample:meta.sample,object:scene.objects[0],layers,settings,selected:meta.selected,camera};
}
// In-flight loads cannot replace a newer stroke/reset/selection or supersede another Open.
export function createPaintSessionIO({capture,revision,apply}){
 let generation=0;
 return {save:()=>encodePaintSession(capture()),async open(read){const token=++generation,expected=revision();const bytes=await read();const staged=await decodePaintSession(bytes);if(token!==generation||expected!==revision())throw Error('Paint session changed while opening; try Open again');apply(staged);return true;},invalidate(){generation++;}};
}
