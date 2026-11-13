import * as THREE from 'three';
import { buildSceneBVH } from './engine/bvh';
import { importModelFromFile } from './engine/models';
import { GPUPathTracer } from './engine/pathTracer';
import { PbrTextureManager } from './engine/textures';
import {
  DEFAULT_LIGHTS,
  DEFAULT_RAYTRACER_SETTINGS,
  LIGHTING_RIG_PRESETS,
  MATERIAL_PRESETS,
} from './data/presets';
import { PRESET_TO_LAYER } from './engine/textures';

function softwareRenderer(renderer: THREE.WebGLRenderer): boolean {
  try {
    const gl = renderer.getContext();
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const key = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(gl.getParameter(key)));
  } catch {
    return true;
  }
}

function disposeProject(project: Awaited<ReturnType<typeof importModelFromFile>> | null) {
  if (!project) return;
  project.group.traverse((node) => {
    node.geometry?.dispose?.();
    for (const material of Array.isArray(node.material) ? node.material : [node.material]) {
      material?.dispose?.();
    }
  });
}

export async function createBoxLabHeliosTrace(
  renderer: THREE.WebGLRenderer,
  glb: ArrayBuffer,
) {
  const textureManager = new PbrTextureManager(renderer.capabilities.getMaxAnisotropy());
  const materialLayerMap = new Map<string, number>();
  let project: Awaited<ReturnType<typeof importModelFromFile>> | null = null;
  let pathTracer: GPUPathTracer | null = null;

  try {
    const file = new File([glb], 'BoxLab_Current.glb', { type: 'model/gltf-binary' });
    project = await importModelFromFile(file, softwareRenderer(renderer), textureManager, materialLayerMap);
    const bvh = buildSceneBVH(project.group);
    pathTracer = new GPUPathTracer(renderer);
    pathTracer.setTextureArrays(textureManager);
    pathTracer.setBVH(bvh);

    const settings = { ...DEFAULT_RAYTRACER_SETTINGS };
    const lights = DEFAULT_LIGHTS.map((light) => ({ ...light }));
    const transform = {
      scale: project.rayTransform.scale,
      offset: project.rayTransform.offset.clone(),
    };
    const importedProject = project;

    function getState() {
      return {
        settings: { ...settings },
        lights: lights.map((light) => ({ ...light })),
        materials: importedProject.materials.map((material) => ({ ...material })),
        samples: pathTracer?.getSamples() ?? 0,
        resolution: pathTracer?.getResolution() ?? [0, 0],
      };
    }

    function updateLights(next: typeof lights) {
      for (let index = 0; index < lights.length; index++) {
        if (next[index]) Object.assign(lights[index], next[index]);
      }
      pathTracer?.resetAccumulation();
    }

    function updateMaterial(id: string, patch: Partial<(typeof importedProject.materials)[number]>) {
      const material = importedProject.materials.find((item) => item.id === id);
      if (!material) return;
      const safePatch: Partial<(typeof importedProject.materials)[number]> = {};
      for (const key of ['color', 'roughness', 'metalness', 'ior', 'transmission', 'clearcoat', 'emissiveIntensity', 'texturePreset', 'uvScale', 'normalStrength'] as const) {
        if (patch[key] !== undefined) Object.assign(safePatch, { [key]: patch[key] });
      }
      const hasImportedMaps = Boolean(
        material.hasCustomAlbedo || material.hasCustomNormal ||
        material.hasCustomRoughness || material.hasCustomMetalness,
      );
      if (hasImportedMaps) delete safePatch.texturePreset;
      Object.assign(material, safePatch);
      if (!hasImportedMaps && safePatch.texturePreset) {
        materialLayerMap.set(id, PRESET_TO_LAYER[safePatch.texturePreset]);
      }
      pathTracer?.resetAccumulation();
    }

    function applyMaterialPreset(id: string, presetId: string) {
      const material = importedProject.materials.find((item) => item.id === id);
      const preset = MATERIAL_PRESETS.find((item) => item.id === presetId);
      if (!material || !preset) return;
      updateMaterial(id, { ...preset });
    }

    function updateSettings(patch: Partial<typeof settings>) {
      Object.assign(settings, patch);
      pathTracer?.resetAccumulation();
    }

    function applyLightingRig(id: string) {
      const preset = LIGHTING_RIG_PRESETS.find((item) => item.id === id);
      if (!preset) return;
      updateLights(preset.lights.map((light) => ({ ...light })));
      updateSettings({ environment: preset.environment, envIntensity: preset.envIntensity });
    }

    function applyPreferences(saved: ReturnType<typeof getState>) {
      updateSettings(saved.settings);
      updateLights(saved.lights);
      for (const material of importedProject.materials) {
        const prior = saved.materials.find((item) => item.id === material.id);
        if (prior) updateMaterial(material.id, prior);
      }
    }

    function dispose() {
      pathTracer?.dispose();
      pathTracer = null;
      textureManager.dispose();
      disposeProject(importedProject);
    }

    return {
      transform,
      getState,
      updateLights,
      updateMaterial,
      applyMaterialPreset,
      updateSettings,
      applyLightingRig,
      applyPreferences,
      render(camera: THREE.PerspectiveCamera, interacting = false) {
        if (!pathTracer) return 0;
        const cap = interacting ? 1 : settings.maxSamples;
        if (pathTracer.getSamples() < cap) {
          pathTracer.traceSample(camera, lights, importedProject.materials, settings, interacting, materialLayerMap, textureManager);
        }
        pathTracer.displayToScreen(settings);
        return pathTracer.getSamples();
      },
      resize(width: number, height: number, interacting = false) {
        const dpr = softwareRenderer(renderer) ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
        const scale = interacting ? settings.interactiveScale : 1;
        pathTracer?.resize(Math.floor(width * dpr * scale), Math.floor(height * dpr * scale));
      },
      reset() { pathTracer?.resetAccumulation(); },
      dispose,
    };
  } catch (error) {
    pathTracer?.dispose();
    textureManager.dispose();
    disposeProject(project);
    throw error;
  }
}
