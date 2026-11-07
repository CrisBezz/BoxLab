import {createPaintSeamNeighbours} from './paint-seam-neighbours.js?v=0.36.18.951';
// Conservative texel ownership for read-neighbour brushes. Uses ONLY the original
// preview triangulation and its opt-in source-face map; never authors UVs/topology.
export function createPaintFilterDomain(geometry,size=512,source=null,{captureTriangles=false}={}){
 const uv=geometry?.attributes?.uv,pos=geometry?.attributes?.position,index=geometry?.index,faces=geometry?.userData?.boxlabTriangleFaces,count=index?.count??pos?.count;
 if(!Number.isInteger(size)||size<16||size>1024||!uv||!pos||!Number.isInteger(count)||count%3||count>60000||!Array.isArray(faces)||faces.length!==count/3||faces.some(n=>!Number.isInteger(n)||n<0||n>=20000))throw Error('Blur needs original UV face ownership');
 const labels=new Int32Array(size*size).fill(-1),interior=new Uint8Array(size*size),triangleAt=source||captureTriangles?new Int32Array(size*size).fill(-1):null;let work=0;
 for(let i=0;i<count;i+=3){
  const ids=[0,1,2].map(k=>index?index.getX(i+k):i+k);
  if(ids.some(n=>!Number.isInteger(n)||n<0||n>=uv.count))throw Error('Invalid Blur UV geometry');
  const u=ids.map(n=>uv.getX(n)),v=ids.map(n=>uv.getY(n));
  if([...u,...v].some(n=>!Number.isFinite(n)||n< -1e-6||n>1+1e-6))throw Error('Blur needs UVs inside tile 0–1; use Pack in UV Editor');
  const d=(v[1]-v[2])*(u[0]-u[2])+(u[2]-u[1])*(v[0]-v[2]);if(Math.abs(d)<1e-14)throw Error('Blur needs non-degenerate face UVs');
  const x0=Math.max(0,Math.ceil(Math.min(...u)*(size-1))),x1=Math.min(size-1,Math.floor(Math.max(...u)*(size-1))),y0=Math.max(0,Math.ceil(Math.min(...v)*(size-1))),y1=Math.min(size-1,Math.floor(Math.max(...v)*(size-1)));
  work+=(x1-x0+1)*(y1-y0+1);if(work>2e6)throw Error('Blur UV layout is too complex; use a simpler mesh');
  const face=faces[i/3];
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
   const a=x/(size-1),b=y/(size-1),w0=((v[1]-v[2])*(a-u[2])+(u[2]-u[1])*(b-v[2]))/d,w1=((v[2]-v[0])*(a-u[2])+(u[0]-u[2])*(b-v[2]))/d,w2=1-w0-w1;
   if(Math.min(w0,w1,w2)< -1e-8)continue;
   const at=x+y*size,inside=Math.min(w0,w1,w2)>1e-7,old=labels[at];
   if(old!==-1&&old!==face){if(interior[at]&&inside)throw Error('Overlapping UV faces: separate and Pack islands before Blur');labels[at]=-2;interior[at]=0;if(triangleAt)triangleAt[at]=-1;}
   else{labels[at]=face;interior[at]||=inside?1:0;if(triangleAt)triangleAt[at]=i/3;}
  }
 }
 const linked=source?createPaintSeamNeighbours({geometry,size,labels,triangleAt,...source}):{};
 // Opt-in transient ownership for read-only baking; ordinary brushes retain their
 // exact return shape and allocations. Ambiguous borders never identify a triangle.
 return Object.freeze({labels,...linked,...(captureTriangles?{triangleAt}:{}),faceAt:triangle=>Number.isInteger(triangle)&&triangle>=0&&triangle<faces.length?faces[triangle]:null});
}

// Fill only unused atlas texels beside mapped faces. This is a derived texture
// copy: UVs, editable source pixels, and occupied texels are never changed.
// Derive a UV gutter copy for display/export. The alpha byte in the OUTPUT is a
// transient occupancy/distance marker; editable source pixels are never changed.
const paintUVCoverage=new WeakMap();
function coverageMask(size,geometry){
 let bySize=paintUVCoverage.get(geometry);if(bySize?.has(size))return bySize.get(size);
 const uv=geometry?.attributes?.uv,index=geometry?.index,count=index?.count??uv?.count;
 if(!uv||!Number.isInteger(count)||count%3)throw Error('Invalid UV paint padding geometry');
 const mask=new Uint8Array(Math.ceil(size*size/8));let work=0;
 for(let i=0;i<count;i+=3){
  const ids=[0,1,2].map(k=>index?index.getX(i+k):i+k);if(ids.some(n=>!Number.isInteger(n)||n<0||n>=uv.count))throw Error('Invalid UV paint padding geometry');
  const u=ids.map(n=>uv.getX(n)),v=ids.map(n=>uv.getY(n));if([...u,...v].some(n=>!Number.isFinite(n)))throw Error('Invalid UV paint padding coordinates');
  const d=(v[1]-v[2])*(u[0]-u[2])+(u[2]-u[1])*(v[0]-v[2]);if(Math.abs(d)<1e-14)continue;
  const x0=Math.max(0,Math.ceil(Math.min(...u)*(size-1))),x1=Math.min(size-1,Math.floor(Math.max(...u)*(size-1))),y0=Math.max(0,Math.ceil(Math.min(...v)*(size-1))),y1=Math.min(size-1,Math.floor(Math.max(...v)*(size-1)));
  if(x1<x0||y1<y0)continue;work+=(x1-x0+1)*(y1-y0+1);if(work>2e6)throw Error('UV paint padding exceeds its bounded raster budget');
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const a=x/(size-1),b=y/(size-1),w0=((v[1]-v[2])*(a-u[2])+(u[2]-u[1])*(b-v[2]))/d,w1=((v[2]-v[0])*(a-u[2])+(u[0]-u[2])*(b-v[2]))/d;if(Math.min(w0,w1,1-w0-w1)>=-1e-8){const at=y*size+x;mask[at>>3]|=1<<(at&7);}}
 }
 if(!bySize){bySize=new Map();paintUVCoverage.set(geometry,bySize);}bySize.set(size,mask);return mask;
}
export function padPaintPixels(pixels,size,geometry,padding=4,output=new Uint8Array(pixels?.length||0),alphaSource=pixels){
 if(!Number.isInteger(size)||size<16||size>1024||!(pixels instanceof Uint8Array)||pixels.length!==size*size*4||!Number.isInteger(padding)||padding<0||padding>16||!(output instanceof Uint8Array)||output.length!==pixels.length||!(alphaSource instanceof Uint8Array)||alphaSource.length!==pixels.length)throw Error('Invalid UV paint padding input');
 output.set(pixels);if(!padding)return output;const mask=coverageMask(size,geometry),total=size*size,inPlace=output===pixels,distance=inPlace?new Uint8Array(total):null;
 if(inPlace){for(let at=0;at<total;at++)if(mask[at>>3]&(1<<(at&7)))distance[at]=1;}
 else for(let at=0;at<total;at++)output[at*4+3]=mask[at>>3]&(1<<(at&7))?255:0;
 const left=at=>at%size?at-1:-1,right=at=>at%size+1<size?at+1:-1,up=at=>at>=size?at-size:-1,down=at=>at+size<total?at+size:-1;
 for(let step=1;step<=padding;step++)for(let at=0;at<total;at++){
  const target=at*4,marked=inPlace?distance[at]:output[target+3];if(inPlace?marked!==0:marked!==0)continue;
  const l=left(at),r=right(at),u=up(at),d=down(at),wanted=step===1?255:step-1,source=inPlace?(l>=0&&distance[l]===step?l:r>=0&&distance[r]===step?r:u>=0&&distance[u]===step?u:d>=0&&distance[d]===step?d:-1):(l>=0&&output[l*4+3]===wanted?l:r>=0&&output[r*4+3]===wanted?r:u>=0&&output[u*4+3]===wanted?u:d>=0&&output[d*4+3]===wanted?d:-1);
  if(source<0)continue;const from=source*4;output[target]=output[from];output[target+1]=output[from+1];output[target+2]=output[from+2];if(inPlace)distance[at]=step+1;else output[target+3]=step;
 }
 if(!inPlace)for(let at=0;at<total;at++)output[at*4+3]=alphaSource[at*4+3];return output;
}
