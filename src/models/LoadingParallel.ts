let instance: LoadingParallel
export default class LoadingParallel {
  _promises: Promise<unknown>[] = []

  add(...args: Promise<unknown>[]) {
    this._promises.push(...args)
  }

  start(fn: (t: number) => void, duration: number) {
    const d = new Promise((resolve) => {
      const startTime = performance.now()
      const r = () => {
        const time = performance.now() - startTime
        if (time > duration) {
          fn(1)
          resolve(void 0)
        } else {
          fn(1 - Math.pow(1 - time / duration, 4))
          setTimeout(r, 100)
        }
      }
      fn(0)
      setTimeout(r, 100)
    })

    return Promise.all([...this._promises, d])
  }

  static getInstance() {
    return instance || (instance = new LoadingParallel())
  }
}
