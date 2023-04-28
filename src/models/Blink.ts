export default class Blink {
  _source1: string
  _source2: string
  value: any
  constructor(source1: string, source2: string) {
    this._source1 = source1
    this._source2 = source2
    this.value = source1
  }
  // 交替显示，做出闪烁效果，duration表示持续时间，interval表示闪烁间隔时间
  show(fn: (source: string) => void, option: { duration: number; interval: number }) {
    return new Promise((resolve) => {
      const { duration, interval } = option
      const startTime = performance.now()

      let x = 0
      const C = () => {
        let rate = (performance.now() - startTime) / duration
        rate = 0 > rate ? 0 : 1 < rate ? 1 : rate
        fn((this.value = x++ & 1 ? this._source1 : this._source2))
        1 > rate && setTimeout(C, interval)
        1 === rate && resolve(void 0)
      }

      // 按位或，做出效果 0 1 0 1
      fn((this.value = x++ & 1 ? this._source1 : this._source2))
      setTimeout(C, interval)
    })
  }
}
