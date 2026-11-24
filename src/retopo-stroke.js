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
  if (diameter < 24 || distance(points[0], points.at(-1)) > Math.min(24, diameter * .2)) return null;

  const tolerance = Math.max(3, diameter * .045);
  function simplify(path, start, end, keep) {
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
    simplify(path, start, furthest, keep);
    keep.push(path[furthest]);
    simplify(path, furthest, end, keep);
  }
  const corners = [];
  for (const path of [points.slice(first, second + 1), points.slice(second).concat(points.slice(0, first + 1))]) {
    corners.push(path[0]);
    simplify(path, 0, path.length - 1, corners);
  }
  return corners.length === 4 && corners.every((p, i) => distance(p, corners[(i + 1) % 4]) >= 8) ? corners : null;
}
