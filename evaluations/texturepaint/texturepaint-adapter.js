// TexturePaint evaluation adapter. Stamp blending adapted from ceramicSoda/TexturePaint
// 3af8a61e9493ff960ff29ed429fc734335c80931 (MIT; see vendor/LICENSE).
// Upstream brush + DataTexture; BoxLab-specific bounds, sRGB bytes and stroke lifecycle.
import * as THREE from 'three';
import {TexurePaint} from './vendor/texturePaint.upstream.js';
export function createPaintTrial({resolution=512,historyLimit=12}={}){
 if(!Number.isInteger(resolution)||resolution<16||resolution>1024||!Number.isInteger(historyLimit)||historyLimit<1||historyLimit>12)throw Error('Paint trial budget exceeded');
 const painter=new TexurePaint(null,null,resolution,0),texture=painter.texture;
 // Never call upstream getTexture(): it creates another texture and clears pixels.
 texture.colorSpace=THREE.SRGBColorSpace;texture.generateMipmaps=false;
 texture.minFilter=texture.magFilter=THREE.LinearFilter;texture.flipY=false;
 painter.history.length=0;
 let before=null,changed=false,disposed=false;const undo=[],redo=[];
 function configure({color='#e34b37',radius=12,hardness=.8,opacity=1}={}){
  if(disposed)return;
  if(!/^#[0-9a-f]{6}$/i.test(color)||![radius,hardness,opacity].every(Number.isFinite)||radius<1||radius>64||hardness<0||hardness>1||opacity<0||opacity>1)throw Error('Invalid trial brush');
  // THREE.Color stores linear RGB; the byte buffer is explicitly sRGB.
  painter.brush.changeColor(new THREE.Color(color).convertLinearToSRGB());
  painter.brush.changeBrush(Math.round(radius),Math.max(.001,hardness));
  // Correct upstream "hardness" (which actually scales opacity) into a flat centre + soft rim.
  const b=painter.brush;for(let y=0;y<b.s;y++)for(let x=0;x<b.s;x++){
   const d=Math.hypot(x-(b.r-1),y-(b.r-1))/b.r;
   b.buf[x+y*b.s]=Math.round(255*(d>=1?0:d<=hardness?1:(1-d)/(1-hardness)));
  }
  painter.brush.changeOpacity(opacity);
 }
 configure();
 function begin(){if(disposed||before)return false;before=painter.buf.slice();changed=false;return true;}
 function stamp(u,v,pressure=1){
  if(disposed||!before||![u,v,pressure].every(Number.isFinite)||u<0||u>1||v<0||v>1)return false;
  const b=painter.brush,buf=painter.buf,originX=Math.round(u*(resolution-1))-(b.r-1),originY=Math.round(v*(resolution-1))-(b.r-1),weight=Math.max(0,Math.min(1,pressure));let touched=false;
  for(let y=0;y<b.s;y++)for(let x=0;x<b.s;x++){
   const px=originX+x,py=originY+y;if(px<0||px>=resolution||py<0||py>=resolution)continue;
   const a=b.buf[x+y*b.s]*b.alpha*weight;if(!a)continue;
   const at=(px+py*resolution)*4,oldAlpha=buf[at+3],outAlpha=Math.round(oldAlpha+a*(255-oldAlpha)/255);
   if(!outAlpha)continue;
   const values=[b.col.r,b.col.g,b.col.b].map((c,k)=>Math.floor((Math.round(c*255)*a+buf[at+k]*oldAlpha*(255-a)/255)/outAlpha));values.push(outAlpha);
   for(let k=0;k<4;k++)if(buf[at+k]!==values[k]){buf[at+k]=values[k];touched=true;}
  }
  if(touched){texture.needsUpdate=true;changed=true;}return touched;
 }
 function finish(cancel=false){
  if(!before)return false;
  const didChange=changed;
  if(cancel){painter.buf.set(before);texture.needsUpdate=true;}
  else if(changed){undo.push(before);if(undo.length>historyLimit)undo.shift();redo.length=0;}
  before=null;changed=false;return !cancel&&didChange;
 }
 function history(from,to){if(disposed||before||!from.length)return false;to.push(painter.buf.slice());if(to.length>historyLimit)to.shift();painter.buf.set(from.pop());texture.needsUpdate=true;return true;}
 return {texture,get pixels(){return painter.buf;},configure,begin,stamp,finish,undo:()=>history(undo,redo),redo:()=>history(redo,undo),get state(){return {undo:undo.length,redo:redo.length,drawing:!!before};},dispose(){if(disposed)return;finish(true);disposed=true;undo.length=redo.length=0;painter.history.length=0;painter.buf=new Uint8Array();texture.image.data=painter.buf;texture.dispose();}};
}
// Sample in SCREEN space and raycast each sample. Never interpolate through the UV
// atlas: distant islands and misses must not be joined by a paint line.
export function strokeSamples(a,b,spacing=3){
 const distance=Math.hypot(b.x-a.x,b.y-a.y),count=Math.max(1,Math.min(256,Math.ceil(distance/spacing)));
 return Array.from({length:count},(_,i)=>{const t=(i+1)/count;return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,pressure:a.pressure+(b.pressure-a.pressure)*t};});
}
