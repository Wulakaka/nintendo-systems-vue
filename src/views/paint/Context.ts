import type State from '@/views/paint/State'

export default class Context {
  private _state?: State
  setState(state: State) {
    this._state = state
  }
  request() {
    this._state?.handle()
  }
  get state() {
    return this._state?.name
  }
}
