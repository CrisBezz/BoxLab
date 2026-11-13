import * as THREE from 'three';
import { PbrTexturePresetId, TextureSlot } from '../types/studio';
import { GeometryUVInfo, processTextureAtlasEdges } from './uvCleanup';

export const PBR_TEX_SIZE = 256;
export const PRESET_LAYER_COUNT = 8; // 0..7 reserved for procedural presets
export const CUSTOM_TEX_SIZE = 1024;
export const MAX_CUSTOM_LAYERS = 8;
export const CUSTOM_LAYER_OFFSET = 100;

export interface PbrTexturePresetMeta {
  id: PbrTexturePresetId;
  label: string;
  layerIndex: number;
}

export const PBR_TEXTURE_PRESETS: PbrTexturePresetMeta[] = [
  { id: 'none', label: 'Solid (None)', layerIndex: 0 },
  { id: 'brushed-metal', label: 'Brushed Grain', layerIndex: 1 },
  { id: 'carbon-weave', label: 'Carbon Weave', layerIndex: 2 },
  { id: 'vulcanite', label: 'Vulcanite Grip', layerIndex: 3 },
  { id: 'guilloche', label: 'Guilloché Dial', layerIndex: 4 },
  { id: 'concrete', label: 'Board Concrete', layerIndex: 5 },
  { id: 'cedar-wood', label: 'Cedar Timber', layerIndex: 6 },
  { id: 'travertine', label: 'Honed Marble', layerIndex: 7 },
];

export const PRESET_TO_LAYER: Record<PbrTexturePresetId, number> = {
  none: 0,
  'brushed-metal': 1,
  'carbon-weave': 2,
  vulcanite: 3,
  guilloche: 4,
  concrete: 5,
  'cedar-wood': 6,
  travertine: 7,
};

// Periodic hash for seamless tileable 2D value noise
function hash2Periodic(ix: number, iy: number, periodX: number, periodY: number): number {
  const px = ((ix % periodX) + periodX) % periodX;
  const py = ((iy % periodY) + periodY) % periodY;
  let n = px * 374761393 + py * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967295;
}

function tileNoiseAniso(u: number, v: number, freqX: number, freqY: number): number {
  const x = u * freqX;
  const y = v * freqY;
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);

  const a = hash2Periodic(ix, iy, freqX, freqY);
  const b = hash2Periodic(ix + 1, iy, freqX, freqY);
  const c = hash2Periodic(ix, iy + 1, freqX, freqY);
  const d = hash2Periodic(ix + 1, iy + 1, freqX, freqY);

  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function tileNoise(u: number, v: number, freq: number): number {
  return tileNoiseAniso(u, v, freq, freq);
}

function fbmTileAniso(
  u: number,
  v: number,
  baseFreqX: number,
  baseFreqY: number,
  octaves = 4,
): number {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let fx = baseFreqX;
  let fy = baseFreqY;
  for (let o = 0; o < octaves; o++) {
    sum += tileNoiseAniso(u, v, fx, fy) * amp;
    norm += amp;
    amp *= 0.5;
    fx *= 2;
    fy *= 2;
  }
  return sum / norm;
}

function fbmTile(u: number, v: number, baseFreq: number, octaves = 4): number {
  return fbmTileAniso(u, v, baseFreq, baseFreq, octaves);
}

function heightToNormalBytes(
  heights: Float32Array,
  size: number,
  strength: number,
  outBytes: Uint8Array,
  layerOffset: number,
) {
  for (let y = 0; y < size; y++) {
    const ym = (y - 1 + size) % size;
    const yp = (y + 1) % size;
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size;
      const xp = (x + 1) % size;

      const hL = heights[y * size + xm];
      const hR = heights[y * size + xp];
      const hD = heights[ym * size + x];
      const hU = heights[yp * size + x];

      const dx = (hL - hR) * strength;
      const dy = (hD - hU) * strength;
      const nz = 1.0;
      const len = Math.sqrt(dx * dx + dy * dy + nz * nz);

      const idx = layerOffset + (y * size + x) * 4;
      outBytes[idx + 0] = Math.round(((dx / len) * 0.5 + 0.5) * 255);
      outBytes[idx + 1] = Math.round(((dy / len) * 0.5 + 0.5) * 255);
      outBytes[idx + 2] = Math.round(((nz / len) * 0.5 + 0.5) * 255);
      outBytes[idx + 3] = 255;
    }
  }
}

export interface ThreePbrMaps {
  map: THREE.DataTexture | null;
  normalMap: THREE.DataTexture | null;
  roughnessMap: THREE.DataTexture | null;
}

export class PbrTextureManager {
  public readonly albedoArray: THREE.DataArrayTexture;
  public readonly normalArray: THREE.DataArrayTexture;
  public readonly roughMetalArray: THREE.DataArrayTexture;

  public customAlbedoArray: THREE.DataArrayTexture;
  public customNormalArray: THREE.DataArrayTexture;
  public customRoughMetalArray: THREE.DataArrayTexture;

  private readonly albedoBytes: Uint8Array;
  private readonly normalBytes: Uint8Array;
  private readonly roughMetalBytes: Uint8Array;

  private customAllocated = false;
  private customAlbedoBytes: Uint8Array | null = null;
  private customNormalBytes: Uint8Array | null = null;
  private customRoughMetalBytes: Uint8Array | null = null;
  private readonly customIsAtlas = new Array<boolean>(MAX_CUSTOM_LAYERS).fill(false);

  private readonly threeMapsCache = new Map<number, ThreePbrMaps>();
  private nextCustomSlice = 0;
  private readonly maxAnisotropy: number;

  constructor(maxAnisotropy: number) {
    this.maxAnisotropy = Math.min(8, Math.max(1, maxAnisotropy));
    const slicePixels = PBR_TEX_SIZE * PBR_TEX_SIZE * 4;
    const totalBytes = slicePixels * PRESET_LAYER_COUNT;

    this.albedoBytes = new Uint8Array(totalBytes);
    this.normalBytes = new Uint8Array(totalBytes);
    this.roughMetalBytes = new Uint8Array(totalBytes);

    for (let l = 0; l < PRESET_LAYER_COUNT; l++) {
      this.fillNeutralPresetLayer(l);
    }

    // Generate built-in procedural PBR texture packs (layers 1..7)
    this.generatePresetLayer('brushed-metal', 1);
    this.generatePresetLayer('carbon-weave', 2);
    this.generatePresetLayer('vulcanite', 3);
    this.generatePresetLayer('guilloche', 4);
    this.generatePresetLayer('concrete', 5);
    this.generatePresetLayer('cedar-wood', 6);
    this.generatePresetLayer('travertine', 7);

    this.albedoArray = this.createArrayTexture(this.albedoBytes, PBR_TEX_SIZE, PRESET_LAYER_COUNT);
    this.normalArray = this.createArrayTexture(this.normalBytes, PBR_TEX_SIZE, PRESET_LAYER_COUNT);
    this.roughMetalArray = this.createArrayTexture(this.roughMetalBytes, PBR_TEX_SIZE, PRESET_LAYER_COUNT);

    // Lightweight 1x1x1 dummy arrays until custom/imported textures are requested
    this.customAlbedoArray = this.createDummyArrayTex([255, 255, 255, 255]);
    this.customNormalArray = this.createDummyArrayTex([128, 128, 255, 255]);
    this.customRoughMetalArray = this.createDummyArrayTex([255, 255, 255, 255]);
  }

  private createDummyArrayTex(rgba: [number, number, number, number]): THREE.DataArrayTexture {
    const tex = new THREE.DataArrayTexture(new Uint8Array(rgba), 1, 1, 1);
    tex.format = THREE.RGBAFormat;
    tex.type = THREE.UnsignedByteType;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  }

  private createArrayTexture(bytes: Uint8Array, size: number, depth: number): THREE.DataArrayTexture {
    const tex = new THREE.DataArrayTexture(bytes, size, size, depth);
    tex.format = THREE.RGBAFormat;
    tex.type = THREE.UnsignedByteType;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  }

  private ensureCustomAllocated() {
    if (this.customAllocated) return;
    const sliceBytes = CUSTOM_TEX_SIZE * CUSTOM_TEX_SIZE * 4;
    const totalBytes = sliceBytes * MAX_CUSTOM_LAYERS;

    this.customAlbedoBytes = new Uint8Array(totalBytes);
    this.customNormalBytes = new Uint8Array(totalBytes);
    this.customRoughMetalBytes = new Uint8Array(totalBytes);

    for (let s = 0; s < MAX_CUSTOM_LAYERS; s++) {
      this.fillNeutralCustomSlice(s);
    }

    this.customAlbedoArray.dispose();
    this.customNormalArray.dispose();
    this.customRoughMetalArray.dispose();

    this.customAlbedoArray = this.createArrayTexture(
      this.customAlbedoBytes,
      CUSTOM_TEX_SIZE,
      MAX_CUSTOM_LAYERS,
    );
    this.customNormalArray = this.createArrayTexture(
      this.customNormalBytes,
      CUSTOM_TEX_SIZE,
      MAX_CUSTOM_LAYERS,
    );
    this.customRoughMetalArray = this.createArrayTexture(
      this.customRoughMetalBytes,
      CUSTOM_TEX_SIZE,
      MAX_CUSTOM_LAYERS,
    );
    this.customAllocated = true;
  }

  private fillNeutralPresetLayer(layer: number) {
    const sliceBytes = PBR_TEX_SIZE * PBR_TEX_SIZE * 4;
    const offset = layer * sliceBytes;
    for (let i = 0; i < PBR_TEX_SIZE * PBR_TEX_SIZE; i++) {
      const idx = offset + i * 4;
      this.albedoBytes[idx + 0] = 255;
      this.albedoBytes[idx + 1] = 255;
      this.albedoBytes[idx + 2] = 255;
      this.albedoBytes[idx + 3] = 255;

      this.normalBytes[idx + 0] = 128;
      this.normalBytes[idx + 1] = 128;
      this.normalBytes[idx + 2] = 255;
      this.normalBytes[idx + 3] = 255;

      this.roughMetalBytes[idx + 0] = 255;
      this.roughMetalBytes[idx + 1] = 255;
      this.roughMetalBytes[idx + 2] = 255;
      this.roughMetalBytes[idx + 3] = 255;
    }
  }

  private fillNeutralCustomSlice(slice: number) {
    if (!this.customAlbedoBytes || !this.customNormalBytes || !this.customRoughMetalBytes) return;
    const slicePixels = CUSTOM_TEX_SIZE * CUSTOM_TEX_SIZE;
    const offset = slice * slicePixels * 4;
    for (let i = 0; i < slicePixels; i++) {
      const idx = offset + i * 4;
      this.customAlbedoBytes[idx + 0] = 255;
      this.customAlbedoBytes[idx + 1] = 255;
      this.customAlbedoBytes[idx + 2] = 255;
      this.customAlbedoBytes[idx + 3] = 255;

      this.customNormalBytes[idx + 0] = 128;
      this.customNormalBytes[idx + 1] = 128;
      this.customNormalBytes[idx + 2] = 255;
      this.customNormalBytes[idx + 3] = 255;

      this.customRoughMetalBytes[idx + 0] = 255;
      this.customRoughMetalBytes[idx + 1] = 255;
      this.customRoughMetalBytes[idx + 2] = 255;
      this.customRoughMetalBytes[idx + 3] = 255;
    }
  }

  private upscalePresetToCustomSlice(srcLayer: number, dstSlice: number) {
    if (!this.customAlbedoBytes || !this.customNormalBytes || !this.customRoughMetalBytes) return;
    const scale = CUSTOM_TEX_SIZE / PBR_TEX_SIZE;
    const srcOffset = srcLayer * PBR_TEX_SIZE * PBR_TEX_SIZE * 4;
    const dstOffset = dstSlice * CUSTOM_TEX_SIZE * CUSTOM_TEX_SIZE * 4;

    const copyMap = (src: Uint8Array, dst: Uint8Array, isNormal: boolean) => {
      for (let y = 0; y < CUSTOM_TEX_SIZE; y++) {
        const sy = Math.min(PBR_TEX_SIZE - 1, Math.floor(y / scale));
        for (let x = 0; x < CUSTOM_TEX_SIZE; x++) {
          const sx = Math.min(PBR_TEX_SIZE - 1, Math.floor(x / scale));
          const sp = srcOffset + (sy * PBR_TEX_SIZE + sx) * 4;
          const dp = dstOffset + (y * CUSTOM_TEX_SIZE + x) * 4;
          dst[dp + 0] = src[sp + 0];
          dst[dp + 1] = src[sp + 1];
          dst[dp + 2] = src[sp + 2];
          dst[dp + 3] = isNormal ? 255 : src[sp + 3];
        }
      }
    };

    copyMap(this.albedoBytes, this.customAlbedoBytes, false);
    copyMap(this.normalBytes, this.customNormalBytes, true);
    copyMap(this.roughMetalBytes, this.customRoughMetalBytes, false);
  }

  private generatePresetLayer(preset: PbrTexturePresetId, layer: number) {
    const size = PBR_TEX_SIZE;
    const heights = new Float32Array(size * size);
    const sliceOffset = layer * size * size * 4;
    let normalStrength = 2.0;

    for (let y = 0; y < size; y++) {
      const v = y / size;
      for (let x = 0; x < size; x++) {
        const u = x / size;
        const pIdx = y * size + x;
        const idx = sliceOffset + pIdx * 4;

        let r = 255;
        let g = 255;
        let b = 255;
        let roughMult = 1.0;
        let h = 0.5;

        if (preset === 'brushed-metal') {
          const streak = fbmTileAniso(u, v, 2, 32, 3);
          const fine = tileNoiseAniso(u, v, 8, 96);
          const vVal = 0.85 + streak * 0.11 + fine * 0.04;
          r = g = b = Math.round(vVal * 255);
          h = streak * 0.72 + fine * 0.28;
          roughMult = 0.78 + streak * 0.42;
          normalStrength = 1.4;
        } else if (preset === 'carbon-weave') {
          const cells = 12;
          const cx = u * cells;
          const cy = v * cells;
          const ix = Math.floor(cx);
          const iy = Math.floor(cy);
          const fx = cx - ix;
          const fy = cy - iy;
          const diag = (ix + iy) % 4;
          const isWarp = diag < 2;
          const strand = isWarp
            ? Math.sin(fx * Math.PI) * (0.85 + 0.15 * Math.sin(fy * Math.PI * 6))
            : Math.sin(fy * Math.PI) * (0.85 + 0.15 * Math.sin(fx * Math.PI * 6));
          const shade = isWarp ? 0.52 + strand * 0.42 : 0.38 + strand * 0.36;
          r = g = b = Math.round(shade * 255);
          h = strand;
          roughMult = isWarp ? 0.55 + (1 - strand) * 0.45 : 0.82 + (1 - strand) * 0.35;
          normalStrength = 3.2;
        } else if (preset === 'vulcanite') {
          const n1 = fbmTile(u, v, 24, 3);
          const n2 = tileNoise(u, v, 48);
          const pebble = Math.pow(n1 * 0.72 + n2 * 0.28, 1.35);
          const shade = 0.7 + pebble * 0.3;
          r = g = b = Math.round(shade * 255);
          h = pebble;
          roughMult = 0.85 + (1 - pebble) * 0.35;
          normalStrength = 4.0;
        } else if (preset === 'guilloche') {
          const dx = u - 0.5;
          const dy = v - 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const rays = Math.cos(angle * 48) * 0.5 + 0.5;
          const rings = Math.cos(dist * Math.PI * 44) * 0.5 + 0.5;
          const edgeDist = Math.max(Math.abs(dx), Math.abs(dy));
          const edgeTaper = edgeDist < 0.44 ? 1.0 : Math.max(0.0, (0.5 - edgeDist) / 0.06);
          const pattern = 0.5 + (rays * 0.55 + rings * 0.45 - 0.5) * edgeTaper;
          const shade = 0.65 + pattern * 0.35;
          r = g = b = Math.round(shade * 255);
          h = pattern;
          roughMult = 0.6 + (1 - pattern) * 0.5;
          normalStrength = 2.4;
        } else if (preset === 'concrete') {
          const base = fbmTile(u, v, 6, 4);
          const grain = fbmTile(u, v, 24, 3);
          const pore = grain < 0.32 ? (0.32 - grain) * 1.8 : 0;
          const seam = Math.abs(((v * 4 + 0.5) % 1) - 0.5) > 0.486 ? 0.12 : 0;
          const val = Math.max(0.45, Math.min(1.0, 0.78 + (base - 0.5) * 0.28 - pore * 0.4 - seam));
          r = Math.round(val * 255);
          g = Math.round(val * 0.99 * 255);
          b = Math.round(val * 0.96 * 255);
          h = base * 0.65 + grain * 0.35 - pore * 0.5 - seam;
          roughMult = 0.85 + pore * 0.3 + (1 - base) * 0.2;
          normalStrength = 3.0;
        } else if (preset === 'cedar-wood') {
          const warp = fbmTile(u, v, 4, 3) * 0.35;
          const rings = Math.sin((u * 10 + warp * 8) * Math.PI * 2) * 0.5 + 0.5;
          const fiber = fbmTileAniso(u, v, 24, 3, 3);
          const grain = rings * 0.65 + fiber * 0.35;
          r = Math.round((0.68 + grain * 0.32) * 255);
          g = Math.round((0.54 + grain * 0.3) * 255);
          b = Math.round((0.42 + grain * 0.26) * 255);
          h = grain * 0.7 + fiber * 0.3;
          roughMult = 0.78 + (1 - grain) * 0.38;
          normalStrength = 2.2;
        } else if (preset === 'travertine') {
          const flow = fbmTile(u, v, 4, 4);
          const vein = Math.pow(Math.abs(Math.sin((v * 3 + flow * 2.2) * Math.PI)), 0.35);
          const pores = fbmTile(u * 2, v * 4, 16, 3);
          const pit = pores < 0.28 ? (0.28 - pores) * 1.4 : 0;
          const val = Math.max(0.55, Math.min(1.0, 0.72 + vein * 0.26 - pit * 0.35));
          r = Math.round(val * 255);
          g = Math.round(val * 0.96 * 255);
          b = Math.round(val * 0.9 * 255);
          h = vein * 0.6 + pores * 0.4 - pit * 0.7;
          roughMult = 0.72 + pit * 0.6 + (1 - vein) * 0.25;
          normalStrength = 2.6;
        }

        heights[pIdx] = h;
        this.albedoBytes[idx + 0] = r;
        this.albedoBytes[idx + 1] = g;
        this.albedoBytes[idx + 2] = b;
        this.albedoBytes[idx + 3] = 255;

        const rByte = Math.max(12, Math.min(255, Math.round(roughMult * 255)));
        this.roughMetalBytes[idx + 0] = rByte;
        this.roughMetalBytes[idx + 1] = rByte;
        this.roughMetalBytes[idx + 2] = 255;
        this.roughMetalBytes[idx + 3] = 255;
      }
    }

    heightToNormalBytes(heights, size, normalStrength, this.normalBytes, sliceOffset);
  }

  public allocateCustomLayer(basePreset: PbrTexturePresetId = 'none', isAtlas = false): number {
    this.ensureCustomAllocated();
    const slice = this.nextCustomSlice;
    this.nextCustomSlice =
      this.nextCustomSlice >= MAX_CUSTOM_LAYERS - 1 ? 0 : this.nextCustomSlice + 1;
    const srcLayer = PRESET_TO_LAYER[basePreset];
    if (srcLayer === 0) {
      this.fillNeutralCustomSlice(slice);
    } else {
      this.upscalePresetToCustomSlice(srcLayer, slice);
    }
    this.customIsAtlas[slice] = isAtlas;
    const encoded = CUSTOM_LAYER_OFFSET + slice;
    this.customAlbedoArray.addLayerUpdate(slice);
    this.customNormalArray.addLayerUpdate(slice);
    this.customRoughMetalArray.addLayerUpdate(slice);
    this.invalidateLayer(encoded);
    return encoded;
  }

  public writeImageToLayer(
    encodedLayer: number,
    slot: TextureSlot,
    image: CanvasImageSource,
    flipY = false,
    uvInfo?: GeometryUVInfo,
  ) {
    if (encodedLayer < CUSTOM_LAYER_OFFSET) return;
    this.ensureCustomAllocated();
    if (!this.customAlbedoBytes || !this.customNormalBytes || !this.customRoughMetalBytes) return;

    const slice = encodedLayer - CUSTOM_LAYER_OFFSET;
    if (slice < 0 || slice >= MAX_CUSTOM_LAYERS) return;

    if (uvInfo) {
      this.customIsAtlas[slice] = uvInfo.isAtlas;
    }

    const size = CUSTOM_TEX_SIZE;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (flipY) {
      ctx.save();
      ctx.translate(0, size);
      ctx.scale(1, -1);
      ctx.drawImage(image, 0, 0, size, size);
      ctx.restore();
    } else {
      ctx.drawImage(image, 0, 0, size, size);
    }

    const imgData = ctx.getImageData(0, 0, size, size).data;
    const totalPixels = size * size;
    const sliceBytes = totalPixels * 4;
    const offset = slice * sliceBytes;

    const sliceCopy = new Uint8Array(sliceBytes);
    const origAlpha = new Uint8Array(totalPixels);
    for (let i = 0; i < totalPixels; i++) {
      const p = i * 4;
      origAlpha[i] = imgData[p + 3];
      sliceCopy[p + 0] = imgData[p + 0];
      sliceCopy[p + 1] = imgData[p + 1];
      sliceCopy[p + 2] = imgData[p + 2];
      sliceCopy[p + 3] = 255;
    }

    processTextureAtlasEdges(sliceCopy, origAlpha, size, slot === 'normal', uvInfo);

    if (slot === 'albedo') {
      this.customAlbedoBytes.set(sliceCopy, offset);
      this.customAlbedoArray.addLayerUpdate(slice);
      this.customAlbedoArray.needsUpdate = true;
    } else if (slot === 'normal') {
      this.customNormalBytes.set(sliceCopy, offset);
      this.customNormalArray.addLayerUpdate(slice);
      this.customNormalArray.needsUpdate = true;
    } else {
      this.customRoughMetalBytes.set(sliceCopy, offset);
      this.customRoughMetalArray.addLayerUpdate(slice);
      this.customRoughMetalArray.needsUpdate = true;
    }

    this.invalidateLayer(encodedLayer);
  }

  public async writeFileToLayer(
    encodedLayer: number,
    slot: TextureSlot,
    file: File,
    uvInfo?: GeometryUVInfo,
  ): Promise<void> {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error(`Unable to decode image ${file.name}`));
        el.src = url;
      });
      this.writeImageToLayer(encodedLayer, slot, img, false, uvInfo);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  public getLayerShaderInfo(encodedLayer: number): { slice: number; modeFlag: number } {
    if (encodedLayer >= CUSTOM_LAYER_OFFSET) {
      const slice = Math.max(0, Math.min(MAX_CUSTOM_LAYERS - 1, encodedLayer - CUSTOM_LAYER_OFFSET));
      return {
        slice,
        modeFlag: this.customIsAtlas[slice] ? 2.0 : 1.0,
      };
    }
    return {
      slice: encodedLayer,
      modeFlag: 0.0,
    };
  }

  private invalidateLayer(layer: number) {
    const cached = this.threeMapsCache.get(layer);
    if (cached) {
      cached.map?.dispose();
      cached.normalMap?.dispose();
      cached.roughnessMap?.dispose();
      this.threeMapsCache.delete(layer);
    }
    this.albedoArray.needsUpdate = true;
    this.normalArray.needsUpdate = true;
    this.roughMetalArray.needsUpdate = true;
    this.customAlbedoArray.needsUpdate = true;
    this.customNormalArray.needsUpdate = true;
    this.customRoughMetalArray.needsUpdate = true;
  }

  public getThreeMapsForLayer(layer: number, uvScale: number): ThreePbrMaps {
    if (layer === 0) {
      return { map: null, normalMap: null, roughnessMap: null };
    }

    const isCustom = layer >= CUSTOM_LAYER_OFFSET;
    const slice = isCustom ? layer - CUSTOM_LAYER_OFFSET : layer;
    const size = isCustom ? CUSTOM_TEX_SIZE : PBR_TEX_SIZE;
    const isAtlas = isCustom && Boolean(this.customIsAtlas[slice]);

    let maps = this.threeMapsCache.get(layer);
    if (!maps) {
      const srcAlbedo = isCustom ? this.customAlbedoBytes : this.albedoBytes;
      const srcNormal = isCustom ? this.customNormalBytes : this.normalBytes;
      const srcRough = isCustom ? this.customRoughMetalBytes : this.roughMetalBytes;

      if (!srcAlbedo || !srcNormal || !srcRough) {
        return { map: null, normalMap: null, roughnessMap: null };
      }

      const sliceBytes = size * size * 4;
      const offset = slice * sliceBytes;

      const makeTex = (src: Uint8Array, isSrgb: boolean) => {
        const sliceCopy = new Uint8Array(sliceBytes);
        sliceCopy.set(src.subarray(offset, offset + sliceBytes));
        const tex = new THREE.DataTexture(sliceCopy, size, size, THREE.RGBAFormat);
        tex.colorSpace = isSrgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        const wrap = isAtlas && uvScale <= 1.02 ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
        tex.wrapS = wrap;
        tex.wrapT = wrap;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        tex.anisotropy = this.maxAnisotropy;
        tex.needsUpdate = true;
        return tex;
      };

      maps = {
        map: makeTex(srcAlbedo, true),
        normalMap: makeTex(srcNormal, false),
        roughnessMap: makeTex(srcRough, false),
      };
      this.threeMapsCache.set(layer, maps);
    }

    const desiredWrap = isAtlas && uvScale <= 1.02 ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    [maps.map, maps.normalMap, maps.roughnessMap].forEach((t) => {
      if (t) {
        t.repeat.set(uvScale, uvScale);
        if (t.wrapS !== desiredWrap || t.wrapT !== desiredWrap) {
          t.wrapS = desiredWrap;
          t.wrapT = desiredWrap;
          t.needsUpdate = true;
        }
      }
    });

    return maps;
  }

  public resetCustomCounter() {
    this.nextCustomSlice = 0;
    this.customIsAtlas.fill(false);
    for (const key of Array.from(this.threeMapsCache.keys())) {
      if (key >= CUSTOM_LAYER_OFFSET) {
        const cached = this.threeMapsCache.get(key);
        cached?.map?.dispose();
        cached?.normalMap?.dispose();
        cached?.roughnessMap?.dispose();
        this.threeMapsCache.delete(key);
      }
    }
  }

  public dispose() {
    this.albedoArray.dispose();
    this.normalArray.dispose();
    this.roughMetalArray.dispose();
    this.customAlbedoArray.dispose();
    this.customNormalArray.dispose();
    this.customRoughMetalArray.dispose();
    for (const cached of this.threeMapsCache.values()) {
      cached.map?.dispose();
      cached.normalMap?.dispose();
      cached.roughnessMap?.dispose();
    }
    this.threeMapsCache.clear();
  }
}
