export default class Play {
  _reqId = -1
  _duration: number
  constructor(duration: number) {
    this._duration = duration
  }

  start(fn: (params: { t: number }) => void) {
    const now = performance.now()
    const update = (time: number) => {
      time = (time - now) / this._duration
      time = 0 > time ? 0 : 1 < time ? 1 : time
      fn({ t: time })
      if (1 > time) {
        cancelAnimationFrame(this._reqId)
        this._reqId = requestAnimationFrame(update)
      }
    }
    update(0)
    cancelAnimationFrame(this._reqId)
    this._reqId = requestAnimationFrame(update)
  }
}
