// Simplify a closed screen-space stroke without treating its start as a corner.
export function quadStrokeCorners(points) {
  if (points.length < 5) return null;
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  let diameter = 0, first = 0, second = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const length = distance(points[i], points[j]);
      if (length > diameter) { diameter = length; first = i; second = j; }
    }
  }
  if (diameter < 14 || distance(points[0], points.at(-1)) > Math.min(32, diameter * .34)) return null;

  function simplify(path, start, end, keep, tolerance) {
    const a = path[start], b = path[end], dx = b.x - a.x, dy = b.y - a.y;
    const lengthSquared = dx * dx + dy * dy;
    let furthest = -1, error = tolerance;
    for (let i = start + 1; i < end; i++) {
      const p = path[i];
      const t = lengthSquared ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSquared)) : 0;
      const offset = Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
      if (offset > error) { error = offset; furthest = i; }
    }
    if (furthest < 0) return;
    simplify(path, start, furthest, keep, tolerance);
    keep.push(path[furthest]);
    simplify(path, furthest, end, keep, tolerance);
  }
  const paths = [points.slice(first, second + 1), points.slice(second).concat(points.slice(0, first + 1))];
  for (const ratio of [.035,.045,.06,.08,.10,.12]) {
    const corners = [];
    const tolerance = Math.max(2, diameter * ratio);
    for (const path of paths) {
      corners.push(path[0]);
      simplify(path, 0, path.length - 1, corners, tolerance);
    }
    if (corners.length === 4 && corners.every((p, i) => distance(p, corners[(i + 1) % 4]) >= 5)) return corners;
    if (corners.length < 4) break;
  }
  return null;
}
