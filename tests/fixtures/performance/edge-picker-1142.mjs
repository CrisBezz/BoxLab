import * as THREE from 'three';

// Rank the original rendered, indexed cage proxies in CSS pixels. No input,
// selection, geometry or history owner: main keeps the sole native tap route.
export function pickScreenEdges(event,camera,canvas,objects,{through=false}={}){
 const rect=canvas.getBoundingClientRect();
 if(!camera||!rect.width||!rect.height||![event.clientX,event.clientY].every(Number.isFinite))return [];
 const px=event.clientX-rect.left,py=event.clientY-rect.top,hits=[];
 if(px<0||py<0||px>rect.width||py>rect.height)return [];
 const projection=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
 const visible=object=>{for(let p=object;p;p=p.parent)if(p.visible===false)return false;return true;};
 const bodies=through?[]:objects.filter(object=>object.userData?.kind==='body'&&object.isMesh&&visible(object));
 const visibilityRay=bodies.length?new THREE.Raycaster():null;
 for(const object of objects){
  if(object.userData?.kind!=='edge'||!object.isLine||!Number.isInteger(object.userData.index))continue;
  let hidden=false;for(let p=object;p;p=p.parent)if(p.visible===false){hidden=true;break;}if(hidden)continue;
  // material.visible=false is intentional for batched cage picking proxies.
  const position=object.geometry?.getAttribute('position');if(position?.count!==2)continue;
  const a=new THREE.Vector3().fromBufferAttribute(position,0).applyMatrix4(object.matrixWorld),b=new THREE.Vector3().fromBufferAttribute(position,1).applyMatrix4(object.matrixWorld);
  const ca=new THREE.Vector4(a.x,a.y,a.z,1).applyMatrix4(projection),cb=new THREE.Vector4(b.x,b.y,b.z,1).applyMatrix4(projection);
  if(![...ca.toArray(),...cb.toArray()].every(Number.isFinite))continue;
  // Clip in homogeneous coordinates before division: behind/near-plane edges
  // cannot acquire a mirrored screen target; crossing segments remain pickable.
  let lo=0,hi=1,rejected=false;
  for(const [axis,sign] of [[0,1],[0,-1],[1,1],[1,-1],[2,1],[2,-1]]){
   const av=ca.w+sign*ca.getComponent(axis),bv=cb.w+sign*cb.getComponent(axis);
   if(av<0&&bv<0){rejected=true;break;}
   if(av<0)lo=Math.max(lo,av/(av-bv));
   if(bv<0)hi=Math.min(hi,av/(av-bv));
  }
  if(rejected||lo>hi)continue;
  const x=ca.clone().lerp(cb,lo),y=ca.clone().lerp(cb,hi);if(x.w<=0||y.w<=0)continue;
  const ax=(x.x/x.w*.5+.5)*rect.width,ay=(-x.y/x.w*.5+.5)*rect.height,bx=(y.x/y.w*.5+.5)*rect.width,by=(-y.y/y.w*.5+.5)*rect.height;
  const dx=bx-ax,dy=by-ay,length=dx*dx+dy*dy,t=length?THREE.MathUtils.clamp(((px-ax)*dx+(py-ay)*dy)/length,0,1):0;
  const pixels=Math.hypot(px-ax-t*dx,py-ay-t*dy);if(!Number.isFinite(pixels)||pixels>12)continue;
  // Screen interpolation is not world interpolation under perspective.
  const denominator=(1-t)*y.w+t*x.w,s=denominator?t*x.w/denominator:0;
  const world=a.clone().lerp(b,lo+(hi-lo)*s),view=world.clone().applyMatrix4(camera.matrixWorldInverse);
  const distance=camera.isOrthographicCamera?-view.z:view.length();
  if(!Number.isFinite(distance)||distance<0)continue;
  // Test at the closest point ON this edge, not at the offset Pencil contact.
  // Otherwise a near rim can hide a visible recessed edge within the tap radius.
  // Keep the original body's material/raycast policy; overlays and invisible
  // face-picking proxies must never act as occluders. Loose scaffolds still work.
  if(visibilityRay){
   visibilityRay.setFromCamera(new THREE.Vector2((ax+t*dx)/rect.width*2-1,-(ay+t*dy)/rect.height*2+1),camera);
   const edgeDistance=visibilityRay.ray.origin.distanceTo(world);
   visibilityRay.far=Math.max(0,edgeDistance-Math.max(1e-7,edgeDistance*1e-5));
   if(visibilityRay.intersectObjects(bodies,false).length)continue;
  }
  hits.push({type:'edge',index:object.userData.index,distance,pixels});
 }
 // Quantized subpixel ties make depth ordering deterministic without a
 // non-transitive tolerance comparator. Distinct visible lines rank by proximity.
 hits.sort((a,b)=>Math.round(a.pixels*4)-Math.round(b.pixels*4)||a.distance-b.distance||a.index-b.index);
 return hits.map(({pixels,...hit})=>hit);
}
