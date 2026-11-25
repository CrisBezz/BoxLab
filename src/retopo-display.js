import * as THREE from 'three';
import {LineSegments2} from 'three/addons/lines/LineSegments2.js';
import {LineSegmentsGeometry} from 'three/addons/lines/LineSegmentsGeometry.js';
import {LineMaterial} from 'three/addons/lines/LineMaterial.js';

// Shade the opaque reference with a soft, camera-relative key and fill.
const referenceColor = new THREE.Color(0xd8d5d0);
const referenceMaterial = new THREE.ShaderMaterial({
  side:THREE.DoubleSide,
  toneMapped:false,
  uniforms:{referenceColor:{value:referenceColor}},
  vertexShader:`
    attribute vec3 retopoNormal;
    varying vec3 vReferenceNormal;
    varying vec3 vReferencePosition;
    void main() {
      vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
      vReferencePosition = viewPosition.xyz;
      vReferenceNormal = normalMatrix * retopoNormal;
      gl_Position = projectionMatrix * viewPosition;
    }
  `,
  fragmentShader:`
    uniform vec3 referenceColor;
    varying vec3 vReferenceNormal;
    varying vec3 vReferencePosition;
    void main() {
      vec3 faceNormal = normalize(cross(dFdx(vReferencePosition), dFdy(vReferencePosition)));
      vec3 surfaceNormal = faceNormal;
      if (dot(vReferenceNormal, vReferenceNormal) > 0.0001) {
        vec3 smoothNormal = normalize(vReferenceNormal) * (gl_FrontFacing ? 1.0 : -1.0);
        if (dot(smoothNormal, faceNormal) > 0.0) surfaceNormal = smoothNormal;
      }
      float key = max(dot(surfaceNormal, vec3(-0.42, 0.66, 0.62)), 0.0);
      float fill = max(dot(surfaceNormal, vec3(0.82, -0.25, 0.51)), 0.0);
      gl_FragColor = vec4(referenceColor * (0.22 + 0.82 * key + 0.26 * fill), 1.0);
      #include <colorspace_fragment>
    }
  `
});
// Render the Retopo pass after opaque scene geometry. A single unlit fill
// keeps both GPU triangles of a nonplanar quad the same colour.
const quadMaterial = new THREE.MeshBasicMaterial({color:0xa393de,depthTest:false,depthWrite:false});
const edgeMaterial = new LineMaterial({color:0x252236,linewidth:2.7,depthTest:false,depthWrite:false});

function smoothReference(geometry) {
  if (geometry.hasAttribute('retopoNormal')) return;
  const position = geometry.getAttribute('position');
  const original = geometry.getAttribute('normal');
  const totals = new Map(), normals = [];
  for (let i = 0; i < position.count; i++) {
    const key = [position.getX(i),position.getY(i),position.getZ(i)].join(',');
    if (!totals.has(key)) totals.set(key,new THREE.Vector3());
    const normal = totals.get(key);
    normals.push(normal);
    normal.x += original.getX(i); normal.y += original.getY(i); normal.z += original.getZ(i);
  }
  for (const normal of totals.values()) normal.normalize();
  const values = new Float32Array(position.count * 3);
  normals.forEach((normal,i)=>normal.toArray(values,i*3));
  geometry.setAttribute('retopoNormal',new THREE.BufferAttribute(values,3));
}

export function applyRetopoDisplay(body, id, mesh, session) {
  if (!session?.active || id == null || !mesh) return false;
  if (id === session.referenceId) {
    smoothReference(body.geometry);
    body.material = referenceMaterial;
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
