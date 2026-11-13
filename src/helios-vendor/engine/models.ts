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
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(spec.color),
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
      mat.opacity = Math.max(0.28, 1 - spec.transmission * 0.65);
      mat.depthWrite = false;
    } else {
      mat.transmission = spec.transmission;
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
        ? textureManager.getThreeMapsForLayer(layer, spec.uvScale)
        : { map: null, normalMap: null, roughnessMap: null };

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

        if (spec.transmission > 0.05) {
          if (isSoftwareGl) {
            mat.transmission = 0;
            mat.transparent = true;
            mat.opacity = Math.max(0.28, 1 - spec.transmission * 0.65);
            mat.depthWrite = false;
          } else {
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.depthWrite = true;
            mat.transmission = spec.transmission;
            mat.thickness = 0.65;
            mat.attenuationColor.set(spec.color);
          }
        } else {
          mat.transmission = 0;
          mat.transparent = false;
          mat.opacity = 1.0;
          mat.depthWrite = true;
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
  const materials: MaterialSpec[] = [
    {
      id: 'brass_ribbon',
      name: 'Satin Brass Ribbon',
      color: '#dfb05e',
      roughness: 0.2,
      metalness: 0.96,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.2,
      emissiveIntensity: 0,
      texturePreset: 'brushed-metal',
      uvScale: 2.0,
      normalStrength: 0.75,
    },
    {
      id: 'crystal_core',
      name: 'Optical Prism Sphere',
      color: '#e8f6ff',
      roughness: 0.02,
      metalness: 0.0,
      ior: 1.55,
      transmission: 0.97,
      clearcoat: 1.0,
      emissiveIntensity: 0,
      texturePreset: 'none',
      uvScale: 1.0,
      normalStrength: 0.0,
    },
    {
      id: 'travertine_arch',
      name: 'Honed Travertine',
      color: '#d4cabd',
      roughness: 0.78,
      metalness: 0.0,
      ior: 1.46,
      transmission: 0,
      clearcoat: 0.0,
      emissiveIntensity: 0,
      texturePreset: 'travertine',
      uvScale: 1.0,
      normalStrength: 1.15,
    },
    {
      id: 'terracotta_fin',
      name: 'Matte Terracotta',
      color: '#b85d43',
      roughness: 0.74,
      metalness: 0.0,
      ior: 1.48,
      transmission: 0,
      clearcoat: 0.0,
      emissiveIntensity: 0,
      texturePreset: 'concrete',
      uvScale: 1.5,
      normalStrength: 0.7,
    },
    {
      id: 'obsidian_base',
      name: 'Polished Basalt',
      color: '#1b1e23',
      roughness: 0.14,
      metalness: 0.1,
      ior: 1.52,
      transmission: 0,
      clearcoat: 0.9,
      emissiveIntensity: 0,
      texturePreset: 'none',
      uvScale: 1.0,
      normalStrength: 0.0,
    },
  ];

  const specMap = new Map(materials.map((m) => [m.id, m]));
  const meshMap = new Map<string, THREE.Mesh[]>();
  const root = new THREE.Group();

  // 1. Stepped Basalt Plinth
  const plinthGeom = new THREE.CylinderGeometry(0.76, 0.82, 0.14, 48);
  applyCleanCylinderUVs(plinthGeom, 0.79, 0.14, 2);
  plinthGeom.rotateY(Math.PI);
  registerPart(root, meshMap, specMap, 'Basalt Plinth', 'obsidian_base', plinthGeom, isSoftwareGl, (m) => {
    m.position.y = 0.07;
  });

  // 2. Travertine Architectural Arch (ExtrudeGeometry)
  const archShape = new THREE.Shape();
  archShape.moveTo(-0.62, 0);
  archShape.lineTo(-0.36, 0);
  archShape.lineTo(-0.36, 0.68);
  archShape.absarc(0, 0.68, 0.36, Math.PI, 0, true);
  archShape.lineTo(0.36, 0);
  archShape.lineTo(0.62, 0);
  archShape.lineTo(0.62, 0.7);
  archShape.absarc(0, 0.7, 0.62, 0, Math.PI, false);
  archShape.closePath();

  let archGeom: THREE.BufferGeometry = new THREE.ExtrudeGeometry(archShape, {
    depth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
  archGeom.translate(0, 0, -0.12);
  archGeom = applyCleanBoxUVs(archGeom, 0.9);
  registerPart(root, meshMap, specMap, 'Travertine Portal', 'travertine_arch', archGeom, isSoftwareGl, (m) => {
    m.position.set(0, 0.14, -0.18);
  });

  // 3. Trefoil / Helical Brass Ribbon (TubeGeometry along analytical curve)
  const trefoilPts: THREE.Vector3[] = [];
  const trefoilSteps = 96;
  for (let i = 0; i < trefoilSteps; i++) {
    const u = (i / trefoilSteps) * Math.PI * 2;
    const x = (Math.sin(u) + 2 * Math.sin(2 * u)) * 0.16;
    const y = (Math.cos(u) - 2 * Math.cos(2 * u)) * 0.16 + 0.72;
    const z = -Math.sin(3 * u) * 0.16 + 0.14;
    trefoilPts.push(new THREE.Vector3(x, y, z));
  }
  const trefoilCurve = new THREE.CatmullRomCurve3(trefoilPts, true);
  const knotGeom = new THREE.TubeGeometry(trefoilCurve, 110, 0.048, 18, true);
  applyCleanTubeUVs(knotGeom, trefoilCurve.getLength(), 0.048);
  registerPart(root, meshMap, specMap, 'Brass Trefoil Sculpture', 'brass_ribbon', knotGeom, isSoftwareGl);

  // 4. Precision Crystal Sphere
  const sphereGeom = new THREE.SphereGeometry(0.24, 42, 32);
  registerPart(root, meshMap, specMap, 'Optical Crystal Sphere', 'crystal_core', sphereGeom, isSoftwareGl, (m) => {
    m.position.set(0, 0.72, 0.14);
    m.renderOrder = 2;
  });

  // 5. Terracotta Counterweight Monolith
  const monoGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.24, 0.56, 0.24), 1.0);
  registerPart(root, meshMap, specMap, 'Terracotta Monolith', 'terracotta_fin', monoGeom, isSoftwareGl, (m) => {
    m.position.set(-0.44, 0.42, 0.26);
    m.rotation.y = 0.35;
  });

  // 6. Brass Pedestal Collar
  const collarGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.08, 32);
  applyCleanCylinderUVs(collarGeom, 0.2, 0.08, 2);
  collarGeom.rotateY(Math.PI);
  registerPart(root, meshMap, specMap, 'Brass Cradle', 'brass_ribbon', collarGeom, isSoftwareGl, (m) => {
    m.position.set(0, 0.18, 0.14);
  });

  // 7. Secondary Polished Basalt Sphere
  const smallSphereGeom = new THREE.SphereGeometry(0.11, 28, 22);
  registerPart(root, meshMap, specMap, 'Basalt Counterweight', 'obsidian_base', smallSphereGeom, isSoftwareGl, (m) => {
    m.position.set(0.46, 0.25, 0.28);
  });

  groundGroupToFloor(root);
  return { group: root, materials, meshMap };
}

function buildArchitecturePavilion(isSoftwareGl: boolean): BuiltProject {
  const materials: MaterialSpec[] = [
    {
      id: 'architectural_concrete',
      name: 'Board-Formed Concrete',
      color: '#c8c4bc',
      roughness: 0.8,
      metalness: 0.0,
      ior: 1.48,
      transmission: 0,
      clearcoat: 0.0,
      emissiveIntensity: 0,
      texturePreset: 'concrete',
      uvScale: 1.5,
      normalStrength: 1.1,
    },
    {
      id: 'warm_cedar',
      name: 'Warm Cedar Timber',
      color: '#b88156',
      roughness: 0.62,
      metalness: 0.0,
      ior: 1.48,
      transmission: 0,
      clearcoat: 0.12,
      emissiveIntensity: 0,
      texturePreset: 'cedar-wood',
      uvScale: 1.5,
      normalStrength: 1.0,
    },
    {
      id: 'steel_frame',
      name: 'Darkened Steel Mullion',
      color: '#25292e',
      roughness: 0.32,
      metalness: 0.9,
      ior: 1.5,
      transmission: 0,
      clearcoat: 0.1,
      emissiveIntensity: 0,
      texturePreset: 'brushed-metal',
      uvScale: 2.0,
      normalStrength: 0.7,
    },
    {
      id: 'curtain_glass',
      name: 'Architectural Glazing',
      color: '#d8ebf5',
      roughness: 0.03,
      metalness: 0.0,
      ior: 1.52,
      transmission: 0.92,
      clearcoat: 1.0,
      emissiveIntensity: 0,
      texturePreset: 'none',
      uvScale: 1.0,
      normalStrength: 0.0,
    },
    {
      id: 'interior_glow',
      name: 'Atrium Cove Light',
      color: '#ffd28a',
      roughness: 0.4,
      metalness: 0.0,
      ior: 1.45,
      transmission: 0,
      clearcoat: 0,
      emissiveIntensity: 2.6,
      texturePreset: 'none',
      uvScale: 1.0,
      normalStrength: 0.0,
    },
  ];

  const specMap = new Map(materials.map((m) => [m.id, m]));
  const meshMap = new Map<string, THREE.Mesh[]>();
  const root = new THREE.Group();

  // 1. Stepped Concrete Base Plinth
  const plinthGeom = applyCleanBoxUVs(new THREE.BoxGeometry(1.78, 0.12, 1.32), 0.75);
  registerPart(root, meshMap, specMap, 'Site Plinth', 'architectural_concrete', plinthGeom, isSoftwareGl, (m) => {
    m.position.set(0, 0.06, 0);
  });

  // 2. Cantilevered Upper Roof Slab
  const roofGeom = applyCleanBoxUVs(new THREE.BoxGeometry(1.86, 0.11, 1.24), 0.75);
  registerPart(root, meshMap, specMap, 'Cantilever Roof Slab', 'architectural_concrete', roofGeom, isSoftwareGl, (m) => {
    m.position.set(0.08, 0.92, -0.02);
  });

  // 3. Recessed Cedar Soffit Ceiling
  const soffitGeom = applyCleanBoxUVs(new THREE.BoxGeometry(1.74, 0.03, 1.12), 0.85);
  registerPart(root, meshMap, specMap, 'Cedar Soffit', 'warm_cedar', soffitGeom, isSoftwareGl, (m) => {
    m.position.set(0.08, 0.85, -0.02);
  });

  // 4. Rear Shear Wall
  const backWallGeom = applyCleanBoxUVs(new THREE.BoxGeometry(1.36, 0.74, 0.1), 0.75);
  registerPart(root, meshMap, specMap, 'Rear Shear Wall', 'architectural_concrete', backWallGeom, isSoftwareGl, (m) => {
    m.position.set(-0.18, 0.49, -0.5);
  });

  // 5. Timber Interior Core Volume
  const coreGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.66, 0.72, 0.62), 0.85);
  registerPart(root, meshMap, specMap, 'Timber Atrium Core', 'warm_cedar', coreGeom, isSoftwareGl, (m) => {
    m.position.set(-0.42, 0.48, -0.08);
  });

  // 6. Atrium Interior Cove Glow Panel
  const coveGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.42, 0.24, 0.04), 1.0);
  registerPart(root, meshMap, specMap, 'Interior Cove Light', 'interior_glow', coveGeom, isSoftwareGl, (m) => {
    m.position.set(0.18, 0.62, -0.43);
  });

  // 7. Steel Colonnade Columns (4 structural columns)
  const colGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.74, 16);
  applyCleanCylinderUVs(colGeom, 0.034, 0.74, 1);
  colGeom.rotateY(Math.PI);
  const colPositions: [number, number][] = [
    [0.84, 0.48],
    [0.84, -0.48],
    [0.24, 0.48],
    [-0.74, 0.48],
  ];
  colPositions.forEach(([cx, cz], idx) => {
    registerPart(root, meshMap, specMap, `Steel Column ${idx + 1}`, 'steel_frame', colGeom, isSoftwareGl, (m) => {
      m.position.set(cx, 0.49, cz);
    });
  });

  // 8. Angled Brise-Soleil Louvers (5 architectural sun fins)
  const finGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.025, 0.73, 0.14), 0.85);
  for (let i = 0; i < 5; i++) {
    registerPart(root, meshMap, specMap, `Brise-Soleil Fin ${i + 1}`, 'warm_cedar', finGeom, isSoftwareGl, (m) => {
      m.position.set(-0.04 + i * 0.21, 0.485, 0.49);
      m.rotation.y = 0.42;
    });
  }

  // 9. Glazed Curtain Wall
  const glassGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.96, 0.72, 0.03), 1.0);
  registerPart(root, meshMap, specMap, 'Curtain Wall Glazing', 'curtain_glass', glassGeom, isSoftwareGl, (m) => {
    m.position.set(0.32, 0.48, 0.26);
    m.renderOrder = 2;
  });

  // 10. Reflecting Pool Basin on Terrace
  const poolGeom = applyCleanBoxUVs(new THREE.BoxGeometry(0.54, 0.025, 0.42), 1.0);
  registerPart(root, meshMap, specMap, 'Reflecting Pool', 'curtain_glass', poolGeom, isSoftwareGl, (m) => {
    m.position.set(0.56, 0.135, 0.28);
    m.renderOrder = 2;
  });

  groundGroupToFloor(root);
  return { group: root, materials, meshMap };
}

export function buildBuiltinProject(id: BuiltinProjectId, isSoftwareGl: boolean): BuiltProject {
  switch (id) {
    case 'chronograph':
      return buildChronograph(isSoftwareGl);
    case 'camera':
      return buildRangefinderCamera(isSoftwareGl);
    case 'sculpture':
      return buildBauhausSculpture(isSoftwareGl);
    case 'architecture':
      return buildArchitecturePavilion(isSoftwareGl);
  }
}

export async function importModelFromFile(
  file: File,
  isSoftwareGl: boolean,
  textureManager?: PbrTextureManager,
  materialLayerMap?: Map<string, number>,
): Promise<BuiltProject> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const buffer = await file.arrayBuffer();

  let loadedRoot: THREE.Group;

  if (ext === 'glb' || ext === 'gltf') {
    const loader = new GLTFLoader();
    const gltf = await new Promise<{ scene: THREE.Group }>((resolve, reject) => {
      loader.parse(buffer, '', (res) => resolve(res), reject);
    });
    loadedRoot = gltf.scene;
  } else if (ext === 'obj') {
    const text = new TextDecoder().decode(buffer);
    const loader = new OBJLoader();
    loadedRoot = loader.parse(text);
  } else if (ext === 'stl') {
    const loader = new STLLoader();
    const geom = loader.parse(buffer);
    geom.computeVertexNormals();
    const mesh = new THREE.Mesh(geom);
    loadedRoot = new THREE.Group();
    loadedRoot.add(mesh);
  } else {
    throw new Error(`Unsupported format ".${ext}". Please import GLB, GLTF, OBJ, or STL.`);
  }

  // Normalize bounding box to fit studio stage (~1.45m max dimension, grounded at y=0)
  loadedRoot.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(loadedRoot);
  if (box.isEmpty()) {
    throw new Error('The imported file contains no renderable 3D geometry.');
  }

  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z, 1e-4);
  const scale = 1.45 / maxDim;
  const offset = new THREE.Vector3(-center.x * scale, -box.min.y * scale, -center.z * scale);

  const wrapper = new THREE.Group();
  loadedRoot.position.copy(offset);
  loadedRoot.scale.setScalar(scale);
  wrapper.add(loadedRoot);
  wrapper.updateMatrixWorld(true);

  const materials: MaterialSpec[] = [];
  const matKeyToSpecId = new Map<string, string>();
  const meshMap = new Map<string, THREE.Mesh[]>();
  const srcMaterialBySpecId = new Map<string, THREE.MeshStandardMaterial | undefined>();
  const geometriesBySpecId = new Map<string, THREE.BufferGeometry[]>();

  let partCounter = 1;

  wrapper.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;

    const rawGeom = mesh.geometry as THREE.BufferGeometry;
    if (!rawGeom.getAttribute('normal')) {
      rawGeom.computeVertexNormals();
    }
    if (!rawGeom.getAttribute('uv')) {
      mesh.geometry = applyCleanBoxUVs(rawGeom, 1.0);
    }

    const srcMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    const stdMat = srcMat as THREE.MeshStandardMaterial | undefined;
    const matKey = srcMat ? srcMat.uuid : 'imported_default';

    let specId = matKeyToSpecId.get(matKey);
    if (!specId) {
      if (materials.length >= 20) {
        specId = materials[0].id;
      } else {
        specId = `imported_mat_${materials.length + 1}`;
        matKeyToSpecId.set(matKey, specId);
        srcMaterialBySpecId.set(specId, stdMat);

        const col =
          stdMat && stdMat.color
            ? `#${stdMat.color.getHexString()}`
            : materials.length === 0
              ? '#cfd3d9'
              : '#9ca3af';

        const roughness =
          stdMat && typeof stdMat.roughness === 'number' ? stdMat.roughness : 0.45;
        const metalness =
          stdMat && typeof stdMat.metalness === 'number' ? stdMat.metalness : 0.15;

        const label =
          (stdMat && stdMat.name) ||
          mesh.name ||
          `Surface ${materials.length + 1}`;

        const hasAlbedoImg = Boolean(stdMat?.map?.image);
        const hasNormalImg = Boolean(stdMat?.normalMap?.image);
        const hasRoughImg = Boolean(stdMat?.roughnessMap?.image);
        const hasMetalImg = Boolean(stdMat?.metalnessMap?.image);

        const normalScaleVal =
          stdMat?.normalScale && typeof stdMat.normalScale.x === 'number'
            ? Math.max(0, Math.min(2, stdMat.normalScale.x))
            : 1.0;

        materials.push({
          id: specId,
          name: label.slice(0, 24),
          color: col,
          roughness: Math.max(0.03, Math.min(1, roughness)),
          metalness: Math.max(0, Math.min(1, metalness)),
          ior: 1.5,
          transmission: 0,
          clearcoat: 0.1,
          emissiveIntensity: 0,
          texturePreset: 'none',
          uvScale: 1.0,
          normalStrength: normalScaleVal,
          hasCustomAlbedo: hasAlbedoImg,
          hasCustomNormal: hasNormalImg,
          hasCustomRoughness: hasRoughImg,
          hasCustomMetalness: hasMetalImg,
        });
      }
    }

    const spec = materials.find((m) => m.id === specId)!;
    const physMat = createMaterialFromSpec(spec, isSoftwareGl);
    mesh.material = physMat;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.materialId = specId;
    mesh.userData.partName = mesh.name || `Mesh Part ${partCounter++}`;

    const list = meshMap.get(specId) ?? [];
    list.push(mesh);
    meshMap.set(specId, list);

    const geomList = geometriesBySpecId.get(specId) ?? [];
    geomList.push(mesh.geometry as THREE.BufferGeometry);
    geometriesBySpecId.set(specId, geomList);
  });

  if (materials.length === 0) {
    throw new Error('No mesh triangles found in the imported file.');
  }

  // Analyze complete per-material UVs, feather 3D seams, and dilate atlas borders into high-res layers
  if (textureManager && materialLayerMap) {
    for (const spec of materials) {
      const stdMat = srcMaterialBySpecId.get(spec.id);
      const hasAlbedoImg = Boolean(stdMat?.map?.image);
      const hasNormalImg = Boolean(stdMat?.normalMap?.image);
      const hasRoughImg = Boolean(stdMat?.roughnessMap?.image);
      const hasMetalImg = Boolean(stdMat?.metalnessMap?.image);

      if (hasAlbedoImg || hasNormalImg || hasRoughImg || hasMetalImg) {
        const geoms = geometriesBySpecId.get(spec.id) ?? [];
        const uvInfo = analyzeGeometriesUV(geoms);
        const customLayer = textureManager.allocateCustomLayer('none', uvInfo.isAtlas);

        if (stdMat?.map?.image) {
          textureManager.writeImageToLayer(
            customLayer,
            'albedo',
            stdMat.map.image as CanvasImageSource,
            Boolean(stdMat.map.flipY),
            uvInfo,
          );
        }
        if (stdMat?.normalMap?.image) {
          textureManager.writeImageToLayer(
            customLayer,
            'normal',
            stdMat.normalMap.image as CanvasImageSource,
            Boolean(stdMat.normalMap.flipY),
            uvInfo,
          );
        }
        const scalarMap = stdMat?.roughnessMap?.image ? stdMat.roughnessMap : stdMat?.metalnessMap;
        if (scalarMap?.image) {
          textureManager.writeImageToLayer(
            customLayer,
            'roughness',
            scalarMap.image as CanvasImageSource,
            Boolean(scalarMap.flipY),
            uvInfo,
          );
        }
        materialLayerMap.set(spec.id, customLayer);
      } else {
        materialLayerMap.set(spec.id, 0);
      }
    }
  }

  return { group: wrapper, materials, meshMap, rayTransform: { scale, offset } };
}
