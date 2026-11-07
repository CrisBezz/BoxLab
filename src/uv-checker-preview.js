import * as THREE from 'three';
// Ephemeral viewport resources only. Geometry comes from the existing exporter.
export function createUVCheckerOverlay(body,mesh,payload,buildGeometry){
 if(typeof buildGeometry!=='function'||!body?.geometry)return null;
 const geometry=buildGeometry(mesh,payload);if(!geometry)return null;
 const material=new THREE.ShaderMaterial({side:THREE.FrontSide,
  vertexShader:'varying vec2 checkerUV; void main(){checkerUV=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:'varying vec2 checkerUV; void main(){vec2 cell=floor(fract(checkerUV)*16.0); float parity=mod(cell.x+cell.y,2.0); gl_FragColor=vec4(mix(vec3(0.16,0.24,0.34),vec3(0.82,0.87,0.93),parity),1.0);}'
 });
 const overlay=new THREE.Mesh(geometry,material);overlay.userData.boxlabRenderOverlay=true;
 overlay.userData.boxlabUVCheckerPreview=true;overlay.raycast=()=>{};
 let disposed=false;const sourceGeometry=body.geometry;
 const dispose=()=>{if(disposed)return;disposed=true;sourceGeometry.removeEventListener('dispose',dispose);body.remove(overlay);geometry.dispose();material.dispose();};
 overlay.userData.boxlabUVCheckerDispose=dispose;
 sourceGeometry.addEventListener('dispose',dispose);body.add(overlay);return overlay;
}
