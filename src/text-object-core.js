import * as THREE from 'three';
import { Font } from 'three/addons/loaders/FontLoader.js';
import { EditableMesh } from './mesh.js';

// One EditableMesh for all glyph shells; holes remain open through the depth.
export function makeTextObject(data,text,{thickness=.2,x=4,y=1}={}){
  text=String(text||'').trim();
  if(!text||text.length>64)throw new Error('Enter 1–64 characters');
  thickness=Number(thickness);
  if(!Number.isFinite(thickness)||thickness<.01||thickness>100)throw new Error('Thickness must be 0.01–100');
  if([...text].some(c=>!data.glyphs[c]))throw new Error('This font does not contain every typed character');
  const curves=Math.max(1,Math.min(16,Math.round(Number(x)||4))),bands=Math.max(1,Math.min(32,Math.round(Number(y)||1)));
  const vertices=[],faces=[];
  for(const shape of new Font(data).generateShapes(text,1)){
    const extracted=shape.extractPoints(curves);
    const clean=points=>{const out=points.filter((p,i)=>!i||p.distanceToSquared(points[i-1])>1e-16);if(out.length>1&&out[0].distanceToSquared(out.at(-1))<1e-16)out.pop();return out;};
    const contour=clean(extracted.shape),holes=extracted.holes.map(clean);
    if(THREE.ShapeUtils.isClockWise(contour))contour.reverse();
    for(const hole of holes)if(!THREE.ShapeUtils.isClockWise(hole))hole.reverse();
    const loops=[contour,...holes],points=loops.flat(),offset=vertices.length,n=points.length;
    for(let j=0;j<=bands;j++)for(const p of points)vertices.push([p.x,p.y,thickness*(j/bands-.5)]);
    for(const tri of THREE.ShapeUtils.triangulateShape(contour,holes)){
      const [a,b,c]=tri,p=points[a],q=points[b],r=points[c],cross=(q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x);
      if(Math.abs(cross)<1e-14)throw new Error('Text outline could not be triangulated safely');
      const front=cross>0?tri:[a,c,b];faces.push(front.map(i=>offset+i).reverse(),front.map(i=>offset+bands*n+i));
    }
    let start=0;
    for(const loop of loops){for(let i=0;i<loop.length;i++)for(let j=0;j<bands;j++){const a=offset+j*n+start+i,b=offset+j*n+start+(i+1)%loop.length;faces.push([a,b,b+n,a+n]);}start+=loop.length;}
  }
  if(!faces.length)throw new Error('Enter text with visible letters');
  const mesh=new EditableMesh(vertices,faces),box=new THREE.Box3().setFromPoints(mesh.vertices),center=box.getCenter(new THREE.Vector3());
  mesh.vertices.forEach(v=>v.sub(center));return mesh;
}
