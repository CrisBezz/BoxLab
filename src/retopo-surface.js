import * as THREE from 'three';

// Reference picker is independent of the editable mesh and owns its resources.
// Reuse EditableMesh's existing render triangulation; never edit the source.
export function createRetopoSurface(mesh){
  const triangles=(mesh?.faces||[]).reduce((n,f)=>n+Math.max(0,f.length-2),0);
  if(!triangles||triangles>250000)throw Error('Choose a reference with 1–250,000 triangles');
  if(!mesh.vertices.every(v=>[v.x,v.y,v.z].every(Number.isFinite)))throw Error('Reference contains invalid coordinates');
  const geometry=mesh.triangulatedGeometry(),material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
  const body=new THREE.Mesh(geometry,material),raycaster=new THREE.Raycaster();
  body.updateMatrixWorld(true);
  let disposed=false;
  return {
    hit(camera,rect,x,y){
      if(disposed||!rect.width||!rect.height||!Number.isFinite(x)||!Number.isFinite(y))return null;
      raycaster.setFromCamera(new THREE.Vector2((x-rect.left)/rect.width*2-1,-((y-rect.top)/rect.height*2-1)),camera);
      const hit=raycaster.intersectObject(body,false)[0];
      return hit?{point:hit.point.clone(),normal:hit.face.normal.clone(),distance:hit.distance}:null;
    },
    dispose(){if(disposed)return;disposed=true;geometry.dispose();material.dispose();}
  };
}

export function nearestRetopoVertex(mesh,camera,rect,x,y,hit,radius=16,surface=null){
  if(!hit)return null;
  let best=null;
  for(let i=0;i<mesh.vertices.length;i++){
    const v=mesh.vertices[i],p=v.clone().project(camera);
    if(p.z< -1||p.z>1)continue;
    const pixels=Math.hypot(rect.left+(p.x*.5+.5)*rect.width-x,rect.top+(-p.y*.5+.5)*rect.height-y);
    // Screen proximity alone must not select a vertex behind the reference.
    const visible=surface?surface.hit(camera,rect,rect.left+(p.x*.5+.5)*rect.width,rect.top+(-p.y*.5+.5)*rect.height):hit;
    if(!visible)continue;
    const depth=camera.position.distanceTo(v),tolerance=Math.max(.000001,visible.distance*.000001);
    if(depth>visible.distance+tolerance)continue;
    if(pixels<=radius&&(!best||pixels<best.pixels))best={index:i,pixels};
  }
  return best?.index??null;
}
