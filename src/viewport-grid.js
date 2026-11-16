import {Color,GridHelper} from 'three';

// One original GridHelper: 1-unit major lines with ten 0.1-unit subdivisions.
export function createViewportGrid(){
 const grid=new GridHelper(12,120),colours=grid.geometry.getAttribute('color');
 const major=new Color(0xf1f4f8),minor=new Color(0x697481);
 for(let line=0;line<=120;line++){
  const colour=line%10===0?major:minor;
  for(let vertex=0;vertex<4;vertex++)colours.setXYZ(line*4+vertex,colour.r,colour.g,colour.b);
 }
 colours.needsUpdate=true;
 grid.position.y=-1.55;
 // Ground presentation opts in only after Plane/Grid/Off is known. Never expose
 // Three's default visible=true during the first render before that owner loads.
 grid.visible=false;
 return grid;
}
