import {BezierLine} from './klecks-curve.js?v=896';
// Both candidates receive identical CSS-pixel inputs. Every output is surface-picked;
// the curve never sees UV coordinates. A hard cap bounds malformed/very long strokes.
export function createStroke(kind,emit,{spacing=2,maxDabs=12000}={}){
 if(!['boxlab','klecks'].includes(kind)||!Number.isFinite(spacing)||spacing<.5||!Number.isInteger(maxDabs)||maxDabs<1||maxDabs>12000)throw Error('Invalid stroke configuration');
 let active=false,last=null,previous=null,curve=null,carry=0,count=0,limited=false;
 function valid(p){return p&&[p.x,p.y,p.pressure].every(Number.isFinite)&&Math.abs(p.x)<1e5&&Math.abs(p.y)<1e5;}
 function dab(p){if(count>=maxDabs){limited=true;return;}count++;emit({...p,pressure:Math.min(1,Math.max(0,p.pressure))});}
 function curveDab(p){dab({x:p.x,y:p.y,pressure:previous.pressure*(1-p.t)+last.pressure*p.t});}
 return {
  start(p){if(active||!valid(p))return false;active=true;last=previous={...p};carry=0;count=0;limited=false;curve=kind==='klecks'?new BezierLine():null;curve?.add(p.x,p.y,spacing,()=>{});dab(p);return true;},
  move(p){if(!active||!valid(p)||limited)return false;
   if(curve){curve.add(p.x,p.y,spacing,curveDab);previous=last;last={...p};}
   else {const distance=Math.hypot(p.x-last.x,p.y-last.y);if(distance>0){let d=spacing-carry;for(;d<=distance;d+=spacing){const t=d/distance;dab({x:last.x+(p.x-last.x)*t,y:last.y+(p.y-last.y)*t,pressure:last.pressure+(p.pressure-last.pressure)*t});if(limited)break;}carry=(carry+distance)%spacing;}last={...p};}return true;
  },
  end(){if(!active)return;curve?.addFinal(spacing,curveDab);active=false;curve=null;last=previous=null;},
  cancel(){active=false;curve=null;last=previous=null;},
  get stats(){return {dabs:count,limited};}
 };
}
