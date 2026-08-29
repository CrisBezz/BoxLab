export function installPerimeterBevelRouting(EditableMesh) {
  if (EditableMesh.prototype.__perimeterBevelRoutingInstalled) return;
  const baseInfo = EditableMesh.prototype.generalBevelSelectionInfo;
  const baseApply = EditableMesh.prototype.generalBevelSelection;

  EditableMesh.prototype.generalBevelSelectionInfo = function(edgeIndices) {
    const existing = baseInfo?.call(this, edgeIndices);
    if (existing) return existing;

    const ids = [...new Set(edgeIndices || [])].filter(Number.isInteger);
    if (ids.length === 1) {
      const fanEdge = this.generalizedEdgeFanBevelInfo?.(ids);
      if (fanEdge) return { ...fanEdge, mode:'single-fan', ids:[...fanEdge.ids], count:1 };
    }

    const perimeter = this.fanPerimeterBevelInfo?.(ids);
    return perimeter ? { ...perimeter, mode:'perimeter', ids:[...perimeter.ids], count:perimeter.count } : null;
  };

  EditableMesh.prototype.generalBevelSelection = function(edgeIndices, width = 0.2, segments = 1) {
    const info = this.generalBevelSelectionInfo?.(edgeIndices);
    if (info?.mode === 'single-fan') return this.generalizedEdgeFanBevel?.(info.ids, width, segments) || null;
    if (info?.mode === 'perimeter') return this.fanPerimeterBevel?.(info.ids, width, segments) || null;
    return baseApply?.call(this, edgeIndices, width, segments) || null;
  };

  EditableMesh.prototype.__perimeterBevelRoutingInstalled = true;
}
