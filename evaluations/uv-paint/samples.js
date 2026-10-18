import {makeCube,makeSphere,makePlane} from '../../src/primitive-factory.js';
import {createBoxUV,createSphereUV,createPlanarUV} from '../../src/imported-uv-edit.js?v=0.36.18.914';
// Use ORIGINAL BoxLab primitives/projection/triangulation. No alternate UV/mesh kernel.
export function comparisonSample(kind,owner){
 if(!owner?.topologySignature||!owner?.buildUVPreviewGeometry)throw Error('BoxLab UV geometry owner unavailable');
 const mesh=kind==='cube'?makeCube(2):kind==='sphere'?makeSphere(1,24,12):kind==='plane'?makePlane(2):null;if(!mesh)throw Error('Unknown sample mesh');
 const object={id:'paint-comparison-sample',name:'Paint Lab sample',kind:'editable',visible:true,mesh,settings:{}},history={capture:()=>({}),checkpointSnapshot:()=>true};
 const result=kind==='cube'?createBoxUV(object,mesh,owner.topologySignature,history):kind==='sphere'?createSphereUV(object,mesh,owner.topologySignature,history):createPlanarUV(object,mesh,owner.topologySignature,history,'xz');
 if(!result.ok)throw Error(result.reason);const geometry=owner.buildUVPreviewGeometry(mesh,object.glbPassthrough);if(!geometry)throw Error('Sample UV geometry refused');
 // BoxLab plane lies in XZ. Rotate the temporary display only to face the camera.
 if(kind==='plane')geometry.rotateX(Math.PI/2);
 return {object,geometry};
}

export function comparisonGeometry(kind,owner){return comparisonSample(kind,owner).geometry;}
