import type Paint from '@/views/paint/Paint'

export default class DrawShape {
  paint: Paint

  ele?: HTMLElement
  startX = 0
  startY = 0
  endX = 0
  endY = 0

  constructor(paint: Paint) {
    this.paint = paint
    this.mousedownHandler = this.mousedownHandler.bind(this)
    this.mouseupHandler = this.mouseupHandler.bind(this)
    this.mousemoveHandler = this.mousemoveHandler.bind(this)
  }

  set el(ele: HTMLElement) {
    this.ele = ele
  }

  private mousedownHandler(e: MouseEvent) {
    if (!this.ele) return
    this.startX = e.offsetX
    this.startY = e.offsetY
    this.ele.addEventListener('mousemove', this.mousemoveHandler)
  }

  private mouseupHandler(e: MouseEvent) {
    if (!this.ele) return
    this.paint.store()
    this.ele.removeEventListener('mousemove', this.mousemoveHandler)
  }

  mousemoveHandler(e: MouseEvent): void {
    throw Error('需要实现 mousemove')
  }

  addListeners() {
    if (!this.ele) return
    this.ele.addEventListener('mousedown', this.mousedownHandler)
    this.ele.addEventListener('mouseup', this.mouseupHandler)
  }
  removeListeners() {
    if (!this.ele) return
    this.ele.removeEventListener('mousedown', this.mousedownHandler)
    this.ele.removeEventListener('mouseup', this.mouseupHandler)
  }
}
