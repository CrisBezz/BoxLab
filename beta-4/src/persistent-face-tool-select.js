import * as THREE from 'three';

// BoxLab v0.36.18.7 — selection handoff for persistently armed Face tools.
// This does not own Extrude/Inset geometry. It only ensures that when either
// tool is already armed, the face under the next Pencil/touch pointer becomes
// the live face selection before multi-face-direct handles that same gesture.

const canvas=document.querySelector('#viewport');
const extrudeButton=document.querySelector('#extrudeBtn');
const insetButton=document.querySelector('#insetBtn');
const multiToggle=document.querySelector('#multiSelectToggle');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

function armedTool(){
  if(extrudeButton?.classList.contains('boxlab-direct-stable'))return 'extrude';
  if(insetButton?.classList.contains('boxlab-direct-stable'))return 'inset';
  return null;
}
function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function selectedFaces(){
  const b=bridge();
  return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[];
}
function setPointer(event){
  const r=canvas.getBoundingClientRect();
  pointer.set((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));
}
function pickFace(event,m,camera){
  setPointer(event);raycaster.setFromCamera(pointer,camera);
  const pickers=[];
  for(let fi=0;fi<(m?.faces?.length||0);fi++){
    const f=m.faces[fi];if(!Array.isArray(f)||f.length<3)continue;
    const positions=[];
    for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){
      const v=m.vertices?.[vi];if(v)positions.push(v.x,v.y,v.z);
    }
    if(!positions.length)continue;
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
    const picker=new THREE.Mesh(g,mat);picker.userData.faceIndex=fi;pickers.push(picker);
  }
  const hit=raycaster.intersectObjects(pickers,false)[0];
  const fi=Number.isInteger(hit?.object?.userData?.faceIndex)?hit.object.userData.faceIndex:null;
  pickers.forEach(p=>{p.geometry.dispose();p.material.dispose();});
  return fi;
}

window.addEventListener('pointerdown',event=>{
  if(!armedTool()||event.target!==canvas||!event.isPrimary)return;
  const b=bridge(),s=state(),m=s?.mesh,camera=s?.camera;
  if(!b||b.mode?.()!=='face'||!m||!camera)return;
  const hit=pickFace(event,m,camera);if(!Number.isInteger(hit))return;
  const ids=selectedFaces();
  if(ids.includes(hit))return;
  const next=multiToggle?.checked?[...ids,hit]:[hit];
  b.set?.('face',next);
},true);

globalThis.__boxlabPersistentFaceToolSelect={version:'0.36.18.7'};
