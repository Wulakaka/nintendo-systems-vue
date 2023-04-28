export default class RandomText {
  value = ''
  _source: string
  constructor(source: string) {
    this._source = source
  }

  show(a: (text: string) => void, option: { duration: number; delay: number; interval: number }) {
    return new Promise((resolve) => {
      const { duration, delay, interval } = option
      const startTime = performance.now()
      const source = this._source
      const length = source.length

      const I = () => {
        const time = performance.now()
        let outerRate = (time - startTime) / duration
        outerRate = 0 > outerRate ? 0 : 1 < outerRate ? 1 : outerRate
        let innerRate = (time - delay - startTime) / duration
        innerRate = 0 > innerRate ? 0 : 1 < innerRate ? 1 : innerRate
        const outerLength = (length * outerRate) | 0
        const innerLength = (length * innerRate) | 0
        const text = source.slice(0, innerLength) + this.getRandomText(outerLength - innerLength)
        this.value = text
        a(text)
        1 > innerRate && setTimeout(I, interval)
        1 === innerRate && resolve(void 0)
      }

      I()
    })
  }

  getRandomText(length: number) {
    let str = ''
    for (let i = 0; i < length; ++i) {
      str +=
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=~!@#$%^&*()[]{}_+;:?/.,'[
          (87 * Math.random()) | 0
        ]
    }
    return str
  }
}

export class DeleteText {
  _source: string
  value = ''
  constructor(source: string) {
    this._source = source
  }

  show(fn: (t: string) => void, option: { duration: number; interval: number }) {
    const { duration, interval } = option
    const startTime = performance.now()
    const source = this._source
    const length = source.length
    return new Promise((resolve) => {
      const step = () => {
        const time = performance.now()
        let rate = (time - startTime) / duration
        rate = rate < 0 ? 0 : rate > 1 ? 1 : rate
        const l = length - ((rate * length) | 0)
        this.value = source.slice(0, l)
        fn(this.value)
        if (rate < 1) {
          setTimeout(step, interval)
        }
        if (rate === 1) {
          resolve(void 0)
        }
      }
      step()
    })
  }
}
