import * as THREE from 'three';
import { buildSceneBVH } from './engine/bvh';
import { importModelFromFile } from './engine/models';
import { GPUPathTracer } from './engine/pathTracer';
import { PbrTextureManager } from './engine/textures';
import { DEFAULT_LIGHTS, DEFAULT_RAYTRACER_SETTINGS } from './data/presets';

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

    const settings = { ...DEFAULT_RAYTRACER_SETTINGS, maxSamples: 128, maxBounces: 4 };
    const lights = DEFAULT_LIGHTS.map((light) => ({ ...light }));
    const transform = {
      scale: project.rayTransform.scale,
      offset: project.rayTransform.offset.clone(),
    };
    const importedProject = project;

    function dispose() {
      pathTracer?.dispose();
      pathTracer = null;
      textureManager.dispose();
      disposeProject(importedProject);
    }

    return {
      transform,
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
