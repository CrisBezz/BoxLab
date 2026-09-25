import * as THREE from 'three';

export const FACEGROUP_PRESETS=Object.freeze({
  default:{saturation:1,lightness:0,hueSpread:1},
  soft:{saturation:.68,lightness:.08,hueSpread:.82},
  vivid:{saturation:1.28,lightness:.01,hueSpread:1.08},
  contrast:{saturation:1.12,lightness:-.03,hueSpread:1.42}
});
export const DEFAULT_FACEGROUP_VIEW=Object.freeze({
  palette:'default',
  saturation:1,
  lightness:0,
  seed:0,
  ungrouped:'#7f8792'
});

function hashString(value){
  let h=2166136261;
  for(const ch of String(value||'')){
    h^=ch.charCodeAt(0);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
}
function clamp01(value){return Math.max(0,Math.min(1,Number(value)||0));}
export function normaliseFacegroupView(settings={}){
  const palette=FACEGROUP_PRESETS[settings.palette]?settings.palette:'default';
  const saturation=Math.max(.2,Math.min(1.8,Number(settings.saturation??1)));
  const lightness=Math.max(-.28,Math.min(.28,Number(settings.lightness??0)));
  const seed=Number.isFinite(Number(settings.seed))?Math.trunc(Number(settings.seed)):0;
  const ungrouped=/^#[0-9a-f]{6}$/i.test(String(settings.ungrouped||''))?String(settings.ungrouped):DEFAULT_FACEGROUP_VIEW.ungrouped;
  return{palette,saturation,lightness,seed,ungrouped};
}
export function faceGroupColour(group,settings={}){
  const view=normaliseFacegroupView(settings);
  if(!group)return new THREE.Color(view.ungrouped);
  const preset=FACEGROUP_PRESETS[view.palette];
  const h=hashString(`${view.seed}:${group}`);
  const rawHue=(h%360)/360;
  const hue=((rawHue-.5)*preset.hueSpread+.5)%1;
  const wrappedHue=hue<0?hue+1:hue;
  const baseSat=.56+((h>>>8)%18)/100;
  const baseLight=.48+((h>>>16)%12)/100;
  const sat=clamp01(baseSat*preset.saturation*view.saturation);
  const light=clamp01(baseLight+preset.lightness+view.lightness);
  const colour=new THREE.Color();
  colour.setHSL(wrappedHue,sat,light,THREE.SRGBColorSpace);
  return colour;
}
export function applyFaceGroupColours(geometry,mesh,settings={}){
  if(!geometry?.getAttribute||!mesh?.faces)return{ok:false,groups:0,faces:0};
  const position=geometry.getAttribute('position');
  if(!position)return{ok:false,groups:0,faces:0};
  const colours=[];
  const unique=new Set();
  let expectedVertices=0;
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face)||face.length<3)continue;
    const group=typeof mesh.faceGroups?.[fi]==='string'&&mesh.faceGroups[fi].trim()?mesh.faceGroups[fi].trim():null;
    if(group)unique.add(group);
    const colour=faceGroupColour(group,settings);
    for(let tri=1;tri<face.length-1;tri++){
      for(let corner=0;corner<3;corner++)colours.push(colour.r,colour.g,colour.b);
      expectedVertices+=3;
    }
  }
  if(expectedVertices!==position.count)return{ok:false,groups:unique.size,faces:mesh.faces.length,reason:'geometry-face-mismatch'};
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colours,3));
  geometry.attributes.color.needsUpdate=true;
  return{ok:true,groups:unique.size,faces:mesh.faces.length,settings:normaliseFacegroupView(settings)};
}
