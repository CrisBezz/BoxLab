import {Box3,Vector3} from 'three';
// Presentation-only bounds: the Paint session owns a stable editable mesh.
// Cache its world bounds once, then project only eight corners as the view moves.
export function createPaintPaletteAnchor(vertices){
 if(!vertices?.length)return null;
 const box=new Box3().setFromPoints(vertices),points=[];
 for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z])points.push(new Vector3(x,y,z));
 return (camera,canvas,view)=>{
  if(!camera)return null;camera.updateMatrixWorld?.(true);
  const projected=points.map(p=>p.clone().project(camera));
  if(projected.some(p=>![p.x,p.y,p.z].every(Number.isFinite))||projected.every(p=>p.z>1||p.z< -1))return null;
  const xs=projected.map(p=>canvas.left-view.left+(p.x*.5+.5)*canvas.width),ys=projected.map(p=>canvas.top-view.top+(-p.y*.5+.5)*canvas.height);
  return {left:Math.min(...xs),right:Math.max(...xs),top:Math.min(...ys),bottom:Math.max(...ys)};
 };
}
const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
export function placePaintPalette(object,{width,height,viewWidth,viewHeight,obstacles=[],side='left',gap=24}){
 const cx=(object.left+object.right)/2,cy=(object.top+object.bottom)/2;
 const candidates={left:[object.left-gap-width,cy-height/2],right:[object.right+gap,cy-height/2],above:[cx-width/2,object.top-gap-height],below:[cx-width/2,object.bottom+gap]};
 const order=[side,...Object.keys(candidates).filter(s=>s!==side)];let best;
 for(const [rank,key] of order.entries()){
  const [x,y]=candidates[key],left=Math.max(8,Math.min(Math.max(8,viewWidth-width-8),x)),top=Math.max(8,Math.min(Math.max(8,viewHeight-height-8),y));
  const rect={left,top,right:left+width,bottom:top+height};
  const score=(overlap(rect,object)+obstacles.reduce((n,o)=>n+overlap(rect,o),0))*10000+Math.abs(left-x)+Math.abs(top-y)+rank;
  if(!best||score<best.score)best={left,top,side:key,score};
 }
 return {left:best.left,top:best.top,side:best.side};
}
