import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {makeCurveBalloon} from './curve-balloon-core.js?v=0.36.18.818';
import {fitAddObjectToUnitCube} from './add-object-fit.js?v=0.36.18.796';
import {deriveInstancePlacement} from './instance-core.js?v=0.36.18.343';
export function curvePoints(profile){
 const points=profile?.points;
 if(!Array.isArray(points)||points.length<2||points.length>128||points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))throw Error('Draw a curve with 2–128 points');
 const v=points.map(p=>new THREE.Vector3(p.x,p.y,0)),closed=!!profile.closed;
 if(closed&&points.length<3)throw Error('A closed curve needs at least 3 points');
 if(v.some((p,i)=>i&&p.distanceToSquared(v[i-1])<1e-12)||closed&&v[0].distanceToSquared(v.at(-1))<1e-12)throw Error('Separate neighbouring points');
 if(!profile.smooth)return v;
 const count=Math.max(8,Math.min(128,Math.round(Number(profile.detail)||32)));
 const sampled=new THREE.CatmullRomCurve3(v,closed,'centripetal').getPoints(count);
 if(closed)sampled.pop();return sampled;
}
export function makeCurveProfile(profile){
 const vertices=curvePoints(profile),mesh=profile.output==='balloon'?makeCurveBalloon(vertices,profile):new EditableMesh(vertices,[]);
 mesh.looseEdges=new Set();mesh.looseVertices=new Set();
 if(profile.output!=='balloon'){for(let i=1;i<vertices.length;i++)mesh.looseEdges.add(mesh.edgeKey(i-1,i));
 if(profile.closed)mesh.looseEdges.add(mesh.edgeKey(vertices.length-1,0));}
 fitAddObjectToUnitCube(mesh);
 if(profile.placement){if(!Array.isArray(profile.placement)||profile.placement.length!==16||!profile.placement.every(Number.isFinite))throw Error('Invalid curve placement');const matrix=new THREE.Matrix4().fromArray(profile.placement);mesh.vertices.forEach(v=>v.applyMatrix4(matrix));}
 return mesh;
}
export function editableCurveProfile(object){
 if(!object?.curveProfile||object.curveProfile.version!==1||object.locked||object.kind==='reference'||object.sourceId||object.settings?.subd||Object.values(object.settings?.mirror||{}).some(Boolean))return null;
 if(object.curveProfile.output==='balloon'&&(object.mesh?.creases?.size||object.mesh?.faceGroups?.some(Boolean)||object.mesh?.looseVertices?.size))return null;
 try{const profile=structuredClone(object.curveProfile),base=makeCurveProfile(profile);if([...base.looseEdges].sort().join()!==[...(object.mesh.looseEdges||[])].sort().join())return null;const delta=deriveInstancePlacement(base,object.mesh);if(!delta)return null;
  profile.placement=delta.multiply(new THREE.Matrix4().fromArray(profile.placement||new THREE.Matrix4().elements)).elements.slice();return profile;
 }catch{return null;}
}
