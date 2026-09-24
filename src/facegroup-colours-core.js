import * as THREE from 'three';

const UNGROUPED=0x7f8792;

function hashString(value){
  let h=2166136261;
  for(const ch of String(value||'')){
    h^=ch.charCodeAt(0);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
}
export function faceGroupColour(group){
  if(!group)return new THREE.Color(UNGROUPED);
  const h=hashString(group);
  const hue=(h%360)/360;
  const sat=.56+((h>>>8)%18)/100;
  const light=.48+((h>>>16)%12)/100;
  const colour=new THREE.Color();
  colour.setHSL(hue,Math.min(.74,sat),Math.min(.6,light),THREE.SRGBColorSpace);
  return colour;
}
export function applyFaceGroupColours(geometry,mesh){
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
    const colour=faceGroupColour(group);
    for(let tri=1;tri<face.length-1;tri++){
      for(let corner=0;corner<3;corner++)colours.push(colour.r,colour.g,colour.b);
      expectedVertices+=3;
    }
  }
  if(expectedVertices!==position.count)return{ok:false,groups:unique.size,faces:mesh.faces.length,reason:'geometry-face-mismatch'};
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colours,3));
  geometry.attributes.color.needsUpdate=true;
  return{ok:true,groups:unique.size,faces:mesh.faces.length};
}
