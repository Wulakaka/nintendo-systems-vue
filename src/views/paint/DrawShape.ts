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
    if (e.button !== 0) return
    this.startX = e.offsetX
    this.startY = e.offsetY
    this.addMousemoveListener()
    this.addMouseupListener()
  }

  private mouseupHandler(e: MouseEvent) {
    if (!this.ele) return
    if (e.button !== 0) return
    this.endX = e.offsetX
    this.endY = e.offsetY
    if (this.startX !== this.endX && this.startY !== this.endY) {
      this.paint.store()
    }
    this.removeMousemoveListener()
    this.removeMouseupListener()
  }

  mousemoveHandler(e: MouseEvent): void {
    throw Error('需要实现 mousemove')
  }

  private addMousemoveListener() {
    if (!this.ele) return
    this.ele.addEventListener('mousemove', this.mousemoveHandler)
  }
  private removeMousemoveListener() {
    if (!this.ele) return
    this.ele.removeEventListener('mousemove', this.mousemoveHandler)
  }
  private addMouseupListener() {
    if (!this.ele) return
    this.ele.addEventListener('mouseup', this.mouseupHandler)
    this.ele.addEventListener('mouseleave', this.mouseupHandler)
  }
  private removeMouseupListener() {
    if (!this.ele) return
    this.ele.removeEventListener('mouseup', this.mouseupHandler)
    this.ele.removeEventListener('mouseleave', this.mouseupHandler)
  }

  addListeners() {
    if (!this.ele) return
    this.ele.addEventListener('mousedown', this.mousedownHandler)
  }
  removeListeners() {
    if (!this.ele) return
    this.ele.removeEventListener('mousedown', this.mousedownHandler)
  }
}
