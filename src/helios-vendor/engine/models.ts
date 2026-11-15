import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { BuiltinProjectId, MaterialSpec } from '../types/studio';
import { PbrTextureManager, PRESET_TO_LAYER } from './textures';
import {
  analyzeGeometriesUV,
  applyCleanBoxUVs,
  applyCleanCylinderUVs,
  applyCleanExtrudeWrapUVs,
  applyCleanLatheUVs,
  applyCleanTorusUVs,
  applyCleanTubeUVs,
} from './uvCleanup';

export interface BuiltProject {
  group: THREE.Group;
  materials: MaterialSpec[];
  meshMap: Map<string, THREE.Mesh[]>;
  rayTransform: { scale: number; offset: THREE.Vector3 };
}

function createMaterialFromSpec(spec: MaterialSpec, isSoftwareGl: boolean): THREE.MeshPhysicalMaterial {
  const emitterOpacity = spec.emissiveIntensity > 0.01 ? (spec.emissiveOpacity ?? 1) : 1;
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(spec.color),
    opacity: emitterOpacity,
    transparent: emitterOpacity < 0.999,
    depthWrite: emitterOpacity >= 0.999,
    roughness: spec.roughness,
    metalness: spec.metalness,
    ior: spec.ior,
    clearcoat: spec.clearcoat,
    clearcoatRoughness: Math.max(0.04, spec.roughness * 0.4),
    envMapIntensity: 1.05,
  });

  if (spec.transmission > 0.05) {
    if (isSoftwareGl) {
      mat.transparent = true;
      mat.opacity = Math.max(0.28, 1 - spec.transmission * 0.65) * emitterOpacity;
      mat.depthWrite = false;
    } else {
      mat.transmission = spec.transmission;
      mat.opacity = emitterOpacity;
      mat.transparent = emitterOpacity < 0.999;
      mat.depthWrite = emitterOpacity >= 0.999;
      mat.thickness = 0.65;
      mat.attenuationColor = new THREE.Color(spec.color);
      mat.attenuationDistance = 1.6;
    }
  }

  if (spec.emissiveIntensity > 0.01) {
    mat.emissive = new THREE.Color(spec.color);
    mat.emissiveIntensity = spec.emissiveIntensity;
  }

  return mat;
}

export function syncThreeMaterials(
  meshMap: Map<string, THREE.Mesh[]>,
  specs: MaterialSpec[],
  clayMode: boolean,
  isSoftwareGl: boolean,
  textureManager?: PbrTextureManager,
  materialLayerMap?: Map<string, number>,
) {
  for (const spec of specs) {
    const meshes = meshMap.get(spec.id);
    if (!meshes) continue;
    const layer = materialLayerMap?.get(spec.id) ?? PRESET_TO_LAYER[spec.texturePreset] ?? 0;
    const maps =
      !clayMode && textureManager && layer > 0
        ? textureManager.getThreeMapsForLayer(
            layer,
            spec.uvScaleX ?? spec.uvScale,
            spec.uvScaleY ?? spec.uvScale,
            spec.uvOffsetX ?? 0,
            spec.uvOffsetY ?? 0,
            spec.uvRotation ?? 0,
          )
        : { map: null, normalMap: null, roughnessMap: null, metalnessMap: null };

    for (const mesh of meshes) {
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      if (!mat) continue;

      if (clayMode) {
        mat.color.set('#c4bdb2');
        mat.roughness = 0.72;
        mat.metalness = 0.0;
        mat.clearcoat = 0.0;
        mat.transmission = 0.0;
        mat.transparent = false;
        mat.opacity = 1.0;
        mat.depthWrite = true;
        mat.emissive.set('#000000');
        mat.emissiveIntensity = 0;
        mat.map = null;
        mat.normalMap = null;
        mat.roughnessMap = null;
        mat.metalnessMap = null;
      } else {
        mat.color.set(spec.color);
        mat.roughness = spec.roughness;
        mat.metalness = spec.metalness;
        mat.ior = spec.ior;
        mat.clearcoat = spec.clearcoat;
        mat.clearcoatRoughness = Math.max(0.04, spec.roughness * 0.4);
        mat.map = maps.map;
        mat.normalMap = maps.normalMap;
        mat.normalScale.set(spec.normalStrength, spec.normalStrength);
        mat.roughnessMap = maps.roughnessMap;
        mat.metalnessMap = spec.hasCustomMetalness ? maps.metalnessMap : null;

        const emitterOpacity = spec.emissiveIntensity > 0.01 ? (spec.emissiveOpacity ?? 1) : 1;
        if (spec.transmission > 0.05) {
          if (isSoftwareGl) {
            mat.transmission = 0;
            mat.transparent = true;
            mat.opacity = Math.max(0.28, 1 - spec.transmission * 0.65) * emitterOpacity;
            mat.depthWrite = false;
          } else {
            mat.transparent = emitterOpacity < 0.999;
            mat.opacity = emitterOpacity;
            mat.depthWrite = emitterOpacity >= 0.999;
            mat.transmission = spec.transmission;
            mat.thickness = 0.65;
            mat.attenuationColor.set(spec.color);
          }
        } else {
          mat.transmission = 0;
          mat.transparent = emitterOpacity < 0.999;
          mat.opacity = emitterOpacity;
          mat.depthWrite = emitterOpacity >= 0.999;
        }

        if (spec.emissiveIntensity > 0.01) {
          mat.emissive.set(spec.color);
          mat.emissiveIntensity = spec.emissiveIntensity;
        } else {
          mat.emissive.set('#000000');
          mat.emissiveIntensity = 0;
        }
      }
      mat.needsUpdate = true;
    }
  }
}

function registerPart(
  group: THREE.Group,
  meshMap: Map<string, THREE.Mesh[]>,
  specMap: Map<string, MaterialSpec>,
  partName: string,
  materialId: string,
  geometry: THREE.BufferGeometry,
  isSoftwareGl: boolean,
  transform?: (m: THREE.Mesh) => void,
): THREE.Mesh {
  const spec = specMap.get(materialId)!;
  const mat = createMaterialFromSpec(spec, isSoftwareGl);
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.name = partName;
  mesh.castShadow = spec.transmission < 0.5;
  mesh.receiveShadow = true;
  mesh.userData.materialId = materialId;
  mesh.userData.partName = partName;
  if (transform) transform(mesh);
  group.add(mesh);

  const list = meshMap.get(materialId) ?? [];
  list.push(mesh);
  meshMap.set(materialId, list);
  return mesh;
}

function groundGroupToFloor(group: THREE.Group) {
  group.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(group);
  if (box.isEmpty()) return;
  const center = new THREE.Vector3();
  box.getCenter(center);
  group.position.x -= center.x;
  group.position.z -= center.z;
  group.position.y -= box.min.y;
  group.updateMatrixWorld(true);
}

function buildChronograph(isSoftwareGl: boolean): BuiltProject {
  const materials: MaterialSpec[] = [
    {
      id: 'case_titanium',
      name: 'Titanium Case',
      color: '#aeb5be',
      roughness: 0.24,
      metalness: 0.96,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.15,
      emissiveIntensity: 0,
      texturePreset: 'brushed-metal',
      uvScale: 2.0,
      normalStrength: 0.9,
    },
    {
      id: 'dial_obsidian',
      name: 'Guilloché Dial',
      color: '#1b1f26',
      roughness: 0.62,
      metalness: 0.18,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.05,
      emissiveIntensity: 0,
      texturePreset: 'guilloche',
      uvScale: 1.0,
      normalStrength: 1.2,
    },
    {
      id: 'movement_brass',
      name: 'Brass Escapement',
      color: '#d9a44e',
      roughness: 0.18,
      metalness: 0.96,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.2,
      emissiveIntensity: 0,
      texturePreset: 'brushed-metal',
      uvScale: 2.0,
      normalStrength: 0.7,
    },
    {
      id: 'sapphire_dome',
      name: 'Sapphire Crystal',
      color: '#eef8ff',
      roughness: 0.03,
      metalness: 0.0,
      ior: 1.77,
      transmission: 0.95,
      clearcoat: 1.0,
      emissiveIntensity: 0,
      texturePreset: 'none',
      uvScale: 1.0,
      normalStrength: 0.0,
    },
    {
      id: 'ruby_jewel',
      name: 'Ruby Bearing',
      color: '#d92b4b',
      roughness: 0.08,
      metalness: 0.0,
      ior: 1.76,
      transmission: 0.75,
      clearcoat: 0.9,
      emissiveIntensity: 0.4,
      texturePreset: 'none',
      uvScale: 1.0,
      normalStrength: 0.0,
    },
    {
      id: 'plinth_slate',
      name: 'Vulcanite Cradle',
      color: '#252930',
      roughness: 0.56,
      metalness: 0.25,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.05,
      emissiveIntensity: 0,
      texturePreset: 'vulcanite',
      uvScale: 2.0,
      normalStrength: 0.9,
    },
  ];

  const specMap = new Map(materials.map((m) => [m.id, m]));
  const meshMap = new Map<string, THREE.Mesh[]>();
  const root = new THREE.Group();
  const watchTilt = new THREE.Group();
  watchTilt.rotation.x = -0.38;
  watchTilt.position.y = 0.62;
  root.add(watchTilt);

  // 1. Angled desk cradle plinth (ExtrudeGeometry)
  const cradleShape = new THREE.Shape();
  cradleShape.moveTo(-0.46, 0);
  cradleShape.lineTo(0.46, 0);
  cradleShape.lineTo(0.36, 0.22);
  cradleShape.lineTo(-0.36, 0.22);
  cradleShape.closePath();
  let cradleGeom: THREE.BufferGeometry = new THREE.ExtrudeGeometry(cradleShape, {
    depth: 0.62,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 3,
  });
  cradleGeom.center();
  cradleGeom = applyCleanBoxUVs(cradleGeom, 1.0);
  registerPart(root, meshMap, specMap, 'Desk Cradle Base', 'plinth_slate', cradleGeom, isSoftwareGl, (m) => {
    m.position.set(0, 0.13, -0.06);
  });

  // 2. Machined main case barrel (LatheGeometry)
  const caseProfile = [
    new THREE.Vector2(0.0, -0.14),
    new THREE.Vector2(0.54, -0.14),
    new THREE.Vector2(0.61, -0.07),
    new THREE.Vector2(0.62, 0.07),
    new THREE.Vector2(0.57, 0.14),
    new THREE.Vector2(0.49, 0.14),
    new THREE.Vector2(0.48, 0.02),
    new THREE.Vector2(0.0, 0.02),
  ];
  const caseGeom = new THREE.LatheGeometry(caseProfile, 48, Math.PI, Math.PI * 2);
  applyCleanLatheUVs(caseGeom, caseProfile, 2);
  caseGeom.rotateX(Math.PI / 2);
  registerPart(watchTilt, meshMap, specMap, 'Titanium Case', 'case_titanium', caseGeom, isSoftwareGl);

  // 3. Fluted Bezel Ring
  const bezelGeom = new THREE.TorusGeometry(0.54, 0.055, 18, 48);
  applyCleanTorusUVs(bezelGeom, 0.54, 0.055);
  registerPart(watchTilt, meshMap, specMap, 'Chamfered Bezel', 'case_titanium', bezelGeom, isSoftwareGl, (m) => {
    m.position.z = 0.14;
  });

  // 4. Matte Obsidian Dial Plate
  const dialGeom = new THREE.CylinderGeometry(0.47, 0.47, 0.04, 48);
  applyCleanCylinderUVs(dialGeom, 0.47, 0.04, 1);
  dialGeom.rotateX(Math.PI / 2);
  registerPart(watchTilt, meshMap, specMap, 'Obsidian Dial', 'dial_obsidian', dialGeom, isSoftwareGl, (m) => {
    m.position.z = 0.03;
  });

  // 5. Recessed Brass Tourbillon Bridge & Ring
  const bridgeRingGeom = new THREE.TorusGeometry(0.24, 0.022, 14, 36);
  applyCleanTorusUVs(bridgeRingGeom, 0.24, 0.022);
  registerPart(watchTilt, meshMap, specMap, 'Tourbillon Ring', 'movement_brass', bridgeRingGeom, isSoftwareGl, (m) => {
    m.position.set(0, -0.13, 0.075);
  });

  // 6. Tourbillon Cross Bar (Extruded)
  const barGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.44, 0.038, 0.024), 2.0);
  registerPart(watchTilt, meshMap, specMap, 'Escapement Bridge', 'movement_brass', barGeom, isSoftwareGl, (m) => {
    m.position.set(0, -0.13, 0.08);
  });

  // 7. 12 Hour Markers
  const markerGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.026, 0.08, 0.022), 3.0);
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const r = 0.39;
    registerPart(
      watchTilt,
      meshMap,
      specMap,
      `Hour Index ${i + 1}`,
      i % 3 === 0 ? 'movement_brass' : 'case_titanium',
      markerGeom,
      isSoftwareGl,
      (m) => {
        m.position.set(Math.sin(angle) * r, Math.cos(angle) * r, 0.065);
        m.rotation.z = -angle;
      },
    );
  }

  // 8. Hour & Minute Hands
  const hourHandGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.034, 0.24, 0.016), 2.5);
  registerPart(watchTilt, meshMap, specMap, 'Hour Hand', 'movement_brass', hourHandGeom, isSoftwareGl, (m) => {
    m.position.set(-0.07, 0.07, 0.095);
    m.rotation.z = 0.78;
  });

  const minHandGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.022, 0.34, 0.016), 2.5);
  registerPart(watchTilt, meshMap, specMap, 'Minute Hand', 'case_titanium', minHandGeom, isSoftwareGl, (m) => {
    m.position.set(0.11, 0.09, 0.11);
    m.rotation.z = -0.88;
  });

  // 9. Ruby Pivot Jewel
  const rubyGeom = new THREE.CylinderGeometry(0.036, 0.036, 0.03, 24);
  rubyGeom.rotateX(Math.PI / 2);
  registerPart(watchTilt, meshMap, specMap, 'Ruby Jewel', 'ruby_jewel', rubyGeom, isSoftwareGl, (m) => {
    m.position.set(0, 0, 0.115);
  });

  // 10. Knurled Winding Crown & Pusher
  const crownGeom = new THREE.CylinderGeometry(0.08, 0.085, 0.11, 20);
  applyCleanCylinderUVs(crownGeom, 0.082, 0.11, 1);
  crownGeom.rotateY(Math.PI);
  crownGeom.rotateZ(Math.PI / 2);
  registerPart(watchTilt, meshMap, specMap, 'Winding Crown', 'movement_brass', crownGeom, isSoftwareGl, (m) => {
    m.position.set(0.66, 0, 0);
  });

  // 11. Domed Sapphire Crystal
  const crystalGeom = new THREE.SphereGeometry(0.5, 42, 24, 0, Math.PI * 2, 0, Math.PI * 0.24);
  crystalGeom.rotateX(Math.PI / 2);
  registerPart(watchTilt, meshMap, specMap, 'Sapphire Crystal', 'sapphire_dome', crystalGeom, isSoftwareGl, (m) => {
    m.position.set(0, 0, -0.22);
    m.renderOrder = 2;
  });

  groundGroupToFloor(root);
  return { group: root, materials, meshMap };
}

function buildRangefinderCamera(isSoftwareGl: boolean): BuiltProject {
  const materials: MaterialSpec[] = [
    {
      id: 'top_plate',
      name: 'Machined Magnesium',
      color: '#c8cdd4',
      roughness: 0.26,
      metalness: 0.94,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.1,
      emissiveIntensity: 0,
      texturePreset: 'brushed-metal',
      uvScale: 2.0,
      normalStrength: 0.85,
    },
    {
      id: 'vulcanite_wrap',
      name: 'Vulcanite Grip',
      color: '#1e2024',
      roughness: 0.82,
      metalness: 0.04,
      ior: 1.48,
      transmission: 0,
      clearcoat: 0.0,
      emissiveIntensity: 0,
      texturePreset: 'vulcanite',
      uvScale: 2.0,
      normalStrength: 1.25,
    },
    {
      id: 'lens_barrel',
      name: 'Anodized Barrel',
      color: '#2b2f36',
      roughness: 0.34,
      metalness: 0.88,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.15,
      emissiveIntensity: 0,
      texturePreset: 'brushed-metal',
      uvScale: 2.0,
      normalStrength: 1.0,
    },
    {
      id: 'brass_dials',
      name: 'Brass Control Dial',
      color: '#d8a657',
      roughness: 0.2,
      metalness: 0.96,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.2,
      emissiveIntensity: 0,
      texturePreset: 'brushed-metal',
      uvScale: 2.0,
      normalStrength: 0.7,
    },
    {
      id: 'optical_glass',
      name: 'Coated Lens Glass',
      color: '#d8f0ff',
      roughness: 0.02,
      metalness: 0.0,
      ior: 1.62,
      transmission: 0.96,
      clearcoat: 1.0,
      emissiveIntensity: 0,
      texturePreset: 'none',
      uvScale: 1.0,
      normalStrength: 0.0,
    },
    {
      id: 'accent_red',
      name: 'Index Enamel',
      color: '#d63638',
      roughness: 0.18,
      metalness: 0.05,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.8,
      emissiveIntensity: 0,
      texturePreset: 'none',
      uvScale: 1.0,
      normalStrength: 0.0,
    },
  ];

  const specMap = new Map(materials.map((m) => [m.id, m]));
  const meshMap = new Map<string, THREE.Mesh[]>();
  const root = new THREE.Group();

  // Rounded camera body silhouette (ExtrudeGeometry)
  const w = 0.78;
  const d = 0.21;
  const r = 0.09;
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-w + r, -d);
  bodyShape.lineTo(w - r, -d);
  bodyShape.quadraticCurveTo(w, -d, w, -d + r);
  bodyShape.lineTo(w, d - r);
  bodyShape.quadraticCurveTo(w, d, w - r, d);
  bodyShape.lineTo(-w + r, d);
  bodyShape.quadraticCurveTo(-w, d, -w, d - r);
  bodyShape.lineTo(-w, -d + r);
  bodyShape.quadraticCurveTo(-w, -d, -w + r, -d);

  // 1. Leatherette mid body
  let midGeom: THREE.BufferGeometry = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.54,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
  midGeom = applyCleanExtrudeWrapUVs(midGeom, 1.0, 4);
  midGeom.rotateX(-Math.PI / 2);
  registerPart(root, meshMap, specMap, 'Vulcanite Chassis', 'vulcanite_wrap', midGeom, isSoftwareGl, (m) => {
    m.position.y = 0.13;
  });

  // 2. Top plate
  let topGeom: THREE.BufferGeometry = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  });
  topGeom = applyCleanExtrudeWrapUVs(topGeom, 1.0, 4);
  topGeom.rotateX(-Math.PI / 2);
  registerPart(root, meshMap, specMap, 'Magnesium Top Plate', 'top_plate', topGeom, isSoftwareGl, (m) => {
    m.position.y = 0.68;
  });

  // 3. Base plate
  let baseGeom: THREE.BufferGeometry = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.09,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 2,
  });
  baseGeom = applyCleanExtrudeWrapUVs(baseGeom, 1.0, 4);
  baseGeom.rotateX(-Math.PI / 2);
  registerPart(root, meshMap, specMap, 'Magnesium Base Plate', 'top_plate', baseGeom, isSoftwareGl, (m) => {
    m.position.y = 0.02;
  });

  // 4. Stepped Lens Barrel (LatheGeometry)
  const barrelProfile = [
    new THREE.Vector2(0.28, 0.0),
    new THREE.Vector2(0.36, 0.0),
    new THREE.Vector2(0.36, 0.12),
    new THREE.Vector2(0.34, 0.14),
    new THREE.Vector2(0.34, 0.34),
    new THREE.Vector2(0.31, 0.36),
    new THREE.Vector2(0.31, 0.48),
    new THREE.Vector2(0.26, 0.48),
    new THREE.Vector2(0.25, 0.24),
  ];
  const barrelGeom = new THREE.LatheGeometry(barrelProfile, 44, Math.PI, Math.PI * 2);
  applyCleanLatheUVs(barrelGeom, barrelProfile, 2);
  barrelGeom.rotateX(Math.PI / 2);
  registerPart(root, meshMap, specMap, 'Telephoto Lens Barrel', 'lens_barrel', barrelGeom, isSoftwareGl, (m) => {
    m.position.set(0.02, 0.4, 0.22);
  });

  // 5. Focus Ring Chrome Collar
  const collarGeom = new THREE.TorusGeometry(0.35, 0.022, 14, 44);
  applyCleanTorusUVs(collarGeom, 0.35, 0.022);
  registerPart(root, meshMap, specMap, 'Aperture Ring', 'top_plate', collarGeom, isSoftwareGl, (m) => {
    m.position.set(0.02, 0.4, 0.44);
  });

  // 6. Front Curved Optical Element
  const lensGlassGeom = new THREE.SphereGeometry(0.27, 36, 20, 0, Math.PI * 2, 0, Math.PI * 0.32);
  lensGlassGeom.rotateX(Math.PI / 2);
  registerPart(root, meshMap, specMap, 'Optical Front Element', 'optical_glass', lensGlassGeom, isSoftwareGl, (m) => {
    m.position.set(0.02, 0.4, 0.46);
    m.renderOrder = 2;
  });

  // 7. Shutter Speed Dial (Brass)
  const shutterGeom = new THREE.CylinderGeometry(0.11, 0.115, 0.08, 28);
  applyCleanCylinderUVs(shutterGeom, 0.11, 0.08, 1);
  shutterGeom.rotateY(Math.PI);
  registerPart(root, meshMap, specMap, 'Shutter Dial', 'brass_dials', shutterGeom, isSoftwareGl, (m) => {
    m.position.set(0.45, 0.89, 0.02);
  });

  // 8. Rewind Crank & ISO Dial
  const rewindGeom = new THREE.CylinderGeometry(0.09, 0.1, 0.06, 24);
  applyCleanCylinderUVs(rewindGeom, 0.095, 0.06, 1);
  rewindGeom.rotateY(Math.PI);
  registerPart(root, meshMap, specMap, 'Exposure Dial', 'top_plate', rewindGeom, isSoftwareGl, (m) => {
    m.position.set(-0.52, 0.88, 0.0);
  });

  // 9. Rangefinder Viewfinder Window
  const vfHousingGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.24, 0.12, 0.08), 1.0);
  registerPart(root, meshMap, specMap, 'Viewfinder Window', 'optical_glass', vfHousingGeom, isSoftwareGl, (m) => {
    m.position.set(-0.34, 0.77, 0.21);
  });

  // 10. Signature Red Mount Dot
  const dotGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.03, 20);
  dotGeom.rotateX(Math.PI / 2);
  registerPart(root, meshMap, specMap, 'Mount Index Badge', 'accent_red', dotGeom, isSoftwareGl, (m) => {
    m.position.set(-0.36, 0.56, 0.22);
  });

  groundGroupToFloor(root);
  return { group: root, materials, meshMap };
}

function buildBauhausSculpture(isSoftwareGl: boolean): BuiltProject {
  const materials: MaterialS