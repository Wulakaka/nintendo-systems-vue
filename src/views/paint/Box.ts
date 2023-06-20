import Hook from '@/views/paint/Hook'

export default class Box {
  private ele?: HTMLCanvasElement
  scale = 1
  startX = 0
  endX = 0
  startY = 0
  endY = 0
  x = 0
  y = 0

  scaleHook = new Hook<number>()
  moveHook = new Hook<number>()

  constructor() {
    this.wheelHandler = this.wheelHandler.bind(this)
    this.mousedownHandler = this.mousedownHandler.bind(this)
    this.mousemoveHandler = this.mousemoveHandler.bind(this)
    this.mouseupHandler = this.mouseupHandler.bind(this)
    this.mouseleaveHandler = this.mouseleaveHandler.bind(this)
  }

  set el(ele: HTMLCanvasElement) {
    this.ele = ele
  }
  // 滚轮事件
  private wheelHandler(e: WheelEvent) {
    if (!this.ele) return

    this.scale += e.deltaY * -0.001

    // Restrict scale
    this.scale = Math.min(Math.max(0.5, this.scale), 4)
    this.scaleHook.emit(this.scale)
  }

  private mousedownHandler(e: MouseEvent) {
    // 固定为左键
    if (e.button !== 0) return
    this.startX = e.pageX
    this.startY = e.pageY
    this.addMoveHandler()
    this.addMouseupHandler()
    this.addMouseleaveHandler()
  }

  private mousemoveHandler(e: MouseEvent) {
    if (e.button !== 0) return
    this.endX = e.pageX
    this.endY = e.pageY
    this.changePosition()
    this.startX = e.pageX
    this.startY = e.pageY
  }

  private mouseupHandler(e: MouseEvent) {
    if (e.button !== 0) return
    this.endX = e.pageX
    this.endY = e.pageY
    this.changePosition()
    this.removeMoveHandler()
    this.removeMouseupHandler()
    this.removeMouseleaveHandler()
  }

  private changePosition() {
    this.x += (this.endX - this.startX) / this.scale
    this.y += (this.endY - this.startY) / this.scale
    this.moveHook.emit(this.x, this.y)
  }

  private mouseleaveHandler(e: MouseEvent) {
    this.removeMoveHandler()
    this.removeMouseupHandler()
    this.removeMouseleaveHandler()
  }

  private addMouseleaveHandler() {
    if (!this.ele) return
    this.ele.addEventListener('mouseleave', this.mouseleaveHandler)
  }
  private removeMouseleaveHandler() {
    if (!this.ele) return
    this.ele.removeEventListener('mouseleave', this.mouseleaveHandler)
  }

  private addMoveHandler() {
    if (!this.ele) return
    this.ele.addEventListener('mousemove', this.mousemoveHandler)
  }

  private removeMoveHandler() {
    if (!this.ele) return
    this.ele.removeEventListener('mousemove', this.mousemoveHandler)
  }
  private addMouseupHandler() {
    if (!this.ele) return
    this.ele.addEventListener('mouseup', this.mouseupHandler)
  }

  private removeMouseupHandler() {
    if (!this.ele) return
    this.ele.removeEventListener('mouseup', this.mouseupHandler)
  }

  addListeners() {
    if (!this.ele) return
    this.ele.addEventListener('wheel', this.wheelHandler, { passive: true })
    this.ele.addEventListener('mousedown', this.mousedownHandler)
  }

  removeListeners() {
    if (!this.ele) return
    this.ele.removeEventListener('wheel', this.wheelHandler)
    this.ele.removeEventListener('mousedown', this.mousedownHandler)
  }

  onScaleChange(fn: (scale: number) => void) {
    this.scaleHook.add(fn)
  }

  onPositionChange(fn: (x: number, y: number) => void) {
    this.moveHook.add(fn)
  }
}
