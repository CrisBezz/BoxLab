import * as THREE from 'three';

let queued=false;

function state(){return globalThis.__boxlabBridgeState||null;}

function findStudioRig(scene){
  return scene?.getObjectByName?.('BoxLab Studio Realtime')||null;
}

function studioParts(rig){
  if(!rig)return{};
  let floor=null,key=null;
  rig.traverse(object=>{
    if(!floor&&object?.isMesh&&object.receiveShadow&&!object.castShadow)floor=object;
    if(!key&&object?.isDirectionalLight&&object.castShadow)key=object;
  });
  return{floor,key};
}

function updateStudioScene(){
  queued=false;
  const s=state(),scene=s?.scene,renderer=s?.renderer;
  if(!scene||!renderer)return;
  const rig=findStudioRig(scene);
  if(!rig||!rig.visible)return;
  const{floor,key}=studioParts(rig);
  if(!floor||!key)return;

  const bounds=new THREE.Box3();
  let found=false;
  scene.traverse(object=>{
    const kind=object?.userData?.kind;
    if(!object?.isMesh||!object.visible||(kind!=='body'&&kind!=='boxlab-inactive-body'))return;
    bounds.expandByObject(object);
    object.castShadow=true;
    object.receiveShadow=true;
    found=true;
  });
  if(!found||bounds.isEmpty())return;

  const center=bounds.getCenter(new THREE.Vector3());
  const size=bounds.getSize(new THREE.Vector3());
  const span=Math.max(size.x,size.z,1);
  const height=Math.max(size.y,1);
  const radius=Math.max(span,height)*.5;
  const floorSize=Math.max(span*2.8,24);

  // The legacy Studio floor is 48 x 48. Newer Studio uses a 1 x 1 floor.
  const floorWidth=floor.geometry?.parameters?.width||48;
  const scale=floorSize/floorWidth;
  floor.position.set(center.x,bounds.min.y-.025,center.z);
  floor.scale.set(scale,scale,1);
  floor.receiveShadow=true;

  let target=key.target;
  if(!target||!target.parent){
    target=new THREE.Object3D();
    scene.add(target);
    key.target=target;
  }
  target.position.copy(center);

  const lightDistance=Math.max(radius*3.5,12);
  key.position.set(
    center.x+lightDistance*.55,
    center.y+lightDistance*.8,
    center.z+lightDistance*.45
  );
  key.shadow.normalBias=.075;
  key.shadow.bias=-.00015;
  key.shadow.mapSize.set(1024,1024);

  const half=Math.max(radius*1.45,6);
  const camera=key.shadow.camera;
  camera.left=-half;
  camera.right=half;
  camera.top=half;
  camera.bottom=-half;
  camera.near=.1;
  camera.far=Math.max(lightDistance*3,40);
  camera.updateProjectionMatrix();
  key.shadow.needsUpdate=true;

  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=true;
}

function scheduleStudioUpdate(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(updateStudioScene);
}

// Object mesh rebuilds are driven through cageToggle throughout BoxLab.
document.querySelector('#cageToggle')?.addEventListener('change',scheduleStudioUpdate);
document.addEventListener('boxlab-render-mode-change',scheduleStudioUpdate);
window.addEventListener('boxlab-object-manager-ready',scheduleStudioUpdate);
window.addEventListener('pointerup',scheduleStudioUpdate,true);

const outliner=document.querySelector('#outlinerList');
if(outliner)new MutationObserver(scheduleStudioUpdate).observe(outliner,{childList:true});

queueMicrotask(scheduleStudioUpdate);
