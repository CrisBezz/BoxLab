import * as THREE from 'three';

// BoxLab v0.36.18.198 — preserve user Studio key/fill controls during polish refresh.
// Visual only: improves background, lighting and contact grounding without
// changing geometry, selection, tools or History.
const VERSION='0.36.18.198';
let contact=null;
let queued=false;

function bridge(){return globalThis.__boxlabBridgeState||null;}
function studioActive(){return !!document.querySelector('#viewportRenderLooks button[data-render="studio"].active');}

function makeContactTexture(){
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;
  const ctx=canvas.getContext('2d');
  const gradient=ctx.createRadialGradient(128,128,8,128,128,124);
  gradient.addColorStop(0,'rgba(0,0,0,.46)');gradient.addColorStop(.28,'rgba(0,0,0,.28)');gradient.addColorStop(.62,'rgba(0,0,0,.10)');gradient.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=gradient;ctx.fillRect(0,0,256,256);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;return texture;
}
function ensureContact(rig){
  if(contact&&contact.parent===rig)return contact;
  contact=rig.getObjectByName('BoxLab Studio Contact Shadow');if(contact)return contact;
  const material=new THREE.MeshBasicMaterial({map:makeContactTexture(),transparent:true,opacity:.72,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  contact=new THREE.Mesh(new THREE.PlaneGeometry(1,1),material);contact.name='BoxLab Studio Contact Shadow';contact.rotation.x=-Math.PI/2;contact.renderOrder=2;contact.userData.boxlabStudioPolish=true;rig.add(contact);return contact;
}
function apply(){
  queued=false;if(!studioActive())return false;
  const state=bridge(),scene=state?.scene;if(!scene)return false;
  const rig=scene.getObjectByName('BoxLab Studio Realtime');if(!rig)return false;
  const backdropColour=globalThis.__boxlabBackdropPresets?.colour ?? 0x0f151f;scene.background?.set?.(backdropColour);
  const floor=rig.children.find(child=>child?.userData?.boxlabStudioFloor);if(floor?.material){floor.material.color?.set?.(0x202833);floor.material.roughness=.96;floor.material.metalness=0;floor.material.needsUpdate=true;}
  const lights=rig.children.filter(child=>child?.isDirectionalLight);
  const key=lights.find(light=>light.castShadow)||lights[0];
  const fill=lights.find(light=>light!==key&&light.position.x<0);
  const rim=lights.find(light=>light!==key&&light!==fill);
  const controller=globalThis.__boxlabStudioLightAngle;
  const keyScale=controller?.intensityScale??1;
  const fillScale=controller?.fillIntensityScale??1;
  if(key){key.intensity=2.35*keyScale;key.color.set(0xfff1df);}
  if(fill){fill.intensity=.82*fillScale;fill.color.set(0xa9caff);}
  if(rim){rim.intensity=.58;rim.color.set(0xe3ecff);}
  const bounds=new THREE.Box3();let found=false;
  scene.traverse(object=>{const kind=object?.userData?.kind;if(!object?.isMesh||!object.visible||(kind!=='body'&&kind!=='boxlab-inactive-body'))return;bounds.expandByObject(object);found=true;});
  if(!found||bounds.isEmpty())return true;
  const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  const shadow=ensureContact(rig);const span=Math.max(size.x,size.z,1);shadow.position.set(center.x,bounds.min.y-.012,center.z);shadow.scale.set(span*1.55,span*1.55,1);shadow.visible=true;return true;
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{if(!apply())setTimeout(()=>{queued=false;apply();},120);});}
document.addEventListener('boxlab-render-mode-change',event=>{if(event.detail?.mode==='studio')schedule();else if(contact)contact.visible=false;});
window.addEventListener('boxlab-bridge-state',schedule);document.addEventListener('pointerup',()=>{if(studioActive())schedule();},true);[0,120,500,1200].forEach(delay=>setTimeout(schedule,delay));
globalThis.__boxlabStudioPolish={version:VERSION,apply,schedule};
