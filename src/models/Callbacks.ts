type Callback<T> = (args: T) => void
export default class Callbacks<T = unknown> {
  callbacks: Callback<T>[] = []
  add(fn: Callback<T>) {
    this.callbacks.push(fn)
  }

  exec(arg: T) {
    const arr = this.callbacks.slice()
    for (let i = arr.length; i--; ) {
      arr[i](arg)
    }
  }
}
