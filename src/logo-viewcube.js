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

export function mountLogoViewcube(setView){
 const wrap=document.querySelector('#viewportWrap');if(!wrap||document.querySelector('#logoViewcube'))return;
 const host=document.createElement('div');host.id='logoViewcube';host.setAttribute('aria-label','BoxLab orthographic views');
 // Each selectable piece is a hollow box, matching the logo's open centre and bevels.
 const pieces=[['rear','BACK','#8e2429',58,4],['right','RIGHT','#174c83',102,29],['bottom','BOTTOM','#2d6818',80,79],['left','LEFT','#42a7ef',14,54],['front','FRONT','#ed5957',80,54],['top','TOP','#83dc3d',47,29]];
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 160 145');
 for(const [view,label,color,x,y] of pieces){
  const g=document.createElementNS(svg.namespaceURI,'g');g.setAttribute('transform',`translate(${x} ${y})`);g.setAttribute('role','button');g.setAttribute('tabindex','0');g.setAttribute('aria-label',`${label} orthographic view`);g.dataset.view=view;
  g.innerHTML=`<title>${label}</title><path fill="${color}" stroke="#121820" stroke-width="1.3" fill-rule="evenodd" d="M0 14 23 0 46 14 46 43 23 57 0 43ZM9 20 23 12 37 20 37 37 23 45 9 37Z"/><path fill="#fff" opacity=".2" d="M0 14 23 0 46 14 37 20 23 12 9 20Z"/><path fill="#000" opacity=".28" d="M23 28 46 14 46 43 23 57Z M9 20 23 28 23 45 9 37Z"/><text x="23" y="66" text-anchor="middle" fill="#eef2f7" font-size="7" font-family="system-ui" font-weight="700">${label}</text>`;
  const activate=event=>{event.preventDefault();event.stopPropagation();setView(view);};
  g.addEventListener('click',activate);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')activate(e);});svg.append(g);
 }
 host.append(svg);const home=document.createElement('button');home.textContent='3D';home.title='Return to perspective';home.addEventListener('click',e=>{e.stopPropagation();setView('axon');});host.append(home);
 for(const type of ['pointerdown','pointerup','dblclick','wheel'])host.addEventListener(type,e=>e.stopPropagation());
 wrap.append(host);
 const style=document.createElement('style');style.textContent='#logoViewcube{position:absolute;top:10px;right:max(10px,env(safe-area-inset-right));width:150px;z-index:4;touch-action:manipulation;user-select:none}#logoViewcube svg{width:100%;overflow:visible;filter:drop-shadow(0 3px 3px #0008)}#logoViewcube g{cursor:pointer;outline:none}#logoViewcube g:hover,#logoViewcube g:focus{filter:brightness(1.3)}#logoViewcube button{display:block;margin:0 auto;min-height:28px;padding:2px 12px;font-size:10px}';document.head.append(style);
}
