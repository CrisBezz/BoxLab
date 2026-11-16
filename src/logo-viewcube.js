import * as THREE from 'three';

// Keep the shared camera identity: all existing picking and tool owners retain it.
export function installProjection(camera){
 if(typeof camera.userData.boxlabProjection?.set==='function')return camera.userData.boxlabProjection;
 const perspective=camera.updateProjectionMatrix.bind(camera);
 const ortho=new THREE.OrthographicCamera();
 const state={orthographic:false,height:6};
 camera.left=-3;camera.right=3;camera.top=3;camera.bottom=-3;
 camera.updateProjectionMatrix=function(){
  if(!state.orthographic){perspective();return;}
  const half=state.height/2;
  this.left=-half*this.aspect;this.right=half*this.aspect;this.top=half;this.bottom=-half;
  Object.assign(ortho,{left:this.left,right:this.right,top:this.top,bottom:this.bottom,near:this.near,far:this.far,zoom:this.zoom});
  ortho.updateProjectionMatrix();this.projectionMatrix.copy(ortho.projectionMatrix);this.projectionMatrixInverse.copy(ortho.projectionMatrixInverse);
 };
 state.set=(enabled,height)=>{state.orthographic=enabled;if(height>0)state.height=height;camera.isOrthographicCamera=enabled;camera.isPerspectiveCamera=!enabled;camera.zoom=1;camera.updateProjectionMatrix();};
 camera.userData.boxlabProjection=state;
 return state;
}

// Reuse the viewport's actual orbit owner, including its camera-relative tumbling.
export function orbitFromLogo(state,dx,dy,size=150){
 const {camera,controls}=state||{};
 if(!camera||!controls||!controls.enabled||!controls.enableRotate)return false;
 if(camera.isOrthographicCamera)installProjection(camera).set(false);
 controls.stopSpin?.();
 controls._rotateLeft(2*Math.PI*dx/size);
 controls._rotateUp(2*Math.PI*dy/size);
 controls.update();
 return true;
}

export function logoBoxes(){
 return [
  {view:'front',color:'#42a7ef',axis:2,sign:1},
  {view:'rear',color:'#174c83',axis:2,sign:-1},
  {view:'left',color:'#8e2429',axis:0,sign:-1},
  {view:'right',color:'#ed5957',axis:0,sign:1},
  {view:'top',color:'#83dc3d',axis:1,sign:1},
  {view:'bottom',color:'#2d6818',axis:1,sign:-1},
 ];
}

// Exact user-supplied BOXLAB_VIEWCUBE.obj: 80 vertices, 78 closed quads.
// Shared coplanar edges are omitted; only actual creases outline the geometry.
const logoVertices=[[-0.5,-0.5,-0.5],[0.5,-0.5,-0.5],[0.5,0.5,-0.5],[-0.5,0.5,-0.5],[-0.5,-0.5,0.5],[0.5,-0.5,0.5],[0.5,0.5,0.5],[-0.5,0.5,0.5],[0.75,-0.5,-0.5],[0.75,0.5,-0.5],[0.75,0.5,0.5],[0.75,-0.5,0.5],[-0.5,-0.5,0.75],[0.5,-0.5,0.75],[0.5,0.5,0.75],[-0.5,0.5,0.75],[-0.5,0.75,-0.5],[-0.5,0.75,0.5],[0.5,0.75,0.5],[0.5,0.75,-0.5],[-0.5,-0.5,-0.75],[-0.5,0.5,-0.75],[0.5,0.5,-0.75],[0.5,-0.5,-0.75],[-0.5,-0.75,-0.5],[0.5,-0.75,-0.5],[0.5,-0.75,0.5],[-0.5,-0.75,0.5],[-0.75,-0.5,-0.5],[-0.75,-0.5,0.5],[-0.75,0.5,0.5],[-0.75,0.5,-0.5],[0.75,-0.375,-0.375],[0.75,0.375,-0.375],[0.75,0.375,0.375],[0.75,-0.375,0.375],[-0.375,0.75,-0.375],[-0.375,0.75,0.375],[0.375,0.75,0.375],[0.375,0.75,-0.375],[-0.375,-0.375,0.75],[0.375,-0.375,0.75],[0.375,0.375,0.75],[-0.375,0.375,0.75],[-0.375,-0.375,-0.75],[-0.375,0.375,-0.75],[0.375,0.375,-0.75],[0.375,-0.375,-0.75],[-0.75,-0.375,-0.375],[-0.75,-0.375,0.375],[-0.75,0.375,0.375],[-0.75,0.375,-0.375],[-0.375,-0.75,-0.375],[0.375,-0.75,-0.375],[0.375,-0.75,0.375],[-0.375,-0.75,0.375],[0.375,-0.5,-0.375],[-0.375,-0.5,-0.375],[0.375,-0.5,0.375],[-0.375,-0.5,0.375],[-0.375,0.5,0.375],[-0.375,0.5,-0.375],[0.375,0.5,0.375],[0.375,0.5,-0.375],[0.375,-0.375,0.5],[-0.375,-0.375,0.5],[0.375,0.375,0.5],[-0.375,0.375,0.5],[0.5,0.375,-0.375],[0.5,-0.375,-0.375],[0.5,0.375,0.375],[0.5,-0.375,0.375],[-0.375,0.375,-0.5],[-0.375,-0.375,-0.5],[0.375,0.375,-0.5],[0.375,-0.375,-0.5],[-0.5,-0.375,0.375],[-0.5,-0.375,-0.375],[-0.5,0.375,0.375],[-0.5,0.375,-0.375]];
const logoFaces=[[1,2,9,8],[2,6,10,9],[6,5,11,10],[5,1,8,11],[4,5,13,12],[5,6,14,13],[6,7,15,14],[7,4,12,15],[3,7,17,16],[7,6,18,17],[6,2,19,18],[2,3,16,19],[0,3,21,20],[3,2,22,21],[2,1,23,22],[1,0,20,23],[0,1,25,24],[1,5,26,25],[5,4,27,26],[4,0,24,27],[0,4,29,28],[4,7,30,29],[7,3,31,30],[3,0,28,31],[8,9,33,32],[9,10,34,33],[10,11,35,34],[11,8,32,35],[16,17,37,36],[17,18,38,37],[18,19,39,38],[19,16,36,39],[12,13,41,40],[13,14,42,41],[14,15,43,42],[15,12,40,43],[20,21,45,44],[21,22,46,45],[22,23,47,46],[23,20,44,47],[28,29,49,48],[29,30,50,49],[30,31,51,50],[31,28,48,51],[24,25,53,52],[25,26,54,53],[26,27,55,54],[27,24,52,55],[52,53,56,57],[53,54,58,56],[54,55,59,58],[55,52,57,59],[57,56,58,59],[36,37,60,61],[37,38,62,60],[38,39,63,62],[39,36,61,63],[61,60,62,63],[40,41,64,65],[41,42,66,64],[42,43,67,66],[43,40,65,67],[65,64,66,67],[32,33,68,69],[33,34,70,68],[34,35,71,70],[35,32,69,71],[69,68,70,71],[44,45,72,73],[45,46,74,72],[46,47,75,74],[47,44,73,75],[73,72,74,75],[48,49,76,77],[49,50,78,76],[50,51,79,78],[51,48,77,79],[77,76,78,79]];
export function logoSurfaces(){
 const points=logoVertices.map(p=>new THREE.Vector3(...p).multiplyScalar(1.4));
 const surfaces=logoFaces.map(face=>{
  const vertices=face.map(i=>points[i]);
  const normal=vertices[1].clone().sub(vertices[0]).cross(vertices[2].clone().sub(vertices[0])).normalize();
  const center=vertices.reduce((sum,p)=>sum.add(p),new THREE.Vector3()).multiplyScalar(1/vertices.length);
  const values=center.toArray(),axis=values.reduce((best,n,i)=>Math.abs(n)>Math.abs(values[best])?i:best,0);
  const box=logoBoxes().find(b=>b.axis===axis&&b.sign===(values[axis]>=0?1:-1));
  return {view:box.view,color:box.color,points:vertices,normal,face,edges:[]};
 });
 const edges=new Map();
 surfaces.forEach((s,index)=>s.face.forEach((a,i)=>{const b=s.face[(i+1)%s.face.length],key=[a,b].sort((x,y)=>x-y).join(':');if(!edges.has(key))edges.set(key,[]);edges.get(key).push({index,edge:i});}));
 for(const rows of edges.values())if(rows.length!==2||surfaces[rows[0].index].normal.dot(surfaces[rows[1].index].normal)<.9999)for(const r of rows)surfaces[r.index].edges.push(r.edge);
 return surfaces;
}

export function mountLogoViewcube(setView){
 const wrap=document.querySelector('#viewportWrap');if(!wrap||document.querySelector('#logoViewcube'))return;
 const host=document.createElement('div');host.id='logoViewcube';host.setAttribute('aria-label','BoxLab orbit navigator');
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','-80 -80 160 160');svg.setAttribute('role','img');svg.setAttribute('aria-label','Drag hollow cube logo to orbit; tap a coloured box for its orthographic view');
 host.append(svg);wrap.append(host);
 const surfaces=logoSurfaces(),inverse=new THREE.Quaternion();let signature='',drag=null;
 const nodes=surfaces.map(surface=>{
  const group=document.createElementNS(svg.namespaceURI,'g');group.dataset.view=surface.view;
  const polygon=document.createElementNS(svg.namespaceURI,'polygon');polygon.setAttribute('fill',surface.color);polygon.setAttribute('stroke',surface.color);polygon.setAttribute('stroke-width','.35');
  const outline=document.createElementNS(svg.namespaceURI,'path');outline.setAttribute('fill','none');outline.setAttribute('stroke','#10161e');outline.setAttribute('stroke-width','.65');outline.setAttribute('stroke-linejoin','round');outline.setAttribute('pointer-events','none');
  const title=document.createElementNS(svg.namespaceURI,'title');title.textContent=surface.view==='rear'?'BACK':surface.view.toUpperCase();group.append(title,polygon,outline);svg.append(group);return {group,polygon,outline};
 });
 function draw(){
  const camera=globalThis.__boxlabBridgeState?.camera;
  if(camera){
   const next=camera.quaternion.toArray().join(',');
   if(next!==signature){signature=next;inverse.copy(camera.quaternion).invert();
    const rows=surfaces.map((surface,index)=>{const points=surface.points.map(p=>p.clone().applyQuaternion(inverse));return {index,points,visible:surface.normal.clone().applyQuaternion(inverse).z>1e-7,depth:points.reduce((n,p)=>n+p.z,0)/4};}).sort((a,b)=>a.depth-b.depth);
    for(const row of rows){
     const node=nodes[row.index];node.group.style.display=row.visible?'':'none';
     const xy=row.points.map(p=>`${p.x*51},${-p.y*51}`);node.polygon.setAttribute('points',xy.join(' '));
     node.outline.setAttribute('d',surfaces[row.index].edges.map(i=>`M${xy[i]}L${xy[(i+1)%xy.length]}`).join(' '));svg.append(node.group);
    }
   }
  }
  requestAnimationFrame(draw);
 }
 requestAnimationFrame(draw);
 host.addEventListener('pointerdown',event=>{
  event.preventDefault();event.stopPropagation();if(drag||event.button>0)return;
  drag={id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false,view:event.target.closest?.('[data-view]')?.dataset.view};
  host.setPointerCapture(event.pointerId);
 });
 host.addEventListener('pointermove',event=>{
  event.preventDefault();event.stopPropagation();if(!drag||drag.id!==event.pointerId)return;
  if(!drag.moved&&Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<5)return;
  if(!drag.moved){drag.moved=true;globalThis.__boxlabBridgeState?.controls?.dispatchEvent({type:'start'});}
  orbitFromLogo(globalThis.__boxlabBridgeState,event.clientX-drag.x,event.clientY-drag.y,host.clientWidth);
  drag.x=event.clientX;drag.y=event.clientY;
 });
 const finish=(event,cancelled=false)=>{
  event.preventDefault();event.stopPropagation();if(!drag||drag.id!==event.pointerId)return;
  const current=drag;drag=null;
  if(host.hasPointerCapture(event.pointerId))host.releasePointerCapture(event.pointerId);
  if(current.moved)globalThis.__boxlabBridgeState?.controls?.dispatchEvent({type:'end'});
  else if(!cancelled&&current.view)setView(current.view);
 };
 host.addEventListener('pointerup',event=>finish(event));host.addEventListener('pointercancel',event=>finish(event,true));host.addEventListener('lostpointercapture',event=>{if(drag)finish(event,true);});
 for(const type of ['click','dblclick','wheel'])host.addEventListener(type,event=>{event.preventDefault();event.stopPropagation();});
 const home=document.createElement('button');home.textContent='3D';home.title='Return to perspective';home.addEventListener('pointerdown',event=>event.stopPropagation());home.addEventListener('click',event=>{event.stopPropagation();setView('axon');});host.append(home);
 const style=document.createElement('style');style.textContent='#logoViewcube{position:absolute;top:10px;right:max(10px,env(safe-area-inset-right));width:150px;z-index:4;touch-action:none;user-select:none;-webkit-user-select:none}#logoViewcube svg{display:block;width:100%;overflow:visible;filter:drop-shadow(0 3px 3px #0008);cursor:grab}#logoViewcube:active svg{cursor:grabbing}#logoViewcube button{display:block;margin:0 auto;min-height:28px;padding:2px 12px;font-size:10px}';document.head.append(style);
}
