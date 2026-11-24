const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

function segmentDistance(p,a,b) {
  const dx=b.x-a.x,dy=b.y-a.y,lengthSquared=dx*dx+dy*dy;
  const t=lengthSquared?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/lengthSquared)):0;
  return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);
}

function simplify(path, start, end, keep, tolerance) {
  let furthest = -1, error = tolerance;
  for (let i = start + 1; i < end; i++) {
    const offset = segmentDistance(path[i],path[start],path[end]);
    if (offset > error) { error = offset; furthest = i; }
  }
  if (furthest < 0) return;
  simplify(path, start, furthest, keep, tolerance);
  keep.push(path[furthest]);
  simplify(path, furthest, end, keep, tolerance);
}

// Simplify a closed screen-space stroke without treating its start as a corner.
export function quadStrokeCorners(points) {
  if (points.length < 5) return null;
  let diameter = 0, first = 0, second = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const length = distance(points[i], points[j]);
      if (length > diameter) { diameter = length; first = i; second = j; }
    }
  }
  if (diameter < 14 || distance(points[0], points.at(-1)) > Math.min(32, diameter * .34)) return null;

  const paths = [points.slice(first, second + 1), points.slice(second).concat(points.slice(0, first + 1))];
  for (const ratio of [.035,.045,.06,.08,.10,.12]) {
    const corners = [];
    const tolerance = Math.max(2, diameter * ratio);
    for (const path of paths) {
      corners.push(path[0]);
      simplify(path, 0, path.length - 1, corners, tolerance);
    }
    if (corners.length === 4 && corners.every((p, i) => distance(p, corners[(i + 1) % 4]) >= 5)) return corners;
    if (corners.length < 4) break;
  }
  return null;
}

// Return a loose open outline with either one or two drawn corners.
export function openQuadStrokeCorners(points, sideCount) {
  const span = Math.max(...points.map(point=>distance(points[0],point)));
  if (span < 12) return null;
  const sampleCount=Math.min(points.length,48);
  const path=Array.from({length:sampleCount},(_,i)=>points[Math.round(i*(points.length-1)/(sampleCount-1))]);
  const last=path.length-1, errors=path.map(()=>[]);
  for(let a=0;a<last;a++){
    for(let b=a+1;b<=last;b++){
      let error=distance(path[a],path[b])<Math.min(10,Math.max(5,span*.08))?Infinity:0;
      for(let i=a+1;i<b;i++)error+=segmentDistance(path[i],path[a],path[b])**2;
      errors[a][b]=error;
    }
  }
  let best=null,bestError=path.length*(span*.16)**2;
  function consider(indices){
    let error=0;
    for(let i=0;i<indices.length-1;i++)error+=errors[indices[i]][indices[i+1]];
    for(let i=1;i<indices.length-1;i++){
      const a=path[indices[i-1]],p=path[indices[i]],b=path[indices[i+1]];
      if(segmentDistance(p,a,b)<Math.min(9,Math.max(3,span*.075)))return;
    }
    if(error<bestError){bestError=error;best=indices.slice(1,-1).map(index=>path[index]);}
  }
  for(let a=1;a<last;a++){
    if(sideCount===2)consider([0,a,last]);
    else for(let b=a+1;b<last;b++)consider([0,a,b,last]);
  }
  return best;
}

export function straightQuadStroke(points) {
  const a=points[0],b=points.at(-1),length=distance(a,b);
  return length>=10&&points.every(p=>segmentDistance(p,a,b)<=Math.max(4,length*.18));
}

export function quadStrokeCrossing(points) {
  const crossings=[];
  const cross=(a,b)=>a.x*b.y-a.y*b.x;
  const vector=(a,b)=>({x:b.x-a.x,y:b.y-a.y});
  for(let i=0;i<points.length-3;i++){
    const a=points[i],u=vector(a,points[i+1]);
    for(let j=i+2;j<points.length-1;j++){
      const b=points[j],v=vector(b,points[j+1]),w=vector(a,b);
      const denominator=cross(u,v);
      if(Math.abs(denominator)<Math.hypot(u.x,u.y)*Math.hypot(v.x,v.y)*.4)continue;
      const t=cross(w,v)/denominator,s=cross(w,u)/denominator;
      if(t<0||t>1||s<0||s>1)continue;
      const p={x:a.x+t*u.x,y:a.y+t*u.y};
      const arms=[points.slice(0,i+1),points.slice(i+1,j+1),points.slice(j+1)];
      if(arms.every(arm=>arm.some(point=>distance(point,p)>=7))&&
         !crossings.some(point=>distance(point,p)<5))crossings.push(p);
    }
  }
  return crossings.length===1?crossings[0]:null;
}

export function sampleStrokeSpan(stroke,first,last,fractions) {
  const points=stroke.slice(stroke.indexOf(first),stroke.indexOf(last)+1),lengths=[0];
  for(let i=1;i<points.length;i++)lengths.push(lengths[i-1]+distance(points[i-1],points[i]));
  const total=lengths.at(-1);
  let i=1;
  return fractions.map(fraction=>{
    const length=total*fraction;
    while(i<lengths.length-1&&lengths[i]<length)i++;
    const a=points[i-1],b=points[i],t=(length-lengths[i-1])/(lengths[i]-lengths[i-1]);
    return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
  });
}
