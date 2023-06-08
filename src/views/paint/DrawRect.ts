import DrawShape from '@/views/paint/DrawShape'
export default class DrawRect extends DrawShape {
  mousemoveHandler(e: MouseEvent) {
    this.endX = e.offsetX
    this.endY = e.offsetY

    const minX = Math.min(this.startX, this.endX)
    const maxX = Math.max(this.startX, this.endX)
    const minY = Math.min(this.startY, this.endY)
    const maxY = Math.max(this.startY, this.endY)

    this.paint.drawRect(minX, minY, maxX - minX, maxY - minY)
  }
}
