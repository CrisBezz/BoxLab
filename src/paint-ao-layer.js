import {bakePaintAO} from './paint-ao-bake.js?v=0.36.18.943';
import {createPaintFilterDomain} from './paint-filter-domain.js?v=0.36.18.943';

// Convert the bounded object-local bake into ordinary colour-layer pixels.
// Original UV raster owns both grids; atlas proximity never connects faces.
export function createPaintAOPixels({size=512,...source}){
 if(![512,1024].includes(size))throw Error('AO colour layer needs a 512 or 1024 texture');
 const bake=bakePaintAO({...source,size:64,samples:16});
 const low=createPaintFilterDomain(source.geometry,64),high=createPaintFilterDomain(source.geometry,size),pixels=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const at=y*size+x,face=high.labels[at];if(face<0)continue;
  const u=x/(size-1)*63,v=y/(size-1)*63,x0=Math.floor(u),y0=Math.floor(v),dx=u-x0,dy=v-y0;let sum=0,weight=0;
  // Same-face, coverage-aware bilinear interpolation. Thin unsampled faces stay
  // transparent instead of borrowing occlusion from an unrelated atlas island.
  for(let j=0;j<2;j++)for(let i=0;i<2;i++){
   const sx=Math.min(63,x0+i),sy=Math.min(63,y0+j),from=sy*64+sx,w=(i?dx:1-dx)*(j?dy:1-dy);
   if(!w||low.labels[from]!==face||!bake.coverage[from])continue;
   sum+=bake.pixels[from]*w;weight+=w;
  }
  if(!weight)continue;const value=Math.round(sum/weight);pixels.set([value,value,value,255],at*4);
 }
 return pixels;
}
