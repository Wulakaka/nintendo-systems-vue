export default class Stack<T> {
  options: T[] = []
  push(i: T) {
    this.options.push(i)
  }

  pop() {
    if (this.options.length > 1) {
      return this.options.pop()
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
}
