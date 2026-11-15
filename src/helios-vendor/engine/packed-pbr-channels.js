// glTF metallic-roughness packing: G is roughness and B is metalness.
export function copyPackedScalarChannel(target, targetOffset, source, sourceOffset, pixelCount, channel) {
  if (channel !== 1 && channel !== 2) throw new RangeError('Packed PBR scalar channel must be G or B.');
  if (targetOffset < 0 || sourceOffset < 0 || pixelCount < 0
      || targetOffset + pixelCount * 4 > target.length
      || sourceOffset + pixelCount * 4 > source.length) {
    throw new RangeError('Packed PBR scalar data is outside the texture buffer.');
  }
  for (let i = 0; i < pixelCount; i++) {
    target[targetOffset + i * 4 + channel] = source[sourceOffset + i * 4 + channel];
  }
}
