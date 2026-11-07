// Presentation only: project the existing Add candidate, never create scene objects.
export function createAddObjectPreview(parent) {
  const canvas=document.createElement('canvas');
  canvas.dataset.addPreview='mesh';
  canvas.setAttribute('aria-label','Object preview — drag to rotate');
  Object.assign(canvas.style,{width:'100%',height:'190px',display:'block',background:'#161b23',borderRadius:'8px',touchAction:'none',cursor:'grab'});
  parent.append(canvas);
  const hint=document.createElement('small');hint.textContent='Preview · drag to rotate';parent.append(hint);
  const ctx=canvas.getContext?.('2d');
  let mesh=null,yaw=.65,pitch=.4,drag=null,disposed=false;
  function draw(){
    if(disposed||!ctx)return;
    const w=Math.max(1,canvas.clientWidth||320),h=190,dpr=Math.min(2,globalThis.devicePixelRatio||1);
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    if(!mesh?.vertices.length)return;
    const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
    for(const v of mesh.vertices)for(const [i,key] of ['x','y','z'].entries()){min[i]=Math.min(min[i],v[key]);max[i]=Math.max(max[i],v[key]);}
    const centre=min.map((v,i)=>(v+max[i])/2),cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
    const points=mesh.vertices.map(v=>{const x=v.x-centre[0],y=v.y-centre[1],z=v.z-centre[2],u=cy*x+sy*z,t=-sy*x+cy*z;return [u,cp*y-sp*t,sp*y+cp*t];});
    let radius=1e-6;for(const p of points)radius=Math.max(radius,Math.hypot(...p));
    const scale=Math.min(w,h)*.42/radius;
    const faces=mesh.faces.map(face=>({face,depth:face.reduce((sum,id)=>sum+points[id][2],0)/face.length})).sort((a,b)=>a.depth-b.depth);
    ctx.lineWidth=1;ctx.lineJoin='round';
    for(const {face} of faces){
      const a=points[face[0]],b=points[face[1]],c=points[face[2]];
      if(!a||!b||!c)continue;
      const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2],vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2];
      const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx,len=Math.hypot(nx,ny,nz)||1;
      const light=.55+.35*Math.abs((nx*.3+ny*.5+nz*.8)/len),value=Math.round(140*light);
      ctx.fillStyle=`rgb(${Math.round(value*.65)},${value},${Math.min(255,value+55)})`;ctx.strokeStyle='#b9d9f0';
      ctx.beginPath();face.forEach((id,i)=>{const p=points[id],x=w/2+p[0]*scale,y=h/2-p[1]*scale;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();ctx.fill();ctx.stroke();
    }
  }
  function end(e){if(drag?.id!==e.pointerId)return;drag=null;if(canvas.hasPointerCapture?.(e.pointerId))canvas.releasePointerCapture(e.pointerId);canvas.style.cursor='grab';e.stopPropagation();}
  canvas.addEventListener('pointerdown',e=>{if(disposed||drag||e.button>0)return;e.preventDefault();e.stopPropagation();drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture?.(e.pointerId);canvas.style.cursor='grabbing';});
  canvas.addEventListener('pointermove',e=>{if(drag?.id!==e.pointerId)return;e.preventDefault();e.stopPropagation();yaw+=(e.clientX-drag.x)*.012;pitch=Math.max(-1.5,Math.min(1.5,pitch+(e.clientY-drag.y)*.012));drag.x=e.clientX;drag.y=e.clientY;draw();});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,end);
  const observer=typeof ResizeObserver==='function'?new ResizeObserver(draw):null;observer?.observe(canvas);
  return {setMesh(value){if(disposed)return;mesh=value;draw();},dispose(){if(disposed)return;disposed=true;observer?.disconnect();if(drag&&canvas.hasPointerCapture?.(drag.id))canvas.releasePointerCapture(drag.id);drag=null;mesh=null;canvas.remove();hint.remove();}};
}
