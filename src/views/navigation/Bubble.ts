export default class Bubble {
  t = 0
  r: number
  R: number
  dr: number
  offset: number
  rotate: number
  private isGoingDown = false
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
    const delta = 2e-2
    if (this.isGoingDown) {
      this.t += delta
    } else {
      this.t -= delta
    }
    if (this.t > 1) {
      this.isGoingDown = false
      this.t = 1
    } else if (this.t < 0) {
      this.isGoingDown = true
      this.t = 0
    }
    cancelAnimationFrame(this.timer)
    this.timer = requestAnimationFrame(() => this.update())
  }
}
