export default class CoverDrawing {
  private ele?: HTMLCanvasElement

  init(ele: HTMLCanvasElement) {
    this.ele = ele
    this.ele.width = ele.clientWidth
    this.ele.height = ele.clientHeight

    this.drawRect(0, 0, 0, 0)
  }

  drawRect(x: number, y: number, width: number, height: number) {
    if (!this.ele) return
    const ctx = this.ele.getContext('2d')
    if (!ctx) return
    ctx.save()
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, this.ele.width, this.ele.height)
    ctx.clearRect(x, y, width, height)
    ctx.restore()
  }
}
