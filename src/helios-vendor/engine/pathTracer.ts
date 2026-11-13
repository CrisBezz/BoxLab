import * as THREE from 'three';
import { BVHBuildResult } from './bvh';
import { PbrTextureManager, PRESET_TO_LAYER } from './textures';
import {
  EnvironmentPreset,
  MaterialSpec,
  RayTracerSettings,
  StudioLight,
} from '../types/studio';
import { hexToLinearRgb, kelvinToRgb, sphericalToCartesian } from '../utils/color';

const MAX_LIGHTS = 4;
const MAX_MATERIALS = 24;

const FULLSCREEN_VERT = `precision highp float;
in vec3 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const PATHTRACE_FRAG = `precision highp float;
precision highp int;
precision highp sampler2DArray;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uPrevFrame;
uniform sampler2D uBvhTex;
uniform sampler2D uTriPosTex;
uniform sampler2D uTriNormTex;
uniform sampler2D uTriUvTex;

uniform sampler2DArray uAlbedoArray;
uniform sampler2DArray uNormalArray;
uniform sampler2DArray uRoughMetalArray;

uniform sampler2DArray uCustomAlbedoArray;
uniform sampler2DArray uCustomNormalArray;
uniform sampler2DArray uCustomRoughMetalArray;

uniform int uTexWidth;
uniform int uSampleIndex;
uniform int uMaxBounces;
uniform int uClayMode;
uniform int uEnvMode;
uniform float uEnvIntensity;
uniform vec2 uResolution;

uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;

// Light uniforms: posRadius = (x, y, z, radius), colorEnabled = (r, g, b, enabled ? 1.0 : 0.0)
uniform vec4 uLightPosRadius[${MAX_LIGHTS}];
uniform vec4 uLightColorEnabled[${MAX_LIGHTS}];

// Material uniforms: 4 vec4s per material
// matA = (albedo.r, albedo.g, albedo.b, roughness)
// matB = (metalness, ior, transmission, clearcoat)
// matC = (emissiveIntensity, 0, 0, 0)
// matD = (texSlice, uvScale, normalStrength, modeFlag: 0=preset, 1=custom tile, 2=custom atlas)
uniform vec4 uMatA[${MAX_MATERIALS}];
uniform vec4 uMatB[${MAX_MATERIALS}];
uniform vec4 uMatC[${MAX_MATERIALS}];
uniform vec4 uMatD[${MAX_MATERIALS}];

const float PI = 3.14159265359;
const float INF = 1e20;

// PCG hash RNG
uint rngState;

uint pcgHash(uint v) {
  uint state = v * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

float rand() {
  rngState = pcgHash(rngState);
  return float(rngState) / 4294967295.0;
}

vec4 fetchTexel(sampler2D tex, int idx) {
  int x = idx & 1023;
  int y = idx >> 10;
  return texelFetch(tex, ivec2(x, y), 0);
}

// AABB slab test
float intersectAABB(vec3 ro, vec3 invRd, vec3 bMin, vec3 bMax, float maxT) {
  vec3 t0 = (bMin - ro) * invRd;
  vec3 t1 = (bMax - ro) * invRd;
  vec3 tNear = min(t0, t1);
  vec3 tFar = max(t0, t1);
  float tEnter = max(max(tNear.x, tNear.y), max(tNear.z, 0.0002));
  float tExit = min(min(tFar.x, tFar.y), min(tFar.z, maxT));
  return tExit >= tEnter ? tEnter : INF;
}

// Moller-Trumbore ray-triangle intersection
bool intersectTriangle(
  vec3 ro,
  vec3 rd,
  vec3 v0,
  vec3 v1,
  vec3 v2,
  float maxT,
  out float outT,
  out float outU,
  out float outV
) {
  vec3 e1 = v1 - v0;
  vec3 e2 = v2 - v0;
  vec3 pvec = cross(rd, e2);
  float det = dot(e1, pvec);
  if (abs(det) < 1e-7) return false;
  float invDet = 1.0 / det;
  vec3 tvec = ro - v0;
  float u = dot(tvec, pvec) * invDet;
  if (u < 0.0 || u > 1.0) return false;
  vec3 qvec = cross(tvec, e1);
  float v = dot(rd, qvec) * invDet;
  if (v < 0.0 || u + v > 1.0) return false;
  float t = dot(e2, qvec) * invDet;
  if (t <= 0.0004 || t >= maxT) return false;
  outT = t;
  outU = u;
  outV = v;
  return true;
}

void buildONB(vec3 n, out vec3 t, out vec3 b) {
  vec3 up = abs(n.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
  t = normalize(cross(up, n));
  b = cross(n, t);
}

struct HitInfo {
  float t;
  vec3 pos;
  vec3 normal;
  vec3 geomNormal;
  vec2 uv;
  vec3 tangent;
  vec3 bitangent;
  int matIdx;
  bool isFloor;
  vec3 floorAlbedo;
  float floorRoughness;
};

bool intersectBVH(vec3 ro, vec3 rd, inout HitInfo hit) {
  vec3 invRd = 1.0 / (rd + vec3(
    abs(rd.x) < 1e-7 ? 1e-7 : 0.0,
    abs(rd.y) < 1e-7 ? 1e-7 : 0.0,
    abs(rd.z) < 1e-7 ? 1e-7 : 0.0
  ));

  int stack[32];
  int stackPtr = 0;
  stack[stackPtr++] = 0;

  bool found = false;

  while (stackPtr > 0) {
    int nodeIdx = stack[--stackPtr];
    vec4 n0 = fetchTexel(uBvhTex, nodeIdx * 2);
    vec4 n1 = fetchTexel(uBvhTex, nodeIdx * 2 + 1);

    float boxT = intersectAABB(ro, invRd, n0.xyz, n1.xyz, hit.t);
    if (boxT >= hit.t) continue;

    int leftFirst = int(n0.w + 0.5);
    int triCount = int(n1.w + 0.5);

    if (triCount > 0) {
      for (int i = 0; i < triCount; i++) {
        int triIdx = leftFirst + i;
        vec4 p0 = fetchTexel(uTriPosTex, triIdx * 3);
        vec4 p1 = fetchTexel(uTriPosTex, triIdx * 3 + 1);
        vec4 p2 = fetchTexel(uTriPosTex, triIdx * 3 + 2);

        float t, u, v;
        if (intersectTriangle(ro, rd, p0.xyz, p1.xyz, p2.xyz, hit.t, t, u, v)) {
          hit.t = t;
          hit.pos = ro + rd * t;
          hit.matIdx = int(p0.w + 0.5);
          hit.isFloor = false;

          vec4 nm0 = fetchTexel(uTriNormTex, triIdx * 3);
          vec4 nm1 = fetchTexel(uTriNormTex, triIdx * 3 + 1);
          vec4 nm2 = fetchTexel(uTriNormTex, triIdx * 3 + 2);
          float w = 1.0 - u - v;
          hit.normal = normalize(nm0.xyz * w + nm1.xyz * u + nm2.xyz * v);
          hit.geomNormal = normalize(cross(p1.xyz - p0.xyz, p2.xyz - p0.xyz));

          vec4 uv01 = fetchTexel(uTriUvTex, triIdx * 2);
          vec4 uv2x = fetchTexel(uTriUvTex, triIdx * 2 + 1);
          vec2 uv0 = uv01.xy;
          vec2 uv1 = uv01.zw;
          vec2 uv2 = uv2x.xy;
          hit.uv = uv0 * w + uv1 * u + uv2 * v;

          vec3 dp1 = p1.xyz - p0.xyz;
          vec3 dp2 = p2.xyz - p0.xyz;
          vec2 duv1 = uv1 - uv0;
          vec2 duv2 = uv2 - uv0;
          float detUV = duv1.x * duv2.y - duv2.x * duv1.y;
          if (abs(detUV) > 1e-8) {
            float signDet = detUV >= 0.0 ? 1.0 : -1.0;
            vec3 rawT = (dp1 * duv2.y - dp2 * duv1.y) * signDet;
            vec3 rawB = (dp2 * duv1.x - dp1 * duv2.x) * signDet;
            float t2 = dot(rawT, rawT);
            float b2 = dot(rawB, rawB);
            if (t2 > 1e-12 && b2 > 1e-12) {
              hit.tangent = rawT * inversesqrt(t2);
              hit.bitangent = rawB * inversesqrt(b2);
            } else {
              buildONB(hit.normal, hit.tangent, hit.bitangent);
            }
          } else {
            buildONB(hit.normal, hit.tangent, hit.bitangent);
          }

          found = true;
        }
      }
    } else {
      int leftChild = leftFirst;
      int rightChild = leftFirst + 1;

      vec4 l0 = fetchTexel(uBvhTex, leftChild * 2);
      vec4 l1 = fetchTexel(uBvhTex, leftChild * 2 + 1);
      vec4 r0 = fetchTexel(uBvhTex, rightChild * 2);
      vec4 r1 = fetchTexel(uBvhTex, rightChild * 2 + 1);

      float distL = intersectAABB(ro, invRd, l0.xyz, l1.xyz, hit.t);
      float distR = intersectAABB(ro, invRd, r0.xyz, r1.xyz, hit.t);

      if (distL < distR) {
        if (distR < hit.t && stackPtr < 31) stack[stackPtr++] = rightChild;
        if (distL < hit.t && stackPtr < 31) stack[stackPtr++] = leftChild;
      } else {
        if (distL < hit.t && stackPtr < 31) stack[stackPtr++] = leftChild;
        if (distR < hit.t && stackPtr < 31) stack[stackPtr++] = rightChild;
      }
    }
  }

  return found;
}

vec3 intersectShadow(vec3 ro, vec3 rd, float maxT) {
  vec3 invRd = 1.0 / (rd + vec3(
    abs(rd.x) < 1e-7 ? 1e-7 : 0.0,
    abs(rd.y) < 1e-7 ? 1e-7 : 0.0,
    abs(rd.z) < 1e-7 ? 1e-7 : 0.0
  ));

  int stack[32];
  int stackPtr = 0;
  stack[stackPtr++] = 0;

  vec3 visibility = vec3(1.0);

  while (stackPtr > 0) {
    int nodeIdx = stack[--stackPtr];
    vec4 n0 = fetchTexel(uBvhTex, nodeIdx * 2);
    vec4 n1 = fetchTexel(uBvhTex, nodeIdx * 2 + 1);

    float boxT = intersectAABB(ro, invRd, n0.xyz, n1.xyz, maxT);
    if (boxT >= maxT) continue;

    int leftFirst = int(n0.w + 0.5);
    int triCount = int(n1.w + 0.5);

    if (triCount > 0) {
      for (int i = 0; i < triCount; i++) {
        int triIdx = leftFirst + i;
        vec4 p0 = fetchTexel(uTriPosTex, triIdx * 3);
        vec4 p1 = fetchTexel(uTriPosTex, triIdx * 3 + 1);
        vec4 p2 = fetchTexel(uTriPosTex, triIdx * 3 + 2);

        float t, u, v;
        if (intersectTriangle(ro, rd, p0.xyz, p1.xyz, p2.xyz, maxT, t, u, v)) {
          int matIdx = clamp(int(p0.w + 0.5), 0, ${MAX_MATERIALS - 1});
          if (uClayMode == 1) {
            return vec3(0.0);
          }
          float trans = uMatB[matIdx].z;
          if (trans < 0.15) {
            return vec3(0.0);
          }
          // Glass lets tinted shadow light pass through (caustic approximation)
          vec3 tint = mix(vec3(0.85), uMatA[matIdx].rgb, 0.35);
          visibility *= tint * (0.45 + 0.45 * trans);
          if (max(visibility.r, max(visibility.g, visibility.b)) < 0.02) {
            return vec3(0.0);
          }
        }
      }
    } else {
      int leftChild = leftFirst;
      int rightChild = leftFirst + 1;
      if (stackPtr < 30) {
        stack[stackPtr++] = rightChild;
        stack[stackPtr++] = leftChild;
      }
    }
  }

  return visibility;
}

bool intersectStage(vec3 ro, vec3 rd, inout HitInfo hit) {
  bool anyHit = false;

  // Ground studio floor y = 0 (within 14m radius cyclorama)
  if (abs(rd.y) > 1e-5) {
    float tFloor = -ro.y / rd.y;
    if (tFloor > 0.0005 && tFloor < hit.t) {
      vec3 p = ro + rd * tFloor;
      float r2 = dot(p.xz, p.xz);
      if (r2 < 144.0) {
        hit.t = tFloor;
        hit.pos = p;
        hit.normal = vec3(0.0, 1.0, 0.0);
        hit.geomNormal = vec3(0.0, 1.0, 0.0);
        hit.matIdx = -1;
        hit.isFloor = true;

        if (uEnvMode == 3) {
          // Cornell box floor
          hit.floorAlbedo = vec3(0.55, 0.53, 0.50);
          hit.floorRoughness = 0.78;
        } else if (uEnvMode == 4) {
          // Obsidian dark floor
          hit.floorAlbedo = vec3(0.035, 0.038, 0.045);
          hit.floorRoughness = 0.28;
        } else {
          // Precision studio pedestal + subtle circular grid
          float dist = sqrt(r2);
          float ring = smoothstep(0.012, 0.0, abs(dist - 1.15)) * 0.06;
          float outerFade = smoothstep(5.5, 1.2, dist);
          vec3 centerCol = uEnvMode == 1 ? vec3(0.16, 0.14, 0.13) : vec3(0.11, 0.12, 0.14);
          vec3 edgeCol = vec3(0.05, 0.055, 0.065);
          hit.floorAlbedo = mix(edgeCol, centerCol, outerFade) + vec3(ring);
          hit.floorRoughness = mix(0.65, 0.34, outerFade);
        }
        anyHit = true;
      }
    }
  }

  // Cornell Box analytical enclosure (uEnvMode == 3)
  if (uEnvMode == 3) {
    float boxHalf = 2.6;
    float boxH = 3.2;

    // Back wall z = -boxHalf
    if (rd.z < -1e-5) {
      float t = (-boxHalf - ro.z) / rd.z;
      vec3 p = ro + rd * t;
      if (t > 0.0005 && t < hit.t && abs(p.x) < boxHalf && p.y > 0.0 && p.y < boxH) {
        hit.t = t; hit.pos = p; hit.normal = vec3(0.0, 0.0, 1.0); hit.geomNormal = hit.normal;
        hit.isFloor = true; hit.matIdx = -1;
        hit.floorAlbedo = vec3(0.58, 0.56, 0.54); hit.floorRoughness = 0.85;
        anyHit = true;
      }
    }
    // Left wall x = -boxHalf (muted terracotta red for classic GI color bleeding)
    if (rd.x < -1e-5) {
      float t = (-boxHalf - ro.x) / rd.x;
      vec3 p = ro + rd * t;
      if (t > 0.0005 && t < hit.t && abs(p.z) < boxHalf && p.y > 0.0 && p.y < boxH) {
        hit.t = t; hit.pos = p; hit.normal = vec3(1.0, 0.0, 0.0); hit.geomNormal = hit.normal;
        hit.isFloor = true; hit.matIdx = -1;
        hit.floorAlbedo = vec3(0.62, 0.22, 0.16); hit.floorRoughness = 0.85;
        anyHit = true;
      }
    }
    // Right wall x = +boxHalf (muted cobalt-teal for balanced GI color bleeding)
    if (rd.x > 1e-5) {
      float t = (boxHalf - ro.x) / rd.x;
      vec3 p = ro + rd * t;
      if (t > 0.0005 && t < hit.t && abs(p.z) < boxHalf && p.y > 0.0 && p.y < boxH) {
        hit.t = t; hit.pos = p; hit.normal = vec3(-1.0, 0.0, 0.0); hit.geomNormal = hit.normal;
        hit.isFloor = true; hit.matIdx = -1;
        hit.floorAlbedo = vec3(0.16, 0.38, 0.58); hit.floorRoughness = 0.85;
        anyHit = true;
      }
    }
    // Ceiling y = boxH
    if (rd.y > 1e-5) {
      float t = (boxH - ro.y) / rd.y;
      vec3 p = ro + rd * t;
      if (t > 0.0005 && t < hit.t && abs(p.x) < boxHalf && abs(p.z) < boxHalf) {
        hit.t = t; hit.pos = p; hit.normal = vec3(0.0, -1.0, 0.0); hit.geomNormal = hit.normal;
        hit.isFloor = true; hit.matIdx = -1;
        hit.floorAlbedo = vec3(0.62, 0.60, 0.58); hit.floorRoughness = 0.85;
        anyHit = true;
      }
    }
  }

  if (intersectBVH(ro, rd, hit)) {
    anyHit = true;
  }

  return anyHit;
}

vec3 sampleEnvironment(vec3 rd) {
  float y = clamp(rd.y, -1.0, 1.0);

  if (uEnvMode == 4) {
    // Obsidian void
    return vec3(0.012, 0.014, 0.018) * uEnvIntensity;
  }

  if (uEnvMode == 1) {
    // Golden hour sky + warm horizon sun disc
    vec3 skyTop = vec3(0.16, 0.28, 0.52);
    vec3 skyHorizon = vec3(0.95, 0.54, 0.26);
    vec3 groundCol = vec3(0.08, 0.06, 0.05);
    vec3 col = y > 0.0
      ? mix(skyHorizon, skyTop, pow(y, 0.55))
      : mix(skyHorizon * 0.35, groundCol, pow(-y, 0.5));
    vec3 sunDir = normalize(vec3(0.76, 0.24, 0.60));
    float sunAmt = max(0.0, dot(rd, sunDir));
    col += vec3(1.0, 0.72, 0.38) * (pow(sunAmt, 64.0) * 6.0 + pow(sunAmt, 8.0) * 0.45);
    return col * uEnvIntensity;
  }

  if (uEnvMode == 2) {
    // Architectural Loft (bright overhead skylight + soft side strips)
    vec3 base = mix(vec3(0.08, 0.09, 0.11), vec3(0.32, 0.36, 0.42), smoothstep(-0.2, 0.8, y));
    float skylight = smoothstep(0.55, 0.85, y) * smoothstep(0.6, 0.2, abs(rd.x));
    float stripL = smoothstep(0.7, 0.92, dot(rd, normalize(vec3(-0.8, 0.45, 0.35))));
    float stripR = smoothstep(0.75, 0.95, dot(rd, normalize(vec3(0.85, 0.35, 0.25))));
    return (base + vec3(2.8) * skylight + vec3(1.8, 1.75, 1.65) * stripL + vec3(1.5, 1.7, 2.0) * stripR) * uEnvIntensity;
  }

  if (uEnvMode == 3) {
    // Cornell ambient fallback
    return vec3(0.06, 0.06, 0.06) * uEnvIntensity;
  }

  // Default 0: Studio Cyclorama with calibrated warm/cool softbox panels
  vec3 bg = mix(vec3(0.035, 0.04, 0.048), vec3(0.11, 0.125, 0.15), smoothstep(-0.3, 0.7, y));
  float panelA = smoothstep(0.65, 0.88, dot(rd, normalize(vec3(0.55, 0.72, 0.42))));
  float panelB = smoothstep(0.65, 0.88, dot(rd, normalize(vec3(-0.72, 0.52, 0.38))));
  float topStrip = smoothstep(0.82, 0.96, y);
  bg += vec3(2.4, 2.25, 2.05) * panelA;
  bg += vec3(1.5, 1.75, 2.1) * panelB;
  bg += vec3(1.4, 1.45, 1.55) * topStrip;
  return bg * uEnvIntensity;
}

vec3 sampleCosineHemisphere(vec3 n, float r1, float r2) {
  float phi = 2.0 * PI * r1;
  float cosTheta = sqrt(1.0 - r2);
  float sinTheta = sqrt(r2);
  vec3 t, b;
  buildONB(n, t, b);
  return normalize(t * (cos(phi) * sinTheta) + b * (sin(phi) * sinTheta) + n * cosTheta);
}

vec3 sampleGGXHalf(vec3 n, float alpha, float r1, float r2) {
  float a2 = alpha * alpha;
  float phi = 2.0 * PI * r1;
  float cosTheta = sqrt((1.0 - r2) / (1.0 + (a2 - 1.0) * r2));
  float sinTheta = sqrt(max(0.0, 1.0 - cosTheta * cosTheta));
  vec3 t, b;
  buildONB(n, t, b);
  return normalize(t * (cos(phi) * sinTheta) + b * (sin(phi) * sinTheta) + n * cosTheta);
}

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
  return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

float distributionGGX(float NdotH, float alpha) {
  float a2 = alpha * alpha;
  float d = (NdotH * NdotH) * (a2 - 1.0) + 1.0;
  return a2 / max(PI * d * d, 1e-6);
}

float geometrySmith(float NdotV, float NdotL, float alpha) {
  float k = (alpha + 1.0);
  k = (k * k) / 8.0;
  float gV = NdotV / (NdotV * (1.0 - k) + k);
  float gL = NdotL / (NdotL * (1.0 - k) + k);
  return gV * gL;
}

vec3 evalDirectBRDF(
  vec3 N,
  vec3 V,
  vec3 L,
  vec3 albedo,
  float roughness,
  float metalness,
  float clearcoat
) {
  float NdotL = max(dot(N, L), 0.0);
  float NdotV = max(dot(N, V), 1e-4);
  if (NdotL <= 0.0) return vec3(0.0);

  vec3 H = normalize(V + L);
  float NdotH = max(dot(N, H), 0.0);
  float HdotV = max(dot(H, V), 0.0);

  float alpha = max(0.035, roughness * roughness);
  vec3 F0 = mix(vec3(0.04), albedo, metalness);
  vec3 F = fresnelSchlick(HdotV, F0);
  float D = distributionGGX(NdotH, alpha);
  float G = geometrySmith(NdotV, NdotL, alpha);

  vec3 specular = (D * G * F) / max(4.0 * NdotV * NdotL, 1e-4);
  vec3 kD = (vec3(1.0) - F) * (1.0 - metalness);
  vec3 diffuse = kD * albedo / PI;

  vec3 result = (diffuse + specular) * NdotL;

  if (clearcoat > 0.05) {
    float ccAlpha = 0.05;
    float ccD = distributionGGX(NdotH, ccAlpha);
    float ccG = geometrySmith(NdotV, NdotL, ccAlpha);
    float ccF = fresnelSchlick(HdotV, vec3(0.04)).r;
    result += vec3((ccD * ccG * ccF) / max(4.0 * NdotV * NdotL, 1e-4)) * clearcoat * NdotL;
  }

  return result;
}

vec3 randomSpherePoint(float r1, float r2) {
  float z = 1.0 - 2.0 * r1;
  float r = sqrt(max(0.0, 1.0 - z * z));
  float phi = 2.0 * PI * r2;
  return vec3(r * cos(phi), r * sin(phi), z);
}

void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  rngState = pcgHash(uint(px.x) * 1973u + uint(px.y) * 9277u + uint(uSampleIndex + 1) * 26699u);

  // Jittered camera ray for anti-aliasing
  vec2 jitter = vec2(rand() - 0.5, rand() - 0.5) / uResolution;
  vec2 ndc = (vUv + jitter) * 2.0 - 1.0;

  vec3 ro = uCamPos;
  vec3 rd = normalize(
    uCamForward +
    uCamRight * (ndc.x * uTanHalfFov * uAspect) +
    uCamUp * (ndc.y * uTanHalfFov)
  );

  vec3 radiance = vec3(0.0);
  vec3 throughput = vec3(1.0);

  for (int bounce = 0; bounce < 8; bounce++) {
    if (bounce >= uMaxBounces) break;

    HitInfo hit;
    hit.t = INF;
    hit.uv = vec2(0.0);
    hit.tangent = vec3(1.0, 0.0, 0.0);
    hit.bitangent = vec3(0.0, 1.0, 0.0);
    if (!intersectStage(ro, rd, hit)) {
      radiance += throughput * sampleEnvironment(rd);
      break;
    }

    bool entering = dot(rd, hit.geomNormal) < 0.0;
    vec3 N = entering ? hit.normal : -hit.normal;
    vec3 Ng = entering ? hit.geomNormal : -hit.geomNormal;
    if (dot(N, rd) > 0.0) N = -N;
    vec3 V = -rd;

    vec3 albedo;
    float roughness;
    float metalness;
    float ior = 1.5;
    float transmission = 0.0;
    float clearcoat = 0.0;
    float emissiveIntensity = 0.0;

    if (hit.isFloor) {
      albedo = hit.floorAlbedo;
      roughness = hit.floorRoughness;
      metalness = 0.0;
    } else if (uClayMode == 1) {
      int safeClayIdx = clamp(hit.matIdx, 0, ${MAX_MATERIALS - 1});
      albedo = vec3(0.76, 0.73, 0.69);
      roughness = 0.68;
      metalness = 0.0;
      emissiveIntensity = uMatC[safeClayIdx].x;
    } else {
      int safeMatIdx = clamp(hit.matIdx, 0, ${MAX_MATERIALS - 1});
      vec4 mA = uMatA[safeMatIdx];
      vec4 mB = uMatB[safeMatIdx];
      vec4 mC = uMatC[safeMatIdx];
      vec4 mD = uMatD[safeMatIdx];
      albedo = mA.rgb;
      roughness = clamp(mA.a, 0.025, 1.0);
      metalness = clamp(mB.x, 0.0, 1.0);
      ior = clamp(mB.y, 1.05, 2.4);
      transmission = clamp(mB.z, 0.0, 1.0);
      clearcoat = clamp(mB.w, 0.0, 1.0);
      emissiveIntensity = mC.x;

      if (mD.w > 0.5 || mD.x > 0.5) {
        vec2 tiledUv = hit.uv * mD.y;
        if (mD.w > 1.5 && abs(mD.y - 1.0) < 0.02) {
          tiledUv = clamp(tiledUv, vec2(0.5 / 1024.0), vec2(1.0 - 0.5 / 1024.0));
        }
        vec3 texCoords = vec3(tiledUv, mD.x);
        vec3 texAlbedo = mD.w > 0.5
          ? pow(texture(uCustomAlbedoArray, texCoords).rgb, vec3(2.2))
          : pow(texture(uAlbedoArray, texCoords).rgb, vec3(2.2));
        vec4 rm = mD.w > 0.5
          ? texture(uCustomRoughMetalArray, texCoords)
          : texture(uRoughMetalArray, texCoords);
        albedo *= texAlbedo;
        roughness = clamp(roughness * rm.g, 0.025, 1.0);
        if (mC.y > 0.5) metalness = clamp(metalness * rm.b, 0.0, 1.0);

        if (mD.z > 0.01) {
          vec3 nSample = mD.w > 0.5
            ? texture(uCustomNormalArray, texCoords).xyz
            : texture(uNormalArray, texCoords).xyz;
          vec3 nMap = nSample * 2.0 - 1.0;
          nMap.xy *= mD.z;
          vec3 T = hit.tangent - N * dot(N, hit.tangent);
          float tLen2 = dot(T, T);
          vec3 B;
          if (tLen2 > 1e-6) {
            T *= inversesqrt(tLen2);
            B = hit.bitangent - N * dot(N, hit.bitangent) - T * dot(T, hit.bitangent);
            float bLen2 = dot(B, B);
            B = bLen2 > 1e-6 ? B * inversesqrt(bLen2) : cross(N, T);
          } else {
            buildONB(N, T, B);
          }
          vec3 perturbedN = normalize(T * nMap.x + B * nMap.y + N * max(0.08, nMap.z));
          if (dot(perturbedN, V) < 0.02) {
            perturbedN = normalize(mix(N, perturbedN, 0.25));
          }
          if (dot(perturbedN, V) >= 0.01) {
            N = perturbedN;
          }
        }
      }
    }

    if (emissiveIntensity > 0.01) {
      radiance += throughput * albedo * emissiveIntensity;
      break;
    }

    // Dielectric glass / crystal refraction
    if (transmission > 0.15) {
      float eta = entering ? (1.0 / ior) : ior;
      float cosI = clamp(dot(V, N), 0.0, 1.0);
      float sinT2 = eta * eta * (1.0 - cosI * cosI);
      float F0g = pow((1.0 - ior) / (1.0 + ior), 2.0);
      float fresnel = F0g + (1.0 - F0g) * pow(1.0 - cosI, 5.0);

      // Direct specular highlight from studio lights on glass surface
      for (int li = 0; li < ${MAX_LIGHTS}; li++) {
        vec4 colEn = uLightColorEnabled[li];
        if (colEn.w < 0.5) continue;
        vec4 posRad = uLightPosRadius[li];
        vec3 lightPos = posRad.xyz + randomSpherePoint(rand(), rand()) * posRad.w;
        vec3 L = lightPos - hit.pos;
        float dist = length(L);
        L /= max(dist, 1e-4);
        float NdotL = max(dot(N, L), 0.0);
        if (NdotL > 0.0) {
          vec3 vis = intersectShadow(hit.pos + Ng * 0.001, L, dist);
          if (max(vis.r, max(vis.g, vis.b)) > 0.01) {
            vec3 H = normalize(V + L);
            float spec = pow(max(dot(N, H), 0.0), mix(180.0, 24.0, roughness));
            float atten = 1.0 / (dist * dist * 0.35 + 1.0);
            radiance += throughput * vis * colEn.rgb * spec * atten * 0.45;
          }
        }
      }

      if (sinT2 > 1.0 || rand() < fresnel) {
        vec3 reflDir = reflect(rd, N);
        if (roughness > 0.04) {
          reflDir = normalize(mix(reflDir, sampleGGXHalf(N, roughness * roughness, rand(), rand()), 0.35));
        }
        ro = hit.pos + Ng * 0.001;
        rd = reflDir;
      } else {
        vec3 refrDir = refract(rd, N, eta);
        if (roughness > 0.04) {
          refrDir = normalize(refrDir + randomSpherePoint(rand(), rand()) * (roughness * 0.25));
        }
        if (!entering) {
          vec3 absorb = exp(-(vec3(1.0) - albedo) * hit.t * 1.4);
          throughput *= absorb;
        } else {
          throughput *= mix(vec3(1.0), albedo, 0.22);
        }
        ro = hit.pos - Ng * 0.0012;
        rd = refrDir;
      }
      continue;
    }

    // Next Event Estimation (Direct Studio Lighting with Soft Area Shadows)
    for (int li = 0; li < ${MAX_LIGHTS}; li++) {
      vec4 colEn = uLightColorEnabled[li];
      if (colEn.w < 0.5) continue;

      vec4 posRad = uLightPosRadius[li];
      vec3 lightSample = posRad.xyz + randomSpherePoint(rand(), rand()) * posRad.w;
      vec3 L = lightSample - hit.pos;
      float dist = length(L);
      L /= max(dist, 1e-4);

      float NdotL = dot(N, L);
      if (NdotL > 0.0) {
        vec3 shadowVis = intersectShadow(hit.pos + Ng * 0.001, L, dist);
        if (max(shadowVis.r, max(shadowVis.g, shadowVis.b)) > 0.005) {
          vec3 brdf = evalDirectBRDF(N, V, L, albedo, roughness, metalness, clearcoat);
          float atten = 1.0 / (dist * dist * 0.32 + 1.0);
          radiance += throughput * shadowVis * colEn.rgb * brdf * atten;
        }
      }
    }

    // Indirect Bounce Selection (Specular / Clearcoat vs Diffuse)
    float specProb = mix(0.18 + 0.5 * clearcoat, 0.96, metalness);
    if (roughness < 0.2 && metalness < 0.2) {
      specProb = max(specProb, 0.35);
    }

    if (rand() < specProb) {
      float alpha = max(0.03, roughness * roughness);
      if (clearcoat > 0.4 && rand() < 0.45) {
        alpha = 0.05;
      }
      vec3 H = sampleGGXHalf(N, alpha, rand(), rand());
      vec3 L = reflect(-V, H);
      if (dot(N, L) <= 0.0) break;

      float NdotV = max(dot(N, V), 1e-4);
      float NdotL = max(dot(N, L), 1e-4);
      float NdotH = max(dot(N, H), 1e-4);
      float VdotH = max(dot(V, H), 1e-4);

      vec3 F0 = mix(vec3(0.04), albedo, metalness);
      vec3 F = fresnelSchlick(VdotH, F0);
      float G = geometrySmith(NdotV, NdotL, alpha);

      vec3 weight = (F * G * VdotH) / max(NdotH * NdotV * specProb, 1e-4);
      throughput *= min(weight, vec3(3.5)); // Clamp fireflies
      rd = L;
    } else {
      vec3 L = sampleCosineHemisphere(N, rand(), rand());
      vec3 kD = albedo * (1.0 - metalness);
      throughput *= kD / max(1.0 - specProb, 0.05);
      rd = L;
    }

    ro = hit.pos + Ng * 0.001;

    // Russian roulette termination after bounce 2
    if (bounce >= 2) {
      float p = clamp(max(throughput.r, max(throughput.g, throughput.b)), 0.05, 0.95);
      if (rand() > p) break;
      throughput /= p;
    }
  }

  // Guard against NaN/Inf and suppress extreme fireflies for 1-spp stability
  if (any(isnan(radiance)) || any(isinf(radiance))) {
    radiance = vec3(0.0);
  }
  float lum = dot(radiance, vec3(0.2126, 0.7152, 0.0722));
  if (lum > 14.0) {
    radiance *= 14.0 / lum;
  }

  vec3 accumulated = uSampleIndex == 0
    ? radiance
    : mix(texture(uPrevFrame, vUv).rgb, radiance, 1.0 / float(uSampleIndex + 1));

  fragColor = vec4(accumulated, 1.0);
}
`;

const DISPLAY_FRAG = `precision highp float;
precision highp int;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uAccumTex;
uniform vec2 uResolution;
uniform float uExposure;
uniform int uDenoiser;
uniform int uSampleCount;

vec3 acesFilm(vec3 x) {
  float a = 2.51;
  float b = 0.03;
  float c = 2.43;
  float d = 0.59;
  float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  vec2 texel = 1.0 / uResolution;
  vec3 center = texture(uAccumTex, vUv).rgb;
  vec3 col = center;

  if (uDenoiser == 1 && uSampleCount < 64) {
    // Fast joint-bilateral edge-preserving denoiser (fades out cleanly as spp grows)
    float strength = mix(1.0, 0.15, clamp(float(uSampleCount) / 48.0, 0.0, 1.0));
    float centerLum = dot(center, vec3(0.299, 0.587, 0.114));
    vec3 sum = center;
    float weightSum = 1.0;

    for (int dx = -2; dx <= 2; dx++) {
      for (int dy = -2; dy <= 2; dy++) {
        if (dx == 0 && dy == 0) continue;
        vec3 s = texture(uAccumTex, vUv + vec2(float(dx), float(dy)) * texel).rgb;
        float sLum = dot(s, vec3(0.299, 0.587, 0.114));
        float colorDist = length(s - center) / max(0.15, centerLum + 0.15);
        float spatialW = exp(-float(dx * dx + dy * dy) * 0.28);
        float rangeW = exp(-colorDist * colorDist * (3.2 / max(0.25, strength)));
        float w = spatialW * rangeW;
        sum += s * w;
        weightSum += w;
      }
    }
    col = mix(center, sum / weightSum, strength);
  }

  col *= uExposure;
  col = acesFilm(col);
  col = pow(col, vec3(1.0 / 2.2));
  fragColor = vec4(col, 1.0);
}
`;

const ENV_INDEX: Record<EnvironmentPreset, number> = {
  studio: 0,
  golden: 1,
  loft: 2,
  cornell: 3,
  obsidian: 4,
};

export class GPUPathTracer {
  private renderer: THREE.WebGLRenderer;
  private quadScene: THREE.Scene;
  private quadCamera: THREE.OrthographicCamera;
  private quadMesh: THREE.Mesh;

  private traceMat: THREE.RawShaderMaterial;
  private displayMat: THREE.RawShaderMaterial;

  private rtA: THREE.WebGLRenderTarget;
  private rtB: THREE.WebGLRenderTarget;
  private pingPong = 0;

  private sampleIndex = 0;
  private width = 640;
  private height = 480;
  private targetType: THREE.TextureDataType;

  private bvhData: BVHBuildResult | null = null;
  private dummyTex: THREE.DataTexture;
  private dummyArrayTex: THREE.DataArrayTexture;

  private camPos = new THREE.Vector3();
  private camRight = new THREE.Vector3();
  private camUp = new THREE.Vector3();
  private camForward = new THREE.Vector3();

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
    const gl = renderer.getContext() as WebGL2RenderingContext;
    const hasFloat = !!gl.getExtension('EXT_color_buffer_float');
    const hasHalfFloat = !!gl.getExtension('EXT_color_buffer_half_float');
    this.targetType = hasFloat
      ? THREE.FloatType
      : hasHalfFloat
        ? THREE.HalfFloatType
        : THREE.UnsignedByteType;

    this.rtA = this.createTarget(this.width, this.height);
    this.rtB = this.createTarget(this.width, this.height);

    const lightPosArr = Array.from({ length: MAX_LIGHTS }, () => new THREE.Vector4());
    const lightColArr = Array.from({ length: MAX_LIGHTS }, () => new THREE.Vector4());
    const matAArr = Array.from({ length: MAX_MATERIALS }, () => new THREE.Vector4(0.8, 0.8, 0.8, 0.4));
    const matBArr = Array.from({ length: MAX_MATERIALS }, () => new THREE.Vector4(0.0, 1.5, 0.0, 0.0));
    const matCArr = Array.from({ length: MAX_MATERIALS }, () => new THREE.Vector4(0.0, 0.0, 0.0, 0.0));
    const matDArr = Array.from({ length: MAX_MATERIALS }, () => new THREE.Vector4(0.0, 1.0, 1.0, 0.0));

    this.dummyTex = new THREE.DataTexture(new Float32Array(4), 1, 1, THREE.RGBAFormat, THREE.FloatType);
    this.dummyTex.needsUpdate = true;

    this.dummyArrayTex = new THREE.DataArrayTexture(new Uint8Array([255, 255, 255, 255]), 1, 1, 1);
    this.dummyArrayTex.format = THREE.RGBAFormat;
    this.dummyArrayTex.type = THREE.UnsignedByteType;
    this.dummyArrayTex.minFilter = THREE.LinearFilter;
    this.dummyArrayTex.magFilter = THREE.LinearFilter;
    this.dummyArrayTex.needsUpdate = true;

    this.traceMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: PATHTRACE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uPrevFrame: { value: this.rtA.texture },
        uBvhTex: { value: this.dummyTex },
        uTriPosTex: { value: this.dummyTex },
        uTriNormTex: { value: this.dummyTex },
        uTriUvTex: { value: this.dummyTex },
        uAlbedoArray: { value: this.dummyArrayTex },
        uNormalArray: { value: this.dummyArrayTex },
        uRoughMetalArray: { value: this.dummyArrayTex },
        uCustomAlbedoArray: { value: this.dummyArrayTex },
        uCustomNormalArray: { value: this.dummyArrayTex },
        uCustomRoughMetalArray: { value: this.dummyArrayTex },
        uTexWidth: { value: 1024 },
        uSampleIndex: { value: 0 },
        uMaxBounces: { value: 4 },
        uClayMode: { value: 0 },
        uEnvMode: { value: 0 },
        uEnvIntensity: { value: 0.85 },
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
        uCamPos: { value: new THREE.Vector3() },
        uCamRight: { value: new THREE.Vector3(1, 0, 0) },
        uCamUp: { value: new THREE.Vector3(0, 1, 0) },
        uCamForward: { value: new THREE.Vector3(0, 0, -1) },
        uTanHalfFov: { value: 0.35 },
        uAspect: { value: 1.33 },
        uLightPosRadius: { value: lightPosArr },
        uLightColorEnabled: { value: lightColArr },
        uMatA: { value: matAArr },
        uMatB: { value: matBArr },
        uMatC: { value: matCArr },
        uMatD: { value: matDArr },
      },
    });

    this.displayMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: DISPLAY_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uAccumTex: { value: this.rtB.texture },
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
        uExposure: { value: 1.08 },
        uDenoiser: { value: 1 },
        uSampleCount: { value: 1 },
      },
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    this.quadMesh = new THREE.Mesh(quadGeo, this.traceMat);
    this.quadMesh.frustumCulled = false;

    this.quadScene = new THREE.Scene();
    this.quadScene.add(this.quadMesh);
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  private createTarget(w: number, h: number): THREE.WebGLRenderTarget {
    return new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: this.targetType,
      depthBuffer: false,
      stencilBuffer: false,
    });
  }

  setTextureArrays(textureManager: PbrTextureManager) {
    this.traceMat.uniforms.uAlbedoArray.value = textureManager.albedoArray;
    this.traceMat.uniforms.uNormalArray.value = textureManager.normalArray;
    this.traceMat.uniforms.uRoughMetalArray.value = textureManager.roughMetalArray;
    this.traceMat.uniforms.uCustomAlbedoArray.value = textureManager.customAlbedoArray;
    this.traceMat.uniforms.uCustomNormalArray.value = textureManager.customNormalArray;
    this.traceMat.uniforms.uCustomRoughMetalArray.value = textureManager.customRoughMetalArray;
    this.resetAccumulation();
  }

  setBVH(bvh: BVHBuildResult) {
    if (this.bvhData) {
      this.bvhData.bvhTexture.dispose();
      this.bvhData.triPosTexture.dispose();
      this.bvhData.triNormTexture.dispose();
      this.bvhData.triUvTexture.dispose();
    }
    this.bvhData = bvh;
    this.traceMat.uniforms.uBvhTex.value = bvh.bvhTexture;
    this.traceMat.uniforms.uTriPosTex.value = bvh.triPosTexture;
    this.traceMat.uniforms.uTriNormTex.value = bvh.triNormTexture;
    this.traceMat.uniforms.uTriUvTex.value = bvh.triUvTexture;
    this.traceMat.uniforms.uTexWidth.value = bvh.texWidth;
    this.resetAccumulation();
  }

  resize(width: number, height: number) {
    const w = Math.max(64, Math.floor(width));
    const h = Math.max(64, Math.floor(height));
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
    this.rtA.setSize(w, h);
    this.rtB.setSize(w, h);
    this.traceMat.uniforms.uResolution.value.set(w, h);
    this.displayMat.uniforms.uResolution.value.set(w, h);
    this.resetAccumulation();
  }

  resetAccumulation() {
    this.sampleIndex = 0;
  }

  getSamples(): number {
    return this.sampleIndex;
  }

  getResolution(): [number, number] {
    return [this.width, this.height];
  }

  syncLights(lights: StudioLight[]) {
    const posArr = this.traceMat.uniforms.uLightPosRadius.value as THREE.Vector4[];
    const colArr = this.traceMat.uniforms.uLightColorEnabled.value as THREE.Vector4[];

    for (let i = 0; i < MAX_LIGHTS; i++) {
      const l = lights[i];
      if (!l) {
        colArr[i].set(0, 0, 0, 0);
        continue;
      }
      const [lx, ly, lz] = sphericalToCartesian(l.azimuth, l.elevation, l.distance);
      posArr[i].set(lx, ly, lz, l.radius);

      let r = 1,
        g = 1,
        b = 1;
      if (l.useKelvin) {
        const [kr, kg, kb] = kelvinToRgb(l.kelvin);
        // Convert sRGB Kelvin to linear
        r = Math.pow(kr, 2.2);
        g = Math.pow(kg, 2.2);
        b = Math.pow(kb, 2.2);
      } else {
        [r, g, b] = hexToLinearRgb(l.color);
      }
      const boost = l.intensity * 0.48;
      colArr[i].set(r * boost, g * boost, b * boost, l.enabled ? 1.0 : 0.0);
    }
  }

  syncMaterials(
    materials: MaterialSpec[],
    materialLayerMap?: Map<string, number>,
    textureManager?: PbrTextureManager,
  ) {
    if (!this.bvhData) return;
    const matA = this.traceMat.uniforms.uMatA.value as THREE.Vector4[];
    const matB = this.traceMat.uniforms.uMatB.value as THREE.Vector4[];
    const matC = this.traceMat.uniforms.uMatC.value as THREE.Vector4[];
    const matD = this.traceMat.uniforms.uMatD.value as THREE.Vector4[];

    for (const spec of materials) {
      const idx = this.bvhData.materialIdToIndex.get(spec.id);
      if (idx === undefined || idx >= MAX_MATERIALS) continue;
      const [r, g, b] = hexToLinearRgb(spec.color);
      const layer = materialLayerMap?.get(spec.id) ?? PRESET_TO_LAYER[spec.texturePreset] ?? 0;
      const { slice, modeFlag } = textureManager
        ? textureManager.getLayerShaderInfo(layer)
        : { slice: layer >= 100 ? layer - 100 : layer, modeFlag: layer >= 100 ? 1.0 : 0.0 };
      matA[idx].set(r, g, b, spec.roughness);
      matB[idx].set(spec.metalness, spec.ior, spec.transmission, spec.clearcoat);
      matC[idx].set(spec.emissiveIntensity, 0, 0, 0);
      matC[idx].y = spec.hasCustomMetalness ? 1 : 0;
      matD[idx].set(slice, spec.uvScale, spec.normalStrength, modeFlag);
    }
  }

  traceSample(
    camera: THREE.PerspectiveCamera,
    lights: StudioLight[],
    materials: MaterialSpec[],
    settings: RayTracerSettings,
    isInteracting: boolean,
    materialLayerMap?: Map<string, number>,
    textureManager?: PbrTextureManager,
  ) {
    this.syncLights(lights);
    this.syncMaterials(materials, materialLayerMap, textureManager);

    camera.updateMatrixWorld();
    this.camPos.copy(camera.position);
    camera.matrixWorld.extractBasis(this.camRight, this.camUp, this.camForward);
    this.camForward.negate();

    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
    const u = this.traceMat.uniforms;
    u.uCamPos.value.copy(this.camPos);
    u.uCamRight.value.copy(this.camRight);
    u.uCamUp.value.copy(this.camUp);
    u.uCamForward.value.copy(this.camForward);
    u.uTanHalfFov.value = tanHalfFov;
    u.uAspect.value = camera.aspect;
    u.uSampleIndex.value = this.sampleIndex;
    u.uMaxBounces.value = isInteracting ? Math.min(2, settings.maxBounces) : settings.maxBounces;
    u.uClayMode.value = settings.clayMode ? 1 : 0;
    u.uEnvMode.value = ENV_INDEX[settings.environment];
    u.uEnvIntensity.value = settings.envIntensity;

    const readTarget = this.pingPong === 0 ? this.rtA : this.rtB;
    const writeTarget = this.pingPong === 0 ? this.rtB : this.rtA;

    u.uPrevFrame.value = readTarget.texture;
    this.quadMesh.material = this.traceMat;

    const prevTarget = this.renderer.getRenderTarget();
    const prevAutoClear = this.renderer.autoClear;
    this.renderer.autoClear = false;
    this.renderer.setRenderTarget(writeTarget);
    this.renderer.render(this.quadScene, this.quadCamera);
    this.renderer.setRenderTarget(prevTarget);
    this.renderer.autoClear = prevAutoClear;

    this.pingPong = 1 - this.pingPong;
    this.sampleIndex++;
  }

  displayToScreen(settings: RayTracerSettings, scissorRect?: { x: number; y: number; w: number; h: number }) {
    const latestTarget = this.pingPong === 0 ? this.rtA : this.rtB;
    this.displayMat.uniforms.uAccumTex.value = latestTarget.texture;
    this.displayMat.uniforms.uExposure.value = settings.exposure;
    this.displayMat.uniforms.uDenoiser.value = settings.denoiser ? 1 : 0;
    this.displayMat.uniforms.uSampleCount.value = Math.max(1, this.sampleIndex);

    this.quadMesh.material = this.displayMat;

    const prevAutoClear = this.renderer.autoClear;
    this.renderer.autoClear = false;
    this.renderer.setRenderTarget(null);

    if (scissorRect) {
      this.renderer.setScissorTest(true);
      this.renderer.setScissor(scissorRect.x, scissorRect.y, scissorRect.w, scissorRect.h);
      this.renderer.render(this.quadScene, this.quadCamera);
      this.renderer.setScissorTest(false);
    } else {
      this.renderer.render(this.quadScene, this.quadCamera);
    }

    this.renderer.autoClear = prevAutoClear;
  }

  dispose() {
    this.rtA.dispose();
    this.rtB.dispose();
    this.traceMat.dispose();
    this.displayMat.dispose();
    this.quadMesh.geometry.dispose();
    this.dummyTex.dispose();
    this.dummyArrayTex.dispose();
    if (this.bvhData) {
      this.bvhData.bvhTexture.dispose();
      this.bvhData.triPosTexture.dispose();
      this.bvhData.triNormTexture.dispose();
      this.bvhData.triUvTexture.dispose();
    }
  }
}
