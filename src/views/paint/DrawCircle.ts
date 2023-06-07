import DrawShape from '@/views/paint/DrawShape'
export default class DrawCircle extends DrawShape {
  mousemoveHandler(e: MouseEvent) {
    this.endX = e.offsetX
    this.endY = e.offsetY

    const minX = Math.min(this.startX, this.endX)
    const maxX = Math.max(this.startX, this.endX)
    const minY = Math.min(this.startY, this.endY)
    const maxY = Math.max(this.startY, this.endY)

    const x = ((minX + maxX) / 2) | 0
    const y = ((minY + maxY) / 2) | 0
    const radiusX = maxX - x
    const radiusY = maxY - y

    this.paint.drawCircle(x, y, radiusX, radiusY)
  }
}
