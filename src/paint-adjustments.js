import {filterPaintPixels} from '../evaluations/uv-paint/paint-core.js?v=0.36.18.1071';

export const PAINT_ADJUSTMENTS=Object.freeze([
 ['exposure','Exposure',-3,3,.05],['brilliance','Brilliance',-100,100,1],['highlights','Highlights',-100,100,1],['shadows','Shadows',-100,100,1],['contrast','Contrast',-100,100,1],['brightness','Brightness',-100,100,1],['blackPoint','Black point',-100,100,1],['saturation','Saturation',-100,100,1],['vibrance','Vibrance',-100,100,1],['warmth','Warmth',-100,100,1],['tint','Tint',-100,100,1],['blur','Blur',0,100,1],['sharpness','Sharpness',0,100,1],['definition','Definition',0,100,1]
].map(row=>Object.freeze(row)));
const clamp=v=>Math.max(0,Math.min(1,v));
export function paintAdjustmentSettings(value={}){
 if(!value||typeof value!=='object'||Object.keys(value).some(k=>!PAINT_ADJUSTMENTS.some(r=>r[0]===k)))throw Error('Unknown image adjustment');
 return Object.fromEntries(PAINT_ADJUSTMENTS.map(([key,,min,max])=>{const n=value[key]??0;if(!Number.isFinite(n)||n<min||n>max)throw Error('Invalid '+key);return [key,n];}));
}
// All renders start from this immutable session snapshot. Filters reuse the
// painter's face/seam-aware kernel; never blur adjacent but unrelated UV islands.
export function createPaintAdjustments({pixels,size,filter}){
 if(!Number.isInteger(size)||size<16||size>1024||!(pixels instanceof Uint8Array)||pixels.length!==size*size*4)throw Error('Invalid adjustment source');
 const original=pixels.slice();let soft=null,fine=null;
 function spatial(amount){if(typeof filter!=='function')throw Error('Surface filter unavailable');return filterPaintPixels(original,size,filter(),{amount});}
 return {render(value={}){
  const s=paintAdjustmentSettings(value);if(Object.values(s).every(v=>v===0))return original.slice();
  if((s.blur||s.definition)&&!soft)soft=spatial(8);if(s.sharpness&&!fine)fine=spatial(1);
  const out=original.slice(),gain=2**s.exposure,lut=new Float64Array(256);
  for(let i=0;i<256;i++){const v=i/255,linear=v<=.04045?v/12.92:((v+.055)/1.055)**2.4,x=linear*gain;lut[i]=clamp(x<=.0031308?12.92*x:1.055*x**(1/2.4)-.055);}
  const colourActive=PAINT_ADJUSTMENTS.some(([key])=>!['blur','sharpness','definition'].includes(key)&&s[key]!==0);
  const rgb=new Float64Array(3);
  for(let i=0;i<original.length;i+=4){if(!original[i+3])continue;
   for(let c=0;c<3;c++){
    let byte=original[i+c];if(s.blur)byte+=(soft[i+c]-byte)*s.blur/100;
    if(s.sharpness)byte+=(original[i+c]-fine[i+c])*s.sharpness/50;
    if(s.definition)byte+=(original[i+c]-soft[i+c])*s.definition/100;
    if(!colourActive){out[i+c]=Math.round(Math.max(0,Math.min(255,byte)));continue;}
    let v=lut[Math.round(Math.max(0,Math.min(255,byte)))];
    rgb[c]=v;
   }
   if(!colourActive)continue;
   const y=.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2],dark=(1-y)**2,light=y*y;
   const tone=s.brightness/400+s.shadows/300*dark+s.highlights/300*light-s.blackPoint/500*dark+s.brilliance/100*(.18*dark-.08*light);
   const contrast=1+s.contrast/100+s.brilliance/500;
   for(let c=0;c<3;c++)rgb[c]=(rgb[c]-.5)*contrast+.5+tone;
   rgb[0]+=s.warmth/800+s.tint/1600;rgb[1]-=s.tint/800;rgb[2]-=s.warmth/800;rgb[2]+=s.tint/1600;
   const luminance=.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2],chroma=Math.max(rgb[0],rgb[1],rgb[2])-Math.min(rgb[0],rgb[1],rgb[2]),sat=Math.max(0,1+s.saturation/100+s.vibrance/100*(1-clamp(chroma)));
   for(let c=0;c<3;c++)out[i+c]=Math.round(clamp(luminance+(rgb[c]-luminance)*sat)*255);
  }
  return out;
 }};
}
