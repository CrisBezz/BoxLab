import * as THREE from 'three';
import {createPaintTriangleGraph} from './paint-triangle-graph.js?v=0.36.18.933';
import {captureSurfaceImageFrame,surfaceImageOrientation} from './paint-image-surface.js?v=0.36.18.933';
// A local unfolded image chart over original triangles. The existing image UV
// rasterizer samples it; this helper owns neither pixels, mesh edits nor history.
export function createPaintImageWrap({geometry,mesh,payload,topologySignature,matrixWorld,surface}){
 const frame=captureSurfaceImageFrame(surface),triangles=createPaintTriangleGraph({geometry,mesh,payload,topologySignature,matrixWorld}),root=frame.triangle;
 if(!Number.isInteger(root)||root<0||root>=triangles.length)throw Error('Pick a current surface before wrapping the image');
 const anchor=new THREE.Vector3().fromArray(frame.point),seed=triangles[root],extent=Math.max(frame.width,frame.height)*frame.scale;
 if(new THREE.Triangle(...seed.p).closestPointToPoint(anchor,new THREE.Vector3()).distanceTo(anchor)>Math.max(1e-6,extent*1e-5))throw Error('Surface image anchor no longer matches the mesh');
 const q=surfaceImageOrientation(frame),right=new THREE.Vector3(1,0,0).applyQuaternion(q),up=new THREE.Vector3(0,1,0).applyQuaternion(q),halfW=frame.width*frame.scale/2,halfH=frame.height*frame.scale/2;
 const chart=new Array(triangles.length).fill(null),best=new Float64Array(triangles.length).fill(Infinity),heap=[];
 const centre=points=>points.reduce((p,v)=>p.add(v),new THREE.Vector2()).multiplyScalar(1/3);
 const less=(a,b)=>a.distance<b.distance||(a.distance===b.distance&&a.ti<b.ti);
 function push(item){let i=heap.length;heap.push(item);while(i){const p=(i-1)>>1;if(!less(item,heap[p]))break;heap[i]=heap[p];i=p;}heap[i]=item;}
 function pop(){const first=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let j=i*2+1;if(j+1<heap.length&&less(heap[j+1],heap[j]))j++;if(!less(heap[j],last))break;heap[i]=heap[j];i=j;}heap[i]=last;}return first;}
 function unfold(t,points,j,next){
  const ja=(j+1)%3,jb=(j+2)%3,ia=next.ids.indexOf(t.ids[ja]),ib=next.ids.indexOf(t.ids[jb]),ic=[0,1,2].find(i=>i!==ia&&i!==ib);if(ia<0||ib<0)return null;
  const A=points[ja],B=points[jb],edge=B.clone().sub(A),length=edge.length();if(length<=1e-12)return null;edge.divideScalar(length);
  const side=edge.x*(points[j].y-A.y)-edge.y*(points[j].x-A.x),ra=next.p[ic].distanceTo(next.p[ia]),rb=next.p[ic].distanceTo(next.p[ib]),along=(ra*ra-rb*rb+length*length)/(2*length),height2=ra*ra-along*along;
  if(Math.abs(side)<=length*length*1e-12||height2<=Math.max(ra*ra,1e-300)*1e-14)return null;
  const perpendicular=new THREE.Vector2(-edge.y,edge.x).multiplyScalar(side>0?-1:1),C=A.clone().addScaledVector(edge,along).addScaledVector(perpendicular,Math.sqrt(height2)),out=[];out[ia]=A.clone();out[ib]=B.clone();out[ic]=C;return out;
 }
 const first=seed.p.map(p=>{const d=p.clone().sub(anchor);return new THREE.Vector2(d.dot(right),d.dot(up));});best[root]=0;push({ti:root,points:first,distance:0});let work=0;
 while(heap.length){
  if(++work>200000)throw Error('Surface image wrapping is too complex; use a smaller patch');
  const {ti,points,distance}=pop();if(chart[ti]||distance!==best[ti])continue;
  // Stop expanding once a triangle lies wholly outside the local image rectangle.
  if(ti!==root&&[0,1].some(axis=>{const values=points.map(p=>axis?p.y:p.x),half=axis?halfH:halfW;return Math.min(...values)>half||Math.max(...values)<-half;}))continue;
  chart[ti]=points;const t=triangles[ti],c=centre(points);
  for(let j=0;j<3;j++){
   const n=t.next[j];if(n<0||chart[n])continue;const next=unfold(t,points,j,triangles[n]);if(!next)continue;
   const mid=points[(j+1)%3].clone().add(points[(j+2)%3]).multiplyScalar(.5),cost=distance+c.distanceTo(mid)+centre(next).distanceTo(mid);
   if(cost<best[n]){best[n]=cost;push({ti:n,points:next,distance:cost});}
  }
 }
 // Curvature prevents a globally isometric unfolding. Reconcile coordinates at
 // canonical shared vertices so local cycle closures stretch the image instead
 // of leaving a crack. Keep the seed triangle fixed to the picked frame.
 const vertices=new Map();
 for(let ti=0;ti<chart.length;ti++)if(chart[ti])for(let j=0;j<3;j++){const id=triangles[ti].ids[j],v=vertices.get(id)||{sum:new THREE.Vector2(),count:0};v.sum.add(chart[ti][j]);v.count++;vertices.set(id,v);}
 for(const v of vertices.values())v.sum.divideScalar(v.count);
 for(let j=0;j<3;j++)vertices.get(seed.ids[j]).sum.copy(first[j]);
 for(let ti=0;ti<chart.length;ti++)if(chart[ti])chart[ti]=triangles[ti].ids.map(id=>vertices.get(id).sum);
 return {sample(triangle,weights){const points=chart[triangle];if(!points)return null;const p=points.reduce((out,v,i)=>out.addScaledVector(v,weights[i]),new THREE.Vector2()),u=.5+p.x/(halfW*2),v=.5-p.y/(halfH*2);return u>=0&&u<=1&&v>=0&&v<=1?{u,v}:null;}};
}
