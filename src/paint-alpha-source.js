import {inspectPaintImage,importPaintImage} from './paint-image-source.js?v=0.36.18.907';
import {captureAlphaTip} from '../evaluations/uv-paint/alpha-tip.js?v=0.36.18.929';
// Reuse the original bounded browser decoder; reject oversized tips before decode.
export async function importPaintAlpha(bytes,options){
 if(!(bytes instanceof Uint8Array)||bytes.length>256*1024)throw Error('Alpha PNG exceeds 256 KiB');
 const info=inspectPaintImage(bytes);
 if(info.mime!=='image/png'||info.width>256||info.height>256)throw Error('Choose an alpha PNG at most 256 × 256 pixels');
 const source=await importPaintImage(bytes,options),pixels=new Uint8Array(source.width*source.height);let visible=false;
 for(let i=0;i<pixels.length;i++){const at=i*4;pixels[i]=Math.round((.2126*source.pixels[at]+.7152*source.pixels[at+1]+.0722*source.pixels[at+2])*source.pixels[at+3]/255);if(pixels[i])visible=true;}
 if(!visible)throw Error('Alpha PNG has no coverage; use white on black or transparency');
 return captureAlphaTip({width:source.width,height:source.height,pixels});
}
