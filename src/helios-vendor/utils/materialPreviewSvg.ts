import { MaterialPreset } from '../types/studio';

function shade(hex: string, amount: number): string {
  if (!/^#[\da-f]{6}$/i.test(hex)) return '#808080';
  const value = Number.parseInt(hex.slice(1), 16);
  return `#${[16, 8, 0]
    .map((shift) => {
      const channel = (value >> shift) & 255;
      const next = amount >= 0 ? channel + (255 - channel) * amount : channel * (1 + amount);
      return Math.round(Math.max(0, Math.min(255, next))).toString(16).padStart(2, '0');
    })
    .join('')}`;
}

function patternMarkup(preset: MaterialPreset, id: string): string {
  const stroke = 'stroke="#ffffff" stroke-opacity=".24" fill="none"';
  switch (preset.texturePreset) {
    case 'brushed-metal':
      return `<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 1H8M0 5H8" ${stroke} stroke-width=".7"/></pattern>`;
    case 'carbon-weave':
      return `<pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0H4V4H0ZM5 5H9V9H5Z" fill="#fff" fill-opacity=".18"/><path d="M5 0H9V4H5ZM0 5H4V9H0Z" fill="#000" fill-opacity=".2"/></pattern>`;
    case 'vulcanite':
      return `<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" fill-opacity=".22"/><circle cx="6" cy="6" r="1" fill="#000" fill-opacity=".22"/></pattern>`;
    case 'guilloche':
      return `<pattern id="${id}" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="5.5" ${stroke} stroke-width=".7"/><circle cx="9" cy="9" r="2.5" ${stroke} stroke-width=".6"/></pattern>`;
    case 'concrete':
      return `<pattern id="${id}" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".9" fill="#000" fill-opacity=".22"/><circle cx="10" cy="9" r=".8" fill="#fff" fill-opacity=".32"/><path d="M1 11L5 10M8 2L12 1" ${stroke} stroke-width=".6"/></pattern>`;
    case 'cedar-wood':
      return `<pattern id="${id}" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M0 3C4 1 10 5 15 2M0 10C5 7 10 12 15 9" ${stroke} stroke-width="1"/></pattern>`;
    case 'travertine':
      return `<pattern id="${id}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M-2 5C3 1 9 9 20 3M-2 13C4 9 11 17 20 11" ${stroke} stroke-width="1.1"/></pattern>`;
    default:
      return '';
  }
}

/** Shared lightweight sphere thumbnail for the standalone app and BoxLab adapter. */
export function createMaterialPreviewSvg(preset: MaterialPreset, prefix = 'material'): string {
  const key = preset.id.replace(/[^a-z0-9-]/gi, '-');
  const grad = `${prefix}-sphere-${key}`;
  const clip = `${prefix}-clip-${key}`;
  const pattern = `${prefix}-pattern-${key}`;
  const glass = preset.transmission > 0.55;
  const specular = Math.min(0.8, 0.2 + preset.metalness * 0.28 + preset.clearcoat * 0.25);
  const highlightWidth = 4 + preset.roughness * 10;
  const overlay = preset.texturePreset === 'none'
    ? ''
    : `<circle cx="40" cy="40" r="31" fill="url(#${pattern})" clip-path="url(#${clip})" opacity=".85"/>`;
  const patternDefinition = preset.texturePreset === 'none' ? '' : patternMarkup(preset, pattern);

  return `<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><defs><radialGradient id="${grad}" cx="31%" cy="25%" r="78%"><stop offset="0%" stop-color="${shade(preset.color, 0.72)}"/><stop offset="38%" stop-color="${preset.color}"/><stop offset="100%" stop-color="${shade(preset.color, -0.42)}"/></radialGradient><clipPath id="${clip}"><circle cx="40" cy="40" r="31"/></clipPath>${patternDefinition}</defs>${preset.emissiveIntensity > 0 ? `<circle cx="40" cy="40" r="35" fill="${preset.color}" opacity=".18"/>` : ''}<circle cx="40" cy="40" r="31" fill="url(#${grad})"/>${overlay}${glass ? '<circle cx="40" cy="40" r="29.5" fill="#d8f3ff" opacity=".1"/>' : ''}<ellipse cx="30" cy="25" rx="${highlightWidth}" ry="${3 + preset.roughness * 4}" transform="rotate(-28 30 25)" fill="#fff" opacity="${specular}"/><ellipse cx="48" cy="52" rx="17" ry="8" transform="rotate(-34 48 52)" fill="#fff" opacity="${Math.max(0.04, (1 - preset.roughness) * 0.14)}"/><circle cx="40" cy="40" r="30.5" fill="none" stroke="${glass ? '#dff7ff' : '#fff'}" stroke-opacity="${glass ? 0.72 : 0.24}" stroke-width="${glass ? 1.8 : 1}"/></svg>`;
}
