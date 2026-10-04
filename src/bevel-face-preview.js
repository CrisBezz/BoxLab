import * as THREE from 'three';
// Rendering only. Match Shell/Solidify's blue translucent fill and wire preview.
export function createFaceBevelPreview(scene,mesh){
  if(!scene?.add)return null;
  const geometry=mesh.triangulatedGeometry();
  const group=new THREE.Group();
  const fill=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.18,side:THREE.DoubleSide,depthTest:false,depthWrite:false}));
  const wire=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.72,side:THREE.DoubleSide,wireframe:true,depthTest:false,depthWrite:false}));
  fill.renderOrder=13;wire.renderOrder=14;
  group.add(fill,wire);group.name='BoxLab Face Bevel Preview';group.userData.boxlabFaceBevelPreview=true;
  scene.add(group);return group;
}
export function disposeFaceBevelPreview(group){
  if(!group)return;
  group.removeFromParent();
  const geometries=new Set(),materials=new Set();
  group.traverse(node=>{if(node.geometry)geometries.add(node.geometry);if(node.material)materials.add(node.material);});
  for(const geometry of geometries)geometry.dispose();
  for(const material of materials)material.dispose();
}
