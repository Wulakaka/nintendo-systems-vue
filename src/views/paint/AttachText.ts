import type Paint from '@/views/paint/Paint'
export interface TextItem {
  text: string
  size: number
  color: string
  x: number
  y: number
}

export default class AttachText {
  paint: Paint

  ele?: HTMLElement
  x = 0
  y = 0
  handleClick: (x: number, y: number) => void

  constructor(paint: Paint, handleClick: (x: number, y: number) => void) {
    this.paint = paint
    this.handleClick = handleClick
    this.clickHandler = this.clickHandler.bind(this)
  }

  set el(ele: HTMLElement) {
    this.ele = ele
  }

  private clickHandler(e: MouseEvent) {
    if (!this.ele) return
    const x = e.offsetX
    const y = e.offsetY
    this.handleClick(x, y)
  }

  addListeners() {
    if (!this.ele) return
    this.ele.addEventListener('click', this.clickHandler)
  }
  removeListeners() {
    if (!this.ele) return
    this.ele.removeEventListener('click', this.clickHandler)
  }
}
