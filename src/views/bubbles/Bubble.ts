export default class Bubble {
  t = 0
  r: number
  R: number
  dr: number
  offset: number
  rotate: number
  private isMoveOut = true
  private timer = -1
  constructor(r: number, R: number, dr: number, offset: number, rotate: number) {
    this.r = r
    this.R = R
    this.dr = dr
    this.offset = offset
    this.rotate = rotate
  }

  start() {
    this.timer = requestAnimationFrame(() => this.update())
  }

  stop() {
    cancelAnimationFrame(this.timer)
  }

  private update() {
    const delta = 5e-3
    this.t += delta
    if (this.t > 1) {
      this.t = 0
    }
    this.isMoveOut = this.t < 0.5
    cancelAnimationFrame(this.timer)
    this.timer = requestAnimationFrame(() => this.update())
  }
}
