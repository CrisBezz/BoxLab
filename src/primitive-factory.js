import * as THREE from 'three';
import { EditableMesh } from './mesh.js';

function ringVertices(vertices, y, radius, segments, phase = 0) {
  const ring = [];
  for (let i = 0; i < segments; i++) {
    const a = phase + i / segments * Math.PI * 2;
    vertices.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius));
    ring.push(vertices.length - 1);
  }
  return ring;
}

export function makeCube(size = 2) {
  return EditableMesh.cube(size);
}

export function makePlane(size = 2) {
  const s = size / 2;
  return new EditableMesh(
    [[-s,0,-s],[s,0,-s],[s,0,s],[-s,0,s]],
    [[0,3,2,1]]
  );
}

export function makeCylinder(radius = 1, height = 2, segments = 12) {
  segments = Math.max(3, Math.round(segments));
  const vertices = [], faces = [];
  const bottom = ringVertices(vertices, -height/2, radius, segments);
  const top = ringVertices(vertices, height/2, radius, segments);
  for (let i = 0; i < segments; i++) {
    const n = (i + 1) % segments;
    faces.push([bottom[i], bottom[n], top[n], top[i]]);
  }
  faces.push([...bottom].reverse());
  faces.push([...top]);
  return new EditableMesh(vertices, faces);
}

export function makeCone(radius = 1, height = 2, segments = 12) {
  segments = Math.max(3, Math.round(segments));
  const vertices = [], faces = [];
  const bottom = ringVertices(vertices, -height/2, radius, segments);
  vertices.push(new THREE.Vector3(0, height/2, 0));
  const apex = vertices.length - 1;
  for (let i = 0; i < segments; i++) {
    const n = (i + 1) % segments;
    faces.push([bottom[i], bottom[n], apex]);
  }
  faces.push([...bottom].reverse());
  return new EditableMesh(vertices, faces);
}

export function makeSphere(radius = 1, radialSegments = 12, rings = 6) {
  radialSegments = Math.max(4, Math.round(radialSegments));
  rings = Math.max(2, Math.round(rings));
  const vertices = [new THREE.Vector3(0, radius, 0)], faces = [], loops = [];
  for (let r = 1; r < rings; r++) {
    const phi = Math.PI * r / rings;
    loops.push(ringVertices(vertices, Math.cos(phi) * radius, Math.sin(phi) * radius, radialSegments));
  }
  vertices.push(new THREE.Vector3(0, -radius, 0));
  const north = 0, south = vertices.length - 1;
  const first = loops[0], last = loops[loops.length - 1];
  for (let i = 0; i < radialSegments; i++) {
    const n = (i + 1) % radialSegments;
    faces.push([north, first[n], first[i]]);
  }
  for (let r = 0; r < loops.length - 1; r++) {
    const a = loops[r], b = loops[r + 1];
    for (let i = 0; i < radialSegments; i++) {
      const n = (i + 1) % radialSegments;
      faces.push([a[i], a[n], b[n], b[i]]);
    }
  }
  for (let i = 0; i < radialSegments; i++) {
    const n = (i + 1) % radialSegments;
    faces.push([last[i], last[n], south]);
  }
  return new EditableMesh(vertices, faces);
}

export function makeTorus(majorRadius = 0.72, minorRadius = 0.28, majorSegments = 12, minorSegments = 6) {
  majorSegments = Math.max(3, Math.round(majorSegments));
  minorSegments = Math.max(3, Math.round(minorSegments));
  const vertices = [], faces = [];
  const index = (i,j) => ((i % majorSegments + majorSegments) % majorSegments) * minorSegments + ((j % minorSegments + minorSegments) % minorSegments);
  for (let i = 0; i < majorSegments; i++) {
    const u = i / majorSegments * Math.PI * 2;
    const cu = Math.cos(u), su = Math.sin(u);
    for (let j = 0; j < minorSegments; j++) {
      const v = j / minorSegments * Math.PI * 2;
      const ring = majorRadius + minorRadius * Math.cos(v);
      vertices.push(new THREE.Vector3(ring * cu, minorRadius * Math.sin(v), ring * su));
    }
  }
  for (let i = 0; i < majorSegments; i++) for (let j = 0; j < minorSegments; j++) {
    faces.push([index(i,j), index(i+1,j), index(i+1,j+1), index(i,j+1)]);
  }
  return new EditableMesh(vertices, faces);
}

export function makePrimitive(type, detail = 'medium') {
  const presets = {
    low:{ radial:8, sphereRings:4, torusMinor:4 },
    medium:{ radial:12, sphereRings:6, torusMinor:6 },
    high:{ radial:16, sphereRings:8, torusMinor:8 }
  };
  const p = presets[detail] || presets.medium;
  switch (type) {
    case 'plane': return makePlane(2);
    case 'cylinder': return makeCylinder(1, 2, p.radial);
    case 'sphere': return makeSphere(1, p.radial, p.sphereRings);
    case 'cone': return makeCone(1, 2, p.radial);
    case 'torus': return makeTorus(.72, .28, p.radial, p.torusMinor);
    case 'cube':
    default: return makeCube(2);
  }
}
