import * as THREE from 'three';
import { PbrTexturePresetId, TextureSlot } from '../types/studio';
import { GeometryUVInfo, processTextureAtlasEdges } from './uvCleanup';
import { copyPackedScalarChannel } from './packed-pbr-channels.js';

export const PBR_TEX_SIZE = 256;
export const PRESET_LAYER_COUNT = 14; // 0 is neutral; 1..13 are procedural presets
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
  { id: 'limestone', label: 'Sedimentary Limestone', layerIndex: 8 },
  { id: 'brick', label: 'Running Bond Brick', layerIndex: 9 },
  { id: 'terrazzo', label: 'Terrazzo Aggregate', layerIndex: 10 },
  { id: 'ceramic-tile', label: 'Glazed Ceramic Tile', layerIndex: 11 },
  { id: 'plaster', label: 'Lime Plaster', layerIndex: 12 },
  { id: 'corten-steel', label: 'Weathered Steel', layerIndex: 13 },
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
  limestone: 8,
  brick: 9,
  terrazzo: 10,
  'ceramic-tile': 11,
  plaster: 12,
  'corten-steel': 13,
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
  metalnessMap: THREE.DataTexture | null;
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

  private readonly threeMapsCache = new Map<string, ThreePbrMaps>();
  private readonly previewCache = new Map<string, string>();
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

    // Generate built-in procedural PBR texture packs (layers 1..13)
    this.generatePresetLayer('brushed-metal', 1);
    this.generatePresetLayer('carbon-weave', 2);
    this.generatePresetLayer('vulcanite', 3);
    this.generatePresetLayer('guilloche', 4);
    this.generatePresetLayer('concrete', 5);
    this.generatePresetLayer('cedar-wood', 6);
    this.generatePresetLayer('travertine', 7);
    this.generatePresetLayer('limestone', 8);
    this.generatePresetLayer('brick', 9);
    this.generatePresetLayer('terrazzo', 10);
    this.generatePresetLayer('ceramic-tile', 11);
    this.generatePresetLayer('plaster', 12);
    this.generatePresetLayer('corten-steel', 13);

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
        } else if (preset === 'limestone') {
          const sediment = fbmTileAniso(u, v, 4, 9, 3);
          const grain = fbmTile(u, v, 30, 24);
          const seam = Math.pow(Math.max(0, Math.cos((v * 5 + sediment * 0.7) * Math.PI * 2)), 16);
          const pore = grain < 0.29 ? (0.29 - grain) * 1.4 : 0;
          const val = Math.max(0.56, Math.min(1, 0.83 + (sediment - 0.5) * 0.18 + seam * 0.08 - pore * 0.22));
          r = Math.round(val * 255);
          g = Math.round(val * 0.99 * 255);
          b = Math.round(val * 0.95 * 255);
          h = sediment * 0.62 + grain * 0.38 - pore * 0.5;
          roughMult = 0.82 + pore * 0.45 + (1 - seam) * 0.12;
          normalStrength = 2.0;
        } else if (preset === 'brick') {
          const rows = 6;
          const row = Math.floor(v * rows);
          const rowV = (v * rows) % 1;
          const columns = 4;
          const offset = row % 2 ? 0.5 : 0;
          const columnPosition = u * columns + offset;
          const columnU = columnPosition % 1;
          const mortar = rowV < 0.045 || rowV > 0.955 || columnU < 0.035 || columnU > 0.965;
          const grain = fbmTile(u, v, 28, 22);
          const face = mortar ? 0.67 + grain * 0.08 : 0.88 + grain * 0.12;
          r = g = b = Math.round(face * 255);
          h = mortar ? 0.12 + grain * 0.12 : 0.62 + grain * 0.2;
          roughMult = mortar ? 1.14 : 0.92 + (1 - grain) * 0.18;
          normalStrength = 3.4;
        } else if (preset === 'terrazzo') {
          const cells = 18;
          const cx = u * cells;
          const cy = v * cells;
          const ix = Math.floor(cx);
          const iy = Math.floor(cy);
          const fx = cx - ix;
          const fy = cy - iy;
          const seed = hash2Periodic(ix, iy, cells, cells);
          const centerX = 0.22 + hash2Periodic(ix + 17, iy, cells, cells) * 0.56;
          const centerY = 0.22 + hash2Periodic(ix, iy + 31, cells, cells) * 0.56;
          const radiusX = 0.11 + seed * 0.12;
          const radiusY = 0.09 + hash2Periodic(ix + 7, iy + 13, cells, cells) * 0.15;
          const dx = (fx - centerX) / radiusX;
          const dy = (fy - centerY) / radiusY;
          const chip = dx * dx + dy * dy < 1;
          const fleck = fbmTile(u, v, 35, 35);
          const val = chip ? 0.62 + seed * 0.32 : 0.93 + fleck * 0.07;
          r = Math.round(val * 255);
          g = Math.round(val * (chip ? 0.96 : 0.99) * 255);
          b = Math.round(val * (chip ? 0.91 : 0.97) * 255);
          h = chip ? 0.35 + seed * 0.42 : 0.52 + fleck * 0.08;
          roughMult = chip ? 0.9 + seed * 0.35 : 0.94 + fleck * 0.12;
          normalStrength = 1.8;
        } else if (preset === 'ceramic-tile') {
          const tiles = 4;
          const tileU = (u * tiles) % 1;
          const tileV = (v * tiles) % 1;
          const edge = Math.min(tileU, 1 - tileU, tileV, 1 - tileV);
          const grout = edge < 0.025;
          const glaze = fbmTile(u, v, 16,