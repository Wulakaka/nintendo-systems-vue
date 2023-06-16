import Hook from '@/views/paint/Hook'

export default class Stack<T> {
  options: T[] = []
  sizeChangeHook = new Hook<number>()
  push(i: T) {
    this.options.push(i)
    this.sizeChangeHook.emit(this.size)
  }

  pop() {
    if (this.options.length > 1) {
      const item = this.options.pop()
      this.sizeChangeHook.emit(this.size)
      return item
    } else {
      return undefined
    }
  }

  get last() {
    return this.options[this.options.length - 1]
  }

  get size() {
    return this.options.length
  }

  onSizeChange(fn: (size: number) => void) {
    this.sizeChangeHook.add(fn)
  }
}
