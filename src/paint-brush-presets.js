import {captureAlphaTip} from '../evaluations/uv-paint/alpha-tip.js?v=0.36.18.929';

// Standard coverage tips through the existing alpha raster, not another painter.
export function paintBrushPreset(name){
 if(name==='soft')return{hardness:0,alphaTip:null};
 if(name==='hard')return{hardness:1,alphaTip:null};
 if(!['flat','chisel','bristle'].includes(name))throw Error('Unknown brush preset');
 const width=64,height=64,pixels=new Uint8Array(width*height);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const u=(x+.5)/32-1,v=(y+.5)/32-1;
  let coverage=name==='flat'?Math.abs(u)<.94&&Math.abs(v)<.34:
   name==='chisel'?Math.abs(u+v*.7)<.35&&Math.abs(v)<.85:
   Math.abs(v)<.72&&Math.abs(u)<.92&&x%9<5;
  pixels[x+y*width]=coverage?255:0;
 }
 return{hardness:1,alphaTip:captureAlphaTip({width,height,pixels})};
}
