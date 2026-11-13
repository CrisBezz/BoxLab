/**
 * Convert correlated color temperature (Kelvin, 1800K - 12000K) to sRGB hex
 * and normalized linear RGB values using Tanner Helland's Planckian locus fit.
 */
export function kelvinToRgb(kelvin: number): [number, number, number] {
  const temp = Math.max(1000, Math.min(40000, kelvin)) / 100;
  let r: number;
  let g: number;
  let b: number;

  if (temp <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(temp) - 161.1195681661;
    b = temp <= 19 ? 0 : 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
    b = 255;
  }

  return [
    Math.max(0, Math.min(255, r)) / 255,
    Math.max(0, Math.min(255, g)) / 255,
    Math.max(0, Math.min(255, b)) / 255,
  ];
}

export function kelvinToHex(kelvin: number): string {
  const [r, g, b] = kelvinToRgb(kelvin);
  const toHex = (n: number) =>
    Math.round(n * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToLinearRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  const srgbToLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  return [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];
}

export function sphericalToCartesian(
  azimuthDeg: number,
  elevationDeg: number,
  distance: number,
): [number, number, number] {
  const az = (azimuthDeg * Math.PI) / 180;
  const el = (elevationDeg * Math.PI) / 180;
  const cosEl = Math.cos(el);
  const x = distance * cosEl * Math.sin(az);
  const y = distance * Math.sin(el);
  const z = distance * cosEl * Math.cos(az);
  return [x, y, z];
}

export function cartesianToSpherical(
  x: number,
  y: number,
  z: number,
): { azimuth: number; elevation: number; distance: number } {
  const distance = Math.max(1.2, Math.sqrt(x * x + y * y + z * z));
  const clampedY = Math.max(-0.99, Math.min(0.99, y / distance));
  const elevation = Math.max(4, Math.min(86, (Math.asin(clampedY) * 180) / Math.PI));
  const azimuth = (Math.atan2(x, z) * 180) / Math.PI;
  return { azimuth, elevation, distance };
}
