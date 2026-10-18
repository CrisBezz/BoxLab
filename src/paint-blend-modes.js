// RGB blend functions; inputs/outputs are normalized sRGB byte-space values.
// W3C Compositing Level 1 for standard modes:
// https://www.w3.org/TR/compositing-1/#blending
// Extra modes use the explicit BoxLab conventions in docs/paint-layers-903.md.
export const PAINT_BLEND_MODES=Object.freeze(['normal','darken','multiply','color-burn','linear-burn','darker-color','lighten','screen','color-dodge','linear-dodge','lighter-color','overlay','soft-light','hard-light','vivid-light','linear-light','pin-light','hard-mix','difference','exclusion','subtract','divide','hue','saturation','color','luminosity']);
const modes=new Set(PAINT_BLEND_MODES),clamp=x=>Math.min(1,Math.max(0,x));
export const isPaintBlendMode=mode=>modes.has(mode);
const lum=c=>.3*c[0]+.59*c[1]+.11*c[2],sat=c=>Math.max(...c)-Math.min(...c);
function setLum(c,l){const d=l-lum(c);let out=c.map(v=>v+d);const n=Math.min(...out),x=Math.max(...out);if(n<0)out=out.map(v=>l+(v-l)*l/(l-n));if(x>1)out=out.map(v=>l+(v-l)*(1-l)/(x-l));return out.map(clamp);}
function setSat(c,s){const ids=[0,1,2].sort((a,b)=>c[a]-c[b]),[lo,mid,hi]=ids,out=[0,0,0];if(c[hi]>c[lo]){out[mid]=(c[mid]-c[lo])*s/(c[hi]-c[lo]);out[hi]=s;}return out;}
const burn=(b,s)=>b===1?1:s===0?0:1-Math.min(1,(1-b)/s);
const dodge=(b,s)=>b===0?0:s===1?1:Math.min(1,b/(1-s));
const vivid=(b,s)=>s<=.5?burn(b,2*s):dodge(b,2*s-1);
function channel(mode,b,s){switch(mode){
 case 'normal':return s;
 case 'darken':return Math.min(b,s);
 case 'multiply':return b*s;
 case 'color-burn':return burn(b,s);
 case 'linear-burn':return clamp(b+s-1);
 case 'lighten':return Math.max(b,s);
 case 'screen':return b+s-b*s;
 case 'color-dodge':return dodge(b,s);
 case 'linear-dodge':return clamp(b+s);
 case 'overlay':return b<=.5?2*b*s:1-2*(1-b)*(1-s);
 case 'soft-light':return s<=.5?b-(1-2*s)*b*(1-b):b+(2*s-1)*((b<=.25?((16*b-12)*b+4)*b:Math.sqrt(b))-b);
 case 'hard-light':return s<=.5?2*b*s:1-2*(1-b)*(1-s);
 case 'vivid-light':return vivid(b,s);
 case 'linear-light':return clamp(b+2*s-1);
 case 'pin-light':return s<=.5?Math.min(b,2*s):Math.max(b,2*s-1);
 case 'hard-mix':return vivid(b,s)<.5?0:1;
 case 'difference':return Math.abs(b-s);
 case 'exclusion':return b+s-2*b*s;
 case 'subtract':return Math.max(0,b-s);
 case 'divide':return s===0?1:Math.min(1,b/s);
 default:throw Error('Unsupported paint blend mode');
}}
// Pure, allocation-bounded three-component operation, no alpha/history/input owner.
export function blendPaintRGB(mode,backdrop,source){
 if(!modes.has(mode)||![backdrop,source].every(c=>c?.length===3&&Array.from(c).every(v=>Number.isFinite(v)&&v>=0&&v<=1)))throw Error('Invalid paint blend input');
 switch(mode){
 case 'hue':return setLum(setSat(source,sat(backdrop)),lum(backdrop));
 case 'saturation':return setLum(setSat(backdrop,sat(source)),lum(backdrop));
 case 'color':return setLum(source,lum(backdrop));
 case 'luminosity':return setLum(backdrop,lum(source));
 case 'darker-color':return [...(lum(source)<lum(backdrop)?source:backdrop)];
 case 'lighter-color':return [...(lum(source)>lum(backdrop)?source:backdrop)];
 default:return Array.from(backdrop,(b,k)=>clamp(channel(mode,b,source[k])));
 }
}
