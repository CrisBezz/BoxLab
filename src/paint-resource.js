// Versioned colour paint resource. Callers own scene history; committed pixels are
// read-only by convention. Capture/encode/decode always isolate caller buffers.
const LIMIT=1024;
const keys=['version','channel','width','height','colorSpace','rowOrder','binding'];
function descriptor(value){
 if(!value||value.version!==1||value.channel!=='baseColor'||value.colorSpace!=='srgb'||value.rowOrder!=='uv-v0-first'||![value.width,value.height].every(n=>Number.isInteger(n)&&n>=16&&n<=LIMIT)||typeof value.binding!=='string'||!/^[a-f0-9]{64}$/.test(value.binding))throw Error('Unsupported colour paint resource');
 return Object.fromEntries(keys.map(k=>[k,value[k]]));
}
function pixels(value,d){if(!(value instanceof Uint8Array)||value.length!==d.width*d.height*4)throw Error('Invalid paint pixels');for(let i=3;i<value.length;i+=4)if(value[i]!==255)throw Error('Paint resource v1 requires opaque colour');return value;}
export async function paintDigest(bytes){if(!globalThis.crypto?.subtle)throw Error('Paint integrity checks need Web Crypto');return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(v=>v.toString(16).padStart(2,'0')).join('');}
export function captureColourResource({width,height,pixels:data,binding}){const d=descriptor({version:1,channel:'baseColor',width,height,colorSpace:'srgb',rowOrder:'uv-v0-first',binding});return Object.freeze({...d,pixels:pixels(data,d).slice()});}
export async function encodeColourResource(value){const d=descriptor(value),data=pixels(value.pixels,d).slice();return {descriptor:{...d,byteLength:data.length,sha256:await paintDigest(data)},bytes:data};}
export async function decodeColourResource(value,data,expectedBinding){
 const d=descriptor(value);if(Object.keys(value).some(k=>![...keys,'byteLength','sha256'].includes(k))||d.binding!==expectedBinding||value.byteLength!==d.width*d.height*4||!/^[a-f0-9]{64}$/.test(value.sha256||''))throw Error('Invalid paint resource binding or descriptor');
 const copy=pixels(data,d).slice();if(await paintDigest(copy)!==value.sha256)throw Error('Paint pixels failed integrity check');return Object.freeze({...d,pixels:copy});
}
