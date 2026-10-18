// Raster-only scenes retain the accepted .909 bounds. Image-capable resources
// include original encoded sources AND 1024² decoded caches for three overlays.
const MiB=1024*1024;
const raster=Object.freeze({unique:8*MiB,expanded:16*MiB,uniqueMiB:8,expandedMiB:16});
const images=Object.freeze({unique:24*MiB,expanded:48*MiB,uniqueMiB:24,expandedMiB:48});
export const paintBudget=hasImages=>hasImages?images:raster;
