import * as THREE from 'three';import {EditableMesh} from '../../src/mesh.js';
export function cornerBand({subdivisions=4,profile=[[0,0],[2,0],[2,1],[1,1],[1,3],[0,3]]}={}){
 const points=[];
 for(let i=0;i<profile.length;i++){const a=profile[i],b=profile[(i+1)%profile.length],n=Math.max(1,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])*subdivisions));for(let j=0;j<n;j++)points.push(new THREE.Vector2(a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n));}
 const zs=[-1,-.1,.1,1],vertices=zs.flatMap(z=>points.map(p=>[p.x,p.y,z])),faces=[],ids=[],n=points.length;
 for(let layer=0;layer<3;layer++)for(let i=0;i<n;i++){const j=(i+1)%n;if(layer===1)ids.push(faces.length);faces.push([layer*n+i,layer*n+j,(layer+1)*n+j,(layer+1)*n+i]);}
 for(const tri of THREE.ShapeUtils.triangulateShape(points,[])){const [a,b,c]=tri.map(i=>new THREE.Vector3(...vertices[i]));const oriented=b.clone().sub(a).cross(c.clone().sub(a)).z>0?tri:[tri[0],tri[2],tri[1]];faces.push([...oriented].reverse());faces.push(oriented.map(i=>3*n+i));}
 return {mesh:new EditableMesh(vertices,faces),ids,points};
}

// Same stepped profile with a purposefully gridded all-quad source cap.
export function quadBand(){const f=cornerBand({subdivisions:2}),m=f.mesh;m.faces=m.faces.slice(0,3*f.points.length);for(const z of [-1,1]){const id=(x,y)=>{let i=m.vertices.findIndex(v=>v.x===x&&v.y===y&&v.z===z);if(i<0){i=m.vertices.length;m.vertices.push(new THREE.Vector3(x,y,z));}return i;};for(let y=0;y<3;y+=.5)for(let x=0;x<(y<1?2:1);x+=.5){const q=[[x,y],[x+.5,y],[x+.5,y+.5],[x,y+.5]].map(([x,y])=>id(x,y));m.faces.push(z<0?q.reverse():q);}}return f;}
