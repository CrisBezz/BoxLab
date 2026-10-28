import * as THREE from 'three';
// Same orange, non-pickable boundary surface for UV review and paint targeting.
export function facegroupBoundaryEdges(mesh){
 return mesh.edges().filter(e=>e.faces.length!==2||(mesh.faceGroups?.[e.faces[0]]??null)!==(mesh.faceGroups?.[e.faces[1]]??null)).map(e=>[e.a,e.b]);
}
export function createFacegroupBoundaryPreview({mesh,body,scene,edges}){
 const positions=[];for(const pair of edges)for(const id of pair){const p=mesh.vertices[id];positions.push(p.x,p.y,p.z);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
 const line=new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({color:0xffb23e,depthTest:false,depthWrite:false}));
 line.userData.boxlabRenderOverlay=true;line.userData.boxlabFacegroupUVSeams=true;line.renderOrder=150;line.raycast=()=>{};line.matrixAutoUpdate=false;scene.add(line);
 let disposed=false;
 const update=()=>{if(disposed)return;body.updateWorldMatrix(true,false);line.matrix.copy(body.matrixWorld);line.matrixWorldNeedsUpdate=true;};update();
 return {update,dispose(){if(disposed)return;disposed=true;line.removeFromParent();geometry.dispose();line.material.dispose();}};
}
