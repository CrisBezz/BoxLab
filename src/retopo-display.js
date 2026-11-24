import * as THREE from 'three';
import {LineSegments2} from 'three/addons/lines/LineSegments2.js';
import {LineSegmentsGeometry} from 'three/addons/lines/LineSegmentsGeometry.js';
import {LineMaterial} from 'three/addons/lines/LineMaterial.js';

const referenceMaterial = new THREE.MeshStandardMaterial({color:0xd8d5d0,roughness:.85,side:THREE.DoubleSide});
// Render the Retopo pass after opaque scene geometry. A single unlit fill
// keeps both GPU triangles of a nonplanar quad the same colour.
const quadMaterial = new THREE.MeshBasicMaterial({color:0xa393de,depthTest:false,depthWrite:false});
const edgeMaterial = new LineMaterial({color:0x252236,linewidth:2.7,depthTest:false,depthWrite:false});
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
  const originalOrder = body.renderOrder;
  body.renderOrder = 90;
  const segments = mesh.edges();
  if (!segments.length) {
    body.userData.boxlabRetopoCleanup = ()=>{body.renderOrder = originalOrder;};
    return true;
  }
  const positions = [];
  for (const {a,b} of segments) positions.push(...mesh.vertices[a].toArray(),...mesh.vertices[b].toArray());
  const geometry = new LineSegmentsGeometry().setPositions(positions);
  const edges = new LineSegments2(geometry,edgeMaterial);
  edges.renderOrder = 91;
  edges.frustumCulled = false;
  edges.raycast = ()=>{};
  const normals = mesh.faces.map(face=>{
    const normal = new THREE.Vector3();
    for(let i=0;i<face.length;i++){
      normal.add(new THREE.Vector3().crossVectors(mesh.vertices[face[i]],mesh.vertices[face[(i+1)%face.length]]));
    }
    return normal;
  });
  const eye = new THREE.Vector3(), direction = new THREE.Vector3();
  const visible = [];
  edges.onBeforeRender = (renderer,scene,camera)=>{
    if(camera.isOrthographicCamera)camera.getWorldDirection(eye).negate();
    else camera.getWorldPosition(eye);
    for(let i=0;i<normals.length;i++){
      const towardViewer=camera.isOrthographicCamera?eye:direction.subVectors(eye,mesh.vertices[mesh.faces[i][0]]);
      visible[i]=normals[i].dot(towardViewer)>0;
    }
    const starts=geometry.getAttribute('instanceStart'),ends=geometry.getAttribute('instanceEnd');
    let index=0;
    for(const {a,b,faces} of segments){
      if(faces.length&&!faces.some(face=>visible[face]))continue;
      const start=mesh.vertices[a],end=mesh.vertices[b];
      starts.setXYZ(index,start.x,start.y,start.z);
      ends.setXYZ(index,end.x,end.y,end.z);
      index++;
    }
    starts.data.needsUpdate=true;
    geometry.instanceCount=index;
    LineSegments2.prototype.onBeforeRender.call(edges,renderer);
  };
  body.add(edges);
  body.userData.boxlabRetopoCleanup = ()=>{body.renderOrder=originalOrder;body.remove(edges);geometry.dispose();};
  return true;
}
