type Handler<T> = (...args: T[]) => void

export default class Hook<T> {
  private handlers = new Set<Handler<T>>()

  add(fn: Handler<T>) {
    this.handlers.add(fn)
  }

  remove(fn: Handler<T>) {
    this.handlers.delete(fn)
  }

  emit(...args: T[]) {
    this.handlers.forEach((fn) => fn(...args))
  }
}
