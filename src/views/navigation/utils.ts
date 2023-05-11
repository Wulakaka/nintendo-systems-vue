export function getKB(x1: number, y1: number, x2: number, y2: number): { k: number; b: number } {
  const k = (y2 - y1) / (x2 - x1)
  const b = y2 - k * x2
  return {
    k,
    b
  }
}

export function getIntersectionPoint(
  k1: number,
  b1: number,
  k2: number,
  b2: number
): { x: number; y: number } {
  const x = -(b2 - b1) / (k2 - k1)
  const y = k1 * x + b1
  return {
    x,
    y
  }
}

export function getB(k: number, x: number, y: number): number {
  return y - k * x
}
