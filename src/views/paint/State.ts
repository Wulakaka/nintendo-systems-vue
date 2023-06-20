export default class State {
  name: string
  constructor(name: string) {
    this.name = name
  }
  // 插入 变更为当前状态后调用
  inject() {
    throw new Error(`状态[${this.name}]未实现 inject 方法`)
  }
  // 拔出 离开当前状态前调用
  extract() {
    throw new Error(`状态[${this.name}]未实现 extract 方法`)
  }
}
