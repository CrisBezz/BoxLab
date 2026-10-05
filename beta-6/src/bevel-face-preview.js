import * as THREE from 'three';
// Rendering only. Match Shell/Solidify's blue translucent fill and wire preview.
function polygonKey(mesh,face){return face.map(i=>mesh.vertices[i].toArray().join(',')).sort().join('|');}
export function createFaceBevelPreview(scene,mesh,before=null){
  if(!scene?.add)return null;
  // Unchanged polygons stay with the normal object renderer, including other shells.
  const unchanged=before?new Set(before.faces.map(face=>polygonKey(before,face))):null;
  const faces=unchanged?mesh.faces.filter(face=>!unchanged.has(polygonKey(mesh,face))):mesh.faces;
  const preview=Object.create(mesh);preview.faces=faces;
  const geometry=preview.triangulatedGeometry();
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
