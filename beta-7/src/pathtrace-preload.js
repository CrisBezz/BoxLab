import * as THREE from 'three';

const originalRender=THREE.WebGLRenderer.prototype.render;
if(!THREE.WebGLRenderer.prototype.__boxlabPathTracePreloadInstalled){
  THREE.WebGLRenderer.prototype.render=function(scene,camera){
    if(this?.domElement?.id==='viewport'&&scene?.isScene&&camera?.isCamera){
      globalThis.__boxlabPathTraceBridge={renderer:this,scene,camera};
    }
    return originalRender.call(this,scene,camera);
  };
  THREE.WebGLRenderer.prototype.__boxlabPathTracePreloadInstalled=true;
}
