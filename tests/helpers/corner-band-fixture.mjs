import * as THREE from 'three';import {EditableMesh} from '../../src/mesh.js';
export function cornerBand({subdivisions=4,profile=[[0,0],[2,0],[2,1],[1,1],[1,3],[0,3]]}={}){
 const points=[];
 for(let i=0;i<profile.length;i++){const a=profile[i],b=profile[(i+1)%profile.length],n=Math.max(1,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])*subdivisions));for(let j=0;j<n;j++)points.push(new THREE.Vector2(a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n));}
 const zs=[-1,-.1,.1,1],vertices=zs.flatMap(z=>points.map(p=>[p.x,p.y,z])),faces=[],ids=[],n=points.length;
 for(let layer=0;layer<3;layer++)for(let i=0;i<n;i++){const j=(i+1)%n;if(layer===1)ids.push(faces.length);faces.push([layer*n+i,layer*n+j,(layer+1)*n+j,(layer+1)*n+i]);}
 for(const tri of THREE.ShapeUtils.triangulateShape(points,[])){const [a,b,c]=tri.map(i=>new THREE.Vector3(...vertices[i]));const oriented=b.clone().sub(a).cross(c.clone().sub(a)).z>0?tri:[tri[0],tri[2],tri[1]];faces.push([...oriented].reverse());faces.push(oriented.map(i=>3*n+i));}
 return {mesh:new EditableMesh(vertices,faces),ids,points};
}
