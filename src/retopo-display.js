import * as THREE from 'three';
import {LineSegments2} from 'three/addons/lines/LineSegments2.js';
import {LineSegmentsGeometry} from 'three/addons/lines/LineSegmentsGeometry.js';
import {LineMaterial} from 'three/addons/lines/LineMaterial.js';

const referenceMaterial = new THREE.MeshStandardMaterial({color:0xd8d5d0,roughness:.85,side:THREE.DoubleSide});
const quadMaterial = new THREE.MeshStandardMaterial({
  color:0xa393de,roughness:.8,side:THREE.DoubleSide,
  polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2
});
const edgeMaterial = new LineMaterial({color:0x252236,linewidth:2.7,polygonOffset:true,polygonOffsetFactor:-3,polygonOffsetUnits:-3});
const smoothNormals = new WeakMap();

function smoothReference(geometry) {
  const original = geometry.getAttribute('normal');
  let smooth = smoothNormals.get(geometry);
  if (!smooth) {
    const position = geometry.getAttribute('position');
    const totals = new Map(), keys = [];
    for (let i = 0; i < position.count; i++) {
      const key = [position.getX(i),position.getY(i),position.getZ(i)].join(',');
      keys.push(key);
      if (!totals.has(key)) totals.set(key,new THREE.Vector3());
      const normal = totals.get(key);
      normal.x += original.getX(i); normal.y += original.getY(i); normal.z += original.getZ(i);
    }
    for (const normal of totals.values()) normal.normalize();
    const values = new Float32Array(position.count * 3);
    keys.forEach((key,i)=>totals.get(key).toArray(values,i*3));
    smooth = new THREE.BufferAttribute(values,3);
    smoothNormals.set(geometry,smooth);
  }
  geometry.setAttribute('normal',smooth);
  return ()=>geometry.setAttribute('normal',original);
}

export function applyRetopoDisplay(body, id, mesh, session) {
  if (!session?.active || id == null || !mesh) return false;
  if (id === session.referenceId) {
    body.material = referenceMaterial;
    body.userData.boxlabRetopoCleanup = smoothReference(body.geometry);
    return true;
  }
  if (id !== session.retopoId) return false;
  body.material = quadMaterial;
  const positions = [];
  for (const {a,b} of mesh.edges()) positions.push(...mesh.vertices[a].toArray(),...mesh.vertices[b].toArray());
  if (!positions.length) return true;
  const geometry = new LineSegmentsGeometry().setPositions(positions);
  const edges = new LineSegments2(geometry,edgeMaterial);
  edges.renderOrder = 16;
  edges.raycast = ()=>{};
  body.add(edges);
  body.userData.boxlabRetopoCleanup = ()=>{body.remove(edges);geometry.dispose();};
  return true;
}
