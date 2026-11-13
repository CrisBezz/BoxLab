export type RenderMode = 'raytrace' | 'pbr' | 'split';

export type EnvironmentPreset =
  | 'studio'
  | 'golden'
  | 'loft'
  | 'cornell'
  | 'obsidian';

export type BuiltinProjectId =
  | 'chronograph'
  | 'camera'
  | 'sculpture'
  | 'architecture';

export type ProjectId = BuiltinProjectId | 'custom';

export type CameraPreset = 'hero' | 'front' | 'side' | 'top' | 'closeup';

export type DockTab = 'projects' | 'lights' | 'materials' | 'raytracer' | 'camera';

export interface StudioLight {
  id: string;
  name: string;
  role: 'key' | 'fill' | 'rim' | 'accent';
  enabled: boolean;
  useKelvin: boolean;
  kelvin: number;
  color: string;
  intensity: number;
  azimuth: number; // degrees (-180..180)
  elevation: number; // degrees (5..85)
  distance: number; // meters (2.2..8)
  radius: number; // area light softness radius (0.05..1.6)
}

export type PbrTexturePresetId =
  | 'none'
  | 'brushed-metal'
  | 'carbon-weave'
  | 'vulcanite'
  | 'guilloche'
  | 'concrete'
  | 'cedar-wood'
  | 'travertine';

export type TextureSlot = 'albedo' | 'normal' | 'roughness';

export interface MaterialSpec {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
  ior: number;
  transmission: number;
  clearcoat: number;
  emissiveIntensity: number;
  texturePreset: PbrTexturePresetId;
  uvScale: number;
  normalStrength: number;
  hasCustomAlbedo?: boolean;
  hasCustomNormal?: boolean;
  hasCustomRoughness?: boolean;
  hasCustomMetalness?: boolean;
}

export interface RayTracerSettings {
  maxBounces: number;
  maxSamples: number;
  exposure: number;
  denoiser: boolean;
  interactiveScale: number;
  clayMode: boolean;
  showLightGizmos: boolean;
  environment: EnvironmentPreset;
  envIntensity: number;
}

export interface RenderStats {
  samples: number;
  frameTimeMs: number;
  triangles: number;
  bvhNodes: number;
  resolutionLabel: string;
  isConverged: boolean;
}

export interface ProjectInfo {
  id: ProjectId;
  name: string;
  subtitle: string;
  partCount: number;
}

export interface LightingRigPreset {
  id: string;
  name: string;
  environment: EnvironmentPreset;
  envIntensity: number;
  lights: StudioLight[];
}

export interface MaterialPreset {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
  ior: number;
  transmission: number;
  clearcoat: number;
  emissiveIntensity: number;
  texturePreset: PbrTexturePresetId;
  uvScale: number;
  normalStrength: number;
}
