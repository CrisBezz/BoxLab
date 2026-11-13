import * as THREE from 'three';

const _v0 = new THREE.Vector3();
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _e1 = new THREE.Vector3();
const _e2 = new THREE.Vector3();
const _faceN = new THREE.Vector3();

function ensureNonIndexedWithNormals(geom: THREE.BufferGeometry): THREE.BufferGeometry {
  if (!geom.getAttribute('normal')) {
    geom.computeVertexNormals();
  }
  if (!geom.index) {
    return geom;
  }
  const nonIndexed = geom.toNonIndexed();
  geom.dispose();
  return nonIndexed;
}

/**
 * Assigns crisp metric triplanar/box-projected UVs per triangle on non-indexed geometry
 * so bevels, thin slab edges, and asymmetrical boxes never stretch or overwrite shared vertex UVs.
 */
export function applyCleanBoxUVs(
  geometry: THREE.BufferGeometry,
  texelsPerMeter = 1.0,
): THREE.BufferGeometry {
  const geom = ensureNonIndexedWithNormals(geometry);
  const pos = geom.getAttribute('position');
  if (!pos) return geom;

  const uvArray = new Float32Array(pos.count * 2);
  const triCount = Math.floor(pos.count / 3);

  for (let t = 0; t < triCount; t++) {
    const i0 = t * 3;
    const i1 = t * 3 + 1;
    const i2 = t * 3 + 2;

    _v0.fromBufferAttribute(pos, i0);
    _v1.fromBufferAttribute(pos, i1);
    _v2.fromBufferAttribute(pos, i2);

    _e1.subVectors(_v1, _v0);
    _e2.subVectors(_v2, _v0);
    _faceN.crossVectors(_e1, _e2);

    const ax = Math.abs(_faceN.x);
    const ay = Math.abs(_faceN.y);
    const az = Math.abs(_faceN.z);

    if (ay >= ax && ay >= az) {
      // Top / Bottom face -> XZ plane
      const signY = _faceN.y >= 0 ? 1 : -1;
      uvArray[i0 * 2 + 0] = _v0.x * texelsPerMeter;
      uvArray[i0 * 2 + 1] = -_v0.z * signY * texelsPerMeter;
      uvArray[i1 * 2 + 0] = _v1.x * texelsPerMeter;
      uvArray[i1 * 2 + 1] = -_v1.z * signY * texelsPerMeter;
      uvArray[i2 * 2 + 0] = _v2.x * texelsPerMeter;
      uvArray[i2 * 2 + 1] = -_v2.z * signY * texelsPerMeter;
    } else if (ax >= ay && ax >= az) {
      // Left / Right face -> ZY plane
      const signX = _faceN.x >= 0 ? -1 : 1;
      uvArray[i0 * 2 + 0] = _v0.z * signX * texelsPerMeter;
      uvArray[i0 * 2 + 1] = _v0.y * texelsPerMeter;
      uvArray[i1 * 2 + 0] = _v1.z * signX * texelsPerMeter;
      uvArray[i1 * 2 + 1] = _v1.y * texelsPerMeter;
      uvArray[i2 * 2 + 0] = _v2.z * signX * texelsPerMeter;
      uvArray[i2 * 2 + 1] = _v2.y * texelsPerMeter;
    } else {
      // Front / Back face -> XY plane
      const signZ = _faceN.z >= 0 ? 1 : -1;
      uvArray[i0 * 2 + 0] = _v0.x * signZ * texelsPerMeter;
      uvArray[i0 * 2 + 1] = _v0.y * texelsPerMeter;
      uvArray[i1 * 2 + 0] = _v1.x * signZ * texelsPerMeter;
      uvArray[i1 * 2 + 1] = _v1.y * texelsPerMeter;
      uvArray[i2 * 2 + 0] = _v2.x * signZ * texelsPerMeter;
      uvArray[i2 * 2 + 1] = _v2.y * texelsPerMeter;
    }
  }

  geom.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2));
  return geom;
}

/**
 * Unwraps Z-extruded rounded shapes cleanly: flat caps receive metric XY projection,
 * while curved side walls & bevels wrap continuously around the XY perimeter with
 * seam-cut correction so rounded corners have zero stretching or branch-cut artifacts.
 */
export function applyCleanExtrudeWrapUVs(
  geometry: THREE.BufferGeometry,
  texelsPerMeter = 1.0,
  perimeterRepeats = 4,
): THREE.BufferGeometry {
  const geom = ensureNonIndexedWithNormals(geometry);
  const pos = geom.getAttribute('position');
  if (!pos) return geom;

  geom.computeBoundingBox();
  const center = new THREE.Vector3();
  geom.boundingBox?.getCenter(center);

  const uvArray = new Float32Array(pos.count * 2);
  const triCount = Math.floor(pos.count / 3);
  const halfP = perimeterRepeats * 0.5;

  const angleToU = (x: number, y: number) => {
    const theta = Math.atan2(y - center.y, x - center.x); // -PI..PI
    return ((theta + Math.PI) / (Math.PI * 2)) * perimeterRepeats;
  };

  for (let t = 0; t < triCount; t++) {
    const i0 = t * 3;
    const i1 = t * 3 + 1;
    const i2 = t * 3 + 2;

    _v0.fromBufferAttribute(pos, i0);
    _v1.fromBufferAttribute(pos, i1);
    _v2.fromBufferAttribute(pos, i2);

    _e1.subVectors(_v1, _v0);
    _e2.subVectors(_v2, _v0);
    _faceN.crossVectors(_e1, _e2);
    const len = _faceN.length();
    const nzAbs = len > 1e-10 ? Math.abs(_faceN.z) / len : 1;

    if (nzAbs > 0.85) {
      // Flat cap -> clean metric XY
      const signZ = _faceN.z >= 0 ? 1 : -1;
      uvArray[i0 * 2 + 0] = _v0.x * signZ * texelsPerMeter;
      uvArray[i0 * 2 + 1] = _v0.y * texelsPerMeter;
      uvArray[i1 * 2 + 0] = _v1.x * signZ * texelsPerMeter;
      uvArray[i1 * 2 + 1] = _v1.y * texelsPerMeter;
      uvArray[i2 * 2 + 0] = _v2.x * signZ * texelsPerMeter;
      uvArray[i2 * 2 + 1] = _v2.y * texelsPerMeter;
    } else {
      // Side walls & bevels -> seamless continuous angular wrap + metric Z
      const u0 = angleToU(_v0.x, _v0.y);
      let u1 = angleToU(_v1.x, _v1.y);
      let u2 = angleToU(_v2.x, _v2.y);

      if (u1 - u0 > halfP) u1 -= perimeterRepeats;
      else if (u0 - u1 > halfP) u1 += perimeterRepeats;

      if (u2 - u0 > halfP) u2 -= perimeterRepeats;
      else if (u0 - u2 > halfP) u2 += perimeterRepeats;

      uvArray[i0 * 2 + 0] = u0;
      uvArray[i0 * 2 + 1] = _v0.z * texelsPerMeter;
      uvArray[i1 * 2 + 0] = u1;
      uvArray[i1 * 2 + 1] = _v1.z * texelsPerMeter;
      uvArray[i2 * 2 + 0] = u2;
      uvArray[i2 * 2 + 1] = _v2.z * texelsPerMeter;
    }
  }

  geom.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2));
  return geom;
}

/**
 * Re-parameterizes LatheGeometry V coordinates by cumulative profile arc length
 * instead of segment count, eliminating stretching across uneven chamfers and flanges.
 */
export function applyCleanLatheUVs(
  geom: THREE.BufferGeometry,
  profilePoints: THREE.Vector2[],
  radialRepeats = 2,
): THREE.BufferGeometry {
  const uv = geom.getAttribute('uv');
  if (!uv || profilePoints.length < 2) return geom;

  // Precompute normalized cumulative arc length along the profile
  const cumLen = new Float32Array(profilePoints.length);
  let totalLen = 0;
  for (let i = 1; i < profilePoints.length; i++) {
    const dx = profilePoints[i].x - profilePoints[i - 1].x;
    const dy = profilePoints[i].y - profilePoints[i - 1].y;
    totalLen += Math.sqrt(dx * dx + dy * dy);
    cumLen[i] = totalLen;
  }

  const maxR = Math.max(...profilePoints.map((p) => p.x), 0.1);
  const vAspect = totalLen / (2 * Math.PI * maxR);
  const vScale = Math.max(0.25, vAspect * radialRepeats);
  const n = profilePoints.length;

  for (let i = 0; i < uv.count; i++) {
    const oldU = uv.getX(i);
    const oldV = uv.getY(i);
    // LatheGeometry assigns v = j / (n - 1) for profile point j
    const fIdx = Math.max(0, Math.min(n - 1, oldV * (n - 1)));
    const j0 = Math.floor(fIdx);
    const j1 = Math.min(n - 1, j0 + 1);
    const frac = fIdx - j0;
    const arc = totalLen > 1e-6 ? (cumLen[j0] * (1 - frac) + cumLen[j1] * frac) / totalLen : oldV;

    uv.setXY(i, oldU * radialRepeats, arc * vScale);
  }
  uv.needsUpdate = true;
  return geom;
}

/**
 * Adjusts CylinderGeometry side-wall V scale to match circumference density while
 * preserving centered [0..1] circular cap UVs.
 */
export function applyCleanCylinderUVs(
  geom: THREE.BufferGeometry,
  radius: number,
  height: number,
  radialRepeats = 1,
): THREE.BufferGeometry {
  const uv = geom.getAttribute('uv');
  const norm = geom.getAttribute('normal');
  if (!uv || !norm) return geom;

  const circumference = 2 * Math.PI * Math.max(radius, 0.02);
  const vScale = (height / circumference) * radialRepeats;

  for (let i = 0; i < uv.count; i++) {
    const ny = Math.abs(norm.getY(i));
    const u = uv.getX(i);
    const v = uv.getY(i);
    if (ny < 0.7) {
      // Side cylinder wall
      uv.setXY(i, u * radialRepeats, v * vScale);
    } else {
      // Keep centered [0..1] planar circle on caps
      uv.setXY(i, u, v);
    }
  }
  uv.needsUpdate = true;
  return geom;
}

/**
 * Scales TorusGeometry major U coordinate by an integer ratio matching major/minor radii
 * so wrapped tube textures have balanced proportions without a seam jump.
 */
export function applyCleanTorusUVs(
  geom: THREE.BufferGeometry,
  majorRadius: number,
  minorRadius: number,
): THREE.BufferGeometry {
  const uv = geom.getAttribute('uv');
  if (!uv) return geom;
  const uRepeats = Math.max(1, Math.round(majorRadius / Math.max(minorRadius, 0.01)));
  for (let i = 0; i < uv.count; i++) {
    uv.setX(i, uv.getX(i) * uRepeats);
  }
  uv.needsUpdate = true;
  return geom;
}

/**
 * Scales TubeGeometry closed-loop U coordinate by an integer ratio matching curve length
 * to tube circumference.
 */
export function applyCleanTubeUVs(
  geom: THREE.BufferGeometry,
  approxLength: number,
  tubeRadius: number,
): THREE.BufferGeometry {
  const uv = geom.getAttribute('uv');
  if (!uv) return geom;
  const tubeCirc = 2 * Math.PI * Math.max(tubeRadius, 0.01);
  const uRepeats = Math.max(1, Math.round(approxLength / tubeCirc));
  for (let i = 0; i < uv.count; i++) {
    uv.setX(i, uv.getX(i) * uRepeats);
  }
  uv.needsUpdate = true;
  return geom;
}

export interface SeamPair {
  uA1: number;
  vA1: number;
  uB1: number;
  vB1: number;
  uA2: number;
  vA2: number;
  uB2: number;
  vB2: number;
}

export interface GeometryUVInfo {
  triangles: Float32Array; // 6 floats per tri: u0, v0, u1, v1, u2, v2
  isAtlas: boolean;
  seamPairs: SeamPair[];
}

function quantPosKey(x: number, y: number, z: number): string {
  return `${Math.round(x * 10000)},${Math.round(y * 10000)},${Math.round(z * 10000)}`;
}

interface EdgeRecord {
  kA: string;
  kB: string;
  uA: number;
  vA: number;
  uB: number;
  vB: number;
}

export function analyzeGeometriesUV(geometries: THREE.BufferGeometry[]): GeometryUVInfo {
  const triList: number[] = [];
  let minU = Infinity;
  let maxU = -Infinity;
  let minV = Infinity;
  let maxV = -Infinity;

  const edgeMap = new Map<string, EdgeRecord>();
  const seamPairs: SeamPair[] = [];

  for (const geom of geometries) {
    const pos = geom.getAttribute('position');
    const uv = geom.getAttribute('uv');
    if (!pos || !uv) continue;
    const index = geom.getIndex();
    const triCount = index ? Math.floor(index.count / 3) : Math.floor(pos.count / 3);

    for (let t = 0; t < triCount; t++) {
      const i0 = index ? index.getX(t * 3) : t * 3;
      const i1 = index ? index.getX(t * 3 + 1) : t * 3 + 1;
      const i2 = index ? index.getX(t * 3 + 2) : t * 3 + 2;

      const u0 = uv.getX(i0);
      const v0 = uv.getY(i0);
      const u1 = uv.getX(i1);
      const v1 = uv.getY(i1);
      const u2 = uv.getX(i2);
      const v2 = uv.getY(i2);

      triList.push(u0, v0, u1, v1, u2, v2);
      if (u0 < minU) minU = u0;
      if (u1 < minU) minU = u1;
      if (u2 < minU) minU = u2;
      if (u0 > maxU) maxU = u0;
      if (u1 > maxU) maxU = u1;
      if (u2 > maxU) maxU = u2;
      if (v0 < minV) minV = v0;
      if (v1 < minV) minV = v1;
      if (v2 < minV) minV = v2;
      if (v0 > maxV) maxV = v0;
      if (v1 > maxV) maxV = v1;
      if (v2 > maxV) maxV = v2;

      const pKeys = [
        quantPosKey(pos.getX(i0), pos.getY(i0), pos.getZ(i0)),
        quantPosKey(pos.getX(i1), pos.getY(i1), pos.getZ(i1)),
        quantPosKey(pos.getX(i2), pos.getY(i2), pos.getZ(i2)),
      ];
      const uvs = [
        [u0, v0],
        [u1, v1],
        [u2, v2],
      ];

      for (let e = 0; e < 3; e++) {
        const a = e;
        const b = (e + 1) % 3;
        const kA = pKeys[a];
        const kB = pKeys[b];
        if (kA === kB) continue;

        const canonAFirst = kA < kB;
        const edgeKey = canonAFirst ? `${kA}|${kB}` : `${kB}|${kA}`;
        const rec: EdgeRecord = canonAFirst
          ? { kA, kB, uA: uvs[a][0], vA: uvs[a][1], uB: uvs[b][0], vB: uvs[b][1] }
          : { kA: kB, kB: kA, uA: uvs[b][0], vA: uvs[b][1], uB: uvs[a][0], vB: uvs[a][1] };

        const existing = edgeMap.get(edgeKey);
        if (!existing) {
          edgeMap.set(edgeKey, rec);
        } else {
          const dA = Math.hypot(existing.uA - rec.uA, existing.vA - rec.vA);
          const dB = Math.hypot(existing.uB - rec.uB, existing.vB - rec.vB);
          if (dA > 1.5e-3 || dB > 1.5e-3) {
            seamPairs.push({
              uA1: existing.uA,
              vA1: existing.vA,
              uB1: existing.uB,
              vB1: existing.vB,
              uA2: rec.uA,
              vA2: rec.vA,
              uB2: rec.uB,
              vB2: rec.vB,
            });
          }
        }
      }
    }
  }

  const isAtlas =
    triList.length > 0 && minU >= -0.05 && maxU <= 1.05 && minV >= -0.05 && maxV <= 1.05;

  return {
    triangles: new Float32Array(triList),
    isAtlas,
    seamPairs,
  };
}

function uvToPixel(v: number, size: number, isAtlas: boolean): number {
  const coord = isAtlas ? Math.max(0, Math.min(0.999999, v)) : v - Math.floor(v);
  return Math.max(0, Math.min(size - 1, Math.floor(coord * size)));
}

function rasterizeUvMask(triangles: Float32Array, size: number): Uint8Array {
  const mask = new Uint8Array(size * size);
  const triCount = triangles.length / 6;

  for (let t = 0; t < triCount; t++) {
    const o = t * 6;
    const x0 = triangles[o + 0] * size;
    const y0 = triangles[o + 1] * size;
    const x1 = triangles[o + 2] * size;
    const y1 = triangles[o + 3] * size;
    const x2 = triangles[o + 4] * size;
    const y2 = triangles[o + 5] * size;

    const minX = Math.max(0, Math.floor(Math.min(x0, x1, x2)) - 1);
    const maxX = Math.min(size - 1, Math.ceil(Math.max(x0, x1, x2)) + 1);
    const minY = Math.max(0, Math.floor(Math.min(y0, y1, y2)) - 1);
    const maxY = Math.min(size - 1, Math.ceil(Math.max(y0, y1, y2)) + 1);

    const area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
    if (Math.abs(area) < 1e-4) {
      const px0 = Math.max(0, Math.min(size - 1, Math.round(x0)));
      const py0 = Math.max(0, Math.min(size - 1, Math.round(y0)));
      const px1 = Math.max(0, Math.min(size - 1, Math.round(x1)));
      const py1 = Math.max(0, Math.min(size - 1, Math.round(y1)));
      const px2 = Math.max(0, Math.min(size - 1, Math.round(x2)));
      const py2 = Math.max(0, Math.min(size - 1, Math.round(y2)));
      mask[py0 * size + px0] = 1;
      mask[py1 * size + px1] = 1;
      mask[py2 * size + px2] = 1;
      continue;
    }

    const invArea = 1 / area;
    // Slight conservative rasterization so boundary texels sit inside triMask for feathering
    const pad = 0.5 / Math.max(1, Math.sqrt(Math.abs(area)));

    for (let py = minY; py <= maxY; py++) {
      const cy = py + 0.5;
      for (let px = minX; px <= maxX; px++) {
        const cx = px + 0.5;
        const w0 = ((x1 - cx) * (y2 - cy) - (x2 - cx) * (y1 - cy)) * invArea;
        const w1 = ((x2 - cx) * (y0 - cy) - (x0 - cx) * (y2 - cy)) * invArea;
        const w2 = 1 - w0 - w1;
        if (w0 >= -pad && w1 >= -pad && w2 >= -pad) {
          mask[py * size + px] = 1;
        }
      }
    }
  }

  return mask;
}

function dilateBfsOutward(
  bytes: Uint8Array,
  validMask: Uint8Array,
  size: number,
  maxRadius: number,
  isNormal: boolean,
) {
  const total = size * size;
  const dist = new Int16Array(total);
  dist.fill(-1);

  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  for (let i = 0; i < total; i++) {
    if (validMask[i] === 1) {
      dist[i] = 0;
      queue[tail++] = i;
    }
  }

  if (tail === 0 || tail === total) return;

  const dx = [-1, 0, 1, -1, 1, -1, 0, 1];
  const dy = [-1, -1, -1, 0, 0, 1, 1, 1];

  while (head < tail) {
    const idx = queue[head++];
    const d = dist[idx];
    if (d >= maxRadius) continue;

    const x = idx % size;
    const y = (idx - x) / size;

    for (let k = 0; k < 8; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];
      if (nx < 0 || nx >= size || ny < 0 || ny >= size) continue;
      const nIdx = ny * size + nx;
      if (dist[nIdx] !== -1) continue;

      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let count = 0;

      for (let m = 0; m < 8; m++) {
        const ax = nx + dx[m];
        const ay = ny + dy[m];
        if (ax < 0 || ax >= size || ay < 0 || ay >= size) continue;
        const aIdx = ay * size + ax;
        if (dist[aIdx] !== -1 && dist[aIdx] <= d) {
          const p = aIdx * 4;
          if (isNormal) {
            sumR += bytes[p + 0] - 128;
            sumG += bytes[p + 1] - 128;
            sumB += bytes[p + 2] - 128;
          } else {
            sumR += bytes[p + 0];
            sumG += bytes[p + 1];
            sumB += bytes[p + 2];
          }
          count++;
        }
      }

      if (count > 0) {
        const dstP = nIdx * 4;
        if (isNormal) {
          const nxV = sumR / count;
          const nyV = sumG / count;
          const nzV = sumB / count;
          const len = Math.hypot(nxV, nyV, nzV) || 1;
          bytes[dstP + 0] = Math.max(0, Math.min(255, Math.round((nxV / len) * 127 + 128)));
          bytes[dstP + 1] = Math.max(0, Math.min(255, Math.round((nyV / len) * 127 + 128)));
          bytes[dstP + 2] = Math.max(0, Math.min(255, Math.round((nzV / len) * 127 + 128)));
        } else {
          bytes[dstP + 0] = Math.round(sumR / count);
          bytes[dstP + 1] = Math.round(sumG / count);
          bytes[dstP + 2] = Math.round(sumB / count);
        }
        bytes[dstP + 3] = 255;
        dist[nIdx] = d + 1;
        queue[tail++] = nIdx;
      }
    }
  }
}

function sampleInteriorNeighbor(
  bytes: Uint8Array,
  interiorMask: Uint8Array,
  cx: number,
  cy: number,
  size: number,
  isNormal: boolean,
): [number, number, number] {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let wSum = 0;

  for (let dy = -3; dy <= 3; dy++) {
    const y = cy + dy;
    if (y < 0 || y >= size) continue;
    for (let dx = -3; dx <= 3; dx++) {
      const x = cx + dx;
      if (x < 0 || x >= size) continue;
      const idx = y * size + x;
      if (interiorMask[idx] === 0) continue;
      const w = 1 / (1 + dx * dx + dy * dy);
      const p = idx * 4;
      if (isNormal) {
        sumR += (bytes[p + 0] - 128) * w;
        sumG += (bytes[p + 1] - 128) * w;
        sumB += (bytes[p + 2] - 128) * w;
      } else {
        sumR += bytes[p + 0] * w;
        sumG += bytes[p + 1] * w;
        sumB += bytes[p + 2] * w;
      }
      wSum += w;
    }
  }

  if (wSum <= 0) {
    const p = (cy * size + cx) * 4;
    return [bytes[p + 0], bytes[p + 1], bytes[p + 2]];
  }
  if (isNormal) {
    const len = Math.hypot(sumR, sumG, sumB) || 1;
    return [
      Math.max(0, Math.min(255, Math.round((sumR / len) * 127 + 128))),
      Math.max(0, Math.min(255, Math.round((sumG / len) * 127 + 128))),
      Math.max(0, Math.min(255, Math.round((sumB / len) * 127 + 128))),
    ];
  }
  return [sumR / wSum, sumG / wSum, sumB / wSum];
}

/**
 * Feathers UV seams across shared 3D edges and dilates UV island borders outward into
 * empty/transparent/dark atlas gutters so bilinear filtering and ray tracing produce zero seam streaks.
 */
export function processTextureAtlasEdges(
  bytes: Uint8Array,
  origAlpha: Uint8Array,
  size: number,
  isNormal: boolean,
  uvInfo?: GeometryUVInfo,
) {
  const total = size * size;
  const validMask = new Uint8Array(total);

  if (uvInfo && uvInfo.triangles.length > 0 && uvInfo.isAtlas) {
    const triMask = rasterizeUvMask(uvInfo.triangles, size);
    let anyValid = false;
    for (let i = 0; i < total; i++) {
      if (triMask[i] === 1 && origAlpha[i] >= 230) {
        validMask[i] = 1;
        anyValid = true;
      }
    }
    if (!anyValid) {
      validMask.fill(1);
    }

    // Build strict interior mask (eroded by 1px from island borders)
    const interiorMask = new Uint8Array(total);
    for (let y = 1; y < size - 1; y++) {
      for (let x = 1; x < size - 1; x++) {
        const i = y * size + x;
        if (
          validMask[i] === 1 &&
          validMask[i - 1] === 1 &&
          validMask[i + 1] === 1 &&
          validMask[i - size] === 1 &&
          validMask[i + size] === 1
        ) {
          interiorMask[i] = 1;
        }
      }
    }

    // Clean any 1px UV-border pixels whose luminance was darkened by downsampling over black atlas gutters
    if (!isNormal) {
      const cleanCopy = new Uint8Array(bytes);
      for (let y = 1; y < size - 1; y++) {
        for (let x = 1; x < size - 1; x++) {
          const i = y * size + x;
          if (validMask[i] === 1 && interiorMask[i] === 0) {
            const p = i * 4;
            const lum = cleanCopy[p] * 0.299 + cleanCopy[p + 1] * 0.587 + cleanCopy[p + 2] * 0.114;
            let nSumR = 0;
            let nSumG = 0;
            let nSumB = 0;
            let nCount = 0;
            let nMaxLum = 0;
            for (let oy = -1; oy <= 1; oy++) {
              for (let ox = -1; ox <= 1; ox++) {
                const ni = (y + oy) * size + (x + ox);
                if (interiorMask[ni] === 1) {
                  const np = ni * 4;
                  const nLum = cleanCopy[np] * 0.299 + cleanCopy[np + 1] * 0.587 + cleanCopy[np + 2] * 0.114;
                  if (nLum > nMaxLum) nMaxLum = nLum;
                  nSumR += cleanCopy[np];
                  nSumG += cleanCopy[np + 1];
                  nSumB += cleanCopy[np + 2];
                  nCount++;
                }
              }
            }
            if (nCount > 0 && lum < nMaxLum * 0.78) {
              bytes[p + 0] = Math.round(nSumR / nCount);
              bytes[p + 1] = Math.round(nSumG / nCount);
              bytes[p + 2] = Math.round(nSumB / nCount);
            }
          }
        }
      }
    }

    // Feather across all 3D UV seam pairs
    if (uvInfo.seamPairs.length > 0) {
      const srcCopy = new Uint8Array(bytes);
      const featherFalloff = [0.92, 0.62, 0.30, 0.12]; // d = 0, 1, 2, 3 px

      const blendPixel = (
        px: number,
        py: number,
        tR: number,
        tG: number,
        tB: number,
        alphaW: number,
      ) => {
        if (px < 0 || px >= size || py < 0 || py >= size) return;
        const idx = py * size + px;
        if (validMask[idx] === 0) return;
        const p = idx * 4;
        const inv = 1 - alphaW;
        if (isNormal) {
          const nx = (srcCopy[p + 0] - 128) * inv + (tR - 128) * alphaW;
          const ny = (srcCopy[p + 1] - 128) * inv + (tG - 128) * alphaW;
          const nz = (srcCopy[p + 2] - 128) * inv + (tB - 128) * alphaW;
          const len = Math.hypot(nx, ny, nz) || 1;
          bytes[p + 0] = Math.max(0, Math.min(255, Math.round((nx / len) * 127 + 128)));
          bytes[p + 1] = Math.max(0, Math.min(255, Math.round((ny / len) * 127 + 128)));
          bytes[p + 2] = Math.max(0, Math.min(255, Math.round((nz / len) * 127 + 128)));
        } else {
          bytes[p + 0] = Math.round(srcCopy[p + 0] * inv + tR * alphaW);
          bytes[p + 1] = Math.round(srcCopy[p + 1] * inv + tG * alphaW);
          bytes[p + 2] = Math.round(srcCopy[p + 2] * inv + tB * alphaW);
        }
      };

      for (const seam of uvInfo.seamPairs) {
        const len1 = Math.hypot(seam.uB1 - seam.uA1, seam.vB1 - seam.vA1) * size;
        const len2 = Math.hypot(seam.uB2 - seam.uA2, seam.vB2 - seam.vA2) * size;
        const steps = Math.max(2, Math.min(1024, Math.ceil(Math.max(len1, len2))));

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const x1 = uvToPixel(seam.uA1 + (seam.uB1 - seam.uA1) * t, size, true);
          const y1 = uvToPixel(seam.vA1 + (seam.vB1 - seam.vA1) * t, size, true);
          const x2 = uvToPixel(seam.uA2 + (seam.uB2 - seam.uA2) * t, size, true);
          const y2 = uvToPixel(seam.vA2 + (seam.vB2 - seam.vA2) * t, size, true);

          const c1 = sampleInteriorNeighbor(srcCopy, interiorMask, x1, y1, size, isNormal);
          const c2 = sampleInteriorNeighbor(srcCopy, interiorMask, x2, y2, size, isNormal);

          // For albedo & roughness: cross-average both sides of the 3D seam so transitions are continuous.
          // For tangent-space normal maps: keep each island's own interior normal (avoid mixing rotated tangents).
          const tgt1 = isNormal
            ? c1
            : [(c1[0] + c2[0]) * 0.5, (c1[1] + c2[1]) * 0.5, (c1[2] + c2[2]) * 0.5];
          const tgt2 = isNormal ? c2 : tgt1;

          for (let oy = -3; oy <= 3; oy++) {
            for (let ox = -3; ox <= 3; ox++) {
              const d = Math.round(Math.hypot(ox, oy));
              if (d >= featherFalloff.length) continue;
              const w = isNormal ? featherFalloff[d] * 0.88 : featherFalloff[d];
              blendPixel(x1 + ox, y1 + oy, tgt1[0], tgt1[1], tgt1[2], w);
              blendPixel(x2 + ox, y2 + oy, tgt2[0], tgt2[1], tgt2[2], w);
            }
          }
        }
      }
    }

    // Dilate freshly feathered island borders 14px outward into empty UV gutter
    dilateBfsOutward(bytes, validMask, size, 14, isNormal);
  } else {
    // Non-atlas or no UV metadata: still dilate any transparent pixels cleanly
    let hasInvalid = false;
    for (let i = 0; i < total; i++) {
      if (origAlpha[i] >= 230) {
        validMask[i] = 1;
      } else {
        hasInvalid = true;
      }
    }
    if (hasInvalid) {
      dilateBfsOutward(bytes, validMask, size, 14, isNormal);
    }
  }
}

