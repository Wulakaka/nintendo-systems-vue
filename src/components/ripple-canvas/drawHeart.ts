class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
function to(t: number, size: number) {
  const point = pointOnHeart(t)

  // point.x = size / 2 + (point.x * size) / 350
  // point.y = size / 2 - (point.y * size) / 350
  point.x = (point.x * size) / 350
  point.y = -(point.y * size) / 350
  return point
}

function pointOnHeart(t: number) {
  // 范围是350
  return new Point(
    160 * Math.pow(Math.sin(t), 3),
    130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
  )
}

export default function drawHeart(
  context: CanvasRenderingContext2D,
  size: number,
  center: { x: number; y: number }
) {
  const { x, y } = center

  context.beginPath()
  let t = -Math.PI

  let point = to(t, size)
  context.moveTo(point.x + x, point.y + y)
  while (t < Math.PI) {
    t += 0.01 // baby steps!
    point = to(t, size)
    context.lineTo(point.x + x, point.y + y)
  }
  context.closePath()
  // create the fill
  context.fillStyle = '#ea80b0'
  context.fill()
}
