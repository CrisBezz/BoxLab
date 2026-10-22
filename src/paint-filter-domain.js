import {createPaintSeamNeighbours} from './paint-seam-neighbours.js?v=0.36.18.942';
// Conservative texel ownership for read-neighbour brushes. Uses ONLY the original
// preview triangulation and its opt-in source-face map; never authors UVs/topology.
export function createPaintFilterDomain(geometry,size=512,source=null){
 const uv=geometry?.attributes?.uv,pos=geometry?.attributes?.position,index=geometry?.index,faces=geometry?.userData?.boxlabTriangleFaces,count=index?.count??pos?.count;
 if(!Number.isInteger(size)||size<16||size>1024||!uv||!pos||!Number.isInteger(count)||count%3||count>60000||!Array.isArray(faces)||faces.length!==count/3||faces.some(n=>!Number.isInteger(n)||n<0||n>=20000))throw Error('Blur needs original UV face ownership');
 const labels=new Int32Array(size*size).fill(-1),interior=new Uint8Array(size*size),triangleAt=source?new Int32Array(size*size).fill(-1):null;let work=0;
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
 return Object.freeze({labels,...linked,faceAt:triangle=>Number.isInteger(triangle)&&triangle>=0&&triangle<faces.length?faces[triangle]:null});
}
