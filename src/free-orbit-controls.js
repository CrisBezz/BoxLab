import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Quaternion,Vector2,Vector3} from 'three';

// Keep Three's pointer, pan, zoom, target and change-event owners. Replace only
// its upright spherical rotation with camera-relative quaternion tumbling.
export class FreeOrbitControls extends OrbitControls {
 constructor(camera,element){
  super(camera,element);
  this._spin={x:0,y:0};
  this.addEventListener('start',()=>this.stopSpin());
 }
 stopSpin(){if(this._spin)this._spin.x=this._spin.y=0;this._panOffset?.set(0,0,0);this._sphericalDelta?.set(0,0,0);this._scale=1;}
 _rotateLeft(angle){if(this._spin)this._spin.x+=angle;}
 _rotateUp(angle){if(this._spin)this._spin.y+=angle;}
 _touchPair(){return this._pointers.slice(0,2).map(id=>this._pointerPositions[id]?.clone());}
 _handleTouchStartDollyPan(event){
  super._handleTouchStartDollyPan(event);
  this._touchPairPrevious=this._touchPair();
 }
 _handleTouchMoveDollyPan(event){
  const previous=this._touchPairPrevious,next=this._touchPair();
  if(!previous?.[0]||!previous[1]||!next[0]||!next[1]){this._handleTouchStartDollyPan(event);return;}
  const a=previous[1].clone().sub(previous[0]),b=next[1].clone().sub(next[0]);
  // Avoid an undefined twist or unbounded dolly when contacts almost coincide.
  if(a.length()<12||b.length()<12){this._handleTouchStartDollyPan(event);return;}
  const camera=this.object,distance=this.getDistance();
  if(!Number.isFinite(distance)||distance<1e-6)return;
  camera.updateMatrixWorld();
  const angle=this.enableRotate?Math.atan2(a.x*b.y-a.y*b.x,a.dot(b)):0;
  if(this.enableZoom)this._handleTouchMoveDolly(event);
  const newDistance=this._clampDistance(distance*this._scale),scale=distance/newDistance;
  // A similarity transform maps BOTH contacts. Using the less-moving contact
  // as anchor also keeps a planted finger fixed when dolly reaches its limits.
  const anchor=next[0].distanceToSquared(previous[0])<=next[1].distanceToSquared(previous[1])?0:1;
  const rect=this.domElement.getBoundingClientRect(),view=this.domElement.ownerDocument?.defaultView;
  const center=new Vector2(rect.left+(view?.scrollX||0)+rect.width/2,rect.top+(view?.scrollY||0)+rect.height/2);
  const oldAnchor=previous[anchor].clone().sub(center),newAnchor=next[anchor].clone().sub(center);
  if(this.enablePan&&this.panSpeed>0&&Number.isFinite(scale)&&scale>0){
   const cos=Math.cos(angle),sin=Math.sin(angle);
   const dx=(cos*newAnchor.x+sin*newAnchor.y)/scale-oldAnchor.x;
   const dy=(-sin*newAnchor.x+cos*newAnchor.y)/scale-oldAnchor.y;
   const middle=next[0].clone().add(next[1]).multiplyScalar(.5);
   this._panStart.set(middle.x-dx/this.panSpeed,middle.y-dy/this.panSpeed);
   this._handleTouchMovePan(event); // original Three pan projection/offset owner
  }
  if(angle)camera.up.applyQuaternion(new Quaternion().setFromAxisAngle(camera.getWorldDirection(new Vector3()),-angle)).normalize();
  this._touchPairPrevious=next;
 }
 update(deltaTime=null){
  if(this._spin){
   if(!this.enabled||this.object.position.distanceToSquared(this._lastPosition)>1e-6||8*(1-this._lastQuaternion.dot(this.object.quaternion))>1e-6)this.stopSpin();
   const s=this._spin,f=this.enableDamping?this.dampingFactor:1;
   if(Math.abs(s.x)+Math.abs(s.y)>1e-7){
    const camera=this.object,offset=camera.position.clone().sub(this.target);
    const up=new Vector3(0,1,0).applyQuaternion(camera.quaternion);
    const right=new Vector3(1,0,0).applyQuaternion(camera.quaternion);
    const yaw=new Quaternion().setFromAxisAngle(up,-s.x*f);
    right.applyQuaternion(yaw);
    const pitch=new Quaternion().setFromAxisAngle(right,-s.y*f).multiply(yaw);
    offset.applyQuaternion(pitch);camera.up.copy(up.applyQuaternion(pitch)).normalize();
    camera.position.copy(this.target).add(offset);
    this._quat.setFromUnitVectors(camera.up,new Vector3(0,1,0));
    this._quatInverse.copy(this._quat).invert();
    s.x*=1-f;s.y*=1-f;
   }else s.x=s.y=0;
  }
  // View-axis commands may change camera.up outside a drag.
  this._quat.setFromUnitVectors(this.object.up,new Vector3(0,1,0));
  this._quatInverse.copy(this._quat).invert();
  return super.update(deltaTime);
 }
}
