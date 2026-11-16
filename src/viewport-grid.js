import {BufferGeometry,Color,Float32BufferAttribute,GridHelper,Vector3} from 'three';
const major=new Color(0xf1f4f8),minor=new Color(0x697481),fits=new WeakMap();
function geometry(width,depth,cx=0,cz=0){
 const vertices=[],colours=[];
 const x0=Math.ceil((cx-width/2)*10-1e-7),x1=Math.floor((cx+width/2)*10+1e-7);
 const z0=Math.ceil((cz-depth/2)*10-1e-7),z1=Math.floor((cz+depth/2)*10+1e-7);
 const line=(index,...points)=>{const c=index%10===0?major:minor;vertices.push(...points);for(let j=0;j<2;j++)colours.push(c.r,c.g,c.b);};
 for(let i=0;i<Math.max(x1-x0,z1-z0)+1;i++){
  if(z0+i<=z1){const z=(z0+i)/10-cz;line(z0+i,-width/2,0,z,width/2,0,z);}
  if(x0+i<=x1){const x=(x0+i)/10-cx;line(x0+i,x,0,-depth/2,x,0,depth/2);}
 }
 const result=new BufferGeometry();result.setAttribute('position',new Float32BufferAttribute(vertices,3));result.setAttribute('color',new Float32BufferAttribute(colours,3));result.computeBoundingBox();result.computeBoundingSphere();return result;
}
// A single GridHelper, hidden until the existing Plane/Grid/Off owner opts in.
export function createViewportGrid(){
 const grid=new GridHelper(12,120);grid.geometry.dispose();grid.geometry=geometry(12,12);grid.position.y=-1.55;grid.visible=false;return grid;
}
// Follow the original Studio floor's world-space footprint without scaling cells.
export function fitViewportGrid(grid,floor){
 if(!grid||!floor?.geometry)return false;
 let state=fits.get(grid);if(!state){state={center:new Vector3(),scale:new Vector3(),signature:''};fits.set(grid,state);}
 floor.updateWorldMatrix(true,false);floor.getWorldPosition(state.center);floor.getWorldScale(state.scale);
 const width=Math.abs((floor.geometry.parameters?.width||1)*state.scale.x),depth=Math.abs((floor.geometry.parameters?.height||1)*state.scale.y);
 if(!(width>0&&depth>0))return false;
 const {center}=state,signature=[width,depth,center.x,center.z].join(',');
 if(signature!==state.signature){const previous=grid.geometry;grid.geometry=geometry(width,depth,center.x,center.z);previous.dispose();state.signature=signature;}
 grid.position.copy(center);grid.parent?.worldToLocal(grid.position);grid.rotation.set(0,0,0);grid.scale.set(1,1,1);return true;
}
