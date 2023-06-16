export default class State {
  name: string
  constructor(name: string) {
    this.name = name
  }
  handle() {
    throw new Error('未实现handle方法')
  }
}
