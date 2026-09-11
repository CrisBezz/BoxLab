import * as THREE from 'three';

// BoxLab v0.36.18.136 — non-destructive inter-face intersection inspection.
// Finds separate, non-adjacent polygon faces whose triangulated surfaces cross
// or overlap. Faces sharing a mesh vertex are excluded so ordinary connected
// topology is not reported as an intersection. Geometry/history are untouched.

const status=document.querySelector('#selectionStatus');
const faceTools=document.querySelector('[data-mode-tools="face"]');
const multiToggle=document.querySelector('#multiSelectToggle');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}

const button=document.createElement('button');
button.id='selectIntersectingFacesBtn';
button.type='button';
button.textContent='Face Intersections';
button.disabled=true;
button.style.cssText='width:100%;min-width:0;padding:5px 4px;font-size:10px';

function place(){
  if(button.isConnected)return true;
  const crossing=document.querySelector('#selectSelfIntersectingFacesBtn');
  const row=crossing?.parentElement;
  if(row){
    row.style.gridTemplateColumns='repeat(4,minmax(0,1fr))';
    row.appendChild(button);
    row.querySelectorAll('button').forEach(b=>{
      b.style.minWidth='0';
      b.style.padding='5px 3px';
      b.style.fontSize='9px';
    });
    return true;
  }
  if(faceTools){
    const host=document.createElement('div');
    host.className='outliner-actions';
    host.style.cssText='grid-template-columns:1fr;margin-top:4px';
    host.appendChild(button);
    faceTools.appendChild(host);
    return true;
  }
  return false;
}

function faceNormal(points){
  const n=new THREE.Vector3();
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  return n.lengthSq()>1e-24?n.normalize():null;
}

function projectPoint(p,axis){
  if(axis===0)return new THREE.Vector2(p.y,p.z);
  if(axis===1)return new THREE.Vector2(p.x,p.z);
  return new THREE.Vector2(p.x,p.y);
}

function triangulateFace(m,face){
  if(!Array.isArray(face)||face.length<3)return[];
  const points=face.map(i=>m.vertices?.[i]);
  if(points.some(p=>!p))return[];
  if(face.length===3)return[[points[0],points[1],points[2]]];
  const normal=faceNormal(points);if(!normal)return[];
  const abs=[Math.abs(normal.x),Math.abs(normal.y),Math.abs(normal.z)];
  const axis=abs[0]>=abs[1]&&abs[0]>=abs[2]?0:abs[1]>=abs[2]?1:2;
  const contour=points.map(p=>projectPoint(p,axis));
  const tris=THREE.ShapeUtils.triangulateShape(contour,[]);
  return tris.map(t=>[points[t[0]],points[t[1]],points[t[2]]]);
}

function triBox(tri){return new THREE.Box3().setFromPoints(tri);}
function triNormal(tri){return tri[1].clone().sub(tri[0]).cross(tri[2].clone().sub(tri[0]));}

function segmentTriangle(a,b,tri,eps){
  const dir=b.clone().sub(a);
  const e1=tri[1].clone().sub(tri[0]);
  const e2=tri[2].clone().sub(tri[0]);
  const p=dir.clone().cross(e2);
  const det=e1.dot(p);
  if(Math.abs(det)<=eps)return false;
  const inv=1/det;
  const tvec=a.clone().sub(tri[0]);
  const u=tvec.dot(p)*inv;
  if(u<-eps||u>1+eps)return false;
  const q=tvec.clone().cross(e1);
  const v=dir.dot(q)*inv;
  if(v<-eps||u+v>1+eps)return false;
  const t=e2.dot(q)*inv;
  return t>=-eps&&t<=1+eps;
}

function orient2(a,b,c){return (b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);}
function pointInTri2(p,a,b,c,eps){
  const o1=orient2(a,b,p),o2=orient2(b,c,p),o3=orient2(c,a,p);
  const neg=o1<-eps||o2<-eps||o3<-eps, pos=o1>eps||o2>eps||o3>eps;
  return !(neg&&pos);
}
function onSeg2(a,b,p,eps){
  return Math.abs(orient2(a,b,p))<=eps&&p.x>=Math.min(a.x,b.x)-eps&&p.x<=Math.max(a.x,b.x)+eps&&p.y>=Math.min(a.y,b.y)-eps&&p.y<=Math.max(a.y,b.y)+eps;
}
function segIntersect2(a,b,c,d,eps){
  const o1=orient2(a,b,c),o2=orient2(a,b,d),o3=orient2(c,d,a),o4=orient2(c,d,b);
  if(((o1>eps&&o2<-eps)||(o1<-eps&&o2>eps))&&((o3>eps&&o4<-eps)||(o3<-eps&&o4>eps)))return true;
  return onSeg2(a,b,c,eps)||onSeg2(a,b,d,eps)||onSeg2(c,d,a,eps)||onSeg2(c,d,b,eps);
}

function coplanarTriIntersect(a,b,normal,eps){
  const abs=[Math.abs(normal.x),Math.abs(normal.y),Math.abs(normal.z)];
  const axis=abs[0]>=abs[1]&&abs[0]>=abs[2]?0:abs[1]>=abs[2]?1:2;
  const A=a.map(p=>projectPoint(p,axis)),B=b.map(p=>projectPoint(p,axis));
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(segIntersect2(A[i],A[(i+1)%3],B[j],B[(j+1)%3],eps))return true;
  return pointInTri2(A[0],B[0],B[1],B[2],eps)||pointInTri2(B[0],A[0],A[1],A[2],eps);
}

function trianglesIntersect(a,b,eps){
  if(!triBox(a).expandByScalar(eps).intersectsBox(triBox(b)))return false;
  const na=triNormal(a),nb=triNormal(b);
  if(na.lengthSq()<=eps*eps||nb.lengthSq()<=eps*eps)return false;
  na.normalize();nb.normalize();
  const parallel=Math.abs(Math.abs(na.dot(nb))-1)<=1e-7;
  const planeDist=Math.abs(b[0].clone().sub(a[0]).dot(na));
  if(parallel&&planeDist<=eps)return coplanarTriIntersect(a,b,na,eps);
  for(let i=0;i<3;i++)if(segmentTriangle(a[i],a[(i+1)%3],b,eps))return true;
  for(let i=0;i<3;i++)if(segmentTriangle(b[i],b[(i+1)%3],a,eps))return true;
  return false;
}

function sharesVertex(a,b){
  const s=new Set(a);
  return b.some(v=>s.has(v));
}

function inspect(m){
  if(!m)return{indices:[],pairs:[],count:0,pairCount:0};
  const faces=m.faces||[];
  const triCache=faces.map(face=>triangulateFace(m,face));
  const boxes=triCache.map(tris=>{
    const box=new THREE.Box3();
    tris.flat().forEach(p=>box.expandByPoint(p));
    return box;
  });
  const meshBox=new THREE.Box3();
  (m.vertices||[]).forEach(v=>v&&meshBox.expandByPoint(v));
  const scale=meshBox.isEmpty()?1:meshBox.getSize(new THREE.Vector3()).length()||1;
  const eps=Math.max(1e-9,scale*1e-8);
  const hit=new Set(),pairs=[];
  for(let i=0;i<faces.length-1;i++){
    if(!Array.isArray(faces[i])||triCache[i].length===0)continue;
    for(let j=i+1;j<faces.length;j++){
      if(!Array.isArray(faces[j])||triCache[j].length===0||sharesVertex(faces[i],faces[j]))continue;
      if(!boxes[i].clone().expandByScalar(eps).intersectsBox(boxes[j]))continue;
      let found=false;
      for(const a of triCache[i]){
        for(const b of triCache[j]){
          if(trianglesIntersect(a,b,eps)){found=true;break;}
        }
        if(found)break;
      }
      if(found){hit.add(i);hit.add(j);pairs.push([i,j]);}
    }
  }
  const indices=[...hit].sort((a,b)=>a-b);
  return{indices,pairs,count:indices.length,pairCount:pairs.length};
}

function apply(){
  const m=mesh();if(!m)return;
  const info=inspect(m);
  const faceMode=document.querySelector('#selectionModes button[data-mode="face"]');
  if(faceMode&&!faceMode.classList.contains('active'))faceMode.click();
  queueMicrotask(()=>{
    if(multiToggle){
      const wanted=info.indices.length>1;
      if(multiToggle.checked!==wanted){multiToggle.checked=wanted;multiToggle.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    bridge()?.set?.('face',info.indices);
    render();
    if(status)status.textContent=info.count
      ?`Face Intersections • ${info.pairCount} crossing pair${info.pairCount===1?'':'s'} • ${info.count} faces selected`
      :'Topology check • 0 inter-face intersections';
  });
}

function sync(){
  place();
  const m=mesh();
  button.disabled=!m;
  button.title=m?'Find intersections between separate non-adjacent faces':'No editable mesh';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
[0,40,120,300,700,1000].forEach(delay=>setTimeout(sync,delay));

setTimeout(()=>{
  const appVersion=document.querySelector('#appVersion');
  if(appVersion)appVersion.textContent='v0.36.18.136';
},1200);

globalThis.__boxlabSelectIntersectingFaces={version:'0.36.18.136',inspect,apply,sync};
