// Raster-only scenes retain the accepted .909 bounds. Image-capable resources
// include original encoded sources AND 1024² decoded caches for three overlays.
const MiB=1024*1024;
const raster=Object.freeze({unique:8*MiB,expanded:16*MiB,uniqueMiB:8,expandedMiB:16});
const images=Object.freeze({unique:24*MiB,expanded:48*MiB,uniqueMiB:24,expandedMiB:48});
const highRaster=Object.freeze({unique:32*MiB,expanded:64*MiB,uniqueMiB:32,expandedMiB:64});
const highImages=Object.freeze({unique:48*MiB,expanded:96*MiB,uniqueMiB:48,expandedMiB:96});
export const highResolutionPaint=value=>value?.width===1024&&value?.height===1024;
export const paintBudget=(hasImages,highResolution=false)=>highResolution?(hasImages?highImages:highRaster):(hasImages?images:raster);
