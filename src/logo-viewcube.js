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
  {view:'front',color:'#ed5957',axis:2,sign:1},
  {view:'rear',color:'#8e2429',axis:2,sign:-1},
  {view:'left',color:'#42a7ef',axis:0,sign:-1},
  {view:'right',color:'#174c83',axis:0,sign:1},
  {view:'top',color:'#83dc3d',axis:1,sign:1},
  {view:'bottom',color:'#2d6818',axis:1,sign:-1},
 ];
}

// Six hollow boxes on the six sides of a shared centre. Real world-space frame
// surfaces are projected into SVG, avoiding a second WebGL context on iPad.
export function logoSurfaces(){
 const surfaces=[];
 const faces=[[0,2,3,1],[4,5,7,6],[0,1,5,4],[2,6,7,3],[0,4,6,2],[1,3,7,5]];
 for(const box of logoBoxes()){
  const other=[0,1,2].filter(a=>a!==box.axis);
  for(const side of [-1,1])for(const edge of [0,1]){
   const center=[0,0,0],size=[.16,.16,.16];
   center[box.axis]=box.sign*.64;size[box.axis]=.82;
   center[other[edge]]=side*.36;size[other[edge]]=.16;size[other[1-edge]]=.88;
   const points=Array.from({length:8},(_,i)=>new THREE.Vector3(...center.map((v,a)=>v+((i>>a)&1?1:-1)*size[a]/2)));
   for(const face of faces)surfaces.push({view:box.view,color:box.color,points:face.map(i=>points[i])});
  }
 }
 return surfaces;
}

export function mountLogoViewcube(setView){
 const wrap=document.querySelector('#viewportWrap');if(!wrap||document.querySelector('#logoViewcube'))return;
 const host=document.createElement('div');host.id='logoViewcube';host.setAttribute('aria-label','BoxLab orbit navigator');
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','-80 -80 160 160');svg.setAttribute('role','img');svg.setAttribute('aria-label','Drag hollow cube logo to orbit; tap a coloured box for its orthographic view');
 host.append(svg);wrap.append(host);
 const surfaces=logoSurfaces(),inverse=new THREE.Quaternion();let signature='',drag=null;
 const nodes=surfaces.map(surface=>{const polygon=document.createElementNS(svg.namespaceURI,'polygon');polygon.dataset.view=surface.view;polygon.setAttribute('fill',surface.color);polygon.setAttribute('stroke','#10161e');polygon.setAttribute('stroke-width','.65');const title=document.createElementNS(svg.namespaceURI,'title');title.textContent=surface.view==='rear'?'BACK':surface.view.toUpperCase();polygon.append(title);svg.append(polygon);return polygon;});
 function draw(){
  const camera=globalThis.__boxlabBridgeState?.camera;
  if(camera){
   const next=camera.quaternion.toArray().join(',');
   if(next!==signature){signature=next;inverse.copy(camera.quaternion).invert();
    const rows=surfaces.map((surface,index)=>{const points=surface.points.map(p=>p.clone().applyQuaternion(inverse));return {index,points,depth:points.reduce((n,p)=>n+p.z,0)/4};}).sort((a,b)=>a.depth-b.depth);
    for(const row of rows){const node=nodes[row.index];node.setAttribute('points',row.points.map(p=>`${p.x*51},${-p.y*51}`).join(' '));svg.append(node);}
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
