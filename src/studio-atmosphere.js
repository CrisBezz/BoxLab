// .999 — retire the screen-sized blended DOM layer from the initial viewport.
// Studio illumination, ground and shadows remain owned by the existing renderer.
// Keep the former public hook harmless for older callers; do not create a surface
// or subscribe to mode changes that would animate a full-viewport blend layer.
function sync(){
 document.querySelector('#boxlabStudioAtmosphere')?.remove();
 return true;
}
sync();
globalThis.__boxlabStudioAtmosphere={version:'0.36.18.999',enabled:false,sync};
