import * as THREE from 'three';
import {insertFaceSegment} from './topology-kernel.js?v=0.36.18.208';

const canvas=document.querySelector('#viewport');
const button=document.querySelector('#faceSplitBtn');
const status=document.querySelector('#selectionStatus');
const ray=new THREE.Raycaster();
const pointer=new THREE.Vector2();
ray.params.Line.threshold=.09;
let armed=false,first=null;

function disarm(){armed=false;first=null;button?.classList.remove('active');}
function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function edgeKey(mesh,edge){return mesh.edgeKey(edge.a,edge.b);}
function hitEdge(event){const s=state(),rect=canvas?.getBoundingClientRect();if(!s?.camera||!rect)return null;pointer.set((event.clientX-rect.left)/rect.width*2-1,-((event.clientY-rect.top)/rect.height*2-1));ray.setFromCamera(pointer,s.camera);const hit=ray.intersectObjects([...(s.edgeObjects?.values()||[])],false)[0];return Number.isInteger(hit?.object?.userData?.index)?hit.object.userData.index:null;}
function faceHasNonAdjacentEdges(face,a,b){const n=face?.length||0;const locate=edge=>{for(let i=0;i<n;i++)if((face[i]===edge.a&&face[(i+1)%n]===edge.b)||(face[i]===edge.b&&face[(i+1)%n]===edge.a))return i;return-1;};const ia=locate(a),ib=locate(b);return ia>=0&&ib>=0&&ia!==ib&&(ia-ib+n)%n!==1&&(ib-ia+n)%n!==1;}
function indexForKey(mesh,key){return mesh.edges().findIndex(edge=>edgeKey(mesh,edge)===key);}

button?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();armed=!armed;first=null;document.querySelector('#selectionModes button[data-mode="edge"]')?.click();button.classList.toggle('active',armed);if(status)status.textContent=armed?'Face Split • tap the first boundary edge of an ngon':'Edge mode • Face Split off';},true);
document.addEventListener('click',event=>{if(!armed||!event.isTrusted||event.target?.closest?.('#faceSplitBtn'))return;if(event.target?.closest?.('button'))disarm();},true);

canvas?.addEventListener('pointerdown',event=>{
  if(!armed||!event.isPrimary)return;
  const s=state(),mesh=s?.mesh,index=hitEdge(event);if(!mesh||!Number.isInteger(index))return;
  const edge=mesh.edges()[index];if(!edge)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(!first){first={key:edgeKey(mesh,edge)};bridge()?.set?.('edge',[index]);if(status)status.textContent='Face Split • tap a non-adjacent boundary edge on the same ngon';return;}
  const firstEdge=mesh.edges().find(candidate=>edgeKey(mesh,candidate)===first.key);
  if(!firstEdge||first.key===edgeKey(mesh,edge))return;
  const shared=(firstEdge.faces||[]).filter(fi=>(edge.faces||[]).includes(fi)&&Array.isArray(mesh.faces[fi])&&mesh.faces[fi].length>=4&&faceHasNonAdjacentEdges(mesh.faces[fi],firstEdge,edge));
  if(shared.length!==1){first=null;bridge()?.set?.('edge',[index]);if(status)status.textContent=shared.length?'Face Split is ambiguous across multiple faces • choose different edges':'Face Split needs two non-adjacent edges on the same ngon • choose the first edge again';return;}

  const before=mesh.clone(),beforeGate=globalThis.__boxlabTopologyGate?.validate?.(mesh)||null,targetFace=shared[0],secondKey=edgeKey(mesh,edge);
  const result=insertFaceSegment(mesh,targetFace,{edgeKey:first.key,t:.5},{edgeKey:secondKey,t:.5},{validator:globalThis.__boxlabTopologyGate?.validate?.bind(globalThis.__boxlabTopologyGate)});
  if(!result.ok){first=null;render();globalThis.__boxlabTopologyGate?.sync?.();if(status)status.textContent=`Face Split rolled back • ${result.reason}`;return;}

  globalThis.__boxlabHistory?.push(before);
  const newIndex=indexForKey(mesh,result.edgeKey);first=null;bridge()?.set?.('edge',newIndex>=0?[newIndex]:[]);render();globalThis.__boxlabTopologyGate?.sync?.();
  if(status)status.textContent=`Face Split committed • canonical intersection-segment transaction${beforeGate&&!beforeGate.valid?' • source mesh had pre-existing issues':''}`;
},true);

globalThis.__boxlabFaceSplit={version:'0.36.18.208',kernel:'0.36.18.208',transaction:'insertFaceSegment'};
