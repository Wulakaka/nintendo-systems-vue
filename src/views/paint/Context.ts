import type State from '@/views/paint/State'

export default class Context {
  private _state?: State
  setState(state: State) {
    this._state?.extract()
    this._state = state
    this._state.inject()
  }

  get state() {
    return this._state?.name
  }
}
