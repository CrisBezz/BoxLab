// Shared Pencil stroke sampling. Event capture/selection remain with each owner.
export function appendStrokePoint(points,point,spacing=4){
 const last=points.at(-1);
 if(last&&Math.hypot(point.x-last.x,point.y-last.y)<spacing)return false;
 points.push({x:point.x,y:point.y});return true;
}
export function simplifyStroke(points,tolerance=4){
 if(points.length<3)return points.map(p=>({...p}));
 const keep=new Set([0,points.length-1]),stack=[[0,points.length-1]];
 while(stack.length){const [a,b]=stack.pop(),p=points[a],q=points[b],dx=q.x-p.x,dy=q.y-p.y,d2=dx*dx+dy*dy;let far=-1,max=tolerance*tolerance;
  for(let i=a+1;i<b;i++){const t=d2?Math.max(0,Math.min(1,((points[i].x-p.x)*dx+(points[i].y-p.y)*dy)/d2)):0,d=(points[i].x-p.x-t*dx)**2+(points[i].y-p.y-t*dy)**2;if(d>max){max=d;far=i;}}
  if(far>=0){keep.add(far);stack.push([a,far],[far,b]);}
 }
 return [...keep].sort((a,b)=>a-b).map(i=>({...points[i]}));
}
