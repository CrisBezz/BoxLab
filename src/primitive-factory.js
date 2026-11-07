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

const segments=(value,min=1,max=32)=>Math.max(min,Math.min(max,Math.round(Number(value)||min)));
export function makeCube(size = 2, x = 1, y = 1) {
  x=segments(x);y=segments(y);
  const base=EditableMesh.cube(size);if(x===1&&y===1)return base;
  const vertices=[],faces=[],byPosition=new Map();
  const id=p=>{const key=p.toArray().map(v=>v.toFixed(10)).join(',');if(!byPosition.has(key)){byPosition.set(key,vertices.length);vertices.push(p);}return byPosition.get(key);};
  for(const face of base.faces){const a=base.vertices[face[0]],b=base.vertices[face[1]],d=base.vertices[face[3]],u=b.clone().sub(a),v=d.clone().sub(a),nu=Math.abs(u.x)>0?x:y,nv=Math.abs(v.x)>0?x:y,grid=[];
    for(let i=0;i<=nu;i++){grid[i]=[];for(let j=0;j<=nv;j++)grid[i][j]=id(a.clone().addScaledVector(u,i/nu).addScaledVector(v,j/nv));}
    for(let i=0;i<nu;i++)for(let j=0;j<nv;j++)faces.push([grid[i][j],grid[i+1][j],grid[i+1][j+1],grid[i][j+1]]);
  }
  return new EditableMesh(vertices,faces);
}

export function makePlane(size = 2, x = 1, y = 1) {
  x=segments(x);y=segments(y);const vertices=[],faces=[];
  for(let j=0;j<=y;j++)for(let i=0;i<=x;i++)vertices.push([size*(i/x-.5),0,size*(j/y-.5)]);
  const id=(i,j)=>j*(x+1)+i;
  for(let j=0;j<y;j++)for(let i=0;i<x;i++)faces.push([id(i,j),id(i,j+1),id(i+1,j+1),id(i+1,j)]);
  return new EditableMesh(vertices,faces);
}

export function makeCylinder(radius = 1, height = 2, radial = 12, bands = 1) {
  radial=segments(radial,3);bands=segments(bands);const vertices=[],faces=[],loops=[];
  for(let j=0;j<=bands;j++)loops.push(ringVertices(vertices,height*(j/bands-.5),radius,radial));
  for(let j=0;j<bands;j++)for(let i=0;i<radial;i++){const n=(i+1)%radial;faces.push([loops[j][i],loops[j+1][i],loops[j+1][n],loops[j][n]]);}
  faces.push([...loops[0]],[...loops[bands]].reverse());return new EditableMesh(vertices,faces);
}

export function makeCone(radius = 1, height = 2, radial = 12, bands = 1) {
  radial=segments(radial,3);bands=segments(bands);const vertices=[],faces=[],loops=[];
  for(let j=0;j<bands;j++)loops.push(ringVertices(vertices,height*(j/bands-.5),radius*(1-j/bands),radial));
  const apex=vertices.length;vertices.push(new THREE.Vector3(0,height/2,0));
  for(let j=0;j<bands;j++)for(let i=0;i<radial;i++){const n=(i+1)%radial;faces.push(j===bands-1?[loops[j][i],apex,loops[j][n]]:[loops[j][i],loops[j+1][i],loops[j+1][n],loops[j][n]]);}
  faces.push([...loops[0]]);return new EditableMesh(vertices,faces);
}

export function makeSphere(radius = 1, radialSegments = 12, rings = 6) {
  radialSegments = segments(radialSegments,4);
  rings = segments(rings,2);
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
  majorSegments = segments(majorSegments,3);
  minorSegments = segments(minorSegments,3);
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
    faces.push([index(i,j), index(i,j+1), index(i+1,j+1), index(i+1,j)]);
  }
  return new EditableMesh(vertices, faces);
}

export const primitiveDensity={
  cube:{x:1,y:1,minX:1,minY:1,xLabel:'X · Width',yLabel:'Y · Height / depth'},
  plane:{x:1,y:1,minX:1,minY:1,xLabel:'X · Width',yLabel:'Y · Depth'},
  cylinder:{x:12,y:1,minX:3,minY:1,xLabel:'X · Around',yLabel:'Y · Height'},
  cone:{x:12,y:1,minX:3,minY:1,xLabel:'X · Around',yLabel:'Y · Height'},
  sphere:{x:12,y:6,minX:4,minY:2,xLabel:'X · Around',yLabel:'Y · Pole to pole'},
  torus:{x:12,y:6,minX:3,minY:3,xLabel:'X · Ring',yLabel:'Y · Tube'}
};
export function makePrimitive(type, detail = 'medium') {
  const presets={low:{x:8,y:4},medium:{x:12,y:6},high:{x:16,y:8}},p=presets[detail]||presets.medium;
  const defaults=primitiveDensity[type]||primitiveDensity.cube;
  const options=typeof detail==='object'&&detail!==null?detail:{};
  const x=segments(options.x??(['cube','plane'].includes(type)?1:p.x),defaults.minX);
  const y=segments(options.y??(['sphere','torus'].includes(type)?p.y:1),defaults.minY);
  switch(type){
    case 'plane':return makePlane(2,x,y);
    case 'cylinder':return makeCylinder(1,2,x,y);
    case 'cone':return makeCone(1,2,x,y);
    case 'sphere':return makeSphere(1,x,y);
    case 'torus':return makeTorus(.72,.28,x,y);
    default:return makeCube(2,x,y);
  }
}
