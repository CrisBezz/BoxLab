import * as THREE from 'three';
import {createPaintFilterDomain} from './paint-filter-domain.js?v=0.36.18.943';
import {createPaintTriangleGraph} from './paint-triangle-graph.js?v=0.36.18.933';

// Read-only object-local AO foundation. No scene, resource, history or UI writes.
// Texel coverage and triangles come from the existing authoritative paint owners.
const MAX_RAY_TESTS=8e6,EPSILON=1e-5;
function* bakeTask({geometry,mesh,payload,topologySignature,size=64,samples=16,radius=.25,highQuality=false}){
 if(!Number.isInteger(size)||size<16||size>(highQuality?256:128)||!Number.isInteger(samples)||samples<4||samples>64||!Number.isFinite(radius)||radius<.001||radius>2)throw Error('AO requires size 16–'+(highQuality?256:128)+', 4–64 samples and radius .001–2 of object diagonal');
 const pos=geometry?.attributes?.position,uv=geometry?.attributes?.uv,count=geometry?.index?.count??pos?.count;
 if(!pos||!uv||!Number.isInteger(count)||count<3||count%3||count>60000)throw Error('AO needs original UV preview geometry');
 // Validate before the original graph touches BufferAttributes or source metadata.
 for(let i=0;i<count;i++){
  const id=geometry.index?geometry.index.getX(i):i;
  if(!Number.isInteger(id)||id<0||id>=pos.count||id>=uv.count||![pos.getX(id),pos.getY(id),pos.getZ(id),uv.getX(id),uv.getY(id)].every(Number.isFinite))throw Error('Invalid AO triangle values');
 }
 const triangles=createPaintTriangleGraph({geometry,mesh,payload,topologySignature});
 const domain=createPaintFilterDomain(geometry,size,null,{captureTriangles:true});
 let work=0,covered=0;for(let i=0;i<domain.labels.length;i++)if(domain.labels[i]>=0&&domain.triangleAt[i]>=0)covered++;
 if(!covered)throw Error('AO UVs have no covered texels');
 // Conservative complete-work preflight. Async quality has a separate128M cap;
 // legacy synchronous calls retain8M. No caller can supply an unbounded work limit.
 const rayTests=covered*samples*triangles.length;
 if(rayTests>(highQuality?128e6:MAX_RAY_TESTS))throw Error('AO bake is too complex; reduce bake size, samples or mesh complexity');
 const bounds=new THREE.Box3();for(const t of triangles)for(const p of t.p)bounds.expandByPoint(p);
 const extent=bounds.getSize(new THREE.Vector3()).length(),origin=bounds.min.clone();
 if(!Number.isFinite(extent)||extent<=0)throw Error('AO needs finite non-zero object bounds');
 // Graph points are private copies. Normalize for scale-independent ray bias/radius.
 for(const t of triangles){
  for(const p of t.p)p.sub(origin).divideScalar(extent);
  t.normal=new THREE.Vector3().subVectors(t.p[1],t.p[0]).cross(new THREE.Vector3().subVectors(t.p[2],t.p[0]));
  if(!Number.isFinite(t.normal.lengthSq())||t.normal.lengthSq()<1e-24)throw Error('AO needs non-degenerate surface triangles');
  t.normal.normalize();
  const [a,b,c]=t.uv;t.den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);
  if(!Number.isFinite(t.den)||Math.abs(t.den)<1e-14)throw Error('AO needs non-degenerate face UVs');
 }
 const pixels=new Uint8Array(size*size).fill(255),coverage=new Uint8Array(size*size);
 const ray=new THREE.Ray(),point=new THREE.Vector3(),hit=new THREE.Vector3(),tangent=new THREE.Vector3(),bitangent=new THREE.Vector3(),axis=new THREE.Vector3();
 const directions=Array.from({length:samples},(_,i)=>{const r=Math.sqrt((i+.5)/samples),phi=i*Math.PI*(3-Math.sqrt(5));return [r*Math.cos(phi),r*Math.sin(phi),Math.sqrt(1-r*r)];});
 for(let at=0;at<pixels.length;at++){
  const ti=domain.triangleAt[at];if(domain.labels[at]<0||ti<0)continue;
  const t=triangles[ti],[a,b,c]=t.uv,u=(at%size)/(size-1),v=Math.floor(at/size)/(size-1);
  const w0=((b[1]-c[1])*(u-c[0])+(c[0]-b[0])*(v-c[1]))/t.den,w1=((c[1]-a[1])*(u-c[0])+(a[0]-c[0])*(v-c[1]))/t.den;
  point.copy(t.p[0]).multiplyScalar(w0).addScaledVector(t.p[1],w1).addScaledVector(t.p[2],1-w0-w1);
  axis.set(Math.abs(t.normal.z)<.9?0:1,0,Math.abs(t.normal.z)<.9?1:0);
  tangent.crossVectors(axis,t.normal).normalize();bitangent.crossVectors(t.normal,tangent);
  ray.origin.copy(point).addScaledVector(t.normal,EPSILON);let blocked=0;
  for(const [x,y,z] of directions){
   ray.direction.copy(tangent).multiplyScalar(x).addScaledVector(bitangent,y).addScaledVector(t.normal,z).normalize();
   for(let j=0;j<triangles.length;j++){
    if(++work%65536===0)yield {progress:at/pixels.length};
    if(j===ti)continue;const other=triangles[j];
    if(ray.intersectTriangle(...other.p,false,hit)&&hit.distanceTo(ray.origin)>EPSILON&&hit.distanceTo(ray.origin)<=radius){blocked++;break;}
   }
  }
  pixels[at]=Math.round(255*(1-blocked/samples));coverage[at]=255;
 }
 // Owned linear visibility bytes, UV-v0-first. Uncovered texels are white, coverage0.
 return Object.freeze({width:size,height:size,pixels,coverage,labels:domain.labels,samples,radius,rayTests});
}

// One tracing kernel; legacy synchronous callers retain the original work envelope.
export function bakePaintAO(options){const task=bakeTask({...options,highQuality:false});let next;do{next=task.next();}while(!next.done);return next.value;}
export async function runPaintAOTask(task,{signal,onProgress}={}){
 let started=performance.now();
 try{while(true){if(signal?.aborted)throw Error('AO bake cancelled');const next=task.next();if(next.done)return next.value;
  if(performance.now()-started>=8){onProgress?.(next.value?.progress||0);await new Promise(resolve=>setTimeout(resolve,0));started=performance.now();}
 }}finally{task.return?.();}
}
export function bakePaintAOAsync(options,{signal,onProgress}={}){
 return runPaintAOTask(bakeTask({...options,highQuality:true}),{signal,onProgress});
}
