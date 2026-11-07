import * as THREE from 'three';

// BoxLab v0.36.18.186 — Silhouette / form-reading viewport.
// Visual only: strengthens grazing-angle contours so the overall shape reads
// clearly without modifying mesh geometry, selection, tools or History.
const VERSION='0.36.18.186';
let active=false;

function bridge(){return globalThis.__boxlabBridgeState||null;}

const silhouetteMaterial=new THREE.ShaderMaterial({
  side:THREE.FrontSide,
  polygonOffset:true,
  polygonOffsetFactor:1,
  polygonOffsetUnits:1,
  vertexShader:`
    varying vec3 vNormalView;
    void main(){
      vNormalView=normalize(normalMatrix*normal);
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }
  `,
  fragmentShader:`
    varying vec3 vNormalView;
    void main(){
      vec3 n=normalize(vNormalView);
      float facing=abs(n.z);
      float rim=pow(1.0-facing,2.2);
      float contour=smoothstep(0.28,0.88,rim);
      vec3 face=mix(vec3(0.58,0.64,0.70),vec3(0.78,0.82,0.86),0.45+0.55*facing);
      vec3 edge=vec3(0.035,0.045,0.060);
      vec3 colour=mix(face,edge,contour*0.96);
      gl_FragColor=vec4(colour,1.0);
    }
  `
});

const silhouetteInactiveMaterial=silhouetteMaterial.clone();
silhouetteInactiveMaterial.transparent=true;
silhouetteInactiveMaterial.opacity=.68;

function isBody(object){
  const kind=object?.userData?.kind;
  return object?.isMesh&&(kind==='body'||kind==='boxlab-inactive-body');
}

function apply(){
  if(!active)return false;
  const scene=bridge()?.scene;
  if(!scene)return false;
  let found=false;
  scene.traverse(object=>{
    if(!isBody(object))return;
    object.material=object.userData.kind==='boxlab-inactive-body'?silhouetteInactiveMaterial:silhouetteMaterial;
    found=true;
  });
  return found;
}

function setActive(next){
  active=!!next;
  if(active)apply();
}

function ensureButton(){
  const host=document.querySelector('#viewportRenderLooks');
  if(!host)return false;
  if(!host.querySelector('[data-render="silhouette"]')){
    const button=document.createElement('button');
    button.type='button';
    button.dataset.render='silhouette';
    button.textContent='Silhouette';
    const cavity=host.querySelector('[data-render="cavity"]');
    if(cavity)cavity.insertAdjacentElement('afterend',button);
    else host.appendChild(button);
  }
  return true;
}

if(!ensureButton()){
  let attempts=0;
  const timer=setInterval(()=>{
    attempts++;
    if(ensureButton()||attempts>=50)clearInterval(timer);
  },100);
}

document.addEventListener('boxlab-render-mode-change',event=>{
  const mode=event.detail?.mode;
  setActive(mode==='silhouette');
  if(mode==='silhouette')requestAnimationFrame(apply);
});
window.addEventListener('boxlab-bridge-state',()=>{if(active)queueMicrotask(apply);});

globalThis.__boxlabSilhouetteView={version:VERSION,get active(){return active;},apply};
