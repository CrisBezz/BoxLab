import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Quaternion,Vector3} from 'three';

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
