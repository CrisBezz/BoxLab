import * as THREE from 'three';

export interface BVHBuildResult {
  triangleCount: number;
  nodeCount: number;
  bvhTexture: THREE.DataTexture;
  triPosTexture: THREE.DataTexture;
  triNormTexture: THREE.DataTexture;
  triUvTexture: THREE.DataTexture;
  texWidth: number;
  bvhTexHeight: number;
  triTexHeight: number;
  materialIdToIndex: Map<string, number>;
}

interface TriTemp {
  v0x: number;
  v0y: number;
  v0z: number;
  v1x: number;
  v1y: number;
  v1z: number;
  v2x: number;
  v2y: number;
  v2z: number;
  n0x: number;
  n0y: number;
  n0z: number;
  n1x: number;
  n1y: number;
  n1z: number;
  n2x: number;
  n2y: number;
  n2z: number;
  u0: number;
  v0: number;
  u1: number;
  v1: number;
  u2: number;
  v2: number;
  cx: number;
  cy: number;
  cz: number;
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  matIdx: number;
}

interface BVHNode {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  leftFirst: number;
  triCount: number;
}

const TEX_WIDTH = 1024;
const MAX_MATERIALS = 24;

function packDataTexture(data: Float32Array, width: number, height: number): THREE.DataTexture {
  const tex = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

export function buildSceneBVH(root: THREE.Object3D): BVHBuildResult {
  root.updateMatrixWorld(true);

  const tris: TriTemp[] = [];
  const materialIdToIndex = new Map<string, number>();

  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();
  const nA = new THREE.Vector3();
  const nB = new THREE.Vector3();
  const nC = new THREE.Vector3();
  const e1 = new THREE.Vector3();
  const e2 = new THREE.Vector3();
  const faceN = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry || !mesh.visible) return;
    if (mesh.userData.excludeFromRaytracer) return;

    const geom = mesh.geometry as THREE.BufferGeometry;
    const posAttr = geom.getAttribute('position');
    if (!posAttr) return;

    const normAttr = geom.getAttribute('normal');
    const uvAttr = geom.getAttribute('uv');
    const indexAttr = geom.getIndex();

    const matId = String(mesh.userData.materialId || 'default');
    let matIdx = materialIdToIndex.get(matId);
    if (matIdx === undefined) {
      matIdx = Math.min(materialIdToIndex.size, MAX_MATERIALS - 1);
      materialIdToIndex.set(matId, matIdx);
    }

    const mw = mesh.matrixWorld;
    normalMatrix.getNormalMatrix(mw);

    const triTotal = indexAttr ? Math.floor(indexAttr.count / 3) : Math.floor(posAttr.count / 3);

    for (let t = 0; t < triTotal; t++) {
      const i0 = indexAttr ? indexAttr.getX(t * 3) : t * 3;
      const i1 = indexAttr ? indexAttr.getX(t * 3 + 1) : t * 3 + 1;
      const i2 = indexAttr ? indexAttr.getX(t * 3 + 2) : t * 3 + 2;

      vA.fromBufferAttribute(posAttr, i0).applyMatrix4(mw);
      vB.fromBufferAttribute(posAttr, i1).applyMatrix4(mw);
      vC.fromBufferAttribute(posAttr, i2).applyMatrix4(mw);

      // Skip degenerate zero-area triangles
      e1.subVectors(vB, vA);
      e2.subVectors(vC, vA);
      faceN.crossVectors(e1, e2);
      if (faceN.lengthSq() < 1e-12) continue;

      if (normAttr) {
        nA.fromBufferAttribute(normAttr, i0).applyMatrix3(normalMatrix).normalize();
        nB.fromBufferAttribute(normAttr, i1).applyMatrix3(normalMatrix).normalize();
        nC.fromBufferAttribute(normAttr, i2).applyMatrix3(normalMatrix).normalize();
      } else {
        faceN.normalize();
        nA.copy(faceN);
        nB.copy(faceN);
        nC.copy(faceN);
      }

      let u0 = 0,
        v0 = 0,
        u1 = 0,
        v1 = 0,
        u2 = 0,
        v2 = 0;
      if (uvAttr) {
        u0 = uvAttr.getX(i0);
        v0 = uvAttr.getY(i0);
        u1 = uvAttr.getX(i1);
        v1 = uvAttr.getY(i1);
        u2 = uvAttr.getX(i2);
        v2 = uvAttr.getY(i2);
      } else {
        // Automatic box-projected UVs for meshes without UV channel
        const ax = Math.abs(faceN.x);
        const ay = Math.abs(faceN.y);
        const az = Math.abs(faceN.z);
        if (ay >= ax && ay >= az) {
          const sy = faceN.y >= 0 ? -1 : 1;
          u0 = vA.x; v0 = vA.z * sy;
          u1 = vB.x; v1 = vB.z * sy;
          u2 = vC.x; v2 = vC.z * sy;
        } else if (ax >= ay && ax >= az) {
          const sx = faceN.x >= 0 ? -1 : 1;
          u0 = vA.z * sx; v0 = vA.y;
          u1 = vB.z * sx; v1 = vB.y;
          u2 = vC.z * sx; v2 = vC.y;
        } else {
          const sz = faceN.z >= 0 ? 1 : -1;
          u0 = vA.x * sz; v0 = vA.y;
          u1 = vB.x * sz; v1 = vB.y;
          u2 = vC.x * sz; v2 = vC.y;
        }
      }

      tris.push({
        v0x: vA.x,
        v0y: vA.y,
        v0z: vA.z,
        v1x: vB.x,
        v1y: vB.y,
        v1z: vB.z,
        v2x: vC.x,
        v2y: vC.y,
        v2z: vC.z,
        n0x: nA.x,
        n0y: nA.y,
        n0z: nA.z,
        n1x: nB.x,
        n1y: nB.y,
        n1z: nB.z,
        n2x: nC.x,
        n2y: nC.y,
        n2z: nC.z,
        u0,
        v0,
        u1,
        v1,
        u2,
        v2,
        cx: (vA.x + vB.x + vC.x) / 3,
        cy: (vA.y + vB.y + vC.y) / 3,
        cz: (vA.z + vB.z + vC.z) / 3,
        minX: Math.min(vA.x, vB.x, vC.x),
        minY: Math.min(vA.y, vB.y, vC.y),
        minZ: Math.min(vA.z, vB.z, vC.z),
        maxX: Math.max(vA.x, vB.x, vC.x),
        maxY: Math.max(vA.y, vB.y, vC.y),
        maxZ: Math.max(vA.z, vB.z, vC.z),
        matIdx,
      });
    }
  });

  if (tris.length === 0) {
    // Fallback empty triangle so texture creation never fails
    const bvhData = new Float32Array(TEX_WIDTH * 4);
    const triPosData = new Float32Array(TEX_WIDTH * 4);
    const triNormData = new Float32Array(TEX_WIDTH * 4);
    const triUvData = new Float32Array(TEX_WIDTH * 4);
    return {
      triangleCount: 0,
      nodeCount: 1,
      bvhTexture: packDataTexture(bvhData, TEX_WIDTH, 1),
      triPosTexture: packDataTexture(triPosData, TEX_WIDTH, 1),
      triNormTexture: packDataTexture(triNormData, TEX_WIDTH, 1),
      triUvTexture: packDataTexture(triUvData, TEX_WIDTH, 1),
      texWidth: TEX_WIDTH,
      bvhTexHeight: 1,
      triTexHeight: 1,
      materialIdToIndex,
    };
  }

  const triIndices = new Int32Array(tris.length);
  for (let i = 0; i < tris.length; i++) triIndices[i] = i;

  const nodes: BVHNode[] = new Array(tris.length * 2 + 2);
  let nodesUsed = 1;

  function updateNodeBounds(nodeIdx: number, first: number, count: number) {
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity;
    let maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    for (let i = 0; i < count; i++) {
      const t = tris[triIndices[first + i]];
      if (t.minX < minX) minX = t.minX;
      if (t.minY < minY) minY = t.minY;
      if (t.minZ < minZ) minZ = t.minZ;
      if (t.maxX > maxX) maxX = t.maxX;
      if (t.maxY > maxY) maxY = t.maxY;
      if (t.maxZ > maxZ) maxZ = t.maxZ;
    }

    nodes[nodeIdx] = {
      minX: minX - 1e-4,
      minY: minY - 1e-4,
      minZ: minZ - 1e-4,
      maxX: maxX + 1e-4,
      maxY: maxY + 1e-4,
      maxZ: maxZ + 1e-4,
      leftFirst: first,
      triCount: count,
    };
  }

  const BINS = 8;
  const binMinX = new Float64Array(BINS);
  const binMinY = new Float64Array(BINS);
  const binMinZ = new Float64Array(BINS);
  const binMaxX = new Float64Array(BINS);
  const binMaxY = new Float64Array(BINS);
  const binMaxZ = new Float64Array(BINS);
  const binCount = new Int32Array(BINS);
  const rightArea = new Float64Array(BINS - 1);
  const rightCount = new Int32Array(BINS - 1);

  function surfaceArea(
    minX: number,
    minY: number,
    minZ: number,
    maxX: number,
    maxY: number,
    maxZ: number,
  ): number {
    const dx = maxX - minX;
    const dy = maxY - minY;
    const dz = maxZ - minZ;
    if (dx <= 0 && dy <= 0 && dz <= 0) return 0;
    return 2 * (dx * dy + dy * dz + dz * dx);
  }

  function subdivide(nodeIdx: number, depth: number) {
    const node = nodes[nodeIdx];
    const first = node.leftFirst;
    const count = node.triCount;
    if (count <= 2 || depth >= 26) return;

    // Binned SAH across 3 axes
    let bestAxis = -1;
    let bestSplitPos = 0;
    let bestCost = Infinity;

    const parentArea = surfaceArea(
      node.minX,
      node.minY,
      node.minZ,
      node.maxX,
      node.maxY,
      node.maxZ,
    );
    const leafCost = count;

    for (let axis = 0; axis < 3; axis++) {
      let cMin = Infinity;
      let cMax = -Infinity;
      for (let i = 0; i < count; i++) {
        const t = tris[triIndices[first + i]];
        const c = axis === 0 ? t.cx : axis === 1 ? t.cy : t.cz;
        if (c < cMin) cMin = c;
        if (c > cMax) cMax = c;
      }
      if (cMax - cMin < 1e-6) continue;

      binCount.fill(0);
      for (let b = 0; b < BINS; b++) {
        binMinX[b] = Infinity;
        binMinY[b] = Infinity;
        binMinZ[b] = Infinity;
        binMaxX[b] = -Infinity;
        binMaxY[b] = -Infinity;
        binMaxZ[b] = -Infinity;
      }

      const scale = BINS / (cMax - cMin);
      for (let i = 0; i < count; i++) {
        const t = tris[triIndices[first + i]];
        const c = axis === 0 ? t.cx : axis === 1 ? t.cy : t.cz;
        const b = Math.min(BINS - 1, Math.floor((c - cMin) * scale));
        binCount[b]++;
        if (t.minX < binMinX[b]) binMinX[b] = t.minX;
        if (t.minY < binMinY[b]) binMinY[b] = t.minY;
        if (t.minZ < binMinZ[b]) binMinZ[b] = t.minZ;
        if (t.maxX > binMaxX[b]) binMaxX[b] = t.maxX;
        if (t.maxY > binMaxY[b]) binMaxY[b] = t.maxY;
        if (t.maxZ > binMaxZ[b]) binMaxZ[b] = t.maxZ;
      }

      // Sweep right-to-left
      let rMinX = Infinity,
        rMinY = Infinity,
        rMinZ = Infinity;
      let rMaxX = -Infinity,
        rMaxY = -Infinity,
        rMaxZ = -Infinity;
      let rCnt = 0;
      for (let b = BINS - 1; b > 0; b--) {
        if (binCount[b] > 0) {
          rCnt += binCount[b];
          if (binMinX[b] < rMinX) rMinX = binMinX[b];
          if (binMinY[b] < rMinY) rMinY = binMinY[b];
          if (binMinZ[b] < rMinZ) rMinZ = binMinZ[b];
          if (binMaxX[b] > rMaxX) rMaxX = binMaxX[b];
          if (binMaxY[b] > rMaxY) rMaxY = binMaxY[b];
          if (binMaxZ[b] > rMaxZ) rMaxZ = binMaxZ[b];
        }
        rightCount[b - 1] = rCnt;
        rightArea[b - 1] = rCnt > 0 ? surfaceArea(rMinX, rMinY, rMinZ, rMaxX, rMaxY, rMaxZ) : 0;
      }

      // Sweep left-to-right
      let lMinX = Infinity,
        lMinY = Infinity,
        lMinZ = Infinity;
      let lMaxX = -Infinity,
        lMaxY = -Infinity,
        lMaxZ = -Infinity;
      let lCnt = 0;
      const invParent = parentArea > 1e-8 ? 1 / parentArea : 1;

      for (let b = 0; b < BINS - 1; b++) {
        if (binCount[b] > 0) {
          lCnt += binCount[b];
          if (binMinX[b] < lMinX) lMinX = binMinX[b];
          if (binMinY[b] < lMinY) lMinY = binMinY[b];
          if (binMinZ[b] < lMinZ) lMinZ = binMinZ[b];
          if (binMaxX[b] > lMaxX) lMaxX = binMaxX[b];
          if (binMaxY[b] > lMaxY) lMaxY = binMaxY[b];
          if (binMaxZ[b] > lMaxZ) lMaxZ = binMaxZ[b];
        }
        const rC = rightCount[b];
        if (lCnt === 0 || rC === 0) continue;
        const lArea = surfaceArea(lMinX, lMinY, lMinZ, lMaxX, lMaxY, lMaxZ);
        const cost = 0.5 + (lCnt * lArea + rC * rightArea[b]) * invParent;
        if (cost < bestCost) {
          bestCost = cost;
          bestAxis = axis;
          bestSplitPos = cMin + ((b + 1) / BINS) * (cMax - cMin);
        }
      }
    }

    if (bestAxis === -1 || (bestCost >= leafCost && count <= 4)) {
      return;
    }

    // Partition in-place
    let i = first;
    let j = first + count - 1;
    while (i <= j) {
      const t = tris[triIndices[i]];
      const c = bestAxis === 0 ? t.cx : bestAxis === 1 ? t.cy : t.cz;
      if (c < bestSplitPos) {
        i++;
      } else {
        const tmp = triIndices[i];
        triIndices[i] = triIndices[j];
        triIndices[j] = tmp;
        j--;
      }
    }

    const leftCount = i - first;
    if (leftCount === 0 || leftCount === count) {
      // Fallback median split on largest extent
      const ex = node.maxX - node.minX;
      const ey = node.maxY - node.minY;
      const ez = node.maxZ - node.minZ;
      const fallbackAxis = ex >= ey && ex >= ez ? 0 : ey >= ez ? 1 : 2;
      const slice = triIndices.subarray(first, first + count);
      slice.sort((a, b) => {
        const ta = tris[a];
        const tb = tris[b];
        return fallbackAxis === 0
          ? ta.cx - tb.cx
          : fallbackAxis === 1
            ? ta.cy - tb.cy
            : ta.cz - tb.cz;
      });
    }

    const finalLeftCount = leftCount === 0 || leftCount === count ? Math.floor(count / 2) : leftCount;
    const leftChildIdx = nodesUsed++;
    const rightChildIdx = nodesUsed++;

    updateNodeBounds(leftChildIdx, first, finalLeftCount);
    updateNodeBounds(rightChildIdx, first + finalLeftCount, count - finalLeftCount);

    node.leftFirst = leftChildIdx;
    node.triCount = 0; // internal node marker

    subdivide(leftChildIdx, depth + 1);
    subdivide(rightChildIdx, depth + 1);
  }

  updateNodeBounds(0, 0, tris.length);
  subdivide(0, 0);

  // Pack BVH nodes: 2 RGBA texels per node
  const totalNodeTexels = nodesUsed * 2;
  const bvhTexHeight = Math.max(1, Math.ceil(totalNodeTexels / TEX_WIDTH));
  const bvhData = new Float32Array(TEX_WIDTH * bvhTexHeight * 4);

  for (let i = 0; i < nodesUsed; i++) {
    const n = nodes[i];
    const base = i * 8;
    bvhData[base + 0] = n.minX;
    bvhData[base + 1] = n.minY;
    bvhData[base + 2] = n.minZ;
    bvhData[base + 3] = n.leftFirst;
    bvhData[base + 4] = n.maxX;
    bvhData[base + 5] = n.maxY;
    bvhData[base + 6] = n.maxZ;
    bvhData[base + 7] = n.triCount;
  }

  // Pack triangles in reordered triIndices order: 3 RGBA texels per triangle
  const totalTriTexels = tris.length * 3;
  const triTexHeight = Math.max(1, Math.ceil(totalTriTexels / TEX_WIDTH));
  const triPosData = new Float32Array(TEX_WIDTH * triTexHeight * 4);
  const triNormData = new Float32Array(TEX_WIDTH * triTexHeight * 4);

  const uvTexHeight = Math.max(1, Math.ceil((tris.length * 2) / TEX_WIDTH));
  const triUvData = new Float32Array(TEX_WIDTH * uvTexHeight * 4);

  for (let t = 0; t < tris.length; t++) {
    const tri = tris[triIndices[t]];
    const base = t * 12;

    triPosData[base + 0] = tri.v0x;
    triPosData[base + 1] = tri.v0y;
    triPosData[base + 2] = tri.v0z;
    triPosData[base + 3] = tri.matIdx;
    triPosData[base + 4] = tri.v1x;
    triPosData[base + 5] = tri.v1y;
    triPosData[base + 6] = tri.v1z;
    triPosData[base + 7] = 0;
    triPosData[base + 8] = tri.v2x;
    triPosData[base + 9] = tri.v2y;
    triPosData[base + 10] = tri.v2z;
    triPosData[base + 11] = 0;

    triNormData[base + 0] = tri.n0x;
    triNormData[base + 1] = tri.n0y;
    triNormData[base + 2] = tri.n0z;
    triNormData[base + 3] = 0;
    triNormData[base + 4] = tri.n1x;
    triNormData[base + 5] = tri.n1y;
    triNormData[base + 6] = tri.n1z;
    triNormData[base + 7] = 0;
    triNormData[base + 8] = tri.n2x;
    triNormData[base + 9] = tri.n2y;
    triNormData[base + 10] = tri.n2z;
    triNormData[base + 11] = 0;

    const uvBase = t * 8;
    triUvData[uvBase + 0] = tri.u0;
    triUvData[uvBase + 1] = tri.v0;
    triUvData[uvBase + 2] = tri.u1;
    triUvData[uvBase + 3] = tri.v1;
    triUvData[uvBase + 4] = tri.u2;
    triUvData[uvBase + 5] = tri.v2;
    triUvData[uvBase + 6] = 0;
    triUvData[uvBase + 7] = 0;
  }

  return {
    triangleCount: tris.length,
    nodeCount: nodesUsed,
    bvhTexture: packDataTexture(bvhData, TEX_WIDTH, bvhTexHeight),
    triPosTexture: packDataTexture(triPosData, TEX_WIDTH, triTexHeight),
    triNormTexture: packDataTexture(triNormData, TEX_WIDTH, triTexHeight),
    triUvTexture: packDataTexture(triUvData, TEX_WIDTH, uvTexHeight),
    texWidth: TEX_WIDTH,
    bvhTexHeight,
    triTexHeight,
    materialIdToIndex,
  };
}
