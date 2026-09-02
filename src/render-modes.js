import * as THREE from 'three';
import './pathtrace-mode.js?v=0.35.8.12';

const status=document.querySelector('#selectionStatus');
let mode='solid';
let lastBody=null;

const clayMaterial=new THREE.MeshStandardMaterial({
  color:0xc8c1b5,
  roughness:.92,
  metalness:0,
  side:THREE.DoubleSide,
  polygonOffset:true,
  polygonOffsetFactor:1,
  polygonOffsetUnits:1
});

function makeMatcapTexture(){
  const canvas=document.createElement('canvas');
  canvas.width=128;canvas.height=128;
  const ctx=canvas.getContext('2d');
  const gradient=ctx.createRadialGradient(44,36,6,64,64,82);
  gradient.addColorStop(0,'#ffffff');
  gradient.addColorStop(.28,'#dfe5ec');
  gradient.addColorStop(.62,'#8e99a8');
  gradient.addColorStop(1,'#252a31');
  ctx.fillStyle=gradient;
  ctx.fillRect(0,0,128,128);
  const texture=new THREE.CanvasTexture(canvas);
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.needsUpdate=true;
  return texture;
}

const matcapMaterial=new THREE.MeshMatcapMaterial({
  color:0xffffff,
  matcap:makeMatcapTexture(),
  side:THREE.DoubleSide
});

const xrayMaterial=new THREE.MeshStandardMaterial({
  color:0xaebfd2,
  roughness:.72,
  metalness:0,
  transparent:true,
  opacity:.22,
  depthWrite:false,
  side:THREE.DoubleSide
});

const wireMaterial=new THREE.MeshBasicMaterial({
  color:0x20252d,
  wireframe:true,
  transparent:true,
  opacity:.72,
  depthTest:true,
  depthWrite:false,
  polygonOffset:true,
  polygonOffsetFactor:-1,
  polygonOffsetUnits:-1
});

const xrayWireMaterial=new THREE.MeshBasicMaterial({
  color:0xdce7f3,
  wireframe:true,
  transparent:true,
  opacity:.55,
  depthTest:false,
  depthWrite:false
});

function clearRenderChildren(body){
  [...body.children].forEach(child=>{
    if(child?.userData?.boxlabRenderOverlay){
      body.remove(child);
      child.material?.dispose?.();
    }
  });
}

function addWire(body,material){
  const overlay=new THREE.Mesh(body.geometry,material.clone());
  overlay.userData.boxlabRenderOverlay=true;
  overlay.renderOrder=12;
  body.add(overlay);
}

function applyMode(body){
  if(!body?.isMesh||body.userData?.kind!=='body')return;
  lastBody=body;
  clearRenderChildren(body);
  if(!body.userData.boxlabOriginalMaterial)body.userData.boxlabOriginalMaterial=body.material;
  const original=body.userData.boxlabOriginalMaterial;

  if(mode==='clay')body.material=clayMaterial;
  else if(mode==='matcap')body.material=matcapMaterial;
  else if(mode==='xray'){
    body.material=xrayMaterial;
    addWire(body,xrayWireMaterial);
  }else{
    body.material=original;
    if(mode==='wire')addWire(body,wireMaterial);
  }
}

function rebuild(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
}

function modeLabel(){
  if(mode==='wire')return'Wire + Solid';
  if(mode==='matcap')return'MatCap';
  if(mode==='pathtrace')return'Path Trace';
  return mode[0].toUpperCase()+mode.slice(1);
}

function setMode(next){
  mode=next;
  document.querySelectorAll('#renderModes button[data-render]').forEach(button=>button.classList.toggle('active',button.dataset.render===mode));
  if(lastBody?.parent)applyMode(lastBody);else rebuild();
  document.dispatchEvent(new CustomEvent('boxlab-render-mode-change',{detail:{mode}}));
  if(status)status.textContent=`View • ${modeLabel()}`;
}

const baseAdd=THREE.Group.prototype.add;
if(!THREE.Group.prototype.__boxlabRenderModesInstalled){
  THREE.Group.prototype.add=function(...objects){
    const result=baseAdd.apply(this,objects);
    for(const object of objects)if(object?.userData?.kind==='body')applyMode(object);
    return result;
  };
  THREE.Group.prototype.__boxlabRenderModesInstalled=true;
}

function installUI(){
  let host=document.querySelector('#commandBar');
  if(!host){
    host=document.querySelector('.top-actions')||document.querySelector('.topbar');
  }
  if(!host||document.querySelector('#renderModes'))return;
  const wrap=document.createElement('div');
  wrap.id='renderModes';
  wrap.className='render-modes';
  wrap.innerHTML='<button type="button" data-render="solid" class="active">Solid</button><button type="button" data-render="clay">Clay</button><button type="button" data-render="matcap">MatCap</button><button type="button" data-render="wire">Wire + Solid</button><button type="button" data-render="xray">X-Ray</button><button type="button" data-render="pathtrace">Path Trace</button>';
  host.append(wrap);
  wrap.addEventListener('click',event=>{
    const button=event.target.closest('button[data-render]');
    if(!button)return;
    event.preventDefault();
    event.stopPropagation();
    setMode(button.dataset.render);
  });
  const style=document.createElement('style');
  style.textContent=`
#renderModes{display:flex;gap:4px;align-items:center;flex:0 0 auto;margin-left:4px;padding-left:8px;border-left:1px solid rgba(255,255,255,.1)}
#renderModes button{white-space:nowrap;min-height:34px;padding:5px 8px;font-size:11px}
#renderModes button.active{background:#f2f5fa;color:#111318;border-color:#f2f5fa}
#renderModes button[data-render="pathtrace"]{font-weight:700}
@media(max-width:1100px){#renderModes button{padding:5px 7px}#renderModes{max-width:48vw;overflow-x:auto;scrollbar-width:none}#renderModes::-webkit-scrollbar{display:none}}
`;
  document.head.append(style);
}

installUI();
queueMicrotask(rebuild);
