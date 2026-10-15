// One navigation owner, used only by the UV canvas. Coordinates are CSS pixels.
export function createUVNavigation({size,changed=()=>{},undo=()=>{},redo=()=>{},now=()=>performance.now()}){
 const view={zoom:1,panX:0,panY:0},points=new Map();let base=null,group=null;
 const snapshot=()=>({view:{...view},points:new Map([...points].map(([id,p])=>[id,{...p}]))});
 const midpoint=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 function placeZoom(from,point,zoom){
  const s=size(),ratio=zoom/from.zoom;
  Object.assign(view,{zoom,panX:point.x-s.width/2-(point.x-s.width/2-from.panX)*ratio,panY:point.y-s.height/2-(point.y-s.height/2-from.panY)*ratio});
 }
 function cancel(){points.clear();base=null;group=null;}
 function zoomAt(point,factor){if(!Number.isFinite(factor)||factor<=0)return;cancel();placeZoom(view,point,Math.max(.1,Math.min(100,view.zoom*factor)));changed();}
 function down(id,x,y,type='touch'){
  if(!Number.isFinite(x)||!Number.isFinite(y))return;
  if(!points.size)group={started:now(),max:0,moved:false,touchOnly:true,starts:new Map()};
  points.set(id,{x,y});group.starts.set(id,{x,y});group.touchOnly&&=type==='touch';group.max=Math.max(group.max,points.size);base=snapshot();
 }
 function move(id,x,y){
  if(!points.has(id)||!Number.isFinite(x)||!Number.isFinite(y))return;
  points.set(id,{x,y});if(distance(group.starts.get(id),{x,y})>8)group.moved=true;
  const ids=[...points.keys()];if(ids.length>2)return;
  const a=base.points.get(ids[0]),b=points.get(ids[0]);
  if(ids.length===1)Object.assign(view,{...base.view,panX:base.view.panX+b.x-a.x,panY:base.view.panY+b.y-a.y});
  else{
   const c=base.points.get(ids[1]),d=points.get(ids[1]),start=midpoint(a,c),end=midpoint(b,d),length=distance(a,c);
   placeZoom(base.view,start,Math.max(.1,Math.min(100,base.view.zoom*(length>1?distance(b,d)/length:1))));view.panX+=end.x-start.x;view.panY+=end.y-start.y;
  }
  changed();
 }
 function up(id){
  if(!points.has(id))return;points.delete(id);
  if(points.size){base=snapshot();return;}
  const tap=group.touchOnly&&!group.moved&&now()-group.started<=320,count=group.max;cancel();
  if(tap&&count===2)undo();else if(tap&&count===3)redo();
 }
 return {view,down,move,up,cancel,zoomAt,fit(){cancel();Object.assign(view,{zoom:1,panX:0,panY:0});changed();}};
}
