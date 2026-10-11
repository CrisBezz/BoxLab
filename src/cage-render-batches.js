import * as THREE from 'three';
// Indexed proxies retain the original ray-picking/bridge contract. Only visual
// geometry is batched; proxy materials are skipped by WebGL but still raycast.
const pickLineMaterial=new THREE.LineBasicMaterial({visible:false});
const pickVertexMaterial=new THREE.MeshBasicMaterial({visible:false});
export function createCageBatch(){
 const edges=[],vertices=[],sphereGeometry=new THREE.SphereGeometry(1,12,8);
 function register(object,material,list,pickMaterial){object.userData.cageMaterial=material;object.material=pickMaterial;list.push(object);}
 return {
  sphereGeometry,
  edge(object,material){register(object,material,edges,pickLineMaterial);},
  vertex(object,material){register(object,material,vertices,pickVertexMaterial);},
  finish(root){
   const groups=new Map();
   for(const edge of edges){const material=edge.userData.cageMaterial;let orders=groups.get(material);if(!orders){orders=new Map();groups.set(material,orders);}let list=orders.get(edge.renderOrder);if(!list){list=[];orders.set(edge.renderOrder,list);}list.push(edge);}
   for(const [material,orders] of groups)for(const [order,list] of orders){
    const positions=[];for(const edge of list)positions.push(...edge.geometry.attributes.position.array);
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    const lines=new THREE.LineSegments(geometry,material);lines.renderOrder=order;lines.userData={kind:'cage-edge-batch'};root.add(lines);
   }
   const markerGroups=new Map();for(const marker of vertices){const material=marker.userData.cageMaterial;if(!markerGroups.has(material))markerGroups.set(material,[]);markerGroups.get(material).push(marker);}
   for(const [material,markers] of markerGroups){
    const batch=new THREE.InstancedMesh(sphereGeometry,material,markers.length);batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);batch.frustumCulled=false;
    batch.userData={kind:'cage-vertex-batch',cageMarkers:markers};batch.raycast=()=>{}; // proxies are authoritative
    for(let i=0;i<markers.length;i++){markers[i].updateMatrix();batch.setMatrixAt(i,markers[i].matrix);}
    root.add(batch);
   }
   if(!vertices.length)sphereGeometry.dispose();
  }
 };
}
export function updateCageBatches(root){
 for(const batch of root.children){const markers=batch.userData?.cageMarkers;if(!markers)continue;
  for(let i=0;i<markers.length;i++){markers[i].updateMatrix();batch.setMatrixAt(i,markers[i].matrix);}
  batch.instanceMatrix.needsUpdate=true;
 }
}
export function addMirrorCageBatch(root,mesh,material){
 const points=[];for(const e of mesh.edges())points.push(...mesh.vertices[e.a].toArray(),...mesh.vertices[e.b].toArray());if(!points.length)return;
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
 const lines=new THREE.LineSegments(geometry,material);lines.userData.kind='mirror-edge';root.add(lines);
}
