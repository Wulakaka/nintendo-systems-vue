import DrawShape from '@/views/paint/DrawShape'
export default class DrawArrow extends DrawShape {
  mousemoveHandler(e: MouseEvent) {
    this.endX = e.offsetX
    this.endY = e.offsetY
    this.paint.drawArrow(this.startX, this.startY, this.endX, this.endY)
  }
}
