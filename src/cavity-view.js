import * as THREE from 'three';

// BoxLab v0.36.18.184 — Cavity viewport diagnostic.
// Visual only: screen-space normal variation emphasizes bevels, creases and
// surface changes without modifying mesh geometry, selection or History.
const VERSION='0.36.18.184';
let active=false;
let raf=0;

function bridge(){return globalThis.__boxlabBridgeState||null;}

const cavityMaterial=new THREE.ShaderMaterial({
  side:THREE.FrontSide,
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
      float variation=length(dFdx(n))+length(dFdy(n));
      float cavity=smoothstep(0.018,0.16,variation);
      float facing=0.35+0.65*abs(n.z);
      vec3 base=mix(vec3(0.30,0.35,0.41),vec3(0.78,0.82,0.85),facing);
      vec3 crease=vec3(0.10,0.13,0.17);
      vec3 colour=mix(base,crease,cavity*0.82);
      float rim=pow(1.0-abs(n.z),2.0);
      colour+=vec3(0.08,0.12,0.16)*rim;
      gl_FragColor=vec4(colour,1.0);
    }
  `
});

const cavityInactiveMaterial=cavityMaterial.clone();
cavityInactiveMaterial.transparent=true;
cavityInactiveMaterial.opacity=.72;

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
    object.material=object.userData.kind==='boxlab-inactive-body'?cavityInactiveMaterial:cavityMaterial;
    found=true;
  });
  return found;
}

function maintain(){
  if(!active){raf=0;return;}
  apply();
  raf=requestAnimationFrame(maintain);
}

function setActive(next){
  active=!!next;
  if(active){
    apply();
    if(!raf)raf=requestAnimationFrame(maintain);
  }else if(raf){
    cancelAnimationFrame(raf);
    raf=0;
  }
}

function ensureButton(){
  const host=document.querySelector('#viewportRenderLooks');
  if(!host)return false;
  if(!host.querySelector('[data-render="cavity"]')){
    const button=document.createElement('button');
    button.type='button';
    button.dataset.render='cavity';
    button.textContent='Cavity';
    const normals=host.querySelector('[data-render="normals"]');
    if(normals)normals.insertAdjacentElement('afterend',button);
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
  setActive(mode==='cavity');
  if(mode==='cavity')requestAnimationFrame(apply);
});
window.addEventListener('boxlab-bridge-state',()=>{if(active)queueMicrotask(apply);});

globalThis.__boxlabCavityView={version:VERSION,get active(){return active;},apply};
