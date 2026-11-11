// Exact Visible/Through sampler from accepted .1144. Test/benchmark only.
export function hitIndices(event, type) {
  const depth=type==='face'&&globalThis.__boxlabSelectionInput?(globalThis.__boxlabSelectionInput.frontOnly()?'visible':'through'):paintDepth;
  // Share native Edge proximity ranking with taps and Pencil background classification.
  if((type==='edge'||type==='face')&&selection()?.pickHits){
    const indices=[...new Set(selection().pickHits(type,event,{through:depth==='through'}).map(hit=>hit.index).filter(Number.isInteger))];
    return depth==='through'?indices:indices.slice(0,1);
  }
  const camera = state()?.camera;
  const objects = objectsFor(type).filter(Boolean);
  if (!camera || !objects.length) return [];
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);
  const raw = raycaster.intersectObjects(objects, false);
  const hits=type==='face'?(globalThis.__boxlabSelectionInput?.filterFaceHits?.(raw,raycaster.ray.direction)||raw):raw;
  const indices = [...new Set(hits.map(hit => hit.object?.userData?.index).filter(Number.isInteger))];
  return depth === 'through' ? indices : indices.slice(0, 1);
}

