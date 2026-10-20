import * as THREE from 'three';
import {createPaintImageWrap} from './paint-image-wrap.js?v=0.36.18.933';
import {capturePaintImageLayer} from './paint-image-layer.js?v=0.36.18.908';
import {createPaintImageProjector} from './paint-image-placement.js?v=0.36.18.907';

// Rasterize the original UV preview geometry; never triangulate or edit a mesh here.
// Bounded synchronous work: failure returns no resource and creates no history step.
export function projectPaintImage({geometry,image,scene,body,size=512,surface=null,mesh,payload,topologySignature}){
 const recipe=capturePaintImageLayer(image),projector=createPaintImageProjector(recipe.placement);
 if(!Number.isInteger(size)||size<1||size>512||!geometry?.attributes?.position||!geometry.attributes.uv)throw Error('Image projection requires UV geometry');
 scene.updateMatrixWorld(true);
 const frame=new THREE.Matrix4().fromArray(recipe.objectToWorld),clip=new THREE.Matrix4().fromArray(recipe.placement.worldToClip),inverse=clip.clone().invert();
 const wrap=surface?createPaintImageWrap({geometry,mesh,payload,topologySignature,matrixWorld:frame,surface}):null;
 const pos=geometry.attributes.position,uv=geometry.attributes.uv,index=geometry.index,count=index?index.count:pos.count;
 if(count%3)throw Error('Invalid UV triangle geometry');
 const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),proxies=[];
 const proxy=new THREE.Mesh(geometry,material);proxy.matrixWorld.copy(frame);proxies.push(proxy);
 scene.traverse(b=>{if(b===body||!['body','boxlab-inactive-body'].includes(b.userData?.kind)||!b.geometry)return;for(let a=b;a;a=a.parent)if(!a.visible)return;const p=new THREE.Mesh(b.geometry,material);p.matrixWorld.copy(b.matrixWorld);proxies.push(p);});
 const triangleCount=proxies.reduce((n,p)=>n+(p.geometry.index?.count??p.geometry.attributes.position.count)/3,0);
 const pixels=new Uint8Array(size*size*4),occupied=new Int32Array(size*size).fill(-1),triangles=[],ray=new THREE.Raycaster();
 const point=new THREE.Vector3(),near=new THREE.Vector3(),far=new THREE.Vector3(),normal=new THREE.Vector3(),direction=new THREE.Vector3();
 let scanned=0,rayWork=0,painted=0;
 const bary=(t,u,v)=>{const d=t.d;if(Math.abs(d)<1e-14)return null;const a=((t.v[1]-t.v[2])*(u-t.u[2])+(t.u[2]-t.u[1])*(v-t.v[2]))/d,b=((t.v[2]-t.v[0])*(u-t.u[2])+(t.u[0]-t.u[2])*(v-t.v[2]))/d;return [a,b,1-a-b];};
 const at=(t,b,out)=>out.copy(t.p[0]).multiplyScalar(b[0]).addScaledVector(t.p[1],b[1]).addScaledVector(t.p[2],b[2]);
 try{
  for(let i=0;i<count;i+=3){const ids=[0,1,2].map(k=>index?index.getX(i+k):i+k),p=ids.map(id=>new THREE.Vector3().fromBufferAttribute(pos,id).applyMatrix4(frame)),u=ids.map(id=>uv.getX(id)),v=ids.map(id=>uv.getY(id));
   if(![...u,...v,...p.flatMap(p=>p.toArray())].every(Number.isFinite))throw Error('Invalid UV triangle values');
   // Repeating/cross-tile UVs are ambiguous for a retained single-tile projection.
   if([...u,...v].some(x=>x< -1e-6||x>1+1e-6))throw Error('Image projection needs UVs inside the 0–1 tile; use Pack in UV Editor');
   const t={p,u,v,d:(v[1]-v[2])*(u[0]-u[2])+(u[2]-u[1])*(v[0]-v[2])};triangles.push(t);
   if(Math.abs(t.d)<1e-14)continue;
   normal.subVectors(p[1],p[0]).cross(new THREE.Vector3().subVectors(p[2],p[0])).normalize();
   const x0=Math.max(0,Math.ceil(Math.min(...u)*size-.5)),x1=Math.min(size-1,Math.floor(Math.max(...u)*size-.5)),y0=Math.max(0,Math.ceil(Math.min(...v)*size-.5)),y1=Math.min(size-1,Math.floor(Math.max(...v)*size-.5));
   scanned+=(x1-x0+1)*(y1-y0+1);if(scanned>2e6)throw Error('Projection is too complex; use a simpler mesh or UV layout');
   for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
    const a=(x+.5)/size,b=(y+.5)/size,weights=bary(t,a,b);if(weights.some(w=>w< -1e-8))continue;at(t,weights,point);const slot=y*size+x;
    // Distinct surfaces sharing texels cannot support a front-only image. Refuse
    // sampled interior overlaps instead of silently stamping onto hidden faces.
    if(weights.every(w=>w>1e-7)){const old=occupied[slot];if(old>=0){const prior=triangles[old];if(at(prior,bary(prior,a,b),near).distanceTo(point)>1e-5)throw Error('Overlapping UVs: use Box UVs or Pack separate islands before projecting');}occupied[slot]=triangles.length-1;}
    const sample=wrap?wrap.sample(i/3,weights):projector.project(point);if(!sample)continue;
    if(!wrap){
    const ndc=point.clone().applyMatrix4(clip);near.set(ndc.x,ndc.y,-1).applyMatrix4(inverse);far.set(ndc.x,ndc.y,1).applyMatrix4(inverse);direction.subVectors(far,near).normalize();
    if(normal.dot(direction)>-Math.cos(75*Math.PI/180))continue;
    rayWork+=triangleCount;if(rayWork>3e7)throw Error('Projection visibility check is too complex; use a simpler scene');
    ray.set(near,direction);ray.near=0;ray.far=near.distanceTo(far);const nearest=ray.intersectObjects(proxies,false)[0],distance=near.distanceTo(point);
    if(!nearest||nearest.object!==proxy||Math.abs(nearest.distance-distance)>Math.max(1e-6,distance*1e-6))continue;
    }
    const source=recipe.source,sx=Math.min(source.width-1,Math.floor(sample.u*source.width)),sy=Math.min(source.height-1,Math.floor(sample.v*source.height)),from=(sy*source.width+sx)*4,to=slot*4;
    if(!source.pixels[from+3])continue;pixels.set(source.pixels.subarray(from,from+4),to);painted++;
   }
  }
  if(!painted)throw Error(wrap?'Image does not cover the connected surface; move or scale the image':'Image does not cover a visible front surface; move the image or rotate the model');
  return {image:recipe,pixels};
 }finally{material.dispose();}
}
